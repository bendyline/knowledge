import { parseHtmlToNodes, stringifyHtmlNodes } from '@bendyline/squisq/markdown';
import { stringify } from 'yaml';
import { normalizeDocument } from '../normalize.mjs';

export const GUTENBERG_NORMALIZER = 'gutenberg-html@1';
export const PUBLIC_DOMAIN_STATEMENT = 'Public domain in the USA.';
const CATALOG_COLUMNS = ['Text#', 'Type', 'Issued', 'Title', 'Language', 'Authors', 'Subjects', 'LoCC', 'Bookshelves'];
// The PG license requires removing the license and every reference to Project
// Gutenberg. A plain "Gutenberg" can be the printer and is ordinary book text.
export const PG_REFERENCE = /project[\s\\]*gutenberg|gutenberg\.org|pglaf/i;
const MAX_SECTION_CHARS = 80000; const MIN_SECTION_WORDS = 40; const PART_CHARS = 40000;
const CONTAINERS = new Set(['div', 'section', 'article', 'main']);
const NUMBER = '(?:[ivxlcdm]+|\\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|(?:twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)(?:[- ](?:one|two|three|four|five|six|seven|eight|nine))?|first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth)';
// Headings such as "CHAPTER II" or "IV." that only number a section.
const BARE_LABEL = new RegExp(`^(?:(?:chapter|chap\\.?|part|book|section|lecture|lesson|letter|article|no\\.?)\\s*)?${NUMBER}\\s*[.:]?$`, 'i');
const PLACEHOLDER_ALT = /^\[?(?:illustration|decoration|image|picture|figure|ornament|magnify|logo|cover|banner)\]?\.?$|^(?:[a-z]{1,5}[-_ ]?)?\d{1,4}[a-z]?$/i;
const VIEWER_NOTE = /^(?:click|tap)\s+(?:on\s+)?(?:the\s+|an?\s+)?(?:image|picture|illustration|figure)s?\s+(?:to|for)\s+(?:view|see|enlarge|a larger)/i;
// Back-of-book indexes cite printed page numbers, which conversion removes.
const INDEX_SECTION = /^(?:general |alphabetical |analytical |subject |complete )?index\b/i;
const NAV_LABEL = /^\[?(?:toc|contents|table of contents|back|top|index|return|go to top|back to top)\]?\.?$/i;
const IMPRINT = /^(?:copyright|printed|all rights|published|entered according|press of)\b/i;
const MEDIA = new Set(['picture', 'svg', 'object', 'embed', 'video', 'audio', 'source', 'map', 'area', 'iframe']);
const comparable = (value) => value.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
const BLOCKS = new Set(['p', 'div', 'section', 'article', 'aside', 'blockquote', 'pre', 'table', 'tr', 'td', 'th', 'ul', 'ol', 'li', 'dl', 'dt', 'dd', 'figure', 'figcaption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

export function parseCatalogCsv(text) {
  const rows = []; let row = []; let field = ''; let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c !== '"') field += c;
      else if (text[i + 1] === '"') { field += '"'; i++; } else quoted = false;
    } else if (c === '"' && !field) quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (quoted) throw new Error('Gutenberg catalog CSV ends inside a quoted field');
  if (field || row.length) { row.push(field); rows.push(row); }
  const [head, ...body] = rows;
  if (JSON.stringify(head) !== JSON.stringify(CATALOG_COLUMNS)) throw new Error('Gutenberg catalog CSV columns changed; review the selection adapter');
  return body.map((r, line) => {
    if (r.length !== head.length) throw new Error(`Gutenberg catalog CSV row ${line + 2} has ${r.length} fields`);
    return Object.fromEntries(head.map((h, i) => [h, r[i]]));
  });
}

