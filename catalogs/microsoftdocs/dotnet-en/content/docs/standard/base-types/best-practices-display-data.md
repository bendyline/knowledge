---
title: Best practices for displaying and persisting formatted data in .NET
description: Learn how to display and persist numeric and date data effectively in .NET applications.
ms.date: 05/01/2019
ms.topic: best-practice
dev_langs:
  - "csharp"
  - "vb"
---
# Best practices for displaying and persisting formatted data

This article examines how formatted data, such as numeric data and date-and-time data, is handled for display and for storage.

When you develop with .NET, use culture-sensitive formatting to display non-string data, such as numbers and dates, in a user interface. Use formatting with the [invariant culture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture) to persist non-string data in string form. Do not use culture-sensitive formatting to persist numeric or date-and-time data in string form.

## Display formatted data

When you display non-string data such as numbers and dates and times to users, format them by using the user's cultural settings. By default, the following all use the current culture in formatting operations:

- Interpolated strings supported by the [C#](../../csharp/language-reference/tokens/interpolated.md) and [Visual Basic](../../visual-basic/programming-guide/language-features/strings/interpolated-strings.md) compilers.
- String concatenation operations that use the [C#](../../csharp/language-reference/operators/addition-operator.md#string-concatenation) or [Visual Basic](../../visual-basic/programming-guide/language-features/operators-and-expressions/concatenation-operators.md) concatenation operators or that call the [System.String.Concat*](https://learn.microsoft.com/search/?terms=System.String.Concat*) method directly.
- The [System.String.Format*](https://learn.microsoft.com/search/?terms=System.String.Format*) method.
- The `ToString` methods of the numeric types and the date and time types.

To explicitly specify that a string should be formatted by using the conventions of a designated culture or the [invariant culture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture), you can do the following:

- When using the [System.String.Format*](https://learn.microsoft.com/search/?terms=System.String.Format*) and `ToString` methods, call an overload that has a `provider` parameter, such as [System.String.Format%28System.IFormatProvider%2CSystem.String%2CSystem.Object%5B%5D%29](https://learn.microsoft.com/search/?terms=System.String.Format%2528System.IFormatProvider%252CSystem.String%252CSystem.Object%255B%255D%2529) or [System.DateTime.ToString%28System.IFormatProvider%29](https://learn.microsoft.com/search/?terms=System.DateTime.ToString%2528System.IFormatProvider%2529), and pass it the [System.Globalization.CultureInfo.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture) property, a [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) instance that represents the desired culture, or the [System.Globalization.CultureInfo.InvariantCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture) property.

- For string concatenation, do not allow the compiler to perform any implicit conversions. Instead, perform an explicit conversion by calling a `ToString` overload that has a `provider` parameter. For example, the compiler implicitly uses the current culture when converting a [System.Double](https://learn.microsoft.com/search/?terms=System.Double) value to a string in the following code:

  [Implicit String Conversion (complete source file; reference: ./snippets/best-practices-display-data/csharp/tostring/Program.cs#1)](../../../_code/docs/standard/base-types/snippets/best-practices-display-data/csharp/tostring/Program.cs.md)
  [Implicit String Conversion (complete source file; reference: ./snippets/best-practices-display-data/vb/tostring/Program.vb#1)](../../../_code/docs/standard/base-types/snippets/best-practices-display-data/vb/tostring/Program.vb.md)

  Instead, you can explicitly specify the culture whose formatting conventions are used in the conversion by calling the [System.Double.ToString(System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.Double.ToString(System.IFormatProvider)) method, as the following code does:

  [Explicit String Conversion (complete source file; reference: ./snippets/best-practices-display-data/csharp/tostring/Program.cs#2)](../../../_code/docs/standard/base-types/snippets/best-practices-display-data/csharp/tostring/Program.cs.md)
  [Implicit String Conversion (complete source file; reference: ./snippets/best-practices-display-data/vb/tostring/Program.vb#2)](../../../_code/docs/standard/base-types/snippets/best-practices-display-data/vb/tostring/Program.vb.md)

- For string interpolation, rather than assigning an interpolated string to a [System.String](https://learn.microsoft.com/search/?terms=System.String) instance, assign it to a [System.FormattableString](https://learn.microsoft.com/search/?terms=System.FormattableString). You can then call its [System.FormattableString.ToString](https://learn.microsoft.com/search/?terms=System.FormattableString.ToString) method to produce a result string that reflects the conventions of the current culture, or you can call the [System.FormattableString.ToString(System.IFormatProvider)](https://learn.microsoft.com/search/?terms=System.FormattableString.ToString(System.IFormatProvider)) method to produce a result string that reflects the conventions of a specified culture.

  You can also pass the formattable string to the static [System.FormattableString.Invariant*](https://learn.microsoft.com/search/?terms=System.FormattableString.Invariant*) method to produce a result string that reflects the conventions of the invariant culture. The following example illustrates this approach. (The output from the example reflects a current culture of `en-US`.)

  [String interpolation (complete source file; reference: ./snippets/best-practices-display-data/csharp/formattable/Program.cs)](../../../_code/docs/standard/base-types/snippets/best-practices-display-data/csharp/formattable/Program.cs.md)
  [String interpolation (complete source file; reference: ./snippets/best-practices-display-data/vb/formattable/Program.vb)](../../../_code/docs/standard/base-types/snippets/best-practices-display-data/vb/formattable/Program.vb.md)

  > **Note:**
  > If you're using C# and formatting using the invariant culture, it's more performant to call [System.String.Create(System.IFormatProvider,System.Runtime.CompilerServices.DefaultInterpolatedStringHandler@)](https://learn.microsoft.com/search/?terms=System.String.Create(System.IFormatProvider%2CSystem.Runtime.CompilerServices.DefaultInterpolatedStringHandler%40)) and pass [System.Globalization.CultureInfo.InvariantCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture) for the first parameter. For more information, see [String interpolation in C# 10 and .NET 6](https://devblogs.microsoft.com/dotnet/string-interpolation-in-c-10-and-net-6/).

## Persist formatted data

You can persist non-string data either as binary data or as formatted data. If you choose to save it as formatted data, you should call a formatting method overload that includes a `provider` parameter and pass it the [System.Globalization.CultureInfo.InvariantCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture) property. The invariant culture provides a consistent format for formatted data that is independent of culture and machine. In contrast, persisting data that is formatted by using cultures other than the invariant culture has a number of limitations:

- The data is likely to be unusable if it is retrieved on a system that has a different culture, or if the user of the current system changes the current culture and tries to retrieve the data.
- The properties of a culture on a specific computer can differ from standard values. At any time, a user can customize culture-sensitive display settings. Because of this, formatted data that is saved on a system may not be readable after the user customizes cultural settings. The portability of formatted data across computers is likely to be even more limited.
- International, regional, or national standards that govern the formatting of numbers or dates and times change over time, and these changes are incorporated into Windows operating system updates. When formatting conventions change, data that was formatted by using the previous conventions may become unreadable.

The following example illustrates the limited portability that results from using culture-sensitive formatting to persist data. The example saves an array of date and time values to a file. These are formatted by using the conventions of the English (United States) culture. After the application changes the current culture to French (Switzerland), it tries to read the saved values by using the formatting conventions of the current culture. The attempt to read two of the data items throws a [System.FormatException](https://learn.microsoft.com/search/?terms=System.FormatException) exception, and the array of dates now contains two incorrect elements that are equal to [System.DateTime.MinValue](https://learn.microsoft.com/search/?terms=System.DateTime.MinValue).

[Conceptual.Strings.BestPractices#21 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.strings.bestpractices/cs/persistence.cs#21)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.strings.bestpractices/cs/persistence.cs.md)
[Conceptual.Strings.BestPractices#21 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.strings.bestpractices/vb/persistence.vb#21)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.strings.bestpractices/vb/persistence.vb.md)

However, if you replace the [System.Globalization.CultureInfo.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.CurrentCulture) property with [System.Globalization.CultureInfo.InvariantCulture*](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture*) in the calls to [System.DateTime.ToString%28System.String%2CSystem.IFormatProvider%29](https://learn.microsoft.com/search/?terms=System.DateTime.ToString%2528System.String%252CSystem.IFormatProvider%2529) and [System.DateTime.Parse%28System.String%2CSystem.IFormatProvider%29](https://learn.microsoft.com/search/?terms=System.DateTime.Parse%2528System.String%252CSystem.IFormatProvider%2529), the persisted date and time data is successfully restored, as the following output shows:

```console
06.05.1758 21:26
05.05.1818 07:19
22.04.1870 23:54
08.09.1890 06:47
18.02.1905 15:12
```
