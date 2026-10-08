---
title: "Creating a DataTable From a Query (LINQ to DataSet)"
description: Learn to use the CopyToDataTable method to take the results of a query and copy the data into a DataTable, which can then be used for data binding.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 1b97afeb-03f8-41e2-8eb3-58aff65f7d18
---
# Creating a DataTable From a Query (LINQ to DataSet)

Data binding is a common use of [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) object. The [System.Data.DataTableExtensions.CopyToDataTable*](https://learn.microsoft.com/search/?terms=System.Data.DataTableExtensions.CopyToDataTable*) method takes the results of a query and copies the data into a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable), which can then be used for data binding. When the data operations have been performed, the new [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) is merged back into the source [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable).

 The [System.Data.DataTableExtensions.CopyToDataTable*](https://learn.microsoft.com/search/?terms=System.Data.DataTableExtensions.CopyToDataTable*) method uses the following process to create a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) from a query:

1. The [System.Data.DataTableExtensions.CopyToDataTable*](https://learn.microsoft.com/search/?terms=System.Data.DataTableExtensions.CopyToDataTable*) method clones a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) from the source table (a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) object that implements the [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601) interface). The [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable) source has generally originated from a LINQ to DataSet expression or method query.

2. The schema of the cloned [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) is built from the columns of the first enumerated [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) object in the source table and the name of the cloned table is the name of the source table with the word "query" appended to it.

3. For each row in the source table, the content of the row is copied into a new [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) object, which is then inserted into the cloned table. The [System.Data.DataRow.RowState*](https://learn.microsoft.com/search/?terms=System.Data.DataRow.RowState*) and [System.Data.DataRow.RowError](https://learn.microsoft.com/search/?terms=System.Data.DataRow.RowError) properties are preserved across the copy operation. An [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) is thrown if the [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) objects in the source are from different tables.

4. The cloned [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) is returned after all [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) objects in the input queryable table have been copied. If the source sequence does not contain any [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) objects, the method returns an empty [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable).

Calling the [System.Data.DataTableExtensions.CopyToDataTable*](https://learn.microsoft.com/search/?terms=System.Data.DataTableExtensions.CopyToDataTable*) method causes the query bound to the source table to execute.

 When the [System.Data.DataTableExtensions.CopyToDataTable*](https://learn.microsoft.com/search/?terms=System.Data.DataTableExtensions.CopyToDataTable*) method encounters either a null reference or nullable value type in a row in the source table, it replaces the value with [System.DBNull.Value](https://learn.microsoft.com/search/?terms=System.DBNull.Value). This way, null values are handled correctly in the returned [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable).

 Note: The [System.Data.DataTableExtensions.CopyToDataTable*](https://learn.microsoft.com/search/?terms=System.Data.DataTableExtensions.CopyToDataTable*) method accepts as input a query that can return rows from multiple [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) or [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) objects. The [System.Data.DataTableExtensions.CopyToDataTable*](https://learn.microsoft.com/search/?terms=System.Data.DataTableExtensions.CopyToDataTable*) method will copy the data but not the properties from the source [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) or [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) objects to the returned [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable). You will need to explicitly set the properties on the returned [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable), such as [System.Data.DataTable.Locale*](https://learn.microsoft.com/search/?terms=System.Data.DataTable.Locale*) and [System.Data.DataTable.TableName*](https://learn.microsoft.com/search/?terms=System.Data.DataTable.TableName*).

 The following example queries the SalesOrderHeader table for orders after August 8, 2001 and uses the [System.Data.DataTableExtensions.CopyToDataTable*](https://learn.microsoft.com/search/?terms=System.Data.DataTableExtensions.CopyToDataTable*) method to create a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) from that query. The [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) is then bound to a [System.Windows.Forms.BindingSource](https://learn.microsoft.com/search/?terms=System.Windows.Forms.BindingSource), which acts as proxy for a [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView).

 [DP LINQ to DataSet Examples#CopyToDataTable1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#copytodatatable1)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#CopyToDataTable1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#copytodatatable1)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## Creating a Custom CopyToDataTable\<T> Method

 The existing [System.Data.DataTableExtensions.CopyToDataTable*](https://learn.microsoft.com/search/?terms=System.Data.DataTableExtensions.CopyToDataTable*) methods only operate on an [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) source where the generic parameter `T` is of type [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow). Although this is useful, it does not allow tables to be created from a sequence of scalar types, from queries that return anonymous types, or from queries that perform table joins. For an example of how to implement two custom `CopyToDataTable` methods that load a table from a sequence of scalar or anonymous types, see [How to: Implement CopyToDataTable\<T> Where the Generic Type T Is Not a DataRow](implement-copytodatatable-where-type-not-a-datarow.md)s.

 The examples in this section use the following custom types:

 [DP Custom CopyToDataTable Examples#ItemClass (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/CS/Program.cs#itemclass)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/CS/Program.cs.md>)
 [DP Custom CopyToDataTable Examples#ItemClass (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/VB/Module1.vb#itemclass)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/VB/Module1.vb.md>)

### Example

 This example performs a join over the `SalesOrderHeader` and `SalesOrderDetail` tables to get online orders from the month of August and creates a table from the query.

 [DP Custom CopyToDataTable Examples#Join (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/CS/Program.cs#join)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/CS/Program.cs.md>)
 [DP Custom CopyToDataTable Examples#Join (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/VB/Module1.vb#join)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/VB/Module1.vb.md>)

### Example

 The following example queries a collection for items of price greater than $9.99 and creates a table from the query results.

 [DP Custom CopyToDataTable Examples#LoadItemsIntoTable (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/CS/Program.cs#loaditemsintotable)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/CS/Program.cs.md>)
 [DP Custom CopyToDataTable Examples#LoadItemsIntoTable (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/VB/Module1.vb#loaditemsintotable)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/VB/Module1.vb.md>)

### Example

 The following example queries a collection for items of price greater than 9.99 and projects the results. The returned sequence of anonymous types is loaded into an existing table.

 [DP Custom CopyToDataTable Examples#LoadItemsIntoExistingTable (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/CS/Program.cs#loaditemsintoexistingtable)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/CS/Program.cs.md>)
 [DP Custom CopyToDataTable Examples#LoadItemsIntoExistingTable (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/VB/Module1.vb#loaditemsintoexistingtable)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/VB/Module1.vb.md>)

### Example

 The following example queries a collection for items of price greater than $9.99 and projects the results. The returned sequence of anonymous types is loaded into an existing table. The table schema is automatically expanded because the `Book` and `Movies` types are derived from the `Item` type.

 [DP Custom CopyToDataTable Examples#LoadItemsExpandSchema (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/CS/Program.cs#loaditemsexpandschema)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/CS/Program.cs.md>)
 [DP Custom CopyToDataTable Examples#LoadItemsExpandSchema (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/VB/Module1.vb#loaditemsexpandschema)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/VB/Module1.vb.md>)

### Example

 The following example queries a collection for items of price greater than $9.99 and returns a sequence of [System.Double](https://learn.microsoft.com/search/?terms=System.Double), which is loaded into a new table.

 [DP Custom CopyToDataTable Examples#LoadScalarSequence (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/CS/Program.cs#loadscalarsequence)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/CS/Program.cs.md>)
 [DP Custom CopyToDataTable Examples#LoadScalarSequence (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/VB/Module1.vb#loadscalarsequence)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP Custom CopyToDataTable Examples/VB/Module1.vb.md>)

## See also

- [Programming Guide](programming-guide-linq-to-dataset.md)
- [Generic Field and SetField Methods](generic-field-and-setfield-methods-linq-to-dataset.md)
- [LINQ to DataSet Examples](linq-to-dataset-examples.md)
