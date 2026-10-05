import test from 'node:test';
import assert from 'node:assert/strict';
import { fixture } from './helpers.mjs';
import { articleHtml, wikipediaSnapshot } from '../src/sources/wikipedia.mjs';
import { currentEventsSeeds, websiteArticle, mediaWikiClient } from '../src/sources/mediawiki.mjs';
import { wikipediaLegal, assessWikipediaRights } from '../src/licensing.mjs';
import { normalizeDocument } from '../src/normalize.mjs';
import { validateWikipediaSelection } from '../src/wikipedia-selection.mjs';
import { write, writeJson } from '../src/files.mjs';
import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';
import { mapWorkers } from '../src/worker-pool.mjs';
import { normalizeWikipediaPage } from '../src/sources/wikipedia-normalize.mjs';

test('Wikipedia traversal excludes navigation and non-article links', () => {
  const content = articleHtml('<p><a href="/wiki/Article">A</a><a href="/wiki/Help:Contents">Help</a></p><div class="navbox"><a href="/wiki/Noise">N</a></div>');
  assert.deepEqual(content.links, ['Article']);
  assert.doesNotMatch(content.html, /Noise/);
});

test('parallel Wikipedia normalization matches serial output and propagates missing-source failures', async () => {
  const c = await fixture();
  const stage = resolve(c.root, '.work/worker-inputs');
  const html = '<p><a href="./Example#History">Local</a> <a href="/wiki/Outside">External</a><img src="photo.png"></p>';
  const targets = new Map([['Example', 'articles/2.md']]);
  const inputs = [{ id: 1, title: 'Daily', date: '2026-10-03', path: 'days/2026-10-03.md', origin: 'https://en.wikipedia.org' }, { id: 2, title: 'Example', path: 'articles/2.md', origin: 'https://en.wikipedia.org' }];
  for (const page of inputs) await writeJson(resolve(stage, `${page.id}.json`), { html });
  const results = await mapWorkers(inputs, new URL('../src/sources/wikipedia-worker.mjs', import.meta.url), { workerData: { stage, targets }, concurrency: 2 });
  for (const [index, result] of results.entries()) assert.equal(await readFile(result.sourcePath, 'utf8'), (await normalizeWikipediaPage(html, inputs[index], targets)).markdown);
  await assert.rejects(mapWorkers([{ ...inputs[0], id: 3 }], new URL('../src/sources/wikipedia-worker.mjs', import.meta.url), { workerData: { stage, targets } }), /ENOENT/);
});

test('current-events windows are inclusive, UTC-based, and handle leap days', () => {
  const days = currentEventsSeeds({ days: 365, endDate: '2026-10-03' });
  assert.equal(days.length, 365);
  assert.equal(days[0].date, '2025-10-04');
  assert.equal(days.at(-1).title, 'Portal:Current events/2026 October 3');
  assert.deepEqual(currentEventsSeeds({ days: 3, endDate: '2024-03-01' }).map((d) => d.date), ['2024-02-28', '2024-02-29', '2024-03-01']);
  assert.equal(currentEventsSeeds({ days: 1, endDate: 'today' }, new Date('2026-10-03T23:59:00-07:00'))[0].date, '2026-10-04');
  assert.throws(() => currentEventsSeeds({ days: 1, endDate: '2026-02-30' }), /Invalid/);
});

test('cached website HTML pins the rendered revision and excludes site controls', () => {
  const html = '<script>var RLCONF={"wgArticleId":123,"wgRevisionId":456};</script><nav>Site menu</nav><div class="mw-parser-output">Coordinates only</div><div id="mw-content-text"><div class="mw-parser-output"><p>Article body</p></div></div><footer>Footer</footer>';
  const article = websiteArticle(html, 123);
  assert.equal(article.revid, 456);
  assert.match(article.html, /Article body/);
  assert.doesNotMatch(article.html, /Site menu|Footer|RLCONF|Coordinates only/);
  assert.throws(() => websiteArticle(html, 999), /identity changed/);
});

