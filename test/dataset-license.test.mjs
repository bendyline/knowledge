import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { catalogLicenseSection, datasetLicense } from '../src/dataset-license.mjs';
import { fixture } from './helpers.mjs';
import { writeJson } from '../src/files.mjs';

test('dataset overview retains general terms and detects license metadata changes', async () => {
  const c = await fixture();
  const path = resolve(c.root, 'LICENSE');
  const general = 'General terms must be preserved.\n\n';
  await writeFile(path, `${general}<!-- BEGIN CATALOG LICENSES -->\n<!-- END CATALOG LICENSES -->\n`);
  await assert.rejects(datasetLicense(c.root), /summary is stale/);
  await writeFile(path, await datasetLicense(c.root, { check: false }));
  assert.ok((await datasetLicense(c.root)).startsWith(general));
  c.manifest.licensing.licenses[0].attribution = 'Updated source attribution';
  await writeJson(resolve(c.dir, 'manifest.json'), c.manifest);
  await assert.rejects(datasetLicense(c.root), /summary is stale/);
  const revised = await datasetLicense(c.root, { check: false });
  assert.match(revised, /Updated source attribution/);
  await writeFile(path, revised + '<!-- BEGIN CATALOG LICENSES -->\n');
  await assert.rejects(datasetLicense(c.root), /exactly one ordered pair/);
});

test('mixed catalog licenses and quarterly families retain all records and notice links', async () => {
  const keys = ['microsoftdocs/azure-ai-search-en', 'wikipedia/on-this-day-en'];
  const items = await Promise.all(keys.map(async (key) => ({ key, manifest: JSON.parse(await readFile(`catalogs/${key}/manifest.json`, 'utf8')) })));
  const text = catalogLicenseSection(items);
  for (const { manifest } of items) for (const license of manifest.licensing.licenses) {
    assert.ok(text.includes(license.spdx));
    assert.ok(text.includes(license.attribution));
    assert.ok(text.includes(license.text));
  }
  assert.match(text, /wikipedia-on-this-day-en-YYYY-qN/);
  assert.match(text, /azure-ai-search-en\/NOTICE\.md/);
  assert.match(text, /on-this-day-en\/NOTICE\.md/);
});
