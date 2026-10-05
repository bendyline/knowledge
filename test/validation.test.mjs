import test from 'node:test';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fixture } from './helpers.mjs';
import { inside } from '../src/files.mjs';
import { validateCatalog, licenseFor, parseYaml } from '../src/catalogs.mjs';

test('content rejects unnormalized documents and unlicensed files', async () => {
  const c = await fixture();
  await writeFile(resolve(c.dir, 'content/raw.html'), '<h1>Raw</h1>');
  await assert.rejects(validateCatalog(c), /use import\/sync/);
  c.manifest.licensing.rules = [{ include: ['*.md'], license: 'mit' }];
  assert.throws(() => licenseFor(c.manifest, 'asset.png'), /exactly one applicable license/);
});
test('paths cannot escape roots or create Windows special files', () => {
  for (const path of ['../secret', 'C:/secret', 'a\\b', 'a/../b', 'con', 'name:stream', 'a.']) assert.throws(() => inside(process.cwd(), path), /Unsafe|escapes/);
});
test('unsafe YAML cannot expand aliases or execute custom tags', () => {
  assert.throws(() => parseYaml('a: &x [1,2]\nb: *x', 'sample'), /alias|Alias/);
  assert.throws(() => parseYaml('a: !!js/function alert', 'sample'), /tag|Tag/);
});
