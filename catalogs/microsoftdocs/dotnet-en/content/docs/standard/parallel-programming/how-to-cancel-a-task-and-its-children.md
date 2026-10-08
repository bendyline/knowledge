---
title: "How to: Cancel a Task and Its Children"
description: See examples of how to cancel a task and its children in .NET. The examples cover steps from cancelable task creation, to the notice that the task was canceled.
ms.date: 04/09/2024
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "tasks, how to cancel"
ms.assetid: 08574301-8331-4719-ad50-9cf7f6ff3048
---
# How to: Cancel a Task and Its Children

This example shows how to perform the following tasks:

1. Create and start a cancelable task.
2. Pass a cancellation token to your user delegate and optionally to the task instance.
3. Notice and respond to the cancellation request in your user delegate.
4. Optionally notice on the calling thread that the task was canceled.

The calling thread does not forcibly end the task; it only signals that cancellation is requested. If the task is already running, it is up to the user delegate to notice the request and respond appropriately. If cancellation is requested before the task runs, then the user delegate is never executed and the task object transitions into the Canceled state.

## Example

This example shows how to terminate a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) and its children in response to a cancellation request. It also shows that when a user delegate terminates by throwing a [System.Threading.Tasks.TaskCanceledException](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCanceledException), the calling thread can optionally use the [System.Threading.Tasks.Task.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Wait*) method or [System.Threading.Tasks.Task.WaitAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAll*) method to wait for the tasks to finish. In this case, you must use a `try/catch` block to handle the exceptions on the calling thread.

[TPL_Cancellation#04 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_cancellation/cs/cancel1.cs#04)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_cancellation/cs/cancel1.cs.md)
[TPL_Cancellation#04 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_cancellation/vb/cancel1.vb#04)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_cancellation/vb/cancel1.vb.md)

The [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) class is fully integrated with the cancellation model that is based on the [System.Threading.CancellationTokenSource](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource) and [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) types. For more information, see [Cancellation in Managed Threads](../threading/cancellation-in-managed-threads.md) and [Task Cancellation](task-cancellation.md).

## See also

- [System.Threading.CancellationTokenSource](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource)
- [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken)
- [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task)
- [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601)
- [Task-based Asynchronous Programming](task-based-asynchronous-programming.md)
- [Attached and Detached Child Tasks](attached-and-detached-child-tasks.md)
- [Lambda Expressions in PLINQ and TPL](lambda-expressions-in-plinq-and-tpl.md)
