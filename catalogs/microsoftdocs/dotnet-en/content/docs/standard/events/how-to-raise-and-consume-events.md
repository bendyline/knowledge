---
title: "Raise and consume events"
description: Raise and consume events in .NET. See examples that use the EventHandler delegate, the EventHandler<TEventArgs> delegate, and a custom delegate.
ms.date: 03/24/2026
ms.topic: how-to
ai-usage: ai-assisted
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "events [.NET], raising"
  - "raising events"
  - "events [.NET], samples"
---

# Raise and consume events

This article shows how to work with events in .NET using the [System.EventHandler](https://learn.microsoft.com/search/?terms=System.EventHandler) delegate, the [System.EventHandler`1](https://learn.microsoft.com/search/?terms=System.EventHandler%601) delegate, and a custom delegate, with examples for events with and without data.

## Prerequisites

Familiarize yourself with the concepts in the [Events](index.md) article.

## Raise an event without data

These steps create a `Counter` class that fires a `ThresholdReached` event when a running total reaches or exceeds a threshold.

1. Declare the event using the [System.EventHandler](https://learn.microsoft.com/search/?terms=System.EventHandler) delegate.

   Use `EventHandler` when your event doesn't pass data to the handler:

   [language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventNoData.cs" id="DeclareEvent"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventNoData.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventNoData.cs.md)
   [language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventNoData.vb" id="DeclareEvent"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventNoData.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventNoData.vb.md)

1. Add a `protected virtual` method (`Protected Overridable` in Visual Basic) to raise the event.

   This pattern lets derived classes override the event-raising behavior without directly invoking the delegate. In C#, use the null-conditional operator (`?.`) to guard against no subscribers (in Visual Basic, `RaiseEvent` handles this automatically):

   [language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventNoData.cs" id="RaiseEventMethod"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventNoData.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventNoData.cs.md)
   [language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventNoData.vb" id="RaiseEventMethod"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventNoData.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventNoData.vb.md)

1. Call the raise method when the condition is met.

   Pass [System.EventArgs.Empty](https://learn.microsoft.com/search/?terms=System.EventArgs.Empty) because this event carries no data:

   [language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventNoData.cs" id="RaiseEvent"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventNoData.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventNoData.cs.md)
   [language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventNoData.vb" id="RaiseEvent"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventNoData.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventNoData.vb.md)

1. Subscribe to the event using the `+=` operator (in Visual Basic, `AddHandler`):

   [language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventNoData.cs" id="SubscribeEvent"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventNoData.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventNoData.cs.md)
   [language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventNoData.vb" id="SubscribeEvent"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventNoData.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventNoData.vb.md)

1. Define the event handler method.

   Its signature must match the [System.EventHandler](https://learn.microsoft.com/search/?terms=System.EventHandler) delegate—the first parameter is the event source and the second is [System.EventArgs](https://learn.microsoft.com/search/?terms=System.EventArgs):

   [language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventNoData.cs" id="HandleEvent"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventNoData.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventNoData.cs.md)
   [language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventNoData.vb" id="HandleEvent"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventNoData.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventNoData.vb.md)

The following example shows the complete implementation:

[language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventNoData.cs" id="ThresholdReachedNoData"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventNoData.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventNoData.cs.md)
[language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventNoData.vb" id="ThresholdReachedNoData"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventNoData.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventNoData.vb.md)

## Raise an event with data

These steps extend the previous `Counter` example to raise an event that includes data—the threshold value and the time it was reached.

1. Define an event data class that inherits from [System.EventArgs](https://learn.microsoft.com/search/?terms=System.EventArgs).

   Add properties for each piece of data you want to pass to the handler:

   [language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs" id="EventDataClass2"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs.md)
   [language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventWithData.vb" id="EventDataClass2"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventWithData.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventWithData.vb.md)

1. Declare the event using the [System.EventHandler`1](https://learn.microsoft.com/search/?terms=System.EventHandler%601) delegate, passing your event data class as the type argument:

   [language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs" id="DeclareEvent2"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs.md)
   [language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventWithData.vb" id="DeclareEvent2"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventWithData.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventWithData.vb.md)

1. Add a `protected virtual` method (`Protected Overridable` in Visual Basic) to raise the event.

   This pattern lets derived classes override the event-raising behavior without directly invoking the delegate. In C#, use the null-conditional operator (`?.`) to guard against no subscribers (in Visual Basic, `RaiseEvent` handles this automatically):

   [language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs" id="RaiseEventMethod2"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs.md)
   [language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventWithData.vb" id="RaiseEventMethod2"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventWithData.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventWithData.vb.md)

1. Populate the event data object and call the raise method when the condition is met:

   [language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs" id="RaiseEvent2"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs.md)
   [language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventWithData.vb" id="RaiseEvent2"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventWithData.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventWithData.vb.md)

1. Subscribe to the event using the `+=` operator (in Visual Basic, `AddHandler`):

   [language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs" id="SubscribeEvent2"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs.md)
   [language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventWithData.vb" id="SubscribeEvent2"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventWithData.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventWithData.vb.md)

1. Define the event handler.

   The second parameter type is `ThresholdReachedEventArgs` instead of [System.EventArgs](https://learn.microsoft.com/search/?terms=System.EventArgs), which lets the handler read the event data:

   [language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs" id="HandleEvent2"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs.md)
   [language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventWithData.vb" id="HandleEvent2"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventWithData.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventWithData.vb.md)

The following example shows the complete implementation:

[language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs" id="ThresholdReachedWithData"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventWithData.cs.md)
[language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventWithData.vb" id="ThresholdReachedWithData"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventWithData.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventWithData.vb.md)

## Declare a custom delegate for an event

Declare a custom delegate only in rare scenarios, such as making your class available to legacy code that can't use generics. For most cases, use [System.EventHandler`1](https://learn.microsoft.com/search/?terms=System.EventHandler%601) as shown in the previous section.

1. Declare the custom delegate type.

   The delegate signature must match the event handler signature—two parameters: the event source (`object`; in Visual Basic, `Object`) and the event data class:

   [language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs" id="DeclareDelegateType"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs.md)
   [language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb" id="DeclareDelegateType"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb.md)

1. Declare the event using your custom delegate type instead of [System.EventHandler`1](https://learn.microsoft.com/search/?terms=System.EventHandler%601):

   [language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs" id="DeclareEventWithDelegate"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs.md)
   [language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb" id="DeclareEventWithDelegate"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb.md)

1. Add a `protected virtual` method (`Protected Overridable` in Visual Basic) to raise the event.

   In C#, use the null-conditional operator (`?.`) to guard against no subscribers (in Visual Basic, `RaiseEvent` handles this automatically):

   [language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs" id="RaiseEventMethodDelegate"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs.md)
   [language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb" id="RaiseEventMethodDelegate"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb.md)

1. Populate the event data object and call the raise method when the condition is met:

   [language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs" id="RaiseEventDelegate"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs.md)
   [language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb" id="RaiseEventDelegate"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb.md)

1. Subscribe to the event using the `+=` operator (in Visual Basic, `AddHandler`):

   [language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs" id="SubscribeEventDelegate"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs.md)
   [language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb" id="SubscribeEventDelegate"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb.md)

1. Define the event handler.

   The handler signature must match the custom delegate—`object` for the sender and your event data class for the second parameter:

   [language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs" id="HandleEventDelegate"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs.md)
   [language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb" id="HandleEventDelegate"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb.md)

The following example shows the complete implementation:

[language="csharp" source="./snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs" id="ThresholdReachedWithDelegate"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/csharp/EventWithDelegate.cs.md)
[language="vb" source="./snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb" id="ThresholdReachedWithDelegate"::: (complete source file; reference: ./snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb)](../../../_code/docs/standard/events/snippets/how-to-raise-and-consume-events/vb/EventWithDelegate.vb.md)

## Related content

- [Events](index.md)
