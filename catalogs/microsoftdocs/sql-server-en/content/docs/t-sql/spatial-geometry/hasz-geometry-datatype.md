---
title: "HasZ (geometry DataType)"
description: "HasZ (geometry DataType)"
author: MladjoA
ms.author: mlandzic
ms.date: "05/05/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2024
helpviewer_keywords:
  - "HasZ geometry"
dev_langs:
  - "TSQL"
---
# HasZ (geometry DataType)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns 1 (true) if a spatial object contains at least one Z value; otherwise, it returns 0 (false).  
  
## Syntax  
  
```  
  
.HasZ  
```  
  
## Return Types
  SQL Server 
 return type: **bit**  
  
 CLR return type: **Boolean**  
  
## Remarks  
  
## Examples  
  
```sql  
DECLARE @p GEOMETRY = 'Point(1 1 1 1)'  
SELECT @p.HasZ   
--Returns: 1 (true)  
```  
  
## Related content

- [Extended methods on geometry instances](extended-methods-on-geometry-instances.md)
- [Z (geometry Data Type)](z-geometry-data-type.md)
