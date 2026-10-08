---
title: "How to: Cancel a Parallel.For or ForEach Loop"
description: Cancel a Parallel.For or Parallel.ForEach loop in .NET by supplying a cancellation token object to the method in the ParallelOptions parameter.
ms.date: 08/18/2023
dev_langs:
 - "csharp"
 - "vb"
helpviewer_keywords:
 - "parallel foreach loop, how to cancel"
 - "parallel for loops, how to cancel"
ms.assetid: 9d19b591-ea95-4418-8ea7-b6266af9905b
---

# How to: Cancel a Parallel.For or ForEach Loop

The [System.Threading.Tasks.Parallel.For*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.For*) and [System.Threading.Tasks.Parallel.ForEach*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.ForEach*) methods support cancellation through the use of cancellation tokens. For more information about cancellation in general, see [Cancellation](../threading/cancellation-in-managed-threads.md). In a parallel loop, you supply the [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) to the method in the [System.Threading.Tasks.ParallelOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ParallelOptions) parameter and then enclose the parallel call in a try-catch block.

## Example

The following example shows how to cancel a call to [System.Threading.Tasks.Parallel.ForEach*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.ForEach*). You can apply the same approach to a [System.Threading.Tasks.Parallel.For*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.For*) call.

[TPL_Parallel#29 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_parallel/cs/parallel_cancel.cs#29)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_parallel/cs/parallel_cancel.cs.md)
[TPL_Parallel#29 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_parallel/vb/cancelloop.vb#29)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_parallel/vb/cancelloop.vb.md)

If the token that signals the cancellation is the same token that is specified in the [System.Threading.Tasks.ParallelOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ParallelOptions) instance, then the parallel loop will throw a single [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) on cancellation. This immediately stops all iterations from executing as the exception is thrown. If some other token causes cancellation, the loop will throw an [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) with an [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) as an `InnerException`.

## See also

- [Data parallelism](data-parallelism-task-parallel-library.md)
- [Lambda expressions in PLINQ and TPL](lambda-expressions-in-plinq-and-tpl.md)
