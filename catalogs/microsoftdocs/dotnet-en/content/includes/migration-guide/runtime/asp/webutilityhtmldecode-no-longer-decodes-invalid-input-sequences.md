### WebUtility.HtmlDecode no longer decodes invalid input sequences

#### Details

By default, decoding methods no longer decode an invalid input sequence into an invalid UTF-16 string. Instead, they return the original input.

#### Suggestion

The change in decoder output should matter only if you store binary data instead of UTF-16 data in strings. To explicitly control this behavior, set the `aspnet:AllowRelaxedUnicodeDecoding` attribute of the [appSettings](../../../../docs/framework/configure-apps/file-schema/appsettings/index.md) element to `true` to enable legacy behavior or to `false` to enable the current behavior.

|  | Value |
| :--- | :--- |
| **Scope** | Minor |
| **Version** | 4.5 |
| **Type** | Runtime |

#### Affected APIs

- [System.Net.WebUtility.HtmlDecode(System.String)](https://learn.microsoft.com/search/?terms=System.Net.WebUtility.HtmlDecode(System.String))
- [System.Net.WebUtility.HtmlDecode(System.String,System.IO.TextWriter)](https://learn.microsoft.com/search/?terms=System.Net.WebUtility.HtmlDecode(System.String%2CSystem.IO.TextWriter))
- [System.Net.WebUtility.UrlDecode(System.String)](https://learn.microsoft.com/search/?terms=System.Net.WebUtility.UrlDecode(System.String))

<!--

#### Affected APIs

- `M:System.Net.WebUtility.HtmlDecode(System.String)`
- `M:System.Net.WebUtility.HtmlDecode(System.String,System.IO.TextWriter)`
- `M:System.Net.WebUtility.UrlDecode(System.String)`

-->
