---
description: "Learn more about: Creating AutoIncrement Columns"
title: "Creating AutoIncrement Columns"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: cf09732a-ab54-4d98-89e2-4d0a1f28fbce
---
# Creating AutoIncrement Columns

To ensure unique column values, you can set the column values to increment automatically when new rows are added to the table. To create an auto-incrementing [System.Data.DataColumn](https://learn.microsoft.com/search/?terms=System.Data.DataColumn), set the [System.Data.DataColumn.AutoIncrement](https://learn.microsoft.com/search/?terms=System.Data.DataColumn.AutoIncrement) property of the column to **true**. The [System.Data.DataColumn](https://learn.microsoft.com/search/?terms=System.Data.DataColumn) then starts with the value defined in the [System.Data.DataColumn.AutoIncrementSeed](https://learn.microsoft.com/search/?terms=System.Data.DataColumn.AutoIncrementSeed) property, and with each row added the value of the `AutoIncrement` column increases by the value defined in the [System.Data.DataColumn.AutoIncrementStep](https://learn.microsoft.com/search/?terms=System.Data.DataColumn.AutoIncrementStep) property of the column.

 For `AutoIncrement` columns, we recommend that the [System.Data.DataColumn.ReadOnly](https://learn.microsoft.com/search/?terms=System.Data.DataColumn.ReadOnly) property of the `DataColumn` be set to **true**.

 The following example demonstrates how to create a column that starts with a value of 200 and adds incrementally in steps of 3.

```vb
Dim workColumn As DataColumn = workTable.Columns.Add( _
    "CustomerID", typeof(Int32))
workColumn.AutoIncrement = true
workColumn.AutoIncrementSeed = 200
workColumn.AutoIncrementStep = 3
```

```csharp
DataColumn workColumn = workTable.Columns.Add(
    "CustomerID", typeof(Int32));
workColumn.AutoIncrement = true;
workColumn.AutoIncrementSeed = 200;
workColumn.AutoIncrementStep = 3;
```

## See also

- [System.Data.DataColumn](https://learn.microsoft.com/search/?terms=System.Data.DataColumn)
- [DataTable Schema Definition](datatable-schema-definition.md)
- [DataTables](datatables.md)
- [ADO.NET Overview](../ado-net-overview.md)
