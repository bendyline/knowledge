---
title: "Comparing Strings in .NET"
description: Read about methods to compare strings in .NET. Learn about the Compare, CompareOrdinal, CompareTo, StartsWith, EndsWith, Equals, IndexOf, & LastIndexOf methods.
ms.date: "03/30/2017"
ms.topic: concept-article
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "value comparisons of strings"
  - "LastIndexOf method"
  - "CompareTo method"
  - "IndexOf method"
  - "Compare method"
  - "strings [.NET], comparing"
  - "CompareOrdinal method"
  - "EndsWith method"
  - "Equals method"
  - "StartsWith method"
---

# Compare strings in .NET

.NET provides several methods to compare the values of strings. The following table lists and describes the value-comparison methods.

| Method name | Use |
| --- | --- |
| [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*) | Compares the values of two strings. Returns an integer value. |
| [System.String.CompareOrdinal*](https://learn.microsoft.com/search/?terms=System.String.CompareOrdinal*) | Compares two strings without regard to local culture. Returns an integer value. |
| [System.String.CompareTo*](https://learn.microsoft.com/search/?terms=System.String.CompareTo*) | Compares the current string object to another string. Returns an integer value. |
| [System.String.StartsWith*](https://learn.microsoft.com/search/?terms=System.String.StartsWith*) | Determines whether a string begins with the string passed. Returns a Boolean value. |
| [System.String.EndsWith*](https://learn.microsoft.com/search/?terms=System.String.EndsWith*) | Determines whether a string ends with the string passed. Returns a Boolean value. |
| [System.String.Contains*](https://learn.microsoft.com/search/?terms=System.String.Contains*) | Determines whether a character or string occurs within another string. Returns a Boolean value. |
| [System.String.Equals*](https://learn.microsoft.com/search/?terms=System.String.Equals*) | Determines whether two strings are the same. Returns a Boolean value. |
| [System.String.IndexOf*](https://learn.microsoft.com/search/?terms=System.String.IndexOf*) | Returns the index position of a character or string, starting from the beginning of the string you are examining. Returns an integer value. |
| [System.String.LastIndexOf*](https://learn.microsoft.com/search/?terms=System.String.LastIndexOf*) | Returns the index position of a character or string, starting from the end of the string you are examining. Returns an integer value. |

## `Compare` method

The static [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*) method provides a thorough way of comparing two strings. This method is culturally aware. You can use this function to compare two strings or substrings of two strings. Additionally, overloads are provided that regard or disregard case and cultural variance. The following table shows the three integer values that this method might return.

| Return value | Condition |
| --- | --- |
| A negative integer | The first string precedes the second string in the sort order.<br /><br /> -or-<br /><br /> The first string is `null`. |
| 0 | The first string and the second string are equal.<br /><br /> -or-<br /><br /> Both strings are `null`. |
| A positive integer<br /><br /> -or-<br /><br /> 1 | The first string follows the second string in the sort order.<br /><br /> -or-<br /><br /> The second string is `null`. |

> **Important:**
> The [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*) method is primarily intended for use when ordering or sorting strings. You should not use the [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*) method to test for equality (that is, to explicitly look for a return value of 0 with no regard for whether one string is less than or greater than the other). Instead, to determine whether two strings are equal, use the [System.String.Equals%28System.String%2CSystem.String%2CSystem.StringComparison%29](https://learn.microsoft.com/search/?terms=System.String.Equals%2528System.String%252CSystem.String%252CSystem.StringComparison%2529) method.

 The following example uses the [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*) method to determine the relative values of two strings.

 [Conceptual.String.BasicOps#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/compare.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/compare.cs.md)
 [Conceptual.String.BasicOps#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/compare.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/compare.vb.md)

 This example displays `-1` to the console.

 The preceding example is culture-sensitive by default. To perform a culture-insensitive string comparison, use an overload of the [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*) method that allows you to specify the culture to use by supplying a *culture* parameter. For an example that demonstrates how to use the [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*) method to perform a culture-insensitive comparison, see [Culture-insensitive string comparisons](../../core/extensions/performing-culture-insensitive-string-comparisons.md).

## `CompareOrdinal` method

The [System.String.CompareOrdinal*](https://learn.microsoft.com/search/?terms=System.String.CompareOrdinal*) method compares two string objects without considering the local culture. The return values of this method are identical to the values returned by the `Compare` method in the previous table.

> **Important:**
> The [System.String.CompareOrdinal*](https://learn.microsoft.com/search/?terms=System.String.CompareOrdinal*) method is primarily intended for use when ordering or sorting strings. You should not use the [System.String.CompareOrdinal*](https://learn.microsoft.com/search/?terms=System.String.CompareOrdinal*) method to test for equality (that is, to explicitly look for a return value of 0 with no regard for whether one string is less than or greater than the other). Instead, to determine whether two strings are equal, use the [System.String.Equals%28System.String%2CSystem.String%2CSystem.StringComparison%29](https://learn.microsoft.com/search/?terms=System.String.Equals%2528System.String%252CSystem.String%252CSystem.StringComparison%2529) method.

 The following example uses the `CompareOrdinal` method to compare the values of two strings.

 [Conceptual.String.BasicOps#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/compare.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/compare.cs.md)
 [Conceptual.String.BasicOps#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/compare.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/compare.vb.md)

 This example displays `-32` to the console.

## `CompareTo` method

The [System.String.CompareTo*](https://learn.microsoft.com/search/?terms=System.String.CompareTo*) method compares the string that the current string object encapsulates to another string or object. The return values of this method are identical to the values returned by the [System.String.Compare*](https://learn.microsoft.com/search/?terms=System.String.Compare*) method in the previous table.

> **Important:**
> The [System.String.CompareTo*](https://learn.microsoft.com/search/?terms=System.String.CompareTo*) method is primarily intended for use when ordering or sorting strings. You should not use the [System.String.CompareTo*](https://learn.microsoft.com/search/?terms=System.String.CompareTo*) method to test for equality (that is, to explicitly look for a return value of 0 with no regard for whether one string is less than or greater than the other). Instead, to determine whether two strings are equal, use the [System.String.Equals%28System.String%2CSystem.String%2CSystem.StringComparison%29](https://learn.microsoft.com/search/?terms=System.String.Equals%2528System.String%252CSystem.String%252CSystem.StringComparison%2529) method.

 The following example uses the [System.String.CompareTo*](https://learn.microsoft.com/search/?terms=System.String.CompareTo*) method to compare the `string1` object to the `string2` object.

 [Conceptual.String.BasicOps#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/compare.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/compare.cs.md)
 [Conceptual.String.BasicOps#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/compare.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/compare.vb.md)

 This example displays `-1` to the console.

 All overloads of the [System.String.CompareTo*](https://learn.microsoft.com/search/?terms=System.String.CompareTo*) method perform culture-sensitive and case-sensitive comparisons by default. No overloads of this method are provided that allow you to perform a culture-insensitive comparison. For code clarity, we recommend that you use the `String.Compare` method instead, specifying [System.Globalization.CultureInfo.CurrentCulture*](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture*) for culture-sensitive operations or [System.Globalization.CultureInfo.InvariantCulture*](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture*) for culture-insensitive operations. For examples that demonstrate how to use the `String.Compare` method to perform both culture-sensitive and culture-insensitive comparisons, see [Performing Culture-Insensitive String Comparisons](../../core/extensions/performing-culture-insensitive-string-comparisons.md).

## `Equals` method

The [System.String.Equals*](https://learn.microsoft.com/search/?terms=System.String.Equals*) method can easily determine if two strings are the same. This case-sensitive method returns a `true` or `false` Boolean value. It can be used from an existing class, as illustrated in the next example. The following example uses the `Equals` method to determine whether a string object contains the phrase "Hello World".

 [Conceptual.String.BasicOps#9 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/compare.cs#9)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/compare.cs.md)
 [Conceptual.String.BasicOps#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/compare.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/compare.vb.md)

 This example displays `True` to the console.

 This method can also be used as a static method. The following example compares two string objects using a static method.

 [Conceptual.String.BasicOps#10 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/compare.cs#10)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/compare.cs.md)
 [Conceptual.String.BasicOps#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/compare.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/compare.vb.md)

 This example displays `True` to the console.

## `StartsWith` and `EndsWith` methods

You can use the [System.String.StartsWith*](https://learn.microsoft.com/search/?terms=System.String.StartsWith*) method to determine whether a string object begins with the same characters that encompass another string. This case-sensitive method returns `true` if the current string object begins with the passed string and `false` if it does not. The following example uses this method to determine if a string object begins with "Hello".

 [Conceptual.String.BasicOps#11 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/compare.cs#11)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/compare.cs.md)
 [Conceptual.String.BasicOps#11 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/compare.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/compare.vb.md)

 This example displays `True` to the console.

 The [System.String.EndsWith*](https://learn.microsoft.com/search/?terms=System.String.EndsWith*) method compares a passed string to the characters that exist at the end of the current string object. It also returns a Boolean value. The following example checks the end of a string using the `EndsWith` method.

 [Conceptual.String.BasicOps#12 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/compare.cs#12)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/compare.cs.md)
 [Conceptual.String.BasicOps#12 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/compare.vb#12)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/compare.vb.md)

 This example displays `False` to the console.

## `IndexOf` and `LastIndexOf` methods

You can use the [System.String.IndexOf*](https://learn.microsoft.com/search/?terms=System.String.IndexOf*) method to determine the position of the first occurrence of a particular character within a string. This case-sensitive method starts counting from the beginning of a string and returns the position of a passed character using a zero-based index. If the character cannot be found, a value of –1 is returned.

The following example uses the `IndexOf` method to search for the first occurrence of the '`l`' character in a string.

 [Conceptual.String.BasicOps#13 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/compare.cs#13)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/compare.cs.md)
 [Conceptual.String.BasicOps#13 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/compare.vb#13)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/compare.vb.md)

 This example displays `2` to the console.

 The [System.String.LastIndexOf*](https://learn.microsoft.com/search/?terms=System.String.LastIndexOf*) method is similar to the `String.IndexOf` method except that it returns the position of the last occurrence of a particular character within a string. It is case-sensitive and uses a zero-based index.

 The following example uses the `LastIndexOf` method to search for the last occurrence of the '`l`' character in a string.

 [Conceptual.String.BasicOps#14 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/compare.cs#14)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/compare.cs.md)
 [Conceptual.String.BasicOps#14 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/compare.vb#14)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/compare.vb.md)

 This example displays `9` to the console.

 Both methods are useful when used in conjunction with the [System.String.Remove*](https://learn.microsoft.com/search/?terms=System.String.Remove*) method. You can use either the `IndexOf` or `LastIndexOf` methods to retrieve the position of a character, and then supply that position to the `Remove` method in order to remove a character or a word that begins with that character.

## See also

- [Best practices for using strings in .NET](best-practices-strings.md)
- [Perform culture-insensitive string operations](../../core/extensions/performing-culture-insensitive-string-operations.md)
- [Sorting weight tables](https://www.microsoft.com/download/details.aspx?id=10921) - used by .NET Framework and .NET Core 1.0-3.1 on Windows
- [Default Unicode collation element table](https://www.unicode.org/Public/UCA/latest/allkeys.txt) - used by .NET 5 on all platforms, and by .NET Core on Linux and macOS
