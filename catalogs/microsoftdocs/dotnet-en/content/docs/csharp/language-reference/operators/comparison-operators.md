---
title: "Comparison operators - order items using the greater than and less than operators"
description: "C# comparison operators check the order of values. The operators `>`, `<`, `>=`, `<=` compare the order of values. They determine if a value is greater than or less than another value."
ms.date: 01/20/2026
author: pkulikov
f1_keywords:
  - "<_CSharpKeyword"
  - ">_CSharpKeyword"
  - "<=_CSharpKeyword"
  - ">=_CSharpKeyword"
helpviewer_keywords:
  - "comparison operators [C#]"
  - "relational operators [C#]"
  - "less than operator [C#]"
  - "< operator [C#]"
  - "greater than operator [C#]"
  - "> operator [C#]"
  - "less than or equal to operator [C#]"
  - "<= operator [C#]"
  - "greater than or equal to operator [C#]"
  - ">= operator [C#]"
---
# Comparison operators (C# reference)

The [`<` (less than)](#less-than-operator-), [`>` (greater than)](#greater-than-operator-), [`<=` (less than or equal)](#less-than-or-equal-operator-), and [`>=` (greater than or equal)](#greater-than-or-equal-operator-) comparison, also known as relational, operators compare their operands. All [integral](../builtin-types/integral-numeric-types.md) and [floating-point](../builtin-types/floating-point-numeric-types.md) numeric types support those operators.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


> **Note:**
> For the `==`, `<`, `>`, `<=`, and `>=` operators, if any of the operands isn't a number ([System.Double.NaN](https://learn.microsoft.com/search/?terms=System.Double.NaN) or [System.Single.NaN](https://learn.microsoft.com/search/?terms=System.Single.NaN)), the result of operation is `false`. This behavior means that the `NaN` value is neither greater than, less than, nor equal to any other `double` (or `float`) value, including `NaN`. For more information and examples, see the [System.Double.NaN](https://learn.microsoft.com/search/?terms=System.Double.NaN) or [System.Single.NaN](https://learn.microsoft.com/search/?terms=System.Single.NaN) reference article.

The [char](../builtin-types/char.md) type also supports comparison operators. When you use `char` operands, the corresponding character codes are compared.

Enumeration types also support comparison operators. For operands of the same [enum](../builtin-types/enum.md) type, the corresponding values of the underlying integral type are compared.

The [`==` and `!=` operators](equality-operators.md) check if their operands are equal or not.

## Less than operator \<

The `<` operator returns `true` if its left-hand operand is less than its right-hand operand, `false` otherwise:

[language="csharp" source="snippets/shared/ComparisonOperators.cs" id="Less"::: (complete source file; reference: snippets/shared/ComparisonOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ComparisonOperators.cs.md)

## Greater than operator >

The `>` operator returns `true` if its left-hand operand is greater than its right-hand operand, `false` otherwise:

[language="csharp" source="snippets/shared/ComparisonOperators.cs" id="Greater"::: (complete source file; reference: snippets/shared/ComparisonOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ComparisonOperators.cs.md)

## Less than or equal operator `<=`

The `<=` operator returns `true` if its left-hand operand is less than or equal to its right-hand operand. Otherwise, it returns `false`:

[language="csharp" source="snippets/shared/ComparisonOperators.cs" id="LessOrEqual"::: (complete source file; reference: snippets/shared/ComparisonOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ComparisonOperators.cs.md)

## Greater than or equal operator `>=`

The `>=` operator returns `true` if its left-hand operand is greater than or equal to its right-hand operand. Otherwise, it returns `false`:

[language="csharp" source="snippets/shared/ComparisonOperators.cs" id="GreaterOrEqual"::: (complete source file; reference: snippets/shared/ComparisonOperators.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/ComparisonOperators.cs.md)

## Operator overloadability

You can [overload](operator-overloading.md) the `<`, `>`, `<=`, and `>=` operators in a user-defined type.

If you overload one of the `<` or `>` operators, you must overload both `<` and `>`. If you overload one of the `<=` or `>=` operators, you must overload both `<=` and `>=`.

## C# language specification

For more information, see the [Relational and type-testing operators](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#1215-relational-and-type-testing-operators) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md).

## See also

- [C# operators and expressions](index.md)
- [System.IComparable`1](https://learn.microsoft.com/search/?terms=System.IComparable%601)
- [Equality operators](equality-operators.md)
