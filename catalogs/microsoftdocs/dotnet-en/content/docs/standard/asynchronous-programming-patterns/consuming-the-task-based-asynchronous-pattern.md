---
title: "Consuming the Task-based Asynchronous Pattern"
description: Learn to consume the Task-based Asynchronous Pattern (TAP) when working with asynchronous operations.
ms.date: 08/06/2026
helpviewer_keywords:
  - ".NET and TAP"
  - "asynchronous design patterns, .NET"
  - "TAP, .NET support for"
  - "Task-based Asynchronous Pattern, .NET support for"
  - ".NET, asynchronous design patterns"
---
# Consuming the Task-based Asynchronous Pattern

When you use the Task-based Asynchronous Pattern (TAP) to work with asynchronous operations, you can use callbacks to achieve waiting without blocking. For tasks, this pattern uses methods such as [System.Threading.Tasks.Task.ContinueWith*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.ContinueWith*). Language-based asynchronous support hides callbacks by allowing asynchronous operations to be awaited within normal control flow, and compiler-generated code provides this same API-level support.

## Suspending Execution with Await

You can use the [await](../../csharp/language-reference/operators/await.md) keyword in C# and the [Await Operator](../../visual-basic/language-reference/operators/await-operator.md) in Visual Basic to asynchronously await [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) and [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) objects. When you await a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task), the `await` expression is of type `void`. When you await a [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601), the `await` expression is of type `TResult`. An `await` expression must occur inside the body of an asynchronous method.

 Under the covers, the await functionality installs a callback on the task by using a continuation. This callback resumes the asynchronous method at the point of suspension. When the asynchronous method is resumed, if the awaited operation completed successfully and was a [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601), its `TResult` is returned. If the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) or [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) that was awaited ended in the [System.Threading.Tasks.TaskStatus.Canceled](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.Canceled) state, an [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) exception is thrown. If the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) or [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) that was awaited ended in the [System.Threading.Tasks.TaskStatus.Faulted](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.Faulted) state, the exception that caused it to fault is thrown. A `Task` can fault as a result of multiple exceptions, but only one of these exceptions is propagated. However, the [System.Threading.Tasks.Task.Exception](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Exception) property returns an [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) exception that contains all the errors.

 If a synchronization context ([System.Threading.SynchronizationContext](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationContext) object) is associated with the thread that was executing the asynchronous method at the time of suspension (for example, if the [System.Threading.SynchronizationContext.Current](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationContext.Current) property is not `null`), the asynchronous method resumes on that same synchronization context by using the context's [System.Threading.SynchronizationContext.Post*](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationContext.Post*) method. Otherwise, it relies on the task scheduler ([System.Threading.Tasks.TaskScheduler](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler) object) that was current at the time of suspension. Typically, this is the default task scheduler ([System.Threading.Tasks.TaskScheduler.Default*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler.Default*)), which targets the thread pool. This task scheduler determines whether the awaited asynchronous operation should resume where it completed or whether the resumption should be scheduled. The default scheduler typically allows the continuation to run on the thread that the awaited operation completed.

 When you call an asynchronous method, it synchronously executes the body of the function up until the first await expression on an awaitable instance that isn't yet complete, at which point the invocation returns to the caller. If the asynchronous method doesn't return `void`, it returns a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) or [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) object to represent the ongoing computation. In a non-void asynchronous method, if a return statement is encountered or the end of the method body is reached, the task is completed in the [System.Threading.Tasks.TaskStatus.RanToCompletion](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.RanToCompletion) final state. If an unhandled exception causes control to leave the body of the asynchronous method, the task ends in the [System.Threading.Tasks.TaskStatus.Faulted](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.Faulted) state. If that exception is an [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException), the task instead ends in the [System.Threading.Tasks.TaskStatus.Canceled](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus.Canceled) state. In this manner, the result or exception is eventually published.

 Several important variations of this behavior exist. For performance reasons, if a task is already complete by the time the task is awaited, control isn't yielded, and the function continues to execute. Additionally, returning to the original context isn't always the desired behavior and can be changed; this behavior is described in more detail in the next section.

### Configuring Suspension and Resumption with Yield and ConfigureAwait

 Several methods provide more control over an asynchronous method's execution. For example, you can use the [System.Threading.Tasks.Task.Yield*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Yield*) method to introduce a yield point into the asynchronous method:

