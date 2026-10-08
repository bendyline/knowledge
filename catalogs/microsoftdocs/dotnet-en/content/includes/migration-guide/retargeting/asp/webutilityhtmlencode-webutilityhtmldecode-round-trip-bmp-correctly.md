### WebUtility.HtmlEncode and WebUtility.HtmlDecode round-trip BMP correctly

#### Details

For applications that target the .NET Framework 4.5, characters that are outside the Basic Multilingual Plane (BMP) round-trip correctly when they are passed to the [System.Net.WebUtility.HtmlDecode(System.String)](https://learn.microsoft.com/search/?terms=System.Net.WebUtility.HtmlDecode(System.String)) methods.

#### Suggestion

This change should have no effect on current applications, but to restore the original behavior, set the `targetFramework` attribute of the `<httpRuntime>` element to a string other than "4.5". You can also set the `unicodeEncodingConformance` and `unicodeDecodingConformance` attributes of the `<webUtility>` configuration element to control this behavior independently of the targeted version of the .NET Framework.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.5 |
| Type | Retargeting |

#### Affected APIs

- [System.Net.WebUtility.HtmlEncode(System.String)](https://learn.microsoft.com/search/?terms=System.Net.WebUtility.HtmlEncode(System.String))
- [System.Net.WebUtility.HtmlEncode(System.String,System.IO.TextWriter)](https://learn.microsoft.com/search/?terms=System.Net.WebUtility.HtmlEncode(System.String%2CSystem.IO.TextWriter))
