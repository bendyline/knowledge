---
description: "Learn more about: Adding DataRelations"
title: "Adding DataRelations"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: a4a564fb-c1c4-4135-b6c2-b030e51195e4
---
# Adding DataRelations

In a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) with multiple [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) objects, you can use [System.Data.DataRelation](https://learn.microsoft.com/search/?terms=System.Data.DataRelation) objects to relate one table to another, to navigate through the tables, and to return child or parent rows from a related table.

 The arguments required to create a `DataRelation` are a name for the `DataRelation` being created, and an array of one or more [System.Data.DataColumn](https://learn.microsoft.com/search/?terms=System.Data.DataColumn) references to the columns that serve as the parent and child columns in the relationship. After you have created a **DataRelation**, you can use it to navigate between tables and to retrieve values.

 Adding a `DataRelation` to a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) adds, by default, a [System.Data.UniqueConstraint](https://learn.microsoft.com/search/?terms=System.Data.UniqueConstraint) to the parent table and a [System.Data.ForeignKeyConstraint](https://learn.microsoft.com/search/?terms=System.Data.ForeignKeyConstraint) to the child table. For more information about these default constraints, see [DataTable Constraints](datatable-constraints.md).

 The following code example creates a `DataRelation` using two [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) objects in a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet). Each [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) contains a column named **CustID**, which serves as a link between the two [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) objects. The example adds a single `DataRelation` to the `Relations` collection of the [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet). The first argument in the example specifies the name of the `DataRelation` being created. The second argument sets the parent `DataColumn` and the third argument sets the child **DataColumn**.

```vb
customerOrders.Relations.Add("CustOrders", _
  customerOrders.Tables("Customers").Columns("CustID"), _
  customerOrders.Tables("Orders").Columns("CustID"))
```

```csharp
customerOrders.Relations.Add("CustOrders",
  customerOrders.Tables["Customers"].Columns["CustID"],
  customerOrders.Tables["Orders"].Columns["CustID"]);
```

 A `DataRelation` also has a `Nested` property which, when set to **true**, causes the rows from the child table to be nested within the associated row from the parent table when written as XML elements using [System.Data.DataSet.WriteXml*](https://learn.microsoft.com/search/?terms=System.Data.DataSet.WriteXml*) . For more information, see [Using XML in a DataSet](using-xml-in-a-dataset.md).

## See also

- [DataSets, DataTables, and DataViews](index.md)
- [ADO.NET Overview](../ado-net-overview.md)
