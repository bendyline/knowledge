---
description: "when contextual keyword - C# reference"
title: "when contextual keyword"
ms.date: 01/22/2026
f1_keywords: 
  - "when_CSharpKeyword"
  - "when"
helpviewer_keywords: 
  - "when keyword [C#]"
---
# when (C# reference)

Use the `when` contextual keyword to specify a filter condition in the following contexts:

- In a catch clause of a [`try-catch`](../statements/exception-handling-statements.md#the-try-catch-statement) or [`try-catch-finally`](../statements/exception-handling-statements.md#the-try-catch-finally-statement) statement.
- As a [case guard](../statements/selection-statements.md#case-guards) in the [`switch` statement](../statements/selection-statements.md#the-switch-statement).
- As a [case guard](../operators/switch-expression.md#case-guards) in the [`switch` expression](../operators/switch-expression.md).


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


## `when` in a catch clause

Use the `when` keyword in a catch clause to specify a condition that must be true for the handler for a specific exception to execute. Its syntax is:

```csharp
catch (ExceptionType [e]) when (expr)
```

where *expr* is an expression that evaluates to a Boolean value. If it returns `true`, the exception handler executes; if `false`, it doesn't.

Exception filters with the `when` keyword provide several advantages over traditional exception handling approaches, including better debugging support and performance benefits. For a detailed explanation of how exception filters preserve the call stack and improve debugging, see [Exception filters vs. traditional exception handling](../statements/exception-handling-statements.md#exception-filters-vs-traditional-exception-handling).

The following example uses the `when` keyword to conditionally execute handlers for an [System.Net.Http.HttpRequestException](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestException) depending on the text of the exception message.

[language="csharp" source="./snippets/catch.cs"::: (complete source file; reference: ./snippets/catch.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/catch.cs.md)

## See also

- [C# keywords](index.md)
