---
title: "SynchronizationContext and console apps"
description: Learn how to use a custom SynchronizationContext to control where async continuations run in .NET console applications, including a complete AsyncPump implementation.
ms.date: 04/08/2026
ai-usage: ai-assisted
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "SynchronizationContext"
  - "console app async"
  - "async Main"
  - "AsyncPump"
  - "message pump"
  - "asynchronous programming, console"
---
# SynchronizationContext and console apps

UI frameworks like Windows Forms, WPF, and .NET MAUI install a [System.Threading.SynchronizationContext](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationContext) on their UI thread. When you `await` a task in those environments, the continuation automatically posts back to the UI thread. Console apps don't install a [System.Threading.SynchronizationContext](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationContext), which means `await` continuations run on the thread pool. This article explains the consequences and shows how to build a single-threaded message pump when you need one.

## Default behavior in a console app

In a console app, [System.Threading.SynchronizationContext.Current](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationContext.Current) returns `null`. When a method yields at an `await`, the continuation runs on whatever thread pool thread is available:

[language="csharp" source="./snippets/synchronizationcontext-console-apps/csharp/Program.cs" id="DefaultBehavior"::: (complete source file; reference: ./snippets/synchronizationcontext-console-apps/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/synchronizationcontext-console-apps/csharp/Program.cs.md)

Representative output from running this program:

```output
[1, 1]
[3, 2687]
[4, 2399]
[5, 2397]
[6, 2516]
```

Thread 1 (the main thread) appears only once, during the first synchronous iteration before `await Task.Yield()` suspends the method. All subsequent iterations run on thread pool threads.

## Modern async entry points

Starting with C# 7.1, you can declare `Main` as `async Task` or `async Task<int>`. In C# 9 and later, you can use top-level statements with `await` directly:

```csharp
// Top-level statements (C# 9+)
await DemoAsync();
```

```csharp
// async Task Main (C# 7.1+)
static async Task Main()
{
    await DemoAsync();
}
```

These entry points don't install a [System.Threading.SynchronizationContext](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationContext). The runtime generates a bootstrap that calls your async method and blocks on the returned [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task), similar to calling `.GetAwaiter().GetResult()`. Continuations still run on the thread pool.

## When you need thread affinity

For many console apps, running continuations on the thread pool is fine. However, some scenarios require that all continuations run on a single thread:

- **Serialized execution**: Multiple concurrent async operations share state without locks by running their continuations on the same thread.
- **Library requirements**: Some libraries or COM objects require affinity to a particular thread.
- **Unit testing**: Test frameworks might need deterministic, single-threaded execution of async code.

## Build a single-threaded SynchronizationContext

To run all continuations on one thread, you need two things:

1. A [System.Threading.SynchronizationContext](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationContext) whose [System.Threading.SynchronizationContext.Post*](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationContext.Post*) method queues work to a thread-safe collection.
1. A message pump loop that processes that queue on the target thread.

### The custom context

The context uses a [System.Collections.Concurrent.BlockingCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601) to coordinate producers (the async continuations) and a consumer (the pumping loop):

[language="csharp" source="./snippets/synchronizationcontext-console-apps/csharp/Program.cs" id="SingleThreadContext"::: (complete source file; reference: ./snippets/synchronizationcontext-console-apps/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/synchronizationcontext-console-apps/csharp/Program.cs.md)
[language="vb" source="./snippets/synchronizationcontext-console-apps/vb/Program.vb" id="SingleThreadContext"::: (complete source file; reference: ./snippets/synchronizationcontext-console-apps/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/synchronizationcontext-console-apps/vb/Program.vb.md)

### The AsyncPump.Run method

`AsyncPump.Run` installs the custom context, invokes the async method, and pumps continuations on the calling thread until the method completes:

[language="csharp" source="./snippets/synchronizationcontext-console-apps/csharp/Program.cs" id="AsyncPumpRun"::: (complete source file; reference: ./snippets/synchronizationcontext-console-apps/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/synchronizationcontext-console-apps/csharp/Program.cs.md)
[language="vb" source="./snippets/synchronizationcontext-console-apps/vb/Program.vb" id="AsyncPumpRun"::: (complete source file; reference: ./snippets/synchronizationcontext-console-apps/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/synchronizationcontext-console-apps/vb/Program.vb.md)

### See it in action

Replace the default call with `AsyncPump.Run`:

[language="csharp" source="./snippets/synchronizationcontext-console-apps/csharp/Program.cs" id="AsyncPumpDemo"::: (complete source file; reference: ./snippets/synchronizationcontext-console-apps/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/synchronizationcontext-console-apps/csharp/Program.cs.md)
[language="vb" source="./snippets/synchronizationcontext-console-apps/vb/Program.vb" id="AsyncPumpDemo"::: (complete source file; reference: ./snippets/synchronizationcontext-console-apps/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/synchronizationcontext-console-apps/vb/Program.vb.md)

Output:

```output
[1, 10000]
```

The specific thread ID might differ depending on the runtime and platform, but the key result is that all 10,000 iterations run on a single thread: the main thread.

## Handle async void methods

The `Func<Task>` overload tracks completion through the returned [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task). Async `void` methods don't return a task; instead, they notify the current [System.Threading.SynchronizationContext](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationContext) through [System.Threading.SynchronizationContext.OperationStarted](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationContext.OperationStarted) and [System.Threading.SynchronizationContext.OperationCompleted](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationContext.OperationCompleted). To support async `void` methods, extend the context to track outstanding operations:

[language="csharp" source="./snippets/synchronizationcontext-console-apps/csharp/Program.cs" id="AsyncVoidSupport"::: (complete source file; reference: ./snippets/synchronizationcontext-console-apps/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/synchronizationcontext-console-apps/csharp/Program.cs.md)
[language="vb" source="./snippets/synchronizationcontext-console-apps/vb/Program.vb" id="AsyncVoidSupport"::: (complete source file; reference: ./snippets/synchronizationcontext-console-apps/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/synchronizationcontext-console-apps/vb/Program.vb.md)

With operation tracking enabled, the pump exits only when all outstanding async `void` methods complete, not just the top-level task.

## Practical considerations

- **Deadlock risk**: If code running inside `AsyncPump.Run` blocks synchronously (for example, by calling `.Result` or `.Wait()` on a task whose continuation must post back to the pump), the pump thread can't process that continuation. The result is a deadlock. The same problem is described in [Synchronous wrappers for asynchronous methods](synchronous-wrappers-for-asynchronous-methods.md).
- **Performance**: A single-threaded pump limits throughput to one thread. Use this approach only when thread affinity matters.
- **Cross-platform**: The `AsyncPump` implementation shown here uses only types from the `System.Collections.Concurrent` and `System.Threading` namespaces. It works on all platforms that .NET supports.

## See also

- [ExecutionContext and SynchronizationContext](executioncontext-synchronizationcontext.md)
- [Task-based asynchronous pattern (TAP)](task-based-asynchronous-pattern-tap.md)
- [Consume the task-based asynchronous pattern](consuming-the-task-based-asynchronous-pattern.md)
