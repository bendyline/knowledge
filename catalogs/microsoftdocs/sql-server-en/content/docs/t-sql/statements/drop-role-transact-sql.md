---
title: "DROP ROLE (Transact-SQL)"
description: DROP ROLE (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "05/11/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2024
f1_keywords:
  - "DROP ROLE"
  - "DROP_ROLE_TSQL"
helpviewer_keywords:
  - "deleting roles"
  - "database roles [SQL Server], removing"
  - "removing roles"
  - "DROP ROLE statement"
  - "roles [SQL Server], removing"
  - "dropping roles"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# DROP ROLE (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Removes a role from the database.  
  
 
  
## Syntax  
  
Syntax for SQL Server, Azure SQL Database, Azure SQL Managed Instance, and Fabric SQL database

```syntaxsql
DROP ROLE [ IF EXISTS ] role_name
```

Syntax for Azure Synapse Analytics

```syntaxsql
DROP ROLE role_name
```
  
## Arguments
 *IF EXISTS*  
 **Applies to**:  SQL Server 
 (  SQL Server 2016 (13.x) 
 through [current version](https://learn.microsoft.com/troubleshoot/sql/general/determine-version-edition-update-level)).  
  
 Conditionally drops the role only if it already exists.  
  
 *role_name*  
 Specifies the role to be dropped from the database.  
  
## Remarks  
 Roles that own securables cannot be dropped from the database. To drop a database role that owns securables, you must first transfer ownership of those securables or drop them from the database. Roles that have members cannot be dropped from the database. To drop a role that has members, you must first remove members of the role.  
  
 To remove members from a database role, use [ALTER ROLE (Transact-SQL)](alter-role-transact-sql.md).  
  
 You cannot use DROP ROLE to drop a fixed database role.  
  
 Information about role membership can be viewed in the sys.database_role_members catalog view.  
  
> **Note:**  
> Schemas aren't equivalent to database users. Use [System catalog views](../../relational-databases/system-catalog-views/catalog-views-transact-sql.md) to identify any differences between database users and schemas.
  
  
 To remove a server role, use [DROP SERVER ROLE (Transact-SQL)](drop-server-role-transact-sql.md).  
  
## Permissions  
 Requires **ALTER ANY ROLE** permission on the database, or **CONTROL** permission on the role, or membership in the **db_securityadmin**.  
  
## Examples  
 The following example drops the database role `purchasing` from the  `AdventureWorks2025`  database.  
  
```sql  
DROP ROLE purchasing;  
GO  
```  
  
  
## Related content

- [CREATE ROLE (Transact-SQL)](create-role-transact-sql.md)
- [ALTER ROLE (Transact-SQL)](alter-role-transact-sql.md)
- [Principals (Database Engine)](../../relational-databases/security/authentication-access/principals-database-engine.md)
- [EVENTDATA (Transact-SQL)](../functions/eventdata-transact-sql.md)
- [sys.sp_addrolemember (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-addrolemember-transact-sql.md)
- [sys.database_role_members (Transact-SQL)](../../relational-databases/system-catalog-views/sys-database-role-members-transact-sql.md)
- [sys.database_principals (Transact-SQL)](../../relational-databases/system-catalog-views/sys-database-principals-transact-sql.md)
- [Security Functions (Transact-SQL)](../functions/security-functions-transact-sql.md)
