---
description: "Learn more about: Extensible Objects"
title: "Extensible Objects"
ms.date: "03/30/2017"
helpviewer_keywords:
  - "extensible objects [WCF]"
ms.assetid: bc88cefc-31fb-428e-9447-6d20a7d452af
---
# Extensible Objects

The extensible object pattern is used to either extend existing runtime classes with new functionality or to add new state to an object. Extensions, attached to one of the extensible objects, enable behaviors at very different stages in processing to access shared state and functionality attached to a common extensible object that they can access.

## The IExtensibleObject\<T> Pattern

There are three interfaces in the extensible object pattern: [System.ServiceModel.IExtensibleObject`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtensibleObject%601), [System.ServiceModel.IExtension`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601), and [System.ServiceModel.IExtensionCollection`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtensionCollection%601).

The [System.ServiceModel.IExtensibleObject`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtensibleObject%601) interface is implemented by types that allow [System.ServiceModel.IExtension`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601) objects to customize their functionality.

Extensible objects allow dynamic aggregation of [System.ServiceModel.IExtension`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601) objects. [System.ServiceModel.IExtension`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601) objects are characterized by the following interface:

```csharp
public interface IExtension<T>
where T : IExtensibleObject<T>
{
    void Attach(T owner);
    void Detach(T owner);
}
```

The type restriction guarantees that extensions can only be defined for classes that are [System.ServiceModel.IExtensibleObject`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtensibleObject%601). [System.ServiceModel.IExtension`1.Attach*](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601.Attach*) and [System.ServiceModel.IExtension`1.Detach*](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601.Detach*) provide notification of aggregation or disaggregation.

It is valid for implementations to restrict when they may be added and removed from an owner. For example, you can disallow removal entirely, disallowing adding or removing extensions when the owner or extension are in a certain state, disallow adding to multiple owners concurrently, or allow only a single addition followed by a single remove.

[System.ServiceModel.IExtension`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601) does not imply any interactions with other standard managed interfaces. Specifically, the [System.IDisposable.Dispose*](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose*) method on the owner object does not normally detach its extensions.

When an extension is added to the collection, [System.ServiceModel.IExtension`1.Attach*](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601.Attach*) is called before it goes into the collection. When an extension is removed from the collection, [System.ServiceModel.IExtension`1.Detach*](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601.Detach*) is called after it is removed. This means (assuming appropriate synchronization) an extension can count on only being found in the collection while it is between [System.ServiceModel.IExtension`1.Attach*](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601.Attach*) and [System.ServiceModel.IExtension`1.Detach*](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601.Detach*).

The object passed to [System.ServiceModel.IExtensionCollection`1.FindAll*](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtensionCollection%601.FindAll*) or [System.ServiceModel.IExtensionCollection`1.Find*](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtensionCollection%601.Find*) need not be [System.ServiceModel.IExtension`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601) (for example, you can pass any object), but the returned extension is an [System.ServiceModel.IExtension`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601).

If no extension in the collection is an [System.ServiceModel.IExtension`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601), [System.ServiceModel.IExtensionCollection`1.Find*](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtensionCollection%601.Find*) returns null, and [System.ServiceModel.IExtensionCollection`1.FindAll*](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtensionCollection%601.FindAll*) returns an empty collection. If multiple extensions implement [System.ServiceModel.IExtension`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601), [System.ServiceModel.IExtensionCollection`1.Find*](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtensionCollection%601.Find*) returns one of them. The value returned from [System.ServiceModel.IExtensionCollection`1.FindAll*](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtensionCollection%601.FindAll*) is a snapshot.

There are two main scenarios. The first scenario uses the [System.ServiceModel.IExtensibleObject`1.Extensions](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtensibleObject%601.Extensions) property as a type-based dictionary to insert state on an object to enable another component to look it up using the type.

The second scenario uses the [System.ServiceModel.IExtension`1.Attach*](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601.Attach*) and [System.ServiceModel.IExtension`1.Detach*](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601.Detach*) methods to enable an object to participate in custom behavior, such as registering for events, watching state transitions, and so on.

The [System.ServiceModel.IExtensionCollection`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtensionCollection%601) interface is a collection of the [System.ServiceModel.IExtension`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601) objects that allow for retrieving the [System.ServiceModel.IExtension`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601) by its type. [System.ServiceModel.IExtensionCollection`1.Find*](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtensionCollection%601.Find*) returns the most recently added object that is an [System.ServiceModel.IExtension`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601) of that type.

### Extensible Objects in Windows Communication Foundation

There are four extensible objects in Windows Communication Foundation (WCF):

- [System.ServiceModel.ServiceHostBase](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHostBase) – This is the base class for the service’s host.  Extensions of this class can be used to extend the behavior of the [System.ServiceModel.ServiceHostBase](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHostBase) itself or to store the state for each service.

- [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) – This class connects an instance of the service’s type with the service runtime.  It contains information about the instance as well as a reference to the [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext)'s containing [System.ServiceModel.ServiceHostBase](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHostBase). Extensions of this class can be used to extend the behavior of the [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) or to store the state for each service.

- [System.ServiceModel.OperationContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContext) – This class represents the operation information that the runtime gathers for each operation.  This includes information such as the incoming message headers, the incoming message properties, the incoming security identity, and other information.  Extensions of this class can either extend the behavior of [System.ServiceModel.OperationContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContext) or store the state for each operation.

- [System.ServiceModel.IContextChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.IContextChannel) – This interface allows for the inspection of each state for the channels and proxies built by the WCF runtime.  Extensions of this class can either extend the behavior of [System.ServiceModel.IClientChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.IClientChannel) or can use it to store the state for each channel.

The following code example shows the use of a simple extension to track [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) objects.

[IInstanceContextInitializer#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/iinstancecontextinitializer/cs/initializer.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/iinstancecontextinitializer/cs/initializer.cs.md)

## See also

- [System.ServiceModel.IExtensibleObject`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtensibleObject%601)
- [System.ServiceModel.IExtension`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtension%601)
- [System.ServiceModel.IExtensionCollection`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.IExtensionCollection%601)
