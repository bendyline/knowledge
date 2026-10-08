---
title: "Server Configuration: contained database authentication"
description: "Learn about the contained database authentication option. See how to turn it on so that you can attach contained databases to the SQL Server Database Engine."
author: rwestMSFT
ms.author: randolphwest
ms.date: 08/26/2025
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
helpviewer_keywords:
  - "contained database, enabling"
  - "contained database authentication option"
---
# Server Configuration: contained database authentication


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Use the `contained database authentication` option to enable contained databases on the instance of  SQL Server Database Engine 
.

This server option allows you to control `contained database authentication`.

- When `contained database authentication` is off (`0`) for the instance, contained databases can't be created, or attached to the  Database Engine 
.

- When `contained database authentication` is on (`1`) for the instance, contained databases can be created, or attached to the  Database Engine 
.

A contained database includes all database settings and metadata required to define the database and has no configuration dependencies on the instance of the  Database Engine 
 where the database is installed. Users can connect to the database without authenticating a login at the  Database Engine 
 level.

Isolating the database from the Database Engine makes it possible to easily move the database to another instance of  SQL Server 
. Including all the database settings in the database enables database owners to manage all the configuration settings for the database. For more information about contained databases, see [Contained Databases](../../relational-databases/databases/contained-databases.md).

> **Note:**  
> Contained databases are always enabled for  SQL Database
 and  Azure Synapse Analytics  and can't be disabled.

If an instance of  SQL Server 
 has any contained databases the `contained database authentication` setting can be set to `0` by using the `RECONFIGURE WITH OVERRIDE` statement. Setting `contained database authentication` to `0` disables contained database authentication for the contained databases.

> **Important:**  
> When contained databases are enabled, database users with the `ALTER ANY USER` permission, such as members of the db_owner and db_accessadmin database roles, can grant access to databases and by doing so, grant access to the instance of  SQL Server 
. This means that control over access to the server is no longer limited to members of the **sysadmin** and **securityadmin** fixed server role, and logins with the server level `CONTROL SERVER` and `ALTER ANY LOGIN` permission.

Before allowing contained databases, you should understand the risks associated with contained databases. For more information, see [Security Best Practices with Contained Databases](../../relational-databases/databases/security-best-practices-with-contained-databases.md).

## Examples

The following example enables contained databases on the instance of the  Database Engine 
.

```sql
EXECUTE sp_configure 'contained database authentication', 1;
GO

RECONFIGURE;
GO
```

## Related content

- [sys.sp_configure (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-configure-transact-sql.md)
- [RECONFIGURE (Transact-SQL)](../../t-sql/language-elements/reconfigure-transact-sql.md)
- [Server configuration options](server-configuration-options-sql-server.md)
