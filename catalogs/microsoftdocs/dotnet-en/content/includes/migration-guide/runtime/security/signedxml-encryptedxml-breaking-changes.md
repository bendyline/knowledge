### SignedXml and EncryptedXml Breaking Changes

#### Details

In .NET Framework 4.6.2, security fixes in [System.Security.Cryptography.Xml.SignedXml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.SignedXml) and [System.Security.Cryptography.Xml.EncryptedXml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedXml) lead to different run-time behaviors. For example:

- If a document has multiple elements with the same `id` attribute and a signature targets one of those elements as the root of the signature, the document will now be considered invalid.
- Documents using non-canonical XPath transform algorithms in references are now considered invalid.
- Documents using non-canonical XSLT transform algorithms in references are now consider invalid.
- Any program making use of external resource detached signatures will be unable to do so.

#### Suggestion

Developers might want to review the usage of [System.Security.Cryptography.Xml.XmlDsigXsltTransform](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.XmlDsigXsltTransform) and [System.Security.Cryptography.Xml.XmlDsigXsltTransform](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.XmlDsigXsltTransform), as well as types derived from [System.Security.Cryptography.Xml.Transform](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.Transform) since a document receiver may not be able to process it.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.6.2 |
| Type | Runtime |

#### Affected APIs

- [System.Security.Cryptography.Xml.Transform](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.Transform)
- [System.Security.Cryptography.Xml.XmlDsigXPathTransform](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.XmlDsigXPathTransform)
- [System.Security.Cryptography.Xml.XmlDsigXsltTransform](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.XmlDsigXsltTransform)

<!--

#### Affected APIs

- `T:System.Security.Cryptography.Xml.Transform`
- `T:System.Security.Cryptography.Xml.XmlDsigXPathTransform`
- `T:System.Security.Cryptography.Xml.XmlDsigXsltTransform`

-->
