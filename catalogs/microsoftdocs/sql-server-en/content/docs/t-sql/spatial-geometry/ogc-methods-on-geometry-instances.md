---
title: "OGC methods on geometry instances"
description: "Reference for Open Geospatial Consortium (OGC) standard methods available on geometry instances in SQL Server, with descriptions and categories."
author: MladjoA
ms.author: mlandzic
ms.date: "02/05/2026"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "OGC Methods on Geometry Instances [SQL Server]"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
ai-usage: ai-assisted
---
# OGC methods on geometry instances

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



SQL Server's **geometry** data type implements methods defined by the Open Geospatial Consortium (OGC) Simple Features for SQL Specification version 1.1.0. These standardized methods ensure that spatial calculations conform to industry standards and work consistently with other geospatial applications.

The **geometry** data type represents data in a Euclidean (flat) coordinate system. Use OGC methods when you need standards-compliant spatial operations for planar data, such as calculating areas, distances, spatial relationships, and performing geometric transformations.

## OGC standards compliance

The OGC Simple Features specification defines a common architecture for geographic information and provides SQL implementation options for spatial data. SQL Server's geometry type conforms to these specifications, making it interoperable with other geospatial systems.

For more information on OGC specifications, see:

- [OGC Specifications, Simple Feature Access Part 1 - Common Architecture](https://go.microsoft.com/fwlink/?LinkId=93627)
- [OGC Specifications, Simple Feature Access Part 2 - SQL Options](https://go.microsoft.com/fwlink/?LinkId=93628)

## Shape properties

These methods return measurements and properties that describe the geometric shape.

| Method | Description |
| --- | --- |
| [STArea](starea-geometry-data-type.md) | Returns the total surface area of a geometry instance in square units based on its spatial reference identifier (SRID). |
| [STLength](stlength-geometry-data-type.md) | Returns the total length of elements in a geometry instance or all elements in a geometry collection. |
| [STBoundary](stboundary-geometry-data-type.md) | Returns the boundary of a geometry instance as a lower-dimensional geometry. |
| [STCentroid](stcentroid-geometry-data-type.md) | Returns the geometric center (centroid) of a geometry instance consisting of one or more polygons. |
| [STEnvelope](stenvelope-geometry-data-type.md) | Returns the minimum axis-aligned bounding rectangle (envelope) of a geometry instance. |
| [STConvexHull](stconvexhull-geometry-data-type.md) | Returns the convex hull of a geometry instance, representing the smallest convex polygon that contains all points. |

## Geometry representation

These methods convert geometry instances between different representation formats.

| Method | Description |
| --- | --- |
| [STAsBinary](stasbinary-geometry-data-type.md) | Returns the OGC Well-Known Binary (WKB) representation of a geometry instance. |
| [STAsText](stastext-geometry-data-type.md) | Returns the OGC Well-Known Text (WKT) representation of a geometry instance. |

## Geometry type information

These methods return information about the geometry type and characteristics.

| Method | Description |
| --- | --- |
| [STGeometryType](stgeometrytype-geometry-data-type.md) | Returns the OGC type name for a geometry instance (Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon, or GeometryCollection). |
| [STDimension](stdimension-geometry-data-type.md) | Returns the maximum dimension of a geometry instance: 0 for points, 1 for curves, or 2 for surfaces. |
| [STSrid](stsrid-geometry-data-type.md) | Returns the spatial reference identifier (SRID) of a geometry instance. |

## Point and curve access

These methods access specific points and curves within a geometry instance.

| Method | Description |
| --- | --- |
| [STStartPoint](ststartpoint-geometry-data-type.md) | Returns the start point of a geometry instance (for LineString types). |
| [STEndpoint](stendpoint-geometry-data-type.md) | Returns the endpoint of a geometry instance (for LineString types). |
| [STPointN](stpointn-geometry-data-type.md) | Returns a specified point from a geometry instance. |
| [STPointOnSurface](stpointonsurface-geometry-data-type.md) | Returns an arbitrary point guaranteed to be within a geometry instance. |
| [STCurveN (geometry Data Type)](stcurven-geometry-data-type.md) | Returns the specified curve from a geometry instance that's a LineString, CircularString, or CompoundCurve. |
| [STCurveToLine (geometry Data Type)](stcurvetoline-geometry-data-type.md) | Returns a polygonal approximation of a geometry instance containing circular arc segments. |
| [STX](stx-geometry-data-type.md) | Returns the X-coordinate of a Point instance. |
| [STY](sty-geometry-data-type.md) | Returns the Y-coordinate of a Point instance. |

## Polygon ring access

These methods access rings within polygon geometry instances.

| Method | Description |
| --- | --- |
| [STExteriorRing](stexteriorring-geometry-data-type.md) | Returns the exterior ring of a Polygon instance as a LineString. |
| [STInteriorRingN](stinteriorringn-geometry-data-type.md) | Returns the specified interior ring of a Polygon instance as a LineString. |
| [STNumInteriorRing](stnuminteriorring-geometry-data-type.md) | Returns the number of interior rings in a Polygon instance. |

## Collection access

These methods work with geometry collections and return information about their elements.

| Method | Description |
| --- | --- |
| [STGeometryN](stgeometryn-geometry-data-type.md) | Returns a specified geometry from a geometry collection. |
| [STNumGeometries](stnumgeometries-geometry-data-type.md) | Returns the number of geometries in a geometry collection. |
| [STNumPoints](stnumpoints-geometry-data-type.md) | Returns the total number of points in each figure of a geometry instance. |
| [STNumCurves (geometry Data Type)](stnumcurves-geometry-data-type.md) | Returns the number of curves in a one-dimensional geometry instance. |

## Spatial relationship tests

These methods test spatial relationships between geometry instances, returning 1 (true) or 0 (false).

| Method | Description |
| --- | --- |
| [STContains](stcontains-geometry-data-type.md) | Returns 1 if a geometry instance completely contains another instance. |
| [STCrosses](stcrosses-geometry-data-type.md) | Returns 1 if a geometry instance crosses another instance. |
| [STDisjoint](stdisjoint-geometry-data-type.md) | Returns 1 if a geometry instance is spatially disjoint from another instance (doesn't intersect). |
| [STEquals](stequals-geometry-data-type.md) | Returns 1 if a geometry instance represents the same point set as another instance. |
| [STIntersects](stintersects-geometry-data-type.md) | Returns 1 if a geometry instance intersects another instance. |
| [STOverlaps](stoverlaps-geometry-data-type.md) | Returns 1 if a geometry instance overlaps another instance (they intersect and neither contains the other). |
| [STRelate](strelate-geometry-data-type.md) | Returns 1 if a geometry instance is related to another instance based on a Dimensionally Extended 9 Intersection Model (DE-9IM) pattern. |
| [STTouches](sttouches-geometry-data-type.md) | Returns 1 if a geometry instance touches (shares boundary points but not interior points with) another instance. |
| [STWithin](stwithin-geometry-data-type.md) | Returns 1 if a geometry instance is completely within another instance. |
| [STDistance](stdistance-geometry-data-type.md) | Returns the shortest distance between a point in a geometry instance and a point in another instance. |

## Spatial operations

These methods create new geometry instances by performing spatial operations.

| Method | Description |
| --- | --- |
| [STBuffer](stbuffer-geometry-data-type.md) | Returns a geometry object representing all points within a specified distance from a geometry instance. |
| [STDifference](stdifference-geometry-data-type.md) | Returns a geometry representing the point set from one instance that doesn't lie within another instance. |
| [STIntersection](stintersection-geometry-data-type.md) | Returns a geometry representing the points where two geometry instances intersect. |
| [STSymDifference](stsymdifference-geometry-data-type.md) | Returns a geometry representing the points in either of two instances but not in both (symmetric difference). |
| [STUnion](stunion-geometry-data-type.md) | Returns a geometry representing the union (all points) of two geometry instances. |

## Validity tests

These methods test the validity and properties of geometry instances.

| Method | Description |
| --- | --- |
| [STIsClosed](stisclosed-geometry-data-type.md) | Returns 1 if the start and end points of a geometry instance are the same. |
| [STIsEmpty](stisempty-geometry-data-type.md) | Returns 1 if a geometry instance is empty. |
| [STIsRing](stisring-geometry-data-type.md) | Returns 1 if a geometry instance is closed and simple (doesn't intersect itself). |
| [STIsSimple](stissimple-geometry-data-type.md) | Returns 1 if a geometry instance is simple (doesn't intersect itself). |
| [STIsValid](stisvalid-geometry-data-type.md) | Returns 1 if a geometry instance is well-formed according to its OGC type. |

## Related content

- [Extended methods on geometry instances](extended-methods-on-geometry-instances.md)
- [OGC Static Geometry Methods](ogc-static-geometry-methods.md)
- [Extended Static Geometry Methods](extended-static-geometry-methods.md)
- [Spatial Data Types Overview](../../relational-databases/spatial/spatial-data-types-overview.md)
- [Create, construct, and query geometry instances](../../relational-databases/spatial/create-construct-and-query-geometry-instances.md)
