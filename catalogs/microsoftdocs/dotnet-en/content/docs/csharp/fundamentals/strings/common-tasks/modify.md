---
title: "Modify string contents in C#"
description: Learn how to produce modified strings in C# with Replace, Trim, Remove, regular expressions, and character arrays, and why each operation returns a new string.
ms.date: 06/24/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# Modify string contents in C\#

> **Tip:**
> This article is part of the **Fundamentals** section for developers who already know at least one programming language and are learning C#. If you're new to programming, start with the [Get started](../../../tour-of-csharp/tutorials/index.md) tutorials first.
>
> **Coming from another language?** Like Java and JavaScript, C# strings are *immutable*: methods such as `Replace` and `Trim` return a new string instead of changing the original. The patterns here parallel `String` methods in those languages.

A C# `string` is *immutable*, which means its contents never change after you create it. Every method that appears to modify a string actually returns a new `string` with the changes, leaving the original intact. The examples in this article store each result in a new variable so you can see both the source and the modified value.

Choose the technique that matches your scenario: replace known text, trim whitespace, remove a span of characters, replace text that matches a pattern, or edit individual characters.

## Replace known text

The [System.String.Replace*](https://learn.microsoft.com/search/?terms=System.String.Replace*) method substitutes every occurrence of one string with another and returns the result as a new string:

[language="csharp" source="snippets/modify/Program.cs" id="Replace"::: (complete source file; reference: snippets/modify/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/modify/Program.cs.md)

The original string is unchanged, which demonstrates immutability: `Replace` creates a new string with the substitution.

`Replace` also has an overload that swaps single characters. The following example replaces every space with an underscore:

[language="csharp" source="snippets/modify/Program.cs" id="ReplaceChar"::: (complete source file; reference: snippets/modify/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/modify/Program.cs.md)

Both overloads replace *every* match in the string, not just the first. Whether you pass a single character or a string, `Replace` substitutes all occurrences in one call.

## Trim whitespace

Use [System.String.Trim*](https://learn.microsoft.com/search/?terms=System.String.Trim*), [System.String.TrimStart*](https://learn.microsoft.com/search/?terms=System.String.TrimStart*), and [System.String.TrimEnd*](https://learn.microsoft.com/search/?terms=System.String.TrimEnd*) to remove leading or trailing whitespace. Each method returns a new string:

[language="csharp" source="snippets/modify/Program.cs" id="Trim"::: (complete source file; reference: snippets/modify/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/modify/Program.cs.md)

## Remove a span of characters

The [System.String.Remove*](https://learn.microsoft.com/search/?terms=System.String.Remove*) method deletes a number of characters starting at an index. Combine it with [System.String.IndexOf*](https://learn.microsoft.com/search/?terms=System.String.IndexOf*) to locate the text to remove:

[language="csharp" source="snippets/modify/Program.cs" id="Remove"::: (complete source file; reference: snippets/modify/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/modify/Program.cs.md)

## Replace text that matches a pattern

When you need to replace text that follows a pattern rather than an exact string, use [regular expressions](../../../../standard/base-types/regular-expressions.md). The [System.Text.RegularExpressions.Regex.Replace*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Replace*) method accepts a function that computes each replacement, so you can preserve details such as the original capitalization. The pattern `the\s` matches "the" followed by a whitespace character, which prevents it from matching "there":

[language="csharp" source="snippets/modify/Program.cs" id="Regex"::: (complete source file; reference: snippets/modify/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/modify/Program.cs.md)

For pattern-based searching rather than replacement, see [Search strings in C#](search.md). For the regular expression syntax, see [Regular expression language quick reference](../../../../standard/base-types/regular-expression-language-quick-reference.md).

## Modify individual characters

To change characters by position, copy the string into a [System.Span`1](https://learn.microsoft.com/search/?terms=System.Span%601) of characters, modify the span, and then build a new string from it. The following example finds the word "fox" and replaces it with "cat":

[language="csharp" source="snippets/modify/Program.cs" id="CharArray"::: (complete source file; reference: snippets/modify/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/modify/Program.cs.md)

For high-performance scenarios that avoid intermediate allocations, the runtime provides lower-level APIs such as [System.String.Create*](https://learn.microsoft.com/search/?terms=System.String.Create*). Those techniques are advanced; for everyday code, the methods in this article are the right choice.

## See also

- [Search strings in C#](search.md)
- [.NET regular expressions](../../../../standard/base-types/regular-expressions.md)
- [System.String.Replace*](https://learn.microsoft.com/search/?terms=System.String.Replace*)
- [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder)
