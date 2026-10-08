---
title: "EXP (Transact-SQL)"
description: "EXP (Transact-SQL)"
author: markingmyname
ms.author: maghan
ms.date: "03/06/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "EXP_TSQL"
  - "EXP"
helpviewer_keywords:
  - "exponential functions"
  - "EXP function"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# EXP (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns the exponential value of the specified **float** expression.  
  
 
  
## Syntax  
  
```syntaxsql
EXP ( float_expression )  
```  
  
## Arguments
 *float_expression*  
 Is an [expression](../language-elements/expressions-transact-sql.md) of type **float** or of a type that can be implicitly converted to **float**.  
  
## Return Types  
 **float**  
  
## Remarks  
 The constant **e** (2.718281...), is the base of natural logarithms.  
  
 The exponent of a number is the constant **e** raised to the power of the number. For example EXP(1.0) = e^1.0 = 2.71828182845905 and EXP(10) = e^10 = 22026.4657948067.  
  
 The exponential of the natural logarithm of a number is the number itself: EXP (LOG (*n*)) = *n*. And the natural logarithm of the exponential of a number is the number itself: LOG (EXP (*n*)) = *n*.  
  
## Examples  
  
### A. Finding the exponent of a number  
 The following example declares a variable and returns the exponential value of the specified variable (`10`) with a text description.  
  
```sql  
DECLARE @var FLOAT  
SET @var = 10  
SELECT 'The EXP of the variable is: ' + CONVERT(VARCHAR, EXP(@var))  
GO  
```  
  
  Here's the result set. 
  
  
```  
----------------------------------------------------------  
The EXP of the variable is: 22026.5  
(1 row(s) affected)  
```  
  
### B. Finding exponentials and natural logarithms  
 The following example returns the exponential value of the natural logarithm of `20` and the natural logarithm of the exponential of `20`. Because these functions are inverse functions of one another, the return value in both cases is `20`.  
  
```sql  
SELECT EXP(LOG(20)), LOG(EXP(20))  
GO  
```  
  
  Here's the result set. 
  
  
```  
---------------------- ----------------------  
20                     20  
  
(1 row(s) affected)  
```  
  
## Examples:  Azure Synapse Analytics 
  
### C. Finding the exponent of a number  
 The following example returns the exponential value of the specified value (`10`).  
  
```sql  
SELECT EXP(10);  
```  
  
  Here's the result set. 
  
  
```  
----------  
22026.4657948067  
```  
  
### D. Finding exponential values and natural logarithms  
 The following example returns the exponential value of the natural logarithm of `20` and the natural logarithm of the exponential of `20`. Because these functions are inverse functions of one another, the return value in both cases is `20`.  
  
```sql  
SELECT EXP( LOG(20)), LOG( EXP(20));  
```  
  
  Here's the result set. 
  
  
```  
-------------- -----------------  
20                  20  
```  
  
## Related content

- [Mathematical functions (Transact-SQL)](mathematical-functions-transact-sql.md)
- [LOG (Transact-SQL)](log-transact-sql.md)
- [LOG10 (Transact-SQL)](log10-transact-sql.md)
