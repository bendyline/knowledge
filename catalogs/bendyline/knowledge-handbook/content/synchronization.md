---
id: synchronization
title: Source synchronization
order: 2
---

# Source synchronization

Synchronization refreshes a catalog from a reviewed public source. A complete
snapshot is staged before replacing the previous content, so a failed download
does not delete existing documents.

GitHub sources select explicit repository paths at a fixed commit for each run.
License files are compared with the hashes approved in the manifest. Wikipedia
sources select seed pages and their linked articles, recording each revision.

Squisq converts supported input documents to Markdown and edits links and image
references according to catalog policy. Links to included pages use local paths;
other links retain an upstream destination. Images may be omitted while keeping
their alternative text.

Large deletions and local edits to synchronized content stop the update for
review. Manual catalogs remain editable directly in Git.
