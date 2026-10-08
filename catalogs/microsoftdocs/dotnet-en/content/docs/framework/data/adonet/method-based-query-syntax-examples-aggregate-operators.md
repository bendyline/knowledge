---
description: "Learn more about: Method-Based Query Syntax Examples: Aggregate Operators (LINQ to DataSet)"
title: "Method-Based Query Syntax Examples: Aggregate Operators (LINQ to DataSet)"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 5ed5f01d-acb2-4dd4-be60-f04c2d570fa8
---
# Method-Based Query Syntax Examples: Aggregate Operators (LINQ to DataSet)

The examples in this topic demonstrate how to use the [System.Linq.Enumerable.Aggregate*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Aggregate*), [System.Linq.Enumerable.Average*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Average*), [System.Linq.Enumerable.Count*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Count*), [System.Linq.Enumerable.LongCount*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.LongCount*), [System.Linq.Enumerable.Max*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Max*), [System.Linq.Enumerable.Min*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Min*), and [System.Linq.Enumerable.Sum*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Sum*) operators to query a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) and aggregate data using method query syntax.

 The `FillDataSet` method used in these examples is specified in [Loading Data Into a DataSet](loading-data-into-a-dataset.md).

 The examples in this topic use the Contact, Address, Product, SalesOrderHeader, and SalesOrderDetail tables in the AdventureWorks sample database.

 The examples in this topic use the following `using`/`Imports` statements:

 [DP LINQ to DataSet Examples#ImportsUsing (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#importsusing)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#ImportsUsing (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#importsusing)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

 For more information, see [How to: Create a LINQ to DataSet Project In Visual Studio](how-to-create-a-linq-to-dataset-project-in-vs.md).

## Aggregate

### Example

 This example uses the [System.Linq.Enumerable.Aggregate*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Aggregate*) method to get the first 5 contacts from the `Contact` table and build a comma-delimited list of the last names.

 [DP LINQ to DataSet Examples#Aggregate_MQ (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#aggregate_mq)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#Aggregate_MQ (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#aggregate_mq)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## Average

### Example

 This example uses the [System.Linq.Enumerable.Average*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Average*) method to find the average list price of the products.

 [DP LINQ to DataSet Examples#Average_MQ (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#average_mq)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#Average_MQ (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#average_mq)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

### Example

 This example uses the [System.Linq.Enumerable.Average*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Average*) method to find the average list price of the products of each style.

 [DP LINQ to DataSet Examples#Average2_MQ (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#average2_mq)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#Average2_MQ (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#average2_mq)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

### Example

 This example uses the [System.Linq.Enumerable.Average*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Average*) method to find the average total due.

 [DP LINQ to DataSet Examples#AverageProjection_MQ (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#averageprojection_mq)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#AverageProjection_MQ (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#averageprojection_mq)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

### Example

 This example uses the [System.Linq.Enumerable.Average*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Average*) method to get the average total due for each contact ID.

 [DP LINQ to DataSet Examples#AverageGrouped_MQ (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#averagegrouped_mq)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#AverageGrouped_MQ (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#averagegrouped_mq)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

### Example

 This example uses the [System.Linq.Enumerable.Average*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Average*) method to get the orders with the average `TotalDue` for each contact.

 [DP LINQ to DataSet Examples#AverageElements_MQ (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#averageelements_mq)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#AverageElements_MQ (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#averageelements_mq)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## Count

### Example

 This example uses the [System.Linq.Enumerable.Count*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Count*) method to return the number of products in the `Product` table.

 [DP LINQ to DataSet Examples#Count (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#count)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#Count (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#count)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

### Example

 This example uses the [System.Linq.Enumerable.Count*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Count*) method to return a list of contact IDs and how many orders each has.

 [DP LINQ to DataSet Examples#CountNested (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#countnested)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#CountNested (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#countnested)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

### Example

 This example groups products by color and uses the [System.Linq.Enumerable.Count*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Count*) method to return the number of products in each color group.

 [DP LINQ to DataSet Examples#CountGrouped (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#countgrouped)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#CountGrouped (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#countgrouped)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## LongCount

### Example

 This example gets the contact count as a long integer.

 [DP LINQ to DataSet Examples#LongCountSimple (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#longcountsimple)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#LongCountSimple (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#longcountsimple)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## Max

### Example

 This example uses the [System.Linq.Enumerable.Max*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Max*) method to get the largest total due.

 [DP LINQ to DataSet Examples#MaxProjection_MQ (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#maxprojection_mq)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#MaxProjection_MQ (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#maxprojection_mq)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

### Example

 This example uses the [System.Linq.Enumerable.Max*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Max*) method to get the largest total due for each contact ID.

 [DP LINQ to DataSet Examples#MaxGrouped_MQ (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#maxgrouped_mq)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#MaxGrouped_MQ (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#maxgrouped_mq)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

### Example

 This example uses the [System.Linq.Enumerable.Max*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Max*) method to get the orders with the largest `TotalDue` for each contact ID.

 [DP LINQ to DataSet Examples#MaxElements_MQ (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#maxelements_mq)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#MaxElements_MQ (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#maxelements_mq)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## Min

### Example

 This example uses the [System.Linq.Enumerable.Min*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Min*) method to get the smallest total due.

 [DP LINQ to DataSet Examples#MinProjection_MQ (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#minprojection_mq)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#MinProjection_MQ (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#minprojection_mq)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

### Example

 This example uses the [System.Linq.Enumerable.Min*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Min*) method to get the smallest total due for each contact ID.

 [DP LINQ to DataSet Examples#MinGrouped_MQ (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#mingrouped_mq)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#MinGrouped_MQ (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#mingrouped_mq)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

### Example

 This example uses the [System.Linq.Enumerable.Min*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Min*) method to get the orders with the smallest total due for each contact.

 [DP LINQ to DataSet Examples#MinElements_MQ (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#minelements_mq)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#MinElements_MQ (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#minelements_mq)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## Sum

### Example

 This example uses the [System.Linq.Enumerable.Sum*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Sum*) method to get the total number of order quantities in the `SalesOrderDetail` table.

 [DP LINQ to DataSet Examples#SumProjection_MQ (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#sumprojection_mq)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)

### Example

 This example uses the [System.Linq.Enumerable.Sum*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Sum*) method to get the total due for each contact ID.

 [DP LINQ to DataSet Examples#SumGrouped_MQ (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#sumgrouped_mq)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#SumGrouped_MQ (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#sumgrouped_mq)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## See also

- [Loading Data Into a DataSet](loading-data-into-a-dataset.md)
- [LINQ to DataSet Examples](linq-to-dataset-examples.md)
- [Standard Query Operators Overview (C#)](../../../csharp/linq/standard-query-operators/index.md)
- [Standard Query Operators Overview (Visual Basic)](../../../visual-basic/programming-guide/concepts/linq/standard-query-operators-overview.md)
