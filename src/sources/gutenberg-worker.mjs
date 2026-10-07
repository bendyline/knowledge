import { readFile } from 'node:fs/promises';
import { parentPort, workerData } from 'node:worker_threads';
import { normalizeBook } from './gutenberg-normalize.mjs';
import { inside, sha256, write } from '../files.mjs';

// Book-level problems are reported as `failure` so the parent can apply the
// catalog's explicit failure budget; `error` stops the whole synchronization.
parentPort.on('message', async (book) => {
  let html;
  try { html = new TextDecoder('utf-8', { fatal: true }).decode(await readFile(book.cachePath)); }
  catch (error) { return parentPort.postMessage({ error: error.stack ?? String(error) }); }
  try {
    const result = await normalizeBook(html, { ...book, omitIndexes: workerData.omitIndexes });
    if (result.excluded) return parentPort.postMessage({ meta: result.meta, excluded: result.excluded });
    const documents = [];
    for (const document of result.documents) {
      const path = `books/pg${book.ebook}/${document.path}`;
      const sourcePath = inside(workerData.stage, `content/${path}`);
      await write(sourcePath, document.markdown);
      documents.push({ path, sourcePath, sha256: sha256(document.markdown), title: document.title });
    }
    parentPort.postMessage({ meta: result.meta, book: result.book, documents, transformation: result.transformation });
  } catch (error) { parentPort.postMessage({ meta: undefined, failure: error instanceof Error ? error.message : String(error) }); }
});
