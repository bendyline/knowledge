---
title: "STIsEmpty (geography Data Type)"
description: "STIsEmpty (geography Data Type)"
author: MladjoA
ms.author: mlandzic
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2024
f1_keywords:
  - "STIsEmpty_TSQL"
  - "STIsEmpty (geography Data Type)"
helpviewer_keywords:
  - "STIsEmpty method"
dev_langs:
  - "TSQL"
---
# STIsEmpty (geography Data Type)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns 1 if a **geography** instance is empty. Returns 0 if a **geography** instance is not empty.  
  
## Syntax  
  
```  
  
.STIsEmpty ( )  
```  
  
## Return Types
  SQL Server 
 return type: **bit**  
  
 CLR return type: **SqlBoolean**  
  
## Examples  
 The following example creates an empty `geography` instance and uses `STIsEmpty()` to verify that the instance is empty.  
  
```sql
DECLARE @g geography;  
SET @g = geography::STGeomFromText('POLYGON EMPTY', 4326);  
SELECT @g.STIsEmpty();  
```  
  
## Related content

- [OGC methods on geography instances](ogc-methods-on-geography-instances.md)
