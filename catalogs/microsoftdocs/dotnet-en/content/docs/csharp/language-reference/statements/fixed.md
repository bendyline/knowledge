---
title: "fixed statement - pin a moveable variable"
description: "Use the C# `fixed` statement to pin a moveable variable and declare a pointer to that variable. The address of a pinned variable doesn't change during execution of the statement."
ms.date: 06/16/2026
f1_keywords:
  - "fixed_CSharpKeyword"
  - "fixed"
helpviewer_keywords:
  - "fixed statement [C#]"
  - "fixed keyword [C#]"
---
# fixed statement - pin a variable for pointer operations

The `fixed` statement prevents the [garbage collector](../../../standard/garbage-collection/index.md) from relocating a moveable variable and declares a pointer to that variable. The address of a fixed, or pinned, variable doesn't change during execution of the statement. You can use the declared pointer only inside the corresponding `fixed` statement. The declared pointer is readonly and can't be modified:

[language="csharp" source="snippets/fixed/Program.cs" id="PinnedArray"::: (complete source file; reference: snippets/fixed/Program.cs)](../../../../_code/docs/csharp/language-reference/statements/snippets/fixed/Program.cs.md)


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


> **Note:**
> To use the `fixed` statement, compile the code with the [**AllowUnsafeBlocks**](../compiler-options/language.md#allowunsafeblocks) compiler option.
>
> The [memory safety](../unsafe-code.md#the-updated-memory-safety-model-preview) preview feature available in C# 15 feature lets you use `fixed` outside an `unsafe` context, but pointer indirection and other operations that access pinned memory still require an `unsafe` context.
You can initialize the declared pointer as follows:

- With an array, as the example at the beginning of this article shows. The initialized pointer contains the address of the first array element.
- With an address of a variable. Use the [address-of `&` operator](../operators/pointer-related-operators.md#address-of-operator-), as the following example shows:

  [language="csharp" source="snippets/fixed/Program.cs" id="PinnedVariable"::: (complete source file; reference: snippets/fixed/Program.cs)](../../../../_code/docs/csharp/language-reference/statements/snippets/fixed/Program.cs.md)

  Object fields are another example of moveable variables that you can pin.

  When the initialized pointer contains the address of an object field or an array element, the `fixed` statement guarantees that the garbage collector doesn't relocate or dispose of the containing object instance during the execution of the statement body.

- With the instance of the type that implements a method named `GetPinnableReference`. That method must return a `ref` variable of an [unmanaged type](../builtin-types/unmanaged-types.md). The .NET types [System.Span`1](https://learn.microsoft.com/search/?terms=System.Span%601) and [System.ReadOnlySpan`1](https://learn.microsoft.com/search/?terms=System.ReadOnlySpan%601) make use of this pattern. You can pin span instances, as the following example shows:

  [language="csharp" source="snippets/fixed/Program.cs" id="PinnedSpan"::: (complete source file; reference: snippets/fixed/Program.cs)](../../../../_code/docs/csharp/language-reference/statements/snippets/fixed/Program.cs.md)

  For more information, see the [System.Span`1.GetPinnableReference](https://learn.microsoft.com/search/?terms=System.Span%601.GetPinnableReference) API reference.

- With a string, as the following example shows:

  [language="csharp" source="snippets/fixed/Program.cs" id="PinnedString"::: (complete source file; reference: snippets/fixed/Program.cs)](../../../../_code/docs/csharp/language-reference/statements/snippets/fixed/Program.cs.md)

- With a [fixed-size buffer](../unsafe-code.md#fixed-size-buffers).

You can allocate memory on the stack, where it's not subject to garbage collection and therefore doesn't need to be pinned. To do that, use a [`stackalloc` expression](../operators/stackalloc.md).

You can also use the `fixed` keyword to declare a [fixed-size buffer](../unsafe-code.md#fixed-size-buffers).

## C# language specification

For more information, see the following sections of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md):

- [The fixed statement](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/unsafe-code.md#247-the-fixed-statement)
- [Fixed and moveable variables](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/unsafe-code.md#244-fixed-and-moveable-variables)

## See also

- [Unsafe code, pointer types, and function pointers](../unsafe-code.md)
- [Pointer-related operators](../operators/pointer-related-operators.md)
- [unsafe](../keywords/unsafe.md)
