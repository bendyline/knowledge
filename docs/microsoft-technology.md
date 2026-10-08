# Microsoft technology preservation catalogs

Microsoft announced that affected Microsoft Learn public documentation repositories
are expected to retire by the end of December 2026:
[Microsoft announcement](https://techcommunity.microsoft.com/blog/skills-hub-blog/changes-to-microsoft-learn%E2%80%99s-public-documentation-repositories/4554909).
This collection preserves selected, licensed source snapshots in Git before those
repositories become unavailable. It is independent of Microsoft and does not
claim that Microsoft Learn itself is going away.

## Organization and stages

Use the `Microsoft technology:` name prefix and Gilde's `technology` category.
Each broad technology area is a separate, independently versioned Gezk catalog;
there is no single enormous archive that must be downloaded to use one area.
The existing Azure AI Search catalog remains available alongside these catalogs.

| Stage | Catalog | Official source | Content scope |
| --- | --- | --- | --- |
| 1 | `microsoftdocs/dotnet-en` | `dotnet/docs` | .NET, C#, F#, Visual Basic, architecture, and selected source examples |
| 1 | `microsoftdocs/entity-framework-en` | `dotnet/EntityFramework.Docs` | EF Core, EF6, and complete selected source examples |
| 1 | `microsoftdocs/powershell-en` | `MicrosoftDocs/PowerShell-Docs` | Conceptual and versioned command reference documentation |
| 1 | `microsoftdocs/windows-server-en` | `MicrosoftDocs/windowsserverdocs` | Windows Server, Hyper-V Server, and shared includes |
| 1 | `microsoftdocs/sql-server-en` | `MicrosoftDocs/sql-docs` | SQL Server, Azure SQL, data migration, and selected source examples |
| 2 | `microsoftdocs/aspnet-core-en` | `dotnet/AspNetCore.Docs` | ASP.NET Core, Blazor, MVC, Razor Pages, and selected source examples |
| 2 | `microsoftdocs/windows-apps-en` | `MicrosoftDocs/windows-dev-docs` | Windows app development, WinUI, UWP, developer tools, and selected examples |
| 2 | `microsoftdocs/microsoft-365-en` | `MicrosoftDocs/microsoft-365-docs` | Administration, enterprise deployment, and Microsoft 365 Copilot |
| 2 | `microsoftdocs/azure-apps-compute-en` | `MicrosoftDocs/azure-docs` | Applications, compute, integration, messaging, and communication services |
| 2 | `microsoftdocs/azure-network-security-en` | `MicrosoftDocs/azure-docs` | Networking, identity, access control, and security |
| 2 | `microsoftdocs/azure-data-aiot-en` | `MicrosoftDocs/azure-docs` | Data integration, analytics, storage, and IoT |
| 2 | `microsoftdocs/azure-management-hybrid-en` | `MicrosoftDocs/azure-docs` | Resource management, governance, cost, backup, migration, and hybrid infrastructure |
| 2 | `microsoftdocs/azure-ai-platform-en` | `MicrosoftDocs/azure-ai-docs` | AI services, Foundry, Machine Learning, Search, and Agent Framework |

Source selection lives in each catalog's `manifest.json`. Normalized Markdown is
stored in `catalogs/microsoftdocs/<catalog>/content/` with `contentStorage: git`.
Source ZIPs are transport caches under `.work/github-archives/`; the checked-in
Markdown, provenance, and license evidence are the durable preservation copy.
This is a selected source snapshot, not a mirror of Git history, images, binaries,
generated API YAML, or every dependency mounted by Microsoft's publishing system.

Stage 2 has its own pinned license/notice inventory. The four `azure-docs`
catalogs partition the service folders present at the pinned commit; the exact
folder assignments are in `source.paths`. They share copies of the root
`includes/` fragments so those references can be expanded during normalization.
Include fragments are retained in Git but excluded from standalone indexing.
The broad Azure AI catalog intentionally overlaps the smaller Azure AI Search
catalog, which remains a separately usable selection with its own source pin.

Repository boundaries are not the same as Microsoft's product boundaries.
Other repositories mounted by Microsoft's publishing configuration (including
separate Windows Terminal/WSL sources, samples, and Azure services moved out of
`azure-docs`) are not implied to be preserved. Cross-family or external includes
outside a catalog's selection are explicitly reported in that catalog's import
report. ASP.NET Core excludes bundled third-party browser libraries and generated
dependency/build directories; complete selected application source files remain.

