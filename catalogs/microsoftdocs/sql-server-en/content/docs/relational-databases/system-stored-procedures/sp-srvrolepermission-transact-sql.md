---
title: "sys.sp_srvrolepermission (Transact-SQL)"
description: sp_srvrolepermission displays the permissions of a fixed server role.
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_srvrolepermission_TSQL"
  - "sp_srvrolepermission"
helpviewer_keywords:
  - "sp_srvrolepermission"
dev_langs:
  - "TSQL"
---
# sys.sp_srvrolepermission (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Displays the permissions of a fixed server role.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature. 



## Syntax

```syntaxsql
sys.sp_srvrolepermission [ [ @srvrolename = ] N'srvrolename' ]
[ ; ]
```

## Arguments

#### [ @srvrolename = ] N'*srvrolename*'

The name of the fixed server role for which permissions are returned. *@srvrolename* is **sysname**, with a default of `NULL`. If no role is specified, the permissions for all fixed server roles are returned. *@srvrolename* can have one of the following values.

| Value | Description |
| --- | --- |
| `sysadmin` | System administrators |
| `securityadmin` | Security administrators |
| `serveradmin` | Server administrators |
| `setupadmin` | Setup administrators |
| `processadmin` | Process administrators |
| `diskadmin` | Disk administrators |
| `dbcreator` | Database creators |
| `bulkadmin` | Can execute `BULK INSERT` statements |

## Return code values

`0` (success) or `1` (failure).

## Result set

| Column name | Data type | Description |
| --- | --- | --- |
| `ServerRole` | **sysname** | Name of a fixed server role |
| `Permission` | **sysname** | Permission associated with `ServerRole` |

## Remarks

The permissions listed include the  Transact-SQL  statements that can be executed, and other special activities that can be performed by members of the fixed server role. To display a list of the fixed server roles, execute `sp_helpsrvrole`.

The **sysadmin** fixed server role has the permissions of all the other fixed server roles.

## Permissions

Requires membership in the **public** role.

## Examples

The following query returns the permissions associated with the **sysadmin** fixed server role.

```sql
EXECUTE sp_srvrolepermission 'sysadmin';
GO
```

## Related content

- [Security stored procedures (Transact-SQL)](security-stored-procedures-transact-sql.md)
- [sys.sp_addsrvrolemember (Transact-SQL)](sp-addsrvrolemember-transact-sql.md)
- [sys.sp_dropsrvrolemember (Transact-SQL)](sp-dropsrvrolemember-transact-sql.md)
- [sys.sp_helpsrvrole (Transact-SQL)](sp-helpsrvrole-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
