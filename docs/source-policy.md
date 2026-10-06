# Source and transformation policy

Public GitHub repositories, explicitly configured Wikipedia editions, and pinned
Caselaw Access Project volume ZIPs are supported. No login sessions, private repository files, cookies, or
secrets are copied into catalogs. Ingested files are data; their scripts, workflow
files, and build plugins are never executed.

Storage is a per-catalog preservation decision. Azure documentation uses
`contentStorage: git`: accepted flat Markdown, navigation, source revisions,
licenses, and notices remain in this repository so builds do not depend on the
upstream repository remaining available. The current Azure AI Search catalog
preserves its declared selection and exclusions. CAP's larger bulk collections
use workspace storage, with source objects and accepted snapshots backed up
separately as described in [CAP ingestion](caselaw.md). Source availability risk
favors Git storage even when a source adapter supports on-demand preparation.

The pipeline rejects symlinks, path traversal, Windows special paths, case-folded
filename collisions, incomplete GitHub listings, unrecognized license terms,
changed nonstandard notices,
unlicensed files, oversized downloads, empty snapshots, and excessive deletions.
Deletion review can explicitly allow an otherwise blocked replacement with
`--allow-deletions`. The previous snapshot remains available until staging and
validation complete. If a process is killed during the directory swap, its
`.work/sync/*/previous/` directory provides recovery; the swap is not a filesystem
transaction across multiple directories.

Markdown reference edits are shared Squisq functionality. This repository supplies
source-specific mappings, selects the image policy, and preserves source provenance.
The temporary `vendor/squisq` bridge is generated from the sibling Squisq change
until it is available in a published package. See its NOTICE for regeneration.

Supported free licenses are classified automatically from their actual license
texts before content is accepted. The assessment and full license files travel
with the snapshot and archive. See CONTENT-LICENSES.md for the policy.

Document conversion is deterministic for pinned converter inputs. Image removal,
HTML sanitization, link rewriting, and include expansion are recorded as
modifications. Source content is not summarized or rewritten by a language model.

PDF conversion extracts existing text; scanned PDFs need OCR before import. No
OCR model is invoked automatically. Complex layouts require reviewing the resulting
Markdown. Conversion errors and warnings prevent applying an import.

Wikipedia revision IDs pin article revisions, but rendered content can change when
templates change. Provenance therefore includes the rendered HTML digest as well.
The normalized Markdown snapshot in Git is the reproducible build input; this
repository does not archive the raw rendered HTML or promise it can be refetched
byte-for-byte from Wikipedia later.

Nightly GitHub schedules are best effort. Use manual workflow dispatch to catch up
after a missed or disabled schedule. GitHub trees are fetched on each sync;
immutable raw downloads are cached under `.work/source-cache/` and checked against
Git blob hashes. Four GitHub downloads may run concurrently. Content and legal-evidence
hashes prevent no-op commits. Wikipedia batches title/revision lookups serially and
downloads canonical, CDN-cached article pages with eight workers and at most eight
requests per second, within Wikimedia's website limits. Each page's embedded
revision and page ID are checked; an edit between lookup and download is recorded
using the revision actually rendered. Website downloads honor robots.txt and
Retry-After. A checked local render cache permits resuming interrupted
syncs; it expires after 24 hours because templates can change independently of article
revision IDs. Canonical page IDs deduplicate redirects and repeated daily mentions.

CAP is a bulk-download source. Its documentation explicitly invites downloading
volume ZIPs, while static.case.law's robots.txt disallows website crawling.
The bounded adapter downloads explicit ZIPs and licensing evidence. State
discovery also uses the published root and per-volume JSON metadata indexes;
it does not crawl HTML directory listings or case pages. Archives and metadata
are pinned by SHA-256 and cached by digest. The state pipeline uses four bounded
acquisition/conversion workers by default, with resumable case statuses.
Expanded byte budgets, exact case counts, safe entries, complete JSON/HTML pairs,
matching metadata, unique IDs, and unchanged terms are required. Full source-text
and link audits gate package planning. CAP bodies and normalized Markdown remain
outside Git. See [CAP ingestion](caselaw.md).
