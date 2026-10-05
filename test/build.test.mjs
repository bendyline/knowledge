import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { buildCatalog } from '../src/build.mjs';
import { extractGezkVerified, CatalogHandle } from '../src/toolchain.mjs';
import { publishPlan } from '../src/publish.mjs';
import { gildeDefinitions } from '../src/gilde.mjs';
import { verifyRelease } from '../src/verify.mjs';
import { fixture, fakeEmbedder } from './helpers.mjs';

test('real compiler produces a validated archive with notices, provenance, and retrieval', async () => {
  const c = await fixture();
  const options = { version: '2026.10.1', createdAt: '2026-10-03T00:00:00Z', embedderFactory: fakeEmbedder };
  const release = await buildCatalog(c, options);
  assert.equal(release.manifest.counts.documents, 3);
  assert.equal((await buildCatalog(c, options)).reused, true);
  assert.equal((await verifyRelease(c, release.directory)).integrity, true);
  assert.throws(() => publishPlan(release), /Test embeddings/);
  const extracted = resolve(c.root, '.work/extracted');
  await extractGezkVerified(resolve(release.directory, release.archive), extracted);
  assert.match(await readFile(resolve(extracted, 'LICENSES/MIT.txt'), 'utf8'), /Permission is hereby granted/);
  const handle = CatalogHandle.open(extracted);
  try { assert.ok(handle.searchDocumentsFts('Catalog organization').some((h) => h.documentId === 'organization')); } finally { handle.close(); }
  await writeFile(resolve(c.dir, 'content/new.md'), '# New document\n');
  await assert.rejects(buildCatalog(c, options), /different inputs/);
});
test('Gilde uses immutable coordinates and preserves human curation', async () => {
  const c = await fixture();
  const built = await buildCatalog(c, { version: '2026.10.1', createdAt: '2026-10-03T00:00:00Z', embedderFactory: fakeEmbedder });
  const release = { ...built, testOnly: false };
  const receipt = { sha256: release.sha256, huggingface: { repo: 'Bendyline/knowledge', revision: 'a'.repeat(40), path: 'catalogs/example/releases/2026.10.1/example.gezk' }, github: { url: 'https://github.com/bendyline/knowledge/releases/tag/example' } };
  const definitions = gildeDefinitions(release, receipt, { recoScore: 7, tags: ['curated'], yankedVersions: ['2026.9.1'] });
  const identity = [...definitions.values()][0]; const version = [...definitions.values()][1];
  assert.equal(identity.recoScore, 7); assert.deepEqual(identity.tags, ['curated']); assert.deepEqual(identity.yankedVersions, ['2026.9.1']);
  assert.equal(version.huggingface.revision, 'a'.repeat(40)); assert.equal(version.sha256, release.sha256);
  assert.throws(() => gildeDefinitions(release, { ...receipt, github: undefined }), /Both publication targets/);
  assert.throws(() => gildeDefinitions(release, { ...receipt, huggingface: { ...receipt.huggingface, revision: 'main' } }), /40|pattern|Invalid/);
});
