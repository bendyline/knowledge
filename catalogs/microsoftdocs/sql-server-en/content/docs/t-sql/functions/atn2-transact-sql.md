---
title: "ATN2 (Transact-SQL)"
description: "ATN2 (Transact-SQL)"
author: markingmyname
ms.author: maghan
ms.date: "07/24/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "ATN2"
  - "ATN2_TSQL"
helpviewer_keywords:
  - "arctangent"
  - "tangent"
  - "ATN2 function"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# ATN2 (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns the angle, in radians, between the positive x-axis and the ray from the origin to the point (y, x), where x and y are the values of the two specified float expressions.
  

  
## Syntax  
  
```syntaxsql
ATN2 ( float_expression , float_expression )  
```  
  
## Arguments
*float_expression*  
An [expression](../language-elements/expressions-transact-sql.md) of data type **float**.
  
## Return types
**float**
  
## Examples  
The following example calculates the `ATN2` for the specified `x` and `y` components.
  
```sql
DECLARE @x FLOAT = 35.175643, @y FLOAT = 129.44;  
SELECT 'The ATN2 of the angle is: ' + CONVERT(VARCHAR, ATN2(@y, @x));  
GO  
```  
  
 Here's the result set. 

  
```
The ATN2 of the angle is: 1.30545                         
(1 row(s) affected)  
```  
  
## Related content

- [CAST and CONVERT (Transact-SQL)](cast-and-convert-transact-sql.md)
- [float and real (Transact-SQL)](../data-types/float-and-real-transact-sql.md)
- [Mathematical functions (Transact-SQL)](mathematical-functions-transact-sql.md)
