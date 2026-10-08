---
title: "Regular Expression Example: Scanning for HREFs"
description: See an example of regular expressions in .NET. The example searches an input string and displays all href attribute values and their locations.
ms.date: "07/14/2021"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "searching with regular expressions, examples"
  - "parsing text with regular expressions, examples"
  - "regular expressions, examples"
  - ".NET regular expressions, examples"
  - "regular expressions [.NET], examples"
  - "pattern-matching with regular expressions, examples"
ms.assetid: fae2c15b-7adf-4b15-b118-58eb3906994f
---
# Regular expression example: Scanning for HREFs

The following example searches an input string and displays all the href="…" values and their locations in the string.


> **Warning:**
> Unrestricted use of [System.Text.RegularExpressions](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions) with untrusted input can subject applications to [denial-of-service attacks](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS). Consult [Best practices for regular expressions in .NET](best-practices-regex.md) for guidance on how to safely use .NET regular expressions with untrusted input.


## The Regex object

Because the `DumpHRefs` method can be called multiple times from user code, it uses the `static` (`Shared` in Visual Basic) [System.Text.RegularExpressions.Regex.Match%28System.String%2CSystem.String%2CSystem.Text.RegularExpressions.RegexOptions%29](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Match%2528System.String%252CSystem.String%252CSystem.Text.RegularExpressions.RegexOptions%2529) method. This enables the regular expression engine to cache the regular expression and avoids the overhead of instantiating a new [System.Text.RegularExpressions.Regex](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex) object each time the method is called. A [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) object is then used to iterate through all matches in the string.

[language="csharp" source="snippets/regular-expression-example-scanning-for-hrefs/csharp/Program.cs" id="regex"::: (complete source file; reference: snippets/regular-expression-example-scanning-for-hrefs/csharp/Program.cs)](../../../_code/docs/standard/base-types/snippets/regular-expression-example-scanning-for-hrefs/csharp/Program.cs.md)
[language="vb" source="snippets/regular-expression-example-scanning-for-hrefs/vb/Program.vb" id="regex"::: (complete source file; reference: snippets/regular-expression-example-scanning-for-hrefs/vb/Program.vb)](../../../_code/docs/standard/base-types/snippets/regular-expression-example-scanning-for-hrefs/vb/Program.vb.md)

The following example then illustrates a call to the `DumpHRefs` method.

[language="csharp" source="snippets/regular-expression-example-scanning-for-hrefs/csharp/Program.cs" id="main"::: (complete source file; reference: snippets/regular-expression-example-scanning-for-hrefs/csharp/Program.cs)](../../../_code/docs/standard/base-types/snippets/regular-expression-example-scanning-for-hrefs/csharp/Program.cs.md)
[language="vb" source="snippets/regular-expression-example-scanning-for-hrefs/vb/Program.vb" id="main"::: (complete source file; reference: snippets/regular-expression-example-scanning-for-hrefs/vb/Program.vb)](../../../_code/docs/standard/base-types/snippets/regular-expression-example-scanning-for-hrefs/vb/Program.vb.md)

The regular expression pattern `href\s*=\s*(?:["'](?<1>[^"']*)["']|(?<1>[^>\s]+))` is interpreted as shown in the following table.

| Pattern | Description |
| --- | --- |
| `href` | Match the literal string "href". The match is case-insensitive. |
| `\s*` | Match zero or more white-space characters. |
| `=` | Match the equals sign. |
| `\s*` | Match zero or more white-space characters. |
| `(?:` | Start a non-capturing group. |
| `["'](?<1>[^"']*)["']` | Match a quotation mark or apostrophe, followed by a capturing group that matches any character other than a quotation mark or apostrophe, followed by a quotation mark or apostrophe. The group named `1` is included in this pattern. |
| &#124; | Boolean OR that matches either the previous expression or the next expression. |
| `(?<1>[^>\s]+)` | A capturing group that uses a negated set to match any character other than a greater-than sign or a whitespace character. The group named `1` is included in this pattern. |
| `)` | End the non-capturing group. |

## Match result class

The results of a search are stored in the [System.Text.RegularExpressions.Match](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match) class, which provides access to all the substrings extracted by the search. It also remembers the string being searched and the regular expression being used, so it can call the [System.Text.RegularExpressions.Match.NextMatch*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match.NextMatch*) method to perform another search starting where the last one ended.

## Explicitly named captures

In traditional regular expressions, capturing parentheses are automatically numbered sequentially. This leads to two problems. First, if a regular expression is modified by inserting or removing a set of parentheses, all code that refers to the numbered captures must be rewritten to reflect the new numbering. Second, because different sets of parentheses often are used to provide two alternative expressions for an acceptable match, it might be difficult to determine which of the two expressions actually returned a result.

To address these problems, the [System.Text.RegularExpressions.Regex](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex) class supports the syntax `(?<name>…)` for capturing a match into a specified slot (the slot can be named using a string or an integer; integers can be recalled more quickly). Thus, alternative matches for the same string all can be directed to the same place. In case of a conflict, the last match dropped into a slot is the successful match. (However, a complete list of multiple matches for a single slot is available. See the [System.Text.RegularExpressions.Group.Captures*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Group.Captures*) collection for details.)

## See also

- [.NET Regular Expressions](regular-expressions.md)
