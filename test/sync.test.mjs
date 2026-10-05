import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fixture, githubManifest } from './helpers.mjs';
import { expandIncludes, githubSnapshot } from '../src/sources/github.mjs';
import { applySnapshot, importDocument } from '../src/sync.mjs';
import { sha256, inventory, removeWork } from '../src/files.mjs';
import { validateCatalog } from '../src/catalogs.mjs';

test('include expansion rebases fragment links and leaves code samples alone', () => {
  const files = new Map([['includes/fragment.md', Buffer.from('[Guide](../docs/guide.md)\n')]]);
  const source = '[!INCLUDE [f](../includes/fragment.md)]\n\n```md\n[!INCLUDE [sample](missing.md)]\n```\n';
  const result = expandIncludes(source, 'docs/page.md', files);
  assert.match(result, /\[Guide\]\(guide.md\)/);
  assert.ok(result.endsWith('```md\n[!INCLUDE [sample](missing.md)]\n```\n'));
  assert.throws(() => expandIncludes(source, 'docs/page.md', files, [], () => false), /mixed-license/);
});

const revision = 'a'.repeat(40);
const snapshot = (text = '# First\n', rev = revision) => ({ revision: rev, legal: [], files: [{ path: 'docs/first.md', bytes: Buffer.from(text), provenance: { path: 'docs/first.md', sha256: sha256(text), sourceSha256: sha256(text), sourceUrl: 'https://example.com/first.md', sourceRevision: rev, license: 'mit', attribution: 'Example author', transformation: 'none' } }] });

async function syncedFixture() {
  const c = await fixture();
  c.manifest = githubManifest(c.manifest);
  // fixture roots are always under .work/tests, so removal remains constrained.
  await removeWork(process.cwd(), resolve(c.dir, 'content'));
  await mkdir(resolve(c.dir, 'content'));
  return c;
}
test('sync applies additions, updates, and deletions; a repeated run is a no-op', async () => {
  const c = await syncedFixture();
  const initial = await applySnapshot(c, snapshot(), { apply: true });
  assert.deepEqual(initial.added, ['docs/first.md']);
  assert.equal((await applySnapshot(c, snapshot('# First\n', 'b'.repeat(40)), { apply: true })).changed, false);
  const updated = await applySnapshot(c, snapshot('# Updated\n'), { apply: true });
  assert.deepEqual(updated.updated, ['docs/first.md']);
  await validateCatalog(c);
  const next = snapshot('# Second\n');
  next.files[0].path = next.files[0].provenance.path = 'docs/second.md';
  await assert.rejects(applySnapshot(c, next, { apply: true }), /Deletion guard/);
  const deleted = await applySnapshot(c, next, { apply: true, allowDeletions: true });
  assert.deepEqual(deleted.removed, ['docs/first.md']);
  assert.deepEqual((await inventory(resolve(c.dir, 'content'))).map((f) => f.path), ['docs/second.md']);
});
test('dry runs, empty snapshots, collisions, and local edits preserve content', async () => {
  const c = await syncedFixture();
  await applySnapshot(c, snapshot(), { apply: true });
  const original = await readFile(resolve(c.dir, 'content/docs/first.md'), 'utf8');
  await applySnapshot(c, snapshot('# Later\n'));
  assert.equal(await readFile(resolve(c.dir, 'content/docs/first.md'), 'utf8'), original);
  await assert.rejects(applySnapshot(c, { revision, legal: [], files: [] }, { apply: true }), /no Markdown/);
  const duplicate = snapshot(); duplicate.files.push(duplicate.files[0]);
  await assert.rejects(applySnapshot(c, duplicate), /collision/);
  await writeFile(resolve(c.dir, 'content/docs/first.md'), '# Local edit\n');
  await assert.rejects(applySnapshot(c, snapshot(), { apply: true }), /local edits/);
});
test('GitHub sync checks licenses before downloading documents and pins all requests', async () => {
  const c = await fixture(); c.manifest = githubManifest(c.manifest);
  const api = async (path) => {
    if (path === '/repos/example/docs') return { private: false };
    if (path.includes('/commits/')) return { sha: revision, commit: { tree: { sha: 'root' } } };
    if (path.endsWith('/trees/root')) return { tree: [{ path: 'docs', type: 'tree', sha: 'subtree' }] };
    return { tree: [{ path: 'first.html', type: 'blob', mode: '100644', size: 30 }] };
  };
  const urls = [];
  const download = async (url) => { urls.push(url); return { bytes: Buffer.from(url.endsWith('LICENSE') ? 'MIT example' : '<h1>Article</h1><p>Content</p>') }; };
  const result = await githubSnapshot(c, { api, download });
  assert.equal(result.files[0].path, 'docs/first.md');
  assert.ok(urls.every((u) => u.includes(revision)));
  c.manifest.source.paths = ['.'];
  assert.equal((await githubSnapshot(c, { api, download })).files[0].path, 'first.md');
  await assert.rejects(githubSnapshot(c, { api, download: async () => ({ bytes: Buffer.from('changed terms') }) }), /license\/notice changed/);
  await assert.rejects(githubSnapshot(c, { api: async () => ({ private: true }) }), /Only public/);
});
test('manual import previews and writes Markdown, never raw HTML', async () => {
  const c = await fixture();
  const input = resolve(c.root, 'source.html');
  await writeFile(input, '<h1>Imported example</h1><p>Original text.</p>');
  await importDocument(c, { file: input, target: 'imported.md', sourceUrl: 'https://example.com/source.html', apply: true });
  const files = await inventory(resolve(c.dir, 'content'));
  assert.ok(files.some((f) => f.path === 'imported.md'));
  assert.ok(!files.some((f) => f.path.endsWith('.html')));
  await validateCatalog(c);
});
