---
description: "Learn more about: Filtering with DataView (LINQ to DataSet)"
title: "Filtering with DataView (LINQ to DataSet)"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 5632d74a-ff53-4ea7-9fe7-4a148eeb1c68
---
# Filtering with DataView (LINQ to DataSet)

The ability to filter data using specific criteria and then present the data to a client through a UI control is an important aspect of data binding. [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) provides several ways to filter data and return subsets of data rows meeting specific filter criteria. In addition to the string-based filtering capabilities, [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) also provides the ability to use LINQ expressions for the filtering criteria. LINQ expressions allow for much more complex and powerful filtering operations than the string-based filtering.

 There are two ways to filter data using a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView):

- Create a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) from a LINQ to DataSet query with a Where clause.

- Use the existing, string-based filtering capabilities of [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView).

## Creating DataView from a Query with Filtering Information

 A [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) object can be created from a LINQ to DataSet query. If that query contains a `Where` clause, the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is created with the filtering information from the query. The expression in the `Where` clause is used to determine which data rows will be included in the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView), and is the basis for the filter.

 Expression-based filters offer more powerful and complex filtering than the simpler string-based filters. The string-based and expression-based filters are mutually exclusive. When the string-based [System.Data.DataView.RowFilter*](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter*) is set after a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is created from a query, the expression based filter inferred from the query is cleared.

> **Note:**
> In most cases, the expressions used for filtering should not have side effects and must be deterministic. Also, the expressions should not contain any logic that depends on a set number of executions, because the filtering operations might be executed any number of times.

