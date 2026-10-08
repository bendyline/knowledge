---
title: "EnvelopeCenter (geography Data Type)"
description: "EnvelopeCenter (geography Data Type)"
author: MladjoA
ms.author: mlandzic
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "EnvelopeCenter"
  - "EnvelopeCenter_TSQL"
helpviewer_keywords:
  - "EnvelopeCenter method"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# EnvelopeCenter (geography Data Type)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns a point that you can use as the bounding circle's center for the **geography** instance.  
  
Each point in the instance is described as a vector. To figure out the bounding circle, the vector extends from the Earth's center to the point on the Earth's surface. The bounding circle's center point is calculated by averaging all of the vectors. For closed loops, either in a **Polygon** instance or a **LineString** instance, the first and last point is used only once.  
  
This **geography** data type method supports **FullGlobe** instances or spatial instances that are larger than a hemisphere.  
  
## Syntax  
  
```  
  
EnvelopeCenter( )  
```  
  
## Return Types
 SQL Server 
 return type: **geography**  
  
CLR return type: **SqlGeography**  
  
## Remarks  
This method returns a **point**. When used with `EnvelopeAngle()`, `EnvelopeCenter()` returns a bounding circle of a **geography** instance.  
  
> **Note:**  
>  `EnvelopeCenter()` returns a bounding circle for a **geography** instance, but the results are not guaranteed to produce the minimal bounding circle. In contrast, the **geometry** data type method `STEnvelope()` is guaranteed to return the minimum bounding box when it is applied to a **geometry** instance.  
  
In  SQL Server 2012 (11.x) 
 and higher, returns the center of the circle representing the envelope of this instance as a **point**. For all large objects as defined by `EnvelopeAngle()` = 180, `EnvelopeCenter()` will return (90,0).  
  
This method isn't precise.  
  
## Examples  
  
```sql
DECLARE @g geography = 'LINESTRING(-120 45, -120 0, -90 0)';  
SELECT @g.EnvelopeCenter().ToString();  
```  
  
## Related content

- [Extended methods on geography instances](extended-methods-on-geography-instances.md)
- [EnvelopeAngle (geography Data Type)](envelopeangle-geography-data-type.md)
