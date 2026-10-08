import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { stripTypeScriptTypes } from 'node:module';
import { createHash } from 'node:crypto';

await mkdir('vendor/squisq', { recursive: true });
const sources = [];
const preservation = process.argv.includes('--docfx-preservation');
const rendered = process.argv.includes('--docfx-rendered');
const renderedV2 = process.argv.includes('--docfx-rendered-v2');
if ([preservation, rendered, renderedV2].filter(Boolean).length > 1) throw new Error('Choose one versioned DocFX profile');
for (const name of preservation || rendered || renderedV2 ? ['docfxMarkdown'] : ['contentReferences', 'docfxMarkdown', 'condenseMarkdown']) {
  const source = `packages/core/src/markdown/${name}.ts`;
  const text = await readFile(resolve(process.argv[2] ?? '../squisq', source), 'utf8');
  const js = stripTypeScriptTypes(text).replaceAll(/from '\.\/(?:parse|stringify|utils|htmlParse)\.js'/g, "from '@bendyline/squisq/markdown'");
  await writeFile(`vendor/squisq/${renderedV2 ? 'docfxRenderedV2' : rendered ? 'docfxRendered' : preservation ? 'docfxPreservation' : name}.mjs`, `// Generated from @bendyline/squisq; MIT. Do not edit. See NOTICE.md.\n${js}`);
  sources.push({ source, sha256: createHash('sha256').update(text).digest('hex') });
}
await writeFile(`vendor/squisq/${renderedV2 ? 'source-rendered-v2' : rendered ? 'source-rendered' : preservation ? 'source-preservation' : 'source'}.json`, JSON.stringify({ sources, sha256: createHash('sha256').update(JSON.stringify(sources)).digest('hex'), removeAfter: 'First @bendyline/squisq release exporting the corresponding Markdown normalization API' }, null, 2) + '\n');
