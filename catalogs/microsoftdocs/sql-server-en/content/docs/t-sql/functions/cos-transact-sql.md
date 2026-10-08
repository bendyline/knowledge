---
title: "COS (Transact-SQL)"
description: "COS (Transact-SQL)"
author: markingmyname
ms.author: maghan
ms.date: "07/24/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "COS"
  - "COS_TSQL"
helpviewer_keywords:
  - "cosine"
  - "COS function"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# COS (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



A mathematical function that returns the trigonometric cosine of the specified angle - measured in radians - in the specified expression.
  

  
## Syntax  
  
```syntaxsql
COS ( float_expression )  
```  
  
## Arguments
*float_expression*  
An [expression](../language-elements/expressions-transact-sql.md) of type **float**.
  
## Return types
**float**
  
## Examples  
This example returns the `COS` value of the specified angle:
  
```sql
  DECLARE @angle FLOAT;  
SET @angle = 14.78;  
SELECT 'The COS of the angle is: ' + CONVERT(VARCHAR,COS(@angle));  
GO  
```  
  
 Here's the result set. 

  
```
The COS of the angle is: -0.599465                        
  
(1 row(s) affected)  
```  
  
 Azure Synapse Analytics 


This example returns the COS values of the specified angles:
  
```sql
SELECT COS(14.76) AS cosCalc1, COS(-0.1472738) AS cosCalc2;   
```  
  
 Here's the result set. 

  
```
cosCalc1  cosCalc2
--------  --------
-0.58     0.99
```
  
## Related content

- [Mathematical functions (Transact-SQL)](mathematical-functions-transact-sql.md)
