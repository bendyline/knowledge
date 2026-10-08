---
title: "DataSets"
description: Learn about DataSet, a memory-resident data representation that provides a consistent relational programming model regardless of the data source in ADO.NET.
ms.date: "03/30/2017"
ms.assetid: 82b641bb-6001-4512-bf1a-2830acdd92ab
---
# ADO.NET DataSets

The [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object is central to supporting disconnected, distributed data scenarios with ADO.NET. The `DataSet` is a memory-resident representation of data that provides a consistent relational programming model regardless of the data source. It can be used with multiple and differing data sources, with XML data, or to manage data local to the application. The `DataSet` represents a complete set of data, including related tables, constraints, and relationships among the tables. The following illustration shows the `DataSet` object model.

 ADO.Net graphic
DataSet Object Model

 The methods and objects in a `DataSet` are consistent with those in the relational database model.

 The `DataSet` can also persist and reload its contents as XML, and its schema as XML schema definition language (XSD) schema. For more information, see [Using XML in a DataSet](dataset-datatable-dataview/using-xml-in-a-dataset.md).

## The DataTableCollection

 An ADO.NET `DataSet` contains a collection of zero or more tables represented by [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) objects. The [System.Data.DataTableCollection](https://learn.microsoft.com/search/?terms=System.Data.DataTableCollection) contains all the `DataTable` objects in a **DataSet**.

 A `DataTable` is defined in the [System.Data](https://learn.microsoft.com/search/?terms=System.Data) namespace and represents a single table of memory-resident data. It contains a collection of columns represented by a [System.Data.DataColumnCollection](https://learn.microsoft.com/search/?terms=System.Data.DataColumnCollection), and constraints represented by a [System.Data.ConstraintCollection](https://learn.microsoft.com/search/?terms=System.Data.ConstraintCollection), which together define the schema of the table. A `DataTable` also contains a collection of rows represented by the [System.Data.DataRowCollection](https://learn.microsoft.com/search/?terms=System.Data.DataRowCollection), which contains the data in the table. Along with its current state, a [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) retains both its current and original versions to identify changes to the values stored in the row.

## The DataView Class

 A [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) enables you to create different views of the data stored in a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable), a capability that is often used in data-binding applications. Using a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView), you can expose the data in a table with different sort orders, and you can filter the data by row state or based on a filter expression. For more information, see [DataViews](dataset-datatable-dataview/dataviews.md).

## The DataRelationCollection

 A `DataSet` contains relationships in its [System.Data.DataRelationCollection](https://learn.microsoft.com/search/?terms=System.Data.DataRelationCollection) object. A relationship, represented by the [System.Data.DataRelation](https://learn.microsoft.com/search/?terms=System.Data.DataRelation) object, associates rows in one `DataTable` with rows in another **DataTable**. A relationship is analogous to a join path that might exist between primary and foreign key columns in a relational database. A `DataRelation` identifies matching columns in two tables of a **DataSet**.

 Relationships enable navigation from one table to another in a **DataSet**. The essential elements of a `DataRelation` are the name of the relationship, the name of the tables being related, and the related columns in each table. Relationships can be built with more than one column per table by specifying an array of [System.Data.DataColumn](https://learn.microsoft.com/search/?terms=System.Data.DataColumn) objects as the key columns. When you add a relationship to the [System.Data.DataRelationCollection](https://learn.microsoft.com/search/?terms=System.Data.DataRelationCollection), you can optionally add a `UniqueKeyConstraint` and a `ForeignKeyConstraint` to enforce integrity constraints when changes are made to related column values.

 For more information, see [Adding DataRelations](dataset-datatable-dataview/adding-datarelations.md).

## XML

 You can fill a `DataSet` from an XML stream or document. You can use the XML stream or document to supply to the `DataSet` either data, schema information, or both. The information supplied from the XML stream or document can be combined with existing data or schema information already present in the **DataSet**. For more information, see [Using XML in a DataSet](dataset-datatable-dataview/using-xml-in-a-dataset.md).

## ExtendedProperties

 The **DataSet**, **DataTable**, and `DataColumn` all have an `ExtendedProperties` property. `ExtendedProperties` is a `PropertyCollection` where you can place custom information, such as the SELECT statement that was used to generate the result set, or the time when the data was generated. The `ExtendedProperties` collection is persisted with the schema information for the **DataSet**.

## LINQ to DataSet

 LINQ to DataSet provides language-integrated querying capabilities for disconnected data stored in a DataSet. LINQ to DataSet uses standard LINQ syntax and provides compile-time syntax checking, static typing, and IntelliSense support when you are using the Visual Studio IDE.

 For more information, see [LINQ to DataSet](linq-to-dataset.md).

## See also

- [ADO.NET Overview](ado-net-overview.md)
- [DataSets, DataTables, and DataViews](dataset-datatable-dataview/index.md)
- [Retrieving and Modifying Data in ADO.NET](retrieving-and-modifying-data.md)
