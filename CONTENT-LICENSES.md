# Content licenses

The root MIT license covers this repository's pipeline code and original project
documentation. It does not relicense third-party material.

The root `LICENSE` is also the Hugging Face dataset's `LICENSE`: general MIT
terms with their scope first, followed by a per-catalog license list generated
from the manifests. Run `npm run licenses` after adding a catalog or changing
its license metadata, then commit the updated file. `npm run check` detects
stale entries. Each new catalog publication uploads the same file to the dataset
root alongside the immutable release. Earlier release license records remain
unchanged. Catalogs are listed even before their first compiled publication;
Wikipedia's quarterly package IDs inherit their source catalog's licenses.

Every enabled catalog must have an automatic or recorded license assessment, complete license
texts, attribution, and rules assigning every content file to a license record.
The catalog NOTICE must explain mixed licensing, including code samples embedded
inside otherwise licensed documentation. Per-file rules do not remove the need
to account for embedded works.

Imported content is redistributed as soon as it is committed to this public
repository. Licensing checks therefore run before synchronization applies a
snapshot, as well as before building and publishing. The checks enforce recorded
decisions. Supported standard free licenses are accepted automatically; unknown
or restricted terms do not become acceptable merely because a repository is public.

Catalogs with `contentStorage: workspace` keep source bodies and generated
evidence outside Git. Fresh-checkout validation checks their definitions and
static notices; preparation and build enforce the same full licensing checks as
checked-in catalogs. Each compiled archive carries the accepted assessment,
license texts, notices, and per-document provenance.

For `licensing.status: automatic` with `policy: standard-open-v1`, actual upstream
license texts are compared to bundled SPDX and Creative Commons references.
The policy accepts MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC, CC0-1.0,
CC-BY-3.0/4.0, and CC-BY-SA-3.0/4.0 when their terms match. Formatting and MIT
copyright-holder variations are allowed; added conditions are not. The assessment
stores source hashes, reference URLs, and required attribution, modification
notices, and share-alike obligations. Adaptations retain the source license.
No human sign-off is required for these recognized cases.

NC and ND Creative Commons variants are not unrestricted free licenses and are
not automatically approved for this editable, publicly redistributable collection.
Other licenses can be added with their matching rules and obligation handling.
Manual assessments remain available for licenses outside this supported set.

Nonstandard source notices remain pinned by SHA-256. A changed notice stops the
import so source-specific exceptions can be reassessed. Source files not covered by the
license policy are rejected. Wikimedia text retains article/revision attribution,
history links, modification notices, and its applicable share-alike license.
Wikipedia images are omitted in the initial adapter.
Wikipedia's automatic assessment also verifies the edition's `rightsinfo` API
declaration against the expected CC BY-SA 4.0 URL. That evidence, the standard
license text, and article-level provenance accompany the snapshot and archive.

CAP's case data and metadata use CC0-1.0. Its adapter checks the complete current
terms template against the hash recorded in `src/caselaw-policy.mjs`; a changed
template requires reassessment before importing. The generated assessment
records the source URLs, effective date, hash, scope, and community norms,
without copying the separately licensed website prose. CC0 has no attribution
obligation; source credit and the repository's retention of notices remain
voluntary provenance practices. CC0-only archives set `attributionRequired` to
false. This does not waive third-party rights or warrant the accuracy of OCR.
State collection parts additionally carry the exact frozen case selection and
root/index hashes. The shared corpus stays in `.work/`; every generated part
receives its own CC0 text, assessment, notices, and source provenance. Collection
configuration and original documentation remain MIT. Collection publishing is
disabled and needs a separate distribution integration before public release.

Builds ship the catalog NOTICE, full license texts, and imported provenance inside
`LICENSES/` in each `.gezk`. A single dataset-wide MIT tag would be incorrect for
a mixed collection: the Hugging Face card must explain the per-catalog licenses.

If a release needs withdrawal, stop syncing that source, yank its version through
a reviewed Gilde PR, and follow the host's removal process where required.
Deleting a file from the current Git tree does not remove earlier public copies.
