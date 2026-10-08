---
title: "Concatenate strings in C#"
description: Learn how to combine strings in C# with the + operator, string interpolation, string.Concat, string.Join, and StringBuilder, and how to choose between them.
ms.date: 06/24/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# Concatenate strings in C\#

> **Tip:**
> This article is part of the **Fundamentals** section for developers who already know at least one programming language and are learning C#. If you're new to programming, start with the [Get started](../../../tour-of-csharp/tutorials/index.md) tutorials first.
>
> **Coming from another language?** C# concatenation with `+` parallels Java and JavaScript. C# adds [string interpolation](../interpolation.md) (`$"{x}"`), similar to JavaScript template literals and Python f-strings, as the preferred way to build strings from variables. For building strings in a loop, C# offers [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder), much like Java's `StringBuilder`.

*Concatenation* appends one string to the end of another to produce a new string. C# gives you several ways to concatenate, and the best choice depends on whether you're joining a fixed set of values or a collection, or building a string piece by piece in a loop.

## Concatenate string literals

When you concatenate string literals or constants with `+`, the compiler joins them at compile time. Splitting a long literal across several lines improves readability in source without any run-time cost:

[language="csharp" source="snippets/concatenate/Program.cs" id="Literals"::: (complete source file; reference: snippets/concatenate/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/concatenate/Program.cs.md)

## Use the `+` and `+=` operators

To combine string variables, use the `+` operator to produce a new string, or `+=` to append to an existing one. The `+` operator is intuitive, and the compiler copies the string content only once even when you chain several operators in a single expression:

[language="csharp" source="snippets/concatenate/Program.cs" id="Operators"::: (complete source file; reference: snippets/concatenate/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/concatenate/Program.cs.md)

> **Note:**
> In string concatenation, C# treats a `null` string the same as an empty string, so concatenating `null` adds nothing to the result.

## Use string interpolation

To embed computed expressions in a string, prefer [string interpolation](../interpolation.md) over positional placeholders like the `{0}` and `{1}` tokens that [System.String.Format*](https://learn.microsoft.com/search/?terms=System.String.Format*) inherits from C-style formatting. Interpolation places each expression inline where its value appears, so the result string stays readable and you can't misalign an argument:

[language="csharp" source="snippets/concatenate/Program.cs" id="Interpolation"::: (complete source file; reference: snippets/concatenate/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/concatenate/Program.cs.md)

When every interpolated expression is itself a constant string, you can assign the interpolated result to a `const` string.

## Join a collection of strings

To combine the elements of a collection, use [System.String.Concat*](https://learn.microsoft.com/search/?terms=System.String.Concat*) to join them with no separator, or [System.String.Join*](https://learn.microsoft.com/search/?terms=System.String.Join*) to place a separator between each element:

[language="csharp" source="snippets/concatenate/Program.cs" id="ConcatJoin"::: (complete source file; reference: snippets/concatenate/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/concatenate/Program.cs.md)

`string.Join` is the right tool whenever you need delimited output, such as comma-separated values or space-separated words.

## Build a string in a loop

Each `+` or `+=` operation creates a new string, because strings are immutable. When you append many pieces in a loop, that allocation adds up. The [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) class builds the result in a single buffer instead:

[language="csharp" source="snippets/concatenate/Program.cs" id="StringBuilder"::: (complete source file; reference: snippets/concatenate/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/concatenate/Program.cs.md)

Reach for `StringBuilder` when the number of pieces is large or unknown at compile time. For a fixed, small set of values, the `+` operator and string interpolation are clearer. For guidance on when each approach performs best, see [The `string` and `StringBuilder` types](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder%23the-string-and-stringbuilder-types).

## See also

- [String interpolation in C#](../interpolation.md)
- [System.String.Concat*](https://learn.microsoft.com/search/?terms=System.String.Concat*)
- [System.String.Join*](https://learn.microsoft.com/search/?terms=System.String.Join*)
- [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder)
