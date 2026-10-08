---
title: "sys.sp_renamedb (Transact-SQL)"
description: sp_renamedb changes the name of a database.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_renamedb"
  - "sp_renamedb_TSQL"
helpviewer_keywords:
  - "sp_renamedb"
dev_langs:
  - "TSQL"
---
# sys.sp_renamedb (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





Changes the name of a database.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use `ALTER DATABASE MODIFY NAME` instead. For more information, see [ALTER DATABASE](../../t-sql/statements/alter-database-transact-sql.md).



## Syntax

```syntaxsql
sys.sp_renamedb
    [ @dbname = ] N'dbname'
    , [ @newname = ] N'newname'
[ ; ]
```

## Arguments

#### [ @dbname = ] N'*dbname*'

The current name of the database. *@dbname* is **sysname**, with no default.

#### [ @newname = ] N'*newname*'

The new name of the database. *@newname* is **sysname**, with no default. *@newname* must follow the rules for identifiers.

## Return code values

`0` (success) or a nonzero number (failure).

## Remarks

It isn't possible to rename an Azure SQL database configured in an [active geo-replication](https://learn.microsoft.com/azure/azure-sql/database/active-geo-replication-overview) relationship.

## Permissions

Requires membership in the **sysadmin** or **dbcreator** fixed server roles.

## Examples

The following example creates the `Accounting` database and then changes the name of the database to `Financial`. The `sys.databases` catalog view is then queried to verify the new name of the database.

```sql
USE master;
GO

CREATE DATABASE Accounting;
GO

EXECUTE sp_renamedb N'Accounting', N'Financial';
GO

SELECT name,
       database_id,
       create_date
FROM sys.databases
WHERE name = N'Financial';
GO
```

## Related content

- [Database Engine stored procedures (Transact-SQL)](database-engine-stored-procedures-transact-sql.md)
- [ALTER DATABASE (Transact-SQL)](../../t-sql/statements/alter-database-transact-sql.md)
- [sys.sp_changedbowner (Transact-SQL)](sp-changedbowner-transact-sql.md)
- [sys.sp_helpdb (Transact-SQL)](sp-helpdb-transact-sql.md)
- [sys.databases (Transact-SQL)](../system-catalog-views/sys-databases-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
