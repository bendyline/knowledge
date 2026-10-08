---
title: "Observer design pattern best practices"
description: Learn about best practices for implementing the observer design pattern in .NET using the IObservable and IObserver interfaces.
ms.date: 06/01/2026
ms.topic: best-practice
helpviewer_keywords:
  - "observer design pattern [.NET], best practices"
  - "best practices [.NET], observer design pattern"
ms.assetid: c834760f-ddd4-417f-abb7-a059679d5b8c

#customer intent: As a .NET developer, I want to understand best practices for implementing the observer design pattern so that I can build reliable and thread-safe observable/observer relationships.

---

# Best practices for the observer design pattern

In .NET, the observer design pattern is implemented as a set of interfaces. The [System.IObservable`1](https://learn.microsoft.com/search/?terms=System.IObservable%601) interface represents the data provider, which is also responsible for providing an [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) implementation that lets observers unsubscribe from notifications. The [System.IObserver`1](https://learn.microsoft.com/search/?terms=System.IObserver%601) interface represents the observer.

This article describes best practices to follow when you implement the observer design pattern with these interfaces.

## Consider alternatives before implementing

The `IObservable<T>` and `IObserver<T>` interfaces are well suited for push-based notification scenarios, but other .NET patterns might be a better fit. For simple notification within a single application, use [events](index.md). For async pull-based sequences where the consumer controls the pace, use [`IAsyncEnumerable<T>`](../../csharp/asynchronous-programming/generate-consume-asynchronous-stream.md). For producer-consumer patterns with backpressure, use [System.Threading.Channels](https://learn.microsoft.com/search/?terms=System.Threading.Channels). For complex event composition, filtering, and transformation, use the [`System.Reactive`](https://github.com/dotnet/reactive) (Rx.NET) package instead of implementing `IObservable<T>` directly. For more information, see [Observer design pattern](observer-design-pattern.md#when-to-consider-alternatives).

## Use a separate type for notification data

The object that contains the data the provider sends to its observers corresponds to the generic type parameter of [System.IObservable`1](https://learn.microsoft.com/search/?terms=System.IObservable%601) and [System.IObserver`1](https://learn.microsoft.com/search/?terms=System.IObserver%601). Although this object can be the same as the [System.IObservable`1](https://learn.microsoft.com/search/?terms=System.IObservable%601) implementation, define it as a separate type. A dedicated data type keeps the provider's responsibilities separate from the notification payload and makes the API easier to evolve.

## Don't rely on notification order

The order in which observers receive notifications isn't defined. The provider is free to use any method to determine the order, so don't write observers that depend on being notified before or after another observer.

## Make Subscribe and Dispose thread-safe

Typically, a provider implements the [System.IObservable`1.Subscribe*](https://learn.microsoft.com/search/?terms=System.IObservable%601.Subscribe*) method by adding an observer to a subscriber list that's represented by a collection object, and it implements the [System.IDisposable.Dispose*](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose*) method by removing the observer from that list. An observer can call these methods at any time. The provider/observer contract doesn't specify who is responsible for unsubscribing after the [System.IObserver`1.OnCompleted*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnCompleted*) callback method, so the provider and observer might both try to remove the same member from the list.

To avoid race conditions, make both the [System.IObservable`1.Subscribe*](https://learn.microsoft.com/search/?terms=System.IObservable%601.Subscribe*) and [System.IDisposable.Dispose*](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose*) methods thread-safe. Typically, this involves using a [concurrent collection](../parallel-programming/data-structures-for-parallel-programming.md) or a lock. Implementations that aren't thread-safe should explicitly document that they aren't.

## Document any extra contract guarantees

Specify any extra guarantees in a layer on top of the provider/observer contract. When you impose other requirements, clearly call them out so that users aren't confused about the observer contract.

## Handle exceptions as informational

Because of the loose coupling between a data provider and an observer, exceptions in the observer design pattern are intended to be informational. This characteristic affects how providers and observers handle exceptions.

### Call OnError only when updates can't continue

The [System.IObserver`1.OnError*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnError*) method is intended as an informational message to observers, much like the [System.IObserver`1.OnNext*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnNext*) method. However, the [System.IObserver`1.OnNext*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnNext*) method provides an observer with current or updated data, whereas the [System.IObserver`1.OnError*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnError*) method indicates that the provider can't provide valid data.

Follow these best practices when you handle exceptions and call the [System.IObserver`1.OnError*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnError*) method:

- The provider must handle its own exceptions if it has any specific requirements.
- The provider shouldn't expect or require that observers handle exceptions in any particular way.
- The provider should call the [System.IObserver`1.OnError*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnError*) method when it handles an exception that compromises its ability to provide updates. Pass information about such exceptions to the observer. In other cases, there's no need to notify observers of an exception.

After the provider calls the [System.IObserver`1.OnError*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnError*) or [System.IObserver`1.OnCompleted*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnCompleted*) method, there should be no further notifications, and the provider can unsubscribe its observers. However, the observers can also unsubscribe themselves at any time, including before and after they receive an [System.IObserver`1.OnError*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnError*) or [System.IObserver`1.OnCompleted*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnCompleted*) notification. The observer design pattern doesn't dictate whether the provider or the observer is responsible for unsubscribing, so both might attempt to unsubscribe. Typically, when observers unsubscribe, they're removed from a subscribers collection. In a single-threaded application, the [System.IDisposable.Dispose*](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose*) implementation should ensure that an object reference is valid and that the object is a member of the subscribers collection before it attempts to remove the object. In a multithreaded application, use a lock to protect the observers collection.

### Treat OnError notifications as informational in observers

When an observer receives an error notification from a provider, the observer should treat the exception as informational and shouldn't be required to take any particular action.

Follow these best practices when you respond to an [System.IObserver`1.OnError*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnError*) method call from a provider:

- Don't throw exceptions from interface implementations such as [System.IObserver`1.OnNext*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnNext*) or [System.IObserver`1.OnError*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnError*). If the observer does throw exceptions, expect these exceptions to go unhandled.
- To preserve the call stack, an observer that wants to throw an [System.Exception](https://learn.microsoft.com/search/?terms=System.Exception) object that was passed to its [System.IObserver`1.OnError*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnError*) method should wrap the exception before throwing it. Use a standard exception object for this purpose.

## Don't unregister in the Subscribe method

Don't attempt to unregister in the [System.IObservable`1.Subscribe*](https://learn.microsoft.com/search/?terms=System.IObservable%601.Subscribe*) method, because it might result in a null reference.

## Attach an observer to a single provider

Although you can attach an observer to multiple providers, the recommended pattern is to attach an [System.IObserver`1](https://learn.microsoft.com/search/?terms=System.IObserver%601) instance to only one [System.IObservable`1](https://learn.microsoft.com/search/?terms=System.IObservable%601) instance.

## Related content

- [Observer design pattern](observer-design-pattern.md)
- [How to: Implement an observer](how-to-implement-an-observer.md)
- [How to: Implement a provider](how-to-implement-a-provider.md)
