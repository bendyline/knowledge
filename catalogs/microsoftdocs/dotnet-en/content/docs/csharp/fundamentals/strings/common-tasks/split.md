---
title: "Split strings into substrings in C#"
description: Learn how to split a C# string into substrings with String.Split, including how to use multiple separators, limit the substring count, and trim or remove entries.
ms.date: 05/21/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# Split strings into substrings in C\#

> **Tip:**
> This article is part of the **Fundamentals** section for developers who already know at least one programming language and are learning C#. If you're new to programming, start with the [Get started](../../../tour-of-csharp/tutorials/index.md) tutorials first.
>
> **Coming from another language?** `string.Split` is C#'s counterpart to Java's `String.split` and JavaScript's `String.prototype.split`. Unlike those languages, C# returns an array (`string[]`), not a list, and the separator argument is a character or string, not a regular expression. For pattern-based splitting, see [System.Text.RegularExpressions.Regex.Split*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Split*).

The [System.String.Split*](https://learn.microsoft.com/search/?terms=System.String.Split*) method breaks a string into an array of substrings using one or more separators. It's the simplest way to parse delimited text such as words, CSV-style values, or protocol tokens.

The method has many overloads, but they cover four independent decisions:

- **Separators**: one `char`, an array of `char`, one `string`, or an array of `string`.
- **Maximum result count**: cap the number of substrings returned.
- **Empty-entry handling**: keep empty substrings (the default) or drop them with [System.StringSplitOptions.RemoveEmptyEntries](https://learn.microsoft.com/search/?terms=System.StringSplitOptions.RemoveEmptyEntries).
- **Whitespace handling**: trim leading and trailing whitespace from each entry with [System.StringSplitOptions.TrimEntries](https://learn.microsoft.com/search/?terms=System.StringSplitOptions.TrimEntries).

## Split a string into words

To split a phrase on whitespace, pass `' '` as the separator:

[language="csharp" source="snippets/split/Program.cs" id="SplitWords"::: (complete source file; reference: snippets/split/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/split/Program.cs.md)

Iterate the returned array with `for` to recover the position of each word:

[language="csharp" source="snippets/split/Program.cs" id="IndexWords"::: (complete source file; reference: snippets/split/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/split/Program.cs.md)

If the input contains repeated instances of the separator character, `Split` produces empty entries, one for each "gap" between consecutive separators:

[language="csharp" source="snippets/split/Program.cs" id="RepeatedSeparators"::: (complete source file; reference: snippets/split/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/split/Program.cs.md)

Pass `StringSplitOptions.RemoveEmptyEntries` to drop those empty entries, as shown later in this article.

## Split on multiple separator characters

When more than one character can act as a separator, pass them as an array. The following example treats spaces, commas, periods, colons, and tabs all as word boundaries:

[language="csharp" source="snippets/split/Program.cs" id="MultiChar"::: (complete source file; reference: snippets/split/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/split/Program.cs.md)

Adjacent separators still produce empty entries:

[language="csharp" source="snippets/split/Program.cs" id="MultiCharGaps"::: (complete source file; reference: snippets/split/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/split/Program.cs.md)

## Split on multicharacter separators

To split on whole-word or multicharacter separators, pass an array of strings. The string-array overloads require a [System.StringSplitOptions](https://learn.microsoft.com/search/?terms=System.StringSplitOptions) value. Use `RemoveEmptyEntries` when repeated separators would otherwise produce empty results:

[language="csharp" source="snippets/split/Program.cs" id="StringSeparators"::: (complete source file; reference: snippets/split/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/split/Program.cs.md)

## Limit how many substrings you get back

Pass a `count` argument to cap the number of results. The final entry holds everything that's left, including any remaining separators:

[language="csharp" source="snippets/split/Program.cs" id="LimitCount"::: (complete source file; reference: snippets/split/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/split/Program.cs.md)

This pattern is handy for `key=value` pairs and other formats where only the first separator is meaningful.

## Trim whitespace from each entry

`StringSplitOptions.TrimEntries` strips leading and trailing whitespace from every returned substring. You can combine it with `RemoveEmptyEntries` for typical CSV-style cleanup:

[language="csharp" source="snippets/split/Program.cs" id="TrimEntries"::: (complete source file; reference: snippets/split/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/split/Program.cs.md)

## Use regular expressions

`Split` works well for fixed character or string delimiters. For pattern-based splitting, use [System.Text.RegularExpressions.Regex.Split*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Split*). For an introduction to regular expressions on strings, see [String operations](../../../language-reference/builtin-types/string-operations.md).

## See also

- [System.String.Split*](https://learn.microsoft.com/search/?terms=System.String.Split*)
- [System.StringSplitOptions](https://learn.microsoft.com/search/?terms=System.StringSplitOptions)
- [String operations: pattern matching, performance, and span-based search](../../../language-reference/builtin-types/string-operations.md)
- [Extract elements from a string](../../../../standard/base-types/divide-up-strings.md)
