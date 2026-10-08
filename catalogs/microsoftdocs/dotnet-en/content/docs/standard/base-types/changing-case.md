---
title: "Changing case in .NET"
description: Learn how to change in the case of strings in .NET.
ms.date: 08/11/2021
dev_langs:
    - "csharp"
    - "vb"
helpviewer_keywords:
    - "strings [.NET], case"
    - "case sensitivity"
    - "ToUpper method"
    - "ToLower method"
    - "uppercase"
    - "lowercase"
ms.assetid: 6805f81b-e9ad-4387-9f4c-b9bdb21b87c0
---

# Change case in .NET

If you write an application that accepts input from a user, you can never be sure what case (upper or lower) they will use to enter the data. Often, you want strings to be cased consistently, particularly if you are displaying them in the user interface. The following table describes three case-changing methods. The first two methods provide an overload that accepts a culture.

| Method name | Use |
| --- | --- |
| [System.String.ToUpper*](https://learn.microsoft.com/search/?terms=System.String.ToUpper*) | Converts all characters in a string to uppercase. |
| [System.String.ToLower*](https://learn.microsoft.com/search/?terms=System.String.ToLower*) | Converts all characters in a string to lowercase. |
| [System.Globalization.TextInfo.ToTitleCase*](https://learn.microsoft.com/search/?terms=System.Globalization.TextInfo.ToTitleCase*) | Converts a string to title case. |

> **Warning:**
> The [System.String.ToUpper*](https://learn.microsoft.com/search/?terms=System.String.ToUpper*) and [System.String.ToLower*](https://learn.microsoft.com/search/?terms=System.String.ToLower*) methods should not be used to convert strings in order to compare them or test them for equality. For more information, see the [Compare strings of mixed case](#compare-strings-of-mixed-case) section.

## Compare strings of mixed case

To compare strings of mixed case to determine their ordering, call one of the overloads of the [System.String.CompareTo*](https://learn.microsoft.com/search/?terms=System.String.CompareTo*) method with a `comparisonType` parameter, and provide a value of either [System.StringComparison.CurrentCultureIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCultureIgnoreCase), [System.StringComparison.InvariantCultureIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.InvariantCultureIgnoreCase), or [System.StringComparison.OrdinalIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.OrdinalIgnoreCase) for the `comparisonType` argument. For a comparison using a specific culture other than the current culture, call an overload of the [System.String.CompareTo*](https://learn.microsoft.com/search/?terms=System.String.CompareTo*) method with both a `culture` and `options` parameter, and provide a value of [System.Globalization.CompareOptions.IgnoreCase](https://learn.microsoft.com/search/?terms=System.Globalization.CompareOptions.IgnoreCase) as the `options` argument.

To compare strings of mixed case to determine whether they're equal, call one of the overloads of the [System.String.Equals*](https://learn.microsoft.com/search/?terms=System.String.Equals*) method with a `comparisonType` parameter, and provide a value of either [System.StringComparison.CurrentCultureIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.CurrentCultureIgnoreCase), [System.StringComparison.InvariantCultureIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.InvariantCultureIgnoreCase), or [System.StringComparison.OrdinalIgnoreCase](https://learn.microsoft.com/search/?terms=System.StringComparison.OrdinalIgnoreCase) for the `comparisonType` argument.

For more information, see [Best practices for using strings](best-practices-strings.md).

## `ToUpper` method

The [System.String.ToUpper*](https://learn.microsoft.com/search/?terms=System.String.ToUpper*) method changes all characters in a string to uppercase. The following example converts the string "Hello World!" from mixed case to uppercase.

[Strings.ChangingCase#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Strings.ChangingCase/cs/Example.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Strings.ChangingCase/cs/Example.cs.md)
[Strings.ChangingCase#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Strings.ChangingCase/vb/Example.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Strings.ChangingCase/vb/Example.vb.md)

The preceding example is culture-sensitive by default; it applies the casing conventions of the current culture. To perform a culture-insensitive case change or to apply the casing conventions of a particular culture, use the [System.String.ToUpper%28System.Globalization.CultureInfo%29](https://learn.microsoft.com/search/?terms=System.String.ToUpper%2528System.Globalization.CultureInfo%2529) method overload and supply a value of [System.Globalization.CultureInfo.InvariantCulture*](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture*) or a [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) object that represents the specified culture to the `culture` parameter. For an example that demonstrates how to use the [System.String.ToUpper*](https://learn.microsoft.com/search/?terms=System.String.ToUpper*) method to perform a culture-insensitive case change, see [Perform culture-insensitive case changes](../../core/extensions/performing-culture-insensitive-case-changes.md).

## `ToLower` method

The [System.String.ToLower*](https://learn.microsoft.com/search/?terms=System.String.ToLower*) method is similar to the previous method, but instead converts all the characters in a string to lowercase. The following example converts the string "Hello World!" to lowercase.

[Strings.ChangingCase#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Strings.ChangingCase/cs/Example.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Strings.ChangingCase/cs/Example.cs.md)
[Strings.ChangingCase#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Strings.ChangingCase/vb/Example.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Strings.ChangingCase/vb/Example.vb.md)

The preceding example is culture-sensitive by default; it applies the casing conventions of the current culture. To perform a culture-insensitive case change or to apply the casing conventions of a particular culture, use the [System.String.ToLower%28System.Globalization.CultureInfo%29](https://learn.microsoft.com/search/?terms=System.String.ToLower%2528System.Globalization.CultureInfo%2529) method overload and supply a value of [System.Globalization.CultureInfo.InvariantCulture*](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture*) or a [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) object that represents the specified culture to the `culture` parameter. For an example that demonstrates how to use the [System.String.ToLower%28System.Globalization.CultureInfo%29](https://learn.microsoft.com/search/?terms=System.String.ToLower%2528System.Globalization.CultureInfo%2529) method to perform a culture-insensitive case change, see [Perform culture-insensitive case changes](../../core/extensions/performing-culture-insensitive-case-changes.md).

## `ToTitleCase` method

The [System.Globalization.TextInfo.ToTitleCase*](https://learn.microsoft.com/search/?terms=System.Globalization.TextInfo.ToTitleCase*) converts the first character of each word to uppercase and the remaining characters to lowercase. However, words that are entirely uppercase are assumed to be acronyms and are not converted.

The [System.Globalization.TextInfo.ToTitleCase*](https://learn.microsoft.com/search/?terms=System.Globalization.TextInfo.ToTitleCase*) method is culture-sensitive; that is, it uses the casing conventions of a particular culture. In order to call the method, you first retrieve the [System.Globalization.TextInfo](https://learn.microsoft.com/search/?terms=System.Globalization.TextInfo) object that represents the casing conventions of the particular culture from the [System.Globalization.CultureInfo.TextInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.TextInfo) property of a particular culture.

The following example passes each string in an array to the [System.Globalization.TextInfo.ToTitleCase*](https://learn.microsoft.com/search/?terms=System.Globalization.TextInfo.ToTitleCase*) method. The strings include proper title strings as well as acronyms. The strings are converted to title case by using the casing conventions of the English (United States) culture.

[System.Globalization.TextInfo.ToTitleCase#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.globalization.textinfo.totitlecase/cs/totitlecase2.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.globalization.textinfo.totitlecase/cs/totitlecase2.cs.md)
[System.Globalization.TextInfo.ToTitleCase#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.globalization.textinfo.totitlecase/vb/totitlecase2.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.globalization.textinfo.totitlecase/vb/totitlecase2.vb.md)

Note that although it is culture-sensitive, the [System.Globalization.TextInfo.ToTitleCase*](https://learn.microsoft.com/search/?terms=System.Globalization.TextInfo.ToTitleCase*) method does not provide linguistically correct casing rules. For instance, in the previous example, the method converts "a tale of two cities" to "A Tale Of Two Cities". However, the linguistically correct title casing for the en-US culture is "A Tale of Two Cities."

## See also

- [Perform culture-insensitive string operations](../../core/extensions/performing-culture-insensitive-string-operations.md)
