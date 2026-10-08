---
title: "Cancellation in Managed Threads"
description: Understand cancellation in managed threads. Learn about cancellation tokens in cooperative cancellation of asynchronous or long-running synchronous operations.
ms.date: "03/17/2026"
ai-usage: ai-assisted
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "cancellation in .NET, overview"
ms.assetid: eea11fe5-d8b0-4314-bb5d-8a58166fb1c3
---
# Cancellation in Managed Threads

.NET uses a unified model for cooperative cancellation of asynchronous or long-running synchronous operations. This model is based on a lightweight object called a cancellation token. The object that invokes one or more cancelable operations, for example by creating new threads or tasks, passes the token to each operation. Individual operations can in turn pass copies of the token to other operations. At some later time, the object that created the token can use it to request that the operations stop what they are doing. Only the requesting object can issue the cancellation request, and each listener is responsible for noticing the request and responding to it in an appropriate and timely manner.

The general pattern for implementing the cooperative cancellation model is:

- Instantiate a [System.Threading.CancellationTokenSource](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource) object, which manages and sends cancellation notification to the individual cancellation tokens.

- Pass the token returned by the [System.Threading.CancellationTokenSource.Token](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.Token) property to each task or thread that listens for cancellation.

- Provide a mechanism for each task or thread to respond to cancellation.

- Call the [System.Threading.CancellationTokenSource.Cancel*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.Cancel*) method to provide notification of cancellation.

> **Important:**
> The [System.Threading.CancellationTokenSource](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource) class implements the [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) interface. You should be sure to call the [System.Threading.CancellationTokenSource.Dispose*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.Dispose*) method when you have finished using the cancellation token source to free any unmanaged resources it holds.

 The following illustration shows the relationship between a token source and all the copies of its token.

 CancellationTokenSource and cancellation tokens

 The cooperative cancellation model makes it easier to create cancellation-aware applications and libraries, and it supports the following features:

- Cancellation is cooperative and is not forced on the listener. The listener determines how to gracefully terminate in response to a cancellation request.

- Requesting is distinct from listening. An object that invokes a cancelable operation can control when (if ever) cancellation is requested.

- The requesting object issues the cancellation request to all copies of the token by using just one method call.

- A listener can listen to multiple tokens simultaneously by joining them into one *linked token*.

- User code can notice and respond to cancellation requests from library code, and library code can notice and respond to cancellation requests from user code.

- Listeners can be notified of cancellation requests by polling, callback registration, or waiting on wait handles.

## Cancellation Types

 The cancellation framework is implemented as a set of related types, which are listed in the following table.

