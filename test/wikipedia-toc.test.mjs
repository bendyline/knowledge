import test from 'node:test';
import assert from 'node:assert/strict';
import { wikipediaToc, verifyWikipediaToc } from '../src/wikipedia-toc.mjs';
import { writeJson } from '../src/files.mjs';
import { fixture } from './helpers.mjs';

const documents = [
  { id: '1', title: 'October 2', markdown: '# Earlier day' },
  { id: '2', title: 'October 3', markdown: '# Later day' },
  { id: '3', title: 'Hurricane Polo', markdown: '# One canonical article' },
  { id: '4', title: 'Artemis', markdown: '# Another article' },
];
const selection = { pages: 4, articlePages: 2, dailyPages: [
  { date: '2026-10-02', pageId: 1, articleIds: [3] },
  { date: '2026-10-03', pageId: 2, articleIds: [3, 4] },
] };

test('daily TOC shares canonical bodies, orders dates and assigns per-day title order', () => {
  const result = wikipediaToc(selection, documents);
  assert.deepEqual(result.topics.map((t) => t.name), ['2026-10-03', '2026-10-02']);
  assert.equal(result.documents.length, 4);
  const hurricane = result.documents.find((d) => d.id === '3');
  assert.equal(hurricane.markdown, documents[2].markdown);
  assert.deepEqual(hurricane.topicPath, ['day-2026-10-03']);
  assert.equal(hurricane.ordinal, 2);
  assert.deepEqual(hurricane.tocReferences, [{ topicPath: ['day-2026-10-02'], ordinal: 1 }]);
  assert.equal(result.documents.find((d) => d.id === '2').ordinal, 0);
  assert.equal(result.documents.find((d) => d.id === '4').ordinal, 1);
  assert.deepEqual(documents[2], { id: '3', title: 'Hurricane Polo', markdown: '# One canonical article' });
});

test('extra seeds remain reachable and invalid daily references fail', () => {
  const result = wikipediaToc(selection, [...documents, { id: '5', title: 'Extra seed' }]);
  assert.deepEqual(result.documents[4].topicPath, ['additional-articles']);
  assert.throws(() => wikipediaToc(selection, documents.slice(1)), /missing document 1/);
  assert.throws(() => wikipediaToc(selection, [...documents, documents[0]]), /Repeated document IDs/);
  assert.throws(() => wikipediaToc({ dailyPages: [selection.dailyPages[0], selection.dailyPages[0]] }, documents), /unique daily/);
  assert.throws(() => wikipediaToc({ dailyPages: [{ ...selection.dailyPages[0], articleIds: [3, 3] }] }, documents), /Repeated daily/);
});

test('archive TOC verification rejects a missing shared placement', async () => {
  const catalog = await fixture();
  await writeJson(`${catalog.dir}/LICENSES/selection.json`, selection);
  const { topics, documents: placed } = wikipediaToc(selection, documents);
  const rows = (topicId) => placed.flatMap((d) => [
    { topicPath: d.topicPath, ordinal: d.ordinal }, ...(d.tocReferences ?? []),
  ].filter((p) => p.topicPath[0] === topicId).map((p) => ({ ...d, ordinal: p.ordinal }))).sort((a, b) => a.ordinal - b.ordinal);
  const handle = {
    topics: () => topics.map((t) => ({ ...t, documentCount: rows(t.id).length })),
    documentsPage: ({ topicId, offset = 0, limit }) => {
      const docs = topicId ? rows(topicId) : placed;
      return { total: docs.length, documents: docs.slice(offset, offset + limit) };
    },
  };
  assert.deepEqual(await verifyWikipediaToc(catalog, handle), {
    days: 2, articleReferences: 3, canonicalDocuments: 4, uniqueReferentArticles: 2, newestFirst: true, alphabetized: true,
  });
  placed.find((d) => d.id === '3').tocReferences = [];
  await assert.rejects(verifyWikipediaToc(catalog, handle), /Incorrect TOC count/);
});
