---
title: "STIntersects (geometry Data Type)"
description: "STIntersects (geometry Data Type)"
author: MladjoA
ms.author: mlandzic
ms.date: "08/03/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "STIntersects (geometry Data Type)"
  - "STIntersects_TSQL"
helpviewer_keywords:
  - "STIntersects (geometry Data Type)"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# STIntersects (geometry Data Type)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns 1 if a **geometry** instance intersects another **geometry** instance. Returns 0 if it does not.
  
## Syntax  
  
```  
  
.STIntersects ( other_geometry )  
```  
  
## Arguments
 *other_geometry*  
 Is another **geometry** instance to compare against the instance on which `STIntersects()` is invoked.  
  
## Return Types  
  SQL Server 
 return type: **bit**  
  
 CLR return type: **SqlBoolean**  
  
## Remarks  
 This method always returns null if the spatial reference IDs (SRIDs) of the **geometry** instances do not match.  
  
## Examples  
 The following example uses `STIntersects()` to determine if two `geometry` instances intersect each other.  
  
```  
DECLARE @g geometry;  
DECLARE @h geometry;  
SET @g = geometry::STGeomFromText('LINESTRING(0 2, 2 0, 4 2)', 0);  
SET @h = geometry::STGeomFromText('POINT(1 1)', 0);  
SELECT @g.STIntersects(@h);  
```  
  
## Related content

- [Spatial Indexes Overview](../../relational-databases/spatial/spatial-indexes-overview.md)
- [OGC methods on geometry instances](ogc-methods-on-geometry-instances.md)
