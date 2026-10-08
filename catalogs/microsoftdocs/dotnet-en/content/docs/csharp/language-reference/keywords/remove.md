---
description: "The `remove` contextual keyword declares an event accessor that removes a handler from that event. - C# Reference"
title: "The `remove` contextual keyword"
ms.date: 01/22/2026
f1_keywords: 
  - "remove_CSharpKeyword"
helpviewer_keywords: 
  - "remove event accessor [C#]"
---
# The `remove` contextual keyword (C# Reference)

Use the `remove` contextual keyword to define a custom event accessor that's invoked when client code unsubscribes from your [event](event.md). If you supply a custom `remove` accessor, you must also supply an [add](add.md) accessor.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


The following example shows an event with custom [add](add.md) and `remove` accessors. For the full example, see [How to implement interface events](../../programming-guide/events/how-to-implement-interface-events.md).

[language="csharp" source="./snippets/events.cs" id="AddHandler"::: (complete source file; reference: ./snippets/events.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/events.cs.md)

You don't typically need to provide your own custom event accessors. The automatically generated accessors when you declare an event are sufficient for most scenarios. Starting with C# 14, you can declare [`partial`](partial-member.md) events. The implementing declaration of a partial event must declare the `add` and `remove` handlers.

## See also

- [Events](../../programming-guide/events/index.md)
