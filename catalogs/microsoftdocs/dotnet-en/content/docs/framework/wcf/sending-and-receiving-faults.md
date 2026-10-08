---
title: "Sending and Receiving Faults"
description: Learn how a service or duplex client can send SOAP faults when an error condition occurs and how a client or service application handles these faults.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "handling faults [WCF], sending"
ms.assetid: 7be6fb96-ce2a-450b-aebe-f932c6a4bc5d
---
# Sending and Receiving Faults

SOAP faults convey error condition information from a service to a client and in the duplex case from a client to a service in an interoperable way. Typically a service defines custom fault content and specifies which operations can return them. (For more information, see [Defining and Specifying Faults](defining-and-specifying-faults.md).) This topic discusses how a service or duplex client can send those faults when the corresponding error condition has occurred and how a client or service application handles these faults. For an overview of error handling in Windows Communication Foundation (WCF) applications, see [Specifying and Handling Faults in Contracts and Services](specifying-and-handling-faults-in-contracts-and-services.md).

## Sending SOAP Faults

Declared SOAP faults are those in which an operation has a [System.ServiceModel.FaultContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultContractAttribute) that specifies a custom SOAP fault type. Undeclared SOAP faults are those that are not specified in the contract for an operation.

### Sending Declared Faults

To send a declared SOAP fault, detect the error condition for which the SOAP fault is appropriate and throw a new [System.ServiceModel.FaultException`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601) where the type parameter is a new object of the type specified in the [System.ServiceModel.FaultContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultContractAttribute) for that operation. The following code example shows the use of [System.ServiceModel.FaultContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultContractAttribute) to specify that the `SampleMethod` operation can return a SOAP fault with the detail type of `GreetingFault`.

[FaultContractAttribute#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/faultcontractattribute/cs/services.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/faultcontractattribute/cs/services.cs.md)
[FaultContractAttribute#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/faultcontractattribute/vb/services.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/faultcontractattribute/vb/services.vb.md)

To convey the `GreetingFault` error information to the client, catch the appropriate error condition and throw a new [System.ServiceModel.FaultException`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601) of type `GreetingFault` with a new `GreetingFault` object as the argument, as in the following code example. If the client is an WCF client application, it experiences this as a managed exception where the type is [System.ServiceModel.FaultException`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601) of type `GreetingFault`.

[FaultContractAttribute#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/faultcontractattribute/cs/services.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/faultcontractattribute/cs/services.cs.md)
[FaultContractAttribute#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/faultcontractattribute/vb/services.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/faultcontractattribute/vb/services.vb.md)

### Sending Undeclared Faults

Sending undeclared faults can be very useful to quickly diagnose and debug problems in WCF applications, but its usefulness as a debugging tool is limited. More generally, when debugging it is recommended that you use the [System.ServiceModel.Description.ServiceDebugBehavior.IncludeExceptionDetailInFaults](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceDebugBehavior.IncludeExceptionDetailInFaults) property. When you set this value to true, clients experience such faults as [System.ServiceModel.FaultException`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601) exceptions of type [System.ServiceModel.ExceptionDetail](https://learn.microsoft.com/search/?terms=System.ServiceModel.ExceptionDetail).

> **Important:**
> Because managed exceptions can expose internal application information, setting [System.ServiceModel.ServiceBehaviorAttribute.IncludeExceptionDetailInFaults*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.IncludeExceptionDetailInFaults*) or [System.ServiceModel.Description.ServiceDebugBehavior.IncludeExceptionDetailInFaults*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceDebugBehavior.IncludeExceptionDetailInFaults*) to `true` can permit WCF clients to obtain information about internal service operation exceptions, including personally identifiable or other sensitive information.
>
> Therefore, setting [System.ServiceModel.ServiceBehaviorAttribute.IncludeExceptionDetailInFaults*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.IncludeExceptionDetailInFaults*) or [System.ServiceModel.Description.ServiceDebugBehavior.IncludeExceptionDetailInFaults*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceDebugBehavior.IncludeExceptionDetailInFaults*) to `true` is only recommended as a way of temporarily debugging a service application. In addition, the WSDL for a method that returns unhandled managed exceptions in this way does not contain the contract for the [System.ServiceModel.FaultException`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601) of type [System.ServiceModel.ExceptionDetail](https://learn.microsoft.com/search/?terms=System.ServiceModel.ExceptionDetail). Clients must expect the possibility of an unknown SOAP fault (returned to WCF clients as [System.ServiceModel.FaultException](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException) objects) to obtain the debugging information properly.

To send an undeclared SOAP fault, throw a [System.ServiceModel.FaultException](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException) object (that is, not the generic type [System.ServiceModel.FaultException`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601)) and pass the string to the constructor. This is exposed to the WCF client applications as a thrown [System.ServiceModel.FaultException](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException) exception where the string is available by calling the [System.ServiceModel.FaultException`1.ToString*](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601.ToString*) method.

> **Note:**
> If you declare a SOAP fault of type string, and then throw this in your service as a [System.ServiceModel.FaultException`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601) where the type parameter is a [System.String](https://learn.microsoft.com/search/?terms=System.String) the string value is assigned to the [System.ServiceModel.FaultException`1.Detail](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601.Detail) property, and is not available from [System.ServiceModel.FaultException`1.ToString*](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601.ToString*).

## Handling Faults

In WCF clients, SOAP faults that occur during communication that are of interest to client applications are raised as managed exceptions. While there are many exceptions that can occur during the execution of any program, applications using the WCF client programming model can expect to handle exceptions of the following two types as a result of communication.

- [System.TimeoutException](https://learn.microsoft.com/search/?terms=System.TimeoutException)

- [System.ServiceModel.CommunicationException](https://learn.microsoft.com/search/?terms=System.ServiceModel.CommunicationException)

[System.TimeoutException](https://learn.microsoft.com/search/?terms=System.TimeoutException) objects are thrown when an operation exceeds the specified timeout period.

[System.ServiceModel.CommunicationException](https://learn.microsoft.com/search/?terms=System.ServiceModel.CommunicationException) objects are thrown when there is some recoverable communication error condition on either the service or the client.

The [System.ServiceModel.CommunicationException](https://learn.microsoft.com/search/?terms=System.ServiceModel.CommunicationException) class has two important derived types, [System.ServiceModel.FaultException](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException) and the generic [System.ServiceModel.FaultException`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601) type.

[System.ServiceModel.FaultException](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException) exceptions are thrown when a listener receives a fault that is not expected or specified in the operation contract; usually this occurs when the application is being debugged and the service has the [System.ServiceModel.Description.ServiceDebugBehavior.IncludeExceptionDetailInFaults](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceDebugBehavior.IncludeExceptionDetailInFaults) property set to `true`.

[System.ServiceModel.FaultException`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601) exceptions are thrown on the client when a fault that is specified in the operation contract is received in response to a two-way operation (that is, a method with an [System.ServiceModel.OperationContractAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContractAttribute) attribute with [System.ServiceModel.OperationContractAttribute.IsOneWay](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContractAttribute.IsOneWay) set to `false`).

> **Note:**
> When an WCF service has the [System.ServiceModel.ServiceBehaviorAttribute.IncludeExceptionDetailInFaults*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.IncludeExceptionDetailInFaults*) or [System.ServiceModel.Description.ServiceDebugBehavior.IncludeExceptionDetailInFaults](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceDebugBehavior.IncludeExceptionDetailInFaults) property set to `true` the client experiences this as an undeclared [System.ServiceModel.FaultException`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601) of type [System.ServiceModel.ExceptionDetail](https://learn.microsoft.com/search/?terms=System.ServiceModel.ExceptionDetail). Clients can either catch this specific fault or handle the fault in a catch block for [System.ServiceModel.FaultException](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException).

Typically, only [System.ServiceModel.FaultException`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601), [System.TimeoutException](https://learn.microsoft.com/search/?terms=System.TimeoutException), and [System.ServiceModel.CommunicationException](https://learn.microsoft.com/search/?terms=System.ServiceModel.CommunicationException) exceptions are of interest to clients and services.

> **Note:**
> Other exceptions, of course, do occur. Unexpected exceptions include catastrophic failures like [System.OutOfMemoryException](https://learn.microsoft.com/search/?terms=System.OutOfMemoryException); typically applications should not catch such methods.

### Catch Fault Exceptions in the Correct Order

Because [System.ServiceModel.FaultException`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601) derives from [System.ServiceModel.FaultException](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException), and [System.ServiceModel.FaultException](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException) derives from [System.ServiceModel.CommunicationException](https://learn.microsoft.com/search/?terms=System.ServiceModel.CommunicationException), it is important to catch these exceptions in the proper order. If, for example, you have a try/catch block in which you first catch [System.ServiceModel.CommunicationException](https://learn.microsoft.com/search/?terms=System.ServiceModel.CommunicationException), all specified and unspecified SOAP faults are handled there; any subsequent catch blocks to handle a custom [System.ServiceModel.FaultException`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601) exception are never invoked.

Remember that one operation can return any number of specified faults. Each fault is a unique type and must be handled separately.

### Handle Exceptions When Closing the Channel

Most of the preceding discussion has to do with faults sent in the course of processing application messages, that is, messages explicitly sent by the client when the client application calls operations on the WCF client object.

Even with local objects disposing the object can either raise or mask exceptions that occur during the recycling process. Something similar can occur when you use WCF client objects. When you call operations you are sending messages over an established connection. Closing the channel can throw exceptions if the connection cannot be cleanly closed or is already closed, even if all the operations returned properly.

Typically, client object channels are closed in one of the following ways:

- When the WCF client object is recycled.

- When the client application calls [System.ServiceModel.ClientBase`1.Close*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ClientBase%601.Close*).

- When the client application calls [System.ServiceModel.ICommunicationObject.Close*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ICommunicationObject.Close*).

- When the client application calls an operation that is a terminating operation for a session.

In all cases, closing the channel instructs the channel to begin closing any underlying channels that may be sending messages to support complex functionality at the application level. For example, when a contract requires sessions a binding attempts to establish a session by exchanging messages with the service channel until a session is established. When the channel is closed, the underlying session channel notifies the service that the session is terminated. In this case, if the channel has already aborted, closed, or is otherwise unusable (for example, when a network cable is unplugged), the client channel cannot inform the service channel that the session is terminated and an exception can result.

### Abort the Channel If Necessary

Because closing the channel can also throw exceptions, then, it is recommended that in addition to catching fault exceptions in the correct order, it is important to abort the channel that was used in making the call in the catch block.

If the fault conveys error information specific to an operation and it remains possible that others can use it, there is no need to abort the channel (although these cases are rare). In all other cases, it is recommended that you abort the channel. For a sample that demonstrates all of these points, see [Expected Exceptions](samples/expected-exceptions.md).

The following code example shows how to handle SOAP fault exceptions in a basic client application, including a declared fault and an undeclared fault.

> **Note:**
> This sample code does not use the `using` construct. Because closing channels can throw exceptions, it is recommended that applications create a WCF client first, and then open, use, and close the WCF client in the same try block. For details, see [WCF Client Overview](wcf-client-overview.md) and [Use Close and Abort to release WCF client resources](samples/use-close-abort-release-wcf-client-resources.md).

[FaultContractAttribute#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/faultcontractattribute/cs/client.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/faultcontractattribute/cs/client.cs.md)
[FaultContractAttribute#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/faultcontractattribute/vb/client.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/faultcontractattribute/vb/client.vb.md)

## See also

- [System.ServiceModel.FaultException](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException)
- [System.ServiceModel.FaultException`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException%601)
- [System.ServiceModel.CommunicationException](https://learn.microsoft.com/search/?terms=System.ServiceModel.CommunicationException)
- [Expected Exceptions](samples/expected-exceptions.md)
- [Use Close and Abort to release WCF client resources](samples/use-close-abort-release-wcf-client-resources.md)
