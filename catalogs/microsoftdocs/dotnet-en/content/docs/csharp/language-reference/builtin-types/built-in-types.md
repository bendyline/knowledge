---
title: "Built-in types"
description: "Learn C# built-in value and reference types"
ms.date: 01/14/2026
helpviewer_keywords:
  - "types [C#], built-in"
  - "built-in C# types"
---
# Built-in types (C# reference)

The following table lists the C# built-in [value](value-types.md) types:

| C# type keyword | .NET type |
| --- | --- |
| [`bool`](bool.md) | [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) |
| [`byte`](integral-numeric-types.md) | [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte) |
| [`sbyte`](integral-numeric-types.md) | [System.SByte](https://learn.microsoft.com/search/?terms=System.SByte) |
| [`char`](char.md) | [System.Char](https://learn.microsoft.com/search/?terms=System.Char) |
| [`decimal`](floating-point-numeric-types.md) | [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) |
| [`double`](floating-point-numeric-types.md) | [System.Double](https://learn.microsoft.com/search/?terms=System.Double) |
| [`float`](floating-point-numeric-types.md) | [System.Single](https://learn.microsoft.com/search/?terms=System.Single) |
| [`int`](integral-numeric-types.md) | [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) |
| [`uint`](integral-numeric-types.md) | [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32) |
| [`nint`](integral-numeric-types.md) | [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr) |
| [`nuint`](integral-numeric-types.md) | [System.UIntPtr](https://learn.microsoft.com/search/?terms=System.UIntPtr) |
| [`long`](integral-numeric-types.md) | [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64) |
| [`ulong`](integral-numeric-types.md) | [System.UInt64](https://learn.microsoft.com/search/?terms=System.UInt64) |
| [`short`](integral-numeric-types.md) | [System.Int16](https://learn.microsoft.com/search/?terms=System.Int16) |
| [`ushort`](integral-numeric-types.md) | [System.UInt16](https://learn.microsoft.com/search/?terms=System.UInt16) |

The following table lists the C# built-in [reference](../keywords/reference-types.md) types:

| C# type keyword | .NET type |
| --- | --- |
| [`object`](reference-types.md#the-object-type) | [System.Object](https://learn.microsoft.com/search/?terms=System.Object) |
| [`string`](reference-types.md#the-string-type) | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| [`delegate`](reference-types.md#the-delegate-type) | [System.Delegate](https://learn.microsoft.com/search/?terms=System.Delegate) |
| [`dynamic`](reference-types.md#the-dynamic-type) | [System.Object](https://learn.microsoft.com/search/?terms=System.Object) |


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


In the preceding tables, most C# type keywords from the left column are aliases for the corresponding .NET type. They're interchangeable. For example, the following declarations declare variables of the same type:

```csharp
int a = 123;
System.Int32 b = 123;
```

The `dynamic` type is similar to `object`. The main differences are:

- Operations on a `dynamic` expression are bound at runtime, not at compile time.
- You can't use `new dynamic()`.
- You can't derive a type from the `dynamic` type.

The `delegate` keyword is a built-in reference type keyword that declares a type derived from [System.Delegate](https://learn.microsoft.com/search/?terms=System.Delegate). Unlike the other built-in type keywords, `delegate` isn't an alias for a specific .NET type. Instead, it declares custom types that derive from the abstract `System.Delegate` type. Similarly, `dynamic` represents runtime binding behavior rather than being a direct alias for a specific .NET type.

The [`void`](void.md) keyword represents the absence of a type. You use it as the return type of a method that doesn't return a value.

The C# language includes specialized rules for the [System.Span`1](https://learn.microsoft.com/search/?terms=System.Span%601) and [System.ReadOnlySpan`1](https://learn.microsoft.com/search/?terms=System.ReadOnlySpan%601) types. These types aren't classified as built-in types, because there aren't C# keywords that correspond to these types. The C# language defines implicit conversions from array types and the string type to `Span<T>` and `ReadOnlySpan<T>`. These conversions integrate `Span` types into more natural programming scenarios. The following conversions are defined as *implicit span conversions*:

- From any single-dimensional array with element type `E` to `System.Span<E>`
- From any single-dimensional array with element type `E` to `System.ReadOnlySpan<U>`, when `E` has covariance conversion or an identity conversion to `U`
- From `System.Span<E>` to `System.ReadOnlySpan<U>`, when `E` has a covariance conversion or an identity conversion to `U`
- From `System.ReadOnlySpan<E>` to `System.ReadOnlySpan<U>`, when `E` has a covariance conversion or an identity conversion to `U`
- From `string` to `System.ReadOnlySpan<char>`

The compiler never ignores any user defined conversion where an applicable *implicit span conversion* exists. Implicit span conversions can be applied to receiver parameter of [extension members](../../programming-guide/classes-and-structs/extension-methods.md). The receiver parameter is specified by the [`extension`](../keywords/extension.md) keyword in an extension member. The receiver parameter is the first parameter of an extension method using the `this` modifier. Implicit span conversions aren't considered for method group conversions.

## See also

- [Use language keywords instead of framework type names (style rule IDE0049)](../../../fundamentals/code-analysis/style-rules/ide0049.md)
- [Default values of C# types](default-values.md)
