---
description: "Learn more about: Serialization and Metadata"
title: "Serialization and Metadata"
ms.date: "03/30/2017"
ms.topic: article
ms.assetid: 619ecf1c-1ca5-4d66-8934-62fe7aad78c6
---
# Serialization and metadata

If your app serializes and deserializes objects, you may need to add entries to your runtime directives (.rd.xml) file to ensure that the necessary metadata is present at run time. There are two categories of serializers, and each requires different handling in your runtime directives file:

- Reflection-based third-party serializers. These require modifications to your runtime directives file, and are discussed in the next section.

- Non-reflection-based serializers found in the .NET Framework class library. These may require modifications to your runtime directives file, and are discussed in the [Microsoft serializers](#Microsoft) section.

<a name="ThirdParty"></a>

## Third-party serializers

Third-party serializers, including Newtonsoft.JSON, typically are reflection-based. Given a binary large object (BLOB) of serialized data, the fields in the data are assigned to a concrete type by looking up the fields of the target type by name. At a minimum, using these libraries causes [MissingMetadataException](missingmetadataexception-class-net-native.md) exceptions for each [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object that you try to serialize or deserialize in a `List<Type>` collection.

The easiest way to address issues caused by missing metadata for these serializers is to collect types that will be used in serialization under a single namespace (such as `App.Models`) and apply a `Serialize` metadata directive to it:

```xml
<Namespace Name="App.Models" Serialize="Required PublicAndInternal" />
```

For information about the syntax used in the example, see [\<Namespace> Element](namespace-element-net-native.md).

<a name="Microsoft"></a>

## Microsoft serializers

Although the [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer), [System.Runtime.Serialization.Json.DataContractJsonSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Json.DataContractJsonSerializer), and [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer) classes do not rely on reflection, they do require code to be generated based on the object to be serialized or deserialized. The overloaded constructors for each serializer include a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) parameter that specifies the type to be serialized or deserialized. How you specify that type in your code defines the action you must take, as discussed in the next two sections.

### typeof used in the constructor

If you call a constructor of these serialization classes and include the C# [typeof](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/type-testing-and-cast#typeof-operator) operator in the method call, **you do not have to do any additional work**. For example, in each of the following calls to a serialization class constructor, the `typeof` keyword is used as part of the expression passed to the constructor.

[ProjectN#5 (complete source file; reference: code/serialize1.cs#5)](../../_code/uwp/dotnet-native/code/serialize1.cs.md)

The .NET Native compiler will automatically handle this code.

### typeof used outside the constructor

If you call a constructor of these serialization classes and use the C# [typeof](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/type-testing-and-cast#typeof-operator) operator outside the expression supplied to the constructor's [System.Type](https://learn.microsoft.com/search/?terms=System.Type) parameter, as in the following code, the .NET Native compiler cannot resolve the type:

[ProjectN#6 (complete source file; reference: code/serialize1.cs#6)](../../_code/uwp/dotnet-native/code/serialize1.cs.md)

In this case, you must specify the type in the runtime directives file by adding an entry like this:

```xml
<Type Name="DataSet" Browse="Required Public" />
```

Similarly, if you call a constructor such as [System.Xml.Serialization.XmlSerializer.%23ctor%28System.Type%2CSystem.Type%5B%5D%29](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer.%2523ctor%2528System.Type%252CSystem.Type%255B%255D%2529) and provide an array of additional [System.Type](https://learn.microsoft.com/search/?terms=System.Type) objects to serialize, as in the following code, the .NET Native compiler cannot resolve these types.

[ProjectN#7 (complete source file; reference: code/serialize1.cs#7)](../../_code/uwp/dotnet-native/code/serialize1.cs.md)

Add entries such as the following for each type to the runtime directives file:

```xml
<Type Name="t" Browse="Required Public" />
```

For information about the syntax used in the example, see [\<Type> Element](type-element-net-native.md).

## See also

- [Runtime Directives (rd.xml) Configuration File Reference](runtime-directives-rd-xml-configuration-file-reference.md)
- [Runtime Directive Elements](runtime-directive-elements.md)
- [\<Type> Element](type-element-net-native.md)
- [\<Namespace> Element](namespace-element-net-native.md)
