---
title: "STEndPoint (geography Data Type)"
description: "STEndPoint (geography Data Type)"
author: MladjoA
ms.author: mlandzic
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2024
f1_keywords:
  - "STEndPoint (geography Data Type)"
  - "STEndPoint_TSQL"
helpviewer_keywords:
  - "STEndPoint method"
dev_langs:
  - "TSQL"
---
# STEndPoint (geography Data Type)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns the endpoint of a **geography** instance.  
  
## Syntax  
  
```  
  
.STEndPoint ( )  
```  
  
## Return Types
  SQL Server 
 return type: **geography**  
  
 CLR return type: **SqlGeography**  
  
 Open Geospatial Consortium (OGC) type: **Point**  
  
## Remarks  
 STEndPoint() is the equivalent of [STPointN](stpointn-geography-data-type.md)`(x.STNumPoints``())`.  
  
 This method returns null if called on an empty **geography** instance.  
  
## Examples  
 The following example creates a `LineString` instance with `STGeomFromText()` and uses `STEndPoint()` to retrieve the endpoint of the `LineString`.  
  
```sql
DECLARE @g geography;  
SET @g = geography::STGeomFromText('LINESTRING(-122.360 47.656, -122.343 47.656)', 4326);  
SELECT @g.STEndPoint().ToString();  
```  
  
## Related content

- [OGC methods on geography instances](ogc-methods-on-geography-instances.md)
