---
title: "Null (geography Data Type)"
description: "Null (geography Data Type)"
author: MladjoA
ms.author: mlandzic
ms.date: "07/30/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "Null (geography Data Type)"
helpviewer_keywords:
  - "Null (geography Data Type)"
  - "Null method"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Null (geography Data Type)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



A read-only property providing a null instance of the **geography** type.
  
## Syntax  
  
```  
  
Null  
```  

## Arguments
  
## Return Types  
  SQL Server 
 type: **geography**  
  
 CLR type: **SqlGeography**  
  
## Remarks  
  
## Examples  
 The following example retrieves a null `geography` instance.  
  
```sql
DECLARE @g geography;   
SET @g = geography::[Null];  
SELECT @g  
```  
  
## Related content

- [Extended Static Geography Methods](extended-static-geography-methods.md)
