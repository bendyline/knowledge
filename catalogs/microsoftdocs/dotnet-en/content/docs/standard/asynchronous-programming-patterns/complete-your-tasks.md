---
title: "Complete your tasks"
description: Learn how to complete TaskCompletionSource tasks on every code path, avoid hangs, and handle reset scenarios safely.
ms.date: 04/14/2026
ai-usage: ai-assisted
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "TaskCompletionSource"
  - "SetException"
  - "TrySetResult"
  - "async hangs"
  - "resettable async primitives"
---

# Complete your tasks

When you expose a task from [System.Threading.Tasks.TaskCompletionSource%601](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%25601), you own the task's lifetime. Complete that task on every path. If any path skips completion, callers wait forever.

## Complete every code path

Always complete the task in success and failure paths. Use a `catch` block for cleanup logic when the task fails. Use a `finally` block for cleanup logic that must always run. The following code block shows adding cleanup for a failure path:

[language="csharp" source="./snippets/complete-your-tasks/csharp/Program.cs" id="MissingSetExceptionFix"::: (complete source file; reference: ./snippets/complete-your-tasks/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/complete-your-tasks/csharp/Program.cs.md)
[language="vb" source="./snippets/complete-your-tasks/vb/Program.vb" id="MissingSetExceptionFix"::: (complete source file; reference: ./snippets/complete-your-tasks/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/complete-your-tasks/vb/Program.vb.md)

The following code catches an exception, logs it, and forgets to call [System.Threading.Tasks.TaskCompletionSource%601.SetException%2A](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%25601.SetException%252A) or [System.Threading.Tasks.TaskCompletionSource%601.TrySetException%2A](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%25601.TrySetException%252A). This bug appears often and causes callers to wait forever. For more details about exception handling with tasks, see [Task exception handling](task-exception-handling.md).

[language="csharp" source="./snippets/complete-your-tasks/csharp/Program.cs" id="MissingSetExceptionBug"::: (complete source file; reference: ./snippets/complete-your-tasks/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/complete-your-tasks/csharp/Program.cs.md)
[language="vb" source="./snippets/complete-your-tasks/vb/Program.vb" id="MissingSetExceptionBug"::: (complete source file; reference: ./snippets/complete-your-tasks/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/complete-your-tasks/vb/Program.vb.md)

## Prefer `TrySet*` in completion races

Concurrent paths often race to complete the same `TaskCompletionSource`. [System.Threading.Tasks.TaskCompletionSource%601.SetResult%2A](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%25601.SetResult%252A), [System.Threading.Tasks.TaskCompletionSource%601.SetException%2A](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%25601.SetException%252A), and [System.Threading.Tasks.TaskCompletionSource%601.SetCanceled%2A](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%25601.SetCanceled%252A) throw if the task already completed. In race-prone code, use [System.Threading.Tasks.TaskCompletionSource%601.TrySetResult%2A](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%25601.TrySetResult%252A), [System.Threading.Tasks.TaskCompletionSource%601.TrySetException%2A](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%25601.TrySetException%252A), and [System.Threading.Tasks.TaskCompletionSource%601.TrySetCanceled%2A](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%25601.TrySetCanceled%252A). For more patterns to avoid in concurrent scenarios, see [Common async/await bugs](common-async-bugs.md).

[language="csharp" source="./snippets/complete-your-tasks/csharp/Program.cs" id="TrySetRace"::: (complete source file; reference: ./snippets/complete-your-tasks/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/complete-your-tasks/csharp/Program.cs.md)
[language="vb" source="./snippets/complete-your-tasks/vb/Program.vb" id="TrySetRace"::: (complete source file; reference: ./snippets/complete-your-tasks/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/complete-your-tasks/vb/Program.vb.md)

## Don't drop references during reset

A common bug appears in resettable async primitives. Fix the reset path by atomically swapping references and completing the previous task (for example, with cancellation):

[language="csharp" source="./snippets/complete-your-tasks/csharp/Program.cs" id="ResetFix"::: (complete source file; reference: ./snippets/complete-your-tasks/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/complete-your-tasks/csharp/Program.cs.md)
[language="vb" source="./snippets/complete-your-tasks/vb/Program.vb" id="ResetFix"::: (complete source file; reference: ./snippets/complete-your-tasks/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/complete-your-tasks/vb/Program.vb.md)

**Don't do this:** If you replace a `TaskCompletionSource` instance before completing the previous one, waiters that hold the old task might never complete.

[language="csharp" source="./snippets/complete-your-tasks/csharp/Program.cs" id="ResetBug"::: (complete source file; reference: ./snippets/complete-your-tasks/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/complete-your-tasks/csharp/Program.cs.md)
[language="vb" source="./snippets/complete-your-tasks/vb/Program.vb" id="ResetBug"::: (complete source file; reference: ./snippets/complete-your-tasks/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/complete-your-tasks/vb/Program.vb.md)

## Checklist

- Complete every exposed `TaskCompletionSource` task on success, failure, and cancellation paths.
- Use `TrySet*` APIs in paths that might race.
- During reset, complete or cancel the old task before you drop its reference.
- Add timeout-based tests so hangs fail fast in CI.

## See also

- [Task exception handling](task-exception-handling.md)
- [Implement the TAP](implementing-the-task-based-asynchronous-pattern.md)
- [Common async/await bugs](common-async-bugs.md)
