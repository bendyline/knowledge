# Adding a catalog

Copy the handbook structure to `catalogs/<organization>/<catalog>/` and assign
a globally unique lowercase catalog ID. `manifest.json` is validated by the
runtime schema in `src/schema.mjs`; the generated JSON schemas support editors.

Choose content storage independently of the source adapter. The default
`contentStorage: git` keeps accepted Markdown in `catalogs/<key>/content/`.
Choose Git storage when preserving readable content through upstream repository
removal or access changes is a priority. Azure documentation explicitly uses this
mode, retaining its license evidence and provenance alongside the flat files.
Builds use the accepted snapshot; source sync remains a separate operation.

For generated GitHub, Wikipedia, or CAP catalogs, `contentStorage: workspace`
keeps only the manifest, NOTICE, static license texts, and retrieval checks in
that directory. `npm run prepare-content -- --catalog <key>` materializes the
accepted snapshot under `.work/catalogs/<key>/`, with the same full content and
license validation. Repeated preparation reuses a valid snapshot without source
downloads. Explicit `sync --catalog <key>` previews a source refresh;
`--apply` accepts it. Bulk/nightly sync skips workspace catalogs.

Fresh-checkout validation checks workspace definitions. Build requires prepared
content and checks all generated rights evidence, provenance, and hashes.
The release workflow prepares content in its build job. Pin immutable revisions
or source checksums when the source supports them; preserve accepted workspace
snapshots when later downloads cannot reproduce their bytes.

Use `source.type: manual` for directly edited Markdown or local document imports.
Keep all readable document bodies as `.md`; YAML is metadata or a table of
contents, not an automatically indexed document. Raw HTML/PDF/DOCX files are
rejected in `content/`. The import command converts them first.

For a GitHub source with standard free licenses, set `licensing.status` to
`automatic` and `licensing.policy` to `standard-open-v1`. Declare each license's
SPDX ID, source license-file path, attribution, and content rules; sync recognizes
the actual text and writes full license files and an assessment automatically.
Do not invent a manual reviewer or copy the handbook's MIT declaration onto
third-party content. Unsupported licenses can use a recorded manual assessment;
leave those catalogs disabled with status `pending` until assessed.

For GitHub sources, select explicit repository-relative paths and include/exclude
globs. Use `paths: ["."]` to select the whole repository. These globs also use repository-relative paths. The snapshot retains that
layout under `content/`. `.markdown`, `.html`, `.htm`, `.pdf`, and `.docx` document
paths become `.md`; collisions between normalized filenames are rejected.

Record source licenses in `licenseFiles`; hashes are optional under the automatic
policy and recorded in the generated assessment. Put nonstandard legal notices in
`noticeFiles` with their SHA-256. Keep required includes in the selected paths.
With `normalization.docfx: true`, the adapter expands `[!INCLUDE]` fragments,
converts Landing/FAQ YAML bodies to Markdown, rewrites TOC links, and uses Squisq
to normalize images, admonitions, zones, rows, and columns. All pivot variants
are retained with labels. Unsupported code includes/xrefs still stop validation.
`source.publishedBaseUrl` directs out-of-catalog links to the public documentation
site. Included fragments
must share the containing document's license; mixed-license composition needs
an explicit combined attribution policy before it can be enabled.

For Wikipedia, list explicit seed titles, traversal depth (0–2), article/byte
budgets, and a contact-bearing User-Agent. The adapter follows cleaned body links,
resolves redirects, deduplicates page IDs, and pins revisions. It fails instead of
publishing a truncated traversal. Current-event rolling windows and date-template
seed selection are not yet implemented.

`normalization.images: omit` removes image references while retaining alt text.
`preserve` allows approved GitHub assets and extracted DOCX/PDF assets; every output
asset must also have a matching license rule. External image URLs are not downloaded.

Add retrieval checks in `tests/queries.json` with `query` and `expectedDocumentIds`.
Explicit document IDs in Markdown frontmatter remain stable across file renames.
Without an explicit ID, the content-relative path without `.md` is the document ID.

Preview sync first (it generates automatic license evidence), inspect the staged
diff, apply it, run `npm run validate`, then run
`npm run check` and a real build. Standard matching license texts are accepted
automatically, including formatting/copyright changes. Reassess only terms outside
the supported policy or changed source-specific notices. Source updates still use
the repository's normal PR process.
