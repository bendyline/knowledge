import test from 'node:test';
import assert from 'node:assert/strict';
import { convert } from '@bendyline/squisq-formats/registry';
import { rewriteMarkdownReferences } from '../vendor/squisq/contentReferences.mjs';
import { normalizeDocument, resolveSourceLink } from '../src/normalize.mjs';

test('reference edits preserve frontmatter and code, rewrite links, and omit images', () => {
  const input = '---\ntags: [one, two]\n---\n\n# Title\n\n[Guide](old.html#part) ![diagram](a.png) ![logo][image]\n\n[ref]: old.html\n[image]: a.png\n\n```md\n[untouched](old.html) ![](a.png)\n```\n';
  const output = rewriteMarkdownReferences(input, { images: 'omit', rewriteUrl: (u) => u.replace('old.html', 'new.md') });
  assert.ok(output.startsWith('---\ntags: [one, two]\n---\n'));
  assert.match(output, /\[Guide\]\(new.md#part\)/);
  assert.match(output, /diagram logo/);
  assert.match(output, /\[ref\]: new.md/);
  assert.ok(output.endsWith('```md\n[untouched](old.html) ![](a.png)\n```\n'));
});
test('nested image links and HTML references are edited structurally', () => {
  const input = '[![Logo](logo.png)](old.html)\n\n<a href="old.html"><img src="logo.png" alt="Logo"></a>\n';
  const output = rewriteMarkdownReferences(input, { images: 'omit', rewriteUrl: (u) => u === 'old.html' ? 'new.md' : u });
  assert.match(output, /\[Logo\]\(new.md\)/);
  assert.match(output, /href="new.md"/);
  assert.doesNotMatch(output, /<img|!\[/);
});
test('unchanged Markdown is byte-identical', () => {
  const input = 'Title\n=====\n\n+ A\n+ B\n\n`![x](y)`\n';
  assert.equal(rewriteMarkdownReferences(input), input);
});

test('synthesized autolinks can be rewritten without source positions', () => {
  const source = 'Before  *www\\.example.org* after.\n';
  assert.equal(rewriteMarkdownReferences(source, { rewriteUrl: () => 'https://example.org/news' }), 'Before  *[www.example.org](https://example.org/news)* after.\n');
});
test('HTML is sanitized and converted to Markdown during import', async () => {
  const result = await normalizeDocument(Buffer.from('<h1>Planet report</h1><p>Hello <b>world</b>.</p><script>bad()</script><p><img src="x.png" alt="Diagram"></p>'), 'report.html');
  assert.match(result.markdown, /# Planet report/);
  assert.match(result.markdown, /\*\*world\*\*/);
  assert.doesNotMatch(result.markdown, /bad\(\)|!\[/);
});
for (const format of ['docx', 'pdf']) test(`${format.toUpperCase()} converts to Markdown through Squisq`, async () => {
  const exported = await convert({ kind: 'markdown', markdown: '# Saturn report\n\nSaturn has rings.\n' }, format, { autoTemplates: false });
  const imported = await normalizeDocument(Buffer.from(exported.bytes), `report.${format}`);
  assert.match(imported.markdown, /Saturn/);
  assert.match(imported.markdown, /rings/);
});
test('local target links preserve fragments; missing targets point upstream', () => {
  const mapping = new Map([['docs/second.html', 'docs/second.md']]);
  assert.equal(resolveSourceLink('second.html#x', 'docs/first.md', 'docs/first.md', mapping, 'https://example.org/docs/first.md'), 'second.md#x');
  assert.equal(resolveSourceLink('../outside.md', 'docs/first.md', 'docs/first.md', mapping, 'https://example.org/docs/first.md'), 'https://example.org/outside.md');
});

test('normalization condenses tables after reference edits while retaining citations and code', async () => {
  const source = '| Page                  | Diagram         |\n| --------------------- | --------------- |\n| [Guide](old.html)[^n]  | ![Map](map.png) |\n\n[^n]: Wikipedia contributors, CC BY-SA.\n\n```md\n| Padded     |\n| ---------- |\n```\n';
  const { markdown, transformation } = await normalizeDocument(Buffer.from(source), 'source.md', { rewriteUrl: (url) => url === 'old.html' ? 'new.md' : url });
  assert.ok(markdown.startsWith('| Page | Diagram |\n| --- | --- |\n| [Guide](new.md)[^n] | Map |\n'));
  assert.ok(markdown.endsWith('[^n]: Wikipedia contributors, CC BY-SA.\n\n```md\n| Padded     |\n| ---------- |\n```\n'));
  assert.match(transformation, /condensed/);
});

test('HTML table conversion does not persist padding proportional to the longest cell', async () => {
  const long = 'Article facts. '.repeat(1000).trimEnd();
  const html = `<table><tr><th>Title</th></tr><tr><td>${long}</td></tr></table>`;
  const { markdown } = await normalizeDocument(Buffer.from(html), 'article.html');
  assert.ok(markdown.includes(long));
  assert.doesNotMatch(markdown, /-{4,}| {20,}/);
  assert.ok(markdown.length < long.length + 100);
});
