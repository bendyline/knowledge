---
title: "Chaining tasks using continuation tasks"
description: Learn to chain task by using continuation tasks in .NET. A continuation task is an asynchronous task that's invoked by another task.
ms.date: 10/20/2025
ms.custom: devdivchpfy22
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "tasks, continuations"
ms.assetid: 0b45e9a2-de28-46ce-8212-1817280ed42d
---

# Chaining tasks using continuation tasks

In asynchronous programming, it's common for one asynchronous operation to invoke a second operation on completion. Continuations allow descendant operations to consume the results of the first operation. Traditionally, continuations have been done by using callback methods. In the Task Parallel Library (TPL), the same functionality is provided by _continuation tasks_. A continuation task (also known just as a continuation) is an asynchronous task that's invoked by another task, known as the _antecedent_, when the antecedent finishes.

Continuations are relatively easy to use but are nevertheless powerful and flexible. For example, you can:

- Pass data from the antecedent to the continuation.
- Specify the precise conditions under which the continuation will be invoked or not invoked.
- Cancel a continuation either before it starts or cooperatively as it's running.
- Provide hints about how the continuation should be scheduled.
- Invoke multiple continuations from the same antecedent.
- Invoke one continuation when all or any one of multiple antecedents complete.
- Chain continuations one after another to any arbitrary length.
- Use a continuation to handle exceptions thrown by the antecedent.

## About continuations

A continuation is a task that's created in the [System.Threading.Tasks.TaskStatus.WaitingForActivation](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.WaitingForActivation) state. It's activated automatically when its antecedent task or tasks complete. Calling [System.Threading.Tasks.Task.Start*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Start*) on a continuation in user code throws an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) exception.

A continuation is itself a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) and doesn't block the thread on which it's started. Call the [System.Threading.Tasks.Task.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Wait*) method to block until the continuation task finishes.

## Create a continuation for a single antecedent