// Zero-width spaces separate words in some titles; joiners and BOMs do not.
export const cleanText = (value) => String(value ?? '').replace(/[\u200b\u2060]/g, ' ').replace(/[\u200c\u200d\ufeff]/g, '').replace(/\s+/g, ' ').trim();
const list = (value) => value.split(';').map(cleanText).filter(Boolean);
export function selectBooks(rows, { bookshelf, language, exclude = [] }) {
  const skipped = new Set(exclude.map((e) => e.ebook));
  return rows.filter((r) => r.Type === 'Text' && list(r.Language).includes(language) && list(r.Bookshelves).includes(bookshelf))
    .map((r) => ({ ebook: Number(r['Text#']), title: cleanText(r.Title), authors: list(r.Authors) }))
    .filter((b) => Number.isSafeInteger(b.ebook) && b.ebook > 0 && !skipped.has(b.ebook))
    .sort((a, b) => a.ebook - b.ebook);
}

// "Sears, George Washington, 1821-1890" -> "George Washington Sears".
export function displayName(creator) {
  const name = creator.replace(/\s*\[[^\]]*\]/g, '').replace(/,\s*(?:active |approximately )?(?:\d{1,4}\??\s*(?:BCE|BC|CE)?\??\s*-\s*(?:\d{1,4}\??\s*(?:BCE|BC|CE)?)?|-\s*\d{1,4}\??)\s*$/i, '').replace(/\s*\([^)]*\)\s*/g, ' ').trim();
  const parts = name.split(',').map((p) => p.trim()).filter(Boolean);
  return parts.length === 2 ? `${parts[1]} ${parts[0]}` : name;
}
export function shortTitle(title, max = 120) {
  const first = cleanText(title.split(/\r?\n/)[0]).replace(/[\s:;,]+$/, '');
  if (first.length <= max) return first;
  return `${first.slice(0, max).replace(/\s+\S*$/, '')}…`;
}

const text = (node) => node.type === 'htmlText' ? node.value : node.tagName === 'br' ? ' ' : (node.children ?? []).map(text).join('');
const classes = (node) => (node.attributes?.class ?? '').split(/\s+/).filter(Boolean);
const level = (node) => node.type === 'htmlElement' && /^h[1-6]$/.test(node.tagName) ? Number(node.tagName[1]) : 0;
const words = (nodes) => nodes.map(text).join(' ').split(/\s+/).filter(Boolean).length;
const chars = (nodes) => nodes.reduce((sum, n) => sum + text(n).length, 0);
const hasHeading = (nodes) => nodes.some((n) => level(n) || (n.children && hasHeading(n.children)));
const pad = (n) => String(n).padStart(3, '0');

// The HTML parser leaves character references in attribute values as written.
const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
export const decodeAttribute = (value) => String(value ?? '').replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, ref) => {
  if (ref[0] !== '#') return NAMED[ref.toLowerCase()] ?? whole;
  const code = ref[1].toLowerCase() === 'x' ? parseInt(ref.slice(2), 16) : Number(ref.slice(1));
  return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : whole;
});

export function bookMetadata(nodes) {
  const meta = new Map(); const creators = [];
  const visit = (items) => { for (const n of items) {
    if (n.type !== 'htmlElement') continue;
    if (n.tagName === 'header' || n.tagName === 'footer') continue;
    if (n.tagName === 'meta' && n.attributes.name) {
      // Titles keep their line breaks, which separate title from subtitle.
      const value = decodeAttribute(n.attributes.content).replace(/[^\S\n]+/g, ' ').trim();
      if (n.attributes.name === 'dc.creator') creators.push(cleanText(value));
      else if (!meta.has(n.attributes.name)) meta.set(n.attributes.name, value);
    }
    if (n.children) visit(n.children);
  } };
  visit(nodes);
  return { title: meta.get('dc.title') ?? '', language: meta.get('dc.language'), rights: meta.get('dc.rights'), modified: meta.get('dcterms.modified'), creators: creators.filter(Boolean) };
}

