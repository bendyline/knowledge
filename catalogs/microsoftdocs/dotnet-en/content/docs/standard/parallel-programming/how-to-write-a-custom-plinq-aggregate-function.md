---
description: "Learn more about: How to: Write a Custom PLINQ Aggregate Function"
title: "How to: Write a Custom PLINQ Aggregate Function"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "PLINQ queries, how to create aggregate function"
ms.assetid: 5a70dd49-ab2a-4798-b551-196ee7042b1a
---
# How to: Write a Custom PLINQ Aggregate Function

This example shows how to use the [System.Linq.ParallelEnumerable.Aggregate*](https://learn.microsoft.com/search/?terms=System.Linq.ParallelEnumerable.Aggregate*) method to apply a custom aggregation function to a source sequence.

> **Warning:**
> This example is intended to demonstrate usage, and might not run faster than the equivalent sequential LINQ to Objects query. For more information about speedup, see [Understanding Speedup in PLINQ](understanding-speedup-in-plinq.md).

## Example

 The following example calculates the standard deviation of a sequence of integers.

 [PLINQ#31 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/plinqsamples.cs#31)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/plinqsamples.cs.md)
 [PLINQ#31 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/plinq/vb/plinqsnippets1.vb#31)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/plinq/vb/plinqsnippets1.vb.md)

 This example uses an overload of the Aggregate standard query operator that is unique to PLINQ. This overload takes an extra [System.Func`3](https://learn.microsoft.com/search/?terms=System.Func%603) as the third input parameter. This delegate combines the results from all threads before it performs the final calculation on the aggregated results. In this example we add together the sums from all the threads.

 Note that when a lambda expression body consists of a single expression, the return value of the [System.Func`2](https://learn.microsoft.com/search/?terms=System.Func%602) delegate is the value of the expression.

## See also

- [System.Linq.ParallelEnumerable](https://learn.microsoft.com/search/?terms=System.Linq.ParallelEnumerable)
- [Parallel LINQ (PLINQ)](introduction-to-plinq.md)
