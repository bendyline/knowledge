---
description: "Learn more about: Method-Based Query Syntax Examples: Conversion Operators (LINQ to DataSet)"
title: "Method-Based Query Syntax Examples: Conversion Operators (LINQ to DataSet)"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: a084c16b-9b55-4690-aefd-f8e0810a92c3
---
# Method-Based Query Syntax Examples: Conversion Operators (LINQ to DataSet)

The examples in this topic demonstrate how to use the [System.Linq.Enumerable.ToArray*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToArray*), [System.Linq.Enumerable.ToDictionary*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToDictionary*), and [System.Linq.Enumerable.ToList*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToList*) methods to immediately execute a query expression.

 The `FillDataSet` method used in these examples is specified in [Loading Data Into a DataSet](loading-data-into-a-dataset.md).

 The examples in this topic use the Contact, Address, Product, SalesOrderHeader, and SalesOrderDetail tables in the AdventureWorks sample database.

 The examples in this topic use the following `using`/`Imports` statements:

 [DP LINQ to DataSet Examples#ImportsUsing (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#importsusing)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#ImportsUsing (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#importsusing)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

 For more information, see [How to: Create a LINQ to DataSet Project In Visual Studio](how-to-create-a-linq-to-dataset-project-in-vs.md).

## ToArray

### Example

 This example uses the [System.Linq.Enumerable.ToArray*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToArray*) method to immediately evaluate a sequence into an array.

 [DP LINQ to DataSet Examples#ToArray (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#toarray)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#ToArray (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#toarray)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## ToDictionary

### Example

 This example uses the [System.Linq.Enumerable.ToDictionary*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToDictionary*) method to immediately evaluate a sequence and a related key expression into a dictionary.

 [DP LINQ to DataSet Examples#ToDictionary (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#todictionary)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#ToDictionary (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#todictionary)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## ToList

### Example

 This example uses the [System.Linq.Enumerable.ToList*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToList*) method to immediately evaluate a sequence into a [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601), where `T` is of type [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow).

 [DP LINQ to DataSet Examples#ToList (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#tolist)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#ToList (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#tolist)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## See also

- [Loading Data Into a DataSet](loading-data-into-a-dataset.md)
- [LINQ to DataSet Examples](linq-to-dataset-examples.md)
- [Standard Query Operators Overview (C#)](../../../csharp/linq/standard-query-operators/index.md)
- [Standard Query Operators Overview (Visual Basic)](../../../visual-basic/programming-guide/concepts/linq/standard-query-operators-overview.md)
