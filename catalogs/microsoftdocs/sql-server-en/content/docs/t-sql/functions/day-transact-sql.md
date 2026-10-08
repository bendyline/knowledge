---
title: "DAY (Transact-SQL)"
description: "DAY (Transact-SQL)"
author: markingmyname
ms.author: maghan
ms.date: "07/30/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "DAY_TSQL"
  - "DAY"
helpviewer_keywords:
  - "date and time [SQL Server], DAY"
  - "dates [SQL Server], functions"
  - "DAY function [SQL Server]"
  - "dates [SQL Server], days"
  - "functions [SQL Server], date and time"
  - "dateparts [SQL Server], day"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# DAY (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



This function returns an integer that represents the day (day of the month) of the specified *date*.
  
See [Date and Time Data Types and Functions (Transact-SQL)](date-and-time-data-types-and-functions-transact-sql.md) for an overview of all  Transact-SQL  date and time data types and functions.
  

  
## Syntax  
  
```syntaxsql
DAY ( date )  
```  
  
## Arguments
*date*  
An expression that resolves to one of the following data types:

+ **date**
+ **datetime**
+ **datetimeoffset**
+ **datetime2** 
+ **smalldatetime**
+ **time**

For *date*, `DAY` will accept a column expression, expression, string literal, or user-defined variable.
  
## Return Type  
**int**
  
## Return Value  
DAY returns the same value as [DATEPART](datepart-transact-sql.md) (**day**, *date*).
  
If *date* contains only a time part, `DAY` will return 1 - the base day.
  
## Examples  
This statement returns `30` - the number of the day itself.
  
```sql
SELECT DAY('2015-04-30 01:01:01.1234567');  
```  
  
This statement returns `1900, 1, 1`. The *date* argument has a number value of `0`.  SQL Server 
 interprets `0` as January 1, 1900.
  
```sql
SELECT YEAR(0), MONTH(0), DAY(0);  
```  
  
## Related content

- [CAST and CONVERT (Transact-SQL)](cast-and-convert-transact-sql.md)
