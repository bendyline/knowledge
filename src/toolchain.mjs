import { findPackageJSON } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { digest, hashFile, readJson } from './files.mjs';

// An explicit development override lets draft formats be built before an npm
// release. Never change node_modules or silently pick a sibling checkout.
const localRoot = process.env.KNOWLEDGE_GEZEL_ROOT;
const entry = localRoot ? resolve(localRoot, 'packages/knowledge/dist/index.js') : fileURLToPath(import.meta.resolve('@bendyline/gezel-knowledge'));
const formatEntry = resolve(dirname(findPackageJSON('@bendyline/gezk', pathToFileURL(entry))), 'dist/index.js');
const packageInfo = await readJson(resolve(dirname(entry), '../package.json'));
const inputs = {
  knowledge: await hashFile(entry), format: await hashFile(formatEntry),
  ...(localRoot ? { dependencyLock: await hashFile(resolve(localRoot, 'pnpm-lock.yaml')) } : {}),
};
export const toolchainIdentity = {
  name: packageInfo.name, version: packageInfo.version,
  source: localRoot ? 'local-gezel-build' : 'npm', digest: digest(inputs), inputs,
};
export const knowledge = await import(pathToFileURL(entry).href);
export const { compileKnowledgeCatalog, loadMarkdownCatalog, createProfileEmbedder, knowledgeEmbeddingProfile, MARKDOWN_CHUNKS_2, extractGezkVerified, validateExtractedCatalog, inspectGezkArchive, signManifest, CatalogHandle } = knowledge;
export const manifestToolchain = {
  ...knowledge.KNOWLEDGE_TOOLCHAIN,
  ...(localRoot ? { version: `${packageInfo.version}+local.${toolchainIdentity.digest.slice(0, 12)}` } : {}),
};

export function requireSharedToc() {
  if (!(knowledge.GEZK_INDEX_SCHEMA_VERSION >= 4)) throw new Error('Date-based TOCs require Gezk 0.7 shared references. Set KNOWLEDGE_GEZEL_ROOT to an updated, built Gezel checkout until the new toolchain is published.');
}
