---
description: "Learn more about: Creating a DataView Object (LINQ to DataSet)"
title: "Creating a DataView Object (LINQ to DataSet)"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 76057508-e12d-4779-a707-06a4c2568acf
---
# Creating a DataView Object (LINQ to DataSet)

There are two ways to create a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) in the LINQ to DataSet context. You can create a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) from a LINQ to DataSet query over a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable), or you can create it from a typed or un-typed [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable). In both cases, you create the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) by using one of the [System.Data.DataTableExtensions.AsDataView*](https://learn.microsoft.com/search/?terms=System.Data.DataTableExtensions.AsDataView*) extension methods; [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is not directly constructible in the LINQ to DataSet context.

 After the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) has been created, you can bind it to a UI control in a Windows forms application or an ASP.NET application, or change the filtering and sorting settings.

 [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) constructs an index, which significantly increases the performance of operations that can use the index, such as filtering and sorting. The index for a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is built both when the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is created and when any of the sorting or filtering information is modified. Creating a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) and then setting the sorting or filtering information later causes the index to be built at least twice: once when the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is created, and again when any of the sort or filter properties are modified.

 For more information about filtering and sorting with [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView), see [Filtering with DataView](filtering-with-dataview-linq-to-dataset.md) and [Sorting with DataView](sorting-with-dataview-linq-to-dataset.md).

## Creating DataView from a LINQ to DataSet Query

 A [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) object can be created from the results of a LINQ to DataSet query, where the results are a projection of [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) objects. The newly created [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) inherits the filtering and sorting information from the query it is created from.

> **Note:**
> In most cases, the expressions used for filtering and sorting should not have side effects and must be deterministic. Also, the expressions should not contain any logic that depend on a set number of executions, as the sorting and filtering operations may be executed any number of times.

 Creating a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) from a query that returns anonymous types or queries that perform join operations is not supported.

 Only the following query operators are supported in a query used to create [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView):

- [System.Data.EnumerableRowCollectionExtensions.Cast*](https://learn.microsoft.com/search/?terms=System.Data.EnumerableRowCollectionExtensions.Cast*)

- [System.Data.EnumerableRowCollectionExtensions.OrderBy*](https://learn.microsoft.com/search/?terms=System.Data.EnumerableRowCollectionExtensions.OrderBy*)

- [System.Data.EnumerableRowCollectionExtensions.OrderByDescending*](https://learn.microsoft.com/search/?terms=System.Data.EnumerableRowCollectionExtensions.OrderByDescending*)

- [System.Data.EnumerableRowCollectionExtensions.Select*](https://learn.microsoft.com/search/?terms=System.Data.EnumerableRowCollectionExtensions.Select*)

- [System.Data.EnumerableRowCollectionExtensions.ThenBy*](https://learn.microsoft.com/search/?terms=System.Data.EnumerableRowCollectionExtensions.ThenBy*)

- [System.Data.EnumerableRowCollectionExtensions.ThenByDescending*](https://learn.microsoft.com/search/?terms=System.Data.EnumerableRowCollectionExtensions.ThenByDescending*)

- [System.Data.EnumerableRowCollectionExtensions.Where*](https://learn.microsoft.com/search/?terms=System.Data.EnumerableRowCollectionExtensions.Where*)

 Note that when a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is created from a LINQ to DataSet query the [System.Data.EnumerableRowCollectionExtensions.Select*](https://learn.microsoft.com/search/?terms=System.Data.EnumerableRowCollectionExtensions.Select*) method must be the final method called in the query. This is shown in the following example, which creates a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) of online orders sorted by total due:

 [DP DataView Samples#CreateLDVFromQuery1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#createldvfromquery1)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#CreateLDVFromQuery1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#createldvfromquery1)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

 You can also use the string-based [System.Data.DataView.RowFilter*](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter*) and [System.Data.DataView.Sort](https://learn.microsoft.com/search/?terms=System.Data.DataView.Sort) properties to filter and sort a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) after it has been created from a query. Note that this will clear the sorting and filtering information inherited from the query. The following example creates a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) from a LINQ to DataSet query that filters by last names that start with 'S'. The string-based [System.Data.DataView.Sort](https://learn.microsoft.com/search/?terms=System.Data.DataView.Sort) property is set to sort on last names in ascending order and then first names in descending order:

 [DP DataView Samples#CreateLDVFromQueryStringSort (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#createldvfromquerystringsort)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#CreateLDVFromQueryStringSort (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#createldvfromquerystringsort)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

## Creating a DataView from a DataTable

 In addition to being created from a LINQ to DataSet query, a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) object can be created from a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) by using the [System.Data.DataTableExtensions.AsDataView*](https://learn.microsoft.com/search/?terms=System.Data.DataTableExtensions.AsDataView*) method.

 The following example creates a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) from the SalesOrderDetail table and sets it as the data source of a [System.Windows.Forms.BindingSource](https://learn.microsoft.com/search/?terms=System.Windows.Forms.BindingSource) object. This object acts as a proxy for a [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) control.

 [DP DataView Samples#CreateLDVFromTable (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#createldvfromtable)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#CreateLDVFromTable (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#createldvfromtable)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

 Filtering and sorting can be set on the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) after it has been created from a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable). The following example creates a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) from the Contact table and sets the [System.Data.DataView.Sort](https://learn.microsoft.com/search/?terms=System.Data.DataView.Sort) property to sort on last names in ascending order and then first names in descending order:

 [DP DataView Samples#LDVStringSort (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#ldvstringsort)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#LDVStringSort (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#ldvstringsort)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

 However, there is a performance loss that comes with setting the [System.Data.DataView.RowFilter*](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter*) or [System.Data.DataView.Sort](https://learn.microsoft.com/search/?terms=System.Data.DataView.Sort) property after the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) has been created from a query, because [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) constructs an index to support filtering and sorting operations. Setting the [System.Data.DataView.RowFilter*](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter*) or [System.Data.DataView.Sort](https://learn.microsoft.com/search/?terms=System.Data.DataView.Sort) property rebuilds the index for the data, adding overhead to your application and decreasing performance. When possible, it is better to specify the filtering and sorting information when you first create the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) and avoid modifying it afterwards.

## See also

- [Data Binding and LINQ to DataSet](data-binding-and-linq-to-dataset.md)
- [Filtering with DataView](filtering-with-dataview-linq-to-dataset.md)
- [Sorting with DataView](sorting-with-dataview-linq-to-dataset.md)
