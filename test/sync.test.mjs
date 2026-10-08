import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fixture, githubManifest } from './helpers.mjs';
import { expandIncludes, githubSnapshot } from '../src/sources/github.mjs';
import { applySnapshot, importDocument } from '../src/sync.mjs';
import { sha256, inventory, removeWork } from '../src/files.mjs';
import { hasUnresolvedDocfx, validateCatalog } from '../src/catalogs.mjs';

test('include expansion rebases fragment links and leaves code samples alone', () => {
  const files = new Map([['includes/fragment.md', Buffer.from('[Guide](../docs/guide.md)\n')]]);
  const source = '[!INCLUDE [f](../includes/fragment.md)]\n\n```md\n[!INCLUDE [sample](missing.md)]\n```\n';
  const result = expandIncludes(source, 'docs/page.md', files);
  assert.match(result, /\[Guide\]\(guide.md\)/);
  assert.ok(result.endsWith('```md\n[!INCLUDE [sample](missing.md)]\n```\n'));
  assert.throws(() => expandIncludes(source, 'docs/page.md', files, [], () => false), /mixed-license/);
});

const revision = 'a'.repeat(40);
test('rendered include mode keeps commented examples literal while expanding real includes', () => {
  const fragment = 'Preserved text.\n\n<!-- Example: [!INCLUDE [](fragment.md)] -->\n';
  const files = new Map([['docs/fragment.md', Buffer.from(fragment)]]);
  const input = '[!INCLUDE [](fragment.md)]\n\n`[!INCLUDE [](missing.md)]`\n';
  assert.equal(expandIncludes(input, 'docs/page.md', files, [], undefined, { skipComments: true }), fragment + '\n\n`[!INCLUDE [](missing.md)]`\n');
  assert.throws(() => expandIncludes(input, 'docs/page.md', files), /Cyclic/);
  assert.throws(() => expandIncludes('[!INCLUDE [](page.md)]', 'docs/page.md', new Map([['docs/page.md', Buffer.from('[!INCLUDE [](page.md)]')]]), [], undefined, { skipComments: true }), /Cyclic/);
});
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

