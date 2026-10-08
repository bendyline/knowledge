---
description: "Learn more about: Set Operations (Visual Basic)"
title: "Set Operations"
ms.date: 07/20/2015
ms.assetid: 2b06e822-e030-438f-9db7-ee402bd3a706
---
# Set Operations (Visual Basic)

Set operations in LINQ refer to query operations that produce a result set that is based on the presence or absence of equivalent elements within the same or separate collections (or sets).

The standard query operator methods that perform set operations are listed in the following section.

## Methods

| Method Name | Description | Visual Basic Query Expression Syntax | More Information |
| --- | --- | --- | --- |
| Distinct or DistinctBy | Removes duplicate values from a collection. | `Distinct` | [System.Linq.Enumerable.Distinct*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Distinct*)<br />[System.Linq.Enumerable.DistinctBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.DistinctBy*)<br />[System.Linq.Queryable.Distinct*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Distinct*)<br />[System.Linq.Queryable.DistinctBy*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.DistinctBy*) |
| Except or ExceptBy | Returns the set difference, which means the elements of one collection that do not appear in a second collection. | Not applicable. | [System.Linq.Enumerable.Except*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Except*)<br />[System.Linq.Enumerable.ExceptBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ExceptBy*)<br />[System.Linq.Queryable.Except*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Except*)<br />[System.Linq.Queryable.ExceptBy*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.ExceptBy*) |
| Intersect or IntersectBy | Returns the set intersection, which means elements that appear in each of two collections. | Not applicable. | [System.Linq.Enumerable.Intersect*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Intersect*)<br />[System.Linq.Enumerable.IntersectBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.IntersectBy*)<br />[System.Linq.Queryable.Intersect*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Intersect*)<br />[System.Linq.Queryable.IntersectBy*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.IntersectBy*) |
| Union or UnionBy | Returns the set union, which means unique elements that appear in either of two collections. | Not applicable. | [System.Linq.Enumerable.Union*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Union*)<br />[System.Linq.Enumerable.UnionBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.UnionBy*)<br />[System.Linq.Queryable.Union*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Union*)<br />[System.Linq.Queryable.UnionBy*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.UnionBy*) |

## Comparison of Set Operations

### Distinct

The following illustration depicts the behavior of the [System.Linq.Enumerable.Distinct*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Distinct*) method on a sequence of characters. The returned sequence contains the unique elements from the input sequence.

Graphic showing the behavior of Distinct().

### Except

The following illustration depicts the behavior of [System.Linq.Enumerable.Except*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Except*). The returned sequence contains only the elements from the first input sequence that are not in the second input sequence.

Graphic showing the action of Except().

### Intersect

The following illustration depicts the behavior of [System.Linq.Enumerable.Intersect*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Intersect*). The returned sequence contains the elements that are common to both of the input sequences.

Graphic showing the intersection of two sequences.

### Union

The following illustration depicts a union operation on two sequences of characters. The returned sequence contains the unique elements from both input sequences.

Graphic showing the union of two sequences.

## Query Expression Syntax Example

The following example uses the `Distinct` clause in a LINQ query to return the unique numbers from a list of integers.

[CsLINQSetOps#1 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQSetOps/VB/setops.vb#1)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQSetOps/VB/setops.vb.md)

## See also

- [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq)
- [Standard Query Operators Overview (Visual Basic)](standard-query-operators-overview.md)
- [Distinct Clause](../../../language-reference/queries/distinct-clause.md)
- [How to: Combine and Compare String Collections (LINQ) (Visual Basic)](how-to-combine-and-compare-string-collections-linq.md)
- [How to: Find the Set Difference Between Two Lists (LINQ) (Visual Basic)](how-to-find-the-set-difference-between-two-lists-linq.md)
