---
title: "Extended methods on geometry instances"
description: "Reference for SQL Server-specific extended methods on geometry instances, providing additional functionality beyond OGC standard methods."
author: MladjoA
ms.author: mlandzic
ms.date: "02/05/2026"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2024
helpviewer_keywords:
  - "Extended Methods on Geometry Instances [SQLServer]"
dev_langs:
  - "TSQL"
ai-usage: ai-assisted
---
# Extended methods on geometry instances

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



SQL Server supports extended methods on **geometry** instances that go beyond the Open Geospatial Consortium (OGC) standard methods. These extended methods provide additional functionality for working with planar geometric data, including Z (elevation) and M (measure) values, precise buffer operations, simplified representations, and enhanced WKT/WKB formats.

## Extended methods vs. OGC methods

While OGC methods provide standardized spatial operations defined by the OpenGIS specification, extended methods offer SQL Server-specific enhancements:

- **OGC methods**: Standardized operations for interoperability with other geospatial systems. Use when standards compliance is required.
- **Extended methods**: SQL Server-specific operations that provide additional functionality, performance optimizations, or support for features not covered by OGC standards (such as circular arcs, Z/M values, and advanced buffer control).

For most spatial tasks, OGC methods provide the necessary functionality. Use extended methods when you need the extra capabilities they provide.

## Enhanced representation formats

These methods provide alternative formats for representing geometry data, including support for Z (elevation) and M (measure) values.

| Method | Description |
| --- | --- |
| [AsBinaryZM (geometry DataType)](asbinaryzm-geometry-datatype.md) | Returns the OGC Well-Known Binary (WKB) representation augmented with Z (elevation) and M (measure) values. |
| [AsTextZM (geometry Data Type)](astextzm-geometry-data-type.md) | Returns the OGC Well-Known Text (WKT) representation augmented with Z (elevation) and M (measure) values. |
| [AsGml (geometry Data Type)](asgml-geometry-data-type.md) | Returns the Geography Markup Language (GML) representation of a geometry instance. |
| [ToString (geometry Data Type)](tostring-geometry-data-type.md) | Returns the string representation of a geometry instance augmented with Z and M values. |

## Z and M coordinate access

These methods access the Z (elevation) and M (measure) values of geometry instances, supporting 3D and 4D spatial data.

| Method | Description |
| --- | --- |
| [Z (geometry Data Type)](z-geometry-data-type.md) | Returns the Z (elevation) value of a geometry instance. Null if not defined. |
| [M (geometry Data Type)](m-geometry-data-type.md) | Returns the M (measure) value of a geometry instance. Null if not defined. |
| [HasZ (geometry DataType)](hasz-geometry-datatype.md) | Returns 1 if a geometry instance contains at least one point with a Z value. |
| [HasM (geometry DataType)](hasm-geometry-datatype.md) | Returns 1 if a geometry instance contains at least one point with an M value. |

## Advanced buffer operations

These methods provide more control over buffer calculations than the standard OGC STBuffer method.

| Method | Description |
| --- | --- |
| [BufferWithTolerance (geometry Data Type)](bufferwithtolerance-geometry-data-type.md) | Returns a geometric object representing all points within a specified distance from a geometry instance, with explicit tolerance control for precision. |
| [BufferWithCurves (geometry Data Type)](bufferwithcurves-geometry-data-type.md) | Returns a geometry instance representing all points within a specified distance, preserving circular arc segments in the result. |

## Geometry simplification

These methods create simplified versions of geometry instances, useful for performance optimization and visualization at different scales.

| Method | Description |
| --- | --- |
| [Reduce (geometry Data Type)](reduce-geometry-data-type.md) | Returns a simplified approximation of a geometry instance produced by running the Douglas-Peucker algorithm with the specified tolerance. |
| [CurveToLineWithTolerance (geometry Data Type)](curvetolinewithtolerance-geometry-data-type.md) | Returns a polygonal approximation of a geometry instance containing circular arc segments, with explicit tolerance control. |

## Spatial relationship queries

These methods perform advanced spatial relationship queries.

| Method | Description |
| --- | --- |
| [ShortestLineTo (geography Data Type)](../spatial-geography/shortestlineto-geography-data-type.md) | Returns a LineString instance with two points representing the shortest distance between the two geometry instances. |

## Validity and type checking

These methods provide detailed validity checking and type information.

| Method | Description |
| --- | --- |
| [IsValidDetailed (geometry DataType)](isvaliddetailed-geometry-datatype.md) | Returns a message that helps identify problems with an invalid geometry instance. |
| [MakeValid (geometry Data Type)](makevalid-geometry-data-type.md) | Converts an invalid geometry instance into a valid instance with a valid OGC type. |
| [InstanceOf (geometry Data Type)](instanceof-geometry-data-type.md) | Returns 1 if a geometry instance is of the specified type. |
| [IsNull (geometry Data Type)](isnull-geometry-data-type.md) | Returns 1 if a geometry instance is null. |

## Spatial operations

These methods perform spatial operations with enhanced capabilities.

| Method | Description |
| --- | --- |
| [Filter (geometry Data Type)](filter-geometry-data-type.md) | Offers a fast, index-only intersection method to determine if a geometry instance intersects another instance. |

## Version compatibility

These methods provide information about SQL Server version compatibility.

| Method | Description |
| --- | --- |
| [MinDbCompatibilityLevel (geometry Data Type)](mindbcompatibilitylevel-geometry-data-type.md) | Returns the minimum database compatibility level that recognizes the geometry data type. |

## Related content

- [OGC methods on geometry instances](ogc-methods-on-geometry-instances.md)
- [OGC Static Geometry Methods](ogc-static-geometry-methods.md)
- [Extended Static Geometry Methods](extended-static-geometry-methods.md)
- [Spatial Data Types Overview](../../relational-databases/spatial/spatial-data-types-overview.md)
- [Create, construct, and query geometry instances](../../relational-databases/spatial/create-construct-and-query-geometry-instances.md)
