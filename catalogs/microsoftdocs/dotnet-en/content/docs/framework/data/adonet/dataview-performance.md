---
description: "Learn more about: DataView Performance"
title: "DataView Performance"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 90820e49-9d46-41f6-9a3d-6c0741bbd8eb
---
# DataView Performance

This topic discusses the performance benefits of using the [System.Data.DataView.Find*](https://learn.microsoft.com/search/?terms=System.Data.DataView.Find*) and [System.Data.DataView.FindRows*](https://learn.microsoft.com/search/?terms=System.Data.DataView.FindRows*) methods of the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) class, and of caching a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) in a Web application.

## Find and FindRows

 [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) constructs an index. An index contains keys built from one or more columns in the table or view. These keys are stored in a structure that enables the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) to find the row or rows associated with the key values quickly and efficiently. Operations that use the index, such as filtering and sorting, see significant performance increases. The index for a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is built both when the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is created and when any of the sorting or filtering information is modified. Creating a [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) and then setting the sorting or filtering information later causes the index to be built at least twice: once when the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is created, and again when any of the sort or filter properties are modified. For more information about filtering and sorting with [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView), see [Filtering with DataView](filtering-with-dataview-linq-to-dataset.md) and [Sorting with DataView](sorting-with-dataview-linq-to-dataset.md).

 If you want to return the results of a particular query on the data, as opposed to providing a dynamic view of a subset of the data, you can use the [System.Data.DataView.Find*](https://learn.microsoft.com/search/?terms=System.Data.DataView.Find*) or [System.Data.DataView.FindRows*](https://learn.microsoft.com/search/?terms=System.Data.DataView.FindRows*) methods of the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView), rather than setting the [System.Data.DataView.RowFilter](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter) property. The [System.Data.DataView.RowFilter](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter) property is best used in a data-bound application where a bound control displays filtered results. Setting the [System.Data.DataView.RowFilter](https://learn.microsoft.com/search/?terms=System.Data.DataView.RowFilter) property rebuilds the index for the data, adding overhead to your application and decreasing performance. The [System.Data.DataView.Find*](https://learn.microsoft.com/search/?terms=System.Data.DataView.Find*) and [System.Data.DataView.FindRows*](https://learn.microsoft.com/search/?terms=System.Data.DataView.FindRows*) methods use the current index without requiring the index to be rebuilt. If you are going to call [System.Data.DataView.Find*](https://learn.microsoft.com/search/?terms=System.Data.DataView.Find*) or [System.Data.DataView.FindRows*](https://learn.microsoft.com/search/?terms=System.Data.DataView.FindRows*) only once, then you should use the existing [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView). If you are going to call [System.Data.DataView.Find*](https://learn.microsoft.com/search/?terms=System.Data.DataView.Find*) or [System.Data.DataView.FindRows*](https://learn.microsoft.com/search/?terms=System.Data.DataView.FindRows*) multiple times, you should create a new [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) to rebuild the index on the column you want to search on, and then call the [System.Data.DataView.Find*](https://learn.microsoft.com/search/?terms=System.Data.DataView.Find*) or [System.Data.DataView.FindRows*](https://learn.microsoft.com/search/?terms=System.Data.DataView.FindRows*) methods. For more information about the [System.Data.DataView.Find*](https://learn.microsoft.com/search/?terms=System.Data.DataView.Find*) and [System.Data.DataView.FindRows*](https://learn.microsoft.com/search/?terms=System.Data.DataView.FindRows*) methods, see [Finding Rows](dataset-datatable-dataview/finding-rows.md).

 The following example uses the [System.Data.DataView.Find*](https://learn.microsoft.com/search/?terms=System.Data.DataView.Find*) method to find a contact with the last name "Zhu".

 [DP DataView Samples#LDVFromQueryOrderByFind (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#ldvfromqueryorderbyfind)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#LDVFromQueryOrderByFind (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#ldvfromqueryorderbyfind)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

 The following example uses the [System.Data.DataView.FindRows*](https://learn.microsoft.com/search/?terms=System.Data.DataView.FindRows*) method to find all the red colored products.

 [DP DataView Samples#LDVFromQueryFindRows (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs#ldvfromqueryfindrows)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP DataView Samples/CS/Form1.cs.md>)
 [DP DataView Samples#LDVFromQueryFindRows (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb#ldvfromqueryfindrows)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP DataView Samples/VB/Form1.vb.md>)

## ASP.NET

 ASP.NET has a caching mechanism that allows you to store objects that require extensive server resources to create in memory. Caching these types of resources can significantly improve the performance of your application. Caching is implemented by the [System.Web.Caching.Cache](https://learn.microsoft.com/search/?terms=System.Web.Caching.Cache) class, with cache instances that are private to each application. Because creating a new [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) object can be resource intensive, you might want to use this caching functionality in Web applications so that the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) does not have to be rebuilt every time the Web page is refreshed.

 In the following example, the [System.Data.DataView](https://learn.microsoft.com/search/?terms=System.Data.DataView) is cached so that the data does not have to be re-sorted when the page is refreshed.

```vb
If (Cache("ordersView") = Nothing) Then

Dim dataSet As New DataSet()

   FillDataSet(dataSet)

   Dim orders As DataTable = dataSet.Tables("SalesOrderHeader")

   Dim query = _
                    From order In orders.AsEnumerable() _
                    Where order.Field(Of Boolean)("OnlineOrderFlag") = True _
                    Order By order.Field(Of Decimal)("TotalDue") _
                    Select order

   Dim view As DataView = query.AsDataView()

   Cache.Insert("ordersView", view)

End If

Dim ordersView = CType(Cache("ordersView"), DataView)

GridView1.DataSource = ordersView
GridView1.DataBind()
```

```csharp
if (Cache["ordersView"] == null)
{
   // Fill the DataSet.
   DataSet dataSet = FillDataSet();

   DataTable orders = dataSet.Tables["SalesOrderHeader"];

   EnumerableRowCollection<DataRow> query =
                        from order in orders.AsEnumerable()
                        where order.Field<bool>("OnlineOrderFlag") == true
                        orderby order.Field<decimal>("TotalDue")
                        select order;

   DataView view = query.AsDataView();
   Cache.Insert("ordersView", view);
}

DataView ordersView = (DataView)Cache["ordersView"];

GridView1.DataSource = ordersView;
GridView1.DataBind();
```

## See also

- [Data Binding and LINQ to DataSet](data-binding-and-linq-to-dataset.md)
