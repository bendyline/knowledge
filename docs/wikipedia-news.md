# Wikipedia news catalog

See [the initial import validation](wikipedia-validation.md) for the downloaded
snapshot's measured scope and validation results.

`catalogs/wikipedia/on-this-day-en` is the news catalog. It uses the daily
`Portal:Current events/YYYY Month D` pages, rather than historical anniversaries.
Its manifest selects a rolling 365-day UTC window ending today and `depth: 1`.
Today's page may still be incomplete. Set `source.currentEvents.endDate` to an
ISO date to select a fixed window instead.

The shared downloaded corpus and the Gezk packages are separate. The corpus
above is unchanged by packaging. `build.packaging` selects a **latest three-month
package** plus **six completed calendar-quarter archive definitions** from it:

```json
"packaging": { "type": "wikipedia-news", "latestMonths": 3, "archiveQuarters": 6 }
```

Run `npm run packages -- --catalog wikipedia/on-this-day-en` to see the date
ranges, document counts, and coverage gaps without downloading or compiling.
Ranges are anchored to the accepted snapshot's last date, not the machine clock.
The latest window starts the day after subtracting three calendar months from
that date (clamping month ends). Archives use complete calendar quarters; a
quarter ending on the snapshot date counts as complete. A missing day prevents
a package build. Packaging neither shortens the sync window nor fetches missing
history. Older archive coverage requires retaining or expanding the source
corpus separately, or retaining packages previously built from earlier snapshots.

The current snapshot supports `latest` (2026-07-04 through 2026-10-03) and
`2026-q1`, `2026-q2`, and `2026-q3`. `2025-q4` is missing October 1–3;
`2025-q2` and `2025-q3` are absent. Six archive definitions therefore do not
imply six complete archives are available from this one-year corpus.

The measured `latest` build, version `2026.10.4`, is **1,582,321,017 bytes**
(1.58 GB) and passed deep validation, 92-day TOC checks, all six search checks,
and an independent internal-link audit. It fits the current GitHub asset limit.
Production quarterly archives remain to be built and measured individually.

`latest` keeps the catalog ID `wikipedia-on-this-day-en`. Each archive receives
an ID such as `wikipedia-on-this-day-en-2026-q3`, so it has its own immutable
versions, Hugging Face path, GitHub releases, and Gilde definition. The rolling
package intentionally overlaps the most recent completed quarter. Articles are
stored once within each package and once in the shared source corpus, but may
appear in more than one self-contained Gezk.

The date-based TOC uses **draft Gezk 0.7 / index schema 4**. Until that toolchain
is published to npm, use an explicitly selected, already built Gezel checkout.
The normal installed toolchain still builds other catalogs; it fails early for
`wikipedia-days` instead of silently dropping shared article references.

```powershell
$env:KNOWLEDGE_GEZEL_ROOT = (Resolve-Path ../gezel).Path
$env:GEZEL_HF_CACHE_DIR = "$PWD/.work/models"
$env:NODE_OPTIONS = '--max-old-space-size=12288'
# Optional on supported Windows hardware; otherwise omit for CPU:
$env:KNOWLEDGE_EMBEDDING_DEVICE = 'dml'

# Sync only when advancing the accepted content snapshot:
npm run sync -- --catalog wikipedia/on-this-day-en --apply
npm run build -- --catalog wikipedia/on-this-day-en --package latest --version 2026.10.4
npm run verify -- --catalog wikipedia/on-this-day-en --package latest --version 2026.10.4 --semantic

# Build an archive from the same corpus, with no new downloads:
npm run build -- --catalog wikipedia/on-this-day-en --package 2026-q3 --version 2026.10.4
npm run verify -- --catalog wikipedia/on-this-day-en --package 2026-q3 --version 2026.10.4 --semantic
```

For an existing snapshot, run just build and verify with a new immutable version.
Omitting `--package` on this catalog selects `latest`. The same optional selector
is accepted by `publish` and `gilde`, and by the publishing workflow's `package`
input. Other catalogs continue to build their whole content folder.
Both commands must select the same toolchain. The release records hashes of the
local compiler, format bundle, and dependency lock; the build digest includes
them. The override uses existing bundles and does not relink dependencies.

