---
title: "sys.sp_resetstatus (Transact-SQL)"
description: sp_resetstatus resets the status of a suspect database.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_resetstatus"
  - "sp_resetstatus_TSQL"
helpviewer_keywords:
  - "sp_resetstatus"
dev_langs:
  - "TSQL"
---
# sys.sp_resetstatus (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Resets the status of a suspect database.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use [ALTER DATABASE](../../t-sql/statements/alter-database-transact-sql.md) instead.



## Syntax

```syntaxsql
sys.sp_resetstatus [ @DBName = ] N'DBName'
[ ; ]
```

## Arguments

#### [ @DBName = ] N'*DBName*'

The name of the database to reset. *@DBName* is **sysname**, with no default.

## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_resetstatus` turns off the suspect flag on a database. This procedure updates the mode and status columns of the named database in `sys.databases`. The  SQL Server 
 error log should be consulted and all problems resolved before running this procedure. Stop and restart the instance of  SQL Server 
 after you execute `sp_resetstatus`.

A database can become suspect for several reasons. Possible causes include denial of access to a database resource by the operating system, and the unavailability or corruption of one or more database files.

## Permissions

Requires membership in the **sysadmin** fixed server role, or execute permission directly on this stored procedure.

## Examples

The following example resets the status of the  `AdventureWorks2025`  database.

```sql
EXECUTE sp_resetstatus 'AdventureWorks2022';
```

## Related content

- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
- [Database Engine stored procedures (Transact-SQL)](database-engine-stored-procedures-transact-sql.md)
