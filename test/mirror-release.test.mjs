import test from 'node:test';
import assert from 'node:assert/strict';
import { mirrorCoordinates, checkMirrorRelease, mirrorRelativePath } from '../scripts/restore-published-release.mjs';
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
