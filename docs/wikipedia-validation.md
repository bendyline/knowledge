# Wikipedia news import validation

The initial `wikipedia/on-this-day-en` snapshot contains the daily current-events
pages for **2025-10-04 through 2026-10-03**, inclusive, and their directly linked
English Wikipedia articles. Referent articles contain the revisions fetched
during synchronization, rather than historical versions from each news date.

| Snapshot measure | Result |
| --- | ---: |
| Daily news pages | 365 |
| Unique referent articles | 15,367 |
| Total Markdown documents | 15,732 |
| Daily references to canonical articles | 41,803 |
| Articles mentioned on multiple days | 5,021 |
| Normalized Markdown bytes | 1,816,571,398 |
| Rendered article HTML bytes processed | 7,518,665,454 |

The snapshot was applied successfully. Selection and provenance validation
checks the date window, unique page IDs, canonical file paths, and the reciprocal
relationship between daily references and article provenance.

For example, **Hurricane Polo** is mentioned on September 22 and September 28,
2026. Both days point to the single file
[`content/articles/84283796.md`](../catalogs/wikipedia/on-this-day-en/content/articles/84283796.md).

The only excluded linked title is **Oil storage**, which redirects to
`Category:Oil storage`. Categories are outside the article scope. This exclusion
is recorded in
[`LICENSES/selection.json`](../catalogs/wikipedia/on-this-day-en/LICENSES/selection.json).
All 365 daily seeds were available.

The import automatically verified Wikipedia's CC BY-SA 4.0 license. Full license
text, site licensing evidence, adaptation notices, rendered-source hashes, and
per-document revision/history URLs accompany the Markdown snapshot.

## Completed source validation

The full Markdown audit passed:

| Check | Result |
| --- | ---: |
| Local article links checked | 1,022,483 |
| Missing local target files | 0 |
| Markdown or HTML image nodes | 0 |
| Citation footnote definitions | 1,253,486 |

A separate scan also found no HTML `img`, `picture`, or `svg` elements. Local-link
validation checks target files; it does not assert reader-specific section-anchor
behavior or test the availability of external websites.

`npm run check` passed: all catalog validations, syntax checks, generated schema
checks, workflow YAML parsing, and **41 automated tests**. The synchronized
content digest is
`a5d8df54ff287e7bed3a7c314ff0575deeede417919197a1804c7cb7c4c37049`.

## Formatting condensation: October 5, 2026

Squisq's `condenseMarkdownSource` was checked against all **15,732 documents**.
Each output was reparsed and compared with the input AST, ignoring only source
positions. All documents passed. Table cells and alignment, prose, code, links,
footnotes, and attribution remain intact; excessive table padding and decorative
dividers are shortened. **14,361 files** change formatting.

| Markdown measure | Bytes |
| --- | ---: |
| Before condensation | 1,816,571,398 |
| After condensation | 1,125,063,253 |
| Removed formatting | 691,508,145 |

This is a **38.1% reduction in source Markdown**. The existing source revisions,
365-day window, article identities, license evidence, and daily references are
preserved. The accepted snapshot's content hashes and provenance record the
additional transformation. Knowledge sync applies the same Squisq operation
after reference/image edits on future imports.

The condensed content digest is
`30cc2dd3f2bd4da99e45d427292504423e472285cb533b382e44343f92b99632`.

## Three-month package: 2026.10.4

The packaging configuration now builds a latest-three-month catalog and defines
six completed calendar-quarter archive slots from the same downloaded corpus.
Neither the content files nor source selection/provenance changed. The full-year
archives remain intact.

The real `latest` package was built and verified with the draft Gezk 0.7 toolchain
and pinned BGE embeddings. It covers **2026-07-04 through 2026-10-03**, anchored
to the accepted corpus's last date. Build and Node verification took about
**50 minutes**, reusing cached vectors and embedding changed package-link text.

| Package measure | Result |
| --- | ---: |
| Archive bytes | 1,582,321,017 |
| Daily summaries | 92 |
| Unique referent articles | 5,820 |
| Canonical documents | 5,912 |
| Embedded chunks | 674,538 |
| Shards | 4 |
| Daily article references | 11,791 |
| Articles shared across days | 1,576 |
| Internal article links checked independently | 314,350 |
| Missing internal targets | 0 |

