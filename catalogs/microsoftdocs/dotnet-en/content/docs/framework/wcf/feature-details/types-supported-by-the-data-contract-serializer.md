---
title: "Types Supported by the Data Contract Serializer"
description: See the complete list of types that the WCF data contract serializer supports for serialization and deserialization.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "serialization [WCF], supported types"
ms.assetid: 7381b200-437a-4506-9556-d77bf1bc3f34
---
# Types Supported by the Data Contract Serializer

Windows Communication Foundation (WCF) uses the [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) as its default serialization engine to convert data into XML and to convert XML back into data. The [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) is designed to serialize *data contract* types. However, it supports many other types, which can be thought of as having an implicit data contract. The following is a complete list of types that can be serialized:

- All publicly visible types that have a constructor that does not have parameters.

- Data contract types. These are types to which the [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute) attribute has been applied. New custom types that represent business objects should normally be created as data contract types. For more information, see [Using Data Contracts](using-data-contracts.md) and [Serializable Types](serializable-types.md).

- Collection types. These are types that represent lists of data. These can be regular arrays of types, or collection types, such as [System.Collections.ArrayList](https://learn.microsoft.com/search/?terms=System.Collections.ArrayList) and [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602). The [System.Runtime.Serialization.CollectionDataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.CollectionDataContractAttribute) attribute can be used to customize the serialization of these types, but is not required. For more information, see [Collection Types in Data Contracts](collection-types-in-data-contracts.md).

- Enumeration types. Enumerations, including flag enumerations, are serializable. Optionally, enumeration types can be marked with the [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute) attribute, in which case every member that participates in serialization must be marked with the [System.Runtime.Serialization.EnumMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.EnumMemberAttribute) attribute. Members that are not marked are not serialized. For more information, see [Enumeration Types in Data Contracts](enumeration-types-in-data-contracts.md).

- .NET Framework primitive types. The following types built into the .NET Framework can all be serialized and are considered to be primitive types: [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte), [System.SByte](https://learn.microsoft.com/search/?terms=System.SByte), [System.Int16](https://learn.microsoft.com/search/?terms=System.Int16), [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32), [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64), [System.UInt16](https://learn.microsoft.com/search/?terms=System.UInt16), [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32), [System.UInt64](https://learn.microsoft.com/search/?terms=System.UInt64), [System.Single](https://learn.microsoft.com/search/?terms=System.Single), [System.Double](https://learn.microsoft.com/search/?terms=System.Double), [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean), [System.Char](https://learn.microsoft.com/search/?terms=System.Char), [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal), [System.Object](https://learn.microsoft.com/search/?terms=System.Object), and [System.String](https://learn.microsoft.com/search/?terms=System.String).

- Other primitive types. These types are not primitives in the .NET Framework but are treated as primitives in the serialized XML form. These types are [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime), [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset), [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan), [System.Guid](https://learn.microsoft.com/search/?terms=System.Guid), [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri), [System.Xml.XmlQualifiedName](https://learn.microsoft.com/search/?terms=System.Xml.XmlQualifiedName), and arrays of [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte).

  > **Note:**
  > Unlike other primitive types, [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) is not a known type by default. For more information, see [Data Contract Known Types](data-contract-known-types.md)).

- Types marked with the [System.SerializableAttribute](https://learn.microsoft.com/search/?terms=System.SerializableAttribute) attribute. Many types included in the .NET Framework base class library fall into this category. The [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) fully supports this serialization programming model that was used by .NET Framework remoting, the [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter), and the [System.Runtime.Serialization.Formatters.Soap.SoapFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Soap.SoapFormatter), including support for the [System.Runtime.Serialization.ISerializable](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ISerializable) interface.

- Types that represent raw XML or types that represent ADO.NET relational data. The [System.Xml.XmlElement](https://learn.microsoft.com/search/?terms=System.Xml.XmlElement) and array of [System.Xml.XmlNode](https://learn.microsoft.com/search/?terms=System.Xml.XmlNode) types are supported as a way of representing XML directly. Additionally, types that implement the [System.Xml.Serialization.IXmlSerializable](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.IXmlSerializable) interface are supported, including the related [System.Xml.Serialization.XmlSchemaProviderAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSchemaProviderAttribute) attribute, and the [System.Xml.Linq.XDocument](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument) and [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement) types. The ADO.NET[System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) type and the [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) type (as well as its typed derived classes) all implement the [System.Xml.Serialization.IXmlSerializable](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.IXmlSerializable) interface, and therefore fit into this category. For more information, see [XML and ADO.NET Types in Data Contracts](xml-and-ado-net-types-in-data-contracts.md).

## Limitations of Using Certain Types in Partial Trust Mode

The following is a list of limitations when using certain types in partial trust mode scenarios:

- To serialize or deserialize a type that implements [System.Runtime.Serialization.ISerializable](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ISerializable) in partially-trusted code using the [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) requires the [System.Security.Permissions.SecurityPermissionAttribute.SerializationFormatter*](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityPermissionAttribute.SerializationFormatter*) and [System.Security.Permissions.SecurityPermissionAttribute.UnmanagedCode*](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityPermissionAttribute.UnmanagedCode*) permissions.

- When running WCF code in [Partial Trust](partial-trust.md) mode, the serialization and deserialization of `readonly` fields (both `public` and `private`) is not supported. This is because the generated IL is unverifiable and therefore requires elevated permissions.

- Both the [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) and the [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer) are supported in a partial trust environment. However, use of the [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) is subject to the following conditions:

  - All serializable `[DataContract]` types must be public.

  - All serializable `[DataMember]` fields or properties in a `[DataContract]` type must be public and read/write. The serialization and deserialization of `readonly` fields is not supported when running WCF in a partially-trusted application.

  - The `[Serializable]`/`ISerializable]` programming model is not supported in a partial trust environment.

  - Known types must be specified in code or machine-level configuration (`Machine.config`). Known types cannot be specified in application-level configuration for security reasons.

- Types that implement [System.Runtime.Serialization.IObjectReference](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IObjectReference) throw an exception in a partially-trusted environment because the [System.Runtime.Serialization.IObjectReference.GetRealObject*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IObjectReference.GetRealObject*) method requires the security permission `[SecurityPermission(SecurityAction.LinkDemand, Flags=SecurityPermissionFlag.SerializationFormatter)]`.

## Additional Notes on Serialization

The following rules also apply to types supported by the Data Contract Serializer:

- Generic types are fully supported by the data contract serializer.

- Nullable value types are fully supported by the data contract serializer.

- Interface types are treated either as [System.Object](https://learn.microsoft.com/search/?terms=System.Object) or, in the case of collection interfaces, as collection types.

- Both structures and classes are supported.

- The [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) does not support the programming model used by the [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer) and ASP.NET Web services. In particular, it does not support attributes like [System.Xml.Serialization.XmlElementAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlElementAttribute) and [System.Xml.Serialization.XmlAttributeAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlAttributeAttribute). To enable support for this programming model, WCF must be switched to use the [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer) instead of the [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer).

- The [System.DBNull](https://learn.microsoft.com/search/?terms=System.DBNull) type is treated in a special way. It is a singleton type, and upon deserialization the deserializer respects the singleton constraint and points all `DBNull` references to the singleton instance. Because `DBNull` is a serializable type, it demands [System.Security.Permissions.SecurityPermissionAttribute.SerializationFormatter*](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityPermissionAttribute.SerializationFormatter*) permission.

## See also

- [XML and ADO.NET Types in Data Contracts](xml-and-ado-net-types-in-data-contracts.md)
- [Using Data Contracts](using-data-contracts.md)
- [Serializable Types](serializable-types.md)
- [Collection Types in Data Contracts](collection-types-in-data-contracts.md)
- [Enumeration Types in Data Contracts](enumeration-types-in-data-contracts.md)
