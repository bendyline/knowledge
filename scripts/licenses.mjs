import { writeFile } from 'node:fs/promises';
import { datasetLicense } from '../src/dataset-license.mjs';

const args = process.argv.slice(2);
if (args.some((arg) => arg !== '--check')) throw new Error('Usage: node scripts/licenses.mjs [--check]');
const check = args.includes('--check');
const text = await datasetLicense(process.cwd(), { check });
if (!check) await writeFile('LICENSE', text);
console.log(check ? 'Catalog license summary is current.' : 'Updated LICENSE from catalog manifests.');
