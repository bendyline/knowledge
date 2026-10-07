import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateSemanticProbe } from '../src/semantic-verification.mjs';

test('semantic acceptance caps globally ranked chunks before document deduplication', () => {
  const probe = { query: 'Specific legal question', expectedDocumentIds: ['expected'] };
  const hits = [...Array.from({ length: 20 }, () => ({ documentId: 'frequent' })), { documentId: 'expected' },
    ...Array.from({ length: 19 }, (_, i) => ({ documentId: `other-${i}` }))];
  const result = evaluateSemanticProbe(probe, hits);
  assert.equal(result.passed, false);
  assert.deepEqual(result.hits, ['frequent']);
  assert.deepEqual(result.expectedChunkRanks, [{ id: 'expected', rank: null }]);
  assert.equal(result.chunkLimit, 20);
  hits.splice(19, 0, { documentId: 'expected' });
  const boundary = evaluateSemanticProbe(probe, hits);
  assert.equal(boundary.passed, true);
  assert.deepEqual(boundary.expectedChunkRanks, [{ id: 'expected', rank: 20 }]);
  assert.equal(evaluateSemanticProbe({ ...probe, expectedDocumentIds: ['expected', 'other-0'] }, hits).passed, false);
});
