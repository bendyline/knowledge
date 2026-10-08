---
description: "out keyword (generic modifier) - C# Reference"
title: "out keyword (generic modifier)"
ms.date: 01/22/2026
helpviewer_keywords:
  - "covariance, out keyword [C#]"
  - "out keyword [C#]"
---
# out (generic modifier) (C# Reference)

For generic type parameters, the `out` keyword specifies that the type parameter is covariant. Use the `out` keyword in generic interfaces and delegates.

Covariance enables you to use a more derived type than the generic parameter specifies. This feature allows for implicit conversion of classes that implement covariant interfaces and implicit conversion of delegate types. Covariance and contravariance support reference types, but they don't support value types.

An interface with a covariant type parameter enables its methods to return more derived types than those specified by the type parameter. For example, because in .NET, in [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601), type T is covariant, you can assign an object of the `IEnumerable<string>` type to an object of the `IEnumerable<object>` type without using any special conversion methods.

You can assign a covariant delegate to another delegate of the same type, but with a more derived generic type parameter.

For more information, see [Covariance and Contravariance](../../programming-guide/concepts/covariance-contravariance/index.md).


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


The following example shows how to declare, extend, and implement a covariant generic interface. It also shows how to use implicit conversion for classes that implement a covariant interface.

[language="csharp" source="./snippets/variance.cs" id="3"::: (complete source file; reference: ./snippets/variance.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/variance.cs.md)

In a generic interface, declare a type parameter covariant if it satisfies the following conditions:

- You use the type parameter only as a return type of interface methods and don't use it as a type of method arguments.

  > **Note:**
  > There's one exception to this rule. If a covariant interface has a contravariant generic delegate as a method parameter, you can use the covariant type as a generic type parameter for this delegate. For more information about covariant and contravariant generic delegates, see [Variance in Delegates](../../programming-guide/concepts/covariance-contravariance/variance-in-delegates.md) and [Using Variance for Func and Action Generic Delegates](../../programming-guide/concepts/covariance-contravariance/using-variance-for-func-and-action-generic-delegates.md).

- You don't use the type parameter as a generic constraint for the interface methods.

The following example shows how to declare, instantiate, and invoke a covariant generic delegate. It also shows how to implicitly convert delegate types.

[language="csharp" source="./snippets/variance.cs" id="4"::: (complete source file; reference: ./snippets/variance.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/variance.cs.md)

In a generic delegate, declare a type covariant if you use it only as a method return type and not for method arguments.

## C# language specification

For more information, see the [C# Language Specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/_csharpstandard/standard/README.md). The language specification is the definitive source for C# syntax and usage.


## See also

- [Variance in Generic Interfaces](../../programming-guide/concepts/covariance-contravariance/variance-in-generic-interfaces.md)
- [in](in-generic-modifier.md)
- [Modifiers](index.md)
