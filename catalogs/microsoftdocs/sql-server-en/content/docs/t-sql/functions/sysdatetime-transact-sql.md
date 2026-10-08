---
title: SYSDATETIME (Transact-SQL)
description: SYSDATETIME returns a datetime2(7) value that contains the date and time of the computer running the Database Engine.
author: rwestMSFT
ms.author: randolphwest
ms.date: 09/20/2026
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "SYSDATETIME_TSQL"
  - "SYSDATETIME"
helpviewer_keywords:
  - "dates [SQL Server], functions"
  - "date and time [SQL Server], SYSDATETIME"
  - "current date and time [SQL Server]"
  - "functions [SQL Server], time"
  - "system date and time [SQL Server]"
  - "system time [SQL Server]"
  - "SYSDATETIME function [SQL Server]"
  - "functions [SQL Server], date and time"
  - "time [SQL Server], functions"
  - "dates [SQL Server], current date and time"
  - "dates [SQL Server], system date and time"
  - "time [SQL Server], system"
dev_langs:
  - TSQL
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# SYSDATETIME (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



The `SYSDATETIME` Transact-SQL (T-SQL) function returns a **datetime2(7)** value that contains the date and time of the computer on which the instance of  SQL Server 
 is running.

> **Note:**  
> `SYSDATETIME` and `SYSUTCDATETIME` have more fractional seconds precision than `GETDATE` and `GETUTCDATE`. `SYSDATETIMEOFFSET` includes the system time zone offset. `SYSDATETIME`, `SYSUTCDATETIME`, and `SYSDATETIMEOFFSET` can be assigned to a variable of any of the date and time types.

Azure Synapse Analytics follows UTC. Use [AT TIME ZONE](../queries/at-time-zone-transact-sql.md) in Azure Synapse Analytics if you need to interpret date and time information in a non-UTC time zone.

> **Note:**  
>  Azure SQL Database 
 and SQL database in Microsoft Fabric
 support changing the default time zone from universal coordinated time (UTC). If you modify the time zone at the [database](../statements/alter-database-scoped-configuration-transact-sql.md#local-time-zone) or [session](../statements/set-time-zone-transact-sql.md) level, this function returns local time based on the configured time zone value. For more information, see [ALTER DATABASE SCOPED CONFIGURATION](../statements/alter-database-scoped-configuration-transact-sql.md) and [SET TIME ZONE](../statements/set-time-zone-transact-sql.md).


See [Date and time data types and functions](date-and-time-data-types-and-functions-transact-sql.md) for an overview of all the  Transact-SQL  date and time data types and functions.



## Syntax

```syntaxsql
SYSDATETIME ( )
```

## Return types

**datetime2(7)**

## Remarks

 Transact-SQL  statements can refer to `SYSDATETIME` anywhere they can refer to a **datetime2(7)** expression.

`SYSDATETIME` is a nondeterministic function. You can't index views and expressions that reference this function in a column.

> **Note:**  
>  SQL Server 
 gets the date and time values by using the GetSystemTimeAsFileTime() Windows API. The accuracy depends on the computer hardware and version of Windows on which the instance of  SQL Server 
 is running. The precision of this API is fixed at 100 nanoseconds. You can use the GetSystemTimeAdjustment() Windows API to determine the accuracy.

## Examples

The following examples use the six  SQL Server 
 system functions that return current date and time to return the date, time, or both. The values are returned in series; therefore, their fractional seconds might be different.

In these examples, assume that the current date is April 30, 2026.

### A. Get the current system date and time

```sql
SELECT SYSDATETIME(),
       SYSDATETIMEOFFSET(),
       SYSUTCDATETIME(),
       CURRENT_TIMESTAMP,
       GETDATE(),
       GETUTCDATE(),
       CURRENT_DATE;
```

 Here's the result set. 


```output
SYSDATETIME()        2026-09-01 16:15:37.7418724
SYSDATETIMEOFFSET()  2026-09-01 16:15:37.7418724 -06:00
SYSUTCDATETIME()     2026-09-01 22:15:37.7418724
CURRENT_TIMESTAMP    2026-09-01 16:15:37.740
GETDATE()            2026-09-01 16:15:37.740
GETUTCDATE()         2026-09-01 22:15:37.740
CURRENT_DATE         2026-09-01
```

### B. Get the current system date

The following example shows you how to convert date and time values to the **date** data type.

```sql
SELECT CONVERT (DATE, SYSDATETIME()),
       CONVERT (DATE, SYSDATETIMEOFFSET()),
       CONVERT (DATE, SYSUTCDATETIME()),
       CONVERT (DATE, CURRENT_TIMESTAMP),
       CONVERT (DATE, GETDATE()),
       CONVERT (DATE, GETUTCDATE()),
       CURRENT_DATE;
```

 Here's the result set. 


```output
SYSDATETIME()        2026-09-01
SYSDATETIMEOFFSET()  2026-09-01
SYSUTCDATETIME()     2026-09-01
CURRENT_TIMESTAMP    2026-09-01
GETDATE()            2026-09-01
GETUTCDATE()         2026-09-01
CURRENT_DATE         2026-09-01
```

### C. Get the current system time

```sql
SELECT CONVERT (TIME, SYSDATETIME()),
       CONVERT (TIME, SYSDATETIMEOFFSET()),
       CONVERT (TIME, SYSUTCDATETIME()),
       CONVERT (TIME, CURRENT_TIMESTAMP),
       CONVERT (TIME, GETDATE()),
       CONVERT (TIME, GETUTCDATE());
```

 Here's the result set. 


```output
SYSDATETIME()        16:15:37.7418724
SYSDATETIMEOFFSET()  16:15:37.7418724
SYSUTCDATETIME()     22:15:37.7418724
CURRENT_TIMESTAMP    16:15:37.740
GETDATE()            16:15:37.740
GETUTCDATE()         22:15:37.740
```

## Examples: Azure Synapse Analytics

### D. Get the current system date and time

```sql
SELECT SYSDATETIME();
```

 Here's the result set. 


```output
--------------------------
4/30/2026 1:10:02 PM
```

## Related content

- [CAST and CONVERT (Transact-SQL)](cast-and-convert-transact-sql.md)
- [Date and time data types and functions (Transact-SQL)](date-and-time-data-types-and-functions-transact-sql.md)
