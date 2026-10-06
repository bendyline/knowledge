import yauzl from 'yauzl';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { stringify } from 'yaml';
import { z } from 'zod';
import { request } from '../http.mjs';
import { digest, exists, json, portablePath, sha256, write } from '../files.mjs';
import { licenseFor } from '../catalogs.mjs';
import { caselawLegal } from '../licensing.mjs';
import { CASELAW_TERMS } from '../caselaw-policy.mjs';
import { isCapFileName } from '../caselaw-paths.mjs';
import { casePath, normalizeCaselaw, CASELAW_NORMALIZER } from './caselaw-normalize.mjs';

const entity = z.object({ id: z.number().int().positive(), name: z.string().min(1) }).passthrough();
export const CaselawCase = z.object({
  id: z.number().int().positive(), name: z.string().min(1), name_abbreviation: z.string(),
  file_name: z.string().refine(isCapFileName, 'Invalid CAP case filename'), decision_date: z.string().nullable(),
  jurisdiction: entity, court: entity, citations: z.array(z.object({ cite: z.string().min(1), type: z.string() }).passthrough()),
  casebody: z.object({ opinions: z.array(z.object({ text: z.string(), type: z.string().nullable(), author: z.string().nullable() }).passthrough()) }).passthrough(),
}).passthrough();

// Read bounded entries into memory without extracting untrusted ZIP paths.
export async function readCaselawZip(bytes, { maxFileBytes, maxExpandedBytes }) {
  const zip = await yauzl.fromBufferPromise(bytes, { strictFileNames: true, validateEntrySizes: true });
  const files = new Map(); const names = new Set(); let total = 0; let entries = 0;
  try {
    for await (const entry of zip.eachEntry()) {
      if (++entries > 50000) throw new Error('CAP ZIP has too many entries');
      const directory = entry.fileName.endsWith('/');
      const path = portablePath(directory ? entry.fileName.slice(0, -1) : entry.fileName);
      const key = path.normalize('NFC').toLowerCase();
      if (names.has(key)) throw new Error(`CAP ZIP path collision: ${path}`);
      names.add(key);
      const mode = (entry.externalFileAttributes >>> 16) & 0xf000;
      if (mode && mode !== (directory ? 0x4000 : 0x8000)) throw new Error(`CAP ZIP symlink/special entry: ${path}`);
      if (entry.generalPurposeBitFlag & 1) throw new Error('Encrypted CAP ZIP entry');
      if (directory) continue;
      const body = /^(json|html)\/(.+)\.(json|html)$/.exec(path);
      if (!/^metadata\/(?:CasesMetadata|VolumeMetadata)\.json$/.test(path)
        && (!body || body[1] !== body[3] || !isCapFileName(body[2]))) throw new Error(`Unexpected CAP ZIP entry: ${path}`);
      if (entry.uncompressedSize > maxFileBytes || total + entry.uncompressedSize > maxExpandedBytes) throw new Error('CAP ZIP exceeds expanded byte budget');
      const stream = await zip.openReadStreamPromise(entry);
      const chunks = []; let size = 0;
      for await (const chunk of stream) {
        size += chunk.length; total += chunk.length;
        if (size > maxFileBytes || total > maxExpandedBytes) { stream.destroy(); throw new Error('CAP ZIP exceeds expanded byte budget'); }
        chunks.push(chunk);
      }
      files.set(path, Buffer.concat(chunks));
    }
  } finally { zip.close(); }
  return { files, expandedBytes: total };
}

