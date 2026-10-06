# U.S. Reports volumes 347–349 — Caselaw Access Project pilot

This collection combines every processed CAP case record in these source ZIPs
into one Gezk archive:

- <https://static.case.law/us/347.zip> — 690 records
- <https://static.case.law/us/348.zip> — 1,028 records
- <https://static.case.law/us/349.zip> — 424 records

The 2,142 records include opinions and brief orders. A case can contain multiple
opinions. Coverage follows the three source books and is not a claim of complete
court-term, national, or current-law coverage. The original `caselaw/us-347`
pilot overlaps this collection and is retained as a comparison baseline.

The President and Fellows of Harvard College designate CAP's caselaw data and
metadata CC0 1.0 Universal. See <https://case.law/terms/> (effective March 13,
2024), LICENSES/CC0-1.0.txt, and the assessment generated in the prepared
snapshot's LICENSES/ directory and included in each archive. Harvard and
CAP request credit and unrestricted sharing of improvements as community norms;
these are voluntary requests, not attribution or share-alike license conditions.
Credit: Caselaw Access Project, Harvard Law School Library.

CAP disclaims warranties and clearance of third-party rights. CAP documents
removing copyrighted headnotes from relevant source material. This import uses
the processed case JSON and HTML; it does not import original vendor TARs,
scanned images, PDFs, website prose, or website software. Other CAP website text
is CC BY-SA 4.0; its software license does not license the case data. The terms
template is checked by hash; only the assessment and its source references are
included here, not a copy of the website text.

Transformations: case HTML is normalized to Markdown using Squisq, with explicit
opinion headings, safe local anchors, source metadata and citation aliases.
In-collection citations link across source-volume boundaries. Other citations
link to CAP. Case IDs remain stable; duplicate CAP IDs stop import. Topic labels
come from case-level jurisdiction and court metadata, with decision years below
them. Reporter and source volume remain in each case's metadata and provenance.
No language-model summarization or OCR correction is performed. The complete
upstream citation graph and OCR page-coordinate metadata are not separately
indexed. Upstream footnote return links with absent targets retain their text;
each adjustment is recorded in case metadata and provenance.

The source text can contain OCR errors and historical language. Opinions and
dissents are historical records; inclusion does not indicate that a case is still
good law. Use the linked sources to inspect originals. Corrections or withdrawal
requests must account for previously published copies, not just the accepted snapshot.

The repository's MIT license covers its pipeline code, not the imported case
data. Source bodies and generated Markdown live outside Git under .work/;
the source definition, notices, and retrieval checks are versioned.
Publication is disabled for this pilot.
