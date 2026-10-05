// The workflow files only select an operation and supply inputs. All workflow
// logic lives in Node and is also available through src/cli.mjs locally.
import { execFileSync } from 'node:child_process';
import { appendFile } from 'node:fs/promises';
import { catalogs } from '../src/catalogs.mjs';
import { releaseDir } from '../src/build.mjs';
const operation = process.argv[2];
const catalog = process.env.CATALOG;
const version = process.env.CATALOG_VERSION;
const packageArgs = process.env.PACKAGE_KEY ? ['--package', process.env.PACKAGE_KEY] : [];
const run = (...args) => execFileSync(process.execPath, ['src/cli.mjs', ...args], { stdio: 'inherit' });
if (operation === 'sync') {
  run('sync', '--apply', '--report', '.work/sync-report.json');
  run('validate');
  run('sync-pr');
} else if (operation === 'build') {
  run('build', '--catalog', catalog, '--version', version, ...packageArgs);
  const [selected] = await catalogs(process.cwd(), catalog);
  if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `release-dir=${releaseDir(selected, version, process.env.PACKAGE_KEY || undefined)}\n`);
} else if (operation === 'publish') run('publish', '--catalog', catalog, '--version', version, ...packageArgs, '--apply');
else if (operation === 'gilde') run('gilde', '--catalog', catalog, '--version', version, ...packageArgs, '--apply');
else throw new Error(`Unknown workflow operation ${operation}`);
