#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { resolve } from 'node:path';
import { loadCapRoots, openCapInventory, scanCapInventory } from './caselaw-inventory.mjs';
import { ingestCapCorpus } from './caselaw-corpus.mjs';
import { auditCapCorpus } from './caselaw-audit.mjs';
import { compareCapSnapshots } from './caselaw-diff.mjs';
import { buildCapCollection, loadCapCollection, planCapCollection } from './caselaw-packages.mjs';
import { planCapPublication, renderCapPublication } from './caselaw-publication.mjs';
import { publishCapCollection } from './caselaw-publish.mjs';
import { readJson, write, writeJson } from './files.mjs';

const { positionals, values } = parseArgs({ allowPositionals: true, options: {
  snapshot: { type: 'string' }, jurisdiction: { type: 'string' }, root: { type: 'string' },
  concurrency: { type: 'string', default: '4' }, report: { type: 'string' },
  collection: { type: 'string' }, version: { type: 'string' }, 'created-at': { type: 'string' },
  against: { type: 'string' },
  preview: { type: 'boolean', default: false },
  markdown: { type: 'string' },
  apply: { type: 'boolean', default: false },
} });
let store;
const started = performance.now();
try {
  if (positionals.length !== 1 || !values.snapshot) throw new Error('Usage: npm run caselaw -- inventory|ingest|audit|plan|build|publish|diff|publication-plan --snapshot ID [--jurisdiction wyo|all] [--collection PATH] [--against SNAPSHOT] [--report PATH]');
  if (values.preview && positionals[0] !== 'plan') throw new Error('--preview only applies to plan');
  if (values.markdown && positionals[0] !== 'publication-plan') throw new Error('--markdown only applies to publication-plan');
  if (values.apply && positionals[0] !== 'publish') throw new Error('--apply only applies to publish');
  store = await openCapInventory(resolve(values.root ?? '.'), values.snapshot);
  let last = 0;
  const progress = (done, total, failed) => { if (Date.now() - last > 15000 || done === total) { console.error(`[CAP ${positionals[0]}] ${done}/${total}; failures=${failed}`); last = Date.now(); } };
  const action = { inventory: scanCapInventory, ingest: ingestCapCorpus, audit: auditCapCorpus }[positionals[0]];
  let report;
  if (action) {
    if (!values.jurisdiction) throw new Error('Acquisition requires --jurisdiction');
    report = await action(store, values.jurisdiction, { concurrency: Number(values.concurrency), progress });
  } else if (positionals[0] === 'publication-plan') {
    report = planCapPublication(await loadCapRoots(store), await readJson(resolve(store.root, 'collections/caselaw/wyoming/benchmark-2026-10-06.json')));
    if (values.markdown) await write(resolve(values.markdown), renderCapPublication(report));
  } else if (positionals[0] === 'diff') {
    if (!values.against || !values.jurisdiction) throw new Error('Diff requires --against SNAPSHOT and --jurisdiction');
    const baseline = await openCapInventory(store.root, values.against);
    try { report = await compareCapSnapshots(baseline, store, values.jurisdiction); }
    finally { baseline.close(); }
  } else if (['plan', 'build', 'publish'].includes(positionals[0])) {
    if (!values.collection) throw new Error('Planning/building requires --collection PATH');
    const config = await loadCapCollection(resolve(values.collection));
    if (values.jurisdiction && values.jurisdiction !== config.jurisdiction) throw new Error('Collection jurisdiction differs from requested jurisdiction');
    if (positionals[0] === 'publish') {
      if (!values.version) throw new Error('Publishing requires --version');
      const index = await readJson(resolve(store.root, '.work/collections', config.id, values.version, 'collection.json'));
      if (index.snapshot !== store.snapshot) throw new Error('Collection release snapshot differs from requested snapshot');
      report = await publishCapCollection(store.root, config, { version: values.version, apply: values.apply });
    } else if (positionals[0] === 'plan') report = await planCapCollection(store, config, { progress, freeze: !values.preview });
    else {
      if (!values.version) throw new Error('Build requires --version');
      const plan = await readJson(resolve(store.directory, `${config.id}-plan.json`));
      report = await buildCapCollection(store, config, plan, { version: values.version, createdAt: values['created-at'], progress });
    }
  } else throw new Error('Unknown CAP command');
  if (values.report) await writeJson(resolve(values.report), report);
  const { sources, sourceIndexes, parts, collectionsPlan, federalSourceReporters, ...summary } = report;
  summary.elapsedSeconds = Math.round((performance.now() - started) / 100) / 10;
  if (Array.isArray(parts)) summary.parts = parts.map(part => {
    if (typeof part === 'string') return part;
    const { cases, caseIds, ...metadata } = part;
    return { ...metadata, cases: cases?.length ?? caseIds?.length };
  });
  else if (parts !== undefined) summary.parts = parts;
  console.log(JSON.stringify(summary, null, 2));
  if (report.metadataComplete === false || report.ingestionComplete === false || report.complete === false || report.verified === false) process.exitCode = 1;
} catch (error) { console.error(error.stack ?? error); process.exitCode = 1; }
finally { store?.close(); }
