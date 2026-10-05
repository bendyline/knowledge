import { resolve } from 'node:path';
import { readJson } from './files.mjs';

// TOC placements come from the accepted sync snapshot, never from a new crawl.
// Canonical document IDs and Markdown bodies stay unchanged.
export function wikipediaToc(selection, documents) {
  const byId = new Map(documents.map((d) => [d.id, d]));
  if (byId.size !== documents.length) throw new Error('Repeated document IDs in Wikipedia TOC');
  const days = [...selection.dailyPages].sort((a, b) => b.date.localeCompare(a.date));
  if (!days.length || new Set(days.map((d) => d.date)).size !== days.length) throw new Error('Wikipedia TOC needs unique daily pages');
  const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
  const placements = new Map();
  const topics = [];
  function place(id, topicId, ordinal) {
    const documentId = String(id);
    if (!byId.has(documentId)) throw new Error(`Wikipedia TOC references missing document ${documentId}`);
    const rows = placements.get(documentId) ?? [];
    if (rows.some((p) => p.topicPath[0] === topicId)) throw new Error(`Repeated daily reference to ${documentId}`);
    rows.push({ topicPath: [topicId], ordinal }); placements.set(documentId, rows);
  }
  for (const [index, day] of days.entries()) {
    const topicId = `day-${day.date}`;
    topics.push({ id: topicId, name: day.date, sortKey: String(index).padStart(6, '0') });
    place(day.pageId, topicId, 0);
    const articles = day.articleIds.map((id) => {
      const doc = byId.get(String(id));
      if (!doc) throw new Error(`Wikipedia TOC references missing document ${id}`);
      return doc;
    }).sort((a, b) => collator.compare(a.title, b.title) || a.id.localeCompare(b.id));
    articles.forEach((doc, i) => place(doc.id, topicId, i + 1));
  }
  // Extra seeds / depth-two imports have articles that no daily seed links to.
  const extra = documents.filter((d) => !placements.has(d.id)).sort((a, b) => collator.compare(a.title, b.title) || a.id.localeCompare(b.id));
  if (extra.length) {
    topics.push({ id: 'additional-articles', name: 'Additional articles', sortKey: '999999' });
    extra.forEach((d, i) => place(d.id, 'additional-articles', i));
  }
  return { topics, documents: documents.map((d) => {
    const [primary, ...tocReferences] = placements.get(d.id);
    const { tocReferences: _previous, ...document } = d;
    return { ...document, ...primary, ...(tocReferences.length ? { tocReferences } : {}) };
  }) };
}

export async function applyWikipediaToc(catalog, source, selected) {
  const selection = selected ?? await readJson(resolve(catalog.dir, 'LICENSES/selection.json'));
  return { ...source, ...wikipediaToc(selection, source.documents) };
}

export async function verifyWikipediaToc(catalog, handle, selected) {
  const selection = selected ?? await readJson(resolve(catalog.dir, 'LICENSES/selection.json'));
  const topics = handle.topics();
  const byId = new Map(topics.map((t) => [t.id, t]));
  let references = 0;
  const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
  for (const day of selection.dailyPages) {
    const topicId = `day-${day.date}`;
    const expected = new Set([String(day.pageId), ...day.articleIds.map(String)]);
    const rows = [];
    for (let offset = 0; offset < expected.size; offset += 200) {
      const page = handle.documentsPage({ topicId, descendants: false, offset, limit: 200 });
      if (page.total !== expected.size) throw new Error(`Incorrect TOC count for ${day.date}`);
      rows.push(...page.documents);
    }
    if (rows.length !== expected.size || new Set(rows.map((d) => d.id)).size !== expected.size || rows.some((d) => !expected.has(d.id)) || rows[0]?.id !== String(day.pageId)) throw new Error(`Incorrect TOC references for ${day.date}`);
    const sorted = [...rows.slice(1)].sort((a, b) => collator.compare(a.title, b.title) || a.id.localeCompare(b.id));
    if (sorted.some((d, i) => d.id !== rows[i + 1].id) || rows.some((d, i) => d.ordinal !== i)) throw new Error(`Incorrect TOC title order for ${day.date}`);
    if (byId.get(topicId)?.documentCount !== expected.size) throw new Error(`Incorrect topic count for ${day.date}`);
    references += day.articleIds.length;
  }
  const actualDates = topics.filter((t) => t.id.startsWith('day-')).map((t) => t.name);
  const expectedDates = selection.dailyPages.map((d) => d.date).sort().reverse();
  if (JSON.stringify(actualDates) !== JSON.stringify(expectedDates)) throw new Error('TOC dates are not ordered newest first');
  if (handle.documentsPage({ limit: 1 }).total !== selection.pages) throw new Error('Canonical Wikipedia document count changed');
  return { days: actualDates.length, articleReferences: references, canonicalDocuments: selection.pages, uniqueReferentArticles: selection.articlePages, newestFirst: true, alphabetized: true };
}