export async function caselawSnapshot(catalog, { download = request } = {}) {
  const { manifest: m } = catalog;
  const terms = (await download(CASELAW_TERMS.sourceUrl, { maxBytes: 1000000 })).bytes;
  const legal = caselawLegal(m, sha256(terms));
  const records = []; const archives = []; const ids = new Set(); const mapping = new Map();
  let downloaded = terms.length; let expanded = 0;
  for (const volume of [...m.source.volumes].sort((a, b) => `${a.reporter}/${a.volume}`.localeCompare(`${b.reporter}/${b.volume}`))) {
    const url = `https://static.case.law/${volume.reporter}/${volume.volume}.zip`;
    const cache = resolve(catalog.root, '.work/source-cache', `cap-${volume.sha256}.zip`);
    let bytes = download === request && await exists(cache) ? await readFile(cache) : null;
    if (bytes && sha256(bytes) !== volume.sha256) bytes = null;
    if (!bytes) bytes = (await download(url, { maxBytes: m.sync.maxFileBytes })).bytes;
    downloaded += bytes.length;
    if (bytes.length > m.sync.maxFileBytes || downloaded > m.sync.maxTotalBytes) throw new Error('CAP exceeds download byte budget');
    if (sha256(bytes) !== volume.sha256) throw new Error(`CAP archive checksum mismatch: ${url}`);
    if (download === request) await write(cache, bytes);
    const archive = await readCaselawZip(bytes, { maxFileBytes: m.sync.maxFileBytes, maxExpandedBytes: m.source.maxExpandedBytes - expanded });
    expanded += archive.expandedBytes;
    const parse = (path) => {
      if (!archive.files.has(path)) throw new Error(`Missing CAP ZIP entry: ${path}`);
      return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(archive.files.get(path)));
    };
    const metadata = parse('metadata/CasesMetadata.json');
    const info = parse('metadata/VolumeMetadata.json');
    if (String(info.volume_number) !== volume.volume.replace(/-\d+$/, '')) throw new Error('CAP volume metadata disagrees with selected volume');
    if (!Array.isArray(metadata) || metadata.length !== volume.cases) throw new Error('CAP case count differs from pinned selection');
    const expected = new Set(['metadata/CasesMetadata.json', 'metadata/VolumeMetadata.json']);
    let selected = 0;
    for (const meta of metadata) {
      if (!isCapFileName(meta.file_name)) throw new Error('Invalid CAP case filename');
      const jsonPath = `json/${meta.file_name}.json`; const htmlPath = `html/${meta.file_name}.html`;
      if (expected.has(jsonPath)) throw new Error('Duplicate CAP case filename');
      expected.add(jsonPath); expected.add(htmlPath);
      const record = CaselawCase.parse(parse(jsonPath));
      if (!archive.files.has(htmlPath)) throw new Error(`Missing CAP ZIP entry: ${htmlPath}`);
      const { casebody, ...actualMeta } = record;
      if (digest(actualMeta) !== digest(meta)) throw new Error(`CAP ${record.id}: case/index metadata differs`);
      if (ids.has(record.id)) throw new Error(`Duplicate CAP case ID ${record.id}; review overlapping source selections`);
      ids.add(record.id);
      if ((m.source.jurisdictions.length && !m.source.jurisdictions.includes(record.jurisdiction.id)) || (m.source.courts.length && !m.source.courts.includes(record.court.id))) continue;
      selected++;
      mapping.set(`/${volume.reporter}/${volume.volume}/${record.file_name}`, casePath(record));
      records.push({ record, volume, url, jsonBytes: archive.files.get(jsonPath), htmlBytes: archive.files.get(htmlPath) });
    }
    if (archive.files.size !== expected.size || [...archive.files.keys()].some(p => !expected.has(p))) throw new Error('CAP ZIP has cases not present in its metadata index');
    archives.push({ url, sha256: volume.sha256, cases: metadata.length, selected, compressedBytes: bytes.length, expandedBytes: archive.expandedBytes });
  }
  const files = []; const topics = new Map(); let outputBytes = 0;
  for (const item of records.sort((a, b) => a.record.id - b.record.id)) {
    const { record, volume, url, jsonBytes, htmlBytes } = item;
    const path = casePath(record);
    const license = licenseFor(m, path);
    const result = await normalizeCaselaw(record, htmlBytes, { ...volume, mapping });
    outputBytes += Buffer.byteLength(result.markdown);
    if (outputBytes > m.sync.maxTotalBytes) throw new Error('CAP normalized output exceeds byte budget');
    const provenance = { path, sha256: sha256(result.markdown), sourceSha256: sha256(htmlBytes), sourceUrl: result.sourceUrl,
      sourceRevision: volume.sha256, license: license.id, attribution: license.attribution, transformation: result.transformation,
      ...(record.last_updated ? { sourceUpdatedAt: record.last_updated } : {}),
      caselaw: { caseId: record.id, archiveUrl: url, archiveSha256: volume.sha256, jsonSha256: sha256(jsonBytes), htmlSha256: sha256(htmlBytes) },
    };
    files.push({ path, bytes: Buffer.from(result.markdown), provenance });
    const jurisdiction = `jurisdiction-${record.jurisdiction.id}`;
    for (const [dir, title] of [[jurisdiction, record.jurisdiction.name_long || record.jurisdiction.name], [`${jurisdiction}/court-${record.court.id}`, record.court.name]]) {
      const topicPath = `${dir}/_topic.yaml`; const bytes = Buffer.from(stringify({ name: title }));
      if (topics.has(topicPath)) {
        if (!topics.get(topicPath).bytes.equals(bytes)) throw new Error('CAP court/jurisdiction names disagree');
        continue;
      }
      topics.set(topicPath, { path: topicPath, bytes, provenance: { ...provenance, path: topicPath, sha256: sha256(bytes), sourceSha256: sha256(jsonBytes), sourceUrl: `https://static.case.law/${volume.reporter}/${volume.volume}/cases/${encodeURIComponent(record.file_name)}.json`, transformation: `${CASELAW_NORMALIZER}; source jurisdiction/court name -> topic YAML` } });
    }
  }
  if (!records.length) throw new Error('CAP selection contains no cases');
  legal.push({ path: 'LICENSES/caselaw-selection.json', bytes: Buffer.from(json({ schemaVersion: 1, normalizer: CASELAW_NORMALIZER, archives, selectedCases: records.length, filters: { jurisdictions: m.source.jurisdictions, courts: m.source.courts } })) });
  return { files: [...files, ...topics.values()], legal, revision: digest(archives.map(a => ({ url: a.url, sha256: a.sha256 }))) };
}
