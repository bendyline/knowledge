---
title: "LINQ queries in C#"
description: Query collections with LINQ by using query syntax, method syntax, common operators, and lambda expressions.
ms.date: 07/15/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# LINQ queries

> **Tip:**
> This article is part of the **Fundamentals** section for developers who already know at least one programming language and are learning C#. If you're new to programming, start with the [Get started](../../tour-of-csharp/tutorials/index.md) tutorials first. For more information about providers, operators, and advanced scenarios, see [Language Integrated Query (LINQ)](../../linq/index.md).
>
> **Coming from another language?** LINQ query syntax reads like a SQL-style query written inside C#. LINQ method syntax reads like chained collection operations in JavaScript, Java streams, or Python pipelines. Both forms describe the same query.

*Language Integrated Query (LINQ)* is the C# feature set for querying data with C# syntax. Many LINQ operators use *deferred execution*: they describe the result first and read the data later, when your code asks for the results. A *query* describes which data to read and how to shape the result. A query reads from a *data source*. A data source can be an in-memory collection, such as an array or [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601), or an external source, such as a database or XML, exposed through a LINQ provider. A *LINQ provider* is a library that connects LINQ syntax to a specific kind of data source. This article uses in-memory collections for its examples. A *sequence* is an ordered set of elements represented by [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601). For more information about provider-based queries, see [Language Integrated Query (LINQ)](../../linq/index.md).

## LINQ query expression syntax

The examples in this article read in-memory collections such as arrays and [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601). A query usually has three parts: specify the data source, describe the result, and enumerate the source to produce the result. To *enumerate* a sequence means to read its elements one at a time, often with `foreach`.

[language="csharp" source="./snippets/linq-statements/Program.cs" id="QuerySyntax"::: (complete source file; reference: ./snippets/linq-statements/Program.cs)](../../../../_code/docs/csharp/fundamentals/statements/snippets/linq-statements/Program.cs.md)

The query expression starts with `from` to name the data source and range variable. The `where` clause keeps only matching elements, `orderby` sorts them, and `select` shapes the result.

## LINQ method syntax

*Query syntax* uses clauses such as `from`, `where`, `orderby`, and `select`. *Method syntax* calls LINQ methods directly. For in-memory sequences, the standard LINQ methods are the built-in [System.Linq.Enumerable](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable) methods for filtering, projection, sorting, grouping, and related operations.

[language="csharp" source="./snippets/linq-statements/Program.cs" id="MethodSyntax"::: (complete source file; reference: ./snippets/linq-statements/Program.cs)](../../../../_code/docs/csharp/fundamentals/statements/snippets/linq-statements/Program.cs.md)

Method syntax is also called *fluent syntax* because each call returns a result that the next call can use. Many queries can use either form. Use the form that makes the query easiest to read.

Query syntax often reads well when the query has several clauses. The `let` clause gives a name to an intermediate value before the query filters, sorts, and selects the final result:

[language="csharp" source="./snippets/linq-statements/Program.cs" id="QuerySyntaxClearer"::: (complete source file; reference: ./snippets/linq-statements/Program.cs)](../../../../_code/docs/csharp/fundamentals/statements/snippets/linq-statements/Program.cs.md)

Method syntax often reads well for short operations. It's necessary for methods that don't have query-syntax keyword. For example, [System.Linq.Enumerable.Count*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Count*) returns one value directly:

[language="csharp" source="./snippets/linq-statements/Program.cs" id="MethodSyntaxClearer"::: (complete source file; reference: ./snippets/linq-statements/Program.cs)](../../../../_code/docs/csharp/fundamentals/statements/snippets/linq-statements/Program.cs.md)

## Lambda expressions and LINQ

A *lambda expression* is an anonymous function that you can pass as an argument. LINQ method syntax commonly uses lambda expressions to say what each operator should do with each element.