## Preserved snapshot, 2026-10-07

All five first-stage catalogs have normalized content stored in Git-backed
`content/` directories. The counts include shared include fragments and code
documents; build exclusions remove include fragments from standalone indexing.
Their Markdown totals 260,389,711 bytes (260.4 MB), excluding provenance and
license files. The largest individual Markdown file is 1,385,511 bytes.

| Catalog | Markdown files | Complete code files included |
| --- | ---: | ---: |
| .NET and C# | 20,779 | 6,905 |
| Entity Framework | 1,158 | 848 |
| PowerShell | 3,089 | 0 |
| Windows Server | 2,594 | 0 |
| SQL Server and Azure SQL | 14,666 | 230 |
| **Total** | **42,286** | **7,983** |

Source dependencies outside these selections remain explicit gaps: .NET has
203 code-reference occurrences and 22 includes; PowerShell has 10 code references;
Windows Server has one include; SQL Server has 234 code references and 103 includes.
Entity Framework has none. These count references, not unique missing files or
missing articles. See each catalog's `LICENSES/import-report.json` for the exact
article and target. The .NET snapshot also preserves two malformed references as
code. Metadata retained as code affects one .NET, five PowerShell, and 19 Windows
Server documents; their article bodies remain present.

The eight second-stage catalogs add 43,143 Markdown files totaling 342,926,275
bytes (342.9 MB), including 12,061 complete code files. The largest individual
Markdown file is 1,000,496 bytes. Source-selection and strict text-decoding audits
passed for all selected files; Git's ignore rules exclude none of the preserved
catalog files.

| Catalog | Markdown files | Complete code files included |
| --- | ---: | ---: |
| ASP.NET Core | 12,940 | 11,420 |
| Windows app development | 2,808 | 631 |
| Microsoft 365 | 1,309 | 0 |
| Azure applications and compute | 6,964 | 2 |
| Azure networking and security | 4,021 | 2 |
| Azure data, analytics, storage, and IoT | 5,796 | 3 |
| Azure management and hybrid | 4,726 | 1 |
| Azure AI, Foundry, and Machine Learning | 4,579 | 2 |
| **Total** | **43,143** | **12,061** |

The import reports also record the following reference occurrences and metadata
exceptions. Missing targets include separately mounted sample repositories,
shared publishing content, and references outside each catalog's selection.
Counts include retained shared fragments; they are not counts of missing articles.
Metadata exceptions retain the original values as code alongside the article body.

| Catalog | Unavailable code references | Unavailable includes | Metadata retained as code |
| --- | ---: | ---: | ---: |
| ASP.NET Core | 3,129 | 0 | 0 |
| Windows app development | 820 | 0 | 0 |
| Microsoft 365 | 0 | 5 | 0 |
| Azure applications and compute | 893 | 707 | 108 |
| Azure networking and security | 266 | 923 | 44 |
| Azure data, analytics, storage, and IoT | 986 | 640 | 47 |
| Azure management and hybrid | 129 | 279 | 44 |
| Azure AI, Foundry, and Machine Learning | 1,832 | 689 | 22 |

Azure data also retains one malformed include marker as visible code. Exact
source paths and targets are in each catalog's `LICENSES/import-report.json`.
The local snapshot summary is `.work/microsoftdocs-stage2/snapshot-summary.json`.

## Import and normalization

