import { parseArgs } from 'node:util';
import { resolve } from 'node:path';
import { readJson, writeJson, inside } from '../src/files.mjs';
import { loadCapCollection } from '../src/caselaw-packages.mjs';
import { publishCapCollection } from '../src/caselaw-publish.mjs';
import { publishRelease } from '../src/publish.mjs';
import { proposeGilde } from '../src/gilde.mjs';
import { createCloudMirrorVerifier } from '../src/cloud-mirror-proof.mjs';
const { positionals, values } = parseArgs({ allowPositionals: true, options: { collection: { type: 'string' }, version: { type: 'string' }, proofs: { type: 'string' }, report: { type: 'string' }, apply: { type: 'boolean', default: false } } });
if (positionals.length !== 1 || !['publish', 'gilde'].includes(positionals[0]) || !values.collection || !values.version || !values.proofs) throw Error('Usage: node scripts/cloud-caselaw.mjs publish|gilde --collection PATH --version VERSION --proofs PATH [--report PATH] [--apply]');
const root = process.cwd(), config = await loadCapCollection(resolve(values.collection));
const index = await readJson(inside(resolve('.work/collections'), `${config.id}/${values.version}/collection.json`));
if (index.collection !== config.id || index.version !== values.version || !index.complete || !index.coverageComplete || !index.parts.length) throw Error('Cloud publication requires a complete verified collection');
const proofs = await readJson(resolve(values.proofs));
if (!Array.isArray(proofs) || proofs.length !== index.parts.length || new Set(proofs.map(p => p.catalogId)).size !== proofs.length) throw Error('Require one cloud mirror proof per collection part');
const verified = new Map(), evidence = [];
for (const part of index.parts) {
  const proof = proofs.find(p => p.catalogId === part.catalogId);
  if (!proof) throw Error(`Missing cloud mirror proof for ${part.catalogId}`);
  const directory = inside(resolve('.work/releases'), `${part.catalogId}/${values.version}`);
  const check = await createCloudMirrorVerifier(directory, { ...proof, receiptPath: inside(root, proof.receiptPath) });
  verified.set(directory, check); evidence.push(check.evidence);
}
let result;
if (positionals[0] === 'publish') result = await publishCapCollection(root, config, { version: values.version, apply: values.apply, services: {
  publishRelease: (root, directory, options) => {
    const check = verified.get(resolve(directory));
    if (!check) throw Error('Unverified collection part');
    return publishRelease(root, directory, { ...options, services: { verifyRemote: check.verifyRemote } });
  },
} });
else {
  result = [];
  for (const [directory, check] of verified) result.push(await proposeGilde(root, directory, { apply: values.apply, verifyPublishedArchive: check.verifyRemote }));
}
const report = { evidence, result };
if (values.report) await writeJson(resolve(values.report), report);
console.log(JSON.stringify(report, null, 2));
