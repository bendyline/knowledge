---
title: "TAN (Transact-SQL)"
description: "TAN (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/03/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "TAN_TSQL"
  - "TAN"
helpviewer_keywords:
  - "TAN function"
  - "tangent"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# TAN (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns the tangent of the input expression.  
  
 
  
## Syntax  
  
```syntaxsql
TAN ( float_expression )  
```  
  
## Arguments
 *float_expression*  
 Is an [expression](../language-elements/expressions-transact-sql.md) of type **float** or of a type that can be implicitly converted to **float**, interpreted as number of radians.  
  
## Return Types  
 **float**  
  
## Examples  
 The following example returns the tangent of `PI()/2`.  
  
```sql
SELECT TAN(PI()/2);  
```  
  
  Here's the result set. 
  
  
```  
----------------------  
1.6331778728383844E+16  
```  
  
## Examples:  Azure Synapse Analytics 
 The following example returns the tangent of .45.  
  
```sql
SELECT TAN(.45);  
```  
  
  Here's the result set. 
  
  
 ```
--------  
0.48
```  
  
## Related content

- [Mathematical functions (Transact-SQL)](mathematical-functions-transact-sql.md)
