---
title: "yield statement - provide the next element in an iterator"
description: "Use the yield statement in iterators to provide the next value or signal the end of an iteration"
ms.date: 01/16/2026
f1_keywords:
  - "yield"
  - "yield_CSharpKeyword"
helpviewer_keywords:
  - "yield keyword [C#]"
---
# yield statement - provide the next element

Use the `yield` statement in an [iterator](../../iterators.md) to provide the next value or signal the end of an iteration. The `yield` statement has the two following forms:

- `yield return`: to provide the next value in iteration, as the following example shows:

  [language="csharp" source="snippets/yield/Program.cs" id="YieldReturn"::: (complete source file; reference: snippets/yield/Program.cs)](../../../../_code/docs/csharp/language-reference/statements/snippets/yield/Program.cs.md)

- `yield break`: to explicitly signal the end of iteration, as the following example shows:

  [language="csharp" source="snippets/yield/Program.cs" id="YieldBreak"::: (complete source file; reference: snippets/yield/Program.cs)](../../../../_code/docs/csharp/language-reference/statements/snippets/yield/Program.cs.md)

  Iteration also finishes when control reaches the end of an iterator.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


In the preceding examples, the return type of iterators is [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601). In nongeneric cases, use [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable) as the return type of an iterator. You can also use [System.Collections.Generic.IAsyncEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IAsyncEnumerable%601) as the return type of an iterator. That makes an iterator async. Use the [`await foreach` statement](iteration-statements.md#await-foreach) to iterate over iterator's result, as the following example shows:

[language="csharp" source="snippets/yield/Program.cs" id="IteratorAsync"::: (complete source file; reference: snippets/yield/Program.cs)](../../../../_code/docs/csharp/language-reference/statements/snippets/yield/Program.cs.md)

[System.Collections.Generic.IEnumerator`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerator%601) or [System.Collections.IEnumerator](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerator) can also be the return type of an iterator. Use those return types when you implement the `GetEnumerator` method in the following scenarios:

- You design the type that implements [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) or [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable) interface.
- You add an instance or [extension](../../programming-guide/classes-and-structs/extension-methods.md) `GetEnumerator` method to enable iteration over the type's instance with the [`foreach` statement](iteration-statements.md#the-foreach-statement), as the following example shows:

  [language="csharp" source="snippets/yield/GetEnumeratorExample.cs" id="GetEnumeratorExample"::: (complete source file; reference: snippets/yield/GetEnumeratorExample.cs)](../../../../_code/docs/csharp/language-reference/statements/snippets/yield/GetEnumeratorExample.cs.md)

You can't use the `yield` statements in:

- methods with [in](../keywords/method-parameters.md#in-parameter-modifier), [ref](../keywords/ref.md), or [out](../keywords/method-parameters.md#out-parameter-modifier) parameters.
- [lambda expressions](../operators/lambda-expressions.md) and [anonymous methods](../operators/delegate-operator.md).
- [unsafe blocks](../keywords/unsafe.md). Before C# 13, `yield` was invalid in any method with an `unsafe` block. Beginning with C# 13, you can use `yield` in methods with `unsafe` blocks, but not in the `unsafe` block.
- `yield return` and `yield break` can't be used in [catch](exception-handling-statements.md) and [finally](exception-handling-statements.md) blocks, or in [try](exception-handling-statements.md) blocks with a corresponding `catch` block. The `yield return` and `yield break` statements can be used in a `try` block with no `catch` blocks, only a `finally` block.

## `using` statements in iterators

You can use [`using` statements](using.md) in iterator methods. Since `using` statements compile into `try` blocks with `finally` clauses (and no `catch` blocks), they work correctly with iterators. The disposable resources are properly managed throughout the iterator's execution:

[language="csharp" source="snippets/yield/Program.cs" id="UsingInIterator"::: (complete source file; reference: snippets/yield/Program.cs)](../../../../_code/docs/csharp/language-reference/statements/snippets/yield/Program.cs.md)

As the preceding example shows, the resource acquired in the `using` statement remains available throughout the iterator's execution, even when the iterator suspends and resumes execution at `yield return` statements. The resource is disposed when the iterator completes (either by reaching the end or via `yield break`) or when the iterator itself is disposed (for example, when the caller breaks out of enumeration early).

## Execution of an iterator

Calling an iterator doesn't execute it immediately, as the following example shows:

[language="csharp" source="snippets/yield/Program.cs" id="IteratorExecution"::: (complete source file; reference: snippets/yield/Program.cs)](../../../../_code/docs/csharp/language-reference/statements/snippets/yield/Program.cs.md)

As the preceding example shows, when you start to iterate over an iterator's result, the iterator executes until the first `yield return` statement is reached. Then, the execution of the iterator is suspended and the caller gets the first iteration value and processes it. On each subsequent iteration, the execution of the iterator resumes after the `yield return` statement that caused the previous suspension and continues until the next `yield return` statement is reached. The iteration completes when control reaches the end of an iterator or a `yield break` statement.

## C# language specification

For more information, see [The yield statement](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/statements.md#1315-the-yield-statement) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md).

## See also

- [Iterators](../../iterators.md)
- [Iterate through collections in C#](../../programming-guide/concepts/iterators.md)
- [foreach](iteration-statements.md#the-foreach-statement)
- [await foreach](iteration-statements.md#await-foreach)
