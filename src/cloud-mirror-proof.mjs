import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { digest, readJson } from './files.mjs';
import { getJson, githubApi } from './http.mjs';
import { verifyLocalRelease, verifyPublicationChecks, verifyRemote } from './publish.mjs';

export function validateCloudMirrorProof(release, receipt, proof, run, hfFile, githubRelease) {
  assert.ok(Number.isSafeInteger(proof.runId) && proof.runId > 0);
  assert.match(proof.workflowCommit, /^[a-f0-9]{40}$/);
  assert.equal(run.id, proof.runId); assert.equal(run.status, 'completed'); assert.equal(run.conclusion, 'success');
  assert.equal(run.head_sha, proof.workflowCommit); assert.equal(run.path, '.github/workflows/mirror-release.yml');
  assert.equal(run.event, 'workflow_dispatch'); assert.equal(run.head_repository.full_name, release.targets.github);
  assert.equal(receipt.sha256, release.sha256);
  assert.equal(receipt.huggingface.repo, release.targets.huggingFace); assert.match(receipt.huggingface.revision, /^[a-f0-9]{40}$/);
  const prefix = `catalogs/${release.catalogId}/releases/${release.version}`;
  assert.equal(receipt.huggingface.path, `${prefix}/${release.archive}`);
  assert.equal(hfFile.path, receipt.huggingface.path); assert.equal(hfFile.size, release.archiveBytes);
  assert.equal(hfFile.lfs?.oid, release.sha256); assert.equal(hfFile.lfs?.size, release.archiveBytes);
  assert.equal(receipt.github.repository, release.targets.github); assert.equal(receipt.github.tag, `${release.catalogId}-v${release.version}`);
  assert.equal(githubRelease.tag_name, receipt.github.tag); assert.equal(githubRelease.draft, false);
  assert.equal(githubRelease.target_commitish, release.sourceCommit); assert.equal(githubRelease.html_url, receipt.github.url);
  const asset = githubRelease.assets.find(a => a.name === release.archive);
  assert.equal(asset?.state, 'uploaded'); assert.equal(asset?.size, release.archiveBytes); assert.equal(asset?.digest, `sha256:${release.sha256}`);
  const expectedUrl = `https://github.com/${release.targets.github}/releases/download/${receipt.github.tag}/${release.archive}`;
  assert.equal(asset.browser_download_url, expectedUrl); assert.equal(receipt.github.archiveUrl, expectedUrl);
  return [`https://huggingface.co/datasets/${receipt.huggingface.repo}/resolve/${receipt.huggingface.revision}/${receipt.huggingface.path}`, expectedUrl, asset.url];
}

// A pinned successful runner has already downloaded and hashed both hosts.
// Reuse that proof only while their current object digests still match. Every
// other URL, hash, or byte count follows the ordinary full-download verifier.
export async function createCloudMirrorVerifier(directory, proof, { api = githubApi, json = getJson, fallback = verifyRemote } = {}) {
  const release = await readJson(resolve(directory, 'release.json'));
  const receipt = await readJson(proof.receiptPath);
  await verifyLocalRelease(directory, release);
  await verifyPublicationChecks(directory, release);
  const run = await api(`/repos/${release.targets.github}/actions/runs/${proof.runId}`);
  const hf = receipt.huggingface, prefix = `catalogs/${release.catalogId}/releases/${release.version}`;
  const files = await json(`https://huggingface.co/api/datasets/${release.targets.huggingFace}/tree/${hf.revision}/${prefix}`);
  const gh = await api(`/repos/${release.targets.github}/releases/tags/${release.catalogId}-v${release.version}`);
  const urls = validateCloudMirrorProof(release, receipt, proof, run, files.find(f => f.path === hf.path), gh);
  assert.equal(digest(await json(`https://huggingface.co/datasets/${hf.repo}/resolve/${hf.revision}/${prefix}/release.json`)), digest(release));
  return {
    evidence: { catalogId: release.catalogId, version: release.version, sha256: release.sha256, runId: run.id, workflowCommit: run.head_sha, url: run.html_url, hostHashesMatch: true, verifiedAt: new Date().toISOString() },
    verifyRemote: async (url, hash, bytes, ...rest) => {
      if (urls.includes(url) && hash === release.sha256 && bytes === release.archiveBytes) return;
      return fallback(url, hash, bytes, ...rest);
    },
  };
}
