---
title: "sys.sp_droplogin (Transact-SQL)"
description: sp_droplogin removes a SQL Server login.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_droplogin"
  - "sp_droplogin_TSQL"
helpviewer_keywords:
  - "sp_droplogin"
dev_langs:
  - "TSQL"
---
# sys.sp_droplogin (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Removes a  SQL Server 
 login, which prevents access to an instance of  SQL Server 
 under that login name.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use [DROP LOGIN](../../t-sql/statements/drop-login-transact-sql.md) instead.



## Syntax

```syntaxsql
sys.sp_droplogin [ @loginame = ] N'loginame'
[ ; ]
```

## Arguments

#### [ @loginame = ] N'*loginame*'

The login to be removed. *@loginame* is **sysname**, with no default. *@loginame* must already exist in  SQL Server 
.

## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_droplogin` calls `DROP LOGIN`.

`sp_droplogin` can't be executed within a user-defined transaction.

## Permissions

Requires `ALTER ANY LOGIN` permission on the server.

## Examples

The following example uses `DROP LOGIN` to remove the login `Victoria` from an instance of  SQL Server 
. This method is preferred.

```sql
DROP LOGIN Victoria;
GO
```

## Related content

- [Security stored procedures (Transact-SQL)](security-stored-procedures-transact-sql.md)
- [DROP LOGIN (Transact-SQL)](../../t-sql/statements/drop-login-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
