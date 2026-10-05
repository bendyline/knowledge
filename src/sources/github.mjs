import { matchesGlob, posix } from 'node:path';
import { githubApi, request } from '../http.mjs';
import { isDocument, markdownPath, normalizeDocument, resolveSourceLink } from '../normalize.mjs';
import { licenseFor } from '../catalogs.mjs';
import { portablePath, sha256, json } from '../files.mjs';
import { assessLicenseFiles, automaticLicensing } from '../licensing.mjs';
import { cachedSource, mapConcurrent } from '../source-cache.mjs';
import { parseMarkdown, splitFrontmatterBlock, walkMarkdownTree } from '@bendyline/squisq/markdown';
import { rewriteMarkdownReferences } from '../../vendor/squisq/contentReferences.mjs';
import { docfxYamlToMarkdown, normalizeDocfxMarkdown, rewriteDocfxToc } from './docfx.mjs';

const encodedPath = (path) => path.split('/').map(encodeURIComponent).join('/');

export async function githubSnapshot(catalog, { api = githubApi, download = request } = {}) {
  const { manifest: m } = catalog;
  const source = m.source;
  const metadata = await api(`/repos/${source.repository}`);
  if (metadata.private !== false) throw new Error('Only public GitHub repositories may be synchronized');
  const commit = await api(`/repos/${source.repository}/commits/${encodeURIComponent(source.ref)}`);
  const revision = commit.sha;
  if (!/^[a-f0-9]{40}$/.test(revision)) throw new Error('GitHub did not return a commit SHA');
  const base = `https://raw.githubusercontent.com/${source.repository}/${revision}/`;
  const blobUrl = (path) => `https://github.com/${source.repository}/blob/${revision}/${encodedPath(path)}`;
  let total = 0;
  const getBytes = async (path, blobSha) => {
    const bytes = download === request ? await cachedSource(catalog.root, base + encodedPath(path), { maxBytes: m.sync.maxFileBytes, blobSha }) : (await download(base + encodedPath(path), { maxBytes: m.sync.maxFileBytes })).bytes;
    total += bytes.length;
    if (total > m.sync.maxTotalBytes) throw new Error('Source exceeds the catalog byte budget');
    return bytes;
  };
  const legal = [];
  const licenseBytes = new Map();
  for (const license of source.licenseFiles) {
    const bytes = await getBytes(license.path);
    if (!automaticLicensing(m) && sha256(bytes) !== license.sha256) throw new Error(`${license.path}: upstream license/notice changed; review and update the approved digest before syncing`);
    licenseBytes.set(license.path, bytes);
    legal.push({ path: `LICENSES/upstream/${license.path}`, bytes });
  }
  if (automaticLicensing(m)) {
    legal.push({ path: 'LICENSES/assessment.json', bytes: Buffer.from(json(assessLicenseFiles(m, licenseBytes))) });
    for (const license of m.licensing.licenses) legal.push({ path: license.text, bytes: licenseBytes.get(source.licenseFiles.find((f) => f.license === license.id).path) });
  }
  for (const notice of source.noticeFiles) {
    const bytes = await getBytes(notice.path);
    if (sha256(bytes) !== notice.sha256) throw new Error(`${notice.path}: nonstandard notices changed; reassess source-specific exceptions`);
    legal.push({ path: `LICENSES/upstream/${notice.path}`, bytes });
  }
  const trees = new Map();
  const tree = async (sha, recursive = false) => {
    const key = `${sha}:${recursive}`;
    if (!trees.has(key)) trees.set(key, await api(`/repos/${source.repository}/git/trees/${sha}${recursive ? '?recursive=1' : ''}`));
    const result = trees.get(key);
    if (result.truncated) throw new Error('GitHub tree listing was truncated; choose a smaller source subtree');
    return result.tree;
  };
  const entries = new Map();
  for (const root of source.paths) {
    let sha = commit.commit.tree.sha;
    if (root === '.') {
      for (const child of await tree(sha, true)) entries.set(child.path, child);
      continue;
    }
    const parts = root.split('/');
    for (let i = 0; i < parts.length; i++) {
      const item = (await tree(sha)).find((e) => e.path === parts[i]);
      if (!item) throw new Error(`Configured source path does not exist: ${root}`);
      if (i < parts.length - 1 && item.type !== 'tree') throw new Error(`Not a source directory: ${root}`);
      sha = item.sha;
      if (i === parts.length - 1) {
        if (item.type === 'tree') for (const child of await tree(sha, true)) entries.set(`${root}/${child.path}`, child);
        else entries.set(root, item);
      }
    }
  }
  const selected = [...entries].filter(([path, item]) => item.type !== 'tree' && source.include.some((g) => matchesGlob(path, g)) && !source.exclude.some((g) => matchesGlob(path, g))).sort(([a], [b]) => a < b ? -1 : 1);
  const mapping = new Map(selected.map(([path]) => [path, isDocument(path) ? markdownPath(path) : path]));
  const raw = new Map();
  const downloaded = await mapConcurrent(selected, 4, async ([path, item]) => {
    portablePath(path);
    if (item.type !== 'blob' || item.mode !== '100644' && item.mode !== '100755') throw new Error(`${path}: symlinks and submodules are not supported`);
    if (!isDocument(path) && !/\.(ya?ml|png|jpe?g|gif|webp|svg)$/i.test(path)) throw new Error(`${path}: unsupported source file`);
    if (item.size > m.sync.maxFileBytes) throw new Error(`${path}: file exceeds byte budget`);
    licenseFor(m, path);
    return [path, await getBytes(path, item.sha)];
  });
  for (const [path, bytes] of downloaded) raw.set(path, bytes);
  const yamlDocuments = new Map();
  if (m.normalization.docfx) for (const [path, bytes] of raw) {
    if (!/\.ya?ml$/i.test(path)) continue;
    const text = docfxYamlToMarkdown(bytes.toString('utf8'), path);
    if (text !== null) { yamlDocuments.set(path, text); mapping.set(path, path.replace(/\.ya?ml$/i, '.md')); }
  }
  const resolveUrl = (url, path, output, map) => {
    if (!source.publishedBaseUrl) return resolveSourceLink(url, path, output, map, blobUrl(path));
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url)) return url;
    // Learn's /azure, /dotnet, and /rest links are website paths, not GitHub paths.
    const published = new URL(posix.relative(source.paths[0], path).replace(/\.(?:md|ya?ml)$/i, ''), source.publishedBaseUrl).href;
    const resolved = resolveSourceLink(url, path, output, map, published);
    return /^https?:\/\//.test(resolved) ? resolved.replace(/\.(?:md|yml|yaml)(?=[?#]|$)/i, '') : resolved;
  };
  const files = [];
  for (const [path, bytes] of raw) {
    const license = licenseFor(m, path);
    const output = mapping.get(path);
    let data = bytes; let transformation = 'Copied without content changes';
    if (isDocument(path) || yamlDocuments.has(path)) {
      // Includes must be part of the reviewed source selection. Never fetch
      // arbitrary dependencies while holding publish credentials.
      let input = bytes;
      if (/\.(md|markdown)$/i.test(path) || yamlDocuments.has(path)) input = Buffer.from(expandIncludes(yamlDocuments.get(path) ?? bytes.toString('utf8'), path, raw, [], (included) => licenseFor(m, included).id === license.id));
      if (m.normalization.docfx) input = Buffer.from(normalizeDocfxMarkdown(input.toString('utf8'), { images: m.normalization.images }));
      const converted = await normalizeDocument(input, yamlDocuments.has(path) ? output : path, {
        images: m.normalization.images,
        assetPrefix: posix.join(posix.dirname(output), '_assets', sha256(path).slice(0, 12)),
        rewriteUrl: (url) => resolveUrl(url, path, output, mapping),
      });
      data = Buffer.from(converted.markdown); transformation = converted.transformation + (m.normalization.docfx ? '; DocFX includes expanded, directives normalized, YAML bodies converted' : '');
      for (const asset of converted.assets) {
        const assetLicense = licenseFor(m, asset.path);
        files.push(record(asset.path, asset.bytes, bytes, path, transformation, assetLicense));
      }
    } else if (m.normalization.docfx && /(^|\/)toc\.ya?ml$/i.test(path)) {
      data = Buffer.from(rewriteDocfxToc(bytes.toString('utf8'), path, mapping, resolveUrl));
      transformation = 'DocFX navigation links mapped to normalized documents and public website targets';
    }
    files.push(record(output, data, bytes, path, transformation, license));
  }
  function record(path, bytes, sourceBytes, sourcePath, transformation, license) {
    return { path, bytes, provenance: { path, sha256: sha256(bytes), sourceSha256: sha256(sourceBytes), sourceUrl: blobUrl(sourcePath), sourceRevision: revision, license: license.id, attribution: license.attribution, transformation } };
  }
  return { revision, files, legal };
}

