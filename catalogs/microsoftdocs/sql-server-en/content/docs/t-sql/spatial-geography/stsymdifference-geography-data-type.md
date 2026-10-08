---
title: "STSymDifference (geography Data Type)"
description: "STSymDifference (geography Data Type)"
author: MladjoA
ms.author: mlandzic
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2024
f1_keywords:
  - "STSymDifference (geography Data Type)"
  - "STSymDifference_TSQL"
helpviewer_keywords:
  - "STSymDifference (geography Data Type)"
dev_langs:
  - "TSQL"
---
# STSymDifference (geography Data Type)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns an object that represents all points that are either in one **geography** instance or another **geography** instance, but not those points that lie in both instances.  
  
## Syntax  
  
```  
  
.STSymDifference ( other_geography )  
```  
  
## Arguments
 *other_geography*  
 Is another **geography** instance in addition to the instance on which STSymDistance() is being invoked.  
  
## Return Types  
  SQL Server 
 return type: **geography**  
  
 CLR return type: **SqlGeography**  
  
## Remarks  
 This method always returns null if the spatial reference identifiers (SRIDs) of the **geography** instances do not match.  
  
  SQL Server 
 supports spatial instances that are larger than a hemisphere. In  SQL Server 
, the set of possible results on the server has been extended to **FullGlobe** instances.  
  
 The result may contain circular arc segments only if the input instances contain circular arc segments.  
  
## Examples  
  
### A. Computing the symmetric difference of two polygons  
 The following example uses `STSymDifference()` to compute the symmetric difference of two `Polygon` instances.  
  
```sql
DECLARE @g geography;  
DECLARE @h geography;  
SET @g = geography::STGeomFromText('POLYGON((-122.358 47.653, -122.348 47.649, -122.348 47.658, -122.358 47.658, -122.358 47.653))', 4326);  
SET @h = geography::STGeomFromText('POLYGON((-122.351 47.656, -122.341 47.656, -122.341 47.661, -122.351 47.661, -122.351 47.656))', 4326);  
SELECT @g.STSymDifference(@h).ToString();  
```  
  
### B. Computing the symmetric difference with FullGlobe  
 The following example compares the symmetric difference of a `Polygon` with `FullGlobe`.  
  
```sql
 DECLARE @g geography = 'POLYGON((-122.358 47.653, -122.348 47.649, -122.348 47.658, -122.358 47.658, -122.358 47.653))';  
 SELECT @g.STSymDifference('FULLGLOBE').ToString();
```  
  
## Related content

- [OGC methods on geography instances](ogc-methods-on-geography-instances.md)
