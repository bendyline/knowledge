---
description: "Learn more about: How to: Inspect and Modify Messages on the Service"
title: "How to: Inspect and Modify Messages on the Service"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 9c5b1cc7-84f3-45f8-9226-d59c278e8c42
---
# How to: Inspect and Modify Messages on the Service

You can inspect or modify the incoming or outgoing messages across a Windows Communication Foundation (WCF) service by implementing a [System.ServiceModel.Dispatcher.IDispatchMessageInspector](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.IDispatchMessageInspector) and inserting it into the service runtime. For more information, see [Extending Dispatchers](extending-dispatchers.md). The equivalent feature on the client is the [System.ServiceModel.Dispatcher.IClientMessageInspector](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.IClientMessageInspector).

### To inspect or modify messages

1. Implement the [System.ServiceModel.Dispatcher.IDispatchMessageInspector](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.IDispatchMessageInspector) interface.

2. Implement a [System.ServiceModel.Description.IServiceBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IServiceBehavior), [System.ServiceModel.Description.IEndpointBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IEndpointBehavior), or [System.ServiceModel.Description.IContractBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IContractBehavior) interface depending upon the scope at which you want to easily insert your service message inspector.

3. Insert your behavior prior to calling the [System.ServiceModel.ICommunicationObject.Open*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ICommunicationObject.Open*) method on the [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost). For details, see [Configuring and Extending the Runtime with Behaviors](configuring-and-extending-the-runtime-with-behaviors.md).

## Example

 The following code examples show, in order:

- A service inspector implementation.

- A service behavior that inserts the inspector.

- A configuration file that loads and runs the behavior in a service application.

 [Interceptors#7 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/interceptors/cs/interceptors.cs#7)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/interceptors/cs/interceptors.cs.md)
 [Interceptors#7 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/interceptors/vb/interceptors.vb#7)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/interceptors/vb/interceptors.vb.md)

 [Interceptors#8 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/interceptors/cs/insertingbehaviors.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/interceptors/cs/insertingbehaviors.cs.md)
 [Interceptors#8 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/interceptors/vb/insertingbehaviors.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/interceptors/vb/insertingbehaviors.vb.md)

 [Interceptors#9 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/interceptors/cs/hostapplication.exe.config#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/interceptors/cs/hostapplication.exe.config.md)

## See also

- [System.ServiceModel.Dispatcher.IClientMessageInspector](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.IClientMessageInspector)
- [System.ServiceModel.Dispatcher.IDispatchMessageInspector](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.IDispatchMessageInspector)
- [Configuring and Extending the Runtime with Behaviors](configuring-and-extending-the-runtime-with-behaviors.md)
