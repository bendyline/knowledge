import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { CatalogSchema } from '../src/schema.mjs';
import { bindPackageLinks, listPackages, newsPackagePlan, packageCatalogId, packageQueries, resolveBuildPackage } from '../src/news-packages.mjs';
import { buildCatalog, releaseDir } from '../src/build.mjs';
import { verifyRelease } from '../src/verify.mjs';
import { CatalogHandle, extractGezkVerified, knowledge } from '../src/toolchain.mjs';
import { sourceConfigDigest } from '../src/catalogs.mjs';
import { currentEventsSeeds } from '../src/sources/mediawiki.mjs';
import { digest, inventory, sha256, write, writeJson } from '../src/files.mjs';
import { fixture, fakeEmbedder } from './helpers.mjs';

const config = { type: 'wikipedia-news', latestMonths: 3, archiveQuarters: 6 };
function selection(start, end) {
  const count = (new Date(end) - new Date(start)) / 86400000 + 1;
  const dailyPages = currentEventsSeeds({ days: count, endDate: end }).map((d, i) => ({ date: d.date, pageId: i + 1, articleIds: [10000, 10001 + i] }));
  return { window: { start, end, days: count }, dailyPages, pages: count * 2 + 1, articlePages: count + 1, seedPages: count, depth: 1 };
}

test('packages use calendar months, completed quarters, leap dates and snapshot time', () => {
  const plan = newsPackagePlan(selection('2025-04-01', '2026-10-03'), config);
  assert.deepEqual(plan[0].window, { start: '2026-07-04', end: '2026-10-03', days: 92 });
  assert.deepEqual(plan.slice(1).map(p => p.key), ['2026-q3', '2026-q2', '2026-q1', '2025-q4', '2025-q3', '2025-q2']);
  assert.ok(plan.every(p => p.available));
  const leap = newsPackagePlan(selection('2023-12-01', '2024-05-31'), config);
  assert.equal(leap[0].window.start, '2024-03-01');
  assert.equal(leap[1].window.days, 91);
  const boundary = newsPackagePlan(selection('2026-01-01', '2026-03-31'), config);
  assert.equal(boundary[1].key, '2026-q1');
  assert.equal(boundary[1].available, true);
});

test('package plans deduplicate referents and report gaps rather than pretending a quarter is complete', () => {
  const corpus = selection('2025-10-04', '2026-10-03');
  const before = JSON.stringify(corpus);
  const plan = newsPackagePlan(corpus, config);
  assert.equal(plan[0].articlePages, 93);
  assert.equal(plan[0].documents, 185);
  assert.equal(plan[4].missingDays, 3);
  assert.equal(plan[4].available, false);
  assert.deepEqual(plan[4].missingRange, { first: '2025-10-01', last: '2025-10-03' });
  assert.equal(plan[5].availableDays, 0);
  assert.equal(JSON.stringify(corpus), before);
  corpus.dailyPages.splice(100, 1);
  assert.equal(newsPackagePlan(corpus, config)[3].missingDays, 1);
  assert.equal(plan[0].window.end, '2026-10-03');
});

