import { getJson, request } from '../src/http.mjs';
import { sha256, writeJson, readJson } from '../src/files.mjs';
const revision = process.argv[2];
if (!/^[a-f0-9]{40}$/.test(revision ?? '')) throw new Error('Supply the reviewed SPDX license-list-data commit SHA');
const ids = ['MIT','Apache-2.0','BSD-2-Clause','BSD-3-Clause','ISC','CC0-1.0','CC-BY-3.0','CC-BY-4.0','CC-BY-SA-3.0','CC-BY-SA-4.0','CC-PDM-1.0'];
const licenses = [];
for (const id of ids) {
  const source = `https://raw.githubusercontent.com/spdx/license-list-data/${revision}/json/details/${id}.json`;
  const data = await getJson(source);
  licenses.push({ id, name: data.name, text: data.licenseText, source, textSha256: sha256(data.licenseText) });
}
// Creative Commons' own plaintext includes its explanatory preamble and exact
// clause lettering, which can differ from the SPDX rendering of the same terms.
for (const variant of ['by', 'by-sa']) {
  const source = `https://creativecommons.org/licenses/${variant}/4.0/legalcode.txt`;
  const text = (await request(source)).bytes.toString('utf8');
  const id = `CC-${variant.toUpperCase()}-4.0`;
  licenses.push({ id, name: id, text, source, textSha256: sha256(text) });
}
// Keep separately reviewed, exact renderings (for example PowerShell's Markdown
// CC BY 4.0 text). They are not fuzzy matches or permission to add conditions.
for (const variant of (await readJson('policy/license-references.json')).licenses.filter(l => l.review)) licenses.push(variant);
await writeJson('policy/license-references.json', { schemaVersion:1, revision, licenses });
console.log(`Pinned ${licenses.length} SPDX license reference texts at ${revision}`);
