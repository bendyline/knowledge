# Temporary Squisq compatibility bridge

`contentReferences.mjs`, `docfxMarkdown.mjs`, and `condenseMarkdown.mjs` are generated from the new
`packages/core/src/markdown/contentReferences.ts`, `docfxMarkdown.ts`, and `condenseMarkdown.ts` modules in the sibling Squisq
repository. Copyright (c) 2026 Bendyline; MIT License (see LICENSE.txt).

The shared implementation belongs to Squisq. This checked-in bridge lets local
commands and GitHub Actions run against the current published Squisq packages
before that API is released. It delegates parsing/serialization to Squisq and
contains no repository-specific URL resolution.

`docfxPreservation.mjs` is the opt-in preservation profile, generated from the
updated Squisq `docfxMarkdown.ts`. Its digest is recorded separately in
`source-preservation.json` so existing corpus normalizer identities remain
unchanged. Regenerate it with
`node scripts/vendor-squisq.mjs ../squisq --docfx-preservation`.

`docfxRendered.mjs` is the `rendered-v1` profile for second-stage preservation.
It parses DocFX markers as literal source while finding protected code/comment
spans, avoiding false nesting from sibling version blocks. Its separate digest
also covers column-layout flattening and bounded conversion passes. The digest
is recorded in `source-rendered.json`; previous snapshots keep their existing
normalizer identity. Regenerate with
`node scripts/vendor-squisq.mjs ../squisq --docfx-rendered`.

`docfxRenderedV2.mjs` and `source-rendered-v2.json` add preservation of malformed
include references and comments extending to end of file. Select this explicitly
with `rendered-v2`; previously accepted profiles remain pinned. Regenerate with
`node scripts/vendor-squisq.mjs ../squisq --docfx-rendered-v2`.

Regenerate with `node scripts/vendor-squisq.mjs ../squisq`. `source.json` records
the source digest. After Squisq publishes the API, replace the bridge import with
`@bendyline/squisq/markdown` and remove this directory and generator.
