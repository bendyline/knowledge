import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { loadNormalizedMarkdown } from '../src/markdown-loader.mjs';

test('omitted images permit literal examples but still reject rendered missing images', async () => {
  await mkdir('.work/tests', { recursive: true });
  const root = await mkdtemp(resolve('.work/tests/images-'));
  const text = '# Article\n\n<!-- ![Hidden](missing.png) -->\n\n`![Example](sample.png)`\n';
  await writeFile(resolve(root, 'article.md'), text);
  const result = await loadNormalizedMarkdown(root, { language: 'en', toc: { format: 'folders' } }, { images: 'omit' });
  assert.equal(result.documents[0].markdown, text);
  assert.equal(result.assets.length, 0);
  await writeFile(resolve(root, 'article.md'), '# Article\n\n![Actual image](missing.png)\n');
  await assert.rejects(loadNormalizedMarkdown(root, { language: 'en', toc: { format: 'folders' } }, { images: 'omit' }), /rendered image remains/);
  await assert.rejects(loadNormalizedMarkdown(root, { language: 'en', toc: { format: 'folders' } }, { images: 'preserve' }), /does not exist/);
  await writeFile(resolve(root, 'article.md'), '# Article\n\n' + Array.from({ length: 250 }, (_, i) => `[Missing](missing-${i}.md)\n`).join('') + '\n![Actual image](missing.png)\n');
  await assert.rejects(loadNormalizedMarkdown(root, { language: 'en', toc: { format: 'folders' } }, { images: 'omit' }), /rendered image remains/);
});
