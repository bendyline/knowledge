### XML parsing changes

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5.2 |
| Type | Runtime |

#### Details

For security reasons, the following changes were introduced into XML parsing APIS:

- [System.Xml.XmlReaderSettings.MaxCharactersFromEntities](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings.MaxCharactersFromEntities) is set to 10 million when [System.Xml.XmlReaderSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings) is initialized.
- [System.Xml.XmlReaderSettings.XmlResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings.XmlResolver) is set to `null` by default.

> **Note:**
> [System.Xml.XmlReaderSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings) is used by all XML parsers, so while this change helps the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) case, it also affects other scenarios.

#### Suggestion

To revert to the previous behavior, you can set a value in the registry. Add a DWORD value named `EnableLegacyXmlSettings` to the `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\.NETFramework\XML` registry key, and set its value to `1`. You can also add the registry value in the HKEY_CURRENT_USER hive instead.

#### Affected APIs

- [System.Xml.XmlReaderSettings.MaxCharactersFromEntities](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings.MaxCharactersFromEntities)
- [System.Xml.XmlReaderSettings.XmlResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings.XmlResolver)

In addition, any XML API that depends on [System.Xml.XmlResolver](https://learn.microsoft.com/search/?terms=System.Xml.XmlResolver), either directly or indirectly, is affected.

<!--

#### Affected APIs

- `P:System.Xml.XmlReaderSettings.MaxCharactersFromEntities`
- `P:System.Xml.XmlReaderSettings.XmlResolver`

-->
