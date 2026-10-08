---
title: "Adding Columns to a DataTable"
description: A DataTable contains DataColumn objects referenced by the Columns property of the table. Use this example code to add columns to a table in ADO.NET.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: e85c4a0e-4f3f-458c-b58b-0ddbc06bf974
---
# Adding Columns to a DataTable

A [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) contains a collection of [System.Data.DataColumn](https://learn.microsoft.com/search/?terms=System.Data.DataColumn) objects referenced by the `Columns` property of the table. This collection of columns, along with any constraints, defines the schema, or structure, of the table.

 You create `DataColumn` objects within a table by using the `DataColumn` constructor, or by calling the `Add` method of the `Columns` property of the table, which is a [System.Data.DataColumnCollection](https://learn.microsoft.com/search/?terms=System.Data.DataColumnCollection). The `Add` method accepts optional **ColumnName**, **DataType**, and `Expression` arguments and creates a new `DataColumn` as a member of the collection. It also accepts an existing `DataColumn` object and adds it to the collection, and returns a reference to the added `DataColumn` if requested. Because `DataTable` objects are not specific to any data source, .NET Framework types are used when specifying the data type of a **DataColumn**.

 The following example adds four columns to a **DataTable**.

```vb
Dim workTable As DataTable = New DataTable("Customers")

Dim workCol As DataColumn = workTable.Columns.Add( _
    "CustID", Type.GetType("System.Int32"))
workCol.AllowDBNull = false
workCol.Unique = true

workTable.Columns.Add("CustLName", Type.GetType("System.String"))
workTable.Columns.Add("CustFName", Type.GetType("System.String"))
workTable.Columns.Add("Purchases", Type.GetType("System.Double"))
```

```csharp
DataTable workTable = new DataTable("Customers");

DataColumn workCol = workTable.Columns.Add("CustID", typeof(Int32));
workCol.AllowDBNull = false;
workCol.Unique = true;

workTable.Columns.Add("CustLName", typeof(String));
workTable.Columns.Add("CustFName", typeof(String));
workTable.Columns.Add("Purchases", typeof(Double));
```

 In the example, notice that the properties for the `CustID` column are set to not allow `DBNull` values and to constrain values to be unique. However, if you define the `CustID` column as the primary key column of the table, the `AllowDBNull` property will automatically be set to `false` and the `Unique` property will automatically be set to **true**. For more information, see [Defining Primary Keys](defining-primary-keys.md).

> **Caution:**
> If a column name is not supplied for a column, the column is given an incremental default name of Column*N,* starting with "Column1", when it is added to the **DataColumnCollection**. We recommend that you avoid the naming convention of "Column*N*" when you supply a column name, because the name you supply may conflict with an existing default column name in the **DataColumnCollection**. If the supplied name already exists, an exception is thrown.

 If you are using [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement) as the [System.Data.DataColumn.DataType*](https://learn.microsoft.com/search/?terms=System.Data.DataColumn.DataType*) of a [System.Data.DataColumn](https://learn.microsoft.com/search/?terms=System.Data.DataColumn) in the [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable), XML serialization will not work when you read in data. For example, if you write out a [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) by using the `DataTable.WriteXml` method, upon serialization to XML there is an additional parent node in the [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement). To work around this problem, use the [System.Data.SqlTypes.SqlXml](https://learn.microsoft.com/search/?terms=System.Data.SqlTypes.SqlXml) type instead of [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement). `ReadXml` and `WriteXml` work correctly with [System.Data.SqlTypes.SqlXml](https://learn.microsoft.com/search/?terms=System.Data.SqlTypes.SqlXml).

## See also

- [System.Data.DataColumn](https://learn.microsoft.com/search/?terms=System.Data.DataColumn)
- [System.Data.DataColumnCollection](https://learn.microsoft.com/search/?terms=System.Data.DataColumnCollection)
- [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable)
- [DataTable Schema Definition](datatable-schema-definition.md)
- [DataTables](datatables.md)
- [ADO.NET Overview](../ado-net-overview.md)