The **1.58 GB** archive fits GitHub's under-2-GiB release-asset limit. Checksum,
deep database, license text, selected metadata, all **92 daily TOC sections**,
and **three title plus three semantic search checks** passed. The Python
reference reader independently verified every daily membership and page,
the canonical document/provenance sets, router checksum, and internal links.

`npm run check` passed with the draft toolchain: **51 tests**. The installed
toolchain passed 50 with one explicit skip for the shared-TOC compiler test.
That integration test builds both rolling and quarterly packages, verifies
their selected TOCs, distinct identities, licensing/provenance and link routing,
and confirms the source corpus remains unchanged.

Local artifact:

```text
.work/releases/wikipedia-on-this-day-en/2026.10.4/wikipedia-on-this-day-en-2026.10.4.gezk
```

SHA-256:

```text
00bae57cbd6d791303c61d02cd645ed9f8448743b62481228e8c202ee7f0da8a
```

Reports:

- `.work/verification/wikipedia-on-this-day-en-2026.10.4.json`
- `.work/verification/wikipedia-on-this-day-en-2026.10.4-python.json`
- `.work/news-package-plan.json`
- `.work/news-package-size-estimates.json`

The existing corpus can also build complete `2026-q1`, `2026-q2`, and `2026-q3`
archives. Their approximate sizes, scaled from chunk counts in the full archive,
are **1.37, 1.63, and 1.59 GB**, respectively. These are estimates; production
quarterly archives have not been built in this packaging validation. `2025-q4`
lacks October 1–3, while `2025-q2` and `2025-q3` have no source days. Builds of
incomplete quarters fail instead of silently creating partial archives.

Links to included articles use this package's knowledge URIs; links to excluded
articles open Wikipedia. There is one canonical body per package. Standalone
packages can share article content with one another, while the corpus continues
to store each article once. Referent bodies use corpus revisions, not historical
quarter-end revisions. No package has been published by this workflow.

Version **2026.10.3** rebuilds this condensed snapshot. Earlier immutable
archives remain intact and describe their original snapshots.

## Condensed Gezk rebuild: 2026.10.3

The condensed snapshot was compiled with **Gezk 0.7 / index schema 4** and the
real pinned `bge-small-en-v1.5@1` model, using DirectML and the existing embedding
cache. Changed chunk texts received new vectors. Build and Node verification
completed in approximately **85 minutes** on the tested machine.

| Measure | Previous 2026.10.2 | Condensed 2026.10.3 |
| --- | ---: | ---: |
| Archive bytes | 4,869,164,223 | 3,597,102,630 |
| Embedded chunks | 1,817,267 | 1,528,090 |
| Shards | 10 | 8 |
| Canonical documents | 15,732 | 15,732 |
| Daily TOC sections | 365 | 365 |
| Daily references to articles | 41,803 | 41,803 |
| Articles shared across days | 5,021 | 5,021 |

The archive is **26.1% smaller**, saving **1,272,061,593 bytes** (1.27 GB).
There are **289,177 fewer chunks** (15.9%). All documents, the accepted date
window, source revisions, and license evidence are retained.

Checksum verification, deep database validation, exact source license-text
comparison, all **365 daily TOC checks**, and **three title-search plus three
semantic-search checks** passed. Semantic query verification used the CPU
embedder. The independent Python reference reader verified the router digest,
every day's membership and pagination, and canonical document uniqueness.
Hurricane Polo still has one stored body referenced by both September 22 and
September 28, 2026. The snapshot digest remains the condensed digest above.

SHA-256:

```text
38df2dbd44a7a6548e6d33f34d1b30e1bcd1c8f4f4661ce341b03645192ea720
```

Local artifact:

```text
.work/releases/wikipedia-on-this-day-en/2026.10.3/wikipedia-on-this-day-en-2026.10.3.gezk
```

Validation and comparison reports:

- `.work/verification/wikipedia-on-this-day-en-2026.10.3.json`
- `.work/verification/wikipedia-on-this-day-en-2026.10.3-python.json`
- `.work/wikipedia-condensed-comparison.json`

The release directory includes its manifest, checksums, notices, and licensing
and provenance sidecars. This archive has not been published. Like 2026.10.2,
it requires a reader that supports the draft 0.7 format and shared TOC references.

## Shared TOC rebuild: draft Gezk 0.7

Version **2026.10.2** rebuilds the same accepted snapshot with **Gezk 0.7 /
index schema 4**. Dates appear newest first. Each day lists its daily summary,
then the relevant articles alphabetically by canonical title. Repeated mentions
point to one stored document and one set of chunks.

