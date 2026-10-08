---
description: "Learn more about: Concatenate Two Sequences"
title: "Concatenate Two Sequences"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 76767e7c-0607-4e1d-9ca2-a94f311f45eb
---
# Concatenate Two Sequences

Use the [System.Linq.Queryable.Concat*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Concat*) operator to concatenate two sequences.

 The [System.Linq.Queryable.Concat*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Concat*) operator is defined for ordered multisets where the orders of the receiver and the argument are the same.

 Ordering in SQL is the final step before results are produced. For this reason, the [System.Linq.Queryable.Concat*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Concat*) operator is implemented by using `UNION ALL` and does not preserve the order of its arguments. To make sure ordering is correct in the results, make sure to explicitly order the results.

## Example 1

 This example uses [System.Linq.Queryable.Concat*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Concat*) to return a sequence of all `Customer` and `Employee` telephone and fax numbers.

 [DLinqQueryExamples#39 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#39)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#39 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#39)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

## Example 2

 This example uses [System.Linq.Queryable.Concat*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Concat*) to return a sequence of all `Customer` and `Employee` name and telephone number mappings.

 [DLinqQueryExamples#40 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs#40)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQueryExamples/cs/Program.cs.md)
 [DLinqQueryExamples#40 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb#40)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQueryExamples/vb/Module1.vb.md)

## See also

- [Query Examples](query-examples.md)
- [Standard Query Operator Translation](standard-query-operator-translation.md)
