---
description: "Learn more about: How to: Inspect or Modify Parameters"
title: "How to: Inspect or Modify Parameters"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: ab6c0ac7-aac4-45ba-93d6-a0e9afd1756f
---
# How to: Inspect or Modify Parameters

You can inspect or modify the incoming or outgoing messages for a single operation on a Windows Communication Foundation (WCF) client object or a WCF service by implementing the [System.ServiceModel.Dispatcher.IParameterInspector](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.IParameterInspector) interface and inserting it into the client or service runtime. Typically an operation behavior is used to add parameter inspectors for a single operation; other behaviors can be used to provide easy access to the runtime at a greater scope. For more information, see [Extending Clients](extending-clients.md) and [Extending Dispatchers](extending-dispatchers.md).

### Inspecting or Modifying Parameters

1. Implement the [System.ServiceModel.Dispatcher.IParameterInspector](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.IParameterInspector) interface.

2. Implement a [System.ServiceModel.Description.IOperationBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IOperationBehavior), [System.ServiceModel.Description.IEndpointBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IEndpointBehavior), [System.ServiceModel.Description.IServiceBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IServiceBehavior) or [System.ServiceModel.Description.IContractBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IContractBehavior) (depending upon the required scope) to add your parameter inspector to either the [System.ServiceModel.Dispatcher.ClientOperation.ParameterInspectors*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.ClientOperation.ParameterInspectors*) or [System.ServiceModel.Dispatcher.DispatchOperation.ParameterInspectors](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.DispatchOperation.ParameterInspectors) properties.

3. Insert your behavior prior to calling [System.ServiceModel.ClientBase`1.Open*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ClientBase%601.Open*) or the [System.ServiceModel.ICommunicationObject.Open*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ICommunicationObject.Open*) method on the [System.ServiceModel.ChannelFactory`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory%601). For details, see [Configuring and Extending the Runtime with Behaviors](configuring-and-extending-the-runtime-with-behaviors.md).

## Example

 The following code examples show, in order:

- A parameter inspector implementation.

- The behavior implementation that inserts the parameter inspector using a [System.ServiceModel.Description.IOperationBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IOperationBehavior), [System.ServiceModel.Description.IEndpointBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IEndpointBehavior), and an [System.ServiceModel.Description.IServiceBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IServiceBehavior).

- A configuration file that loads and runs the endpoint behavior in a client application to insert the parameter inspector on the client.

 [Interceptors#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/interceptors/cs/interceptors.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/interceptors/cs/interceptors.cs.md)
 [Interceptors#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/interceptors/vb/interceptors.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/interceptors/vb/interceptors.vb.md)

 [Interceptors#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/interceptors/cs/insertingbehaviors.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/interceptors/cs/insertingbehaviors.cs.md)
 [Interceptors#5 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/interceptors/vb/insertingbehaviors.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/interceptors/vb/insertingbehaviors.vb.md)

 [Interceptors#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/interceptors/cs/client.exe.config#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/interceptors/cs/client.exe.config.md)

## See also

- [Configuring and Extending the Runtime with Behaviors](configuring-and-extending-the-runtime-with-behaviors.md)
