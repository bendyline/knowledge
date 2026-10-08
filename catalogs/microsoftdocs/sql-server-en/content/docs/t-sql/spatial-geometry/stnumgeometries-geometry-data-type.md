---
title: "STNumGeometries (geometry Data Type)"
description: "STNumGeometries (geometry Data Type)"
author: MladjoA
ms.author: mlandzic
ms.date: "08/03/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2024
f1_keywords:
  - "STNumGeometries (geometry Data Type)"
  - "STNumGeometries_TSQL"
helpviewer_keywords:
  - "STNumGeometries (geometry Data Type)"
dev_langs:
  - "TSQL"
---
# STNumGeometries (geometry Data Type)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns the number of geometries that comprise a **geometry** instance.
  
## Syntax  
  
```  
  
.STNumGeometries ( )  
```  
  
## Return Types
  SQL Server 
 return type: **int**  
  
 CLR return type: **SqlInt32**  
  
## Remarks  
 This method returns 1 if the **geometry** instance is not a **MultiPoint**, **MultiLineString**, **MultiPolygon**, or **GeometryCollection** instance, and 0 if the **geometry** instance is empty.  
  
> **Note:**  
>  If a **GeometryCollection** has nested empty elements, `STNumGeometries()` will not return 0. Though the elements in the **GeometryCollection** instance are empty, the instance itself is not an empty set.
