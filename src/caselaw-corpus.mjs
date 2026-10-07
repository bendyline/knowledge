import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { request } from './http.mjs';
import { digest, exists, sha256, atomicJson } from './files.mjs';
import { NORMALIZER_VERSION } from './normalize.mjs';
import { CaselawCase, readCaselawZip } from './sources/caselaw.mjs';
import { CASELAW_NORMALIZER } from './sources/caselaw-normalize.mjs';
import { createCapNormalizer } from './caselaw-workers.mjs';
import { capSelectionCoverage, capSelectionFilter, capSelectionKey } from './caselaw-selection.mjs';
import { capBase, capVolumeKey, capWorkers, checkCapTerms, initializeCapInventory, putCapObject, readCapObject } from './caselaw-inventory.mjs';

export const CAP_CORPUS_NORMALIZER = digest({ cap: CASELAW_NORMALIZER, converter: NORMALIZER_VERSION });
export function capRows(store, jurisdictionId) {
  const { where, args } = capSelectionFilter(jurisdictionId);
  return store.db.prepare(`SELECT * FROM cases WHERE ${where} ORDER BY COALESCE(decision_date,'9999'),court,id,reporter,folder`).all(...args);
}
export function capDocument(store, row) {
  return store.db.prepare('SELECT * FROM documents WHERE meta_sha=? AND normalizer=?').get(row.meta_sha, CAP_CORPUS_NORMALIZER);
}
export async function capCorpusCoverage(store, coverage) {
  const rows = capRows(store, coverage.selection ?? coverage.jurisdiction.id);
  const counts = { ready: 0, pending: 0, failed: 0, corrupt: 0, normalizedBytes: 0 };
  const issues = []; const documents = [];
  for (const row of rows) {
    const doc = capDocument(store, row);
    if (!doc || doc.status !== 'ready') {
      const status = doc?.status === 'failed' ? 'failed' : 'pending'; counts[status]++;
      issues.push({ id: row.id, reporter: row.reporter, volume: row.folder, status, ...(doc?.error ? { reason: doc.error } : {}) });
      continue;
    }
    try { await readCapObject(store, doc.markdown_sha); }
    catch (error) { counts.corrupt++; issues.push({ id: row.id, status: 'corrupt', reason: error.message }); continue; }
    counts.ready++; counts.normalizedBytes += doc.bytes;
    documents.push({ id: row.id, metaSha256: row.meta_sha, markdownSha256: doc.markdown_sha, provenance: JSON.parse(doc.provenance) });
  }
  return { ...coverage, normalizer: CAP_CORPUS_NORMALIZER, corpus: counts, issues,
    ingestionComplete: coverage.metadataComplete && counts.ready === coverage.records,
    corpusDigest: digest(documents) };
}

