### System.Uri.IsWellFormedUriString method returns false for relative URIs with a colon char in first segment

#### Details

Beginning with the .NET Framework 4.5, [System.Uri.IsWellFormedUriString(System.String,System.UriKind)](https://learn.microsoft.com/search/?terms=System.Uri.IsWellFormedUriString(System.String%2CSystem.UriKind)) will treat relative URIs with a `:` in their first segment as not well formed. This is a change from [System.Uri.IsWellFormedUriString(System.String,System.UriKind)](https://learn.microsoft.com/search/?terms=System.Uri.IsWellFormedUriString(System.String%2CSystem.UriKind)) behavior in the .NET Framework 4.0 that was made to conform to RFC3986.

#### Suggestion

This change (like many other URI changes) will only affect applications targeting the .NET Framework 4.5 (or later). To keep using the old behavior, target the app against the .NET Framework 4.0. Alternatively, scan URI's prior to calling [System.Uri.IsWellFormedUriString(System.String,System.UriKind)](https://learn.microsoft.com/search/?terms=System.Uri.IsWellFormedUriString(System.String%2CSystem.UriKind)) looking for `:` characters that you may want to remove for validation purposes, if the old behavior is desirable.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Retargeting |

#### Affected APIs

- [System.Uri.IsWellFormedUriString(System.String,System.UriKind)](https://learn.microsoft.com/search/?terms=System.Uri.IsWellFormedUriString(System.String%2CSystem.UriKind))
