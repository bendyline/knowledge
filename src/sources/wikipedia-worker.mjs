import { parentPort, workerData } from 'node:worker_threads';
import { normalizeWikipediaPage } from './wikipedia-normalize.mjs';
import { inside, readJson, sha256, write } from '../files.mjs';

parentPort.on('message', async (page) => {
  try {
    const { html } = await readJson(inside(workerData.stage, `${page.id}.json`));
    const result = await normalizeWikipediaPage(html, page, workerData.targets);
    const sourcePath = inside(workerData.stage, `content/${page.path}`);
    await write(sourcePath, result.markdown);
    parentPort.postMessage({ sourcePath, sha256: sha256(result.markdown), transformation: result.transformation });
  } catch (error) { parentPort.postMessage({ error: error.stack ?? String(error) }); }
});
