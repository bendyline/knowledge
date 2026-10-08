---
title: "! (null-forgiving) operator"
description: "Learn about the C# null-forgiving, or null-suppression, operator that is used to declare that an expression of a reference type isn't null."
ms.date: 01/20/2026
f1_keywords:
  - "nullForgiving_CSharpKeyword"
helpviewer_keywords:
  - "null-forgiving operator [C#]"
  - "! operator [C#]"
---
# ! (null-forgiving) operator (C# reference)

The unary postfix `!` operator is the null-forgiving, or null-suppression, operator. In an enabled [nullable annotation context](../builtin-types/nullable-reference-types.md#nullable-context), use the null-forgiving operator to suppress all nullable warnings for the preceding expression. The unary prefix `!` operator is the [logical negation operator](boolean-logical-operators.md#logical-negation-operator-). The null-forgiving operator has no effect at run time. It only affects the compiler's static flow analysis by changing the null state of the expression. At run time, expression `x!` evaluates to the result of the underlying expression `x`.

For more information about the nullable reference types feature, see [Nullable reference types](../builtin-types/nullable-reference-types.md).


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


## Examples

One use case for the null-forgiving operator is testing the argument validation logic. For example, consider the following class:

[language="csharp" source="snippets/shared/NullForgivingOperator.cs" id="PersonClass"::: (complete source file; reference: snippets/shared/NullForgivingOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/NullForgivingOperator.cs.md)

By using the [MSTest test framework](../../../core/testing/unit-testing-csharp-with-mstest.md), you can create the following test for the validation logic in the constructor:

[language="csharp" source="snippets/shared/NullForgivingOperator.cs" id="TestPerson"::: (complete source file; reference: snippets/shared/NullForgivingOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/NullForgivingOperator.cs.md)

Without the null-forgiving operator, the compiler generates the following warning for the preceding code: `Warning CS8625: Cannot convert null literal to non-nullable reference type`. By using the null-forgiving operator, you inform the compiler that passing `null` is expected and shouldn't generate a warning.

You can also use the null-forgiving operator when you definitely know that an expression can't be `null` but the compiler doesn't recognize that. In the following example, if the `IsValid` method returns `true`, its argument isn't `null` and you can safely dereference it:

[language="csharp" source="snippets/shared/NullForgivingOperator.cs" id="UseNullForgiving"::: (complete source file; reference: snippets/shared/NullForgivingOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/NullForgivingOperator.cs.md)

Without the null-forgiving operator, the compiler generates the following warning for the `p.Name` code: `Warning CS8602: Dereference of a possibly null reference`.

If you can modify the `IsValid` method, you can use the [NotNullWhen](https://learn.microsoft.com/search/?terms=System.Diagnostics.CodeAnalysis.NotNullWhenAttribute) attribute to inform the compiler that an argument of the `IsValid` method can't be `null` when the method returns `true`:

[language="csharp" source="snippets/shared/NullForgivingOperator.cs" id="UseAttribute"::: (complete source file; reference: snippets/shared/NullForgivingOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/NullForgivingOperator.cs.md)

In the preceding example, you don't need to use the null-forgiving operator because the compiler has enough information to find out that `p` can't be `null` inside the `if` statement. For more information about the attributes that allow you to provide additional information about the null state of a variable, see [Upgrade APIs with attributes to define null expectations](../attributes/nullable-analysis.md).

## C# language specification

For more information, see [The null-forgiving operator](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#1289-null-forgiving-expressions) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md).

## See also

- [Remove unnecessary suppression operator (style rule IDE0080)](../../../fundamentals/code-analysis/style-rules/ide0080.md)
- [C# operators and expressions](index.md)
- [Tutorial: Design with nullable reference types](../../fundamentals/tutorials/nullable-reference-types.md)
