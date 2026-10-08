---
title: "Quantifier Operations"
titleSuffix: LINQ
description: Learn about quantifier operations in LINQ. These methods, `All`, `Any`, and `Contains`, return a Boolean value indicating whether some or all elements in a sequence satisfy a condition.
ms.date: 05/29/2024
---
# Quantifier operations in LINQ (C#)

Quantifier operations return a [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) value that indicates whether some or all of the elements in a sequence satisfy a condition.


> **Important:**
>
> These samples use an [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) data source. Data sources based on [System.Linq.IQueryProvider](https://learn.microsoft.com/search/?terms=System.Linq.IQueryProvider) use [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601) data sources and [expression trees](../../advanced-topics/expression-trees/index.md). Expression trees have [limitations](../../advanced-topics/expression-trees/index.md#limitations) on the allowed C# syntax. Furthermore, each `IQueryProvider` data source, such as [EF Core](https://learn.microsoft.com/ef/core/querying/complex-query-operators) may impose more restrictions. Check the documentation for your data source.


The following illustration depicts two different quantifier operations on two different source sequences. The first operation asks if any of the elements are the character 'A'. The second operation asks if all the elements are the character 'A'. Both methods return `true` in this example.

LINQ Quantifier Operations

| Method Name | Description | C# Query Expression Syntax | More Information |
| --- | --- | --- | --- |
| All | Determines whether all the elements in a sequence satisfy a condition. | Not applicable. | [System.Linq.Enumerable.All*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.All*)<br />[System.Linq.Queryable.All*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.All*) |
| Any | Determines whether any elements in a sequence satisfy a condition. | Not applicable. | [System.Linq.Enumerable.Any*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Any*)<br />[System.Linq.Queryable.Any*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Any*) |
| Contains | Determines whether a sequence contains a specified element. | Not applicable. | [System.Linq.Enumerable.Contains*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Contains*)<br />[System.Linq.Queryable.Contains*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Contains*) |

## All

The following example uses the `All` to find students that scored above 70 on all exams.


> **Note:**
> You can refer to the common data sources for this area in the [Standard Query Operators Overview](index.md) article.


[language="csharp" source="./snippets/standard-query-operators/QuantifierExamples.cs" id="AllQuantifier"::: (complete source file; reference: ./snippets/standard-query-operators/QuantifierExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/QuantifierExamples.cs.md)

## Any

The following example uses the `Any` to find students that scored greater than 95 on any exam.

[language="csharp" source="./snippets/standard-query-operators/QuantifierExamples.cs" id="AnyQuantifier"::: (complete source file; reference: ./snippets/standard-query-operators/QuantifierExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/QuantifierExamples.cs.md)

## Contains

The following example uses the `Contains` to find students that scored exactly 95 on an exam.

[language="csharp" source="./snippets/standard-query-operators/QuantifierExamples.cs" id="ContainsQuantifier"::: (complete source file; reference: ./snippets/standard-query-operators/QuantifierExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/QuantifierExamples.cs.md)

## See also

- [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq)
- [Dynamically specify predicate filters at run time](../get-started/write-linq-queries.md)
- [How to query for sentences that contain a specified set of words (LINQ) (C#)](../how-to-query-strings.md)
