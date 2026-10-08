---
title: "How to implement an Observer"
description: Implement an observer in .NET. The observer design pattern requires a division between an observer, which registers for notifications, and a provider.
ms.date: 06/01/2026
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "observers [.NET], observer design pattern"
  - "observer design pattern [.NET], implementing observers"
ms.assetid: 8ecfa9f5-b500-473d-bcf0-5652ffb1e53d
ms.topic: how-to
---

<!-- customer intent: As a .NET developer, I want to implement an observer so that I can use the observer design pattern to receive data pushed from a registered provider. -->

# How to implement an observer

The observer design pattern requires a division between an observer, which registers for notifications, and a provider, which monitors data and sends notifications to one or more observers. This article discusses how to create an observer. A related article, [How to implement a provider](how-to-implement-a-provider.md), discusses how to create a provider.

## Create an observer

To create an observer, implement the [System.IObserver`1](https://learn.microsoft.com/search/?terms=System.IObserver%601) interface. The following steps describe each member you need to define.

1. Define the observer type that implements the [System.IObserver`1](https://learn.microsoft.com/search/?terms=System.IObserver%601) interface.

   The following code defines a type named `TemperatureReporter` that is a constructed [System.IObserver`1](https://learn.microsoft.com/search/?terms=System.IObserver%601) implementation with a generic type argument of `Temperature`.

   [language="csharp" source="./snippets/shared/how-to-provider-observer/csharp/observer.cs" id="ClassDeclaration"::: (complete source file; reference: ./snippets/shared/how-to-provider-observer/csharp/observer.cs)](../../../_code/docs/standard/events/snippets/shared/how-to-provider-observer/csharp/observer.cs.md)
   [language="vb" source="./snippets/shared/how-to-provider-observer/vb/observer.vb" id="ClassDeclaration"::: (complete source file; reference: ./snippets/shared/how-to-provider-observer/vb/observer.vb)](../../../_code/docs/standard/events/snippets/shared/how-to-provider-observer/vb/observer.vb.md)

1. If the observer needs to unsubscribe before the provider calls [System.IObserver`1.OnCompleted*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnCompleted*), define a private variable to hold the [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) returned by [System.IObservable`1.Subscribe*](https://learn.microsoft.com/search/?terms=System.IObservable%601.Subscribe*), and define a subscription method.

   The private variable `unsubscriber` stores the [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) object. The `Subscribe` method calls the provider's [System.IObservable`1.Subscribe*](https://learn.microsoft.com/search/?terms=System.IObservable%601.Subscribe*) method and assigns the returned object to `unsubscriber`.

   [language="csharp" source="./snippets/shared/how-to-provider-observer/csharp/observer.cs" id="Subscribe"::: (complete source file; reference: ./snippets/shared/how-to-provider-observer/csharp/observer.cs)](../../../_code/docs/standard/events/snippets/shared/how-to-provider-observer/csharp/observer.cs.md)
   [language="vb" source="./snippets/shared/how-to-provider-observer/vb/observer.vb" id="Subscribe"::: (complete source file; reference: ./snippets/shared/how-to-provider-observer/vb/observer.vb)](../../../_code/docs/standard/events/snippets/shared/how-to-provider-observer/vb/observer.vb.md)

1. Define an `Unsubscribe` method that lets the observer stop receiving notifications before the provider calls [System.IObserver`1.OnCompleted*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnCompleted*).

   [language="csharp" source="./snippets/shared/how-to-provider-observer/csharp/observer.cs" id="Unsubscribe"::: (complete source file; reference: ./snippets/shared/how-to-provider-observer/csharp/observer.cs)](../../../_code/docs/standard/events/snippets/shared/how-to-provider-observer/csharp/observer.cs.md)
   [language="vb" source="./snippets/shared/how-to-provider-observer/vb/observer.vb" id="Unsubscribe"::: (complete source file; reference: ./snippets/shared/how-to-provider-observer/vb/observer.vb)](../../../_code/docs/standard/events/snippets/shared/how-to-provider-observer/vb/observer.vb.md)

1. Implement the three methods defined by [System.IObserver`1](https://learn.microsoft.com/search/?terms=System.IObserver%601): [System.IObserver`1.OnNext*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnNext*), [System.IObserver`1.OnError*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnError*), and [System.IObserver`1.OnCompleted*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnCompleted*).

   The [System.IObserver`1.OnError*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnError*) and [System.IObserver`1.OnCompleted*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnCompleted*) methods can be stub implementations. The [System.IObserver`1.OnError*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnError*) method shouldn't handle the passed [System.Exception](https://learn.microsoft.com/search/?terms=System.Exception) as an exception, and [System.IObserver`1.OnCompleted*](https://learn.microsoft.com/search/?terms=System.IObserver%601.OnCompleted*) can call the provider's [System.IDisposable.Dispose*](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose*) implementation.

   [language="csharp" source="./snippets/shared/how-to-provider-observer/csharp/observer.cs" id="ObserverMethods"::: (complete source file; reference: ./snippets/shared/how-to-provider-observer/csharp/observer.cs)](../../../_code/docs/standard/events/snippets/shared/how-to-provider-observer/csharp/observer.cs.md)
   [language="vb" source="./snippets/shared/how-to-provider-observer/vb/observer.vb" id="ObserverMethods"::: (complete source file; reference: ./snippets/shared/how-to-provider-observer/vb/observer.vb)](../../../_code/docs/standard/events/snippets/shared/how-to-provider-observer/vb/observer.vb.md)

## Complete example

 The following example shows the complete source code for the `TemperatureReporter` class, which provides the [System.IObserver`1](https://learn.microsoft.com/search/?terms=System.IObserver%601) implementation for a temperature monitoring application.

 [language="csharp" source="./snippets/shared/how-to-provider-observer/csharp/observer.cs" id="All"::: (complete source file; reference: ./snippets/shared/how-to-provider-observer/csharp/observer.cs)](../../../_code/docs/standard/events/snippets/shared/how-to-provider-observer/csharp/observer.cs.md)
 [language="vb" source="./snippets/shared/how-to-provider-observer/vb/observer.vb" id="All"::: (complete source file; reference: ./snippets/shared/how-to-provider-observer/vb/observer.vb)](../../../_code/docs/standard/events/snippets/shared/how-to-provider-observer/vb/observer.vb.md)

## Related content

- [System.IObserver`1](https://learn.microsoft.com/search/?terms=System.IObserver%601)
- [Observer design pattern](observer-design-pattern.md)
- [How to implement a provider](how-to-implement-a-provider.md)
- [Best practices for the observer design pattern](observer-design-pattern-best-practices.md)
