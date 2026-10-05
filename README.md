# Bendyline knowledge

Public knowledge catalogs and a Node.js pipeline for synchronizing sources,
building `.gezk` archives, publishing to Hugging Face and GitHub Releases, and
proposing catalog definitions in Gilde.

```text
catalogs/<organization>/<catalog>/
  manifest.json          identity, source selection, licensing, build targets
  content/               normalized Markdown, YAML metadata, approved images
  NOTICE.md              human-readable attribution and modification notices
  LICENSES/              complete applicable license texts
  provenance.jsonl       generated source records for imported documents
  sources.lock.json      generated synchronization snapshot
  tests/queries.json     optional expected search results
```

**Normalize during synchronization, not compilation.** Source HTML, DOCX, and
PDF documents pass through Squisq before Markdown is written to `content/`.
The raw source bytes stay in temporary processing only. Builds consume the
checked-in Markdown snapshot and never crawl or convert source documents.
The embedding model may be downloaded the first time a catalog is built.

## Try it locally

Requires Node.js 24.15 or newer; CI uses the version in `.node-version`.
No Python, daemon, or sibling checkout is needed for the normal pipeline.
The Wikipedia date TOC currently uses a draft Gezk toolchain through an explicit
local Gezel override; see [the news build instructions](docs/wikipedia-news.md).

```sh
npm ci --ignore-scripts
npm run catalogs
npm run check
npm run build -- --catalog bendyline/knowledge-handbook --version 2026.10.1
```

The included handbook has three original Markdown articles, YAML topic metadata,
license text, and retrieval checks. A real build downloads the pinned BGE model
on first use and writes the archive and release metadata under
`.work/releases/bendyline-knowledge-handbook/2026.10.1/`.

Add, edit, and remove handbook documents in `content/`, then use a new version
for the next build. An existing build version is reused only when its inputs
match. `--created-at 2026-10-03T00:00:00Z` pins release time for reproduction.

To import a local document into a manual catalog:

```sh
npm run import -- --catalog bendyline/knowledge-handbook --file ./example.html --target imported.md --source-url https://example.org/example.html
```

This previews Markdown. Add `--apply` to write it and its provenance record.
PDF and DOCX work through the same command. Review the source's redistribution
rights and adjust the catalog's license rules before importing it. The example
handbook's MIT declaration is only for original Bendyline content.

## Synchronize sources

```sh
npm run sync
npm run sync -- --catalog organization/catalog --apply
```

Sync defaults to a preview. It fetches and normalizes a complete source snapshot,
checks licenses and output paths, then stages the diff under `.work/sync/`.
`--apply` replaces the accepted catalog snapshot, including deleted source files.
Changes are intended to land through a reviewed PR.

The Azure AI Search catalog is enabled and contains a real normalized MicrosoftDocs
snapshot. Its CC BY 4.0 documentation and MIT code licenses are automatically
recognized under `standard-open-v1`; full license texts, Microsoft notices, and
per-file provenance accompany the content. Its NOTICE lists explicit exclusions
for pages with unavailable or unconfigured external dependencies. The Wikipedia
`on-this-day-en` catalog collects a rolling year of daily news and the articles
linked directly from those daily pages. See [the news catalog](docs/wikipedia-news.md).
Its Gezk packaging selects the latest three months or a completed calendar
quarter from the shared corpus; `npm run packages -- --catalog wikipedia/on-this-day-en`
lists the six archive slots and any missing source dates. Packaging does not
re-download or duplicate source files.

For GitHub sources, `licensing.status: automatic` and `policy: standard-open-v1`
accept supported standard free licenses by comparing their actual source texts
with bundled reference texts. Routine standard licenses do not need a human
approval step. Added restrictions, unrecognized terms, and changed nonstandard
notices remain errors. See [content licensing](CONTENT-LICENSES.md).

Manual catalogs are edited directly. For synchronized catalogs, local changes
that disagree with `sources.lock.json` stop sync instead of being overwritten.
Change the source or its normalization policy, or maintain a separate manual
catalog, for deliberate local editorial changes.

## Publish and propose Gilde definitions

```sh
npm run publish -- --catalog organization/catalog --version 2026.10.1
npm run publish -- --catalog organization/catalog --version 2026.10.1 --apply
npm run gilde -- --catalog organization/catalog --version 2026.10.1
npm run gilde -- --catalog organization/catalog --version 2026.10.1 --apply
```

Publishing is disabled for the starter catalogs. Enable it in the catalog
manifest, commit that change, build from a clean checkout, and configure the
public destination repositories and credentials as described in
[releasing](docs/releasing.md). Preview commands do not upload or open PRs.

Gilde generation requires a verified publication receipt from both targets.
It uses a fresh scratch checkout, adds an immutable version definition, preserves
human curation, rebuilds the indexes, and runs Gilde's checks. `--apply` opens or
updates a PR; merging stays with Gilde's review process.

## GitHub Actions

- `validate.yml`: runs the same `npm run check` on Windows and Linux for PRs.
- `sync.yml`: nightly source sync and a managed update PR, including Azure AI Search and Wikipedia news.
- `publish.yml`: explicitly selected catalog/version, built without publishing
  credentials, then uploaded to both targets, then proposed to Gilde.
  An optional `package` input selects `latest` or a dated Wikipedia quarter.

Workflow files call Node scripts also used locally. No workflow depends on shell
scripts or Python. Publishing is manual for this first implementation; automatic
version allocation and publication after accepted sync PRs are follow-up work.

See [adding a catalog](docs/adding-a-catalog.md), [source policy](docs/source-policy.md),
and [content licensing](CONTENT-LICENSES.md).

## Azure AI Search example

```sh
npm run sync -- --catalog microsoftdocs/azure-ai-search-en --apply
npm run build -- --catalog microsoftdocs/azure-ai-search-en --version 2026.10.1
npm run verify -- --catalog microsoftdocs/azure-ai-search-en --version 2026.10.1 --semantic
```

The `verify` command checks the archive against the current checkout, performs
deep index/vector integrity validation, verifies included licenses, reopens the
catalog for title searches, and optionally runs real semantic queries against
the shipped vectors. Reports are written under `.work/verification/`. Use a new
version after changing the source or build inputs.
