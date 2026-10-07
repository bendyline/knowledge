# Caselaw Access Project ingestion

State collections use a shared, content-addressed corpus and independently
searchable `.gezk` parts. A state is a logical collection; source reporter books
are acquisition units, and archive boundaries follow measured size. The
Wyoming configuration is `collections/caselaw/wyoming/collection.json`.

The [national publication list](caselaw-publication-plan.md) covers all 50 states,
the complete federal collection, D.C., territories, and tribal jurisdictions:
6,920,596 advertised CAP records. Its companion
`collections/caselaw/publication-plan.json` enumerates every provisional package
ID and configuration at a 1 GiB target. Package counts remain capacity estimates
pending measured ingestion; the
[national metadata sweep](#national-metadata-sweep) is complete and records two
additional cases absent from the root jurisdiction totals.

```sh
npm run caselaw -- publication-plan --snapshot 2026-10-06 --report collections/caselaw/publication-plan.json --markdown docs/caselaw-publication-plan.md
```

Harvard describes the current service as an archival port following its
[2024 transition](https://lil.law.harvard.edu/blog/2024/03/26/transitions-for-the-caselaw-access-project/).
Treat it as a pinned historical dataset with deliberate refreshes. Static hosting
does not guarantee that bytes can never be corrected or withdrawn.

```text
CAP bulk metadata → frozen inventory → selected case bodies → source audit
                                                          ↓
collection configuration → measured, frozen package plan → .gezk parts
                                                          ↓
                                              verified collection index
```

## Published pilots

The next measured pilots are Utah (two parts) and U.S. Reports volumes 300–385
(one part). The latter combines 86 books and 50,292 records, estimated at
1,070,017,862 bytes, instead of repeating the original three-book package size.
Utah's 22,904 records are estimated at 1,069,408,251 and 769,988,778 bytes.
These are planning measurements; actual compiled sizes and publication receipts
are recorded only after build and verification. The larger U.S. selection
contains all records in the original 347–349 pilot, so readers should choose
one of those overlapping packages. Four anomalously early CAP decision dates
are preserved and disclosed in the new collection's scope.

| Collection | Version | Case records | Archive size | Release |
| --- | --- | ---: | ---: | --- |
| U.S. Reports 347–349 | 2026.10.5 | 2,142 | 28.73 MiB | [Archive and verification](https://github.com/bendyline/knowledge/releases/tag/caselaw-us-347-349-v2026.10.5) |
| Alaska CAP jurisdiction | 2026.10.1 | 10,749 | 993.19 MiB | [Archive and verification](https://github.com/bendyline/knowledge/releases/tag/caselaw-alaska-part-0001-v2026.10.1) |
| Wyoming CAP jurisdiction | 2026.10.3 | 10,931 | 1,019.68 MiB | [Archive and verification](https://github.com/bendyline/knowledge/releases/tag/caselaw-wyoming-part-0001-v2026.10.3) |
| Nevada CAP jurisdiction | 2026.10.1 | 13,707 | 730.85 MiB | [Archive and verification](https://github.com/bendyline/knowledge/releases/tag/caselaw-nevada-part-0001-v2026.10.1) |

All four archives are published on Hugging Face and GitHub with complete download
SHA-256 verification. The collection indexes for
[Alaska](https://github.com/bendyline/knowledge/releases/download/caselaw-alaska-v2026.10.1/collection.json),
[Wyoming](https://github.com/bendyline/knowledge/releases/download/caselaw-wyoming-v2026.10.3/collection.json), and
[Nevada](https://github.com/bendyline/knowledge/releases/download/caselaw-nevada-v2026.10.1/collection.json)
record exact case membership, checksums, and immutable download coordinates.
The public [dataset overview](https://huggingface.co/datasets/Bendyline/knowledge)
links every published pilot. CAP bodies and generated Markdown remain outside Git.

All four catalogs are included in the verified `@bendyline/gilde@0.1.88` npm
tarball and the live `gezelgilde.com` catalog snapshot from Gilde commit
`1ad672ad10ebc87f1bb0c732b8472f13d3e955d3`. Archive hashes, sizes, document/chunk
counts, and immutable Hugging Face coordinates match on both discovery surfaces.
The [publication verification record](../collections/caselaw/publication-2026-10-06-wave-2.json)
also checks the two new collection indexes and the dataset overview.

Wyoming combines 1,184 selected source books into one 1,069,210,109-byte archive,
covering 1870–2019. Nevada combines 179 books into one 766,348,339-byte archive,
covering 1865–2019. Their full source audits pass: 10,931/10,931 and
13,707/13,707 texts, with 143,500 and 162,663 resolved internal links.
Nevada retains CAP's jurisdiction assignment, including one Eureka County
District Court record alongside its appellate decisions.

All nine citation probes and eight semantic probes for these two collections
pass. Wyoming's original witness-name query now ranks the expected case first
in the complete state archive. Its four expected cases rank 1, 7, 1, and 1 in
the combined chunk results; Nevada's all rank first. Verification caps results
at 20 globally ranked chunks before deduplicating documents. The search API's
`finalK` is per shard, so it cannot alone impose this global limit. The existing
Alaska archive was also checked against the explicit limit and passes at ranks
2, 16, 2, and 1; see its [additional retrieval evidence](../collections/caselaw/alaska/retrieval-2026-10-06-global-top20.json).

The two builds ran concurrently on the same DirectML GPU with 12 GiB JavaScript
heap limits and retained caches. Build plus verification took 3,076.0 seconds
for Wyoming and 3,396.4 seconds for Nevada. These are concurrent local timings,
not isolated or uncached throughput measurements. Compact evidence is in the
[Wyoming](../collections/caselaw/wyoming/benchmark-2026-10-06-wave-2.json) and
[Nevada](../collections/caselaw/nevada/benchmark-2026-10-06-wave-2.json) release benchmarks.

Alaska spans 1887–2019 and combines 1,096 selected source books into one archive
near the 1 GiB target. It contains 349,739 chunks in two internal shards.
Measured planning estimated 1,077,205,344 bytes; the actual 1,041,433,404 bytes
are 3.3% smaller. The national page-count estimate remains provisional.
All 10,749 normalized texts match their source HTML; 439,974 page/footnote links
resolve. Four citation probes and four semantic probes pass. These are smoke
tests, not a broad legal retrieval evaluation. The collection retains CAP's
Alaska assignment, including 21 federal district-court records with explicit
court labels.

The Alaska build and verification took 3,986.7 seconds (66.4 minutes) on a
Ryzen 9 7950X3D and Radeon AI PRO R9700 using DirectML. Existing source, model,
and shared embedding caches were retained; this is not an uncached benchmark.
Regenerating the normalized corpus took 229.1 seconds and its source audit
212.9 seconds. Compact evidence, archive hashes, and both host receipts are in
[the Alaska benchmark](../collections/caselaw/alaska/benchmark-2026-10-06.json).

Large-download verification uses bounded concurrent HTTP ranges with transient
connection retries and a final SHA-256 over every byte in file order. Servers
without range support fall back to full-file verification. Interrupted uploads
resume from immutable host metadata and verified receipts; the collection index
is published only after every part passes on both hosts.

### Cloud mirroring and verified receipts

Stage a complete locally verified collection with:

```sh
node scripts/cloud-caselaw.mjs stage --collection collections/caselaw/utah/collection.json --version VERSION --report .work/staged.json --apply
```

Staging checks every part before uploading, requires the clean build commit,
and returns immutable Hugging Face coordinates. It does not write a publication
receipt or claim remote verification. The cloud mirror performs those checks
before the collection index and discovery registrations can be published.

`.github/workflows/mirror-release.yml` mirrors an already-uploaded immutable
Hugging Face release to GitHub without a second large upload from the build
machine. Supply its catalog ID, version, Hugging Face commit, build source
commit, and archive SHA-256. The workflow restores the bounded release folder,
hashes the archive, checks out the exact build commit, and invokes that commit's
normal publisher. Its `mirror-publication-receipt` artifact contains the result.
It uses the existing `knowledge-publishing` environment and credentials.

The successful [Wyoming](https://github.com/bendyline/knowledge/actions/runs/37561826065)
and [Nevada](https://github.com/bendyline/knowledge/actions/runs/37563087102)
runs downloaded and hash-verified both hosts. A build machine with slow download
bandwidth can reuse that evidence through `scripts/cloud-caselaw.mjs`. This
requires a pinned successful workflow run, its downloaded receipt, an identical
Hugging Face LFS object digest, and an identical GitHub asset digest and size.
Local archive and configured retrieval checks still run. Other files still use
the ordinary download verifier; a mismatch never silently falls back to trusting
the receipt. Collection publication retains the ordinary source-commit and
clean-checkout requirements.

Supply one proof per part in a local JSON array. For example, the completed
Wyoming release used:

```json
[
  {
    "catalogId": "caselaw-wyoming-part-0001",
    "runId": 37561826065,
    "workflowCommit": "0ad83bf0b9dcbadcbf011edbd7413cc0a4408301",
    "receiptPath": ".work/caselaw/cloud-receipts/wyoming/caselaw-wyoming-part-0001/2026.10.3/published.json"
  }
]
```

For a new release built from a checkout containing this script:

```sh
node scripts/cloud-caselaw.mjs publish --collection collections/caselaw/wyoming/collection.json --version VERSION --proofs .work/mirror-proofs.json --apply
node scripts/cloud-caselaw.mjs gilde --collection collections/caselaw/wyoming/collection.json --version VERSION --proofs .work/mirror-proofs.json --apply
```

Omit `--apply` to review the proposed action. Gilde registration uses the same
verified archive evidence, then runs its normal formatter, index builder, and
full validation loop before opening a PR. Merge registrations, publish Gilde
once, wait until the npm version is publicly available, then deploy the site at
that exact Gilde commit. Verify the actual npm tarball and public catalog
manifests against the archive hashes before calling discovery complete.

## State collection workflow

```sh
npm run caselaw -- inventory --snapshot 2026-10-06 --jurisdiction wyo
npm run caselaw -- ingest --snapshot 2026-10-06 --jurisdiction wyo
npm run caselaw -- audit --snapshot 2026-10-06 --jurisdiction wyo
npm run caselaw -- plan --preview --snapshot 2026-10-06 --collection collections/caselaw/wyoming/collection.json --report .work/caselaw/wyoming-preview.json
```

The cached snapshot above already contains the original four-part frozen plan.
The current configuration requests one approximately 1 GiB Wyoming archive.
Reingest and audit with the current `cap-html@7` normalizer before previewing
the cached corpus. Freeze and build under a new snapshot/plan identity after
the updated source audit. Shared source objects can be reused.
Do not overwrite the existing plan or reuse its release version.

Each stage fails closed on incomplete input and can be rerun. Acquisition checks
live CAP terms, uses four concurrent source jobs by default (`--concurrency`
accepts 1–8), and records failures without dropping the cases. Normalization
runs in bounded workers with a 30-second per-case timeout; a failed worker is
replaced and its case remains unresolved. Cached objects are verified by hash.
Acquisition of a ZIP pins its body bytes; later resumes reject a changed ZIP.

The inventory pins the published `ReportersMetadata.json`,
`VolumesMetadata.json`, and `JurisdictionsMetadata.json`. For a state it scans
every volume in jurisdiction-linked reporters, plus volume-level jurisdiction
hints, and selects membership from individual case records. Its coverage report
must reconcile with CAP's advertised case count and contain no duplicate CAP
IDs or unresolved indexes. This is a completeness claim within the recorded
discovery scope. It does not prove every historical decision is present, or
that unrelated reporter indexes contain no misclassified cases.

Use `inventory --jurisdiction all` for an exhaustive sweep of the pinned national
volume index before making a national coverage claim. Ingest, audit, plan, and
build remain jurisdiction-specific. Federal, D.C., territorial, and tribal
jurisdictions keep their own identities. Regional source ZIPs are shared across
state selections; a source book does not become a separate archive by default.

The source audit compares every normalized document with its original HTML text
(ignoring whitespace and generated headings), checks page/footnote destinations,
and verifies JSON, HTML, ZIP, and normalized-document provenance hashes. Planning
requires a passing audit bound to the same corpus digest. OCR is preserved,
including apparent mistakes; the converter protects literal braces from Squisq
template interpretation using character references with identical visible text.
The normalizer also retains CAP's headnote, summary, and attorney groups as
separate Markdown sections. Headnotes remain labeled separately from judicial
opinions; no summaries, OCR corrections, or legal conclusions are generated.
The audit derives these section labels from the original HTML and compares all
source text, including any source headings with the same names.
Empty emphasis, bold, and strike tags are made transparent before conversion,
with whitespace and link targets preserved. This avoids visible delimiter
characters from the pinned Squisq importer; the source audit caught this defect
in Nevada's *Tillema v. State*, CAP 11824094. The compatibility handling is
covered by a regression test and recorded in per-case transformation evidence.
The `cap-html@7` converter also preserves malformed OCR URL text as inline code
so automatic linking cannot turn it into an invalid URL. When a source footnote
marker has no target and the HTML contains no footnote bodies, its label remains
plain text and the absence is recorded. It never invents a note body or guesses
a corrected URL; other unresolved anchors still stop ingestion.

Planning counts token chunks in the canonical Markdown using the pinned embedding
profile. Binding local citation URLs for each part can slightly change the final
chunk counts, which are recorded in the compiled release. The
original conservative estimate is twice normalized bytes, plus 3,072 bytes per
chunk, source metadata, and 4,096 bytes per case. It combines adjacent whole
decision years up to the target; an oversized year splits in stable date, court,
and case-ID order. Cases are never split across archives. The default target is
now **1 GiB**, the provisional actual archive ceiling is 1.5 GiB, and every release
must also remain below the repository's 2 GiB asset limit. Actual sizes calibrate
future plans; estimates do not substitute for the post-build ceiling check.
A final remainder no larger than 10% of the target merges into its preceding
part when their combined estimate is within 5% of the target and under the hard
ceiling. This avoids tiny final downloads for collections just over 1 GiB.

The national configurations and Wyoming use `sizeEstimate: wyoming-bge-v1`,
which multiplies the original estimate by 0.60. The four Wyoming archives
actually measured 0.5933 times their original estimate. This model is allowed
only with the measured BGE profile; it needs calibration on other jurisdictions.
Omitting `sizeEstimate` retains the original conservative estimator for existing
configurations. The resulting Wyoming preview fits all 10,931 cases into one
part; the old four-part result below remains historical benchmark evidence.

Plans contain every selected case ID, source coordinates, hashes, measured
chunks, terms evidence, and exact part membership. A different plan cannot
overwrite the same snapshot/collection plan. Use `plan --preview` to inspect
boundaries and add search checks for every part before freezing; it caches token
measurements but does not save an immutable plan. Generated `caselaw-collection`
catalogs carry selection evidence and use the existing compiler, embedding
cache, integrity validator, and retrieval checks. The collection index becomes
`complete: true` only when every part passes and membership reconciles exactly
without overlap. Reuse a release version only with identical build inputs.

Semantic failures are retained in verification reports while the remaining parts
are built. `coverageComplete: true` means membership reconciles; `complete: true`
also requires each part's integrity and retrieval checks to pass. A semantic
failure keeps `complete` false and the CLI exit status nonzero. The ordinary
`verify --semantic` command also writes its failed report before returning an
error. These flags must remain distinct in any future publisher.

Within-part citations resolve locally. Citations across parts retain working CAP
web links; `collection.json` maps every CAP ID to its archive. Automatic offline
resolution across installed parts remains reader-side follow-up work.

```text
collections/caselaw/<name>/collection.json        reviewed configuration
.work/caselaw/objects/<sha256>                   shared source/Markdown objects
.work/caselaw/snapshots/<snapshot>/inventory.sqlite
.work/caselaw/snapshots/<snapshot>/coverage-wyo.json
.work/caselaw/snapshots/<snapshot>/ingestion-wyo.json
.work/caselaw/snapshots/<snapshot>/source-audit-wyo.json
.work/caselaw/snapshots/<snapshot>/<collection>-plan.json
.work/caselaw/snapshots/<snapshot>/parts/<catalog-id>/
.work/releases/<catalog-id>/<version>/           archives and release evidence
.work/collections/<collection>/<version>/collection.json
```

Bulk source data and generated state documents stay outside Git. Retain the
object store, snapshot database, plan, and release evidence together when moving
or backing up a run. Planning and building do not contact CAP; embedding assets
must already be cached for a fully offline build. On a supported Windows GPU,
setting `KNOWLEDGE_EMBEDDING_DEVICE=dml` selects DirectML; CPU is the default.
Embedding caches are separated by runtime and the release records the runtime.

## Content storage and build cost

Both bounded pilots now use `contentStorage: workspace`. Git stores their
manifests with exact ZIP hashes, NOTICE, static CC0 text, and retrieval checks.
`prepare-content` creates Markdown, source locks, provenance, and generated
license assessments under `.work/catalogs/<key>/`. It reuses a validated local
snapshot offline. Explicit `sync --catalog <key>` checks for changes; bulk sync
skips these catalogs. State collections use the shared object store above.

Preparation, compilation, and publication remain separate stages. The ordinary
catalog Actions build prepares content before compiling. Its upload stage only
consumes the verified release artifact. The state collection CLI publishes
verified parts and their collection index. A persistent build workspace avoids
repeated ZIP downloads and embedding inference; a fresh hosted runner has
neither cache.

In the earlier benchmark, regenerating all 10,931 Wyoming Markdown documents from cached
ZIPs took 151.4 seconds, and the full text/link audit took 183.4 seconds. The
corpus contains 317,853,931 normalized bytes. All documents matched their source
HTML text, and 143,500 page/footnote links had valid targets. These timings exclude
initial downloads and embedding/build work; they are local measurements, not a
hosted-runner performance guarantee.

The Wyoming acquisition retained 1,184 ZIPs totaling 1,465,236,468 compressed
bytes (5,121,447,639 bytes expanded inside ZIP processing), and indexed 1,275
candidate books. Most acquisition units are regional Pacific Reporter books
containing other jurisdictions. Downloading them once into the shared object
store permits reuse for later states. Do not estimate cold download volume from
the selected Wyoming Markdown alone. ZIP contents are read in memory as needed;
the pipeline does not retain a second fully extracted tree of all source cases.

Back up the object store and snapshot database alongside frozen plans and
release evidence. They preserve source bytes if upstream changes. A compact
report in Git records counts, pins, and build results; hashes alone cannot
recover unavailable source data.

## Historical Wyoming four-part benchmark

The unpublished `2026.10.2` collection packages all 10,931 selected CAP records in four
date-labeled archives, with 338,394 chunks and no overlapping case IDs:

| Decision years | Cases | Archive MiB | Chunks |
| --- | ---: | ---: | ---: |
| 1870–1967 | 3,276 | 300.75 | 101,700 |
| 1968–1992 | 3,215 | 289.91 | 97,183 |
| 1993–2011 | 3,275 | 293.60 | 97,886 |
| 2012–2019 | 1,165 | 123.28 | 41,625 |

Total archive size is 1,056,484,052 bytes (1,007.54 MiB). All four archives pass
deep integrity validation, and all five citation checks pass. Three of four
semantic probes pass; the remaining probe is described below. The index reports
`coverageComplete: true` and `complete: false`, and the build command exits 1
after saving the full result. That historical version remains unpublished;
the passing `2026.10.3` single-archive release is listed above.

The final build/verification command took 643.9 seconds using existing source
and embedding caches. Initial builds of the two middle parts each took about
24 minutes while running concurrently on DirectML. These are local Ryzen 9
7950X3D / Radeon AI PRO R9700 measurements. Fresh hosted CPU performance has not
been measured. Retain caches and publish prepared artifacts to keep expensive
inference outside the upload stage.

The local collection index is
`.work/collections/caselaw-wyoming/2026.10.2/collection.json`. It records every
archive path, SHA-256, date span, exact case membership, and verification status.
Compact source pins and benchmark results are versioned in
`collections/caselaw/wyoming/benchmark-2026-10-06.json`; full reports remain under
`.work/verification/`.

## Retrieval quality finding

The old first Wyoming part's query about adding witness names to a misdemeanor
indictment did not return the selected 1870 case, CAP 5270729, in the required
top 20 chunks. An exhaustive int8-vector scan ranks that case's best chunk 36th;
expanding approximate retrieval to 200 gives the same rank. Its text is present
and its exact citation lookup passes. The acceptance query and top-20 requirement
were retained, so that release remained blocked rather than relaxing the test.
Source-text fidelity and complete case membership do not establish
semantic-search quality. The later release passes this same query and limit;
a broader legal retrieval evaluation remains future work.

The published wave-2 builds use `cap-html@6`, which retains source-labeled headnote and
summary boundaries instead of merging them into one search chunk. Against the
old first-part index, the original witness-name query ranks the new headnote
chunk first. The complete rebuilt Wyoming archive also passes the unchanged
query at global chunk rank one. Both releases were built from commit
`a5e2644d6d1d09dabb4c95dcf275dcd588ff3ff5`; the later `cap-html@7` Utah work does
not alter them. The `2026-10-06-wave-2` planning snapshot is a SQLite backup of the
pinned national inventory, with a separate derivation record and new plan paths.
It reuses the source objects and does not claim a newly acquired metadata view.

## Utah measured preview

Utah is ingested and audited with `cap-html@7`: all 22,904 case texts match the
source HTML, and 354,806 internal links resolve. Regeneration from cached ZIPs
took 202.8 seconds, the stored-corpus audit 243.0 seconds, and token measurement
147.9 seconds. No Utah archive or embedding index has been built or published.

| Proposed archive | Decision dates | Cases | Estimated bytes | Measured chunks |
| --- | --- | ---: | ---: | ---: |
| `caselaw-utah-part-0001` | 1861–1992 | 15,254 | 1,069,408,251 | 353,233 |
| `caselaw-utah-part-0002` | 1993–2019 | 7,650 | 769,988,778 | 253,859 |

The [measurement record](../collections/caselaw/utah/measurement-2026-10-06.json)
pins the corpus and preview digests. Add representative citation and semantic
checks to each part, freeze the plan, compile, and verify actual sizes before
publication. The current configuration leaves publication disabled.

## Updates and distribution

Create a new snapshot ID to acquire a fresh source view. Run the same inventory,
ingest, and audit stages, then compare it with the accepted snapshot:

```sh
npm run caselaw -- diff --snapshot NEW-SNAPSHOT --against 2026-10-06 --jurisdiction wyo --report .work/caselaw/wyoming-changes.json
```

Comparison requires complete ingestion on both sides so an interrupted download
cannot masquerade as a removal. It reports added/removed IDs and distinguishes
metadata, JSON/HTML body, and normalized-text changes. Both snapshots must have
been normalized with the current converter. Review changes and removals, freeze
a new plan, and assign a new release version. Keep earlier archives immutable;
the collection index identifies the precise compatible set of parts for each
version. No automatic deletion or publication follows from a diff.

Collection configuration may explicitly enable publishing and supply the same
destinations as ordinary catalogs. The publisher requires complete coverage and
passing integrity, citation, and semantic checks for every part. It checks all
parts before uploading, resumes from verified receipts, and publishes the public
collection index only after every part is verified on both release hosts:

```sh
npm run caselaw -- publish --snapshot 2026-10-06 --collection collections/caselaw/alaska/collection.json --version 2026.10.1
npm run caselaw -- publish --snapshot 2026-10-06 --collection collections/caselaw/alaska/collection.json --version 2026.10.1 --apply
```

The public index includes exact case membership and immutable download links;
local workspace paths are omitted. Gilde can list the individually usable parts
through the existing catalog registration path. Native bundle installation is
still reader-side follow-up work. Source corrections or withdrawals require a reviewed
replacement/withdrawal process, including existing public copies. CAP's CC0
designation and voluntary credit rules apply separately from repository code.

## Bounded pilots

The current pilot is `caselaw/us-347-349`: all 2,142 case records from three
consecutive source volumes combined into one searchable `.gezk`:

| Source volume | Case records |
| --- | ---: |
| [347 U.S.](https://static.case.law/us/347.zip) | 690 |
| [348 U.S.](https://static.case.law/us/348.zip) | 1,028 |
| [349 U.S.](https://static.case.law/us/349.zip) | 424 |

The earlier `caselaw/us-347` pilot remains as a comparison baseline. These
catalogs deliberately overlap; use the combined archive for the expanded pilot.
Their source boundaries are not a claim of complete court-term, Supreme Court,
or state coverage. The combined pilot is enabled for verified publication; the
single-volume baseline remains disabled. The accepted Markdown snapshots
live in `.work/catalogs/caselaw/<pilot>/content/`; builds do not download case data.

## Run the pilot

```sh
npm run prepare-content -- --catalog caselaw/us-347-349
npm run check
npm run build -- --catalog caselaw/us-347-349 --version 2026.10.6 --created-at 2026-10-06T00:00:00Z
npm run verify -- --catalog caselaw/us-347-349 --version 2026.10.6 --semantic
```

Use a new release version after changing source or build inputs. Sync checks live
terms before accepting cached archives. Builds can use the already accepted
snapshot without network access to CAP. Embeddings may require a first-time
model download. The release directory records actual archive size and chunk
counts; `.work/verification/` records integrity and search checks.

## Combined-volume results

The published workspace-based `2026.10.5` release contains 2,142 documents,
12,847 chunks, and one shard in 30,128,630 bytes (28.73 MiB). Deep validation,
six citation/name checks, and four semantic checks pass. All 2,142 texts match
their source HTML, and all 4,872 page/footnote links resolve. Its SHA-256 is
`db08e80f8c6880791e5ace109a43c55f5f95083289f735188e0b9fdaafe41712`.
The [public release](https://github.com/bendyline/knowledge/releases/tag/caselaw-us-347-349-v2026.10.5)
contains checksums and verification reports. Immutable Hugging Face download
coordinates are recorded in Gilde. The earlier measurements below remain
historical pilot evidence.

The earlier combined `2026.10.1` build was verified on October 6, 2026 using the pinned
`bge-small-en-v1.5@1` embedding model on CPU:

| Measurement | Result |
| --- | ---: |
| Source ZIPs / case records | 3 / 2,142 |
| Source opinions, including separate opinions | 2,251 |
| Cases with multiple opinions | 75 |
| Downloaded source ZIP bytes / expanded bytes | 6,442,400 / 19,053,169 |
| Normalized Markdown and topic files | 6,093,311 bytes |
| Search chunks / shards | 12,847 / 1 |
| Compiled `.gezk` | 30,116,398 bytes (28.72 MiB) |
| Page/footnote links with valid local targets | 4,872 |
| Local case links / links across source volumes | 281 / 202 |

Archive:
`.work/releases/caselaw-us-347-349/2026.10.1/caselaw-us-347-349-2026.10.1.gezk`.
SHA-256: `edd95a02adeca18058fc37f93f694c8482a20ed5f18a7ba9c31d1e25b94d0d53`.
The integrity and search report is
`.work/verification/caselaw-us-347-349-2026.10.1.json`; the complete source-text
and link audit is `.work/verification/caselaw-us-347-349-source-audit.json`.
These reports and archives are local outputs ignored by Git.

Deep archive validation, all six title/citation checks, and all four semantic
queries passed. Each semantic query returned its expected case first: Brown's
original decision, Brown's implementation decision, Berman v. Parker, and
Commissioner v. Glenshaw Glass. Exact citations distinguish the two Brown
decisions. Name-only queries can rank a related order above the merits opinion:
Glenshaw's merits opinion ranked second and Williamson's fourth in the title
checks. Retrieval remains a smoke test, not a legal-research quality benchmark.

All 2,142 normalized documents match their source HTML text after ignoring
whitespace and removing generated headings. All local links resolve, including
Brown's implementation decision linking to its original decision in the other
year folder. The repository check passed 57 tests with one existing optional
toolchain test skipped. Multi-volume regression coverage includes filename
reuse, stable selection independent of input order, cross-volume links,
combined byte budgets, duplicate case IDs, and a failed later ZIP preserving
the accepted snapshot.

Three source books fit comfortably into one archive. Grouping also makes their
202 cross-volume citations available locally. Continue aggregating by meaningful
collection and date boundaries, using measured compiled size to decide when to
split. A fixed number of source books per `.gezk` would be a poor rule: even in
this sample, 2,003 of 2,142 records have less than 1,000 characters of opinion
text. State collections need their own size and chunk measurements.

## Single-volume baseline

The local `2026.10.1` build was verified on October 6, 2026 with the pinned
`bge-small-en-v1.5@1` embedding model on CPU:

| Measurement | Result |
| --- | ---: |
| Case records | 690 |
| Source opinions, including separate opinions | 739 |
| Cases with multiple opinions | 32 |
| Normalized Markdown and topic files | 2,291,669 bytes |
| Search chunks / shards | 4,525 / 1 |
| Compiled `.gezk` | 11,014,457 bytes (10.50 MiB) |
| Page/footnote links with valid local targets | 2,007 |
| Case links to other documents in this archive | 13 |

Archive: `.work/releases/caselaw-us-347/2026.10.1/caselaw-us-347-2026.10.1.gezk`.
SHA-256: `bafba58f32a8845f762e7577de74a586916ce16063098259fa83956e21112c3c`.
The integrity and search report is
`.work/verification/caselaw-us-347-2026.10.1.json`. These local build outputs are
ignored by Git; the checksum-pinned source definition and reproduction commands
are in the repo. These baseline results predate the current normalizer and
workspace-storage changes; rebuilding those inputs requires a new version.

Deep archive validation and all three title/citation queries passed. Brown was
the first result for its name, `347 U.S. 483`, and the semantic query
“racial segregation in public schools denies equal protection of the laws.”
This is a retrieval smoke test, not a legal-research quality benchmark.

A full-corpus text comparison found that all 690 normalized documents match
their source HTML text after ignoring whitespace and removing generated
headings. All local page, footnote, and case links resolve in the
Markdown snapshot. The repository check passed 56 tests; one existing test
requiring an optional development toolchain was skipped.

This volume is heavily weighted toward short records: 636 of its 690 cases
have less than 1,000 characters of opinion text. Its size per case should not
be extrapolated to entire states. The Wyoming benchmark should measure actual
text and chunk distributions before setting package boundaries.

## Source selection and normalization

`source.type: caselaw` accepts an explicit `volumes` list. Each entry identifies
the reporter slug, actual volume folder, SHA-256 of the ZIP, and expected case
count. Optional `jurisdictions` and `courts` contain numeric CAP IDs; both filters
must match when configured. Selection uses individual case metadata, not the
reporter's name. Empty filters select every case in the listed volumes.

The original volume 347 ZIP is 2,417,614 bytes and expands to 7,122,647 bytes.
It contains
`json/`, `html/`, and `metadata/`; online individual JSON URLs use `cases/`.
ZIPs must contain exactly the indexed case JSON/HTML pairs plus both metadata
files. The adapter verifies metadata equivalence, case counts, checksums, safe
paths, regular-file types, and byte budgets. Original vendor TARs, scanned PDFs,
and images are not ingested. `.tar.sha256` verifies the TAR, not the ZIP.

Documents use `cap-<numeric ID>` identifiers and paths organized by jurisdiction,
court, and decision year. Unknown dates use an `undated` folder, and partial
dates remain partial in metadata. Citation strings and case names are search
aliases. JSON metadata retains court, jurisdiction, date, docket, citations,
pages, upstream provenance, and opinion type/author. Opinions receive explicit
headings; their source text is not summarized or corrected.

Squisq performs HTML-to-Markdown conversion. Targeted page and footnote IDs pass
through conversion as safe generated anchors, so references still have local
targets. Source links to selected cases become relative Markdown links, which
the compiler binds to knowledge URIs. Other case citations point to CAP's static
HTML. Case-level provenance records separate JSON, HTML, and archive hashes.

CAP-specific guards preserve literal braces, dollars, backslashes, and colons
that could otherwise be interpreted as Markdown extensions. Link-bearing
preformatted captions become ordinary blocks so page anchors stay active.
The sibling Squisq repository contains fixes for malformed-template backtracking,
literal-punctuation serialization, and emphasis boundary whitespace. The
knowledge repository retains compatibility guards for its pinned published
Squisq packages until those library fixes are released and adopted.

Two upstream cases have footnote return links without targets: fourteen in
`347 U.S. 298` and one in `348 U.S. 296`. These links retain their labels as
plain text, with the adjustment recorded in metadata and provenance. Other
missing anchor targets stop import, apart from the explicitly recorded absent
footnote bodies described above.
The original footnote bodies remain intact. The pilot does not expose a full
structured citation graph or retain scanned-page coordinates for a PDF viewer.

## Licensing and access

[CAP's terms](https://case.law/terms/) designate its case data and metadata
CC0-1.0. Harvard's requests for credit and unrestricted improvements are
community norms, not added license conditions. See the catalog NOTICE and
generated `LICENSES/assessment.json`. The complete terms template is pinned in
`src/caselaw-policy.mjs`; any change fails the live sync check. The website's
separate CC BY-SA prose is not copied into the catalog.

The static host's robots.txt disallows crawling. Its
[bulk-download documentation](https://case.law/docs/#bulk-downloads) expressly
invites volume ZIP downloads. This adapter follows that documented path with
an explicit, bounded selection and a checked archive cache, not a website crawl.

CAP data includes OCR errors and historical opinions; a citation is not an
assertion of continuing legal validity. Coverage must be stated per collection.

## National metadata sweep

The 2026-10-06 sweep indexed all 40,622 source volumes without download or
validation failures. All 60 advertised populated jurisdiction counts reconcile.
The indexes contain 6,920,598 distinct case IDs, two more than the root totals:
two United Kingdom decisions appear in Colorado Law Reporter volume 4, but CAP
omits their jurisdiction from its root list. They remain in the inventory and
require an explicit collection policy before national publication. The compact
evidence is `collections/caselaw/inventory-2026-10-06.json`. The provisional
national package list still covers the 60 advertised jurisdictions; it does not
silently absorb these two records into Colorado. The full metadata sweep is
separate from case-body ingestion and archive publication.

## Expansion into state collections

Keep source books separate from collection and archive boundaries. A state
collection should combine its cases from many reporters; larger collections
can have several independently usable `.gezk` parts. CAP's source jurisdiction
IDs determine membership, with court labels preserved. Known classification
anomalies are disclosed: Alaska's source assignment includes 21 federal district
court records. Do not silently reassign or drop cases to make reporter titles
agree with the collection name.
Keep D.C., territorial, and tribal jurisdictions distinct.

The shared inventory and planner implement this separation. Reporter and
volume jurisdiction metadata are discovery hints, not sufficient evidence of
case membership. For example, volume 1 of U.S. Reports contains Pennsylvania
cases. Regional reporters span several states. Use actual metadata paths;
volume folders can include suffixes such as `138-2` and need not be continuous.

Reporter collections use `reporter` instead of `jurisdiction`, optionally with
an explicit `volumes` array. Omit `volumes` for the entire reporter. Run the
national metadata inventory first, then pass the collection to `ingest`,
`audit`, and `plan`. Every case in each selected book is retained, irrespective
of its jurisdiction label; completeness reconciles against the pinned volume
indexes. Both selection types use the same source audit, measured chunk sizing,
whole-case partitioning, retrieval checks, and immutable publication workflow.
Reporter collections can overlap jurisdiction collections and earlier bounded
pilots. Their scope must disclose that overlap; case IDs remain stable.

The defaults and immutable planning workflow are described above. Calibrate
using measured chunks and compiled bytes, not case counts alone.

The combined pilot validates a bounded explicit list of source volumes in one
catalog. The manifest's `source.volumes` list is the acquisition boundary; the
catalog ID and release version identify the resulting archive. No new importer
or one-archive-per-book layer is needed to combine more books. A single mapping
of all selected cases makes citations between books local, and per-case
provenance retains the precise source ZIP, JSON, and HTML hashes. Books with
identical case filenames remain distinct through stable CAP IDs.

The collection pipeline discovers candidate source volumes, plans size-based
parts, and publishes verified archives followed by a collection index. Reader
installation of a whole collection from that index remains future work.
Repeated CAP IDs in selected source volumes fail
instead of being silently merged. A future inventory should resolve equivalent
records deliberately. Regional bundles should reference existing parts where
possible rather than distribute duplicate indexes.

Wyoming is the first full jurisdiction benchmark; its compact evidence is in
`collections/caselaw/wyoming/benchmark-2026-10-06.json`. Further scale checks
should use California and a bounded New York slice. Before national rollout,
add durable source/object storage, measured runner budgets, and reader support for installed-part
lookup. Each step can reuse the source inventory, canonical corpus, and immutable
plans rather than introducing case bodies into Git.
