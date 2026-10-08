---
title: "END (BEGIN...END) (Transact-SQL)"
description: "END (BEGIN...END) (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "END"
  - "END_TSQL"
helpviewer_keywords:
  - "enclosing statements [SQL Server]"
  - "END keyword"
  - "BEGIN...END keyword"
  - "END (BEGIN...END) keyword"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# END (BEGIN...END) (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Encloses a series of  Transact-SQL  statements that will execute as a group. BEGIN...END blocks can be nested.  
  
 
  
## Syntax  
  
```syntaxsql
BEGIN   
     { sql_statement | statement_block }   
END   
```  
  
## Arguments
 { *sql_statement*| *statement_block*}  
 Is any valid  Transact-SQL  statement or statement grouping as defined with a statement block. To define a statement block (batch), use the control-of-flow language keywords BEGIN and END. Although all  Transact-SQL  statements are valid within a BEGIN...END block, certain  Transact-SQL  statements should not be grouped together within the same batch (statement block).  
  
## Result Types  
 **Boolean**  
  
## Examples:  Azure Synapse Analytics 
 In the following example, `BEGIN` and `END` define a series of  SQL 
 statements that run together. If the `BEGIN...END` block are not included, the following example will be in a continuous loop.  
  
```sql  
-- Uses AdventureWorks  
  
DECLARE @Iteration INTEGER = 0  
WHILE @Iteration <10  
BEGIN  
    SELECT FirstName, MiddleName   
    FROM dbo.DimCustomer WHERE LastName = 'Adams';  
SET @Iteration += 1  
END;  
```  
  
## Related content

- [ALTER TRIGGER (Transact-SQL)](../statements/alter-trigger-transact-sql.md)
- [BEGIN...END (Transact-SQL)](begin-end-transact-sql.md)
- [Control-of-Flow](control-of-flow.md)
- [CREATE TRIGGER (Transact-SQL)](../statements/create-trigger-transact-sql.md)
- [ELSE (IF...ELSE) (Transact-SQL)](else-if-else-transact-sql.md)
- [IF...ELSE (Transact-SQL)](if-else-transact-sql.md)
- [WHILE (Transact-SQL)](while-transact-sql.md)
