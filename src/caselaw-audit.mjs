import { resolve } from 'node:path';
import { parseFragment } from 'parse5';
import { parseMarkdown, extractPlainText, walkMarkdownTree } from '@bendyline/squisq/markdown';
import { loadCapRoots, readCapObject } from './caselaw-inventory.mjs';
import { capCorpusCoverage, capDocument, capRows } from './caselaw-corpus.mjs';
import { readCaselawZip } from './sources/caselaw.mjs';
import { atomicJson, digest, sha256 } from './files.mjs';
import { addCapHeadMatterSections } from './sources/caselaw-structure.mjs';
import { capSelectionCoverage, capSelectionKey } from './caselaw-selection.mjs';

const htmlText = node => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(htmlText).join('');
const compact = text => text.replace(/\s/g, '');
export function auditCapText(markdown, html) {
  const document = parseMarkdown(markdown);
  const ids = new Set();
  walkMarkdownTree(document, node => {
    if (['htmlInline', 'htmlBlock'].includes(node.type)) for (const match of (node.rawHtml ?? '').matchAll(/<a id="([^"]+)">/g)) ids.add(match[1]);
  });
  const missing = []; let links = 0;
  walkMarkdownTree(document, node => { if (node.type === 'link' && node.url.startsWith('#')) { links++; if (!ids.has(node.url.slice(1))) missing.push(node.url); } });
  // Only our leading H1 and labeled H2 sections are removed from the comparison.
  if (document.children[0]?.type !== 'heading' || document.children[0].depth !== 1) throw new Error('CAP generated title is absent');
  document.children.shift();
  document.children = document.children.filter(n => !(n.type === 'heading' && n.depth === 2 && /^(Case information$|.* opinion \d+(?: — .*)?$)/.test(extractPlainText(n))));
  // Derive section labels from the original HTML, rather than discarding any
  // H3 that happens to share a label with a generated heading.
  const source = parseFragment(html);
  addCapHeadMatterSections(source);
  return { textMatches: compact(extractPlainText(document)) === compact(htmlText(source)), fragmentLinks: links, missing };
}

export async function auditCapCorpus(store, jurisdiction, { progress } = {}) {
  if (jurisdiction === 'all') throw new Error('Audit explicit jurisdictions');
  const coverage = await capCorpusCoverage(store, capSelectionCoverage(store, await loadCapRoots(store), jurisdiction));
  if (!coverage.ingestionComplete) throw new Error('Complete ingestion is required before the source audit');
  const rows = capRows(store, coverage.selection ?? coverage.jurisdiction.id);
  const groups = new Map();
  for (const row of rows) { const key = `${row.reporter}/${row.folder}`; if (!groups.has(key)) groups.set(key, []); groups.get(key).push(row); }
  const report = { schemaVersion: 1, snapshot: store.snapshot, ...(typeof jurisdiction === 'string' ? { jurisdiction } : { selection: jurisdiction }), corpusDigest: coverage.corpusDigest,
    cases: rows.length, checked: 0, textMatches: 0, fragmentLinks: 0, issues: [], verified: false };
  for (const selected of groups.values()) {
    const first = selected[0];
    const volume = store.db.prepare('SELECT archive_sha FROM volumes WHERE reporter=? AND folder=?').get(first.reporter, first.folder);
    const archive = await readCaselawZip(await readCapObject(store, volume.archive_sha), { maxFileBytes: 30000000, maxExpandedBytes: 400000000 });
    for (const row of selected) {
      try {
        const doc = capDocument(store, row); const p = JSON.parse(doc.provenance);
        const html = archive.files.get(`html/${row.file}.html`); const json = archive.files.get(`json/${row.file}.json`);
        const { casebody, ...meta } = JSON.parse(json);
        if (digest(meta) !== row.meta_sha || sha256(json) !== p.caselaw.jsonSha256 || sha256(html) !== p.caselaw.htmlSha256 || volume.archive_sha !== p.caselaw.archiveSha256) throw new Error('Source provenance hashes differ');
        const md = await readCapObject(store, doc.markdown_sha);
        if (sha256(md) !== p.sha256) throw new Error('Normalized provenance hash differs');
        const check = auditCapText(md.toString('utf8'), html.toString('utf8'));
        report.fragmentLinks += check.fragmentLinks;
        if (check.textMatches) report.textMatches++; else throw new Error('Normalized text differs from HTML after ignoring whitespace/generated headings');
        if (check.missing.length) throw new Error(`Missing fragment targets: ${check.missing.join(', ')}`);
      } catch (error) { report.issues.push({ id: row.id, reporter: row.reporter, volume: row.folder, error: error.message }); }
      report.checked++;
      progress?.(report.checked, rows.length, report.issues.length);
    }
  }
  report.verified = report.checked === report.cases && !report.issues.length;
  await atomicJson(resolve(store.directory, `source-audit-${capSelectionKey(jurisdiction)}.json`), report);
  return report;
}
