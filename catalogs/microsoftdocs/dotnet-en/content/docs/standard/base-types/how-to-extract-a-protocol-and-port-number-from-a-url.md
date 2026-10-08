---
description: "Learn more about: How to: Extract a Protocol and Port Number from a URL"
title: "How to: Extract a Protocol and Port Number from a URL"
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
ms.assetid: ab7f62b3-6d2c-4efb-8ac6-28600df5fd5c
---
# How to: Extract a Protocol and Port Number from a URL

The following example extracts a protocol and port number from a URL.


> **Warning:**
> Unrestricted use of [System.Text.RegularExpressions](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions) with untrusted input can subject applications to [denial-of-service attacks](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS). Consult [Best practices for regular expressions in .NET](best-practices-regex.md) for guidance on how to safely use .NET regular expressions with untrusted input.


## Example

 The example uses the [System.Text.RegularExpressions.Match.Result*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match.Result*) method to return the protocol followed by a colon followed by the port number.

 [RegularExpressions.Examples.Protocol#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/RegularExpressions.Examples.Protocol/cs/Example.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/RegularExpressions.Examples.Protocol/cs/Example.cs.md)
 [RegularExpressions.Examples.Protocol#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/RegularExpressions.Examples.Protocol/vb/Example.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/RegularExpressions.Examples.Protocol/vb/Example.vb.md)

 The regular expression pattern `^(?<proto>\w+)://[^/]+?(?<port>:\d+)?/` can be interpreted as shown in the following table.

| Pattern | Description |
| --- | --- |
| `^` | Begin the match at the start of the string. |
| `(?<proto>\w+)` | Match one or more word characters. Name this group `proto`. |
| `://` | Match a colon followed by two slash marks. |
| `[^/]+?` | Match one or more occurrences (but as few as possible) of any character other than a slash mark. |
| `(?<port>:\d+)?` | Match zero or one occurrence of a colon followed by one or more digit characters. Name this group `port`. |
| `/` | Match a slash mark. |

 The [System.Text.RegularExpressions.Match.Result*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match.Result*) method expands the `${proto}${port}` replacement sequence, which concatenates the value of the two named groups captured in the regular expression pattern. It is a convenient alternative to explicitly concatenating the strings retrieved from the collection object returned by the [System.Text.RegularExpressions.Match.Groups](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match.Groups) property.

 The example uses the [System.Text.RegularExpressions.Match.Result*](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Match.Result*) method with two substitutions, `${proto}` and `${port}`, to include the captured groups in the output string. You can retrieve the captured groups from the match's [System.Text.RegularExpressions.GroupCollection](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.GroupCollection) object instead, as the following code shows.

 [RegularExpressions.Examples.Protocol#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/RegularExpressions.Examples.Protocol/cs/example2.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/RegularExpressions.Examples.Protocol/cs/example2.cs.md)
 [RegularExpressions.Examples.Protocol#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/RegularExpressions.Examples.Protocol/vb/example2.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/RegularExpressions.Examples.Protocol/vb/example2.vb.md)

## See also

- [.NET Regular Expressions](regular-expressions.md)
