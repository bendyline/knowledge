# Releasing

The starter supports deliberate releases of one catalog/version at a time.
Automatic changed-catalog selection and version allocation are not enabled yet.

## First public repository setup

The repository can be made public before catalog publishing is enabled. Keep
`publish.enabled: false` until the destination accounts and release path are
ready. The MIT code license, per-catalog content licenses and notices,
`CONTRIBUTING.md`, and `SECURITY.md` should accompany the first commit.
`.work/`, model and embedding caches, credentials, and `.gezk` files are excluded
from Git; publish compiled archives through release hosts instead.

1. Commit and push the reviewed files to `main`, then run the Windows and Linux
   validation workflow. Publishing requires an actual source commit and a clean
   checkout; local artifacts built before the initial commit are validation
   artifacts, not publication candidates.
2. A repository administrator changes visibility in **Settings > General >
   Danger Zone > Change repository visibility**. Maintainer access alone cannot
   change visibility. Keep Issues enabled for catalog suggestions.
3. Add actual maintainers to `.github/CODEOWNERS`. Configure a ruleset for `main`
   requiring reviewed PRs and the validation jobs after their first successful
   run. Review Actions permissions, including allowing Actions to create PRs if
   sync uses the built-in token.
4. Create the public Hugging Face dataset `Bendyline/knowledge`. Its dataset card
   must explain that code is MIT but catalog content has individual licenses,
   including Wikipedia CC BY-SA 4.0 and the Azure documentation/code licenses.
   This is a dataset repository, not an npm package or Hugging Face model.
5. In **Settings > Environments**, create `knowledge-publishing`, restrict it
   to `main`, and configure the desired reviewer protection. Add `HF_TOKEN` and
   `GILDE_PR_TOKEN` there using the scopes below. Put the optional sync token
   `KNOWLEDGE_BOT_TOKEN` in repository Actions secrets because the sync job does
   not use the publishing environment. GitHub supplies its own `GITHUB_TOKEN`;
   do not create a separate release token for the workflow.
6. Choose the build runner using the repository variables described below.
   Prove a small handbook or Azure catalog release before enabling the full
   Wikipedia release. Run nightly sync manually once and review its PR before
   relying on the schedule.

