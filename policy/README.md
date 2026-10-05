# Standard open-license policy

`license-references.json` contains SPDX reference texts pinned to the recorded
license-list-data revision, plus Creative Commons' own plaintext 4.0 renderings.
Each entry records its source URL and SHA-256. License texts remain their
respective issuers' texts; this collection does not change their terms.

`node scripts/update-license-references.mjs <SPDX-commit-SHA>` refreshes the
references explicitly. Review changes to this policy data along with classifier
tests; ordinary source synchronization does not update the reference policy.

The classifier tolerates formatting/punctuation and supported copyright-header
variations. It compares the complete remaining text, including Unicode letters;
it does not accept licenses merely because they contain a familiar license name.
This is a deliberately bounded matcher, not a full implementation of the SPDX
matching specification. Unknown variants retain the manual-assessment path.
