---
description: "Learn more about: CountdownEvent"
title: "CountdownEvent"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "synchronization primitives, CountdownEvent"
ms.assetid: eec3812a-e20f-4ecd-bfef-6921d508b708
---
# CountdownEvent

[System.Threading.CountdownEvent](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent) is a synchronization primitive that unblocks its waiting threads after it has been signaled a certain number of times. [System.Threading.CountdownEvent](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent) is designed for scenarios in which you would otherwise have to use a [System.Threading.ManualResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEvent) or [System.Threading.ManualResetEventSlim](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEventSlim) and manually decrement a variable before signaling the event. For example, in a fork/join scenario, you can just create a [System.Threading.CountdownEvent](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent) that has a signal count of 5, and then start five work items on the thread pool and have each work item call [System.Threading.CountdownEvent.Signal*](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent.Signal*) when it completes. Each call to [System.Threading.CountdownEvent.Signal*](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent.Signal*) decrements the signal count by 1. On the main thread, the call to [System.Threading.CountdownEvent.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent.Wait*) will block until the signal count is zero.

> **Note:**
> For code that does not have to interact with legacy .NET Framework synchronization APIs, consider using [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) objects or the [System.Threading.Tasks.Parallel.Invoke*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.Invoke*) method for an even easier approach to expressing fork-join parallelism.

 [System.Threading.CountdownEvent](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent) has these additional features:

- The wait operation can be canceled by using cancellation tokens.

- Its signal count can be incremented after the instance is created.

- Instances can be reused after [System.Threading.CountdownEvent.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent.Wait*) has returned by calling the [System.Threading.CountdownEvent.Reset*](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent.Reset*) method.

- Instances expose a [System.Threading.WaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle) for integration with other .NET synchronization APIs, such as [System.Threading.WaitHandle.WaitAll*](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle.WaitAll*).

## Basic Usage

 The following example demonstrates how to use a [System.Threading.CountdownEvent](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent) with [System.Threading.ThreadPool](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool) work items.

 [CDS_CountdownEvent#01 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/cds_countdownevent/cs/countdownevent.cs#01)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/cds_countdownevent/cs/countdownevent.cs.md)
 [CDS_CountdownEvent#01 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/cds_countdownevent/vb/module1.vb#01)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/cds_countdownevent/vb/module1.vb.md)

## CountdownEvent With Cancellation

 The following example shows how to cancel the wait operation on [System.Threading.CountdownEvent](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent) by using a cancellation token. The basic pattern follows the model for unified cancellation. For more information, see [Cancellation in Managed Threads](cancellation-in-managed-threads.md).

 [CDS_CountdownEvent#02 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/cds_countdownevent/cs/countdownevent.cs#02)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/cds_countdownevent/cs/countdownevent.cs.md)
 [CDS_CountdownEvent#02 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/cds_countdownevent/vb/canceleventwait.vb#02)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/cds_countdownevent/vb/canceleventwait.vb.md)

 Note that the wait operation does not cancel the threads that are signaling it. Typically, cancellation is applied to a logical operation, and that can include waiting on the event as well as all the work items that the wait is synchronizing. In this example, each work item is passed a copy of the same cancellation token so that it can respond to the cancellation request.

## See also

- [System.Threading.Semaphore](https://learn.microsoft.com/search/?terms=System.Threading.Semaphore)