[language="csharp" source="./snippets/linq-statements/Program.cs" id="LambdaExpressions"::: (complete source file; reference: ./snippets/linq-statements/Program.cs)](../../../../_code/docs/csharp/fundamentals/statements/snippets/linq-statements/Program.cs.md)

In `name => name.Length == 3`, `name` is the input element and `name.Length == 3` is the Boolean expression that decides whether the element belongs in the result. For more information about lambda expressions and delegate types, see [Lambda expressions, delegates, and events](../types/delegates-lambdas.md) in the fundamentals.

Query-syntax clauses use lambda expressions too. Clauses such as `where`, `orderby`, and `select` compile to method calls that take lambda expressions. The range variable becomes the lambda parameter, and the clause expression becomes the lambda body. Query syntax is a concise way to write those same lambdas:

[language="csharp" source="./snippets/linq-statements/Program.cs" id="QuerySyntaxLambda"::: (complete source file; reference: ./snippets/linq-statements/Program.cs)](../../../../_code/docs/csharp/fundamentals/statements/snippets/linq-statements/Program.cs.md)

## Common LINQ methods

The most common LINQ methods cover the everyday steps of a query: filter data, shape results, sort, group, and summarize. These methods are in the [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq) namespace and work with sequences such as [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601).

- [System.Linq.Enumerable.Where*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Where*) keeps only the elements that match a condition.
- [System.Linq.Enumerable.Select*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Select*) transforms each element into a new value. C# calls this operation a *projection*.
- [System.Linq.Enumerable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderBy*) sorts elements.
- [System.Linq.Enumerable.GroupBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupBy*) creates groups of elements that share a key.
- Aggregation methods such as [System.Linq.Enumerable.Sum*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Sum*), [System.Linq.Enumerable.Count*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Count*), and [System.Linq.Enumerable.Aggregate*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Aggregate*) produce a single value from all elements in the data source.

