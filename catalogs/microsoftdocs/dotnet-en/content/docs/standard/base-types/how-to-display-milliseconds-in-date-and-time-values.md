---
title: "How to: Display Milliseconds in Date and Time Values"
description: In this article, learn how to include a date and time's millisecond component in formatted date and time strings in .NET.
ms.date: "08/01/2022"
ms.custom: devdivchpfy22
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "DateTime.ToString method"
  - "displaying date and time data"
  - "time [.NET], milliseconds"
  - "dates [.NET], milliseconds"
  - "milliseconds [.NET]"
ms.assetid: ae1a0610-90b9-4877-8eb6-4e30bc5e00cf
---
# How to: Display milliseconds in date and time values

The default date and time formatting methods, such as [System.DateTime.ToString](https://learn.microsoft.com/search/?terms=System.DateTime.ToString), include the hours, minutes, and seconds of a time value but exclude its milliseconds component. This article shows how to include a date and time's millisecond component in formatted date and time strings.

## To display the millisecond component of a DateTime value

1. If you're working with the string representation of a date, convert it to a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) or a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value by using the static [System.DateTime.Parse%28System.String%29](https://learn.microsoft.com/search/?terms=System.DateTime.Parse%2528System.String%2529) or [System.DateTimeOffset.Parse%28System.String%29](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.Parse%2528System.String%2529) method.

1. To extract the string representation of a time's millisecond component, call the date and time value's [System.DateTime.ToString%28System.String%29](https://learn.microsoft.com/search/?terms=System.DateTime.ToString%2528System.String%2529) or [System.DateTimeOffset.ToString*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ToString*) method, and pass the `fff` or `FFF` custom format pattern alone or with other custom format specifiers as the `format` parameter.

> **Tip:**
> The [System.Globalization.NumberFormatInfo.NumberDecimalSeparator](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo.NumberDecimalSeparator) property specifies the millisecond separator.

## Example

The example displays the millisecond component of a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value to the console, alone and included in a longer date and time string.

[language="csharp" source="snippets/how-to-display-milliseconds-in-date-and-time-values/csharp/Program.cs" id="Main"::: (complete source file; reference: snippets/how-to-display-milliseconds-in-date-and-time-values/csharp/Program.cs)](../../../_code/docs/standard/base-types/snippets/how-to-display-milliseconds-in-date-and-time-values/csharp/Program.cs.md)
[language="vb" source="snippets/how-to-display-milliseconds-in-date-and-time-values/vb/Program.vb" id="Main"::: (complete source file; reference: snippets/how-to-display-milliseconds-in-date-and-time-values/vb/Program.vb)](../../../_code/docs/standard/base-types/snippets/how-to-display-milliseconds-in-date-and-time-values/vb/Program.vb.md)

The `fff` format pattern includes any trailing zeros in the millisecond value. The `FFF` format pattern suppresses them. The following example illustrates the difference:

[language="csharp" source="snippets/how-to-display-milliseconds-in-date-and-time-values/csharp/Program.cs" id="TrailingZero"::: (complete source file; reference: snippets/how-to-display-milliseconds-in-date-and-time-values/csharp/Program.cs)](../../../_code/docs/standard/base-types/snippets/how-to-display-milliseconds-in-date-and-time-values/csharp/Program.cs.md)
[language="vb" source="snippets/how-to-display-milliseconds-in-date-and-time-values/vb/Program.vb" id="TrailingZero"::: (complete source file; reference: snippets/how-to-display-milliseconds-in-date-and-time-values/vb/Program.vb)](../../../_code/docs/standard/base-types/snippets/how-to-display-milliseconds-in-date-and-time-values/vb/Program.vb.md)

A problem with defining a complete custom format specifier that includes the millisecond component of a date and time is that it defines a hard-coded format that might not correspond to the arrangement of time elements in the application's current culture. A better alternative is to retrieve one of the date and time display patterns defined by the current culture's [System.Globalization.DateTimeFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo) object and modify it to include milliseconds. The example also illustrates this approach. It retrieves the current culture's full date and time pattern from the [System.Globalization.DateTimeFormatInfo.FullDateTimePattern](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo.FullDateTimePattern) property and then inserts the custom pattern `fff` along with the current culture's millisecond separator. The example uses a regular expression to do this operation in a single method call.

You can also use a custom format specifier to display a fractional part of seconds other than milliseconds. For example, the `f` or `F` custom format specifier displays tenths of a second, the `ff` or `FF` custom format specifier displays hundredths of a second, and the `ffff` or `FFFF` custom format specifier displays ten-thousandths of a second. Fractional parts of a millisecond are truncated instead of rounded in the returned string. These format specifiers are used in the following example:

[language="csharp" source="snippets/how-to-display-milliseconds-in-date-and-time-values/csharp/Program.cs" id="Fraction"::: (complete source file; reference: snippets/how-to-display-milliseconds-in-date-and-time-values/csharp/Program.cs)](../../../_code/docs/standard/base-types/snippets/how-to-display-milliseconds-in-date-and-time-values/csharp/Program.cs.md)
[language="vb" source="snippets/how-to-display-milliseconds-in-date-and-time-values/vb/Program.vb" id="Fraction"::: (complete source file; reference: snippets/how-to-display-milliseconds-in-date-and-time-values/vb/Program.vb)](../../../_code/docs/standard/base-types/snippets/how-to-display-milliseconds-in-date-and-time-values/vb/Program.vb.md)

> **Note:**
> It's possible to display very small fractional units of a second, such as ten-thousandths of a second or hundred-thousandths of a second. However, these values might not be meaningful. The precision of a date and time value depends on the resolution of the operating system clock. For more information, see the API your operating system uses:
>
> - Windows 7: [GetSystemTimeAsFileTime](https://learn.microsoft.com/windows/win32/api/sysinfoapi/nf-sysinfoapi-GetSystemTimeAsFileTime)
> - Windows 8 and above: [GetSystemTimePreciseAsFileTime](https://learn.microsoft.com/windows/win32/api/sysinfoapi/nf-sysinfoapi-getsystemtimepreciseasfiletime)
> - Linux and macOS: [clock_gettime](https://linux.die.net/man/3/clock_gettime)

## See also

- [System.Globalization.DateTimeFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo)
- [Custom date and time format strings](custom-date-and-time-format-strings.md)
