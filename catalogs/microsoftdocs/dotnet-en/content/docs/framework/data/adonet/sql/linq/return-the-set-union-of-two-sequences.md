---
description: "Learn more about: Return the Set Union of Two Sequences"
title: "Return the Set Union of Two Sequences"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 8b8bd3cb-86d4-4a3b-9906-61f68726dd1f
---
# Return the Set Union of Two Sequences

Use the [System.Linq.Queryable.Union*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Union*) operator to return the set union of two sequences.

## Example

 This example uses [System.Linq.Queryable.Union*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Union*) to return a sequence of all countries/regions in which there are either `Customers` or `Employees`.

 [DLinqQueryExamples#43 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#43)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#43 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#43)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

 In LINQ to SQL
, the [System.Linq.Queryable.Union*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Union*) operator is defined for multisets as the unordered concatenation of the multisets (effectively the result of the [`UNION ALL`](https://learn.microsoft.com/sql/t-sql/language-elements/set-operators-union-transact-sql) clause in SQL).

For more info and examples, see [System.Linq.Queryable.Union*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Union*).

## See also

- [Query Examples](query-examples.md)
- [Standard Query Operator Translation](standard-query-operator-translation.md)
