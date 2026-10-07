import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeCaselaw } from '../src/sources/caselaw-normalize.mjs';
import { auditCapText } from '../src/caselaw-audit.mjs';
import { parseMarkdown, extractPlainText, walkMarkdownTree } from '@bendyline/squisq/markdown';

const record = { id: 1, name: 'Example v. State', name_abbreviation: 'Example v. State', file_name: '0001-01',
  decision_date: '1954', jurisdiction: { id: 39, name: 'U.S.' }, court: { id: 1, name: 'Example Court' },
  citations: [{ type: 'official', cite: '347 U.S. 1' }], first_page: '1', last_page: '2',
  casebody: { opinions: [{ type: 'majority', author: '', text: 'Judgment.' }] } };
const source = head => `<section class="casebody"><section class="head-matter">${head}</section><article class="opinion" data-type="majority"><p>Judgment.</p></article></section>`;
const normalize = html => normalizeCaselaw(record, Buffer.from(html), { reporter: 'us', volume: '347' });

test('CAP records absent source footnote bodies without inventing their text or a target', async () => {
  const html = source('<p class="headnotes">Summary.<a class="footnotemark" href="#footnote_0_1">1</a></p>');
  const result = await normalize(html);
  assert.equal(auditCapText(result.markdown, html).textMatches, true);
  assert.deepEqual(auditCapText(result.markdown, html).missing, []);
  assert.match(result.markdown, /missingFootnoteReferences: 1/);
  assert.match(result.transformation, /absent note bodies retained as plain text/);
  assert.ok(!result.markdown.includes('(#cap-'));
  await assert.rejects(normalize(html.replace('</section><article', '<aside class="footnote">Existing note body without an ID.</aside></section><article')), /unresolved source anchor/);
  await assert.rejects(normalize(source('<p><a href="#missing-page">Page</a></p>')), /unresolved source anchor/);
});

test('CAP preserves existing notes when a separately numbered source note is absent', async () => {
  const html = source('<p>Caption<a class="footnotemark" href="#footnote_0_1" id="ref_footnote_0_1"><em>1</em></a>. Judgment affirmed<a class="footnotemark" href="#footnote_0_2">2</a>.</p><aside class="footnote" id="footnote_0_1" data-label="1"><a href="#ref_footnote_0_1">1</a><p>Reported in 81 Pac. 1058.</p></aside>');
  const result = await normalize(html);
  assert.deepEqual(auditCapText(result.markdown, html), { textMatches: true, fragmentLinks: 2, missing: [] });
  assert.match(result.markdown, /missingFootnoteReferences: 1/);
  assert.ok(extractPlainText(parseMarkdown(result.markdown)).includes('Reported in 81 Pac. 1058.'));
  for (const ambiguous of [
    html.replace('id="footnote_0_1"', ''),
    html.replace('data-label="1"', 'data-label="2"'),
    html.replace('data-label="1"', ''),
    html.replace('href="#ref_footnote_0_1">1', 'href="#ref_footnote_0_2">1'),
    html.replace('href="#footnote_0_2">2', 'href="#footnote_0_2">*'),
    source('<aside class="footnote" id="footnote_0_1" data-label="1"><a href="#ref_footnote_0_2">1</a>Ambiguous return link.</aside><p><a class="footnotemark" href="#footnote_0_2">2</a></p>'),
  ]) await assert.rejects(normalize(ambiguous), /unresolved source anchor/);
});

test('CAP malformed literal URLs keep their OCR text without synthetic invalid links', async () => {
  const bad = 'https://host^name.invalid/path';
  const html = source(`<p>See <em>${bad}</em>, and https://example.com/legal. <code>${bad}</code> <a href="https://example.com/case">Citation</a></p>`);
  const result = await normalize(html);
  assert.equal(auditCapText(result.markdown, html).textMatches, true);
  assert.match(result.markdown, /malformedLiteralUrls: 1/);
  assert.ok(result.markdown.includes('`' + bad + '`'));
  assert.ok(!result.markdown.includes('](' + bad));
  const document = parseMarkdown(result.markdown), links = [];
  assert.ok(extractPlainText(document).includes('https://example.com/legal'));
  walkMarkdownTree(document, node => { if (node.type === 'link') links.push(node.url); });
  assert.deepEqual(links, ['https://example.com/legal', 'https://example.com/case']);
});

test('CAP literal placeholders preserve emphasis flanking around OCR punctuation', async () => {
  for (const character of ['\\', '$', '{']) {
    const html = source(`<p>[r<em>${character}ecords, </em>maps. Other<em>words${character}</em>after.</p>`);
    const result = await normalize(html);
    assert.equal(auditCapText(result.markdown, html).textMatches, true);
    const marks = [];
    walkMarkdownTree(parseMarkdown(result.markdown), node => { if (node.type === 'emphasis') marks.push(extractPlainText(node)); });
    assert.deepEqual(marks.map(s => s.trim()), [`${character}ecords,`, `words${character}`]);
  }
});

test('CAP uppercase URL protocols survive formatted and bare source text without added escapes', async () => {
  for (const protocol of ['HTTP', 'HTTPS', 'HtTP', 'HtTPS']) {
    const url = `${protocol}://WWW.EXAMPLE.ORG/PATH/DOCUMENT.PDF`;
    const html = source(`<p><em>${url}</em> [${url}]. <a href="${url}">${url}</a> <code>${url}</code></p>`);
    const result = await normalize(html);
    assert.equal(auditCapText(result.markdown, html).textMatches, true);
    assert.deepEqual(auditCapText(result.markdown, html).missing, []);
  }
});
