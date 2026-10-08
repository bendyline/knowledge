---
description: "Learn more about: Query Expression Syntax Examples: Projection  (LINQ to DataSet)"
title: "Query Expression Syntax Examples: Projection  (LINQ to DataSet)"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 48c9f5ed-76bf-4228-ab10-5217bbb295a3
---
# Query Expression Syntax Examples: Projection  (LINQ to DataSet)

The examples in this topic demonstrate how to use the [System.Linq.Enumerable.Select*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Select*) and [System.Linq.Enumerable.SelectMany*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SelectMany*) methods to query a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) using the query expression syntax.

 The `FillDataSet` method used in these examples is specified in [Loading Data Into a DataSet](loading-data-into-a-dataset.md).

 The examples in this topic use the Contact, Address, Product, SalesOrderHeader, and SalesOrderDetail tables in the AdventureWorks sample database.

 The examples in this topic use the following `using`/`Imports` statements:

 [DP LINQ to DataSet Examples#ImportsUsing (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#importsusing)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#ImportsUsing (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#importsusing)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

 For more information, see [How to: Create a LINQ to DataSet Project In Visual Studio](how-to-create-a-linq-to-dataset-project-in-vs.md).

## Select

### Example

 This example uses the [System.Linq.Enumerable.Select*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Select*) method to return all the rows from the `Product` table and display the product names.

 [DP LINQ to DataSet Examples#SelectSimple1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#selectsimple1)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#SelectSimple1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#selectsimple1)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

### Example

 This example uses [System.Linq.Enumerable.Select*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Select*) to return a sequence of only product names.

 [DP LINQ to DataSet Examples#SelectSimple2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#selectsimple2)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#SelectSimple2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#selectsimple2)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## SelectMany

### Example

 This example uses `From …, …` (the equivalent of the [System.Linq.Enumerable.SelectMany*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SelectMany*) method) to select all orders where `TotalDue` is less than 500.00.

 [DP LINQ to DataSet Examples#SelectManyCompoundFrom (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#selectmanycompoundfrom)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#SelectManyCompoundFrom (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#selectmanycompoundfrom)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

### Example

 This example uses `From …, …` (the equivalent of the [System.Linq.Enumerable.SelectMany*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SelectMany*) method) to select all orders where the order was made on October 1, 2002 or later.

 [DP LINQ to DataSet Examples#SelectManyCompoundFrom2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#selectmanycompoundfrom2)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#SelectManyCompoundFrom2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#selectmanycompoundfrom2)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

### Example

 This example uses a `From …, …` (the equivalent of the [System.Linq.Enumerable.SelectMany*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SelectMany*) method) to select all orders where the order total is greater than 10000.00 and uses `From` assignment to avoid requesting the total twice.

 [DP LINQ to DataSet Examples#SelectManyFromAssignment (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#selectmanyfromassignment)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#SelectManyFromAssignment (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#selectmanyfromassignment)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## See also

- [Loading Data Into a DataSet](loading-data-into-a-dataset.md)
- [LINQ to DataSet Examples](linq-to-dataset-examples.md)
- [Standard Query Operators Overview (C#)](../../../csharp/linq/standard-query-operators/index.md)
- [Standard Query Operators Overview (Visual Basic)](../../../visual-basic/programming-guide/concepts/linq/standard-query-operators-overview.md)
