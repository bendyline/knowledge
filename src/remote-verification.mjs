import { createHash } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';

// Hash every byte, buffering one range per concurrent request. A dropped connection retries that
// range before it contributes to the digest; completed ranges are retained.
export async function verifyRemote(url, sha256, size, headers = {}, {
  rangeBytes = 8 * 1024 ** 2, concurrency = 4, attempts = 4, fetchImpl = fetch, retryDelayMs = 1000, progress,
} = {}) {
  if (!Number.isSafeInteger(size) || size < 0 || !Number.isSafeInteger(rangeBytes) || rangeBytes < 1) throw new Error('Invalid remote verification byte budget');
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 8) throw new Error('Remote verification concurrency must be 1–8');
  if (!Number.isInteger(attempts) || attempts < 1 || attempts > 8) throw new Error('Remote verification attempts must be 1–8');
  const retry = async run => {
    for (let attempt = 0; ; attempt++) {
      try { return await run(); }
      catch (error) {
        const transient = error.retryable || error instanceof TypeError || ['TimeoutError', 'AbortError'].includes(error.name);
        if (!transient || attempt + 1 >= attempts) throw error;
        await delay(retryDelayMs * 2 ** attempt);
      }
    }
  };
  const response = async extra => {
    const r = await fetchImpl(url, { headers: { ...headers, 'Accept-Encoding': 'identity', ...extra }, signal: AbortSignal.timeout(30 * 60 * 1000) });
    if (!r.ok) {
      await r.body?.cancel();
      const e = new Error(`Download verification failed: HTTP ${r.status}`);
      e.retryable = [408, 425, 429].includes(r.status) || r.status >= 500;
      throw e;
    }
    return r;
  };
  const verifyWhole = async r => {
    if (r.status !== 200) { await r.body?.cancel(); throw new Error('Expected a complete remote file'); }
    const hash = createHash('sha256'); let bytes = 0;
    for await (const chunk of r.body) {
      bytes += chunk.length;
      if (bytes > size) throw new Error('Remote file is larger than expected');
      hash.update(chunk);
    }
    if (bytes !== size || hash.digest('hex') !== sha256) throw new Error('Remote file digest/size mismatch');
    progress?.(bytes, size);
  };
  if (size <= rangeBytes) return retry(async () => verifyWhole(await response({})));
  const hash = createHash('sha256');
  const readRange = async start => {
    const end = Math.min(size - 1, start + rangeBytes - 1);
    const result = await retry(async () => {
      const r = await response({ Range: `bytes=${start}-${end}` });
      // Some servers ignore Range; require and hash the complete file instead.
      if (start === 0 && r.status === 200) { await verifyWhole(r); return null; }
      if (r.status !== 206 || r.headers.get('content-range') !== `bytes ${start}-${end}/${size}`) {
        await r.body?.cancel(); throw new Error('Remote byte range does not match the requested file segment');
      }
      const chunks = []; let bytes = 0;
      for await (const chunk of r.body) {
        bytes += chunk.length;
        if (bytes > end - start + 1) throw new Error('Remote byte range is larger than expected');
        chunks.push(chunk);
      }
      if (bytes !== end - start + 1) throw new Error('Remote byte range is incomplete');
      return Buffer.concat(chunks);
    });
    return result;
  };
  // Establish range support before starting concurrent requests. Hash batches
  // in byte order even when individual downloads finish out of order.
  const first = await readRange(0);
  if (first === null) return;
  hash.update(first); progress?.(first.length, size);
  for (let start = rangeBytes; start < size; start += rangeBytes * concurrency) {
    const offsets = Array.from({ length: concurrency }, (_, i) => start + i * rangeBytes).filter(n => n < size);
    const results = await Promise.allSettled(offsets.map(readRange));
    for (const [i, result] of results.entries()) {
      if (result.status === 'rejected') throw result.reason;
      hash.update(result.value);
      progress?.(offsets[i] + result.value.length, size);
    }
  }
  if (hash.digest('hex') !== sha256) throw new Error('Remote file digest/size mismatch');
}
