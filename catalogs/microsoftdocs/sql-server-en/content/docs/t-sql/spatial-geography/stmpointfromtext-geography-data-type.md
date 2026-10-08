---
title: "STMPointFromText (geography Data Type)"
description: "STMPointFromText (geography Data Type)"
author: MladjoA
ms.author: mlandzic
ms.date: "07/30/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2024
f1_keywords:
  - "STMPointFromText (geography Data Type)"
  - "STMPointFromText_TSQL"
helpviewer_keywords:
  - "STMPointFromText method"
dev_langs:
  - "TSQL"
---
# STMPointFromText (geography Data Type)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns a **geography** instance from an Open Geospatial Consortium (OGC) Well-Known Text (WKT) representation, augmented with any Z (elevation) and M (measure) values carried by the instance.
  
## Syntax  
  
```  
  
STMPointFromText ( 'multipoint_tagged_text', SRID )  
```  
  
## Arguments
 *multipoint_tagged_text*  
 Is the WKT representation of the **geographyMultiPoint** instance you wish to return. *multipoint_tagged_text* is an **nvarchar(max)** expression.  
  
 *SRID*  
 Is an **int** expression representing the spatial reference ID (SRID) of the **geographyMultiPoint** instance you wish to return.  
  
## Return Types  
  SQL Server 
 return type: **geography**  
  
 CLR return type: **SqlGeography**  
  
 OGC type: **MultiPoint**  
  
## Remarks  
 This method throws a **FormatException** if the input is not well-formatted.  
  
## Examples  
 The following example uses `STMPointFromText()` to create a `geography` instance.  
  
```sql
DECLARE @g geography;   
SET @g = geography::STMPointFromText('MULTIPOINT(-122.360 47.656, -122.343 47.656)', 4326);  
SELECT @g.ToString();  
```  
  
## Related content

- [OGC Static Geography Methods](ogc-static-geography-methods.md)
