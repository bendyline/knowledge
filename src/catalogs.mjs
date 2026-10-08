import { readFile, readdir } from 'node:fs/promises';
import { extname, matchesGlob, resolve } from 'node:path';
import { parseDocument } from 'yaml';
import { CatalogSchema, ProvenanceSchema, SourceLockSchema } from './schema.mjs';
import { digest, exists, inside, inventory, readJson, sha256, walk } from './files.mjs';
import { NORMALIZER_VERSION } from './normalize.mjs';
import { parseMarkdown, splitFrontmatterBlock, walkMarkdownTree } from '@bendyline/squisq/markdown';
import { automaticLicensing, validateAutomaticLicensing } from './licensing.mjs';
import { validateWikipediaSelection } from './wikipedia-selection.mjs';
import { toolchainIdentity } from './toolchain.mjs';
import { CASELAW_NORMALIZER } from './sources/caselaw-normalize.mjs';
import { GUTENBERG_NORMALIZER } from './sources/gutenberg-normalize.mjs';
import { checkGuideDefinitions, validateGutenbergSelection } from './gutenberg-selection.mjs';
import { workspaceDefinitionFiles } from './catalog-workspace.mjs';
import docfxPreservation from '../vendor/squisq/source-preservation.json' with { type: 'json' };
import docfxRendered from '../vendor/squisq/source-rendered.json' with { type: 'json' };
import docfxRenderedV2 from '../vendor/squisq/source-rendered-v2.json' with { type: 'json' };

