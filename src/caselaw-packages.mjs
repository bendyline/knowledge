import { resolve, posix } from 'node:path';
import { readFile } from 'node:fs/promises';
import { stringify } from 'yaml';
import { z } from 'zod';
import { digest, exists, json, readJson, sha256, write, writeJson } from './files.mjs';
import { capCoverage, loadCapRoots, readCapObject } from './caselaw-inventory.mjs';
import { CAP_CORPUS_NORMALIZER, capCorpusCoverage, capDocument, capRows } from './caselaw-corpus.mjs';
import { knowledge, createProfileEmbedder, knowledgeEmbeddingProfile, MARKDOWN_CHUNKS_2, toolchainIdentity } from './toolchain.mjs';
import { CatalogSchema } from './schema.mjs';
import { caselawLegal } from './licensing.mjs';
import { CASELAW_TERMS } from './caselaw-policy.mjs';
import { applySnapshot } from './sync.mjs';
import { assertVersion, buildCatalog } from './build.mjs';
import { verifyRelease } from './verify.mjs';
import { rewriteMarkdownReferences } from '../vendor/squisq/contentReferences.mjs';

const slug = z.string().regex(/^[a-z0-9][a-z0-9-]{0,47}$/);
const query = z.object({ query: z.string().min(1), expectedDocumentIds: z.array(z.string().regex(/^cap-\d+$/)).min(1) }).strict();
export const CapCollection = z.object({
  schemaVersion: z.literal(1), id: slug, name: z.string().min(1), jurisdiction: slug,
  scopeNote: z.string().min(1).optional(),
  targetBytes: z.number().int().min(1048576).max(1073741824).default(1073741824),
  ceilingBytes: z.number().int().min(1048576).max(1610612736).default(1610612736),
  sizeEstimate: z.enum(['conservative-v1', 'wyoming-bge-v1']).optional(),
  embeddingProfile: z.enum(['bge-small-en-v1.5@1', 'multilingual-e5-small@2']).default('bge-small-en-v1.5@1'),
  queries: z.array(query).default([]), semanticQueries: z.array(query).default([]),
  publish: CatalogSchema.shape.publish.optional(),
}).strict().refine(c => c.targetBytes <= c.ceilingBytes, 'Target must fit under ceiling')
  .refine(c => c.sizeEstimate !== 'wyoming-bge-v1' || c.embeddingProfile === 'bge-small-en-v1.5@1', 'Wyoming calibration requires its measured embedding profile');
export async function loadCapCollection(path) { return CapCollection.parse(await readJson(path)); }

export function estimateCapArchiveBytes(normalizedBytes, chunks, metadataBytes, model = 'conservative-v1') {
  const conservative = normalizedBytes * 2 + chunks * 3072 + metadataBytes + 4096;
  // Four audited Wyoming builds totaled 1,056,484,052 bytes against a
  // 1,780,814,186-byte estimate (0.5933). Round upward to 0.60; this is a
  // planning estimate, not a guarantee for other jurisdictions or profiles.
  return Math.ceil(conservative * (model === 'wyoming-bge-v1' ? 0.60 : 1));
}

