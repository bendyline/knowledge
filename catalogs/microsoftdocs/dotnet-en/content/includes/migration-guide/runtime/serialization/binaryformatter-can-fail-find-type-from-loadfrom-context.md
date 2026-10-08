### BinaryFormatter can fail to find type from LoadFrom context

#### Details

As of .NET Framework 4.5, a number of [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer) changes may cause differences in deserialization when using [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter) to deserialize types that had been loaded in the LoadFrom context. These changes are due to the new ways [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer) now loads a type which causes different behavior when a [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter) attempts to deserialize to that type later on. The default serialization binder does not automatically search the LoadFrom context, although it may have worked in some circumstances based on the old behavior of XmlSerializer. Due to the changes, when a type is being loaded from an assembly loaded in a different context, a [System.IO.FileNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.FileNotFoundException) may be thrown.

> **Warning:**
> Binary serialization with `BinaryFormatter` can be dangerous. For more information, see the [BinaryFormatter security guide](../../../../docs/standard/serialization/binaryformatter-security-guide.md) and the [BinaryFormatter migration guide](../../../../docs/standard/serialization/binaryformatter-migration-guide/index.md).


#### Suggestion

If this exception is seen, the `Binder` property of the [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter) can be set to a custom binder that will find the correct type.

```csharp
var formatter = new BinaryFormatter { Binder = new TypeFinderBinder() }
```

And then the custom binder:

```csharp
public class TypeFinderBinder : SerializationBinder
{
    private static readonly string s_assemblyName = Assembly.GetExecutingAssembly().FullName;

    public override Type BindToType(string assemblyName, string typeName)
    {
        return Type.GetType(String.Format(CultureInfo.InvariantCulture, "{0}, {1}", typeName, s_assemblyName));
    }
}
```

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter)
- [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize(System.IO.Stream)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize(System.IO.Stream))
- [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize(System.IO.Stream,System.Runtime.Remoting.Messaging.HeaderHandler)](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize(System.IO.Stream%2CSystem.Runtime.Remoting.Messaging.HeaderHandler))

<!--

#### Affected APIs

- `T:System.Runtime.Serialization.Formatters.Binary.BinaryFormatter`
- `M:System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize(System.IO.Stream)`
- `M:System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize(System.IO.Stream,System.Runtime.Remoting.Messaging.HeaderHandler)`

-->
