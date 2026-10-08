---
description: "Learn more about: How to: Create and Execute a Simple PLINQ Query"
title: "How to: Create and Execute a Simple PLINQ Query"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "PLINQ queries, how to create"
ms.assetid: 983b4213-bddd-4a44-9262-cbe59186df4c
---
# How to: Create and Execute a Simple PLINQ Query

The example in this article shows how to create a simple Parallel Language Integrated Query (LINQ) query by using the [System.Linq.ParallelEnumerable.AsParallel*](https://learn.microsoft.com/search/?terms=System.Linq.ParallelEnumerable.AsParallel*) extension method on the source sequence and executing the query by using the [System.Linq.ParallelEnumerable.ForAll*](https://learn.microsoft.com/search/?terms=System.Linq.ParallelEnumerable.ForAll*) method.

> **Note:**
> This documentation uses lambda expressions to define delegates in PLINQ. If you are not familiar with lambda expressions in C# or Visual Basic, see [Lambda Expressions in PLINQ and TPL](lambda-expressions-in-plinq-and-tpl.md).

## Example

 [PLINQ#11 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/create1.cs#11)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/create1.cs.md)
 [PLINQ#11 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/plinq/vb/create1.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/plinq/vb/create1.vb.md)

 This example demonstrates the basic pattern for creating and executing any Parallel LINQ query when the ordering of the result sequence is not important. Unordered queries are generally faster than ordered queries. The query partitions the source into tasks that are executed asynchronously on multiple threads. The order in which each task completes depends not only on the amount of work involved to process the elements in the partition, but also on external factors such as how the operating system schedules each thread. This example is intended to demonstrate usage, and might not run faster than the equivalent sequential LINQ to Objects query. For more information about speedup, see [Understanding Speedup in PLINQ](understanding-speedup-in-plinq.md). For more information about how to preserve the ordering of elements in a query, see [How to: Control Ordering in a PLINQ Query](how-to-control-ordering-in-a-plinq-query.md).

## See also

- [Parallel LINQ (PLINQ)](introduction-to-plinq.md)
