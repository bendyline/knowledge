---
title: "Grouping Data"
description: Grouping puts data into groups of elements that share an attribute. Learn about the standard query operator methods in LINQ in C# that group data elements.
ms.date: 05/29/2024
---
# Grouping Data (C#)

Grouping refers to the operation of putting data into groups so that the elements in each group share a common attribute. The following illustration shows the results of grouping a sequence of characters. The key for each group is the character.

Diagram that shows a LINQ Grouping operation


> **Important:**
>
> These samples use an [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) data source. Data sources based on [System.Linq.IQueryProvider](https://learn.microsoft.com/search/?terms=System.Linq.IQueryProvider) use [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601) data sources and [expression trees](../../advanced-topics/expression-trees/index.md). Expression trees have [limitations](../../advanced-topics/expression-trees/index.md#limitations) on the allowed C# syntax. Furthermore, each `IQueryProvider` data source, such as [EF Core](https://learn.microsoft.com/ef/core/querying/complex-query-operators) may impose more restrictions. Check the documentation for your data source.


The standard query operator methods that group data elements are listed in the following table.

| Method Name | Description | C# Query Expression Syntax | More Information |
| --- | --- | --- | --- |
| GroupBy | Groups elements that share a common attribute. An [System.Linq.IGrouping`2](https://learn.microsoft.com/search/?terms=System.Linq.IGrouping%602) object represents each group. | `group … by …`<br /><br /> -or-<br /><br /> `group … by … into …` | [System.Linq.Enumerable.GroupBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupBy*)<br /><br /> [System.Linq.Queryable.GroupBy*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.GroupBy*) |
| ToLookup | Inserts elements into a [System.Linq.Lookup`2](https://learn.microsoft.com/search/?terms=System.Linq.Lookup%602) (a one-to-many dictionary) based on a key selector function. | Not applicable. | [System.Linq.Enumerable.ToLookup*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToLookup*) |

The following code example uses the `group by` clause to group integers in a list according to whether they're even or odd.

[language="csharp" source="./snippets/standard-query-operators/GroupOverview.cs" id="OverviewSampleQuerySyntax"::: (complete source file; reference: ./snippets/standard-query-operators/GroupOverview.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/GroupOverview.cs.md)

The equivalent query using method syntax is shown in the following code:

[language="csharp" source="./snippets/standard-query-operators/GroupOverview.cs" id="OverviewSampleMethodSyntax"::: (complete source file; reference: ./snippets/standard-query-operators/GroupOverview.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/GroupOverview.cs.md)


> **Note:**
> The following examples in this article use the common data sources for this area.  
> Each `Student` has a grade level, a primary department, and a series of scores. A `Teacher` also has a `City` property that identifies the campus where the teacher holds classes. A `Department` has a name, and a reference to a `Teacher` who serves as the department head.  
> You can find the example data set in the [source repo](https://github.com/dotnet/docs/blob/main/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/DataSources.cs#L41).

[language="csharp" source="../standard-query-operators/snippets/standard-query-operators/DataSources.cs" id="QueryDataSource"::: (complete source file; reference: ../standard-query-operators/snippets/standard-query-operators/DataSources.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/DataSources.cs.md)



> **Note:**
> You can refer to the common data sources for this area in the [Standard Query Operators Overview](index.md) article.


## Group query results

Grouping is one of the most powerful capabilities of LINQ. The following examples show how to group data in various ways:

- By a single property.
- By the first letter of a string property.
- By a computed numeric range.
- By Boolean predicate or other expression.
- By a compound key.

In addition, the last two queries project their results into a new anonymous type that contains only the student's first and family name. For more information, see the [group clause](../../language-reference/keywords/group-clause.md).

### Group by single property example

The following example shows how to group source elements by using a single property of the element as the group key. The key is an `enum`, the student's year in school. The grouping operation uses the default equality comparer for the type.

[language="csharp" source="./snippets/standard-query-operators/GroupQueryResults.cs" id="GroupByPropertyQuery"::: (complete source file; reference: ./snippets/standard-query-operators/GroupQueryResults.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/GroupQueryResults.cs.md)

The equivalent code using method syntax is shown in the following example:

[language="csharp" source="./snippets/standard-query-operators/GroupQueryResults.cs" id="GroupByPropertyMethod"::: (complete source file; reference: ./snippets/standard-query-operators/GroupQueryResults.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/GroupQueryResults.cs.md)

### Group by value example

The following example shows how to group source elements by using something other than a property of the object for the group key. In this example, the key is the first letter of the student's family name.

[language="csharp" source="./snippets/standard-query-operators/GroupQueryResults.cs" id="GroupByValueQuery"::: (complete source file; reference: ./snippets/standard-query-operators/GroupQueryResults.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/GroupQueryResults.cs.md)

Nested foreach is required to access group items.

The equivalent code using method syntax is shown in the following example:

[language="csharp" source="./snippets/standard-query-operators/GroupQueryResults.cs" id="GroupByValueMethod"::: (complete source file; reference: ./snippets/standard-query-operators/GroupQueryResults.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/GroupQueryResults.cs.md)

### Group by a range example

The following example shows how to group source elements by using a numeric range as a group key. The query then projects the results into an anonymous type that contains only the first and family name and the percentile range to which the student belongs. An anonymous type is used because it isn't necessary to use the complete `Student` object to display the results. `GetPercentile` is a helper function that calculates a percentile based on the student's average score. The method returns an integer between 0 and 10.

[language="csharp" source="./snippets/standard-query-operators/GroupQueryResults.cs" id="GroupByRangeQuery"::: (complete source file; reference: ./snippets/standard-query-operators/GroupQueryResults.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/GroupQueryResults.cs.md)

Nested foreach required to iterate over groups and group items. The equivalent code using method syntax is shown in the following example:

[language="csharp" source="./snippets/standard-query-operators/GroupQueryResults.cs" id="GroupByRangeMethod"::: (complete source file; reference: ./snippets/standard-query-operators/GroupQueryResults.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/GroupQueryResults.cs.md)

### Group by comparison example

The following example shows how to group source elements by using a Boolean comparison expression. In this example, the Boolean expression tests whether a student's average exam score is greater than 75. As in previous examples, the results are projected into an anonymous type because the complete source element isn't needed. The properties in the anonymous type become properties on the `Key` member.

[language="csharp" source="./snippets/standard-query-operators/GroupQueryResults.cs" id="GroupByBooleanQuerySyntax"::: (complete source file; reference: ./snippets/standard-query-operators/GroupQueryResults.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/GroupQueryResults.cs.md)

The equivalent query using method syntax is shown in the following code:

[language="csharp" source="./snippets/standard-query-operators/GroupQueryResults.cs" id="GroupByBooleanMethodSyntax"::: (complete source file; reference: ./snippets/standard-query-operators/GroupQueryResults.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/GroupQueryResults.cs.md)

### Group by anonymous type

The following example shows how to use an anonymous type to encapsulate a key that contains multiple values. In this example, the first key value is the first letter of the student's family name. The second key value is a Boolean that specifies whether the student scored over 85 on the first exam. You can order the groups by any property in the key.

[language="csharp" source="./snippets/standard-query-operators/GroupQueryResults.cs" id="GroupByCompundKeyQuerySyntax"::: (complete source file; reference: ./snippets/standard-query-operators/GroupQueryResults.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/GroupQueryResults.cs.md)

The equivalent query using method syntax is shown in the following code:

[language="csharp" source="./snippets/standard-query-operators/GroupQueryResults.cs" id="GroupByCompundKeyMethodSyntax"::: (complete source file; reference: ./snippets/standard-query-operators/GroupQueryResults.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/GroupQueryResults.cs.md)

## Create a nested group

The following example shows how to create nested groups in a LINQ query expression. Each group that is created according to student year or grade level is then further subdivided into groups based on the individuals' names.

[language="csharp" source="./snippets/standard-query-operators/NestedGroups.cs" id="NestedGroupsQuerySyntax"::: (complete source file; reference: ./snippets/standard-query-operators/NestedGroups.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/NestedGroups.cs.md)

Three nested `foreach` loops are required to iterate over the inner elements of a nested group.
<br/>(Hover the mouse cursor over the iteration variables, `outerGroup`, `innerGroup`, and `innerGroupElement` to see their actual type.)

The equivalent query using method syntax is shown in the following code:

[language="csharp" source="./snippets/standard-query-operators/NestedGroups.cs" id="NestedGroupsMethodSyntax"::: (complete source file; reference: ./snippets/standard-query-operators/NestedGroups.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/NestedGroups.cs.md)

## Perform a subquery on a grouping operation

This article shows two different ways to create a query that orders the source data into groups, and then performs a subquery over each group individually. The basic technique in each example is to group the source elements by using a *continuation* named `newGroup`, and then generating a new subquery against `newGroup`. This subquery is run against each new group created by the outer query. In this particular example the final output isn't a group, but a flat sequence of anonymous types.

For more information about how to group, see [group clause](../../language-reference/keywords/group-clause.md). For more information about continuations, see [into](../../language-reference/keywords/into.md). The following example uses an in-memory data structure as the data source, but the same principles apply for any kind of LINQ data source.

[language="csharp" source="./snippets/standard-query-operators/SubqueryOnGroup.cs" id="SubQueryOnGroupQuerySyntax"::: (complete source file; reference: ./snippets/standard-query-operators/SubqueryOnGroup.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SubqueryOnGroup.cs.md)

The query in the preceding snippet can also be written using method syntax. The following code snippet has a semantically equivalent query written using method syntax.

[language="csharp" source="./snippets/standard-query-operators/SubqueryOnGroup.cs" id="SubQueryOnGroupMethodSyntax"::: (complete source file; reference: ./snippets/standard-query-operators/SubqueryOnGroup.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/SubqueryOnGroup.cs.md)

## See also

- [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq)
- [System.Linq.Enumerable.GroupBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupBy*)
- [System.Linq.IGrouping`2](https://learn.microsoft.com/search/?terms=System.Linq.IGrouping%602)
- [group clause](../../language-reference/keywords/group-clause.md)
- [How to split a file into many files by using groups (LINQ) (C#)](../how-to-query-files-and-directories.md)
