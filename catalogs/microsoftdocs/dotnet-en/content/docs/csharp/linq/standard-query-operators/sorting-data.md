---
title: "Sorting Data"
description: Learn about sort operations and the standard query operator methods that perform sort operations in LINQ in C#.
ms.date: 05/29/2024
---
# Sorting Data (C#)

A sorting operation orders the elements of a sequence based on one or more attributes. The first sort criterion performs a primary sort on the elements. By specifying a second sort criterion, you can sort the elements within each primary sort group.


> **Important:**
>
> These samples use an [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) data source. Data sources based on [System.Linq.IQueryProvider](https://learn.microsoft.com/search/?terms=System.Linq.IQueryProvider) use [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601) data sources and [expression trees](../../advanced-topics/expression-trees/index.md). Expression trees have [limitations](../../advanced-topics/expression-trees/index.md#limitations) on the allowed C# syntax. Furthermore, each `IQueryProvider` data source, such as [EF Core](https://learn.microsoft.com/ef/core/querying/complex-query-operators) may impose more restrictions. Check the documentation for your data source.


The following illustration shows the results of an alphabetical sort operation on a sequence of characters:

Graphic that shows an alphabetical sort operation.

The standard query operator methods that sort data are listed in the following section.

## Methods

| Method Name | Description | C# Query Expression Syntax | More Information |
| --- | --- | --- | --- |
| OrderBy | Sorts values in ascending order. | `orderby` | [System.Linq.Enumerable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderBy*)<br /><br /> [System.Linq.Queryable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.OrderBy*) |
| OrderByDescending | Sorts values in descending order. | `orderby … descending` | [System.Linq.Enumerable.OrderByDescending*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderByDescending*)<br /><br /> [System.Linq.Queryable.OrderByDescending*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.OrderByDescending*) |
| ThenBy | Performs a secondary sort in ascending order. | `orderby …, …` | [System.Linq.Enumerable.ThenBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ThenBy*)<br /><br /> [System.Linq.Queryable.ThenBy*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.ThenBy*) |
| ThenByDescending | Performs a secondary sort in descending order. | `orderby …, … descending` | [System.Linq.Enumerable.ThenByDescending*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ThenByDescending*)<br /><br /> [System.Linq.Queryable.ThenByDescending*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.ThenByDescending*) |
| Reverse | Reverses the order of the elements in a collection. | Not applicable. | [System.Linq.Enumerable.Reverse*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Reverse*)<br /><br /> [System.Linq.Queryable.Reverse*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Reverse*) |


> **Note:**
> The following examples in this article use the common data sources for this area.  
> Each `Student` has a grade level, a primary department, and a series of scores. A `Teacher` also has a `City` property that identifies the campus where the teacher holds classes. A `Department` has a name, and a reference to a `Teacher` who serves as the department head.  
> You can find the example data set in the [source repo](https://github.com/dotnet/docs/blob/main/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/DataSources.cs#L41).

[language="csharp" source="../standard-query-operators/snippets/standard-query-operators/DataSources.cs" id="QueryDataSource"::: (complete source file; reference: ../standard-query-operators/snippets/standard-query-operators/DataSources.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/DataSources.cs.md)



> **Note:**
> You can refer to the common data sources for this area in the [Standard Query Operators Overview](index.md) article.


## Primary Ascending Sort

The following example demonstrates how to use the `orderby` clause in a LINQ query to sort the array of teachers by family name, in ascending order.

[language="csharp" source="./snippets/standard-query-operators/SortExamples.cs" id="PrimaryAscendingSortQuery"::: (complete source file; reference: ./snippets/standard-query-operators/SortExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SortExamples.cs.md)

The equivalent query written using method syntax is shown in the following code:

[language="csharp" source="./snippets/standard-query-operators/SortExamples.cs" id="PrimaryAscendingSortMethod"::: (complete source file; reference: ./snippets/standard-query-operators/SortExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SortExamples.cs.md)

## Primary Descending Sort

The next example demonstrates how to use the `orderby descending` clause in a LINQ query to sort the teachers by family name, in descending order.

[language="csharp" source="./snippets/standard-query-operators/SortExamples.cs" id="PrimaryDescendingSortQuery"::: (complete source file; reference: ./snippets/standard-query-operators/SortExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SortExamples.cs.md)

The equivalent query written using method syntax is shown in the following code:

[language="csharp" source="./snippets/standard-query-operators/SortExamples.cs" id="PrimaryDescendingSortMethod"::: (complete source file; reference: ./snippets/standard-query-operators/SortExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SortExamples.cs.md)

## Secondary Ascending Sort

The following example demonstrates how to use the `orderby` clause in a LINQ query to perform a primary and secondary sort. The teachers are sorted primarily by city and secondarily by their family name, both in ascending order.

[language="csharp" source="./snippets/standard-query-operators/SortExamples.cs" id="SecondaryAscendingSortQuery"::: (complete source file; reference: ./snippets/standard-query-operators/SortExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SortExamples.cs.md)

The equivalent query written using method syntax is shown in the following code:

[language="csharp" source="./snippets/standard-query-operators/SortExamples.cs" id="SecondaryAscendingSortMethod"::: (complete source file; reference: ./snippets/standard-query-operators/SortExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SortExamples.cs.md)

## Secondary Descending Sort

The next example demonstrates how to use the `orderby descending` clause in a LINQ query to perform a primary sort, in ascending order, and a secondary sort, in descending order. The teachers are sorted primarily by city and secondarily by their family name.

[language="csharp" source="./snippets/standard-query-operators/SortExamples.cs" id="SecondaryDescendingSortQuery"::: (complete source file; reference: ./snippets/standard-query-operators/SortExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SortExamples.cs.md)

The equivalent query written using method syntax is shown in the following code:

[language="csharp" source="./snippets/standard-query-operators/SortExamples.cs" id="SecondaryDescendingSortMethod"::: (complete source file; reference: ./snippets/standard-query-operators/SortExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SortExamples.cs.md)

## See also

- [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq)
- [orderby clause](../../language-reference/keywords/orderby-clause.md)
- [How to sort or filter text data by any word or field (LINQ) (C#)](../how-to-query-strings.md)
