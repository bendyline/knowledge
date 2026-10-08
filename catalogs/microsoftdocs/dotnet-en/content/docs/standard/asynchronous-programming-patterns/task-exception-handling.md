---
title: "Task exception handling"
description: Learn how exceptions propagate through Task APIs, when AggregateException appears, and how unobserved task exceptions behave in modern .NET.
ms.date: 04/14/2026
ai-usage: ai-assisted
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "Task.Result"
  - "GetAwaiter().GetResult()"
  - "AggregateException"
  - "TaskScheduler.UnobservedTaskException"
  - "Task exception handling"
---

# Task exception handling

Use `await` as your default. `await` gives you natural exception flow, keeps your code readable, and avoids sync-over-async deadlocks.

Sometimes you still need to block on a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task), for example, in legacy synchronous entry points. In those cases, you need to understand how each API surfaces exceptions.

## Compare exception propagation for blocking APIs

When you must block on a task, use [System.Threading.Tasks.Task.GetAwaiter%2A](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.GetAwaiter%252A)().GetResult() to preserve the original exception type:

[language="csharp" source="./snippets/task-exception-handling/csharp/Program.cs" id="SingleException"::: (complete source file; reference: ./snippets/task-exception-handling/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/task-exception-handling/csharp/Program.cs.md)
[language="vb" source="./snippets/task-exception-handling/vb/Program.vb" id="SingleException"::: (complete source file; reference: ./snippets/task-exception-handling/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/task-exception-handling/vb/Program.vb.md)

[System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) and [System.Threading.Tasks.Task.Wait%2A](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Wait%252A) wrap exceptions in [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException), which complicates exception handling. The following code uses these APIs and receives the wrong exception type:

[language="csharp" source="./snippets/task-exception-handling/csharp/Program.cs" id="SingleExceptionBad"::: (complete source file; reference: ./snippets/task-exception-handling/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/task-exception-handling/csharp/Program.cs.md)
[language="vb" source="./snippets/task-exception-handling/vb/Program.vb" id="SingleExceptionBad"::: (complete source file; reference: ./snippets/task-exception-handling/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/task-exception-handling/vb/Program.vb.md)

For tasks that fault with multiple exceptions, `GetAwaiter().GetResult()` still throws one exception, but [System.Threading.Tasks.Task.Exception](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Exception) stores an [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) that contains all inner exceptions:

[language="csharp" source="./snippets/task-exception-handling/csharp/Program.cs" id="MultiException"::: (complete source file; reference: ./snippets/task-exception-handling/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/task-exception-handling/csharp/Program.cs.md)
[language="vb" source="./snippets/task-exception-handling/vb/Program.vb" id="MultiException"::: (complete source file; reference: ./snippets/task-exception-handling/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/task-exception-handling/vb/Program.vb.md)

## `Task.Result` vs `GetAwaiter().GetResult()`

Use this guidance when you choose between the two APIs:

- Prefer `await` when you can. It avoids blocking and deadlock risk.
- If you must block and you want original exception types, use `GetAwaiter().GetResult()`. In WinForms applications, note the [Common pitfalls and deadlocks](https://learn.microsoft.com/dotnet/desktop/winforms/forms/events#common-pitfalls-and-deadlocks) section of the article on event handlers.
- If your existing code expects [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException), use `Result` or `Wait()` and inspect `InnerExceptions`.

These rules affect exception shape only. Both APIs still block the current thread, so both can deadlock on single-threaded [System.Threading.SynchronizationContext](https://learn.microsoft.com/search/?terms=System.Threading.SynchronizationContext) environments. To understand how to properly complete tasks on all code paths, see [Complete your tasks](complete-your-tasks.md).

## Unobserved task exceptions in modern .NET

The runtime raises [System.Threading.Tasks.TaskScheduler.UnobservedTaskException](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler.UnobservedTaskException) when a faulted `Task` gets finalized before code observes its exception.

In modern .NET, unobserved exceptions no longer crash the process by default. The runtime reports them through the event, and then continues execution.

[language="csharp" source="./snippets/task-exception-handling/csharp/Program.cs" id="UnobservedTaskException"::: (complete source file; reference: ./snippets/task-exception-handling/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/task-exception-handling/csharp/Program.cs.md)
[language="vb" source="./snippets/task-exception-handling/vb/Program.vb" id="UnobservedTaskException"::: (complete source file; reference: ./snippets/task-exception-handling/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/task-exception-handling/vb/Program.vb.md)

Use the event for diagnostics and telemetry. Don't use the event as a replacement for normal exception handling in async flows.

## See also

- [Common async/await bugs](common-async-bugs.md)
- [Consume the TAP](consuming-the-task-based-asynchronous-pattern.md)
- [Exception handling (Task Parallel Library)](../parallel-programming/exception-handling-task-parallel-library.md)
