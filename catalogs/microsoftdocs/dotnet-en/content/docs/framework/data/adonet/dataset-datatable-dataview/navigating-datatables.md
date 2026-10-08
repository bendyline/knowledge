---
description: "Learn more about: Navigating DataTables"
title: "Navigating DataTables"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 202026a1-ec79-435e-b507-12a77f5011b2
---
# Navigating DataTables

The [System.Data.DataTableReader](https://learn.microsoft.com/search/?terms=System.Data.DataTableReader) obtains the contents of one or more [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) objects in the form of one or more read-only, forward-only result sets.

 A [System.Data.DataTableReader](https://learn.microsoft.com/search/?terms=System.Data.DataTableReader) may contain multiple result sets if it is created by using the [System.Data.DataSet.CreateDataReader*](https://learn.microsoft.com/search/?terms=System.Data.DataSet.CreateDataReader*) method. When there is more than one result set, the [System.Data.DataTableReader.NextResult*](https://learn.microsoft.com/search/?terms=System.Data.DataTableReader.NextResult*) method advances the cursor to the next result set. This is a forward-only process. It is not possible to return to a previous result set.

## Example

 In the following example, the `TestConstructor` method creates two [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) instances. In order to demonstrate this constructor for the [System.Data.DataTableReader](https://learn.microsoft.com/search/?terms=System.Data.DataTableReader) class, the sample creates a new `DataTableReader` based on an array that contains the two **DataTables**, and performs a simple operation, printing the contents from the first few columns to the console window.

 [DataWorks DataTableReader.NextResult#1 (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks DataTableReader.NextResult/CS/source.cs#1)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks DataTableReader.NextResult/CS/source.cs.md>)
 [DataWorks DataTableReader.NextResult#1 (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks DataTableReader.NextResult/VB/source.vb#1)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks DataTableReader.NextResult/VB/source.vb.md>)

## See also

- [DataTableReaders](datatablereaders.md)
- [ADO.NET Overview](../ado-net-overview.md)
