import { parentPort } from 'node:worker_threads';
import { normalizeCaselaw } from './caselaw-normalize.mjs';

parentPort.on('message', async ({ record, html, options }) => {
  try { parentPort.postMessage({ result: await normalizeCaselaw(record, Buffer.from(html), options) }); }
  catch (error) { parentPort.postMessage({ error: error.stack ?? String(error) }); }
});
