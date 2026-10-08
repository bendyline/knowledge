---
title: "EnvelopeAggregate (geometry Data Type)"
description: "EnvelopeAggregate (geometry Data Type)"
author: MladjoA
ms.author: mlandzic
ms.date: "08/03/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2024
helpviewer_keywords:
  - "EnvelopeAggregate method (geometry)"
dev_langs:
  - "TSQL"
---
# EnvelopeAggregate (geometry Data Type)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns a bounding box for a given set of **geometry** objects.
  
## Syntax  
  
```  
  
EnvelopeAggregate ( geometry_operand )  
```  
  
## Arguments
 *geometry_operand*  
 Is a **geometry** type table column that represents the set of **geometry** objects.  
  
## Return Types  
  SQL Server 
 return type: **geometry**  
  
## Exceptions  
 Throws a `FormatException` when there are input values that are not valid. See [STIsValid (geometry Data Type)](stisvalid-geometry-data-type.md)  
  
## Remarks  
 Method returns **null** when the input is empty or the input has different SRIDs. See [Spatial Reference Identifiers &#40;SRIDs&#41;](../../relational-databases/spatial/spatial-reference-identifiers-srids.md)  
  
 Method ignores **null** inputs.  
  
> **Note:**  
>  Method returns **null** if all inputted values are **null**.  
  
## Examples  
 The following example returns a bounding box for a set of objects in a table variable column.  
  
 ```sql
 -- Setup table variable for EnvelopeAggregate example 
DECLARE @Geom TABLE 
( 
shape geometry, 
shapeType nvarchar(50) 
) 
INSERT INTO @Geom(shape,shapeType) VALUES('CURVEPOLYGON(CIRCULARSTRING(2 3, 4 1, 6 3, 4 5, 2 3))', 'Circle'), 
('POLYGON((1 1, 4 1, 4 5, 1 5, 1 1))', 'Rectangle'); 
-- Perform EnvelopeAggregate on @Geom.shape column 
SELECT geometry::EnvelopeAggregate(shape).ToString() 
FROM @Geom;
```  
  
## Related content

- [Extended Static Geometry Methods](extended-static-geometry-methods.md)
