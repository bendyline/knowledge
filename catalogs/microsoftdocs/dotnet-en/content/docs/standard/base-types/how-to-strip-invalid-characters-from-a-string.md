---
title: "How to: Strip Invalid Characters from a String"
description: Read an example that shows how to strip potentially harmful characters from a string by using the static Regex.Replace method.
ms.date: "06/30/2020"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "regular expressions, examples"
  - "cleaning input"
  - "user input, examples"
  - ".NET regular expressions, examples"
  - "regular expressions [.NET], examples"
  - "Regex.Replace method"
  - "stripping invalid characters"
  - "Replace method"
  - "validating user input"
ms.assetid: b4319c8a-9032-4129-a9d5-6f6fc28e7f32
---
# How to: Strip Invalid Characters from a String

The following example uses the static [System.Text.RegularExpressions.Regex.Replace*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Replace*) method to strip invalid characters from a string.


> **Warning:**
> Unrestricted use of [System.Text.RegularExpressions](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions) with untrusted input can subject applications to [denial-of-service attacks](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS). Consult [Best practices for regular expressions in .NET](best-practices-regex.md) for guidance on how to safely use .NET regular expressions with untrusted input.


## Example

 You can use the `CleanInput` method defined in this example to strip potentially harmful characters that have been entered into a text field that accepts user input. In this case, `CleanInput` strips out all nonalphanumeric characters except periods (.), at symbols (@), and hyphens (-), and returns the remaining string. However, you can modify the regular expression pattern so that it strips out any characters that should not be included in an input string.

 [RegularExpressions.Examples.StripChars#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/RegularExpressions.Examples.StripChars/cs/Example.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/RegularExpressions.Examples.StripChars/cs/Example.cs.md)
 [RegularExpressions.Examples.StripChars#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/RegularExpressions.Examples.StripChars/vb/Example.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/RegularExpressions.Examples.StripChars/vb/Example.vb.md)

 The regular expression pattern `[^\w\.@-]` matches any character that is not a word character, a period, an @ symbol, or a hyphen. A word character is any letter, decimal digit, or punctuation connector such as an underscore. Any character that matches this pattern is replaced by [System.String.Empty](https://learn.microsoft.com/search/?terms=System.String.Empty), which is the string defined by the replacement pattern. To allow additional characters in user input, add those characters to the character class in the regular expression pattern. For example, the regular expression pattern `[^\w\.@-\\%]` also allows a percentage symbol and a backslash in an input string.

## See also

- [.NET Regular Expressions](regular-expressions.md)
