---
title: "SIGN (Transact-SQL)"
description: "SIGN (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/03/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "SIGN_TSQL"
  - "SIGN"
helpviewer_keywords:
  - "- (negative)"
  - "+ (positive sign)"
  - "zero (0)"
  - "SIGN function"
  - "positive values [SQL Server]"
  - "0 (zero)"
  - "negative values"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# SIGN (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns the positive (+1), zero (0), or negative (-1) sign of the specified expression.  
  
 
  
## Syntax  
  
```syntaxsql  
SIGN ( numeric_expression )  
```  
  

## Arguments
 *numeric_expression*  
 Is an [expression](../language-elements/expressions-transact-sql.md) of the exact numeric or approximate numeric data type category, except for the **bit** data type.  
  
## Return Types  
  
| Specified expression | Return type |
| --- | --- |
| **bigint** | **bigint** |
| **int/smallint/tinyint** | **int** |
| **money/smallmoney** | **money** |
| **numeric/decimal** | **numeric/decimal** |
| **Other types** | **float** |
  
## Examples  
 The following example returns the SIGN values of numbers from -1 to 1.  
  
```sql  
DECLARE @value REAL  
SET @value = -1  
WHILE @value < 2  
   BEGIN  
      SELECT SIGN(@value)  
      SET NOCOUNT ON  
      SELECT @value = @value + 1  
      SET NOCOUNT OFF  
   END  
SET NOCOUNT OFF  
GO  
```  
  
  Here's the result set. 
  
  
```  
(1 row(s) affected)  
  
------------------------   
-1.0                       
  
(1 row(s) affected)  
  
------------------------   
0.0                        
  
(1 row(s) affected)  
  
------------------------   
1.0                        
  
(1 row(s) affected)  
```  
  
## Examples:  Azure Synapse Analytics 
 The following example returns the SIGN values of three numbers.  
  
```sql  
SELECT SIGN(-125), SIGN(0), SIGN(564);  
```  
  
  Here's the result set. 
  
  
 ```
-----  -----  -----  
-1     0      1
```  
  
## Related content

- [Mathematical functions (Transact-SQL)](mathematical-functions-transact-sql.md)