export function hasUnresolvedDocfx(text) {
  // Frontmatter values are metadata, not rendered DocFX directives. YAML
  // validity is checked independently by validateCatalog.
  text = splitFrontmatterBlock(text).body;
  const directives = [...text.matchAll(/\[!INCLUDE\b|\[!code-|<xref:|:::\s*(?:image|zone|code|row|column)\b/gi)];
  // Most catalogs have no DocFX syntax. Avoid parsing every large Wikipedia
  // article merely to establish that there are no directives to inspect.
  if (!directives.length) return false;
  const spans = [];
  walkMarkdownTree(parseMarkdown(text), (node) => {
    if (['code', 'inlineCode'].includes(node.type) && node.position) spans.push([node.position.start.offset, node.position.end.offset]);
  });
  const comments = /<!--[\s\S]*?(?:-->|$)/g;
  for (let comment; (comment = comments.exec(text));) {
    if (spans.some(([start, end]) => comment.index >= start && comment.index < end)) { comments.lastIndex = comment.index + 4; continue; }
    spans.push([comment.index, comment.index + comment[0].length]);
  }
  return directives.some((m) => !spans.some(([start, end]) => m.index >= start && m.index < end));
}

export function parseYaml(text, label) {
  if (Buffer.byteLength(text) > 1024 * 1024) throw new Error(`${label}: YAML exceeds 1 MiB`);
  const doc = parseDocument(text, { schema: 'core', uniqueKeys: true });
  if (doc.errors.length || doc.warnings.length) throw new Error(`${label}: ${[...doc.errors, ...doc.warnings][0].message}`);
  return doc.toJS({ maxAliasCount: 0 });
}
export function licenseFor(manifest, path) {
  const preserve = manifest.normalization.docfxReferences === 'preserve';
  const rules = manifest.licensing.rules.filter((r) => r.include.some((glob) => matchesGlob(preserve ? path.toLowerCase() : path, preserve ? glob.toLowerCase() : glob)));
  const ids = [...new Set(rules.map((r) => r.license))];
  if (ids.length !== 1) throw new Error(`${path}: expected exactly one applicable license, found ${ids.length}`);
  return manifest.licensing.licenses.find((l) => l.id === ids[0]);
}
export async function catalogs(root, selector, { disabled = false } = {}) {
  const base = resolve(root, 'catalogs');
  const result = [];
  if (!await exists(base)) return result;
  // walk first to reject symlinks before directory traversal follows anything.
  await walk(base);
  for (const org of await readdir(base, { withFileTypes: true })) {
    if (!org.isDirectory()) continue;
    for (const name of await readdir(resolve(base, org.name), { withFileTypes: true })) {
      if (!name.isDirectory()) continue;
      const key = `${org.name}/${name.name}`;
      if (!/^[a-z0-9-]+\/[a-z0-9-]+$/.test(key)) throw new Error(`Invalid catalog directory: ${key}`);
      const dir = inside(base, key);
      const manifest = CatalogSchema.parse(await readJson(resolve(dir, 'manifest.json')));
      result.push({ key, dir: manifest.contentStorage === 'workspace' ? inside(resolve(root, '.work/catalogs'), key) : dir,
        ...(manifest.contentStorage === 'workspace' ? { definitionDir: dir } : {}), manifest, root });
    }
  }
  const ids = result.map((c) => c.manifest.id);
  if (new Set(ids).size !== ids.length) throw new Error('Catalog IDs must be globally unique');
  const selected = result.filter((c) => (disabled || c.manifest.enabled) && (!selector || selector === 'all' || selector === c.key));
  if (selector && selector !== 'all' && !selected.length) throw new Error(`No enabled catalog matches ${selector}`);
  return selected.sort((a, b) => a.key.localeCompare(b.key));
}
export async function validateCatalog(catalog, { allowEmpty = false, definitionOnly = false } = {}) {
  const { dir, manifest: m } = catalog;
  if (definitionOnly && m.contentStorage === 'workspace') {
    await workspaceDefinitionFiles(catalog);
    for (const path of [m.licensing.notice, ...m.licensing.licenses.map(l => l.text)]) {
      if (!(await readFile(inside(catalog.definitionDir, path), 'utf8')).trim()) throw new Error(`${path}: empty notice/license`);
    }
    if (m.source.type === 'gutenberg' && m.source.guides) await checkGuideDefinitions(catalog);
    return { catalog: catalog.key, status: 'definition valid; source evidence and content checked during prepare/build', contentStorage: 'workspace' };
  }
  if (m.contentStorage === 'workspace' && !await exists(resolve(dir, 'sources.lock.json'))) throw new Error(`${catalog.key}: content is not prepared; run npm run prepare-content -- --catalog ${catalog.key}`);
  if (m.licensing.status !== 'approved' && !automaticLicensing(m)) {
    if (m.enabled) throw new Error(`${catalog.key}: license review is pending`);
    return { catalog: catalog.key, status: 'disabled; license review pending' };
  }
  await validateAutomaticLicensing(catalog);
  for (const path of [m.licensing.notice, ...m.licensing.licenses.map((l) => l.text)]) {
    if (!(await readFile(inside(dir, path), 'utf8')).trim()) throw new Error(`${path}: empty notice/license`);
  }
  const content = resolve(dir, 'content');
  const files = await inventory(content);
  if (!allowEmpty && !files.some((f) => /\.md$/i.test(f.path))) throw new Error(`${catalog.key}: no Markdown documents`);
  for (const file of files) {
    if (!/\.(md|ya?ml|png|jpe?g|gif|webp|svg)$/i.test(file.path)) throw new Error(`${file.path}: content/ accepts Markdown, YAML, and approved images only; use import/sync to normalize source documents`);
    licenseFor(m, file.path);
    if (['.yml', '.yaml'].includes(extname(file.path))) {
      const text = await readFile(inside(content, file.path), 'utf8');
      parseYaml(text, file.path);
      if (/^###\s*YamlMime:/m.test(text) && !/(^|\/)toc\.ya?ml$/i.test(file.path)) throw new Error(`${file.path}: DocFX YAML document bodies need an explicit Markdown converter before import`);
    }
    if (/\.md$/i.test(file.path)) {
      const text = await readFile(inside(content, file.path), 'utf8');
      if (text.includes('\r') || text.includes('\0')) throw new Error(`${file.path}: Markdown must use LF and contain no NULs`);
      const front = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(text);
      if (front) parseYaml(front[1], file.path);
      if (hasUnresolvedDocfx(text)) throw new Error(`${file.path}: unresolved DocFX include/xref; normalize it before building`);
    }
  }
  const provenancePath = resolve(dir, 'provenance.jsonl');
  const provenance = await exists(provenancePath)
    ? (await readFile(provenancePath, 'utf8')).trim().split('\n').filter(Boolean).map((line) => ProvenanceSchema.parse(JSON.parse(line))) : [];
  const byPath = new Map(provenance.map((p) => [p.path, p]));
  if (byPath.size !== provenance.length) throw new Error('Duplicate provenance paths');
  await validateWikipediaSelection(catalog, provenance);
  await validateGutenbergSelection(catalog, provenance);
  if (m.source.type !== 'manual' && files.length) {
    const lock = SourceLockSchema.parse(await readJson(resolve(dir, 'sources.lock.json')));
    if (lock.contentDigest !== digest(files)) throw new Error(`${catalog.key}: synced content has local edits; resync or move edits to a manual catalog`);
    if (lock.sourceConfigDigest !== sourceConfigDigest(m)) throw new Error(`${catalog.key}: source policy changed; run sync again`);
    if (digest(lock.files) !== digest(provenance)) throw new Error('Lock/provenance disagreement');
    for (const file of files) if (byPath.get(file.path)?.sha256 !== file.sha256) throw new Error(`${file.path}: missing or stale provenance`);
  }
  return { catalog: catalog.key, files: files.length, documents: files.filter((f) => /\.md$/i.test(f.path)).length, contentDigest: digest(files) };
}
export const sourceConfigDigest = (m) => digest({ source: m.source, normalization: m.normalization, licensing: m.licensing, normalizer: NORMALIZER_VERSION, ...(m.normalization.docfxReferences ? { docfxPreservation: m.normalization.docfxProfile === 'rendered-v2' ? docfxRenderedV2.sha256 : m.normalization.docfxProfile ? docfxRendered.sha256 : docfxPreservation.sha256, githubDocfxProfile: m.normalization.docfxProfile === 'rendered-v2' ? 4 : m.normalization.docfxProfile ? 3 : 2 } : {}), ...(m.source.type.startsWith('caselaw') ? { caselawNormalizer: CASELAW_NORMALIZER } : {}), ...(m.source.type === 'gutenberg' ? { gutenbergNormalizer: GUTENBERG_NORMALIZER } : {}) });
export async function buildDigest(catalog, packaging) {
  const files = await inventory(catalog.dir);
  const relevant = files.filter((f) => f.path !== 'manifest.json');
  const { $schema, ...manifest } = catalog.manifest;
  const code = await inventory(resolve(catalog.root, 'src'));
  const lock = sha256(await readFile(resolve(catalog.root, 'package-lock.json')));
  return digest({ manifest, files: relevant, code, lock, node: process.version, toolchain: toolchainIdentity, ...(packaging ? { packaging } : {}) });
}
