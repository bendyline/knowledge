---
description: "Learn more about: System.DateTime Methods"
title: "System.DateTime Methods"
ms.date: "03/30/2017"
ms.assetid: 4f80700c-e83f-4ab6-af0f-1c9a606e1133
---
# System.DateTime Methods

The following LINQ to SQL-supported methods, operators, and properties are available to use in LINQ to SQL queries. When a method, operator or property is unsupported, LINQ to SQL cannot translate the member for execution on the SQL Server. You may use these members in your code, however, they must be evaluated before the query is translated to Transact-SQL or after the results have been retrieved from the database.

## Supported System.DateTime Members

 Once mapped in the object model or external mapping file, LINQ to SQL allows you to call the following [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) members inside LINQ to SQL queries.

| Supported [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) Methods | Supported [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) Operators | Supported [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) Properties |
| --- | --- | --- |
| [System.DateTime.Add*](https://learn.microsoft.com/search/?terms=System.DateTime.Add*) | [System.DateTime.op_Addition*](https://learn.microsoft.com/search/?terms=System.DateTime.op_Addition*) | [System.DateTime.Date*](https://learn.microsoft.com/search/?terms=System.DateTime.Date*) |
| [System.DateTime.AddDays*](https://learn.microsoft.com/search/?terms=System.DateTime.AddDays*) | [System.DateTime.op_Equality*](https://learn.microsoft.com/search/?terms=System.DateTime.op_Equality*) | [System.DateTime.Day*](https://learn.microsoft.com/search/?terms=System.DateTime.Day*) |
| [System.DateTime.AddHours*](https://learn.microsoft.com/search/?terms=System.DateTime.AddHours*) | [System.DateTime.op_GreaterThan*](https://learn.microsoft.com/search/?terms=System.DateTime.op_GreaterThan*) | [System.DateTime.DayOfWeek*](https://learn.microsoft.com/search/?terms=System.DateTime.DayOfWeek*) |
| [System.DateTime.AddMilliseconds*](https://learn.microsoft.com/search/?terms=System.DateTime.AddMilliseconds*) | [System.DateTime.op_GreaterThanOrEqual*](https://learn.microsoft.com/search/?terms=System.DateTime.op_GreaterThanOrEqual*) | [System.DateTime.DayOfYear*](https://learn.microsoft.com/search/?terms=System.DateTime.DayOfYear*) |
| [System.DateTime.AddMinutes*](https://learn.microsoft.com/search/?terms=System.DateTime.AddMinutes*) | [System.DateTime.op_Inequality*](https://learn.microsoft.com/search/?terms=System.DateTime.op_Inequality*) | [System.DateTime.Hour*](https://learn.microsoft.com/search/?terms=System.DateTime.Hour*) |
| [System.DateTime.AddMonths*](https://learn.microsoft.com/search/?terms=System.DateTime.AddMonths*) | [System.DateTime.op_LessThan*](https://learn.microsoft.com/search/?terms=System.DateTime.op_LessThan*) | [System.DateTime.Millisecond*](https://learn.microsoft.com/search/?terms=System.DateTime.Millisecond*) |
| [System.DateTime.AddSeconds*](https://learn.microsoft.com/search/?terms=System.DateTime.AddSeconds*) | [System.DateTime.op_LessThanOrEqual*](https://learn.microsoft.com/search/?terms=System.DateTime.op_LessThanOrEqual*) | [System.DateTime.Minute*](https://learn.microsoft.com/search/?terms=System.DateTime.Minute*) |
| [System.DateTime.AddTicks*](https://learn.microsoft.com/search/?terms=System.DateTime.AddTicks*) | [System.DateTime.op_Subtraction*](https://learn.microsoft.com/search/?terms=System.DateTime.op_Subtraction*) | [System.DateTime.Month*](https://learn.microsoft.com/search/?terms=System.DateTime.Month*) |
| [System.DateTime.AddYears*](https://learn.microsoft.com/search/?terms=System.DateTime.AddYears*) |  | [System.DateTime.Now*](https://learn.microsoft.com/search/?terms=System.DateTime.Now*) |
| [System.DateTime.Compare*](https://learn.microsoft.com/search/?terms=System.DateTime.Compare*) |  | [System.DateTime.Second*](https://learn.microsoft.com/search/?terms=System.DateTime.Second*) |
| [System.DateTime.CompareTo%28System.DateTime%29](https://learn.microsoft.com/search/?terms=System.DateTime.CompareTo%2528System.DateTime%2529) |  | [System.DateTime.TimeOfDay*](https://learn.microsoft.com/search/?terms=System.DateTime.TimeOfDay*) |
| [System.DateTime.Equals%28System.DateTime%29](https://learn.microsoft.com/search/?terms=System.DateTime.Equals%2528System.DateTime%2529) |  | [System.DateTime.Today](https://learn.microsoft.com/search/?terms=System.DateTime.Today) |
|  |  | [System.DateTime.Year*](https://learn.microsoft.com/search/?terms=System.DateTime.Year*) |

## Members Not Supported by LINQ to SQL

 The following members are not supported inside LINQ to SQL queries:

- [System.DateTime.IsDaylightSavingTime*](https://learn.microsoft.com/search/?terms=System.DateTime.IsDaylightSavingTime*)
- [System.DateTime.IsLeapYear*](https://learn.microsoft.com/search/?terms=System.DateTime.IsLeapYear*)
- [System.DateTime.DaysInMonth*](https://learn.microsoft.com/search/?terms=System.DateTime.DaysInMonth*)
- [System.DateTime.ToBinary*](https://learn.microsoft.com/search/?terms=System.DateTime.ToBinary*)
- [System.DateTime.ToFileTime*](https://learn.microsoft.com/search/?terms=System.DateTime.ToFileTime*)
- [System.DateTime.ToFileTimeUtc*](https://learn.microsoft.com/search/?terms=System.DateTime.ToFileTimeUtc*)
- [System.DateTime.ToLongDateString*](https://learn.microsoft.com/search/?terms=System.DateTime.ToLongDateString*)
- [System.DateTime.ToLongTimeString*](https://learn.microsoft.com/search/?terms=System.DateTime.ToLongTimeString*)
- [System.DateTime.ToOADate*](https://learn.microsoft.com/search/?terms=System.DateTime.ToOADate*)
- [System.DateTime.ToShortDateString*](https://learn.microsoft.com/search/?terms=System.DateTime.ToShortDateString*)
- [System.DateTime.ToShortTimeString*](https://learn.microsoft.com/search/?terms=System.DateTime.ToShortTimeString*)
- [System.DateTime.ToUniversalTime*](https://learn.microsoft.com/search/?terms=System.DateTime.ToUniversalTime*)
- [System.DateTime.FromBinary*](https://learn.microsoft.com/search/?terms=System.DateTime.FromBinary*)
- [System.DateTime.UtcNow*](https://learn.microsoft.com/search/?terms=System.DateTime.UtcNow*)
- [System.DateTime.FromFileTime*](https://learn.microsoft.com/search/?terms=System.DateTime.FromFileTime*)
- [System.DateTime.FromFileTimeUtc*](https://learn.microsoft.com/search/?terms=System.DateTime.FromFileTimeUtc*)
- [System.DateTime.FromOADate*](https://learn.microsoft.com/search/?terms=System.DateTime.FromOADate*)
- [System.DateTime.GetDateTimeFormats*](https://learn.microsoft.com/search/?terms=System.DateTime.GetDateTimeFormats*)

## Method Translation Example

 All methods supported by LINQ to SQL are translated to Transact-SQL before they are sent to   SQL Server. For example, consider the following pattern.

 `(dateTime1 - dateTime2).{Days, Hours, Milliseconds, Minutes, Months, Seconds, Years}`

 When it is recognized, it is translated into a direct call to the SQL Server `DATEDIFF` function, as follows:

 `DATEDIFF({DatePart}, @dateTime1, @dateTime2)`

## SQLMethods Date and Time Methods

 In addition to the methods offered by the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) structure, LINQ to SQL offers the following methods from the [System.Data.Linq.SqlClient.SqlMethods](https://learn.microsoft.com/search/?terms=System.Data.Linq.SqlClient.SqlMethods) class for working with date and time:

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
- [Data Types and Functions](data-types-and-functions.md)
