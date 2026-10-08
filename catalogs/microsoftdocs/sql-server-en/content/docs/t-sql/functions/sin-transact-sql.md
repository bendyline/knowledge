---
title: "SIN (Transact-SQL)"
description: "SIN (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/03/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "SIN_TSQL"
  - "SIN"
helpviewer_keywords:
  - "SIN function"
  - "sine"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# SIN (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns the trigonometric sine of the specified angle, in radians, and in an approximate numeric, **float**, expression.  
  
 
  
## Syntax  
  
```syntaxsql
SIN ( float_expression )  
```  
  

## Arguments
 *float_expression*  
 Is an [expression](../language-elements/expressions-transact-sql.md) of type **float** or of a type that can be implicitly converted to float, in radians.
  
## Return Types  
 **float**  
  
## Examples  
 The following example calculates the SIN for a specified angle.  
  
```sql  
DECLARE @angle FLOAT;  
SET @angle = 45.175643;  
SELECT 'The SIN of the angle is: ' + CONVERT(VARCHAR, SIN(@angle));  
GO  
```  
  
  Here's the result set. 
  
  
```  
The SIN of the angle is: 0.929607                         
  
(1 row(s) affected)  
```  
  
## Examples:  Azure Synapse Analytics 
 The following example calculates the sine for a specified angle.  
  
```sql  
SELECT SIN(45.175643);  
```  
  
  Here's the result set. 
  
  
 ```
---------  
0.929607
```  
  
## Related content

- [Mathematical functions (Transact-SQL)](mathematical-functions-transact-sql.md)
