import { mkdir, mkdtemp, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { extractGezkVerified, validateExtractedCatalog, CatalogHandle, createProfileEmbedder, knowledgeEmbeddingProfile } from './toolchain.mjs';
import { verifyWikipediaToc } from './wikipedia-toc.mjs';
import { digest, exists, readJson, removeWork, writeJson } from './files.mjs';
import { buildDigest, validateCatalog } from './catalogs.mjs';
import { verifyLocalRelease } from './publish.mjs';
import { packageQueries, resolveBuildPackage } from './news-packages.mjs';
import { evaluateSemanticProbe, SEMANTIC_CHUNK_LIMIT } from './semantic-verification.mjs';

export async function verifyRelease(catalog, directory, { semantic = false, allowSemanticFailure = false } = {}) {
  await validateCatalog(catalog);
  const release = await readJson(resolve(directory, 'release.json'));
  const packaging = await resolveBuildPackage(catalog, release.packaging?.key);
  if ((packaging && (digest(packaging.metadata) !== digest(release.packaging ?? {}) || packaging.catalogId !== release.catalogId)) || (!packaging && release.packaging)) throw new Error('Release package selection differs from this corpus snapshot');
  await verifyLocalRelease(directory, release);
  if (release.inputDigest !== await buildDigest(catalog, packaging?.metadata)) throw new Error('Release inputs differ from this checkout; build a new version before verifying against it');
  await mkdir(resolve(catalog.root, '.work/verify'), { recursive: true });
  const scratch = await mkdtemp(resolve(catalog.root, '.work/verify/catalog-'));
  let handle, embedder;
  try {
    await extractGezkVerified(resolve(directory, release.archive), scratch);
    const integrity = await validateExtractedCatalog(scratch, { deep: true });
    if (!integrity.ok) throw new Error(`Archive deep validation failed: ${JSON.stringify(integrity.checks.filter((c) => !c.ok))}`);
    for (const license of catalog.manifest.licensing.licenses) {
      if (await readFile(resolve(scratch, license.text), 'utf8') !== await readFile(resolve(catalog.dir, license.text), 'utf8')) throw new Error(`Archive is missing the exact source license: ${license.text}`);
    }
    handle = CatalogHandle.open(scratch);
    if (packaging && (digest(await readJson(resolve(scratch, 'PACKAGE.json'))) !== digest(packaging.metadata) || digest(await readJson(resolve(scratch, 'LICENSES/selection.json'))) !== digest(packaging.selection))) throw new Error('Archive package metadata differs from the selected corpus window');
    const toc = catalog.manifest.build.toc.format === 'wikipedia-days' ? await verifyWikipediaToc(catalog, handle, packaging?.selection) : undefined;
    const queries = release.manifest.smokeQueries ?? [];
    const fullText = queries.map(({ query, expectedDocumentIds }) => {
      const hits = handle.searchDocumentsFts(query, 10).map((h) => h.documentId);
      const passed = expectedDocumentIds.every((id) => hits.includes(id));
      return { query, expectedDocumentIds, hits, passed };
    });
    if (fullText.some((q) => !q.passed)) throw new Error(`Title-search checks failed: ${JSON.stringify(fullText)}`);
    const semanticResults = [];
    if (semantic) {
      const path = resolve(catalog.dir, 'tests/semantic-queries.json');
      if (!await exists(path)) throw new Error('Add tests/semantic-queries.json before running --semantic');
      embedder = await createProfileEmbedder(knowledgeEmbeddingProfile(release.manifest.embedding.id));
      const selectedQueries = packageQueries(await readJson(path), packaging?.documentIds);
      if (!selectedQueries.length) throw new Error('No semantic queries target documents in this package; add a query for one of its selected articles');
      for (const { query, expectedDocumentIds } of selectedQueries) {
        const hits = handle.searchSemantic(await embedder.embedQuery(query), { shardBudget: release.manifest.counts.shards, finalK: SEMANTIC_CHUNK_LIMIT });
        semanticResults.push(evaluateSemanticProbe({ query, expectedDocumentIds }, hits));
      }
    }
    const semanticPassed = semanticResults.every(q => q.passed);
    const report = { catalog: catalog.key, catalogId: release.catalogId, version: release.version, inputDigest: release.inputDigest, sha256: release.sha256, archiveBytes: release.archiveBytes, counts: release.manifest.counts, integrity: true, ...(packaging ? { packaging: packaging.metadata } : {}), ...(toc ? { toc } : {}), licenses: catalog.manifest.licensing.licenses.map((l) => l.spdx), fullText, semantic: semanticResults, semanticPassed };
    const path = resolve(catalog.root, '.work/verification', `${release.catalogId}-${release.version}.json`);
    await writeJson(path, report);
    // Keep the report with the artifact, including failed results. Upload jobs
    // must validate this exact archive's checks without regenerating content.
    await writeJson(resolve(directory, 'verification.json'), report);
    if (!semanticPassed && !allowSemanticFailure) throw new Error(`Semantic-search checks failed; report: ${path}`);
    return { ...report, report: path };
  } finally { handle?.close(); await embedder?.dispose(); await removeWork(catalog.root, scratch); }
}
