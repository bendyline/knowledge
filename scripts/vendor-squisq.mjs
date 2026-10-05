import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { stripTypeScriptTypes } from 'node:module';
import { createHash } from 'node:crypto';

await mkdir('vendor/squisq', { recursive: true });
const sources = [];
for (const name of ['contentReferences', 'docfxMarkdown', 'condenseMarkdown']) {
  const source = `packages/core/src/markdown/${name}.ts`;
  const text = await readFile(resolve(process.argv[2] ?? '../squisq', source), 'utf8');
  const js = stripTypeScriptTypes(text).replaceAll(/from '\.\/(?:parse|stringify|utils|htmlParse)\.js'/g, "from '@bendyline/squisq/markdown'");
  await writeFile(`vendor/squisq/${name}.mjs`, `// Generated from @bendyline/squisq; MIT. Do not edit. See NOTICE.md.\n${js}`);
  sources.push({ source, sha256: createHash('sha256').update(text).digest('hex') });
}
await writeFile('vendor/squisq/source.json', JSON.stringify({ sources, sha256: createHash('sha256').update(JSON.stringify(sources)).digest('hex'), removeAfter: 'First @bendyline/squisq release exporting rewriteMarkdownReferences, normalizeDocfxMarkdown, and condenseMarkdownSource' }, null, 2) + '\n');
