---
title: "Converting Data Types"
description: Conversion methods change the type of input objects. See conversion operations in LINQ queries in C#, such as Enumerable.AsEnumerable and Enumerable.OfType.
ms.date: 05/29/2024
---
# Converting Data Types (C#)

Conversion methods change the type of input objects.


> **Important:**
>
> These samples use an [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) data source. Data sources based on [System.Linq.IQueryProvider](https://learn.microsoft.com/search/?terms=System.Linq.IQueryProvider) use [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601) data sources and [expression trees](../../advanced-topics/expression-trees/index.md). Expression trees have [limitations](../../advanced-topics/expression-trees/index.md#limitations) on the allowed C# syntax. Furthermore, each `IQueryProvider` data source, such as [EF Core](https://learn.microsoft.com/ef/core/querying/complex-query-operators) may impose more restrictions. Check the documentation for your data source.


Conversion operations in LINQ queries are useful in various applications. Following are some examples:

- The [System.Linq.Enumerable.AsEnumerable*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.AsEnumerable*) method can be used to hide a type's custom implementation of a standard query operator.
- The [System.Linq.Enumerable.OfType*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OfType*) method can be used to enable non-parameterized collections for LINQ querying.
- The [System.Linq.Enumerable.ToArray*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToArray*), [System.Linq.Enumerable.ToDictionary*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToDictionary*), [System.Linq.Enumerable.ToList*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToList*), and [System.Linq.Enumerable.ToLookup*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToLookup*) methods can be used to force immediate query execution instead of deferring it until the query is enumerated.

## Methods

The following table lists the standard query operator methods that perform data-type conversions.

The conversion methods in this table whose names start with "As" change the static type of the source collection but don't enumerate it. The methods whose names start with "To" enumerate the source collection and put the items into the corresponding collection type.

| Method Name | Description | C# Query Expression Syntax | More Information |
| --- | --- | --- | --- |
| AsEnumerable | Returns the input typed as [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601). | Not applicable. | [System.Linq.Enumerable.AsEnumerable*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.AsEnumerable*) |
| AsQueryable | Converts a (generic) [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable) to a (generic) [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable). | Not applicable. | [System.Linq.Queryable.AsQueryable*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.AsQueryable*) |
| Cast | Casts the elements of a collection to a specified type. | Use an explicitly typed range variable. For example:<br /><br /> `from string str in words` | [System.Linq.Enumerable.Cast*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Cast*)<br /><br /> [System.Linq.Queryable.Cast*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Cast*) |
| OfType | Filters values, depending on their ability to be cast to a specified type. | Not applicable. | [System.Linq.Enumerable.OfType*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OfType*)<br /><br /> [System.Linq.Queryable.OfType*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.OfType*) |
| ToArray | Converts a collection to an array. This method forces query execution. | Not applicable. | [System.Linq.Enumerable.ToArray*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToArray*) |
| ToDictionary | Puts elements into a [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) based on a key selector function. This method forces query execution. | Not applicable. | [System.Linq.Enumerable.ToDictionary*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToDictionary*) |
| ToList | Converts a collection to a [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601). This method forces query execution. | Not applicable. | [System.Linq.Enumerable.ToList*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToList*) |
| ToLookup | Puts elements into a [System.Linq.Lookup`2](https://learn.microsoft.com/search/?terms=System.Linq.Lookup%602) (a one-to-many dictionary) based on a key selector function. This method forces query execution. | Not applicable. | [System.Linq.Enumerable.ToLookup*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToLookup*) |


> **Note:**
> The following examples in this article use the common data sources for this area.  
> Each `Student` has a grade level, a primary department, and a series of scores. A `Teacher` also has a `City` property that identifies the campus where the teacher holds classes. A `Department` has a name, and a reference to a `Teacher` who serves as the department head.  
> You can find the example data set in the [source repo](https://github.com/dotnet/docs/blob/main/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/DataSources.cs#L41).

[language="csharp" source="../standard-query-operators/snippets/standard-query-operators/DataSources.cs" id="QueryDataSource"::: (complete source file; reference: ../standard-query-operators/snippets/standard-query-operators/DataSources.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/DataSources.cs.md)



> **Note:**
> You can refer to the common data sources for this area in the [Standard Query Operators Overview](index.md) article.


## Query Expression Syntax Example

The following code example uses an explicitly typed range variable to cast a type to a subtype before accessing a member that is available only on the subtype.

[language="csharp" source="./snippets/standard-query-operators/ConversionExamples.cs" id="CastOperatorQuerySyntax"::: (complete source file; reference: ./snippets/standard-query-operators/ConversionExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/ConversionExamples.cs.md)

The equivalent query can be expressed using method syntax as shown in the following example:

[language="csharp" source="./snippets/standard-query-operators/ConversionExamples.cs" id="CastOperatorMethodSyntax"::: (complete source file; reference: ./snippets/standard-query-operators/ConversionExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/ConversionExamples.cs.md)

## See also

- [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq)
- [from clause](../../language-reference/keywords/from-clause.md)
