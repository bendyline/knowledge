---
description: "Learn more about: Return the Set Difference Between Two Sequences"
title: "Return the Set Difference Between Two Sequences"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 62efb546-c898-408f-af21-36e7c6fed217
---
# Return the Set Difference Between Two Sequences

Use the [System.Linq.Queryable.Except*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Except*) operator to return the set difference between two sequences.

## Example

 This example uses [System.Linq.Queryable.Except*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Except*) to return a sequence of all countries/regions in which `Customers` live but in which no `Employees` live.

 [DLinqQueryExamples#41 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#41)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#41 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#41)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

 In LINQ to SQL
, the [System.Linq.Queryable.Except*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Except*) operation is well defined only on sets. The semantics for multisets is undefined.

## See also

- [Query Examples](query-examples.md)
- [Standard Query Operator Translation](standard-query-operator-translation.md)
