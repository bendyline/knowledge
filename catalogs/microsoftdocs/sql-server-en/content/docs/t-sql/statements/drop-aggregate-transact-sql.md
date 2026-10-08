---
title: "DROP AGGREGATE (Transact-SQL)"
description: DROP AGGREGATE (Transact-SQL)
author: markingmyname
ms.author: maghan
ms.date: "05/10/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "DROP_AGGREGATE_TSQL"
  - "DROP AGGREGATE"
helpviewer_keywords:
  - "aggregate functions [SQL Server], removing"
  - "removing user-defined functions"
  - "dropping user-defined functions"
  - "user-defined functions [CLR integration]"
  - "deleting user-defined functions"
  - "DROP AGGREGATE statement"
dev_langs:
  - "TSQL"
---
# DROP AGGREGATE (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  Removes a user-defined aggregate function from the current database. User-defined aggregate functions are created by using [CREATE AGGREGATE](create-aggregate-transact-sql.md).  
  
 
  
## Syntax  
  
```syntaxsql  
DROP AGGREGATE [ IF EXISTS ] [ schema_name . ] aggregate_name  
```  
  
## Arguments
 *IF EXISTS*  
 **Applies to**:  SQL Server 
 (  SQL Server 2016 (13.x) 
 through [current version](https://learn.microsoft.com/troubleshoot/sql/general/determine-version-edition-update-level)).  
  
 Conditionally drops the aggregate only if it already exists.  
  
 *schema_name*  
 Is the name of the schema to which the user-defined aggregate function belongs.  
  
 *aggregate_name*  
 Is the name of the user-defined aggregate function you want to drop.  
  
## Remarks  
 DROP AGGREGATE does not execute if there are any views, functions, or stored procedures created with schema binding that reference the user-defined aggregate function you want to drop.  
  
## Permissions  
 To execute DROP AGGREGATE, at a minimum, a user must have ALTER permission on the schema to which the user-defined aggregate belongs, or CONTROL permission on the aggregate.  
  
## Examples  
 The following example drops the aggregate `Concatenate`.  
  
```sql  
DROP AGGREGATE dbo.Concatenate;  
```  
  
## Related content

- [CREATE AGGREGATE (Transact-SQL)](create-aggregate-transact-sql.md)
- [Create user-defined aggregates](../../relational-databases/user-defined-functions/create-user-defined-aggregates.md)
