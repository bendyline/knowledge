### Unicode standard version 8.0 categories now supported

#### Details

In .NET Framework 4.6.2, Unicode data has been upgraded from Unicode Standard version 6.3 to version 8.0.  When requesting Unicode character categories in .NET Framework 4.6.2, some results might not match the results in previous .NET Framework versions.  This change mostly affects Cherokee syllables and New Tai Lue vowels signs and tone marks.

#### Suggestion

Review code and remove/change logic that depends on hard-coded Unicode character categories.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.6.2 |
| Type | Runtime |

#### Affected APIs

- [System.Char.GetUnicodeCategory(System.Char)](https://learn.microsoft.com/search/?terms=System.Char.GetUnicodeCategory(System.Char))
- [System.Globalization.CharUnicodeInfo.GetUnicodeCategory(System.Char)](https://learn.microsoft.com/search/?terms=System.Globalization.CharUnicodeInfo.GetUnicodeCategory(System.Char))
- [System.Globalization.CharUnicodeInfo.GetUnicodeCategory(System.String,System.Int32)](https://learn.microsoft.com/search/?terms=System.Globalization.CharUnicodeInfo.GetUnicodeCategory(System.String%2CSystem.Int32))

<!--

#### Affected APIs

- `M:System.Char.GetUnicodeCategory(System.Char)`
- `M:System.Globalization.CharUnicodeInfo.GetUnicodeCategory(System.Char)`
- `M:System.Globalization.CharUnicodeInfo.GetUnicodeCategory(System.String,System.Int32)`

-->
