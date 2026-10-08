import { readFile, mkdir, mkdtemp, stat } from 'node:fs/promises';
import { resolve, matchesGlob } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createPublicKey } from 'node:crypto';
import { compileKnowledgeCatalog, createProfileEmbedder, knowledgeEmbeddingProfile, MARKDOWN_CHUNKS_2, extractGezkVerified, validateExtractedCatalog, inspectGezkArchive, signManifest, toolchainIdentity, manifestToolchain, requireSharedToc } from './toolchain.mjs';
import { applyWikipediaToc } from './wikipedia-toc.mjs';
import { buildDigest, licenseFor, parseYaml, validateCatalog } from './catalogs.mjs';
import { digest, exists, hashFile, inside, inventory, readJson, removeWork, write, writeJson } from './files.mjs';
import { cachedEmbedder } from './embedding-cache.mjs';
import { attributionRequired } from './licensing.mjs';
import { bindPackageLinks, packageCatalogId, packageQueries, resolveBuildPackage } from './news-packages.mjs';
import { loadNormalizedMarkdown } from './markdown-loader.mjs';

export function assertVersion(version) {
  if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(version ?? '')) throw new Error('--version must be a stable semantic version, for example 2026.10.1');
  return version;
}
export function sourceCommit(root) {
  try { return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, stdio: ['ignore', 'pipe', 'ignore'], encoding: 'utf8' }).trim(); } catch { return null; }
}
export function releaseDir(catalog, version, packageKey) { return inside(resolve(catalog.root, '.work/releases'), `${packageCatalogId(catalog, packageKey)}/${assertVersion(version)}`); }

