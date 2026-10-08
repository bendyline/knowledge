import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import yazl from 'yazl';
import { readGithubArchive } from '../src/sources/github-archive.mjs';
import { digest, inventory, sha256 } from '../src/files.mjs';
const blob = b => createHash('sha1').update(`blob ${b.length}\0`).update(b).digest('hex');

test('GitHub archive selection is hash checked, bounded, and never executes source files', async () => {
  await mkdir('.work/tests', { recursive: true });
  const root = await mkdtemp(resolve('.work/tests/archive-'));
  const path = resolve(root, 'source.zip');
  const source = Buffer.from('# Preserved\n');
  const zip = new yazl.ZipFile();
  zip.addBuffer(source, 'repo-revision/docs/page.md');
  zip.addBuffer(Buffer.from('do not run'), 'repo-revision/install.sh');
  zip.end();
  const chunks = []; for await (const part of zip.outputStream) chunks.push(part);
  await writeFile(path, Buffer.concat(chunks));
  const selected = [['docs/page.md', { sha: blob(source) }]];
  const limits = { maxFileBytes: 1000, maxTotalBytes: 1000 };
  assert.deepEqual([...(await readGithubArchive(path, selected, limits)).keys()], ['docs/page.md']);
  await assert.rejects(readGithubArchive(path, [['docs/page.md', { sha: '0'.repeat(40) }]], limits), /blob mismatch/);
  await assert.rejects(readGithubArchive(path, [['missing.md', { sha: blob(source) }]], limits), /missing 1/);
  await assert.rejects(readGithubArchive(path, selected, { ...limits, maxTotalBytes: 1 }), /byte budget/);
});

test('inventory hashes use the same full-path order as snapshot manifests', async () => {
  await mkdir('.work/tests', { recursive: true });
  const root = await mkdtemp(resolve('.work/tests/order-'));
  for (const name of ['sample', 'sample.Cosmos']) {
    await mkdir(resolve(root, name)); await writeFile(resolve(root, name, 'page.md'), name);
  }
  const expected = ['sample.Cosmos', 'sample'].map(name => ({ path: `${name}/page.md`, sha256: sha256(name) }));
  assert.equal(digest(await inventory(root)), digest(expected));
});
