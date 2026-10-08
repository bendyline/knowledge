---
title: "Join Operations"
description: A join of two data sources associates objects with objects that share an attribute across data sources. Learn about join methods in the LINQ framework in C#.
ms.date: 12/15/2025
no-loc: [Join, GroupJoin]
---
# Join operations in LINQ

A *join* associates objects in one data source with objects that share a common attribute in another data source.


> **Important:**
>
> These samples use an [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) data source. Data sources based on [System.Linq.IQueryProvider](https://learn.microsoft.com/search/?terms=System.Linq.IQueryProvider) use [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601) data sources and [expression trees](../../advanced-topics/expression-trees/index.md). Expression trees have [limitations](../../advanced-topics/expression-trees/index.md#limitations) on the allowed C# syntax. Furthermore, each `IQueryProvider` data source, such as [EF Core](https://learn.microsoft.com/ef/core/querying/complex-query-operators) may impose more restrictions. Check the documentation for your data source.


Joining is an important operation in queries that target data sources whose relationships to each other you can't follow directly. In object-oriented programming, joining could mean a correlation between objects that isn't modeled, such as the backwards direction of a one-way relationship. An example of a one-way relationship is a `Student` class that has a property of type `Department` that represents the major, but the `Department` class doesn't have a property that is a collection of `Student` objects. If you have a list of `Department` objects and you want to find all the students in each department, you could use a join operation to find them.

The LINQ framework provides join methods: [System.Linq.Enumerable.Join*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Join*) and [System.Linq.Enumerable.GroupJoin*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupJoin*). These methods perform equijoins, or joins that match two data sources based on equality of their keys. For comparison, Transact-SQL supports join operators other than `equals`, such as the `less than` operator. In relational database terms, [System.Linq.Enumerable.Join*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Join*) implements an inner join, a type of join in which only those objects that have a match in the other data set are returned. The [System.Linq.Enumerable.GroupJoin*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupJoin*) method has no direct equivalent in relational database terms, but it implements a superset of inner joins and left outer joins. A left outer join is a join that returns each element of the first (left) data source, even if it has no correlated elements in the other data source.

The following illustration shows a conceptual view of two sets and the elements within those sets that are included in either an inner join or a left outer join.

Two overlapping circles showing inner/outer.

## Methods

| Method Name | Description | C# Query Expression Syntax | More Information |
| --- | --- | --- | --- |
| Join | Joins two sequences based on key selector functions and extracts pairs of values. | `join … in … on … equals …` | [System.Linq.Enumerable.Join*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Join*)<br /><br /> [System.Linq.Queryable.Join*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Join*) |
| GroupJoin | Joins two sequences based on key selector functions and groups the resulting matches for each element. | `join … in … on … equals … into …` | [System.Linq.Enumerable.GroupJoin*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupJoin*)<br /><br /> [System.Linq.Queryable.GroupJoin*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.GroupJoin*) |
| LeftJoin | Correlates the elements of two sequences based on matching keys. | N/A | [System.Linq.Enumerable.LeftJoin*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.LeftJoin*)<br /><br /> [System.Linq.Queryable.LeftJoin*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.LeftJoin*) |
| RightJoin | Correlates the elements of two sequences based on matching keys. | N/A | [System.Linq.Enumerable.RightJoin*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.RightJoin*)<br /><br /> [System.Linq.Queryable.RightJoin*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.RightJoin*) |


> **Note:**
> The following examples in this article use the common data sources for this area.  
> Each `Student` has a grade level, a primary department, and a series of scores. A `Teacher` also has a `City` property that identifies the campus where the teacher holds classes. A `Department` has a name, and a reference to a `Teacher` who serves as the department head.  
> You can find the example data set in the [source repo](https://github.com/dotnet/docs/blob/main/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/DataSources.cs#L41).

[language="csharp" source="../standard-query-operators/snippets/standard-query-operators/DataSources.cs" id="QueryDataSource"::: (complete source file; reference: ../standard-query-operators/snippets/standard-query-operators/DataSources.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/DataSources.cs.md)



> **Note:**
> You can refer to the common data sources for this area in the [Standard Query Operators Overview](index.md) article.


The following example uses the `join … in … on … equals …` clause to join two sequences based on a specific value:

[language="csharp" source="./snippets/standard-query-operators/JoinOverviewExamples.cs" id="JoinQuerySyntax"::: (complete source file; reference: ./snippets/standard-query-operators/JoinOverviewExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/JoinOverviewExamples.cs.md)

You can express the preceding query by using method syntax, as shown in the following code:

[language="csharp" source="./snippets/standard-query-operators/JoinOverviewExamples.cs" id="JoinMethodSyntax"::: (complete source file; reference: ./snippets/standard-query-operators/JoinOverviewExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/JoinOverviewExamples.cs.md)

The following example uses the `join … in … on … equals … into …` clause to join two sequences based on a specific value and group the resulting matches for each element:

[language="csharp" source="./snippets/standard-query-operators/JoinOverviewExamples.cs" id="GroupJoinQuerySyntax"::: (complete source file; reference: ./snippets/standard-query-operators/JoinOverviewExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/JoinOverviewExamples.cs.md)

You can express the preceding query by using method syntax, as shown in the following example:

[language="csharp" source="./snippets/standard-query-operators/JoinOverviewExamples.cs" id="GroupJoinMethodSyntax"::: (complete source file; reference: ./snippets/standard-query-operators/JoinOverviewExamples.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/JoinOverviewExamples.cs.md)

## Perform inner joins

In relational database terms, an *inner join* produces a result set in which each element of the first collection appears one time for every matching element in the second collection. If an element in the first collection has no matching elements, it doesn't appear in the result set. The [System.Linq.Enumerable.Join*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Join*) method, which the `join` clause in C# calls, implements an inner join. The following examples show you how to perform four variations of an inner join:

- A simple inner join that correlates elements from two data sources based on a simple key.
- An inner join that correlates elements from two data sources based on a *composite* key. A composite key, which is a key that consists of more than one value, enables you to correlate elements based on more than one property.
- A *multiple join* in which you append successive join operations to each other.
- An inner join that uses a group join.

### Single key join

The following example matches `Teacher` objects with `Department` objects whose `TeacherId` matches that `Teacher`. The `select` clause in C# defines how the resulting objects look. In the following example, the resulting objects are anonymous types that consist of the department name and the name of the teacher that leads the department.

[language="csharp" source="./snippets/standard-query-operators/InnerJoins.cs" id="SimpleInnerJoinQuery"::: (complete source file; reference: ./snippets/standard-query-operators/InnerJoins.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/InnerJoins.cs.md)

You achieve the same results by using the [System.Linq.Enumerable.Join*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Join*) method syntax:

[language="csharp" source="./snippets/standard-query-operators/InnerJoins.cs" id="SimpleInnerJoinMethod"::: (complete source file; reference: ./snippets/standard-query-operators/InnerJoins.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/InnerJoins.cs.md)

Teachers who aren't department heads don't appear in the final results.

### Composite key join

Instead of correlating elements based on just one property, use a composite key to compare elements based on multiple properties. Specify the key selector function for each collection to return an anonymous type that consists of the properties you want to compare. If you label the properties, they must have the same label in each key's anonymous type. The properties must also appear in the same order.

The following example uses a list of `Teacher` objects and a list of `Student` objects to determine which teachers are also students. Both of these types have properties that represent the first and family name of each person. The functions that create the join keys from each list's elements return an anonymous type that consists of the properties. The join operation compares these composite keys for equality and returns pairs of objects from each list where both the first name and the family name match.

[language="csharp" source="./snippets/standard-query-operators/InnerJoins.cs" id="CompositeKeyQuery"::: (complete source file; reference: ./snippets/standard-query-operators/InnerJoins.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/InnerJoins.cs.md)

You can use the [System.Linq.Enumerable.Join*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Join*) method, as shown in the following example:

[language="csharp" source="./snippets/standard-query-operators/InnerJoins.cs" id="CompositeKeyMethod"::: (complete source file; reference: ./snippets/standard-query-operators/InnerJoins.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/InnerJoins.cs.md)

### Multiple join

You can append any number of join operations to perform a multiple join. Each `join` clause in C# correlates a specified data source with the results of the previous join.

The first `join` clause matches students and departments based on a `Student` object's `DepartmentID` matching a `Department` object's `ID`. It returns a sequence of anonymous types that contain the `Student` object and `Department` object.

The second `join` clause correlates the anonymous types returned by the first join with `Teacher` objects based on that teacher's ID matching the department head ID. It returns a sequence of anonymous types that contain the student's name, the department name, and the department leader's name. Because this operation is an inner join, the query returns only those objects from the first data source that have a match in the second data source.

[language="csharp" source="./snippets/standard-query-operators/InnerJoins.cs" id="MultipleJoinQuery"::: (complete source file; reference: ./snippets/standard-query-operators/InnerJoins.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/InnerJoins.cs.md)

The equivalent query that uses multiple [System.Linq.Enumerable.Join*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Join*) methods uses the same approach with the anonymous type:

[language="csharp" source="./snippets/standard-query-operators/InnerJoins.cs" id="MultipleJoinMethod"::: (complete source file; reference: ./snippets/standard-query-operators/InnerJoins.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/InnerJoins.cs.md)

### Inner join by using grouped join

The following example shows how to implement an inner join by using a group join. The list of `Department` objects is group-joined to the list of `Student` objects based on the `Department.ID` matching the `Student.DepartmentID` property. The group join creates a collection of intermediate groups, where each group consists of a `Department` object and a sequence of matching `Student` objects. The second `from` clause combines (or flattens) this sequence of sequences into one longer sequence. The `select` clause specifies the type of elements in the final sequence. That type is an anonymous type that consists of the student's name and the matching department name.

[language="csharp" source="./snippets/standard-query-operators/InnerJoins.cs" id="InnerGroupJoinQuery"::: (complete source file; reference: ./snippets/standard-query-operators/InnerJoins.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/InnerJoins.cs.md)

You can achieve the same results by using the [System.Linq.Enumerable.GroupJoin*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupJoin*) method, as shown in the following example:

[language="csharp" source="./snippets/standard-query-operators/InnerJoins.cs" id="InnerGroupJoinMethod"::: (complete source file; reference: ./snippets/standard-query-operators/InnerJoins.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/InnerJoins.cs.md)

The result is equivalent to the result set obtained by using the `join` clause without the `into` clause to perform an inner join. The following code demonstrates this equivalent query:

[language="csharp" source="./snippets/standard-query-operators/InnerJoins.cs" id="InnerJoinQuery"::: (complete source file; reference: ./snippets/standard-query-operators/InnerJoins.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/InnerJoins.cs.md)

To avoid chaining, use the single [System.Linq.Enumerable.Join*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Join*) method as presented here:

[language="csharp" source="./snippets/standard-query-operators/InnerJoins.cs" id="InnerJoinMethod"::: (complete source file; reference: ./snippets/standard-query-operators/InnerJoins.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/InnerJoins.cs.md)

## Perform grouped joins

The group join is useful for producing hierarchical data structures. It pairs each element from the first collection with a set of correlated elements from the second collection.

> **Note:**
> Each element of the first collection appears in the result set of a group join regardless of whether correlated elements are found in the second collection. If no correlated elements are found, the sequence of correlated elements for that element is empty. The result selector therefore has access to every element of the first collection. This behavior differs from the result selector in a non-group join, which can't access elements from the first collection that have no match in the second collection.

> **Warning:**
> [System.Linq.Enumerable.GroupJoin*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupJoin*) has no direct equivalent in traditional relational database terms. However, this method does implement a superset of inner joins and left outer joins. Both of these operations can be written in terms of a grouped join. For more information, see [Entity Framework Core, GroupJoin](https://learn.microsoft.com/ef/core/querying/complex-query-operators#groupjoin).

The first example in this article shows how to perform a group join. The second example shows how to use a group join to create XML elements.

### Group join

The following example performs a group join of objects of type `Department` and `Student` based on the `Department.ID` matching the `Student.DepartmentID` property. Unlike a non-group join, which produces a pair of elements for each match, the group join produces only one resulting object for each element of the first collection. In this example, the first collection is a `Department` object. The corresponding elements from the second collection, which in this example are `Student` objects, are grouped into a collection. Finally, the result selector function creates an anonymous type for each match that consists of `Department.Name` and a collection of `Student` objects.

[language="csharp" source="./snippets/standard-query-operators/GroupJoins.cs" id="GroupJoinQuery"::: (complete source file; reference: ./snippets/standard-query-operators/GroupJoins.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/GroupJoins.cs.md)

In the preceding example, the `query` variable contains the query that creates a list where each element is an anonymous type that contains the department's name and a collection of students that study in that department.

The equivalent query using method syntax is shown in the following code:

[language="csharp" source="./snippets/standard-query-operators/GroupJoins.cs" id="GroupJoinMethod"::: (complete source file; reference: ./snippets/standard-query-operators/GroupJoins.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/GroupJoins.cs.md)

### Group join to create XML

Group joins are ideal for creating XML by using LINQ to XML. The following example is similar to the previous example except that instead of creating anonymous types, the result selector function creates XML elements that represent the joined objects.

[language="csharp" source="./snippets/standard-query-operators/GroupJoins.cs" id="GroupJoinToXmlQuery"::: (complete source file; reference: ./snippets/standard-query-operators/GroupJoins.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/GroupJoins.cs.md)

The equivalent query using method syntax is shown in the following code:

[language="csharp" source="./snippets/standard-query-operators/GroupJoins.cs" id="GroupJoinToXmlMethod"::: (complete source file; reference: ./snippets/standard-query-operators/GroupJoins.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/GroupJoins.cs.md)

## Perform outer joins

.NET 10 includes [`LeftJoin`](https://learn.microsoft.com/dotnet/api/?term=LeftJoin) and [`RightJoin`](https://learn.microsoft.com/dotnet/api/?term=RightJoin) methods in the [System.Linq.Enumerable](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable) and [System.Linq.Queryable](https://learn.microsoft.com/search/?terms=System.Linq.Queryable) classes. These methods perform an *outer left equijoin*, and an *outer right equijoin*, respectively. An outer left equijoin is a join where every member of the first sequence is included in the output sequence, even if the second sequence doesn't include a match. An outer right equijoin is a join where every member of the second sequence is included in the output sequence, even if the first sequence doesn't include a match.

## Emulate a left outer join

Before .NET 10, use LINQ to perform a left outer join by calling the [System.Linq.Enumerable.DefaultIfEmpty*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.DefaultIfEmpty*) method on the results of a group join.

The following example demonstrates how to use the [System.Linq.Enumerable.DefaultIfEmpty*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.DefaultIfEmpty*) method on the results of a group join to perform a left outer join.

The first step in producing a left outer join of two collections is to perform an inner join by using a group join. (See [Perform inner joins](#perform-inner-joins) for an explanation of this process.) In this example, the list of `Department` objects is inner-joined to the list of `Student` objects based on a `Department` object's ID that matches the student's `DepartmentID`.

The second step is to include each element of the first (left) collection in the result set even if that element has no matches in the right collection. You accomplish this step by calling [System.Linq.Enumerable.DefaultIfEmpty*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.DefaultIfEmpty*) on each sequence of matching elements from the group join. In this example, you call [System.Linq.Enumerable.DefaultIfEmpty*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.DefaultIfEmpty*) on each sequence of matching `Student` objects. The method returns a collection that contains a single, default value if the sequence of matching `Student` objects is empty for any `Department` object, ensuring that each `Department` object is represented in the result collection.

> **Note:**
> The default value for a reference type is `null`; therefore, the example checks for a null reference before accessing each element of each `Student` collection.

[source="./snippets/standard-query-operators/LeftOuterJoins.cs" id="LeftOuterJoinQuery"::: (complete source file; reference: ./snippets/standard-query-operators/LeftOuterJoins.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/LeftOuterJoins.cs.md)

The equivalent query using method syntax is shown in the following code:

[source="./snippets/standard-query-operators/LeftOuterJoins.cs" id="LeftOuterJoinMethod"::: (complete source file; reference: ./snippets/standard-query-operators/LeftOuterJoins.cs)](../../../../_code/docs/csharp/linq/standard-query-operators/snippets/standard-query-operators/LeftOuterJoins.cs.md)

## See also

- [System.Linq.Enumerable.Join*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Join*)
- [System.Linq.Enumerable.GroupJoin*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupJoin*)
- [Anonymous types](../../programming-guide/classes-and-structs/anonymous-types.md)
- [Formulate Joins and Cross-Product Queries](../../../framework/data/adonet/sql/linq/formulate-joins-and-cross-product-queries.md)
- [join clause](../../language-reference/keywords/join-clause.md)
- [group clause](../../language-reference/keywords/group-clause.md)
- [How to join content from dissimilar files (LINQ) (C#)](../how-to-query-files-and-directories.md)
- [How to populate object collections from multiple sources (LINQ) (C#)](../how-to-query-collections.md)
