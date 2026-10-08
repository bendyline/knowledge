---
description: "Learn more about: Query Expression Syntax for Standard Query Operators (Visual Basic)"
title: "Query Expression Syntax for Standard Query Operators"
ms.date: 07/20/2015
ms.assetid: eb978d86-d3b5-497b-95ce-a054bea8f510
---
# Query Expression Syntax for Standard Query Operators (Visual Basic)

Some of the more frequently used standard query operators have dedicated Visual Basic language keyword syntax that enables them to be called as part of a *query expression*. A query expression is a different, more readable form of expressing a query than its *method-based*  equivalent. Query expression clauses are translated into calls to the query methods at compile time.

## Query Expression Syntax Table

 The following table lists the standard query operators that have equivalent query expression clauses.

| Method | Visual Basic Query Expression Syntax |
| --- | --- |
| [System.Linq.Enumerable.All*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.All*) | `Aggregate … In … Into All(…)`<br /><br /> (For more information, see [Aggregate Clause](../../../language-reference/queries/aggregate-clause.md).) |
| [System.Linq.Enumerable.Any*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Any*) | `Aggregate … In … Into Any()`<br /><br /> (For more information, see [Aggregate Clause](../../../language-reference/queries/aggregate-clause.md).) |
| [System.Linq.Enumerable.Average*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Average*) | `Aggregate … In … Into Average()`<br /><br /> (For more information, see [Aggregate Clause](../../../language-reference/queries/aggregate-clause.md).) |
| [System.Linq.Enumerable.Cast*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Cast*) | `From … As …`<br /><br /> (For more information, see [From Clause](../../../language-reference/queries/from-clause.md).) |
| [System.Linq.Enumerable.Count*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Count*) | `Aggregate … In … Into Count()`<br /><br /> (For more information, see [Aggregate Clause](../../../language-reference/queries/aggregate-clause.md).) |
| [System.Linq.Enumerable.Distinct``1%28System.Collections.Generic.IEnumerable%7B``0%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Distinct%60%601%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%2529) | `Distinct`<br /><br /> (For more information, see [Distinct Clause](../../../language-reference/queries/distinct-clause.md).) |
| [System.Linq.Enumerable.GroupBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupBy*) | `Group … By … Into …`<br /><br /> (For more information, see [Group By Clause](../../../language-reference/queries/group-by-clause.md).) |
| [System.Linq.Enumerable.GroupJoin``4%28System.Collections.Generic.IEnumerable%7B``0%7D%2CSystem.Collections.Generic.IEnumerable%7B``1%7D%2CSystem.Func%7B``0%2C``2%7D%2CSystem.Func%7B``1%2C``2%7D%2CSystem.Func%7B``0%2CSystem.Collections.Generic.IEnumerable%7B``1%7D%2C``3%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupJoin%60%604%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252CSystem.Collections.Generic.IEnumerable%257B%60%601%257D%252CSystem.Func%257B%60%600%252C%60%602%257D%252CSystem.Func%257B%60%601%252C%60%602%257D%252CSystem.Func%257B%60%600%252CSystem.Collections.Generic.IEnumerable%257B%60%601%257D%252C%60%603%257D%2529) | `Group Join … In … On …`<br /><br /> (For more information, see [Group Join Clause](../../../language-reference/queries/group-join-clause.md).) |
| [System.Linq.Enumerable.Join``4%28System.Collections.Generic.IEnumerable%7B``0%7D%2CSystem.Collections.Generic.IEnumerable%7B``1%7D%2CSystem.Func%7B``0%2C``2%7D%2CSystem.Func%7B``1%2C``2%7D%2CSystem.Func%7B``0%2C``1%2C``3%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Join%60%604%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252CSystem.Collections.Generic.IEnumerable%257B%60%601%257D%252CSystem.Func%257B%60%600%252C%60%602%257D%252CSystem.Func%257B%60%601%252C%60%602%257D%252CSystem.Func%257B%60%600%252C%60%601%252C%60%603%257D%2529) | `From x In …, y In … Where x.a = b.a`<br /><br /> -or-<br /><br /> `Join … [As …]In … On …`<br /><br /> (For more information, see [Join Clause](../../../language-reference/queries/join-clause.md).) |
| [System.Linq.Enumerable.LongCount*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.LongCount*) | `Aggregate … In … Into LongCount()`<br /><br /> (For more information, see [Aggregate Clause](../../../language-reference/queries/aggregate-clause.md).) |
| [System.Linq.Enumerable.Max*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Max*) | `Aggregate … In … Into Max()`<br /><br /> (For more information, see [Aggregate Clause](../../../language-reference/queries/aggregate-clause.md).) |
| [System.Linq.Enumerable.Min*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Min*) | `Aggregate … In … Into Min()`<br /><br /> (For more information, see [Aggregate Clause](../../../language-reference/queries/aggregate-clause.md).) |
| [System.Linq.Enumerable.OrderBy``2%28System.Collections.Generic.IEnumerable%7B``0%7D%2CSystem.Func%7B``0%2C``1%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderBy%60%602%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252CSystem.Func%257B%60%600%252C%60%601%257D%2529) | `Order By`<br /><br /> (For more information, see [Order By Clause](../../../language-reference/queries/order-by-clause.md).) |
| [System.Linq.Enumerable.OrderByDescending``2%28System.Collections.Generic.IEnumerable%7B``0%7D%2CSystem.Func%7B``0%2C``1%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderByDescending%60%602%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252CSystem.Func%257B%60%600%252C%60%601%257D%2529) | `Order By … Descending`<br /><br /> (For more information, see [Order By Clause](../../../language-reference/queries/order-by-clause.md).) |
| [System.Linq.Enumerable.Select*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Select*) | `Select`<br /><br /> (For more information, see [Select Clause](../../../language-reference/queries/select-clause.md).) |
| [System.Linq.Enumerable.SelectMany*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SelectMany*) | Multiple `From` clauses<br /><br /> (For more information, see [From Clause](../../../language-reference/queries/from-clause.md).) |
| [System.Linq.Enumerable.Skip*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Skip*) | `Skip`<br /><br /> (For more information, see [Skip Clause](../../../language-reference/queries/skip-clause.md).) |
| [System.Linq.Enumerable.SkipWhile*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SkipWhile*) | `Skip While`<br /><br /> (For more information, see [Skip While Clause](../../../language-reference/queries/skip-while-clause.md).) |
| [System.Linq.Enumerable.Sum*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Sum*) | `Aggregate … In … Into Sum()`<br /><br /> (For more information, see [Aggregate Clause](../../../language-reference/queries/aggregate-clause.md).) |
| [System.Linq.Enumerable.Take*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Take*) | `Take`<br /><br /> (For more information, see [Take Clause](../../../language-reference/queries/take-clause.md).) |
| [System.Linq.Enumerable.TakeWhile*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.TakeWhile*) | `Take While`<br /><br /> (For more information, see [Take While Clause](../../../language-reference/queries/take-while-clause.md).) |
| [System.Linq.Enumerable.ThenBy``2%28System.Linq.IOrderedEnumerable%7B``0%7D%2CSystem.Func%7B``0%2C``1%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ThenBy%60%602%2528System.Linq.IOrderedEnumerable%257B%60%600%257D%252CSystem.Func%257B%60%600%252C%60%601%257D%2529) | `Order By …, …`<br /><br /> (For more information, see [Order By Clause](../../../language-reference/queries/order-by-clause.md).) |
| [System.Linq.Enumerable.ThenByDescending``2%28System.Linq.IOrderedEnumerable%7B``0%7D%2CSystem.Func%7B``0%2C``1%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ThenByDescending%60%602%2528System.Linq.IOrderedEnumerable%257B%60%600%257D%252CSystem.Func%257B%60%600%252C%60%601%257D%2529) | `Order By …, … Descending`<br /><br /> (For more information, see [Order By Clause](../../../language-reference/queries/order-by-clause.md).) |
| [System.Linq.Enumerable.Where*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Where*) | `Where`<br /><br /> (For more information, see [Where Clause](../../../language-reference/queries/where-clause.md).) |

## See also

- [System.Linq.Enumerable](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable)
- [System.Linq.Queryable](https://learn.microsoft.com/search/?terms=System.Linq.Queryable)
- [Standard Query Operators Overview (Visual Basic)](standard-query-operators-overview.md)
- [Classification of Standard Query Operators by Manner of Execution (Visual Basic)](classification-of-standard-query-operators-by-manner-of-execution.md)
