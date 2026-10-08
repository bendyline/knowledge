---
title: "Adding a DataTable to a DataSet"
description: Refer to this example code to learn how to create DataTable objects and add them to an existing DataSet in ADO.NET.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 556d29a3-8fc9-4e38-b3ee-c188f7e7b155
---
# Adding a DataTable to a DataSet

ADO.NET enables you to create [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) objects and add them to an existing [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet). You can set constraint information for a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) by using the [System.Data.DataTable.PrimaryKey*](https://learn.microsoft.com/search/?terms=System.Data.DataTable.PrimaryKey*) and [System.Data.DataColumn.Unique](https://learn.microsoft.com/search/?terms=System.Data.DataColumn.Unique) properties.

## Example

 The following example constructs a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet), adds a new [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) object to the [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet), and then adds three [System.Data.DataColumn](https://learn.microsoft.com/search/?terms=System.Data.DataColumn) objects to the table. Finally, the code sets one column as the primary key column.

 [DataWorks Data.DataTableAdd#1 (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks Data.DataTableAdd/CS/source.cs#1)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks Data.DataTableAdd/CS/source.cs.md>)
 [DataWorks Data.DataTableAdd#1 (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks Data.DataTableAdd/VB/source.vb#1)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks Data.DataTableAdd/VB/source.vb.md>)

## Case Sensitivity

 Two or more tables or relations with the same name, but different casing, can exist in a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet). In such cases, references by name to tables and relations are case sensitive. For example, if the [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) `dataSet` contains tables **Table1** and **table1**, you would reference **Table1** by name as **dataSet.Tables["Table1"]**, and **table1** as **dataSet.Tables["table1"]**. Attempting to reference either of the tables as **dataSet.Tables["TABLE1"]** would generate an exception.

 The case-sensitivity behavior does not apply if only one table or relation has a particular name. For example, if the [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) has only **Table1**, you can reference it using **dataSet.Tables["TABLE1"]**.

> **Note:**
> The [System.Data.DataSet.CaseSensitive](https://learn.microsoft.com/search/?terms=System.Data.DataSet.CaseSensitive) property of the [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) does not affect this behavior. The [System.Data.DataSet.CaseSensitive](https://learn.microsoft.com/search/?terms=System.Data.DataSet.CaseSensitive) property applies to the data in the [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) and affects sorting, searching, filtering, enforcing constraints, and so on.

## Namespace Support

 In versions of ADO.NET earlier than 2.0, two tables could not have the same name, even if they were in different namespaces. This limitation was removed in ADO.NET 2.0. A [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) can contain two tables that have the same [System.Data.DataTable.TableName](https://learn.microsoft.com/search/?terms=System.Data.DataTable.TableName) property value but different [System.Data.DataTable.Namespace](https://learn.microsoft.com/search/?terms=System.Data.DataTable.Namespace) property values.

## See also

- [DataSets, DataTables, and DataViews](index.md)
- [ADO.NET Overview](../ado-net-overview.md)
