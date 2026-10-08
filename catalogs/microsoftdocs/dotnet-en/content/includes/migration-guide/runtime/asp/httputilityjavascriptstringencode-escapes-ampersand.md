### HttpUtility.JavaScriptStringEncode escapes ampersand

#### Details

Starting with the .NET Framework 4.5, [System.Web.HttpUtility.JavaScriptStringEncode(System.String)](https://learn.microsoft.com/search/?terms=System.Web.HttpUtility.JavaScriptStringEncode(System.String)) escapes the ampersand (&amp;) character.

#### Suggestion

If your app depends on the previous behavior of this method, you can add an aspnet:JavaScriptDoNotEncodeAmpersand setting to the [ASP.NET appSettings element](https://learn.microsoft.com/previous-versions/aspnet/hh975440\(v=vs.120\)) in your configuration file.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Web.HttpUtility.JavaScriptStringEncode(System.String)](https://learn.microsoft.com/search/?terms=System.Web.HttpUtility.JavaScriptStringEncode(System.String))
- [System.Web.HttpUtility.JavaScriptStringEncode(System.String,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Web.HttpUtility.JavaScriptStringEncode(System.String%2CSystem.Boolean))

<!--

#### Affected APIs

- `M:System.Web.HttpUtility.JavaScriptStringEncode(System.String)`
- `M:System.Web.HttpUtility.JavaScriptStringEncode(System.String,System.Boolean)`

-->
