import { z } from 'zod';
import { portablePath } from './files.mjs';

const id = z.string().regex(/^[a-z0-9][a-z0-9-]{0,62}[a-z0-9]$|^[a-z0-9]$/);
const path = z.string().min(1).refine((v) => { try { portablePath(v); return true; } catch { return false; } }, 'Must be a portable relative path');
const sha = z.string().regex(/^[a-f0-9]{64}$/);
const repository = z.string().regex(/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/);
const rule = z.object({ include: z.array(z.string().min(1)).min(1), license: id }).strict();
const manual = z.object({ type: z.literal('manual') }).strict();
const caselawCollection = z.object({ type: z.literal('caselaw-collection'), snapshot: id, selectionDigest: sha, corpusDigest: sha, part: id }).strict();
const caselaw = z.object({
  type: z.literal('caselaw'),
  volumes: z.array(z.object({ reporter: id, volume: id, sha256: sha, cases: z.number().int().positive() }).strict()).min(1).max(100),
  jurisdictions: z.array(z.number().int().positive()).default([]),
  courts: z.array(z.number().int().positive()).default([]),
  maxExpandedBytes: z.number().int().positive().max(1000000000).default(100000000),
}).strict().superRefine((s, ctx) => {
  if (new Set(s.volumes.map(v => `${v.reporter}/${v.volume}`)).size !== s.volumes.length) ctx.addIssue({ code: 'custom', message: 'Duplicate CAP source volume' });
});
const gutenberg = z.object({
  type: z.literal('gutenberg'),
  // Base URL of a mirror's generated collection (PG's cache/epub). The website is
  // for human readers only; automated access uses a mirror.
  mirror: z.string().url().regex(/^https:\/\/[^/]+(?:\/[^/]+)*$/).refine((u) => !/^(?:www\.)?gutenberg\.org$/i.test(new URL(u).hostname), 'Use a Project Gutenberg mirror, not the website'),
  bookshelf: z.string().min(1), language: z.string().regex(/^[a-z]{2,3}$/),
  exclude: z.array(z.object({ ebook: z.number().int().positive(), reason: z.string().min(1) }).strict()).default([]),
  maxBooks: z.number().int().min(1).max(20000).default(500),
  maxFailureFraction: z.number().min(0).max(0.2).default(0.02),
  guides: z.boolean().default(false),
  omitIndexes: z.boolean().default(false),
  userAgent: z.string().min(20),
}).strict();
const github = z.object({
  type: z.literal('github'), repository, ref: z.string().min(1).default('main'),
  transport: z.enum(['files', 'archive']).optional(),
  downloadConcurrency: z.number().int().min(1).max(16).optional(),
  codeFiles: z.array(z.string().min(1)).optional(),
  docfxRoot: z.union([z.literal('.'), path]).optional(),
  maxArchiveBytes: z.number().int().positive().max(10000000000).optional(),
  paths: z.array(z.union([z.literal('.'), path])).min(1), include: z.array(z.string()).min(1).default(['**/*.md', '**/*.yml', '**/*.yaml']),
  exclude: z.array(z.string()).default([]),
  licenseFiles: z.array(z.object({ path, sha256: sha.optional(), license: id }).strict()).min(1),
  noticeFiles: z.array(z.object({ path, sha256: sha }).strict()).default([]),
  publishedBaseUrl: z.string().url().optional(),
}).strict();
const wikipedia = z.object({
  type: z.literal('wikipedia'), language: z.string().regex(/^[a-z][a-z-]{0,11}$/),
  seeds: z.array(z.string().min(1)).default([]), depth: z.number().int().min(0).max(2).default(2),
  currentEvents: z.object({ days: z.number().int().min(1).max(3660), endDate: z.union([z.literal('today'), z.iso.date()]).default('today') }).strict().optional(),
  maxPages: z.number().int().min(1).max(50000).default(250),
  userAgent: z.string().min(20),
}).strict();
export const CatalogSchema = z.object({
  $schema: z.string().optional(), schemaVersion: z.literal(1), id,
  name: z.string().min(1), description: z.string().min(1), language: z.string().min(2), enabled: z.boolean().default(true),
  contentStorage: z.enum(['git', 'workspace']).optional(),
  publisher: z.object({ id, name: z.string().min(1), url: z.string().url() }).strict(),
  source: z.discriminatedUnion('type', [manual, github, wikipedia, caselaw, caselawCollection, gutenberg]),
  licensing: z.object({
    status: z.enum(['pending', 'approved', 'automatic']), policy: z.literal('standard-open-v1').optional(), reviewedBy: z.string().min(1).optional(), reviewedAt: z.string().datetime().optional(),
    notice: path,
    licenses: z.array(z.object({ id, name: z.string().min(1), spdx: z.string().min(1), url: z.string().url(), text: path, attribution: z.string().min(1) }).strict()).min(1),
    rules: z.array(rule).min(1),
  }).strict(),
  normalization: z.object({ images: z.enum(['omit', 'preserve']).default('omit'), docfx: z.boolean().default(false), docfxReferences: z.literal('preserve').optional(), docfxProfile: z.enum(['rendered-v1', 'rendered-v2']).optional(), docfxMetadataMaxBytes: z.number().int().min(1024).max(16384).optional() }).strict().default({ images: 'omit', docfx: false }),
  sync: z.object({ maxFileBytes: z.number().int().positive().max(100000000).default(20000000), maxTotalBytes: z.number().int().positive().default(200000000), maxDeleteFraction: z.number().min(0).max(1).default(0.2) }).strict().default({ maxFileBytes: 20000000, maxTotalBytes: 200000000, maxDeleteFraction: 0.2 }),
  build: z.object({
    embeddingProfile: z.enum(['multilingual-e5-small@2', 'bge-small-en-v1.5@1']).default('multilingual-e5-small@2'),
    toc: z.object({ format: z.enum(['folders', 'docfx', 'gitbook', 'mkdocs', 'jupyter-book', 'hugo', 'wikipedia-days']), path: path.optional() }).strict().default({ format: 'folders' }),
    ignore: z.array(path).default([]),
    packaging: z.object({ type: z.literal('wikipedia-news'), latestMonths: z.literal(3), archiveQuarters: z.number().int().min(1).max(12).default(6) }).strict().optional(),
  }).strict(),
  publish: z.object({
    enabled: z.boolean().default(false), huggingFace: repository, github: repository,
    gilde: z.object({ repository, category: z.enum(['encyclopedia', 'reference', 'science', 'history', 'technology', 'culture', 'manuals', 'other']), tags: z.array(z.string()).default([]), minGezelVersion: z.string().optional() }).strict(),
  }).strict(),
}).strict().superRefine((m, ctx) => {
  if (m.normalization.docfxReferences && (m.source.type !== 'github' || !m.normalization.docfx)) ctx.addIssue({ code: 'custom', message: 'DocFX preservation requires a GitHub source and docfx normalization' });
  if (m.normalization.docfxMetadataMaxBytes && !m.normalization.docfxReferences) ctx.addIssue({ code: 'custom', message: 'DocFX metadata preservation requires the preservation profile' });
  if (m.normalization.docfxProfile && !m.normalization.docfxReferences) ctx.addIssue({ code: 'custom', message: 'Rendered DocFX includes require the preservation profile' });
  if (m.contentStorage === 'workspace' && !['github', 'wikipedia', 'caselaw', 'gutenberg'].includes(m.source.type)) ctx.addIssue({ code: 'custom', message: 'Workspace content requires a supported source adapter' });
  if (m.build.packaging && (m.build.toc.format !== 'wikipedia-days' || m.source.type !== 'wikipedia' || m.source.depth !== 1 || m.source.seeds.length)) ctx.addIssue({ code: 'custom', message: 'Wikipedia news packages require a depth-one current-events corpus with a daily TOC and no extra seeds' });
  if (m.build.toc.format === 'wikipedia-days' && (m.source.type !== 'wikipedia' || !m.source.currentEvents || m.build.toc.path)) ctx.addIssue({ code: 'custom', message: 'wikipedia-days TOC requires a Wikipedia currentEvents source and derives its paths from the accepted selection' });
  const ids = m.licensing.licenses.map((l) => l.id);
  if (new Set(ids).size !== ids.length) ctx.addIssue({ code: 'custom', message: 'License IDs must be unique' });
  for (const r of [...m.licensing.rules, ...(m.source.licenseFiles ?? [])]) {
    if (!ids.includes(r.license)) ctx.addIssue({ code: 'custom', message: `Unknown license ${r.license}` });
  }
  if (m.licensing.status === 'approved' && (!m.licensing.reviewedBy || !m.licensing.reviewedAt)) ctx.addIssue({ code: 'custom', message: 'Approved licensing requires reviewedBy and reviewedAt' });
  if (m.licensing.status === 'automatic' && (m.licensing.policy !== 'standard-open-v1' || !['github', 'wikipedia', 'caselaw', 'caselaw-collection', 'gutenberg'].includes(m.source.type))) ctx.addIssue({ code: 'custom', message: 'Automatic licensing requires the standard-open-v1 source-evidence policy' });
  if (m.source.type === 'gutenberg' && (m.licensing.status !== 'automatic' || m.normalization.images !== 'omit')) ctx.addIssue({ code: 'custom', message: 'Gutenberg requires automatic public-domain evidence and images=omit' });
  if (m.source.type.startsWith('caselaw') && (m.licensing.status !== 'automatic' || m.normalization.images !== 'omit')) ctx.addIssue({ code: 'custom', message: 'CAP requires automatic CC0 evidence and images=omit' });
  if (m.source.type === 'wikipedia' && !m.source.seeds.length && !m.source.currentEvents) ctx.addIssue({ code: 'custom', message: 'Wikipedia requires seeds or a currentEvents window' });
  if (m.source.type === 'wikipedia' && m.source.currentEvents && m.source.language !== 'en') ctx.addIssue({ code: 'custom', message: 'Current-events date titles currently support English Wikipedia' });
  if (m.source.type === 'github' && !m.licensing.policy && m.source.licenseFiles.some((f) => !f.sha256)) ctx.addIssue({ code: 'custom', message: 'Manual license approval requires pinned license hashes' });
  if (m.publish.enabled && m.licensing.status === 'pending') ctx.addIssue({ code: 'custom', message: 'Publication requires approved or automatic licensing' });
});

export const ProvenanceSchema = z.object({
  path, sha256: sha, sourceSha256: sha, sourceUrl: z.string().url(), sourceRevision: z.string().min(1),
  license: id, attribution: z.string().min(1), transformation: z.string(),
  sourceUpdatedAt: z.string().optional(), historyUrl: z.string().url().optional(), discoveredFrom: z.string().optional(), depth: z.number().int().optional(),
  referredBy: z.array(z.string()).optional(), newsDate: z.iso.date().optional(), wikipediaPageId: z.number().int().positive().optional(), gutenbergEbook: z.number().int().positive().optional(),
  caselaw: z.object({ caseId: z.number().int().positive(), archiveUrl: z.string().url(), archiveSha256: sha, jsonSha256: sha, htmlSha256: sha }).strict().optional(),
}).strict();
export const SourceLockSchema = z.object({
  schemaVersion: z.literal(1), sourceType: z.enum(['github', 'wikipedia', 'caselaw', 'caselaw-collection', 'gutenberg']),
  sourceConfigDigest: sha, contentDigest: sha, legalDigest: sha.optional(), revision: z.string().min(1), files: z.array(ProvenanceSchema),
}).strict();
