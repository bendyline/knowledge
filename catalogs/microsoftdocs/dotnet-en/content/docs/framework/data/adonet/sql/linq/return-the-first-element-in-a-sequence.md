---
description: "Learn more about: Return the First Element in a Sequence"
title: "Return the First Element in a Sequence"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: ccdc3777-b2c2-44e3-a627-abef8d79a555
---
# Return the First Element in a Sequence

Use the [System.Linq.Enumerable.First*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.First*) operator to return the first element in a sequence. Queries that use [System.Linq.Enumerable.First*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.First*) are executed immediately.

> **Note:**
> LINQ to SQL
 does not support the [System.Linq.Enumerable.Last*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Last*) operator.

## Example 1

 The following code finds the first `Shipper` in a table:

 If you run this query against the Northwind sample database, the results are

 `ID = 1, Company = Speedy Express`.

 [DLinqQueryExamples#14 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#14)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#14 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#14)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

## Example 2

 The following code finds the single `Customer` that has the `CustomerID` BONAP.

 If you run this query against the Northwind sample database, the results are `ID = BONAP, Contact = Laurence Lebihan`.

 [DLinqQueryExamples#15 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#15)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#15 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#15)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

## See also

- [Query Examples](query-examples.md)
- [Downloading Sample Databases](downloading-sample-databases.md)
