---
title: "Compare strings in C#"
description: Learn how to compare strings in C# for equality and sort order, how ordinal and culture-aware comparisons differ, and how to choose a StringComparison value.
ms.date: 06/24/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# Compare strings in C\#

> **Tip:**
> This article is part of the **Fundamentals** section for developers who already know at least one programming language and are learning C#. If you're new to programming, start with the [Get started](../../../tour-of-csharp/tutorials/index.md) tutorials first.
>
> **Coming from another language?** C# `==` on strings compares *values*, not references, much like Java's `equals` or JavaScript's `===`. The key difference is that C# lets you choose between **ordinal** (binary) and **culture-aware** comparison through a [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) value.

You compare strings to answer one of two questions: *Are these two strings equal?* or *In what order do these strings sort?* C# lets you control two independent factors when you answer either question:

- **Case sensitivity** — whether `"Hello"` and `"hello"` are treated as equal.
- **Comparison kind** — *ordinal* (compare the binary value of each character) or *culture-aware* (apply the linguistic rules of a culture).

The [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) enumeration combines these factors into a single value you pass to comparison methods.

## Compare for equality

The [System.String.Equals*](https://learn.microsoft.com/search/?terms=System.String.Equals*) method and the `==` operator both perform a **case-sensitive, ordinal** comparison by default. Ordinal comparison checks the binary value of each character, so it's fast and gives the same result on every machine. You can make your intent explicit by calling the overload that takes a [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) value:

[language="csharp" source="snippets/compare/Program.cs" id="DefaultEquality"::: (complete source file; reference: snippets/compare/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/compare/Program.cs.md)

To ignore case while keeping ordinal semantics, pass [System.StringComparison.OrdinalIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.OrdinalIgnoreCase):

[language="csharp" source="snippets/compare/Program.cs" id="IgnoreCase"::: (complete source file; reference: snippets/compare/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/compare/Program.cs.md)

## Compare for sort order

To determine sort order rather than equality, use [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*). It returns a negative number, zero, or a positive number to indicate whether the first string sorts before, at the same position as, or after the second:

[language="csharp" source="snippets/compare/Program.cs" id="Order"::: (complete source file; reference: snippets/compare/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/compare/Program.cs.md)

> **Important:**
> `Compare` and `CompareTo` default to a *culture-aware* comparison, while `Equals` and `==` default to *ordinal*. To avoid surprises, pass an explicit [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) value so your code states which behavior it wants.

## Compare against constants with pattern matching `is` or `switch`

When the value you compare against is a constant, you can use the [`is` operator](../../../language-reference/operators/is.md) with a [constant pattern](../../../language-reference/operators/patterns.md#constant-pattern) as a readable alternative to `==`:

[language="csharp" source="snippets/compare/Program.cs" id="ConstantPattern"::: (complete source file; reference: snippets/compare/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/compare/Program.cs.md)

To compare a string against several constants, use a [`switch` expression](../../../language-reference/operators/switch-expression.md). Each arm tests a [constant pattern](../../../language-reference/operators/patterns.md#constant-pattern), and the discard pattern (`_`) handles every value that doesn't match. The next example maps a direction keyword to a travel instruction:

[language="csharp" source="snippets/compare/Program.cs" id="SwitchExpression"::: (complete source file; reference: snippets/compare/Program.cs)](../../../../../_code/docs/csharp/fundamentals/strings/common-tasks/snippets/compare/Program.cs.md)

A `switch` expression that tests string constants performs the same case-sensitive, ordinal comparison as `==`, so `"north"` doesn't match the `"North"` arm.

## Choose the right comparison

Pick the comparison kind based on the data, not out of habit:

- For identifiers, file paths, protocol tokens, and other machine-defined text, use [System.StringComparison.Ordinal](https://learn.microsoft.com/search/?terms=System.StringComparison.Ordinal) (or [System.StringComparison.OrdinalIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.OrdinalIgnoreCase) to ignore case). Ordinal comparison is fast and consistent across cultures.
- For text that users read and sort, such as names or product titles, use [System.StringComparison.CurrentCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCulture) so the order matches the user's expectations.

Culture-aware comparison applies linguistic rules that vary by culture and can produce surprising results. For example, some cultures treat `"ss"` and `"ß"` as equal, and the order of strings can change between machines. Because of that variability, reserve culture-aware comparison for genuine natural-language text, and use the same comparison kind whenever you both sort and search a collection.

For an in-depth treatment of culture-sensitive comparison, including globalization considerations and platform differences, see [Best practices for comparing strings in .NET](../../../../standard/base-types/best-practices-strings.md).

## See also

- [Best practices for comparing strings in .NET](../../../../standard/base-types/best-practices-strings.md)
- [Search strings in C#](search.md)
- [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison)
- [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*)
