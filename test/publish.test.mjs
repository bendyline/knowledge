import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, unlink, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { buildCatalog } from '../src/build.mjs';
import { verifyRelease } from '../src/verify.mjs';
import { publishRelease, verifyLocalRelease } from '../src/publish.mjs';
import { readJson, sha256, writeJson } from '../src/files.mjs';
import { fixture, fakeEmbedder } from './helpers.mjs';
import { datasetLicense } from '../src/dataset-license.mjs';

function fakeHosts(release) {
  const hfFiles = new Map(); const ghFiles = new Map();
  const originalRevision = 'b'.repeat(40);
  let ghRelease; let failUpload = true; let uploads = 0; let listed = 0;
  const missing = () => { throw Object.assign(new Error('Not found'), { status: 404 }); };
  const services = {
    commit: () => release.sourceCommit, dirty: () => '', tokens: () => ({ hf: 'test', github: 'test' }),
    async getJson(url) {
      if (url.includes('/api/datasets/')) return { private: false, sha: 'c'.repeat(40) };
      const bytes = hfFiles.get(url.split('/resolve/')[1].slice(41));
      return bytes ? JSON.parse(bytes.toString()) : missing();
    },
    async uploadFiles({ files }) {
      uploads++;
      for (const file of files) hfFiles.set(file.path, file.content instanceof Blob ? Buffer.from(await file.content.arrayBuffer()) : await readFile(file.content));
      return { commit: { oid: originalRevision } };
    },
    async *listFiles({ path, expand }) {
      assert.equal(expand, true); listed++;
      yield { path: `${path}/release.json`, lastCommit: { id: originalRevision } };
    },
    async githubApi(path, options = {}) {
      if (!path.includes('/releases')) return { private: false };
      if (path.includes('/tags/')) return ghRelease ? structuredClone(ghRelease) : missing();
      if (options.method === 'POST') {
        const body = JSON.parse(options.body);
        ghRelease = { id: 1, draft: body.draft, assets: [], upload_url: 'https://uploads.github.com/repos/example/assets{?name}', html_url: 'https://github.com/example/knowledge/releases/tag/example' };
      } else if (options.method === 'PATCH') ghRelease.draft = false;
      return structuredClone(ghRelease);
    },
    async request(url, { body }) {
      if (failUpload && ghFiles.size === 1) { failUpload = false; throw new Error('Simulated interrupted upload'); }
      const name = new URL(url).searchParams.get('name');
      const assetUrl = `https://api.github.com/repos/example/assets/${encodeURIComponent(name)}`;
      ghFiles.set(name, Buffer.from(await body.arrayBuffer()));
      ghRelease.assets.push({ name, url: assetUrl });
    },
    async verifyRemote(url, hash, size) {
      const bytes = url.includes('/resolve/') ? hfFiles.get(url.split('/resolve/')[1].slice(41)) : ghFiles.get(decodeURIComponent(new URL(url).pathname.split('/').at(-1)));
      assert.ok(bytes, `Missing download ${url}`);
      assert.equal(bytes.length, size); assert.equal(sha256(bytes), hash);
    },
  };
  return { services, hfFiles, originalRevision, stats: () => ({ uploads, listed, draft: ghRelease?.draft }) };
}

test('publication resumes partial uploads and recovers the original immutable HF commit on a fresh runner', async () => {
  const c = await fixture();
  await writeFile(resolve(c.root, 'LICENSE'), await readFile('LICENSE'));
  await writeFile(resolve(c.root, 'LICENSE'), await datasetLicense(c.root, { check: false }));
  const built = await buildCatalog(c, { version: '2026.10.1', createdAt: '2026-10-03T00:00:00Z', embedderFactory: fakeEmbedder });
  await verifyRelease(c, built.directory);
  // Exercise the publisher with isolated fake hosts; never send test vectors to a service.
  const release = await readJson(resolve(built.directory, 'release.json'));
  release.testOnly = false; release.targets.enabled = true; release.sourceCommit = 'a'.repeat(40);
  await writeJson(resolve(built.directory, 'release.json'), release);
  const host = fakeHosts(release);
  const publish = () => publishRelease(c.root, built.directory, { apply: true, services: host.services });
  const verificationPath = resolve(built.directory, 'verification.json');
  const accepted = await readJson(verificationPath);
  await writeJson(verificationPath, { ...accepted, sha256: '0'.repeat(64) });
  await assert.rejects(publish(), /does not match/);
  await writeJson(verificationPath, { ...accepted, fullText: [] });
  await assert.rejects(publish(), /configured fullText/);
  await writeJson(verificationPath, { ...accepted, fullText: accepted.fullText.map(q => ({ ...q, passed: false })) });
  await assert.rejects(publish(), /configured fullText/);
  assert.equal(host.stats().uploads, 0);
  await writeJson(verificationPath, accepted);
  await assert.rejects(publish(), /Simulated interrupted upload/);
  assert.equal(host.hfFiles.get('LICENSE').toString(), await readFile(resolve(c.root, 'LICENSE'), 'utf8'));
  const receipt = await readJson(resolve(built.directory, 'published.json'));
  assert.equal(receipt.huggingface.revision, host.originalRevision);
  assert.equal(receipt.github, undefined); assert.equal(host.stats().draft, true);
  assert.equal((await publish()).applied, true);
  assert.equal(host.stats().uploads, 1); assert.equal(host.stats().draft, false);
  await unlink(resolve(built.directory, 'published.json'));
  // A retry of an already uploaded version must preserve a newer dataset overview.
  host.hfFiles.set('LICENSE', Buffer.from('A newer release added another catalog.\n'));
  await publish();
  assert.equal(host.hfFiles.get('LICENSE').toString(), 'A newer release added another catalog.\n');
  assert.equal(host.stats().uploads, 1); assert.equal(host.stats().listed, 1);
  assert.equal((await readJson(resolve(built.directory, 'published.json'))).huggingface.revision, host.originalRevision);
  await unlink(resolve(built.directory, 'published.json'));
  const metadataPath = [...host.hfFiles.keys()].find((path) => path.endsWith('/release.json'));
  host.hfFiles.set(metadataPath, Buffer.from(JSON.stringify({ ...release, createdAt: '2026-10-04T00:00:00Z' })));
  await assert.rejects(publish(), /different bytes\/metadata/);
  await assert.rejects(verifyLocalRelease(built.directory, { ...release, archiveBytes: 1 }), /metadata does not match/);
});