You create a continuation that executes when its antecedent has completed by calling the [System.Threading.Tasks.Task.ContinueWith*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.ContinueWith*) method. The following example shows the basic pattern (for clarity, exception handling is omitted). It executes an antecedent task `taskA` that returns a [System.DayOfWeek](https://learn.microsoft.com/search/?terms=System.DayOfWeek) object that indicates the name of the current day of the week. When `taskA` completes, the `antecedent` represents its results in the `ContinueWith` continuation method. The result of the antecedent task is written to the console.

[language="csharp" source="snippets/cs/simple1.cs"::: (complete source file; reference: snippets/cs/simple1.cs)](../../../_code/docs/standard/parallel-programming/snippets/cs/simple1.cs.md)

[TPL_Continuations#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/simple1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/simple1.vb.md)

## Create a continuation for multiple antecedents

You can also create a continuation that will run when any or all of a group of tasks have completed. To execute a continuation when all antecedent tasks have completed, you can call the static (`Shared` in Visual Basic) [System.Threading.Tasks.Task.WhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAll*) method or the instance [System.Threading.Tasks.TaskFactory.ContinueWhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.ContinueWhenAll*) method. To execute a continuation when any of the antecedent tasks have completed, you can call the static (`Shared` in Visual Basic) [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) method or the instance [System.Threading.Tasks.TaskFactory.ContinueWhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.ContinueWhenAny*) method.

Calls to the [System.Threading.Tasks.Task.WhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAll*) and [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) overloads don't block the calling thread. However, you typically call all but the [System.Threading.Tasks.Task.WhenAll%28System.Collections.Generic.IEnumerable%7BSystem.Threading.Tasks.Task%7D%29](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAll%2528System.Collections.Generic.IEnumerable%257BSystem.Threading.Tasks.Task%257D%2529) and [System.Threading.Tasks.Task.WhenAll%28System.Threading.Tasks.Task%5B%5D%29](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAll%2528System.Threading.Tasks.Task%255B%255D%2529) methods to retrieve the returned [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property, which does block the calling thread.

The following example calls the [System.Threading.Tasks.Task.WhenAll%28System.Collections.Generic.IEnumerable%7BSystem.Threading.Tasks.Task%7D%29](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAll%2528System.Collections.Generic.IEnumerable%257BSystem.Threading.Tasks.Task%257D%2529) method to create a continuation task that reflects the results of its 10 antecedent tasks. Each antecedent task squares an index value that ranges from one to 10. If the antecedents complete successfully (their [System.Threading.Tasks.Task.Status](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Status) property is [System.Threading.Tasks.TaskStatus.RanToCompletion](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.RanToCompletion)), the [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property of the continuation is an array of the [System.Threading.Tasks.Task`1.Result*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result*) values returned by each antecedent. The example adds them to compute the sum of squares for all numbers between one and 10:

[language="csharp" source="snippets/cs/whenall1.cs"::: (complete source file; reference: snippets/cs/whenall1.cs)](../../../_code/docs/standard/parallel-programming/snippets/cs/whenall1.cs.md)

[TPL_Continuations#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/whenall1.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/whenall1.vb.md)

## Continuation options

When you create a single-task continuation, you can use a [System.Threading.Tasks.Task.ContinueWith*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.ContinueWith*) overload that takes a [System.Threading.Tasks.TaskContinuationOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions) enumeration value to specify the conditions under which the continuation starts. For example, you can specify that the continuation is to run only if the antecedent completes successfully, or only if it completes in a faulted state. If the condition isn't true when the antecedent is ready to invoke the continuation, the continuation transitions directly to the [System.Threading.Tasks.TaskStatus.Canceled](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.Canceled) state and can't be started later.

Many multi-task continuation methods, such as overloads of the [System.Threading.Tasks.TaskFactory.ContinueWhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.ContinueWhenAll*) method, also include a [System.Threading.Tasks.TaskContinuationOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions) parameter. However, only a subset of all [System.Threading.Tasks.TaskContinuationOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions) enumeration members is valid. You can specify [System.Threading.Tasks.TaskContinuationOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions) values that have counterparts in the [System.Threading.Tasks.TaskCreationOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions) enumeration, such as [System.Threading.Tasks.TaskContinuationOptions.AttachedToParent](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions.AttachedToParent), [System.Threading.Tasks.TaskContinuationOptions.LongRunning](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions.LongRunning), and [System.Threading.Tasks.TaskContinuationOptions.PreferFairness](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions.PreferFairness). If you specify any of the `NotOn` or `OnlyOn` options with a multi-task continuation, an [System.ArgumentOutOfRangeException](https://learn.microsoft.com/search/?terms=System.ArgumentOutOfRangeException) exception will be thrown at runtime.

For more information on task continuation options, see the [System.Threading.Tasks.TaskContinuationOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions) article.

## Pass data to a continuation

The [System.Threading.Tasks.Task.ContinueWith*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.ContinueWith*) method passes a reference to the antecedent as an argument to the user delegate of the continuation. If the antecedent is a [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) object, and the task ran until it was completed, then the continuation can access the [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property of the task.

The [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property blocks until the task has completed. However, if the task was canceled or faulted, attempting to access the [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property throws an [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) exception. You can avoid this problem by using the [System.Threading.Tasks.TaskContinuationOptions.OnlyOnRanToCompletion](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions.OnlyOnRanToCompletion) option, as shown in the following example:

[language="csharp" source="snippets/cs/result1.cs"::: (complete source file; reference: snippets/cs/result1.cs)](../../../_code/docs/standard/parallel-programming/snippets/cs/result1.cs.md)

[TPL_Continuations#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/result1.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/result1.vb.md)

If you want the continuation to run even if the antecedent didn't run to successful completion, you must guard against the exception. One approach is to test the [System.Threading.Tasks.Task.Status](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Status) property of the antecedent, and only attempt to access the [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property if the status isn't [System.Threading.Tasks.TaskStatus.Faulted](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.Faulted) or [System.Threading.Tasks.TaskStatus.Canceled](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.Canceled). You can also examine the [System.Threading.Tasks.Task.Exception](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Exception) property of the antecedent. For more information, see [Exception Handling](exception-handling-task-parallel-library.md). The following example modifies the preceding example to access antecedent's [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property only if its status is [System.Threading.Tasks.TaskStatus.RanToCompletion](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.RanToCompletion):

[language="csharp" source="snippets/cs/result2.cs"::: (complete source file; reference: snippets/cs/result2.cs)](../../../_code/docs/standard/parallel-programming/snippets/cs/result2.cs.md)

[TPL_Continuations#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/result2.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/result2.vb.md)

## Cancel a continuation

The [System.Threading.Tasks.Task.Status](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Status) property of a continuation is set to [System.Threading.Tasks.TaskStatus.Canceled](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.Canceled) in the following situations:

- It throws an [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) exception in response to a cancellation request. As with any task, if the exception contains the same token that was passed to the continuation, it's treated as an acknowledgment of cooperative cancellation.

- The continuation is passed a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) whose [System.Threading.CancellationToken.IsCancellationRequested](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.IsCancellationRequested) property is `true`. In this case, the continuation doesn't start, and it transitions to the [System.Threading.Tasks.TaskStatus.Canceled](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.Canceled) state.

- The continuation never runs because the condition set by its [System.Threading.Tasks.TaskContinuationOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions) argument wasn't met. For example, if an antecedent goes into a [System.Threading.Tasks.TaskStatus.Faulted](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.Faulted) state, its continuation that was passed the [System.Threading.Tasks.TaskContinuationOptions.NotOnFaulted](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions.NotOnFaulted) option won't run but will transition to the [System.Threading.Tasks.TaskStatus.Canceled](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.Canceled) state.

If a task and its continuation represent two parts of the same logical operation, you can pass the same cancellation token to both tasks, as shown in the following example. It consists of an antecedent that generates a list of integers that are divisible by 33, which it passes to the continuation. The continuation in turn displays the list. Both the antecedent and the continuation pause regularly for random intervals. In addition, a [System.Threading.Timer](https://learn.microsoft.com/search/?terms=System.Threading.Timer) object is used to execute the `Elapsed` method after a five-second timeout interval. This example calls the [System.Threading.CancellationTokenSource.Cancel*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.Cancel*) method, which causes the currently executing task to call the [System.Threading.CancellationToken.ThrowIfCancellationRequested*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.ThrowIfCancellationRequested*) method. Whether the [System.Threading.CancellationTokenSource.Cancel*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.Cancel*) method is called when the antecedent or its continuation is executing depends on the duration of the randomly generated pauses. If the antecedent is canceled, the continuation won't start. If the antecedent isn't canceled, the token can still be used to cancel the continuation.

[language="csharp" source="snippets/cs/cancellation1.cs"::: (complete source file; reference: snippets/cs/cancellation1.cs)](../../../_code/docs/standard/parallel-programming/snippets/cs/cancellation1.cs.md)

[TPL_Continuations#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/cancellation1.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/cancellation1.vb.md)

You can also prevent a continuation from executing if its antecedent is canceled without providing the continuation a cancellation token. Provide the token by specifying the [System.Threading.Tasks.TaskContinuationOptions.NotOnCanceled](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions.NotOnCanceled) option when you create the continuation, as shown in the following example:

[language="csharp" source="snippets/cs/cancellation2.cs"::: (complete source file; reference: snippets/cs/cancellation2.cs)](../../../_code/docs/standard/parallel-programming/snippets/cs/cancellation2.cs.md)

[TPL_Continuations#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/cancellation2.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/cancellation2.vb.md)

After a continuation goes into the [System.Threading.Tasks.TaskStatus.Canceled](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.Canceled) state, it might affect continuations that follow, depending on the [System.Threading.Tasks.TaskContinuationOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions) that were specified for those continuations.

Continuations that are disposed won't start.

## Continuations and child tasks

A continuation doesn't run until the antecedent and all of its attached child tasks have completed. A continuation doesn't wait for detached child tasks to finish. The following two examples illustrate child tasks that are attached to and detached from an antecedent that creates a continuation. In the following example, the continuation runs only after all child tasks have completed, and multiple runs of the example produces identical output each time. The example launches the antecedent by calling the [System.Threading.Tasks.TaskFactory.StartNew*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.StartNew*) method because by default the [System.Threading.Tasks.Task.Run*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Run*) method creates a parent task whose default task creation option is [System.Threading.Tasks.TaskCreationOptions.DenyChildAttach](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions.DenyChildAttach).

[language="csharp" source="snippets/cs/attached1.cs"::: (complete source file; reference: snippets/cs/attached1.cs)](../../../_code/docs/standard/parallel-programming/snippets/cs/attached1.cs.md)

[TPL_Continuations#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/attached1.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/attached1.vb.md)

If child tasks are detached from the antecedent, however, the continuation runs as soon as the antecedent has terminated, regardless of the state of the child tasks. As a result, multiple runs of the following example can produce variable output that depends on how the task scheduler handled each child task:

[language="csharp" source="snippets/cs/detached1.cs"::: (complete source file; reference: snippets/cs/detached1.cs)](../../../_code/docs/standard/parallel-programming/snippets/cs/detached1.cs.md)

[TPL_Continuations#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/detached1.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/detached1.vb.md)

The final status of the antecedent task depends on the final status of any attached child tasks. The status of detached child tasks doesn't affect the parent. For more information, see [Attached and Detached Child Tasks](attached-and-detached-child-tasks.md).

## Associate state with continuations

You can associate arbitrary state with a task continuation. The [System.Threading.Tasks.Task.ContinueWith*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.ContinueWith*) method provides overloaded versions that each take an [System.Object](https://learn.microsoft.com/search/?terms=System.Object) value that represents the state of the continuation. You can later access this state object by using the [System.Threading.Tasks.Task.AsyncState](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.AsyncState) property. This state object is `null` if you don't provide a value.

Continuation state is useful when you convert existing code that uses the [Asynchronous Programming Model (APM)](../asynchronous-programming-patterns/asynchronous-programming-model-apm.md) to use the TPL. In the APM, you can provide object state in the **Begin**_Method_ method and later you can use the [System.IAsyncResult.AsyncState](https://learn.microsoft.com/search/?terms=System.IAsyncResult.AsyncState) property to access that state. To preserve this state when you convert a code that uses the APM to use the TPL, you use the [System.Threading.Tasks.Task.ContinueWith*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.ContinueWith*) method.

Continuation state can also be useful when you work with [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) objects in the Visual Studio debugger. For example, in the **Parallel Tasks** window, the **Task** column displays the string representation of the state object for each task. For more information about the **Parallel Tasks** window, see [Using the Tasks Window](https://learn.microsoft.com/visualstudio/debugger/using-the-tasks-window).

The following example shows how to use continuation state. It creates a chain of continuation tasks. Each task provides the current time, a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) object, for the `state` parameter of the [System.Threading.Tasks.Task.ContinueWith*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.ContinueWith*) method. Each [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) object represents the time at which the continuation task is created. Each task produces as its result a second [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) object that represents the time at which the task finishes. After all tasks finish, this example displays the creation time and the time at which each continuation task finishes.

[language="csharp" source="snippets/cs/continuationstate.cs"::: (complete source file; reference: snippets/cs/continuationstate.cs)](../../../_code/docs/standard/parallel-programming/snippets/cs/continuationstate.cs.md)

[TPL_ContinuationState#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuationstate/vb/continuationstate.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuationstate/vb/continuationstate.vb.md)

## Continuations that return Task types

Sometimes you might need to chain a continuation that returns a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) type. These tasks are referred as nested tasks. When a parent task calls [System.Threading.Tasks.Task`1.ContinueWith*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.ContinueWith*) and provides a `continuationFunction` that's task-returning, you can call [System.Threading.Tasks.TaskExtensions.Unwrap*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskExtensions.Unwrap*) to create a proxy task that represents the asynchronous operation of the `<Task<Task<T>>>` or `Task(Of Task(Of T))` (Visual Basic).

The following example shows how to use continuations that wrap additional task returning functions. Each continuation can be unwrapped, exposing the inner task that was wrapped.

[language="csharp" source="snippets/cs/unwrap.cs"::: (complete source file; reference: snippets/cs/unwrap.cs)](../../../_code/docs/standard/parallel-programming/snippets/cs/unwrap.cs.md)
[language="vb" source="snippets/vb/unwrap.vb"::: (complete source file; reference: snippets/vb/unwrap.vb)](../../../_code/docs/standard/parallel-programming/snippets/vb/unwrap.vb.md)

For more information on using [System.Threading.Tasks.TaskExtensions.Unwrap*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskExtensions.Unwrap*), see [How to: Unwrap a nested Task](how-to-unwrap-a-nested-task.md).

## Handle exceptions thrown from continuations

An antecedent-continuation relationship isn't a parent-child relationship. Exceptions thrown by continuations aren't propagated to the antecedent. Therefore, handle exceptions thrown by continuations as you would handle them in any other task, as follows:

- You can use the [System.Threading.Tasks.Task.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Wait*), [System.Threading.Tasks.Task.WaitAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAll*), or [System.Threading.Tasks.Task.WaitAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAny*) method, or its generic counterpart, to wait on the continuation. You can wait for an antecedent and its continuations in the same `try` statement, as shown in the following example:

[language="csharp" source="snippets/cs/exception1.cs"::: (complete source file; reference: snippets/cs/exception1.cs)](../../../_code/docs/standard/parallel-programming/snippets/cs/exception1.cs.md)

[TPL_Continuations#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/exception1.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/exception1.vb.md)

- You can use a second continuation to observe the [System.Threading.Tasks.Task.Exception](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Exception) property of the first continuation. In the following example, a task attempts to read from a non-existent file. The continuation then displays information about the exception in the antecedent task.

[language="csharp" source="snippets/cs/exception2.cs" id="example"::: (complete source file; reference: snippets/cs/exception2.cs)](../../../_code/docs/standard/parallel-programming/snippets/cs/exception2.cs.md)

[TPL_Continuations#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/exception2.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/exception2.vb.md)

Because it was run with the [System.Threading.Tasks.TaskContinuationOptions.OnlyOnFaulted](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions.OnlyOnFaulted) option, the continuation executes only if an exception occurs in the antecedent. Therefore it can assume that the antecedent's [System.Threading.Tasks.Task.Exception](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Exception) property isn't `null`. If the continuation executes whether or not an exception is thrown in the antecedent, it must check whether the antecedent's [System.Threading.Tasks.Task.Exception](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Exception) property isn't `null` before attempting to handle the exception, as the following code fragment shows:

[language="csharp" source="snippets/cs/exception2.cs" id="exception"::: (complete source file; reference: snippets/cs/exception2.cs)](../../../_code/docs/standard/parallel-programming/snippets/cs/exception2.cs.md)

[TPL_Continuations#11 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/exception2.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/exception2.vb.md)

For more information, see [Exception Handling](exception-handling-task-parallel-library.md).

- If the continuation is an attached child task that was created by using the [System.Threading.Tasks.TaskContinuationOptions.AttachedToParent](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions.AttachedToParent) option, its exceptions will be propagated by the parent back to the calling thread, as is the case in any other attached child. For more information, see [Attached and Detached Child Tasks](attached-and-detached-child-tasks.md).

## See also

- [Task Parallel Library (TPL)](task-parallel-library-tpl.md)
