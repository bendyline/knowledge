---
description: "Learn more about: Method-Based Query Syntax Examples: Element Operators (LINQ to DataSet)"
title: "Method-Based Query Syntax Examples: Element Operators (LINQ to DataSet)"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: eedf2fbd-f407-4f62-bb1a-c00eb001b1dd
---
# Method-Based Query Syntax Examples: Element Operators (LINQ to DataSet)

The examples in this topic demonstrate how to use the [System.Linq.Enumerable.First*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.First*) and [System.Linq.Enumerable.ElementAt*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ElementAt*) methods to get [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) elements from a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) using the query expression syntax.

 The `FillDataSet` method used in these examples is specified in [Loading Data Into a DataSet](loading-data-into-a-dataset.md).

 The examples in this topic use the Contact, Address, Product, SalesOrderHeader, and SalesOrderDetail tables in the AdventureWorks sample database.

 The examples in this topic use the following `using`/`Imports` statements:

[DP LINQ to DataSet Examples#ImportsUsing (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#importsusing)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
[DP LINQ to DataSet Examples#ImportsUsing (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#importsusing)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

 For more information, see [How to: Create a LINQ to DataSet Project In Visual Studio](how-to-create-a-linq-to-dataset-project-in-vs.md).

## ElementAt

### Example

 This example uses the [System.Linq.Enumerable.ElementAt*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ElementAt*) method to retrieve the fifth address where `PostalCode` == "M4B 1V7".

[DP LINQ to DataSet Examples#ElementAt (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#elementat)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
[DP LINQ to DataSet Examples#ElementAt (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#elementat)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## First

### Example

 This example uses the [System.Linq.Enumerable.First*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.First*) method to return the first contact whose first name is 'Brooke'.

[DP LINQ to DataSet Examples#FirstSimple (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#firstsimple)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
[DP LINQ to DataSet Examples#FirstSimple (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#firstsimple)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## See also

- [Loading Data Into a DataSet](loading-data-into-a-dataset.md)
- [LINQ to DataSet Examples](linq-to-dataset-examples.md)
- [Standard Query Operators Overview (C#)](../../../csharp/linq/standard-query-operators/index.md)
- [Standard Query Operators Overview (Visual Basic)](../../../visual-basic/programming-guide/concepts/linq/standard-query-operators-overview.md)
