### FlowDocument may show an extra line of text

#### Details

In some cases, a [System.Windows.Documents.FlowDocument](https://learn.microsoft.com/search/?terms=System.Windows.Documents.FlowDocument) element will display an extra line of text when running on the .NET Framework 4.5 compared to how it displayed when run on the .NET Framework 4.0. There are no known cases of the change causing any text to be displayed poorly or illegibly, but it could cause text to appear that previously was omitted from a [System.Windows.Documents.FlowDocument](https://learn.microsoft.com/search/?terms=System.Windows.Documents.FlowDocument)'s view.

#### Suggestion

In some cases, decreasing the display element's PageHeight property by one can restore the previous number of displayed lines.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Windows.Documents.FlowDocument.%23ctor](https://learn.microsoft.com/search/?terms=System.Windows.Documents.FlowDocument.%2523ctor)
- [System.Windows.Documents.FlowDocument.%23ctor(System.Windows.Documents.Block)](https://learn.microsoft.com/search/?terms=System.Windows.Documents.FlowDocument.%2523ctor(System.Windows.Documents.Block))
- [System.Windows.Controls.FlowDocumentReader.%23ctor](https://learn.microsoft.com/search/?terms=System.Windows.Controls.FlowDocumentReader.%2523ctor)
- [System.Windows.Controls.FlowDocumentPageViewer.%23ctor](https://learn.microsoft.com/search/?terms=System.Windows.Controls.FlowDocumentPageViewer.%2523ctor)
- [System.Windows.Controls.Primitives.DocumentPageView.%23ctor](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.DocumentPageView.%2523ctor)

<!--

#### Affected APIs

- `M:System.Windows.Documents.FlowDocument.#ctor`
- `M:System.Windows.Documents.FlowDocument.#ctor(System.Windows.Documents.Block)`
- `M:System.Windows.Controls.FlowDocumentReader.#ctor`
- `M:System.Windows.Controls.FlowDocumentPageViewer.#ctor`
- `M:System.Windows.Controls.Primitives.DocumentPageView.#ctor`

-->