test('package links stay local only for included documents and preserve code and external anchors', () => {
  const byPath = new Map([
    ['articles/2.md', { wikipediaPageId: 2, sourceUrl: 'https://en.wikipedia.org/wiki/Shared' }],
    ['articles/3.md', { wikipediaPageId: 3, sourceUrl: 'https://en.wikipedia.org/wiki/Outside' }],
  ]);
  const source = '# Test\n\n[Shared](../articles/2.md) [Outside](../articles/3.md#History)\n\n[ref]: ../articles/3.md\n\n[Outside again][ref]\n\n`[code](../articles/3.md)`\n';
  const result = bindPackageLinks(source, 'days/2026-10-01.md', byPath, new Set(['2']), { publisherId: 'bendyline', catalogId: 'news-2026-q3' });
  assert.match(result, /knowledge:\/\/bendyline\/news-2026-q3\/2/);
  assert.match(result, /https:\/\/en.wikipedia.org\/wiki\/Outside#History/);
  assert.match(result, /\[ref\]: https:\/\/en.wikipedia.org\/wiki\/Outside/);
  assert.match(result, /`\[code\]\(\.\.\/articles\/3.md\)`/);
  assert.throws(() => bindPackageLinks('[Unknown](99.md)', 'articles/2.md', byPath, new Set(['2']), { publisherId: 'bendyline', catalogId: 'news' }), /no corpus provenance/);
});

test('package selectors keep corpus policy unchanged and use separate release identities', async () => {
  const c = await fixture();
  const policy = sourceConfigDigest(c.manifest);
  c.manifest.build.packaging = config;
  assert.equal(sourceConfigDigest(c.manifest), policy);
  assert.equal(packageCatalogId(c), c.manifest.id);
  assert.equal(packageCatalogId(c, '2026-q3'), `${c.manifest.id}-2026-q3`);
  assert.throws(() => packageCatalogId(c, '../outside'), /Package must/);
  assert.notEqual(releaseDir(c, '2026.10.4'), releaseDir(c, '2026.10.4', '2026-q3'));
  await writeJson(resolve(c.dir, 'LICENSES/selection.json'), selection('2025-10-04', '2026-10-03'));
  const pkg = await resolveBuildPackage(c);
  assert.equal(pkg.documentIds.size, pkg.selection.pages);
  assert.equal(pkg.selection.seedPages, 92);
  assert.equal((await listPackages(c)).length, 7);
  await assert.rejects(resolveBuildPackage(c, '2025-q4'), /missing 3 daily pages/);
  await assert.rejects(resolveBuildPackage(c, '2024-q1'), /not in this snapshot/);
  assert.deepEqual(packageQueries([{ query: 'two', expectedDocumentIds: ['a', 'b'] }, { query: 'gone', expectedDocumentIds: ['c'] }], new Set(['a'])), [{ query: 'two', expectedDocumentIds: ['a'] }]);
  assert.throws(() => CatalogSchema.parse(c.manifest), /depth-one/);
});

async function newsFixture() {
  const c = await fixture();
  // fixture() creates this isolated disposable directory below .work/tests.
  await rm(resolve(c.dir, 'content'), { recursive: true });
  c.manifest.source = { type: 'wikipedia', language: 'en', currentEvents: { days: 91, endDate: '2026-04-01' }, depth: 1, seeds: [], maxPages: 250, userAgent: 'Knowledge package tests (https://example.com)' };
  c.manifest.build = { embeddingProfile: 'bge-small-en-v1.5@1', toc: { format: 'wikipedia-days' }, ignore: [], packaging: config };
  c.manifest.licensing.rules = [{ include: ['**/*.md'], license: 'original' }].map(r => ({ ...r, license: c.manifest.licensing.licenses[0].id }));
  await writeJson(resolve(c.dir, 'manifest.json'), c.manifest);
  const dailyPages = currentEventsSeeds(c.manifest.source.currentEvents).map((d, i) => ({ date: d.date, pageId: i + 1, articleIds: d.date === '2026-01-01' ? [1000, 1001] : [1000, 1002] }));
  const provenance = [];
  async function add(path, id, title, body, details) {
    const text = `---\nid: "${id}"\ntitle: "${title}"\n---\n\n# ${title}\n\n${body}\n`;
    await write(resolve(c.dir, 'content', path), text);
    provenance.push({ path, wikipediaPageId: id, sha256: sha256(text), sourceSha256: sha256(text), sourceUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`, sourceRevision: '1', license: c.manifest.licensing.licenses[0].id, attribution: 'Test authors', transformation: 'Test source fixture', ...details });
  }
  for (const d of dailyPages) await add(`days/${d.date}.md`, d.pageId, `News ${d.date}`, '[Shared](../articles/1000.md)', { depth: 0, newsDate: d.date });
  for (const [id, title] of [[1000, 'Shared story'], [1001, 'Old story'], [1002, 'New story']]) {
    await add(`articles/${id}.md`, id, title, '[Old story](1001.md) and [New story](1002.md).', { depth: 1, referredBy: dailyPages.filter(d => d.articleIds.includes(id)).map(d => String(d.pageId)).sort() });
  }
  await writeJson(resolve(c.dir, 'LICENSES/selection.json'), { schemaVersion: 1, window: { start: '2026-01-01', end: '2026-04-01', days: 91 }, pages: provenance.length, articlePages: 3, seedPages: 91, depth: 1, dailyPages });
  await write(resolve(c.dir, 'provenance.jsonl'), provenance.map(p => JSON.stringify(p)).join('\n') + '\n');
  await writeJson(resolve(c.dir, 'sources.lock.json'), { schemaVersion: 1, sourceType: 'wikipedia', sourceConfigDigest: sourceConfigDigest(c.manifest), contentDigest: digest(await inventory(resolve(c.dir, 'content'))), revision: '1', files: provenance });
  await writeJson(resolve(c.dir, 'tests/queries.json'), [{ query: 'Shared story', expectedDocumentIds: ['1000'] }, { query: 'Old story', expectedDocumentIds: ['1001'] }]);
  return c;
}

test('quarterly compiler integration preserves corpus, scopes TOC/provenance and binds excluded links to Wikipedia', { skip: knowledge.GEZK_INDEX_SCHEMA_VERSION < 4 ? 'Requires the draft shared-TOC toolchain; run with KNOWLEDGE_GEZEL_ROOT' : false }, async () => {
  const c = await newsFixture();
  const before = await inventory(resolve(c.dir, 'content'));
  const options = { version: '2026.10.4', createdAt: '2026-10-05T00:00:00Z', embedderFactory: fakeEmbedder };
  const latest = await buildCatalog(c, options);
  assert.equal(latest.manifest.counts.documents, 92);
  assert.equal(latest.packaging.window.start, '2026-01-02');
  assert.equal((await verifyRelease(c, latest.directory)).toc.days, 90);
  assert.deepEqual(latest.manifest.smokeQueries.map(q => q.query), ['Shared story']);
  const out = resolve(c.root, '.work/package-extracted');
  await extractGezkVerified(resolve(latest.directory, latest.archive), out);
  const handle = CatalogHandle.open(out);
  try {
    assert.equal(handle.getDocument('1001'), null);
    assert.match(handle.getDocument('1000').markdown, /https:\/\/en.wikipedia.org\/wiki\/Old%20story/);
    assert.match(handle.getDocument('1000').markdown, new RegExp(`knowledge://bendyline/${c.manifest.id}/1002`));
  } finally { handle.close(); }
  const shipped = (await readFile(resolve(out, 'LICENSES/provenance.jsonl'), 'utf8')).trim().split('\n').map(JSON.parse);
  assert.equal(shipped.length, 92);
  assert.ok(!shipped.some(p => p.wikipediaPageId === 1001));
  const archive = await buildCatalog(c, { ...options, packageKey: '2026-q1' });
  assert.notEqual(archive.catalogId, latest.catalogId);
  assert.equal((await verifyRelease(c, archive.directory)).toc.days, 90);
  assert.equal(archive.manifest.counts.documents, 93);
  assert.deepEqual(await inventory(resolve(c.dir, 'content')), before);
  assert.equal((await buildCatalog(c, options)).reused, true);
});
