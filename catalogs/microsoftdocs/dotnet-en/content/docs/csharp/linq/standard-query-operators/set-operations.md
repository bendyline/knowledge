---
title: "Set operations"
description: Learn about set operations and the standard query operator methods that perform set operations in LINQ in C#.
ms.date: 05/29/2024
---
# Set operations (C#)

Set operations in LINQ refer to query operations that produce a result set based on the presence or absence of equivalent elements within the same or separate collections.


> **Important:**
>
> These samples use an [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) data source. Data sources based on [System.Linq.IQueryProvider](https://learn.microsoft.com/search/?terms=System.Linq.IQueryProvider) use [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601) data sources and [expression trees](../../advanced-topics/expression-trees/index.md). Expression trees have [limitations](../../advanced-topics/expression-trees/index.md#limitations) on the allowed C# syntax. Furthermore, each `IQueryProvider` data source, such as [EF Core](https://learn.microsoft.com/ef/core/querying/complex-query-operators) may impose more restrictions. Check the documentation for your data source.


| Method names | Description | C# query expression syntax | More information |
| --- | --- | --- | --- |
| `Distinct` or `DistinctBy` | Removes duplicate values from a collection. | Not applicable. | [System.Linq.Enumerable.Distinct*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Distinct*)<br />[System.Linq.Enumerable.DistinctBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.DistinctBy*)<br />[System.Linq.Queryable.Distinct*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Distinct*)<br />[System.Linq.Queryable.DistinctBy*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.DistinctBy*) |
| `Except` or `ExceptBy` | Returns the set difference, which means the elements of one collection that don't appear in a second collection. | Not applicable. | [System.Linq.Enumerable.Except*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Except*)<br />[System.Linq.Enumerable.ExceptBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ExceptBy*)<br />[System.Linq.Queryable.Except*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Except*)<br />[System.Linq.Queryable.ExceptBy*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.ExceptBy*) |
| `Intersect` or `IntersectBy` | Returns the set intersection, which means elements that appear in each of two collections. | Not applicable. | [System.Linq.Enumerable.Intersect*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Intersect*)<br />[System.Linq.Enumerable.IntersectBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.IntersectBy*)<br />[System.Linq.Queryable.Intersect*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Intersect*)<br />[System.Linq.Queryable.IntersectBy*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.IntersectBy*) |
| `Union` or `UnionBy` | Returns the set union, which means unique elements that appear in either of two collections. | Not applicable. | [System.Linq.Enumerable.Union*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Union*)<br />[System.Linq.Enumerable.UnionBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.UnionBy*)<br />[System.Linq.Queryable.Union*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Union*)<br />[System.Linq.Queryable.UnionBy*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.UnionBy*) |

## `Distinct` and `DistinctBy`

The following example depicts the behavior of the [System.Linq.Enumerable.Distinct*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Distinct*) method on a sequence of strings. The returned sequence contains the unique elements from the input sequence.

Graphic showing the behavior of Distinct()

[language="csharp" source="snippets/standard-query-operators/SetOperations.cs" id="Distinct"::: (complete source file; reference: snippets/standard-query-operators/SetOperations.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SetOperations.cs.md)

The [`DistinctBy`](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.DistinctBy*) is an alternative approach to `Distinct` that takes a `keySelector`. The `keySelector` is used as the comparative discriminator of the source type. In the following code, words are discriminated based on their `Length`, and the first word of each length is displayed:

[source="./snippets/standard-query-operators/SetOperations.cs" id="DistinctBy"::: (complete source file; reference: ./snippets/standard-query-operators/SetOperations.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SetOperations.cs.md)

## `Except` and `ExceptBy`

The following example depicts the behavior of [System.Linq.Enumerable.Except*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Except*). The returned sequence contains only the elements from the first input sequence that aren't in the second input sequence.

Graphic showing the action of Except()


> **Note:**
> The following examples in this article use the common data sources for this area.  
> Each `Student` has a grade level, a primary department, and a series of scores. A `Teacher` also has a `City` property that identifies the campus where the teacher holds classes. A `Department` has a name, and a reference to a `Teacher` who serves as the department head.  
> You can find the example data set in the [source repo](https://github.com/dotnet/docs/blob/main/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/DataSources.cs#L41).

[language="csharp" source="../standard-query-operators/snippets/standard-query-operators/DataSources.cs" id="QueryDataSource"::: (complete source file; reference: ../standard-query-operators/snippets/standard-query-operators/DataSources.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/DataSources.cs.md)



> **Note:**
> You can refer to the common data sources for this area in the [Standard Query Operators Overview](index.md) article.


[language="csharp" source="./snippets/standard-query-operators/SetOperations.cs" id="Except"::: (complete source file; reference: ./snippets/standard-query-operators/SetOperations.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SetOperations.cs.md)

The [System.Linq.Enumerable.ExceptBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ExceptBy*) method is an alternative approach to `Except` that takes two sequences of possibly heterogenous types and a `keySelector`. The `keySelector` is the same type as the first collection's type. Consider the following `Teacher` array and teacher IDs to exclude. To find teachers in the first collection that aren't in the second collection, you can project the teacher's ID onto the second collection:

[language="csharp" source="snippets/standard-query-operators/SetOperations.cs" id="ExceptBy"::: (complete source file; reference: snippets/standard-query-operators/SetOperations.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SetOperations.cs.md)

In the preceding C# code:

- The `teachers` array is filtered to only those teachers that aren't in the `teachersToExclude` array.
- The `teachersToExclude` array contains the `ID` value for all department heads.
- The call to `ExceptBy` results in a new set of values that are written to the console.

The new set of values is of type `Teacher`, which is the type of the first collection. Each `teacher` in the `teachers` array that doesn't have a corresponding ID value in the `teachersToExclude` array is written to the console.

## `Intersect` and `IntersectBy`

The following example depicts the behavior of [System.Linq.Enumerable.Intersect*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Intersect*). The returned sequence contains the elements that are common to both of the input sequences.

Graphic showing the intersection of two sequences

[language="csharp" source="./snippets/standard-query-operators/SetOperations.cs" id="Intersect"::: (complete source file; reference: ./snippets/standard-query-operators/SetOperations.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SetOperations.cs.md)

The [System.Linq.Enumerable.IntersectBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.IntersectBy*) method is an alternative approach to `Intersect` that takes two sequences of possibly heterogenous types and a `keySelector`. The `keySelector` is used as the comparative discriminator of the second collection's type. Consider the following student and teacher arrays. The query matches items in each sequence by name to find those students who are also teachers:

[language="csharp" source="./snippets/standard-query-operators/SetOperations.cs" id="IntersectBy"::: (complete source file; reference: ./snippets/standard-query-operators/SetOperations.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SetOperations.cs.md)

In the preceding C# code:

- The query produces the intersection of the `Teacher` and `Student` by comparing names.
- Only people that are found in both arrays are present in the resulting sequence.
- The resulting `Student` instances are written to the console.

## `Union` and `UnionBy`

The following example depicts a union operation on two sequences of strings. The returned sequence contains the unique elements from both input sequences.

Graphic showing the union of two sequences.

[language="csharp" source="./snippets/standard-query-operators/SetOperations.cs" id="Union"::: (complete source file; reference: ./snippets/standard-query-operators/SetOperations.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SetOperations.cs.md)

The [System.Linq.Enumerable.UnionBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.UnionBy*) method is an alternative approach to `Union` that takes two sequences of the same type and a `keySelector`. The `keySelector` is used as the comparative discriminator of the source type. The following query produces the list of all people that are either students or teachers. Students who are also teachers are added to the union set only once:

[language="csharp" source="./snippets/standard-query-operators/SetOperations.cs" id="UnionBy"::: (complete source file; reference: ./snippets/standard-query-operators/SetOperations.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SetOperations.cs.md)

In the preceding C# code:

- The `teachers` and `students` arrays are woven together using their names as the key selector.
- The resulting names are written to the console.

## See also

- [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq)
- [How to find the set difference between two lists (LINQ) (C#)](../how-to-query-collections.md)
