---
title: "AsGml (geometry Data Type)"
description: "AsGml (geometry Data Type)"
author: MladjoA
ms.author: mlandzic
ms.date: "08/03/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2024
f1_keywords:
  - "AsGml_(geometry_Data_Type)_TSQL"
  - "AsGml_(geometry Data Type)"
helpviewer_keywords:
  - "AsGml (geometry Data Type)"
dev_langs:
  - "TSQL"
---
# AsGml (geometry Data Type)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns the Geography Markup Language (GML) representation of a **geometry** instance.
  
For more information on Geography Markup Language, see the following Open Geospatial Consortium Specification:[OGC Specifications, Geography Markup Language](https://go.microsoft.com/fwlink/?LinkId=93629).
  
## Syntax  
  
```sql  
.AsGml ( )  
```  
  
## Return Types

 SQL Server 
 return type: **xml**  
  
CLR return type: **SqlXml**  
  
## Remarks  
  
## Examples

The following example creates a `LineString` instance and uses `AsGML()` to return the GML description of the instance.  
  
```sql
DECLARE @g geometry;  
SET @g = geometry::STGeomFromText('LINESTRING(0 0, 0 1, 1 0)', 0)  
SELECT @g.AsGml();  
```  
  
 This method returns the description as a `LineString` instance.  
  
```xml
<LineString xmlns="http://www.opengis.net/gml">  
<posList>0 0 0 1 1 0</posList></LineString>  
```  
  
## Related content

- [Extended methods on geometry instances](extended-methods-on-geometry-instances.md)
