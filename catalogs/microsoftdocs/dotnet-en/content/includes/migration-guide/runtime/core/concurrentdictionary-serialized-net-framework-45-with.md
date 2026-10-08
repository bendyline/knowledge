### A ConcurrentDictionary serialized in .NET Framework 4.5 with NetDataContractSerializer cannot be deserialized by .NET Framework 4.5.1 or 4.5.2

#### Details

Due to internal changes to the type, [System.Collections.Concurrent.ConcurrentDictionary%602](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentDictionary%25602) objects that are serialized with the .NET Framework 4.5 using the [System.Runtime.Serialization.NetDataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.NetDataContractSerializer) cannot be deserialized in the .NET Framework 4.5.1 or in the .NET Framework 4.5.2.Note that moving in the other direction (serializing with the .NET Framework 4.5.x and deserializing with the .NET Framework 4.5) works. Similarly, all 4.x cross-version serialization works with the .NET Framework 4.6.Serializing and deserializing with a single version of the .NET Framework is not affected.

#### Suggestion

If it is necessary to serialize and deserialize a [System.Collections.Concurrent.ConcurrentDictionary%602](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentDictionary%25602) between the .NET Framework 4.5 and .NET Framework 4.5.1/4.5.2, a different serializer like the [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) should be used instead of the [System.Runtime.Serialization.NetDataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.NetDataContractSerializer). Alternatively, because this issue is addressed in the .NET Framework 4.6, it may be solved by upgrading to that version of the .NET Framework.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5.1 |
| Type | Runtime |

#### Affected APIs

Not detectable via API analysis.

<!--

#### Affected APIs

Not detectable via API analysis.

-->
