import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { z } from 'zod';
import { parse } from 'yaml';
import { CatalogSchema, SourceLockSchema } from '../src/schema.mjs';
import { walk, json } from '../src/files.mjs';
for (const base of ['src', 'scripts', 'test']) for (const file of await walk(base)) if (file.endsWith('.mjs')) execFileSync(process.execPath, ['--check', `${base}/${file}`], { stdio: 'inherit' });
for (const [name, schema] of [['catalog', CatalogSchema], ['sources-lock', SourceLockSchema]]) {
  if (await readFile(`schemas/${name}.schema.json`, 'utf8') !== json(z.toJSONSchema(schema, { unrepresentable: 'any' }))) throw new Error('Generated schemas are stale; run npm run schema');
}
for (const file of await walk('.github/workflows')) parse(await readFile(`.github/workflows/${file}`, 'utf8'), { uniqueKeys: true });
execFileSync(process.execPath, ['src/cli.mjs', 'validate'], { stdio: 'inherit' });
execFileSync(process.execPath, ['--test', '--test-concurrency=1'], { stdio: 'inherit' });
