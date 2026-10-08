---
title: "STIsRing (geometry Data Type)"
description: "STIsRing (geometry Data Type)"
author: MladjoA
ms.author: mlandzic
ms.date: "08/03/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "STIsRing_TSQL"
  - "STIsRing (geometry Data Type)"
helpviewer_keywords:
  - "STIsRing (geometry Data Type)"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# STIsRing (geometry Data Type)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns 1 if a **geometry** instance fulfills the following requirements:
-   It is a **LineString** instance.  
-   It is closed.  
-   It is simple.  
-   Returns 0 if the **LineString** instance does not meet the requirements.  

 For a **geometry** instance to be closed and simple, both [STIsClosed()](stisclosed-geometry-data-type.md) and [STIsSimple()](stissimple-geometry-data-type.md) must return 1 when invoked on the instance. To determine the instance type of a **geometry**, use [STGeometryType()](stgeometrytype-geometry-data-type.md).  
  
## Syntax  
  
```  
  
.STIsRing ( )  
```  
  
## Return Types
  SQL Server 
 return type: **bit**  
  
 CLR return type: **SqlBoolean**  
  
## Remarks  
 This method returns null if the instance is not a **LineString**.  
  
## Examples  
 The following example creates a `LineString` instance and uses `STIsRing()` to test whether the instance is a ring.  
  
```sql
DECLARE @g geometry;  
SET @g = geometry::STGeomFromText('LINESTRING(0 0, 2 2, 1 0, 0 0)', 0);  
SELECT @g.STIsRing();  
```  
  
## Related content

- [STIsClosed (geometry Data Type)](stisclosed-geometry-data-type.md)
- [STGeometryType (geometry Data Type)](stgeometrytype-geometry-data-type.md)
- [STIsSimple (geometry Data Type)](stissimple-geometry-data-type.md)
- [OGC methods on geometry instances](ogc-methods-on-geometry-instances.md)
