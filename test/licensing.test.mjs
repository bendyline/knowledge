import test from 'node:test';
import assert from 'node:assert/strict';
import references from '../policy/license-references.json' with { type: 'json' };
import { recognizeLicense, assessLicenseFiles } from '../src/licensing.mjs';
import { fixture, githubManifest } from './helpers.mjs';
import { githubSnapshot } from '../src/sources/github.mjs';

test('standard free licenses are recognized automatically without accepting extra restrictions', () => {
  for (const reference of references.licenses) assert.equal(recognizeLicense(reference.text, reference.id).spdx, reference.id);
  const mit = references.licenses.find((r) => r.id === 'MIT').text.replace('Copyright (c) <year> <copyright holders>', 'Copyright (c) 2026 Example contributors');
  assert.equal(recognizeLicense(mit.replaceAll('\n', '\r\n'), 'MIT').spdx, 'MIT');
  assert.throws(() => recognizeLicense(mit + '\nNoncommercial use only.', 'MIT'), /differs from the standard/);
  assert.throws(() => recognizeLicense(mit + '\n仅限非商业用途', 'MIT'), /differs from the standard/);
  assert.throws(() => recognizeLicense('Noncommercial use only.\n' + mit, 'MIT'), /differs from the standard/);
  assert.throws(() => recognizeLicense(mit, 'CC-BY-NC-4.0'), /not covered/);
  assert.throws(() => recognizeLicense(mit, 'CC-BY-ND-4.0'), /not covered/);
  assert.throws(() => recognizeLicense(mit, 'LicenseRef-Custom'), /not covered/);
  assert.ok(recognizeLicense(references.licenses.find((r) => r.id === 'CC-BY-SA-4.0').text, 'CC-BY-SA-4.0').obligations.includes('same-license-for-adaptations'));
});

test('automatic source assessment writes license evidence and stops nonstandard terms before documents download', async () => {
  const c = await fixture(); c.manifest = githubManifest(c.manifest);
  c.manifest.licensing.status = 'automatic'; c.manifest.licensing.policy = 'standard-open-v1';
  delete c.manifest.source.licenseFiles[0].sha256;
  const license = references.licenses.find((r) => r.id === 'MIT').text;
  const revision = 'a'.repeat(40);
  const api = async (path) => {
    if (path === '/repos/example/docs') return { private: false };
    if (path.includes('/commits/')) return { sha: revision, commit: { tree: { sha: 'root' } } };
    if (path.endsWith('/trees/root')) return { tree: [{ path: 'docs', type: 'tree', sha: 'docs' }] };
    return { tree: [{ path: 'page.md', type: 'blob', mode: '100644', size: 10 }] };
  };
  const download = async (url) => ({ bytes: Buffer.from(url.endsWith('/LICENSE') ? license : '# Page\n') });
  const result = await githubSnapshot(c, { api, download });
  assert.ok(result.legal.some((f) => f.path === 'LICENSES/assessment.json'));
  assert.ok(result.legal.some((f) => f.path === 'LICENSES/MIT.txt'));
  const paths = [];
  await assert.rejects(githubSnapshot(c, { api, download: async (url) => { paths.push(url); return { bytes: Buffer.from(license + '\nExtra restrictions.') }; } }), /differs from the standard/);
  assert.equal(paths.length, 1);
  assert.throws(() => assessLicenseFiles(c.manifest, new Map()), /Missing license evidence/);
});
