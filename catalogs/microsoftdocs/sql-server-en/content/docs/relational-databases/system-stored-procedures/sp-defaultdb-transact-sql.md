---
title: "sys.sp_defaultdb (Transact-SQL)"
description: sp_defaultdb changes the default database for a SQL Server login.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_defaultdb_TSQL"
  - "sp_defaultdb"
helpviewer_keywords:
  - "sp_defaultdb"
dev_langs:
  - "TSQL"
---
# sys.sp_defaultdb (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Changes the default database for a  SQL Server 
 login.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use [ALTER LOGIN](../../t-sql/statements/alter-login-transact-sql.md) instead.



## Syntax

```syntaxsql
sys.sp_defaultdb
    [ @loginame = ] N'loginame'
    , [ @defdb = ] N'defdb'
[ ; ]
```

## Arguments

#### [ @loginame = ] N'*loginame*'

The login name. *@loginame* is **sysname**, with no default. *@loginame* can be an existing  SQL Server 
 login or a Windows user or group. If a login for the Windows user or group doesn't exist in  SQL Server 
, it's automatically added.

#### [ @defdb = ] N'*defdb*'

The name of the new default database. *@defdb* is **sysname**, with no default. *@defdb* must already exist.

## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_defaultdb` calls `ALTER LOGIN`, which supports extra options. For information about changing default database, see [ALTER LOGIN](../../t-sql/statements/alter-login-transact-sql.md).

`sp_defaultdb` can't be executed within a user-defined transaction.

## Permissions

Requires `ALTER ANY LOGIN` permission.

## Examples

The following example sets  `AdventureWorks2025`  as the default database for  SQL Server 
 login `Victoria`.

```sql
EXECUTE sp_defaultdb 'Victoria', 'AdventureWorks2022';
```

## Related content

- [Security stored procedures (Transact-SQL)](security-stored-procedures-transact-sql.md)
- [ALTER LOGIN (Transact-SQL)](../../t-sql/statements/alter-login-transact-sql.md)
- [sys.sp_addlogin (Transact-SQL)](sp-addlogin-transact-sql.md)
- [sys.sp_droplogin (Transact-SQL)](sp-droplogin-transact-sql.md)
- [sys.sp_grantdbaccess (Transact-SQL)](sp-grantdbaccess-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
