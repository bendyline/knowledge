---
title: "IIF (Transact-SQL)"
description: "The IIF logical function Returns one of two values, depending on whether the Boolean expression evaluates to true or false. "
author: markingmyname
ms.author: maghan
ms.date: "03/11/2022"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "IIF_TSQL"
  - "IIF"
helpviewer_keywords:
  - "IIF function"
dev_langs:
  - "TSQL"
---
# Logical Functions - IIF (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


  Returns one of two values, depending on whether the Boolean expression evaluates to true or false in  SQL Server 
.  
  
 
  
## Syntax  
  
```syntaxsql
IIF( boolean_expression, true_value, false_value )
```  
  
## Arguments

#### *boolean_expression*  
 A valid Boolean expression.  
  
 If this argument is not a boolean expression then a syntax error is raised.  
  
#### *true_value*  
 Value to return if *boolean_expression* evaluates to true.  
  
#### *false_value*  
 Value to return if *boolean_expression* evaluates to false.  
  
## Return Types  
 Returns the data type with the highest precedence from the types in *true_value* and *false_value*. For more information, see [Data Type Precedence (Transact-SQL)](../data-types/data-type-precedence-transact-sql.md).  
  
## Remarks  
 IIF is a shorthand way for writing a CASE expression. It evaluates the Boolean expression passed as the first argument, and then returns either of the other two arguments based on the result of the evaluation. That is, the *true_value* is returned if the Boolean expression is true, and the *false_value* is returned if the Boolean expression is false or unknown. *true_value* and *false_value* can be of any type. The same rules that apply to the CASE expression for Boolean expressions, null handling, and return types also apply to IIF. For more information, see [CASE (Transact-SQL)](../language-elements/case-transact-sql.md).  
  
 The fact that IIF is translated into CASE also has an impact on other aspects of the behavior of this function. Since CASE expressions can be nested only up to the level of 10, IIF statements can also be nested only up to the maximum level of 10. Also, IIF is remoted to other servers as a semantically equivalent CASE expression, with all the behaviors of a remoted CASE expression.  

 IIF is not supported in dedicated SQL pools in Azure Synapse Analytics.

## Examples  
  
### A. Simple IIF example  
  
```sql  
DECLARE @a INT = 45, @b INT = 40;
SELECT [Result] = IIF( @a > @b, 'TRUE', 'FALSE' );
```  
  
  Here's the result set. 
  
  
```  
Result  
--------  
TRUE  
```  
  
### B. IIF with NULL constants  
  
```sql 
SELECT [Result] = IIF( 45 > 30, NULL, NULL );
```  
  
 The result of this statement is an error.  
  
### C. IIF with NULL parameters  
  
```sql  
DECLARE @P INT = NULL, @S INT = NULL;  
SELECT [Result] = IIF( 45 > 30, @P, @S );
```  
  
  Here's the result set. 
  
  
```  
Result  
--------  
NULL  
```  
  
## Related content

- [CASE (Transact-SQL)](../language-elements/case-transact-sql.md)
- [Logical Functions - CHOOSE (Transact-SQL)](logical-functions-choose-transact-sql.md)
