---
description: Learn about the built-in boolean type in C#
title: "bool type"
ms.date: 01/14/2026
f1_keywords: 
  - bool
  - bool_CSharpKeyword
  - "true"
  - "false"
  - true_CSharpKeyword
  - false_CSharpKeyword
helpviewer_keywords: 
  - "bool data type [C#]"
  - "Boolean [C#]"
---
# bool (C# reference)

The `bool` type keyword is an alias for the .NET [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) structure type that represents a Boolean value, which can be either `true` or `false`.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


To perform logical operations with values of the `bool` type, use [Boolean logical](../operators/boolean-logical-operators.md) operators. The `bool` type is the result type of [comparison](../operators/comparison-operators.md) and [equality](../operators/equality-operators.md) operators. A `bool` expression can be a controlling conditional expression in the [if](../statements/selection-statements.md#the-if-statement), [do](../statements/iteration-statements.md#the-do-statement), [while](../statements/iteration-statements.md#the-while-statement), and [for](../statements/iteration-statements.md#the-for-statement) statements and in the [conditional operator `?:`](../operators/conditional-operator.md).

The default value of the `bool` type is `false`.

## Literals

Use the `true` and `false` literals to initialize a `bool` variable or to pass a `bool` value:

[language="csharp" source="snippets/shared/BoolType.cs" id="Literals"::: (complete source file; reference: snippets/shared/BoolType.cs)](../../../../_code/docs/csharp/language-reference/builtin-types/snippets/shared/BoolType.cs.md)

## Three-valued Boolean logic

Use the nullable `bool?` type if you need to support three-valued logic. For example, use it when you work with databases that support a three-valued Boolean type. For the `bool?` operands, the predefined `&` and `|` operators support the three-valued logic. For more information, see the [Nullable Boolean logical operators](../operators/boolean-logical-operators.md#nullable-boolean-logical-operators) section of the [Boolean logical operators](../operators/boolean-logical-operators.md) article.

For more information about nullable value types, see [Nullable value types](nullable-value-types.md).

## Conversions

C# provides only two conversions that involve the `bool` type. Those conversions are an implicit conversion to the corresponding nullable `bool?` type and an explicit conversion from the `bool?` type. However, .NET provides additional methods that you can use to convert to or from the `bool` type. For more information, see the [Converting to and from Boolean values](https://learn.microsoft.com/dotnet/api/system.boolean#converting-to-and-from-boolean-values) section of the [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) API reference page.

## C# language specification

For more information, see [The bool type](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/types.md#839-the-bool-type) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md).

## See also

- [Value types](value-types.md)
- [true and false operators](../operators/true-false-operators.md)
