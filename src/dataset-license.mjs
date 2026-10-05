import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { catalogs } from './catalogs.mjs';

const begin = '<!-- BEGIN CATALOG LICENSES -->';
const end = '<!-- END CATALOG LICENSES -->';
const urlPath = (path) => path.split('/').map(encodeURIComponent).join('/');

export function catalogLicenseSection(items) {
  return items.map(({ key, manifest: m }) => {
    const base = `https://github.com/${m.publish.github}/blob/main/catalogs/${urlPath(key)}`;
    const source = m.source.type === 'github' ? `https://github.com/${m.source.repository}`
      : m.source.type === 'wikipedia' ? `https://${m.source.language}.wikipedia.org/` : `${base}/manifest.json`;
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
  const expected = `${current.slice(0, current.indexOf(begin))}${begin}\n${catalogLicenseSection(items)}\n${current.slice(current.indexOf(end))}`;
  if (check && current !== expected) throw new Error('Catalog license summary is stale; run npm run licenses and commit LICENSE');
  return expected;
}