export function partitionCapCases(cases, { targetBytes, ceilingBytes }) {
  if (!Number.isSafeInteger(targetBytes) || targetBytes < 1 || targetBytes > ceilingBytes || ceilingBytes >= 2147483648) throw new Error('Invalid CAP package byte budget');
  const ids = new Set(); const years = new Map();
  for (const row of [...cases].sort((a, b) => (a.date ?? '9999').localeCompare(b.date ?? '9999') || a.court - b.court || a.id - b.id)) {
    if (ids.has(row.id)) throw new Error('Duplicate case in package plan');
    ids.add(row.id);
    if (!Number.isSafeInteger(row.estimatedBytes) || row.estimatedBytes < 1 || row.estimatedBytes > ceilingBytes) throw new Error(`CAP ${row.id} cannot fit in one package`);
    const year = /^(\d{4})/.exec(row.date ?? '')?.[1] ?? 'undated';
    if (!years.has(year)) years.set(year, []);
    years.get(year).push(row);
  }
  if (!ids.size) throw new Error('Cannot package an empty CAP selection');
  const parts = []; let current = [];
  const size = rows => rows.reduce((n, r) => n + r.estimatedBytes, 0);
  const flush = () => { if (current.length) { parts.push({ key: `part-${String(parts.length + 1).padStart(4, '0')}`, estimatedBytes: size(current), chunks: current.reduce((n, r) => n + r.chunks, 0), cases: current }); current = []; } };
  for (const rows of years.values()) {
    if (size(rows) <= targetBytes) {
      if (size(current) + size(rows) > targetBytes) flush();
      current.push(...rows);
    } else {
      flush();
      for (const row of rows) { if (size(current) + row.estimatedBytes > targetBytes) flush(); current.push(row); }
      flush();
    }
  }
  flush();
  return parts;
}

export async function planCapCollection(store, config, { embedderFactory = createProfileEmbedder, progress, freeze = true } = {}) {
  const roots = await loadCapRoots(store);
  const coverage = await capCorpusCoverage(store, capCoverage(store, roots, config.jurisdiction));
  if (!coverage.ingestionComplete) throw new Error(`CAP collection is not complete: ${JSON.stringify(coverage.corpus)}`);
  const audit = await readJson(resolve(store.directory, `source-audit-${config.jurisdiction}.json`));
  if (!audit.verified || audit.corpusDigest !== coverage.corpusDigest || audit.cases !== coverage.records) throw new Error('CAP source audit is missing or stale; run caselaw audit');
  const profile = knowledgeEmbeddingProfile(config.embeddingProfile);
  const embedder = await embedderFactory(profile);
  const profileDigest = digest({ profile, chunks: MARKDOWN_CHUNKS_2, toolchain: toolchainIdentity });
  store.db.exec('CREATE TABLE IF NOT EXISTS measurements (markdown_sha TEXT, profile TEXT, chunks INTEGER NOT NULL, PRIMARY KEY(markdown_sha,profile))');
  const get = store.db.prepare('SELECT chunks FROM measurements WHERE markdown_sha=? AND profile=?');
  const put = store.db.prepare('INSERT OR REPLACE INTO measurements VALUES (?,?,?)');
  const measurements = [];
  try {
    const rows = capRows(store, coverage.jurisdiction.id);
    for (const [index, row] of rows.entries()) {
      const doc = capDocument(store, row);
      let chunks = get.get(doc.markdown_sha, profileDigest)?.chunks;
      if (chunks === undefined) {
        const md = (await readCapObject(store, doc.markdown_sha)).toString('utf8').replace(/^---\n[\s\S]*?\n---\n/, '');
        chunks = knowledge.chunkMarkdownProfile(md, { ...MARKDOWN_CHUNKS_2, countTokens: text => embedder.countTokens(text) }).length;
        put.run(doc.markdown_sha, profileDigest, chunks);
      }
      const estimatedBytes = estimateCapArchiveBytes(doc.bytes, chunks, Buffer.byteLength(row.metadata), config.sizeEstimate);
      measurements.push({ id: row.id, date: row.decision_date, court: row.court, reporter: row.reporter, volume: row.folder, file: row.file,
        metaSha256: row.meta_sha, markdownSha256: doc.markdown_sha, normalizedBytes: doc.bytes, chunks, estimatedBytes });
      progress?.(index + 1, rows.length, 0);
    }
  } finally { await embedder.dispose(); }
  const parts = partitionCapCases(measurements, config);
  const plan = { schemaVersion: 1, collection: config.id, name: config.name, snapshot: store.snapshot,
    jurisdiction: coverage.jurisdiction, configDigest: digest(config), inventoryDigest: coverage.inventoryDigest,
    membershipDigest: coverage.selectionDigest, corpusDigest: coverage.corpusDigest, normalizer: CAP_CORPUS_NORMALIZER,
    coverage: { advertisedCases: coverage.advertisedCases, selectedCases: coverage.records, metadataComplete: true, ingestionComplete: true, scope: coverage.scope },
    termsSha256: CASELAW_TERMS.sha256, roots: coverage.roots, sourceIndexes: coverage.sources,
    embeddingProfile: config.embeddingProfile, targetBytes: config.targetBytes, ceilingBytes: config.ceilingBytes,
    estimate: `${config.sizeEstimate === 'wyoming-bge-v1' ? '0.60 × (' : ''}2 × normalized bytes + 3072 × measured token chunks + source metadata bytes + 4096 per case${config.sizeEstimate === 'wyoming-bge-v1' ? ')' : ''}; actual build ceiling enforced`,
    parts: parts.map(p => ({ ...p, catalogId: `${config.id}-${p.key}` })) };
  plan.planDigest = digest(plan);
  const path = resolve(store.directory, `${config.id}-plan.json`);
  if (!freeze) return plan;
  if (await exists(path)) {
    const prior = await readJson(path);
    if (prior.planDigest !== plan.planDigest) throw new Error('This snapshot already has a different frozen plan; choose a new snapshot or collection ID');
  } else await writeJson(path, plan);
  return plan;
}

