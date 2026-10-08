---
title: "How to: Call WCF Service Operations Asynchronously"
description: Learn how to create a WCF client that can access a service operation asynchronously by using the event-driven asynchronous calling model.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 0face17f-43ca-417b-9b33-737c0fc360df
---
# How to: Call WCF Service Operations Asynchronously

This article covers how a client can access a service operation asynchronously. The service in this article implements the `ICalculator` interface. The client can call the operations on this interface asynchronously by using the event-driven asynchronous calling model. (For more information about the event-based asynchronous calling model, see [Multithreaded Programming with the Event-based Asynchronous Pattern](../../../standard/asynchronous-programming-patterns/event-based-asynchronous-pattern-eap.md)). For an example that shows how to implement an operation asynchronously in a service, see [How to: Implement an Asynchronous Service Operation](../how-to-implement-an-asynchronous-service-operation.md). For more information about synchronous and asynchronous operations, see [Synchronous and Asynchronous Operations](../synchronous-and-asynchronous-operations.md).

> **Note:**
> The event-driven asynchronous calling model is not supported when using a [System.ServiceModel.ChannelFactory`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory%601). For information about making asynchronous calls using the [System.ServiceModel.ChannelFactory`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory%601), see [How to: Call Operations Asynchronously Using a Channel Factory](how-to-call-operations-asynchronously-using-a-channel-factory.md).

## Procedure

#### To call WCF service operations asynchronously

1. Run the [ServiceModel Metadata Utility Tool (Svcutil.exe)](../servicemodel-metadata-utility-tool-svcutil-exe.md) tool with both the `/async` and the `/tcv:Version35` command options together as shown in the following command.

    ```console
    svcutil /n:http://Microsoft.ServiceModel.Samples,Microsoft.ServiceModel.Samples http://localhost:8000/servicemodelsamples/service/mex /a /tcv:Version35
    ```

     This generates, in addition to the synchronous and standard delegate-based asynchronous operations, a WCF client class that contains:

    - Two `<operationName>``Async` operations for use with the event-based asynchronous calling approach. For example:

         [EventAsync#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/eventasync/cs/generatedclient.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/eventasync/cs/generatedclient.cs.md)
         [EventAsync#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/eventasync/vb/generatedclient.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/eventasync/vb/generatedclient.vb.md)

    - Operation completed events of the form `<operationName>``Completed` for use with the event-based asynchronous calling approach. For example:

         [EventAsync#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/eventasync/cs/generatedclient.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/eventasync/cs/generatedclient.cs.md)
         [EventAsync#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/eventasync/vb/generatedclient.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/eventasync/vb/generatedclient.vb.md)

    - [System.EventArgs](https://learn.microsoft.com/search/?terms=System.EventArgs) types for each operation (of the form `<operationName>``CompletedEventArgs`) for use with the event-based asynchronous calling approach. For example:

         [EventAsync#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/eventasync/cs/generatedclient.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/eventasync/cs/generatedclient.cs.md)
         [EventAsync#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/eventasync/vb/generatedclient.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/eventasync/vb/generatedclient.vb.md)

2. In the calling application, create a callback method to be called when the asynchronous operation is complete, as shown in the following sample code.

     [EventAsync#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/eventasync/cs/client.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/eventasync/cs/client.cs.md)
     [EventAsync#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/eventasync/vb/client.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/eventasync/vb/client.vb.md)

3. Prior to calling the operation, use a new generic [System.EventHandler`1](https://learn.microsoft.com/search/?terms=System.EventHandler%601) of type `<operationName>``EventArgs` to add the handler method (created in the preceding step) to the `<operationName>``Completed` event. Then call the `<operationName>``Async` method. For example:

     [EventAsync#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/eventasync/cs/client.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/eventasync/cs/client.cs.md)
     [EventAsync#5 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/eventasync/vb/client.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/eventasync/vb/client.vb.md)

## Example

> **Note:**
> The design guidelines for the event-based asynchronous model state that if more than one value is returned, one value is returned as the `Result` property and the others are returned as properties on the [System.EventArgs](https://learn.microsoft.com/search/?terms=System.EventArgs) object. One result of this is that if a client imports metadata using the event-based asynchronous command options and the operation returns more than one value, the default [System.EventArgs](https://learn.microsoft.com/search/?terms=System.EventArgs) object returns one value as the `Result` property and the remainder are properties of the [System.EventArgs](https://learn.microsoft.com/search/?terms=System.EventArgs) object.If you want to receive the message object as the `Result` property and have the returned values as properties on that object, use the `/messageContract` command option. This generates a signature that returns the response message as the `Result` property on the [System.EventArgs](https://learn.microsoft.com/search/?terms=System.EventArgs) object. All internal return values are then properties of the response message object.

 [EventAsync#6 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/eventasync/cs/client.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/eventasync/cs/client.cs.md)
 [EventAsync#6 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/eventasync/vb/client.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/eventasync/vb/client.vb.md)

## See also

- [How to: Implement an Asynchronous Service Operation](../how-to-implement-an-asynchronous-service-operation.md)
