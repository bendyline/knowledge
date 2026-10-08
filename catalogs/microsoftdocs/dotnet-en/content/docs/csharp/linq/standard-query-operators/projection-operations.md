---
title: "Projection operations in LINQ"
description: Learn about projection operations. These operations transform an object into a new form that often consists only of properties used later.
ms.date: 05/29/2024
---
# Projection operations (C#)

Projection refers to the operation of transforming an object into a new form that often consists only of those properties subsequently used. By using projection, you can construct a new type that is built from each object. You can project a property and perform a mathematical function on it. You can also project the original object without changing it.


> **Important:**
>
> These samples use an [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) data source. Data sources based on [System.Linq.IQueryProvider](https://learn.microsoft.com/search/?terms=System.Linq.IQueryProvider) use [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601) data sources and [expression trees](../../advanced-topics/expression-trees/index.md). Expression trees have [limitations](../../advanced-topics/expression-trees/index.md#limitations) on the allowed C# syntax. Furthermore, each `IQueryProvider` data source, such as [EF Core](https://learn.microsoft.com/ef/core/querying/complex-query-operators) may impose more restrictions. Check the documentation for your data source.


The standard query operator methods that perform projection are listed in the following section.

## Methods

| Method names | Description | C# query expression syntax | More information |
| --- | --- | --- | --- |
| Select | Projects values that are based on a transform function. | `select` | [System.Linq.Enumerable.Select*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Select*)<br />[System.Linq.Queryable.Select*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Select*) |
| SelectMany | Projects sequences of values that are based on a transform function and then flattens them into one sequence. | Use multiple `from` clauses | [System.Linq.Enumerable.SelectMany*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SelectMany*)<br />[System.Linq.Queryable.SelectMany*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.SelectMany*) |
| Zip | Produces a sequence of tuples with elements from 2-3 specified sequences. | Not applicable. | [System.Linq.Enumerable.Zip*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Zip*)<br />[System.Linq.Queryable.Zip*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Zip*) |

## `Select`

The following example uses the `select` clause to project the first letter from each string in a list of strings.


> **Note:**
> You can refer to the common data sources for this area in the [Standard Query Operators Overview](index.md) article.


[language="csharp" source="./snippets/standard-query-operators/SelectProjectionExamples.cs" id="SelectSimpleQuery"::: (complete source file; reference: ./snippets/standard-query-operators/SelectProjectionExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SelectProjectionExamples.cs.md)

The equivalent query using method syntax is shown in the following code:

[language="csharp" source="./snippets/standard-query-operators/SelectProjectionExamples.cs" id="SelectSimpleMethod"::: (complete source file; reference: ./snippets/standard-query-operators/SelectProjectionExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SelectProjectionExamples.cs.md)

## `SelectMany`

The following example uses multiple `from` clauses to project each word from each string in a list of strings.

[language="csharp" source="./snippets/standard-query-operators/SelectProjectionExamples.cs" id="SelectManyQuery"::: (complete source file; reference: ./snippets/standard-query-operators/SelectProjectionExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SelectProjectionExamples.cs.md)

The equivalent query using method syntax is shown in the following code:

[language="csharp" source="./snippets/standard-query-operators/SelectProjectionExamples.cs" id="SelectManyMethod"::: (complete source file; reference: ./snippets/standard-query-operators/SelectProjectionExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SelectProjectionExamples.cs.md)

The `SelectMany` method can also form the combination of matching every item in the first sequence with every item in the second sequence:

[language="csharp" source="./snippets/standard-query-operators/SelectProjectionExamples.cs" id="SelectManyQuery2"::: (complete source file; reference: ./snippets/standard-query-operators/SelectProjectionExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SelectProjectionExamples.cs.md)

The equivalent query using method syntax is shown in the following code:

[language="csharp" source="./snippets/standard-query-operators/SelectProjectionExamples.cs" id="SelectManyMethod2"::: (complete source file; reference: ./snippets/standard-query-operators/SelectProjectionExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SelectProjectionExamples.cs.md)

## `Zip`

There are several overloads for the `Zip` projection operator. All of the `Zip` methods work on sequences of two or more possibly heterogenous types. The first two overloads return tuples, with the corresponding positional type from the given sequences.

Consider the following collections:

[language="csharp" source="./snippets/standard-query-operators/SelectProjectionExamples.cs" id="NumbersAndLetters"::: (complete source file; reference: ./snippets/standard-query-operators/SelectProjectionExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SelectProjectionExamples.cs.md)

To project these sequences together, use the [System.Linq.Enumerable.Zip``2(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IEnumerable{``1})](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Zip%60%602(System.Collections.Generic.IEnumerable%7B%60%600%7D%2CSystem.Collections.Generic.IEnumerable%7B%60%601%7D)) operator:

[source="./snippets/standard-query-operators/SelectProjectionExamples.cs" id="ZipTuple"::: (complete source file; reference: ./snippets/standard-query-operators/SelectProjectionExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SelectProjectionExamples.cs.md)

> **Important:**
> The resulting sequence from a zip operation is never longer in length than the shortest sequence. The `numbers` and `letters` collections differ in length, and the resulting sequence omits the last element from the `numbers` collection, as it has nothing to zip with.

The second overload accepts a `third` sequence. Let's create another collection, namely `emoji`:

[source="./snippets/standard-query-operators/SelectProjectionExamples.cs" id="Emoji"::: (complete source file; reference: ./snippets/standard-query-operators/SelectProjectionExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SelectProjectionExamples.cs.md)

To project these sequences together, use the [System.Linq.Enumerable.Zip``3(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IEnumerable{``1},System.Collections.Generic.IEnumerable{``2})](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Zip%60%603(System.Collections.Generic.IEnumerable%7B%60%600%7D%2CSystem.Collections.Generic.IEnumerable%7B%60%601%7D%2CSystem.Collections.Generic.IEnumerable%7B%60%602%7D)) operator:

[source="./snippets/standard-query-operators/SelectProjectionExamples.cs" id="ZipTriple"::: (complete source file; reference: ./snippets/standard-query-operators/SelectProjectionExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SelectProjectionExamples.cs.md)

Much like the previous overload, the `Zip` method projects a tuple, but this time with three elements.

The third overload accepts a `Func<TFirst, TSecond, TResult>` argument that acts as a results selector. You can project a new resulting sequence from the sequences being zipped.

[source="./snippets/standard-query-operators/SelectProjectionExamples.cs" id="ZipResultSelector"::: (complete source file; reference: ./snippets/standard-query-operators/SelectProjectionExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SelectProjectionExamples.cs.md)

With the preceding `Zip` overload, the specified function is applied to the corresponding elements `number` and `letter`, producing a sequence of the `string` results.

## `Select` versus `SelectMany`

The work of both `Select` and `SelectMany` is to produce a result value (or values) from source values. `Select` produces one result value for every source value. The overall result is therefore a collection that has the same number of elements as the source collection. In contrast, `SelectMany` produces a single overall result that contains concatenated subcollections from each source value. The transform function that is passed as an argument to `SelectMany` must return an enumerable sequence of values for each source value. `SelectMany` concatenates these enumerable sequences to create one large sequence.

The following two illustrations show the conceptual difference between the actions of these two methods. In each case, assume that the selector (transform) function selects the array of flowers from each source value.

This illustration depicts how `Select` returns a collection that has the same number of elements as the source collection.

Graphic that shows the action of Select()

This illustration depicts how `SelectMany` concatenates the intermediate sequence of arrays into one final result value that contains each value from each intermediate array.

Graphic showing the action of SelectMany()

### Code example

The following example compares the behavior of `Select` and `SelectMany`. The code creates a "bouquet" of flowers by taking the items from each list of flower names in the source collection. In the following example, the "single value" that the transform function [System.Linq.Enumerable.Select``2%28System.Collections.Generic.IEnumerable%7B``0%7D%2CSystem.Func%7B``0%2C``1%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Select%60%602%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252CSystem.Func%257B%60%600%252C%60%601%257D%2529) uses is a collection of values. This example requires the extra `foreach` loop in order to enumerate each string in each subsequence.

[source="./snippets/standard-query-operators/SelectProjectionExamples.cs" id="SelectVsSelectMany"::: (complete source file; reference: ./snippets/standard-query-operators/SelectProjectionExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SelectProjectionExamples.cs.md)

## See also

- [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq)
- [select clause](../../language-reference/keywords/select-clause.md)
- [How to populate object collections from multiple sources (LINQ) (C#)](../how-to-query-collections.md)
- [How to split a file into many files by using groups (LINQ) (C#)](../how-to-query-files-and-directories.md)
