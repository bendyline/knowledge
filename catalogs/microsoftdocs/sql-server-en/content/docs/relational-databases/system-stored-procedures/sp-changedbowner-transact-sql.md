---
title: "sys.sp_changedbowner (Transact-SQL)"
description: sp_changedbowner changes the owner of the current database.
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_changedbowner"
  - "sp_changedbowner_TSQL"
helpviewer_keywords:
  - "sp_changedbowner"
dev_langs:
  - "TSQL"
---
# sys.sp_changedbowner (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Changes the owner of the current database.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use [ALTER AUTHORIZATION](../../t-sql/statements/alter-authorization-transact-sql.md) instead.



## Syntax

```syntaxsql
sys.sp_changedbowner
    [ @loginame = ] N'loginame'
    [ , [ @map = ] 'map' ]
[ ; ]
```

## Arguments

#### [ @loginame = ] N'*loginame*'

The login ID of the new owner of the current database. *@loginame* is **sysname**, with no default. *@loginame* must be an already existing  SQL Server 
 login or Windows user. *@loginame* can't become the owner of the current database if it already has access to the database through an existing user security account within the database. To avoid this scenario, drop the user within the current database first.

#### [ @map = ] '*map*'

This parameter is deprecated and is maintained for backward compatibility of scripts.


## Return code values

`0` (success) or `1` (failure).

## Remarks

After `sp_changedbowner` is executed, the new owner is known as the `dbo` user inside the database. The `dbo` user has implied permissions to perform all activities in the database.

The owner of the `master`, `model`, or `tempdb` system databases can't be changed.

To display a list of the valid *@loginame* values, execute the `sp_helplogins` stored procedure.

Executing `sp_changedbowner` with only the *@loginame* parameter changes database ownership to *@loginame*.

You can change the owner of any securable by using the `ALTER AUTHORIZATION` statement. For more information, see [ALTER AUTHORIZATION](../../t-sql/statements/alter-authorization-transact-sql.md).

## Permissions

Requires `TAKE OWNERSHIP` permission on the database. If the new owner has a corresponding user in the database, requires `IMPERSONATE` permission on the login, otherwise requires `CONTROL SERVER` permission on the server.

## Examples

The following example makes the login `Albert` the owner of the current database.

```sql
EXECUTE sp_changedbowner 'Albert';
```

## Related content

- [Security stored procedures (Transact-SQL)](security-stored-procedures-transact-sql.md)
- [CREATE DATABASE](../../t-sql/statements/create-database-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
- [sys.sp_dropuser (Transact-SQL)](sp-dropuser-transact-sql.md)
- [sys.sp_helpdb (Transact-SQL)](sp-helpdb-transact-sql.md)
- [sys.sp_helplogins (Transact-SQL)](sp-helplogins-transact-sql.md)
