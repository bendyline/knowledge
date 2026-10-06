import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';
import { exists, inside, inventory, readJson, removeWork, write, writeJson } from './files.mjs';

// Definitions are versioned; accepted source snapshots live only in .work.
// Keep content, provenance and generated rights evidence out of the definition.
export async function workspaceDefinitionFiles(catalog) {
  if (!catalog.definitionDir || resolve(catalog.dir) !== inside(resolve(catalog.root, '.work/catalogs'), catalog.key)) throw new Error('Invalid workspace catalog location');
  const definitions = await inventory(catalog.definitionDir);
  if (definitions.some(f => f.path.startsWith('content/') || ['provenance.jsonl', 'sources.lock.json'].includes(f.path))) throw new Error(`${catalog.key}: workspace catalog definitions must not contain generated source content`);
  return definitions;
}

export async function refreshWorkspaceDefinition(catalog) {
  if (catalog.manifest.contentStorage !== 'workspace') return;
  const definitions = await workspaceDefinitionFiles(catalog);
  const index = resolve(catalog.dir, '.workspace-definition.json');
  const current = new Set(definitions.map(f => f.path));
  if (await exists(index)) for (const path of await readJson(index)) {
    if (path.startsWith('content/') || ['provenance.jsonl', 'sources.lock.json', '.workspace-definition.json'].includes(path)) throw new Error('Invalid workspace definition index');
    if (!current.has(path)) await removeWork(catalog.root, inside(catalog.dir, path));
  }
  for (const file of definitions) await write(inside(catalog.dir, file.path), await readFile(inside(catalog.definitionDir, file.path)));
  await writeJson(index, [...current].sort());
}
