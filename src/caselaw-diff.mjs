import { capCoverage, loadCapRoots } from './caselaw-inventory.mjs';
import { capCorpusCoverage, capDocument, capRows } from './caselaw-corpus.mjs';

export function compareCapRecords(before, after) {
  const index = records => {
    const map = new Map(records.map(r => [r.id, r]));
    if (map.size !== records.length) throw new Error('Cannot compare duplicate CAP IDs');
    return map;
  };
  const old = index(before); const current = index(after);
  const added = []; const removed = []; const changed = []; let unchanged = 0;
  for (const [id, row] of current) {
    const prior = old.get(id);
    if (!prior) { added.push(id); continue; }
    const fields = ['metadata', 'html', 'json', 'markdown'].filter(key => prior[key] !== row[key]);
    if (fields.length) changed.push({ id, fields }); else unchanged++;
  }
  for (const id of old.keys()) if (!current.has(id)) removed.push(id);
  return { added: added.sort((a, b) => a - b), removed: removed.sort((a, b) => a - b),
    changed: changed.sort((a, b) => a.id - b.id), unchanged };
}

export async function compareCapSnapshots(before, after, jurisdiction) {
  if (jurisdiction === 'all') throw new Error('Compare explicit jurisdictions');
  const describe = async store => {
    const coverage = await capCorpusCoverage(store, capCoverage(store, await loadCapRoots(store), jurisdiction));
    if (!coverage.ingestionComplete) throw new Error(`Snapshot ${store.snapshot} is incomplete; refusing a potentially misleading removal report`);
    return { coverage, records: capRows(store, coverage.jurisdiction.id).map(row => {
      const doc = capDocument(store, row); const source = JSON.parse(doc.provenance).caselaw;
      return { id: row.id, metadata: row.meta_sha, html: source.htmlSha256, json: source.jsonSha256, markdown: doc.markdown_sha };
    }) };
  };
  const old = await describe(before); const current = await describe(after);
  return { schemaVersion: 1, jurisdiction, before: { snapshot: before.snapshot, corpusDigest: old.coverage.corpusDigest },
    after: { snapshot: after.snapshot, corpusDigest: current.coverage.corpusDigest },
    scope: current.coverage.scope, ...compareCapRecords(old.records, current.records),
    policy: 'Review source changes and removals; create a new frozen plan and release version. Existing archives remain immutable. This report does not apply changes or publish.' };
}
