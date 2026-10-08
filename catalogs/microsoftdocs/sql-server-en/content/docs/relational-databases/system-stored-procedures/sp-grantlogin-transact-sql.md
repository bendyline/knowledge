---
title: "sys.sp_grantlogin (Transact-SQL)"
description: sp_grantlogin creates a SQL Server login.
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_grantlogin_TSQL"
  - "sp_grantlogin"
helpviewer_keywords:
  - "sp_grantlogin"
dev_langs:
  - "TSQL"
---
# sys.sp_grantlogin (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Creates a  SQL Server 
 login.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use [CREATE LOGIN](../../t-sql/statements/create-login-transact-sql.md) instead.



## Syntax

```syntaxsql
sys.sp_grantlogin [ @loginame = ] N'loginame'
[ ; ]
```

## Arguments

#### [ @loginame = ] N'*loginame*'

The name of a Windows user or group. *@loginame* is **sysname**, with no default. The Windows user or group must be qualified with a Windows domain name in the form `<domain>\<user>`; for example, `London\Joeb`.

## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_grantlogin` calls `CREATE LOGIN`, which supports extra options. For information on creating SQL Server logins, see [CREATE LOGIN](../../t-sql/statements/create-login-transact-sql.md)

`sp_grantlogin` can't be executed within a user-defined transaction.

## Permissions

Requires membership in the **securityadmin** fixed server role.

## Examples

The following example uses `CREATE LOGIN` to create a  SQL Server 
 login for the Windows user `Corporate\BobJ`, which is the preferred method.

```sql
CREATE LOGIN [Corporate\BobJ] FROM WINDOWS;
GO
```

## Related content

- [Security stored procedures (Transact-SQL)](security-stored-procedures-transact-sql.md)
- [CREATE LOGIN (Transact-SQL)](../../t-sql/statements/create-login-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
