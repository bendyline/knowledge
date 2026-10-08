---
description: "Learn more about: Single-Table Queries (LINQ to DataSet)"
title: "Single-Table Queries (LINQ to DataSet)"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 0b74bcf8-3f87-449f-bff7-6bcb0d69d212
---
# Single-Table Queries (LINQ to DataSet)

Language-Integrated Query (LINQ) queries work on data sources that implement the [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) interface or the [System.Linq.IQueryable`1](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%601) interface. The [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) class does not implement either interface, so you must call the [System.Data.DataTableExtensions.AsEnumerable*](https://learn.microsoft.com/search/?terms=System.Data.DataTableExtensions.AsEnumerable*) method if you want to use the [System.Data.DataTable](https://learn.microsoft.com/search/?terms=System.Data.DataTable) as a source in the `From` clause of a LINQ query.

 The following example gets all the online orders from the SalesOrderHeader table and outputs the order ID, order date, and order number to the console.

 [DP LINQ to DataSet Examples#Where1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#where1)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#Where1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#where1)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

 The local variable query is initialized with a query expression, which operates on one or more information sources by applying one or more query operators from either the standard query operators or, in the case of LINQ to DataSet, operators specific to the [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) class. The query expression in the previous example uses two of the standard query operators: `Where` and `Select`.

 The `Where` clause filters the sequence based on a condition, in this case that the `OnlineOrderFlag` is set to `true`. The `Select` operator allocates and returns an enumerable object that captures the arguments passed to the operator. In this above example, an anonymous type is created with three properties: `SalesOrderID`, `OrderDate`, and `SalesOrderNumber`. The values of these three properties are set to the values of the `SalesOrderID`, `OrderDate`, and `SalesOrderNumber` columns from the `SalesOrderHeader` table.

 The `foreach` loop then enumerates the enumerable object returned by `Select` and yields the query results. Because query is an [System.Linq.Enumerable](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable) type, which implements [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601), the evaluation of the query is deferred until the query variable is iterated over using the `foreach` loop. Deferred query evaluation allows queries to be kept as values that can be evaluated multiple times, each time yielding potentially different results.

 The [System.Data.DataRowExtensions.Field*](https://learn.microsoft.com/search/?terms=System.Data.DataRowExtensions.Field*) method provides access to the column values of a [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) and the [System.Data.DataRowExtensions.SetField*](https://learn.microsoft.com/search/?terms=System.Data.DataRowExtensions.SetField*) (not shown in the previous example) sets column values in a [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow). Both the [System.Data.DataRowExtensions.Field*](https://learn.microsoft.com/search/?terms=System.Data.DataRowExtensions.Field*) method and [System.Data.DataRowExtensions.SetField*](https://learn.microsoft.com/search/?terms=System.Data.DataRowExtensions.SetField*) method handle nullable value types, so you do not have to explicitly check for null values. Both methods are generic methods, also, which means you do not have to cast the return type. You could use the pre-existing column accessor in [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) (for example, `o["OrderDate"]`), but doing so would require you to cast the return object to the appropriate type.  If the column is a nullable value type you have to check if the value is null by using the [System.Data.DataRow.IsNull*](https://learn.microsoft.com/search/?terms=System.Data.DataRow.IsNull*) method. For more information, see [Generic Field and SetField Methods](generic-field-and-setfield-methods-linq-to-dataset.md).

 Note that the data type specified in the generic parameter `T` of the [System.Data.DataRowExtensions.Field*](https://learn.microsoft.com/search/?terms=System.Data.DataRowExtensions.Field*) method and [System.Data.DataRowExtensions.SetField*](https://learn.microsoft.com/search/?terms=System.Data.DataRowExtensions.SetField*) method must match the type of the underlying value or an [System.InvalidCastException](https://learn.microsoft.com/search/?terms=System.InvalidCastException) will be thrown. The specified column name must also match the name of a column in the [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) or an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) will be thrown. In both cases, the exception is thrown at runtime data enumeration when the query is executed.

## See also

- [Cross-Table Queries](cross-table-queries-linq-to-dataset.md)
- [Querying Typed DataSets](querying-typed-datasets.md)
- [Generic Field and SetField Methods](generic-field-and-setfield-methods-linq-to-dataset.md)
