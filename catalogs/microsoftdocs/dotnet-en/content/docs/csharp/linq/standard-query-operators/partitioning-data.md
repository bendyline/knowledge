---
title: "Partitioning data"
description: Learn how to partition data in LINQ. View an illustration showing the results of partitioning operations.
ms.date: 05/29/2024
---
# Partitioning data (C#)

Partitioning in LINQ refers to the operation of dividing an input sequence into two sections, without rearranging the elements, and then returning one of the sections.


> **Important:**
>
> These samples use an [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) data source. Data sources based on [System.Linq.IQueryProvider](https://learn.microsoft.com/search/?terms=System.Linq.IQueryProvider) use [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601) data sources and [expression trees](../../advanced-topics/expression-trees/index.md). Expression trees have [limitations](../../advanced-topics/expression-trees/index.md#limitations) on the allowed C# syntax. Furthermore, each `IQueryProvider` data source, such as [EF Core](https://learn.microsoft.com/ef/core/querying/complex-query-operators) may impose more restrictions. Check the documentation for your data source.


The following illustration shows the results of three different partitioning operations on a sequence of characters. The first operation returns the first three elements in the sequence. The second operation skips the first three elements and returns the remaining elements. The third operation skips the first two elements in the sequence and returns the next three elements.

Illustration that shows three LINQ partitioning operations.

The standard query operator methods that partition sequences are listed in the following section.

## Operators

| Method names | Description | C# query expression syntax | More information |
| --- | --- | --- | --- |
| Skip | Skips elements up to a specified position in a sequence. | Not applicable. | [System.Linq.Enumerable.Skip*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Skip*)<br />[System.Linq.Queryable.Skip*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Skip*) |
| SkipWhile | Skips elements based on a predicate function until an element doesn't satisfy the condition. | Not applicable. | [System.Linq.Enumerable.SkipWhile*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SkipWhile*)<br />[System.Linq.Queryable.SkipWhile*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.SkipWhile*) |
| Take | Takes elements up to a specified position in a sequence. | Not applicable. | [System.Linq.Enumerable.Take*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Take*)<br />[System.Linq.Queryable.Take*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Take*) |
| TakeWhile | Takes elements based on a predicate function until an element doesn't satisfy the condition. | Not applicable. | [System.Linq.Enumerable.TakeWhile*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.TakeWhile*)<br />[System.Linq.Queryable.TakeWhile*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.TakeWhile*) |
| Chunk | Splits the elements of a sequence into chunks of a specified maximum size. | Not applicable. | [System.Linq.Enumerable.Chunk*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Chunk*)<br />[System.Linq.Queryable.Chunk*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Chunk*) |

All the following examples use [System.Linq.Enumerable.Range(System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Range(System.Int32%2CSystem.Int32)) to generate a sequence of numbers from 0 through 7.


> **Note:**
> You can refer to the common data sources for this area in the [Standard Query Operators Overview](index.md) article.


You use the `Take` method to take only the first elements in a sequence:

[source="snippets/standard-query-operators/PartitionExamples.cs" id="Take"::: (complete source file; reference: snippets/standard-query-operators/PartitionExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/PartitionExamples.cs.md)

You use the `Skip` method to skip the first elements in a sequence, and use the remaining elements:

[source="snippets/standard-query-operators/PartitionExamples.cs" id="Skip"::: (complete source file; reference: snippets/standard-query-operators/PartitionExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/PartitionExamples.cs.md)

The `TakeWhile` and `SkipWhile` methods also take and skip elements in a sequence. However, instead of a set number of elements, these methods skip or take elements based on a condition. `TakeWhile` takes the elements of a sequence until an element doesn't match the condition.

[source="snippets/standard-query-operators/PartitionExamples.cs" id="TakeWhile"::: (complete source file; reference: snippets/standard-query-operators/PartitionExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/PartitionExamples.cs.md)

`SkipWhile` skips the first elements, as long as the condition is true. The first element not matching the condition, and all subsequent elements, are returned.

[source="snippets/standard-query-operators/PartitionExamples.cs" id="SkipWhile"::: (complete source file; reference: snippets/standard-query-operators/PartitionExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/PartitionExamples.cs.md)

The `Chunk` operator is used to split elements of a sequence based on a given `size`.

[source="snippets/standard-query-operators/PartitionExamples.cs" id="Chunk"::: (complete source file; reference: snippets/standard-query-operators/PartitionExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/PartitionExamples.cs.md)

The preceding C# code:

- Relies on [System.Linq.Enumerable.Range(System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Range(System.Int32%2CSystem.Int32)) to generate a sequence of numbers.
- Applies the `Chunk` operator, splitting the sequence into chunks with a max size of three.

## See also

- [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq)
