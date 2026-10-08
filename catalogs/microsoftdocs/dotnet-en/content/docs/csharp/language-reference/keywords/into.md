---
description: "into - C# Reference"
title: "into keyword"
ms.date: 01/21/2026
f1_keywords:
  - "into_CSharpKeyword"
  - "into"
helpviewer_keywords:
  - "into keyword [C#]"
---
# into (C# Reference)

Use the `into` contextual keyword to create a temporary identifier that stores the results of a [`group`](group-clause.md), [`join`](join-clause.md), or [`select`](select-clause.md) clause. This identifier can act as a generator for additional query commands. When you use the new identifier in a `group` or `select` clause, it's sometimes called a *continuation*.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


The following example shows how to use the `into` keyword to create a temporary identifier named `fruitGroup`, which has an inferred type of `IGrouping`. By using this identifier, you can call the [System.Linq.Enumerable.Count*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Count*) method on each group and select only those groups that contain two or more words.

[language="csharp" source="./snippets/into.cs" id="18"::: (complete source file; reference: ./snippets/into.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/into.cs.md)

You only need to use `into` in a `group` clause when you want to perform additional query operations on each group. For more information, see [group clause](group-clause.md).

For an example of using `into` in a `join` clause, see [join clause](join-clause.md).

## See also

- [Query Keywords (LINQ)](query-keywords.md)
- [LINQ in C#](../../linq/index.md)
- [group clause](group-clause.md)