test('cached website downloads resume and use the actual rendered revision after an intervening edit', async () => {
  const c = await fixture();
  c.manifest.source = { language: 'en', userAgent: 'Example/1.0 (https://example.com)' };
  let downloads = 0;
  const download = async () => {
    downloads++;
    return { bytes: Buffer.from('<script>{"wgArticleId":123,"wgRevisionId":456}</script><div id="mw-content-text"><div class="mw-parser-output"><p>Body</p></div></div>') };
  };
  const first = mediaWikiClient(c, { download });
  const page = { pageid: 123, title: 'Article', revision: { revid: 455, timestamp: '2026-01-01T00:00:00Z' } };
  assert.match(await first.render(page), /Body/);
  assert.deepEqual(page.revision, { revid: 456 });
  const second = mediaWikiClient(c, { download });
  assert.match(await second.render(page), /Body/);
  assert.equal(downloads, 1);
  assert.equal(second.statistics.renderedCacheHits, 1);
});

test('daily news selection removes date navigation but retains content and attribution notices', () => {
  const content = articleHtml('<a href="/wiki/Date_navigation">Other day</a><div class="current-events-content"><p><a href="/wiki/Star_Trek:_Voyager">News</a></p><div class="metadata">Attribution notice</div></div>', { currentEvents: true });
  assert.deepEqual(content.links, ['Star Trek: Voyager']);
  assert.match(content.html, /Attribution notice/);
  assert.doesNotMatch(content.html, /Other day/);
  assert.throws(() => articleHtml('<p>Unexpected layout</p>', { currentEvents: true }), /no current-events-content/);
});

