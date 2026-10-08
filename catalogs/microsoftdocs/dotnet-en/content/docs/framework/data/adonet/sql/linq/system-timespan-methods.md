---
description: "Learn more about: System.TimeSpan Methods"
title: "System.TimeSpan Methods"
ms.date: "03/30/2017"
ms.assetid: 9333fee8-1454-4374-855b-8c14c002f48f
---
# System.TimeSpan Methods

Member support for [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) greatly depends on the versions of the .NET Framework and Microsoft SQL Server that you are using.

 When a method, operator, or property is unsupported; it means that LINQ to SQL cannot translate the member for execution on the SQL Server. You may still be able to use these members in your code. However, they must be evaluated before the query is translated to Transact-SQL or after the results have been retrieved from the database.

## Previous Limitations

 When using LINQ to SQL with versions of the .NET Framework prior to .NET Framework 3.5 SP1, you cannot map SQL Server database fields to [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan). However, operations on [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) are supported because [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) values can be returned from [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) subtraction or introduced into an expression as a literal or bound variable.

## Supported System.TimeSpan member support

 The following LINQ to SQL-supported methods, operators, and properties are available for you to use in your LINQ to SQL queries. Once mapped in the object model or external mapping file, LINQ to SQL allows you to call many of the [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) members inside your LINQ to SQL queries.

| Supported [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) Methods | Supported [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) Operators | Supported [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) Properties |
| --- | --- | --- |
| [System.TimeSpan.Compare*](https://learn.microsoft.com/search/?terms=System.TimeSpan.Compare*) | [System.TimeSpan.op_Equality*](https://learn.microsoft.com/search/?terms=System.TimeSpan.op_Equality*) | [System.TimeSpan.Days*](https://learn.microsoft.com/search/?terms=System.TimeSpan.Days*) |
| [System.TimeSpan.CompareTo%28System.TimeSpan%29](https://learn.microsoft.com/search/?terms=System.TimeSpan.CompareTo%2528System.TimeSpan%2529) | [System.TimeSpan.op_GreaterThan*](https://learn.microsoft.com/search/?terms=System.TimeSpan.op_GreaterThan*) | [System.TimeSpan.Hours*](https://learn.microsoft.com/search/?terms=System.TimeSpan.Hours*) |
| [System.TimeSpan.Duration*](https://learn.microsoft.com/search/?terms=System.TimeSpan.Duration*) | [System.TimeSpan.op_GreaterThanOrEqual*](https://learn.microsoft.com/search/?terms=System.TimeSpan.op_GreaterThanOrEqual*) | [System.TimeSpan.MaxValue](https://learn.microsoft.com/search/?terms=System.TimeSpan.MaxValue) |
| [System.TimeSpan.Equals%28System.TimeSpan%2CSystem.TimeSpan%29](https://learn.microsoft.com/search/?terms=System.TimeSpan.Equals%2528System.TimeSpan%252CSystem.TimeSpan%2529) | [System.TimeSpan.op_Inequality*](https://learn.microsoft.com/search/?terms=System.TimeSpan.op_Inequality*) | [System.TimeSpan.Milliseconds*](https://learn.microsoft.com/search/?terms=System.TimeSpan.Milliseconds*) |
| [System.TimeSpan.Equals%28System.TimeSpan%29](https://learn.microsoft.com/search/?terms=System.TimeSpan.Equals%2528System.TimeSpan%2529) | [System.TimeSpan.op_LessThan*](https://learn.microsoft.com/search/?terms=System.TimeSpan.op_LessThan*) | [System.TimeSpan.Minutes*](https://learn.microsoft.com/search/?terms=System.TimeSpan.Minutes*) |
|  | [System.TimeSpan.op_LessThanOrEqual*](https://learn.microsoft.com/search/?terms=System.TimeSpan.op_LessThanOrEqual*) | [System.TimeSpan.MinValue](https://learn.microsoft.com/search/?terms=System.TimeSpan.MinValue) |

> **Note:**
> The ability to map [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) to a SQL `TIME` column with LINQ to SQL requires the .NET Framework 3.5 SP1 and beyond. The SQL `TIME` data type is only available in Microsoft SQL Server 2008 and beyond.

### Addition and Subtraction

 Although the CLR [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) type does support addition and subtraction, the SQL `TIME` type does not. Because of this, your LINQ to SQL queries will generate errors if they attempt addition and subtraction when they are mapped to the SQL `TIME` type. You can find other considerations for working with SQL date and time types in [SQL-CLR Type Mapping](sql-clr-type-mapping.md).

## See also

- [Query Concepts](query-concepts.md)
- [Creating the Object Model](creating-the-object-model.md)
- [SQL-CLR Type Mapping](sql-clr-type-mapping.md)
- [Data Types and Functions](data-types-and-functions.md)
