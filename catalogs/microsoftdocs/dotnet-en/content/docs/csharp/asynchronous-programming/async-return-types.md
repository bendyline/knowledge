---
title: Async return types
description: Learn about the return types that async methods can have in C# with code examples for each type.
ms.date: 11/22/2024
---

# Async return types (C#)

Async methods can have the following return types:

- [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task), for an async method that performs an operation but returns no value.
- [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601), for an async method that returns a value.
- `void`, for an event handler.
- Any type that has an accessible `GetAwaiter` method. The object returned by the `GetAwaiter` method must implement the [System.Runtime.CompilerServices.ICriticalNotifyCompletion](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.ICriticalNotifyCompletion) interface.
- [System.Collections.Generic.IAsyncEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IAsyncEnumerable%601), for an async method that returns an *async stream*.

For more information about async methods, see [Asynchronous programming with async and await (C#)](index.md).

Several other types also exist that are specific to Windows workloads:

- [System.Windows.Threading.DispatcherOperation](https://learn.microsoft.com/search/?terms=System.Windows.Threading.DispatcherOperation), for async operations limited to Windows.
- [Windows.Foundation.IAsyncAction](https://learn.microsoft.com/search/?terms=Windows.Foundation.IAsyncAction), for async actions in Universal Windows Platform (UWP) apps that don't return a value.
- [Windows.Foundation.IAsyncActionWithProgress`1](https://learn.microsoft.com/search/?terms=Windows.Foundation.IAsyncActionWithProgress%601), for async actions in UWP apps that report progress but don't return a value.
- [Windows.Foundation.IAsyncOperation`1](https://learn.microsoft.com/search/?terms=Windows.Foundation.IAsyncOperation%601), for async operations in UWP apps that return a value.
- [Windows.Foundation.IAsyncOperationWithProgress`2](https://learn.microsoft.com/search/?terms=Windows.Foundation.IAsyncOperationWithProgress%602), for async operations in UWP apps that report progress and return a value.

## Task return type

Async methods that don't contain a `return` statement or that contain a `return` statement that doesn't return an operand usually have a return type of [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task). Such methods return `void` if they run synchronously. If you use a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) return type for an async method, a calling method can use an `await` operator to suspend the caller's completion until the called async method finishes.

In the following example, the `WaitAndApologizeAsync` method doesn't contain a `return` statement, so the method returns a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) object. Returning a `Task` enables `WaitAndApologizeAsync` to be awaited. The [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) type doesn't include a `Result` property because it has no return value.

[language="csharp" source="snippets/async-return-types/async-returns2.cs" ID="TaskReturn"::: (complete source file; reference: snippets/async-return-types/async-returns2.cs)](../../../_code/docs/csharp/asynchronous-programming/snippets/async-return-types/async-returns2.cs.md)

`WaitAndApologizeAsync` is awaited by using an await statement instead of an await expression, similar to the calling statement for a synchronous void-returning method. The application of an await operator in this case doesn't produce a value. When the right operand of an `await` is a [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601), the `await` expression produces a result of `T`. When the right operand of an `await` is a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task), the `await` and its operand are a statement.

You can separate the call to `WaitAndApologizeAsync` from the application of an await operator, as the following code shows. However, remember that a `Task` doesn't have a `Result` property, and that no value is produced when an await operator is applied to a `Task`.

The following code separates calling the `WaitAndApologizeAsync` method from awaiting the task that the method returns.

[language="csharp" source="snippets/async-return-types/async-returns2a.cs" ID="AwaitTask"::: (complete source file; reference: snippets/async-return-types/async-returns2a.cs)](../../../_code/docs/csharp/asynchronous-programming/snippets/async-return-types/async-returns2a.cs.md)

## Task\<TResult\> return type

The [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) return type is used for an async method that contains a [return](../language-reference/statements/jump-statements.md#the-return-statement) statement in which the operand is `TResult`.

In the following example, the `GetLeisureHoursAsync` method contains a `return` statement that returns an integer. The method declaration must specify a return type of `Task<int>`. The [System.Threading.Tasks.Task.FromResult*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.FromResult*) async method is a placeholder for an operation that returns a [System.DateTime.DayOfWeek](https://learn.microsoft.com/search/?terms=System.DateTime.DayOfWeek).

[language="csharp" source="snippets/async-return-types/async-returns1.cs" ID="LeisureHours"::: (complete source file; reference: snippets/async-return-types/async-returns1.cs)](../../../_code/docs/csharp/asynchronous-programming/snippets/async-return-types/async-returns1.cs.md)

When `GetLeisureHoursAsync` is called from within an await expression in the `ShowTodaysInfo` method, the await expression retrieves the integer value (the value of `leisureHours`) stored in the task returned by the `GetLeisureHours` method. For more information about await expressions, see [await](../language-reference/operators/await.md).

You can better understand how `await` retrieves the result from a `Task<T>` by separating the call to `GetLeisureHoursAsync` from the application of `await`, as the following code shows. A call to method `GetLeisureHoursAsync` that isn't immediately awaited returns a `Task<int>`, as you would expect from the declaration of the method. The task is assigned to the `getLeisureHoursTask` variable in the example. Because `getLeisureHoursTask` is a [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601), it contains a [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property of type `TResult`. In this case, `TResult` represents an integer type. When `await` is applied to `getLeisureHoursTask`, the await expression evaluates to the contents of the [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property of `getLeisureHoursTask`. The value is assigned to the `ret` variable.

> **Important:**
> The [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property is a blocking property. If you try to access it before its task is finished, the thread that's currently active is blocked until the task completes and the value is available. In most cases, you should access the value by using `await` instead of accessing the property directly.
>
> The previous example retrieved the value of the [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property to block the main thread so that the `Main` method could print the `message` to the console before the application ended.

[language="csharp" source="snippets/async-return-types/async-returns1a.cs" ID="StoreTask"::: (complete source file; reference: snippets/async-return-types/async-returns1a.cs)](../../../_code/docs/csharp/asynchronous-programming/snippets/async-return-types/async-returns1a.cs.md)

## Void return type

You use the `void` return type in asynchronous event handlers, which require a `void` return type. For methods other than event handlers that don't return a value, you should return a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) instead, because an async method that returns `void` can't be awaited. Any caller of such a method must continue to completion without waiting for the called async method to finish. The caller must be independent of any values or exceptions that the async method generates.

The caller of a void-returning async method can't catch exceptions thrown from the method. Such unhandled exceptions are likely to cause your application to fail. If a method that returns a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) or [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) throws an exception, the exception is stored in the returned task. The exception is rethrown when the task is awaited. Make sure that any async method that can produce an exception has a return type of [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) or [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) and that calls to the method are awaited.

The following example shows the behavior of an async event handler. In the example code, an async event handler must let the main thread know when it finishes. Then the main thread can wait for an async event handler to complete before exiting the program.

[language="csharp" source="snippets/async-return-types/async-returns3.cs"::: (complete source file; reference: snippets/async-return-types/async-returns3.cs)](../../../_code/docs/csharp/asynchronous-programming/snippets/async-return-types/async-returns3.cs.md)

## Generalized async return types and ValueTask\<TResult\>

An async method can return any type that has an accessible `GetAwaiter` method that returns an instance of an *awaiter type*. In addition, the returned type must match the type of the parameter of `SetResult` and returned type of the `Task` property on the type specified by the [System.Runtime.CompilerServices.AsyncMethodBuilderAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.AsyncMethodBuilderAttribute) attribute. You can learn more in the article on [Attributes read by the compiler](../language-reference/attributes/general.md#asyncmethodbuilder-attribute) or the C# spec for the [Task type builder pattern](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/classes.md#15142-task-type-builder-pattern).

This feature is the complement to [awaitable expressions](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#12992-awaitable-expressions), which describes the requirements for the operand of `await`. Generalized async return types enable the compiler to generate `async` methods that return different types. Generalized async return types enabled performance improvements in the .NET libraries. Because [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) and [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) are reference types, memory allocation in performance-critical paths, particularly when allocations occur in tight loops, can adversely affect performance. Support for generalized return types means that you can return a lightweight value type instead of a reference type to avoid more memory allocations.

.NET provides the [System.Threading.Tasks.ValueTask`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ValueTask%601) structure as a lightweight implementation of a generalized task-returning value. The following example uses the [System.Threading.Tasks.ValueTask`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ValueTask%601) structure to retrieve the value of two dice rolls.

[language="csharp" source="snippets/async-return-types/async-valuetask.cs"::: (complete source file; reference: snippets/async-return-types/async-valuetask.cs)](../../../_code/docs/csharp/asynchronous-programming/snippets/async-return-types/async-valuetask.cs.md)

Writing a generalized async return type is an advanced scenario, and is targeted for use in specialized environments. Consider using the `Task`, `Task<T>`, and `ValueTask<T>` types instead, which cover most scenarios for asynchronous code.

You can apply the `AsyncMethodBuilder` attribute to an async method (instead of the async return type declaration) to override the builder for that type. Typically you'd apply this attribute to use a different builder provided in the .NET runtime.

## Async streams with IAsyncEnumerable\<T\>

An async method might return an *async stream*, represented by [System.Collections.Generic.IAsyncEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IAsyncEnumerable%601). An async stream provides a way to enumerate items read from a stream when elements are generated in chunks with repeated asynchronous calls. The following example shows an async method that generates an async stream:

[language="csharp" source="snippets/async-return-types/AsyncStreams.cs" ID="GenerateAsyncStream"::: (complete source file; reference: snippets/async-return-types/AsyncStreams.cs)](../../../_code/docs/csharp/asynchronous-programming/snippets/async-return-types/AsyncStreams.cs.md)

The preceding example reads lines from a string asynchronously. Once each line is read, the code enumerates each word in the string. Callers would enumerate each word using the `await foreach` statement. The method awaits when it needs to asynchronously read the next line from the source string.

## See also

- [System.Threading.Tasks.Task.FromResult*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.FromResult*)
- [Process asynchronous tasks as they complete](start-multiple-async-tasks-and-process-them-as-they-complete.md)
- [Asynchronous programming with async and await (C#)](index.md)
- [async](../language-reference/keywords/async.md)
- [await](../language-reference/operators/await.md)
