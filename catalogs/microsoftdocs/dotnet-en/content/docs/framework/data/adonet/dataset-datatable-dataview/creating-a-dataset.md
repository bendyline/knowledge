---
description: "Learn more about: Creating a DataSet"
title: "Creating a DataSet"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 57629d8f-393e-4677-8b83-29ffde27f5fc
---
# Creating a DataSet

You create an instance of a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) by calling the [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) constructor. Optionally specify a name argument. If you do not specify a name for the [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet), the name is set to "NewDataSet".

 You can also create a new [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) based on an existing [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet). The new [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) can be an exact copy of the existing [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet); a clone of the [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) that copies the relational structure or schema but that does not contain any of the data from the existing [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet); or a subset of the [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet), containing only the modified rows from the existing [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) using the [System.Data.DataSet.GetChanges*](https://learn.microsoft.com/search/?terms=System.Data.DataSet.GetChanges*) method. For more information, see [Copying DataSet Contents](copying-dataset-contents.md).

 The following code example demonstrates how to construct an instance of a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet).

```vb
Dim customerOrders As DataSet = New DataSet("CustomerOrders")
```

```csharp
DataSet customerOrders = new DataSet("CustomerOrders");
```

## See also

- [Populating a DataSet from a DataAdapter](../populating-a-dataset-from-a-dataadapter.md)
- [DataSets, DataTables, and DataViews](index.md)
- [ADO.NET Overview](../ado-net-overview.md)