```csharp
public class Task : …
{
    public static YieldAwaitable Yield();
    …
}
```

 This method is equivalent to asynchronously posting or scheduling back to the current context.

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="YieldLoop"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="YieldLoop"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

 You can also use the [System.Threading.Tasks.Task.ConfigureAwait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.ConfigureAwait*) method for better control over suspension and resumption in an asynchronous method. As mentioned previously, by default, the current context is captured at the time an asynchronous  method is suspended, and that captured context is used to invoke the asynchronous  method's continuation upon resumption. In many cases, this is the exact behavior you want. In other cases, you might not care about the continuation context, and you can achieve better performance by avoiding such posts back to the original context. To enable this behavior, use the [System.Threading.Tasks.Task.ConfigureAwait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.ConfigureAwait*) method to inform the await operation not to capture and resume on the context, but to continue execution wherever the asynchronous operation that was being awaited completed:

```csharp
await someTask.ConfigureAwait(continueOnCapturedContext:false);
```

### Awaitables, ConfigureAwait, and SynchronizationContext

`await` works with any type that satisfies the [awaitable expression pattern](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#12992-awaitable-expressions), not just [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task). A type is awaitable if it provides a compatible `GetAwaiter` method that returns a type with `IsCompleted`, `OnCompleted`, and `GetResult` members. In most public APIs, return [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task), [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601), [System.Threading.Tasks.ValueTask](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ValueTask), or [System.Threading.Tasks.ValueTask`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ValueTask%601). Use custom awaitables only for specialized scenarios.

Use [System.Threading.Tasks.Task.ConfigureAwait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.ConfigureAwait*) when the continuation doesn't need the caller's context. In app code that updates a UI, context capture is often required. In reusable library code, `ConfigureAwait(false)` is usually preferred because it avoids unnecessary context hops and reduces deadlock risk for callers that block.

`ConfigureAwait(false)` changes continuation scheduling, not [System.Threading.ExecutionContext](https://learn.microsoft.com/search/?terms=System.Threading.ExecutionContext) flow. For a deeper explanation of context behavior, see [ExecutionContext and SynchronizationContext](executioncontext-synchronizationcontext.md).

## Canceling an asynchronous operation

TAP methods that support cancellation provide at least one overload that accepts a cancellation token ([System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) object).

 You create a cancellation token through a cancellation token source ([System.Threading.CancellationTokenSource](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource) object). The source's [System.Threading.CancellationTokenSource.Token](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.Token) property returns the cancellation token that signals when the source's [System.Threading.CancellationTokenSource.Cancel*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.Cancel*) method is called.

```csharp
var cts = new CancellationTokenSource();
string result = await DownloadStringTaskAsync(url, cts.Token);
… // at some point later, potentially on another thread
cts.Cancel();
```

 For example, if you want to download a single webpage and you want to be able to cancel the operation, create a [System.Threading.CancellationTokenSource](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource) object, pass its token to the TAP method, and then call the source's [System.Threading.CancellationTokenSource.Cancel*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.Cancel*) method when you're ready to cancel the operation:

```csharp
var cts = new CancellationTokenSource();
    IList<string> results = await Task.WhenAll(from url in urls select DownloadStringTaskAsync(url, cts.Token));
    // at some point later, potentially on another thread
    …
    cts.Cancel();
```

 Or, you can pass the same token to a selective subset of operations:

```csharp
var cts = new CancellationTokenSource();
    byte [] data = await DownloadDataAsync(url, cts.Token);
    await SaveToDiskAsync(outputPath, data, CancellationToken.None);
    … // at some point later, potentially on another thread
    cts.Cancel();
```

> **Important:**
> Any thread can initiate cancellation requests.

 You can pass the [System.Threading.CancellationToken.None*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.None*) value to any method that accepts a cancellation token to indicate that cancellation is never requested. This value causes the [System.Threading.CancellationToken.CanBeCanceled](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.CanBeCanceled) property to return `false`, and the called method can optimize accordingly. For testing purposes, you can also pass in a pre-canceled cancellation token that is instantiated by using the constructor that accepts a Boolean value to indicate whether the token should start in an already-canceled or not-cancelable state.

 This approach to cancellation has several advantages:

- You can pass the same cancellation token to any number of asynchronous and synchronous operations.

- The same cancellation request can go to any number of listeners.

- The developer of the asynchronous API has complete control over whether cancellation can be requested and when it takes effect.

- The code that consumes the API can selectively determine the asynchronous invocations that cancellation requests go to.

## Monitoring progress

 Some asynchronous methods expose progress through a progress interface that you pass into the asynchronous method. For example, consider a function that asynchronously downloads a string of text, and along the way raises progress updates that include the percentage of the download that has completed thus far. You can consume such a method in a Windows Presentation Foundation (WPF) application as follows:

```csharp
private async void btnDownload_Click(object sender, RoutedEventArgs e)
{
    btnDownload.IsEnabled = false;
    try
    {
        txtResult.Text = await DownloadStringTaskAsync(txtUrl.Text,
            new Progress<int>(p => pbDownloadProgress.Value = p));
    }
    finally { btnDownload.IsEnabled = true; }
}
```

<a name="combinators"></a>

## Using the built-in task-based combinators

 The [System.Threading.Tasks](https://learn.microsoft.com/search/?terms=System.Threading.Tasks) namespace includes several methods for composing and working with tasks.

> **Note:**
> Several code samples in this section use [System.Drawing.Bitmap](https://learn.microsoft.com/search/?terms=System.Drawing.Bitmap), which requires the `System.Drawing.Common` package and is supported only on Windows. The async patterns they demonstrate apply on all platforms; substitute a cross-platform imaging library for non-Windows targets.

### Task.Run

 The [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) class includes several [System.Threading.Tasks.Task.Run*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Run*) methods that let you easily offload work as a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) or [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) to the thread pool. For example:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="TaskRunBasic"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="TaskRunBasic"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

 Some of these [System.Threading.Tasks.Task.Run*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Run*) methods, such as the [System.Threading.Tasks.Task.Run%28System.Func%7BSystem.Threading.Tasks.Task%7D%29](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Run%2528System.Func%257BSystem.Threading.Tasks.Task%257D%2529) overload, exist as shorthand for the [System.Threading.Tasks.TaskFactory.StartNew*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.StartNew*) method. This overload enables you to use `await` within the offloaded work. For example:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="TaskRunAsync"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="TaskRunAsync"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

 Such overloads are logically equivalent to using the [System.Threading.Tasks.TaskFactory.StartNew*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.StartNew*) method in conjunction with the [System.Threading.Tasks.TaskExtensions.Unwrap*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskExtensions.Unwrap*) extension method in the Task Parallel Library.

### Task.FromResult

 Use the [System.Threading.Tasks.Task.FromResult*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.FromResult*) method in scenarios where data might already be available and you just need to return it from a task-returning method lifted into a [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601):

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="TaskFromResult"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="TaskFromResult"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

### Task.WhenAll

 Use the [System.Threading.Tasks.Task.WhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAll*) method to asynchronously wait on multiple asynchronous operations that are represented as tasks. The method has multiple overloads that support a set of non-generic tasks or a non-uniform set of generic tasks (for example, asynchronously waiting for multiple void-returning operations, or asynchronously waiting for multiple value-returning methods where each value might have a different type) and to support a uniform set of generic tasks (such as asynchronously waiting for multiple `TResult`-returning methods).

 Suppose you want to send email messages to several customers. You can overlap sending the messages so you're not waiting for one message to complete before sending the next. You can also find out when the send operations complete and whether any errors occur:

```csharp
IEnumerable<Task> asyncOps = from addr in addrs select SendMailAsync(addr);
await Task.WhenAll(asyncOps);
```

 This code doesn't explicitly handle exceptions that might occur, but it lets exceptions propagate out of the `await` on the resulting task from [System.Threading.Tasks.Task.WhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAll*). To handle the exceptions, use code such as the following:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="WhenAllWithCatch"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="WhenAllWithCatch"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

 In this case, if any asynchronous operation fails, all the exceptions are consolidated in an [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) exception, which is stored in the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) that is returned from the [System.Threading.Tasks.Task.WhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAll*) method. However, only one of those exceptions is propagated by the `await` keyword. If you want to examine all the exceptions, you can rewrite the previous code as follows:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="WhenAllExamineExceptions"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="WhenAllExamineExceptions"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

 Consider an example of downloading multiple files from the web asynchronously. In this case, all the asynchronous operations have homogeneous result types, and it's easy to access the results:

```csharp
string [] pages = await Task.WhenAll(
    from url in urls select DownloadStringTaskAsync(url));
```

 You can use the same exception-handling techniques discussed in the previous void-returning scenario:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="WhenAllDownloadPagesExceptions"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="WhenAllDownloadPagesExceptions"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

### Task.WhenAny

 Use the [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) method to asynchronously wait for just one of multiple asynchronous operations represented as tasks to complete. This method serves four primary use cases:

- Redundancy:  Performing an operation multiple times and selecting the one that completes first (for example, contacting multiple stock quote web services that return a single result and selecting the one that completes the fastest).

- Interleaving:  Launching multiple operations and waiting for all of them to complete, but processing them as they complete.

- Throttling:  Allowing additional operations to begin as others complete. This scenario is an extension of the interleaving scenario.

- Early bailout:  For example, an operation represented by task t1 can be grouped in a [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) task with another task t2, and you can wait on the [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) task. Task t2 could represent a time-out, or cancellation, or some other signal that causes the [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) task to complete before t1 completes.

#### Redundancy

 Consider a case where you want to make a decision about whether to buy a stock. Several stock recommendation web services exist that you trust, but depending on daily load, each service can end up being slow at different times. Use the [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) method to receive a notification when any operation completes:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="WhenAnyRedundancy"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="WhenAnyRedundancy"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

 Unlike [System.Threading.Tasks.Task.WhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAll*), which returns the unwrapped results of all tasks that completed successfully, [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) returns the task that completed. If a task fails, it's important to know that it failed, and if a task succeeds, it's important to know which task the return value is associated with. Therefore, you need to access the result of the returned task, or further await it, as  this example shows.

 As with [System.Threading.Tasks.Task.WhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAll*), you have to be able to accommodate exceptions. Because you receive the completed task back, you can await the returned task to have errors propagated, and `try/catch` them appropriately; for example:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="WhenAnyRetryOnException"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="WhenAnyRetryOnException"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

 Additionally, even if a first task completes successfully, subsequent tasks might fail. At this point, you have several options for dealing with exceptions:  You can wait until all the launched tasks complete, in which case you can use the [System.Threading.Tasks.Task.WhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAll*) method, or you can decide that all exceptions are important and must be logged. For this scenario, you can use continuations to receive a notification when tasks complete asynchronously:

```csharp
foreach(Task recommendation in recommendations)
{
    var ignored = recommendation.ContinueWith(
        t => { if (t.IsFaulted) Log(t.Exception); });
}
```

 or:

```csharp
foreach(Task recommendation in recommendations)
{
    var ignored = recommendation.ContinueWith(
        t => Log(t.Exception), TaskContinuationOptions.OnlyOnFaulted);
}
```

 or even:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="LogCompletionIfFailed"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="LogCompletionIfFailed"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

 Finally, you might want to cancel all the remaining operations:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="WhenAnyCancelRemainder"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="WhenAnyCancelRemainder"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

#### Interleaving

 Consider a case where you're downloading images from the web and processing each image (for example, adding the image to a UI control). You process the images sequentially on the UI thread, but want to download the images as concurrently as possible. Also, you don't want to hold up adding the images to the UI until they're all downloaded. Instead, you want to add them as they complete.

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="WhenAnyInterleaving"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="WhenAnyInterleaving"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

 You can also apply interleaving to a scenario that involves computationally intensive processing on the [System.Threading.ThreadPool](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool) of the downloaded images; for example:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="WhenAnyInterleavingWithProcessing"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="WhenAnyInterleavingWithProcessing"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

#### Throttling

 Consider the interleaving example, except that the user is downloading so many images that the downloads have to be throttled. For example, you want only a specific number of downloads to happen concurrently. To achieve this goal, start a subset of the asynchronous operations. As operations complete, you can start additional operations to take their place:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="WhenAnyThrottling"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="WhenAnyThrottling"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

#### Early Bailout

 Consider that you're waiting asynchronously for an operation to complete while simultaneously responding to a user's cancellation request (for example, the user clicked a cancel button). The following code illustrates this scenario:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="EarlyBailoutUI"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="EarlyBailoutUI"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

 This implementation re-enables the user interface as soon as you decide to bail out, but doesn't cancel the underlying asynchronous operations. Another alternative would be to cancel the pending operations when you decide to bail out, but not reestablish the user interface until the operations complete, potentially due to ending early due to the cancellation request:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="EarlyBailoutWithTokenUI"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="EarlyBailoutWithTokenUI"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

 Another example of early bailout involves using the [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) method in conjunction with the [System.Threading.Tasks.Task.Delay*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Delay*) method, as discussed in the next section.

### Task.Delay

 Use the [System.Threading.Tasks.Task.Delay*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Delay*) method to add pauses into an asynchronous method's execution. This pause is useful for many kinds of functionality, including building polling loops and delaying the handling of user input for a predetermined period of time. You can also use the [System.Threading.Tasks.Task.Delay*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Delay*) method with [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) to implement time-outs on awaits.

 If a task that's part of a larger asynchronous operation (for example, an ASP.NET web service) takes too long to complete, the overall operation could suffer, especially if it fails to ever complete. For this reason, it's important to be able to time out when waiting on an asynchronous operation. The synchronous [System.Threading.Tasks.Task.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Wait*), [System.Threading.Tasks.Task.WaitAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAll*), and [System.Threading.Tasks.Task.WaitAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAny*) methods accept time-out values, but the corresponding [System.Threading.Tasks.TaskFactory.ContinueWhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.ContinueWhenAll*)/[System.Threading.Tasks.TaskFactory.ContinueWhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.ContinueWhenAny*) and the previously mentioned [System.Threading.Tasks.Task.WhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAll*)/[System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) methods don't. Instead, use [System.Threading.Tasks.Task.Delay*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Delay*) and [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) together to implement a time-out.

 For example, in your UI application, suppose that you want to download an image and disable the UI while the image is downloading. However, if the download takes too long, you want to re-enable the UI and discard the download:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="DelayTimeout"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="DelayTimeout"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

 The same principle applies to multiple downloads, because [System.Threading.Tasks.Task.WhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAll*) returns a task:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="DelayTimeoutMultiple"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="DelayTimeoutMultiple"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

## Building Task-based Combinators

 Because a task is able to completely represent an asynchronous operation and provide synchronous and asynchronous capabilities for joining with the operation, retrieving its results, and so on, you can build useful libraries of combinators that compose tasks to build larger patterns. As discussed in the previous section, .NET includes several built-in combinators, but you can also build your own. The following sections provide several examples of potential combinator methods and types.

### RetryOnFault

 In many situations, you want to retry an operation if a previous attempt fails. For synchronous code, you might build a helper method such as `RetryOnFault` in the following example to accomplish this task:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="RetryOnFaultSync"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="RetryOnFaultSync"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

 You can build an almost identical helper method for asynchronous operations that are implemented with TAP and thus return tasks:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="RetryOnFaultAsync"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="RetryOnFaultAsync"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

 You can then use this combinator to encode retries into the application's logic. For example:

```csharp
// Download the URL, trying up to three times in case of failure
string pageContents = await RetryOnFault(
    () => DownloadStringTaskAsync(url), 3);
```

 You can extend the `RetryOnFault` function further. For example, the function could accept another `Func<Task>` that the function invokes between retries to determine when to try the operation again. For example:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="RetryOnFaultWithDelay"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="RetryOnFaultWithDelay"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

 You can then use the function as follows to wait for a second before retrying the operation:

```csharp
// Download the URL, trying up to three times in case of failure,
// and delaying for a second between retries
string pageContents = await RetryOnFault(
    () => DownloadStringTaskAsync(url), 3, () => Task.Delay(1000));
```

### NeedOnlyOne

 Sometimes, you can take advantage of redundancy to improve an operation's latency and chances for success. Consider multiple web services that provide stock quotes, but at various times of the day, each service might provide different levels of quality and response times. To deal with these fluctuations, you might issue requests to all the web services, and as soon as you get a response from one, cancel the remaining requests. You can implement a helper function to make it easier to implement this common pattern of launching multiple operations, waiting for any, and then canceling the rest. The `NeedOnlyOne` function in the following example illustrates this scenario:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="NeedOnlyOne"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="NeedOnlyOne"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

 You can then use this function as follows:

```csharp
double currentPrice = await NeedOnlyOne(
    ct => GetCurrentPriceFromServer1Async("msft", ct),
    ct => GetCurrentPriceFromServer2Async("msft", ct),
    ct => GetCurrentPriceFromServer3Async("msft", ct));
```

### Interleaved operations

 Using the [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) method to support an interleaving scenario can cause a performance problem when you work with large sets of tasks. Each call to [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) registers a continuation with each task. For N number of tasks, this process creates O(N<sup>2</sup>) continuations over the lifetime of the interleaving operation. If you're working with a large set of tasks, use a combinator (`Interleaved` in the following example) to address the performance problem:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="Interleaved"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="Interleaved"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

 Use the combinator to process the results of tasks as they complete. For example:

```csharp
IEnumerable<Task<int>> tasks = ...;
foreach(var task in Interleaved(tasks))
{
    int result = await task;
    …
}
```

### WhenAllOrFirstException

 In certain scatter/gather scenarios, you might want to wait for all tasks in a set, unless one of them faults. In that case, you want to stop waiting as soon as the exception occurs. You can accomplish that behavior by using a combinator method such as `WhenAllOrFirstException` in the following example:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="WhenAllOrFirstException"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="WhenAllOrFirstException"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

## Building task-based data structures

 In addition to the ability to build custom task-based combinators, having a data structure in [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) and [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) that represents both the results of an asynchronous operation and the necessary synchronization to join with it makes it a powerful type on which to build custom data structures to be used in asynchronous scenarios.

### AsyncCache

 One important aspect of a task is that you can hand it out to multiple consumers. All of the consumers can await it, register continuations with it, get its result or exceptions (in the case of [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601)), and so on. This aspect makes [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) and [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) perfectly suited to be used in an asynchronous caching infrastructure. Here's an example of a small but powerful asynchronous cache built on top of [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601):

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="AsyncCache"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="AsyncCache"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

 The [AsyncCache\<TKey,TValue>](https://devblogs.microsoft.com/pfxteam/parallelextensionsextras-tour-12-asynccache/) class accepts as a delegate to its constructor a function that takes a `TKey` and returns a [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601). The internal dictionary stores any previously accessed values from the cache, and the `AsyncCache` ensures that it generates only one task per key, even if the cache is accessed concurrently.

 For example, you can build a cache for downloaded web pages:

```csharp
private AsyncCache<string,string> m_webPages =
    new AsyncCache<string,string>(DownloadStringTaskAsync);
```

 You can then use this cache in asynchronous methods whenever you need the contents of a web page. The `AsyncCache` class ensures that you're downloading as few pages as possible, and caches the results.

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="AsyncCacheUsage"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="AsyncCacheUsage"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

### AsyncProducerConsumerCollection

 You can also use tasks to build data structures for coordinating asynchronous activities. Consider one of the classic parallel design patterns: producer/consumer. In this pattern, producers generate data that consumers consume, and the producers and consumers can run in parallel. For example, the consumer processes item 1, which was previously generated by a producer who is now producing item 2. For the producer/consumer pattern, you always need some data structure to store the work created by producers so that the consumers can be notified of new data and find it when available.

 Here's a simple data structure, built on top of tasks, that enables asynchronous methods to be used as producers and consumers:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="AsyncProducerConsumerCollection"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="AsyncProducerConsumerCollection"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

 With that data structure in place, you can write code such as the following:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="AsyncProducerConsumerUsage"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="AsyncProducerConsumerUsage"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

The [System.Threading.Tasks.Dataflow](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow) namespace includes the [System.Threading.Tasks.Dataflow.BufferBlock`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow.BufferBlock%601) type, which you can use in a similar manner, but without having to build a custom collection type:

[language="csharp" source="./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs" id="BufferBlockUsage"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/csharp/Program.cs.md)
[language="vb" source="./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb" id="BufferBlockUsage"::: (complete source file; reference: ./snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/consuming-the-task-based-asynchronous-pattern/vb/Program.vb.md)

> **Note:**
> The [System.Threading.Tasks.Dataflow](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow) namespace is available as a NuGet package. To install the assembly that contains the [System.Threading.Tasks.Dataflow](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Dataflow) namespace, open your project in Visual Studio, choose **Manage NuGet Packages** from the Project menu, and search online for the `System.Threading.Tasks.Dataflow` package.

## See also

- [Task-based Asynchronous Pattern (TAP)](task-based-asynchronous-pattern-tap.md)
- [Implementing the Task-based Asynchronous Pattern](implementing-the-task-based-asynchronous-pattern.md)
- [Interop with Other Asynchronous Patterns and Types](interop-with-other-asynchronous-patterns-and-types.md)
