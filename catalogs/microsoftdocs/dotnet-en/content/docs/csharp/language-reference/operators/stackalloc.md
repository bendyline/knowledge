---
title: "stackalloc expression - Allocate variable storage on the stack instead of the heap"
description: "The C# stackalloc expression allocates a block of memory on the stack. Stackalloc memory is automatically discarded when that method returns."
ms.date: 06/16/2026
f1_keywords:
  - "stackalloc_CSharpKeyword"
helpviewer_keywords:
  - "stackalloc expression [C#]"
---
# stackalloc expression (C# reference)

A `stackalloc` expression allocates a block of memory on the stack. A stack-allocated memory block created during the method execution is automatically discarded when that method returns. You can't explicitly free the memory allocated by `stackalloc`. A stack-allocated memory block isn't subject to [garbage collection](../../../standard/garbage-collection/index.md) and doesn't need to be pinned by a [`fixed` statement](../statements/fixed.md).


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


You can assign the result of a `stackalloc` expression to a variable of one of the following types:

- [System.Span`1](https://learn.microsoft.com/search/?terms=System.Span%601) or [System.ReadOnlySpan`1](https://learn.microsoft.com/search/?terms=System.ReadOnlySpan%601), as the following example shows:

  [language="csharp" source="snippets/shared/StackallocOperator.cs" id="AssignToSpan"::: (complete source file; reference: snippets/shared/StackallocOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/StackallocOperator.cs.md)

  You don't need to use an [unsafe](../keywords/unsafe.md) context when you assign a stack-allocated memory block to a [System.Span`1](https://learn.microsoft.com/search/?terms=System.Span%601) or [System.ReadOnlySpan`1](https://learn.microsoft.com/search/?terms=System.ReadOnlySpan%601) variable.

  When you work with those types, you can use a `stackalloc` expression in [conditional](conditional-operator.md) or assignment expressions, as the following example shows:

  [language="csharp" source="snippets/shared/StackallocOperator.cs" id="AsExpression"::: (complete source file; reference: snippets/shared/StackallocOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/StackallocOperator.cs.md)

  You can use a `stackalloc` expression or a collection expression inside other expressions whenever a [System.Span`1](https://learn.microsoft.com/search/?terms=System.Span%601) or [System.ReadOnlySpan`1](https://learn.microsoft.com/search/?terms=System.ReadOnlySpan%601) variable is allowed, as the following example shows:

  [language="csharp" source="snippets/shared/StackallocOperator.cs" id="Nested"::: (complete source file; reference: snippets/shared/StackallocOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/StackallocOperator.cs.md)

  > **Note:**
  > Use [System.Span`1](https://learn.microsoft.com/search/?terms=System.Span%601) or [System.ReadOnlySpan`1](https://learn.microsoft.com/search/?terms=System.ReadOnlySpan%601) types to work with stack-allocated memory whenever possible.

- A [pointer type](../unsafe-code.md#pointer-types), as the following example shows:

  [language="csharp" source="snippets/shared/StackallocOperator.cs" id="AssignToPointer"::: (complete source file; reference: snippets/shared/StackallocOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/StackallocOperator.cs.md)

  You must use an `unsafe` context when you work with pointer types.

  > **Note:**
  > The [memory safety](../unsafe-code.md#the-updated-memory-safety-model-preview) preview feature available in C# 15 lets you convert a `stackalloc` expression to a pointer outside an `unsafe` context. Operations that access the allocated memory through the pointer still require an `unsafe` context.

  For pointer types, you can use a `stackalloc` expression only in a local variable declaration to initialize the variable.

The amount of memory available on the stack is limited. If you allocate too much memory on the stack, a [System.StackOverflowException](https://learn.microsoft.com/search/?terms=System.StackOverflowException) is thrown. To avoid that exception, follow these rules:

- Limit the amount of memory you allocate by using `stackalloc`. For example, if the intended buffer size is below a certain limit, allocate the memory on the stack. Otherwise, use an array of the required length, as the following code shows:

  [language="csharp" source="snippets/shared/StackallocOperator.cs" id="LimitStackalloc"::: (complete source file; reference: snippets/shared/StackallocOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/StackallocOperator.cs.md)

  > **Note:**
  > Because the amount of memory available on the stack depends on the environment in which the code runs, be conservative when you define the actual limit value.

- Avoid using `stackalloc` inside loops. Allocate the memory block outside a loop and reuse it inside the loop.

The content of the newly allocated memory is undefined. You should initialize it before it's used, either with a `stackalloc` initializer or a method like [System.Span`1.Clear*](https://learn.microsoft.com/search/?terms=System.Span%601.Clear*).

> **Important:**
> Not initializing memory allocated by `stackalloc` is an important difference from the `new` operator. Memory allocated by using the `new` operator is initialized to the 0 bit pattern.

You can use array initializer syntax to define the content of the newly allocated memory. The following example demonstrates various ways to do that:

[language="csharp" source="snippets/shared/StackallocOperator.cs" id="StackallocInit"::: (complete source file; reference: snippets/shared/StackallocOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/StackallocOperator.cs.md)

In expression `stackalloc T[E]`, `T` must be an [unmanaged type](../builtin-types/unmanaged-types.md) and `E` must evaluate to a non-negative [int](../builtin-types/integral-numeric-types.md) value. When you use the [collection expression](collection-expressions.md) syntax to initialize the span, the compiler can use stack-allocated storage for a span if it doesn't violate ref safety.

## Security

Using `stackalloc` automatically turns on buffer overrun detection features in the common language runtime (CLR). If the runtime detects a buffer overrun, it terminates the process as quickly as possible to reduce the chance that malicious code runs.

## C# language specification

For more information, see the [Stack allocation](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/unsafe-code.md#249-stack-allocation) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md).

## See also

- [C# operators and expressions](index.md)
- [Pointer related operators](pointer-related-operators.md)
- [Pointer types](../unsafe-code.md#pointer-types)
- [Memory and span-related types](../../../standard/memory-and-spans/index.md)
- [Dos and Don'ts of stackalloc](https://vcsjones.dev/2020/02/24/stackalloc/)