The manifests pin full source commit IDs. .NET, Entity Framework, and PowerShell
use `source.transport: archive` to fetch one commit-pinned GitHub ZIP. Windows
Server and SQL Server use `files` with eight concurrent downloads, avoiding large
image collections outside the selected scope. All second-stage catalogs use that
same file transport. Both transports verify selected
files against their Git blob SHA and cache downloads locally. The ZIP reader
applies compressed and expanded size limits and never extracts or executes
downloaded files. Legal texts are checked before content is accepted.
Preservation globs match without case sensitivity on both Windows and Linux.
DocFX project roots are discovered from the source tree's `docfx.json` locations;
`source.docfxRoot` is the fallback for selections without a project configuration.

```sh
npm run sync -- --catalog microsoftdocs/entity-framework-en --apply
npm run validate -- --catalog microsoftdocs/entity-framework-en
npm run licenses
```

The opt-in `normalization.docfxReferences: preserve` profile uses Squisq to
convert DocFX presentation and reference syntax during sync:

- Available, licensed Markdown includes expand into the document.
- Local UID references become local links; external UIDs link to Learn search.
  References with different filename casing resolve to the preserved file's
  actual spelling; ambiguous source paths fail the import.
- Other local links resolve within the snapshot where possible. Unselected
  relative targets retain a commit-pinned GitHub source link; root-relative
  Microsoft Learn links retain the Learn website destination.
- Code examples link to complete preserved source files under `content/_code/`.
  Those files are fenced Markdown with their original MIT attribution. Snippet
  selectors remain visible in the link label; they are not silently treated as
  equivalent to the whole source file.
- Images are omitted with descriptive alt text retained.
- Unsupported presentation markers remain visible as inline code. Invalid source
  YAML is retained as a fenced metadata section, without interpreting it as YAML.
  The .NET manifest also moves metadata larger than 12,000 bytes into that section
  so the original values survive Gezk's document metadata size limit.
- Malformed upstream reference syntax is retained visibly as code and reported.
  Text code files with explicit UTF-16 byte-order marks are decoded to UTF-8;
  undecodable input fails instead of substituting replacement characters.
- Missing external code or includes are explicitly labeled in the article and
  recorded in `LICENSES/import-report.json`. Their bodies are not present in the
  selected snapshot, so they are not invented or silently represented as copied.

Second-stage catalogs additionally use `normalization.docfxProfile: rendered-v1`
(or `rendered-v2` for Azure data). These profiles leave include examples inside
HTML comments literal and parse
DocFX version markers without treating successive sections as nested Markdown
directives. Squisq flattens row/column indentation while preserving fenced code
and rechecks directives exposed by removing presentation containers. The source
adapter canonicalizes whitespace on closing YAML metadata delimiters for Gezk's
reader. Empty source fragments receive an explanatory Markdown comment and
retain their original source hash. The Squisq implementation and digest are
vendored separately, so the first-stage snapshot identities remain unchanged.
The Azure data profile also preserves malformed include markers as visible code
and respects comments that extend to the end of a file. Repository authoring
instructions such as Azure AI's `AGENTS.md` are excluded from product content.

Every content file has its original URL, revision, input hash, output hash, license,
and transformation record in `provenance.jsonl` and `sources.lock.json`. Exact
upstream license texts, trademark notices, and source snapshot inventories are
retained in `LICENSES/`. Documentation is CC BY 4.0; code examples are MIT. The
PowerShell Markdown rendering of CC BY 4.0 is an explicitly pinned reference
variant; extra restrictions still fail automatic recognition.

## Build and refresh

The local validation builds at version `2026.10.11` use real
`bge-small-en-v1.5@1` embeddings and the published Gezk 0.6 toolchain. Each archive
passed deep integrity and license checks, one title-search probe, and one semantic
retrieval probe. These are local validation artifacts; publication remains disabled.

