### HtmlTextWriter does not render `<br/>` element correctly

#### Details

Beginning in the .NET Framework 4.6, calling [System.Web.UI.HtmlTextWriter.RenderBeginTag(System.String)](https://learn.microsoft.com/search/?terms=System.Web.UI.HtmlTextWriter.RenderBeginTag(System.String)) and [System.Web.UI.HtmlTextWriter.RenderEndTag](https://learn.microsoft.com/search/?terms=System.Web.UI.HtmlTextWriter.RenderEndTag) with a `<BR />` element will correctly insert only one `<BR />` (instead of two)

#### Suggestion

If an app depended on the extra `<BR />` tag, [System.Web.UI.HtmlTextWriter.RenderBeginTag(System.String)](https://learn.microsoft.com/search/?terms=System.Web.UI.HtmlTextWriter.RenderBeginTag(System.String)) should be called a second time. Note that this behavior change only affects apps that target the .NET Framework 4.6 or later, so another option is to target a previous version of the .NET Framework in order to get the old behavior.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.6 |
| Type | Retargeting |

#### Affected APIs

- [System.Web.UI.HtmlTextWriter.RenderBeginTag(System.String)](https://learn.microsoft.com/search/?terms=System.Web.UI.HtmlTextWriter.RenderBeginTag(System.String))
- [System.Web.UI.HtmlTextWriter.RenderBeginTag(System.Web.UI.HtmlTextWriterTag)](https://learn.microsoft.com/search/?terms=System.Web.UI.HtmlTextWriter.RenderBeginTag(System.Web.UI.HtmlTextWriterTag))
