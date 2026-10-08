---
description: "Learn more about: How to: Control Service Instancing"
title: "How to: Control Service Instancing"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: e0b12b34-8004-443a-a46d-83a5c00f2601
---
# How to: Control Service Instancing

Setting the instance mode of a service enables you to specify when a [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) (and its associated user-defined service object) is created. See the [System.ServiceModel.InstanceContextMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContextMode) enumeration for the possible modes. For more information about behaviors, see [Configuring and Extending the Runtime with Behaviors](../extending/configuring-and-extending-the-runtime-with-behaviors.md). For working examples, see [Behaviors](../samples/behaviors.md).

### To control the service instance lifetime using code

1. Apply the [System.ServiceModel.ServiceBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute) to the service class.

2. Set the [System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode) property to one of the following values: [System.ServiceModel.InstanceContextMode.PerCall](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContextMode.PerCall), [System.ServiceModel.InstanceContextMode.PerSession](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContextMode.PerSession), or [System.ServiceModel.InstanceContextMode.Single](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContextMode.Single).

     [C_ControlServiceInstancing#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_controlserviceinstancing/cs/source.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_controlserviceinstancing/cs/source.cs.md)
     [C_ControlServiceInstancing#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_controlserviceinstancing/vb/source.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_controlserviceinstancing/vb/source.vb.md)

## Example

 The following code example sets the [System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode) property of the [System.ServiceModel.ServiceBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute) attribute to [System.ServiceModel.InstanceContextMode.PerCall](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContextMode.PerCall).

 [c_ControlServiceInstancing#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_controlserviceinstancing/cs/source.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_controlserviceinstancing/cs/source.cs.md)
 [c_ControlServiceInstancing#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_controlserviceinstancing/vb/source.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_controlserviceinstancing/vb/source.vb.md)

## See also

- [System.ServiceModel.ServiceBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute)
- [System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode*)
- [System.ServiceModel.InstanceContextMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContextMode)
- [Service: Behaviors Samples](../samples/behaviors.md)