test('DocFX preservation keeps complete code files, resolves local UIDs, and reports missing dependencies', async () => {
  const c = await fixture(); c.manifest = githubManifest(c.manifest);
  c.manifest.normalization = { images: 'omit', docfx: true, docfxReferences: 'preserve', docfxMetadataMaxBytes: 1024 };
  c.manifest.source.codeFiles = ['docs/*.cs'];
  c.manifest.source.docfxRoot = 'fallback';
  c.manifest.source.publishedBaseUrl = 'https://learn.microsoft.com/example/';
  const raw = new Map([
    ['docfx.json', '{}'],
    ['page.md', '# Page\n\n[!code-csharp[Sample](Sample.CS?name=snippet)]\n\n<xref:local.topic>\n\n[!INCLUDE [missing](external.md)]\n\n[Outside](../other/page.md)\n\n[Learn](/dotnet/overview)\n\n[Root](~/Target.md)\n\n[Mixed case](Target.MD)\n'],
    ['target.md', '---\nuid: local.topic\n---\n\n# Target\n'],
    ['sample.cs', 'Console.WriteLine("Preserved");\n'],
    ['unicode.cs', Buffer.from('\ufeff// München 東京\r\n', 'utf16le')],
    ['metadata.md', `---\naliases: [${'old-url,'.repeat(300)}last-url]\n---\n# Metadata\nOriginal body.\n`],
  ]);
  const api = async path => {
    if (path === '/repos/example/docs') return { private: false };
    if (path.includes('/commits/')) return { sha: revision, commit: { tree: { sha: 'root' } } };
    if (path.endsWith('/trees/root')) return { tree: [{ path: 'docs', type: 'tree', sha: 'docs' }] };
    return { tree: [...raw].map(([path,text]) => ({ path, type: 'blob', mode: '100644', size: Buffer.byteLength(text) })) };
  };
  const download = async url => ({ bytes: Buffer.from(url.endsWith('/LICENSE') ? 'MIT example' : raw.get(url.split('/').at(-1))) });
  const result = await githubSnapshot(c, { api, download });
  const content = new Map(result.files.map(f => [f.path, f.bytes.toString()]));
  assert.match(content.get('docs/page.md'), /\.\.\/_code\/docs\/sample\.cs\.md/);
  assert.match(content.get('docs/page.md'), /\[local\.topic\]\(target\.md\)/);
  assert.match(content.get('docs/page.md'), /Include unavailable in this source snapshot/);
  assert.ok(content.get('docs/page.md').includes(`https://github.com/example/docs/blob/${revision}/other/page.md`));
  assert.match(content.get('docs/page.md'), /https:\/\/learn\.microsoft\.com\/dotnet\/overview/);
  assert.match(content.get('docs/page.md'), /\[Root\]\(target\.md\)/);
  assert.match(content.get('docs/page.md'), /\[Mixed case\]\(target\.md\)/);
  assert.match(content.get('_code/docs/sample.cs.md'), /Console\.WriteLine\("Preserved"\);/);
  assert.match(content.get('_code/docs/unicode.cs.md'), /München 東京\n/);
  assert.match(result.files.find(f => f.path === '_code/docs/unicode.cs.md').provenance.transformation, /decoded from utf-16le/);
  const report = JSON.parse(result.legal.find(f => f.path.endsWith('import-report.json')).bytes);
  assert.ok(report.unresolved.some(e => e.path === 'docs/page.md' && e.kind === 'Include' && e.target === 'external.md'));
  assert.ok(report.unresolved.some(e => e.path === 'docs/metadata.md' && e.kind === 'Original metadata retained as code'));
  assert.match(content.get('docs/metadata.md'), /Original body\./);
  assert.match(content.get('docs/metadata.md'), /```text\n---\naliases:/);
  // The versioned profile leaves legacy snapshots unchanged while accepting
  // source-empty fragments and long DocFX files with sibling version sections.
  c.manifest.normalization.docfxProfile = 'rendered-v1';
  raw.set('empty.md', '\n');
  raw.set('boundary.md', '---\ntitle: Whitespace boundary\n--- \n# Original body\n\n---\nMore body.\n');
  raw.set('versions.md', Array.from({ length: 160 }, (_, i) => `:::moniker range="v${i}"\nText ${i}.\n:::moniker-end\n`).join('\n'));
  const rendered = await githubSnapshot(c, { api, download });
  const empty = rendered.files.find(f => f.path === 'docs/empty.md');
  assert.match(empty.bytes.toString(), /Empty source document/);
  assert.equal(empty.provenance.sourceSha256, sha256('\n'));
  assert.match(rendered.files.find(f => f.path === 'docs/versions.md').bytes.toString(), /Text 159\./);
  assert.match(rendered.files.find(f => f.path === 'docs/boundary.md').bytes.toString(), /^---\ntitle: Whitespace boundary\n---\n# Original body/);
  c.manifest.normalization.docfxProfile = 'rendered-v2';
  raw.set('malformed.md', '# Article\nBody. [!INCLUDE public preview disclaimer]\n\n<!--::: zone-end\n');
  const tolerant = await githubSnapshot(c, { api, download });
  const malformed = tolerant.files.find(f => f.path === 'docs/malformed.md').bytes.toString();
  assert.match(malformed, /Body\./);
  assert.equal(hasUnresolvedDocfx(malformed), false);
  assert.ok(JSON.parse(tolerant.legal.find(f => f.path.endsWith('import-report.json')).bytes).unresolved.some(e => e.path === 'docs/malformed.md' && e.kind === 'Malformed reference retained as code'));
});

test('DocFX validation checks rendered text separately from YAML metadata', () => {
  assert.equal(hasUnresolvedDocfx('---\ndescription: See <xref:System.String>\n---\n# Article\n'), false);
  assert.equal(hasUnresolvedDocfx('---\ntitle: Article\n---\nSee <xref:System.String>\n'), true);
  assert.equal(hasUnresolvedDocfx('<!--::: zone-end\n'), false);
  assert.equal(hasUnresolvedDocfx('`<!--`\n\n<xref:Live.Reference>\n'), true);
});
