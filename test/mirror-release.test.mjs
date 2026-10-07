import test from 'node:test';
import assert from 'node:assert/strict';
import { mirrorCoordinates, checkMirrorRelease, mirrorRelativePath, mirrorRootFiles } from '../scripts/restore-published-release.mjs';
const env = { CATALOG_ID: 'caselaw-example-part-0001', CATALOG_VERSION: '2026.10.1', HF_REVISION: 'a'.repeat(40), SOURCE_COMMIT: 'b'.repeat(40), ARCHIVE_SHA256: 'c'.repeat(64) };
test('cloud mirrors require exact immutable coordinates', () => {
  const expected = mirrorCoordinates(env);
  for (const key of Object.keys(env)) assert.throws(() => mirrorCoordinates({ ...env, [key]: '../untrusted' }), /Invalid immutable/);
  const release = { catalogId: expected.id, version: expected.version, sourceCommit: expected.sourceCommit, sha256: expected.sha256,
    archive: `${expected.id}-${expected.version}.gezk`, archiveBytes: 100, targets: { huggingFace: 'Bendyline/knowledge', github: 'bendyline/knowledge' } };
  assert.doesNotThrow(() => checkMirrorRelease(release, expected));
  for (const key of ['catalogId', 'version', 'sourceCommit', 'sha256', 'archive']) assert.throws(() => checkMirrorRelease({ ...release, [key]: 'different' }, expected), /differs/);
  assert.throws(() => checkMirrorRelease({ ...release, testOnly: true }, expected), /differs/);
  assert.throws(() => checkMirrorRelease({ ...release, targets: { ...release.targets, github: 'other/repo' } }, expected), /differs/);
});
test('cloud mirror files stay inside their selected release and cannot supply receipts', () => {
  const { prefix } = mirrorCoordinates(env);
  assert.equal(mirrorRelativePath(prefix, `${prefix}/LICENSES/CC0-1.0.txt`), 'LICENSES/CC0-1.0.txt');
  for (const path of [`other/release.json`, `${prefix}/../outside`, `${prefix}/a/../../outside`, `${prefix}/a\\outside`, `${prefix}/C:/outside`, `${prefix}/published.json`]) assert.throws(() => mirrorRelativePath(prefix, path));
});

test('cloud mirrors restore root publication inputs while retaining their existing size and count limits', async () => {
  const expected = mirrorCoordinates(env), release = { archive: `${expected.id}-${expected.version}.gezk`, archiveBytes: 1024 ** 3 };
  const file = (name, size) => ({ type: 'file', path: `${expected.prefix}/${name}`, size });
  const root = [file(release.archive, release.archiveBytes), ...['release.json', 'verification.json', 'SHA256SUMS'].map(name => file(name, 100))];
  const selected = await mirrorRootFiles(release, expected, [...root, { type: 'directory', path: `${expected.prefix}/LICENSES` }], 'https://example.test');
  assert.equal(selected.files.length, 4);
  assert.equal(selected.total, release.archiveBytes + 300);
  await assert.rejects(mirrorRootFiles(release, expected, [...root, file('oversized.json', 50 * 1024 ** 2)], ''), /file budget/);
  await assert.rejects(mirrorRootFiles(release, expected, [...root, ...Array.from({ length: 197 }, (_, i) => file(`extra-${i}.txt`, 0))], ''), /file budget/);
  await assert.rejects(mirrorRootFiles(release, expected, [...root, file('LICENSES/provenance.jsonl', 80696506)], ''), /Unexpected nested/);
  await assert.rejects(mirrorRootFiles(release, expected, root.filter(f => !f.path.endsWith('verification.json')), ''), /Missing mirror file/);
});
