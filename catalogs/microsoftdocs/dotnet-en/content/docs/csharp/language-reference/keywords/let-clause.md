---
description: "let clause - C# Reference"
title: "let clause"
ms.date: 01/21/2026
f1_keywords:
  - "let_CSharpKeyword"
  - "let"
helpviewer_keywords:
  - "let keyword [C#]"
  - "let clause [C#]"
---
# `let` clause (C# Reference)

In a query expression, it can be useful to store the result of a subexpression so you can use it in later clauses. Use the `let` keyword to create a new range variable and initialize it with the result of an expression. After you initialize the range variable with a value, you can't assign it another value. However, if the range variable holds a queryable type, you can query it.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


In the following example, `let` is used in two ways:

1. It creates an enumerable type that you can query.
1. It enables the query to call `ToLower` only one time on the range variable `word`. Without using `let`, you'd have to call `ToLower` in each predicate in the `where` clause.

[language="csharp" source="./snippets/let.cs" id="28"::: (complete source file; reference: ./snippets/let.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/let.cs.md)

## See also

- [Query Keywords (LINQ)](query-keywords.md)
- [LINQ in C#](../../linq/index.md)
- [Language Integrated Query (LINQ)](../../linq/index.md)
- [Handle exceptions in query expressions](../../linq/get-started/write-linq-queries.md)
