---
description: "Learn more about: Return the Average Value From a Numeric Sequence"
title: "Return the Average Value From a Numeric Sequence"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: ee3b8673-a2e7-4b2d-9b5c-4972ff9e665d
---
# Return the Average Value From a Numeric Sequence

The [System.Linq.Enumerable.Average*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Average*) operator computes the average of a sequence of numeric values.

> **Note:**
> The LINQ to SQL
 translation of `Average` of integer values is computed as an integer, not as a double.

## Example 1

 The following example returns the average of `Freight` values in the `Orders` table.

 Results from the sample Northwind database would be `78.2442`.

 [DLinqQueryExamples#1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#1)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#1)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

## Example 2

 The following example returns the average of the unit price of all `Products` in the `Products` table.

 Results from the sample Northwind database would be `28.8663`.

 [DLinqQueryExamples#2 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#2)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#2 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#2)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

## Example 3

 The following example uses the `Average` operator to find those `Products` whose unit price is higher than the average unit price of the category it belongs to. The example then displays the results in groups.

 Note that this example requires the use of the `var` keyword in C#, because the return type is anonymous.

 [DLinqQueryExamples#3 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#3)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#3 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#3)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

 If you run this query against the Northwind sample database, the results should resemble of the following:

 `1`

 `Côte de Blaye`

 `Ipoh Coffee`

 `2`

 `Grandma's Boysenberry Spread`

 `Northwoods Cranberry Sauce`

 `Sirop d'érable`

 `Vegie-spread`

 `3`

 `Sir Rodney's Marmalade`

 `Gumbär Gummibärchen`

 `Schoggi Schokolade`

 `Tarte au sucre`

 `4`

 `Queso Manchego La Pastora`

 `Mascarpone Fabioli`

 `Raclette Courdavault`

 `Camembert Pierrot`

 `Gudbrandsdalsost`

 `Mozzarella di Giovanni`

 `5`

 `Gustaf's Knäckebröd`

 `Gnocchi di nonna Alice`

 `Wimmers gute Semmelknödel`

 `6`

 `Mishi Kobe Niku`

 `Thüringer Rostbratwurst`

 `7`

 `Rössle Sauerkraut`

 `Manjimup Dried Apples`

 `8`

 `Ikura`

 `Carnarvon Tigers`

 `Nord-Ost Matjeshering`

 `Gravad lax`

## See also

- [Aggregate Queries](aggregate-queries.md)
