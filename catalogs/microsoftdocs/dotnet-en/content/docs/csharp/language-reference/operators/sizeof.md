---
title: "sizeof operator - determine the storage needs for a type"
description: "Learn about the C# `sizeof` operator that returns the memory amount occupied by a variable of a given type."
ms.date: 06/29/2026
f1_keywords:
  - "sizeof_CSharpKeyword"
  - "sizeof"
helpviewer_keywords:
  - "sizeof keyword [C#]"
---
# sizeof operator - determine the memory needs for a given type

The `sizeof` operator returns the number of bytes occupied by a variable of a given type. In safe code, the argument to the `sizeof` operator must be the name of a built-in [unmanaged type](../builtin-types/unmanaged-types.md) whose size isn't platform-dependent, or an [enumeration type](../builtin-types/enum.md).


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


The expressions presented in the following table are evaluated at compile time to the corresponding constant values and don't require an unsafe context:

| Expression | Constant value |
| --- | --- |
| `sizeof(sbyte)` | 1 |
| `sizeof(byte)` | 1 |
| `sizeof(short)` | 2 |
| `sizeof(ushort)` | 2 |
| `sizeof(int)` | 4 |
| `sizeof(uint)` | 4 |
| `sizeof(long)` | 8 |
| `sizeof(ulong)` | 8 |
| `sizeof(char)` | 2 |
| `sizeof(float)` | 4 |
| `sizeof(double)` | 8 |
| `sizeof(decimal)` | 16 |
| `sizeof(bool)` | 1 |

The size of the types in the preceding table is a compile-time constant.

For an enum type, the result of the `sizeof` operator is the size of the enum's underlying integral type. The result is computed at compile time.

In [unsafe](../keywords/unsafe.md) code, you can use `sizeof` on any non-`void` type, including types constructed from type parameters.

> **Note:**
> The [memory safety](../unsafe-code.md#the-updated-memory-safety-model-preview) preview feature available in C# 15 lets you use `sizeof` on any unmanaged type outside an `unsafe` context.

- The size of a reference or pointer type is the size of a reference or pointer, not the size of the object it might refer to.
- The size of a value type, unmanaged or not, is the size of such a value.
- The size of an enumeration type is the size of its underlying integral type. This size is a compile-time constant. If the underlying type of an enum defined in a referenced assembly later changes, code that applied `sizeof` to that enum must be recompiled to observe the new size.
- The size of a `ref struct` type is the size of the value. The size of every `ref` field is the size of a reference or pointer, not the size of the value it refers to.

The following example demonstrates the usage of the `sizeof` operator:

[language="csharp" source="./snippets/shared/SizeOfOperator.cs"::: (complete source file; reference: ./snippets/shared/SizeOfOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/SizeOfOperator.cs.md)

The `sizeof` operator returns the number of bytes allocated by the common language runtime in managed memory. For [struct](../builtin-types/struct.md) types, that value includes any padding, as the preceding example demonstrates. The result of the `sizeof` operator might differ from the result of the [System.Runtime.InteropServices.Marshal.SizeOf*](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.SizeOf*) method, which returns the size of a type in *unmanaged* memory.

> **Important:**
>
> The value returned by `sizeof` can differ from the result of [System.Runtime.InteropServices.Marshal.SizeOf(System.Object)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.SizeOf(System.Object)), which returns the size of the type in unmanaged memory.

## C# language specification

For more information, see the [`sizeof` operator](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/unsafe-code.md#2469-the-sizeof-operator) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md).

## See also

- [C# operators and expressions](index.md)
- [Pointer related operators](pointer-related-operators.md)
- [Pointer types](../unsafe-code.md#pointer-types)
- [Memory and span-related types](../../../standard/memory-and-spans/index.md)
- [Generics in .NET](../../../standard/generics/index.md)
