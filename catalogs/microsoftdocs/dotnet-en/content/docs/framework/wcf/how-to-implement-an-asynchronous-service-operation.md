---
title: "How to: Implement an Asynchronous Service Operation"
description: Learn about the structure of an asynchronous service operation in WFC. A service operation can be implemented asynchronously or synchronously.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 4e5d2ea5-d8f8-4712-bd18-ea3c5461702c
---
# How to: Implement an Asynchronous Service Operation

In Windows Communication Foundation (WCF) applications, a service operation can be implemented asynchronously or synchronously without dictating to the client how to call it. For example, asynchronous service operations can be called synchronously, and synchronous service operations can be called asynchronously. For an example that shows how to call an operation asynchronously in a client application, see [How to: Call Service Operations Asynchronously](feature-details/how-to-call-wcf-service-operations-asynchronously.md). For more information about synchronous and asynchronous operations, see [Designing Service Contracts](designing-service-contracts.md) and [Synchronous and Asynchronous Operations](synchronous-and-asynchronous-operations.md). This topic describes the basic structure of an asynchronous service operation, the code is not complete. For a complete example of both the service and client sides, see [Asynchronous](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/ms751505\(v=vs.100\)).

### Implement a service operation asynchronously

1. In your service contract, declare an asynchronous method pair according to the .NET asynchronous design guidelines. The `Begin` method takes a parameter, a callback object, and a state object, and returns a [System.IAsyncResult](https://learn.microsoft.com/search/?terms=System.IAsyncResult) and a matching `End` method that takes a [System.IAsyncResult](https://learn.microsoft.com/search/?terms=System.IAsyncResult) and returns the return value. For more information about asynchronous calls, see [Asynchronous Programming Design Patterns](../../standard/asynchronous-programming-patterns/event-based-asynchronous-pattern-eap.md).

2. Mark the `Begin` method of the asynchronous method pair with the [System.ServiceModel.OperationContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContractAttribute) attribute and set the [System.ServiceModel.OperationContractAttribute.AsyncPattern](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContractAttribute.AsyncPattern) property to `true`. For example, the following code performs steps 1 and 2.

     [C_SyncAsyncClient#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/c_syncasyncclient/cs/services.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_syncasyncclient/cs/services.cs.md)
     [C_SyncAsyncClient#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_syncasyncclient/vb/services.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_syncasyncclient/vb/services.vb.md)

3. Implement the `Begin/End` method pair in your service class according to the asynchronous design guidelines. For example, the following code example shows an implementation in which a string is written to the console in both the `Begin` and `End` portions of the asynchronous service operation, and the return value of the `End` operation is returned to the client. For the complete code example, see the Example section.

     [C_SyncAsyncClient#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/c_syncasyncclient/cs/services.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_syncasyncclient/cs/services.cs.md)
     [C_SyncAsyncClient#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_syncasyncclient/vb/services.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_syncasyncclient/vb/services.vb.md)

## Example

 The following code examples show:

1. A service contract interface with:

    1. A synchronous `SampleMethod` operation.

    2. An asynchronous `BeginSampleMethod` operation.

    3. An asynchronous `BeginServiceAsyncMethod`/`EndServiceAsyncMethod` operation pair.

2. A service implementation using a [System.IAsyncResult](https://learn.microsoft.com/search/?terms=System.IAsyncResult) object.

 [C_SyncAsyncClient#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/c_syncasyncclient/cs/services.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_syncasyncclient/cs/services.cs.md)
 [C_SyncAsyncClient#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_syncasyncclient/vb/services.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_syncasyncclient/vb/services.vb.md)

## See also

- [Designing Service Contracts](designing-service-contracts.md)
- [Synchronous and Asynchronous Operations](synchronous-and-asynchronous-operations.md)
