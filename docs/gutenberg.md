# Project Gutenberg how-to catalog

`catalogs/bendyline/how-to-books` combines two kinds of content:

- **Source books** (`books/`): every English text on Project Gutenberg's
  "Category: How To ..." bookshelf that PG marks public domain, split into
  chapter or section documents.
- **How-to guides** (`guides/`): original, task-shaped articles that cite the
  book sections they draw on. The guides are checked into Git with the catalog
  definition and licensed CC BY-SA 4.0.

The book corpus is large, so the catalog uses `contentStorage: workspace`.
Definitions, guides, notices, license texts, and retrieval checks are in Git.
Downloaded HTML and normalized book Markdown live under `.work/`.

```sh
npm run prepare-content -- --catalog bendyline/how-to-books
npm run build -- --catalog bendyline/how-to-books --version 2026.10.1
npm run verify -- --catalog bendyline/how-to-books --version 2026.10.1 --semantic
```

## Source access

Project Gutenberg's website is for human readers, and PG blocks automated
access to it. The adapter therefore reads only from a mirror's generated
collection (`source.mirror`, the equivalent of PG's `cache/epub` tree). The
schema rejects `www.gutenberg.org` as a mirror. The catalog uses PG's own
mirror, `https://gutenberg.pglaf.org/cache/epub`. Some third-party mirrors
inject banners into HTML, which would change the source bytes.

Sync downloads `feeds/pg_catalog.csv.gz` and selects `Type=Text` rows whose
`Language` includes `source.language` and whose `Bookshelves` include
`source.bookshelf`. It then downloads each book's `pg<ID>-images.html` over
three connections with gzip transfer encoding and a pause after each
download. Downloads are cached under `.work/gutenberg/cache/`: the feed for a
day and books for 30 days. An interrupted sync, or one that only changes
guides, does not need to download the bookshelf again.

`source.maxBooks` bounds the selection. `source.exclude` removes specific
ebook numbers with a recorded reason. `source.maxFailureFraction` limits how
many books may fail to download or convert. Failed books are recorded in the
selection evidence, and exceeding the budget stops the sync before anything
is applied.

## Rights and licensing

Each generated HTML edition states its U.S. copyright status in
`<meta name="dc.rights">`. Books stating "Public domain in the USA." are
included. Books that PG marks as copyrighted (distributed with the author's
permission) are excluded and listed with that reason. Book text is marked
`CC-PDM-1.0`. The automatic assessment, under `standard-open-v1`, records the
statement for every book in `LICENSES/gutenberg-selection.json`. A changed or
missing statement cannot be accepted.

PG's license allows unrestricted use of the public-domain text once its license
and all references to Project Gutenberg are removed. The normalizer therefore:

- keeps only the content between `header#pg-header` and `footer#pg-footer`,
  which hold the license and trademark text, at any nesting depth, and fails
  a book whose boundaries are missing;
- removes the smallest block that names Project Gutenberg (usually a producer
  or transcriber note), and fails a book if such a block is long;
- converts links to PG websites into plain text;
- drops any short converted paragraph that a PG reference touches, which
  catches credits that malformed HTML wraps across two paragraphs;
- excludes books whose title or creator names Project Gutenberg, such as PG's
  own manuals, because removing every reference would gut them;
- fails any section whose final Markdown, front matter included, still
  mentions Project Gutenberg, `gutenberg.org`, or `pglaf`.

Crediting PG as a source is explicitly permitted. Provenance and the NOTICE do
so, and each document's `historyUrl` is the ebook's public page. Public-domain
status is identified for the United States, as the NOTICE states.

## Conversion

Book HTML is converted with the shared Squisq normalizer in worker threads,
up to eight depending on available cores. Layout containers, including
tables whose only filled cell holds the book, are unwrapped so chapter
headings become siblings. The split level is the shallowest heading level
(h1–h4) that occurs at least three times. Sections over 80,000 characters are
split again at the next level. If no deeper headings exist, they are split at
block boundaries into parts of about 40,000 characters, titled
"(continued: <opening words>…)". Oversized wrappers are opened so those
parts can break inside them. Sections under 40 words are merged into a
neighbor. A book without usable headings is split into parts of the same size.

Section titles are "<main title>: <section name>", where the main title is the
book title before any subtitle; the full title stays in the `book` field and
the book's `_topic.yaml`. Section names come from the first heading. A heading
that only numbers the section ("CHAPTER II", "IV."), or is a lone word left by
a drop cap or byline ("THE", "BY"), takes its subject from the next heading or
a short following paragraph, giving "CHAPTER II: HOW TO GRIND AND SHARPEN
TOOLS". When no subject line follows, the first part of a dash-separated
synopsis or the chapter's opening words are used instead. After the title
page, a heading that repeats the book title gives way to the next heading.
Navigation back-links inside headings, such as "ToC", are dropped.

Some editions mark subjects with styled paragraphs instead of headings, for
example `<p class="center bold">THE GROOM.</p>`. Such short, mostly uppercase,
centered or bold paragraphs name a section that has no heading of its own, and
the parts that continue it. They never decide where a book is split. Parts of
books without any headings are titled "Part N: <opening words>…".

The normalizer also removes:

- page-number markers;
- empty `<pre>` blocks, which would become empty code fences;
- images, including those inside headings and figure wrappers, which Squisq's
  own omission does not reach: meaningful alt text is kept as text, while alt
  text that repeats a caption (in the same block or the next one) or is a
  placeholder or file name ("[Illustration]", "i013") is dropped, and a
  section that still contains an image reference fails;
- embedded media, "Click on image to view larger" notes, and rules or empty
  blocks at the start or end of a section;
- the `&#x20;` entities Squisq writes for leading spaces, outside code.

With `source.omitIndexes`, back-of-book index sections are not emitted: they
refer to printed page numbers that conversion removes. Omitted sections keep
their numbers, so no other section path changes, and links to them become
plain text. The catalog enables this, which also keeps the compiled archive
under GitHub's 2 GiB release-asset limit.

Links within a book point to the section that contains their target. Empty
anchors and rules just before a heading move with that heading, so
table-of-contents links reach the right chapter. Each document's front matter
records the book title, creators, ebook number, and section position. When a
book has no `dc.creator`, typically because it lists only an editor, the
creators come from the catalog feed.

Paths are `books/pg<ebook>/<NNN>.md` with a `_topic.yaml` naming the book and
author. Books are ordered by title in the table of contents. Section numbers
can change when PG revises an edition. Guide links are validated on every
sync, so such a change stops the sync instead of breaking a citation.

## Guides

`source.guides: true` includes `guides/**` from the catalog definition. Every
guide needs front matter with `title` and `summary`. `aliases` should list
other ways people phrase the same task. Relative links must name catalog
documents, and every guide must cite at least one `books/` section. Sync
rejects a guide that fails these checks. Editing a guide makes the prepared
snapshot stale, and build reports that `prepare-content` is needed. The
refresh reuses the download cache.

Guides follow one layout so people and models can rely on it: a short
introduction, "What you need", numbered "Steps", "From the source books"
(specific historical details, attributed), "Safety and modern practice", and
"Sources". Guides restate techniques in current language and add safety notes
where historical practice is now known to be unsafe (food preservation,
chemicals, lead, arsenic, mercury, electrical work, animal handling). They
leave out medical remedies, poisons, weapons, and explosives.
