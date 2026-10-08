### XmlSerializer fails while serializing a type that hides an accessible member with an inaccessible one

#### Details

When serializing a derived type, the [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer) can fail if the type contains an inaccessible field or property that hides (via the 'new' keyword) a field or property of the same name that was previously accessible (public, for example) on the base type.

#### Suggestion

This problem can be solved by making the new, hiding member accessible to the [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer) (by marking it public, for example). Alternatively, the following config setting will revert to 4.0 [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer) behavior, which will fix the problem:

```xml
<system.xml.serialization>
<xmlSerializer useLegacySerializerGeneration="true" />
</system.xml.serialization>
```

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Xml.Serialization.XmlSerializer.Serialize(System.IO.Stream,System.Object)](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer.Serialize(System.IO.Stream%2CSystem.Object))
- [System.Xml.Serialization.XmlSerializer.Serialize(System.IO.TextWriter,System.Object)](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer.Serialize(System.IO.TextWriter%2CSystem.Object))
- [System.Xml.Serialization.XmlSerializer.Serialize(System.Object,System.Xml.Serialization.XmlSerializationWriter)](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer.Serialize(System.Object%2CSystem.Xml.Serialization.XmlSerializationWriter))
- [System.Xml.Serialization.XmlSerializer.Serialize(System.Xml.XmlWriter,System.Object)](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer.Serialize(System.Xml.XmlWriter%2CSystem.Object))
- [System.Xml.Serialization.XmlSerializer.Serialize(System.IO.Stream,System.Object,System.Xml.Serialization.XmlSerializerNamespaces)](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer.Serialize(System.IO.Stream%2CSystem.Object%2CSystem.Xml.Serialization.XmlSerializerNamespaces))
- [System.Xml.Serialization.XmlSerializer.Serialize(System.IO.TextWriter,System.Object,System.Xml.Serialization.XmlSerializerNamespaces)](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer.Serialize(System.IO.TextWriter%2CSystem.Object%2CSystem.Xml.Serialization.XmlSerializerNamespaces))
- [System.Xml.Serialization.XmlSerializer.Serialize(System.Xml.XmlWriter,System.Object,System.Xml.Serialization.XmlSerializerNamespaces)](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer.Serialize(System.Xml.XmlWriter%2CSystem.Object%2CSystem.Xml.Serialization.XmlSerializerNamespaces))
- [System.Xml.Serialization.XmlSerializer.Serialize(System.Xml.XmlWriter,System.Object,System.Xml.Serialization.XmlSerializerNamespaces,System.String)](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer.Serialize(System.Xml.XmlWriter%2CSystem.Object%2CSystem.Xml.Serialization.XmlSerializerNamespaces%2CSystem.String))
- [System.Xml.Serialization.XmlSerializer.Serialize(System.Xml.XmlWriter,System.Object,System.Xml.Serialization.XmlSerializerNamespaces,System.String,System.String)](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer.Serialize(System.Xml.XmlWriter%2CSystem.Object%2CSystem.Xml.Serialization.XmlSerializerNamespaces%2CSystem.String%2CSystem.String))

<!--

#### Affected APIs

- `M:System.Xml.Serialization.XmlSerializer.Serialize(System.IO.Stream,System.Object)`
- `M:System.Xml.Serialization.XmlSerializer.Serialize(System.IO.TextWriter,System.Object)`
- `M:System.Xml.Serialization.XmlSerializer.Serialize(System.Object,System.Xml.Serialization.XmlSerializationWriter)`
- `M:System.Xml.Serialization.XmlSerializer.Serialize(System.Xml.XmlWriter,System.Object)`
- `M:System.Xml.Serialization.XmlSerializer.Serialize(System.IO.Stream,System.Object,System.Xml.Serialization.XmlSerializerNamespaces)`
- `M:System.Xml.Serialization.XmlSerializer.Serialize(System.IO.TextWriter,System.Object,System.Xml.Serialization.XmlSerializerNamespaces)`
- `M:System.Xml.Serialization.XmlSerializer.Serialize(System.Xml.XmlWriter,System.Object,System.Xml.Serialization.XmlSerializerNamespaces)`
- `M:System.Xml.Serialization.XmlSerializer.Serialize(System.Xml.XmlWriter,System.Object,System.Xml.Serialization.XmlSerializerNamespaces,System.String)`
- `M:System.Xml.Serialization.XmlSerializer.Serialize(System.Xml.XmlWriter,System.Object,System.Xml.Serialization.XmlSerializerNamespaces,System.String,System.String)`

-->