export function bindCapPartLinks(markdown, targets, selectedPaths, sourcePath) {
  return rewriteMarkdownReferences(markdown, { rewriteUrl(url, kind) {
    if (kind !== 'link' || !url?.startsWith('https://static.case.law/')) return url;
    const path = targets.get(url);
    return path && selectedPaths.has(path) ? posix.relative(posix.dirname(sourcePath), path) : url;
  } });
}
const recordPath = row => `jurisdiction-${row.jurisdiction}/court-${row.court}/${/^(\d{4})/.exec(row.decision_date ?? '')?.[1] ?? 'undated'}/cap-${row.id}.md`;

export async function materializeCapPart(store, config, plan, part) {
  const dir = resolve(store.directory, 'parts', part.catalogId);
  const years = part.cases.filter(c => c.date).map(c => c.date.slice(0, 4));
  const dates = years.length ? (years[0] === years.at(-1) ? years[0] : `${years[0]}–${years.at(-1)}`) : 'Undated';
  const period = `${dates}${years.length && years.length !== part.cases.length ? ' and undated' : ''}`;
  const selection = { schemaVersion: 1, snapshot: store.snapshot, collection: config.id, part: part.key,
    planDigest: plan.planDigest, corpusDigest: plan.corpusDigest, inventoryDigest: plan.inventoryDigest,
    cases: part.cases, coverage: plan.coverage };
  const manifest = CatalogSchema.parse({ schemaVersion: 1, id: part.catalogId,
    name: `${config.name} — ${period} (${part.key})`, description: `${part.cases.length} historical CAP case records, selected by CAP's jurisdiction label. Part of ${config.name}; see the collection index for complete coverage. ${config.scopeNote ? config.scopeNote + ' ' : ''}OCR may contain errors; inclusion does not establish current legal authority.`,
    language: 'en', enabled: true, publisher: { id: 'bendyline', name: 'Bendyline', url: 'https://github.com/bendyline/knowledge' },
    source: { type: 'caselaw-collection', snapshot: store.snapshot, selectionDigest: digest(selection), corpusDigest: plan.corpusDigest, part: part.key },
    licensing: { status: 'automatic', policy: 'standard-open-v1', notice: 'NOTICE.md', licenses: [{ id: 'cc0', name: 'CC0 1.0 Universal', spdx: 'CC0-1.0', url: 'https://creativecommons.org/publicdomain/zero/1.0/', text: 'LICENSES/CC0-1.0.txt', attribution: 'Caselaw Access Project, Harvard Law School Library. Voluntary credit under CAP community norms.' }], rules: [{ include: ['**'], license: 'cc0' }] },
    normalization: { images: 'omit' }, build: { embeddingProfile: config.embeddingProfile, toc: { format: 'folders' } },
    publish: config.publish ?? { enabled: false, github: 'bendyline/knowledge', huggingFace: 'Bendyline/knowledge', gilde: { repository: 'bendyline/gilde', category: 'reference', tags: ['law', 'caselaw', config.jurisdiction] } },
  });
  const catalog = { key: `caselaw/${part.catalogId}`, dir, root: store.root, manifest };
  const notice = `# ${manifest.name}\n\nCAP case data and metadata are designated CC0 1.0 Universal. Credit: Harvard Law School Library, Caselaw Access Project. Credit and sharing improvements are voluntary community norms. Source terms: https://case.law/terms/.\n\nThis is a historical jurisdiction-based source selection, not all law or a statement of current legal validity. See LICENSES/collection-selection.json and the collection index for exact membership and scope. Separate opinions, source metadata, and per-case source hashes are retained. HTML is normalized to Markdown without OCR correction. Source website prose, scans, PDFs, and vendor TARs are excluded. CAP provides no warranty or clearance of third-party rights.\n\nWithin-part case citations resolve locally. Citations to cases in other parts or outside the selection remain CAP web links. The collection index maps every selected CAP ID to its archive. Upstream dangling footnote return links retain their labels as text and are recorded in provenance. Publication status and targets are recorded in release.json.\n`;
  await writeJson(resolve(dir, 'manifest.json'), manifest);
  await write(resolve(dir, 'NOTICE.md'), notice + (config.scopeNote ? `\nScope note: ${config.scopeNote}\n` : ''));
  const all = capRows(store, plan.jurisdiction.id);
  const byId = new Map(all.map(r => [r.id, r]));
  const targets = new Map(all.map(r => [`${capBaseForRow(r)}`, recordPath(r)]));
  const selectedPaths = new Set(part.cases.map(c => recordPath(byId.get(c.id))));
  const files = []; const topics = new Map();
  for (const item of part.cases) {
    const row = byId.get(item.id); const doc = row && capDocument(store, row);
    if (!row || row.meta_sha !== item.metaSha256 || !doc || doc.markdown_sha !== item.markdownSha256) throw new Error(`CAP ${item.id}: corpus differs from frozen plan`);
    const path = recordPath(row); const source = (await readCapObject(store, doc.markdown_sha)).toString('utf8');
    const bytes = Buffer.from(bindCapPartLinks(source, targets, selectedPaths, path));
    const p = JSON.parse(doc.provenance);
    const provenance = { ...p, path, sha256: sha256(bytes), transformation: `${p.transformation}; collection part links bound from frozen selection` };
    files.push({ path, bytes, provenance });
    const meta = JSON.parse(row.metadata);
    for (const [topicPath, name] of [[`jurisdiction-${row.jurisdiction}/_topic.yaml`, meta.jurisdiction.name_long || meta.jurisdiction.name], [`jurisdiction-${row.jurisdiction}/court-${row.court}/_topic.yaml`, meta.court.name]]) {
      const topicBytes = Buffer.from(stringify({ name }));
      if (topics.has(topicPath) && !topics.get(topicPath).bytes.equals(topicBytes)) throw new Error('CAP topic names disagree');
      if (!topics.has(topicPath)) topics.set(topicPath, { path: topicPath, bytes: topicBytes, provenance: { ...provenance, path: topicPath, sha256: sha256(topicBytes), transformation: 'CAP jurisdiction/court metadata -> topic label' } });
    }
  }
  const ids = new Set(part.cases.map(c => `cap-${c.id}`));
  const selectedQueries = config.queries.filter(q => q.expectedDocumentIds.every(id => ids.has(id)));
  const smoke = selectedQueries.length ? selectedQueries : [{ query: JSON.parse(byId.get(part.cases[0].id).metadata).citations[0].cite, expectedDocumentIds: [`cap-${part.cases[0].id}`] }];
  await writeJson(resolve(dir, 'tests/queries.json'), smoke);
  await writeJson(resolve(dir, 'tests/semantic-queries.json'), config.semanticQueries.filter(q => q.expectedDocumentIds.every(id => ids.has(id))));
  const legal = [...caselawLegal(manifest, CASELAW_TERMS.sha256),
    { path: 'LICENSES/collection-selection.json', bytes: Buffer.from(json(selection)) },
    { path: 'LICENSES/collection-sources.json', bytes: Buffer.from(json({ roots: plan.roots, indexes: plan.sourceIndexes })) }];
  await applySnapshot(catalog, { files: [...files, ...topics.values()], legal, revision: plan.corpusDigest }, { apply: true });
  return catalog;
}
const capBaseForRow = r => `https://static.case.law/${r.reporter}/${r.folder}/html/${encodeURIComponent(r.file)}.html`;

