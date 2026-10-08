### SoapFormatter cannot deserialize Hashtable and similar ordered collection objects

#### Details

The [System.Runtime.Serialization.Formatters.Soap.SoapFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Soap.SoapFormatter) does not guarantee that objects serialized under one .NET Framework version will successfully deserialize under a different version. Specifically, some ordered collections (like [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable)) added members between 4.0 and 4.5 such that objects of these types cannot deserialize with .NET Framework 4.0 if they were serialized with .NET Framework 4.5. Note that if the serialized data is both serialized and deserialized with the same .NET Framework version, no issue will occur.

#### Suggestion

[System.Runtime.Serialization.Formatters.Soap.SoapFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Soap.SoapFormatter) serialization should be replaced with a serializer that is resilient to .NET Framework changes. Examples include [System.Text.Json](https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/overview) and [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer).

> **Warning:**
> Binary serialization with `BinaryFormatter` can be dangerous. For more information, see the [BinaryFormatter security guide](../../../../docs/standard/serialization/binaryformatter-security-guide.md) and the [BinaryFormatter migration guide](../../../../docs/standard/serialization/binaryformatter-migration-guide/index.md).


> **Warning:**
> Do not confuse [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) with [System.Runtime.Serialization.NetDataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.NetDataContractSerializer). [System.Runtime.Serialization.NetDataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.NetDataContractSerializer) is identified as a [dangerous serializer](https://learn.microsoft.com/dotnet/standard/serialization/binaryformatter-security-guide#dangerous-alternatives).


| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Runtime.Serialization.Formatters.Soap.SoapFormatter.Serialize(System.IO.Stream,System.Object)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Soap.SoapFormatter.Serialize(System.IO.Stream%2CSystem.Object))
- [System.Runtime.Serialization.Formatters.Soap.SoapFormatter.Serialize(System.IO.Stream,System.Object,System.Runtime.Remoting.Messaging.Header\[\])](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Soap.SoapFormatter.Serialize(System.IO.Stream%2CSystem.Object%2CSystem.Runtime.Remoting.Messaging.Header%5B%5D))
- [System.Runtime.Serialization.Formatters.Soap.SoapFormatter.Deserialize(System.IO.Stream)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Soap.SoapFormatter.Deserialize(System.IO.Stream))
- [System.Runtime.Serialization.Formatters.Soap.SoapFormatter.Deserialize(System.IO.Stream,System.Runtime.Remoting.Messaging.HeaderHandler)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Soap.SoapFormatter.Deserialize(System.IO.Stream%2CSystem.Runtime.Remoting.Messaging.HeaderHandler))

<!--

#### Affected APIs

- `M:System.Runtime.Serialization.Formatters.Soap.SoapFormatter.Serialize(System.IO.Stream,System.Object)`
- `M:System.Runtime.Serialization.Formatters.Soap.SoapFormatter.Serialize(System.IO.Stream,System.Object,System.Runtime.Remoting.Messaging.Header[])`
- `M:System.Runtime.Serialization.Formatters.Soap.SoapFormatter.Deserialize(System.IO.Stream)`
- `M:System.Runtime.Serialization.Formatters.Soap.SoapFormatter.Deserialize(System.IO.Stream,System.Runtime.Remoting.Messaging.HeaderHandler)`

-->
