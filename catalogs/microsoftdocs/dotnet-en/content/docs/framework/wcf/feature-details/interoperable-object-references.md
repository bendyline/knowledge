---
description: "Learn more about: Interoperable object references"
title: "Interoperable object references"
ms.date: "04/15/2019"
ms.assetid: cb8da4c8-08ca-4220-a16b-e04c8f527f1b
---
# Interoperable object references

By default, [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) serializes objects by value. You can use the [System.Runtime.Serialization.DataContractAttribute.IsReference](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute.IsReference) property to instruct the data contract serializer to preserve object references when serializing objects.

## Generated XML

 As an example, consider the following object:

```csharp
[DataContract]
public class X
{
    SomeClass someInstance = new SomeClass();
    [DataMember]
    public SomeClass A = someInstance;
    [DataMember]
    public SomeClass B = someInstance;
}

public class SomeClass
{
}
```

 With [System.Runtime.Serialization.DataContractSerializer.PreserveObjectReferences*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer.PreserveObjectReferences*) set to `false` (the default), the following XML is generated:

```xml
<X>
   <A>contents of someInstance</A>
   <B>contents of someInstance</B>
</X>
```

 With [System.Runtime.Serialization.DataContractSerializer.PreserveObjectReferences*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer.PreserveObjectReferences*) set to `true`, the following XML is generated:

```xml
<X>
   <A id="1">contents of someInstance</A>
   <B ref="1"></B>
</X>
```

 However, [System.Runtime.Serialization.XsdDataContractExporter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.XsdDataContractExporter) doesn't describe the `id` and `ref` attributes in its schema, even when the `preserveObjectReferences` property is set to `true`.

## Using IsReference

 To generate object reference information that's valid according to the schema that describes it, apply the [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute) attribute to a type, and set the [System.Runtime.Serialization.DataContractAttribute.IsReference](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute.IsReference) flag to `true`. The following example modifies class `X` in the previous example by adding `IsReference`:

```csharp
[DataContract(IsReference=true)]
public class X
{
     SomeClass someInstance = new SomeClass();
     [DataMember]
     public SomeClass A = someInstance;
     [DataMember]
     public SomeClass B = someInstance;
}

public class SomeClass
{
}
````

 The generated XML is as follows:

```xml
<X>
    <A id="1">
        <Value>contents of A</Value>
    </A>
    <B ref="1"></B>
</X>
```

 Using `IsReference` ensures compliance on message round-tripping. Without it, when a type is generated from schema, the XML output for that type isn't necessarily compatible with the schema originally assumed. In other words, although the `id` and `ref` attributes were serialized, the original schema could have barred these attributes (or all attributes) from occurring in the XML. With `IsReference` applied to a data member, the member continues to be recognized as *referenceable* when round-tripped.

## See also

- [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute)
- [System.Runtime.Serialization.CollectionDataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.CollectionDataContractAttribute)
- [System.Runtime.Serialization.DataContractAttribute.IsReference](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute.IsReference)
- [System.Runtime.Serialization.CollectionDataContractAttribute.IsReference](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.CollectionDataContractAttribute.IsReference)
