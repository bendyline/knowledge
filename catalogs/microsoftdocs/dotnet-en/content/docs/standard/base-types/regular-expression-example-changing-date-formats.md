---
description: "Learn more about: Regular Expression Example: Changing Date Formats"
title: "Regular Expression Example: Changing Date Formats"
ms.date: "06/30/2020"
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
ms.assetid: 5fcc75a5-09d7-45ae-a4c0-9ad6085ac83d
---
# Regular Expression Example: Changing Date Formats

The following code example uses the [System.Text.RegularExpressions.Regex.Replace*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex.Replace*) method to replace dates that have the form *mm*/*dd*/*yy* with dates that have the form *dd*-*mm*-*yy*.


> **Warning:**
> Unrestricted use of [System.Text.RegularExpressions](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions) with untrusted input can subject applications to [denial-of-service attacks](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS). Consult [Best practices for regular expressions in .NET](best-practices-regex.md) for guidance on how to safely use .NET regular expressions with untrusted input.


## Example

 [RegularExpressions.Examples.ChangeDateFormats#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/RegularExpressions.Examples.ChangeDateFormats/cs/Example_ChangeDateFormats1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/RegularExpressions.Examples.ChangeDateFormats/cs/Example_ChangeDateFormats1.cs.md)
 [RegularExpressions.Examples.ChangeDateFormats#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/RegularExpressions.Examples.ChangeDateFormats/vb/Example_ChangeDateFormats1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/RegularExpressions.Examples.ChangeDateFormats/vb/Example_ChangeDateFormats1.vb.md)

 The following code shows how the `MDYToDMY` method can be called in an application.

 [RegularExpressions.Examples.ChangeDateFormats#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/RegularExpressions.Examples.ChangeDateFormats/cs/Example_ChangeDateFormats1.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/RegularExpressions.Examples.ChangeDateFormats/cs/Example_ChangeDateFormats1.cs.md)
 [RegularExpressions.Examples.ChangeDateFormats#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/RegularExpressions.Examples.ChangeDateFormats/vb/Example_ChangeDateFormats1.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/RegularExpressions.Examples.ChangeDateFormats/vb/Example_ChangeDateFormats1.vb.md)

## Comments

 The regular expression pattern  `\b(?<month>\d{1,2})/(?<day>\d{1,2})/(?<year>\d{2,4})\b` is interpreted as shown in the following table.

| Pattern | Description |
| --- | --- |
| `\b` | Begin the match at a word boundary. |
| `(?<month>\d{1,2})` | Match one or two decimal digits. This is the `month` captured group. |
| `/` | Match the slash mark. |
| `(?<day>\d{1,2})` | Match one or two decimal digits. This is the `day` captured group. |
| `/` | Match the slash mark. |
| `(?<year>\d{2,4})` | Match from two to four decimal digits. This is the `year` captured group. |
| `\b` | End the match at a word boundary. |

 The pattern `${day}-${month}-${year}` defines the replacement string as shown in the following table.

| Pattern | Description |
| --- | --- |
| `$(day)` | Add the string captured by the `day` capturing group. |
| `-` | Add a hyphen. |
| `$(month)` | Add the string captured by the `month` capturing group. |
| `-` | Add a hyphen. |
| `$(year)` | Add the string captured by the `year` capturing group. |

## See also

- [.NET Regular Expressions](regular-expressions.md)
