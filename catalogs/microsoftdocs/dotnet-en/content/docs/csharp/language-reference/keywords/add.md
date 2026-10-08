---
description: The `add` contextual keyword declares an event accessor that adds a handler to that event.
title: "The `add` keyword"
ms.date: 01/21/2026
f1_keywords: 
  - "add_CSharpKeyword"
helpviewer_keywords: 
  - "add event accessor [C#]"
---
# The `add` contextual keyword (C# Reference)

Use the `add` contextual keyword to define a custom event accessor that's invoked when client code subscribes to your [event](event.md). If you supply a custom `add` accessor, you must also supply a [remove](remove.md) accessor.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


The following example shows an event that has custom `add` and [remove](remove.md) accessors. For the full example, see [How to implement interface events](../../programming-guide/events/how-to-implement-interface-events.md).

[language="csharp" source="./snippets/events.cs" id="AddHandler"::: (complete source file; reference: ./snippets/events.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/events.cs.md)

You don't typically need to provide your own custom event accessors. The automatically generated accessors when you declare an event are sufficient for most scenarios. Starting with C# 14, you can declare [`partial`](partial-member.md) events. The implementing declaration of a partial event must declare the `add` and `remove` handlers.

## See also

- [Events](../../programming-guide/events/index.md)
