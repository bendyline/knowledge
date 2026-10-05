import { mkdir, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { digest, exists, inside, readJson } from './files.mjs';

export async function cachedEmbedder(embedder, root, { testOnly = false, runtime = 'cpu' } = {}) {
  const profileDigest = digest({ profile: embedder.profile, node: process.version, testOnly, ...(runtime === 'cpu' ? {} : { runtime }) });
  const directory = resolve(root, '.work/embeddings');
  await mkdir(directory, { recursive: true });
  const legacyDirectory = inside(directory, profileDigest);
  const legacy = new Set(await exists(legacyDirectory) ? await readdir(legacyDirectory) : []);
  const db = new DatabaseSync(inside(directory, `${profileDigest}.sqlite`));
  db.exec('PRAGMA journal_mode=WAL; PRAGMA busy_timeout=30000; CREATE TABLE IF NOT EXISTS vectors (key TEXT PRIMARY KEY, vector BLOB NOT NULL) WITHOUT ROWID');
  const get = db.prepare('SELECT vector FROM vectors WHERE key = ?');
  const put = db.prepare('INSERT OR REPLACE INTO vectors (key, vector) VALUES (?, ?)');
  const validate = (value) => {
    if (!Array.isArray(value) || value.length !== embedder.profile.dimensions || value.some(v => !Number.isFinite(v))) throw new Error('Invalid embedding cache entry');
    return value;
  };
  const encode = (value) => {
    validate(value);
    // Float64 preserves the exact JavaScript numbers, including custom test
    // embedders. The byte order is explicit for portable cache files.
    const bytes = Buffer.allocUnsafe(value.length * 8);
    value.forEach((v, i) => bytes.writeDoubleLE(v, i * 8));
    return bytes;
  };
  const decode = (blob) => {
    if (blob.length !== embedder.profile.dimensions * 8) throw new Error('Invalid embedding cache entry');
    const bytes = Buffer.from(blob.buffer, blob.byteOffset, blob.byteLength);
    return validate(Array.from({ length: embedder.profile.dimensions }, (_, i) => bytes.readDoubleLE(i * 8)));
  };
  const cache = async (texts) => {
    const output = new Array(texts.length); const missing = new Map(); const writes = new Map();
    for (let i = 0; i < texts.length; i++) {
      const key = digest({ profileDigest, text: texts[i] });
      const row = get.get(key);
      if (row) output[i] = decode(row.vector);
      else if (legacy.has(`${key}.json`)) {
        output[i] = validate(await readJson(inside(legacyDirectory, `${key}.json`)));
        writes.set(key, output[i]);
      } else {
        if (!missing.has(key)) missing.set(key, { text: texts[i], indexes: [] });
        missing.get(key).indexes.push(i);
      }
    }
    if (missing.size) {
      const entries = [...missing];
      const values = await embedder.embed(entries.map(([, entry]) => entry.text));
      if (values.length !== entries.length) throw new Error('Embedding batch returned the wrong number of vectors');
      entries.forEach(([key, entry], index) => {
        const value = validate(values[index]);
        for (const i of entry.indexes) output[i] = value;
        writes.set(key, value);
      });
    }
    if (writes.size) {
      db.exec('BEGIN IMMEDIATE');
      try { for (const [key, value] of writes) put.run(key, encode(value)); db.exec('COMMIT'); }
      catch (error) { db.exec('ROLLBACK'); throw error; }
    }
    return output;
  };
  cache.dispose = () => db.close();
  return cache;
}
