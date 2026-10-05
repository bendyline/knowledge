import { cp, mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { CatalogSchema } from '../src/schema.mjs';
import { catalogs } from '../src/catalogs.mjs';
import { sha256 } from '../src/files.mjs';

export async function fixture() {
  await mkdir('.work/tests', { recursive: true });
  const root = await mkdtemp(resolve('.work/tests/case-'));
  await cp('catalogs/bendyline/knowledge-handbook', resolve(root, 'catalogs/bendyline/handbook'), { recursive: true });
  await mkdir(resolve(root, 'src'));
  await writeFile(resolve(root, 'src/version.mjs'), 'export const version = 1;\n');
  await cp('package-lock.json', resolve(root, 'package-lock.json'));
  return (await catalogs(root, 'bendyline/handbook'))[0];
}
export function fakeEmbedder(profile) {
  return { profile, embed: async (texts) => texts.map((text) => {
    const bytes = Buffer.from(sha256(text), 'hex');
    const vector = Array.from({ length: profile.dimensions }, (_, i) => (bytes[i % bytes.length] - 127) / 128);
    const norm = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0));
    return vector.map((v) => v / norm);
  }), countTokens: (text) => text.split(/\s+/).length, dispose: async () => {} };
}
export function githubManifest(base, extra = {}) {
  return CatalogSchema.parse({ ...base, source: { type: 'github', repository: 'example/docs', ref: 'main', paths: ['docs'], include: ['**/*.md', '**/*.html'], exclude: [], licenseFiles: [{ path: 'LICENSE', sha256: sha256('MIT example'), license: 'mit' }] }, ...extra });
}
