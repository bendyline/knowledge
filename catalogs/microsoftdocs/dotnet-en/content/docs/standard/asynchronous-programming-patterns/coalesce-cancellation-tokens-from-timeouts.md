---
title: "Coalesce cancellation tokens from timeouts"
description: Learn how to combine caller-driven cancellation with timeout-driven cancellation by using linked cancellation token sources in modern .NET.
ms.date: 04/13/2026
ai-usage: ai-assisted
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "CancellationTokenSource.CreateLinkedTokenSource"
  - "timeout, cancellation"
  - "linked cancellation token"
  - "CancelAfter"
  - "WaitAsync"
---
# Coalesce cancellation tokens from timeouts

Many APIs need two cancellation triggers:

- A caller-provided [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken).
- A timeout enforced by your component.

Use [System.Threading.CancellationTokenSource.CreateLinkedTokenSource*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.CreateLinkedTokenSource*) to merge both into a single token that your async work can consume.

## Use a linked token source for caller token plus timeout

Create a timeout [System.Threading.CancellationTokenSource](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource), link it with the caller token, and pass the linked token to the operation:

[language="csharp" source="./snippets/coalescing-cancellation-tokens-from-timeouts/csharp/Program.cs" id="LinkedTokenBasic"::: (complete source file; reference: ./snippets/coalescing-cancellation-tokens-from-timeouts/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/coalescing-cancellation-tokens-from-timeouts/csharp/Program.cs.md)
[language="vb" source="./snippets/coalescing-cancellation-tokens-from-timeouts/vb/Program.vb" id="LinkedTokenBasic"::: (complete source file; reference: ./snippets/coalescing-cancellation-tokens-from-timeouts/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/coalescing-cancellation-tokens-from-timeouts/vb/Program.vb.md)

Dispose both `CancellationTokenSource` instances after the operation completes so registrations and timers are released promptly.

## Encapsulate linking in a helper

Wrap linking logic in a helper method when several call sites need the same policy:

[language="csharp" source="./snippets/coalescing-cancellation-tokens-from-timeouts/csharp/Program.cs" id="LinkedTokenHelper"::: (complete source file; reference: ./snippets/coalescing-cancellation-tokens-from-timeouts/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/coalescing-cancellation-tokens-from-timeouts/csharp/Program.cs.md)
[language="vb" source="./snippets/coalescing-cancellation-tokens-from-timeouts/vb/Program.vb" id="LinkedTokenHelper"::: (complete source file; reference: ./snippets/coalescing-cancellation-tokens-from-timeouts/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/coalescing-cancellation-tokens-from-timeouts/vb/Program.vb.md)

A helper keeps timeout behavior consistent and avoids duplicate disposal bugs.

## Choose the right timeout model

Linked tokens are useful when the callee accepts a token and you need one unified cancellation path. In modern .NET, you also have these alternatives:

- Use [System.Threading.CancellationTokenSource.CancelAfter*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.CancelAfter*) to enforce timeouts on a `CancellationTokenSource` you own.
- Use [System.Threading.Tasks.Task.WaitAsync*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAsync*) when you want to time out the wait without canceling underlying work.

This example shows a `WaitAsync` timeout for "cancel wait only" semantics:

[language="csharp" source="./snippets/coalescing-cancellation-tokens-from-timeouts/csharp/Program.cs" id="WaitAsyncAlternative"::: (complete source file; reference: ./snippets/coalescing-cancellation-tokens-from-timeouts/csharp/Program.cs)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/coalescing-cancellation-tokens-from-timeouts/csharp/Program.cs.md)
[language="vb" source="./snippets/coalescing-cancellation-tokens-from-timeouts/vb/Program.vb" id="WaitAsyncAlternative"::: (complete source file; reference: ./snippets/coalescing-cancellation-tokens-from-timeouts/vb/Program.vb)](../../../_code/docs/standard/asynchronous-programming-patterns/snippets/coalescing-cancellation-tokens-from-timeouts/vb/Program.vb.md)

## Summary

Use linked tokens when you need to combine caller intent and infrastructure timeouts into one cancellation contract. Keep ownership and disposal rules explicit:

- If your component creates a `CancellationTokenSource`, your component disposes it.
- If callers pass a token, never dispose the caller's token source.
- If an operation doesn't accept tokens, use wait-cancellation patterns instead of linked tokens.

## See also

- [Cancel non-cancelable async operations](cancel-non-cancelable-async-operations.md)
- [Task cancellation](../parallel-programming/task-cancellation.md)
- [Cancellation in managed threads](../threading/cancellation-in-managed-threads.md)
- [System.Threading.CancellationTokenSource.CreateLinkedTokenSource*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.CreateLinkedTokenSource*)
- [System.Threading.CancellationTokenSource.CancelAfter*](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource.CancelAfter*)
- [System.Threading.Tasks.Task.WaitAsync*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAsync*)
