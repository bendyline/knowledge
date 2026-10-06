import { openAsBlob } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { listFiles, uploadFiles } from '@huggingface/hub';
import { inspectGezkArchive } from './toolchain.mjs';
import { getJson, githubApi, githubHeaders, request } from './http.mjs';
import { digest, exists, hashFile, inside, inventory, readJson, writeJson } from './files.mjs';
import { sourceCommit } from './build.mjs';
import { datasetLicense } from './dataset-license.mjs';
import { verifyRemote } from './remote-verification.mjs';

export { verifyRemote };

export function publishPlan(release) {
  if (release.testOnly) throw new Error('Test embeddings may never be published');
  if (!release.targets.enabled) throw new Error('Publishing is disabled in this catalog manifest');
  if (release.archiveBytes >= 2 * 1024 ** 3) throw new Error('Archive exceeds the GitHub release asset limit; split the catalog');
  return { catalog: release.catalogId, version: release.version, sha256: release.sha256, huggingFace: { repository: release.targets.huggingFace, path: `catalogs/${release.catalogId}/releases/${release.version}/${release.archive}` }, github: { repository: release.targets.github, tag: `${release.catalogId}-v${release.version}` } };
}
export async function verifyLocalRelease(directory, release) {
  const archive = inside(directory, release.archive);
  if (await hashFile(archive) !== release.sha256) throw new Error('Local release digest mismatch');
  const inspected = await inspectGezkArchive(archive);
  const { size } = await (await import('node:fs/promises')).stat(archive);
  if (digest(inspected.manifest) !== digest(release.manifest) || inspected.totalUncompressedBytes !== release.uncompressedBytes || size !== release.archiveBytes || release.catalogId !== release.manifest.id || release.version !== release.manifest.version) throw new Error('Release metadata does not match the archive');
}
export async function verifyPublicationChecks(directory, release) {
  const policy = release.verificationPolicy;
  if (!policy || !Array.isArray(policy.fullText) || !policy.fullText.length || !Array.isArray(policy.semantic)) throw new Error('Release lacks a retrieval verification policy; rebuild before publishing');
  const report = await readJson(resolve(directory, 'verification.json'));
  if (report.catalogId !== release.catalogId || report.version !== release.version || report.sha256 !== release.sha256
    || report.inputDigest !== release.inputDigest || report.archiveBytes !== release.archiveBytes || report.integrity !== true) throw new Error('Publication verification does not match this archive');
  for (const kind of ['fullText', 'semantic']) {
    const checks = report[kind];
    if (!Array.isArray(checks) || checks.length !== policy[kind].length
      || digest(checks.map(({ query, expectedDocumentIds }) => ({ query, expectedDocumentIds }))) !== digest(policy[kind])
      || checks.some(q => q.passed !== true || !q.expectedDocumentIds.every(id => q.hits.includes(id)))) throw new Error(`Publication requires all configured ${kind} checks to pass`);
  }
  return report;
}
export async function publishRelease(root, directory, { apply = false, services = {} } = {}) {
  const io = { getJson, githubApi, listFiles, uploadFiles, request, verifyRemote,
    commit: sourceCommit, dirty: (cwd) => execFileSync('git', ['status', '--porcelain'], { cwd, encoding: 'utf8' }).trim(),
    tokens: () => ({ hf: process.env.HF_TOKEN, github: process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN }), ...services };
  const release = await readJson(resolve(directory, 'release.json'));
  const plan = publishPlan(release);
  await verifyLocalRelease(directory, release);
  await verifyPublicationChecks(directory, release);
  if (!apply) return { ...plan, applied: false };
  if (!release.sourceCommit || release.sourceCommit !== io.commit(root)) throw new Error('Publish the checked-out commit used for the build');
  if (io.dirty(root)) throw new Error('Publishing requires a clean committed working tree');
  const license = await datasetLicense(root);
  const { hf: hfToken, github: ghToken } = io.tokens();
  if (!hfToken || !ghToken) throw new Error('Publishing requires HF_TOKEN and GH_TOKEN (or GITHUB_TOKEN)');
  const hfRepo = { type: 'dataset', name: plan.huggingFace.repository };
  const hfBase = `https://huggingface.co/datasets/${hfRepo.name}`;
  const metadata = await io.getJson(`https://huggingface.co/api/datasets/${hfRepo.name}`, { headers: { Authorization: `Bearer ${hfToken}` } });
  if (metadata.private !== false) throw new Error('The Hugging Face dataset must already exist and be public');
  const githubRepo = await io.githubApi(`/repos/${plan.github.repository}`);
  if (githubRepo.private) throw new Error('Make the knowledge repository public before publishing catalogs');
  const receiptPath = resolve(directory, 'published.json');
  let receipt = await exists(receiptPath) ? await readJson(receiptPath) : { schemaVersion: 1, sha256: release.sha256 };
  if (receipt.sha256 !== release.sha256) throw new Error('Publication receipt belongs to a different archive');
  if (receipt.huggingface && (receipt.huggingface.repo !== hfRepo.name || receipt.huggingface.path !== plan.huggingFace.path || !/^[a-f0-9]{40}$/.test(receipt.huggingface.revision))) throw new Error('Publication receipt has different Hugging Face coordinates');
  const prefix = `catalogs/${release.catalogId}/releases/${release.version}`;
  if (!receipt.huggingface) {
    // Check immutable version metadata before any upload, including retries
    // on a fresh runner whose local receipt is gone.
    let previous;
    try { previous = await io.getJson(`${hfBase}/resolve/${metadata.sha}/${prefix}/release.json`); } catch (e) { if (e.status !== 404) throw e; }
    if (previous && digest(previous) !== digest(release)) throw new Error('Hugging Face already contains different bytes/metadata for this version');
    let revision;
    if (!previous) {
      const files = (await inventory(directory)).filter((f) => f.path !== 'published.json');
      const uploaded = await io.uploadFiles({ repo: hfRepo, accessToken: hfToken, parentCommit: metadata.sha, commitTitle: `${release.catalogId} ${release.version}`, files: [
        { path: 'LICENSE', content: new Blob([license], { type: 'text/plain;charset=utf-8' }) },
        ...files.map((f) => ({ path: `${prefix}/${f.path}`, content: pathToFileURL(inside(directory, f.path)) })),
      ] });
      revision = uploaded?.commit.oid;
    } else {
      // Recover the commit that introduced this version, even after unrelated
      // catalogs advance the dataset's main branch or a runner loses its receipt.
      for await (const file of io.listFiles({ repo: hfRepo, accessToken: hfToken, path: prefix, revision: metadata.sha, expand: true })) {
        if (file.path === `${prefix}/release.json`) revision = file.lastCommit?.id;
      }
    }
    if (!/^[a-f0-9]{40}$/.test(revision ?? '')) throw new Error('Hugging Face did not return an immutable commit');
    await io.verifyRemote(`${hfBase}/resolve/${revision}/${plan.huggingFace.path}`, release.sha256, release.archiveBytes);
    receipt.huggingface = { repo: hfRepo.name, revision, path: plan.huggingFace.path };
    await writeJson(receiptPath, receipt);
  } else await io.verifyRemote(`${hfBase}/resolve/${receipt.huggingface.revision}/${receipt.huggingface.path}`, release.sha256, release.archiveBytes);
  let ghRelease;
  try { ghRelease = await io.githubApi(`/repos/${plan.github.repository}/releases/tags/${encodeURIComponent(plan.github.tag)}`); } catch (e) { if (e.status !== 404) throw e; }
  if (!ghRelease) ghRelease = await io.githubApi(`/repos/${plan.github.repository}/releases`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tag_name: plan.github.tag, target_commitish: release.sourceCommit, name: `${release.manifest.name} ${release.version}`, draft: true, body: `${release.manifest.description}\n\nSource commit: ${release.sourceCommit}\nSHA-256: ${release.sha256}\nSee release.json and LICENSES for provenance and licensing.` }) });
  for (const file of (await inventory(directory)).filter((f) => f.path !== 'published.json' && !f.path.includes('/'))) {
    const existing = ghRelease.assets.find((a) => a.name === file.path);
    const path = inside(directory, file.path);
    const data = await openAsBlob(path);
    if (existing) {
      await io.verifyRemote(existing.url, file.sha256, data.size, { ...githubHeaders(ghToken), Accept: 'application/octet-stream' });
      continue;
    }
    if (!ghRelease.draft) throw new Error('A published GitHub release is missing assets; refusing to mutate it');
    await io.request(`${ghRelease.upload_url.replace(/\{.*$/, '')}?name=${encodeURIComponent(file.path)}`, { method: 'POST', headers: { ...githubHeaders(ghToken), 'Content-Type': 'application/octet-stream' }, body: data, maxBytes: 1000000, attempts: 1, signal: AbortSignal.timeout(30 * 60 * 1000) });
  }
  if (ghRelease.draft) ghRelease = await io.githubApi(`/repos/${plan.github.repository}/releases/${ghRelease.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ draft: false }) });
  const githubUrl = `https://github.com/${plan.github.repository}/releases/download/${encodeURIComponent(plan.github.tag)}/${release.archive}`;
  await io.verifyRemote(githubUrl, release.sha256, release.archiveBytes);
  receipt.github = { repository: plan.github.repository, tag: plan.github.tag, url: ghRelease.html_url, archiveUrl: githubUrl };
  await writeJson(receiptPath, receipt);
  return { ...plan, applied: true, receipt: receiptPath };
}
