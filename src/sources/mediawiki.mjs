import { resolve } from 'node:path';
import { getJson, request } from '../http.mjs';
import { atomicJson, exists, readJson, sha256 } from '../files.mjs';
import { parseHtmlToNodes, stringifyHtmlNodes } from '@bendyline/squisq/markdown';
import { robotsPolicy } from '../robots.mjs';

const pause = (ms) => new Promise((done) => setTimeout(done, ms));

export function websiteArticle(html, expectedPageId) {
  const id = Number(/"wgArticleId":(\d+)/.exec(html)?.[1]);
  const revid = Number(/"wgRevisionId":(\d+)/.exec(html)?.[1]);
  if (id !== expectedPageId || !revid) throw new Error(`Wikipedia article identity changed or revision metadata is missing: ${expectedPageId}`);
  const find = (nodes, predicate) => {
    for (const node of nodes) {
      if (node.type !== 'htmlElement') continue;
      if (predicate(node)) return node;
      const found = find(node.children, predicate); if (found) return found;
    }
  };
  const content = find(parseHtmlToNodes(html), (node) => node.attributes.id === 'mw-content-text');
  const body = content && find(content.children, (node) => (node.attributes.class ?? '').split(/\s+/).includes('mw-parser-output'));
  if (!body) throw new Error(`Wikipedia article body missing: ${expectedPageId}`);
  return { html: stringifyHtmlNodes([body]), revid };
}

