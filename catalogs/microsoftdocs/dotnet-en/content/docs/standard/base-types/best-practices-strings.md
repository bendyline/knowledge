---
title: "Best Practices for Comparing Strings in .NET"
description: Learn how to compare strings effectively in .NET applications.
ms.date: 02/23/2026
ms.topic: concept-article
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "strings [.NET],searching"
  - "best practices,string comparison and sorting"
  - "strings [.NET],best practices"
  - "strings [.NET],basic string operations"
  - "sorting strings"
  - "strings [.NET],sorting"
  - "string comparison [.NET],best practices"
  - "string sorting"
  - "comparing strings"
  - "strings [.NET],comparing"
---
# Best practices for comparing strings in .NET

.NET provides extensive support for developing localized and globalized applications, and makes it easy to apply the conventions of either the current culture or a specific culture when performing common operations such as sorting and displaying strings. But sorting or comparing strings isn't always a culture-sensitive operation. For example, strings that are used internally by an application typically should be handled identically across all cultures. When culturally independent string data, such as XML tags, HTML tags, user names, file paths, and the names of system objects, are interpreted as if they were culture-sensitive, application code can be subject to subtle bugs, poor performance, and, in some cases, security issues.

This article examines the string sorting, comparison, and casing methods in .NET, presents recommendations for selecting an appropriate string-handling method, and provides additional information about string-handling methods.

## Recommendations for string usage

When you develop with .NET, follow these recommendations when you compare strings.

