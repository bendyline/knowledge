import { readFile } from 'node:fs/promises';
import { posix, resolve } from 'node:path';
import { parseDocument } from 'yaml';
import { digest, exists, inside, inventory, readJson, walk } from './files.mjs';

const frontMatter = (path, text) => {
  const front = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!front) throw new Error(`${path}: guides need YAML front matter with a title and summary`);
  const doc = parseDocument(front[1], { schema: 'core', uniqueKeys: true });
  if (doc.errors.length || doc.warnings.length) throw new Error(`${path}: ${[...doc.errors, ...doc.warnings][0].message}`);
  return doc.toJS({ maxAliasCount: 0 });
};

// Guides are original editorial documents. Every guide must cite at least one
// source-book section, and every relative link must name a catalog document.
// Without `available` (definition-only validation) links are checked by shape.
export function checkGuide(path, text, available) {
  if (text.includes('\r') || text.includes('\0')) throw new Error(`${path}: Markdown must use LF and contain no NULs`);
  const data = frontMatter(path, text);
  if (typeof data?.title !== 'string' || !data.title.trim() || typeof data.summary !== 'string' || !data.summary.trim()) throw new Error(`${path}: guides need a title and summary`);
  let citations = 0;
  for (const match of text.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const target = match[1];
    if (target.startsWith('#') || /^https?:\/\//i.test(target)) continue;
    if (/^[a-z][a-z0-9+.-]*:/i.test(target)) throw new Error(`${path}: unsupported link ${target}`);
    let resolved;
    try { resolved = posix.normalize(posix.join(posix.dirname(path), decodeURIComponent(target.split('#')[0]))); } catch { throw new Error(`${path}: malformed link ${target}`); }
    if (!/^(books|guides)\/.+\.md$/.test(resolved) || (available && !available.has(resolved))) throw new Error(`${path}: link ${target} does not name a catalog document`);
    if (resolved.startsWith('books/')) citations++;
  }
  if (!citations) throw new Error(`${path}: guides must cite at least one source book section`);
}

export async function checkGuideDefinitions(catalog) {
  const base = resolve(catalog.definitionDir ?? catalog.dir, 'guides');
  if (!await exists(base)) throw new Error(`${catalog.key}: source.guides is enabled but guides/ is missing`);
  for (const rel of await walk(base)) {
    const path = `guides/${rel}`;
    if (!/(?:^|\/)_topic\.yaml$|\.md$/.test(rel)) throw new Error(`${path}: guides accept Markdown and _topic.yaml files only`);
    if (rel.endsWith('.md')) checkGuide(path, await readFile(inside(base, rel), 'utf8'));
  }
}

export async function validateGutenbergSelection(catalog, provenance) {
  const { manifest: m } = catalog;
  if (m.source.type !== 'gutenberg') return;
  const selection = await readJson(resolve(catalog.dir, 'LICENSES/gutenberg-selection.json'));
  const counts = new Map(selection.books.map((b) => [b.ebook, 0]));
  for (const p of provenance) {
    if (p.path === 'books/_topic.yaml' || (m.source.guides && p.path.startsWith('guides/'))) continue;
    if (!counts.has(p.gutenbergEbook) || !p.path.startsWith(`books/pg${p.gutenbergEbook}/`)) throw new Error(`${p.path}: not part of the accepted Gutenberg selection`);
    if (p.path.endsWith('.md')) counts.set(p.gutenbergEbook, counts.get(p.gutenbergEbook) + 1);
  }
  for (const b of selection.books) if (counts.get(b.ebook) !== b.documents) throw new Error(`Gutenberg #${b.ebook}: selection and provenance disagree`);
  if (!m.source.guides) return;
  // Guides are edited in the catalog definition; stale accepted copies must be
  // refreshed by prepare-content before a build can use them.
  const defined = await inventory(resolve(catalog.definitionDir ?? catalog.dir, 'guides'));
  if (digest(defined) !== digest(await inventory(resolve(catalog.dir, 'content/guides')))) throw new Error(`${catalog.key}: guides changed since the accepted snapshot; run npm run prepare-content -- --catalog ${catalog.key}`);
}
