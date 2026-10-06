import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { publishCapCollection } from '../src/caselaw-publish.mjs';
import { fixture } from './helpers.mjs';
import { readJson, sha256, writeJson } from '../src/files.mjs';

test('collection publication waits for every verified part, resumes, and publishes no local paths', async () => {
  const c = await fixture();
  const version = '2026.10.1';
  const config = { id: 'cap-example', name: 'Example CAP collection', publish: { ...c.manifest.publish, enabled: true } };
  const directory = resolve(c.root, '.work/collections', config.id, version);
  const parts = [1, 2].map(n => ({ catalogId: `cap-example-part-000${n}`, caseIds: [n], sha256: String(n).repeat(64),
    counts: { documents: 1 }, verified: true, integrity: true, semanticPassed: true, semanticQueries: 1, directory: `private/local/path/${n}` }));
  const index = { collection: config.id, version, complete: true, coverageComplete: true, coverage: { selectedCases: 2 }, parts };
  await writeJson(resolve(directory, 'collection.json'), index);
  for (const p of parts) await writeJson(resolve(c.root, '.work/releases', p.catalogId, version, 'release.json'), {
    catalogId: p.catalogId, sha256: p.sha256, manifest: { counts: { documents: 1 } }, targets: config.publish, sourceCommit: 'a'.repeat(40),
  });
  const hfFiles = new Map(); const ghFiles = new Map(); const order = [];
  let gh; let interrupt = true; let uploads = 0;
  const missing = () => { throw Object.assign(new Error('missing'), { status: 404 }); };
  const services = {
    tokens: () => ({ hf: 'fixture', github: 'fixture' }),
    async publishRelease(root, partDirectory, { apply }) {
      const part = await readJson(resolve(partDirectory, 'release.json'));
      if (!apply) { order.push(`check:${part.catalogId}`); return; }
      order.push(`publish:${part.catalogId}`);
      if (interrupt && part.catalogId.endsWith('2')) { interrupt = false; throw new Error('part interrupted'); }
      await writeJson(resolve(partDirectory, 'published.json'), { sha256: part.sha256,
        huggingface: { repo: config.publish.huggingFace, revision: 'b'.repeat(40), path: `${part.catalogId}.gezk` },
        github: { repository: config.publish.github, url: `https://github.com/example/${part.catalogId}` } });
    },
    async getJson(url) {
      if (url.includes('/api/datasets/')) return { private: false, sha: 'c'.repeat(40) };
      const bytes = hfFiles.get(url.split('/resolve/')[1].slice(41));
      return bytes ? JSON.parse(bytes.toString()) : missing();
    },
    async uploadFiles({ files }) {
      uploads++; order.push('index');
      for (const f of files) hfFiles.set(f.path, await readFile(f.content));
      return { commit: { oid: 'd'.repeat(40) } };
    },
    async *listFiles({ path }) { yield { path: `${path}/collection.json`, lastCommit: { id: 'd'.repeat(40) } }; },
    async githubApi(path, options = {}) {
      if (path.includes('/tags/')) return gh ? structuredClone(gh) : missing();
      if (options.method === 'POST') gh = { id: 1, draft: true, assets: [], upload_url: 'https://uploads.github.com/example{?name}', html_url: 'https://github.com/example/release' };
      if (options.method === 'PATCH') gh.draft = false;
      return structuredClone(gh);
    },
    async request(url, { body }) {
      const name = new URL(url).searchParams.get('name');
      ghFiles.set(name, Buffer.from(await body.arrayBuffer()));
      gh.assets.push({ name, url: `https://api.github.com/assets/${name}` });
    },
    async verifyRemote(url, hash, bytes) {
      const value = url.includes('/resolve/') ? hfFiles.get(url.split('/resolve/')[1].slice(41)) : ghFiles.get(new URL(url).pathname.split('/').at(-1));
      assert.equal(value.length, bytes); assert.equal(sha256(value), hash);
    },
  };
  const publish = () => publishCapCollection(c.root, config, { version, apply: true, services });
  await writeJson(resolve(directory, 'collection.json'), { ...index, complete: false });
  await assert.rejects(publish(), /Every collection part/);
  assert.equal(order.length, 0);
  await writeJson(resolve(directory, 'collection.json'), index);
  await assert.rejects(publish(), /part interrupted/);
  assert.equal(uploads, 0);
  assert.deepEqual(order.slice(0, 2), parts.map(p => `check:${p.catalogId}`));
  const result = await publish();
  assert.equal(result.applied, true); assert.equal(result.parts, 2);
  assert.equal(order.at(-1), 'index');
  const manifest = JSON.parse(hfFiles.get(`collections/${config.id}/releases/${version}/collection.json`));
  assert.ok(manifest.parts.every(p => !('directory' in p) && p.downloads.github && p.downloads.huggingface));
  assert.equal(gh.draft, false);
  await publish();
  assert.equal(uploads, 1);
});