// Generated PG HTML places its license and trademark text in header#pg-header
// and footer#pg-footer. The transcribed book is everything between them in
// document order; older layouts nest the markers in wrapper elements, which
// are unwrapped only along the path to a marker.
export function bookBody(nodes) {
  const marker = (n) => n.type === 'htmlElement' && ((n.tagName === 'header' && n.attributes.id === 'pg-header') ? 'header' : (n.tagName === 'footer' && n.attributes.id === 'pg-footer') ? 'footer' : undefined);
  const contains = (n) => (n.children ?? []).some((c) => marker(c) || contains(c));
  const seen = []; const body = [];
  const visit = (items) => { for (const n of items) {
    const kind = marker(n);
    if (kind) seen.push(kind);
    else if (contains(n)) visit(n.children);
    else if (seen.length === 1 && seen[0] === 'header') body.push(n);
  } };
  visit(nodes);
  if (seen.join() !== 'header,footer') throw new Error('Project Gutenberg header/footer boundaries not found');
  return body;
}

function clean(nodes, stats) {
  return nodes.flatMap((node) => {
    if (node.type !== 'htmlElement') return [node];
    if (['script', 'style', 'nav', 'meta', 'link'].includes(node.tagName)) return [];
    if (classes(node).some((c) => /page-?num|^pageno$/i.test(c))) { stats.pageNumbers++; return []; }
    if (node.tagName === 'img' && PLACEHOLDER_ALT.test(cleanText(node.attributes.alt))) { stats.altTexts++; return []; }
    let result = { ...node, children: clean(node.children ?? [], stats) };
    if (node.tagName === 'pre' && !cleanText(text(result))) return [];
    // Back-links such as "ToC" inside a chapter heading are navigation, not title.
    if (level(node)) {
      const nav = (c) => c.tagName === 'a' && (c.attributes.href ?? '').startsWith('#') && NAV_LABEL.test(cleanText(text(c)));
      const prune = (items) => items.flatMap((c) => nav(c) ? [] : c.type === 'htmlElement' ? [{ ...c, children: prune(c.children ?? []) }] : [c]);
      const pruned = prune(result.children);
      if (cleanText(pruned.map(text).join(''))) { stats.unwrappedLinks += Number(JSON.stringify(pruned) !== JSON.stringify(result.children)); result = { ...result, children: pruned }; }
    }
    // With images omitted, alt text that repeats the figure's caption is noise.
    if (BLOCKS.has(node.tagName)) {
      const own = comparable(text(result));
      const prune = (items) => items.flatMap((c) => {
        const alt = comparable(cleanText(c.attributes?.alt));
        if (c.tagName === 'img' && alt.length >= 4 && own.includes(alt)) { stats.altTexts++; return []; }
        return c.type === 'htmlElement' && !BLOCKS.has(c.tagName) ? [{ ...c, children: prune(c.children ?? []) }] : [c];
      });
      result = { ...result, children: prune(result.children) };
    }
    result = { ...result, children: siblingCaptions(result.children, stats) };
    // Innermost blocks are visited first; drop the smallest block that still
    // names Project Gutenberg (typically a transcriber's or producer's note).
    if (BLOCKS.has(node.tagName) && PG_REFERENCE.test(text(result))) {
      if (text(result).length > 2000) throw new Error('A long source block refers to Project Gutenberg; review this book manually');
      stats.referenceBlocks++;
      return [];
    }
    return [result];
  });
}

// Some editions lay out the whole book in a table with one filled cell.
function layoutCell(n) {
  if (n.type !== 'htmlElement' || n.tagName !== 'table') return undefined;
  const cells = [];
  const visit = (items) => { for (const c of items) if (c.type === 'htmlElement') { if (['td', 'th'].includes(c.tagName)) cells.push(c); else if (c.tagName !== 'table') visit(c.children ?? []); } };
  visit(n.children ?? []);
  const filled = cells.filter((c) => cleanText(text(c)));
  return filled.length === 1 ? filled[0].children ?? [] : undefined;
}
const wrapped = (n) => n.type === 'htmlElement' ? (CONTAINERS.has(n.tagName) ? n.children ?? [] : layoutCell(n)) : undefined;

