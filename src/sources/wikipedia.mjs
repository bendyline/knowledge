import { resolve } from 'node:path';
import { parseHtmlToNodes, stringifyHtmlNodes } from '@bendyline/squisq/markdown';
import { normalizeWikipediaPage } from './wikipedia-normalize.mjs';
import { licenseFor } from '../catalogs.mjs';
import { inside, readJson, sha256, writeJson } from '../files.mjs';
import { automaticLicensing, wikipediaLegal } from '../licensing.mjs';
import { currentEventsSeeds, mediaWikiClient } from './mediawiki.mjs';
import { mapConcurrent } from '../source-cache.mjs';
import { mapWorkers } from '../worker-pool.mjs';

const namespaces = /^(?:Category|File|Image|Help|Wikipedia|WP|Template|Template talk|Portal|Talk|User|User talk|Special|MediaWiki|Module|Draft|Book|Media):/i;
function linkTitle(href, origin = 'https://en.wikipedia.org') {
  if (/^(?:https?:)?\/\//.test(href)) {
    try { const url = new URL(href, origin); if (url.origin !== origin) return undefined; href = url.pathname + url.hash; } catch { return undefined; }
  }
  if (!/^(?:\.\/|\/wiki\/)/.test(href)) return undefined;
  try { return decodeURIComponent(href.replace(/^(?:\.\/|\/wiki\/)/, '').split('#')[0]).replaceAll('_', ' '); } catch { return undefined; }
}
export function articleHtml(html, { currentEvents = false, origin } = {}) {
  const links = new Set();
  const referenceItems = [];
  let nodes = parseHtmlToNodes(html);
  if (currentEvents) {
    const find = (nodes) => {
      for (const node of nodes) {
        if (node.type !== 'htmlElement') continue;
        if ((node.attributes.class ?? '').split(/\s+/).includes('current-events-content')) return node.children;
        const found = find(node.children); if (found) return found;
      }
    };
    nodes = find(nodes);
    if (!nodes) throw new Error('Daily page has no current-events-content section; refusing to import navigation as news');
  }
  const visit = (nodes) => nodes.flatMap((node) => {
    if (node.type !== 'htmlElement') return [node];
    const classes = (node.attributes.class ?? '').split(/\s+/);
    // Keep attribution and maintenance notices (including metadata-class boxes).
    if (['nav', 'script', 'style'].includes(node.tagName) || classes.some((c) => ['navbox', 'vertical-navbox', 'mw-editsection', 'noprint', 'current-events-nav', 'current-events-navbar', 'mw-cite-backlink'].includes(c))) return [];
    if (node.tagName === 'ol' && classes.includes('references')) {
      referenceItems.push(...visit(node.children));
      return [];
    }
    if (node.tagName === 'a') {
      const title = linkTitle(node.attributes.href ?? '', origin);
      if (title && !namespaces.test(title)) links.add(title);
      if (title && /^(File|Image):/i.test(title)) return visit(node.children);
    }
    return [{ ...node, children: visit(node.children) }];
  });
  const output = visit(nodes);
  // Mark Wikipedia's citation lists using the generic footnote contract that
  // Squisq already converts to working Markdown footnotes. Merge note groups so
  // every citation definition participates in the same conversion pass.
  if (referenceItems.length) output.push({ type: 'htmlElement', tagName: 'section', attributes: { 'data-footnotes': '' }, selfClosing: false, children: [{ type: 'htmlElement', tagName: 'ol', attributes: {}, selfClosing: false, children: referenceItems }] });
  return { html: stringifyHtmlNodes(output), links: [...links].sort() };
}

