---
description: "Learn more about: DataRow Deletion"
title: "DataRow Deletion"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: c34f531d-4b9b-4071-b2d7-342c402aa586
---
# DataRow Deletion

There are two methods you can use to delete a [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) object from a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) object: the `Remove` method of the [System.Data.DataRowCollection](https://learn.microsoft.com/search/?terms=System.Data.DataRowCollection) object, and the [System.Data.DataRow.Delete*](https://learn.microsoft.com/search/?terms=System.Data.DataRow.Delete*) method of the `DataRow` object. Whereas the [System.Data.DataRowCollection.Remove*](https://learn.microsoft.com/search/?terms=System.Data.DataRowCollection.Remove*) method deletes a `DataRow` from the **DataRowCollection**, the [System.Data.DataRow.Delete*](https://learn.microsoft.com/search/?terms=System.Data.DataRow.Delete*) method only marks the row for deletion. The actual removal occurs when the application calls the `AcceptChanges` method. By using [System.Data.DataRow.Delete*](https://learn.microsoft.com/search/?terms=System.Data.DataRow.Delete*), you can programmatically check which rows are marked for deletion before actually removing them. When a row is marked for deletion, its [System.Data.DataRow.RowState](https://learn.microsoft.com/search/?terms=System.Data.DataRow.RowState) property is set to [System.Data.DataRow.Delete*](https://learn.microsoft.com/search/?terms=System.Data.DataRow.Delete*).

 Neither [System.Data.DataRow.Delete*](https://learn.microsoft.com/search/?terms=System.Data.DataRow.Delete*) nor [System.Data.DataRowCollection.Remove*](https://learn.microsoft.com/search/?terms=System.Data.DataRowCollection.Remove*) should be called in a foreach loop while iterating through a [System.Data.DataRowCollection](https://learn.microsoft.com/search/?terms=System.Data.DataRowCollection) object. [System.Data.DataRow.Delete*](https://learn.microsoft.com/search/?terms=System.Data.DataRow.Delete*) nor [System.Data.DataRowCollection.Remove*](https://learn.microsoft.com/search/?terms=System.Data.DataRowCollection.Remove*) modify the state of the collection.

 When using a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) or `DataTable` in conjunction with a `DataAdapter` and a relational data source, use the `Delete` method of the `DataRow` to remove the row. The `Delete` method marks the row as `Deleted` in the `DataSet` or `DataTable` but does not remove it. Instead, when the `DataAdapter` encounters a row marked as **Deleted**, it executes its `DeleteCommand` method to delete the row at the data source. The row can then be permanently removed using the `AcceptChanges` method. If you use `Remove` to delete the row, the row is removed entirely from the table, but the `DataAdapter` will not delete the row at the data source.

 The `Remove` method of the `DataRowCollection` takes a `DataRow` as an argument and removes it from the collection, as shown in the following example.

```vb
workTable.Rows.Remove(workRow)
```

```csharp
workTable.Rows.Remove(workRow);
```

 In contrast, the following example demonstrates how to call the `Delete` method on a `DataRow` to change its `RowState` to **Deleted**.

```vb
workRow.Delete
```

```csharp
workRow.Delete();
```

 If a row is marked for deletion and you call the `AcceptChanges` method of the `DataTable` object, the row is removed from the **DataTable**. In contrast, if you call **RejectChanges**, the `RowState` of the row reverts to what it was before being marked as **Deleted**.

> **Note:**
> If the `RowState` of a `DataRow` is **Added**, meaning it has just been added to the table, and it is then marked as **Deleted**, it is removed from the table.

## See also

- [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow)
- [System.Data.DataRowCollection](https://learn.microsoft.com/search/?terms=System.Data.DataRowCollection)
- [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable)
- [Manipulating Data in a DataTable](manipulating-data-in-a-datatable.md)
- [ADO.NET Overview](../ado-net-overview.md)
