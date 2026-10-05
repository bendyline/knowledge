import { z } from 'zod';
import { CatalogSchema, SourceLockSchema } from '../src/schema.mjs';
import { writeJson } from '../src/files.mjs';
await writeJson('schemas/catalog.schema.json', z.toJSONSchema(CatalogSchema, { unrepresentable: 'any' }));
await writeJson('schemas/sources-lock.schema.json', z.toJSONSchema(SourceLockSchema, { unrepresentable: 'any' }));
