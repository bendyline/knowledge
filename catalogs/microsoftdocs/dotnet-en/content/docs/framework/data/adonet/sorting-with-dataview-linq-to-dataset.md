---
description: "Learn more about: Sorting with DataView (LINQ to DataSet)"
title: "Sorting with DataView (LINQ to DataSet)"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 885b3b7b-51c1-42b3-bb29-b925f4f69a6f
---
# Sorting with DataView (LINQ to DataSet)

The ability to sort data based on specific criteria and then present the data to a client through a UI control is an important aspect of data binding. [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) provides several ways to sort data and return data rows ordered by specific ordering criteria. In addition to its string-based sorting capabilities, [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) also enables you to use Language-Integrated Query (LINQ) expressions for the sorting criteria. LINQ expressions allow for much more complex and powerful sorting operations than string-based sorting. This topic describes both approaches to sorting using [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView).

## Creating DataView from a Query with Sorting Information

 A [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) object can be created from a LINQ to DataSet query. If that query contains an [System.Linq.Enumerable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderBy*), [System.Linq.Enumerable.OrderByDescending*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderByDescending*), [System.Linq.Enumerable.ThenBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ThenBy*), or [System.Linq.Enumerable.ThenByDescending*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ThenByDescending*) clause the expressions in these clauses are used as the basis for sorting the data in the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView). For example, if the query contains the `Order By…`and `Then By…` clauses, the resulting [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) would order the data by both columns specified.

 Expression-based sorting offers more powerful and complex sorting than the simpler string-based sorting. Note that string-based and expression-based sorting are mutually exclusive. If the string-based [System.Data.DataView.Sort](https://learn.microsoft.com/search/?terms=System.Data.DataView.Sort) is set after a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is created from a query, the expression-based filter inferred from the query is cleared and cannot be reset.

 The index for a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is built both when the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is created and when any of the sorting or filtering information is modified. You get the best performance by supplying sorting criteria in the LINQ to DataSet query that the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is created from and not modifying the sorting information, later. For more information, see [DataView Performance](dataview-performance.md).

> **Note:**
> In most cases, the expressions used for sorting should not have side effects and must be deterministic. Also, the expressions should not contain any logic that depends on a set number of executions, because the sorting operations might be executed any number of times.

### Example

 The following example queries the SalesOrderHeader table and orders the returned rows by the order date; creates a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) from that query; and binds the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) to a [System.Windows.Forms.BindingSource](https://learn.microsoft.com/search/?terms=System.Windows.Forms.BindingSource).

 [DP DataView Samples#CreateLDVFromQueryOrderBy (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#createldvfromqueryorderby)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#CreateLDVFromQueryOrderBy (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#createldvfromqueryorderby)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

### Example

 The following example queries the SalesOrderHeader table and orders the returned row by total amount due; creates a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) from that query; and binds the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) to a [System.Windows.Forms.BindingSource](https://learn.microsoft.com/search/?terms=System.Windows.Forms.BindingSource).

 [DP DataView Samples#CreateLDVFromQueryOrderBy2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#createldvfromqueryorderby2)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#CreateLDVFromQueryOrderBy2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#createldvfromqueryorderby2)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

### Example

 The following example queries the SalesOrderDetail table and orders the returned rows by order quantity and then by sales order ID; creates a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) from that query; and binds the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) to a [System.Windows.Forms.BindingSource](https://learn.microsoft.com/search/?terms=System.Windows.Forms.BindingSource).

 [DP DataView Samples#CreateLDVFromQueryOrderByThenBy (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#createldvfromqueryorderbythenby)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#CreateLDVFromQueryOrderByThenBy (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#createldvfromqueryorderbythenby)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

## Using the String-Based Sort Property

 The string-based sorting functionality of [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) still works with LINQ to DataSet. After a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) has been created from a LINQ to DataSet query, you can use the [System.Data.DataView.Sort](https://learn.microsoft.com/search/?terms=System.Data.DataView.Sort) property to set the sorting on the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView).

 The string-based and expression-based sorting functionality are mutually exclusive. Setting the [System.Data.DataView.Sort](https://learn.microsoft.com/search/?terms=System.Data.DataView.Sort) property will clear the expression-based sort inherited from the query that the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) was created from.

 For more information about string-based [System.Data.DataView.Sort](https://learn.microsoft.com/search/?terms=System.Data.DataView.Sort) filtering, see [Sorting and Filtering Data](dataset-datatable-dataview/sorting-and-filtering-data.md).

### Example

 The follow example creates a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) from the Contact table and sorts the rows by last name in descending order, then first name in ascending order:

 [DP DataView Samples#LDVStringSort (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#ldvstringsort)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#LDVStringSort (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#ldvstringsort)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

### Example

 The following example queries the Contact table for last names that start with the letter "S".  A [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is created from that query and bound to a [System.Windows.Forms.BindingSource](https://learn.microsoft.com/search/?terms=System.Windows.Forms.BindingSource) object.

 [DP DataView Samples#CreateLDVFromQueryStringSort (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#createldvfromquerystringsort)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#CreateLDVFromQueryStringSort (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#createldvfromquerystringsort)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

## Clearing the Sort

 The sorting information on a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) can be cleared after it has been set using the [System.Data.DataView.Sort](https://learn.microsoft.com/search/?terms=System.Data.DataView.Sort) property. There are two ways to clear the sorting information in [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView):

- Set the [System.Data.DataView.Sort](https://learn.microsoft.com/search/?terms=System.Data.DataView.Sort) property to `null`.

- Set the [System.Data.DataView.Sort](https://learn.microsoft.com/search/?terms=System.Data.DataView.Sort) property to an empty string.

### Example

 The following example creates a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) from a query and clears the sorting by setting the [System.Data.DataView.Sort](https://learn.microsoft.com/search/?terms=System.Data.DataView.Sort) property to an empty string:

 [DP DataView Samples#LDVClearSort (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#ldvclearsort)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#LDVClearSort (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#ldvclearsort)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

### Example

 The following example creates a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) from the Contact table and sets the [System.Data.DataView.Sort](https://learn.microsoft.com/search/?terms=System.Data.DataView.Sort) property to sort by last name in descending order. The sorting information is then cleared by setting the [System.Data.DataView.Sort](https://learn.microsoft.com/search/?terms=System.Data.DataView.Sort) property to `null`:

 [DP DataView Samples#LDVClearSort2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#ldvclearsort2)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#LDVClearSort2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#ldvclearsort2)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

## See also

- [Data Binding and LINQ to DataSet](data-binding-and-linq-to-dataset.md)
- [Filtering with DataView](filtering-with-dataview-linq-to-dataset.md)
- [Sorting Data](https://learn.microsoft.com/previous-versions/visualstudio/visual-studio-2013/bb546145\(v=vs.120\))
