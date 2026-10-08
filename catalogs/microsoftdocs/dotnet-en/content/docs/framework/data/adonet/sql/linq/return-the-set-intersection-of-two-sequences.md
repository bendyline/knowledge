---
description: "Learn more about: Return the Set Intersection of Two Sequences"
title: "Return the Set Intersection of Two Sequences"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: d09c344e-3548-4944-a3ed-051880e3f5b8
---
# Return the Set Intersection of Two Sequences

Use the [System.Linq.Queryable.Intersect*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Intersect*) operator to return the set intersection of two sequences.

## Example

 This example uses [System.Linq.Queryable.Intersect*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Intersect*) to return a sequence of all countries/regions in which both `Customers` and `Employees` live.

 [DLinqQueryExamples#42 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#42)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#42 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#42)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

 In LINQ to SQL
, the [System.Linq.Queryable.Intersect*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Intersect*) operation is well defined only on sets. The semantics for multisets is undefined.

## See also

- [Query Examples](query-examples.md)
- [Standard Query Operator Translation](standard-query-operator-translation.md)
