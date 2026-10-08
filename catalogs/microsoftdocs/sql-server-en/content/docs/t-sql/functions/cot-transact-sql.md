---
title: "COT (Transact-SQL)"
description: "COT (Transact-SQL)"
author: markingmyname
ms.author: maghan
ms.date: "07/24/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "COT_TSQL"
  - "COT"
helpviewer_keywords:
  - "COT function"
  - "cotangent"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# COT (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



A mathematical function that returns the trigonometric cotangent of the specified angle - in radians - in the specified **float** expression.
  

  
## Syntax  
  
```syntaxsql
COT ( float_expression )  
```  
  
## Arguments
*float_expression*  
An [expression](../language-elements/expressions-transact-sql.md) of type **float**, or of a type that can implicitly convert to **float**.
  
## Return types
**float**
  
## Examples  
This example returns the `COT` value for the specific angle:
  
```sql
DECLARE @angle FLOAT;  
SET @angle = 124.1332;  
SELECT 'The COT of the angle is: ' + CONVERT(VARCHAR, COT(@angle));  
GO  
```  
  
 Here's the result set. 

  
```
The COT of the angle is: -0.040312                
  
(1 row(s) affected)  
```  
  
## Related content

- [Mathematical functions (Transact-SQL)](mathematical-functions-transact-sql.md)
