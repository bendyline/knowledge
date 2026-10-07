import { createWriteStream } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { pathToFileURL } from 'node:url';
import { listFiles } from '@huggingface/hub';
import { digest, hashFile, inside, readJson } from '../src/files.mjs';
import { getJson } from '../src/http.mjs';

export function mirrorCoordinates(env) {
  const { CATALOG_ID: id, CATALOG_VERSION: version, HF_REVISION: revision, SOURCE_COMMIT: sourceCommit, ARCHIVE_SHA256: sha256 } = env;
  if (!/^[a-z0-9][a-z0-9-]{0,95}$/.test(id ?? '') || !/^\d+\.\d+\.\d+$/.test(version ?? '')
    || !/^[a-f0-9]{40}$/.test(revision ?? '') || !/^[a-f0-9]{40}$/.test(sourceCommit ?? '') || !/^[a-f0-9]{64}$/.test(sha256 ?? '')) throw Error('Invalid immutable mirror coordinates');
  return { id, version, revision, sourceCommit, sha256, prefix: `catalogs/${id}/releases/${version}` };
}

export function checkMirrorRelease(release, expected) {
  if (release.catalogId !== expected.id || release.version !== expected.version || release.sourceCommit !== expected.sourceCommit
    || release.sha256 !== expected.sha256 || release.archive !== `${expected.id}-${expected.version}.gezk`
    || release.testOnly || release.targets?.huggingFace !== 'Bendyline/knowledge' || release.targets?.github !== 'bendyline/knowledge'
    || !Number.isSafeInteger(release.archiveBytes) || release.archiveBytes < 1 || release.archiveBytes >= 2 * 1024 ** 3) throw Error('Mirror release differs from the approved coordinates');
}

export function mirrorRelativePath(prefix, path) {
  if (!path.startsWith(`${prefix}/`)) throw Error('Mirror file is outside its release');
  const relative = path.slice(prefix.length + 1);
  if (/[\\:\x00-\x1f]/.test(relative) || relative.split('/').some(p => !p || p === '.' || p === '..')) throw Error('Unsafe mirror path');
  if (relative === 'published.json') throw Error('Publication receipts must be regenerated');
  return relative;
}

export async function restorePublishedRelease(root, env = process.env) {
  const expected = mirrorCoordinates(env);
  const base = `https://huggingface.co/datasets/Bendyline/knowledge/resolve/${expected.revision}`;
  const release = await getJson(`${base}/${expected.prefix}/release.json`, { maxBytes: 5000000 });
  checkMirrorRelease(release, expected);
  const files = []; let total = 0;
  for await (const file of listFiles({ repo: { type: 'dataset', name: 'Bendyline/knowledge' }, path: expected.prefix, revision: expected.revision, recursive: true })) {
    if (file.type !== 'file') continue;
    const path = mirrorRelativePath(expected.prefix, file.path);
    if (!Number.isSafeInteger(file.size) || file.size < 0) throw Error('Invalid mirror file size');
    total += file.size;
    files.push({ path, size: file.size, url: `${base}/${file.path}` });
    if (files.length > 200 || total > release.archiveBytes + 50 * 1024 ** 2) throw Error('Mirror release exceeds its file budget');
  }
  for (const required of [release.archive, 'release.json', 'verification.json', 'SHA256SUMS']) if (!files.some(f => f.path === required)) throw Error(`Missing mirror file: ${required}`);
  const directory = inside(resolve(root, '.work/releases'), `${expected.id}/${expected.version}`);
  for (const file of files) {
    const output = inside(directory, file.path);
    await mkdir(dirname(output), { recursive: true });
    const response = await fetch(file.url, { signal: AbortSignal.timeout(10 * 60 * 1000) });
    if (!response.ok || !response.body) throw Error(`Mirror download failed: ${response.status}`);
    let bytes = 0;
    async function* limited(source) { for await (const chunk of source) { bytes += chunk.length; if (bytes > file.size) throw Error('Mirror file exceeds declared size'); yield chunk; } }
    await pipeline(Readable.fromWeb(response.body), limited, createWriteStream(output, { flags: 'wx' }));
    if (bytes !== file.size) throw Error('Truncated mirror file');
  }
  if (await hashFile(inside(directory, release.archive)) !== expected.sha256 || digest(await readJson(resolve(directory, 'release.json'))) !== digest(release)) throw Error('Restored mirror hashes differ');
  // Kept outside Git so checking out the release's exact source commit leaves a
  // clean tree. That pinned publisher performs every existing release check.
  await writeFile(resolve(root, '.work/mirror-publish.mjs'), `import {resolve} from 'node:path';\nimport {publishRelease} from '../src/publish.mjs';\nconsole.log(JSON.stringify(await publishRelease(process.cwd(),resolve('.work/releases',process.env.CATALOG_ID,process.env.CATALOG_VERSION),{apply:true}),null,2));\n`);
  console.log(JSON.stringify({ restored: expected, files: files.length, bytes: total }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) await restorePublishedRelease(process.cwd());
