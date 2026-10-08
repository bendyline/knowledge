---
title: "sys.sp_revokedbaccess (Transact-SQL)"
description: sp_revokedbaccess removes a database user from the current database.
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_revokedbaccess_TSQL"
  - "sp_revokedbaccess"
helpviewer_keywords:
  - "sp_revokedbaccess"
dev_langs:
  - "TSQL"
---
# sys.sp_revokedbaccess (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Removes a database user from the current database.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use [DROP USER](../../t-sql/statements/drop-user-transact-sql.md) instead.



## Syntax

```syntaxsql
sys.sp_revokedbaccess [ @name_in_db = ] N'name_in_db'
[ ; ]
```

## Arguments

#### [ @name_in_db = ] N'*name_in_db*'

The name of the database user to be removed. *@name_in_db* is **sysname**, with no default. *@name_in_db* can be the name of a server login, a Windows login, or a Windows group, and must exist in the current database. When you specify a Windows login or Windows group, specify the name by which it's known in the database.

## Return code values

`0` (success) or `1` (failure).

## Remarks

When the database user is removed, the permissions and aliases that depend on the user are also removed.

`sp_revokedbaccess` can remove only database users from the current database. Before removing a database user that owns objects in the current database, you must either transfer ownership of the objects or drop them from the database. For more information, see [ALTER AUTHORIZATION](../../t-sql/statements/alter-authorization-transact-sql.md).

`sp_revokedbaccess` can't be executed within a user-defined transaction.

## Permissions

Requires ALTER ANY USER permission on the database.

## Examples

The following example removes the database user mapped to `Edmonds\LolanSo` from the current database.

```sql
EXECUTE sp_revokedbaccess 'Edmonds\LolanSo';
GO
```

## Related content

- [Security stored procedures (Transact-SQL)](security-stored-procedures-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
- [DROP USER (Transact-SQL)](../../t-sql/statements/drop-user-transact-sql.md)
- [ALTER AUTHORIZATION (Transact-SQL)](../../t-sql/statements/alter-authorization-transact-sql.md)
