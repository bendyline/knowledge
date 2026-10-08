---
title: "The `is` operator - Match an expression against a type or constant pattern"
description: "Learn about the C# `is` operator that matches an expression against a pattern. The `is` operator returns true when the expression matches the pattern."
ms.date: 01/20/2026
f1_keywords: 
  - "is_CSharpKeyword"
  - "is"
helpviewer_keywords: 
  - "is keyword [C#]"
---
# The `is` operator (C# reference)

The `is` operator checks if the result of an expression is compatible with a given type. For information about the type-testing `is` operator, see the [is operator](type-testing-and-cast.md#the-is-operator) section of the [Type-testing and cast operators](type-testing-and-cast.md) article. You can also use the `is` operator to match an expression against a pattern, as the following example shows:

[language="csharp" source="snippets/shared/IsOperator.cs" id="IntroExample"::: (complete source file; reference: snippets/shared/IsOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/IsOperator.cs.md)

In the preceding example, the `is` operator matches an expression against a [property pattern](patterns.md#property-pattern) with nested [constant](patterns.md#constant-pattern) and [relational](patterns.md#relational-patterns) patterns.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


The `is` operator can be useful in the following scenarios:

- To check the run-time type of an expression, as the following example shows:

  [language="csharp" source="snippets/shared/IsOperator.cs" id="DeclarationPattern"::: (complete source file; reference: snippets/shared/IsOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/IsOperator.cs.md)

  The preceding example shows the use of a [declaration pattern](patterns.md#declaration-and-type-patterns).

- To check for `null`, as the following example shows:

  [language="csharp" source="snippets/shared/IsOperator.cs" id="NullCheck"::: (complete source file; reference: snippets/shared/IsOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/IsOperator.cs.md)

  When you match an expression against `null`, the compiler guarantees that no user-overloaded `==` or `!=` operator is invoked.

- To do a non-null check by using a [negation pattern](patterns.md#logical-patterns), as the following example shows:

  [language="csharp" source="snippets/shared/IsOperator.cs" id="NonNullCheck"::: (complete source file; reference: snippets/shared/IsOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/IsOperator.cs.md)

- To match elements of a list or array by using [list patterns](patterns.md#list-patterns). The following code checks arrays for integer values in expected positions:

  [language="csharp" source="snippets/shared/IsOperator.cs" id="ListPatterns"::: (complete source file; reference: snippets/shared/IsOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/IsOperator.cs.md)

> **Note:**
> For the complete list of patterns supported by the `is` operator, see [Patterns](patterns.md).

## C# language specification

For more information, see [The is operator](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#121512-the-is-operator) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md) and [Pattern matching](https://learn.microsoft.com/dotnet/csharp/language-reference/language-specification/patterns).

## See also

- [C# operators and expressions](index.md)
- [Patterns](patterns.md)
- [Tutorial: Build algorithms using pattern matching](../../fundamentals/tutorials/build-algorithms-using-pattern-matching.md)
- [Type-testing and cast operators](type-testing-and-cast.md)
