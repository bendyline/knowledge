---
description: "Learn more about: Compute the Sum of Values in a Numeric Sequence"
title: "Compute the Sum of Values in a Numeric Sequence"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 24e335b0-984e-4825-8721-0a91b533b7c3
---
# Compute the Sum of Values in a Numeric Sequence

Use the [System.Linq.Enumerable.Sum*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Sum*) operator to compute the sum of numeric values in a sequence.

 Note the following characteristics of the `Sum` operator in LINQ to SQL
:

- The Standard Query Operator aggregate operator `Sum` evaluates to zero for an empty sequence or a sequence that contains only nulls. In LINQ to SQL
, the semantics of SQL are left unchanged. For this reason, `Sum` evaluates to null instead of to zero for an empty sequence or for a sequence that contains only nulls.

- SQL limitations on intermediate results apply to aggregates in LINQ to SQL
. Sum of 32-bit integer quantities is not computed by using 64-bit results, and overflow can occur for the LINQ to SQL
 translation of `Sum`. This possibility exists even if the Standard Query Operator implementation does not cause an overflow for the corresponding in-memory sequence.

## Example 1

 The following example finds the total freight of all orders in the `Order` table.

 If you run this query against the Northwind sample database, the output is: `64942.6900`.

 [DLinqQueryExamples#12 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#12)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#12 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#12)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

## Example 2

 The following example finds the total number of units on order for all products.

 If you run this query against the Northwind sample database, the output is: `780`.

 Note that you must cast `short` types (for example, `UnitsOnOrder`) because `Sum` has no overload for short types.

 [DLinqQueryExamples#13 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#13)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#13 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#13)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

## See also

- [Aggregate Queries](aggregate-queries.md)
- [Downloading Sample Databases](downloading-sample-databases.md)