The initial download includes thousands of full articles and takes substantially
longer than the small handbook example. Sync logs progress and stores resumable
revision downloads under `.work/wikipedia/`. No existing content is replaced
until the complete snapshot passes validation. Page and byte limits fail the
operation rather than silently cutting off traversal.
HTML conversion runs in four Node worker threads and preserves the same output
as serial conversion. Intermediate HTML and Markdown stay under `.work/` until
the complete snapshot is accepted.

Daily Markdown goes into `content/days/YYYY-MM-DD.md`. Referent articles go into
`content/articles/<Wikipedia page ID>.md`. Title normalization and redirect
resolution happen before article downloads. A topic mentioned on many dates,
even through different redirect titles, has one canonical file and one content
download per run. Articles linked from those referents are not crawled.

Only the daily news section contributes seed links; date navigation, sidebars,
and portal controls do not expand the selection. Non-article namespaces and
unavailable referents are excluded and recorded in `LICENSES/selection.json`.
A missing daily seed or changed daily-page structure fails the whole sync.
The selection file also maps every date to its referent article IDs.

`build.toc.format: "wikipedia-days"` uses this accepted selection to create one
TOC section per day, newest first. Each section lists its daily summary first,
then the relevant articles alphabetically by canonical title. An article can
appear on several days while retaining one document, body, set of embeddings,
and citation identity. Its newest referring day supplies the primary placement;
earlier days use shared TOC references. Any additional seed articles not linked
by a daily page appear under “Additional articles.” Verification checks all
daily memberships, order, counts, and canonical document uniqueness against the
selection file. Build does not fetch or normalize articles. A package selects
only its daily summaries and the union of their direct referents. It binds local
links to included articles to the package's knowledge URIs; links to excluded
articles point to their Wikipedia source URLs. This changes only compiled
references and never edits the normalized files under `content/`.

Each package embeds `PACKAGE.json`, its selected `LICENSES/selection.json`,
the original `LICENSES/corpus-selection.json`, selected article provenance,
and all applicable license evidence. News dates describe the events window;
referent bodies use accepted corpus revisions, not historical quarter-end
versions. Search checks are scoped to documents actually selected for the package.
The publisher still checks the actual archive against GitHub's asset-size limit;
a quarter is not a guarantee of a particular number of bytes.

Squisq converts rendered HTML to Markdown during sync. Images and navigation
are removed, selected article links point to local Markdown, and other links
point back to the web. External news sources remain citation links. Source text
is not summarized. After reference/image edits, Squisq condenses table padding
and decorative dividers, then verifies that the Markdown still parses to the
same document. Table cells, alignment, code, citation definitions, and embedded
attribution are preserved. This avoids indexing thousands of padding characters
as article content; it does not remove bibliographic or explanatory footnotes.
The normalizer digest records this transformation, and future syncs apply it
before writing `content/`. Existing release archives require a new build after
an accepted sync to benefit from the smaller Markdown.
Article revision IDs, rendered HTML hashes, source and history
URLs, and referring daily page IDs are retained in provenance. Articles reflect
the revisions fetched during this sync, not their historical state on each date.

Wikipedia's CC BY-SA 4.0 license is recognized automatically. Full license text,
attribution, adaptation notices, site license evidence, and provenance accompany
both Markdown and the built Gezk. Embedded attribution notices are retained.
The repository's MIT license applies to pipeline software, not Wikipedia text.

Nightly sync advances the window and removes expired daily pages. A referent
remains while any selected day links to it; a referent no longer reachable from
the selected window is removed. Changes to a canonical article update its
existing file. Each accepted snapshot is suitable for a new immutable Gezk
version and the existing publishing/Gilde PR workflow.

Metadata requests follow the [MediaWiki API etiquette](https://www.mediawiki.org/wiki/API:Etiquette).
Rendered HTML comes from canonical cached article URLs following the
[Wikimedia robot policy](https://wikitech.wikimedia.org/wiki/Robot_policy): eight
website requests in flight, at most eight starts per second, with robots.txt,
gzip, an identifying User-Agent, and Retry-After support. Article IDs and rendered
revision IDs are verified before content is accepted.
Reuse terms are described in [Wikimedia's Terms of Use, section 7](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use#7._Licensing_of_Content).
