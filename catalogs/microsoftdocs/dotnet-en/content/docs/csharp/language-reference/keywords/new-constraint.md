---
description: "new constraint - C# Reference"
title: "new constraint"
ms.date: 01/22/2026
helpviewer_keywords: 
  - "new constraint keyword [C#]"
---
# new constraint (C# Reference)

The `new` constraint specifies that a type argument in a generic class or method declaration must have a public parameterless constructor. To use the `new` constraint, the type can't be abstract.

Apply the `new` constraint to a type parameter when a generic class creates new instances of the type, as shown in the following example:

[language="csharp" source="./snippets/csrefKeywordsOperators.cs" id="5"::: (complete source file; reference: ./snippets/csrefKeywordsOperators.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/csrefKeywordsOperators.cs.md)

When you use the `new()` constraint with other constraints, you must specify it last:

[language="csharp" source="./snippets/csrefKeywordsOperators.cs" id="6"::: (complete source file; reference: ./snippets/csrefKeywordsOperators.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/csrefKeywordsOperators.cs.md)

For more information, see [Constraints on Type Parameters](../../programming-guide/generics/constraints-on-type-parameters.md).

You can also use the `new` keyword to [create an instance of a type](../operators/new-operator.md) or as a [member declaration modifier](new-modifier.md).


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


## C# language specification

For more information, see the [Type parameter constraints](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/classes.md#1525-type-parameter-constraints) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md).

## See also

- [C# Keywords](index.md)
- [Generics](../../fundamentals/types/generics.md)
