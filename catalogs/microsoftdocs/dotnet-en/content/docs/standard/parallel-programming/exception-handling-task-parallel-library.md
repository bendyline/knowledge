---
title: "Exception handling (Task Parallel Library)"
description: Explore exception handling using the Task Parallel Library (TPL) in .NET. See nested aggregate exceptions, inner exceptions, unobserved task exceptions, & more.
ms.date: 06/08/2022
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "tasks, exceptions"
ms.assetid: beb51e50-9061-4d3d-908c-56a4f7c2e8c1
---
# Exception handling (Task Parallel Library)

Unhandled exceptions that are thrown by user code that is running inside a task are propagated back to the calling thread, except in certain scenarios that are described later in this topic. Exceptions are propagated when you use one of the static or instance [System.Threading.Tasks.Task.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Wait*) methods, and you handle them by enclosing the call in a `try`/`catch` statement. If a task is the parent of attached child tasks, or if you are waiting on multiple tasks, multiple exceptions could be thrown.

To propagate all the exceptions back to the calling thread, the Task infrastructure wraps them in an [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) instance. The [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) exception has an [System.AggregateException.InnerExceptions](https://learn.microsoft.com/search/?terms=System.AggregateException.InnerExceptions) property that can be enumerated to examine all the original exceptions that were thrown, and handle (or not handle) each one individually. You can also handle the original exceptions by using the [System.AggregateException.Handle*](https://learn.microsoft.com/search/?terms=System.AggregateException.Handle*) method.

Even if only one exception is thrown, it is still wrapped in an [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) exception, as the following example shows.

[TPL_Exceptions#21 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/handling21.cs#21)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/handling21.cs.md)
[TPL_Exceptions#21 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_exceptions/vb/handling21.vb#21)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_exceptions/vb/handling21.vb.md)

You could avoid an unhandled exception by just catching the [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) and not observing any of the inner exceptions. However, we recommend that you do not do this because it is analogous to catching the base [System.Exception](https://learn.microsoft.com/search/?terms=System.Exception) type in non-parallel scenarios. To catch an exception without taking specific actions to recover from it can leave your program in an indeterminate state.

If you do not want to call the [System.Threading.Tasks.Task.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Wait*) method to wait for a task's completion, you can also retrieve the [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) exception from the task's [System.Threading.Tasks.Task.Exception](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Exception) property, as the following example shows. For more information, see the [Observing exceptions by using the Task.Exception property](#observing-exceptions-by-using-the-taskexception-property) section in this topic.

[TPL_Exceptions#29 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/handling22.cs#29)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/handling22.cs.md)
[TPL_Exceptions#29 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_exceptions/vb/handling22.vb#29)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_exceptions/vb/handling22.vb.md)

> **Caution:**
> The preceding example code includes a `while` loop that polls the task's [System.Threading.Tasks.Task.IsCompleted](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.IsCompleted) property to determine when the task has completed. This should never be done in production code as it is very inefficient.

If you do not wait on a task that propagates an exception, or access its [System.Threading.Tasks.Task.Exception](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Exception) property, the exception is escalated according to the .NET exception policy when the task is garbage-collected.

When exceptions are allowed to bubble up back to the joining thread, it is possible that a task may continue to process some items after the exception is raised.

> **Note:**
> When "Just My Code" is enabled, Visual Studio in some cases will break on the line that throws the exception and display an error message that says "exception not handled by user code." This error is benign. You can press F5 to continue and see the exception-handling behavior that is demonstrated in these examples. To prevent Visual Studio from breaking on the first error, just uncheck the **Enable Just My Code** checkbox under **Tools, Options, Debugging, General**.

## Attached child tasks and nested AggregateExceptions

If a task has an attached child task that throws an exception, that exception is wrapped in an [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) before it is propagated to the parent task, which wraps that exception in its own [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) before it propagates it back to the calling thread. In such cases, the [System.AggregateException.InnerExceptions](https://learn.microsoft.com/search/?terms=System.AggregateException.InnerExceptions) property of the [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) exception that is caught at the [System.Threading.Tasks.Task.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Wait*), [System.Threading.Tasks.Task.WaitAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAny*), or [System.Threading.Tasks.Task.WaitAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAll*) method contains one or more [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) instances, not the original exceptions that caused the fault. To avoid having to iterate over nested [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) exceptions, you can use the [System.AggregateException.Flatten*](https://learn.microsoft.com/search/?terms=System.AggregateException.Flatten*) method to remove all the nested [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) exceptions, so that the [System.AggregateException.InnerExceptions](https://learn.microsoft.com/search/?terms=System.AggregateException.InnerExceptions) property contains the original exceptions. In the following example, nested [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) instances are flattened and handled in just one loop.

[TPL_Exceptions#22 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/flatten2.cs#22)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/flatten2.cs.md)
[TPL_Exceptions#22 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_exceptions/vb/flatten2.vb#22)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_exceptions/vb/flatten2.vb.md)

You can also use the [System.AggregateException.Flatten*](https://learn.microsoft.com/search/?terms=System.AggregateException.Flatten*) method to rethrow the inner exceptions from multiple [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) instances thrown by multiple tasks in a single [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) instance, as the following example shows.

[TPL_Exceptions#13 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/taskexceptions2.cs#13)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/taskexceptions2.cs.md)
[TPL_Exceptions#13 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_exceptions/vb/taskexceptions2.vb#13)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_exceptions/vb/taskexceptions2.vb.md)

## Exceptions from detached child tasks

By default, child tasks are created as detached. Exceptions thrown from detached tasks must be handled or rethrown in the immediate parent task; they are not propagated back to the calling thread in the same way as attached child tasks propagated back. The topmost parent can manually rethrow an exception from a detached child to cause it to be wrapped in an [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) and propagated back to the calling thread.

[TPL_Exceptions#23 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/detached21.cs#23)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/detached21.cs.md)
[TPL_Exceptions#23 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_exceptions/vb/detached21.vb#23)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_exceptions/vb/detached21.vb.md)

Even if you use a continuation to observe an exception in a child task, the exception still must be observed by the parent task.

## Exceptions that indicate cooperative cancellation

When user code in a task responds to a cancellation request, the correct procedure is to throw an [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) passing in the cancellation token on which the request was communicated. Before it attempts to propagate the exception, the task instance compares the token in the exception to the one that was passed to it when it was created. If they are the same, the task propagates a [System.Threading.Tasks.TaskCanceledException](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCanceledException) wrapped in the [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException), and it can be seen when the inner exceptions are examined. However, if the calling thread is not waiting on the task, this specific exception will not be propagated. For more information, see [Task Cancellation](task-cancellation.md).

[TPL_Exceptions#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/exceptions.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/exceptions.cs.md)
[TPL_Exceptions#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_exceptions/vb/tpl_exceptions.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_exceptions/vb/tpl_exceptions.vb.md)

## Using the handle method to filter inner exceptions

You can use the [System.AggregateException.Handle*](https://learn.microsoft.com/search/?terms=System.AggregateException.Handle*) method to filter out exceptions that you can treat as "handled" without using any further logic. In the user delegate that is supplied to the [System.AggregateException.Handle%28System.Func%7BSystem.Exception%2CSystem.Boolean%7D%29](https://learn.microsoft.com/search/?terms=System.AggregateException.Handle%2528System.Func%257BSystem.Exception%252CSystem.Boolean%257D%2529) method, you can examine the exception type, its [System.Exception.Message](https://learn.microsoft.com/search/?terms=System.Exception.Message) property, or any other information about it that will let you determine whether it is benign. Any exceptions for which the delegate returns `false` are rethrown in a new [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) instance immediately after the [System.AggregateException.Handle*](https://learn.microsoft.com/search/?terms=System.AggregateException.Handle*) method returns.

The following example is functionally equivalent to the first example in this topic, which examines each exception in the [System.AggregateException.InnerExceptions*](https://learn.microsoft.com/search/?terms=System.AggregateException.InnerExceptions*) collection.  Instead, this exception handler calls the [System.AggregateException.Handle*](https://learn.microsoft.com/search/?terms=System.AggregateException.Handle*) method object for each exception, and only rethrows exceptions that are not `CustomException` instances.

[TPL_Exceptions#26 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/handlemethod21.cs#26)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/handlemethod21.cs.md)
[TPL_Exceptions#26 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_exceptions/vb/handlemethod21.vb#26)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_exceptions/vb/handlemethod21.vb.md)

The following is a more complete example that uses the [System.AggregateException.Handle*](https://learn.microsoft.com/search/?terms=System.AggregateException.Handle*) method to provide special handling for an [System.UnauthorizedAccessException](https://learn.microsoft.com/search/?terms=System.UnauthorizedAccessException) exception when enumerating files.

[TPL_Exceptions#12 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/taskexceptions.cs#12)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/taskexceptions.cs.md)
[TPL_Exceptions#12 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_exceptions/vb/taskexceptions.vb#12)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_exceptions/vb/taskexceptions.vb.md)

## Observing exceptions by using the Task.Exception property

If a task completes in the [System.Threading.Tasks.TaskStatus.Faulted](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.Faulted) state, its [System.Threading.Tasks.Task.Exception](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Exception) property can be examined to discover which specific exception caused the fault. A good way to observe the [System.Threading.Tasks.Task.Exception](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Exception) property is to use a continuation that runs only if the antecedent task faults, as shown in the following example.

[TPL_Exceptions#27 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/exceptionprop21.cs#27)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_exceptions/cs/exceptionprop21.cs.md)
[TPL_Exceptions#27 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_exceptions/vb/exceptionprop21.vb#27)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_exceptions/vb/exceptionprop21.vb.md)

In a meaningful application, the continuation delegate could log detailed information about the exception and possibly spawn new tasks to recover from the exception. If a task faults, the following expressions throw the exception:

- `await task`
- `task.Wait()`
- `task.Result`
- `task.GetAwaiter().GetResult()`

Use a [`try-catch`](../../csharp/language-reference/statements/exception-handling-statements.md#the-try-catch-statement) statement to handle and observe thrown exceptions. Alternatively, observe the exception by accessing the [System.Threading.Tasks.Task.Exception](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Exception) property.

> **Important:**
> The [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) cannot be explicitly caught when using the following expressions:
>
> - `await task`
> - `task.GetAwaiter().GetResult()`

## UnobservedTaskException event

In some scenarios, such as when hosting untrusted plug-ins, benign exceptions might be common, and it might be too difficult to manually observe them all. In these cases, you can handle the [System.Threading.Tasks.TaskScheduler.UnobservedTaskException](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler.UnobservedTaskException) event. The [System.Threading.Tasks.UnobservedTaskExceptionEventArgs](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.UnobservedTaskExceptionEventArgs) instance that is passed to your handler can be used to prevent the unobserved exception from being propagated back to the joining thread.

## See also

- [Task Parallel Library (TPL)](task-parallel-library-tpl.md)
