---
description: "Learn more about: Method-Based Query Syntax Examples: Set Operators (LINQ to DataSet)"
title: "Method-Based Query Syntax Examples: Set Operators (LINQ to DataSet)"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: fa93af15-28af-4b5e-846b-897308410edb
---
# Method-Based Query Syntax Examples: Set Operators (LINQ to DataSet)

The examples in this topic demonstrate how to use the [System.Linq.Enumerable.Distinct*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Distinct*), [System.Linq.Enumerable.Except*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Except*), [System.Linq.Enumerable.Intersect*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Intersect*), and [System.Linq.Enumerable.Union*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Union*) operators to perform value-based comparison operations on sets of data rows.[Loading Data Into a DataSet](loading-data-into-a-dataset.md) See [Comparing DataRows](comparing-datarows-linq-to-dataset.md) for more information on [System.Data.DataRowComparer](https://learn.microsoft.com/search/?terms=System.Data.DataRowComparer).

 The `FillDataSet` method used in these examples is specified in [Loading Data Into a DataSet](loading-data-into-a-dataset.md).

 The examples in this topic use the Contact, Address, Product, SalesOrderHeader, and SalesOrderDetail tables in the AdventureWorks sample database.

 The examples in this topic use the following `using`/`Imports` statements:

 [DP LINQ to DataSet Examples#ImportsUsing (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#importsusing)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#ImportsUsing (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#importsusing)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

 For more information, see [How to: Create a LINQ to DataSet Project In Visual Studio](how-to-create-a-linq-to-dataset-project-in-vs.md).

## Distinct

### Example

 This example uses the [System.Linq.Enumerable.Distinct*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Distinct*) method to remove duplicate elements in a sequence.

 [DP LINQ to DataSet Examples#DistinctRows (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#distinctrows)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#DistinctRows (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#distinctrows)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## Except

### Example

 This example uses the [System.Linq.Enumerable.Except*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Except*) method to return contacts that appear in the first table but not in the second.

 [DP LINQ to DataSet Examples#Except2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#except2)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#Except2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#except2)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## Intersect

### Example

 This example uses the [System.Linq.Enumerable.Intersect*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Intersect*) method to return contacts that appear in both tables.

 [DP LINQ to DataSet Examples#Intersect2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#intersect2)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#Intersect2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#intersect2)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## Union

### Example

 This example uses the [System.Linq.Enumerable.Union*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Union*) method to return unique contacts from either of the two tables.

 [DP LINQ to DataSet Examples#Union2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#union2)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#Union2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#union2)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## See also

- [Loading Data Into a DataSet](loading-data-into-a-dataset.md)
- [LINQ to DataSet Examples](linq-to-dataset-examples.md)
- [Standard Query Operators Overview (C#)](../../../csharp/linq/standard-query-operators/index.md)
- [Standard Query Operators Overview (Visual Basic)](../../../visual-basic/programming-guide/concepts/linq/standard-query-operators-overview.md)
