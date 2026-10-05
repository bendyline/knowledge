---
id: publishing
title: Publishing knowledge catalogs
order: 3
---

# Publishing knowledge catalogs

The Gezk compiler reads normalized Markdown from `content/`. It adds a topic
directory, search indexes, embeddings, source attribution, and license notices
to a `.gezk` archive.

Each release has an immutable version and a SHA-256 checksum. The same archive
is uploaded to a Hugging Face dataset and a GitHub release. Download verification
checks that both destinations serve the expected bytes.

After publication, an automated pull request proposes the catalog definition in
Gilde. Gilde pins the Hugging Face commit and the archive checksum so installation
does not depend on a changing branch. Existing Gilde curation is preserved, and
published version definitions are never overwritten.
