---
title: "Task Cancellation"
description: Understand task cancellation, which is supported in the Task and Task<TResult> classes through the use of cancellation tokens in .NET.
ms.date: 10/20/2025
ms.custom: devdivchpfy22
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "tasks, cancellation"
  - "asynchronous task cancellation"
ms.assetid: 3ecf1ea9-e399-4a6a-a0d6-8475f48dcb28
---
# Task cancellation

The [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) and [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) classes support cancellation by using cancellation tokens. For more information, see [Cancellation in Managed Threads](../threading/cancellation-in-managed-threads.md). In the Task classes, cancellation involves cooperation between the user delegate, which represents a cancelable operation, and the code that requested the cancellation. A successful cancellation involves the requesting code calling the [System.Threading.CancellationTokenSource.Cancel*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.Cancel*) method and the user delegate terminating the operation in a timely manner. You can terminate the operation by using one of these options:

- By returning from the delegate. In many scenarios, this option is sufficient. However, a task instance that's canceled in this way transitions to the [System.Threading.Tasks.TaskStatus.RanToCompletion](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.RanToCompletion) state, not to the [System.Threading.Tasks.TaskStatus.Canceled](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.Canceled) state.

- By throwing an [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) and passing it the token on which cancellation was requested. The preferred way to perform is to use the [System.Threading.CancellationToken.ThrowIfCancellationRequested*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.ThrowIfCancellationRequested*) method. A task that's canceled in this way transitions to the Canceled state, which the calling code can use to verify that the task responded to its cancellation request.

 The following example shows the basic pattern for task cancellation that throws the exception:

>**Note:**
> The token is passed to the user delegate and the task instance.

 [TPL_Cancellation#02 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_cancellation/cs/snippet02.cs#02)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_cancellation/cs/snippet02.cs.md)
 [TPL_Cancellation#02 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_cancellation/vb/module1.vb#02)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_cancellation/vb/module1.vb.md)

 For a complete example, see [How to: Cancel a Task and Its Children](how-to-cancel-a-task-and-its-children.md).

 When a task instance observes an [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) thrown by the user code, it compares the exception's token to its associated token (the one that was passed to the API that created the Task). If the tokens are same and the token's [System.Threading.CancellationToken.IsCancellationRequested](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.IsCancellationRequested) property returns `true`, the task interprets this as acknowledging cancellation and transitions to the Canceled state. If you don't use a [System.Threading.Tasks.Task.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Wait*) or [System.Threading.Tasks.Task.WaitAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAll*) method to wait for the task, then the task just sets its status to [System.Threading.Tasks.TaskStatus.Canceled](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.Canceled).

 If you're waiting on a Task that transitions to the Canceled state, a [System.Threading.Tasks.TaskCanceledException](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCanceledException) exception (wrapped in an [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) exception) is thrown. This exception indicates successful cancellation instead of a faulty situation. Therefore, the task's [System.Threading.Tasks.Task.Exception](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Exception) property returns `null`.

 If the token's [System.Threading.CancellationToken.IsCancellationRequested](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.IsCancellationRequested) property returns `false` or if the exception's token doesn't match the Task's token, the [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) is treated like a normal exception, causing the Task to transition to the Faulted state. The presence of other exceptions will also cause the Task to transition to the Faulted state. You can get the status of the completed task in the [System.Threading.Tasks.Task.Status](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Status) property.

 It's possible that a task might continue to process some items after cancellation is requested.

## See also

- [Cancellation in Managed Threads](../threading/cancellation-in-managed-threads.md)
- [How to: Cancel a Task and Its Children](how-to-cancel-a-task-and-its-children.md)
