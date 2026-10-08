---
description: "Learn more about: DataRows and DataRowViews"
title: "DataRows and DataRowViews"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 8f5eec26-b809-4aca-8778-7e202356d856
---
# DataRows and DataRowViews

A [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) exposes an enumerable collection of [System.Data.DataRowView](https://learn.microsoft.com/search/?terms=System.Data.DataRowView) objects. The `DataRowView` objects expose values as object arrays that are indexed by either the name or the ordinal reference of the column in the underlying table. You can access the [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) that is exposed by the `DataRowView` by using the [System.Data.DataRowView.Row](https://learn.microsoft.com/search/?terms=System.Data.DataRowView.Row) property of the **DataRowView**.

 When you view values by using a **DataRowView**, the [System.Data.DataView.RowStateFilter](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowStateFilter) property of the `DataView` determines which row version of the underlying `DataRow` is exposed. For information about accessing different row versions using a **DataRow**, see [Row States and Row Versions](row-states-and-row-versions.md).

 The following code example displays all the current and original values in a table.

```vb
Dim catView As DataView = New DataView(catDS.Tables("Categories"))
Console.WriteLine("Current Values:")
WriteView(catView)
Console.WriteLine("Original Values:")
catView.RowStateFilter = DataViewRowState.ModifiedOriginal
WriteView(catView)

Public Shared Sub WriteView(thisDataView As DataView)
  Dim rowView As DataRowView
  Dim i As Integer

  For Each rowView In thisDataView
    For i = 0 To thisDataView.Table.Columns.Count - 1
      Console.Write(rowView(i) & vbTab)
    Next
    Console.WriteLine()
  Next
End Sub
```

```csharp
DataView catView = new DataView(catDS.Tables["Categories"]);
Console.WriteLine("Current Values:");
WriteView(catView);
Console.WriteLine("Original Values:");
catView.RowStateFilter = DataViewRowState.ModifiedOriginal;
WriteView(catView);

public static void WriteView(DataView thisDataView)
{
  foreach (DataRowView rowView in thisDataView)
  {
    for (int i = 0; i < thisDataView.Table.Columns.Count; i++)
      Console.Write(rowView[i] + "\t");
    Console.WriteLine();
  }
}
```

## See also

- [System.Data.DataRowVersion](https://learn.microsoft.com/search/?terms=System.Data.DataRowVersion)
- [System.Data.DataViewRowState](https://learn.microsoft.com/search/?terms=System.Data.DataViewRowState)
- [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView)
- [System.Data.DataRowView](https://learn.microsoft.com/search/?terms=System.Data.DataRowView)
- [DataViews](dataviews.md)
- [ADO.NET Overview](../ado-net-overview.md)
