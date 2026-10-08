import { matchesGlob, posix } from 'node:path';
import { githubApi, request } from '../http.mjs';
import { isDocument, markdownPath, normalizeDocument, resolveSourceLink } from '../normalize.mjs';
import { licenseFor, parseYaml } from '../catalogs.mjs';
import { portablePath, sha256, json } from '../files.mjs';
import { assessLicenseFiles, automaticLicensing } from '../licensing.mjs';
import { cachedSource, mapConcurrent } from '../source-cache.mjs';
import { parseMarkdown, splitFrontmatterBlock, walkMarkdownTree } from '@bendyline/squisq/markdown';
import { rewriteMarkdownReferences } from '../../vendor/squisq/contentReferences.mjs';
import { docfxYamlToMarkdown, normalizeDocfxMarkdown, rewriteDocfxToc } from './docfx.mjs';
import { normalizeDocfxMarkdown as preserveDocfxMarkdown } from '../../vendor/squisq/docfxPreservation.mjs';
import { normalizeDocfxMarkdown as renderedDocfxMarkdown } from '../../vendor/squisq/docfxRendered.mjs';
import { normalizeDocfxMarkdown as renderedDocfxMarkdownV2 } from '../../vendor/squisq/docfxRenderedV2.mjs';
import { githubArchive } from './github-archive.mjs';

const encodedPath = (path) => path.split('/').map(encodeURIComponent).join('/');