> **Tip:**
> Various string-related methods perform comparison. Examples include [System.String.Equals*](https://learn.microsoft.com/search/?terms=System.String.Equals*), [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*), [System.String.IndexOf*](https://learn.microsoft.com/search/?terms=System.String.IndexOf*), and [System.String.StartsWith*](https://learn.microsoft.com/search/?terms=System.String.StartsWith*).

- Use overloads that explicitly specify the string comparison rules for string operations. Typically, this involves calling a method overload that has a parameter of type [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison).
- Use [System.StringComparison.Ordinal](https://learn.microsoft.com/search/?terms=System.StringComparison.Ordinal) or [System.StringComparison.OrdinalIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.OrdinalIgnoreCase) for comparisons as your safe default for culture-agnostic string matching.
- Use comparisons with [System.StringComparison.Ordinal](https://learn.microsoft.com/search/?terms=System.StringComparison.Ordinal) or [System.StringComparison.OrdinalIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.OrdinalIgnoreCase) for better performance.
- Use string operations that are based on [System.StringComparison.CurrentCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCulture) when you display output to the user.
- Use the non-linguistic [System.StringComparison.Ordinal](https://learn.microsoft.com/search/?terms=System.StringComparison.Ordinal) or [System.StringComparison.OrdinalIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.OrdinalIgnoreCase) values instead of string operations based on [System.Globalization.CultureInfo.InvariantCulture*](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture*) when the comparison is linguistically irrelevant (symbolic, for example).
- Use the [System.String.ToUpperInvariant*](https://learn.microsoft.com/search/?terms=System.String.ToUpperInvariant*) method instead of the [System.String.ToLowerInvariant*](https://learn.microsoft.com/search/?terms=System.String.ToLowerInvariant*) method when you normalize strings for comparison.
- Use an overload of the [System.String.Equals*](https://learn.microsoft.com/search/?terms=System.String.Equals*) method to test whether two strings are equal.
- Use the [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*) and [System.String.CompareTo*](https://learn.microsoft.com/search/?terms=System.String.CompareTo*) methods to sort strings, not to check for equality.
- Use culture-sensitive formatting to display non-string data, such as numbers and dates, in a user interface. Use formatting with the [invariant culture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture) to persist non-string data in string form.

Avoid the following practices when you compare strings:

- Don't use overloads that don't explicitly or implicitly specify the string comparison rules for string operations.
- Don't use string operations based on [System.StringComparison.InvariantCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.InvariantCulture) in most cases. One of the few exceptions is when you're persisting linguistically meaningful but culturally agnostic data.
- Don't use an overload of the [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*) or [System.String.CompareTo*](https://learn.microsoft.com/search/?terms=System.String.CompareTo*) method and test for a return value of zero to determine whether two strings are equal.

> **Tip:**
> The [CA1307](../../fundamentals/code-analysis/quality-rules/ca1307.md), [CA1309](../../fundamentals/code-analysis/quality-rules/ca1309.md), and [CA1310](../../fundamentals/code-analysis/quality-rules/ca1310.md) code analysis rules help identify call sites where a linguistic comparer is used unintentionally. To enable them and surface violations as build errors, set the following properties in your project file:
>
> ```xml
> <PropertyGroup>
>   <AnalysisMode>All</AnalysisMode>
>   <WarningsAsErrors>$(WarningsAsErrors);CA1307;CA1309;CA1310</WarningsAsErrors>
> </PropertyGroup>
> ```

## Specify string comparisons explicitly

Most of the string manipulation methods in .NET are overloaded. Typically, one or more overloads accept default settings, whereas others accept no defaults and instead define the precise way in which strings are to be compared or manipulated. Most of the methods that don't rely on defaults include a parameter of type [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison), which is an enumeration that explicitly specifies rules for string comparison by culture and case. The following table describes the [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) enumeration members.

| `StringComparison` member | Description |
| --- | --- |
| [System.StringComparison.CurrentCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCulture) | Performs a case-sensitive comparison using the current culture. |
| [System.StringComparison.CurrentCultureIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCultureIgnoreCase) | Performs a case-insensitive comparison using the current culture. |
| [System.StringComparison.InvariantCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.InvariantCulture) | Performs a case-sensitive comparison using the invariant culture. |
| [System.StringComparison.InvariantCultureIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.InvariantCultureIgnoreCase) | Performs a case-insensitive comparison using the invariant culture. |
| [System.StringComparison.Ordinal](https://learn.microsoft.com/search/?terms=System.StringComparison.Ordinal) | Performs an ordinal comparison. |
| [System.StringComparison.OrdinalIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.OrdinalIgnoreCase) | Performs a case-insensitive ordinal comparison. |

For example, the [System.String.IndexOf*](https://learn.microsoft.com/search/?terms=System.String.IndexOf*) method, which returns the index of a substring in a [System.String](https://learn.microsoft.com/search/?terms=System.String) object that matches either a character or a string, has nine overloads:

- [System.String.IndexOf%28System.Char%29](https://learn.microsoft.com/search/?terms=System.String.IndexOf%2528System.Char%2529), [System.String.IndexOf%28System.Char%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.String.IndexOf%2528System.Char%252CSystem.Int32%2529), and [System.String.IndexOf%28System.Char%2CSystem.Int32%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.String.IndexOf%2528System.Char%252CSystem.Int32%252CSystem.Int32%2529), which by default performs an ordinal (case-sensitive and culture-insensitive) search for a character in the string.
- [System.String.IndexOf%28System.String%29](https://learn.microsoft.com/search/?terms=System.String.IndexOf%2528System.String%2529), [System.String.IndexOf%28System.String%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.String.IndexOf%2528System.String%252CSystem.Int32%2529), and [System.String.IndexOf%28System.String%2CSystem.Int32%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.String.IndexOf%2528System.String%252CSystem.Int32%252CSystem.Int32%2529), which by default performs a case-sensitive and culture-sensitive search for a substring in the string.
- [System.String.IndexOf%28System.String%2CSystem.StringComparison%29](https://learn.microsoft.com/search/?terms=System.String.IndexOf%2528System.String%252CSystem.StringComparison%2529), [System.String.IndexOf%28System.String%2CSystem.Int32%2CSystem.StringComparison%29](https://learn.microsoft.com/search/?terms=System.String.IndexOf%2528System.String%252CSystem.Int32%252CSystem.StringComparison%2529), and [System.String.IndexOf%28System.String%2CSystem.Int32%2CSystem.Int32%2CSystem.StringComparison%29](https://learn.microsoft.com/search/?terms=System.String.IndexOf%2528System.String%252CSystem.Int32%252CSystem.Int32%252CSystem.StringComparison%2529), which include a parameter of type [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) that allows the form of the comparison to be specified.

We recommend that you select an overload that doesn't use default values, for the following reasons:

- Some overloads with default parameters (those that search for a [System.Char](https://learn.microsoft.com/search/?terms=System.Char) in the string instance) perform an ordinal comparison, whereas others (those that search for a string in the string instance) are culture-sensitive. It's difficult to remember which method uses which default value, and easy to confuse the overloads.
- The intent of the code that relies on default values for method calls isn't clear. In the following example, which relies on defaults, it's difficult to know whether the developer actually intended an ordinal or a linguistic comparison of two strings, or whether a case difference between `url.Scheme` and "https" might cause the test for equality to return `false`.

  [language="csharp" source="./snippets/best-practices-strings/csharp/explicitargs/Program.cs" id="default"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/explicitargs/Program.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/explicitargs/Program.cs.md)
  [language="vb" source="./snippets/best-practices-strings/vb/explicitargs/Program.vb" id="default"::: (complete source file; reference: ./snippets/best-practices-strings/vb/explicitargs/Program.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/explicitargs/Program.vb.md)

In general, we recommend that you call a method that doesn't rely on defaults, because it makes the intent of the code unambiguous. This, in turn, makes the code more readable and easier to debug and maintain. The following example addresses the questions raised about the previous example. It makes it clear that ordinal comparison is used and that differences in case are ignored.

[language="csharp" source="./snippets/best-practices-strings/csharp/explicitargs/Program.cs" id="explicit"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/explicitargs/Program.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/explicitargs/Program.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/explicitargs/Program.vb" id="explicit"::: (complete source file; reference: ./snippets/best-practices-strings/vb/explicitargs/Program.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/explicitargs/Program.vb.md)

## The details of string comparison

String comparison is the heart of many string-related operations, particularly sorting and testing for equality. Strings sort in a determined order: If "my" appears before "string" in a sorted list of strings, "my" must compare less than or equal to "string". Additionally, comparison implicitly defines equality. The comparison operation returns zero for strings it deems equal. A good interpretation is that neither string is less than the other. Most meaningful operations involving strings include one or both of these procedures: comparing with another string, and executing a well-defined sort operation.

> **Note:**
> You can download the [Sorting Weight Tables](https://www.microsoft.com/download/details.aspx?id=10921), a set of text files that contain information on the character weights used in sorting and comparison operations for Windows operating systems, and the [Default Unicode Collation Element Table](https://www.unicode.org/Public/UCA/latest/allkeys.txt), the latest version of the sort weight table for Linux and macOS. The specific version of the sort weight table on Linux and macOS depends on the version of the [International Components for Unicode](https://icu.unicode.org/) libraries installed on the system. For information on ICU versions and the Unicode versions that they implement, see [Downloading ICU](https://icu.unicode.org/download).

However, evaluating two strings for equality or sort order doesn't yield a single, correct result; the outcome depends on the criteria used to compare the strings. In particular, string comparisons that are ordinal or that are based on the casing and sorting conventions of the current culture or the [invariant culture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture) (a locale-agnostic culture based on the English language) may produce different results.

In addition, string comparisons using different versions of .NET or using .NET on different operating systems or operating system versions may return different results. .NET uses the [International Components for Unicode (ICU)](https://icu.unicode.org/) library for linguistic string comparisons on all supported platforms. For more information, see [Strings and the Unicode Standard](https://learn.microsoft.com/search/?terms=System.String%23Unicode) and [.NET globalization and ICU](../../core/extensions/globalization-icu.md).

### String comparisons that use the current culture

One criterion involves using the conventions of the current culture when comparing strings. Comparisons that are based on the current culture use the thread's current culture or locale. If the culture isn't set by the user, it defaults to the operating system's setting. You should always use comparisons that are based on the current culture when data is linguistically relevant, and when it reflects culture-sensitive user interaction.

However, comparison and casing behavior in .NET changes when the culture changes. This happens when an application executes on a computer that has a different culture than the computer on which the application was developed, or when the executing thread changes its culture. This behavior is intentional, but it remains non-obvious to many developers. The following example illustrates differences in sort order between the U.S. English ("en-US") and Swedish ("sv-SE") cultures. Note that the words "ångström", "Windows", and "Visual Studio" appear in different positions in the sorted string arrays.

[language="csharp" source="./snippets/best-practices-strings/csharp/comparison1/Program.cs"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/comparison1/Program.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/comparison1/Program.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/comparison1/Program.vb"::: (complete source file; reference: ./snippets/best-practices-strings/vb/comparison1/Program.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/comparison1/Program.vb.md)

Case-insensitive comparisons that use the current culture are the same as culture-sensitive comparisons, except that they ignore case as dictated by the thread's current culture. This behavior may manifest itself in sort orders as well.

Comparisons that use current culture semantics are the default for the following methods:

- [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*) overloads that don't include a [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) parameter.
- [System.String.CompareTo*](https://learn.microsoft.com/search/?terms=System.String.CompareTo*) overloads.
- The default [System.String.StartsWith%28System.String%29](https://learn.microsoft.com/search/?terms=System.String.StartsWith%2528System.String%2529) method, and the [System.String.StartsWith%28System.String%2CSystem.Boolean%2CSystem.Globalization.CultureInfo%29](https://learn.microsoft.com/search/?terms=System.String.StartsWith%2528System.String%252CSystem.Boolean%252CSystem.Globalization.CultureInfo%2529) method with a `null`[System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) parameter.
- The default [System.String.EndsWith%28System.String%29](https://learn.microsoft.com/search/?terms=System.String.EndsWith%2528System.String%2529) method, and the [System.String.EndsWith%28System.String%2CSystem.Boolean%2CSystem.Globalization.CultureInfo%29](https://learn.microsoft.com/search/?terms=System.String.EndsWith%2528System.String%252CSystem.Boolean%252CSystem.Globalization.CultureInfo%2529) method with a `null`[System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) parameter.
- [System.String.IndexOf*](https://learn.microsoft.com/search/?terms=System.String.IndexOf*) overloads that accept a [System.String](https://learn.microsoft.com/search/?terms=System.String) as a search parameter and that don't have a [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) parameter.
- [System.String.LastIndexOf*](https://learn.microsoft.com/search/?terms=System.String.LastIndexOf*) overloads that accept a [System.String](https://learn.microsoft.com/search/?terms=System.String) as a search parameter and that don't have a [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) parameter.

In any case, we recommend that you call an overload that has a [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) parameter to make the intent of the method call clear.

Subtle and not so subtle bugs can emerge when non-linguistic string data is interpreted linguistically, or when string data from a particular culture is interpreted using the conventions of another culture. The canonical example is the Turkish-I problem.

For nearly all Latin alphabets, including U.S. English, the character "i" (\u0069) is the lowercase version of the character "I" (\u0049). This casing rule quickly becomes the default for someone programming in such a culture. However, the Turkish ("tr-TR") alphabet includes an "I with a dot" character "İ" (\u0130), which is the capital version of "i". Turkish also includes a lowercase "i without a dot" character, "ı" (\u0131), which capitalizes to "I". This behavior occurs in the Azerbaijani ("az") culture as well.

Therefore, assumptions made about capitalizing "i" or lowercasing "I" aren't valid among all cultures. If you use the default overloads for string comparison routines, they will be subject to variance between cultures. If the data to be compared is non-linguistic, using the default overloads can produce undesirable results, as the following attempt to perform a case-insensitive comparison of the strings "bill" and "BILL" illustrates.

[language="csharp" source="./snippets/best-practices-strings/csharp/turkish/Program.cs" id="main"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/turkish/Program.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/turkish/Program.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/turkish/Program.vb" id="main"::: (complete source file; reference: ./snippets/best-practices-strings/vb/turkish/Program.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/turkish/Program.vb.md)

This comparison could cause significant problems if the culture is inadvertently used in security-sensitive settings, as in the following example. A method call such as `IsFileURI("file:")` returns `true` if the current culture is U.S. English, but `false` if the current culture is Turkish. Thus, on Turkish systems, someone could circumvent security measures that block access to case-insensitive URIs that begin with "FILE:".

[language="csharp" source="./snippets/best-practices-strings/csharp/turkish/Program.cs" id="culture_sensitive"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/turkish/Program.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/turkish/Program.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/turkish/Program.vb" id="culture_sensitive"::: (complete source file; reference: ./snippets/best-practices-strings/vb/turkish/Program.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/turkish/Program.vb.md)

In this case, because "file:" is meant to be interpreted as a non-linguistic, culture-insensitive identifier, the code should instead be written as shown in the following example:

[language="csharp" source="./snippets/best-practices-strings/csharp/turkish/Program.cs" id="ordinal"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/turkish/Program.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/turkish/Program.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/turkish/Program.vb" id="ordinal"::: (complete source file; reference: ./snippets/best-practices-strings/vb/turkish/Program.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/turkish/Program.vb.md)

### Ordinal string operations

Specifying the [System.StringComparison.Ordinal](https://learn.microsoft.com/search/?terms=System.StringComparison.Ordinal) or [System.StringComparison.OrdinalIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.OrdinalIgnoreCase) value in a method call signifies a non-linguistic comparison in which the features of natural languages are ignored. Methods that are invoked with these [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) values base string operation decisions on simple byte comparisons instead of casing or equivalence tables that are parameterized by culture. In most cases, this approach best fits the intended interpretation of strings while making code faster and more reliable.

Ordinal comparisons are string comparisons in which each byte of each string is compared without linguistic interpretation; for example, "windows" doesn't match "Windows". This is essentially a call to the C runtime `strcmp` function. Use this comparison when the context dictates that strings should be matched exactly or demands conservative matching policy. Additionally, ordinal comparison is the fastest comparison operation because it applies no linguistic rules when determining a result.

An `OrdinalIgnoreCase` comparer still operates on a char-by-char basis, but it eliminates case differences while performing the operation. Under an `OrdinalIgnoreCase` comparer, the char pairs `'d'` and `'D'` compare as *equal*, as do the char pairs `'á'` and `'Á'`. But the unaccented char `'a'` compares as *not equal* to the accented char `'á'`.

Some examples of this are provided in the following table:

| String 1 | String 2 | `Ordinal` comparison | `OrdinalIgnoreCase` comparison |
| --- | --- | --- | --- |
| `"dog"` | `"dog"` | equal | equal |
| `"dog"` | `"Dog"` | not equal | equal |
| `"resume"` | `"résumé"` | not equal | not equal |

Unicode also allows strings to have several different in-memory representations. For example, an e-acute (é) can be represented in two possible ways:

- A single literal `'é'` character (also written as `'\u00E9'`).
- A literal unaccented `'e'` character followed by a combining accent modifier character `'\u0301'`.

This means that the following _four_ strings all display as `"résumé"`, even though their constituent pieces are different. The strings use a combination of literal `'é'` characters or literal unaccented `'e'` characters plus the combining accent modifier `'\u0301'`.

- `"r\u00E9sum\u00E9"`
- `"r\u00E9sume\u0301"`
- `"re\u0301sum\u00E9"`
- `"re\u0301sume\u0301"`

Under an ordinal comparer, none of these strings compare as equal to each other. This is because they all contain different underlying char sequences, even though when they're rendered to the screen, they all look the same.

When performing a `string.IndexOf(..., StringComparison.Ordinal)` operation, the runtime looks for an exact substring match. The results are as follows.

[language="csharp" source="./snippets/best-practices-strings/csharp/everythingelse/Program.cs" id="indexof"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/everythingelse/Program.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/everythingelse/Program.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/everythingelse/Program.vb" id="indexof"::: (complete source file; reference: ./snippets/best-practices-strings/vb/everythingelse/Program.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/everythingelse/Program.vb.md)

Ordinal search and comparison routines are never affected by the current thread's culture setting.

Strings in .NET can contain embedded null characters (and other non-printing characters). One of the clearest differences between ordinal and culture-sensitive comparison (including comparisons that use the invariant culture) concerns the handling of embedded null characters in a string. These characters are ignored when you use the [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*) and [System.String.Equals*](https://learn.microsoft.com/search/?terms=System.String.Equals*) methods to perform culture-sensitive comparisons (including comparisons that use the invariant culture). As a result, strings that contain embedded null characters can be considered equal to strings that don't. Embedded non-printing characters might be skipped for the purpose of string comparison methods, such as [System.String.StartsWith*](https://learn.microsoft.com/search/?terms=System.String.StartsWith*).

> **Important:**
> Although string comparison methods disregard embedded null characters, string search methods such as [System.String.Contains*](https://learn.microsoft.com/search/?terms=System.String.Contains*), [System.String.EndsWith*](https://learn.microsoft.com/search/?terms=System.String.EndsWith*), [System.String.IndexOf*](https://learn.microsoft.com/search/?terms=System.String.IndexOf*), [System.String.LastIndexOf*](https://learn.microsoft.com/search/?terms=System.String.LastIndexOf*), and [System.String.StartsWith*](https://learn.microsoft.com/search/?terms=System.String.StartsWith*) do not.

The following example performs a culture-sensitive comparison of the string "Aa" with a similar string that contains several embedded null characters between "A" and "a", and shows how the two strings are considered equal:

[language="csharp" source="./snippets/best-practices-strings/csharp/embeddednulls1/Program.cs"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/embeddednulls1/Program.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/embeddednulls1/Program.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/embeddednulls1/Program.vb"::: (complete source file; reference: ./snippets/best-practices-strings/vb/embeddednulls1/Program.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/embeddednulls1/Program.vb.md)

However, the strings aren't considered equal when you use ordinal comparison, as the following example shows:

[language="csharp" source="./snippets/best-practices-strings/csharp/embeddednulls2/Program.cs"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/embeddednulls2/Program.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/embeddednulls2/Program.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/embeddednulls2/Program.vb"::: (complete source file; reference: ./snippets/best-practices-strings/vb/embeddednulls2/Program.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/embeddednulls2/Program.vb.md)

Case-insensitive ordinal comparisons are the next most conservative approach. These comparisons ignore most casing; for example, "windows" matches "Windows". When dealing with ASCII characters, this policy is equivalent to [System.StringComparison.Ordinal](https://learn.microsoft.com/search/?terms=System.StringComparison.Ordinal), except that it ignores the usual ASCII casing. Therefore, any character in [A, Z] (\u0041-\u005A) matches the corresponding character in [a,z] (\u0061-\007A). Casing outside the ASCII range uses the invariant culture's tables. Therefore, the following comparison:

[language="csharp" source="./snippets/best-practices-strings/csharp/comparison2/Program.cs" id="OrdinalIgnoreCase"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/comparison2/Program.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/comparison2/Program.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/comparison2/Program.vb" id="OrdinalIgnoreCase"::: (complete source file; reference: ./snippets/best-practices-strings/vb/comparison2/Program.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/comparison2/Program.vb.md)

is equivalent to (but faster than) this comparison:

[language="csharp" source="./snippets/best-practices-strings/csharp/comparison2/Program.cs" id="Ordinal"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/comparison2/Program.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/comparison2/Program.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/comparison2/Program.vb" id="Ordinal"::: (complete source file; reference: ./snippets/best-practices-strings/vb/comparison2/Program.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/comparison2/Program.vb.md)

These comparisons are still very fast.

Both [System.StringComparison.Ordinal](https://learn.microsoft.com/search/?terms=System.StringComparison.Ordinal) and [System.StringComparison.OrdinalIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.OrdinalIgnoreCase) use the binary values directly, and are best suited for matching. When you aren't sure about your comparison settings, use one of these two values. However, because they perform a byte-by-byte comparison, they don't sort by a linguistic sort order (like an English dictionary) but by a binary sort order. The results may look odd in most contexts if displayed to users.

Ordinal semantics are the default for [System.String.Equals*](https://learn.microsoft.com/search/?terms=System.String.Equals*) overloads that don't include a [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) argument (including the equality operator). In any case, we recommend that you call an overload that has a [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) parameter.

### Linguistic string comparisons

*Linguistic* search and comparison routines decompose a string into *collation elements* and perform searches or comparisons on these elements. There's not necessarily a 1:1 mapping between a string's characters and its constituent collation elements. For example, a string of length 2 may consist of only a single collation element. When two strings are compared in a linguistic-aware fashion, the comparer checks whether the two strings' collation elements have the same semantic meaning, even if the string's literal characters are different.

Consider the string `"résumé"` and its four different representations described in the previous section. The following table shows each representation broken down into its collation elements.

| String | As collation elements |
| --- | --- |
| `"r\u00E9sum\u00E9"` | `"r" + "\u00E9" + "s" + "u" + "m" + "\u00E9"` |
| `"r\u00E9sume\u0301"` | `"r" + "\u00E9" + "s" + "u" + "m" + "e\u0301"` |
| `"re\u0301sum\u00E9"` | `"r" + "e\u0301" + "s" + "u" + "m" + "\u00E9"` |
| `"re\u0301sume\u0301"` | `"r" + "e\u0301" + "s" + "u" + "m" + "e\u0301"` |

A collation element corresponds loosely to what readers would think of as a single character or cluster of characters. It's conceptually similar to a [grapheme cluster](character-encoding-introduction.md#grapheme-clusters) but encompasses a somewhat larger umbrella.

Under a linguistic comparer, exact matches aren't necessary. Collation elements are instead compared based on their semantic meaning. For example, a linguistic comparer treats the substrings `"\u00E9"` and `"e\u0301"` as equal since they both semantically mean "a lowercase e with an acute accent modifier." This allows the `IndexOf` method to match the substring `"e\u0301"` within a larger string that contains the semantically equivalent substring `"\u00E9"`, as shown in the following code sample.

[language="csharp" source="./snippets/best-practices-strings/csharp/everythingelse/Program.cs" id="indexof_string"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/everythingelse/Program.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/everythingelse/Program.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/everythingelse/Program.vb" id="indexof_string"::: (complete source file; reference: ./snippets/best-practices-strings/vb/everythingelse/Program.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/everythingelse/Program.vb.md)

As a consequence of this, two strings of different lengths may compare as equal if a linguistic comparison is used. Callers should take care not to special-case logic that deals with string length in such scenarios.

*Culture-aware* search and comparison routines are a special form of linguistic search and comparison routines. Under a culture-aware comparer, the concept of a collation element is extended to include information specific to the specified culture.

For example, [in the Hungarian alphabet](https://en.wikipedia.org/wiki/Hungarian_alphabet), when the two characters \<dz\> appear back-to-back, they are considered their own unique letter distinct from either \<d\> or \<z\>. This means that when \<dz\> is seen in a string, a Hungarian culture-aware comparer treats it as a single collation element.

| String | As collation elements | Remarks |
| --- | --- | --- |
| `"endz"` | `"e" + "n" + "d" + "z"` | (using a standard linguistic comparer) |
| `"endz"` | `"e" + "n" + "dz"` | (using a Hungarian culture-aware comparer) |

When using a Hungarian culture-aware comparer, the string `"endz"` *does not* end with the substring `"z"`, because \<dz\> and \<z\> are considered collation elements with different semantic meaning.

[language="csharp" source="./snippets/best-practices-strings/csharp/everythingelse/Program.cs" id="endz"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/everythingelse/Program.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/everythingelse/Program.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/everythingelse/Program.vb" id="endz"::: (complete source file; reference: ./snippets/best-practices-strings/vb/everythingelse/Program.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/everythingelse/Program.vb.md)

> **Note:**
>
> - **Behavior**: Linguistic and culture-aware comparers can undergo behavioral adjustments from time to time. Both ICU and the older Windows NLS facility are updated to account for how world languages change. For more information, see the blog post [Locale (culture) data churn](https://learn.microsoft.com/archive/blogs/shawnste/locale-culture-data-churn). The *Ordinal* comparer's behavior will never change since it performs exact bitwise searching and comparison. However, the *OrdinalIgnoreCase* comparer's behavior may change as Unicode grows to encompass more character sets and corrects omissions in existing casing data.
> - **Usage**: The comparers `StringComparison.InvariantCulture` and `StringComparison.InvariantCultureIgnoreCase` are linguistic comparers that are not culture-aware. That is, these comparers understand concepts such as the accented character é having multiple possible underlying representations, and that all such representations should be treated equal. But non-culture-aware linguistic comparers won't contain special handling for \<dz\> as distinct from \<d\> or \<z\>, as shown above. They also won't special-case characters like the German Eszett (ß).

.NET also offers the *invariant globalization mode*. This opt-in mode disables code paths that deal with linguistic search and comparison routines. In this mode, all operations use *Ordinal* or *OrdinalIgnoreCase* behaviors, regardless of what `CultureInfo` or `StringComparison` argument the caller provides. For more information, see [Runtime configuration options for globalization](../../core/runtime-config/globalization.md) and [.NET Core Globalization Invariant Mode](https://github.com/dotnet/runtime/blob/main/docs/design/features/globalization-invariant-mode.md).

### String operations that use the invariant culture

Comparisons with the invariant culture use the [System.Globalization.CultureInfo.CompareInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CompareInfo) property returned by the static [System.Globalization.CultureInfo.InvariantCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture) property. This behavior is the same on all systems; it translates any characters outside its range into what it believes are equivalent invariant characters. This policy can be useful for maintaining one set of string behavior across cultures, but it often provides unexpected results.

Case-insensitive comparisons with the invariant culture use the static [System.Globalization.CultureInfo.CompareInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CompareInfo) property returned by the static [System.Globalization.CultureInfo.InvariantCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture) property for comparison information as well. Any case differences among these translated characters are ignored.

Comparisons that use [System.StringComparison.InvariantCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.InvariantCulture) and [System.StringComparison.Ordinal](https://learn.microsoft.com/search/?terms=System.StringComparison.Ordinal) work identically on ASCII strings. However, [System.StringComparison.InvariantCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.InvariantCulture) makes linguistic decisions that might not be appropriate for strings that have to be interpreted as a set of bytes. The `CultureInfo.InvariantCulture.CompareInfo` object makes the [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*) method interpret certain sets of characters as equivalent. For example, the following equivalence is valid under the invariant culture:

InvariantCulture: a + ̊ = å

The LATIN SMALL LETTER A character "a"  (\u0061), when it's next to the COMBINING RING ABOVE character "+ " ̊" (\u030a), is interpreted as the LATIN SMALL LETTER A WITH RING ABOVE character "å" (\u00e5). As the following example shows, this behavior differs from ordinal comparison.

[language="csharp" source="./snippets/best-practices-strings/csharp/comparison3/Program.cs"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/comparison3/Program.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/comparison3/Program.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/comparison3/Program.vb"::: (complete source file; reference: ./snippets/best-practices-strings/vb/comparison3/Program.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/comparison3/Program.vb.md)

When interpreting file names, cookies, or anything else where a combination such as "å" can appear, ordinal comparisons still offer the most transparent and fitting behavior.

On balance, the invariant culture has few properties that make it useful for comparison. It does comparison in a linguistically relevant manner, which prevents it from guaranteeing full symbolic equivalence, but it isn't the choice for display in any culture. One of the few reasons to use [System.StringComparison.InvariantCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.InvariantCulture) for comparison is to persist ordered data for a cross-culturally identical display. For example, if a large data file that contains a list of sorted identifiers for display accompanies an application, adding to this list would require an insertion with invariant-style sorting.

## How to choose a StringComparison member

The following table outlines the mapping from semantic string context to a [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) enumeration member:

| Data | Behavior | Corresponding System.StringComparison<br /><br /> value |
| --- | --- | --- |
| Case-sensitive internal identifiers.<br /><br /> Case-sensitive identifiers in standards such as XML and HTTP.<br /><br /> Case-sensitive security-related settings. | A non-linguistic identifier, where bytes match exactly. | [System.StringComparison.Ordinal](https://learn.microsoft.com/search/?terms=System.StringComparison.Ordinal) |
| Case-insensitive internal identifiers.<br /><br /> Case-insensitive identifiers in standards such as XML and HTTP.<br /><br /> File paths.<br /><br /> Registry keys and values.<br /><br /> Environment variables.<br /><br /> Resource identifiers (for example, handle names).<br /><br /> Case-insensitive security-related settings. | A non-linguistic identifier, where case is irrelevant. | [System.StringComparison.OrdinalIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.OrdinalIgnoreCase) |
| Some persisted, linguistically relevant data.<br /><br /> Display of linguistic data that requires a fixed sort order. | Culturally agnostic data that still is linguistically relevant. | [System.StringComparison.InvariantCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.InvariantCulture)<br /><br /> -or-<br /><br /> [System.StringComparison.InvariantCultureIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.InvariantCultureIgnoreCase) |
| Data displayed to the user.<br /><br /> Most user input. | Data that requires local linguistic customs. | [System.StringComparison.CurrentCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCulture)<br /><br /> -or-<br /><br /> [System.StringComparison.CurrentCultureIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCultureIgnoreCase) |

## Security implications

If your app uses string APIs for filtering or access control, use ordinal comparisons. Linguistic comparisons based on the current culture can produce unexpected results that vary by platform and locale. Code patterns like the following might be susceptible to security exploits:

[language="csharp" source="./snippets/best-practices-strings/csharp/everythingelse/Program.cs" id="html_example"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/everythingelse/Program.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/everythingelse/Program.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/everythingelse/Program.vb" id="html_example"::: (complete source file; reference: ./snippets/best-practices-strings/vb/everythingelse/Program.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/everythingelse/Program.vb.md)

Because the `string.IndexOf(string)` method uses a linguistic search by default, it's possible for a string to contain a literal `'<'` or `'&'` character and for `string.IndexOf(string)` to return `-1`, indicating that the search substring wasn't found. Code analysis rules CA1307 and CA1309 flag such call sites and alert the developer that there's a potential problem.

## Common string comparison methods in .NET

The following sections describe the methods that are most commonly used for string comparison.

### `String.Compare`

Default interpretation: [System.StringComparison.CurrentCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCulture).

As the operation most central to string interpretation, all instances of these method calls should be examined to determine whether strings should be interpreted according to the current culture, or dissociated from the culture (symbolically). Typically, it's the latter, and a [System.StringComparison.Ordinal](https://learn.microsoft.com/search/?terms=System.StringComparison.Ordinal) comparison should be used instead.

The [System.Globalization.CompareInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CompareInfo) class, which is returned by the [System.Globalization.CultureInfo.CompareInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CompareInfo) property, also includes a [System.Globalization.CompareInfo.Compare*](https://learn.microsoft.com/search/?terms=System.Globalization.CompareInfo.Compare*) method that provides a large number of matching options (ordinal, ignoring white space, ignoring kana type, and so on) by means of the [System.Globalization.CompareOptions](https://learn.microsoft.com/search/?terms=System.Globalization.CompareOptions) flag enumeration.

### `String.CompareTo`

Default interpretation: [System.StringComparison.CurrentCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCulture).

This method doesn't currently offer an overload that specifies a [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) type. It's usually possible to convert this method to the recommended [System.String.Compare%28System.String%2CSystem.String%2CSystem.StringComparison%29](https://learn.microsoft.com/search/?terms=System.String.Compare%2528System.String%252CSystem.String%252CSystem.StringComparison%2529) form.

Types that implement the [System.IComparable](https://learn.microsoft.com/search/?terms=System.IComparable) and [System.IComparable`1](https://learn.microsoft.com/search/?terms=System.IComparable%601) interfaces implement this method. Because it doesn't offer the option of a [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) parameter, implementing types often let the user specify a [System.StringComparer](https://learn.microsoft.com/search/?terms=System.StringComparer) in their constructor. The following example defines a `FileName` class whose class constructor includes a [System.StringComparer](https://learn.microsoft.com/search/?terms=System.StringComparer) parameter. This [System.StringComparer](https://learn.microsoft.com/search/?terms=System.StringComparer) object is then used in the `FileName.CompareTo` method.

[language="csharp" source="./snippets/best-practices-strings/csharp/stringcomparer/Program.cs" id="class"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/stringcomparer/Program.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/stringcomparer/Program.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/stringcomparer/Program.vb" id="class"::: (complete source file; reference: ./snippets/best-practices-strings/vb/stringcomparer/Program.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/stringcomparer/Program.vb.md)

### `String.Equals`

Default interpretation: [System.StringComparison.Ordinal](https://learn.microsoft.com/search/?terms=System.StringComparison.Ordinal).

The [System.String](https://learn.microsoft.com/search/?terms=System.String) class lets you test for equality by calling either the static or instance [System.String.Equals*](https://learn.microsoft.com/search/?terms=System.String.Equals*) method overloads, or by using the static equality operator. The overloads and operator use ordinal comparison by default. However, we still recommend that you call an overload that explicitly specifies the [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) type even if you want to perform an ordinal comparison; this makes it easier to search code for a certain string interpretation.

### `String.ToUpper` and `String.ToLower`

Default interpretation: [System.StringComparison.CurrentCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCulture).

Be careful when you use the [System.String.ToUpper](https://learn.microsoft.com/search/?terms=System.String.ToUpper) and [System.String.ToLower](https://learn.microsoft.com/search/?terms=System.String.ToLower) methods, because forcing a string to uppercase or lowercase is often used as a small normalization for comparing strings regardless of case. If so, consider using a case-insensitive comparison.

The [System.String.ToUpperInvariant*](https://learn.microsoft.com/search/?terms=System.String.ToUpperInvariant*) and [System.String.ToLowerInvariant*](https://learn.microsoft.com/search/?terms=System.String.ToLowerInvariant*) methods are also available. [System.String.ToUpperInvariant*](https://learn.microsoft.com/search/?terms=System.String.ToUpperInvariant*) is the standard way to normalize case. Comparisons made using [System.StringComparison.OrdinalIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.OrdinalIgnoreCase) are behaviorally the composition of two calls: calling [System.String.ToUpperInvariant*](https://learn.microsoft.com/search/?terms=System.String.ToUpperInvariant*) on both string arguments, and doing a comparison using [System.StringComparison.Ordinal](https://learn.microsoft.com/search/?terms=System.StringComparison.Ordinal).

Overloads are also available for converting to uppercase and lowercase in a specific culture, by passing a [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) object that represents that culture to the method.

### `Char.ToUpper` and `Char.ToLower`

Default interpretation: [System.StringComparison.CurrentCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCulture).

The [System.Char.ToUpper(System.Char)](https://learn.microsoft.com/search/?terms=System.Char.ToUpper(System.Char)) and [System.Char.ToLower(System.Char)](https://learn.microsoft.com/search/?terms=System.Char.ToLower(System.Char)) methods work similarly to the [System.String.ToUpper](https://learn.microsoft.com/search/?terms=System.String.ToUpper) and [System.String.ToLower](https://learn.microsoft.com/search/?terms=System.String.ToLower) methods described in the previous section.

### `String.StartsWith` and `String.EndsWith`

Default interpretation: [System.StringComparison.CurrentCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCulture) (when the first parameter is a `string`), or [System.StringComparison.Ordinal](https://learn.microsoft.com/search/?terms=System.StringComparison.Ordinal) (when the first parameter is a `char`).

There's an inconsistency in how the default overloads of these methods perform comparisons. Overloads that accept a `char` parameter perform an ordinal comparison, but overloads that accept a `string` parameter perform a culture-sensitive comparison and may ignore non-printing characters.

### `String.IndexOf` and `String.LastIndexOf`

Default interpretation: [System.StringComparison.CurrentCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCulture).

There's a lack of consistency in how the default overloads of these methods perform comparisons. All [System.String.IndexOf*](https://learn.microsoft.com/search/?terms=System.String.IndexOf*) and [System.String.LastIndexOf*](https://learn.microsoft.com/search/?terms=System.String.LastIndexOf*) methods that include a [System.Char](https://learn.microsoft.com/search/?terms=System.Char) parameter perform an ordinal comparison, but the default [System.String.IndexOf*](https://learn.microsoft.com/search/?terms=System.String.IndexOf*) and [System.String.LastIndexOf*](https://learn.microsoft.com/search/?terms=System.String.LastIndexOf*) methods that include a [System.String](https://learn.microsoft.com/search/?terms=System.String) parameter perform a culture-sensitive comparison.

If you call the [System.String.IndexOf%28System.String%29](https://learn.microsoft.com/search/?terms=System.String.IndexOf%2528System.String%2529) or [System.String.LastIndexOf%28System.String%29](https://learn.microsoft.com/search/?terms=System.String.LastIndexOf%2528System.String%2529) method and pass it a string to locate in the current instance, we recommend that you call an overload that explicitly specifies the [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) type. The overloads that include a [System.Char](https://learn.microsoft.com/search/?terms=System.Char) argument don't allow you to specify a [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) type.

### `String.Contains`

Default interpretation: [System.StringComparison.Ordinal](https://learn.microsoft.com/search/?terms=System.StringComparison.Ordinal).

Unlike [System.String.IndexOf*](https://learn.microsoft.com/search/?terms=System.String.IndexOf*), the [System.String.Contains*](https://learn.microsoft.com/search/?terms=System.String.Contains*) method uses an ordinal comparison by default for both `char` and `string` overloads. However, you should still pass an explicit [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) argument when the intent matters, to make the behavior clear at the call site.

### `MemoryExtensions.AsSpan.IndexOfAny` and the `SearchValues<T>` type

.NET 8 introduced the [System.Buffers.SearchValues`1](https://learn.microsoft.com/search/?terms=System.Buffers.SearchValues%601) type, which provides an optimized solution for searching for specific sets of characters or bytes within spans.

If you're comparing a string against a fixed set of known values repeatedly, consider using the [System.Buffers.SearchValues`1.Contains(`0)](https://learn.microsoft.com/search/?terms=System.Buffers.SearchValues%601.Contains(%600)) method instead of chained comparisons or LINQ-based approaches. `SearchValues<T>` can precompute internal lookup structures and optimize the comparison logic based on the provided values. To see performance benefits, create and cache the `SearchValues<string>` instance once, then reuse it for comparisons:

[language="csharp" source="./snippets/best-practices-strings/csharp/everythingelse/Buffers.cs"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/everythingelse/Buffers.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/everythingelse/Buffers.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/everythingelse/Buffers.vb"::: (complete source file; reference: ./snippets/best-practices-strings/vb/everythingelse/Buffers.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/everythingelse/Buffers.vb.md)

In .NET 9, `SearchValues` was extended to support searching for substrings within a larger string. For an example, see [`SearchValues` expansion](../../core/whats-new/dotnet-9/libraries.md#searchvalues-expansion).

## Methods that perform string comparison indirectly

Some non-string methods that have string comparison as a central operation use the [System.StringComparer](https://learn.microsoft.com/search/?terms=System.StringComparer) type. The [System.StringComparer](https://learn.microsoft.com/search/?terms=System.StringComparer) class includes six static properties that return [System.StringComparer](https://learn.microsoft.com/search/?terms=System.StringComparer) instances whose [System.StringComparer.Compare*](https://learn.microsoft.com/search/?terms=System.StringComparer.Compare*) methods perform the following types of string comparisons:

- Culture-sensitive string comparisons using the current culture. This [System.StringComparer](https://learn.microsoft.com/search/?terms=System.StringComparer) object is returned by the [System.StringComparer.CurrentCulture](https://learn.microsoft.com/search/?terms=System.StringComparer.CurrentCulture) property.
- Case-insensitive comparisons using the current culture. This [System.StringComparer](https://learn.microsoft.com/search/?terms=System.StringComparer) object is returned by the [System.StringComparer.CurrentCultureIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparer.CurrentCultureIgnoreCase) property.
- Culture-insensitive comparisons using the word comparison rules of the invariant culture. This [System.StringComparer](https://learn.microsoft.com/search/?terms=System.StringComparer) object is returned by the [System.StringComparer.InvariantCulture](https://learn.microsoft.com/search/?terms=System.StringComparer.InvariantCulture) property.
- Case-insensitive and culture-insensitive comparisons using the word comparison rules of the invariant culture. This [System.StringComparer](https://learn.microsoft.com/search/?terms=System.StringComparer) object is returned by the [System.StringComparer.InvariantCultureIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparer.InvariantCultureIgnoreCase) property.
- Ordinal comparison. This [System.StringComparer](https://learn.microsoft.com/search/?terms=System.StringComparer) object is returned by the [System.StringComparer.Ordinal](https://learn.microsoft.com/search/?terms=System.StringComparer.Ordinal) property.
- Case-insensitive ordinal comparison. This [System.StringComparer](https://learn.microsoft.com/search/?terms=System.StringComparer) object is returned by the [System.StringComparer.OrdinalIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparer.OrdinalIgnoreCase) property.

### `Array.Sort` and `Array.BinarySearch`

Default interpretation: [System.StringComparison.CurrentCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCulture).

When you store any data in a collection, or read persisted data from a file or database into a collection, switching the current culture can invalidate the invariants in the collection. The [System.Array.BinarySearch*](https://learn.microsoft.com/search/?terms=System.Array.BinarySearch*) method assumes that the elements in the array to be searched are already sorted. To sort any string element in the array, the [System.Array.Sort*](https://learn.microsoft.com/search/?terms=System.Array.Sort*) method calls the [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*) method to order individual elements. Using a culture-sensitive comparer can be dangerous if the culture changes between the time that the array is sorted and its contents are searched. For example, in the following code, storage and retrieval operate on the comparer that is provided implicitly by the `Thread.CurrentThread.CurrentCulture` property. If the culture can change between the calls to `StoreNames` and `DoesNameExist`, and especially if the array contents are persisted somewhere between the two method calls, the binary search may fail.

[language="csharp" source="./snippets/best-practices-strings/csharp/indirect1/binarysearch.cs" id="no_compare" highlight="11,15"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/indirect1/binarysearch.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/indirect1/binarysearch.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/indirect1/binarysearch.vb" id="no_compare" highlight="10,14"::: (complete source file; reference: ./snippets/best-practices-strings/vb/indirect1/binarysearch.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/indirect1/binarysearch.vb.md)

A recommended variation appears in the following example, which uses the same ordinal (culture-insensitive) comparison method both to sort and to search the array. The change code is reflected in the lines labeled `Line A` and `Line B` in the two examples.

[language="csharp" source="./snippets/best-practices-strings/csharp/indirect1/binarysearch.cs" id="ordinal" highlight="11,15"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/indirect1/binarysearch.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/indirect1/binarysearch.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/indirect1/binarysearch.vb" id="ordinal" highlight="10,14"::: (complete source file; reference: ./snippets/best-practices-strings/vb/indirect1/binarysearch.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/indirect1/binarysearch.vb.md)

If this data is persisted and moved across cultures, and sorting is used to present this data to the user, you might consider using [System.StringComparison.InvariantCulture](https://learn.microsoft.com/search/?terms=System.StringComparison.InvariantCulture), which operates linguistically for better user output but is unaffected by changes in culture. The following example modifies the two previous examples to use the invariant culture for sorting and searching the array.

[language="csharp" source="./snippets/best-practices-strings/csharp/indirect1/binarysearch.cs" id="invariant" highlight="11,15"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/indirect1/binarysearch.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/indirect1/binarysearch.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/indirect1/binarysearch.vb" id="invariant" highlight="10,14"::: (complete source file; reference: ./snippets/best-practices-strings/vb/indirect1/binarysearch.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/indirect1/binarysearch.vb.md)

### Collections example: `Hashtable` constructor

Hashing strings provides a second example of an operation that is affected by the way in which strings are compared.

The following example instantiates a [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable) object by passing it the [System.StringComparer](https://learn.microsoft.com/search/?terms=System.StringComparer) object that is returned by the [System.StringComparer.OrdinalIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparer.OrdinalIgnoreCase) property. Because a class [System.StringComparer](https://learn.microsoft.com/search/?terms=System.StringComparer) that is derived from [System.StringComparer](https://learn.microsoft.com/search/?terms=System.StringComparer) implements the [System.Collections.IEqualityComparer](https://learn.microsoft.com/search/?terms=System.Collections.IEqualityComparer) interface, its [System.Collections.IEqualityComparer.GetHashCode*](https://learn.microsoft.com/search/?terms=System.Collections.IEqualityComparer.GetHashCode*) method is used to compute the hash code of strings in the hash table.

[language="csharp" source="./snippets/best-practices-strings/csharp/indirect1/Program.cs"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/indirect1/Program.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/indirect1/Program.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/indirect1/Program.vb"::: (complete source file; reference: ./snippets/best-practices-strings/vb/indirect1/Program.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/indirect1/Program.vb.md)

### Collections example: `SortedSet<T>` and `List<T>.Sort`

The same locale-sensitivity issue applies when instantiating a sorted collection of strings or sorting an existing string-based collection. Always specify an explicit comparer:

[language="csharp" source="./snippets/best-practices-strings/csharp/everythingelse/DemoSorting.cs" id="code"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/everythingelse/DemoSorting.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/everythingelse/DemoSorting.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/everythingelse/DemoSorting.vb" id="code"::: (complete source file; reference: ./snippets/best-practices-strings/vb/everythingelse/DemoSorting.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/everythingelse/DemoSorting.vb.md)

## Differences between .NET and .NET Framework

.NET and .NET Framework handle globalization differently. .NET Framework on Windows uses the operating system's [National Language Support (NLS)](https://learn.microsoft.com/windows/win32/intl/national-language-support) facility for linguistic string comparisons. .NET uses the [International Components for Unicode (ICU)](https://icu.unicode.org/) library for linguistic string comparisons on all supported platforms.

Because ICU and NLS implement different logic in their linguistic comparers, the results of string methods that use culture-sensitive comparison can differ between .NET and .NET Framework. This matters for any method that uses a linguistic comparer by default, including:

- [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*)
- [System.String.EndsWith*](https://learn.microsoft.com/search/?terms=System.String.EndsWith*) (when the first parameter is a `string`)
- [System.String.IndexOf*](https://learn.microsoft.com/search/?terms=System.String.IndexOf*) (when the first parameter is a `string`)
- [System.String.StartsWith*](https://learn.microsoft.com/search/?terms=System.String.StartsWith*) (when the first parameter is a `string`)
- [System.String.ToLower*](https://learn.microsoft.com/search/?terms=System.String.ToLower*)
- [System.String.ToLowerInvariant*](https://learn.microsoft.com/search/?terms=System.String.ToLowerInvariant*)
- [System.String.ToUpper*](https://learn.microsoft.com/search/?terms=System.String.ToUpper*)
- [System.String.ToUpperInvariant*](https://learn.microsoft.com/search/?terms=System.String.ToUpperInvariant*)
- [System.Globalization.TextInfo](https://learn.microsoft.com/search/?terms=System.Globalization.TextInfo) (most members)
- [System.Globalization.CompareInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CompareInfo) (most members)
- [System.Array.Sort*](https://learn.microsoft.com/search/?terms=System.Array.Sort*) (when sorting arrays of strings)
- [System.Collections.Generic.List`1.Sort](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601.Sort) (when the list elements are strings)
- [System.Collections.Generic.SortedDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedDictionary%602) (when the keys are strings)
- [System.Collections.Generic.SortedList`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedList%602) (when the keys are strings)
- [System.Collections.Generic.SortedSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.SortedSet%601) (when the set contains strings)

> **Note:**
> This is not an exhaustive list of affected APIs.

One notable difference is the handling of embedded null and other control characters. When you use a linguistic comparer under NLS, some control characters such as the null character (`\0`) might be treated as ignorable in certain comparison contexts. Under ICU, these characters are treated as actual characters in the string. This can cause `string.IndexOf(string)` to return different results when the search string contains a null character.

For example, the following code can produce a different answer depending on the current runtime:

[language="csharp" source="./snippets/best-practices-strings/csharp/everythingelse/Program.cs" id="framework_diffs"::: (complete source file; reference: ./snippets/best-practices-strings/csharp/everythingelse/Program.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/csharp/everythingelse/Program.cs.md)
[language="vb" source="./snippets/best-practices-strings/vb/everythingelse/Program.vb" id="framework_diffs"::: (complete source file; reference: ./snippets/best-practices-strings/vb/everythingelse/Program.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-strings/vb/everythingelse/Program.vb.md)

The best way to avoid these cross-platform and cross-implementation surprises is to always pass an explicit [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) argument to string comparison methods, and to use [System.StringComparison.Ordinal](https://learn.microsoft.com/search/?terms=System.StringComparison.Ordinal) or [System.StringComparison.OrdinalIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.OrdinalIgnoreCase) for non-linguistic comparisons.

If you migrate an application from .NET Framework to .NET and rely on legacy NLS behaviors on Windows, you can configure the application to use NLS. For more information, see [.NET globalization and ICU](../../core/extensions/globalization-icu.md).

## See also

- [Globalization in .NET apps](../../core/extensions/globalization.md)
- [.NET globalization and ICU](../../core/extensions/globalization-icu.md)
- [How to compare strings in C#](../../csharp/fundamentals/strings/common-tasks/compare.md)