test('Wikipedia references become working Markdown footnotes and image file links are omitted', async () => {
  const cleaned = articleHtml('<p>Fact<sup><a href="#cite_note-1">[1]</a></sup><a href="https://en.wikipedia.org/wiki/File:Photo.jpg"><img src="photo.jpg" alt="Photo"></a></p><ol class="references"><li id="cite_note-1"><span class="mw-cite-backlink"><a href="#cite_ref-1">↑</a></span>Source one</li></ol><p>Other fact<sup><a href="#cite_note-2">[2]</a></sup></p><ol class="references"><li id="cite_note-2">Source two</li></ol>');
  const result = await normalizeDocument(Buffer.from(cleaned.html), 'article.html', { images: 'omit' });
  assert.match(result.markdown, /Fact\[\^cite_note-1\]/);
  assert.match(result.markdown, /\[\^cite_note-1\]: Source one/);
  assert.match(result.markdown, /\[\^cite_note-2\]: Source two/);
  assert.doesNotMatch(result.markdown, /File:Photo|cite_ref|!\[/);
});

test('repeated daily mentions and redirects download one canonical article without crawling its links', async () => {
  const c = await fixture();
  const seeds = currentEventsSeeds({ days: 2, endDate: '2026-10-03' });
  c.manifest.source = { type: 'wikipedia', language: 'en', currentEvents: { days: 2, endDate: '2026-10-03' }, depth: 1, maxPages: 3, userAgent: 'Example/1.0 (https://example.com)' };
  c.manifest.licensing.licenses[0].spdx = 'CC-BY-SA-4.0';
  const calls = [];
  const makePage = (title, id, ns = 0) => ({ pageid: id, title, ns, revisions: [{ revid: id * 10, timestamp: '2026-10-03T00:00:00Z' }] });
  const query = async (p) => {
    calls.push(p);
    if (p.action === 'query') {
      if (p.titles.includes('Portal:')) return { query: { pages: seeds.map((s, index) => makePage(s.title, index + 1, 100)) } };
      assert.deepEqual(p.titles.split('|').sort(), ['Hurricane Polo', 'Polo (hurricane)']);
      return { query: { redirects: [{ from: 'Polo (hurricane)', to: 'Hurricane Polo' }], pages: [makePage('Hurricane Polo', 3)] } };
    }
    return { parse: { revid: Number(p.oldid), text: p.oldid === '30' ? '<p>Hurricane Polo. <a href="/wiki/Second_degree">Do not fetch</a></p>' : `<div class="current-events-content"><p><a href="/wiki/${p.oldid === '10' ? 'Hurricane_Polo' : 'Polo_(hurricane)'}">Hurricane Polo</a></p></div>` } };
  };
  const result = await wikipediaSnapshot(c, { query, progress: () => {} });
  assert.deepEqual(result.files.map((f) => f.path), ['days/2026-10-02.md', 'days/2026-10-03.md', 'articles/3.md']);
  assert.equal(calls.filter((p) => p.action === 'parse' && p.oldid === '30').length, 1);
  assert.deepEqual(result.files[2].provenance.referredBy, ['1', '2']);
  for (const daily of result.files.slice(0, 2)) assert.match(daily.bytes.toString(), /\[Hurricane Polo\]\(\.\.\/articles\/3.md\)/);
  assert.match(result.files[2].bytes.toString(), /https:\/\/en.wikipedia.org\/wiki\/Second_degree/);
  const selection = JSON.parse(result.legal.find((f) => f.path.endsWith('selection.json')).bytes);
  assert.equal(selection.articlePages, 1);
  assert.deepEqual(selection.dailyPages.map((d) => d.articleIds), [[3], [3]]);
  await write(resolve(c.dir, 'LICENSES/selection.json'), JSON.stringify(selection));
  const provenance = result.files.map((f) => f.provenance);
  await validateWikipediaSelection(c, provenance);
  await assert.rejects(validateWikipediaSelection(c, [...provenance.slice(0, 2), { ...provenance[2], wikipediaPageId: 2 }]), /unique/);
  await assert.rejects(validateWikipediaSelection(c, [...provenance.slice(0, 2), { ...provenance[2], referredBy: ['1'] }]), /reachability/);
});

test('Wikipedia standard license is assessed automatically and an unexpected license fails closed', async () => {
  const c = await fixture();
  c.manifest.source = { type: 'wikipedia', language: 'en' };
  c.manifest.licensing.licenses[0].spdx = 'CC-BY-SA-4.0';
  const rights = { url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.en', text: 'Creative Commons Attribution-Share Alike 4.0' };
  const assessment = assessWikipediaRights(c.manifest, rights);
  assert.equal(assessment.approved, true);
  assert.ok(assessment.evidence[0].obligations.includes('same-license-for-adaptations'));
  assert.equal(wikipediaLegal(c.manifest, rights).length, 3);
  assert.throws(() => assessWikipediaRights(c.manifest, { url: 'https://creativecommons.org/licenses/by-nc/4.0/' }), /not the expected/);
});
test('Wikipedia records revisions, fixes article links, and refuses partial traversals', async () => {
  const c = await fixture();
  c.manifest.source = { type: 'wikipedia', language: 'en', seeds: ['Seed'], depth: 1, maxPages: 2, userAgent: 'Example/1.0 (https://example.com)' };
  c.manifest.licensing.licenses[0].spdx = 'CC-BY-SA-4.0';
  const query = async (p) => p.action === 'query'
    ? { query: { pages: [{ pageid: p.titles === 'Seed' ? 1 : 2, title: p.titles, revisions: [{ revid: p.titles === 'Seed' ? 10 : 20, timestamp: '2026-10-03T00:00:00Z' }] }] } }
    : { parse: { revid: Number(p.oldid), text: p.oldid === '10' ? '<h1>Seed</h1><p><a href="/wiki/Article">Article</a></p>' : '<h1>Article</h1><p>Body</p>' } };
  const result = await wikipediaSnapshot(c, { query });
  assert.equal(result.files.length, 2);
  assert.match(result.files[0].bytes.toString(), /\[Article\]\(2.md\)/);
  assert.equal(result.files[0].provenance.sourceRevision, '10');
  c.manifest.source.maxPages = 1;
  await assert.rejects(wikipediaSnapshot(c, { query }), /No partial snapshot/);
});
