import test from 'node:test';
import assert from 'node:assert/strict';
import { cachedEmbedder } from '../src/embedding-cache.mjs';
import { fixture } from './helpers.mjs';
import { digest, writeJson } from '../src/files.mjs';
import { resolve } from 'node:path';

test('embedding cache persists exact vectors, deduplicates batches, and separates runtimes', async () => {
  const { root } = await fixture();
  const calls = [];
  const embedder = { profile: { dimensions: 2 }, embed: async texts => { calls.push(texts); return texts.map(t => [Math.PI, t.length]); } };
  const first = await cachedEmbedder(embedder, root);
  assert.deepEqual(await first(['one', 'one', 'two']), [[Math.PI, 3], [Math.PI, 3], [Math.PI, 3]]);
  first.dispose();
  const second = await cachedEmbedder(embedder, root);
  assert.deepEqual(await second(['one']), [[Math.PI, 3]]);
  second.dispose();
  assert.deepEqual(calls, [['one', 'two']]);
  const gpu = await cachedEmbedder(embedder, root, { runtime: 'dml' });
  await gpu(['one']); gpu.dispose();
  assert.deepEqual(calls, [['one', 'two'], ['one']]);
});

test('embedding cache imports legacy vectors and rejects malformed model output', async () => {
  const { root } = await fixture();
  const embedder = { profile: { dimensions: 2 }, embed: async () => [[NaN, 1]] };
  const profileDigest = digest({ profile: embedder.profile, node: process.version, testOnly: false });
  const key = digest({ profileDigest, text: 'legacy' });
  await writeJson(resolve(root, '.work/embeddings', profileDigest, `${key}.json`), [Math.E, 7]);
  const cache = await cachedEmbedder(embedder, root);
  try {
    assert.deepEqual(await cache(['legacy']), [[Math.E, 7]]);
    await assert.rejects(cache(['new']), /Invalid embedding/);
  } finally { cache.dispose(); }
});
