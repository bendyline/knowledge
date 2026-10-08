---
title: "Search strings in C#"
description: Learn how to find text within strings in C# with the Contains, StartsWith, EndsWith, IndexOf, and LastIndexOf methods, and how to choose the right StringComparison.
ms.date: 05/21/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# Search strings in C\#

> **Tip:**
> This article is part of the **Fundamentals** section for developers who already know at least one programming language and are learning C#. If you're new to programming, start with the [Get started](../../../tour-of-csharp/tutorials/index.md) tutorials first.
>
> **Coming from another language?** C# `string` methods such as `Contains`, `StartsWith`, and `IndexOf` parallel methods in Java's `String` and JavaScript's `String.prototype`. The key difference is that some C# searches default to **ordinal, case-sensitive** comparison. Others default to the current culture's semantics. For user-facing searches, you might want to pass a [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) value.

The [System.String](https://learn.microsoft.com/search/?terms=System.String) class includes methods that answer two everyday questions:

- *Does this string contain that text?* — use [System.String.Contains*](https://learn.microsoft.com/search/?terms=System.String.Contains*), [System.String.StartsWith*](https://learn.microsoft.com/search/?terms=System.String.StartsWith*), or [System.String.EndsWith*](https://learn.microsoft.com/search/?terms=System.String.EndsWith*).
- *Where does that text occur?* — use [System.String.IndexOf*](https://learn.microsoft.com/search/?terms=System.String.IndexOf*) or [System.String.LastIndexOf*](https://learn.microsoft.com/search/?terms=System.String.LastIndexOf*).

More complex search and replacement algorithms can be built using regular expressions. For more information on regular expressions and other string operations, see the language reference article on [String operations](../../../language-reference/builtin-types/string-operations.md).

## Check whether a string contains text

Use `Contains`, `StartsWith`, or `EndsWith` to test for the presence of a substring:

[language="csharp" source="snippets/search/Program.cs" id="contains"::: (complete source file; reference: snippets/search/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/search/Program.cs.md)

These methods default to **case-sensitive, ordinal** comparison. To accept user input or to ignore case for display text, pass a [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) value such as [System.StringComparison.CurrentCultureIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCultureIgnoreCase) or [System.StringComparison.OrdinalIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.OrdinalIgnoreCase).

When you search for a single character, use the `char` overload of `Contains`. It avoids allocating a one-character string and is more direct:

[language="csharp" source="snippets/search/Program.cs" id="ContainsChar"::: (complete source file; reference: snippets/search/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/search/Program.cs.md)

## Locate the position of text

`IndexOf` returns the zero-based index of the first occurrence of a substring (or character), and `LastIndexOf` returns the index of the last occurrence. Both return `-1` when the search text isn't present. Combine them to extract the text between two markers:

[language="csharp" source="snippets/search/Program.cs" id="IndexOf"::: (complete source file; reference: snippets/search/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/search/Program.cs.md)

When you need every occurrence rather than the first or last, iterate by passing the previous result plus one as the `startIndex` argument, or switch to a regular expression.

## Choose the right comparison

Most search overloads accept an optional [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) value. Pick it based on the kind of data you're searching:

- If you're searching identifiers, file paths, protocol tokens, or anything else machine-defined, use [System.StringComparison.Ordinal](https://learn.microsoft.com/search/?terms=System.StringComparison.Ordinal).
- If you're searching the same kind of machine-defined data but want case insensitivity, use [System.StringComparison.OrdinalIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.OrdinalIgnoreCase).
- If you're searching user-visible text where the current locale's rules should apply, use [System.StringComparison.CurrentCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCulture).
- If you're searching that same user-visible text and want to ignore case, use [System.StringComparison.CurrentCultureIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCultureIgnoreCase).
- If you're searching persisted data that must compare the same on every machine and culture, use [System.StringComparison.InvariantCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.InvariantCulture) (rarely needed).

Ordinal comparison is the fastest option and the right default for anything that isn't natural-language text. Culture-aware comparison is significantly slower and can produce surprising results. For example, in some cultures the lowercase `i` doesn't match an uppercase `I`.Reserve it for searches that users perform against prose.

For an in-depth treatment of culture-aware comparison, see [Best practices for comparing strings](../../../../standard/base-types/best-practices-strings.md).

## See also

- [String operations: pattern matching, performance, and span-based search](../../../language-reference/builtin-types/string-operations.md)
- [Best practices for comparing strings in .NET](../../../../standard/base-types/best-practices-strings.md)
- [Comparing strings](../../../../standard/base-types/comparing.md)
- [System.String](https://learn.microsoft.com/search/?terms=System.String)
- [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison)
