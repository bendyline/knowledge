import { parseFragment, serialize } from 'parse5';
import { stringify } from 'yaml';
import { posix } from 'node:path';
import { normalizeDocument } from '../normalize.mjs';
import { sha256 } from '../files.mjs';
import { protectMalformedCapUrls } from './caselaw-literal-urls.mjs';
import { addCapHeadMatterSections, neutralizeEmptyCapMarks } from './caselaw-structure.mjs';
import { absentNumberedCapNote } from './caselaw-footnotes.mjs';

export const CASELAW_NORMALIZER = 'cap-html@9';
const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;
const hasClass = (node, name) => (attr(node, 'class') ?? '').split(/\s+/).includes(name);
const textNode = (value) => ({ nodeName: '#text', value });
const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export const capAnchor = (id) => `cap-${sha256(id).slice(0, 20)}`;
function walk(node, visit) { visit(node); for (const child of [...node.childNodes ?? []]) walk(child, visit); }

export function casePath(record) {
  const year = /^(\d{4})(?:-|$)/.exec(record.decision_date ?? '')?.[1] ?? 'undated';
  return `jurisdiction-${record.jurisdiction.id}/court-${record.court.id}/${year}/cap-${record.id}.md`;
}

export async function normalizeCaselaw(record, htmlBytes, { reporter, volume, mapping = new Map() }) {
  const html = new TextDecoder('utf-8', { fatal: true }).decode(htmlBytes);
  const root = parseFragment(html);
  const malformedLiteralUrls = protectMalformedCapUrls(root);
  const emptyFormattingMarks = neutralizeEmptyCapMarks(root);
  const headMatterSections = addCapHeadMatterSections(root);
  const elements = []; walk(root, n => { if (n.tagName) elements.push(n); });
  if (elements.filter(n => hasClass(n, 'casebody')).length !== 1) throw new Error(`CAP ${record.id}: expected one case body`);
  const opinions = elements.filter(n => hasClass(n, 'opinion'));
  if (opinions.length !== record.casebody.opinions.length) throw new Error(`CAP ${record.id}: JSON/HTML opinion count differs`);
  const targets = new Set(elements.map(n => attr(n, 'href')).filter(h => h?.startsWith('#')).map(h => h.slice(1)));
  const knownIds = new Set(elements.map(n => attr(n, 'id')).filter(Boolean));
  let droppedFootnoteBacklinks = 0;
  let missingFootnoteReferences = 0;
  const danglingLinks = [];
  for (const target of targets) if (!knownIds.has(target)) {
    const links = elements.filter(n => attr(n, 'href') === `#${target}`);
    const inFootnote = (node) => { for (let p = node.parentNode; p; p = p.parentNode) if (hasClass(p, 'footnote')) return true; return false; };
    const backlink = target.startsWith('ref_footnote_') && links.every(inFootnote);
    const absentNoteBody = /^footnote_\d+_\d+$/.test(target)
      && links.every(link => hasClass(link, 'footnotemark'))
      && (!elements.some(node => hasClass(node, 'footnote'))
        || absentNumberedCapNote(target, links, elements.filter(node => hasClass(node, 'footnote'))));
    if (!backlink && !absentNoteBody) throw new Error(`CAP ${record.id}: unresolved source anchor ${target}`);
    danglingLinks.push(...links);
    if (backlink) droppedFootnoteBacklinks += links.length;
    else missingFootnoteReferences += links.length;
    targets.delete(target);
  }
  // Validate against the original links, independent of source element order.
  for (const link of danglingLinks) link.attrs = link.attrs.filter(a => a.name !== 'href');
  // Squisq drops HTML IDs. Carry only link targets through conversion as opaque
  // text, then restore safe generated anchors in the accepted Markdown snapshot.
  const prefix = `capanchor${sha256(htmlBytes).slice(0, 16)}`;
  if (html.includes(prefix)) throw new Error('CAP anchor placeholder collision');
  const placeholders = new Map(); const emitted = new Set();
  // Squisq extensions can interpret legal/OCR punctuation as templates, math,
  // directives or hard breaks. Unfinished template spans can also trigger
  // catastrophic serializer backtracking. Character references preserve text.
  let literalSyntaxProtected = 0;
  // Keep punctuation on both placeholder boundaries: restored character
  // references also start/end with punctuation, so emphasis stays well formed.
  // Uppercase HTTP(S) endings need colon protection too: the pinned GFM writer
  // escapes the domain dot but misses uppercase protocol endings.
  const protectSyntax = value => value.replace(/[{$\\]|:(?=[A-Za-z])|(?<=[PS]):(?=\/\/)/g, character => {
    const token = `;${prefix}${placeholders.size}end;`;
    placeholders.set(token, `&#${character.codePointAt(0)};`); literalSyntaxProtected++;
    return token;
  });
  let preformattedLinkBlocks = 0;
  // Some CAP attachments use <pre> for case captions containing live page links.
  // A Markdown code fence would make those links and restored anchors inert.
  for (const node of elements.filter(n => ['pre', 'code'].includes(n.tagName))) {
    let linked = false;
    walk(node, child => { if (attr(child, 'href') || targets.has(attr(child, 'id'))) linked = true; });
    if (linked) { node.tagName = node.nodeName = node.tagName === 'pre' ? 'div' : 'span'; preformattedLinkBlocks++; }
  }
  for (const node of elements) {
    const id = attr(node, 'id');
    if (!id || !targets.has(id) || emitted.has(id)) continue;
    emitted.add(id);
    const token = `${prefix}${placeholders.size}end`;
    placeholders.set(token, `<a id="${capAnchor(id)}"></a>`);
    const index = node.parentNode.childNodes.indexOf(node);
    node.parentNode.childNodes.splice(index, 0, textNode(` ${token} `));
  }
  const addHeading = (node, title) => {
    const heading = parseFragment(`<h2>${escape(title)}</h2>`).childNodes[0];
    node.childNodes.unshift(heading);
  };
  for (const node of elements.filter(n => hasClass(n, 'head-matter'))) addHeading(node, 'Case information');
  opinions.forEach((node, index) => {
    const opinion = record.casebody.opinions[index];
    const type = attr(node, 'data-type') ?? opinion.type ?? 'unknown';
    if (opinion.type && type !== opinion.type) throw new Error(`CAP ${record.id}: JSON/HTML opinion type differs`);
    const label = `${type.charAt(0).toUpperCase()}${type.slice(1)} opinion ${index + 1}`;
    addHeading(node, `${label}${opinion.author ? ` — ${opinion.author}` : ''}`);
  });
  walk(root, node => {
    if (node.nodeName !== '#text') return;
    for (let p = node.parentNode; p; p = p.parentNode) if (['pre', 'code'].includes(p.tagName)) return;
    node.value = protectSyntax(node.value);
  });
  const outputPath = casePath(record);
  const sourceUrl = `https://static.case.law/${reporter}/${volume}/html/${encodeURIComponent(record.file_name)}.html`;
  const result = await normalizeDocument(Buffer.from(serialize(root)), `${record.file_name}.html`, {
    images: 'omit',
    rewriteUrl(url) {
      if (url.startsWith('#')) return `#${capAnchor(url.slice(1))}`;
      const citation = /^(?:https:\/\/(?:cite|static)\.case\.law)?(\/[^/?#]+\/[^/?#]+\/[^/?#]+)\/?$/.exec(url);
      const target = citation && mapping.get(citation[1]);
      if (target) return posix.relative(posix.dirname(outputPath), target);
      if (citation) {
        const [r, v, file] = citation[1].slice(1).split('/');
        return `https://static.case.law/${r}/${v}/html/${file}.html`;
      }
      return new URL(url, sourceUrl).href;
    },
  });
  let markdown = result.markdown;
  const restoreToken = (text, token, replacement) => {
    const first = token.startsWith(';') ? '(?:;|&#x0*3b;|&#0*59;)' : '(?:c|&#x0*63;|&#0*99;)';
    return text.replace(new RegExp(`${first}${token.slice(1)}`, 'gi'), () => replacement);
  };
  for (const [token, anchor] of placeholders) {
    // Remark can encode the first character after an emphasis boundary.
    const restored = restoreToken(markdown, token, anchor);
    if (restored === markdown) throw new Error(`CAP ${record.id}: conversion lost placeholder ${token} (${anchor})`);
    markdown = restored;
  }
  const title = `${record.name_abbreviation || record.name} — ${record.citations[0]?.cite ?? `CAP ${record.id}`}`;
  let heading = (await normalizeDocument(Buffer.from(`<h1>${escape(protectSyntax(title))}</h1>`), 'title.html')).markdown;
  for (const [token, replacement] of placeholders) heading = restoreToken(heading, token, replacement);
  const front = {
    id: `cap-${record.id}`, title,
    aliases: [...new Set([record.name, record.name_abbreviation, ...record.citations.map(c => c.cite)].filter(Boolean))],
    cap: { id: record.id, decisionDate: record.decision_date, jurisdiction: record.jurisdiction, court: record.court,
      reporter, volume, citations: record.citations, docketNumber: record.docket_number ?? '',
      firstPage: record.first_page, lastPage: record.last_page, provenance: record.provenance,
      opinions: record.casebody.opinions.map(o => ({ type: o.type ?? 'unknown', author: o.author ?? '' })),
      ...(droppedFootnoteBacklinks ? { droppedFootnoteBacklinks } : {}),
      ...(literalSyntaxProtected ? { literalSyntaxProtected } : {}),
      ...(preformattedLinkBlocks ? { preformattedLinkBlocks } : {}),
      ...(headMatterSections ? { headMatterSections } : {}),
      ...(emptyFormattingMarks ? { emptyFormattingMarks } : {}),
      ...(malformedLiteralUrls ? { malformedLiteralUrls } : {}),
      ...(missingFootnoteReferences ? { missingFootnoteReferences } : {}),
    },
  };
  markdown = `---\n${stringify(front, { lineWidth: 0 })}---\n\n${heading}\n${markdown}`;
  return { markdown, sourceUrl, transformation: `${CASELAW_NORMALIZER}; ${result.transformation}; case metadata and opinion headings added; link targets retained; selected case citations linked locally; OCR unchanged${malformedLiteralUrls ? `; ${malformedLiteralUrls} malformed literal URLs rendered as code without correction` : ''}${missingFootnoteReferences ? `; ${missingFootnoteReferences} source footnote references with absent note bodies retained as plain text` : ''}${headMatterSections ? `; ${headMatterSections} source head-matter section boundaries retained` : ''}${emptyFormattingMarks ? `; ${emptyFormattingMarks} empty formatting marks made transparent` : ''}${droppedFootnoteBacklinks ? `; ${droppedFootnoteBacklinks} dangling upstream footnote return links retained as plain text` : ''}${literalSyntaxProtected ? `; ${literalSyntaxProtected} literal syntax characters encoded as character references` : ''}${preformattedLinkBlocks ? `; ${preformattedLinkBlocks} preformatted blocks with active links rendered as prose` : ''}` };
}
