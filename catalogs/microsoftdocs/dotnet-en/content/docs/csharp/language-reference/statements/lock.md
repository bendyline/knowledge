---
title: "The lock statement - synchronize access to shared resources"
description: "Use the C# lock statement to ensure that only a single thread exclusively reads or writes a shared resource, blocking all other threads until it completes."
ms.date: 01/16/2026
f1_keywords: 
  - "lock_CSharpKeyword"
  - "lock"
helpviewer_keywords: 
  - "lock keyword [C#]"
---
# The lock statement - ensure exclusive access to a shared resource

The `lock` statement acquires the mutual-exclusion lock for a given object, executes a statement block, and then releases the lock. While a lock is held, the thread that holds the lock can acquire and release the lock multiple times. Any other thread is blocked from acquiring the lock and waits until the lock is released. The `lock` statement ensures that at most only one thread executes its body at any moment in time.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


The `lock` statement takes the following form:

```csharp
lock (x)
{
    // Your code...
}
```

The variable `x` is an expression of [System.Threading.Lock](https://learn.microsoft.com/search/?terms=System.Threading.Lock) type, or a [reference type](../keywords/reference-types.md). When the compiler knows that `x` is of the type [System.Threading.Lock](https://learn.microsoft.com/search/?terms=System.Threading.Lock), it's precisely equivalent to:

```csharp
using (x.EnterScope())
{
    // Your code...
}
```

The object returned by [System.Threading.Lock.EnterScope](https://learn.microsoft.com/search/?terms=System.Threading.Lock.EnterScope) is a [`ref struct`](../builtin-types/ref-struct.md) that includes a `Dispose()` method. The generated [`using`](using.md) statement ensures the scope is released even if an exception is thrown within the body of the `lock` statement.

Otherwise, the `lock` statement is precisely equivalent to:

```csharp
object __lockObj = x;
bool __lockWasTaken = false;
try
{
    System.Threading.Monitor.Enter(__lockObj, ref __lockWasTaken);
    // Your code...
}
finally
{
    if (__lockWasTaken) System.Threading.Monitor.Exit(__lockObj);
}
```

Since the code uses a [`try-finally` statement](exception-handling-statements.md#the-try-finally-statement), the lock is released even if an exception is thrown within the body of a `lock` statement.

You can't use the [`await` expression](../operators/await.md) in the body of a `lock` statement.

## Guidelines

Starting with .NET 9 and C# 13, lock a dedicated object instance of the [System.Threading.Lock](https://learn.microsoft.com/search/?terms=System.Threading.Lock) type for best performance. The compiler also issues a warning if you cast a known `Lock` object to another type and lock it. If you're using an older version of .NET and C#, lock on a dedicated object instance that isn't used for another purpose. Avoid using the same lock object instance for different shared resources, as it might result in deadlock or lock contention. In particular, avoid using the following instances as lock objects:

- `this`, as callers might also lock `this`.
- [System.Type](https://learn.microsoft.com/search/?terms=System.Type) instances, as they might be obtained by the [typeof](../operators/type-testing-and-cast.md#the-typeof-operator) operator or reflection.
- string instances, including string literals, as they might be [interned](https://learn.microsoft.com/dotnet/api/system.string.intern#remarks).

Hold a lock for as short time as possible to reduce lock contention.

## Example

The following example defines an `Account` class that synchronizes access to its private `balance` field by locking on a dedicated `balanceLock` instance. Using the same instance for locking ensures that two different threads can't update the `balance` field by calling the `Debit` or `Credit` methods simultaneously. The sample uses C# 13 and the new `Lock` object. If you're using an older version of C# or an older .NET library, lock an instance of `object`.

[language="csharp" source="snippets/lock/Program.cs"::: (complete source file; reference: snippets/lock/Program.cs)](../../../../_code/docs/csharp/language-reference/statements/snippets/lock/Program.cs.md)

## C# language specification

For more information, see [The lock statement](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/statements.md#1313-the-lock-statement) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md).

## See also

- [System.Threading.Monitor](https://learn.microsoft.com/search/?terms=System.Threading.Monitor)
- [System.Threading.SpinLock](https://learn.microsoft.com/search/?terms=System.Threading.SpinLock)
- [System.Threading.Interlocked](https://learn.microsoft.com/search/?terms=System.Threading.Interlocked)
- [Overview of synchronization primitives](../../../standard/threading/overview-of-synchronization-primitives.md)
- [Introduction to System.Threading.Channels](https://devblogs.microsoft.com/dotnet/an-introduction-to-system-threading-channels)
