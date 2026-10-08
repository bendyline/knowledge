---
title: "Sessions, Instancing, and Concurrency"
description: Learn about sessions, instancing, and concurrency, how to use them, and the interactions between them in WFC.
ms.date: "03/30/2017"
ms.assetid: 50797a3b-7678-44ed-8138-49ac1602f35b
---
# Sessions, Instancing, and Concurrency

A *session* is a correlation of all messages sent between two endpoints. *Instancing* refers to controlling the lifetime of user-defined service objects and their related [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) objects. *Concurrency* is the term given to the control of the number of threads executing in an [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) at the same time.

 This topic describes these settings, how to use them, and the various interactions between them.

## Sessions

 When a service contract sets the [System.ServiceModel.ServiceContractAttribute.SessionMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceContractAttribute.SessionMode) property to [System.ServiceModel.SessionMode.Required](https://learn.microsoft.com/search/?terms=System.ServiceModel.SessionMode.Required), that contract is saying that all calls (that is, the underlying message exchanges that support the calls) must be part of the same conversation. If a contract specifies that it allows sessions but does not require one, clients can connect and either establish a session or not. If the session ends and a message is sent over the same session-based channel an exception is thrown.

 WCF sessions have the following main conceptual features:

- They are explicitly initiated and terminated by the calling application.

- Messages delivered during a session are processed in the order in which they are received.

- Sessions correlate a group of messages into a conversation. The meaning of that correlation is an abstraction. For instance, one session-based channel may correlate messages based on a shared network connection while another session-based channel may correlate messages based on a shared tag in the message body. The features that can be derived from the session depend on the nature of the correlation.

- There is no general data store associated with a WCF session.

 If you are familiar with the [System.Web.SessionState.HttpSessionState](https://learn.microsoft.com/search/?terms=System.Web.SessionState.HttpSessionState) class in ASP.NET applications and the functionality it provides, you might notice the following differences between that kind of session and WCF sessions:

- ASP.NET sessions are always server-initiated.

- ASP.NET sessions are implicitly unordered.

- ASP.NET sessions provide a general data storage mechanism across requests.

 Client applications and service applications interact with sessions in different ways. Client applications initiate sessions and then receive and process the messages sent within the session. Service applications can use sessions as an extensibility point to add additional behavior. This is done by working directly with the [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) or implementing a custom instance context provider.

## Instancing

 The instancing behavior (set by using the [System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode) property) controls how the [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) is created in response to incoming messages. By default, each [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) is associated with one user-defined service object, so (in the default case) setting the [System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode) property also controls the instancing of user-defined service objects. The [System.ServiceModel.InstanceContextMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContextMode) enumeration defines the instancing modes.

 The following instancing modes are available:

- [System.ServiceModel.InstanceContextMode.PerCall](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContextMode.PerCall): A new [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) (and therefore service object) is created for each client request.

- [System.ServiceModel.InstanceContextMode.PerSession](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContextMode.PerSession): A new [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) (and therefore service object) is created for each new client session and maintained for the lifetime of that session (this requires a binding that supports sessions).

- [System.ServiceModel.InstanceContextMode.Single](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContextMode.Single): A single [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) (and therefore service object) handles all client requests for the lifetime of the application.

 The following code example shows the default [System.ServiceModel.InstanceContextMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContextMode) value, [System.ServiceModel.InstanceContextMode.PerSession](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContextMode.PerSession) being explicitly set on a service class.

```csharp
[ServiceBehavior(InstanceContextMode=InstanceContextMode.PerSession)]
public class CalculatorService : ICalculatorInstance
{
    ...
}
```

 And while the [System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode) property controls how often the [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) is released, the [System.ServiceModel.OperationBehaviorAttribute.ReleaseInstanceMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationBehaviorAttribute.ReleaseInstanceMode) and [System.ServiceModel.ServiceBehaviorAttribute.ReleaseServiceInstanceOnTransactionComplete](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.ReleaseServiceInstanceOnTransactionComplete) properties control when the service object is released.

### Well-Known Singleton Services

 One variation on single instance service objects is sometimes useful: you can create a service object yourself and create the service host using that object. To do so, you must also set the [System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode) property to [System.ServiceModel.InstanceContextMode.Single](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContextMode.Single) or an exception is thrown when the service host is opened.

 Use the [System.ServiceModel.ServiceHost.%23ctor%28System.Object%2CSystem.Uri%5B%5D%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost.%2523ctor%2528System.Object%252CSystem.Uri%255B%255D%2529) constructor to create such a service. It provides an alternative to implementing a custom [System.ServiceModel.Dispatcher.IInstanceContextInitializer](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.IInstanceContextInitializer) when you wish to provide a specific object instance for use by a singleton service. You can use this overload when your service implementation type is difficult to construct (for example, if it does not implement a parameterless public constructor).

 Note that when an object is provided to this constructor, some features related to the Windows Communication Foundation (WCF) instancing behavior work differently. For example, calling [System.ServiceModel.InstanceContext.ReleaseServiceInstance*](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext.ReleaseServiceInstance*) has no effect when a singleton object instance is provided. Similarly, any other instance-release mechanism is ignored. The [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) always behaves as if the [System.ServiceModel.OperationBehaviorAttribute.ReleaseInstanceMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationBehaviorAttribute.ReleaseInstanceMode) property is set to [System.ServiceModel.ReleaseInstanceMode.None](https://learn.microsoft.com/search/?terms=System.ServiceModel.ReleaseInstanceMode.None) for all operations.

### Sharing InstanceContext Objects

 You can also control which sessionful channel or call is associated with which [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) object by performing that association yourself.

## Concurrency

 Concurrency is the control of the number of threads active in an [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) at any one time. This is controlled by using the [System.ServiceModel.ServiceBehaviorAttribute.ConcurrencyMode*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.ConcurrencyMode*) with the [System.ServiceModel.ConcurrencyMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.ConcurrencyMode) enumeration.

 The following three concurrency modes are available:

- [System.ServiceModel.ConcurrencyMode.Single](https://learn.microsoft.com/search/?terms=System.ServiceModel.ConcurrencyMode.Single): Each instance context is allowed to have a maximum of one thread processing messages in the instance context at a time. Other threads wishing to use the same instance context must block until the original thread exits the instance context.

- [System.ServiceModel.ConcurrencyMode.Multiple](https://learn.microsoft.com/search/?terms=System.ServiceModel.ConcurrencyMode.Multiple): Each service instance can have multiple threads processing messages concurrently. The service implementation must be thread-safe to use this concurrency mode.

- [System.ServiceModel.ConcurrencyMode.Reentrant](https://learn.microsoft.com/search/?terms=System.ServiceModel.ConcurrencyMode.Reentrant): Each service instance processes one message at a time, but accepts re-entrant operation calls. The service only accepts these calls when it is calling out through a WCF client object.

> **Note:**
> Understanding and developing code that safely uses more than one thread can be difficult to write successfully. Before using [System.ServiceModel.ConcurrencyMode.Multiple](https://learn.microsoft.com/search/?terms=System.ServiceModel.ConcurrencyMode.Multiple) or [System.ServiceModel.ConcurrencyMode.Reentrant](https://learn.microsoft.com/search/?terms=System.ServiceModel.ConcurrencyMode.Reentrant) values, ensure that your service is properly designed for these modes. For more information, see [System.ServiceModel.ServiceBehaviorAttribute.ConcurrencyMode*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.ConcurrencyMode*).

 The use of concurrency is related to the instancing mode. In [System.ServiceModel.InstanceContextMode.PerCall](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContextMode.PerCall) instancing, concurrency is not relevant, because each message is processed by a new [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) and, therefore, never more than one thread is active in the [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext).

 The following code example demonstrates setting the [System.ServiceModel.ServiceBehaviorAttribute.ConcurrencyMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.ConcurrencyMode) property to [System.ServiceModel.ConcurrencyMode.Multiple](https://learn.microsoft.com/search/?terms=System.ServiceModel.ConcurrencyMode.Multiple).

```csharp
[ServiceBehavior(ConcurrencyMode=ConcurrencyMode.Multiple, InstanceContextMode = InstanceContextMode.Single)]
public class CalculatorService : ICalculatorConcurrency
{
    ...
}
```

## Sessions Interact with InstanceContext Settings

 Sessions and [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) interact depending upon the combination of the value of the [System.ServiceModel.SessionMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.SessionMode) enumeration in a contract and the [System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode) property on the service implementation, which controls the association between channels and specific service objects.

 The following table shows the result of an incoming channel either supporting sessions or not supporting sessions given a service's combination of the values of the [System.ServiceModel.ServiceContractAttribute.SessionMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceContractAttribute.SessionMode) property and the [System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode) property.

| InstanceContextMode value | [System.ServiceModel.SessionMode.Required](https://learn.microsoft.com/search/?terms=System.ServiceModel.SessionMode.Required) | [System.ServiceModel.SessionMode.Allowed](https://learn.microsoft.com/search/?terms=System.ServiceModel.SessionMode.Allowed) | [System.ServiceModel.SessionMode.NotAllowed](https://learn.microsoft.com/search/?terms=System.ServiceModel.SessionMode.NotAllowed) |
| --- | --- | --- | --- |
| PerCall | -   Behavior with sessionful channel: A session and [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) for each call.<br />-   Behavior with sessionless channel: An exception is thrown. | -   Behavior with sessionful channel: A session and [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) for each call.<br />-   Behavior with sessionless channel: An [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) for each call. | -   Behavior with sessionful channel: An exception is thrown.<br />-   Behavior with sessionless channel: An [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) for each call. |
| PerSession | -   Behavior with sessionful channel: A session and [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) for each channel.<br />-   Behavior with sessionless channel: An exception is thrown. | -   Behavior with sessionful channel: A session and [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) for each channel.<br />-   Behavior with sessionless channel: An [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) for each call. | -   Behavior with sessionful channel: An exception is thrown.<br />-   Behavior with sessionless channel: An [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) for each call. |
| Single | -   Behavior with sessionful channel: A session and one [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) for all calls.<br />-   Behavior with sessionless channel: An exception is thrown. | -   Behavior with sessionful channel: A session and [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) for the created or user-specified singleton.<br />-   Behavior with sessionless channel: An [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) for the created or user-specified singleton. | -   Behavior with sessionful channel: An exception is thrown.<br />-   Behavior with sessionless channel: An [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) for each created singleton or for the user-specified singleton. |

## See also

- [Using Sessions](../using-sessions.md)
- [How to: Create a Service That Requires Sessions](how-to-create-a-service-that-requires-sessions.md)
- [How to: Control Service Instancing](how-to-control-service-instancing.md)
- [Concurrency](../samples/concurrency.md)
- [Instancing](../samples/instancing.md)
- [Session](../samples/session.md)
