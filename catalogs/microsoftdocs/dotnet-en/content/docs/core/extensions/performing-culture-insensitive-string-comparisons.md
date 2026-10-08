---
title: Perform culture-insensitive string comparisons
description: "Learn how to perform culture-insensitive string comparisons"
ms.date: 03/13/2023
dev_langs:
    - "csharp"
    - "vb"
helpviewer_keywords:
    - "String.CompareTo method"
    - "String.Compare method"
    - "string comparison [.NET], culture-insensitive"
    - "strings [.NET], comparing"
    - "culture-insensitive string operations, comparisons"
    - "culture parameter"
ms.topic: how-to
---

# Perform culture-insensitive string comparisons

By default, the [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*) method performs culture-sensitive and case-sensitive comparisons. This method also includes several overloads that provide a `culture` parameter that lets you specify the culture to use, and a `comparisonType` parameter that lets you specify the comparison rules to use. Calling these methods instead of the default overload removes any ambiguity about the rules used in a particular method call, and makes it clear whether a particular comparison is culture-sensitive or culture-insensitive.

> **Note:**
> Both overloads of the [System.String.CompareTo*](https://learn.microsoft.com/search/?terms=System.String.CompareTo*) method perform culture-sensitive and case-sensitive comparisons; you cannot use this method to perform culture-insensitive comparisons. For code clarity, we recommend that you use the [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*) method instead.

For culture-sensitive operations, specify the [System.StringComparison.CurrentCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCulture) or [System.StringComparison.CurrentCultureIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCultureIgnoreCase) enumeration value as the `comparisonType` parameter. If you want to perform a culture-sensitive comparison using a designated culture other than the current culture, specify the [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) object that represents that culture as the `culture` parameter.

The culture-insensitive string comparisons supported by the [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*) method are either linguistic (based on the sorting conventions of the invariant culture) or non-linguistic (based on the ordinal value of the characters in the string). Most culture-insensitive string comparisons are non-linguistic. For these comparisons, specify the [System.StringComparison.Ordinal](https://learn.microsoft.com/search/?terms=System.StringComparison.Ordinal) or [System.StringComparison.OrdinalIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.OrdinalIgnoreCase) enumeration value as the `comparisonType` parameter. For example, if a security decision (such as a user name or password comparison) is based on the result of a string comparison, the operation should be culture-insensitive and non-linguistic to ensure that the result is not affected by the conventions of a particular culture or language.

Use culture-insensitive linguistic string comparison if you want to handle linguistically relevant strings from multiple cultures in a consistent way. For example, if your application displays words that use multiple character sets in a list box, you might want to display words in the same order regardless of the current culture. For culture-insensitive linguistic comparisons, .NET defines an invariant culture that is based on the linguistic conventions of English. To perform a culture-insensitive linguistic comparison, specify [System.StringComparison.InvariantCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.InvariantCulture) or [System.StringComparison.InvariantCultureIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.InvariantCultureIgnoreCase) as the `comparisonType` parameter.

The following example performs two culture-insensitive, non-linguistic string comparisons. The first is case-sensitive, but the second is not.

[Conceptual.Strings.CultureInsensitiveComparison#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.strings.cultureinsensitivecomparison/cs/cultureinsensitive1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.strings.cultureinsensitivecomparison/cs/cultureinsensitive1.cs.md)
[Conceptual.Strings.CultureInsensitiveComparison#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.strings.cultureinsensitivecomparison/vb/cultureinsensitive1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.strings.cultureinsensitivecomparison/vb/cultureinsensitive1.vb.md)

You can download the [Sorting Weight Tables](https://www.microsoft.com/download/details.aspx?id=10921), a set of text files that contain information on the character weights used in sorting and comparison operations for Windows operating systems, and the [Default Unicode Collation Element Table](https://www.unicode.org/Public/UCA/latest/allkeys.txt), the sort weight table for Linux and macOS.

## See also

- [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*)
- [System.String.CompareTo*](https://learn.microsoft.com/search/?terms=System.String.CompareTo*)
- [Perform culture-insensitive string operations](performing-culture-insensitive-string-operations.md)
- [Best practices for using strings](../../standard/base-types/best-practices-strings.md)
