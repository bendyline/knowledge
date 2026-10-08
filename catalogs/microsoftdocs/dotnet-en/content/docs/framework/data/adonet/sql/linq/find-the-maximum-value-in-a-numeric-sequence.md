---
description: "Learn more about: Find the Maximum Value in a Numeric Sequence"
title: "Find the Maximum Value in a Numeric Sequence"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 70d7c058-0280-4815-a008-6f290093591a
---
# Find the Maximum Value in a Numeric Sequence

Use the [System.Linq.Enumerable.Max*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Max*) operator to find the highest value in a sequence of numeric values.

## Example 1

 The following example finds the latest date of hire for any employee.

 If you run this query against the sample Northwind database, the output is: `11/15/1994 12:00:00 AM`.

 [DLinqQueryExamples#6 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#6)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#6 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#6)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

## Example 2

 The following example finds the most units in stock for any product.

 If you run this example against the sample Northwind database, the output is: `125`.

 [DLinqQueryExamples#7 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#7)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#7 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#7)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

## Example 3

 The following example uses Max to find the `Products` that have the highest unit price in each category. The output then lists the results by category.

 [DLinqQueryExamples#8 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#8)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#8 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#8)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

 If you run the previous query against the Northwind sample database, your results will resemble the following:

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

- [Aggregate Queries](aggregate-queries.md)
- [Downloading Sample Databases](downloading-sample-databases.md)
