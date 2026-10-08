---
title: "switch expression - Evaluate a pattern match expression using the `switch` expression"
description: Learn about the C# `switch` expression that provides switch-like semantics based on pattern matching. You can compute a value based on which pattern an input variable matches.
ms.date: 03/20/2026
f1_keywords:
  - "switch-expression_CSharpKeyword"
helpviewer_keywords:
  - "switch expression [C#]"
  - "pattern matching [C#]"
---
# `switch` expression - pattern matching expressions using the `switch` keyword

Use the `switch` expression to evaluate a single expression from a list of candidate expressions. The evaluation is based on a pattern match with an input expression. For information about the `switch` statement that supports `switch`-like semantics in a statement context, see the [`switch` statement](../statements/selection-statements.md#the-switch-statement) section of the [Selection statements](../statements/selection-statements.md) article.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


The following example demonstrates a `switch` expression. It converts values of an [`enum`](../builtin-types/enum.md) representing visual directions in an online map to the corresponding cardinal directions:

[language="csharp" source="snippets/shared/SwitchExpressions.cs" id="SnippetBasicStructure"::: (complete source file; reference: snippets/shared/SwitchExpressions.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/SwitchExpressions.cs.md)

The preceding example shows the basic elements of a `switch` expression:

- An expression followed by the `switch` keyword. In the preceding example, it's the `direction` method parameter.
- The *`switch` expression arms*, separated by commas. Each `switch` expression arm contains a *pattern*, an optional [*case guard*](#case-guards), the `=>` token, and an *expression*.

In the preceding example, a `switch` expression uses the following patterns:

- A [constant pattern](patterns.md#constant-pattern): to handle the defined values of the `Direction` enumeration.
- A [discard pattern](patterns.md#discard-pattern): to handle any integer value that doesn't have the corresponding member of the `Direction` enumeration (for example, `(Direction)10`). That pattern makes the `switch` expression [exhaustive](#nonexhaustive-switch-expressions).

> **Important:**
> For information about the patterns supported by the `switch` expression and more examples, see [Patterns](patterns.md).

The result of a `switch` expression is the value of the expression of the first `switch` expression arm whose pattern matches the input expression and whose case guard, if present, evaluates to `true`. The `switch` expression arms are evaluated in text order.

The compiler generates an error when a lower `switch` expression arm can't be chosen because a higher `switch` expression arm matches all its values.

## Case guards

A pattern might not be expressive enough to specify the condition for the evaluation of an arm's expression. In such a case, use a *case guard*. A *case guard* is another condition that must be satisfied together with a matched pattern. A case guard must be a Boolean expression. Specify a case guard after the `when` keyword that follows a pattern, as the following example shows:

[language="csharp" source="snippets/shared/SwitchExpressions.cs" id="CaseGuardExample"::: (complete source file; reference: snippets/shared/SwitchExpressions.cs)](../../../../_code/docs/csharp/language-reference/operators/snippets/shared/SwitchExpressions.cs.md)

The preceding example uses [property patterns](patterns.md#property-pattern) with nested [var patterns](patterns.md#var-pattern).

## Nonexhaustive switch expressions

If none of a `switch` expression's patterns matches an input value, the runtime throws an exception. In .NET Core 3.0 and later versions, the exception is a [System.Runtime.CompilerServices.SwitchExpressionException](https://learn.microsoft.com/search/?terms=System.Runtime.CompilerServices.SwitchExpressionException). In .NET Framework, the exception is an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException). In most cases, the compiler generates a warning if a `switch` expression doesn't handle all possible input values. [List patterns](patterns.md#list-patterns) don't generate a warning when all possible inputs aren't handled.

For [union types](../builtin-types/union.md), a `switch` expression is exhaustive when it handles all case types. A catch-all arm isn't needed. If the null state of the union's `Value` property is "maybe null," you must also handle `null` to avoid a warning. For more information, see [Union exhaustiveness](../builtin-types/union.md#union-exhaustiveness).

> **Tip:**
> To guarantee that a `switch` expression handles all possible input values, provide a `switch` expression arm with a [discard pattern](patterns.md#discard-pattern).

## C# language specification

For more information, see the [`switch` expression](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/expressions.md#1212-switch-expression) section of the [C# language specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/_csharpstandard/standard/README.md).

## See also

- [Use switch expression (style rule IDE0066)](../../../fundamentals/code-analysis/style-rules/ide0066.md)
- [Add missing cases to switch expression (style rule IDE0072)](../../../fundamentals/code-analysis/style-rules/ide0072.md)
- [C# operators and expressions](index.md)
- [Patterns](patterns.md)
- [Tutorial: Build algorithms using pattern matching](../../fundamentals/tutorials/build-algorithms-using-pattern-matching.md)
- [`switch` statement](../statements/selection-statements.md#the-switch-statement)
