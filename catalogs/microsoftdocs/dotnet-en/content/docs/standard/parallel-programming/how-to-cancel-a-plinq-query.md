---
description: "Learn more about: How to: Cancel a PLINQ Query"
title: "How to: Cancel a PLINQ Query"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "PLINQ queries, how to cancel"
  - "cancellation, PLINQ"
ms.assetid: 80b14640-edfa-4153-be1b-3e003d3e9c1a
---
# How to: Cancel a PLINQ Query

The following examples show two ways to cancel a PLINQ query. The first example shows how to cancel a query that consists mostly of data traversal. The second example shows how to cancel a query that contains a user function that is computationally expensive.

> **Note:**
> When "Just My Code" is enabled, Visual Studio will break on the line that throws the exception and display an error message that says "exception not handled by user code." This error is benign. You can press F5 to continue from it, and see the exception-handling behavior that is demonstrated in the examples below. To prevent Visual Studio from breaking on the first error, just uncheck the "Just My Code" checkbox under **Tools, Options, Debugging, General**.
>
> This example is intended to demonstrate usage, and might not run faster than the equivalent sequential LINQ to Objects query. For more information about speedup, see [Understanding Speedup in PLINQ](understanding-speedup-in-plinq.md).

## Example 1

[PLINQ#16 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/plinqsamples.cs#16)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/plinqsamples.cs.md)
[PLINQ#16 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/plinq/vb/plinqsnippets1.vb#16)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/plinq/vb/plinqsnippets1.vb.md)

The PLINQ framework does not roll a single [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) into an [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException); the [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) must be handled in a separate catch block. If one or more user delegates throws an OperationCanceledException(externalCT) (by using an external [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken)) but no other exception, and the query was defined as `AsParallel().WithCancellation(externalCT)`, then PLINQ will issue a single [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) (externalCT) rather than an [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException). However, if one user delegate throws an [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException), and another delegate throws another exception type, then both exceptions will be rolled into an [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException).

The general guidance on cancellation is as follows:

1. If you perform user-delegate cancellation, you should inform PLINQ about the external [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) and throw an [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException)(externalCT).

2. If cancellation occurs and no other exceptions are thrown, then handle an [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) rather than an [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException).

## Example 2

The following example shows how to handle cancellation when you have a computationally expensive function in user code.

[PLINQ#17 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/plinqsamples.cs#17)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/plinqsamples.cs.md)
[PLINQ#17 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/plinq/vb/plinqsnippets1.vb#17)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/plinq/vb/plinqsnippets1.vb.md)

When you handle the cancellation in user code, you do not have to use [System.Linq.ParallelEnumerable.WithCancellation*](https://learn.microsoft.com/search/?terms=System.Linq.ParallelEnumerable.WithCancellation*) in the query definition. However, we recommend that you do use [System.Linq.ParallelEnumerable.WithCancellation*](https://learn.microsoft.com/search/?terms=System.Linq.ParallelEnumerable.WithCancellation*), because [System.Linq.ParallelEnumerable.WithCancellation*](https://learn.microsoft.com/search/?terms=System.Linq.ParallelEnumerable.WithCancellation*) has no effect on query performance and it enables the cancellation to be handled by query operators and your user code.

In order to ensure system responsiveness, we recommend that you check for cancellation around once per millisecond; however, any period up to 10 milliseconds is considered acceptable. This frequency should not have a negative impact on your code's performance.

When an enumerator is disposed, for example when code breaks out of a foreach (For Each in Visual Basic) loop that is iterating over query results, then the query is canceled, but no exception is thrown.

## See also

- [System.Linq.ParallelEnumerable](https://learn.microsoft.com/search/?terms=System.Linq.ParallelEnumerable)
- [Parallel LINQ (PLINQ)](introduction-to-plinq.md)
- [Cancellation in Managed Threads](../threading/cancellation-in-managed-threads.md)
