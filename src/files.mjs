import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { lstat, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';

export const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
export const sha256 = (value) => createHash('sha256').update(value).digest('hex');
export function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map((k) => `${JSON.stringify(k)}:${canonical(value[k])}`).join(',')}}`;
  return JSON.stringify(value);
}
export const digest = (value) => sha256(canonical(value));
export const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
export async function exists(path) {
  try { await lstat(path); return true; } catch (e) { if (e.code === 'ENOENT') return false; throw e; }
}
export function portablePath(path) {
  if (typeof path !== 'string' || !path || path.includes('\\') || isAbsolute(path) || /[:\x00-\x1f]/.test(path)) throw new Error(`Unsafe relative path: ${path}`);
  for (const part of path.split('/')) {
    if (!part || part === '.' || part === '..' || /[. ]$/.test(part) || /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(part)) throw new Error(`Unsafe relative path: ${path}`);
  }
  return path;
}
export function inside(root, path) {
  const target = resolve(root, portablePath(path));
  const rel = relative(resolve(root), target);
  if (!rel || rel.startsWith(`..${sep}`) || isAbsolute(rel)) throw new Error(`Path escapes root: ${path}`);
  return target;
}
export async function walk(root, prefix = '') {
  const results = [];
  const stat = await lstat(root);
  if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error(`Expected an ordinary directory: ${root}`);
  for (const entry of (await readdir(root, { withFileTypes: true })).sort((a, b) => a.name < b.name ? -1 : 1)) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    portablePath(path);
    if (entry.isSymbolicLink()) throw new Error(`Symlinks are not allowed: ${path}`);
    if (entry.isDirectory()) results.push(...await walk(resolve(root, entry.name), path));
    else if (entry.isFile()) results.push(path);
    else throw new Error(`Unsupported file type: ${path}`);
  }
  const lower = results.map((p) => p.normalize('NFC').toLowerCase());
  if (new Set(lower).size !== lower.length) throw new Error(`Case or Unicode path collision under ${root}`);
  return results;
}
export async function write(path, content) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content);
}
export async function writeJson(path, value) { await write(path, json(value)); }
export async function hashFile(path) {
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return hash.digest('hex');
}
export async function inventory(root) {
  if (!await exists(root)) return [];
  const paths = await walk(root);
  const results = new Array(paths.length); let next = 0;
  // Large catalogs must not open a stream for every article at once (EMFILE).
  await Promise.all(Array.from({ length: Math.min(16, paths.length) }, async () => {
    while (next < paths.length) {
      const index = next++;
      results[index] = { path: paths[index], sha256: await hashFile(inside(root, paths[index])) };
    }
  }));
  return results;
}
export function diffFiles(before, after) {
  const a = new Map(before.map((f) => [f.path, f.sha256]));
  const b = new Map(after.map((f) => [f.path, f.sha256]));
  return {
    added: [...b.keys()].filter((p) => !a.has(p)).sort(),
    updated: [...b.keys()].filter((p) => a.has(p) && a.get(p) !== b.get(p)).sort(),
    removed: [...a.keys()].filter((p) => !b.has(p)).sort(),
  };
}
export async function removeWork(root, path) {
  // Every recursive cleanup is confined to this repository's scratch tree.
  const target = inside(resolve(root, '.work'), relative(resolve(root, '.work'), resolve(path)).split(sep).join('/'));
  await rm(target, { recursive: true, force: true });
}
export async function atomicJson(path, data) {
  await write(`${path}.tmp`, json(data));
  await rename(`${path}.tmp`, path);
}
