import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { mkdir, mkdtemp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { KnowledgeCatalogIdentitySchema, KnowledgeCatalogVersionManifestSchema } from '@bendyline/gezel';
import { exists, hashFile, inside, json, readJson, write } from './files.mjs';
import { sourceCommit } from './build.mjs';
import { verifyRemote } from './publish.mjs';
import { proposeChanges, workingChanges } from './github-pr.mjs';

export function gildeDefinitions(release, receipt, previous = {}) {
  if (release.testOnly) throw new Error('Test archives cannot be advertised in Gilde');
  if (!receipt.github || !receipt.huggingface || receipt.sha256 !== release.sha256) throw new Error('Both publication targets must be verified before creating Gilde definitions');
  const m = release.manifest;
  const config = release.targets.gilde;
  const identity = KnowledgeCatalogIdentitySchema.parse({
    ...previous, schemaVersion: 1, kind: 'knowledge-catalog', id: m.id,
    name: m.name, description: m.description ?? '', publisherId: m.publisher.id, language: m.language,
    maintainer: { name: m.publisher.name, url: m.publisher.url },
    license: m.license.name,
    licenseClass: ['MIT', 'Apache-2.0', 'CC0-1.0', 'CC-BY-4.0', 'CC-BY-SA-4.0', 'BSD-2-Clause', 'BSD-3-Clause', 'ISC'].includes(m.license.spdx) ? 'open' : undefined,
    category: previous.category ?? config.category, tags: previous.tags ?? config.tags,
    upstream: previous.upstream ?? `https://github.com/${release.targets.github}/tree/${release.sourceCommit}/catalogs/${release.catalog}`,
  });
  const version = KnowledgeCatalogVersionManifestSchema.parse({
    schemaVersion: 1, version: m.version, releasedAt: m.createdAt, formatVersion: m.formatVersion,
    huggingface: receipt.huggingface, sha256: release.sha256, archiveBytes: release.archiveBytes, uncompressedBytes: release.uncompressedBytes,
    documents: m.counts.documents, chunks: m.counts.chunks, embeddingProfile: { id: m.embedding.id, modelRepo: m.embedding.model.repo }, topics: m.topics,
    ...(config.minGezelVersion ? { minGezelVersion: config.minGezelVersion } : {}),
  });
  const prefix = `data/knowledge-catalogs/${m.id.slice(0, 2)}/${m.id}`;
  return new Map([[`${prefix}/manifest.json`, identity], [`${prefix}/versions/${m.version}/manifest.json`, version]]);
}

function runNpm(cwd, args) {
  const npm = [process.env.npm_execpath, resolve(dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js'), resolve(dirname(process.execPath), '../lib/node_modules/npm/bin/npm-cli.js')].find((path) => path && existsSync(path));
  if (!npm) throw new Error('Cannot locate npm; invoke through npm run gilde');
  const env = { ...process.env };
  for (const key of Object.keys(env)) if (/TOKEN|SECRET|PRIVATE_KEY/i.test(key)) delete env[key];
  execFileSync(process.execPath, [npm, ...args], { cwd, env, stdio: 'inherit' });
}

export async function proposeGilde(root, directory, { apply = false } = {}) {
  const release = await readJson(resolve(directory, 'release.json'));
  const receipt = await readJson(resolve(directory, 'published.json'));
  gildeDefinitions(release, receipt);
  if (await hashFile(inside(directory, release.archive)) !== release.sha256) throw new Error('Local archive changed after publication');
  await verifyRemote(`https://huggingface.co/datasets/${receipt.huggingface.repo}/resolve/${receipt.huggingface.revision}/${receipt.huggingface.path}`, release.sha256, release.archiveBytes);
  await mkdir(resolve(root, '.work/gilde'), { recursive: true });
  const work = await mkdtemp(resolve(root, '.work/gilde/pr-'));
  const env = { ...process.env, GIT_TERMINAL_PROMPT: '0' };
  for (const key of Object.keys(env)) if (/TOKEN|SECRET|PRIVATE_KEY/i.test(key)) delete env[key];
  const repository = release.targets.gilde.repository;
  execFileSync('git', ['clone', '--depth', '1', `https://github.com/${repository}.git`, work], { env, stdio: 'inherit' });
  const baseSha = sourceCommit(work);
  const identityPath = `data/knowledge-catalogs/${release.catalogId.slice(0, 2)}/${release.catalogId}/manifest.json`;
  const previous = await exists(inside(work, identityPath)) ? await readJson(inside(work, identityPath)) : {};
  for (const [path, data] of gildeDefinitions(release, receipt, previous)) {
    if (path.includes('/versions/') && await exists(inside(work, path)) && json(await readJson(inside(work, path))) !== json(data)) throw new Error('Gilde versions are immutable; this version already has different metadata');
    await write(inside(work, path), json(data));
  }
  runNpm(work, ['ci', '--ignore-scripts', '--no-audit']);
  runNpm(work, ['run', 'format']);
  runNpm(work, ['run', 'build-index']);
  runNpm(work, ['run', 'check']);
  const changes = await workingChanges(work, (path) => path.startsWith('data/knowledge-catalogs/'));
  if (!apply) return { applied: false, checkout: work, files: changes.map((c) => c.path) };
  return proposeChanges({ repository, baseSha, branch: `codex/knowledge-${release.catalogId}-${release.version}`, title: `Update ${release.manifest.name} to ${release.version}`, body: `${release.manifest.description}\n\nPublished from [knowledge](${receipt.github.url}).\n\n- Version: ${release.version}\n- Documents: ${release.manifest.counts.documents}\n- SHA-256: ${release.sha256}\n- Hugging Face revision: ${receipt.huggingface.revision}\n- Validation: archive deep validation and Gilde npm run check passed.\n\nLicense: ${release.manifest.license.name}. License texts and provenance are included in the archive.`, changes });
}
