---
title: "DROP APPLICATION ROLE (Transact-SQL)"
description: DROP APPLICATION ROLE (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "DROP_APPLICATION_ROLE_TSQL"
  - "DROP APPLICATION ROLE"
helpviewer_keywords:
  - "dropping application roles"
  - "deleting application roles"
  - "removing application roles"
  - "application roles [SQL Server], removing"
  - "DROP APPLICATION ROLE statement"
dev_langs:
  - "TSQL"
---
# DROP APPLICATION ROLE (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 





  Removes an application role from the current database.  
  
 
  
## Syntax  
  
```syntaxsql
DROP APPLICATION ROLE rolename  
```  
  
## Arguments
 *rolename*  
 Specifies the name of the application role to be dropped.  
  
## Remarks  
 If the application role owns any securables it cannot be dropped. Before dropping an application role that owns securables, you must first transfer ownership of the securables, or drop them.  
  
> **Note:**  
> Schemas aren't equivalent to database users. Use [System catalog views](../../relational-databases/system-catalog-views/catalog-views-transact-sql.md) to identify any differences between database users and schemas.
  
  
## Permissions  
 Requires ALTER ANY APPLICATION ROLE permission on the database.  
  
## Examples  
 Drop application role "weekly_ledger" from the database.  
  
```sql  
DROP APPLICATION ROLE weekly_ledger;  
GO  
```  
  
## Related content

- [Application Roles](../../relational-databases/security/authentication-access/application-roles.md)
- [CREATE APPLICATION ROLE (Transact-SQL)](create-application-role-transact-sql.md)
- [ALTER APPLICATION ROLE (Transact-SQL)](alter-application-role-transact-sql.md)
- [EVENTDATA (Transact-SQL)](../functions/eventdata-transact-sql.md)
