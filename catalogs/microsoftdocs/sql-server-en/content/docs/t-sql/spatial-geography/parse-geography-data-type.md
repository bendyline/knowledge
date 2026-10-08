---
title: "Parse (geography data type)"
description: Returns a geography instance from an Open Geospatial Consortium (OGC) Well-Known Text (WKT) representation.
author: MladjoA
ms.author: mlandzic
ms.reviewer: randolphwest
ms.date: 05/10/2024
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "Parse method"
  - "Parse (geography data type)"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Parse (geography data type)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns a **geography** instance from an Open Geospatial Consortium (OGC) Well-Known Text (WKT) representation. `Parse()` is equivalent to [STGeomFromText (geography Data Type)](stgeomfromtext-geography-data-type.md), except that it assumes a spatial reference ID (SRID) of 4326 as a parameter. The input might carry optional Z (elevation) and M (measure) values.

This **geography** data type method supports `FullGlobe` instances or spatial instances that are larger than a hemisphere.

## Syntax

```syntaxsql
Parse ( 'geography_tagged_text' )
```

## Arguments

#### *geography_tagged_text*

The WKT representation of the **geography** instance to return. *geography_tagged_text* is **nvarchar(max)**.

## Return types

-  SQL Server 
 return type: **geography**
- CLR return type: `SqlGeography`

## Remarks

The OGC type of the **geography** instance returned by `Parse()` is set to the corresponding WKT input.

The string 'Null' is interpreted as a null **geography** instance.

This method throws `ArgumentException` if the input contains an antipodal edge.

## Examples

The following example uses `Parse()` to create a **geography** instance.

```sql
DECLARE @g geography;
-- Starting point: Lat. 47.656, Lon. -122.360
-- Ending point: Lat. 47.656, Lon. -122.343
SET @g = geography::Parse('LINESTRING(-122.360 47.656, -122.343 47.656)');
SELECT @g.ToString();
```

## Related content

- [Extended Static Geography Methods](extended-static-geography-methods.md)
- [STGeomFromText (geography data type)](stgeomfromtext-geography-data-type.md)
