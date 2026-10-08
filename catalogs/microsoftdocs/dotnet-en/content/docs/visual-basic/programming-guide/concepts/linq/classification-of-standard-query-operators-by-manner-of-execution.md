---
description: "Learn more about: Classification of Standard Query Operators by Manner of Execution (Visual Basic)"
title: "Classification of Standard Query Operators by Manner of Execution"
ms.date: 07/20/2015
ms.assetid: 7f55b0be-9f6e-44f8-865c-6afbea50cc54
---
# Classification of standard query operators by manner of execution (Visual Basic)

The LINQ to Objects implementations of the standard query operator methods execute in one of two main ways: immediate or deferred. The query operators that use deferred execution can be additionally divided into two categories: streaming and non-streaming. If you know how the different query operators execute, it may help you understand the results that you get from a given query. This is especially true if the data source is changing or if you are building a query on top of another query. This topic classifies the standard query operators according to their manner of execution.

## Manners of Execution

### Immediate

 Immediate execution means that the data source is read and the operation is performed at the point in the code where the query is declared. All the standard query operators that return a single, non-enumerable result execute immediately.

### Deferred

 Deferred execution means that the operation is not performed at the point in the code where the query is declared. The operation is performed only when the query variable is enumerated, for example by using a `For Each` statement. This means that the results of executing the query depend on the contents of the data source when the query is executed rather than when the query is defined. If the query variable is enumerated multiple times, the results might differ every time. Almost all the standard query operators whose return type is [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) or [System.Linq.IOrderedEnumerable`1](https://learn.microsoft.com/search/?terms=System.Linq.IOrderedEnumerable%601) execute in a deferred manner.

 Query operators that use deferred execution can be additionally classified as streaming or non-streaming.

#### Streaming

 Streaming operators do not have to read all the source data before they yield elements. At the time of execution, a streaming operator performs its operation on each source element as it is read and yields the element if appropriate. A streaming operator continues to read source elements until a result element can be produced. This means that more than one source element might be read to produce one result element.

#### Non-Streaming

 Non-streaming operators must read all the source data before they can yield a result element. Operations such as sorting or grouping fall into this category. At the time of execution, non-streaming query operators read all the source data, put it into a data structure, perform the operation, and yield the resulting elements.

## Classification Table

 The following table classifies each standard query operator method according to its method of execution.

> **Note:**
> If an operator is marked in two columns, two input sequences are involved in the operation, and each sequence is evaluated differently. In these cases, it is always the first sequence in the parameter list that is evaluated in a deferred, streaming manner.

| Standard Query Operator | Return Type | Immediate Execution | Deferred Streaming Execution | Deferred Non-Streaming Execution |
| --- | --- | --- | --- | --- |
| [System.Linq.Enumerable.Aggregate*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Aggregate*) | TSource | X |  |  |
| [System.Linq.Enumerable.All*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.All*) | [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) | X |  |  |
| [System.Linq.Enumerable.Any*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Any*) | [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) | X |  |  |
| [System.Linq.Enumerable.AsEnumerable*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.AsEnumerable*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X |  |
| [System.Linq.Enumerable.Average*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Average*) | Single numeric value | X |  |  |
| [System.Linq.Enumerable.Cast*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Cast*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X |  |
| [System.Linq.Enumerable.Concat*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Concat*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X |  |
| [System.Linq.Enumerable.Contains*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Contains*) | [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) | X |  |  |
| [System.Linq.Enumerable.Count*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Count*) | [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) | X |  |  |
| [System.Linq.Enumerable.DefaultIfEmpty*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.DefaultIfEmpty*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X |  |
| [System.Linq.Enumerable.Distinct*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Distinct*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X |  |
| [System.Linq.Enumerable.ElementAt*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ElementAt*) | TSource | X |  |  |
| [System.Linq.Enumerable.ElementAtOrDefault*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ElementAtOrDefault*) | TSource | X |  |  |
| [System.Linq.Enumerable.Empty*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Empty*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) | X |  |  |
| [System.Linq.Enumerable.Except*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Except*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X | X |
| [System.Linq.Enumerable.First*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.First*) | TSource | X |  |  |
| [System.Linq.Enumerable.FirstOrDefault*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.FirstOrDefault*) | TSource | X |  |  |
| [System.Linq.Enumerable.GroupBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupBy*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  |  | X |
| [System.Linq.Enumerable.GroupJoin*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupJoin*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X | X |
| [System.Linq.Enumerable.Intersect*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Intersect*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X | X |
| [System.Linq.Enumerable.Join*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Join*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X | X |
| [System.Linq.Enumerable.Last*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Last*) | TSource | X |  |  |
| [System.Linq.Enumerable.LastOrDefault*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.LastOrDefault*) | TSource | X |  |  |
| [System.Linq.Enumerable.LongCount*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.LongCount*) | [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64) | X |  |  |
| [System.Linq.Enumerable.Max*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Max*) | Single numeric value, TSource, or TResult | X |  |  |
| [System.Linq.Enumerable.Min*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Min*) | Single numeric value, TSource, or TResult | X |  |  |
| [System.Linq.Enumerable.OfType*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OfType*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X |  |
| [System.Linq.Enumerable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderBy*) | [System.Linq.IOrderedEnumerable`1](https://learn.microsoft.com/search/?terms=System.Linq.IOrderedEnumerable%601) |  |  | X |
| [System.Linq.Enumerable.OrderByDescending*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderByDescending*) | [System.Linq.IOrderedEnumerable`1](https://learn.microsoft.com/search/?terms=System.Linq.IOrderedEnumerable%601) |  |  | X |
| [System.Linq.Enumerable.Range*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Range*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X |  |
| [System.Linq.Enumerable.Repeat*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Repeat*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X |  |
| [System.Linq.Enumerable.Reverse*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Reverse*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  |  | X |
| [System.Linq.Enumerable.Select*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Select*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X |  |
| [System.Linq.Enumerable.SelectMany*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SelectMany*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X |  |
| [System.Linq.Enumerable.SequenceEqual*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SequenceEqual*) | [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) | X |  |  |
| [System.Linq.Enumerable.Single*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Single*) | TSource | X |  |  |
| [System.Linq.Enumerable.SingleOrDefault*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SingleOrDefault*) | TSource | X |  |  |
| [System.Linq.Enumerable.Skip*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Skip*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X |  |
| [System.Linq.Enumerable.SkipWhile*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SkipWhile*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X |  |
| [System.Linq.Enumerable.Sum*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Sum*) | Single numeric value | X |  |  |
| [System.Linq.Enumerable.Take*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Take*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X |  |
| [System.Linq.Enumerable.TakeWhile*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.TakeWhile*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X |  |
| [System.Linq.Enumerable.ThenBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ThenBy*) | [System.Linq.IOrderedEnumerable`1](https://learn.microsoft.com/search/?terms=System.Linq.IOrderedEnumerable%601) |  |  | X |
| [System.Linq.Enumerable.ThenByDescending*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ThenByDescending*) | [System.Linq.IOrderedEnumerable`1](https://learn.microsoft.com/search/?terms=System.Linq.IOrderedEnumerable%601) |  |  | X |
| [System.Linq.Enumerable.ToArray*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToArray*) | TSource array | X |  |  |
| [System.Linq.Enumerable.ToDictionary*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToDictionary*) | [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) | X |  |  |
| [System.Linq.Enumerable.ToList*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToList*) | [System.Collections.Generic.IList`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IList%601) | X |  |  |
| [System.Linq.Enumerable.ToLookup*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToLookup*) | [System.Linq.ILookup`2](https://learn.microsoft.com/search/?terms=System.Linq.ILookup%602) | X |  |  |
| [System.Linq.Enumerable.Union*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Union*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X |  |
| [System.Linq.Enumerable.Where*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Where*) | [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) |  | X |  |

## See also

- [System.Linq.Enumerable](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable)
- [Standard Query Operators Overview (Visual Basic)](standard-query-operators-overview.md)
- [Query Expression Syntax for Standard Query Operators (Visual Basic)](query-expression-syntax-for-standard-query-operators.md)
- [LINQ to Objects (Visual Basic)](linq-to-objects.md)
