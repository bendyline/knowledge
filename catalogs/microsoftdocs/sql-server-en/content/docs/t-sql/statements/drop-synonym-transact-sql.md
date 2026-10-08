---
title: "DROP SYNONYM (Transact-SQL)"
description: DROP SYNONYM (Transact-SQL)
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "07/26/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "DROP SYNONYM"
  - "DROP_SYNONYM_TSQL"
helpviewer_keywords:
  - "deleting synonyms"
  - "synonyms [SQL Server], removing"
  - "removing synonyms"
  - "DROP SYNONYM statement"
  - "dropping synonyms"
dev_langs:
  - "TSQL"
---
# DROP SYNONYM (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Removes a synonym from a specified schema.  
  
 
  
## Syntax  
  
```syntaxsql
DROP SYNONYM [ IF EXISTS ] [ schema. ] synonym_name  
```  
  
## Arguments
 *IF EXISTS*  
**Applies to**:  SQL Server 
 (  SQL Server 2016 (13.x) 
 through [current version](https://learn.microsoft.com/troubleshoot/sql/general/determine-version-edition-update-level)).
  
 Conditionally drops the synonym only if it already exists.  
  
 *schema*  
 Specifies the schema in which the synonym exists. If schema is not specified,  SQL Server 
 uses the default schema of the current user.  
  
 *synonym_name*  
 Is the name of the synonym to be dropped.  
  
## Remarks  
 References to synonyms are not schema-bound; therefore, you can drop a synonym at any time. References to dropped synonyms will be found only at run time.  
  
 Synonyms can be created, dropped and referenced in dynamic SQL.  
  
## Permissions  
 To drop a synonym, a user must satisfy at least one of the following conditions. The user must be:  
  
-   The current owner of a synonym.  
  
-   A grantee holding CONTROL on a synonym.  
  
-   A grantee holding ALTER SCHEMA permission on the containing schema.  
  
## Examples  
 The following example first creates a synonym, `MyProduct`, and then drops the synonym.  
  
```sql  
USE tempdb;  
GO  
-- Create a synonym for the Product table in AdventureWorks2022.  
CREATE SYNONYM MyProduct  
FOR AdventureWorks2022.Production.Product;  
GO  
-- Drop synonym MyProduct.  
USE tempdb;  
GO  
DROP SYNONYM MyProduct;  
GO  
```  
  
## Related content

- [CREATE SYNONYM (Transact-SQL)](create-synonym-transact-sql.md)
- [EVENTDATA (Transact-SQL)](../functions/eventdata-transact-sql.md)
