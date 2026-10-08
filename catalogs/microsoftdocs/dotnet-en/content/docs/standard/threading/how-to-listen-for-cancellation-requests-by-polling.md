---
description: "Learn more about: How to: Listen for Cancellation Requests by Polling"
title: "How to: Listen for Cancellation Requests by Polling"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "cancellation, how to poll for requests"
ms.assetid: c7f2f022-d08e-4e00-b4eb-ae84844cb1bc
---
# How to: Listen for Cancellation Requests by Polling

The following example shows one way that user code can poll a cancellation token at regular intervals to see whether cancellation has been requested from the calling thread. This example uses the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) type, but the same pattern applies to asynchronous operations created directly by the [System.Threading.ThreadPool](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool) type or the [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread) type.

## Example

 Polling requires some kind of loop or recursive code that can periodically read the value of the Boolean [System.Threading.CancellationToken.IsCancellationRequested](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.IsCancellationRequested) property. If you are using the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) type and you are waiting for the task to complete on the calling thread, you can use the [System.Threading.CancellationToken.ThrowIfCancellationRequested*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.ThrowIfCancellationRequested*) method to check the property and throw the exception. By using this method, you ensure that the correct exception is thrown in response to a request. If you are using a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task), then calling this method is better than manually throwing an [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException). If you do not have to throw the exception, then you can just check the property and return from the method if the property is `true`.

 [Cancellation#11 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/cancellationex11.cs#11)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/cancellationex11.cs.md)
 [Cancellation#11 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/cancellationex11.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/cancellationex11.vb.md)

 Calling [System.Threading.CancellationToken.ThrowIfCancellationRequested*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.ThrowIfCancellationRequested*) is extremely fast and does not introduce significant overhead in loops.

 If you are calling [System.Threading.CancellationToken.ThrowIfCancellationRequested*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.ThrowIfCancellationRequested*), you only have to explicitly check the [System.Threading.CancellationToken.IsCancellationRequested](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.IsCancellationRequested) property if you have other work to do in response to the cancellation besides throwing the exception. In this example, you can see that the code actually accesses the property twice: once in the explicit access and again in the [System.Threading.CancellationToken.ThrowIfCancellationRequested*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.ThrowIfCancellationRequested*) method. But because the act of reading the [System.Threading.CancellationToken.IsCancellationRequested](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.IsCancellationRequested) property involves only one volatile read instruction per access, the double access is not significant from a performance perspective. It is still preferable to call the method rather than manually throw the [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException).

## See also

- [Cancellation in Managed Threads](cancellation-in-managed-threads.md)