export function currentEventsSeeds(config, now = new Date()) {
  if (!config) return [];
  const end = config.endDate === 'today' || !config.endDate ? now.toISOString().slice(0, 10) : config.endDate;
  const date = new Date(`${end}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== end) throw new Error('Invalid current-events end date');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return Array.from({ length: config.days }, (_, index) => {
    const day = new Date(date.getTime() - (config.days - 1 - index) * 86400000);
    return { title: `Portal:Current events/${day.getUTCFullYear()} ${months[day.getUTCMonth()]} ${day.getUTCDate()}`, date: day.toISOString().slice(0, 10) };
  });
}

// Metadata requests are serial. Batching title lookup avoids thousands of
// individual metadata requests while respecting Wikimedia's API etiquette.
export function mediaWikiClient(catalog, { query, cacheMaxAgeMs = 86400000, onMetadata, download = request } = {}) {
  const { source, sync } = catalog.manifest;
  const origin = `https://${source.language}.wikipedia.org`;
  const cacheDir = resolve(catalog.root, '.work/wikipedia', source.language, 'render');
  const statistics = { requests: 0, renderedDownloads: 0, renderedCacheHits: 0 };
  let nextWebsiteRequest = 0; let nextActionRequest = 0; let websiteBackoffUntil = 0;
  let permitted;
  const prepare = async () => {
    if (query) return;
    const { bytes } = await download(`${origin}/robots.txt`, { headers: { 'User-Agent': source.userAgent, 'Accept-Encoding': 'gzip' }, maxBytes: 1000000 });
    permitted = robotsPolicy(bytes.toString('utf8'), source.userAgent);
  };
  const ask = async (parameters) => {
    const metadataPath = resolve(catalog.root, '.work/wikipedia', source.language, 'metadata', `${sha256(JSON.stringify(parameters))}.json`);
    const cacheMetadata = !query && parameters.action === 'query' && parameters.prop === 'revisions';
    if (cacheMetadata && await exists(metadataPath)) {
      const cached = await readJson(metadataPath);
      if (Date.now() - Date.parse(cached.fetchedAt) < 3600000 && cached.sha256 === sha256(JSON.stringify(cached.data))) return cached.data;
    }
    for (let attempt = 0; attempt < 7; attempt++) {
      statistics.requests++;
      let data;
      try {
        if (!query) await pause(Math.max(0, nextActionRequest - Date.now()));
        const started = Date.now();
        data = query ? await query(parameters) : await getJson(`${origin}/w/api.php?${new URLSearchParams({ format: 'json', formatversion: '2', maxlag: '5', ...parameters })}`, { headers: { 'User-Agent': source.userAgent, 'Accept-Encoding': 'gzip' }, maxBytes: sync.maxFileBytes });
        nextActionRequest = Date.now() - started > 1000 ? Date.now() + 5000 : started + 350;
      } catch (error) {
        if (query || attempt === 6 || !(error.name === 'TimeoutError' || error instanceof TypeError || error.status === 429 || error.status >= 500)) throw error;
        await pause(Math.min(30000, 1000 * 2 ** attempt));
        continue;
      }
      if (!data.error) {
        if (cacheMetadata) await atomicJson(metadataPath, { data, sha256: sha256(JSON.stringify(data)), fetchedAt: new Date().toISOString() });
        return data;
      }
      if (!['maxlag', 'ratelimited', 'readonly'].includes(data.error.code) || attempt === 6) throw new Error(`Wikipedia API: ${data.error.code}; ${data.error.info}`);
      await pause(Math.min(30000, 1000 * 2 ** attempt));
    }
  };
  const resolveTitles = async (titles) => {
    const pages = new Map(); const aliases = new Map(); const unavailable = new Set();
    const batches = []; let batch = []; let length = 0;
    for (const title of [...new Set(titles)].sort()) {
      const size = encodeURIComponent(title).length + 3;
      if (batch.length && (batch.length === 50 || length + size > 6000)) { batches.push(batch); batch = []; length = 0; }
      batch.push(title); length += size;
    }
    if (batch.length) batches.push(batch);
    let completed = 0;
    for (const titles of batches) {
      const result = await ask({ action: 'query', titles: titles.join('|'), redirects: '1', prop: 'revisions', rvprop: 'ids|timestamp' });
      const redirects = new Map([...(result.query?.normalized ?? []), ...(result.query?.converted ?? []), ...(result.query?.redirects ?? [])].map((r) => [r.from, r.to]));
      const byTitle = new Map();
      for (const page of result.query?.pages ?? []) {
        if (page.missing || page.invalid || !page.revisions?.[0]) continue;
        pages.set(page.pageid, page); byTitle.set(page.title, page.pageid); aliases.set(page.title, page.pageid);
      }
      for (const original of [...titles, ...redirects.keys()]) {
        let title = original; const visited = new Set();
        while (redirects.has(title) && !visited.has(title)) { visited.add(title); title = redirects.get(title); }
        const id = byTitle.get(title);
        if (id) aliases.set(original, id); else unavailable.add(original);
      }
      completed += titles.length;
      onMetadata?.(completed, batches.reduce((sum, batch) => sum + batch.length, 0));
    }
    return { pages, aliases, unavailable };
  };
  const render = async (page) => {
    let revision = page.revision;
    const path = resolve(cacheDir, `${revision.revid}.json`);
    if (!query && await exists(path)) {
      const cached = await readJson(path);
      // oldid pins article wikitext, but transcluded templates can change. Refresh
      // rendered HTML daily; reuse it for retries and interrupted initial syncs.
      const bodyVerified = cached.bodyStrategy === 'content-text-v1' || /^<div class="mw-content-ltr mw-parser-output"/.test(cached.html);
      if (bodyVerified && cached.revid === revision.revid && cached.sha256 === sha256(cached.html) && Date.now() - Date.parse(cached.fetchedAt) < cacheMaxAgeMs) {
        statistics.renderedCacheHits++; return cached.html;
      }
    }
    let html;
    if (query) {
      const result = await ask({ action: 'parse', oldid: String(revision.revid), prop: 'text|revid', disableeditsection: '1' });
      if (result.parse?.revid !== revision.revid || typeof result.parse.text !== 'string') throw new Error(`Wikipedia returned a different or missing revision: ${revision.revid}`);
      html = result.parse.text;
    } else {
      // Wikimedia recommends the CDN-cached canonical website for bulk HTML.
      // Eight workers, at most eight starts/second, below its 10/20 limits. The
      // action API remains serial and below its separate 200/minute limit.
      const limitedFetch = async (...args) => {
        const startAt = Math.max(Date.now(), nextWebsiteRequest);
        nextWebsiteRequest = startAt + 125;
        await pause(Math.max(0, startAt - Date.now()));
        while (Date.now() < websiteBackoffUntil) await pause(websiteBackoffUntil - Date.now());
        const response = await fetch(...args);
        if (response.status === 429 || response.status === 503) {
          const header = response.headers.get('retry-after');
          const delay = header && /^\d+$/.test(header) ? Number(header) * 1000 : header ? Date.parse(header) - Date.now() : 5000;
          websiteBackoffUntil = Math.max(websiteBackoffUntil, Date.now() + (Number.isFinite(delay) ? delay : 5000));
          nextWebsiteRequest = Math.max(nextWebsiteRequest, websiteBackoffUntil);
        }
        return response;
      };
      const url = `${origin}/wiki/${encodeURIComponent(page.title.replaceAll(' ', '_'))}`;
      if (permitted && !permitted(new URL(url).pathname)) throw new Error(`Wikipedia robots.txt disallows: ${page.title}`);
      const { bytes } = await download(url, { headers: { 'User-Agent': source.userAgent, 'Accept-Encoding': 'gzip' }, maxBytes: sync.maxFileBytes, fetchImpl: limitedFetch });
      const article = websiteArticle(bytes.toString('utf8'), page.pageid);
      html = article.html;
      if (article.revid !== revision.revid) page.revision = revision = { revid: article.revid };
      await atomicJson(resolve(cacheDir, `${revision.revid}.json`), { revid: revision.revid, html, sha256: sha256(html), bodyStrategy: 'content-text-v1', fetchedAt: new Date().toISOString() });
    }
    statistics.renderedDownloads++; return html;
  };
  return { ask, resolveTitles, render, prepare, statistics, origin };
}
