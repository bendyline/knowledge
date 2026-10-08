---
description: "Learn more about: System.DateTimeOffset Methods"
title: "System.DateTimeOffset Methods"
ms.date: "03/30/2017"
ms.assetid: 25b3e5c0-7603-4a70-b3e5-2149e3da69a2
---
# System.DateTimeOffset Methods

Once mapped in the object model or external mapping file, LINQ to SQL allows you to call most of the [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) methods, operators, and properties from within your LINQ to SQL queries.

 The only methods not supported are those inherited from [System.Object](https://learn.microsoft.com/search/?terms=System.Object) that do not make sense in the context of LINQ to SQL queries, such as: `Finalize`, `GetHashCode`, `GetType`, and `MemberwiseClone`. These methods are not supported because LINQ to SQL cannot translate them for execution on the SQL Server.

> **Note:**
> The common language runtime (CLR) [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) structure, and the ability to map it to a SQL `DATETIMEOFFSET` column with LINQ to SQL, requires the .NET Framework 3.5 SP1 or beyond. The SQL `DATETIMEOFFSET` column is only available in Microsoft SQL Server 2008 and beyond.

## SQLMethods Date and Time Methods

 In addition to the methods offered by the [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) structure, LINQ to SQL offers the following methods from the [System.Data.Linq.SqlClient.SqlMethods](https://learn.microsoft.com/search/?terms=System.Data.Linq.SqlClient.SqlMethods) class for working with date and time:

- [System.Data.Linq.SqlClient.SqlMethods.DateDiffDay*](https://learn.microsoft.com/search/?terms=System.Data.Linq.SqlClient.SqlMethods.DateDiffDay*)
- [System.Data.Linq.SqlClient.SqlMethods.DateDiffMillisecond*](https://learn.microsoft.com/search/?terms=System.Data.Linq.SqlClient.SqlMethods.DateDiffMillisecond*)
- [System.Data.Linq.SqlClient.SqlMethods.DateDiffNanosecond*](https://learn.microsoft.com/search/?terms=System.Data.Linq.SqlClient.SqlMethods.DateDiffNanosecond*)
- [System.Data.Linq.SqlClient.SqlMethods.DateDiffHour*](https://learn.microsoft.com/search/?terms=System.Data.Linq.SqlClient.SqlMethods.DateDiffHour*)
- [System.Data.Linq.SqlClient.SqlMethods.DateDiffMinute*](https://learn.microsoft.com/search/?terms=System.Data.Linq.SqlClient.SqlMethods.DateDiffMinute*)
- [System.Data.Linq.SqlClient.SqlMethods.DateDiffSecond*](https://learn.microsoft.com/search/?terms=System.Data.Linq.SqlClient.SqlMethods.DateDiffSecond*)
- [System.Data.Linq.SqlClient.SqlMethods.DateDiffMicrosecond*](https://learn.microsoft.com/search/?terms=System.Data.Linq.SqlClient.SqlMethods.DateDiffMicrosecond*)
- [System.Data.Linq.SqlClient.SqlMethods.DateDiffMonth*](https://learn.microsoft.com/search/?terms=System.Data.Linq.SqlClient.SqlMethods.DateDiffMonth*)
- [System.Data.Linq.SqlClient.SqlMethods.DateDiffYear*](https://learn.microsoft.com/search/?terms=System.Data.Linq.SqlClient.SqlMethods.DateDiffYear*)

## See also

- [Query Concepts](query-concepts.md)
- [Creating the Object Model](creating-the-object-model.md)
- [SQL-CLR Type Mapping](sql-clr-type-mapping.md)