export function expandIncludes(text, path, files, ancestors = [], canInclude) {
  if (ancestors.includes(path) || ancestors.length >= 16) throw new Error(`Cyclic or excessively nested include: ${path}`);
  const protectedSpans = [];
  walkMarkdownTree(parseMarkdown(text), (node) => {
    if (['code', 'inlineCode'].includes(node.type) && node.position) protectedSpans.push([node.position.start.offset, node.position.end.offset]);
  });
  return text.replace(/\[!INCLUDE\s*\[[^\]]*\]\(([^)]+)\)\]/gi, (original, target, offset) => {
    if (protectedSpans.some(([start, end]) => offset >= start && offset < end)) return original;
    const included = posix.normalize(posix.join(posix.dirname(path), target));
    const bytes = files.get(included);
    if (!bytes || !/\.md$/i.test(included)) throw new Error(`${path}: include ${included} must be selected and licensed explicitly`);
    if (canInclude && !canInclude(included)) throw new Error(`${path}: mixed-license includes need an explicit combined attribution policy`);
    const body = splitFrontmatterBlock(bytes.toString('utf8')).body;
    const expanded = expandIncludes(body, included, files, [...ancestors, path], canInclude);
    return rewriteMarkdownReferences(expanded, { rewriteUrl: (url) => {
      if (!url || /^(?:[a-z][a-z0-9+.-]*:|\/|#)/i.test(url)) return url;
      const match = /^([^?#]*)([?#].*)?$/.exec(url);
      const destination = posix.normalize(posix.join(posix.dirname(included), match[1]));
      return posix.relative(posix.dirname(path), destination) + (match[2] ?? '');
    } });
  });
}
