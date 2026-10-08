---
description: "from clause - C# Reference"
title: "from clause"
ms.date: 01/21/2026
f1_keywords:
  - "from_CSharpKeyword"
  - "from"
helpviewer_keywords:
  - "from clause [C#]"
  - "from keyword [C#]"
---
# from clause (C# Reference)

A query expression must begin with a `from` clause. Additionally, a query expression can contain subqueries, which also begin with a `from` clause. The `from` clause specifies the following:

- The data source on which the query or subquery runs.
- A local *range variable* that represents each element in the source sequence.

Both the range variable and the data source are strongly typed. The data source referenced in the `from` clause must have a type of [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable), [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601), or a derived type such as [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601).


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


In the following example, `numbers` is the data source and `num` is the range variable. Note that both variables are strongly typed even though the [var](../statements/declarations.md#implicitly-typed-local-variables) keyword is used.

[language="csharp" source="./snippets/from.cs" id="1"::: (complete source file; reference: ./snippets/from.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/from.cs.md)

## The range variable

The compiler infers the type of the range variable when the data source implements [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601). For example, if the source has a type of `IEnumerable<Customer>`, then the range variable is inferred to be `Customer`. You must specify the type explicitly only when the source is a non-generic `IEnumerable` type such as [System.Collections.ArrayList](https://learn.microsoft.com/search/?terms=System.Collections.ArrayList). For more information, see [How to query an ArrayList with LINQ](../../linq/how-to-query-collections.md).

In the previous example, `num` is inferred to be of type `int`. Because the range variable is strongly typed, you can call methods on it or use it in other operations. For example, instead of writing `select num`, you could write `select num.ToString()` to cause the query expression to return a sequence of strings instead of integers. Or you could write `select num + 10` to cause the expression to return the sequence 14, 11, 13, 12, 10. For more information, see [select clause](select-clause.md).

The range variable is like an iteration variable in a [foreach](../statements/iteration-statements.md#the-foreach-statement) statement except for one very important difference: a range variable never actually stores data from the source. It's just a syntactic convenience that enables the query to describe what occurs when the query is executed. For more information, see [Introduction to LINQ Queries (C#)](../../linq/get-started/introduction-to-linq-queries.md).

## Compound from clauses

In some cases, each element in the source sequence might itself be either a sequence or contain a sequence. For example, your data source might be an `IEnumerable<Student>` where each student object in the sequence contains a list of test scores. To access the inner list within each `Student` element, you can use compound `from` clauses. The technique is like using nested [foreach](../statements/iteration-statements.md#the-foreach-statement) statements. You can add [where](partial-member.md) or [orderby](orderby-clause.md) clauses to either `from` clause to filter the results. The following example shows a sequence of `Student` objects, each of which contains an inner `List` of integers representing test scores. To access the inner list, use a compound `from` clause. You can insert clauses between the two `from` clauses if necessary.

[language="csharp" source="./snippets/from.cs" id="2"::: (complete source file; reference: ./snippets/from.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/from.cs.md)

## Using multiple from clauses to perform joins

Use a compound `from` clause to access inner collections in a single data source. However, a query can also contain multiple `from` clauses that generate supplemental queries from independent data sources. By using this technique, you can perform certain types of join operations that aren't possible by using the [join clause](join-clause.md).

The following example shows how two `from` clauses form a complete cross join of two data sources.

[language="csharp" source="./snippets/from.cs" id="3"::: (complete source file; reference: ./snippets/from.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/from.cs.md)

For more information about join operations that use multiple `from` clauses, see [Perform left outer joins](../../linq/standard-query-operators/join-operations.md).

## See also

- [Query Keywords (LINQ)](query-keywords.md)
- [Language Integrated Query (LINQ)](../../linq/index.md)
