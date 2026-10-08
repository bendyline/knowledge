---
title: Implement a DisposeAsync method
description: Learn how to implement DisposeAsync and DisposeAsyncCore methods to perform asynchronous resource cleanup.
ms.date: 10/20/2025
dev_langs:
  - "csharp"
helpviewer_keywords:
  - "DisposeAsync method"
  - "garbage collection, DisposeAsync method"
ms.topic: how-to
---

# Implement a DisposeAsync method

The [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) interface was introduced as part of C# 8.0. You implement the [System.IAsyncDisposable.DisposeAsync](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync) method when you need to perform resource cleanup, just as you would when [implementing a Dispose method](implementing-dispose.md). One of the key differences, however, is that this implementation allows for asynchronous cleanup operations. The [System.IAsyncDisposable.DisposeAsync](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync) returns a [System.Threading.Tasks.ValueTask](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ValueTask) that represents the asynchronous disposal operation.

It's typical when implementing the [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) interface that classes also implement the [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) interface. A good implementation pattern of the [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) interface is to be prepared for either synchronous or asynchronous disposal, however, it's not a requirement. If no synchronous disposable of your class is possible, having only [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) is acceptable. All of the guidance for implementing the disposal pattern also applies to the asynchronous implementation. This article assumes that you're already familiar with how to [implement a Dispose method](implementing-dispose.md).

> **Caution:**
> If you implement the [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) interface but not the [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) interface, your app can potentially leak resources. If a class implements [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable), but not [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable), and a consumer only calls `Dispose`, your implementation would never call `DisposeAsync`. This would result in a resource leak.


