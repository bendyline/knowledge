---
title: "Enumeration Types in Data Contracts"
description: Learn about how the data contract model expresses enumerations as part of the WFC programming model.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "data contracts [WCF], enumeration types"
ms.assetid: b5d694da-68cb-4b74-a5fb-75108a68ec3b
---
# Enumeration Types in Data Contracts

Enumerations can be expressed in the data contract model. This topic walks through several examples that explain the programming model.

## Enumeration Basics

 One way to use enumeration types in the data contract model is to apply the [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute) attribute to the type. You must then apply the [System.Runtime.Serialization.EnumMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.EnumMemberAttribute) attribute to each member that must be included in the data contract.

 The following example shows two classes. The first uses the enumeration and the second defines the enumeration.

 [c_DataContractEnumerations#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_datacontractenumerations/cs/source.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_datacontractenumerations/cs/source.cs.md)
 [c_DataContractEnumerations#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontractenumerations/vb/source.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontractenumerations/vb/source.vb.md)

 An instance of the `Car` class can be sent or received only if the `condition` field is set to one of the values `New`, `Used`, or `Rental`. If the `condition` is `Broken` or `Stolen`, a [System.Runtime.Serialization.SerializationException](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.SerializationException) is thrown.

 You can use the [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute) properties ([System.Runtime.Serialization.DataContractAttribute.Name*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute.Name*) and [System.Runtime.Serialization.DataContractAttribute.Namespace*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute.Namespace*)) as usual for enumeration data contracts.

### Enumeration Member Values

 Generally the data contract includes enumeration member names, not numerical values. However, when using the data contract model, if the receiving side is a WCF client, the exported schema preserves the numerical values. Note that this is not the case when using the [Using the XmlSerializer Class](using-the-xmlserializer-class.md).

 In the preceding example, if `condition` is set to `Used` and the data is serialized to XML, the resulting XML is `<condition>Used</condition>` and not `<condition>1</condition>`. Therefore, the following data contract is equivalent to the data contract of `CarConditionEnum`.

 [c_DataContractEnumerations#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_datacontractenumerations/cs/source.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_datacontractenumerations/cs/source.cs.md)
 [c_DataContractEnumerations#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontractenumerations/vb/source.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontractenumerations/vb/source.vb.md)

 For example, you can use `CarConditionEnum` on the sending side and `CarConditionWithNumbers` on the receiving side. Although the sending side uses the value "1" for `Used` and the receiving side uses the value "20," the XML representation is `<condition>Used</condition>` for both sides.

 To be included in the data contract, you must apply the [System.Runtime.Serialization.EnumMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.EnumMemberAttribute) attribute. In the .NET Framework, you can always apply the special value 0 (zero) to an enumeration, which is also the default value for any enumeration. However, even this special zero value cannot be serialized unless it is marked with the [System.Runtime.Serialization.EnumMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.EnumMemberAttribute) attribute.

 There are two exceptions to this:

- Flag enumerations (discussed later in this topic).

- Enumeration data members with the [System.Runtime.Serialization.DataMemberAttribute.EmitDefaultValue](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataMemberAttribute.EmitDefaultValue) property set to `false` (in which case, the enumeration with the value zero is omitted from the serialized data).

### Customizing Enumeration Member Values

 You can customize the enumeration member value that forms a part of the data contract by using the [System.Runtime.Serialization.EnumMemberAttribute.Value](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.EnumMemberAttribute.Value) property of the [System.Runtime.Serialization.EnumMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.EnumMemberAttribute) attribute.

 For example, the following data contract is also equivalent to the data contract of the `CarConditionEnum`.

 [c_DataContractEnumerations#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_datacontractenumerations/cs/source.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_datacontractenumerations/cs/source.cs.md)
 [c_DataContractEnumerations#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontractenumerations/vb/source.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontractenumerations/vb/source.vb.md)

 When serialized, the value of `PreviouslyOwned` has the XML representation `<condition>Used</condition>`.

## Simple Enumerations

 You can also serialize enumeration types to which the [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute) attribute has not been applied. Such enumeration types are treated exactly as previously described, except that every member (that does not have the [System.NonSerializedAttribute](https://learn.microsoft.com/search/?terms=System.NonSerializedAttribute) attribute applied) is treated as if the [System.Runtime.Serialization.EnumMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.EnumMemberAttribute) attribute has been applied. For example, the following enumeration implicitly has a data contract equivalent to the preceding `CarConditionEnum` example.

 [c_DataContractEnumerations#6 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_datacontractenumerations/cs/source.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_datacontractenumerations/cs/source.cs.md)
 [c_DataContractEnumerations#6 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontractenumerations/vb/source.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontractenumerations/vb/source.vb.md)

 You can use simple enumerations when you do not need to customize the enumeration's data contract name and namespace and the enumeration member values.

#### Notes on Simple Enumerations

 Applying the [System.Runtime.Serialization.EnumMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.EnumMemberAttribute) attribute to simple enumerations has no effect.

 It makes no difference whether or not the [System.SerializableAttribute](https://learn.microsoft.com/search/?terms=System.SerializableAttribute) attribute is applied to the enumeration.

 The fact that the [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) class honors the [System.NonSerializedAttribute](https://learn.microsoft.com/search/?terms=System.NonSerializedAttribute) attribute applied to enumeration members is different from the behavior of the [System.Runtime.Serialization.Formatters.Binary.BinaryFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Binary.BinaryFormatter) and the [System.Runtime.Serialization.Formatters.Soap.SoapFormatter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Formatters.Soap.SoapFormatter). Both of those serializers ignore the [System.NonSerializedAttribute](https://learn.microsoft.com/search/?terms=System.NonSerializedAttribute) attribute.

## Flag Enumerations

 You can apply the [System.FlagsAttribute](https://learn.microsoft.com/search/?terms=System.FlagsAttribute) attribute to enumerations. In that case, a list of zero or more enumeration values can be sent or received simultaneously.

 To do so, apply the [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute) attribute to the flag enumeration and then mark all the members that are powers of two with the [System.Runtime.Serialization.EnumMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.EnumMemberAttribute) attribute. Note that to use a flag enumeration, the progression must be an uninterrupted sequence of powers of 2 (for example, 1, 2, 4, 8, 16, 32, 64).

 The following steps apply to sending a flag's enumeration value:

1. Attempt to find an enumeration member (with the [System.Runtime.Serialization.EnumMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.EnumMemberAttribute) attribute applied) that maps to the numeric value. If found, send a list that contains just that member.

2. Attempt to break the numeric value into a sum such that there are enumeration members (each with the [System.Runtime.Serialization.EnumMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.EnumMemberAttribute) attribute applied) that map to each part of the sum. Send the list of all these members. Note that the *greedy algorithm* is used to find such a sum, and thus there is no guarantee that such a sum is found even if it is present. To avoid this problem, make sure that the numeric values of the enumeration members are powers of two.

3. If the preceding two steps fail, and the numeric value is nonzero, throw a [System.Runtime.Serialization.SerializationException](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.SerializationException). If the numeric value is zero, send the empty list.

### Example

 The following enumeration example can be used in a flag operation.

 [c_DataContractEnumerations#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_datacontractenumerations/cs/source.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_datacontractenumerations/cs/source.cs.md)
 [c_DataContractEnumerations#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontractenumerations/vb/source.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontractenumerations/vb/source.vb.md)

 The following example values are serialized as indicated.

 [c_DataContractEnumerations#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_datacontractenumerations/cs/source.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_datacontractenumerations/cs/source.cs.md)
 [c_DataContractEnumerations#5 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontractenumerations/vb/source.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontractenumerations/vb/source.vb.md)

## See also

- [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer)
- [Using Data Contracts](using-data-contracts.md)
- [Specifying Data Transfer in Service Contracts](specifying-data-transfer-in-service-contracts.md)
