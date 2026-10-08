### XmlSchemaException now sets line positions properly

#### Details

If the [System.Xml.Linq.LoadOptions.SetLineInfo](https://learn.microsoft.com/search/?terms=System.Xml.Linq.LoadOptions.SetLineInfo) value is passed to the Load method and a validation error occurs, the [System.Xml.Schema.XmlSchemaException.LineNumber](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaException.LineNumber) and [System.Xml.Schema.XmlSchemaException.LinePosition](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaException.LinePosition) properties now contain line information.

#### Suggestion

Exception-handling code that assumes [System.Xml.Schema.XmlSchemaException.LineNumber](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaException.LineNumber) and [System.Xml.Schema.XmlSchemaException.LinePosition](https://learn.microsoft.com/search/?terms=System.Xml.Schema.XmlSchemaException.LinePosition) will not be set should be updated since these properties will now be set properly when SetLineInfo is used while loading XML.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Xml.Linq.LoadOptions.SetLineInfo](https://learn.microsoft.com/search/?terms=System.Xml.Linq.LoadOptions.SetLineInfo)

<!--

#### Affected APIs

- `F:System.Xml.Linq.LoadOptions.SetLineInfo`

-->
