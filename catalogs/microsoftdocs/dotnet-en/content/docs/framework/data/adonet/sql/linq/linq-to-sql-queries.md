---
description: "Learn more about: LINQ to SQL Queries"
title: "LINQ to SQL Queries"
ms.date: "03/30/2017"
ms.assetid: f4897aaa-7f44-4c20-a471-b948c2971aae
---
# LINQ to SQL Queries

You define LINQ to SQL
 queries by using the same syntax as you would in LINQ. The only difference is that the objects referenced in your queries are mapped to elements in a database. For more information, see [Introduction to LINQ Queries (C#)](../../../../../csharp/linq/get-started/introduction-to-linq-queries.md).

 LINQ to SQL
 translates the queries you write into equivalent SQL queries and sends them to the server for processing. More specifically, your application uses the LINQ to SQL
 API to request query execution. The LINQ to SQL
 provider then transforms the query into SQL text and delegates execution to the ADO provider. The ADO provider returns query results as a `DataReader`. The LINQ to SQL
 provider translates the ADO results to an [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable) collection of user objects.

> **Note:**
> Most methods and operators on .NET Framework built-in types have direct translations to SQL. Those that LINQ cannot translate generate runtime exceptions. For more information, see [SQL-CLR Type Mapping](sql-clr-type-mapping.md).

 The following table shows the similarities and differences between LINQ and LINQ to SQL
 query items.

|Item|LINQ Query|LINQ to SQL
 Query|
|----------|----------------|----------------------------------------------------------------------|
|Return type of the local variable that holds the query (for queries that return sequences)|Generic `IEnumerable`|Generic `IQueryable`|
|Specifying the data source|Uses the `From` (Visual Basic) or `from` (C#) clause|Same|
|Filtering|Uses the `Where`/`where` clause|Same|
|Grouping|Uses the `Group…By`/`groupby` clause|Same|
|Selecting (Projecting)|Uses the `Select`/`select` clause|Same|
|Deferred versus immediate execution|See [Introduction to LINQ Queries (C#)](../../../../../csharp/linq/get-started/introduction-to-linq-queries.md)|Same|
|Implementing joins|Uses the `Join`/`join` clause|Can use the `Join`/`join` clause, but more effectively uses the [System.Data.Linq.Mapping.AssociationAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.AssociationAttribute) attribute. For more information, see [Querying Across Relationships](querying-across-relationships.md).|
|Remote versus local execution||For more information, see [Remote vs. Local Execution](remote-vs-local-execution.md).|
|Streaming versus cached querying|Not applicable in a local memory scenario||

## See also

- [Introduction to LINQ Queries (C#)](../../../../../csharp/linq/get-started/introduction-to-linq-queries.md)
- [Basic LINQ Query Operations](../../../../../csharp/linq/standard-query-operators/index.md)
- [Type Relationships in LINQ Query Operations](../../../../../csharp/linq/get-started/type-relationships-in-linq-query-operations.md)
- [Query Concepts](query-concepts.md)
