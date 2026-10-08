---
description: "Learn more about: Data Binding and LINQ to DataSet"
title: "Data Binding and LINQ to DataSet"
ms.date: "03/30/2017"
ms.assetid: 310bff4a-32dd-4f20-a271-6dbd82912631
---
# Data Binding and LINQ to DataSet

*Data binding* is the process that establishes a connection between the application UI and business logic. If the binding has the correct settings and the data provides the proper notifications, when the data changes its value, the elements that are bound to the data reflect changes automatically. The [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) is an in- memory representation of data that provides a consistent relational programming model, regardless of the source of the data it contains. The ADO.NET 2.0 [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) enables you to sort and filter the data stored in a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable). This functionality is often used in data-binding applications. By using a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView), you can expose the data in a table with different sort orders, and you can filter the data by row state or based on a filter expression. For more information about the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) object, see [DataViews](dataset-datatable-dataview/dataviews.md).  
  
 LINQ to DataSet allows developers to create complex, powerful queries over a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) by using Language-Integrated Query (LINQ). However, a LINQ to DataSet query returns an enumeration of [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) objects, which is not easily used in a binding scenario. To make binding easier, you can create a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) from a LINQ to DataSet query. This [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) uses the filtering and sorting specified in the query, but is better suited for data binding. LINQ to DataSet extends the functionality of the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) by providing LINQ expression-based filtering and sorting, which allows for much more complex and powerful filtering and sorting operations than string-based filtering and sorting.  
  
 Note that the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) represents the query itself and is not a view on top of the query. The [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is bound to a UI control, such as a [System.Windows.Forms.DataGrid](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGrid) or a [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView), providing a simple data binding model. A [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) can also be created from a [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable), providing a default view of that table.  
  
## In This Section  

 [Creating a DataView Object](creating-a-dataview-object-linq-to-dataset.md)  
 Provides information about creating a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView).  
  
 [Filtering with DataView](filtering-with-dataview-linq-to-dataset.md)  
 Describes how to filter with the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView).  
  
 [Sorting with DataView](sorting-with-dataview-linq-to-dataset.md)  
 Describes how to sort with the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView).  
  
 [Querying the DataRowView Collection in a DataView](querying-the-datarowview-collection-in-a-dataview.md)  
 Provides information about querying the [System.Data.DataRowView](https://learn.microsoft.com/search/?terms=System.Data.DataRowView) collection exposed by [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView).  
  
 [DataView Performance](dataview-performance.md)  
 Provides information about [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) and performance.  
  
 [How to: Bind a DataView Object to a Windows Forms DataGridView Control](how-to-bind-a-dataview-object-to-a-winforms-datagridview-control.md)  
 Describes how to bind a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) object to a [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView).  
  
## See also

- [Programming Guide](programming-guide-linq-to-dataset.md)
