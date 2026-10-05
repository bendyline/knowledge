import test from 'node:test';
import assert from 'node:assert/strict';
import { docfxYamlToMarkdown, rewriteDocfxToc, normalizeDocfxMarkdown } from '../src/sources/docfx.mjs';
import { hasUnresolvedDocfx } from '../src/catalogs.mjs';

test('DocFX landing and FAQ bodies become Markdown and navigation links follow the converted paths', () => {
  const landing = '### YamlMime:Landing\ntitle: Example\nlandingContent:\n- title: Start\n  linkLists:\n  - links:\n    - text: FAQ\n      url: faq.yml\n';
  assert.match(docfxYamlToMarkdown(landing, 'index.yml'), /\[FAQ\]\(faq.yml\)/);
  const faq = '### YamlMime:FAQ\ntitle: FAQ\nsections:\n- name: General\n  questions:\n  - question: What is search?\n    answer: Finding relevant information.\n';
  assert.match(docfxYamlToMarkdown(faq, 'faq.yml'), /### What is search\?\n\nFinding relevant information/);
  assert.match(rewriteDocfxToc('items:\n- name: FAQ\n  href: faq.yml\n', 'toc.yml', new Map(), (url) => url.replace('.yml', '.md')), /href: faq.md/);
});
test('portable DocFX output retains content and rejects remaining live directives', () => {
  const source = '::: zone pivot="python"\n> [!NOTE]\n> Keep text.\n| Diagram | :::image source="x.png" alt-text="Important detail"::: |\n:::zone-end\n';
  const result = normalizeDocfxMarkdown(source, { images: 'omit' });
  assert.match(result, /Important detail/); assert.match(result, /Applies to: python/);
  assert.equal(hasUnresolvedDocfx(result), false);
  assert.equal(hasUnresolvedDocfx('<!-- :::image source="hidden.png"::: -->'), false);
  assert.equal(hasUnresolvedDocfx(':::image source="live.png":::'), true);
});
