---
title: "ABS (Transact-SQL)"
description: "ABS (Transact-SQL)"
author: markingmyname
ms.author: maghan
ms.date: "07/24/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "ABS_TSQL"
  - "ABS"
helpviewer_keywords:
  - "values [SQL Server], positive"
  - "values [SQL Server], absolute"
  - "ABS function"
  - "absolute positive value"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---

# ABS (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



A mathematical function that returns the absolute (positive) value of the specified numeric expression. (`ABS` changes negative values to positive values. `ABS` has no effect on zero or positive values.)
  

  
## Syntax  
  
```syntaxsql
ABS ( numeric_expression )  
```  
  
## Arguments

*numeric_expression*  
An expression of the exact numeric or approximate numeric data type category.
  
## Return types


The return type depends on the input type of *numeric_expression*:
 
| Input type | Return type |
| --- | --- |
| **float**, **real** | **float** |
| **decimal(*p*, *s*)** | **decimal(38, *s*)** |
| **int**, **smallint**, **tinyint** | **int** |
| **bigint** | **bigint** |
| **money**, **smallmoney** | **money** |
| **bit** | **float** |

If the result does not fit in the return type, an arithmetic overflow error occurs.

## Examples

This example shows the results of using the `ABS` function on three different numbers.
  
```sql
SELECT ABS(-1.0), ABS(0.0), ABS(1.0);  
```  
  
 Here's the result set. 


```sql
---- ---- ----  
1.0  .0   1.0  
```  
  
The `ABS` function can produce an overflow error when the absolute value of a number exceeds the largest number that the specified data type can represent. For example, the `int` data type has a value range from `-2,147,483,648` to `2,147,483,647`. Computing the absolute value for the signed integer `-2,147,483,648` will cause an overflow error because its absolute value exceeds the positive range limit for the `int` data type.
  
```sql
DECLARE @i INT;  
SET @i = -2147483648;  
SELECT ABS(@i);  
GO  
```  
  
Returns this error message:
  
"Msg 8115, Level 16, State 2, Line 3"
  
"Arithmetic overflow error converting expression to data type int."

## Related content

- [CAST and CONVERT (Transact-SQL)](cast-and-convert-transact-sql.md)
- [Data types (Transact-SQL)](../data-types/data-types-transact-sql.md)
- [Mathematical functions (Transact-SQL)](mathematical-functions-transact-sql.md)
- [What are the SQL database functions?](functions.md)
