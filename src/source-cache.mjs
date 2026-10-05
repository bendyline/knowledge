import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { exists, sha256, write } from './files.mjs';
import { request } from './http.mjs';

// Only immutable, commit-pinned URLs are passed here. Git's blob hash checks
// cached content against the source tree when a blob ID is available.
export async function cachedSource(root, url, { maxBytes, blobSha, download = request } = {}) {
  const path = resolve(root, '.work/source-cache', sha256(url));
  let bytes = await exists(path) ? await readFile(path) : undefined;
  const matches = (data) => !blobSha || createHash('sha1').update(`blob ${data.length}\0`).update(data).digest('hex') === blobSha;
  if (bytes && (bytes.length > maxBytes || !matches(bytes))) bytes = undefined;
  if (!bytes) {
    bytes = (await download(url, { maxBytes })).bytes;
    if (!matches(bytes)) throw new Error(`Source blob checksum mismatch: ${url}`);
    await write(path, bytes);
  }
  return bytes;
}

export async function mapConcurrent(items, limit, fn) {
  let next = 0; let failure;
  const results = new Array(items.length);
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (!failure && next < items.length) {
      const index = next++;
      try { results[index] = await fn(items[index], index); } catch (error) { failure ??= error; }
    }
  }));
  if (failure) throw failure;
  return results;
}
