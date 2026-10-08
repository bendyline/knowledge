---
title: "sys.sp_droprolemember (Transact-SQL)"
description: sp_droprolemember removes a security account from a SQL Server role in the current database.
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "sp_droprolemember_TSQL"
  - "sp_droprolemember"
helpviewer_keywords:
  - "sp_droprolemember"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# sys.sp_droprolemember (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Removes a security account from a  SQL Server 
 role in the current database.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use [ALTER ROLE](../../t-sql/statements/alter-role-transact-sql.md) instead.



## Syntax

Syntax for  SQL Server 
 and Azure SQL Edge.

```syntaxsql
sys.sp_droprolemember
    [ @rolename = ] N'rolename'
    , [ @membername = ] N'membername'
[ ; ]
```

Syntax for Azure Synapse Analytics.

```syntaxsql
sp_droprolemember N'rolename' , 'membername'
[ ; ]
```

> **Note:**
>  This syntax is not supported by serverless SQL pool in Azure Synapse Analytics. 


## Arguments

#### [ @rolename = ] N'*rolename*'

The name of the role from which the member is being removed. *@rolename* is **sysname**, with no default. *@rolename* must exist in the current database.

#### [ @membername = ] N'*membername*'

The name of the security account being removed from the role. *@membername* is **sysname**, with no default. *@membername* can be a database user, another database role, a Windows account, or a Windows group. *@membername* must exist in the current database.

## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_droprolemember` removes a member from a database role by deleting a row from the `sysmembers` table. When a member is removed from a role, the member loses any permissions it has by membership in that role.

To remove a user from a fixed server role, use `sp_dropsrvrolemember`. Users can't be removed from the **public** role, and `dbo` can't be removed from any role.

Use `sp_helpuser` to see the members of a  SQL Server 
 role, and use `ALTER ROLE` to add a member to a role.

## Permissions

Requires `ALTER` permission on the role.

## Examples

The following example removes the user `JonB` from the role `Sales`.

```sql
EXECUTE sp_droprolemember 'Sales', 'Jonb';
```

## Examples: Azure Synapse Analytics

The following example removes the user `JonB` from the role `Sales`.

```sql
EXECUTE sp_droprolemember 'Sales', 'JonB';
```

## Related content

- [Security stored procedures (Transact-SQL)](security-stored-procedures-transact-sql.md)
- [sys.sp_addrolemember (Transact-SQL)](sp-addrolemember-transact-sql.md)
- [sys.sp_droprole (Transact-SQL)](sp-droprole-transact-sql.md)
- [sys.sp_dropsrvrolemember (Transact-SQL)](sp-dropsrvrolemember-transact-sql.md)
- [sys.sp_helpuser (Transact-SQL)](sp-helpuser-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
