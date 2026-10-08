---
title: "Filtering Data with LINQ"
description: Filtering, also known as selection, restricts results based on a condition. Learn about the standard query operator methods in LINQ in C# that perform filtering.
ms.date: 05/29/2024
---
# Filtering Data in C# with LINQ

Filtering refers to the operation of restricting the result set to contain only those elements that satisfy a specified condition. It's also referred to as *selecting* elements that match the specified condition.


> **Important:**
>
> These samples use an [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) data source. Data sources based on [System.Linq.IQueryProvider](https://learn.microsoft.com/search/?terms=System.Linq.IQueryProvider) use [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601) data sources and [expression trees](../../advanced-topics/expression-trees/index.md). Expression trees have [limitations](../../advanced-topics/expression-trees/index.md#limitations) on the allowed C# syntax. Furthermore, each `IQueryProvider` data source, such as [EF Core](https://learn.microsoft.com/ef/core/querying/complex-query-operators) may impose more restrictions. Check the documentation for your data source.


The following illustration shows the results of filtering a sequence of characters. The predicate for the filtering operation specifies that the character must be 'A'.

Diagram that shows a LINQ filtering operation

The standard query operator methods that perform selection are listed in the following table:

| Method Name | Description | C# Query Expression Syntax | More Information |
| --- | --- | --- | --- |
| OfType | Selects values, depending on their ability to be cast to a specified type. | Not applicable. | [System.Linq.Enumerable.OfType*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OfType*)<br /><br /> [System.Linq.Queryable.OfType*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.OfType*) |
| Where | Selects values that are based on a predicate function. | `where` | [System.Linq.Enumerable.Where*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Where*)<br /><br /> [System.Linq.Queryable.Where*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Where*) |

The following example uses the `where` clause to filter from an array those strings that have a specific length.


> **Note:**
> You can refer to the common data sources for this area in the [Standard Query Operators Overview](index.md) article.


[language="csharp" source="./snippets/standard-query-operators/WhereFilter.cs" id="FilterExampleQuery"::: (complete source file; reference: ./snippets/standard-query-operators/WhereFilter.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/WhereFilter.cs.md)

The equivalent query using method syntax is shown in the following code:

[language="csharp" source="./snippets/standard-query-operators/WhereFilter.cs" id="FilterExampleMethod"::: (complete source file; reference: ./snippets/standard-query-operators/WhereFilter.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/WhereFilter.cs.md)

## See also

- [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq)
- [where clause](../../language-reference/keywords/where-clause.md)
- [How to query an assembly's metadata with Reflection (LINQ) (C#)](../../advanced-topics/reflection-and-attributes/how-to-query-assembly-metadata-with-reflection-linq.md)
- [How to query for files with a specified attribute or name (C#)](../how-to-query-files-and-directories.md)
- [How to sort or filter text data by any word or field (LINQ) (C#)](../how-to-query-strings.md)
