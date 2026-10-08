---
description: "Learn more about: How to: Combine Parallel and Sequential LINQ Queries"
title: "How to: Combine Parallel and Sequential LINQ Queries"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "parallel queries, combine parallel and sequential"
ms.assetid: 1167cfe6-c8aa-4096-94ba-c66c3a4edf4c
---
# How to: Combine Parallel and Sequential LINQ Queries

This example shows how to use the [System.Linq.ParallelEnumerable.AsSequential*](https://learn.microsoft.com/search/?terms=System.Linq.ParallelEnumerable.AsSequential*) method to instruct PLINQ to process all subsequent operators in the query sequentially. Although sequential processing is often slower than parallel, sometimes it's necessary to produce correct results.

> **Note:**
> This example is intended to demonstrate usage and might not run faster than the equivalent sequential LINQ to Objects query. For more information about speedup, see [Understanding Speedup in PLINQ](understanding-speedup-in-plinq.md).

## Example

 The following example shows one scenario in which [System.Linq.ParallelEnumerable.AsSequential*](https://learn.microsoft.com/search/?terms=System.Linq.ParallelEnumerable.AsSequential*) is required, namely to preserve the ordering that was established in a previous clause of the query.

 [PLINQ#24 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/plinqsamples.cs#24)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/plinqsamples.cs.md)
 [PLINQ#24 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/plinq/vb/plinqsnippets1.vb#24)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/plinq/vb/plinqsnippets1.vb.md)

## Compiling the Code

 To compile and run this code, paste it into the [PLINQ Data Sample](plinq-data-sample.md) project, add a line to call the method from `Main`, and press <kbd>F5</kbd>.

## See also

- [Parallel LINQ (PLINQ)](introduction-to-plinq.md)
