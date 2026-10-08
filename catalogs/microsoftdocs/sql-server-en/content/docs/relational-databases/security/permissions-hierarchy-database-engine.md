---
title: "Permissions Hierarchy (Database Engine)"
description: Learn about the hierarchy of entities that can be secured with permissions, known as securables, in SQL Server Database Engine.
author: VanMSFT
ms.author: vanto
ms.date: 02/27/2026
ms.service: sql
ms.subservice: security
ms.topic: concept-article
ms.custom:
  - sfi-image-nochange
  - ignite-2025
f1_keywords:
  - "sql13.swb.server.permissions.f1--May use common.permissions"
helpviewer_keywords:
  - "security [SQL Server], denying access"
  - "hierarchies [SQL Server], permissions"
  - "securables [SQL Server]"
  - "security [SQL Server], permissions"
  - "permissions [SQL Server], hierarchy"
  - "security [SQL Server], granting access"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Permissions Hierarchy (Database Engine)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



The  Database Engine 
 manages a hierarchical collection of entities that can be secured with permissions. These entities are known as *securables*. The most prominent securables are servers and databases, but discrete permissions can be set at a much finer level.  SQL Server 
 regulates the actions of principals on securables by verifying that they've been granted appropriate permissions.

The following illustration shows the relationships among the  Database Engine 
 permissions hierarchies.

The permissions system works the same in all versions of  SQL Server 
,  SQL Database
, SQL database in Microsoft Fabric
, and  Azure Synapse Analytics . However, some features aren't available in all versions. For example, server-level permission can't be configured in Azure products.

Diagram of Database Engine permissions hierarchies
  
## Chart of SQL Server permissions

For a poster sized chart of all  Database Engine 
 permissions in PDF format, see <https://aka.ms/sql-permissions-poster>.

## Working with permissions

You can manipulate permissions with the familiar  Transact-SQL  queries GRANT, DENY, and REVOKE. Information about permissions is visible in the [sys.server_permissions](../system-catalog-views/sys-server-permissions-transact-sql.md) and [sys.database_permissions](../system-catalog-views/sys-database-permissions-transact-sql.md) catalog views. There's also support for querying permissions information by using built-in functions.

For information about designing a permissions system, see [Getting Started with Database Engine Permissions](authentication-access/getting-started-with-database-engine-permissions.md).
  
## Related content

- [Securing SQL Server](securing-sql-server.md)
- [Permissions (Database Engine)](permissions-database-engine.md)
- [Securables](securables.md)
- [Principals (Database Engine)](authentication-access/principals-database-engine.md)
- [GRANT (Transact-SQL)](../../t-sql/statements/grant-transact-sql.md)
- [REVOKE (Transact-SQL)](../../t-sql/statements/revoke-transact-sql.md)
- [DENY (Transact-SQL)](../../t-sql/statements/deny-transact-sql.md)
- [HAS_PERMS_BY_NAME (Transact-SQL)](../../t-sql/functions/has-perms-by-name-transact-sql.md)
- [sys.fn_builtin_permissions (Transact-SQL)](../system-functions/sys-fn-builtin-permissions-transact-sql.md)
- [sys.server_permissions (Transact-SQL)](../system-catalog-views/sys-server-permissions-transact-sql.md)
- [sys.database_permissions (Transact-SQL)](../system-catalog-views/sys-database-permissions-transact-sql.md)
