---
title: "sys.sp_dbremove (Transact-SQL)"
description: sp_dbremove removes a database and all files associated with that database.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_dbremove"
  - "sp_dbremove_TSQL"
helpviewer_keywords:
  - "sp_dbremove"
dev_langs:
  - "TSQL"
---
# sys.sp_dbremove (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Removes a database and all files associated with that database.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  We recommend that you use [DROP DATABASE](../../t-sql/statements/drop-database-transact-sql.md) instead.



## Syntax

```syntaxsql
sys.sp_dbremove
    [ [ @dbname = ] N'dbname' ]
    [ , [ @dropdev = ] 'dropdev' ]
[ ; ]
```

## Arguments

#### [ @dbname = ] N'*dbname*'

The name of the database to be removed. *@dbname* is **sysname**, with a default of `NULL`.

#### [ @dropdev = ] '*dropdev*'

A flag provided for backward compatibility only and is currently ignored. *@dropdev* is **varchar(10)**, with a default of `dropdev`.

## Return code values

`0` (success) or `1` (failure).

## Result set

None.

## Permissions

Requires membership in the **sysadmin** fixed server role, or execute permission directly on this stored procedure.

## Examples

The following example removes a database named `sales` and all files associated with it.

```sql
EXECUTE sp_dbremove sales;
```

## Related content

- [ALTER DATABASE (Transact-SQL)](../../t-sql/statements/alter-database-transact-sql.md)
- [CREATE DATABASE](../../t-sql/statements/create-database-transact-sql.md)
- [DBCC (Transact-SQL)](../../t-sql/database-console-commands/dbcc-transact-sql.md)
- [sys.sp_detach_db (Transact-SQL)](sp-detach-db-transact-sql.md)
