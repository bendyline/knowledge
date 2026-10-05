# Azure AI Search validation

The first real-source catalog was downloaded, normalized, built, and reopened
successfully on October 3, 2026.

| Check | Result |
| --- | --- |
| Source | MicrosoftDocs/azure-ai-docs, `articles/search` plus two Foundry includes |
| Source revision | `e8d0ac6f7ebd7fd000e287657ab9beda5bccc1fa` |
| License determination | Automatic: CC-BY-4.0 documentation, MIT code |
| Normalized snapshot | 359 Markdown files and one navigation YAML file |
| Indexed articles | 305; 54 include fragments folded into their parent articles |
| Chunks | 7,696 |
| Embeddings | Real `bge-small-en-v1.5@1` model; no test vectors |
| Archive | 21,933,752 bytes; version `2026.10.1` |
| Deep integrity validation | Passed after reopening the archive |
| Title searches | All 4 expected articles found in the top 10 |
| Semantic queries | All 3 expected articles found in the top 20 chunks |
| Repeat sync | No additions, updates, or deletions |
| Rebuild from cached embeddings | Identical archive SHA-256 |

Archive SHA-256:
`1ae4aba393e3e63b8d7e7e592e7a28ddce4e9079b8a71d7130308ab877ac7676`.

Source licenses and attribution are retained in the catalog and archive.
The generated assessment is at
`catalogs/microsoftdocs/azure-ai-search-en/LICENSES/assessment.json`.
The local Gezk and release metadata are in
`.work/releases/microsoftdocs-azure-ai-search-en/2026.10.1/`.
The detailed retrieval report is in
`.work/verification/microsoftdocs-azure-ai-search-en-2026.10.1.json`.

Eleven dependency-heavy pages are explicitly excluded in the catalog manifest;
some require shared repositories unavailable publicly, and others require external
code mounts not yet configured. Links to these pages point to Microsoft Learn.
This is a validated Search catalog, not a claim to mirror all Azure documentation.
The seven retrieval queries are regression checks, not a broad relevance benchmark.

Reproduce with the sync, build, and verify commands in the root README. Source
updates require a new version. The generated artifact has not been uploaded.

On October 5, 2026, Squisq's content-preserving condensation was applied to the
same accepted source revision. It changes table/divider formatting in 184
Markdown files, reducing the complete content folder from 6,871,127 to 6,864,403
bytes. The 359 Markdown files, navigation YAML, source URLs, licenses, and
attribution are retained. Provenance and content hashes record the additional
normalization. The archive measurements above remain for the original build;
the updated source requires a new immutable release version.