export async function buildCapCollection(store, config, plan, { version, createdAt, embedderFactory, progress, verify = verifyRelease } = {}) {
  assertVersion(version);
  const { planDigest, ...body } = plan;
  if (digest(body) !== planDigest || digest(config) !== plan.configDigest || plan.normalizer !== CAP_CORPUS_NORMALIZER || plan.snapshot !== store.snapshot) throw new Error('CAP plan or configuration changed; use a new frozen plan');
  const indexPath = resolve(store.root, '.work/collections', config.id, version, 'collection.json');
  const index = { schemaVersion: 1, collection: config.id, name: config.name, ...(config.scopeNote ? { scopeNote: config.scopeNote } : {}), snapshot: store.snapshot, version, planDigest, coverage: plan.coverage, license: 'CC0-1.0', coverageComplete: false, complete: false, parts: [] };
  if (await exists(indexPath)) {
    const previous = await readJson(indexPath);
    if (previous.planDigest !== planDigest) throw new Error('Collection version already identifies another plan');
  }
  for (const [number, part] of plan.parts.entries()) {
    const catalog = await materializeCapPart(store, config, plan, part);
    const release = await buildCatalog(catalog, { version, createdAt, embedderFactory });
    if (release.archiveBytes > config.ceilingBytes || release.archiveBytes >= 2147483648) throw new Error('CAP archive exceeds size ceiling; create a smaller frozen plan');
    const semantic = config.semanticQueries.some(q => q.expectedDocumentIds.every(id => part.cases.some(c => `cap-${c.id}` === id)));
    const checked = await verify(catalog, release.directory, { semantic: semantic && !embedderFactory, allowSemanticFailure: true });
    const semanticPassed = checked.semantic.every(q => q.passed);
    if (release.manifest.counts.documents !== part.cases.length) throw new Error('Compiled CAP membership count differs from plan');
    index.parts.push({ catalogId: part.catalogId, part: part.key, name: release.manifest.name,
      firstDecisionDate: part.cases[0].date, lastDecisionDate: part.cases.at(-1).date, archive: release.archive, sha256: release.sha256,
      archiveBytes: release.archiveBytes, counts: release.manifest.counts, directory: release.directory,
      caseIds: part.cases.map(c => c.id), integrity: checked.integrity, semanticPassed,
      verified: checked.integrity && semanticPassed, semanticQueries: checked.semantic.length });
    await writeJson(indexPath, index);
    progress?.(number + 1, plan.parts.length, 0);
  }
  const ids = index.parts.flatMap(p => p.caseIds);
  if (ids.length !== plan.coverage.selectedCases || new Set(ids).size !== ids.length) throw new Error('Collection membership is incomplete or overlaps');
  index.coverageComplete = true;
  index.complete = index.parts.every(p => p.verified);
  await writeJson(indexPath, index);
  return { ...index, indexPath };
}
