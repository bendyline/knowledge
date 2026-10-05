import { posix, resolve } from 'node:path';
import { formatKnowledgeUri } from '@bendyline/gezk';
import { rewriteMarkdownReferences } from '../vendor/squisq/contentReferences.mjs';
import { digest, readJson } from './files.mjs';

const DAY = 86400000;
const iso = (date) => date.toISOString().slice(0, 10);
function date(value) {
  const parsed = new Date(`${value}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || iso(parsed) !== value) throw new Error(`Invalid package date: ${value}`);
  return parsed;
}
const dates = (start, end) => Array.from({ length: (date(end) - date(start)) / DAY + 1 }, (_, i) => iso(new Date(+date(start) + i * DAY)));

export function newsPackagePlan(selection, { latestMonths, archiveQuarters }) {
  const end = date(selection.window.end);
  const cutoff = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() - latestMonths, 1));
  const last = new Date(Date.UTC(cutoff.getUTCFullYear(), cutoff.getUTCMonth() + 1, 0)).getUTCDate();
  cutoff.setUTCDate(Math.min(end.getUTCDate(), last));
  const ranges = [{ key: 'latest', start: iso(new Date(+cutoff + DAY)), end: iso(end) }];
  const quarterStart = Math.floor(end.getUTCMonth() / 3) * 3;
  // A quarter ending exactly on the accepted snapshot date is already complete.
  const currentQuarterEnd = new Date(Date.UTC(end.getUTCFullYear(), quarterStart + 3, 0));
  const completedOffset = +end === +currentQuarterEnd ? 0 : -1;
  for (let i = 0; i < archiveQuarters; i++) {
    const start = new Date(Date.UTC(end.getUTCFullYear(), quarterStart + 3 * (completedOffset - i), 1));
    const finish = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 3, 0));
    ranges.push({ key: `${start.getUTCFullYear()}-q${start.getUTCMonth() / 3 + 1}`, start: iso(start), end: iso(finish) });
  }
  const available = new Map(selection.dailyPages.map(day => [day.date, day]));
  if (available.size !== selection.dailyPages.length) throw new Error('Duplicate daily pages in package corpus');
  return ranges.map(({ key, start, end }) => {
    const required = dates(start, end);
    const dailyPages = required.flatMap(d => available.has(d) ? [available.get(d)] : []);
    const articles = new Set(dailyPages.flatMap(day => day.articleIds));
    const missing = required.filter(d => !available.has(d));
    return { key, window: { start, end, days: required.length }, available: missing.length === 0,
      availableDays: dailyPages.length, missingDays: missing.length,
      ...(missing.length ? { missingRange: { first: missing[0], last: missing.at(-1) } } : {}),
      documents: dailyPages.length + articles.size, articlePages: articles.size,
      articleReferences: dailyPages.reduce((n, day) => n + day.articleIds.length, 0) };
  });
}

export function packageCatalogId(catalog, key) {
  if (!catalog.manifest.build.packaging) {
    if (key) throw new Error(`${catalog.key}: no build.packaging configuration`);
    return catalog.manifest.id;
  }
  key ??= 'latest';
  if (key !== 'latest' && !/^\d{4}-q[1-4]$/.test(key)) throw new Error('Package must be latest or YYYY-qN');
  const id = key === 'latest' ? catalog.manifest.id : `${catalog.manifest.id}-${key}`;
  if (id.length > 64) throw new Error('Quarterly package catalog ID exceeds 64 characters');
  return id;
}

export async function listPackages(catalog) {
  const config = catalog.manifest.build.packaging;
  if (!config) return [];
  const selection = await readJson(resolve(catalog.dir, 'LICENSES/selection.json'));
  return newsPackagePlan(selection, config).map(p => ({ ...p, catalogId: packageCatalogId(catalog, p.key) }));
}

export async function resolveBuildPackage(catalog, key) {
  const config = catalog.manifest.build.packaging;
  if (!config) { packageCatalogId(catalog, key); return null; }
  key ??= 'latest';
  const corpus = await readJson(resolve(catalog.dir, 'LICENSES/selection.json'));
  const plan = newsPackagePlan(corpus, config).find(p => p.key === key);
  if (!plan) throw new Error(`Package ${key} is not in this snapshot's configured archive window; run packages to list it`);
  if (!plan.available) throw new Error(`${key}: corpus is missing ${plan.missingDays} daily pages (${plan.missingRange.first} through ${plan.missingRange.last}); no partial package will be built`);
  const dailyPages = corpus.dailyPages.filter(d => d.date >= plan.window.start && d.date <= plan.window.end);
  const articles = new Set(dailyPages.flatMap(d => d.articleIds.map(String)));
  const documentIds = new Set([...dailyPages.map(d => String(d.pageId)), ...articles]);
  const paths = new Set([...dailyPages.map(d => `days/${d.date}.md`), ...[...articles].map(id => `articles/${id}.md`)]);
  const selection = { ...corpus, window: plan.window, pages: documentIds.size, seedPages: dailyPages.length, articlePages: articles.size, dailyPages };
  const label = key === 'latest' ? 'Latest three months' : `${key.slice(0, 4)} Q${key.at(-1)}`;
  return { ...plan, catalogId: packageCatalogId(catalog, key), paths, documentIds, selection,
    name: `${catalog.manifest.name} — ${label}`,
    description: `Wikipedia news for ${plan.window.start} through ${plan.window.end}, with one copy of each directly referenced article and a daily table of contents. Articles use the accepted corpus revisions.`,
    metadata: { schemaVersion: 1, type: config.type, key, window: plan.window, corpusWindow: corpus.window, selectionDigest: digest(selection) } };
}

export function packageQueries(queries, documentIds) {
  if (!documentIds) return queries;
  return queries.map(q => ({ ...q, expectedDocumentIds: q.expectedDocumentIds.filter(id => documentIds.has(String(id))) })).filter(q => q.expectedDocumentIds.length);
}

// Binding references is a packaging operation. Normalized source files remain
// untouched; articles outside this package continue to resolve on Wikipedia.
export function bindPackageLinks(markdown, path, provenanceByPath, documentIds, uri) {
  return rewriteMarkdownReferences(markdown, { rewriteUrl(url, kind) {
    if (kind !== 'link' || !url || url.startsWith('#') || url.startsWith('/') || /^[a-z][a-z0-9+.-]*:/i.test(url)) return url;
    const match = /^([^?#]*)([?#].*)?$/.exec(url);
    let target;
    try { target = posix.normalize(posix.join(posix.dirname(path), decodeURIComponent(match[1]))); } catch { return url; }
    if (!/\.md$/i.test(target)) return url;
    const p = provenanceByPath.get(target);
    if (!p) throw new Error(`Package link has no corpus provenance: ${path} -> ${url}`);
    if (documentIds.has(String(p.wikipediaPageId))) return formatKnowledgeUri({ ...uri, documentId: String(p.wikipediaPageId) });
    const external = new URL(p.sourceUrl);
    // Source URLs may already have a query (for example ?curid=...).
    if (match[2]?.startsWith('#')) external.hash = match[2];
    else if (match[2]) { const suffix = new URL(`https://example.invalid/${match[2]}`); for (const [k, v] of suffix.searchParams) external.searchParams.set(k, v); external.hash = suffix.hash; }
    return external.href;
  } });
}
