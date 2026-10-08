---
title: CURRENT_TIMEZONE_ID (Transact-SQL)
description: CURRENT_TIMEZONE_ID returns the ID of the time zone that a server or instance observes.
author: MladjoA
ms.author: mlandzic
ms.reviewer: randolphwest
ms.date: 09/20/2026
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "CURRENT_TIMEZONE)ID"
  - "CURRENT_TIMEZONE_ID_TSQL"
helpviewer_keywords:
  - "current time zone id [SQL Server]"
  - "current timezoneid [SQL Server]"
  - "system time zone id [SQL Server]"
  - "system timezone id [SQL Server]"
  - "functions [SQL Server], time zone id"
  - "functions [SQL Server], timezoneid"
  - "timezoneid [SQL Server], functions"
  - "time zone id [SQL Server], functions"
  - "CURRENT_TIMEZONE_ID function [SQL Server]"
dev_langs:
  - TSQL
---
# CURRENT_TIMEZONE_ID (Transact-SQL)


**Applies to:**
 


 and later versions 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


The `CURRENT_TIMEZONE_ID` Transact-SQL (T-SQL) function returns the ID of the time zone that a server or instance observes. For Azure SQL Managed Instance, the return value is based on the time zone of the instance itself assigned during instance creation, not the time zone of the underlying operating system.

> **Note:**  
>  Azure SQL Database 
 and SQL database in Microsoft Fabric
 support changing the default time zone from universal coordinated time (UTC). If you modify the time zone at the [database](../statements/alter-database-scoped-configuration-transact-sql.md#local-time-zone) or [session](../statements/set-time-zone-transact-sql.md) level, this function returns local time based on the configured time zone value. For more information, see [ALTER DATABASE SCOPED CONFIGURATION](../statements/alter-database-scoped-configuration-transact-sql.md) and [SET TIME ZONE](../statements/set-time-zone-transact-sql.md).


See [Date and time data types and functions](date-and-time-data-types-and-functions-transact-sql.md) for an overview of all the  Transact-SQL  date and time data types and functions.



## Syntax

```syntaxsql
CURRENT_TIMEZONE_ID ( )
```

## Arguments

This function takes no arguments.

## Return types

**varchar**

## Remarks

`CURRENT_TIMEZONE_ID` is a non-deterministic function. You can't index views and expressions that reference this column.

## Examples

The value returned reflects the actual time zone and language settings of the server or the instance.

```sql
SELECT CURRENT_TIMEZONE_ID();
```

The result is `W. Europe Standard Time`.

## Related content

- [SQL Managed Instance Time Zone](https://learn.microsoft.com/azure/sql-database/sql-database-managed-instance-timezone)
- [CURRENT_TIMEZONE (Transact-SQL)](current-timezone-transact-sql.md)