export async function ingestCapCorpus(store, jurisdiction, { download = request, concurrency = 4, progress } = {}) {
  const roots = await initializeCapInventory(store, { download });
  const coverage = capSelectionCoverage(store, roots, jurisdiction);
  if (jurisdiction === 'all') throw new Error('Ingest explicit jurisdictions; use inventory --jurisdiction all for the national metadata sweep');
  if (!coverage.metadataComplete) throw new Error('CAP metadata coverage is incomplete; run inventory and resolve its coverage report first');
  const rows = capRows(store, coverage.selection ?? coverage.jurisdiction.id);
  const grouped = new Map();
  for (const row of rows) {
    const key = capVolumeKey(row.reporter, row.folder);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  }
  await checkCapTerms(download);
  const put = store.db.prepare('INSERT OR REPLACE INTO documents VALUES (?,?,?,?,?,?,?)');
  // Keep every case error visible while continuing independent source volumes.
  const normalizer = createCapNormalizer({ workers: concurrency });
  let failures;
  try { failures = await capWorkers([...grouped.values()], concurrency, async selected => {
    const { reporter, folder } = selected[0];
    const pending = [];
    for (const row of selected) {
      const doc = capDocument(store, row);
      if (doc?.status === 'ready') {
        try { await readCapObject(store, doc.markdown_sha); continue; } catch { /* Rebuild a corrupt cache entry from its pinned ZIP. */ }
      }
      pending.push(row);
    }
    if (!pending.length) return;
    try {
      const volume = store.db.prepare('SELECT * FROM volumes WHERE reporter=? AND folder=?').get(reporter, folder);
      const url = `${capBase}${capVolumeKey(reporter, folder)}.zip`;
      let bytes;
      if (volume.archive_sha) {
        try { bytes = await readCapObject(store, volume.archive_sha); } catch { /* Re-download only if the pinned hash still matches. */ }
      }
      if (!bytes) {
        const oldCache = volume.archive_sha ? resolve(store.root, '.work/source-cache', `cap-${volume.archive_sha}.zip`) : null;
        if (oldCache && await exists(oldCache)) bytes = await readFile(oldCache);
        else bytes = (await download(url, { maxBytes: 100000000 })).bytes;
      }
      const archiveSha = sha256(bytes);
      if (volume.archive_sha && archiveSha !== volume.archive_sha) throw new Error(`CAP ZIP changed within frozen snapshot: ${url}`);
      const archive = await readCaselawZip(bytes, { maxFileBytes: 30000000, maxExpandedBytes: 400000000 });
      const index = archive.files.get('metadata/CasesMetadata.json');
      if (!index) throw new Error('CAP ZIP is missing its case index');
      const metadata = JSON.parse(index);
      const indexed = store.db.prepare('SELECT file,meta_sha FROM cases WHERE reporter=? AND folder=?').all(reporter, folder);
      const expected = new Map(indexed.map(r => [r.file, r.meta_sha]));
      if (!Array.isArray(metadata) || metadata.length !== expected.size || new Set(metadata.map(r => r.file_name)).size !== expected.size) throw new Error('CAP ZIP/index case membership changed');
      for (const meta of metadata) if (expected.get(meta.file_name) !== digest(meta)) throw new Error(`CAP ZIP/index metadata changed: ${meta.id}`);
      const neededPaths = new Set(['metadata/CasesMetadata.json', 'metadata/VolumeMetadata.json']);
      for (const meta of metadata) { neededPaths.add(`json/${meta.file_name}.json`); neededPaths.add(`html/${meta.file_name}.html`); }
      if (neededPaths.size !== archive.files.size || [...neededPaths].some(p => !archive.files.has(p))) throw new Error('CAP ZIP is missing or adds unindexed case files');
      // The index pins all metadata. The ZIP hash additionally pins bodies on first acquisition.
      await putCapObject(store, bytes);
      store.db.prepare('UPDATE volumes SET archive_sha=?,archive_bytes=?,expanded_bytes=? WHERE reporter=? AND folder=?').run(archiveSha, bytes.length, archive.expandedBytes, reporter, folder);
      for (const row of pending) {
        try {
          const jsonBytes = archive.files.get(`json/${row.file}.json`); const htmlBytes = archive.files.get(`html/${row.file}.html`);
          const record = CaselawCase.parse(JSON.parse(jsonBytes));
          const { casebody, ...meta } = record;
          if (digest(meta) !== row.meta_sha) throw new Error('CAP case JSON differs from frozen metadata');
          const result = await normalizer.run(record, htmlBytes, { reporter, volume: folder });
          const markdownSha = await putCapObject(store, Buffer.from(result.markdown));
          const provenance = { path: `cap-${record.id}.md`, sha256: markdownSha, sourceSha256: sha256(htmlBytes), sourceUrl: result.sourceUrl,
            sourceRevision: archiveSha, license: 'cc0', attribution: 'Caselaw Access Project, Harvard Law School Library. Credit provided voluntarily under CAP community norms.',
            transformation: result.transformation, ...(record.last_updated ? { sourceUpdatedAt: record.last_updated } : {}),
            caselaw: { caseId: record.id, archiveUrl: url, archiveSha256: archiveSha, jsonSha256: sha256(jsonBytes), htmlSha256: sha256(htmlBytes) } };
          put.run(row.meta_sha, CAP_CORPUS_NORMALIZER, markdownSha, Buffer.byteLength(result.markdown), JSON.stringify(provenance), 'ready', null);
        } catch (error) {
          put.run(row.meta_sha, CAP_CORPUS_NORMALIZER, null, null, null, 'failed', error.message);
        }
      }
    } catch (error) {
      for (const row of pending) put.run(row.meta_sha, CAP_CORPUS_NORMALIZER, null, null, null, 'failed', error.message);
      throw error;
    }
  }, progress); } finally { await normalizer.close(); }
  const report = await capCorpusCoverage(store, coverage);
  await atomicJson(resolve(store.directory, `ingestion-${capSelectionKey(jurisdiction)}.json`), report);
  return { ...report, failedVolumesThisRun: failures.length };
}