// An image whose alt text the next text-bearing sibling (its caption) repeats.
function siblingCaptions(items, stats) {
  return items.flatMap((c, i) => {
    if (c.type !== 'htmlElement' || cleanText(text(c))) return c;
    const next = items.slice(i + 1).find((n) => cleanText(text(n)));
    const caption = next ? comparable(text(next)) : '';
    if (!caption) return c;
    const prune = (n) => {
      const alt = comparable(cleanText(n.attributes?.alt));
      if (n.tagName === 'img' && alt.length >= 4 && caption.includes(alt)) { stats.altTexts++; return null; }
      return n.type === 'htmlElement' ? { ...n, children: (n.children ?? []).map(prune).filter(Boolean) } : n;
    };
    return prune(c) ?? [];
  });
}

// Images are omitted: keep meaningful alt text as text, drop media and viewer
// notes, and trim separators at section edges. Runs after splitting, so it
// never moves a section boundary.
function finish(nodes, stats) {
  const strip = (items) => items.flatMap((n) => {
    if (n.type !== 'htmlElement') return [n];
    if (MEDIA.has(n.tagName)) return [];
    if (n.tagName === 'img') {
      const alt = cleanText(decodeAttribute(n.attributes.alt));
      return alt && !PLACEHOLDER_ALT.test(alt) ? [{ type: 'htmlText', value: ` ${alt} ` }] : [];
    }
    if (VIEWER_NOTE.test(cleanText(text(n))) && cleanText(text(n)).length < 120) { stats.altTexts++; return []; }
    // A paragraph holding only an internal "ToC"/"Top" link is navigation.
    if (n.tagName !== 'a' && NAV_LABEL.test(cleanText(text(n))) && /"href":"(?:#|\d{3}\.md)/.test(JSON.stringify(n))) { stats.unwrappedLinks++; return []; }
    return [{ ...n, children: strip(n.children ?? []) }];
  });
  const out = strip(nodes);
  const edge = (n) => n.type === 'anchor' || (n.type === 'htmlText' && !n.value.trim()) || (n.type === 'htmlElement' && (n.tagName === 'hr' || (!cleanText(text(n)) && n.tagName !== 'br')));
  while (out.length && edge(out[0])) out.shift();
  while (out.length && edge(out.at(-1))) out.pop();
  return out;
}

// Unwrap layout containers so chapter headings become sibling blocks. A
// container's ID survives as an anchor marker for table-of-contents links.
function blocks(nodes) {
  return nodes.flatMap((n) => {
    const inner = wrapped(n);
    if (!inner || !hasHeading(inner)) return [n];
    return [...(n.attributes.id ? [{ type: 'anchor', id: n.attributes.id }] : []), ...blocks(inner)];
  });
}

function chooseLevel(items, minimum) {
  for (let l = 1; l <= 4; l++) if (items.filter((b) => level(b) === l).length >= minimum) return l;
  return 0;
}
function splitAt(items, maxLevel) {
  const sections = [{ blocks: [] }];
  for (const b of items) {
    const l = level(b);
    if (l && l <= maxLevel && sections.at(-1).blocks.some((x) => x.type !== 'anchor' && cleanText(text(x)))) {
      // Anchors that precede a heading (container IDs or empty anchor
      // elements) belong to the chapter they introduce.
      const previous = sections.at(-1).blocks; const moved = [];
      while (previous.length && anchorOnly(previous.at(-1))) moved.unshift(previous.pop());
      sections.push({ blocks: moved });
    }
    sections.at(-1).blocks.push(b);
  }
  return sections.filter((s) => s.blocks.length);
}
// Text-free blocks before a heading (anchors, rules, empty wrappers) move with it.
const anchorOnly = (b) => b.type === 'anchor' || (b.type === 'htmlText' && !b.value.trim()) || (b.type === 'htmlElement' && !cleanText(text(b)) && !JSON.stringify(b).includes('"img"'));
// Oversized wrappers without headings are opened so parts can break inside them.
const expand = (b) => {
  if (b.type !== 'htmlElement' || text(b).length <= PART_CHARS) return [b];
  const inner = b.tagName === 'blockquote' ? b.children ?? [] : wrapped(b);
  return inner ? inner.flatMap(expand) : [b];
};
function byLength(items, title) {
  const parts = [{ blocks: [] }];
  for (const b of items.flatMap(expand)) {
    if (chars(parts.at(-1).blocks) > PART_CHARS) parts.push({ blocks: [], continues: title });
    parts.at(-1).blocks.push(b);
  }
  return parts;
}
// Split at the shallowest frequent heading level, refine oversized sections at
// deeper levels, and fall back to block-boundary parts when no headings remain.
function partition(items, depth = 0, title = undefined) {
  const chosen = chooseLevel(items, depth ? 2 : 3);
  if (!chosen) return depth && chars(items) <= MAX_SECTION_CHARS ? [{ blocks: items }] : byLength(items, title);
  return splitAt(items, chosen).flatMap((s) => {
    if (chars(s.blocks) <= MAX_SECTION_CHARS) return [s];
    const heading = s.blocks.find(level);
    const name = heading ? cleanText(text(heading)) : title;
    if (depth >= 2) return byLength(s.blocks, name);
    const [first, ...rest] = s.blocks;
    const inner = partition(rest, depth + 1, name);
    inner[0].blocks.unshift(first);
    delete inner[0].continues;
    return inner;
  });
}
function merge(sections) {
  const out = [];
  for (const s of sections) {
    const previous = out.at(-1);
    if (previous && words(previous.blocks) < MIN_SECTION_WORDS) previous.blocks.push(...s.blocks);
    else out.push({ ...s, blocks: [...s.blocks] });
  }
  if (out.length > 1 && words(out.at(-1).blocks) < MIN_SECTION_WORDS) out.at(-2).blocks.push(...out.pop().blocks);
  return out;
}

// Drop short converted paragraphs touched by a Project Gutenberg reference,
// including a credit that malformed HTML wrapped across two paragraphs.
function dropReferences(markdown, stats) {
  const paragraphs = markdown.split('\n\n'); let offset = 0;
  const spans = paragraphs.map((p) => { const span = [offset, offset + p.length]; offset += p.length + 2; return span; });
  const drop = new Set();
  for (const m of markdown.matchAll(new RegExp(PG_REFERENCE.source, 'gi'))) {
    spans.forEach(([a, b], i) => { if (a < m.index + m[0].length && b > m.index && paragraphs[i].length <= 2000) drop.add(i); });
  }
  stats.referenceBlocks += drop.size;
  return paragraphs.filter((_, i) => !drop.has(i)).join('\n\n');
}

function sectionTitle(content, book, first) {
  // After the title page, a heading that repeats the book title is not the
  // section's name when another heading follows (the title above CHAPTER I).
  const headings = content.map((b, i) => level(b) ? i : -1).filter((i) => i >= 0);
  const named = headings.filter((i) => !comparable(book).startsWith(comparable(text(content[i]))) || !comparable(text(content[i])));
  const at = !first && headings.length > 1 && named.length ? named[0] : headings[0] ?? -1;
  if (at < 0) return '';
  const label = cleanText(text(content[at]));
  // Bare numbers, and lone words left by drop caps or bylines ("THE", "BY").
  if (!BARE_LABEL.test(label) && !/^(?:the|a|an|by|of|and)$/i.test(label)) return label;
  const next = content.slice(at + 1).find((b) => cleanText(text(b)) && !NAV_LABEL.test(cleanText(text(b))));
  const subject = next ? cleanText(text(next)) : '';
  if (!subject) return label;
  // Use a following subject line, else the first part of a dash-separated
  // synopsis, else the chapter's opening words.
  const synopsis = /^(.{3,100}?)\s*[.,;:]?\s*—/.exec(subject)?.[1];
  const name = (level(next) ? subject.length <= 200 : subject.length <= 100 && subject.split(' ').length <= 12) ? subject : synopsis ?? `${opening(subject)}…`;
  return /^(?:the|a|an|by|of|and)$/i.test(label) ? `${label} ${name}` : `${label.replace(/[.:]$/, '')}: ${name}`;
}
const opening = (value) => cleanText(value).split(' ').slice(0, 8).join(' ');
// Some editions mark subjects with styled paragraphs instead of headings, e.g.
// <p class="center bold">THE GROOM.</p>. These name sections; they never split them.
function pseudoHeading(b) {
  if (b.type !== 'htmlElement' || !['p', 'div'].includes(b.tagName)) return '';
  const value = cleanText(text(b)); const letters = value.replace(/[^\p{L}]/gu, '');
  if (!value || value.length > 80 || value.split(' ').length > 10 || letters.length < 3 || IMPRINT.test(value) || NAV_LABEL.test(value)) return '';
  if (letters.replace(/[^\p{Lu}]/gu, '').length / letters.length < 0.7) return '';
  const styled = classes(b).some((c) => /center|bold|chapter|title|head|caps|large/i.test(c));
  const bold = (b.children ?? []).filter((c) => c.type !== 'htmlText' || c.value.trim()).every((c) => ['b', 'strong', 'big'].includes(c.tagName));
  return styled || bold ? value : '';
}

// Squisq preserves leading spaces as &#x20;. Outside code they are noise, and a
// hard break left at a paragraph end would show as a literal backslash.
function tidy(markdown, stats) {
  let fence = false; const lines = [];
  for (let line of markdown.split('\n')) {
    if (/^\s{0,3}(`{3,}|~{3,})/.test(line)) fence = !fence;
    else if (!fence) {
      const before = line;
      line = line.replace(/^(?:&#x20;)+ */, '').replaceAll('&#x20;', ' ').replace(/[ \t]+$/, '');
      if (line === '\\') line = '';
      if (line !== before) stats.entities++;
    }
    lines.push(line);
  }
  return lines.join('\n').replace(/\\\n(?=\n|$)/g, '\n').replace(/\n{3,}/g, '\n\n');
}

function anchorsOf(nodes, index, anchors) {
  for (const n of nodes) {
    if (n.type === 'anchor') anchors.set(n.id, index);
    if (n.type !== 'htmlElement') continue;
    for (const key of ['id', 'name']) if (n.attributes[key] && !anchors.has(n.attributes[key])) anchors.set(n.attributes[key], index);
    anchorsOf(n.children ?? [], index, anchors);
  }
}
function links(nodes, index, anchors, stats, omitted) {
  return nodes.flatMap((n) => {
    if (n.type === 'anchor') return [];
    if (n.type !== 'htmlElement') return [n];
    const children = links(n.children ?? [], index, anchors, stats, omitted);
    if (n.tagName !== 'a') return [{ ...n, children }];
    const href = n.attributes.href ?? '';
    let target;
    if (href.startsWith('#')) {
      let id; try { id = decodeURIComponent(href.slice(1)); } catch { id = href.slice(1); }
      const section = anchors.get(id);
      if (section !== undefined && section !== index && !omitted.has(section)) target = `${pad(section + 1)}.md`;
    } else if (/^https?:\/\//i.test(href) && !PG_REFERENCE.test(href)) target = href;
    if (!target) { stats.unwrappedLinks += Number(Boolean(href)); return children; }
    if (target.endsWith('.md')) stats.sectionLinks++;
    return [{ ...n, attributes: { href: target }, children }];
  });
}

export async function normalizeBook(html, { ebook, title: listedTitle, authors = [], omitIndexes = false }) {
  const nodes = parseHtmlToNodes(html);
  const meta = bookMetadata(nodes);
  // Editors and compilers are listed in the catalog feed but not as dc.creator.
  if (!meta.creators.length) meta.creators = authors;
  if (meta.rights !== PUBLIC_DOMAIN_STATEMENT) return { meta, excluded: `rights: ${meta.rights ?? 'missing dc.rights'}` };
  // Removing every PG reference would gut a book about PG itself.
  if (PG_REFERENCE.test([meta.title, listedTitle, ...meta.creators].join(' '))) return { meta, excluded: 'title or creator names Project Gutenberg' };
  const stats = { pageNumbers: 0, referenceBlocks: 0, unwrappedLinks: 0, sectionLinks: 0, altTexts: 0, entities: 0, indexes: 0 };
  // Loose top-level text and inline elements have no enclosing block to drop.
  const body = blocks(siblingCaptions(clean(bookBody(nodes), stats), stats).filter((n) => {
    if (!PG_REFERENCE.test(text(n))) return true;
    if (text(n).length > 2000) throw new Error('A long source block refers to Project Gutenberg; review this book manually');
    stats.referenceBlocks++;
    return false;
  }));
  if (!words(body.filter((b) => b.type !== 'anchor'))) throw new Error('Book body is empty');
  const sections = merge(partition(body));
  const anchors = new Map();
  sections.forEach((s, i) => anchorsOf(s.blocks, i, anchors));
  const book = shortTitle(meta.title || listedTitle);
  // Omitted sections keep their numbers, so every other path is unchanged.
  const omitted = new Set();
  if (omitIndexes) sections.forEach((s, i) => {
    const content = s.blocks.filter((b) => b.type !== 'anchor');
    const name = sectionTitle(content, book, false) || pseudoHeading(content.find((b) => cleanText(text(b))) ?? {});
    if (i > 0 && INDEX_SECTION.test(name)) omitted.add(i);
  });
  stats.indexes = omitted.size;
  // Section titles use the main title; long subtitles stay in `book`.
  const main = /^(.{6,}?)(?::|;)\s/.exec(book)?.[1];
  const label = main && main.length < book.length ? main : book;
  const documents = []; let subject;
  for (const [i, s] of sections.entries()) {
    if (omitted.has(i)) continue;
    const content = links(s.blocks, i, anchors, stats, omitted);
    const start = opening(content.map(text).join(' '));
    const heading = sectionTitle(content, book, i === 0);
    const lead = pseudoHeading(content.find((b) => cleanText(text(b))) ?? {});
    const continues = subject ?? s.continues;
    const section = heading || lead || (continues ? `${shortTitle(continues, 100)} (continued: ${start}…)` : i === 0 ? book : `Part ${i + 1}: ${start}…`);
    const marked = content.map(pseudoHeading).filter(Boolean);
    subject = marked.at(-1) ?? (heading ? undefined : subject);
    const result = await normalizeDocument(Buffer.from(stringifyHtmlNodes(finish(content, stats))), `pg${ebook}-${pad(i + 1)}.html`, { images: 'omit', rewriteUrl: (url) => url });
    const image = /(?<!\\)!\[[^\]]*\]\(/.exec(result.markdown);
    if (image) throw new Error(`Section ${i + 1} still contains an image reference: …${result.markdown.slice(Math.max(0, image.index - 40), image.index + 60)}…`);
    const body = tidy(PG_REFERENCE.test(result.markdown) ? dropReferences(result.markdown, stats) : result.markdown, stats);
    const named = shortTitle(section, 160);
    const front = { title: [book, label].some((t) => comparable(t) === comparable(named)) ? label : `${label}: ${named}`, book, authors: meta.creators, ebook, section: i + 1, sections: sections.length };
    const markdown = `---\n${stringify(front)}---\n\n${body}`;
    const leftover = PG_REFERENCE.exec(markdown);
    if (leftover) throw new Error(`Section ${i + 1} still refers to Project Gutenberg after boilerplate removal: …${cleanText(markdown.slice(Math.max(0, leftover.index - 60), leftover.index + 40))}…`);
    documents.push({ path: `${pad(i + 1)}.md`, title: front.title, markdown, transformation: result.transformation });
  }
  const splitLevel = chooseLevel(body, 3);
  const transformation = `${documents[0].transformation}; ${GUTENBERG_NORMALIZER}; Project Gutenberg license and trademark header/footer removed; ${stats.referenceBlocks} producer note block(s) naming Project Gutenberg removed; ${stats.pageNumbers} page-number marker(s) removed; ${stats.indexes} back-of-book index section(s) omitted because their printed page references no longer apply; ${stats.altTexts} placeholder or caption-duplicating image alt text(s) removed; ${stats.entities} line(s) with encoded or trailing spaces tidied; split into ${documents.length} section(s) ${splitLevel ? `at heading level ${splitLevel}` : 'by length'}; ${stats.sectionLinks} internal link(s) mapped to sections, ${stats.unwrappedLinks} source-site or same-section link(s) reduced to text`;
  return { meta, book, documents: documents.map(({ transformation: _, ...d }) => d), transformation };
}
