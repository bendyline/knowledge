---
description: "Learn more about: DataSet-Specific Operator Examples (LINQ to DataSet)"
title: "DataSet-Specific Operator Examples (LINQ to DataSet)"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 8fdd64af-6ad0-46cd-91c8-dbe26620eeb1
---
# DataSet-Specific Operator Examples (LINQ to DataSet)

The examples in this topic demonstrate how to use the [System.Data.DataTableExtensions.CopyToDataTable*](https://learn.microsoft.com/search/?terms=System.Data.DataTableExtensions.CopyToDataTable*) method and the [System.Data.DataRowComparer](https://learn.microsoft.com/search/?terms=System.Data.DataRowComparer) class.

 The `FillDataSet` method used in these examples is specified in [Loading Data Into a DataSet](loading-data-into-a-dataset.md).

 The examples in this topic use the Contact, Address, Product, SalesOrderHeader, and SalesOrderDetail tables in the AdventureWorks sample database.

 The examples in this topic use the following `using`/`Imports` statements:

 [DP LINQ to DataSet Examples#ImportsUsing (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#importsusing)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#ImportsUsing (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#importsusing)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

 For more information, see [How to: Create a LINQ to DataSet Project In Visual Studio](how-to-create-a-linq-to-dataset-project-in-vs.md).

## CopyToDataTable

### Example

 This example loads a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) with query results by using the [System.Data.DataTableExtensions.CopyToDataTable*](https://learn.microsoft.com/search/?terms=System.Data.DataTableExtensions.CopyToDataTable*) method.

 [DP LINQ to DataSet Examples#LoadDataTableWithQueryResults (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#loaddatatablewithqueryresults)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#LoadDataTableWithQueryResults (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#loaddatatablewithqueryresults)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## DataRowComparer

### Example

 This example compares two different data rows by using [System.Data.DataRowComparer](https://learn.microsoft.com/search/?terms=System.Data.DataRowComparer).

 [DP LINQ to DataSet Examples#CompareDifferentDataRows (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#comparedifferentdatarows)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)

## See also

- [Loading Data Into a DataSet](loading-data-into-a-dataset.md)
- [LINQ to DataSet Examples](linq-to-dataset-examples.md)
