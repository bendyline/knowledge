### XmlTextReader DTD entity expansion is limited to 10,000,000 characters

#### Details

DTD entity expansion is now limited to 10,000,000 characters. Loading XML files without DTD entity expansion or with limited DTD entity expansion is unaffected. Files with DTD entities that expand to more than 10,000,000 characters fail to load, and now throw an exception.

#### Suggestion

If the limit of DTD entity expansion is too low 10,000,000, the value can be overridden with the [System.Xml.XmlReaderSettings.MaxCharactersFromEntities](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings.MaxCharactersFromEntities) property. An [System.Xml.XmlReaderSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings) with the proper [System.Xml.XmlReaderSettings.MaxCharactersFromEntities](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings.MaxCharactersFromEntities) value can be passed to `XmlReader.Create` that takes [System.Xml.XmlReaderSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlReaderSettings) (ie. [System.Xml.XmlReader.Create(System.String,System.Xml.XmlReaderSettings)](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader.Create(System.String%2CSystem.Xml.XmlReaderSettings)))

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Xml.XmlTextReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader)
- [System.Xml.XmlTextReader.%23ctor](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader.%2523ctor)
- [System.Xml.XmlTextReader.%23ctor(System.IO.Stream)](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader.%2523ctor(System.IO.Stream))
- [System.Xml.XmlTextReader.%23ctor(System.IO.Stream,System.Xml.XmlNameTable)](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader.%2523ctor(System.IO.Stream%2CSystem.Xml.XmlNameTable))
- [System.Xml.XmlTextReader.%23ctor(System.IO.Stream,System.Xml.XmlNodeType,System.Xml.XmlParserContext)](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader.%2523ctor(System.IO.Stream%2CSystem.Xml.XmlNodeType%2CSystem.Xml.XmlParserContext))
- [System.Xml.XmlTextReader.%23ctor(System.IO.TextReader)](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader.%2523ctor(System.IO.TextReader))
- [System.Xml.XmlTextReader.%23ctor(System.IO.TextReader,System.Xml.XmlNameTable)](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader.%2523ctor(System.IO.TextReader%2CSystem.Xml.XmlNameTable))
- [System.Xml.XmlTextReader.%23ctor(System.String)](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader.%2523ctor(System.String))
- [System.Xml.XmlTextReader.%23ctor(System.String,System.IO.Stream)](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader.%2523ctor(System.String%2CSystem.IO.Stream))
- [System.Xml.XmlTextReader.%23ctor(System.String,System.IO.Stream,System.Xml.XmlNameTable)](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader.%2523ctor(System.String%2CSystem.IO.Stream%2CSystem.Xml.XmlNameTable))
- [System.Xml.XmlTextReader.%23ctor(System.String,System.IO.TextReader)](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader.%2523ctor(System.String%2CSystem.IO.TextReader))
- [System.Xml.XmlTextReader.%23ctor(System.String,System.IO.TextReader,System.Xml.XmlNameTable)](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader.%2523ctor(System.String%2CSystem.IO.TextReader%2CSystem.Xml.XmlNameTable))
- [System.Xml.XmlTextReader.%23ctor(System.String,System.Xml.XmlNameTable)](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader.%2523ctor(System.String%2CSystem.Xml.XmlNameTable))
- [System.Xml.XmlTextReader.%23ctor(System.String,System.Xml.XmlNodeType,System.Xml.XmlParserContext)](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader.%2523ctor(System.String%2CSystem.Xml.XmlNodeType%2CSystem.Xml.XmlParserContext))
- [System.Xml.XmlTextReader.%23ctor(System.Xml.XmlNameTable)](https://learn.microsoft.com/search/?terms=System.Xml.XmlTextReader.%2523ctor(System.Xml.XmlNameTable))

<!--

#### Affected APIs

- `T:System.Xml.XmlTextReader`
- `M:System.Xml.XmlTextReader.#ctor`
- `M:System.Xml.XmlTextReader.#ctor(System.IO.Stream)`
- `M:System.Xml.XmlTextReader.#ctor(System.IO.Stream,System.Xml.XmlNameTable)`
- `M:System.Xml.XmlTextReader.#ctor(System.IO.Stream,System.Xml.XmlNodeType,System.Xml.XmlParserContext)`
- `M:System.Xml.XmlTextReader.#ctor(System.IO.TextReader)`
- `M:System.Xml.XmlTextReader.#ctor(System.IO.TextReader,System.Xml.XmlNameTable)`
- `M:System.Xml.XmlTextReader.#ctor(System.String)`
- `M:System.Xml.XmlTextReader.#ctor(System.String,System.IO.Stream)`
- `M:System.Xml.XmlTextReader.#ctor(System.String,System.IO.Stream,System.Xml.XmlNameTable)`
- `M:System.Xml.XmlTextReader.#ctor(System.String,System.IO.TextReader)`
- `M:System.Xml.XmlTextReader.#ctor(System.String,System.IO.TextReader,System.Xml.XmlNameTable)`
- `M:System.Xml.XmlTextReader.#ctor(System.String,System.Xml.XmlNameTable)`
- `M:System.Xml.XmlTextReader.#ctor(System.String,System.Xml.XmlNodeType,System.Xml.XmlParserContext)`
- `M:System.Xml.XmlTextReader.#ctor(System.Xml.XmlNameTable)`

-->
