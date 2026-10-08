---
title: DBTS (Transact-SQL)
description: "@@DBTS (Transact-SQL)"
author: markingmyname
ms.author: maghan
ms.date: "09/18/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "@@DBTS_TSQL"
  - "@@DBTS"
helpviewer_keywords:
  - "@@DBTS function"
  - "timestamp data type"
dev_langs:
  - "TSQL"
---

# @@DBTS (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



This function returns the value of the current **timestamp** data type for the current database. The current database will have a guaranteed unique timestamp value.
  

  
## Syntax  
  
```syntaxsql
@@DBTS  
```  

## Return types
**varbinary**
  
## Remarks  
@@DBTS returns the last-used timestamp value of the current database. An insert or update of a row with a **timestamp** column generates a new timestamp value.
  
Changes to the transaction isolation levels do  not affect the @@DBTS function.
  
## Examples  
This example returns the current **timestamp** from the  AdventureWorks2025  database.
  
```sql
USE AdventureWorks2022;  
GO  
SELECT @@DBTS;  
```  
  
## Related content

- [Cursor Concurrency (ODBC)](../../relational-databases/native-client-odbc-cursors/properties/cursor-concurrency-odbc.md)
- [Data types (Transact-SQL)](../data-types/data-types-transact-sql.md)
- [MIN_ACTIVE_ROWVERSION (Transact-SQL)](min-active-rowversion-transact-sql.md)
