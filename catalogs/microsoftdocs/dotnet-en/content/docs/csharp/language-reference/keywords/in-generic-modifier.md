---
description: "in (Generic Modifier) - C# Reference"
title: "in (Generic Modifier)"
ms.date: 01/21/2026
helpviewer_keywords:
  - "contravariance, in keyword [C#]"
  - "in keyword [C#]"
---
# `in` (Generic Modifier) (C# Reference)

For generic type parameters, use the `in` keyword to allow contravariant type arguments. Use the `in` keyword in generic interfaces and delegates.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


Contravariance enables you to use a less derived type than the type specified by the generic parameter. This feature allows for implicit conversion of classes that implement contravariant interfaces and implicit conversion of delegate types. Reference types support covariance and contravariance in generic type parameters, but value types don't support these features.

You can declare a type as contravariant in a generic interface or delegate only if it defines the type of a method's parameters and not the method's return type. `In`, `ref`, and `out` parameters must be invariant, meaning they're neither covariant nor contravariant.

An interface that has a contravariant type parameter allows its methods to accept arguments of less derived types than those specified by the interface type parameter. For example, in the [System.Collections.Generic.IComparer`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IComparer%601) interface, type T is contravariant. You can assign an object of the `IComparer<Person>` type to an object of the `IComparer<Employee>` type without using any special conversion methods if `Employee` inherits `Person`.

You can assign a contravariant delegate to another delegate of the same type, but with a less derived generic type parameter.

For more information, see [Covariance and Contravariance](../../programming-guide/concepts/covariance-contravariance/index.md).

## Contravariant generic interface

The following example shows how to declare, extend, and implement a contravariant generic interface. It also shows how you can use implicit conversion for classes that implement this interface.

[language="csharp" source="./snippets/variance.cs" id="1"::: (complete source file; reference: ./snippets/variance.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/variance.cs.md)

## Contravariant generic delegate

The following example shows how to declare, instantiate, and invoke a contravariant generic delegate. It also shows how you can implicitly convert a delegate type.

[language="csharp" source="./snippets/variance.cs" id="2"::: (complete source file; reference: ./snippets/variance.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/variance.cs.md)

## C# language specification

For more information, see the [C# Language Specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/_csharpstandard/standard/README.md). The language specification is the definitive source for C# syntax and usage.


## See also

- [out](out-generic-modifier.md)
- [Covariance and Contravariance](../../programming-guide/concepts/covariance-contravariance/index.md)
- [Modifiers](index.md)