### Example

 The following example queries the SalesOrderDetail table for orders with a quantity greater than 2 and less than 6; creates a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) from that query; and binds the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) to a [System.Windows.Forms.BindingSource](https://learn.microsoft.com/search/?terms=System.Windows.Forms.BindingSource):

 [DP DataView Samples#LDVFromQueryWhere (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#ldvfromquerywhere)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#LDVFromQueryWhere (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#ldvfromquerywhere)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

### Example

 The following example creates a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) from a query for orders placed after June 6, 2001:

 [DP DataView Samples#LDVFromQueryWhere3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#ldvfromquerywhere3)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#LDVFromQueryWhere3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#ldvfromquerywhere3)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

### Example

 Filtering can also be combined with sorting. The following example creates a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) from a query for contacts whose last name start with "S" and sorted by last name, then first name:

 [DP DataView Samples#LDVFromQueryWhereOrderByThenBy (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#ldvfromquerywhereorderbythenby)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#LDVFromQueryWhereOrderByThenBy (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#ldvfromquerywhereorderbythenby)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

### Example

 The following example uses the SoundEx algorithm to find contacts whose last name is similar to "Zhu". The SoundEx algorithm is implemented in the SoundEx method.

 [DP DataView Samples#LDVSoundExFilter (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#ldvsoundexfilter)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#LDVSoundExFilter (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#ldvsoundexfilter)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

 SoundEx is a phonetic algorithm used for indexing names by sound, as they are pronounced in English, originally developed by the U.S. Census Bureau. The SoundEx method returns a four character code for a name consisting of an English letter followed by three numbers. The letter is the first letter of the name and the numbers encode the remaining consonants in the name. Similar sounding names share the same SoundEx code. The SoundEx implementation used in the SoundEx method of the previous example is shown here:

 [DP DataView Samples#SoundEx (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#soundex)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#SoundEx (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#soundex)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

## Using the RowFilter Property

 The existing string-based filtering functionality of [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) still works in the LINQ to DataSet context. For more information about string-based [System.Data.DataView.RowFilter*](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter*) filtering, see [Sorting and Filtering Data](dataset-datatable-dataview/sorting-and-filtering-data.md).

 The following example creates a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) from the Contact table and then sets the [System.Data.DataView.RowFilter](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter) property to return rows where the contact's last name is "Zhu":

 [DP DataView Samples#LDVRowFilter (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#ldvrowfilter)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#LDVRowFilter (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#ldvrowfilter)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

 After a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) has been created from a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) or LINQ to DataSet query, you can use the [System.Data.DataView.RowFilter](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter) property to specify subsets of rows based on their column values. The string-based and expression-based filters are mutually exclusive. Setting the [System.Data.DataView.RowFilter](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter) property will clear the filter expression inferred from the LINQ to DataSet query, and the filter expression cannot be reset.

 [DP DataView Samples#LDVFromQueryWhereSetRowFilter (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#ldvfromquerywheresetrowfilter)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#LDVFromQueryWhereSetRowFilter (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#ldvfromquerywheresetrowfilter)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

 If you want to return the results of a particular query on the data, as opposed to providing a dynamic view of a subset of the data, you can use the [System.Data.DataView.Find*](https://learn.microsoft.com/search/?terms=System.Data.DataView.Find*) or [System.Data.DataView.FindRows*](https://learn.microsoft.com/search/?terms=System.Data.DataView.FindRows*) methods of the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView), rather than setting the [System.Data.DataView.RowFilter](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter) property. The [System.Data.DataView.RowFilter](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter) property is best used in a data-bound application where a bound control displays filtered results. Setting the [System.Data.DataView.RowFilter](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter) property rebuilds the index for the data, adding overhead to your application and decreasing performance. The [System.Data.DataView.Find*](https://learn.microsoft.com/search/?terms=System.Data.DataView.Find*) and [System.Data.DataView.FindRows*](https://learn.microsoft.com/search/?terms=System.Data.DataView.FindRows*) methods use the current index without requiring the index to be rebuilt. If you are going to call [System.Data.DataView.Find*](https://learn.microsoft.com/search/?terms=System.Data.DataView.Find*) or [System.Data.DataView.FindRows*](https://learn.microsoft.com/search/?terms=System.Data.DataView.FindRows*) only once, then you should use the existing [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView). If you are going to call [System.Data.DataView.Find*](https://learn.microsoft.com/search/?terms=System.Data.DataView.Find*) or [System.Data.DataView.FindRows*](https://learn.microsoft.com/search/?terms=System.Data.DataView.FindRows*) multiple times, you should create a new [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) to rebuild the index on the column you want to search on, and then call the [System.Data.DataView.Find*](https://learn.microsoft.com/search/?terms=System.Data.DataView.Find*) or [System.Data.DataView.FindRows*](https://learn.microsoft.com/search/?terms=System.Data.DataView.FindRows*) methods. For more information about the [System.Data.DataView.Find*](https://learn.microsoft.com/search/?terms=System.Data.DataView.Find*) and [System.Data.DataView.FindRows*](https://learn.microsoft.com/search/?terms=System.Data.DataView.FindRows*) methods see [Finding Rows](dataset-datatable-dataview/finding-rows.md) and [DataView Performance](dataview-performance.md).

## Clearing the Filter

 The filter on a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) can be cleared after filtering has been set using the [System.Data.DataView.RowFilter](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter) property. The filter on a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) can be cleared in two different ways:

- Set the [System.Data.DataView.RowFilter](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter) property to `null`.

- Set the [System.Data.DataView.RowFilter](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter) property to an empty string.

### Example

 The following example creates a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) from a query and then clears the filter by setting [System.Data.DataView.RowFilter](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter) property to `null`:

 [DP DataView Samples#LDVClearRowFilter2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#ldvclearrowfilter2)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#LDVClearRowFilter2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#ldvclearrowfilter2)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

### Example

 The following example creates a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) from a table sets the [System.Data.DataView.RowFilter](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter) property, and then clears the filter by setting the [System.Data.DataView.RowFilter](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter) property to an empty string:

 [DP DataView Samples#LDVClearRowFilter (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#ldvclearrowfilter)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#LDVClearRowFilter (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#ldvclearrowfilter)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

## See also

- [Data Binding and LINQ to DataSet](data-binding-and-linq-to-dataset.md)
- [Sorting with DataView](sorting-with-dataview-linq-to-dataset.md)
