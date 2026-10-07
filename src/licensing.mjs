import { readFile } from 'node:fs/promises';
import references from '../policy/license-references.json' with { type: 'json' };
import { inside, sha256, digest } from './files.mjs';
import { CASELAW_TERMS } from './caselaw-policy.mjs';
import { PUBLIC_DOMAIN_STATEMENT } from './sources/gutenberg-normalize.mjs';

export const LICENSE_POLICY = 'standard-open-v1';
const normalized = (text) => text.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
function comparable(text, id) {
  if (id === 'MIT') {
    // Only the optional title and copyright holder/year may vary. Never drop
    // arbitrary preambles or added terms while recognizing a standard license.
    text = text.replace(/^\uFEFF/, '').replace(/\r/g, '').replace(/^\s*(?:The )?MIT License(?: \(MIT\))?\s*\n/i, '').replace(/^(?:\s*Copyright[^\n]*\n)+/i, '').trim();
  } else if (id.startsWith('BSD-') || id === 'ISC') {
    text = text.replace(/^\uFEFF/, '').replace(/\r/g, '').replace(/^\s*(?:BSD [23]-Clause[^\n]*|ISC License)\s*\n/i, '').replace(/^(?:\s*Copyright[^\n]*\n)+/i, '').trim();
  }
  return normalized(text);
}
export function recognizeLicense(bytes, expected) {
  const text = typeof bytes === 'string' ? bytes : new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  const variants = references.licenses.filter((r) => r.id === expected);
  if (!variants.length) throw new Error(`${expected}: not covered by the automatic public-redistribution policy (NC/ND/custom terms are not treated as unrestricted open licenses)`);
  const reference = variants.find((r) => comparable(text, expected) === comparable(r.text, expected));
  if (!reference) throw new Error(`${expected}: license text differs from the standard terms; automatic approval cannot assume added or changed conditions are harmless`);
  return { spdx: expected, sha256: sha256(bytes), reference: reference.source, obligations: ['CC0-1.0', 'CC-PDM-1.0'].includes(expected) ? [] : ['retain-license-and-notices', 'attribute-source', 'mark-modifications', ...(expected.includes('-SA-') ? ['same-license-for-adaptations'] : [])] };
}
export const attributionRequired = (manifest) => manifest.licensing.licenses.some(l => !['CC0-1.0', 'CC-PDM-1.0'].includes(l.spdx));
export function caselawLegal(manifest, termsSha256) {
  if (termsSha256 !== CASELAW_TERMS.sha256) throw new Error('CAP terms changed; reassess the complete source notice before importing');
  if (manifest.licensing.licenses.length !== 1 || manifest.licensing.licenses[0].spdx !== 'CC0-1.0') throw new Error('CAP case data requires CC0-1.0 licensing');
  const license = manifest.licensing.licenses[0];
  const text = references.licenses.find(r => r.id === 'CC0-1.0').text;
  const assessment = { policy: LICENSE_POLICY, approved: true, evidence: [{ license: license.id, declaration: CASELAW_TERMS, ...recognizeLicense(text, license.spdx) }] };
  return [
    { path: license.text, bytes: Buffer.from(text) },
    { path: 'LICENSES/caselaw-rights.json', bytes: Buffer.from(JSON.stringify(CASELAW_TERMS, null, 2) + '\n') },
    { path: 'LICENSES/assessment.json', bytes: Buffer.from(JSON.stringify(assessment, null, 2) + '\n') },
  ];
}
// Project Gutenberg states each work's U.S. status in its generated HTML. The
// selection records that statement per book; editorial guides use their own
// recognized license. Neither the PG license nor its trademark text is kept.
export function gutenbergLegal(manifest, selection) {
  const records = manifest.licensing.licenses;
  const pd = records.filter((l) => l.spdx === 'CC-PDM-1.0');
  if (pd.length !== 1) throw new Error('Gutenberg books require exactly one CC-PDM-1.0 public-domain license record');
  if (!selection.books?.length || selection.statement !== PUBLIC_DOMAIN_STATEMENT || selection.books.some((b) => b.rights !== PUBLIC_DOMAIN_STATEMENT)) throw new Error('Every selected Gutenberg book must carry the public-domain rights statement');
  const text = (spdx) => {
    const reference = references.licenses.find((r) => r.id === spdx);
    if (!reference) throw new Error(`${spdx}: not covered by the automatic public-redistribution policy`);
    return reference.text;
  };
  const evidence = records.map((license) => ({ license: license.id,
    declaration: license === pd[0] ? { statement: PUBLIC_DOMAIN_STATEMENT, source: 'Project Gutenberg dc.rights metadata in each selected HTML edition', books: selection.books.length } : { source: 'Original guides published by the catalog publisher under this license' },
    ...recognizeLicense(text(license.spdx), license.spdx) }));
  return [
    ...records.map((license) => ({ path: license.text, bytes: Buffer.from(text(license.spdx)) })),
    { path: 'LICENSES/gutenberg-selection.json', bytes: Buffer.from(JSON.stringify(selection, null, 2) + '\n') },
    { path: 'LICENSES/assessment.json', bytes: Buffer.from(JSON.stringify({ policy: LICENSE_POLICY, approved: true, evidence }, null, 2) + '\n') },
  ];
}
export function automaticLicensing(manifest) { return manifest.licensing.policy === LICENSE_POLICY; }
export function assessLicenseFiles(manifest, files) {
  const evidence = [];
  for (const license of manifest.licensing.licenses) {
    const candidates = manifest.source.licenseFiles.filter((f) => f.license === license.id);
    if (!candidates.length) throw new Error(`${license.id}: automatic approval needs a source license file`);
    for (const file of candidates) {
      const bytes = files.get(file.path);
      if (!bytes) throw new Error(`Missing license evidence: ${file.path}`);
      evidence.push({ path: file.path, license: license.id, ...recognizeLicense(bytes, license.spdx) });
    }
  }
  return { policy: LICENSE_POLICY, approved: true, evidence };
}
export function assessWikipediaRights(manifest, rights) {
  const url = new URL(rights.url);
  if (url.protocol !== 'https:' || url.hostname !== 'creativecommons.org' || !/^\/licenses\/by-sa\/4\.0\/(?:deed(?:\.[a-z-]+)?)?$/.test(url.pathname)) throw new Error('Wikipedia site license is not the expected standard CC BY-SA 4.0 license');
  if (manifest.licensing.licenses.length !== 1 || manifest.licensing.licenses[0].spdx !== 'CC-BY-SA-4.0') throw new Error('Wikipedia text requires CC-BY-SA-4.0 licensing');
  const license = manifest.licensing.licenses[0];
  const reference = references.licenses.find((r) => r.id === license.spdx);
  return { policy: LICENSE_POLICY, approved: true, evidence: [{ license: license.id, site: `https://${manifest.source.language}.wikipedia.org`, rights, ...recognizeLicense(reference.text, license.spdx) }] };
}
export function wikipediaLegal(manifest, rights) {
  const assessment = assessWikipediaRights(manifest, rights);
  const license = manifest.licensing.licenses[0];
  const text = references.licenses.find((r) => r.id === license.spdx).text;
  return [
    { path: license.text, bytes: Buffer.from(text) },
    { path: 'LICENSES/wikipedia-rights.json', bytes: Buffer.from(JSON.stringify(rights, null, 2) + '\n') },
    { path: 'LICENSES/assessment.json', bytes: Buffer.from(JSON.stringify(assessment, null, 2) + '\n') },
  ];
}
export async function validateAutomaticLicensing(catalog) {
  const m = catalog.manifest;
  if (!automaticLicensing(m)) return;
  if (m.source.type === 'caselaw' || m.source.type === 'caselaw-collection') {
    for (const file of caselawLegal(m, CASELAW_TERMS.sha256)) {
      if (sha256(await readFile(inside(catalog.dir, file.path))) !== sha256(file.bytes)) throw new Error(`CAP license evidence differs: ${file.path}`);
    }
    if (m.source.type === 'caselaw-collection') {
      const selection = JSON.parse(await readFile(inside(catalog.dir, 'LICENSES/collection-selection.json'), 'utf8'));
      if (digest(selection) !== m.source.selectionDigest || selection.corpusDigest !== m.source.corpusDigest || selection.snapshot !== m.source.snapshot || selection.part !== m.source.part) throw new Error('CAP collection selection evidence differs');
    }
    return;
  }
  if (m.source.type === 'gutenberg') {
    const selection = JSON.parse(await readFile(inside(catalog.dir, 'LICENSES/gutenberg-selection.json'), 'utf8'));
    for (const file of gutenbergLegal(m, selection)) {
      if (sha256(await readFile(inside(catalog.dir, file.path))) !== sha256(file.bytes)) throw new Error(`Gutenberg license evidence differs: ${file.path}`);
    }
    return;
  }
  if (m.source.type === 'wikipedia') {
    const rights = JSON.parse(await readFile(inside(catalog.dir, 'LICENSES/wikipedia-rights.json'), 'utf8'));
    const expected = wikipediaLegal(m, rights);
    for (const file of expected) {
      if (sha256(await readFile(inside(catalog.dir, file.path))) !== sha256(file.bytes)) throw new Error(`Wikipedia license evidence differs: ${file.path}`);
    }
    return;
  }
  if (m.source.type !== 'github') throw new Error('Automatic license assessment requires GitHub or Wikipedia evidence');
  const files = new Map();
  for (const file of m.source.licenseFiles) files.set(file.path, await readFile(inside(catalog.dir, `LICENSES/upstream/${file.path}`)));
  const assessment = assessLicenseFiles(m, files);
  const stored = JSON.parse(await readFile(inside(catalog.dir, 'LICENSES/assessment.json'), 'utf8'));
  if (digest(stored) !== digest(assessment)) throw new Error('License assessment does not match the saved license evidence; run sync');
  for (const notice of m.source.noticeFiles) {
    if (sha256(await readFile(inside(catalog.dir, `LICENSES/upstream/${notice.path}`))) !== notice.sha256) throw new Error(`Saved nonstandard notice differs from its assessed hash: ${notice.path}`);
  }
  for (const license of m.licensing.licenses) {
    const source = m.source.licenseFiles.find((f) => f.license === license.id);
    if (sha256(await readFile(inside(catalog.dir, license.text))) !== sha256(files.get(source.path))) throw new Error(`License text disagrees with source evidence: ${license.text}`);
  }
}
