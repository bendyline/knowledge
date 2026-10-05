# Temporary Squisq compatibility bridge

`contentReferences.mjs`, `docfxMarkdown.mjs`, and `condenseMarkdown.mjs` are generated from the new
`packages/core/src/markdown/contentReferences.ts`, `docfxMarkdown.ts`, and `condenseMarkdown.ts` modules in the sibling Squisq
repository. Copyright (c) 2026 Bendyline; MIT License (see LICENSE.txt).

The shared implementation belongs to Squisq. This checked-in bridge lets local
commands and GitHub Actions run against the current published Squisq packages
before that API is released. It delegates parsing/serialization to Squisq and
contains no repository-specific URL resolution.

Regenerate with `node scripts/vendor-squisq.mjs ../squisq`. `source.json` records
the source digest. After Squisq publishes the API, replace the bridge import with
`@bendyline/squisq/markdown` and remove this directory and generator.
