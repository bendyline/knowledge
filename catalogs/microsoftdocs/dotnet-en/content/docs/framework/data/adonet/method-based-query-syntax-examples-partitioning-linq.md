---
description: "Learn more about: Method-Based Query Syntax Examples: Partitioning (LINQ"
title: "Method-Based Query Syntax Examples: Partitioning (LINQ"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: a582c53f-f203-44ae-a797-d7f169a4fbb5
---
# Method-Based Query Syntax Examples: Partitioning (LINQ

The examples in this topic demonstrate how to use the [System.Linq.Enumerable.Skip*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Skip*), [System.Linq.Enumerable.SkipWhile*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SkipWhile*), [System.Linq.Enumerable.Take*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Take*), and [System.Linq.Enumerable.TakeWhile*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.TakeWhile*) methods to query a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) using the query expression syntax.

 The `FillDataSet` method used in these examples is specified in [Loading Data Into a DataSet](loading-data-into-a-dataset.md).

 The examples in this topic use the Contact, Address, Product, SalesOrderHeader, and SalesOrderDetail tables in the AdventureWorks sample database.

 The examples in this topic use the following `using`/`Imports` statements:

 [DP LINQ to DataSet Examples#ImportsUsing (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#importsusing)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#ImportsUsing (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#importsusing)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

 For more information, see [How to: Create a LINQ to DataSet Project In Visual Studio](how-to-create-a-linq-to-dataset-project-in-vs.md).

## Skip

### Example

 This example uses the [System.Linq.Enumerable.Skip*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Skip*) method to get all but the first five contacts of the `Contact` table.

 [DP LINQ to DataSet Examples#SkipSimple (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#skipsimple)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#SkipSimple (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#skipsimple)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

### Example

 This example uses the [System.Linq.Enumerable.Skip*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Skip*) method to get all but the first two addresses in Seattle.

 [DP LINQ to DataSet Examples#SkipNested (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#skipnested)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#SkipNested (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#skipnested)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## SkipWhile

### Example

 This example uses [System.Linq.Enumerable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderBy*) and [System.Linq.Enumerable.SkipWhile*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SkipWhile*) methods to return products from the `Product` table with a list price greater than 300.00.

 [DP LINQ to DataSet Examples#SkipWhileSimple_MQ (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#skipwhilesimple_mq)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#SkipWhileSimple_MQ (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#skipwhilesimple_mq)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## Take

### Example

 This example uses the [System.Linq.Enumerable.Take*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Take*) method to get only the first five contacts from the `Contact` table.

 [DP LINQ to DataSet Examples#TakeSimple (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#takesimple)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#TakeSimple (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#takesimple)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

### Example

 This example uses the [System.Linq.Enumerable.Take*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Take*) method to get the first three addresses in Seattle.

 [DP LINQ to DataSet Examples#TakeNested (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#takenested)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#TakeNested (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#takenested)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## TakeWhile

### Example

 This example uses [System.Linq.Enumerable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderBy*) and [System.Linq.Enumerable.TakeWhile*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.TakeWhile*) to return products from the `Product` table with a list price less than 300.00.

 [DP LINQ to DataSet Examples#TakeWhileSimple_MQ (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#takewhilesimple_mq)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#TakeWhileSimple_MQ (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#takewhilesimple_mq)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## See also

- [Loading Data Into a DataSet](loading-data-into-a-dataset.md)
- [LINQ to DataSet Examples](linq-to-dataset-examples.md)
- [Standard Query Operators Overview (C#)](../../../csharp/linq/standard-query-operators/index.md)
- [Standard Query Operators Overview (Visual Basic)](../../../visual-basic/programming-guide/concepts/linq/standard-query-operators-overview.md)
