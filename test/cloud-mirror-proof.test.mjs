import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCloudMirrorProof } from '../src/cloud-mirror-proof.mjs';
const release = { catalogId: 'example', version: '2026.10.1', archive: 'example-2026.10.1.gezk', archiveBytes: 100,
  sha256: 'a'.repeat(64), sourceCommit: 'b'.repeat(40), targets: { github: 'bendyline/knowledge', huggingFace: 'Bendyline/knowledge' } };
const proof = { runId: 123, workflowCommit: 'c'.repeat(40) };
const run = { id: 123, status: 'completed', conclusion: 'success', head_sha: proof.workflowCommit,
  path: '.github/workflows/mirror-release.yml', event: 'workflow_dispatch', head_repository: { full_name: release.targets.github } };
const url = 'https://github.com/bendyline/knowledge/releases/download/example-v2026.10.1/example-2026.10.1.gezk';
const receipt = { sha256: release.sha256, huggingface: { repo: release.targets.huggingFace, revision: 'd'.repeat(40), path: 'catalogs/example/releases/2026.10.1/example-2026.10.1.gezk' },
  github: { repository: release.targets.github, tag: 'example-v2026.10.1', url: 'https://github.com/bendyline/knowledge/releases/tag/example-v2026.10.1', archiveUrl: url } };
const hf = { path: receipt.huggingface.path, size: 100, lfs: { size: 100, oid: release.sha256 } };
const gh = { tag_name: receipt.github.tag, draft: false, target_commitish: release.sourceCommit, html_url: receipt.github.url,
  assets: [{ name: release.archive, state: 'uploaded', size: 100, digest: `sha256:${release.sha256}`, browser_download_url: url, url: 'https://api.github.com/repos/bendyline/knowledge/releases/assets/456' }] };
const validate = (r = run, h = hf, g = gh) => validateCloudMirrorProof(release, receipt, proof, r, h, g);
test('cloud proof binds successful workflow, build source, receipt and both host hashes', () => {
  assert.equal(validate().length, 3);
  for (const [key, value] of [['id', 124], ['status', 'in_progress'], ['conclusion', 'failure'], ['head_sha', 'e'.repeat(40)], ['path', 'other.yml'], ['event', 'pull_request']]) assert.throws(() => validate({ ...run, [key]: value }));
  assert.throws(() => validate({ ...run, head_repository: { full_name: 'untrusted/fork' } }));
  assert.throws(() => validate(run, { ...hf, lfs: { ...hf.lfs, oid: 'f'.repeat(64) } }));
  assert.throws(() => validate(run, { ...hf, size: 101 }));
  assert.throws(() => validate(run, hf, { ...gh, draft: true }));
  assert.throws(() => validate(run, hf, { ...gh, target_commitish: 'main' }));
  assert.throws(() => validate(run, hf, { ...gh, assets: [{ ...gh.assets[0], digest: 'sha256:wrong' }] }));
});
