---
description: "Learn more about: Specifying Client Run-Time Behavior"
title: "Specifying Client Run-Time Behavior"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "behaviors [WCF], system-provided client"
ms.assetid: d16d3405-be70-4edb-8f62-b5f614ddeca5
---
# Specifying Client Run-Time Behavior

Windows Communication Foundation (WCF) clients, like Windows Communication Foundation (WCF) services, can be configured to modify the runtime behavior to suit the client application. Three attributes are available for specifying client runtime behavior. Duplex client callback objects can use the [System.ServiceModel.CallbackBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.CallbackBehaviorAttribute) and [System.ServiceModel.Description.CallbackDebugBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.CallbackDebugBehavior) attributes to modify their runtime behavior. The other attribute, [System.ServiceModel.Description.ClientViaBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ClientViaBehavior), can be used to separate the logical destination from the immediate network destination. In addition, duplex client callback types can use some of the service-side behaviors. For more information, see [Specifying Service Run-Time Behavior](specifying-service-run-time-behavior.md).

## Using the CallbackBehaviorAttribute

 You can configure or extend the execution behavior of a callback contract implementation in a client application by using the [System.ServiceModel.CallbackBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.CallbackBehaviorAttribute) class. This attribute performs a similar function for the callback class as the [System.ServiceModel.ServiceBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute) class, with the exception of instancing behavior and transaction settings.

 The [System.ServiceModel.CallbackBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.CallbackBehaviorAttribute) class must be applied to the class that implements the callback contract. If applied to a nonduplex contract implementation, an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) exception is thrown at runtime. The following code example shows a [System.ServiceModel.CallbackBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.CallbackBehaviorAttribute) class on a callback object that uses the [System.Threading.SynchronizationContext](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationContext) object to determine the thread to marshal to, the [System.ServiceModel.CallbackBehaviorAttribute.ValidateMustUnderstand](https://learn.microsoft.com/search/?terms=System.ServiceModel.CallbackBehaviorAttribute.ValidateMustUnderstand) property to enforce message validation, and the [System.ServiceModel.CallbackBehaviorAttribute.IncludeExceptionDetailInFaults](https://learn.microsoft.com/search/?terms=System.ServiceModel.CallbackBehaviorAttribute.IncludeExceptionDetailInFaults) property to return exceptions as [System.ServiceModel.FaultException](https://learn.microsoft.com/search/?terms=System.ServiceModel.FaultException) objects to the service for debugging purposes.

 [CallbackBehaviorAttribute#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/callbackbehaviorattribute/cs/client.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/callbackbehaviorattribute/cs/client.cs.md)
 [CallbackBehaviorAttribute#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/callbackbehaviorattribute/vb/client.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/callbackbehaviorattribute/vb/client.vb.md)

## Using CallbackDebugBehavior to Enable the Flow of Managed Exception Information

 You can enable the flow of managed exception information in a client callback object back to the service for debugging purposes by setting the [System.ServiceModel.Description.CallbackDebugBehavior.IncludeExceptionDetailInFaults](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.CallbackDebugBehavior.IncludeExceptionDetailInFaults) property to `true` either programmatically or from an application configuration file.

 Returning managed exception information to services can be a security risk because exception details expose information about the internal client implementation that  unauthorized services could use. In addition, although the [System.ServiceModel.Description.CallbackDebugBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.CallbackDebugBehavior) properties can also be set programmatically, it can be easy to forget to disable [System.ServiceModel.Description.CallbackDebugBehavior.IncludeExceptionDetailInFaults*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.CallbackDebugBehavior.IncludeExceptionDetailInFaults*) when deploying.

 Because of the security issues involved, it is strongly recommended that:

- You use an application configuration file to set the value of the [System.ServiceModel.Description.CallbackDebugBehavior.IncludeExceptionDetailInFaults](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.CallbackDebugBehavior.IncludeExceptionDetailInFaults) property to `true`.

- You do so only in controlled debugging scenarios.

 The following code example shows a client configuration file that instructs WCF to return managed exception information from a client callback object in SOAP messages.

 [SCA.CallbackContract#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/sca.callbackcontract/cs/client.exe.config#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/sca.callbackcontract/cs/client.exe.config.md)

## Using the ClientViaBehavior Behavior

 You can use the [System.ServiceModel.Description.ClientViaBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ClientViaBehavior) behavior to specify the Uniform Resource Identifier for which the transport channel should be created. Use this behavior when the immediate network destination is not the intended processor of the message. This enables multiple-hop conversations when the calling application does not necessarily know the ultimate destination or when the destination `Via` header is not an address.

## See also

- [Specifying Service Run-Time Behavior](specifying-service-run-time-behavior.md)
