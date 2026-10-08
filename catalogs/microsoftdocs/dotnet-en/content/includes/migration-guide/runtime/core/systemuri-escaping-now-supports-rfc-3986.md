### System.Uri escaping now supports RFC 3986

#### Details

URI escaping has changed in .NET Framework 4.5 to support [RFC 3986](https://tools.ietf.org/html/rfc3986). Specific changes include:

- [System.Uri.EscapeDataString(System.String)](https://learn.microsoft.com/search/?terms=System.Uri.EscapeDataString(System.String)) escapes reserved characters based on RFC 3986.
- [System.Uri.EscapeUriString(System.String)](https://learn.microsoft.com/search/?terms=System.Uri.EscapeUriString(System.String)) does not escape reserved characters.
- [System.Uri.UnescapeDataString(System.String)](https://learn.microsoft.com/search/?terms=System.Uri.UnescapeDataString(System.String)) does not throw an exception if it encounters an invalid escape sequence.
- Unreserved escaped characters are un-escaped.

#### Suggestion

- Update applications to not rely on [System.Uri.UnescapeDataString(System.String)](https://learn.microsoft.com/search/?terms=System.Uri.UnescapeDataString(System.String)) to throw in the case of an invalid escape sequence. Such sequences must be detected directly now.
- Similarly, expect that Escaped and Unescaped URI and Data strings may vary from .NET Framework 4.0 and .NET Framework 4.5 and should not be compared across .NET versions directly. Instead, they should be parsed and normalized in a single .NET version before any comparisons are made.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Uri.EscapeDataString(System.String)](https://learn.microsoft.com/search/?terms=System.Uri.EscapeDataString(System.String))
- [System.Uri.EscapeUriString(System.String)](https://learn.microsoft.com/search/?terms=System.Uri.EscapeUriString(System.String))
- [System.Uri.UnescapeDataString(System.String)](https://learn.microsoft.com/search/?terms=System.Uri.UnescapeDataString(System.String))

<!--

#### Affected APIs

- `M:System.Uri.EscapeDataString(System.String)`
- `M:System.Uri.EscapeUriString(System.String)`
- `M:System.Uri.UnescapeDataString(System.String)`

-->
