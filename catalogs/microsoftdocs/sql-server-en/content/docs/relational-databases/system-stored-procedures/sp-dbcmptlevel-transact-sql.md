---
title: "sys.sp_dbcmptlevel (Transact-SQL)"
description: sp_dbcmptlevel sets certain database behaviors to be compatible with the specified version of SQL Server.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_dbcmptlevel"
  - "sp_dbcmptlevel_TSQL"
helpviewer_keywords:
  - "sp_dbcmptlevel"
dev_langs:
  - "TSQL"
---
# sys.sp_dbcmptlevel (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Sets certain database behaviors to be compatible with the specified version of  SQL Server 
.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use [ALTER DATABASE (Transact-SQL) compatibility level](../../t-sql/statements/alter-database-transact-sql-compatibility-level.md) instead.



## Syntax

```syntaxsql
sys.sp_dbcmptlevel
    [ [ @dbname = ] N'dbname' ]
    [ , [ @new_cmptlevel = ] new_cmptlevel OUTPUT ]
[ ; ]
```

## Arguments

#### [ @dbname = ] N'*dbname*'

The name of the database for which the compatibility level is to be changed. Database names must conform to the rules for identifiers. *@dbname* is **sysname**, with a default of `NULL`.

#### [ @new_cmptlevel = ] *new_cmptlevel* OUTPUT

The version of  SQL Server 
 with which the database is to be made compatible. *@new_cmptlevel* is an `OUTPUT` parameter of type **tinyint**, and must be one of the following values:

- `90` =  SQL Server 2005 (9.x) 

- `100` =  SQL Server 2008 (10.0.x) 

- `110` =  SQL Server 2012 (11.x) 

- `120` =  SQL Server 2014 (12.x)

- `130` =  SQL Server 2016 (13.x) 

- `140` =  SQL Server 2017 (14.x) 

- `150` =  SQL Server 2019 (15.x) 

- `160` =  SQL Server 2022 (16.x) 


## Return code values

`0` (success) or `1` (failure).

## Result set

If no parameters are specified or if the *@dbname* parameter isn't specified, `sp_dbcmptlevel` returns an error.

If *@dbname* is specified without *@new_cmptlevel*, the  Database Engine 
 returns a message displaying the current compatibility level of the specified database.

## Remarks

For a description of compatibilities levels, see [ALTER DATABASE (Transact-SQL) compatibility level](../../t-sql/statements/alter-database-transact-sql-compatibility-level.md).

## Permissions

Only the database owner, members of the **sysadmin** fixed server role, and the **db_owner** fixed database role (if you're changing the current database) can execute this procedure.

## Related content

- [Database Engine stored procedures (Transact-SQL)](database-engine-stored-procedures-transact-sql.md)
- [ALTER DATABASE (Transact-SQL)](../../t-sql/statements/alter-database-transact-sql.md)
- [Reserved Keywords (Transact-SQL)](../../t-sql/language-elements/reserved-keywords-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
