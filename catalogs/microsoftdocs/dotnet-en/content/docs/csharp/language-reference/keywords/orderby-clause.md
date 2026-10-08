---
description: "orderby clause - C# Reference"
title: "orderby clause"
ms.date: 01/22/2026
f1_keywords:
  - "orderby"
  - "orderby_CSharpKeyword"
helpviewer_keywords:
  - "orderby clause [C#]"
  - "orderby keyword [C#]"
---
# orderby clause (C# Reference)

In a query expression, the `orderby` clause sorts the returned sequence or subsequence (group) in either ascending or descending order. You can specify multiple keys to perform one or more secondary sort operations. The default comparer for the type of the element performs the sorting. The default sort order is ascending. You can also specify a custom comparer, but you can only provide it by using method-based syntax. For more information, see [Sorting Data](../../linq/standard-query-operators/sorting-data.md).


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


In the following example, the first query sorts the words in alphabetical order starting from A, and second query sorts the same words in descending order. (The `ascending` keyword is the default sort value and can be omitted.)

[language="csharp" source="./snippets/Orderby.cs" id="20"::: (complete source file; reference: ./snippets/Orderby.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/Orderby.cs.md)

The following example performs a primary sort on the students' last names, and then a secondary sort on their first names.

[language="csharp" source="./snippets/Orderby.cs" id="22"::: (complete source file; reference: ./snippets/Orderby.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/Orderby.cs.md)

At compile time, the `orderby` clause translates to a call to the [System.Linq.Enumerable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderBy*) method. Multiple keys in the `orderby` clause translate to [System.Linq.Enumerable.ThenBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ThenBy*) method calls.

## See also

- [Query Keywords (LINQ)](query-keywords.md)
- [LINQ in C#](../../linq/index.md)
- [group clause](group-clause.md)
- [Language Integrated Query (LINQ)](../../linq/index.md)
