---
title: "The nameof expression - evaluate the text name of a symbol"
description: "The C# `nameof` expression produces the name of its operand. You use it whenever you need to use the name of a symbol as text"
ms.date: 01/20/2026
f1_keywords:
  - "nameof_CSharpKeyword"
  - "nameof"
helpviewer_keywords:
  - "nameof expression [C#]"
---
# nameof expression (C# reference)

A `nameof` expression produces the name of a variable, type, or member as the string constant. A `nameof` expression is evaluated at compile time and has no effect at run time. When the operand is a type or a namespace, the produced name isn't [fully qualified](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/basic-concepts.md#773-fully-qualified-names).


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


The following example shows how to use a `nameof` expression:

[language="csharp" source="snippets/shared/NameOfOperator.cs" id="Examples"::: (complete source file; reference: snippets/shared/NameOfOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/NameOfOperator.cs.md)

The preceding example that uses `List<>` is supported in C# 14 and later. The operand of `nameof` can be an unbound generic type, such as `List<>` or `Dictionary<,>`. The result is the simple type name without arity or any type-argument list — `nameof(List<>)` returns `"List"`. Unbound generic operands are useful in logging, diagnostic messages, and attribute arguments where the generic type name matters but the type arguments don't.

You can use a `nameof` expression to make the argument-checking code more maintainable:

[language="csharp" source="snippets/shared/NameOfOperator.cs" id="ExceptionMessage"::: (complete source file; reference: snippets/shared/NameOfOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/NameOfOperator.cs.md)

You can use a `nameof` expression with a method parameter inside an [attribute](../../advanced-topics/reflection-and-attributes/index.md) on a method or its parameter. The following code shows how to do that for an attribute on a method, a local function, and the parameter of a lambda expression:

[language="csharp" source="snippets/shared/NameOfOperator.cs" id="SnippetNameOfParameter"::: (complete source file; reference: snippets/shared/NameOfOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/NameOfOperator.cs.md)

A `nameof` expression with a parameter is useful when you use the [nullable analysis attributes](../attributes/nullable-analysis.md) or the [CallerArgumentExpression attribute](../attributes/caller-information.md#argument-expressions).

When the operand is a [verbatim identifier](../tokens/verbatim.md), the `@` character isn't part of the name, as the following example shows:

[language="csharp" source="snippets/shared/NameOfOperator.cs" id="Verbatim"::: (complete source file; reference: snippets/shared/NameOfOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/NameOfOperator.cs.md)

## C# language specification

For more information, see the [Nameof expressions](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#12823-the-nameof-operator) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md).

## See also

- [C# operators and expressions](index.md)
- [Convert `typeof` to `nameof` (style rule IDE0082)](../../../fundamentals/code-analysis/style-rules/ide0082.md)