| Catalog | Indexed documents | Chunks | Gezk size (decimal MB) |
| --- | ---: | ---: | ---: |
| .NET and C# | 20,170 | 131,793 | 366.9 |
| Entity Framework | 1,157 | 9,413 | 27.8 |
| PowerShell | 3,079 | 76,602 | 149.2 |
| Windows Server | 2,562 | 28,073 | 80.7 |
| SQL Server and Azure SQL | 13,848 | 148,351 | 393.2 |

Artifacts, checksums, license bundles, and verification reports are under
`.work/releases/<catalog-id>/2026.10.11/`. The compact local summary is
`.work/microsoftdocs/build-results.json`. All five individual archives are below
the GitHub release asset limit. `npm run check` passes with 105 tests passed and
one skipped; the Squisq DocFX tests and core type check also pass.

```sh
npm run build -- --catalog microsoftdocs/entity-framework-en --version 2026.10.11
npm run verify -- --catalog microsoftdocs/entity-framework-en --version 2026.10.11 --semantic
```

All eight second-stage catalogs have also been built with real
`bge-small-en-v1.5@1` embeddings using DirectML locally. Deep archive integrity,
exact license-text checks, title search, and semantic search passed for each
final artifact. Semantic verification uses the standard CPU query embedder.

| Catalog | Version | Indexed documents | Chunks | Gezk size (decimal MB) |
| --- | --- | ---: | ---: | ---: |
| ASP.NET Core | 2026.10.14 | 12,339 | 49,928 | 163.4 |
| Windows app development | 2026.10.14 | 2,791 | 35,751 | 98.5 |
| Microsoft 365 | 2026.10.14 | 1,246 | 14,792 | 43.3 |
| Azure applications and compute | 2026.10.15 | 4,307 | 79,469 | 214.9 |
| Azure networking and security | 2026.10.14 | 2,311 | 42,748 | 117.6 |
| Azure data, analytics, storage, and IoT | 2026.10.14 | 3,976 | 69,497 | 191.7 |
| Azure management and hybrid | 2026.10.14 | 2,996 | 52,893 | 141.1 |
| Azure AI, Foundry, and Machine Learning | 2026.10.14 | 2,843 | 76,488 | 194.1 |

These final versions are under `.work/releases/<catalog-id>/<version>/`, with a
combined summary in `.work/microsoftdocs-stage2/build-results.json` and acceptance
audit in `.work/microsoftdocs-stage2/final-audit.json`. Each archive is below the
GitHub release asset limit. Earlier trial versions are not the final artifacts.

The applications/compute catalog has two semantic probes: one targets the
trigger/binding concepts article, and another targets the Functions overview's
capabilities, languages, and hosting options. A trigger-focused query returns
specialized articles ahead of the general overview; the overview-focused query
retrieves that overview first. The other catalogs each have one semantic probe.
These are retrieval smoke tests, not a comprehensive quality benchmark.

```sh
npm run sync -- --catalog microsoftdocs/azure-apps-compute-en --apply
npm run build -- --catalog microsoftdocs/azure-apps-compute-en --version 2026.10.15
npm run verify -- --catalog microsoftdocs/azure-apps-compute-en --version 2026.10.15 --semantic
```

Folder navigation groups the preserved documentation by technology and source
path. Includes remain preserved in Git but are not indexed as standalone articles.
Measure each real archive against the existing GitHub asset limit before enabling
publication. Existing publish/Gilde Actions accept these catalog selectors.

Publishing is now enabled for all 13 preservation catalogs. Their first public
release batch uses `2026.10.16`, rebuilt and verified from the clean committed
checkout; the validation artifacts listed above remain historical. The source
snapshots need no re-download for publication, and existing embedding caches can
be reused. Publication updates both archive hosts and proposes Gilde definitions.
Gilde PR merges, its npm release, and site deployment remain separate steps in
[the release guide](releasing.md#complete-gilde-discovery).

Refreshing a preservation catalog is an
explicit update to `source.ref`, followed by sync, notice review, validation, and
a new version. A retired or inaccessible upstream causes sync to fail while
retaining accepted content; it never means the local corpus should be deleted.