| Rebuilt archive measure | Result |
| --- | ---: |
| Daily TOC sections | 365 |
| Daily references to articles | 41,803 |
| Total TOC placements, including daily summaries | 42,168 |
| Articles shared across days | 5,021 |
| Canonical documents | 15,732 |
| Embedded chunks | 1,817,267 |
| Shards | 10 |
| Archive bytes | 4,869,164,223 |

The full archive passed checksum, deep database, and exact license-text checks.
All **365 days** passed membership, title ordering, pagination, and unique-ID
checks against the accepted selection. The independent Python reference reader
also verified the router digest and every daily membership and page. Hurricane
Polo has **one stored body** and placements on **2026-09-22 and 2026-09-28**.

All **three full-text and three semantic retrieval checks** passed. This rebuild
and verification took approximately **26 minutes**, reusing the original pinned
BGE model vectors from the DirectML cache. Semantic query verification used the
CPU embedder. Source Markdown and its content digest are unchanged. The earlier
2026.10.1 archive remains intact.

The knowledge pipeline passed **44 automated tests** under both the installed
and draft toolchains. The Python reference reader passed **33 tests**, including
shared-reference corruption checks and 0.5/0.6 compatibility. Signed fixtures
for 0.5, 0.6, and 0.7 passed deep CLI validation and JSON Schema checks.

This local draft artifact requires the updated Gezel build or Python reader;
older readers reject 0.7. Its `release.json` records the local compiler bundle
hashes and dependency-lock fingerprint. Neither the draft nor this archive has
been published by this workflow.

SHA-256:

```text
fbd604d9b5dea705f599368665acf33dca154fbf6195fdd3b9c984d01067b9b4
```

Local artifact:

```text
.work/releases/wikipedia-on-this-day-en/2026.10.2/wikipedia-on-this-day-en-2026.10.2.gezk
```

Validation reports:

- `.work/verification/wikipedia-on-this-day-en-2026.10.2.json`
- `.work/verification/wikipedia-on-this-day-en-2026.10.2-python.json`

## Original Gezk validation

Version **2026.10.1** was built with the real, pinned `bge-small-en-v1.5@1`
embedding model using DirectML. The archive was extracted, deeply validated,
and reopened with the Gezk reader. Semantic queries used the CPU embedder.

| Archive measure | Result |
| --- | ---: |
| Documents | 15,732 |
| Embedded chunks | 1,817,267 |
| Index shards | 10 |
| Media assets | 0 |
| Archive bytes | 4,866,147,082 |

Archive checksum verification, deep database validation, and exact license-text
comparison passed. All **three full-text checks and three semantic checks**
returned the expected article first: Hurricane Polo, the 2026 Latvian
parliamentary election, and the United States.

The initial build and verification took approximately **321 minutes** on the
tested Windows machine with an AMD Radeon AI PRO R9700, Node.js 24.18.0, a 12 GiB
Node heap limit, and cached model files. Later builds can reuse completed vectors
from `.work/embeddings/`; the initial timing should not be treated as a general
hardware-independent estimate.

SHA-256:

```text
e4b8420073d58aeebd98c7c024c6a640865451b29149a068df99b218e9e8459a
```

Local artifact:

```text
.work/releases/wikipedia-on-this-day-en/2026.10.1/wikipedia-on-this-day-en-2026.10.1.gezk
```

The release directory also contains `release.json`, `SHA256SUMS`, notices, and
license/provenance sidecars. The complete retrieval report is saved locally at
`.work/verification/wikipedia-on-this-day-en-2026.10.1.json`. The source-content
audit is `.work/wikipedia-content-audit.json`.

## Publication sizing

The latest-three-month **1.58 GB** package fits GitHub's
[2 GiB limit per release asset](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases#storage-and-bandwidth-quotas).
The full-year **3.60 GB** archive still exceeds that limit. The current publisher
uploads one Gezk asset per selected package and checks its actual size before
uploading. Other quarters must be built and measured before publication; a
particularly large quarter may still need a smaller window or multipart support.
The manifest keeps publication disabled pending the published shared-TOC
toolchain and account setup. Hugging Face's
[single-file size limit](https://huggingface.co/docs/hub/storage-limits#repository-limitations-and-recommendations)
is larger; account storage capacity and dataset setup still need to be configured
when publication is enabled.

See [the catalog workflow](wikipedia-news.md) for local commands and source policy.
