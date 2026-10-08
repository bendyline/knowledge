---
description: "Learn more about: Sort Elements in a Sequence"
title: "Sort Elements in a Sequence"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: d59b93a9-50c8-4770-a114-d902f6a0ea76
---
# Sort Elements in a Sequence

Use the [System.Linq.Enumerable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderBy*) operator to sort a sequence according to one or more keys.

> **Note:**
> LINQ to SQL
 is designed to support ordering by simple primitive types, such as `string`, `int`, and so on. It does not support ordering for complex multi-valued classes, such as anonymous types. It also does not support `byte` datatypes.

## Example 1

 The following example sorts `Employees` by date of hire.

 [DLinqQueryExamples#20 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#20)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#20 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#20)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

## Example 2

 The following example uses `where` to sort `Orders` shipped to `London` by freight.

 [DLinqQueryExamples#21 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#21)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#21 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#21)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

## Example 3

 The following example sorts `Products` by unit price from highest to lowest.

 [DLinqQueryExamples#22 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#22)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#22 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#22)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

## Example 4

 The following example uses a compound `OrderBy` to sort `Customers` by city and then by contact name.

 [DLinqQueryExamples#24 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#24)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#24 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#24)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

## Example 5

 The following example sorts Orders from `EmployeeID 1` by `ShipCountry`, and then by highest to lowest freight.

 [DLinqQueryExamples#25 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#25)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#25 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#25)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

## Example 6

 The following example combines [System.Linq.Enumerable.OrderBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OrderBy*), [System.Linq.Enumerable.Max*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Max*), and [System.Linq.Enumerable.GroupBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupBy*) operators to find the `Products` that have the highest unit price in each category, and then sorts the group by category id.

 [DLinqQueryExamples#26 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#26)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#26 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#26)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

 If you run the previous query against the Northwind sample database, the results will resemble the following:

 `1`

 `Côte de Blaye`

 `2`

 `Vegie-spread`

 `3`

 `Sir Rodney's Marmalade`

 `4`

 `Raclette Courdavault`

 `5`

 `Gnocchi di nonna Alice`

 `6`

 `Thüringer Rostbratwurst`

 `7`

 `Manjimup Dried Apples`

 `8`

 `Carnarvon Tigers`

## See also

- [Query Examples](query-examples.md)
- [Downloading Sample Databases](downloading-sample-databases.md)
