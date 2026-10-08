---
title: "Using Data Contracts"
description: Learn about a data contract, which defines, for each parameter or return type, what data is serialized to be exchanged between a WCF client and server.
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
helpviewer_keywords: 
  - "DataContractAttribute class"
  - "WCF, data"
  - "data contracts [WCF]"
ms.assetid: a3ae7b21-c15c-4c05-abd8-f483bcbf31af
---
# Using Data Contracts

A *data contract* is a formal agreement between a service and a client that abstractly describes the data to be exchanged. That is, to communicate, the client and the service do not have to share the same types, only the same data contracts. A data contract precisely defines, for each parameter or return type, what data is serialized (turned into XML) to be exchanged.  
  
## Data Contract Basics  

 Windows Communication Foundation (WCF) uses a serialization engine called the Data Contract Serializer by default to serialize and deserialize data (convert it to and from XML). All .NET Framework primitive types, such as integers and strings, as well as certain types treated as primitives, such as [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.Xml.XmlElement](https://learn.microsoft.com/search/?terms=System.Xml.XmlElement), can be serialized with no other preparation and are considered as having default data contracts. Many .NET Framework types also have existing data contracts. For a full list of serializable types, see [Types Supported by the Data Contract Serializer](types-supported-by-the-data-contract-serializer.md).  
  
 New complex types that you create must have a data contract defined for them to be serializable. By default, the [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) infers the data contract and serializes all publicly visible types. All public read/write properties and fields of the type are serialized. You can opt out members from serialization by using the [System.Runtime.Serialization.IgnoreDataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IgnoreDataMemberAttribute). You can also explicitly create a data contract by using [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute) and [System.Runtime.Serialization.DataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataMemberAttribute) attributes. This is normally done by applying the [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute) attribute to the type. This attribute can be applied to classes, structures, and enumerations. The [System.Runtime.Serialization.DataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataMemberAttribute) attribute must then be applied to each member of the data contract type to indicate that it is a *data member*, that is, it should be serialized. For more information, see [Serializable Types](serializable-types.md).  
  
### Example  

 The following example shows a service contract (an interface) to which the [System.ServiceModel.ServiceContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceContractAttribute) and [System.ServiceModel.OperationContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContractAttribute) attributes have been explicitly applied. The example shows that primitive types do not require a data contract, while a complex type does.  
  
 [C_DataContract#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_datacontract/cs/source.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_datacontract/cs/source.cs.md)
 [C_DataContract#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontract/vb/source.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontract/vb/source.vb.md)  
  
 The following example shows how a data contract for the `MyTypes.PurchaseOrder` type is created by applying the [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute) and [System.Runtime.Serialization.DataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataMemberAttribute) attributes to the class and its members.  
  
 [C_DataContract#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_datacontract/cs/source.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_datacontract/cs/source.cs.md)
 [C_DataContract#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontract/vb/source.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontract/vb/source.vb.md)  
  
### Notes  

 The following notes provide items to consider when creating data contracts:  
  
- The [System.Runtime.Serialization.IgnoreDataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IgnoreDataMemberAttribute) attribute is only honored when used with unmarked types. This includes types that are not marked with one of the [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute), [System.SerializableAttribute](https://learn.microsoft.com/search/?terms=System.SerializableAttribute), [System.Runtime.Serialization.CollectionDataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.CollectionDataContractAttribute), or [System.Runtime.Serialization.EnumMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.EnumMemberAttribute) attributes, or marked as serializable by any other means (such as [System.Xml.Serialization.IXmlSerializable](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.IXmlSerializable)).  
  
- You can apply the [System.Runtime.Serialization.DataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataMemberAttribute) attribute to fields, and properties.  
  
- Member accessibility levels (internal, private, protected, or public) do not affect the data contract in any way.  
  
- The [System.Runtime.Serialization.DataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataMemberAttribute) attribute is ignored if it is applied to static members.  
  
- During serialization, property-get code is called for property data members to get the value of the properties to be serialized.  
  
- During deserialization, an uninitialized object is first created, without calling any constructors on the type. Then all data members are deserialized.  
  
- During deserialization, property-set code is called for property data members to set the properties to the value being deserialized.  
  
- For a data contract to be valid, it must be possible to serialize all of its data members. For a full list of serializable types, see [Types Supported by the Data Contract Serializer](types-supported-by-the-data-contract-serializer.md).  
  
     Generic types are handled in exactly the same way as non-generic types. There are no special requirements for generic parameters. For example, consider the following type.  
  
 [C_DataContract#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_datacontract/cs/source.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_datacontract/cs/source.cs.md)
 [C_DataContract#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontract/vb/source.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontract/vb/source.vb.md)  
  
 This type is serializable whether the type used for the generic type parameter (`T`) is serializable or not. Because it must be possible to serialize all data members, the following type is serializable only if the generic type parameter is also serializable, as shown in the following code.  
  
 [C_DataContract#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_datacontract/cs/source.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_datacontract/cs/source.cs.md)
 [C_DataContract#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontract/vb/source.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontract/vb/source.vb.md)  
  
 For a complete code sample of a WCF service that defines a data contract see the [Basic Data Contract](../samples/basic-data-contract.md) sample.  
  
## See also

- [System.Runtime.Serialization.DataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataMemberAttribute)
- [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute)
- [Serializable Types](serializable-types.md)
- [Data Contract Names](data-contract-names.md)
- [Data Contract Equivalence](data-contract-equivalence.md)
- [Data Member Order](data-member-order.md)
- [Data Contract Known Types](data-contract-known-types.md)
- [Forward-Compatible Data Contracts](forward-compatible-data-contracts.md)
- [Data Contract Versioning](data-contract-versioning.md)
- [Version-Tolerant Serialization Callbacks](version-tolerant-serialization-callbacks.md)
- [Data Member Default Values](data-member-default-values.md)
- [Types Supported by the Data Contract Serializer](types-supported-by-the-data-contract-serializer.md)
- [How to: Create a Basic Data Contract for a Class or Structure](how-to-create-a-basic-data-contract-for-a-class-or-structure.md)
