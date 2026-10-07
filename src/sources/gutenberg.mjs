import { readFile } from 'node:fs/promises';
import { availableParallelism } from 'node:os';
import { resolve } from 'node:path';
import { setTimeout } from 'node:timers/promises';
import { gunzipSync } from 'node:zlib';
import { stringify } from 'yaml';
import { request } from '../http.mjs';
import { atomicJson, digest, exists, inside, readJson, removeWork, sha256, walk, write } from '../files.mjs';
import { licenseFor, parseYaml } from '../catalogs.mjs';
import { gutenbergLegal } from '../licensing.mjs';
import { mapConcurrent } from '../source-cache.mjs';
import { mapWorkers } from '../worker-pool.mjs';
import { checkGuide } from '../gutenberg-selection.mjs';
import { GUTENBERG_NORMALIZER, PUBLIC_DOMAIN_STATEMENT, displayName, parseCatalogCsv, selectBooks } from './gutenberg-normalize.mjs';

const DAY = 86400000;
const urlPath = (path) => path.split('/').map(encodeURIComponent).join('/');

// Mirror files are mutable. A bounded reuse window lets an interrupted or
// guide-only resync continue without downloading the whole bookshelf again.
async function cachedDownload(root, url, { maxAgeMs, maxBytes, headers, download, stats, keepBytes = false }) {
  const base = resolve(root, '.work/gutenberg/cache', sha256(url));
  if (await exists(`${base}.json`) && await exists(`${base}.bin`)) {
    const meta = await readJson(`${base}.json`);
    if (meta.url === url && Date.now() - Date.parse(meta.fetchedAt) < maxAgeMs) {
      const bytes = await readFile(`${base}.bin`);
      if (bytes.length <= maxBytes && sha256(bytes) === meta.sha256) {
        stats.cached++; stats.sourceBytes += bytes.length;
        return { path: `${base}.bin`, sha256: meta.sha256, ...(keepBytes ? { bytes } : {}) };
      }
    }
  }
  // Mirrors can be slow per connection; allow large books to finish transferring.
  const { bytes } = await download(url, { headers, maxBytes, signal: AbortSignal.timeout(300000) });
  stats.downloaded++; stats.sourceBytes += bytes.length;
  await write(`${base}.bin`, bytes);
  await atomicJson(`${base}.json`, { url, sha256: sha256(bytes), fetchedAt: new Date().toISOString() });
  return { path: `${base}.bin`, sha256: sha256(bytes), ...(keepBytes ? { bytes } : {}) };
}

async function guideFiles(catalog, available) {
  const { manifest: m } = catalog;
  const base = resolve(catalog.dir, 'guides');
  if (!await exists(base)) throw new Error('source.guides is enabled but guides/ is missing');
  const paths = (await walk(base)).map((rel) => ({ rel, path: `guides/${rel}` }));
  const targets = new Set([...available, ...paths.map((p) => p.path)]);
  const files = [];
  for (const { rel, path } of paths) {
    const bytes = await readFile(inside(base, rel));
    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    if (rel.endsWith('.md')) checkGuide(path, text, targets);
    else if (/(?:^|\/)_topic\.yaml$/.test(rel)) parseYaml(text, path);
    else throw new Error(`${path}: guides accept Markdown and _topic.yaml files only`);
    const license = licenseFor(m, path);
    files.push({ path, bytes, provenance: { path, sha256: sha256(bytes), sourceSha256: sha256(bytes), sourceUrl: `https://github.com/${m.publish.github}/blob/main/catalogs/${urlPath(catalog.key)}/guides/${urlPath(rel)}`,
      sourceRevision: sha256(bytes), license: license.id, attribution: license.attribution, transformation: 'original catalog guide; included without modification' } });
  }
  return files;
}

