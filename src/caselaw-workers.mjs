import { Worker } from 'node:worker_threads';

export function createCapNormalizer({ workers = 4, timeoutMs = 30000, url = new URL('./sources/caselaw-worker.mjs', import.meta.url) } = {}) {
  if (!Number.isInteger(workers) || workers < 1 || workers > 8 || !Number.isFinite(timeoutMs) || timeoutMs < 1) throw new Error('Invalid CAP worker limits');
  const queue = []; const slots = Array.from({ length: workers }, () => ({ worker: null, busy: false }));
  const terminating = new Set();
  const terminate = worker => {
    const pending = worker.terminate(); terminating.add(pending);
    void pending.finally(() => terminating.delete(pending));
  };
  let closed = false;
  function dispatch(slot) {
    if (closed || slot.busy || !queue.length) return;
    const job = queue.shift();
    try { slot.worker ??= new Worker(url, { execArgv: [], resourceLimits: { maxOldGenerationSizeMb: 512 } }); }
    catch (error) { job.reject(error); queueMicrotask(() => dispatch(slot)); return; }
    const worker = slot.worker; slot.busy = true;
    let settled = false;
    const finish = (error, result, replace = false) => {
      if (settled) return; settled = true; clearTimeout(timer);
      worker.off('message', message); worker.off('error', failure); worker.off('exit', exited);
      slot.cancel = null; slot.busy = false;
      if (replace) { slot.worker = null; terminate(worker); }
      error ? job.reject(error) : job.resolve(result);
      dispatch(slot);
    };
    const message = m => finish(m.error ? new Error(m.error) : null, m.result);
    const failure = error => finish(error, null, true);
    const exited = code => finish(new Error(`CAP normalizer worker exited (${code})`), null, true);
    const timer = setTimeout(() => finish(new Error(`CAP ${job.value.record.id}: normalization exceeded ${timeoutMs}ms`), null, true), timeoutMs);
    slot.cancel = () => finish(new Error('CAP normalizer closed'), null, true);
    worker.once('message', message); worker.once('error', failure); worker.once('exit', exited);
    try { worker.postMessage(job.value); } catch (error) { failure(error); }
  }
  return {
    run(record, html, options) {
      if (closed) return Promise.reject(new Error('CAP normalizer closed'));
      return new Promise((resolve, reject) => { queue.push({ value: { record, html, options }, resolve, reject }); slots.forEach(dispatch); });
    },
    async close() {
      closed = true;
      for (const job of queue.splice(0)) job.reject(new Error('CAP normalizer closed'));
      for (const slot of slots) slot.cancel?.();
      for (const slot of slots) if (slot.worker) { terminate(slot.worker); slot.worker = null; }
      await Promise.all(terminating);
    },
  };
}
