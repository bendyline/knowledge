---
title: "// and /* */ - comments"
description: You use \"//\" for single-line comments. You use \"/*\" to start multi-line comments that end with \"*/\". You add comments to explain your code.
ms.date: 01/14/2026
---
# Code comments - `//` and `/*` - `*/`

C# supports two different forms of comments. Single line comments start with `//` and end at the end of that line of code. Multiline comments start with `/*` and end with `*/`.


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


The following code shows an example of each form:

[language="csharp" source="./snippets/comments.cs" id="ExampleComments"::: (complete source file; reference: ./snippets/comments.cs)](../../../../_code/docs/csharp/language-reference/tokens/snippets/comments.cs.md)

You can use a multiline comment to insert text in a line of code. Because these comments have an explicit closing character, you can include more executable code after the comment:

[language="csharp" source="./snippets/comments.cs" id="InlineComment"::: (complete source file; reference: ./snippets/comments.cs)](../../../../_code/docs/csharp/language-reference/tokens/snippets/comments.cs.md)

A single line comment can appear after executable code on the same line. The comment ends at the end of the text line:

[language="csharp" source="./snippets/comments.cs" id="LineEndingComment"::: (complete source file; reference: ./snippets/comments.cs)](../../../../_code/docs/csharp/language-reference/tokens/snippets/comments.cs.md)

Some comments start with three slashes: `///`. *Triple-slash comments* are *XML documentation comments*. The compiler reads these comments to produce human documentation. You can read more about [XML doc comments](../xmldoc/index.md) in the section on triple-slash comments.
