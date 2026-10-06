import { cp, mkdir, mkdtemp, readFile, rename } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { githubSnapshot } from './sources/github.mjs';
import { wikipediaSnapshot } from './sources/wikipedia.mjs';
import { caselawSnapshot } from './sources/caselaw.mjs';
import { sourceConfigDigest, validateCatalog, licenseFor } from './catalogs.mjs';
import { digest, diffFiles, exists, hashFile, inside, inventory, readJson, removeWork, sha256, write, writeJson } from './files.mjs';
import { normalizeDocument } from './normalize.mjs';
import { automaticLicensing } from './licensing.mjs';
import { refreshWorkspaceDefinition } from './catalog-workspace.mjs';

export async function applySnapshot(catalog, snapshot, { apply = false, allowDeletions = false } = {}) {
  const { dir, manifest: m, root } = catalog;
  const before = await inventory(resolve(dir, 'content'));
  const oldLock = await exists(resolve(dir, 'sources.lock.json')) ? await readJson(resolve(dir, 'sources.lock.json')) : null;
  if (oldLock && oldLock.contentDigest !== digest(before)) throw new Error(`${catalog.key}: local edits in synchronized content; refusing to overwrite them`);
  if (!oldLock && before.length) throw new Error('Initial sync requires an empty content folder');
  const after = [];
  for (const f of snapshot.files) after.push({ path: f.path, sha256: f.sourcePath ? await hashFile(f.sourcePath) : sha256(f.bytes) });
  after.sort((a, b) => a.path < b.path ? -1 : 1);
  if (!after.some((f) => f.path.endsWith('.md'))) throw new Error('Source returned no Markdown documents; existing content is retained');
  const unique = new Set(after.map((f) => f.path.normalize('NFC').toLowerCase()));
  if (unique.size !== after.length) throw new Error('Normalized output path collision');
  const diff = diffFiles(before, after);
  if (before.length && diff.removed.length / before.length > m.sync.maxDeleteFraction && !allowDeletions) throw new Error(`Deletion guard: ${diff.removed.length}/${before.length} files removed; review with a larger threshold or --allow-deletions`);
  const provenance = snapshot.files.map((f) => f.provenance).sort((a, b) => a.path < b.path ? -1 : 1);
  const lock = { schemaVersion: 1, sourceType: m.source.type, sourceConfigDigest: sourceConfigDigest(m), contentDigest: digest(after), legalDigest: digest(snapshot.legal.map((f) => ({ path: f.path, sha256: sha256(f.bytes) }))), revision: snapshot.revision, files: provenance };
  // An upstream commit outside the selected content does not churn provenance.
  const changed = !oldLock || oldLock.contentDigest !== lock.contentDigest || oldLock.sourceConfigDigest !== lock.sourceConfigDigest || oldLock.legalDigest !== lock.legalDigest;
  if (!changed) return { catalog: catalog.key, changed: false, applied: false, ...diff };
  await mkdir(resolve(root, '.work/sync'), { recursive: true });
  const work = await mkdtemp(resolve(root, '.work/sync/snapshot-'));
  const staged = resolve(work, 'catalog');
  await cp(dir, staged, { recursive: true });
  await removeWork(root, resolve(staged, 'content'));
  for (const file of snapshot.files) {
    const target = inside(resolve(staged, 'content'), file.path);
    if (file.sourcePath) { await mkdir(resolve(target, '..'), { recursive: true }); await cp(file.sourcePath, target); }
    else await write(target, file.bytes);
  }
  for (const file of snapshot.legal) await write(inside(staged, file.path), file.bytes);
  await writeJson(resolve(staged, 'sources.lock.json'), lock);
  await write(resolve(staged, 'provenance.jsonl'), provenance.map((p) => JSON.stringify(p)).join('\n') + '\n');
  await validateCatalog({ ...catalog, dir: staged });
  if (apply) {
    const backup = resolve(work, 'previous');
    await rename(dir, backup);
    try { await rename(staged, dir); } catch (e) { await rename(backup, dir); throw e; }
    await removeWork(root, work);
  }
  return { catalog: catalog.key, changed: true, applied: apply, ...diff, ...(!apply ? { preview: staged } : {}) };
}

export async function syncCatalog(catalog, options = {}) {
  const m = catalog.manifest;
  if (m.licensing.status !== 'approved' && !automaticLicensing(m)) throw new Error('Configure automatic standard-open licensing or approve the source license before importing');
  if (m.source.type === 'manual') return { catalog: catalog.key, changed: false, status: 'manual' };
  await refreshWorkspaceDefinition(catalog);
  const adapters = { github: githubSnapshot, wikipedia: wikipediaSnapshot, caselaw: caselawSnapshot };
  if (!adapters[m.source.type]) throw new Error('CAP collection parts are materialized by npm run caselaw -- build; sync the shared corpus with caselaw ingest');
  const snapshot = await adapters[m.source.type](catalog, options);
  return applySnapshot(catalog, snapshot, options);
}

export async function prepareCatalog(catalog, options = {}) {
  if (catalog.manifest.contentStorage !== 'workspace') return { catalog: catalog.key, status: 'uses checked-in content', prepared: false };
  await refreshWorkspaceDefinition(catalog);
  if (await exists(resolve(catalog.dir, 'sources.lock.json'))) {
    try {
      const checked = await validateCatalog(catalog);
      return { ...checked, prepared: true, reused: true, directory: catalog.dir };
    } catch { /* Sync checks existing hashes before replacing an outdated snapshot. */ }
  }
  await syncCatalog(catalog, { ...options, apply: true });
  return { ...await validateCatalog(catalog), prepared: true, reused: false, directory: catalog.dir };
}

export async function importDocument(catalog, { file, target, sourceUrl, apply = false }) {
  if (catalog.manifest.source.type !== 'manual') throw new Error('Local imports require a manual catalog');
  if (catalog.manifest.licensing.status !== 'approved') throw new Error('Review the content license before importing');
  if (!target?.endsWith('.md')) throw new Error('--target must be a relative .md path inside content/');
  const url = new URL(sourceUrl);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('--source-url must identify the public source');
  const license = licenseFor(catalog.manifest, target);
  const bytes = await readFile(file);
  const result = await normalizeDocument(bytes, basename(file), { images: catalog.manifest.normalization.images, rewriteUrl: (url) => url.startsWith('#') ? url : new URL(url, sourceUrl).href });
  if (result.assets.length) throw new Error('Local imports with extracted images need an explicit asset placement policy; use images=omit for now');
  const output = inside(resolve(catalog.dir, 'content'), target);
  const record = { path: target, sha256: sha256(result.markdown), sourceSha256: sha256(bytes), sourceUrl, sourceRevision: sha256(bytes), license: license.id, attribution: license.attribution, transformation: result.transformation };
  if (apply) {
    const path = resolve(catalog.dir, 'provenance.jsonl');
    const rows = await exists(path) ? (await readFile(path, 'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse) : [];
    await write(output, result.markdown);
    await write(path, [...rows.filter((r) => r.path !== target), record].sort((a, b) => a.path.localeCompare(b.path)).map((r) => JSON.stringify(r)).join('\n') + '\n');
  }
  return { catalog: catalog.key, target, applied: apply, markdown: result.markdown };
}
