---
title: "PI (Transact-SQL)"
description: "PI (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/03/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "PI_TSQL"
  - "PI"
helpviewer_keywords:
  - "constant value of PI"
  - "PI function"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# PI (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns the constant value of PI.  
  
 
  
## Syntax  
  
```syntaxsql  
PI ( )  
```  
  
## Return Types
 **float**  
  
## Examples  
 The following example returns the value of `PI`.  
  
```sql  
SELECT PI();  
GO  
```  
  
  Here's the result set. 
  
  
```  
------------------------  
3.14159265358979  
  
(1 row(s) affected)  
```  
  
## Related content

- [Mathematical functions (Transact-SQL)](mathematical-functions-transact-sql.md)
