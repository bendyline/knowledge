---
title: SET ARITHIGNORE (Transact-SQL)
description: The SET ARITHIGNORE setting controls whether the query returns error messages for arithmetic overflow or divide-by-zero errors.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: 07/21/2026
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "SET ARITHIGNORE"
  - "SET_ARITHIGNORE_TSQL"
  - "ARITHIGNORE"
  - "ARITHIGNORE_TSQL"
helpviewer_keywords:
  - "SET ARITHIGNORE statement"
  - "overflow errors [SQL Server]"
  - "ARITHIGNORE option"
  - "divide-by-zero errors"
dev_langs:
  - TSQL
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# SET ARITHIGNORE (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



The `SET ARITHIGNORE` setting controls whether the query returns error messages for arithmetic overflow or divide-by-zero errors. The `SET ARITHIGNORE ON` setting suppresses the messages "Division by zero occurred." or "Arithmetic overflow occurred."



## Syntax

#### Syntax for  SQL Server 
,  Azure SQL Database 
, Microsoft Fabric Data Warehouse
, SQL database in Microsoft Fabric


```syntaxsql

SET ARITHIGNORE { ON | OFF }
```

#### Syntax for  Azure Synapse Analytics 

```syntaxsql

SET ARITHIGNORE OFF
```

## Remarks

- If both `SET ARITHABORT` and `SET ANSI_WARNINGS` are `OFF` and an arithmetic error occurs, a warning message appears when `SET ARITHIGNORE` is `OFF`, and the result of the arithmetic operation is `NULL`.
- If both `SET ARITHABORT` and `SET ANSI_WARNINGS` are `OFF` and an arithmetic error occurs, a warning message does not appear if `SET ARITHIGNORE` is `ON`, and the result of the arithmetic operation is `NULL`.

The `ARITHIGNORE` setting only controls whether the query returns an error message. The SQL Database Engine returns `NULL` in a calculation involving an overflow or divide-by-zero error, regardless of this setting. This setting doesn't affect errors that occur during `INSERT`, `UPDATE`, and `DELETE` statements.

If either `SET ARITHABORT` or `SET ARITHIGNORE` is `OFF`, and `SET ANSI_WARNINGS` is `ON`, the query still returns an error message when it encounters divide-by-zero or overflow errors. When `ANSI_WARNINGS` is `ON` (the default), the setting of `ARITHABORT` has no functional effect.

The setting of `SET ARITHIGNORE` is set at execute or run time and not at parse time.

 This syntax is not supported by serverless SQL pool in Azure Synapse Analytics. 


## View current setting of ARITHIGNORE

To view the current setting of `ARITHIGNORE`, run the following T-SQL query.

```sql  
DECLARE @ARITHIGNORE VARCHAR(3) = 'OFF';  
IF ( (128 & @@OPTIONS) = 128 ) SET @ARITHIGNORE = 'ON';
SELECT @ARITHIGNORE AS ARITHIGNORE;  
```  

## Permissions

 Requires membership in the **public** role.  

## Examples

 The following example demonstrates using both `SET ARITHIGNORE` settings with both types of query errors: divide-by-zero and arithmetic overflow. 

```sql  
SET ARITHABORT OFF;  
SET ANSI_WARNINGS OFF  
GO  

PRINT 'Setting ARITHIGNORE ON';  
GO  
-- SET ARITHIGNORE ON and testing.  
SET ARITHIGNORE ON;  
GO  
SELECT 1 / 0 AS DivideByZero;  
GO  
SELECT CAST(256 AS TINYINT) AS Overflow;  
GO  

PRINT 'Setting ARITHIGNORE OFF';  
GO  
-- SET ARITHIGNORE OFF and testing.  
SET ARITHIGNORE OFF;  
GO  
SELECT 1 / 0 AS DivideByZero;  
GO  
SELECT CAST(256 AS TINYINT) AS Overflow;  
GO  
```

## Examples:  Azure Synapse Analytics 

The following example demonstrates divide-by-zero and the overflow errors. This example doesn't return an error message for these errors because `ARITHIGNORE` is `OFF`.    

```sql  
-- SET ARITHIGNORE OFF and testing.  
SET ARITHIGNORE OFF;  
SELECT 1 / 0 AS DivideByZero;  
SELECT CAST(256 AS TINYINT) AS Overflow;  
```  

## Related content

- [SET Statements (Transact-SQL)](set-statements-transact-sql.md)
- [SET ARITHABORT (Transact-SQL)](set-arithabort-transact-sql.md)
