import test from 'node:test';
import assert from 'node:assert/strict';
import { request } from '../src/http.mjs';
import { mapConcurrent } from '../src/source-cache.mjs';

test('transient connection failures retry without losing the response', async () => {
  let calls = 0;
  const result = await request('https://example.org/article', { fetchImpl: async () => {
    if (++calls === 1) throw new TypeError('fetch failed');
    return new Response('article');
  } });
  assert.equal(calls, 2);
  assert.equal(result.bytes.toString(), 'article');
});

test('429 retry-after permits retry and response size is still bounded', async () => {
  let calls = 0;
  const result = await request('https://example.org/article', { fetchImpl: async () => ++calls === 1 ? new Response('limited', { status: 429, headers: { 'Retry-After': '0' } }) : new Response('ok') });
  assert.equal(result.bytes.toString(), 'ok');
  await assert.rejects(request('https://example.org/article', { maxBytes: 2, fetchImpl: async () => new Response('large') }), /exceeds/);
});

test('an interrupted response body is retried without retaining partial bytes', async () => {
  let calls = 0;
  const result = await request('https://example.org/article', { fetchImpl: async () => {
    if (++calls > 1) return new Response('complete article');
    let reads = 0;
    return new Response(new ReadableStream({ pull(controller) {
      if (reads++ === 0) controller.enqueue(new TextEncoder().encode('partial'));
      else controller.error(new TypeError('terminated'));
    } }));
  } });
  assert.equal(calls, 2);
  assert.equal(result.bytes.toString(), 'complete article');
});

test('a failed download stops the worker queue and waits for in-flight work', async () => {
  const calls = []; let settled = false;
  await assert.rejects(mapConcurrent([0, 1, 2, 3, 4], 2, async (value) => {
    calls.push(value);
    if (value === 0) throw new Error('unavailable');
    await new Promise((done) => setTimeout(done, 10)); settled = true;
  }), /unavailable/);
  assert.deepEqual(calls, [0, 1]);
  assert.equal(settled, true);
});
