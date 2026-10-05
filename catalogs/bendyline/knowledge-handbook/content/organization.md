---
id: organization
title: Catalog organization
order: 1
---

# Catalog organization

A catalog is an independently versioned collection of knowledge. Catalogs live
in `catalogs/<organization>/<catalog>/`. The organization groups related sources;
the catalog gives one collection a stable identity.

The `content/` folder holds normalized Markdown documents, optional YAML
metadata, and approved image assets. Files can be added, changed, and removed
as the catalog evolves. Raw HTML, PDF, and DOCX inputs are converted during
import or synchronization, before content is checked into Git.

The catalog manifest describes its identity, sources, licensing, and publishing
targets. Source revision records and attribution are kept beside `content/`.

See [source synchronization](synchronization.md) and [catalog publishing](publishing.md).
