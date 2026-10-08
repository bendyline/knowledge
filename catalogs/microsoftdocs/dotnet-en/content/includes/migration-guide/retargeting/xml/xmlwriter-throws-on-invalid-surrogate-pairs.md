### XmlWriter throws on invalid surrogate pairs

#### Details

For apps that target the .NET Framework 4.5.2 or previous versions, writing an invalid surrogate pair using exception fallback handling does not always throw an exception. For apps that target the .NET Framework 4.6, attempting to write an invalid surrogate pair throws an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException).

#### Suggestion

If necessary, this break can be avoided by targeting the .NET Framework 4.5.2 or earlier. Alternatively, invalid surrogate pairs can be pre-processed into valid xml prior to writing them.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.6 |
| Type | Retargeting |

#### Affected APIs

- [System.Xml.XmlWriter.WriteAttributeString(System.String,System.String)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteAttributeString(System.String%2CSystem.String))
- [System.Xml.XmlWriter.WriteAttributeString(System.String,System.String,System.String)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteAttributeString(System.String%2CSystem.String%2CSystem.String))
- [System.Xml.XmlWriter.WriteAttributeString(System.String,System.String,System.String,System.String)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteAttributeString(System.String%2CSystem.String%2CSystem.String%2CSystem.String))
- [System.Xml.XmlWriter.WriteAttributeStringAsync(System.String,System.String,System.String,System.String)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteAttributeStringAsync(System.String%2CSystem.String%2CSystem.String%2CSystem.String))
- [System.Xml.XmlWriter.WriteCData(System.String)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteCData(System.String))
- [System.Xml.XmlWriter.WriteCDataAsync(System.String)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteCDataAsync(System.String))
- [System.Xml.XmlWriter.WriteChars(System.Char\[\],System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteChars(System.Char%5B%5D%2CSystem.Int32%2CSystem.Int32))
- [System.Xml.XmlWriter.WriteCharsAsync(System.Char\[\],System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteCharsAsync(System.Char%5B%5D%2CSystem.Int32%2CSystem.Int32))
- [System.Xml.XmlWriter.WriteComment(System.String)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteComment(System.String))
- [System.Xml.XmlWriter.WriteCommentAsync(System.String)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteCommentAsync(System.String))
- [System.Xml.XmlWriter.WriteEntityRef(System.String)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteEntityRef(System.String))
- [System.Xml.XmlWriter.WriteEntityRefAsync(System.String)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteEntityRefAsync(System.String))
- [System.Xml.XmlWriter.WriteRaw(System.Char\[\],System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteRaw(System.Char%5B%5D%2CSystem.Int32%2CSystem.Int32))
- [System.Xml.XmlWriter.WriteProcessingInstruction(System.String,System.String)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteProcessingInstruction(System.String%2CSystem.String))
- [System.Xml.XmlWriter.WriteProcessingInstructionAsync(System.String,System.String)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteProcessingInstructionAsync(System.String%2CSystem.String))
- [System.Xml.XmlWriter.WriteRaw(System.String)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteRaw(System.String))
- [System.Xml.XmlWriter.WriteRawAsync(System.Char\[\],System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteRawAsync(System.Char%5B%5D%2CSystem.Int32%2CSystem.Int32))
- [System.Xml.XmlWriter.WriteRawAsync(System.String)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteRawAsync(System.String))
- [System.Xml.XmlWriter.WriteString(System.String)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteString(System.String))
- [System.Xml.XmlWriter.WriteStringAsync(System.String)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteStringAsync(System.String))
- [System.Xml.XmlWriter.WriteSurrogateCharEntity(System.Char,System.Char)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteSurrogateCharEntity(System.Char%2CSystem.Char))
- [System.Xml.XmlWriter.WriteSurrogateCharEntityAsync(System.Char,System.Char)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteSurrogateCharEntityAsync(System.Char%2CSystem.Char))
- [System.Xml.XmlWriter.WriteValue(System.String)](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter.WriteValue(System.String))
