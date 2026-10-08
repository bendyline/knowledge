---
description: "Learn more about: TPL and traditional .NET asynchronous programming"
title: "TPL and Traditional .NET Asynchronous Programming"
ms.date: 03/30/2017
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "tasks, with other asynchronous models"
ms.assetid: e7b31170-a156-433f-9f26-b1fc7cd1776f
---
# TPL and traditional .NET asynchronous programming

.NET provides the following two standard patterns for performing I/O-bound and compute-bound asynchronous operations:

- Asynchronous Programming Model (APM), in which asynchronous operations are represented by a pair of begin/end methods. For example: [System.IO.FileStream.BeginRead*](https://learn.microsoft.com/search/?terms=System.IO.FileStream.BeginRead*) and [System.IO.Stream.EndRead*](https://learn.microsoft.com/search/?terms=System.IO.Stream.EndRead*).

- Event-based asynchronous pattern (EAP), in which asynchronous operations are represented by a method/event pair that are named `<OperationName>Async` and `<OperationName>Completed`. For example: [System.Net.WebClient.DownloadStringAsync*](https://learn.microsoft.com/search/?terms=System.Net.WebClient.DownloadStringAsync*) and [System.Net.WebClient.DownloadStringCompleted](https://learn.microsoft.com/search/?terms=System.Net.WebClient.DownloadStringCompleted).

The Task Parallel Library (TPL) can be used in various ways in conjunction with either of the asynchronous patterns. You can expose both APM and EAP operations as `Task` objects to library consumers, or you can expose the APM patterns but use `Task` objects to implement them internally. In both scenarios, by using `Task` objects, you can simplify the code and take advantage of the following useful functionality:

- Register callbacks, in the form of task continuations, at any time after the task has started.

- Coordinate multiple operations that execute in response to a `Begin_` method by using the [System.Threading.Tasks.TaskFactory.ContinueWhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.ContinueWhenAll*) and [System.Threading.Tasks.TaskFactory.ContinueWhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.ContinueWhenAny*) methods, or the [System.Threading.Tasks.Task.WaitAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAll*) and [System.Threading.Tasks.Task.WaitAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAny*) methods.

- Encapsulate asynchronous I/O-bound and compute-bound operations in the same `Task` object.

- Monitor the status of the `Task` object.

- Marshal the status of an operation to a `Task` object by using [System.Threading.Tasks.TaskCompletionSource`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%601).

## Wrap APM operations in a Task

 Both the [System.Threading.Tasks.TaskFactory](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory) and [System.Threading.Tasks.TaskFactory`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory%601) classes provide several overloads of the [System.Threading.Tasks.TaskFactory.FromAsync*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.FromAsync*) and [System.Threading.Tasks.TaskFactory`1.FromAsync*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory%601.FromAsync*) methods that let you encapsulate an APM begin/end method pair in one [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) or [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) instance. The various overloads accommodate any begin/end method pair that have from zero to three input parameters.

 For pairs that have `End` methods that return a value (a `Function` in Visual Basic), use the methods in [System.Threading.Tasks.TaskFactory`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory%601) that create a [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601). For `End` methods that return void (a `Sub` in Visual Basic), use the methods in [System.Threading.Tasks.TaskFactory](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory) that create a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task).

 For those few cases in which the `Begin` method has more than three parameters or contains `ref` or `out` parameters, additional `FromAsync` overloads that encapsulate only the `End` method are provided.

 The following example shows the signature for the `FromAsync` overload that matches the [System.IO.FileStream.BeginRead*](https://learn.microsoft.com/search/?terms=System.IO.FileStream.BeginRead*) and [System.IO.FileStream.EndRead*](https://learn.microsoft.com/search/?terms=System.IO.FileStream.EndRead*) methods.

 [FromAsync#01 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/fromasync/cs/fromasync.cs#01)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/fromasync/cs/fromasync.cs.md)
 [FromAsync#01 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/fromasync/vb/module1.vb#01)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/fromasync/vb/module1.vb.md)

This overload takes three input parameters, as follows. The first parameter is a [System.Func`6](https://learn.microsoft.com/search/?terms=System.Func%606) delegate that matches the signature of the [System.IO.FileStream.BeginRead*](https://learn.microsoft.com/search/?terms=System.IO.FileStream.BeginRead*) method. The second parameter is a [System.Func`2](https://learn.microsoft.com/search/?terms=System.Func%602) delegate that takes an [System.IAsyncResult](https://learn.microsoft.com/search/?terms=System.IAsyncResult) and returns a `TResult`. Because [System.IO.FileStream.EndRead*](https://learn.microsoft.com/search/?terms=System.IO.FileStream.EndRead*) returns an integer, the compiler infers the type of `TResult` as [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) and the type of the task as [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task). The last four parameters are identical to those in the [System.IO.FileStream.BeginRead*](https://learn.microsoft.com/search/?terms=System.IO.FileStream.BeginRead*) method:

- The buffer in which to store the file data.

- The offset in the buffer at which to begin writing data.

- The maximum amount of data to read from the file.

- An optional object that stores user-defined state data to pass to the callback.

### Use ContinueWith for the callback functionality

 If you require access to the data in the file, as opposed to just the number of bytes, the [System.Threading.Tasks.TaskFactory.FromAsync*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.FromAsync*) method is not sufficient. Instead, use [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task), whose `Result` property contains the file data. You can do this by adding a continuation to the original task. The continuation performs the work that would typically be performed by the [System.AsyncCallback](https://learn.microsoft.com/search/?terms=System.AsyncCallback) delegate. It is invoked when the antecedent completes, and the data buffer has been filled. (The [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) object should be closed before returning.)

 The following example shows how to return a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) that encapsulates the `BeginRead`/`EndRead` pair of the [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) class.

 [FromAsync#03 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/fromasync/cs/fromasync.cs#03)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/fromasync/cs/fromasync.cs.md)
 [FromAsync#03 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/fromasync/vb/module1.vb#03)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/fromasync/vb/module1.vb.md)

 The method can then be called, as follows.

 [FromAsync#04 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/fromasync/cs/fromasync.cs#04)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/fromasync/cs/fromasync.cs.md)
 [FromAsync#04 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/fromasync/vb/module1.vb#04)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/fromasync/vb/module1.vb.md)

### Provide custom state data

 In typical [System.IAsyncResult](https://learn.microsoft.com/search/?terms=System.IAsyncResult) operations, if your [System.AsyncCallback](https://learn.microsoft.com/search/?terms=System.AsyncCallback) delegate requires some custom state data, you have to pass it in through the last parameter in the `Begin` method, so that the data can be packaged into the [System.IAsyncResult](https://learn.microsoft.com/search/?terms=System.IAsyncResult) object that is eventually passed to the callback method. This is typically not required when the `FromAsync` methods are used. If the custom data is known to the continuation, then it can be captured directly in the continuation delegate. The following example resembles the previous example, but instead of examining the `Result` property of the antecedent, the continuation examines the custom state data that is directly accessible to the user delegate of the continuation.

 [FromAsync#05 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/fromasync/cs/fromasync.cs#05)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/fromasync/cs/fromasync.cs.md)
 [FromAsync#05 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/fromasync/vb/module1.vb#05)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/fromasync/vb/module1.vb.md)

### Synchronize multiple FromAsync tasks

 The static [System.Threading.Tasks.TaskFactory.ContinueWhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.ContinueWhenAll*) and [System.Threading.Tasks.TaskFactory.ContinueWhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.ContinueWhenAny*) methods provide added flexibility when used in conjunction with the `FromAsync` methods. The following example shows how to initiate multiple asynchronous I/O operations, and then wait for all of them to complete before you execute the continuation.

 [FromAsync#06 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/fromasync/cs/fromasync.cs#06)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/fromasync/cs/fromasync.cs.md)
 [FromAsync#06 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/fromasync/vb/module1.vb#06)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/fromasync/vb/module1.vb.md)

### FromAsync tasks for only the End method

 For those few cases in which the `Begin` method requires more than three input parameters or has `ref` or `out` parameters, you can use the `FromAsync` overloads, for example, [System.Threading.Tasks.TaskFactory`1.FromAsync%28System.IAsyncResult%2CSystem.Func%7BSystem.IAsyncResult%2C`0%7D%29](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory%601.FromAsync%2528System.IAsyncResult%252CSystem.Func%257BSystem.IAsyncResult%252C%600%257D%2529), that represent only the `End` method. These methods can also be used in any scenario in which you're passed an [System.IAsyncResult](https://learn.microsoft.com/search/?terms=System.IAsyncResult) and want to encapsulate it in a Task.

 [FromAsync#07 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/fromasync/cs/fromasync.cs#07)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/fromasync/cs/fromasync.cs.md)
 [FromAsync#07 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/fromasync/vb/module1.vb#07)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/fromasync/vb/module1.vb.md)

### Start and cancel FromAsync tasks

 The task returned by a `FromAsync` method has a status of `WaitingForActivation` and will be started by the system at some point after the task is created. If you attempt to call Start on such a task, an exception will be raised.

 You cannot cancel a `FromAsync` task, because the underlying .NET APIs currently do not support in-progress cancellation of file or network I/O. You can add cancellation functionality to a method that encapsulates a `FromAsync` call, but you can only respond to the cancellation before `FromAsync` is called or after it completed (for example, in a continuation task).

 Some classes that support EAP, for example, [System.Net.WebClient](https://learn.microsoft.com/search/?terms=System.Net.WebClient), do support cancellation, and you can integrate that native cancellation functionality by using cancellation tokens.

## Expose complex EAP operations As tasks

 The TPL does not provide any methods that are specifically designed to encapsulate an event-based asynchronous operation in the same way that the `FromAsync` family of methods wrap the [System.IAsyncResult](https://learn.microsoft.com/search/?terms=System.IAsyncResult) pattern. However, the TPL does provide the [System.Threading.Tasks.TaskCompletionSource`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%601) class, which can be used to represent any arbitrary set of operations as a [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601). The operations may be synchronous or asynchronous, and may be I/O bound or compute-bound, or both.

 The following example shows how to use a [System.Threading.Tasks.TaskCompletionSource`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%601) to expose a set of asynchronous [System.Net.WebClient](https://learn.microsoft.com/search/?terms=System.Net.WebClient) operations to client code as a basic [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601). The method lets you enter an array of Web URLs, and a term or name to search for, and then returns the number of times the search term occurs on each site.

 [FromAsync#10 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/fromasync/cs/snippet10.cs#10)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/fromasync/cs/snippet10.cs.md)
 [FromAsync#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/fromasync/vb/snippet10.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/fromasync/vb/snippet10.vb.md)

 For a more complete example, which includes additional exception handling and shows how to call the method from client code, see [How to: Wrap EAP Patterns in a Task](how-to-wrap-eap-patterns-in-a-task.md).

 Remember that any task that's created by a [System.Threading.Tasks.TaskCompletionSource`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%601) will be started by that `TaskCompletionSource` and, therefore, user code should not call the `Start` method on that task.

## Implement the APM pattern by using tasks

 In some scenarios, it may be desirable to directly expose the [System.IAsyncResult](https://learn.microsoft.com/search/?terms=System.IAsyncResult) pattern by using begin/end method pairs in an API. For example, you may want to maintain consistency with existing APIs, or you may have automated tools that require this pattern. In such cases, you can use `Task` objects to simplify how the APM pattern is implemented internally.

 The following example shows how to use tasks to implement an APM begin/end method pair for a long-running compute-bound method.

 [FromAsync#09 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/fromasync/cs/fromasync.cs#09)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/fromasync/cs/fromasync.cs.md)
 [FromAsync#09 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/fromasync/vb/module1.vb#09)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/fromasync/vb/module1.vb.md)

## Use the StreamExtensions sample code

 The *StreamExtensions.cs* file, in the [.NET Standard parallel extensions extras](https://learn.microsoft.com/samples/dotnet/samples/parallel-programming-extensions-extras-cs/) repository, contains several reference implementations that use `Task` objects for asynchronous file and network I/O.

## See also

- [Task Parallel Library (TPL)](task-parallel-library-tpl.md)
