#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { resolve } from 'node:path';
import { catalogs, validateCatalog } from './catalogs.mjs';
import { buildCatalog, releaseDir, sourceCommit } from './build.mjs';
import { syncCatalog, importDocument } from './sync.mjs';
import { publishRelease } from './publish.mjs';
import { verifyRelease } from './verify.mjs';
import { proposeGilde } from './gilde.mjs';
import { proposeChanges, workingChanges } from './github-pr.mjs';
import { json, writeJson } from './files.mjs';
import { listPackages } from './news-packages.mjs';

const help = `Knowledge catalogs (Node.js 24+)\n\nCommands:\n  list                                      List catalog definitions\n  packages [--catalog org/name]             List build packages and corpus coverage\n  validate [--catalog org/name]              Check sources and licensing\n  sync [--catalog org/name] [--apply]         Preview or apply source changes\n  import --catalog org/name --file SOURCE --target page.md --source-url URL [--apply]\n  build --catalog org/name --version 2026.10.1 [--created-at ISO] [--sign-key PATH]\n  verify --catalog org/name --version VERSION [--semantic]\n  publish --catalog org/name --version VERSION [--apply]\n  gilde --catalog org/name --version VERSION [--apply]\n  sync-pr                                   Propose already-synced local changes\n\nBuild/verify/publish/gilde accept --package latest or YYYY-qN for packaged catalogs.\nOmitting --package selects latest when build.packaging is configured.\nAll commands also accept --root PATH. sync/import/publish/gilde default to a preview.\nBuild only consumes normalized Markdown, YAML, and assets already in content/.\n`;

try {
  const { positionals, values } = parseArgs({ allowPositionals: true, options: {
    help: { type: 'boolean', short: 'h' }, root: { type: 'string' }, catalog: { type: 'string' },
    apply: { type: 'boolean', default: false }, semantic: { type: 'boolean', default: false }, 'allow-deletions': { type: 'boolean', default: false },
    version: { type: 'string' }, 'created-at': { type: 'string' }, 'sign-key': { type: 'string' },
    package: { type: 'string' },
    file: { type: 'string' }, target: { type: 'string' }, 'source-url': { type: 'string' },
    report: { type: 'string' },
  } });
  const command = positionals[0] ?? 'help';
  if (command === 'help' || values.help) { console.log(help); process.exit(0); }
  if (positionals.length !== 1) throw new Error('Expected one command; use --help');
  if (!['list', 'packages', 'validate', 'sync', 'import', 'build', 'verify', 'publish', 'gilde', 'sync-pr'].includes(command)) throw new Error(`Unknown command ${command}`);
  if (values.package && !['build', 'verify', 'publish', 'gilde'].includes(command)) throw new Error('--package only applies to build, verify, publish, and gilde; it never changes synchronization');
  const root = resolve(values.root ?? '.');
  if (['import', 'build', 'verify', 'publish', 'gilde'].includes(command) && (!values.catalog || values.catalog === 'all')) throw new Error('This command requires --catalog org/name');
  const selected = await catalogs(root, values.catalog, { disabled: ['list', 'validate'].includes(command) });
  const results = [];
  if (command === 'sync-pr') {
    const changes = await workingChanges(root, (path) => /^catalogs\/[a-z0-9-]+\/[a-z0-9-]+\/(content\/|LICENSES\/|provenance.jsonl$|sources.lock.json$)/.test(path));
    results.push(await proposeChanges({ repository: process.env.GITHUB_REPOSITORY ?? 'bendyline/knowledge', branch: 'codex/knowledge-sync', title: 'Synchronize knowledge catalog sources', body: 'Updates normalized Markdown, source revisions, attribution, and approved source notices. Source staging and catalog validation passed.\n\nManaged by the nightly knowledge sync workflow.', baseSha: sourceCommit(root), changes }));
  } else for (const catalog of selected) {
    if (command === 'list') results.push({ catalog: catalog.key, id: catalog.manifest.id, source: catalog.manifest.source.type, enabled: catalog.manifest.enabled, publish: catalog.manifest.publish.enabled });
    else if (command === 'packages') results.push({ catalog: catalog.key, packages: await listPackages(catalog) });
    else if (command === 'validate') results.push(await validateCatalog(catalog));
    else if (command === 'sync') results.push(await syncCatalog(catalog, { apply: values.apply, allowDeletions: values['allow-deletions'] }));
    else if (command === 'import') {
      if (!values.file || !values['source-url']) throw new Error('import requires --file and --source-url');
      results.push(await importDocument(catalog, { file: resolve(values.file), target: values.target, sourceUrl: values['source-url'], apply: values.apply }));
    } else if (command === 'build') {
      const built = await buildCatalog(catalog, { version: values.version, createdAt: values['created-at'], signKey: values['sign-key'], packageKey: values.package });
      results.push({ catalog: catalog.key, directory: built.directory, archive: built.archive, sha256: built.sha256, documents: built.manifest.counts.documents, ...(built.packaging ? { packaging: built.packaging } : {}), reused: built.reused });
    } else if (command === 'verify') results.push(await verifyRelease(catalog, releaseDir(catalog, values.version, values.package), { semantic: values.semantic }));
    else if (command === 'publish') results.push(await publishRelease(root, releaseDir(catalog, values.version, values.package), { apply: values.apply }));
    else if (command === 'gilde') results.push(await proposeGilde(root, releaseDir(catalog, values.version, values.package), { apply: values.apply }));
    else throw new Error(`Unknown command ${command}`);
  }
  console.log(json(results));
  if (values.report) await writeJson(resolve(root, values.report), results);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