export async function buildCatalog(catalog, { version, createdAt, embedderFactory, signKey, packageKey } = {}) {
  assertVersion(version);
  if (catalog.manifest.build.toc.format === 'wikipedia-days') requireSharedToc();
  await validateCatalog(catalog);
  const packaging = await resolveBuildPackage(catalog, packageKey);
  const { root, dir } = catalog;
  const m = packaging ? { ...catalog.manifest, id: packaging.catalogId, name: packaging.name, description: packaging.description } : catalog.manifest;
  const fingerprint = await buildDigest(catalog, packaging?.metadata);
  const output = releaseDir(catalog, version, packaging?.key);
  const releasePath = resolve(output, 'release.json');
  const signingKey = signKey ? await readFile(signKey, 'utf8') : null;
  const signingKeyId = signingKey ? digest(createPublicKey(signingKey).export({ type: 'spki', format: 'pem' })) : null;
  const testOnly = Boolean(embedderFactory);
  const runtime = process.env.KNOWLEDGE_EMBEDDING_DEVICE ?? 'cpu';
  if (!['cpu', 'dml'].includes(runtime)) throw new Error('KNOWLEDGE_EMBEDDING_DEVICE must be cpu or dml');
  if (await exists(releasePath)) {
    const previous = await readJson(releasePath);
    if (previous.inputDigest !== fingerprint || previous.signingKeyId !== signingKeyId || previous.testOnly !== testOnly || (previous.embeddingRuntime ?? 'cpu') !== runtime) throw new Error(`${m.id}@${version} already built from different inputs; choose a new version`);
    if (await hashFile(inside(output, previous.archive)) !== previous.sha256) throw new Error('Existing release archive failed checksum verification');
    return { ...previous, directory: output, reused: true };
  }
  createdAt ??= new Date().toISOString();
  if (!Number.isFinite(Date.parse(createdAt))) throw new Error('Invalid --created-at timestamp');
  const profile = knowledgeEmbeddingProfile(m.build.embeddingProfile);
  if (!profile) throw new Error(`Unsupported embedding profile ${m.build.embeddingProfile}`);
  const contentFiles = await inventory(resolve(dir, 'content'));
  const preserve = m.normalization.docfxReferences === 'preserve';
  const ignore = contentFiles.filter((f) => m.build.ignore.some((pattern) => matchesGlob(preserve ? f.path.toLowerCase() : f.path, preserve ? pattern.toLowerCase() : pattern)) || (packaging && !packaging.paths.has(f.path))).map((f) => f.path);
  console.error(`[Build] Loading ${contentFiles.length - ignore.length} content files for ${m.id}${packaging ? ` (${packaging.window.start} through ${packaging.window.end})` : ''}`);
  const dailyToc = m.build.toc.format === 'wikipedia-days';
  let source = await loadNormalizedMarkdown(resolve(dir, 'content'), { language: m.language, ...(packaging ? {} : { uri: { publisherId: m.publisher.id, catalogId: m.id } }), toc: dailyToc ? { format: 'folders' } : m.build.toc, ignore }, m.normalization);
  if (packaging && source.documents.length !== packaging.documentIds.size) throw new Error('Package document count disagrees with its selected days and articles');
  if (dailyToc) source = await applyWikipediaToc(catalog, source, packaging?.selection);
  const provenancePath = resolve(dir, 'provenance.jsonl');
  const provenance = await exists(provenancePath) ? (await readFile(provenancePath, 'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse) : [];
  const byPath = new Map(provenance.map((p) => [p.path, p]));
  const byId = new Map();
  for (const file of contentFiles) {
    if (!/\.md$/i.test(file.path)) continue;
    if (packaging && !packaging.paths.has(file.path)) continue;
    const text = await readFile(inside(resolve(dir, 'content'), file.path), 'utf8');
    const fm = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(text);
    const id = (fm ? parseYaml(fm[1], file.path)?.id : null) ?? file.path.slice(0, -3).normalize('NFC');
    byId.set(String(id), { path: file.path, provenance: byPath.get(file.path), license: licenseFor(m, file.path) });
  }
  const commit = sourceCommit(root);
  for (const document of source.documents) {
    const info = byId.get(document.id);
    if (!info) throw new Error(`No source mapping for document ${document.id}`);
    const p = info.provenance;
    if (packaging) document.markdown = bindPackageLinks(document.markdown, info.path, byPath, packaging.documentIds, { publisherId: m.publisher.id, catalogId: m.id });
    document.sourceUrl = p?.sourceUrl ?? `https://github.com/${m.publish.github}/blob/${commit ?? 'main'}/catalogs/${catalog.key}/content/${info.path}`;
    document.sourceRevision = p?.sourceRevision ?? commit ?? fingerprint;
    if (p?.sourceUpdatedAt) document.sourceUpdatedAt = p.sourceUpdatedAt;
    document.attribution = { license: info.license.spdx, licenseUrl: info.license.url, notice: p?.attribution ?? info.license.attribution, ...(p?.historyUrl ? { historyUrl: p.historyUrl } : {}) };
  }
  const sourceHome = m.source.type.startsWith('caselaw') ? 'https://static.case.law/' : `https://github.com/${m.publish.github}/tree/${commit ?? 'main'}/catalogs/${catalog.key}`;
  const extraFiles = { 'README.md': `# ${m.name}\n\n${m.description}\n\nSource: ${sourceHome}\n\nSee LICENSES/catalog.txt and LICENSES/source-notices.json for licensing.\n`, 'LICENSES/catalog.txt': await readFile(inside(dir, m.licensing.notice), 'utf8') };
  for (const file of await inventory(resolve(dir, 'LICENSES'))) extraFiles[`LICENSES/${file.path}`] = await readFile(inside(resolve(dir, 'LICENSES'), file.path), 'utf8');
  if (packaging) {
    extraFiles['LICENSES/corpus-selection.json'] = extraFiles['LICENSES/selection.json'];
    extraFiles['LICENSES/selection.json'] = JSON.stringify(packaging.selection, null, 2) + '\n';
    extraFiles['PACKAGE.json'] = JSON.stringify(packaging.metadata, null, 2) + '\n';
    extraFiles['README.md'] += `\nPackage: ${packaging.key}\nNews dates: ${packaging.window.start} through ${packaging.window.end}\nSelected from a shared source corpus. Articles use accepted corpus revisions, not historical quarter-end revisions. Out-of-package article links resolve on Wikipedia.\n`;
  }
  extraFiles['LICENSES/source-notices.json'] = JSON.stringify({ sources: m.licensing.licenses.map((l) => ({ name: l.name, license: l.spdx, licenseUrl: l.url, notice: l.attribution })) }, null, 2) + '\n';
  if (provenance.length) extraFiles['LICENSES/provenance.jsonl'] = provenance.filter(p => !packaging || packaging.paths.has(p.path)).map((p) => JSON.stringify(p)).join('\n') + '\n';
  let queries = await exists(resolve(dir, 'tests/queries.json')) ? packageQueries(await readJson(resolve(dir, 'tests/queries.json')), packaging?.documentIds) : undefined;
  if (packaging && !queries?.length) queries = [{ query: source.documents[0].title, expectedDocumentIds: [source.documents[0].id] }];
  const semanticPath = resolve(dir, 'tests/semantic-queries.json');
  const semanticQueries = await exists(semanticPath) ? packageQueries(await readJson(semanticPath), packaging?.documentIds) : [];
  if (m.publish.enabled && m.source.type.startsWith('caselaw') && !semanticQueries.length) throw new Error('Publishable CAP archives require semantic retrieval checks');
  const embedder = await (embedderFactory ?? createProfileEmbedder)(profile, runtime === 'dml' ? { sessionOptions: { executionProviders: ['dml'], enableMemPattern: false, executionMode: 'sequential', intraOpNumThreads: 4 } } : undefined);
  await mkdir(resolve(root, '.work/build'), { recursive: true });
  const scratch = await mkdtemp(resolve(root, '.work/build/catalog-'));
  await mkdir(output, { recursive: true });
  const archive = `${m.id}-${version}.gezk`;
  let lastProgress = 0;
  let embed;
  try {
    embed = await cachedEmbedder(embedder, root, { testOnly, runtime });
    const primary = m.licensing.licenses[0];
    await compileKnowledgeCatalog({
      toolchain: manifestToolchain,
      catalog: { id: m.id, version, name: m.name, description: m.description, language: m.language, publisher: m.publisher, createdAt, license: { name: m.licensing.licenses.map((l) => l.name).join('; '), ...(m.licensing.licenses.length === 1 ? { spdx: primary.spdx } : {}), attributionRequired: attributionRequired(m), noticePath: 'LICENSES/catalog.txt' } },
      topics: source.topics, documents: (async function* () {
        for (const [index, document] of source.documents.entries()) {
          yield document;
          if (Date.now() - lastProgress > 15000 || index + 1 === source.documents.length) {
            console.error(`[Build] chunk: ${index + 1}/${source.documents.length} documents`); lastProgress = Date.now();
          }
        }
      })(),
      assets: source.assets, outputPath: resolve(output, archive), workDir: resolve(scratch, 'compile'),
      embeddingProfile: profile, chunkingProfile: MARKDOWN_CHUNKS_2,
      onProgress: ({ phase, done, total }) => {
        if (Date.now() - lastProgress > 15000 || done === total) {
          console.error(`[Build] ${phase}: ${done}/${total}`); lastProgress = Date.now();
        }
      },
      embed, countTokens: (text) => embedder.countTokens(text),
      extraFiles, ...(queries ? { smokeQueries: queries } : {}),
      ...(signingKey ? { finalizeManifest: (manifest) => signManifest(manifest, signingKey) } : {}),
    });
    await extractGezkVerified(resolve(output, archive), resolve(scratch, 'verify'));
    const validation = await validateExtractedCatalog(resolve(scratch, 'verify'), { deep: true });
    if (!validation.ok) throw new Error(`Archive validation failed: ${JSON.stringify(validation.checks.filter((c) => !c.ok))}`);
    const inspection = await inspectGezkArchive(resolve(output, archive));
    const release = {
      schemaVersion: 1, catalog: catalog.key, catalogId: m.id, version, createdAt, inputDigest: fingerprint, sourceCommit: commit,
      archive, sha256: await hashFile(resolve(output, archive)), archiveBytes: (await stat(resolve(output, archive))).size,
      uncompressedBytes: inspection.totalUncompressedBytes, manifest: inspection.manifest,
      testOnly, signingKeyId, embeddingRuntime: runtime, toolchain: toolchainIdentity, targets: m.publish,
      verificationPolicy: { fullText: queries ?? [], semantic: semanticQueries },
      ...(packaging ? { packaging: packaging.metadata } : {}),
    };
    await writeJson(releasePath, release);
    await write(resolve(output, 'SHA256SUMS'), `${release.sha256}  ${archive}\n`);
    await write(resolve(output, 'NOTICE.md'), extraFiles['LICENSES/catalog.txt']);
    if (packaging) await write(resolve(output, 'PACKAGE.json'), extraFiles['PACKAGE.json']);
    for (const [path, text] of Object.entries(extraFiles).filter(([path]) => path.startsWith('LICENSES/'))) await write(inside(output, path), text);
    return { ...release, directory: output, reused: false };
  } finally { embed?.dispose(); await embedder.dispose(); await removeWork(root, scratch); }
}