| Type name | Description |
| --- | --- |
| [System.Threading.CancellationTokenSource](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource) | Object that creates a cancellation token, and also issues the cancellation request for all copies of that token. |
| [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) | Lightweight value type passed to one or more listeners, typically as a method parameter. Listeners monitor the value of the `IsCancellationRequested` property of the token by polling, callback, or wait handle. |
| [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) | Overloads of this exception's constructor accept a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) as a parameter. Listeners can optionally throw this exception to verify the source of the cancellation and notify others that it has responded to a cancellation request. |

 The cancellation model is integrated into .NET in several types. The most important ones are [System.Threading.Tasks.Parallel](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel), [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task), [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) and [System.Linq.ParallelEnumerable](https://learn.microsoft.com/search/?terms=System.Linq.ParallelEnumerable). We recommend that you use this cooperative cancellation model for all new library and application code.

## Code Example

 In the following example, the requesting object creates a [System.Threading.CancellationTokenSource](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource) object, and then passes its [System.Threading.CancellationTokenSource.Token](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.Token) property to the cancelable operation. The operation that receives the request monitors the value of the [System.Threading.CancellationToken.IsCancellationRequested](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.IsCancellationRequested) property of the token by polling. When the value becomes `true`, the listener can terminate in whatever manner is appropriate. In this example, the method just exits, which is all that is required in many cases.

> **Note:**
> The example uses the [System.Threading.ThreadPool.QueueUserWorkItem*](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool.QueueUserWorkItem*) method to demonstrate that the cooperative cancellation framework is compatible with legacy APIs. For an example that uses the preferred [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) type, see [How to: Cancel a Task and Its Children](../parallel-programming/how-to-cancel-a-task-and-its-children.md).

 [Cancellation#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/cancellationex1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/cancellationex1.cs.md)
 [Cancellation#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/cancellationex1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/cancellationex1.vb.md)

## Operation Cancellation Versus Object Cancellation

 In the cooperative cancellation framework, cancellation refers to operations, not objects. The cancellation request means that the operation should stop as soon as possible after any required cleanup is performed. One cancellation token should refer to one "cancelable operation," however that operation may be implemented in your program. After the [System.Threading.CancellationToken.IsCancellationRequested](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.IsCancellationRequested) property of the token has been set to `true`, it cannot be reset to `false`. Therefore, cancellation tokens cannot be reused after they have been canceled.

 If you require an object cancellation mechanism, you can base it on the operation cancellation mechanism by calling the [System.Threading.CancellationToken.Register*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.Register*) method, as shown in the following example.

 [Cancellation#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/objectcancellation1.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/objectcancellation1.cs.md)
 [Cancellation#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/objectcancellation1.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/objectcancellation1.vb.md)

 If an object supports more than one concurrent cancelable operation, pass a separate token as input to each distinct cancelable operation. That way, one operation can be cancelled without affecting the others.

## Listening and Responding to Cancellation Requests

 In the user delegate, the implementer of a cancelable operation determines how to terminate the operation in response to a cancellation request. In many cases, the user delegate can just perform any required cleanup and then return immediately.

 However, in more complex cases, it might be necessary for the user delegate to notify library code that cancellation has occurred. In such cases, the correct way to terminate the operation is for the delegate to call the [System.Threading.CancellationToken.ThrowIfCancellationRequested*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.ThrowIfCancellationRequested*), method, which will cause an [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) to be thrown. Library code can catch this exception on the user delegate thread and examine the exception's token to determine whether the exception indicates cooperative cancellation or some other exceptional situation.

 The [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) class handles [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) in this way. For more information, see [Task Cancellation](../parallel-programming/task-cancellation.md).

### Listening by Polling

 For long-running computations that loop or recurse, you can listen for a cancellation request by periodically polling the value of the [System.Threading.CancellationToken.IsCancellationRequested](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.IsCancellationRequested) property. If its value is `true`, the method should clean up and terminate as quickly as possible. The optimal frequency of polling depends on the type of application. It is up to the developer to determine the best polling frequency for any given program. Polling itself does not significantly impact performance. The following example shows one possible way to poll.

 [Cancellation#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/cancellationex11.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/cancellationex11.cs.md)
 [Cancellation#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/cancellationex11.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/cancellationex11.vb.md)

 For a more complete example, see [How to: Listen for Cancellation Requests by Polling](how-to-listen-for-cancellation-requests-by-polling.md).

### Listening by Registering a Callback

 Some operations can become blocked in such a way that they cannot check the value of the cancellation token in a timely manner. For these cases, you can register a callback method that unblocks the method when a cancellation request is received.

 The [System.Threading.CancellationToken.Register*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.Register*) method returns a [System.Threading.CancellationTokenRegistration](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenRegistration) object that is used specifically for this purpose. The following example shows how to use the [System.Threading.CancellationToken.Register*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.Register*) method to cancel an asynchronous web request.

 [Cancellation#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/cancellationex4.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/cancellationex4.cs.md)
 [Cancellation#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/cancellationex4.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/cancellationex4.vb.md)

 The [System.Threading.CancellationTokenRegistration](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenRegistration) object manages thread synchronization and ensures that the callback will stop executing at a precise point in time.

 In order to ensure system responsiveness and to avoid deadlocks, the following guidelines must be followed when registering callbacks:

- The callback method should be fast because it is called synchronously and therefore the call to [System.Threading.CancellationTokenSource.Cancel*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.Cancel*) does not return until the callback returns.

- If you call [System.Threading.CancellationTokenRegistration.Dispose*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenRegistration.Dispose*) while the callback is running, and you hold a lock that the callback is waiting on, your program can deadlock. After `Dispose` returns, you can free any resources required by the callback.

- Callbacks should not perform any manual thread or [System.Threading.SynchronizationContext](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationContext) usage in a callback. If a callback must run on a particular thread, use the [System.Threading.CancellationTokenRegistration](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenRegistration) constructor that enables you to specify that the target syncContext is the active [System.Threading.SynchronizationContext.Current*](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationContext.Current*). Performing manual threading in a callback can cause deadlock.

 For a more complete example, see [How to: Register Callbacks for Cancellation Requests](how-to-register-callbacks-for-cancellation-requests.md).

### Listening by Using a Wait Handle

 When a cancelable operation can block while it waits on a synchronization primitive such as a [System.Threading.ManualResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEvent) or [System.Threading.Semaphore](https://learn.microsoft.com/search/?terms=System.Threading.Semaphore), you can use the [System.Threading.CancellationToken.WaitHandle](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.WaitHandle) property to enable the operation to wait on both the event and the cancellation request. The wait handle of the cancellation token will become signaled in response to a cancellation request, and the method can use the return value of the [System.Threading.WaitHandle.WaitAny*](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle.WaitAny*) method to determine whether it was the cancellation token that signaled. The operation can then just exit, or throw an [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException), as appropriate.

 [Cancellation#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/cancellationex9.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/cancellationex9.cs.md)
 [Cancellation#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/cancellationex9.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/cancellationex9.vb.md)

[System.Threading.ManualResetEventSlim](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEventSlim) and [System.Threading.SemaphoreSlim](https://learn.microsoft.com/search/?terms=System.Threading.SemaphoreSlim) both support the cancellation framework in their `Wait` methods. You can pass the [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) to the method, and when the cancellation is requested, the event wakes up and throws an [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException).

 [Cancellation#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/cancellationex10.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/cancellationex10.cs.md)
 [Cancellation#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/cancellationex10.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/cancellationex10.vb.md)

 For a more complete example, see [How to: Listen for Cancellation Requests That Have Wait Handles](how-to-listen-for-cancellation-requests-that-have-wait-handles.md).

### Listen to multiple tokens simultaneously

 In some cases, a listener might have to listen to multiple cancellation tokens simultaneously. For example, a cancelable operation might have to monitor an internal cancellation token in addition to a token passed in externally as an argument to a method parameter. To accomplish this, create a linked token source that can join two or more tokens into one token.

 The following example shows the most common use of a linked token: a child token that is cancelled when the parent token is cancelled. You can also cancel the child independently by calling `Cancel` on the child `CancellationTokenSource`.

[language="csharp" source="./snippets/cancellation-in-managed-threads/csharp/LinkedTokens/Program.cs" id="LinkedTokens"::: (complete source file; reference: ./snippets/cancellation-in-managed-threads/csharp/LinkedTokens/Program.cs)](../../../_code/docs/standard/threading/snippets/cancellation-in-managed-threads/csharp/LinkedTokens/Program.cs.md)
[language="vb" source="./snippets/cancellation-in-managed-threads/vb/LinkedTokens/Program.vb" id="LinkedTokens"::: (complete source file; reference: ./snippets/cancellation-in-managed-threads/vb/LinkedTokens/Program.vb)](../../../_code/docs/standard/threading/snippets/cancellation-in-managed-threads/vb/LinkedTokens/Program.vb.md)

 A more complex scenario involves a cancelable operation that must monitor both an external token passed in from a caller and an internal token. The following example shows how to create such a linked token.

 [Cancellation#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/cancellationex13.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/cancellationex13.cs.md)
 [Cancellation#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/cancellationex13.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/cancellationex13.vb.md)

 Notice that you must call `Dispose` on the linked token source when you're done with it. For a more complete example, see [How to: Listen for Multiple Cancellation Requests](how-to-listen-for-multiple-cancellation-requests.md).

## Cooperation Between Library Code and User Code

 The unified cancellation framework makes it possible for library code to cancel user code, and for user code to cancel library code in a cooperative manner. Smooth cooperation depends on each side following these guidelines:

- If library code provides cancelable operations, it should also provide public methods that accept an external cancellation token so that user code can request cancellation.

- If library code calls into user code, the library code should interpret an OperationCanceledException(externalToken) as *cooperative cancellation*, and not necessarily as a failure exception.

- User-delegates should attempt to respond to cancellation requests from library code in a timely manner.

 [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) and [System.Linq.ParallelEnumerable](https://learn.microsoft.com/search/?terms=System.Linq.ParallelEnumerable) are examples of classes that follow these guidelines. For more information, see [Task Cancellation](../parallel-programming/task-cancellation.md) and [How to: Cancel a PLINQ Query](../parallel-programming/how-to-cancel-a-plinq-query.md).

## See also

- [Managed Threading Basics](managed-threading-basics.md)
