---
title: "DROP USER (Transact-SQL)"
description: DROP USER (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "05/12/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "DROP_USER_TSQL"
  - "DROP USER"
helpviewer_keywords:
  - "dropping users"
  - "DROP USER statement"
  - "deleting users"
  - "database user removal [SQL Server]"
  - "removing users"
  - "users [SQL Server], removing"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# DROP USER (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Removes a user from the current database.  
  
 
  
## Syntax  
  
```syntaxsql  
-- Syntax for SQL Server and Azure SQL Database  
  
DROP USER [ IF EXISTS ] user_name  
```  
  
```syntaxsql  
-- Syntax for Azure Synapse Analytics
  
DROP USER user_name  
```  
## Arguments
 *IF EXISTS*  
 **Applies to**:  SQL Server 
 (  SQL Server 2016 (13.x) 
 through [current version](https://learn.microsoft.com/troubleshoot/sql/general/determine-version-edition-update-level),  SQL Database
).  
  
 Conditionally drops the user only if it already exists.  
  
 *user_name*  
 Specifies the name by which the user is identified inside this database.  
  
## Remarks  
 Users that own securables cannot be dropped from the database. Before dropping a database user that owns securables, you must first drop or transfer ownership of those securables.  
  
 The guest user cannot be dropped, but guest user can be disabled by revoking its CONNECT permission by executing REVOKE CONNECT FROM GUEST within any database other than master or tempdb.  
  
> **Note:**  
> Schemas aren't equivalent to database users. Use [System catalog views](../../relational-databases/system-catalog-views/catalog-views-transact-sql.md) to identify any differences between database users and schemas.
  
  
## Permissions  
 Requires ALTER ANY USER permission on the database.  
  
## Examples  
 The following example removes database user `AbolrousHazem` from the  `AdventureWorks2025`  database.  
  
```sql  
DROP USER AbolrousHazem;  
GO  
```  
  
## Related content

- [CREATE USER (Transact-SQL)](create-user-transact-sql.md)
- [ALTER USER (Transact-SQL)](alter-user-transact-sql.md)
- [EVENTDATA (Transact-SQL)](../functions/eventdata-transact-sql.md)
