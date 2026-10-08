---
title: "POWER (Transact-SQL)"
description: "POWER (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/13/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "POWER_TSQL"
  - "POWER"
helpviewer_keywords:
  - "POWER function"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# POWER (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns the value of the specified expression to the specified power.  
  
 
  
## Syntax  
  
```syntaxsql  
POWER ( float_expression , y )  
```  
  
## Arguments
 *float_expression*  
 Is an [expression](../language-elements/expressions-transact-sql.md) of type **float** or of a type that can be implicitly converted to **float**.  
  
 *y*  
 Is the power to which to raise *float_expression*. *y* can be an expression of the exact numeric or approximate numeric data type category, except for the **bit** data type.  
  
## Return Types  
 The return type depends on the input type of *float_expression*:
 
| Input type | Return type |
| --- | --- |
| **float**, **real** | **float** |
| **decimal(*p*, *s*)** | **decimal(38, *s*)** |
| **int**, **smallint**, **tinyint** | **int** |
| **bigint** | **bigint** |
| **money**, **smallmoney** | **money** |
| **bit**, **char**, **nchar**, **varchar**, **nvarchar** | **float** |
 
If the result does not fit in the return type, an arithmetic overflow error occurs.
  
## Examples  
  
### A. Using POWER to return the cube of a number  
 The following example demonstrates raising a number to the power of 3 (the cube of the number).  
  
```sql  
DECLARE @input1 FLOAT;  
DECLARE @input2 FLOAT;  
SET @input1= 2;  
SET @input2 = 2.5;  
SELECT POWER(@input1, 3) AS Result1, POWER(@input2, 3) AS Result2;  
```  
  
  Here's the result set. 
  
  
```  
Result1                Result2  
---------------------- ----------------------  
8                      15.625  
  
(1 row(s) affected)  
```  
  
### B. Using POWER to show results of data type conversion  
 The following example shows how the *float_expression* preserves the data type which can return unexpected results.  
  
```sql 
SELECT   
POWER(CAST(2.0 AS FLOAT), -100.0) AS FloatResult,  
POWER(2, -100.0) AS IntegerResult,  
POWER(CAST(2.0 AS INT), -100.0) AS IntegerResult,  
POWER(2.0, -100.0) AS Decimal1Result,  
POWER(2.00, -100.0) AS Decimal2Result,  
POWER(CAST(2.0 AS DECIMAL(5,2)), -100.0) AS Decimal2Result;  
GO  
```  
  
  Here's the result set. 
  
  
```  
FloatResult            IntegerResult IntegerResult Decimal1Result Decimal2Result Decimal2Result  
---------------------- ------------- ------------- -------------- -------------- --------------  
7.88860905221012E-31   0             0             0.0            0.00           0.00  
```  
  
### C. Using POWER  
 The following example returns `POWER` results for `2`.  
  
```sql  
DECLARE @value INT, @counter INT;  
SET @value = 2;  
SET @counter = 1;  
  
WHILE @counter < 5  
   BEGIN  
      SELECT POWER(@value, @counter)  
      SET NOCOUNT ON  
      SET @counter = @counter + 1  
      SET NOCOUNT OFF  
   END;  
GO  
```  
  
  Here's the result set. 
  
  
```  
-----------   
2             
  
(1 row(s) affected)  
  
-----------   
4             
  
(1 row(s) affected)  
  
-----------   
8             
  
(1 row(s) affected)  
  
-----------   
16            
  
(1 row(s) affected)  
```  
  
## Examples:  Azure Synapse Analytics 
  
### D: Using POWER to return the cube of a number  
 The following example shows returns `POWER` results for `2.0` to the 3rd power.  
  
```sql  
SELECT POWER(2.0, 3);  
```  
  
  Here's the result set. 
  
  
 ```
------------ 
8.0
```  
  
## Related content

- [decimal and numeric (Transact-SQL)](../data-types/decimal-and-numeric-transact-sql.md)
- [float and real (Transact-SQL)](../data-types/float-and-real-transact-sql.md)
- [int, bigint, smallint, and tinyint (Transact-SQL)](../data-types/int-bigint-smallint-and-tinyint-transact-sql.md)
- [Mathematical functions (Transact-SQL)](mathematical-functions-transact-sql.md)
- [money and smallmoney (Transact-SQL)](../data-types/money-and-smallmoney-transact-sql.md)
