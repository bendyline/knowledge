---
title: "STEnvelope (geometry Data Type)"
description: "STEnvelope (geometry Data Type)"
author: MladjoA
ms.author: mlandzic
ms.date: "08/03/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "STEnvelope_TSQL"
  - "STEnvelope (geometry Data Type)"
helpviewer_keywords:
  - "STEnvelope (geometry Data Type)"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# STEnvelope (geometry Data Type)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns the minimum axis-aligned bounding rectangle of the instance.
  
## Syntax  
  
```  
  
STEnvelope ( )  
```  
  
## Return Types
  SQL Server 
 return type: **geometry**  
  
 CLR return type: **SqlGeometry**  
  
## Examples  
 The following example uses `STGeomFromText()` to create a `LineString` instance from (0,0) to (2,3), and uses `STEnvelope()` to return the bounding box of the `LineString`.  
  
```  
DECLARE @g geometry;  
SET @g = geometry::STGeomFromText('LINESTRING(0 0, 2 3)', 0);  
SELECT @g.STEnvelope().ToString();  
```  
  
## Related content

- [OGC methods on geometry instances](ogc-methods-on-geometry-instances.md)
