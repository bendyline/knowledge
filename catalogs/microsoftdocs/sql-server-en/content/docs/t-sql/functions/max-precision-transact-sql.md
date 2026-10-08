---
title: "@@MAX_PRECISION (Transact-SQL)"
description: "@@MAX_PRECISION (Transact-SQL)"
author: markingmyname
ms.author: maghan
ms.date: "09/18/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "@@MAX_PRECISION_TSQL"
  - "@@MAX_PRECISION"
helpviewer_keywords:
  - "precision [SQL Server], @@MAX_PRECISION"
  - "numeric data type, precision level"
  - "decimal data type, precision level"
  - "@@MAX_PRECISION function"
  - "data types [SQL Server], precision"
dev_langs:
  - "TSQL"
---
# @@MAX_PRECISION (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns the precision level used by **decimal** and **numeric** data types as currently set in the server.  
  
 
  
## Syntax  
  
```syntaxsql
@@MAX_PRECISION  
```  
  
## Return Types
 **tinyint**  
  
## Remarks  
 By default, the maximum precision returns 38.  
  
## Examples  
  
```sql  
SELECT @@MAX_PRECISION AS 'Max Precision'  
```  
  
## Related content

- [decimal and numeric (Transact-SQL)](../data-types/decimal-and-numeric-transact-sql.md)
- [Precision, scale, and length (Transact-SQL)](../data-types/precision-scale-and-length-transact-sql.md)
