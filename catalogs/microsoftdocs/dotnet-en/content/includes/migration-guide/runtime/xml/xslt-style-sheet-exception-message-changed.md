### XSLT style sheet exception message changed

#### Details

In the .NET Framework 4.5, the text of the error message when an XSLT file is too complex is &quot;The style sheet is too complex.&quot; In previous versions, the error message was &quot;XSLT compile error.&quot; Application code that depends on the text of the error message will no longer work. However, the exception types remain the same, so this change should have no real impact.

#### Suggestion

Update any app code depending on the exception message from this error condition to expect the new message, or (even better) update the code to depend only on the exception type ([System.Xml.Xsl.XsltException](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltException)), which has not changed.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Xml.Xsl.XslCompiledTransform.Load(System.String)](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Load(System.String))
- [System.Xml.Xsl.XslCompiledTransform.Load(System.Type)](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Load(System.Type))
- [System.Xml.Xsl.XslCompiledTransform.Load(System.Xml.XmlReader)](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Load(System.Xml.XmlReader))
- [System.Xml.Xsl.XslCompiledTransform.Load(System.Xml.XPath.IXPathNavigable)](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Load(System.Xml.XPath.IXPathNavigable))
- [System.Xml.Xsl.XslCompiledTransform.Load(System.Reflection.MethodInfo,System.Byte\[\],System.Type\[\])](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Load(System.Reflection.MethodInfo%2CSystem.Byte%5B%5D%2CSystem.Type%5B%5D))
- [System.Xml.Xsl.XslCompiledTransform.Load(System.String,System.Xml.Xsl.XsltSettings,System.Xml.XmlResolver)](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Load(System.String%2CSystem.Xml.Xsl.XsltSettings%2CSystem.Xml.XmlResolver))
- [System.Xml.Xsl.XslCompiledTransform.Load(System.Xml.XmlReader,System.Xml.Xsl.XsltSettings,System.Xml.XmlResolver)](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Load(System.Xml.XmlReader%2CSystem.Xml.Xsl.XsltSettings%2CSystem.Xml.XmlResolver))
- [System.Xml.Xsl.XslCompiledTransform.Load(System.Xml.XPath.IXPathNavigable,System.Xml.Xsl.XsltSettings,System.Xml.XmlResolver)](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Load(System.Xml.XPath.IXPathNavigable%2CSystem.Xml.Xsl.XsltSettings%2CSystem.Xml.XmlResolver))

<!--

#### Affected APIs

- `M:System.Xml.Xsl.XslCompiledTransform.Load(System.String)`
- `M:System.Xml.Xsl.XslCompiledTransform.Load(System.Type)`
- `M:System.Xml.Xsl.XslCompiledTransform.Load(System.Xml.XmlReader)`
- `M:System.Xml.Xsl.XslCompiledTransform.Load(System.Xml.XPath.IXPathNavigable)`
- `M:System.Xml.Xsl.XslCompiledTransform.Load(System.Reflection.MethodInfo,System.Byte[],System.Type[])`
- `M:System.Xml.Xsl.XslCompiledTransform.Load(System.String,System.Xml.Xsl.XsltSettings,System.Xml.XmlResolver)`
- `M:System.Xml.Xsl.XslCompiledTransform.Load(System.Xml.XmlReader,System.Xml.Xsl.XsltSettings,System.Xml.XmlResolver)`
- `M:System.Xml.Xsl.XslCompiledTransform.Load(System.Xml.XPath.IXPathNavigable,System.Xml.Xsl.XsltSettings,System.Xml.XmlResolver)`

-->
