---
description: "Learn more about: Creating a DataReader"
title: "Creating a DataReader"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 49d4422a-7464-4ab8-8ec7-90185fde3ecf
---
# Creating a DataReader

The [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) and [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) classes have a [System.Data.DataTable.CreateDataReader*](https://learn.microsoft.com/search/?terms=System.Data.DataTable.CreateDataReader*) method that returns the contents of the [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) or the contents of the [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object's [System.Data.DataSet.Tables*](https://learn.microsoft.com/search/?terms=System.Data.DataSet.Tables*) collection as one or more read-only, forward-only result sets.

## Example

 The following console application creates a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) instance. The example then passes the filled [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) to a procedure that calls the [System.Data.DataTable.CreateDataReader*](https://learn.microsoft.com/search/?terms=System.Data.DataTable.CreateDataReader*) method, which iterates through the results contained within the [System.Data.DataTableReader](https://learn.microsoft.com/search/?terms=System.Data.DataTableReader).

 [DataWorks DataTable.CreateDataReader#1 (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks DataTable.CreateDataReader/CS/source.cs#1)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks DataTable.CreateDataReader/CS/source.cs.md>)
 [DataWorks DataTable.CreateDataReader#1 (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks DataTable.CreateDataReader/VB/source.vb#1)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks DataTable.CreateDataReader/VB/source.vb.md>)

 The example displays the following output in the console window:

```output
1 Mary
2 Andy
3 Peter
4 Russ
```

## See also

- [System.Data.DataTable.CreateDataReader*](https://learn.microsoft.com/search/?terms=System.Data.DataTable.CreateDataReader*)
- [System.Data.DataSet.CreateDataReader*](https://learn.microsoft.com/search/?terms=System.Data.DataSet.CreateDataReader*)
- [DataTableReaders](datatablereaders.md)
- [ADO.NET Overview](../ado-net-overview.md)
