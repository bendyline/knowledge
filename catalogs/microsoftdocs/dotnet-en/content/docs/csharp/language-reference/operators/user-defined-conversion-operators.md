---
title: "User-defined explicit and implicit conversion operators - provide conversions to different types"
description: "Learn how to define custom implicit and explicit type conversions in C#. The operators provide the functionality for casting an object to a new type."
ms.date: 01/20/2026
f1_keywords:
  - "explicit_CSharpKeyword"
  - "implicit_CSharpKeyword"
  - "explicit"
  - "implicit"
helpviewer_keywords:
  - "explicit keyword [C#]"
  - "implicit keyword [C#]"
  - "conversion operator [C#]"
  - "user-defined conversion [C#]"
---
# User-defined explicit and implicit conversion operators

A user-defined type can define a custom implicit or explicit conversion from or to another type, provided a standard conversion doesn't exist between the same two types. Implicit conversions don't require special syntax to be invoked and can occur in various situations, for example, in assignments and methods invocations. Predefined C# implicit conversions always succeed and never throw an exception. User-defined implicit conversions should behave in that way as well. If a custom conversion can throw an exception or lose information, define it as an explicit conversion.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


The [is](type-testing-and-cast.md#the-is-operator) and [as](type-testing-and-cast.md#the-as-operator) operators don't consider user-defined conversions. Use a [cast expression](type-testing-and-cast.md#cast-expression) to invoke a user-defined explicit conversion.

Use the `operator` and `implicit` or `explicit` keywords to define an implicit or explicit conversion, respectively. The type that defines a conversion must be either a source type or a target type of that conversion. You can define a conversion between two user-defined types in either of the two types.

The following example demonstrates how to define an implicit and explicit conversion:

[language="csharp" source="snippets/shared/UserDefinedConversions.cs"::: (complete source file; reference: snippets/shared/UserDefinedConversions.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/UserDefinedConversions.cs.md)

You can define *checked* explicit conversion operators. For more information, see the [User-defined checked operators](arithmetic-operators.md#user-defined-checked-operators) section of the [Arithmetic operators](arithmetic-operators.md) article.

You also use the `operator` keyword to overload a predefined C# operator. For more information, see [Operator overloading](operator-overloading.md).

## C# language specification

For more information, see the following sections of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md):

- [Conversion operators](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/classes.md#15104-conversion-operators)
- [User-defined conversions](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/conversions.md#105-user-defined-conversions)
- [Implicit conversions](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/conversions.md#102-implicit-conversions)
- [Explicit conversions](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/conversions.md#103-explicit-conversions)

## See also

- [C# operators and expressions](index.md)
- [Operator overloading](operator-overloading.md)
- [Type-testing and cast operators](type-testing-and-cast.md)
- [Casting and type conversion](../../programming-guide/types/casting-and-type-conversions.md)
- [Design guidelines - Conversion operators](../../../standard/design-guidelines/operator-overloads.md#conversion-operators)
- [Chained user-defined explicit conversions in C#](https://learn.microsoft.com/archive/blogs/ericlippert/chained-user-defined-explicit-conversions-in-c)
