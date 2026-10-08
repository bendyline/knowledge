---
title: "sys.sp_denylogin (Transact-SQL)"
description: sp_denylogin Prevents a Windows user or Windows group from connecting to an instance of SQL Server.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_denylogin_TSQL"
  - "sp_denylogin"
helpviewer_keywords:
  - "sp_denylogin"
dev_langs:
  - "TSQL"
---
# sys.sp_denylogin (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Prevents a Windows user or Windows group from connecting to an instance of  SQL Server 
.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use [ALTER LOGIN](../../t-sql/statements/alter-login-transact-sql.md) instead.



## Syntax

```syntaxsql
sys.sp_denylogin [ @loginame = ] N'loginame'
[ ; ]
```

## Arguments

#### [ @loginame = ] N'*loginame*'

The name of a Windows user or group. *@loginame* is **sysname**, with no default.

## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_denylogin` denies `CONNECT` SQL permission to the server-level principal mapped to the specified Windows user or Windows group. If the server principal doesn't exist, it's created. The new principal is visible in the [sys.server_principals](../system-catalog-views/sys-server-principals-transact-sql.md) catalog view.

`sp_denylogin` can't be executed within a user-defined transaction.

## Permissions

Requires membership in the **sysadmin** fixed server role, or execute permission directly on this stored procedure.

## Examples

The following example shows how to use `sp_denylogin` to prevent Windows user `CORPORATE\GeorgeV` from connecting to the server.

```sql
EXECUTE sp_denylogin 'CORPORATE\GeorgeV';
```

## Related content

- [sys.sp_grantlogin (Transact-SQL)](sp-grantlogin-transact-sql.md)
- [Security stored procedures (Transact-SQL)](security-stored-procedures-transact-sql.md)
- [ALTER LOGIN (Transact-SQL)](../../t-sql/statements/alter-login-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
