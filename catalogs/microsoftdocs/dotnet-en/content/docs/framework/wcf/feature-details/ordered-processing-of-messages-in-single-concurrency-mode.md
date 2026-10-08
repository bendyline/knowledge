---
description: "Learn more about: Ordered Processing of Messages in Single Concurrency Mode"
title: "Ordered Processing of Messages in Single Concurrency Mode"
ms.date: "03/30/2017"
ms.assetid: a90f5662-a796-46cd-ae33-30a4072838af
---
# Ordered Processing of Messages in Single Concurrency Mode

WCF makes no guarantees about the order in which messages are processed, unless the underlying channel is sessionful.  For instance, a WCF service that uses MsmqInputChannel, which is not a sessionful channel, will fail to process messages in order. There are some circumstances where a developer may want the in order processing behavior but not want to use sessions. This topic describes how to configure this behavior when a service is running in Single Concurrency Mode.

## In-order Message Processing

 A new attribute called [System.ServiceModel.ServiceBehaviorAttribute.EnsureOrderedDispatch](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.EnsureOrderedDispatch) has been added to the [System.ServiceModel.ServiceBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute). When [System.ServiceModel.ServiceBehaviorAttribute.EnsureOrderedDispatch](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.EnsureOrderedDispatch) is set to true and [System.ServiceModel.ServiceBehaviorAttribute.ConcurrencyMode*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.ConcurrencyMode*) is set to [System.ServiceModel.ConcurrencyMode.Single](https://learn.microsoft.com/search/?terms=System.ServiceModel.ConcurrencyMode.Single) messages sent to the service will be processed in order. The following code snippet illustrates how to set these attributes.

```csharp
[ServiceBehavior(ConcurrencyMode = ConcurrencyMode.Single, EnsureOrderedDispatch = true )]
    class Service : IService
    {
         // ...
    }
```

 If [System.ServiceModel.ServiceBehaviorAttribute.ConcurrencyMode*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.ConcurrencyMode*) is set to any other value, an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) is thrown.

## See also

- [Sessions, Instancing, and Concurrency](sessions-instancing-and-concurrency.md)
- [Concurrency](../samples/concurrency.md)
