---
title: "@@TEXTSIZE (Transact-SQL)"
description: "@@TEXTSIZE (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "09/18/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "@@TEXTSIZE"
  - "@@TEXTSIZE_TSQL"
helpviewer_keywords:
  - "SET statement, TEXTSIZE option"
  - "SELECT statement [SQL Server], text size returned"
  - "TEXTSIZE option"
  - "@@TEXTSIZE function"
  - "text size returned [SQL Server]"
dev_langs:
  - "TSQL"
---
# @@TEXTSIZE (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns the current value of the [TEXTSIZE](../statements/set-textsize-transact-sql.md) option.  
  
 
  
## Syntax  
  
```syntaxsql
@@TEXTSIZE  
```  
  
## Return Types
 **integer**  
  
## Examples  
 The following example uses `SELECT` to display the `@@TEXTSIZE` value before and after it is changed with the `SET``TEXTSIZE` statement.  
  
```sql
-- Set the TEXTSIZE option to the default size of 4096 bytes.  
SET TEXTSIZE 0  
SELECT @@TEXTSIZE AS 'Text Size'  
SET TEXTSIZE 2048  
SELECT @@TEXTSIZE AS 'Text Size'  
```  
  
  Here's the result set. 
  
  
 ```
Text Size
-----------
4096
Text Size
-----------
2048
 ```  
  
## Related content

- [SET TEXTSIZE (Transact-SQL)](../statements/set-textsize-transact-sql.md)
