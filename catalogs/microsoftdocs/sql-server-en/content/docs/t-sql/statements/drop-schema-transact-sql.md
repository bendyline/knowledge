---
title: "DROP SCHEMA (Transact-SQL)"
description: DROP SCHEMA (Transact-SQL)
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "05/11/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "DROP SCHEMA"
  - "DROP_SCHEMA_TSQL"
helpviewer_keywords:
  - "deleting schemas"
  - "schemas [SQL Server], removing"
  - "DROP SCHEMA statement"
  - "dropping schemas"
  - "removing schemas"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# DROP SCHEMA (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Removes a schema from the database.  
  
 
  
## Syntax  
  
```syntaxsql  
-- Syntax for SQL Server and Azure SQL Database  
  
DROP SCHEMA  [ IF EXISTS ] schema_name  
```  
  

```syntaxsql  
-- Syntax for Azure Synapse Analytics
  
DROP SCHEMA schema_name  
```  
  
## Arguments
 *IF EXISTS*  
 **Applies to**:  SQL Server 
 (  SQL Server 2016 (13.x) 
 through [current version](https://learn.microsoft.com/troubleshoot/sql/general/determine-version-edition-update-level)).  
  
 Conditionally drops the schema only if it already exists.  
  
 *schema_name*  
 Is the name by which the schema is known within the database.  
  
## Remarks  
 The schema that is being dropped must not contain any objects. If the schema contains objects, the DROP statement fails.  
  
 Information about schemas is visible in the [sys.schemas](../../relational-databases/system-catalog-views/schemas-catalog-views-sys-schemas.md) catalog view.  

> **Note:**  
> Schemas aren't equivalent to database users. Use [System catalog views](../../relational-databases/system-catalog-views/catalog-views-transact-sql.md) to identify any differences between database users and schemas.
  
  
## Permissions  
 Requires CONTROL permission on the schema or ALTER ANY SCHEMA permission on the database.  
  
## Examples  
 The following example starts with a single `CREATE SCHEMA` statement. The statement creates the schema `Sprockets` that is owned by `Krishna` and a table `Sprockets.NineProngs`, and then grants `SELECT` permission to `Anibal` and denies `SELECT` permission to `Hung-Fu`.  
  
```sql  
CREATE SCHEMA Sprockets AUTHORIZATION Krishna   
    CREATE TABLE NineProngs (source INT, cost INT, partnumber INT)  
    GRANT SELECT TO Anibal   
    DENY SELECT TO [Hung-Fu];  
GO  
```  
  
 The following statements drop the schema. Note that you must first drop the table that is contained by the schema.  
  
```sql  
DROP TABLE Sprockets.NineProngs;  
DROP SCHEMA Sprockets;  
GO  
```  
  
  
## Related content

- [CREATE SCHEMA (Transact-SQL)](create-schema-transact-sql.md)
- [ALTER SCHEMA (Transact-SQL)](alter-schema-transact-sql.md)
- [DROP SCHEMA (Transact-SQL)](drop-schema-transact-sql.md)
- [EVENTDATA (Transact-SQL)](../functions/eventdata-transact-sql.md)