> **Tip:**
> With regard to dependency injection, when registering services in an [Microsoft.Extensions.DependencyInjection.IServiceCollection](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IServiceCollection), the [service lifetime](../../core/extensions/dependency-injection/service-lifetimes.md) is managed implicitly on your behalf. The [System.IServiceProvider](https://learn.microsoft.com/search/?terms=System.IServiceProvider) and corresponding [Microsoft.Extensions.Hosting.IHost](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHost) orchestrate resource cleanup. Specifically, implementations of [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) and [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) are properly disposed at the end of their specified lifetime.
>
> For more information, see [Dependency injection in .NET](../../core/extensions/dependency-injection/overview.md).


## Explore `DisposeAsync` and `DisposeAsyncCore` methods

The [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) interface declares a single parameterless method, [System.IAsyncDisposable.DisposeAsync](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync). Any nonsealed class should define a `DisposeAsyncCore()` method that also returns a [System.Threading.Tasks.ValueTask](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ValueTask).

- A `public` [System.IAsyncDisposable.DisposeAsync](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync) implementation that has no parameters.
- A `protected virtual ValueTask DisposeAsyncCore()` method whose signature is:

  ```csharp
  protected virtual ValueTask DisposeAsyncCore()
  {
  }
  ```

### The `DisposeAsync` method

The `public` parameterless `DisposeAsync()` method is called implicitly in an `await using` statement, and its purpose is to free unmanaged resources, perform general cleanup, and to indicate that the finalizer, if one is present, need not run. Freeing the memory associated with a managed object is always the domain of the [garbage collector](index.md). Because of this, it has a standard implementation:

```csharp
public async ValueTask DisposeAsync()
{
    // Perform async cleanup.
    await DisposeAsyncCore().ConfigureAwait(false);

    // Dispose of unmanaged resources.
    Dispose(false);

    // Suppress finalization.
    GC.SuppressFinalize(this);
}
```

> **Note:**
> One primary difference in the async dispose pattern compared to the dispose pattern, is that the call from [System.IAsyncDisposable.DisposeAsync](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync) to the `Dispose(bool)` overload method is given `false` as an argument. When implementing the [System.IDisposable.Dispose](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose) method, however, `true` is passed instead. This helps ensure functional equivalence with the synchronous dispose pattern, and further ensures that finalizer code paths still get invoked. In other words, the `DisposeAsyncCore()` method will dispose of managed resources asynchronously, so you don't want to dispose of them synchronously as well. Therefore, call `Dispose(false)` instead of `Dispose(true)`.

### The `DisposeAsyncCore` method

The `DisposeAsyncCore()` method is intended to perform the asynchronous cleanup of managed resources or for cascading calls to `DisposeAsync()`. It encapsulates the common asynchronous cleanup operations when a subclass inherits a base class that is an implementation of [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable). The `DisposeAsyncCore()` method is `virtual` so that derived classes can define custom cleanup in their overrides.

> **Tip:**
> If an implementation of [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) is `sealed`, the `DisposeAsyncCore()` method is not needed, and the asynchronous cleanup can be performed directly in the [System.IAsyncDisposable.DisposeAsync](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync) method.

## Implement the async dispose pattern

All nonsealed classes should be considered a potential base class, because they could be inherited. If you implement the async dispose pattern for any potential base class, you must provide the `protected virtual ValueTask DisposeAsyncCore()` method. Some of the following examples use a `NoopAsyncDisposable` class that is defined as follows:

[language="csharp" source="snippets/dispose-async/NoopAsyncDisposable.cs"::: (complete source file; reference: snippets/dispose-async/NoopAsyncDisposable.cs)](../../../_code/docs/standard/garbage-collection/snippets/dispose-async/NoopAsyncDisposable.cs.md)

Here's an example implementation of the async dispose pattern that uses the `NoopAsyncDisposable` type. The type implements `DisposeAsync` by returning [System.Threading.Tasks.ValueTask.CompletedTask](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ValueTask.CompletedTask).

[language="csharp" source="snippets/dispose-async/ExampleAsyncDisposable.cs"::: (complete source file; reference: snippets/dispose-async/ExampleAsyncDisposable.cs)](../../../_code/docs/standard/garbage-collection/snippets/dispose-async/ExampleAsyncDisposable.cs.md)

In the preceding example:

- The `ExampleAsyncDisposable` is a nonsealed class that implements the [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) interface.
- It contains a private `IAsyncDisposable` field, `_example`, that's initialized in the constructor.
- The `DisposeAsync` method delegates to the `DisposeAsyncCore` method and calls [System.GC.SuppressFinalize*](https://learn.microsoft.com/search/?terms=System.GC.SuppressFinalize*) to notify the garbage collector that the finalizer doesn't have to run.
- It contains a `DisposeAsyncCore()` method that calls the `_example.DisposeAsync()` method, and sets the field to `null`.
- The `DisposeAsyncCore()` method is `virtual`, which allows subclasses to override it with custom behavior.

### Sealed alternative async dispose pattern

If your implementing class can be `sealed`, you can implement the async dispose pattern by overriding the [System.IAsyncDisposable.DisposeAsync](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync) method. The following example shows how to implement the async dispose pattern for a sealed class:

[language="csharp" source="snippets/dispose-async/SealedExampleAsyncDisposable.cs"::: (complete source file; reference: snippets/dispose-async/SealedExampleAsyncDisposable.cs)](../../../_code/docs/standard/garbage-collection/snippets/dispose-async/SealedExampleAsyncDisposable.cs.md)

In the preceding example:

- The `SealedExampleAsyncDisposable` is a sealed class that implements the [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) interface.
- The containing `_example` field is `readonly` and is initialized in the constructor.
- The `DisposeAsync` method calls the `_example.DisposeAsync()` method, implementing the pattern through the containing field (cascading disposal).

## Implement both dispose and async dispose patterns

You may need to implement both the [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) and [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) interfaces, especially when your class scope contains instances of these implementations. Doing so ensures that you can properly cascade clean up calls. Here's an example class that implements both interfaces and demonstrates the proper guidance for cleanup.

[language="csharp" source="snippets/dispose-async/ExampleConjunctiveDisposable.cs"::: (complete source file; reference: snippets/dispose-async/ExampleConjunctiveDisposable.cs)](../../../_code/docs/standard/garbage-collection/snippets/dispose-async/ExampleConjunctiveDisposable.cs.md)

The [System.IDisposable.Dispose](https://learn.microsoft.com/search/?terms=System.IDisposable.Dispose) and [System.IAsyncDisposable.DisposeAsync](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync) implementations are both simple boilerplate code.

In the `Dispose(bool)` overload method, the [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) instance is conditionally disposed of if it isn't `null`. The [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) instance is cast as [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable), and if it's also not `null`, it's disposed of as well. Both instances are then assigned to `null`.

With the `DisposeAsyncCore()` method, the same logical approach is followed. If the [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) instance isn't `null`, its call to `DisposeAsync().ConfigureAwait(false)` is awaited. If the [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) instance is also an implementation of [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable), it's also disposed of asynchronously. Both instances are then assigned to `null`.

Each implementation strives to dispose of all possible disposable objects. This ensures that the cleanup is cascaded properly.

## Using async disposable

To properly consume an object that implements the [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) interface, you use the [await](../../csharp/language-reference/operators/await.md) and [using](../../csharp/language-reference/statements/using.md) keywords together. Consider the following example, where the `ExampleAsyncDisposable` class is instantiated and then wrapped in an `await using` statement.

[language="csharp" source="snippets/dispose-async/ExampleConfigureAwaitProgram.cs"::: (complete source file; reference: snippets/dispose-async/ExampleConfigureAwaitProgram.cs)](../../../_code/docs/standard/garbage-collection/snippets/dispose-async/ExampleConfigureAwaitProgram.cs.md)

> **Important:**
> Use the [System.Threading.Tasks.TaskAsyncEnumerableExtensions.ConfigureAwait(System.IAsyncDisposable,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskAsyncEnumerableExtensions.ConfigureAwait(System.IAsyncDisposable%2CSystem.Boolean)) extension method of the [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable) interface to configure how the continuation of the task is marshalled on its original context or scheduler. For more information on `ConfigureAwait`, see [ConfigureAwait FAQ](https://devblogs.microsoft.com/dotnet/configureawait-faq/).

For situations where the usage of `ConfigureAwait` isn't needed, the `await using` statement could be simplified as follows:

[language="csharp" source="snippets/dispose-async/ExampleUsingStatementProgram.cs"::: (complete source file; reference: snippets/dispose-async/ExampleUsingStatementProgram.cs)](../../../_code/docs/standard/garbage-collection/snippets/dispose-async/ExampleUsingStatementProgram.cs.md)

Furthermore, it could be written to use the implicit scoping of a [using declaration](../../csharp/language-reference/statements/using.md).

[language="csharp" source="snippets/dispose-async/ExampleUsingDeclarationProgram.cs"::: (complete source file; reference: snippets/dispose-async/ExampleUsingDeclarationProgram.cs)](../../../_code/docs/standard/garbage-collection/snippets/dispose-async/ExampleUsingDeclarationProgram.cs.md)

## Multiple await keywords in a single line

Sometimes the `await` keyword may appear multiple times within a single line. For example, consider the following code:

```csharp
await using var transaction = await context.Database.BeginTransactionAsync(token);
```

In the preceding example:

- The [System.Data.Common.DbConnection.BeginTransactionAsync*](https://learn.microsoft.com/search/?terms=System.Data.Common.DbConnection.BeginTransactionAsync*) method is awaited.
- The return type is [System.Data.Common.DbTransaction](https://learn.microsoft.com/search/?terms=System.Data.Common.DbTransaction), which implements `IAsyncDisposable`.
- The `transaction` is used asynchronously, and also awaited.

## Stacked usings

In situations where you create and use multiple objects that implement [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable), it's possible that stacking `await using` statements with [System.Threading.Tasks.ValueTask.ConfigureAwait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ValueTask.ConfigureAwait*) could prevent calls to [System.IAsyncDisposable.DisposeAsync](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync) in errant conditions. To ensure that [System.IAsyncDisposable.DisposeAsync](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync) is always called, you should avoid stacking. The following three code examples show acceptable patterns to use instead.

### Acceptable pattern one

[language="csharp" id="one" source="snippets/dispose-async/ExamplePatterns.cs"::: (complete source file; reference: snippets/dispose-async/ExamplePatterns.cs)](../../../_code/docs/standard/garbage-collection/snippets/dispose-async/ExamplePatterns.cs.md)

In the preceding example, each asynchronous clean-up operation is explicitly scoped under the `await using` block. The outer scope follows how `objOne` sets its braces, enclosing `objTwo`, as such `objTwo` is disposed first, followed by `objOne`. Both `IAsyncDisposable` instances have their [System.IAsyncDisposable.DisposeAsync](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync) method awaited, so each instance performs its asynchronous clean-up operation. The calls are nested, not stacked.

### Acceptable pattern two

[language="csharp" id="two" source="snippets/dispose-async/ExamplePatterns.cs"::: (complete source file; reference: snippets/dispose-async/ExamplePatterns.cs)](../../../_code/docs/standard/garbage-collection/snippets/dispose-async/ExamplePatterns.cs.md)

In the preceding example, each asynchronous clean-up operation is explicitly scoped under the `await using` block. At the end of each block, the corresponding `IAsyncDisposable` instance has its [System.IAsyncDisposable.DisposeAsync](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync) method awaited, thus performing its asynchronous clean-up operation. The calls are sequential, not stacked. In this scenario `objOne` is disposed first, then `objTwo` is disposed.

### Acceptable pattern three

[language="csharp" id="three" source="snippets/dispose-async/ExamplePatterns.cs"::: (complete source file; reference: snippets/dispose-async/ExamplePatterns.cs)](../../../_code/docs/standard/garbage-collection/snippets/dispose-async/ExamplePatterns.cs.md)

In the preceding example, each asynchronous clean-up operation is implicitly scoped with the containing method body. At the end of the enclosing block, the `IAsyncDisposable` instances perform their asynchronous clean-up operations. This example runs in reverse order from which they were declared, meaning that `objTwo` is disposed before `objOne`.

### Unacceptable pattern

The highlighted lines in the following code show what it means to have "stacked usings". If an exception is thrown from the `AnotherAsyncDisposable` constructor, neither object is properly disposed of. The variable `objTwo` is never assigned because the constructor didn't complete successfully. As a result, the constructor for `AnotherAsyncDisposable` is responsible for disposing any resources allocated before it throws an exception. If the `ExampleAsyncDisposable` type has a finalizer, it's eligible for finalization.

[language="csharp" id="dontdothis" source="snippets/dispose-async/ExamplePatterns.cs" highlight="9-10"::: (complete source file; reference: snippets/dispose-async/ExamplePatterns.cs)](../../../_code/docs/standard/garbage-collection/snippets/dispose-async/ExamplePatterns.cs.md)

> **Tip:**
> Avoid this pattern as it could lead to unexpected behavior. If you use one of the acceptable patterns, the problem of undisposed objects is non-existent. The clean-up operations are correctly performed when `using` statements aren't stacked.

## See also

For a dual implementation example of `IDisposable` and `IAsyncDisposable`, see the [System.Text.Json.Utf8JsonWriter](https://learn.microsoft.com/search/?terms=System.Text.Json.Utf8JsonWriter) source code [on GitHub](https://github.com/dotnet/runtime/blob/035b729d829368c2790d825bd02db14f0c0fd2ea/src/libraries/System.Text.Json/src/System/Text/Json/Writer/Utf8JsonWriter.cs#L297-L345).

- [Disposal of services](../../core/extensions/dependency-injection/guidelines.md#disposal-of-services)
- [System.IAsyncDisposable](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable)
- [System.IAsyncDisposable.DisposeAsync](https://learn.microsoft.com/search/?terms=System.IAsyncDisposable.DisposeAsync)
- [System.Threading.Tasks.TaskAsyncEnumerableExtensions.ConfigureAwait(System.IAsyncDisposable,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskAsyncEnumerableExtensions.ConfigureAwait(System.IAsyncDisposable%2CSystem.Boolean))
