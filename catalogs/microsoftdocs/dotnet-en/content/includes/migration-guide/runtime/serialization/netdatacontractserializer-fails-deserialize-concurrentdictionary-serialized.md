### NetDataContractSerializer fails to deserialize a ConcurrentDictionary serialized with a different .NET version

#### Details

By design, the [System.Runtime.Serialization.NetDataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.NetDataContractSerializer) can be used only if both the serializing and deserializing ends share the same CLR types. Therefore, it is not guaranteed that an object serialized with one version of the .NET Framework can be deserialized by a different version.[System.Collections.Concurrent.ConcurrentDictionary%602](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentDictionary%25602) is a type that is known to not to deserialize correctly if serialized with the .NET Framework 4.5 or earlier and deserialized with the .NET Framework 4.5.1 or later.

#### Suggestion

There are a number of possible work-arounds for this issue:

- Upgrade the serializing computer to use the .NET Framework 4.5.1, as well.
- Use [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) instead of [System.Runtime.Serialization.NetDataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.NetDataContractSerializer) as this does not expect the exact same CLR types at both serializing and deserializing ends.
- Use [System.Collections.Generic.Dictionary%602](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%25602) instead of [System.Collections.Concurrent.ConcurrentDictionary%602](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentDictionary%25602) since it does not exhibit this particular 4.5-&gt;4.5.1 break.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5.1 |
| Type | Runtime |

#### Affected APIs

- [System.Runtime.Serialization.NetDataContractSerializer.Deserialize(System.IO.Stream)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.NetDataContractSerializer.Deserialize(System.IO.Stream))

<!--

#### Affected APIs

- `M:System.Runtime.Serialization.NetDataContractSerializer.Deserialize(System.IO.Stream)`

-->
