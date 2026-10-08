---
description: "Learn more about: Serializable Types"
title: "Serializable Types"
ms.date: "03/30/2017"
ms.assetid: f1c8539a-6a79-4413-b294-896f0957b2cd
---
# Serializable Types

By default, the [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) serializes all publicly visible types. All public read/write properties and fields of the type are serialized.

 You can change the default behavior by applying the [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute) and [System.Runtime.Serialization.DataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataMemberAttribute) attributes to the types and members This feature can be useful in situations in which you have types that are not under your control and cannot be modified to add attributes. The [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) recognizes such "unmarked" types.

## Serialization Defaults

 You can apply the [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute) and [System.Runtime.Serialization.DataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataMemberAttribute) attributes to explicitly control or customize the serialization of types and members. In addition, you can apply these attributes to private fields. However, even types that are not marked with these attributes are serialized and deserialized. The following rules and exceptions apply:

- The [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) infers a data contract from types without attributes using the default properties of the newly created types.

- All public fields, and properties with public `get` and `set` methods are serialized, unless you apply the [System.Runtime.Serialization.IgnoreDataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IgnoreDataMemberAttribute) attribute to that member.

- The serialization semantics are similar to those of the [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer).

- In unmarked types, only public types with constructors that do not have parameters are serialized. The exception to this rule is [System.Runtime.Serialization.ExtensionDataObject](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ExtensionDataObject) used with the [System.Runtime.Serialization.IExtensibleDataObject](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IExtensibleDataObject) interface.

- Read-only fields, properties without a `get` or `set` method, and properties with internal or private `set` or `get` methods are not serialized. Such properties are ignored and no exception is thrown, except in the case of get-only collections.

- [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer) attributes (such as `XmlElement`, `XmlAttribute`, `XmlIgnore`, `XmlInclude`, and so on) are ignored.

- If you do not apply the [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute) attribute to a given type, the serializer ignores any member in that type to which the [System.Runtime.Serialization.DataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataMemberAttribute) attribute is applied.

- The [System.Runtime.Serialization.DataContractSerializer.KnownTypes](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer.KnownTypes) property is supported in types not marked with the [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute) attribute. This includes support for the [System.Runtime.Serialization.KnownTypeAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.KnownTypeAttribute) attribute on unmarked types.

- To "opt out" of the serialization process for public members, properties, or fields, apply the [System.Runtime.Serialization.IgnoreDataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IgnoreDataMemberAttribute) attribute to that member.

## Inheritance

 Unmarked types (types without the [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute) attribute) can inherit from types that do have this attribute; however, the reverse is not permitted: types with the attribute cannot inherit from unmarked types. This rule is enforced primarily to ensure backward compatibility with code written in earlier versions of .NET Framework.

## See also

- [System.Runtime.Serialization.IgnoreDataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IgnoreDataMemberAttribute)
- [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute)
- [System.Runtime.Serialization.DataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataMemberAttribute)
- [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer)
- [Types Supported by the Data Contract Serializer](types-supported-by-the-data-contract-serializer.md)
