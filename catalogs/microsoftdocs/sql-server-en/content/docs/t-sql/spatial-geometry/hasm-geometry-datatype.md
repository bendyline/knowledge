---
title: "HasM (geometry DataType)"
description: "HasM (geometry DataType)"
author: MladjoA
ms.author: mlandzic
ms.date: "05/05/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2024
helpviewer_keywords:
  - "HasM geometry"
dev_langs:
  - "TSQL"
---
# HasM (geometry DataType)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns 1 (true) if a spatial object contains at least one M value; otherwise, it returns 0 (false).  
  
## Syntax  
  
```  
  
.HasM  
```  
  
## Return Types
  SQL Server 
 return type: **bit**  
  
 CLR return type: **Boolean**  
  
## Remarks  
  
## Examples  
  
```sql  
DECLARE @p GEOMETRY = 'Point(1 1 1 1)'  
SELECT @p.HasM   
--Returns: 1 (true)  
```  
  
## Related content

- [Extended methods on geometry instances](extended-methods-on-geometry-instances.md)
- [M (geometry Data Type)](m-geometry-data-type.md)
