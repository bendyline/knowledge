import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { catalogs } from './catalogs.mjs';
import { exists, readJson, walk } from './files.mjs';

const begin = '<!-- BEGIN CATALOG LICENSES -->';
const end = '<!-- END CATALOG LICENSES -->';
const urlPath = (path) => path.split('/').map(encodeURIComponent).join('/');

export function catalogLicenseSection(items) {
  return items.map(({ key, manifest: m }) => {
    const base = `https://github.com/${m.publish.github}/blob/main/catalogs/${urlPath(key)}`;
    const source = m.source.type === 'github' ? `https://github.com/${m.source.repository}`
      : m.source.type === 'wikipedia' ? `https://${m.source.language}.wikipedia.org/` : m.source.type.startsWith('caselaw') ? 'https://static.case.law/' : m.source.type === 'gutenberg' ? 'https://www.gutenberg.org/ (public-domain transcriptions; Project Gutenberg license and trademark text removed)' : `${base}/manifest.json`;
    const lines = [
      `${m.name} (${key})`,
      `Catalog ID: ${m.id}`,
      `Source: ${source}`,
      `Catalog definition: ${base}/manifest.json`,
    ];
    if (m.build.packaging?.type === 'wikipedia-news') lines.push(`Package coverage: ${m.id} and ${m.id}-YYYY-qN quarterly archives share these content licenses.`);
    for (const license of m.licensing.licenses) lines.push(
      `License: ${license.name} (${license.spdx}; record: ${license.id})`,
      `Terms: ${license.url}`,
      `Full license text: ${base}/${urlPath(license.text)}`,
      `Attribution: ${license.attribution}`,
    );
    lines.push(`Catalog notices and modification details: ${base}/${urlPath(m.licensing.notice)}`);
    return lines.join('\n');
  }).join('\n\n');
}

export async function datasetLicense(root, { check = true } = {}) {
  const current = (await readFile(resolve(root, 'LICENSE'), 'utf8')).replaceAll('\r\n', '\n');
  if (current.split(begin).length !== 2 || current.split(end).length !== 2 || current.indexOf(end) < current.indexOf(begin)) throw new Error('LICENSE must have exactly one ordered pair of catalog license markers');
  const items = await catalogs(root, undefined, { disabled: true });
  const sections = [catalogLicenseSection(items)];
  const collections = resolve(root, 'collections/caselaw');
  if (await exists(collections)) for (const file of await walk(collections)) {
    if (!file.endsWith('/collection.json')) continue;
    const config = await readJson(resolve(collections, file));
    if (!config.publish?.enabled) continue;
    sections.push(`${config.name}\nCollection ID: ${config.id}\nPackage coverage: ${config.id}-part-NNNN archives share these content licenses.\nSource: https://static.case.law/\nCollection definition: https://github.com/${config.publish.github}/blob/main/collections/caselaw/${urlPath(file)}\nLicense: CC0 1.0 Universal (CC0-1.0)\nTerms: https://creativecommons.org/publicdomain/zero/1.0/\nFull license text and source evidence: included in every archive's LICENSES directory.\nAttribution: Caselaw Access Project, Harvard Law School Library; credit is voluntary under CAP community norms.\nScope: ${config.scopeNote ?? 'Historical CAP records selected by source jurisdiction.'}`);
  }
  const expected = `${current.slice(0, current.indexOf(begin))}${begin}\n${sections.join('\n\n')}\n${current.slice(current.indexOf(end))}`;
  if (check && current !== expected) throw new Error('Catalog license summary is stale; run npm run licenses and commit LICENSE');
  return expected;
}