export async function wikipediaSnapshot(catalog, { query, now = new Date(), progress = (text) => console.error(text) } = {}) {
  const { manifest: m, root } = catalog;
  const source = m.source;
  if (m.normalization.images !== 'omit') throw new Error('Wikipedia imports currently require images=omit; media licenses need separate review');
  const client = mediaWikiClient(catalog, { query, onMetadata: (done, total) => report(`resolved metadata for ${done}/${total} titles`) });
  const { origin } = client;
  const legal = automaticLicensing(m) ? wikipediaLegal(m, (await client.ask({ action: 'query', meta: 'siteinfo', siprop: 'rightsinfo' })).query.rightsinfo) : [];
  await client.prepare();
  const days = currentEventsSeeds(source.currentEvents, now);
  const seeds = [...days, ...(source.seeds ?? []).map((title) => ({ title }))];
  const pages = new Map(); const aliases = new Map(); const discovered = new Map(); const skipped = new Set();
  const stage = resolve(root, '.work/wikipedia/staging', m.id);
  let total = 0; let lastProgress = 0;
  const report = (message, force = false) => {
    if (force || Date.now() - lastProgress > 15000) { progress(`[Wikipedia] ${message}`); lastProgress = Date.now(); }
  };
  const add = (page, depth, date, parents = []) => {
    if (!pages.has(page.pageid)) {
      if (pages.size >= source.maxPages) throw new Error(`Wikipedia traversal exceeds maxPages=${source.maxPages}. No partial snapshot will be applied.`);
      pages.set(page.pageid, { ...page, revision: page.revisions[0], depth, date, parents: new Set(parents) });
    } else for (const parent of parents) pages.get(page.pageid).parents.add(parent);
  };
  const initial = await client.resolveTitles(seeds.map((s) => s.title));
  for (const [name, id] of initial.aliases) aliases.set(name, id);
  for (const seed of seeds) {
    const id = aliases.get(seed.title);
    if (!id) throw new Error(`Wikipedia seed unavailable: ${seed.title}. No partial snapshot will be applied.`);
    add(initial.pages.get(id), 0, seed.date);
  }
  report(`${days.length || seeds.length} daily/seed pages selected${days.length ? ` (${days[0].date} through ${days.at(-1).date})` : ''}`, true);
  for (let depth = 0; depth <= source.depth; depth++) {
    const level = [...pages.values()].filter((p) => p.depth === depth);
    const next = new Map(); let processed = 0;
    await mapConcurrent(level, query ? 1 : 8, async (page) => {
      const raw = await client.render(page);
      total += Buffer.byteLength(raw);
      if (total > m.sync.maxTotalBytes) throw new Error('Wikipedia snapshot exceeds byte budget. No partial snapshot will be applied.');
      const cleaned = articleHtml(raw, { currentEvents: Boolean(page.date), origin });
      page.sourceSha256 = sha256(raw);
      await writeJson(inside(stage, `${page.pageid}.json`), cleaned);
      if (depth < source.depth) for (const title of cleaned.links) {
        if (!next.has(title)) next.set(title, new Set());
        next.get(title).add(String(page.pageid));
      }
      processed++;
      report(`depth ${depth}: rendered ${processed}/${level.length}; ${client.statistics.renderedDownloads} downloads, ${client.statistics.renderedCacheHits} cached`);
    });
    if (!next.size) continue;
    report(`resolving ${next.size} distinct linked titles at depth ${depth + 1}`, true);
    const resolved = await client.resolveTitles([...next.keys()]);
    for (const [name, id] of resolved.aliases) {
      const page = resolved.pages.get(id);
      if (page.ns === undefined || page.ns === 0 || pages.has(id)) aliases.set(name, id);
    }
    for (const [title, parents] of next) {
      const id = aliases.get(title);
      const page = resolved.pages.get(id);
      if (!id || !page || (page.ns !== undefined && page.ns !== 0 && !pages.has(id))) { skipped.add(title); continue; }
      add(page, depth + 1, undefined, parents);
      for (const parent of parents) {
        if (!discovered.has(parent)) discovered.set(parent, new Set());
        discovered.get(parent).add(id);
      }
    }
    report(`${pages.size} canonical pages selected; aliases and repeated mentions share page IDs`, true);
  }
  const paths = new Map([...pages].map(([id, p]) => [id, source.currentEvents ? p.date ? `days/${p.date}.md` : `articles/${id}.md` : `${id}.md`]));
  const targets = new Map([...aliases].map(([title, id]) => [title, paths.get(id)]));
  const ordered = [...pages].sort(([a], [b]) => a - b);
  const files = []; let normalizedCount = 0;
  const inputs = ordered.map(([id, page]) => ({ id, title: page.title, date: page.date, path: paths.get(id), origin }));
  const prepared = query ? undefined : await mapWorkers(inputs, new URL('./wikipedia-worker.mjs', import.meta.url), {
    workerData: { stage, targets },
    onResult: () => { normalizedCount++; report(`normalized ${normalizedCount}/${pages.size} Markdown documents`); },
  });
  for (const [index, [id, page]] of ordered.entries()) {
    const path = paths.get(id);
    const license = licenseFor(m, path);
    if (license.spdx !== 'CC-BY-SA-4.0') throw new Error('Wikipedia text imports require CC-BY-SA-4.0');
    let normalized = prepared?.[index]; let bytes;
    if (query) {
      const cleaned = await readJson(inside(stage, `${id}.json`));
      const result = await normalizeWikipediaPage(cleaned.html, inputs[index], targets);
      bytes = Buffer.from(result.markdown);
      normalized = { sha256: sha256(bytes), transformation: result.transformation };
    }
    files.push({ path, ...(query ? { bytes } : { sourcePath: normalized.sourcePath }), provenance: {
      path, sha256: normalized.sha256, sourceSha256: page.sourceSha256, sourceUrl: `${origin}/w/index.php?oldid=${page.revision.revid}`, sourceRevision: String(page.revision.revid), sourceUpdatedAt: page.revision.timestamp,
      historyUrl: `${origin}/w/index.php?title=${encodeURIComponent(page.title)}&action=history`,
      license: license.id, attribution: `Wikipedia contributors; ${license.attribution}`, transformation: `${normalized.transformation}; navigation removed; ${page.date ? 'daily news section selected; ' : ''}rendered HTML digest retained`, depth: page.depth,
      wikipediaPageId: id, referredBy: [...page.parents].sort(), ...(page.date ? { newsDate: page.date } : {}),
    } });
  }
  const selection = {
    schemaVersion: 1, ...(days.length ? { window: { start: days[0].date, end: days.at(-1).date, days: days.length } } : {}),
    depth: source.depth, pages: pages.size, seedPages: seeds.length, articlePages: [...pages.values()].filter((p) => p.depth > 0).length,
    skippedTitles: [...skipped].sort(),
    dailyPages: days.map((day) => ({ date: day.date, title: day.title, pageId: aliases.get(day.title), articleIds: [...(discovered.get(String(aliases.get(day.title))) ?? [])].sort((a, b) => a - b) })),
  };
  legal.push({ path: 'LICENSES/selection.json', bytes: Buffer.from(JSON.stringify(selection, null, 2) + '\n') });
  report(`complete: ${pages.size} documents; ${selection.articlePages} unique referent articles; ${total} source bytes; ${JSON.stringify(client.statistics)}`, true);
  return { revision: sha256(JSON.stringify(files.map((f) => [f.path, f.provenance.sourceRevision, f.provenance.sourceSha256]))), files, legal };
}