> **Note:**
> If you know the traditional functional-programming terms, [System.Linq.Enumerable.Where*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Where*) is a *filter*, [System.Linq.Enumerable.Select*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Select*) is a *map* (C# calls it a projection), and aggregation methods such as [System.Linq.Enumerable.Aggregate*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Aggregate*), [System.Linq.Enumerable.Sum*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Sum*), and [System.Linq.Enumerable.Count*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Count*) are a *reduce*.

[language="csharp" source="./snippets/linq-statements/Program.cs" id="CommonOperators"::: (complete source file; reference: ./snippets/linq-statements/Program.cs)](../../../../_code/docs/csharp/fundamentals/statements/snippets/linq-statements/Program.cs.md)

A *projection* creates a result value from each input element. In the previous example, the projection creates strings that combine a work item name and its priority.

### Group related values

Use [System.Linq.Enumerable.GroupBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupBy*) when the result should contain groups of elements that share a key. Each group is represented by [System.Linq.IGrouping`2](https://learn.microsoft.com/search/?terms=System.Linq.IGrouping%602), which exposes the group key and the elements in that group.

[language="csharp" source="./snippets/linq-statements/Program.cs" id="GroupBy"::: (complete source file; reference: ./snippets/linq-statements/Program.cs)](../../../../_code/docs/csharp/fundamentals/statements/snippets/linq-statements/Program.cs.md)

Grouping is useful for summaries, reports, and menus. For more information about joins, nested groupings, and provider-specific behavior, see [Language Integrated Query (LINQ)](../../linq/index.md).

## Run a query

Many LINQ operators use *deferred execution*. Deferred execution means operators that return a sequence, such as [System.Linq.Enumerable.Where*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Where*), [System.Linq.Enumerable.Select*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Select*), and [System.Linq.Enumerable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderBy*), don't run when you define them. They build the recipe for producing results. A `foreach` loop is one way to run that recipe:

[language="csharp" source="./snippets/linq-statements/Program.cs" id="DeferredExecution"::: (complete source file; reference: ./snippets/linq-statements/Program.cs)](../../../../_code/docs/csharp/fundamentals/statements/snippets/linq-statements/Program.cs.md)

Other operations run a query immediately. Operators that return a single value, such as [System.Linq.Enumerable.Count*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Count*), [System.Linq.Enumerable.Sum*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Sum*), [System.Linq.Enumerable.First*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.First*), and [System.Linq.Enumerable.Any*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Any*), must read the elements when you call them so they can produce that value.

[language="csharp" source="./snippets/linq-statements/Program.cs" id="ImmediateExecution"::: (complete source file; reference: ./snippets/linq-statements/Program.cs)](../../../../_code/docs/csharp/fundamentals/statements/snippets/linq-statements/Program.cs.md)

There's no single trigger that runs a query. *Eager evaluation*, also called immediate evaluation, runs the query right away and stores or returns the result. Scalar and aggregate operators such as [System.Linq.Enumerable.Count*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Count*), [System.Linq.Enumerable.Sum*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Sum*), [System.Linq.Enumerable.First*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.First*), and [System.Linq.Enumerable.Any*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Any*) use eager evaluation. So do [System.Linq.Enumerable.ToList*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToList*) and [System.Linq.Enumerable.ToArray*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToArray*) when you need a snapshot of the current results. For more information about deferred execution, see [Introduction to LINQ Queries](../../linq/get-started/introduction-to-linq-queries.md) in the LINQ documentation.

## Compose queries

Real queries often grow from smaller decisions: start with a shared filter, add a sort for one screen, or apply an optional condition from user input. By composing queries, you can keep each step readable and reuse common parts instead of repeating one large query.

Imagine an app that shows open work items in several places. One view needs all open items, and another view needs only the highest-priority open items. To *compose* a query, start with a base query stored in a variable, then build a more specific query from it. Because execution is deferred, each step describes more of the result. No work happens until you enumerate the final query.

The following example stores the open work items in one query, then reuses that query to find the highest-priority open items:

[language="csharp" source="./snippets/linq-statements/Program.cs" id="ComposeQuerySyntax"::: (complete source file; reference: ./snippets/linq-statements/Program.cs)](../../../../_code/docs/csharp/fundamentals/statements/snippets/linq-statements/Program.cs.md)

You can also compose queries with method syntax. The next example starts with all open items, then conditionally adds another filter before it selects the titles:

[language="csharp" source="./snippets/linq-statements/Program.cs" id="ComposeMethodSyntax"::: (complete source file; reference: ./snippets/linq-statements/Program.cs)](../../../../_code/docs/csharp/fundamentals/statements/snippets/linq-statements/Program.cs.md)

Composition can use either or both *eager evaluation* and *deferred execution*. Materialize a shared intermediate result with [System.Linq.Enumerable.ToList*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToList*) or [System.Linq.Enumerable.ToArray*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToArray*) when you want that part to run once and stay fixed. Then build another deferred query from the cached results for the final output:

[language="csharp" source="./snippets/linq-statements/Program.cs" id="ComposeWithCaching"::: (complete source file; reference: ./snippets/linq-statements/Program.cs)](../../../../_code/docs/csharp/fundamentals/statements/snippets/linq-statements/Program.cs.md)

## Explore LINQ in depth

This article uses in-memory collections to teach LINQ syntax and core operators. For more information about LINQ operators and advanced scenarios, see [Language Integrated Query (LINQ)](../../linq/index.md). That article covers joins, XML, database providers, dynamic queries, and custom operators.

## See also

- [Collections](collections.md)
- [Introduction to LINQ queries](../../linq/get-started/introduction-to-linq-queries.md)
- [Write LINQ queries](../../linq/get-started/write-linq-queries.md)
- [Standard query operators](../../linq/standard-query-operators/index.md)
- [Lambda expressions](../../language-reference/operators/lambda-expressions.md)
- [LINQ and collections](../../linq/how-to-query-collections.md)
