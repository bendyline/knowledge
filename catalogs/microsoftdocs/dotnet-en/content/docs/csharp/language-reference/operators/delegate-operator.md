---
title: "delegate operator - Create an anonymous method that can be converted to a delegate type."
description: "The C# delegate operator that is used to create anonymous methods. These types can be used for `Func<>` and `Action<>` parameters in many .NET APIs."
ms.date: 01/20/2026
helpviewer_keywords:
  - "delegate [C#]"
  - "anonymous method [C#]"
---
# delegate operator

The `delegate` operator creates an anonymous method that you can convert to a delegate type.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


You can convert an anonymous method to types such as [System.Action](https://learn.microsoft.com/search/?terms=System.Action) and [System.Func`1](https://learn.microsoft.com/search/?terms=System.Func%601). Many methods use these types as arguments.

[language="csharp" source="snippets/shared/DelegateOperator.cs" id="AnonymousMethod"::: (complete source file; reference: snippets/shared/DelegateOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/DelegateOperator.cs.md)

> **Note:**
> Lambda expressions provide a more concise and expressive way to create an anonymous function. Use the [=> operator](lambda-operator.md) to construct a lambda expression:
>
> [language="csharp" source="snippets/shared/DelegateOperator.cs" id="Lambda"::: (complete source file; reference: snippets/shared/DelegateOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/DelegateOperator.cs.md)
>
> For more information about features of lambda expressions, such as capturing outer variables, see [Lambda expressions](lambda-expressions.md).

When you use the `delegate` operator, you can omit the parameter list. If you omit the parameter list, you create an anonymous method that you can convert to a delegate type with any list of parameters, as the following example shows:

[language="csharp" source="snippets/shared/DelegateOperator.cs" id="WithoutParameterList"::: (complete source file; reference: snippets/shared/DelegateOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/DelegateOperator.cs.md)

This functionality is the only feature of anonymous methods that lambda expressions don't support. In all other cases, use a lambda expression to write inline code. You can use [discards](../../fundamentals/patterns/discards.md) to specify two or more input parameters of an anonymous method that the method doesn't use:

[language="csharp" source="snippets/shared/DelegateOperator.cs" id="SnippetDiscards" ::: (complete source file; reference: snippets/shared/DelegateOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/DelegateOperator.cs.md)

For backwards compatibility, if only a single parameter is named `_`, the compiler treats `_` as the name of that parameter within an anonymous method.

Use the `static` modifier when you declare an anonymous method:

[language="csharp" source="snippets/shared/DelegateOperator.cs" id="SnippetStatic" ::: (complete source file; reference: snippets/shared/DelegateOperator.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/DelegateOperator.cs.md)

A static anonymous method can't capture local variables or instance state from enclosing scopes.

Use the `delegate` keyword to declare a [delegate type](../builtin-types/reference-types.md#the-delegate-type).

The compiler can cache the delegate object that it creates from a method group. Consider the following method:

```csharp
static void StaticFunction() { }
```

When you assign the method group to a delegate, the compiler caches the delegate:

```csharp
Action a = StaticFunction;
```

## C# language specification

For more information, see the [Anonymous function expressions](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#1222-anonymous-function-expressions) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md).

## See also

- [C# operators and expressions](index.md)
- [=> operator](lambda-operator.md)
