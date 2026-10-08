---
description: "Learn more about: Creating Expression Columns"
title: "Creating Expression Columns"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 0af3bd64-92a2-4b47-ae62-f5df35f131a6
---
# Creating Expression Columns

You can define an expression for a column, enabling it to contain a value calculated from other column values in the same row or from the column values of multiple rows in the table. To define the expression to be evaluated, use the [System.Data.DataColumn.Expression](https://learn.microsoft.com/search/?terms=System.Data.DataColumn.Expression) property of the target column, and use the [System.Data.DataColumn.ColumnName](https://learn.microsoft.com/search/?terms=System.Data.DataColumn.ColumnName) property to refer to other columns in the expression. The [System.Data.DataColumn.DataType*](https://learn.microsoft.com/search/?terms=System.Data.DataColumn.DataType*) for the expression column must be appropriate for the value that the expression returns.

 The following table lists several possible uses for expression columns in a table.

| Expression type | Example |
| --- | --- |
| Comparison | "Total >= 500" |
| Computation | "UnitPrice * Quantity" |
| Aggregation | Sum(Price) |

 You can set the `Expression` property on an existing `DataColumn` object, or you can include the property as the third argument passed to the [System.Data.DataColumn](https://learn.microsoft.com/search/?terms=System.Data.DataColumn) constructor, as shown in the following example.

```vb
workTable.Columns.Add("Total",Type.GetType("System.Double"))
workTable.Columns.Add("SalesTax", Type.GetType("System.Double"), _
  "Total * 0.086")
```

```csharp
workTable.Columns.Add("Total", typeof(Double));
workTable.Columns.Add("SalesTax", typeof(Double), "Total * 0.086");
```

 Expressions can reference other expression columns; however, a circular reference, in which two expressions reference each other, will generate an exception. For rules about writing expressions, see the [System.Data.DataColumn.Expression](https://learn.microsoft.com/search/?terms=System.Data.DataColumn.Expression) property of the `DataColumn` class.

## See also

- [System.Data.DataColumn](https://learn.microsoft.com/search/?terms=System.Data.DataColumn)
- [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet)
- [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable)
- [DataTable Schema Definition](datatable-schema-definition.md)
- [DataTables](datatables.md)
- [ADO.NET Overview](../ado-net-overview.md)
