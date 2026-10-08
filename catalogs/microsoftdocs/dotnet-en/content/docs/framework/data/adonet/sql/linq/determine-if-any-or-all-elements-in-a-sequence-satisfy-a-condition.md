---
description: "Learn more about: Determine if Any or All Elements in a Sequence Satisfy a Condition"
title: "Determine if Any or All Elements in a Sequence Satisfy a Condition"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 339ec145-826c-46d2-8cf2-3acd252cd072
---
# Determine if Any or All Elements in a Sequence Satisfy a Condition

The [System.Linq.Enumerable.All*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.All*) operator returns `true` if all elements in a sequence satisfy a condition.

 The [System.Linq.Queryable.Any*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Any*) operator returns `true` if any element in a sequence satisfies a condition.

## Example 1

 The following example returns a sequence of customers that have at least one order. The `Where`/`where` clause evaluates to `true` if the given `Customer` has any `Order`.

 [DLinqQueryExamples#37 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#37)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#37 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#37)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

## Example 2

 The following Visual Basic code determines the list of customers who have not placed orders, and ensures that for every customer in that list, a contact name is provided.

 [DLinqQueryExamples#37v (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#37v)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

## Example 3

 The following C# example returns a sequence of customers whose orders have a `ShipCity` beginning with "C". Also included in the return are customers who have no orders. (By design, the [System.Linq.Queryable.All*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.All*) operator returns `true` for an empty sequence.) Customers with no orders are eliminated in the console output by using the `Count` operator.

 [DLinqQueryExamples#38 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#38)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)

## See also

- [Query Examples](query-examples.md)
