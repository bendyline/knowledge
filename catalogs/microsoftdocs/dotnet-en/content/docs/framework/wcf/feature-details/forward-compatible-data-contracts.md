---
description: "Learn more about: Forward-Compatible Data Contracts"
title: "Forward-Compatible Data Contracts"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "data contracts [WCF], forward compatibility"
ms.assetid: 413c9044-26f8-4ecb-968c-18495ea52cd9
---
# Forward-Compatible Data Contracts

A feature of the Windows Communication Foundation (WCF) data contract system is that contracts can evolve over time in nonbreaking ways. That is, a client with an older version of a data contract can communicate with a service with a newer version of the same data contract, or a client with a newer version of a data contract can communicate with an older version of the same data contract. For more information, see [Best Practices: Data Contract Versioning](../best-practices-data-contract-versioning.md).

 You can apply most of the versioning features on an as-needed basis when new versions of an existing data contract are created. However, one versioning feature, *round-tripping*, must be built into the type from the first version in order to work properly.

## Round-Tripping

 Round-tripping occurs when data passes from a new version to an old version and back to the new version of a data contract. Round-tripping guarantees that no data is lost. Enabling round-tripping makes the type forward-compatible with any future changes supported by the data contract versioning model.

 To enable round-tripping for a particular type, the type must implement the [System.Runtime.Serialization.IExtensibleDataObject](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IExtensibleDataObject) interface. The interface contains one property, [System.Runtime.Serialization.IExtensibleDataObject.ExtensionData*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IExtensibleDataObject.ExtensionData*) (returning the [System.Runtime.Serialization.ExtensionDataObject](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ExtensionDataObject) type). The property stores any data from future versions of the data contract that is unknown to the current version.

### Example

 The following data contract is not forward-compatible with future changes.

 [C_DataContract#7 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_datacontract/cs/source.cs#7)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_datacontract/cs/source.cs.md)
 [C_DataContract#7 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontract/vb/source.vb#7)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontract/vb/source.vb.md)

 To make the type compatible with future changes (such as adding a new data member named "phoneNumber"), implement the [System.Runtime.Serialization.IExtensibleDataObject](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IExtensibleDataObject) interface.

 [C_DataContract#8 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_datacontract/cs/source.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_datacontract/cs/source.cs.md)
 [C_DataContract#8 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontract/vb/source.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_datacontract/vb/source.vb.md)

 When the WCF infrastructure encounters data that is not part of the original data contract, the data is stored in the property and preserved. It is not processed in any other way except for temporary storage. If the object is returned back to where it originated, the original (unknown) data is also returned. Therefore, the data has made a round trip to and from the originating endpoint without loss. Note, however, that if the originating endpoint required the data to be processed, that expectation is unmet, and the endpoint must somehow detect and accommodate the change.

 The [System.Runtime.Serialization.ExtensionDataObject](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ExtensionDataObject) type contains no public methods or properties. Thus, it is impossible to get direct access to the data stored inside the [System.Runtime.Serialization.IExtensibleDataObject.ExtensionData](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IExtensibleDataObject.ExtensionData) property.

 The round-tripping feature may be turned off, either by setting `ignoreExtensionDataObject` to `true` in the [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) constructor or by setting the [System.ServiceModel.ServiceBehaviorAttribute.IgnoreExtensionDataObject](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.IgnoreExtensionDataObject) property to `true` on the [System.ServiceModel.ServiceBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute). When this feature is off, the deserializer will not populate the [System.Runtime.Serialization.IExtensibleDataObject.ExtensionData](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IExtensibleDataObject.ExtensionData) property, and the serializer will not emit the contents of the property.

## See also

- [System.Runtime.Serialization.IExtensibleDataObject](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IExtensibleDataObject)
- [System.Runtime.Serialization.ExtensionDataObject](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ExtensionDataObject)
- [Data Contract Versioning](data-contract-versioning.md)
- [Best Practices: Data Contract Versioning](../best-practices-data-contract-versioning.md)
