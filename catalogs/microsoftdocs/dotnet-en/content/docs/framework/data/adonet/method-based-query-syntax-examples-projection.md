---
description: "Learn more about: Method-Based Query Syntax Examples: Projection (LINQ to DataSet)"
title: "Method-Based Query Syntax Examples: Projection (LINQ to DataSet)"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 0fc2c8f0-1967-4f30-8b20-39b8dccfb82f
---
# Method-Based Query Syntax Examples: Projection (LINQ to DataSet)

The examples in this topic demonstrate how to use the [System.Linq.Enumerable.Select*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Select*) and [System.Linq.Enumerable.SelectMany*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SelectMany*) methods to query a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) using the method-based query syntax.

 The `FillDataSet` method used in these examples is specified in [Loading Data Into a DataSet](loading-data-into-a-dataset.md).

 The examples in this topic use the Contact, Address, Product, SalesOrderHeader, and SalesOrderDetail tables in the AdventureWorks sample database.

 The examples in this topic use the following `using`/`Imports` statements:

 [DP LINQ to DataSet Examples#ImportsUsing (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#importsusing)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#ImportsUsing (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#importsusing)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

 For more information, see [How to: Create a LINQ to DataSet Project In Visual Studio](how-to-create-a-linq-to-dataset-project-in-vs.md).

## Select

### Example

 This example uses the [System.Linq.Enumerable.Select*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Select*) method to project the `Name`, `ProductNumber`, and `ListPrice` properties to a sequence of anonymous types.  The `ListPrice` property is also renamed to `Price` in the resulting type.

 [DP LINQ to DataSet Examples#SelectAnonymousTypes_MQ (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#selectanonymoustypes_mq)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#SelectAnonymousTypes_MQ (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#selectanonymoustypes_mq)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## SelectMany

### Example

 This example uses the [System.Linq.Enumerable.SelectMany*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SelectMany*) method to select all orders where `TotalDue` is less than 500.00.

 [DP LINQ to DataSet Examples#SelectManyCompoundFrom_MQ (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#selectmanycompoundfrom_mq)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#SelectManyCompoundFrom_MQ (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#selectmanycompoundfrom_mq)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

### Example

 This example uses the [System.Linq.Enumerable.SelectMany*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SelectMany*) method to select all orders where the order was made on October 1, 2002 or later.

 [DP LINQ to DataSet Examples#SelectManyCompoundFrom2_MQ (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#selectmanycompoundfrom2_mq)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#SelectManyCompoundFrom2_MQ (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#selectmanycompoundfrom2_mq)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## See also

- [Loading Data Into a DataSet](loading-data-into-a-dataset.md)
- [LINQ to DataSet Examples](linq-to-dataset-examples.md)
- [Standard Query Operators Overview (C#)](../../../csharp/linq/standard-query-operators/index.md)
- [Standard Query Operators Overview (Visual Basic)](../../../visual-basic/programming-guide/concepts/linq/standard-query-operators-overview.md)
