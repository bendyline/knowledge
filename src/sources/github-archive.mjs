import yauzl from 'yauzl';
import { createWriteStream } from 'node:fs';
import { mkdir, rename, rm, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { Transform, Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { exists, portablePath } from '../files.mjs';

// A commit-pinned source ZIP avoids tens of thousands of individual HTTP requests.
// Nothing is extracted or executed; each selected file must match Git's blob SHA.
export async function githubArchive(root, repository, revision, selected, limits) {
  const directory = resolve(root, '.work/github-archives');
  await mkdir(directory, { recursive: true });
  const path = resolve(directory, `${repository.replace('/', '--')}-${revision}.zip`);
  if (!await exists(path)) {
    console.error(`[GitHub] downloading ${repository}@${revision.slice(0, 12)} source archive`);
    const response = await fetch(`https://codeload.github.com/${repository}/zip/${revision}`, { signal: AbortSignal.timeout(900000) });
    if (!response.ok) throw new Error(`GitHub archive download failed: HTTP ${response.status}`);
    const temporary = `${path}.${process.pid}.part`;
    let bytes = 0;
    try {
      await pipeline(Readable.fromWeb(response.body), new Transform({ transform(chunk, encoding, callback) {
        bytes += chunk.length;
        callback(bytes > limits.maxArchiveBytes ? new Error('GitHub archive exceeds compressed byte budget') : null, chunk);
      } }), createWriteStream(temporary, { flags: 'wx' }));
      await rename(temporary, path);
    } catch (error) { await rm(temporary, { force: true }); throw error; }
  }
  if ((await stat(path)).size > limits.maxArchiveBytes) throw new Error('GitHub archive exceeds compressed byte budget');
  return readGithubArchive(path, selected, limits);
}

export async function readGithubArchive(path, selected, { maxFileBytes, maxTotalBytes }) {
  const wanted = new Map(selected);
  const files = new Map(); let total = 0; let prefix;
  const zip = await yauzl.openPromise(path, { strictFileNames: true, validateEntrySizes: true });
  try {
    for await (const entry of zip.eachEntry()) {
      const split = entry.fileName.indexOf('/');
      if (split < 1) throw new Error('Invalid GitHub archive root');
      const root = entry.fileName.slice(0, split);
      prefix ??= root;
      if (root !== prefix) throw new Error('Multiple GitHub archive roots');
      const name = entry.fileName.slice(split + 1);
      if (!wanted.has(name)) continue;
      portablePath(name);
      if (files.has(name)) throw new Error(`Duplicate GitHub archive entry: ${name}`);
      const mode = (entry.externalFileAttributes >>> 16) & 0xf000;
      if (mode && mode !== 0x8000 || entry.generalPurposeBitFlag & 1) throw new Error(`Unsupported GitHub archive entry: ${name}`);
      if (entry.uncompressedSize > maxFileBytes || total + entry.uncompressedSize > maxTotalBytes) throw new Error('GitHub archive exceeds expanded byte budget');
      const stream = await zip.openReadStreamPromise(entry);
      const chunks = []; let size = 0;
      for await (const chunk of stream) {
        size += chunk.length; total += chunk.length;
        if (size > maxFileBytes || total > maxTotalBytes) { stream.destroy(); throw new Error('GitHub archive exceeds expanded byte budget'); }
        chunks.push(chunk);
      }
      const bytes = Buffer.concat(chunks);
      const hash = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
      if (hash !== wanted.get(name).sha) throw new Error(`GitHub archive blob mismatch: ${name}`);
      files.set(name, bytes);
    }
  } finally { zip.close(); }
  if (files.size !== wanted.size) throw new Error(`GitHub archive is missing ${wanted.size - files.size} selected files`);
  return files;
}
