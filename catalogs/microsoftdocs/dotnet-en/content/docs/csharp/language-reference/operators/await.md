---
title: "await operator - asynchronously wait for a task to complete"
description: "The C# `await` operator asynchronously suspends evaluation of the enclosing `async` method."
ms.date: 09/11/2026
ai-usage: ai-assisted
f1_keywords:
  - "await_CSharpKeyword"
helpviewer_keywords:
  - "await keyword [C#]"
  - "await [C#]"
---
# await operator - asynchronously await for a task to complete

The `await` operator suspends evaluation of the enclosing [async](../keywords/async.md) method until the asynchronous operation represented by its operand completes. When the asynchronous operation completes, the `await` operator returns the result of the operation, if any. When the `await` operator is applied to the operand that represents an already completed operation, it returns the result of the operation immediately without suspension of the enclosing method. The `await` operator doesn't block the thread that evaluates the async method. When the `await` operator suspends the enclosing async method, the control returns to the caller of the method.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


In the following example, the [System.Net.Http.HttpClient.GetByteArrayAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.GetByteArrayAsync*) method returns the `Task<byte[]>` instance, which represents an asynchronous operation that produces a byte array when it completes. Until the operation completes, the `await` operator suspends the `DownloadDocsMainPageAsync` method. When `DownloadDocsMainPageAsync` gets suspended, control is returned to the `Main` method, which is the caller of `DownloadDocsMainPageAsync`. The `Main` method executes until it needs the result of the asynchronous operation performed by the `DownloadDocsMainPageAsync` method. When [System.Net.Http.HttpClient.GetByteArrayAsync*](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient.GetByteArrayAsync*) gets all the bytes, the rest of the `DownloadDocsMainPageAsync` method is evaluated. After that, the rest of the `Main` method is evaluated.

[language="csharp" source="snippets/shared/AwaitOperator.cs"::: (complete source file; reference: snippets/shared/AwaitOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/AwaitOperator.cs.md)

The operand of an `await` expression must provide for notification when a task completes. In general, a delegate is invoked when the task completes, either successfully or unsuccessfully. The [`await`](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#1299-await-expressions) section of the C# language spec provides the details on how these notifications are implemented.

The preceding example uses the [async `Main` method](../../fundamentals/program-structure/main-command-line.md). For more information, see the [await operator in the Main method](#await-operator-in-the-main-method) section.

> **Note:**
> For an introduction to asynchronous programming, see [Asynchronous programming with async and await](../../asynchronous-programming/index.md). Asynchronous programming with `async` and `await` follows the [task-based asynchronous pattern](../../../standard/asynchronous-programming-patterns/task-based-asynchronous-pattern-tap.md).

You can use the `await` operator only in a method, [lambda expression](lambda-expressions.md), or [anonymous method](delegate-operator.md) that is modified by the [async](../keywords/async.md) keyword. Within an async method, you can't use the `await` operator in the body of a synchronous local function or inside the block of a [lock statement](../statements/lock.md). In earlier language versions, you also couldn't use `await` in an [unsafe](../keywords/unsafe.md) context. Under the C# 15 preview memory safety changes, `await` is allowed in an unsafe context. The remaining restriction is that you can't use `await` in the body or initializer of a [`fixed` statement](../statements/fixed.md); for that rule and related diagnostics, see [Resolve errors and warnings in unsafe code constructs](../compiler-messages/unsafe-code-errors.md).

The operand of the `await` operator is usually of one of the following .NET types: [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task), [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601), [System.Threading.Tasks.ValueTask](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ValueTask), or [System.Threading.Tasks.ValueTask`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ValueTask%601). However, any awaitable expression can be the operand of the `await` operator. For more information, see the [Awaitable expressions](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#12992-awaitable-expressions) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md).

The type of expression `await t` is `TResult` if the type of expression `t` is [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) or [System.Threading.Tasks.ValueTask`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ValueTask%601). If the type of `t` is [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) or [System.Threading.Tasks.ValueTask](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ValueTask), the type of `await t` is `void`. In both cases, if `t` throws an exception, `await t` rethrows the exception.

## Asynchronous streams and disposables

You use the `await foreach` statement to consume an asynchronous stream of data. For more information, see the [`foreach` statement](../statements/iteration-statements.md#the-foreach-statement) section of the [Iteration statements](../statements/iteration-statements.md) article.

You use the `await using` statement to work with an asynchronously disposable object, that is, an object of a type that implements an [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) interface. For more information, see the [Using async disposable](../../../standard/garbage-collection/implementing-disposeasync.md#using-async-disposable) section of the [Implement a DisposeAsync method](../../../standard/garbage-collection/implementing-disposeasync.md) article.

## await operator in the Main method

The [`Main` method](../../fundamentals/program-structure/main-command-line.md) serves as the application entry point. It can return `Task` or `Task<int>`, which makes it async. By making the `Main` method async, you can use the `await` operator in its body. In earlier C# versions, to ensure that the `Main` method waits for the completion of an asynchronous operation, retrieve the value of the [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property of the [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) instance that the corresponding async method returns. For asynchronous operations that don't produce a value, call the [System.Threading.Tasks.Task.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Wait*) method. For information about how to select the language version, see [C# language versioning](../configure-language-version.md).

## C# language specification

For more information, see the [Await expressions](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#1299-await-expressions) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md).

## See also

- [C# operators and expressions](index.md)
- [async](../keywords/async.md)
- [Task asynchronous programming model](../../asynchronous-programming/task-asynchronous-programming-model.md)
- [Asynchronous programming](../../asynchronous-programming/index.md)
- [Walkthrough: accessing the Web by using async and await](../../asynchronous-programming/async-scenarios.md)
- [Tutorial: Generate and consume async streams](../../asynchronous-programming/generate-consume-asynchronous-stream.md)
- [.NET blog: How async/await really works in C#](https://devblogs.microsoft.com/dotnet/how-async-await-really-works/)
