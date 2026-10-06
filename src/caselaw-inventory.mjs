import { DatabaseSync } from 'node:sqlite';
import { createHash } from 'node:crypto';
import { mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { request } from './http.mjs';
import { atomicJson, canonical, digest, exists, hashFile, inside, json, sha256, write } from './files.mjs';
import { CASELAW_TERMS } from './caselaw-policy.mjs';
import { isCapFileName } from './caselaw-paths.mjs';

const slug = value => {
  if (!/^[a-z0-9][a-z0-9-]{0,63}$/.test(value ?? '')) throw new Error(`Invalid CAP identifier: ${value}`);
  return value;
};
export const capVolumeKey = (reporter, folder) => `${slug(reporter)}/${slug(folder)}`;
export const capBase = 'https://static.case.law/';
export async function openCapInventory(root, snapshot) {
  const directory = resolve(root, '.work/caselaw/snapshots', slug(snapshot));
  await mkdir(directory, { recursive: true });
  const db = new DatabaseSync(resolve(directory, 'inventory.sqlite'));
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=30000;
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS volumes (
      reporter TEXT NOT NULL, folder TEXT NOT NULL, metadata TEXT NOT NULL,
      index_sha TEXT, case_count INTEGER, status TEXT NOT NULL DEFAULT 'pending', error TEXT,
      archive_sha TEXT, archive_bytes INTEGER, expanded_bytes INTEGER,
      PRIMARY KEY (reporter, folder));
    CREATE TABLE IF NOT EXISTS cases (
      id INTEGER NOT NULL, reporter TEXT NOT NULL, folder TEXT NOT NULL, file TEXT NOT NULL,
      jurisdiction INTEGER NOT NULL, court INTEGER NOT NULL, decision_date TEXT,
      metadata TEXT NOT NULL, meta_sha TEXT NOT NULL,
      PRIMARY KEY (reporter, folder, file));
    CREATE INDEX IF NOT EXISTS cases_jurisdiction ON cases(jurisdiction);
    CREATE INDEX IF NOT EXISTS cases_id ON cases(id);
    CREATE TABLE IF NOT EXISTS documents (
      meta_sha TEXT NOT NULL, normalizer TEXT NOT NULL, markdown_sha TEXT,
      bytes INTEGER, provenance TEXT, status TEXT NOT NULL, error TEXT,
      PRIMARY KEY(meta_sha, normalizer));`);
  return { root, snapshot, directory, db, close: () => db.close() };
}
export function capSetting(store, key) {
  const row = store.db.prepare('SELECT value FROM settings WHERE key=?').get(key);
  return row ? JSON.parse(row.value) : undefined;
}
export function setCapSetting(store, key, value) {
  store.db.prepare('INSERT OR REPLACE INTO settings VALUES (?,?)').run(key, JSON.stringify(value));
}
export function capObjectPath(store, hash) {
  if (!/^[a-f0-9]{64}$/.test(hash ?? '')) throw new Error('Invalid CAP object digest');
  return inside(resolve(store.root, '.work/caselaw/objects'), hash);
}
export async function putCapObject(store, bytes) {
  const hash = sha256(bytes); const path = capObjectPath(store, hash);
  if (!await exists(path) || await hashFile(path) !== hash) await write(path, bytes);
  return hash;
}
export async function readCapObject(store, hash) {
  const bytes = await readFile(capObjectPath(store, hash));
  if (sha256(bytes) !== hash) throw new Error(`Corrupt CAP object ${hash}`);
  return bytes;
}
export async function checkCapTerms(download = request) {
  const bytes = (await download(CASELAW_TERMS.sourceUrl, { maxBytes: 1000000 })).bytes;
  if (sha256(bytes) !== CASELAW_TERMS.sha256) throw new Error('CAP terms changed; reassess before acquisition');
}
export async function loadCapRoots(store) {
  const evidence = capSetting(store, 'roots');
  if (!evidence) throw new Error('CAP snapshot has no root inventory; run inventory first');
  const data = {};
  for (const item of evidence) data[item.name] = JSON.parse(await readCapObject(store, item.sha256));
  return { evidence, ...data };
}
export async function initializeCapInventory(store, { download = request } = {}) {
  await checkCapTerms(download);
  let evidence = capSetting(store, 'roots');
  const names = ['ReportersMetadata', 'VolumesMetadata', 'JurisdictionsMetadata'];
  const data = {};
  if (evidence) {
    for (const item of evidence) data[item.name] = JSON.parse(await readCapObject(store, item.sha256));
  } else {
    evidence = [];
    for (const name of names) {
      const url = `${capBase}${name}.json`;
      const bytes = (await download(url, { maxBytes: 100000000 })).bytes;
      const parsed = JSON.parse(bytes);
      if (!Array.isArray(parsed) || !parsed.length) throw new Error(`Empty CAP ${name}`);
      data[name] = parsed;
      evidence.push({ name, url, sha256: await putCapObject(store, bytes), bytes: bytes.length });
    }
    const insert = store.db.prepare('INSERT INTO volumes (reporter,folder,metadata) VALUES (?,?,?)');
    store.db.exec('BEGIN');
    try {
      for (const v of data.VolumesMetadata) {
        capVolumeKey(v.reporter_slug, v.volume_folder);
        insert.run(v.reporter_slug, v.volume_folder, JSON.stringify(v));
      }
      setCapSetting(store, 'roots', evidence);
      setCapSetting(store, 'terms', CASELAW_TERMS);
      store.db.exec('COMMIT');
    } catch (error) { store.db.exec('ROLLBACK'); throw error; }
  }
  return { evidence, ...data };
}

export function capCandidates(roots, jurisdiction) {
  if (jurisdiction === 'all') return roots.VolumesMetadata;
  const j = roots.JurisdictionsMetadata.find(j => j.slug === jurisdiction);
  if (!j) throw new Error(`Unknown CAP jurisdiction ${jurisdiction}`);
  const reporters = new Set(j.reporters.map(r => r.slug));
  for (const r of roots.ReportersMetadata) if (r.jurisdictions.some(x => x.id === j.id)) reporters.add(r.slug);
  // Scan every book in candidate reporters, even books without a jurisdiction hint.
  return roots.VolumesMetadata.filter(v => reporters.has(v.reporter_slug) || v.jurisdictions.some(x => x.id === j.id));
}

export function indexCapVolume(store, reporter, folder, records, indexSha) {
  capVolumeKey(reporter, folder);
  if (!Array.isArray(records)) throw new Error('CAP case index must be an array');
  const files = new Set(); const ids = new Set();
  for (const r of records) {
    if (!Number.isSafeInteger(r.id) || r.id < 1 || !Number.isSafeInteger(r.jurisdiction?.id) || !Number.isSafeInteger(r.court?.id)
      || !isCapFileName(r.file_name) || typeof r.name !== 'string' || !Array.isArray(r.citations)) throw new Error(`Invalid CAP case index entry: ${r.id}`);
    const key = r.file_name.toLowerCase();
    if (files.has(key) || ids.has(r.id)) throw new Error('Duplicate case in CAP volume index');
    files.add(key); ids.add(r.id);
  }
  const put = store.db.prepare('INSERT INTO cases VALUES (?,?,?,?,?,?,?,?,?)');
  store.db.exec('BEGIN');
  try {
    store.db.prepare('DELETE FROM cases WHERE reporter=? AND folder=?').run(reporter, folder);
    for (const r of records) put.run(r.id, reporter, folder, r.file_name, r.jurisdiction.id, r.court.id, r.decision_date ?? null, JSON.stringify(r), digest(r));
    store.db.prepare("UPDATE volumes SET index_sha=?,case_count=?,status='indexed',error=NULL WHERE reporter=? AND folder=?").run(indexSha, records.length, reporter, folder);
    store.db.exec('COMMIT');
  } catch (error) { store.db.exec('ROLLBACK'); throw error; }
}

export async function capWorkers(items, concurrency, action, progress = () => {}) {
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 8) throw new Error('CAP concurrency must be 1–8');
  let cursor = 0; let done = 0; const failures = [];
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (cursor < items.length) {
      const item = items[cursor++];
      try { await action(item); } catch (error) { failures.push({ item, error: error.message }); }
      progress(++done, items.length, failures.length);
    }
  }));
  return failures;
}

export async function scanCapInventory(store, jurisdiction, { download = request, concurrency = 4, progress } = {}) {
  const roots = await initializeCapInventory(store, { download });
  const candidates = capCandidates(roots, jurisdiction);
  const failures = await capWorkers(candidates, concurrency, async v => {
    const row = store.db.prepare('SELECT * FROM volumes WHERE reporter=? AND folder=?').get(v.reporter_slug, v.volume_folder);
    if (row.status === 'indexed') return;
    try {
      const url = `${capBase}${capVolumeKey(v.reporter_slug, v.volume_folder)}/CasesMetadata.json`;
      const bytes = (await download(url, { maxBytes: 30000000 })).bytes;
      const hash = await putCapObject(store, bytes);
      indexCapVolume(store, v.reporter_slug, v.volume_folder, JSON.parse(bytes), hash);
    } catch (error) {
      store.db.prepare("UPDATE volumes SET status='failed',error=? WHERE reporter=? AND folder=?").run(error.message, v.reporter_slug, v.volume_folder);
      throw error;
    }
  }, progress);
  const report = capCoverage(store, roots, jurisdiction);
  await atomicJson(resolve(store.directory, `coverage-${jurisdiction}.json`), report);
  return { ...report, failedThisRun: failures.length };
}

export function capCoverage(store, roots, jurisdiction) {
  let candidates = capCandidates(roots, jurisdiction);
  const j = jurisdiction === 'all' ? null : roots.JurisdictionsMetadata.find(j => j.slug === jurisdiction);
  // A national sweep can discover cases outside a jurisdiction's reporter
  // hints. Include those indexes in its evidence and completeness checks.
  if (j) {
    const selected = new Set(candidates.map(v => capVolumeKey(v.reporter_slug, v.volume_folder)));
    for (const row of store.db.prepare('SELECT DISTINCT reporter,folder FROM cases WHERE jurisdiction=?').iterate(j.id)) selected.add(capVolumeKey(row.reporter, row.folder));
    candidates = roots.VolumesMetadata.filter(v => selected.has(capVolumeKey(v.reporter_slug, v.volume_folder)));
  }
  const volumes = candidates.map(v => store.db.prepare('SELECT reporter,folder,index_sha,case_count,status,error FROM volumes WHERE reporter=? AND folder=?').get(v.reporter_slug, v.volume_folder));
  const where = j ? 'WHERE jurisdiction=?' : '';
  const args = j ? [j.id] : [];
  const counts = store.db.prepare(`SELECT COUNT(*) records,COUNT(DISTINCT id) distinctIds FROM cases ${where}`).get(...args);
  const duplicates = store.db.prepare(`SELECT id,COUNT(*) occurrences FROM cases ${where} GROUP BY id HAVING COUNT(*)>1`).all(...args);
  const reporters = store.db.prepare(`SELECT reporter,COUNT(*) records,COUNT(DISTINCT folder) volumes FROM cases ${where} GROUP BY reporter ORDER BY reporter`).all(...args);
  const indexed = volumes.filter(v => v.status === 'indexed').length;
  // CAP's Regional entry is a reporter grouping with no advertised case count.
  // It must not turn the national total into NaN. Any unexpected case records
  // still fail the exact national count and membership reconciliation below.
  const advertisedCases = j ? j.case_count : roots.JurisdictionsMetadata.reduce((n, j) => n + (j.case_count ?? 0), 0);
  // Preserve digest(array) semantics without materializing millions of rows or
  // one huge JSON string during the national inventory.
  const membershipHash = createHash('sha256').update('['); let first = true;
  for (const row of store.db.prepare(`SELECT id,reporter,folder,file,meta_sha FROM cases ${where} ORDER BY id,reporter,folder,file`).iterate(...args)) {
    if (!first) membershipHash.update(',');
    membershipHash.update(canonical(row)); first = false;
  }
  const selectionDigest = membershipHash.update(']').digest('hex');
  return { schemaVersion: 1, snapshot: store.snapshot, jurisdiction: j ? { id: j.id, slug: j.slug, name: j.name_long } : 'all',
    scope: j ? 'All jurisdiction-linked reporters and volume hints, plus additional source volumes discovered by indexing other reporters; CAP case-level membership reconciled with its advertised jurisdiction count. A separate national inventory report establishes exhaustive index coverage.' : 'All volumes in the pinned national volume index.',
    roots: roots.evidence, termsSha256: CASELAW_TERMS.sha256, advertisedCases, candidateVolumes: volumes.length, indexedVolumes: indexed,
    ...counts, duplicates, reporters, unresolvedVolumes: volumes.filter(v => v.status !== 'indexed'),
    metadataComplete: indexed === volumes.length && counts.records === advertisedCases && !duplicates.length,
    inventoryDigest: digest({ roots: roots.evidence, volumes }), selectionDigest,
    sources: volumes.filter(v => v.status === 'indexed').map(({ reporter, folder, index_sha, case_count }) => ({ reporter, volume: folder, indexSha256: index_sha, cases: case_count })),
  };
}
