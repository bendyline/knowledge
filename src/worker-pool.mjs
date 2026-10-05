import { Worker } from 'node:worker_threads';

// CPU-heavy conversions run in separate V8 isolates. Each worker receives one
// job at a time, and any failure stops dispatch before the caller can apply data.
export async function mapWorkers(items, url, { workerData, concurrency = 4, onResult } = {}) {
  const output = new Array(items.length); const workers = [];
  let next = 0; let failure;
  const run = (worker, value) => new Promise((resolve, reject) => {
    const cleanup = () => { worker.off('message', done); worker.off('error', error); worker.off('exit', exit); };
    const done = (result) => { cleanup(); result.error ? reject(new Error(result.error)) : resolve(result); };
    const error = (err) => { cleanup(); reject(err); };
    const exit = (code) => { cleanup(); reject(new Error(`Conversion worker exited unexpectedly (${code})`)); };
    worker.once('message', done); worker.once('error', error); worker.once('exit', exit);
    worker.postMessage(value);
  });
  try {
    await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      const worker = new Worker(url, { workerData }); workers.push(worker);
      while (!failure && next < items.length) {
        const index = next++;
        try { output[index] = await run(worker, items[index]); onResult?.(output[index], index); }
        catch (error) { failure ??= error; }
      }
    }));
    if (failure) throw failure;
    return output;
  } finally { await Promise.all(workers.map(worker => worker.terminate())); }
}