The current workflow expects an HF token. Use a fine-grained token with write
access limited to the destination dataset, following the
[Hugging Face token guidance](https://huggingface.co/docs/hub/security-tokens).
Token values belong in secret settings, never in manifests or Git.

## Wikipedia publication prerequisites

The validated full-corpus `2026.10.3` archive is **3,597,102,630 bytes** (3.60 GB),
with **1,528,090 chunks** and 15,732 documents. New builds select the latest
three months or a dated quarter from that shared corpus. See
[news packaging](wikipedia-news.md) for the available packages and coverage gaps.

- The shared daily TOC needs **Gezk 0.7 / index schema 4**. The pinned npm
  packages (`@bendyline/gezel-knowledge` 1.2.2 and `@bendyline/gezk` 1.0.2)
  support 0.6/schema 3. Release the updated compiler, reader, format package,
  and relevant Gezel schemas, then update the dependency lock here and any
  Gilde validation dependencies. Set the catalog's `minGezelVersion` to the
  first compatible reader release. The local sibling override is not a
  reproducible hosted Actions setup.
- GitHub limits individual release assets to
  [under 2 GiB](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases#storage-and-bandwidth-quotas).
  The full-corpus archive remains too large. Build the smaller latest or
  quarterly packages using `--package latest` or `--package YYYY-qN`; the
  workflow exposes the same optional `package` input for build, publish, and
  Gilde. Each has a separate release directory and catalog identity, with
  `latest` retaining the original catalog ID. Publication still checks the
  actual size before either upload, and Gilde requires both receipts. If a
  future quarter exceeds the limit, a smaller packaging window or multipart
  support will still be needed.

The `latest` package `2026.10.4` has been built and validated at
**1,582,321,017 bytes** (1.58 GB), below the limit. The other complete quarters
have package plans and compiler regression coverage but have not yet been built
as production artifacts. Account setup, published draft-format dependencies,
and rebuilding from a committed, publishing-enabled manifest are still required.

Keep the Wikipedia catalog's publishing flag disabled until the toolchain is
released and the intended packages are built, verified, and within the size limit.
After enabling publishing in a committed manifest, build a new immutable version
from that commit and verify it. Do not edit an old release record to inject a
source commit, change its targets, or reuse its version with different inputs.

## Publish a catalog

1. Create a public Hugging Face dataset such as `Bendyline/knowledge`, with a
   dataset card explaining the collection and its per-catalog licenses.
2. Make this GitHub repository public. Configure Actions and branch protection.
3. Set `publish.enabled: true` for the reviewed catalog and commit the source.
4. Build from that clean checkout with a new stable semantic version.
5. Preview publishing, then run it with `--apply` or dispatch `publish.yml`.
6. Review and merge the resulting Gilde PR through Gilde's normal process.

Credentials are environment variables or GitHub environment secrets:

| Credential | Scope | GitHub Actions location |
| --- | --- | --- |
| `HF_TOKEN` | Write access only to the destination dataset | `knowledge-publishing` environment secret |
| `GH_TOKEN` / `GITHUB_TOKEN` | Releases in the knowledge repository | Supplied automatically by the workflow |
| `KNOWLEDGE_BOT_TOKEN` | Contents and pull-request write in knowledge; optional for sync PR checks | Repository Actions secret |
| `GILDE_PR_TOKEN` | Contents and pull-request write only in `bendyline/gilde` | `knowledge-publishing` environment secret |

Prefer short-lived GitHub App installation tokens. The scripts accept standard
tokens and do not create or store credentials. If using `GITHUB_TOKEN` for sync
PRs, GitHub may require approval to run their checks. Fork PR validation has no
publishing secrets. The publishing jobs use the `knowledge-publishing` environment;
configure its protection rules in GitHub as appropriate.

Both hosts receive the same `.gezk` bytes. The archive includes all licensing
records. The Hugging Face version directory also contains the release record,
checksums, and license sidecars; GitHub gets the archive, release record, checksum,
and NOTICE assets. Downloads are streamed and hashed after upload.

Publication writes `.work/releases/<id>/<version>/published.json` after each
successful target. Retry the publish job with the original build artifact after
failure. Do not rerun a build with a new timestamp and try to overwrite the same
version. Existing remote version metadata and checksums must match on retry.
The Actions build and receipt artifacts are retained for 30 days; permanent
archive/release metadata live on the publication targets.

The Gilde job runs only after both uploads succeed. It pins the Hugging Face
artifact commit and checksum, appends the version manifest, preserves curated
identity fields, regenerates indexes, and validates the checkout before creating
a PR. If only this job fails, rerun it using the published release artifact;
there is no need to rebuild or re-upload.

For reproducibility, reuse `--created-at`, the pinned Node version, package lock,
model artifacts, and the embedding cache under `.work/embeddings/`. The compiler
is deterministic for identical vectors and inputs; floating-point inference on
different hardware is not promised to be byte-identical. No test embedder is
exposed through the CLI, and test-marked artifacts cannot be published.

Embedding vectors are cached in SQLite by profile, runtime, and input text.
Completed batches survive an interrupted build. Existing JSON cache entries
are imported when used, preserving their exact numeric values.

Windows machines with a supported DirectML GPU can set
`KNOWLEDGE_EMBEDDING_DEVICE=dml` when building. CPU remains the default, including
GitHub Actions. Both use the same pinned model graph and tokenizer; DirectML has
a separate embedding-cache namespace and is recorded in the release metadata.
Large catalogs also benefit from an appropriate Node heap setting, for example
`NODE_OPTIONS=--max-old-space-size=12288` on a machine with enough available RAM.

The publishing workflow's build job supports repository variables
`KNOWLEDGE_BUILD_RUNNER` (a runner label), `KNOWLEDGE_EMBEDDING_DEVICE`, and
`KNOWLEDGE_BUILD_NODE_OPTIONS`. They default to `ubuntu-latest`, `cpu`, and Node's
default heap. For a Windows GPU runner, use its dedicated label, `dml`, and an
appropriate heap setting. Publishing and Gilde jobs continue to run on Ubuntu.
The condensed Wikipedia corpus contains over 1.5 million chunks. Its measured
rebuild and verification took about 85 minutes using an existing DirectML cache;
the original cold build took several hours. Use a suitably provisioned runner or
build locally before publishing. The standard hosted CPU runner has not been
validated for a full Wikipedia release within the workflow's six-hour build
limit. The workflow currently does not persist model or embedding caches across
jobs, so a fresh hosted build cannot assume the measured local cache reuse.
These runner overrides apply only to the build job. Validation, publishing, and
Gilde jobs remain on their configured hosted runners; never route untrusted fork
validation to a privileged persistent runner.

Optional local signing uses `build --sign-key PATH`. Keep private keys outside the
repository. Signing-key provisioning and rotation are not automated in the starter.