export async function githubSnapshot(catalog, { api = githubApi, download = request } = {}) {
  const { manifest: m } = catalog;
  const source = m.source;
  const preserve = m.normalization.docfxReferences === 'preserve';
  const rendered = Boolean(m.normalization.docfxProfile);
  // Node's native glob case behavior varies by OS. Preservation selections
  // explicitly use case-insensitive matching on both Windows and Actions/Linux.
  const matchesSource = (path, glob) => matchesGlob(preserve ? path.toLowerCase() : path, preserve ? glob.toLowerCase() : glob);
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
  const codeFile = (path) => source.codeFiles?.some(g => matchesSource(path, g));
  const selected = [...entries].filter(([path, item]) => item.type !== 'tree' && (source.include.some((g) => matchesSource(path, g)) || codeFile(path)) && !source.exclude.some((g) => matchesSource(path, g))).sort(([a], [b]) => a < b ? -1 : 1);
  const mapping = new Map(selected.map(([path]) => [path, codeFile(path) ? `_code/${path}.md` : isDocument(path) ? markdownPath(path) : path]));
  const raw = new Map();
  const archived = source.transport === 'archive' ? await githubArchive(catalog.root, source.repository, revision, selected, { ...m.sync, maxTotalBytes: m.sync.maxTotalBytes - total, maxArchiveBytes: source.maxArchiveBytes ?? 2000000000 }) : undefined;
  let downloadedCount = 0;
  const downloaded = await mapConcurrent(selected, source.downloadConcurrency ?? 4, async ([path, item]) => {
    portablePath(path);
    if (item.type !== 'blob' || item.mode !== '100644' && item.mode !== '100755') throw new Error(`${path}: symlinks and submodules are not supported`);
    if (!isDocument(path) && !codeFile(path) && !/\.(ya?ml|png|jpe?g|gif|webp|svg)$/i.test(path)) throw new Error(`${path}: unsupported source file`);
    if (item.size > m.sync.maxFileBytes) throw new Error(`${path}: file exceeds byte budget`);
    licenseFor(m, path);
    const bytes = archived ? archived.get(path) : await getBytes(path, item.sha);
    if (++downloadedCount % 500 === 0) console.error(`[GitHub] ${source.repository}: fetched ${downloadedCount}/${selected.length} source files`);
    return [path, bytes];
  });
  for (const [path, bytes] of downloaded) raw.set(path, bytes);
  const unresolved = []; const uids = new Map(); const invalidMetadata = new Set();
  const sourceCase = new Map([...raw.keys()].map(path => [path.toLowerCase(), path]));
  if (preserve && sourceCase.size !== raw.size) throw new Error('Source paths collide without case sensitivity');
  const projectRoots = [...entries.keys()].filter(path => posix.basename(path) === 'docfx.json').map(path => posix.dirname(path)).sort((a, b) => b.length - a.length);
  const projectRoot = path => projectRoots.find(root => root === '.' || path.startsWith(`${root}/`)) ?? source.docfxRoot ?? source.paths[0];
  const sourceTarget = (target, path) => {
    const resolved = posix.normalize(target.startsWith('~/') ? posix.join(projectRoot(path), target.slice(2)) : posix.join(posix.dirname(path), target));
    return sourceCase.get(resolved.toLowerCase()) ?? resolved;
  };
  if (preserve) for (const [path, bytes] of raw) if (/\.md$/i.test(path)) {
    const block = splitFrontmatterBlock(bytes.toString('utf8')).frontmatter;
    if (block) {
      try {
        const data = parseYaml(block.replace(/^---\r?\n/, '').replace(/\r?\n---\s*$/, ''), path);
        if (data?.uid && !uids.has(String(data.uid))) uids.set(String(data.uid), path);
        if (m.normalization.docfxMetadataMaxBytes && Buffer.byteLength(JSON.stringify(data)) > m.normalization.docfxMetadataMaxBytes) {
          invalidMetadata.add(path);
          unresolved.push({ path, kind: 'Original metadata retained as code', target: `Metadata exceeds ${m.normalization.docfxMetadataMaxBytes} bytes; retained in the article body to fit Gezk document metadata limits` });
        }
      } catch (error) {
        invalidMetadata.add(path);
        unresolved.push({ path, kind: 'Original metadata retained as code', target: error.message });
      }
    }
  }
  const yamlDocuments = new Map();
  if (m.normalization.docfx) for (const [path, bytes] of raw) {
    if (!/\.ya?ml$/i.test(path)) continue;
    const text = docfxYamlToMarkdown(bytes.toString('utf8'), path);
    if (text !== null) { yamlDocuments.set(path, text); mapping.set(path, path.replace(/\.ya?ml$/i, '.md')); }
  }
  const resolveUrl = (url, path, output, map) => {
    if (preserve && url.startsWith('xref:')) {
      const uid = url.slice(5).split('?')[0];
      return uids.has(uid) ? posix.relative(posix.dirname(output), map.get(uids.get(uid))) : `https://learn.microsoft.com/search/?terms=${encodeURIComponent(uid)}`;
    }
    if (preserve && url.startsWith('~/')) {
      const match = /^([^?#]*)(.*)$/.exec(url);
      const target = sourceTarget(match[1], path);
      if (map.has(target)) return posix.relative(posix.dirname(output), map.get(target)) + match[2];
      return blobUrl(target) + match[2];
    }
    // Source trees do not always match Learn's published URL layout (notably
    // versioned PowerShell modules). Keep unselected relative targets tied to
    // the source commit instead of inventing a website path for them.
    if (preserve) {
      if (url.startsWith('/') && !url.startsWith('//') && source.publishedBaseUrl) return new URL(url, source.publishedBaseUrl).href;
      if (url && !/^(?:[a-z][a-z0-9+.-]*:|\/|#)/i.test(url)) {
        const match = /^([^?#]*)(.*)$/.exec(url);
        let target;
        try { target = sourceTarget(decodeURIComponent(match[1]), path); } catch { return url; }
        if (map.has(target)) return (posix.relative(posix.dirname(output), map.get(target)) || posix.basename(map.get(target))) + match[2];
      }
      return resolveSourceLink(url, path, output, map, blobUrl(path));
    }
    if (!source.publishedBaseUrl) return resolveSourceLink(url, path, output, map, blobUrl(path));
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url)) return url;
    // Learn's /azure, /dotnet, and /rest links are website paths, not GitHub paths.
    const published = new URL(posix.relative(source.paths[0], path).replace(/\.(?:md|ya?ml)$/i, ''), source.publishedBaseUrl).href;
    const resolved = resolveSourceLink(url, path, output, map, published);
    return /^https?:\/\//.test(resolved) ? resolved.replace(/\.(?:md|yml|yaml)(?=[?#]|$)/i, '') : resolved;
  };
  const files = [];
  let normalized = 0;
  for (const [path, bytes] of raw) {
    try {
      if (++normalized % 250 === 0) console.error(`[GitHub] ${source.repository}: normalized ${normalized}/${raw.size} source files`);
      const license = licenseFor(m, path);
      const output = mapping.get(path);
      let data = bytes; let transformation = 'Copied without content changes';
      if (codeFile(path)) {
        // Honor explicit Unicode BOMs in legacy code examples; do not guess an
        // encoding or replace undecodable bytes silently.
        const prefix = bytes.subarray(0, 2).toString('hex');
        const encoding = prefix === 'fffe' ? 'utf-16le' : prefix === 'feff' ? 'utf-16be' : 'utf-8';
        const text = new TextDecoder(encoding, { fatal: true }).decode(bytes).replaceAll('\r\n', '\n').replaceAll('\r', '\n');
        if (text.includes('\0')) throw new Error(`${path}: binary code file`);
        const fence = '`'.repeat(Math.max(3, ...Array.from(text.matchAll(/`+/g), m => m[0].length + 1)));
        data = Buffer.from(`# Source code: ${path}\n\nComplete source file; linked examples may select a region or line range.\n\n${fence}\n${text}\n${fence}\n`);
        transformation = `Complete source code preserved as a fenced Markdown document; decoded from ${encoding}; line endings normalized; source license attribution retained`;
      } else if (isDocument(path) || yamlDocuments.has(path)) {
        // Includes must be part of the reviewed source selection. Never fetch
        // arbitrary dependencies while holding publish credentials.
        let input = bytes;
        const emptySource = rendered && !bytes.toString('utf8').trim();
        const markdownLink = (label, url) => `[${label.replace(/[\\[\]]/g, '\\$&')}](${url.replaceAll(' ', '%20')})`;
        const missing = (kind, target) => {
          unresolved.push({ path, kind, target });
          return markdownLink(`${kind} unavailable in this source snapshot: ${target}`, blobUrl(path));
        };
        if (/\.(md|markdown)$/i.test(path) || yamlDocuments.has(path)) input = Buffer.from(expandIncludes(yamlDocuments.get(path) ?? bytes.toString('utf8'), path, raw, [], (included) => licenseFor(m, included).id === license.id,
          preserve ? { resolve: sourceTarget, missing: target => missing('Include', target), skipComments: rendered } : undefined));
        if (m.normalization.docfx) input = Buffer.from((m.normalization.docfxProfile === 'rendered-v2' ? renderedDocfxMarkdownV2 : rendered ? renderedDocfxMarkdown : preserve ? preserveDocfxMarkdown : normalizeDocfxMarkdown)(input.toString('utf8'), { images: m.normalization.images,
          ...(preserve ? { unknownDirectives: 'preserve', frontmatterAsCode: invalidMetadata.has(path), onPreservedReference: target => unresolved.push({ path, kind: 'Malformed reference retained as code', target }), reference: (kind, target, label) => {
            if (kind === 'xref') return markdownLink(label, resolveUrl(`xref:${target}`, path, output, mapping));
            const clean = target.replace(/^<([^>]+)>.*$/, '$1').replace(/\s+["'].*$/, '');
            const file = sourceTarget(clean.split(/[?#]/)[0], path);
            if (!mapping.has(file)) return missing('Code reference', clean);
            const relative = posix.relative(posix.dirname(path), file);
            return markdownLink(`${label} (complete source file; reference: ${clean})`, relative);
          } } : {}),
        }));
        if (rendered) {
          // Gezk's metadata reader requires an exact closing delimiter line.
          // Preserve the YAML values while canonicalizing harmless trailing space.
          const block = splitFrontmatterBlock(input.toString('utf8'));
          if (block.frontmatter && !block.frontmatter.endsWith('\n') && /^[ \t]*\r?\n/.test(block.body)) input = Buffer.from(block.frontmatter + '\n' + block.body.replace(/^[ \t]*\r?\n/, ''));
        }
        // Empty fragments still need a durable Markdown/provenance record. Their
        // inclusion above remains empty; the standalone file records that fact.
        if (emptySource) input = Buffer.from('<!-- Empty source document at the pinned revision; no article text was supplied. -->\n');
        const converted = await normalizeDocument(input, yamlDocuments.has(path) ? output : path, {
          images: m.normalization.images,
          assetPrefix: posix.join(posix.dirname(output), '_assets', sha256(path).slice(0, 12)),
          rewriteUrl: (url) => resolveUrl(url, path, output, mapping),
        });
        data = Buffer.from(converted.markdown); transformation = converted.transformation + (m.normalization.docfx ? '; DocFX includes expanded, directives normalized, YAML bodies converted' : '');
        if (emptySource) transformation += '; empty source recorded with an explanatory Markdown comment';
        for (const asset of converted.assets) {
          const assetLicense = licenseFor(m, asset.path);
          files.push(record(asset.path, asset.bytes, bytes, path, transformation, assetLicense));
        }
      } else if (m.normalization.docfx && /(^|\/)toc\.ya?ml$/i.test(path)) {
        data = Buffer.from(rewriteDocfxToc(bytes.toString('utf8'), path, mapping, resolveUrl));
        transformation = 'DocFX navigation links mapped to normalized documents and public website targets';
      }
      files.push(record(output, data, bytes, path, transformation, license));
    } catch (error) {
      throw new Error(`${path}: ${error.message}`, { cause: error });
    }
  }
  if (preserve) legal.push({ path: 'LICENSES/import-report.json', bytes: Buffer.from(json({ schemaVersion: 1, repository: source.repository, revision, documents: files.length, codeDocuments: files.filter(f => f.path.startsWith('_code/')).length, unresolved, note: 'Unavailable source dependencies are visibly marked in their articles. Code transclusions link to complete preserved source files. External UID references use Microsoft Learn search.' })) });
  function record(path, bytes, sourceBytes, sourcePath, transformation, license) {
    return { path, bytes, provenance: { path, sha256: sha256(bytes), sourceSha256: sha256(sourceBytes), sourceUrl: blobUrl(sourcePath), sourceRevision: revision, license: license.id, attribution: license.attribution, transformation } };
  }
  return { revision, files, legal };
}

export function expandIncludes(text, path, files, ancestors = [], canInclude, options) {
  if (ancestors.includes(path) || ancestors.length >= 16) throw new Error(`Cyclic or excessively nested include: ${path}`);
  const protectedSpans = [];
  // Commented examples can include the file itself. Keep them literal, just as
  // Squisq's directive/reference passes do; never resolve them as dependencies.
  if (options?.skipComments) for (const comment of text.matchAll(/<!--[\s\S]*?-->/g)) protectedSpans.push([comment.index, comment.index + comment[0].length]);
  walkMarkdownTree(parseMarkdown(text, options?.skipComments ? { directive: false } : undefined), (node) => {
    if (['code', 'inlineCode'].includes(node.type) && node.position) protectedSpans.push([node.position.start.offset, node.position.end.offset]);
  });
  return text.replace(/\[!INCLUDE\s*\[[^\]]*\]\(([^)]+)\)\]/gi, (original, target, offset) => {
    if (protectedSpans.some(([start, end]) => offset >= start && offset < end)) return original;
    const included = options?.resolve ? options.resolve(target, path) : posix.normalize(posix.join(posix.dirname(path), target));
    const bytes = files.get(included);
    if (!bytes || !/\.md$/i.test(included)) {
      if (options?.missing) return options.missing(target);
      throw new Error(`${path}: include ${included} must be selected and licensed explicitly`);
    }
    if (canInclude && !canInclude(included)) throw new Error(`${path}: mixed-license includes need an explicit combined attribution policy`);
    const body = splitFrontmatterBlock(bytes.toString('utf8')).body;
    const expanded = expandIncludes(body, included, files, [...ancestors, path], canInclude, options);
    return rewriteMarkdownReferences(expanded, { rewriteUrl: (url) => {
      if (!url || /^(?:[a-z][a-z0-9+.-]*:|\/|#)/i.test(url)) return url;
      const match = /^([^?#]*)([?#].*)?$/.exec(url);
      const destination = posix.normalize(posix.join(posix.dirname(included), match[1]));
      return posix.relative(posix.dirname(path), destination) + (match[2] ?? '');
    } });
  });
}
