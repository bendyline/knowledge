export const SEMANTIC_CHUNK_LIMIT = 20;

// The catalog search API returns finalK results per shard. Apply the archive's
// global acceptance limit before deduplicating chunks into document IDs.
export function evaluateSemanticProbe({ query, expectedDocumentIds }, hits) {
  const selected = hits.slice(0, SEMANTIC_CHUNK_LIMIT);
  const ids = [...new Set(selected.map(hit => hit.documentId))];
  return {
    query, expectedDocumentIds, hits: ids, chunkLimit: SEMANTIC_CHUNK_LIMIT,
    expectedChunkRanks: expectedDocumentIds.map(id => {
      const index = selected.findIndex(hit => hit.documentId === id);
      return { id, rank: index < 0 ? null : index + 1 };
    }),
    passed: expectedDocumentIds.every(id => ids.includes(id)),
  };
}