export async function gutenbergSnapshot(catalog, { download = request, progress = (text) => console.error(text), delayMs = 500, cacheMaxAgeMs = 30 * DAY } = {}) {
  const { manifest: m, root } = catalog;
  const source = m.source;
  if (m.normalization.images !== 'omit') throw new Error('Gutenberg imports currently require images=omit');
  const headers = { 'User-Agent': source.userAgent, 'Accept-Encoding': 'gzip' };
  const stats = { downloaded: 0, cached: 0, sourceBytes: 0 };
  let lastProgress = 0;
  const report = (message, force = false) => {
    if (force || Date.now() - lastProgress > 15000) { progress(`[Gutenberg] ${message}`); lastProgress = Date.now(); }
  };
  const feedUrl = `${source.mirror}/feeds/pg_catalog.csv.gz`;
  const feed = await cachedDownload(root, feedUrl, { maxAgeMs: DAY, maxBytes: 100000000, headers, download, stats, keepBytes: true });
  const candidates = selectBooks(parseCatalogCsv(new TextDecoder('utf-8', { fatal: true }).decode(gunzipSync(feed.bytes, { maxOutputLength: 500000000 }))), source);
  if (!candidates.length) throw new Error(`No ${source.language} texts on Gutenberg bookshelf ${source.bookshelf}`);
  if (candidates.length > source.maxBooks) throw new Error(`Bookshelf has ${candidates.length} books, above maxBooks=${source.maxBooks}. No partial snapshot will be applied.`);
  report(`${candidates.length} ${source.language} books selected from ${source.bookshelf}`, true);
  let fetched = 0;
  await mapConcurrent(candidates, 3, async (book) => {
    book.sourceUrl = `${source.mirror}/${book.ebook}/pg${book.ebook}-images.html`;
    const before = stats.downloaded;
    try { Object.assign(book, await cachedDownload(root, book.sourceUrl, { maxAgeMs: cacheMaxAgeMs, maxBytes: m.sync.maxFileBytes, headers, download, stats })); }
    catch (error) { book.failure = `download: ${error.message}`; }
    if (stats.sourceBytes > m.sync.maxTotalBytes) throw new Error('Gutenberg snapshot exceeds byte budget. No partial snapshot will be applied.');
    report(`fetched ${++fetched}/${candidates.length}; ${stats.downloaded} downloads, ${stats.cached} cached`);
    if (stats.downloaded > before && delayMs) await setTimeout(delayMs);
  });
  const stage = resolve(root, '.work/gutenberg/staging', m.id);
  await removeWork(root, stage);
  const ready = candidates.filter((b) => !b.failure);
  let converted = 0;
  const results = await mapWorkers(ready.map((b) => ({ ebook: b.ebook, title: b.title, authors: b.authors, cachePath: b.path })), new URL('./gutenberg-worker.mjs', import.meta.url), {
    workerData: { stage, omitIndexes: source.omitIndexes }, concurrency: Math.max(1, Math.min(8, availableParallelism() - 2)), onResult: () => report(`converted ${++converted}/${ready.length} books`),
  });
  const books = []; const excluded = source.exclude.map((e) => ({ ebook: e.ebook, reason: `catalog policy: ${e.reason}` }));
  const failed = candidates.filter((b) => b.failure).map((b) => ({ ebook: b.ebook, title: b.title, reason: b.failure }));
  for (const [index, book] of ready.entries()) {
    const result = results[index];
    if (result.excluded) excluded.push({ ebook: book.ebook, title: book.title, reason: result.excluded });
    else if (result.failure) failed.push({ ebook: book.ebook, title: book.title, reason: result.failure });
    else books.push({ ...book, result });
  }
  const budget = Math.floor(candidates.length * source.maxFailureFraction);
  if (failed.length > budget) throw new Error(`${failed.length} Gutenberg books failed, above the budget of ${budget}: ${failed.slice(0, 8).map((f) => `#${f.ebook} ${f.reason}`).join('; ')}. No partial snapshot will be applied.`);
  if (!books.length) throw new Error('Gutenberg selection contains no public-domain books');
  const files = [];
  const shelf = Buffer.from(stringify({ name: 'Source books', order: 2 }));
  const pd = licenseFor(m, 'books/_topic.yaml');
  if (pd.spdx !== 'CC-PDM-1.0') throw new Error('Gutenberg books require the CC-PDM-1.0 public-domain license record');
  files.push({ path: 'books/_topic.yaml', bytes: shelf, provenance: { path: 'books/_topic.yaml', sha256: sha256(shelf), sourceSha256: feed.sha256, sourceUrl: feedUrl, sourceRevision: feed.sha256, license: pd.id, attribution: pd.attribution, transformation: `${GUTENBERG_NORMALIZER}; bookshelf selection -> topic YAML` } });
  const byTitle = [...books].sort((a, b) => a.result.book.localeCompare(b.result.book, 'en') || a.ebook - b.ebook);
  for (const [order, book] of byTitle.entries()) {
    const { meta, documents, transformation } = book.result;
    const names = meta.creators.map(displayName).filter(Boolean);
    const byline = names.length ? ` — ${names.slice(0, 2).join(', ')}${names.length > 2 ? ' et al.' : ''}` : '';
    const common = { sourceSha256: book.sha256, sourceUrl: book.sourceUrl, sourceRevision: meta.modified ?? book.sha256, ...(meta.modified ? { sourceUpdatedAt: meta.modified } : {}),
      historyUrl: `https://www.gutenberg.org/ebooks/${book.ebook}`, gutenbergEbook: book.ebook };
    const attribution = `${book.result.book}${names.length ? ` by ${names.join(', ')}` : ''}. ${pd.attribution}`;
    for (const document of documents) {
      const license = licenseFor(m, document.path);
      if (license.id !== pd.id) throw new Error(`${document.path}: Gutenberg book text requires the public-domain license record`);
      files.push({ path: document.path, sourcePath: document.sourcePath, provenance: { path: document.path, sha256: document.sha256, ...common, license: license.id, attribution, transformation } });
    }
    const topicPath = `books/pg${book.ebook}/_topic.yaml`;
    const topic = Buffer.from(stringify({ name: `${book.result.book}${byline}`, order: order + 1 }));
    files.push({ path: topicPath, bytes: topic, provenance: { path: topicPath, sha256: sha256(topic), ...common, license: pd.id, attribution, transformation: `${GUTENBERG_NORMALIZER}; dc.title and dc.creator -> topic YAML` } });
  }
  if (source.guides) files.push(...await guideFiles(catalog, new Set(files.map((f) => f.path))));
  const selection = {
    schemaVersion: 1, normalizer: GUTENBERG_NORMALIZER, statement: PUBLIC_DOMAIN_STATEMENT,
    feed: { url: feedUrl, sha256: feed.sha256 }, bookshelf: source.bookshelf, language: source.language, candidates: candidates.length,
    books: books.sort((a, b) => a.ebook - b.ebook).map((b) => ({ ebook: b.ebook, title: b.result.book, creators: b.result.meta.creators, rights: b.result.meta.rights,
      ...(b.result.meta.modified ? { modified: b.result.meta.modified } : {}), sourceUrl: b.sourceUrl, sourceSha256: b.sha256, documents: b.result.documents.length })),
    excluded: excluded.sort((a, b) => a.ebook - b.ebook), failed: failed.sort((a, b) => a.ebook - b.ebook),
  };
  report(`complete: ${books.length} books, ${files.filter((f) => f.path.endsWith('.md')).length} documents; ${excluded.length} excluded; ${failed.length} failed; ${JSON.stringify(stats)}`, true);
  return { files, legal: gutenbergLegal(m, selection), revision: digest(files.map((f) => [f.path, f.provenance.sha256, f.provenance.sourceRevision])) };
}
