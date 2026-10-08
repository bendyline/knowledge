---
title: "Custom TimeSpan format strings"
description: Understand custom TimeSpan format strings in .NET. A custom format string contains one or more TimeSpan format specifiers & any number of literal characters.
ms.date: "03/30/2017"
ms.topic: reference
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "format specifiers, custom time interval"
  - "format strings"
  - "formatting [.NET], time interval"
  - "custom time interval format strings"
  - "formatting [.NET], time"
  - "custom TimeSpan format strings"
ms.assetid: a63ebf55-7269-416b-b4f5-286f6c03bf0e
---

# Custom TimeSpan format strings

A [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) format string defines the string representation of a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value that results from a formatting operation. A custom format string consists of one or more custom [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) format specifiers along with any number of literal characters. Any string that isn't a [Standard TimeSpan format string](standard-timespan-format-strings.md) is interpreted as a custom [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) format string.

> **Important:**
> The custom [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) format specifiers don't include placeholder separator symbols, such as the symbols that separate days from hours, hours from minutes, or seconds from fractional seconds. Instead, these symbols must be included in the custom format string as string literals. For example, `"dd\.hh\:mm"` defines a period (.) as the separator between days and hours, and a colon (:) as the separator between hours and minutes.
>
> Custom [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) format specifiers also don't include a sign symbol that enables you to differentiate between negative and positive time intervals. To include a sign symbol, you have to construct a format string by using conditional logic. The [Other characters](#other-characters) section includes an example.

The string representations of [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) values are produced by calls to the overloads of the [System.TimeSpan.ToString*](https://learn.microsoft.com/search/?terms=System.TimeSpan.ToString*) method, and by methods that support composite formatting, such as [System.String.Format*](https://learn.microsoft.com/search/?terms=System.String.Format*). For more information, see [Formatting Types](formatting-types.md) and [Composite Formatting](composite-formatting.md). The following example illustrates the use of custom format strings in formatting operations.

[Conceptual.TimeSpan.Custom#1 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customformatexample1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customformatexample1.cs.md)
[Conceptual.TimeSpan.Custom#1 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customformatexample1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customformatexample1.vb.md)

Custom [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) format strings are also used by the [System.TimeSpan.ParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.ParseExact*) and [System.TimeSpan.TryParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.TryParseExact*) methods to define the required format of input strings for parsing operations. (Parsing converts the string representation of a value to that value.) The following example illustrates the use of standard format strings in parsing operations.

[Conceptual.TimeSpan.Custom#2 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customparseexample1.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customparseexample1.cs.md)
[Conceptual.TimeSpan.Custom#2 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customparseexample1.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customparseexample1.vb.md)

<a name="table"></a> The following table describes the custom date and time format specifiers.

| Format specifier | Description | Example |
| --- | --- | --- |
| `"d"`, `"%d"` | The number of whole days in the time interval.<br /><br /> More information: [The `"d"` custom format specifier](#dSpecifier). | `new TimeSpan(6, 14, 32, 17, 685):`<br /><br /> `%d` --> "6"<br /><br /> `d\.hh\:mm` --> "6.14:32" |
| `"dd"`-`"dddddddd"` | The number of whole days in the time interval, padded with leading zeros as needed.<br /><br /> More information: [The `"dd"`-`"dddddddd"` custom format specifiers](#ddSpecifier). | `new TimeSpan(6, 14, 32, 17, 685):`<br /><br /> `ddd` --> "006"<br /><br /> `dd\.hh\:mm` --> "06.14:32" |
| `"h"`, `"%h"` | The number of whole hours in the time interval that aren't counted as part of days. Single-digit hours don't have a leading zero.<br /><br /> More information: [The `"h"` custom format specifier](#hSpecifier). | `new TimeSpan(6, 14, 32, 17, 685):`<br /><br /> `%h` --> "14"<br /><br /> `hh\:mm` --> "14:32" |
| `"hh"` | The number of whole hours in the time interval that aren't counted as part of days. Single-digit hours have a leading zero.<br /><br /> More information: [The `"hh"` custom format specifier](#hhSpecifier). | `new TimeSpan(6, 14, 32, 17, 685):`<br /><br /> `hh` --> "14"<br /><br /> `new TimeSpan(6, 8, 32, 17, 685):`<br /><br /> `hh` --> 08 |
| `"m"`, `"%m"` | The number of whole minutes in the time interval that aren't included as part of hours or days. Single-digit minutes don't have a leading zero.<br /><br /> More information: [The `"m"` custom format specifier](#mSpecifier). | `new TimeSpan(6, 14, 8, 17, 685):`<br /><br /> `%m` --> "8"<br /><br /> `h\:m` --> "14:8" |
| `"mm"` | The number of whole minutes in the time interval that aren't included as part of hours or days. Single-digit minutes have a leading zero.<br /><br /> More information: [The `"mm"` custom format specifier](#mmSpecifier). | `new TimeSpan(6, 14, 8, 17, 685):`<br /><br /> `mm` --> "08"<br /><br /> `new TimeSpan(6, 8, 5, 17, 685):`<br /><br /> `d\.hh\:mm\:ss` --> 6.08:05:17 |
| `"s"`, `"%s"` | The number of whole seconds in the time interval that aren't included as part of hours, days, or minutes. Single-digit seconds don't have a leading zero.<br /><br /> More information: [The `"s"` custom format specifier](#sSpecifier). | `TimeSpan.FromSeconds(12.965)`:<br /><br /> `%s` --> 12<br /><br /> `s\.fff` --> 12.965 |
| `"ss"` | The number of whole seconds in the time interval that aren't included as part of hours, days, or minutes.  Single-digit seconds have a leading zero.<br /><br /> More information: [The `"ss"` custom format specifier](#ssSpecifier). | `TimeSpan.FromSeconds(6.965)`:<br /><br /> `ss` --> 06<br /><br /> `ss\.fff` --> 06.965 |
| `"f"`, `"%f"` | The tenths of a second in a time interval.<br /><br /> More information: [The `"f"` custom format specifier](#fSpecifier). | `TimeSpan.FromSeconds(6.895)`:<br /><br /> `f` --> 8<br /><br /> `ss\.f` --> 06.8 |
| `"ff"` | The hundredths of a second in a time interval.<br /><br /> More information: [The `"ff"` custom format specifier](#ffSpecifier). | `TimeSpan.FromSeconds(6.895)`:<br /><br /> `ff` --> 89<br /><br /> `ss\.ff` --> 06.89 |
| `"fff"` | The milliseconds in a time interval.<br /><br /> More information: [The `"fff"` custom format specifier](#f3Specifier). | `TimeSpan.FromSeconds(6.895)`:<br /><br /> `fff` --> 895<br /><br /> `ss\.fff` --> 06.895 |
| `"ffff"` | The ten-thousandths of a second in a time interval.<br /><br /> More information: [The `"ffff"` custom format specifier](#f4Specifier). | `TimeSpan.Parse("0:0:6.8954321")`:<br /><br /> `ffff` --> 8954<br /><br /> `ss\.ffff` --> 06.8954 |
| `"fffff"` | The hundred-thousandths of a second in a time interval.<br /><br /> More information: [The `"fffff"` custom format specifier](#f5Specifier). | `TimeSpan.Parse("0:0:6.8954321")`:<br /><br /> `fffff` --> 89543<br /><br /> `ss\.fffff` --> 06.89543 |
| `"ffffff"` | The millionths of a second in a time interval.<br /><br /> More information: [The `"ffffff"` custom format specifier](#f6Specifier). | `TimeSpan.Parse("0:0:6.8954321")`:<br /><br /> `ffffff` --> 895432<br /><br /> `ss\.ffffff` --> 06.895432 |
| `"fffffff"` | The ten-millionths of a second (or the fractional ticks) in a time interval.<br /><br /> More information: [The `"fffffff"` custom format specifier](#f7Specifier). | `TimeSpan.Parse("0:0:6.8954321")`:<br /><br /> `fffffff` --> 8954321<br /><br /> `ss\.fffffff` --> 06.8954321 |
| `"F"`, `"%F"` | The tenths of a second in a time interval. Nothing is displayed if the digit is zero.<br /><br /> More information: [The `"F"` custom format specifier](#F_Specifier). | `TimeSpan.Parse("00:00:06.32")`:<br /><br /> `%F`: 3<br /><br /> `TimeSpan.Parse("0:0:3.091")`:<br /><br /> `ss\.F`: 03. |
| `"FF"` | The hundredths of a second in a time interval. Any fractional trailing zeros or two zero digits aren't included.<br /><br /> More information: [The `"FF"` custom format specifier](#FF_Specifier). | `TimeSpan.Parse("00:00:06.329")`:<br /><br /> `FF`: 32<br /><br /> `TimeSpan.Parse("0:0:3.101")`:<br /><br /> `ss\.FF`: 03.1 |
| `"FFF"` | The milliseconds in a time interval. Any fractional trailing zeros aren't included.<br /><br /> More information: | `TimeSpan.Parse("00:00:06.3291")`:<br /><br /> `FFF`: 329<br /><br /> `TimeSpan.Parse("0:0:3.1009")`:<br /><br /> `ss\.FFF`: 03.1 |
| `"FFFF"` | The ten-thousandths of a second in a time interval. Any fractional trailing zeros aren't included.<br /><br /> More information: [The `"FFFF"` custom format specifier](#F4_Specifier). | `TimeSpan.Parse("00:00:06.32917")`:<br /><br /> `FFFFF`: 3291<br /><br /> `TimeSpan.Parse("0:0:3.10009")`:<br /><br /> `ss\.FFFF`: 03.1 |
| `"FFFFF"` | The hundred-thousandths of a second in a time interval. Any fractional trailing zeros aren't included.<br /><br /> More information: [The `"FFFFF"` custom format specifier](#F5_Specifier). | `TimeSpan.Parse("00:00:06.329179")`:<br /><br /> `FFFFF`: 32917<br /><br /> `TimeSpan.Parse("0:0:3.100009")`:<br /><br /> `ss\.FFFFF`: 03.1 |
| `"FFFFFF"` | The millionths of a second in a time interval. Any fractional trailing zeros aren't displayed.<br /><br /> More information: [The `"FFFFFF"` custom format specifier](#F6_Specifier). | `TimeSpan.Parse("00:00:06.3291791")`:<br /><br /> `FFFFFF`: 329179<br /><br /> `TimeSpan.Parse("0:0:3.1000009")`:<br /><br /> `ss\.FFFFFF`: 03.1 |
| `"FFFFFFF"` | The ten-millions of a second in a time interval. Any fractional trailing zeros or seven zeros aren't displayed.<br /><br /> More information: [The `"FFFFFFF"` custom format specifier](#F7_Specifier). | `TimeSpan.Parse("00:00:06.3291791")`:<br /><br /> `FFFFFF`: 3291791<br /><br /> `TimeSpan.Parse("0:0:3.1900000")`:<br /><br /> `ss\.FFFFFF`: 03.19 |
| '*string*' | Literal string delimiter.<br /><br /> More information: [Other characters](#other-characters). | `new TimeSpan(14, 32, 17):`<br /><br /> `hh':'mm':'ss` --> "14:32:17" |
| &#92; | The escape character.<br /><br /> More information: [Other characters](#other-characters). | `new TimeSpan(14, 32, 17):`<br /><br /> `hh\:mm\:ss` --> "14:32:17" |
| Any other character | Any other unescaped character is interpreted as a custom format specifier.<br /><br /> More Information: [Other characters](#other-characters). | `new TimeSpan(14, 32, 17):`<br /><br /> `hh\:mm\:ss` --> "14:32:17" |

## <a name="dSpecifier"></a> The `"d"` custom format specifier

The `"d"` custom format specifier outputs the value of the [System.TimeSpan.Days](https://learn.microsoft.com/search/?terms=System.TimeSpan.Days) property, which represents the number of whole days in the time interval. It outputs the full number of days in a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value, even if the value has more than one digit. If the value of the [System.TimeSpan.Days](https://learn.microsoft.com/search/?terms=System.TimeSpan.Days) property is zero, the specifier outputs "0".

If the `"d"` custom format specifier is used alone, specify `"%d"` so that it isn't misinterpreted as a standard format string. The following example provides an illustration.

[Conceptual.TimeSpan.Custom#3 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs.md)
[Conceptual.TimeSpan.Custom#3 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb.md)

The following example illustrates the use of the `"d"` custom format specifier.

[Conceptual.TimeSpan.Custom#4 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs.md)
[Conceptual.TimeSpan.Custom#4 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb.md)

[Back to table](#table)

## <a name="ddSpecifier"></a> The `"dd"`-`"dddddddd"` custom format specifiers

The `"dd"`, `"ddd"`, `"dddd"`, `"ddddd"`, `"dddddd"`, `"ddddddd"`, and `"dddddddd"` custom format specifiers output the value of the [System.TimeSpan.Days](https://learn.microsoft.com/search/?terms=System.TimeSpan.Days) property, which represents the number of whole days in the time interval.

The output string includes a minimum number of digits specified by the number of `d` characters in the format specifier, and it's padded with leading zeros as needed. If the digits in the number of days exceed the number of `d` characters in the format specifier, the full number of days is output in the result string.

The following example uses these format specifiers to display the string representation of two [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) values. The value of the days component of the first time interval is zero; the value of the days component of the second is 365.

[Conceptual.TimeSpan.Custom#5 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs.md)
[Conceptual.TimeSpan.Custom#5 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb.md)

[Back to table](#table)

## <a name="hSpecifier"></a> The `"h"` custom format specifier

The `"h"` custom format specifier outputs the value of the [System.TimeSpan.Hours](https://learn.microsoft.com/search/?terms=System.TimeSpan.Hours) property, which represents the number of whole hours in the time interval that isn't counted as part of its day component. It returns a one-digit string value if the value of the [System.TimeSpan.Hours](https://learn.microsoft.com/search/?terms=System.TimeSpan.Hours) property is 0 through 9, and it returns a two-digit string value if the value of the [System.TimeSpan.Hours](https://learn.microsoft.com/search/?terms=System.TimeSpan.Hours) property ranges from 10 to 23.

If the `"h"` custom format specifier is used alone, specify `"%h"` so that it isn't misinterpreted as a standard format string. The following example provides an illustration.

[Conceptual.TimeSpan.Custom#6 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs.md)
[Conceptual.TimeSpan.Custom#6 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb.md)

Ordinarily, in a parsing operation, an input string that includes only a single number is interpreted as the number of days. You can use the `"%h"` custom format specifier instead to interpret the numeric string as the number of hours. The following example provides an illustration.

[Conceptual.TimeSpan.Custom#8 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs.md)
[Conceptual.TimeSpan.Custom#8 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb.md)

The following example illustrates the use of the `"h"` custom format specifier.

[Conceptual.TimeSpan.Custom#7 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs.md)
[Conceptual.TimeSpan.Custom#7 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb.md)

[Back to table](#table)

## <a name="hhSpecifier"></a> The `"hh"` custom format specifier

The `"hh"` custom format specifier outputs the value of the [System.TimeSpan.Hours](https://learn.microsoft.com/search/?terms=System.TimeSpan.Hours) property, which represents the number of whole hours in the time interval that isn't counted as part of its day component. For values from 0 through 9, the output string includes a leading zero.

Ordinarily, in a parsing operation, an input string that includes only a single number is interpreted as the number of days. You can use the `"hh"` custom format specifier instead to interpret the numeric string as the number of hours. The following example provides an illustration.

[Conceptual.TimeSpan.Custom#9 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs#9)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs.md)
[Conceptual.TimeSpan.Custom#9 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb.md)

The following example illustrates the use of the `"hh"` custom format specifier.

[Conceptual.TimeSpan.Custom#10 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs#10)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs.md)
[Conceptual.TimeSpan.Custom#10 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb.md)

[Back to table](#table)

## <a name="mSpecifier"></a> The `"m"` custom format specifier

The `"m"` custom format specifier outputs the value of the [System.TimeSpan.Minutes](https://learn.microsoft.com/search/?terms=System.TimeSpan.Minutes) property, which represents the number of whole minutes in the time interval that isn't counted as part of its day component. It returns a one-digit string value if the value of the [System.TimeSpan.Minutes](https://learn.microsoft.com/search/?terms=System.TimeSpan.Minutes) property is 0 through 9, and it returns a two-digit string value if the value of the [System.TimeSpan.Minutes](https://learn.microsoft.com/search/?terms=System.TimeSpan.Minutes) property ranges from 10 to 59.

If the `"m"` custom format specifier is used alone, specify `"%m"` so that it isn't misinterpreted as a standard format string. The following example provides an illustration.

[Conceptual.TimeSpan.Custom#6 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs.md)
[Conceptual.TimeSpan.Custom#6 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb.md)

Ordinarily, in a parsing operation, an input string that includes only a single number is interpreted as the number of days. You can use the `"%m"` custom format specifier instead to interpret the numeric string as the number of minutes. The following example provides an illustration.

[Conceptual.TimeSpan.Custom#11 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs#11)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs.md)
[Conceptual.TimeSpan.Custom#11 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb.md)

The following example illustrates the use of the `"m"` custom format specifier.

[Conceptual.TimeSpan.Custom#12 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs#12)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs.md)
[Conceptual.TimeSpan.Custom#12 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb#12)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb.md)

[Back to table](#table)

## <a name="mmSpecifier"></a> The `"mm"` custom format specifier

The `"mm"` custom format specifier outputs the value of the [System.TimeSpan.Minutes](https://learn.microsoft.com/search/?terms=System.TimeSpan.Minutes) property, which represents the number of whole minutes in the time interval that isn't included as part of its hours or days component. For values from 0 through 9, the output string includes a leading zero.

Ordinarily, in a parsing operation, an input string that includes only a single number is interpreted as the number of days. You can use the `"mm"` custom format specifier instead to interpret the numeric string as the number of minutes. The following example provides an illustration.

[Conceptual.TimeSpan.Custom#13 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs#13)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs.md)
[Conceptual.TimeSpan.Custom#13 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb#13)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb.md)

The following example illustrates the use of the `"mm"` custom format specifier.

[Conceptual.TimeSpan.Custom#14 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs#14)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs.md)
[Conceptual.TimeSpan.Custom#14 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb#14)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb.md)

[Back to table](#table)

## <a name="sSpecifier"></a> The `"s"` custom format specifier

The `"s"` custom format specifier outputs the value of the [System.TimeSpan.Seconds](https://learn.microsoft.com/search/?terms=System.TimeSpan.Seconds) property, which represents the number of whole seconds in the time interval that isn't included as part of its hours, days, or minutes component. It returns a one-digit string value if the value of the [System.TimeSpan.Seconds](https://learn.microsoft.com/search/?terms=System.TimeSpan.Seconds) property is 0 through 9, and it returns a two-digit string value if the value of the [System.TimeSpan.Seconds](https://learn.microsoft.com/search/?terms=System.TimeSpan.Seconds) property ranges from 10 to 59.

If the `"s"` custom format specifier is used alone, specify `"%s"` so that it isn't misinterpreted as a standard format string. The following example provides an illustration.

[Conceptual.TimeSpan.Custom#15 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs#15)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs.md)
[Conceptual.TimeSpan.Custom#15 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb#15)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb.md)

Ordinarily, in a parsing operation, an input string that includes only a single number is interpreted as the number of days. You can use the `"%s"` custom format specifier instead to interpret the numeric string as the number of seconds. The following example provides an illustration.

[Conceptual.TimeSpan.Custom#17 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs#17)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs.md)
[Conceptual.TimeSpan.Custom#17 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb#17)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb.md)

The following example illustrates the use of the `"s"` custom format specifier.

[Conceptual.TimeSpan.Custom#16 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs#16)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs.md)
[Conceptual.TimeSpan.Custom#16 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb#16)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb.md)

[Back to table](#table)

## <a name="ssSpecifier"></a> The `"ss"` custom format specifier

The `"ss"` custom format specifier outputs the value of the [System.TimeSpan.Seconds](https://learn.microsoft.com/search/?terms=System.TimeSpan.Seconds) property, which represents the number of whole seconds in the time interval that isn't included as part of its hours, days, or minutes component. For values from 0 through 9, the output string includes a leading zero.

Ordinarily, in a parsing operation, an input string that includes only a single number is interpreted as the number of days. You can use the `"ss"` custom format specifier instead to interpret the numeric string as the number of seconds. The following example provides an illustration.

[Conceptual.TimeSpan.Custom#18 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs#18)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs.md)
[Conceptual.TimeSpan.Custom#18 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb#18)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb.md)

The following example illustrates the use of the `"ss"` custom format specifier.

[Conceptual.TimeSpan.Custom#19 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs#19)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/customexamples1.cs.md)
[Conceptual.TimeSpan.Custom#19 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb#19)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/customexamples1.vb.md)

[Back to table](#table)

## <a name="fSpecifier"></a> The `"f"` custom format specifier

The `"f"` custom format specifier outputs the tenths of a second in a time interval. In a formatting operation, any remaining fractional digits are truncated. In a parsing operation that calls the [System.TimeSpan.ParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.ParseExact*) or [System.TimeSpan.TryParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.TryParseExact*) method, the input string must contain exactly one fractional digit.

If the `"f"` custom format specifier is used alone, specify `"%f"` so that it isn't misinterpreted as a standard format string.

The following example uses the `"f"` custom format specifier to display the tenths of a second in a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value. `"f"` is used first as the only format specifier, and then combined with the `"s"` specifier in a custom format string.

[Conceptual.TimeSpan.Custom#20 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/fspecifiers1.cs#20)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/fspecifiers1.cs.md)
[Conceptual.TimeSpan.Custom#20 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/fspecifiers1.vb#20)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/fspecifiers1.vb.md)

[Back to table](#table)

## <a name="ffSpecifier"></a> The `"ff"` custom format specifier

The `"ff"` custom format specifier outputs the hundredths of a second in a time interval. In a formatting operation, any remaining fractional digits are truncated. In a parsing operation that calls the [System.TimeSpan.ParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.ParseExact*) or [System.TimeSpan.TryParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.TryParseExact*) method, the input string must contain exactly two fractional digits.

The following example uses the `"ff"` custom format specifier to display the hundredths of a second in a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value. `"ff"` is used first as the only format specifier, and then combined with the `"s"` specifier in a custom format string.

[Conceptual.TimeSpan.Custom#20 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/fspecifiers1.cs#20)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/fspecifiers1.cs.md)
[Conceptual.TimeSpan.Custom#20 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/fspecifiers1.vb#20)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/fspecifiers1.vb.md)

[Back to table](#table)

## <a name="f3Specifier"></a> The `"fff"` custom format specifier

The `"fff"` custom format specifier (with three `f` characters) outputs the milliseconds in a time interval. In a formatting operation, any remaining fractional digits are truncated. In a parsing operation that calls the [System.TimeSpan.ParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.ParseExact*) or [System.TimeSpan.TryParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.TryParseExact*) method, the input string must contain exactly three fractional digits.

The following example uses the `"fff"` custom format specifier to display the milliseconds in a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value. `"fff"` is used first as the only format specifier, and then combined with the `"s"` specifier in a custom format string.

[Conceptual.TimeSpan.Custom#20 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/fspecifiers1.cs#20)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/fspecifiers1.cs.md)
[Conceptual.TimeSpan.Custom#20 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/fspecifiers1.vb#20)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/fspecifiers1.vb.md)

[Back to table](#table)

## <a name="f4Specifier"></a> The `"ffff"` custom format specifier

The `"ffff"` custom format specifier (with four `f` characters) outputs the ten-thousandths of a second in a time interval. In a formatting operation, any remaining fractional digits are truncated. In a parsing operation that calls the [System.TimeSpan.ParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.ParseExact*) or [System.TimeSpan.TryParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.TryParseExact*) method, the input string must contain exactly four fractional digits.

The following example uses the `"ffff"` custom format specifier to display the ten-thousandths of a second in a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value. `"ffff"` is used first as the only format specifier, and then combined with the `"s"` specifier in a custom format string.

[Conceptual.TimeSpan.Custom#20 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/fspecifiers1.cs#20)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/fspecifiers1.cs.md)
[Conceptual.TimeSpan.Custom#20 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/fspecifiers1.vb#20)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/fspecifiers1.vb.md)

[Back to table](#table)

## <a name="f5Specifier"></a> The `"fffff"` custom format specifier

The `"fffff"` custom format specifier (with five `f` characters) outputs the hundred-thousandths of a second in a time interval. In a formatting operation, any remaining fractional digits are truncated. In a parsing operation that calls the [System.TimeSpan.ParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.ParseExact*) or [System.TimeSpan.TryParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.TryParseExact*) method, the input string must contain exactly five fractional digits.

The following example uses the `"fffff"` custom format specifier to display the hundred-thousandths of a second in a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value. `"fffff"` is used first as the only format specifier, and then combined with the `"s"` specifier in a custom format string.

[Conceptual.TimeSpan.Custom#20 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/fspecifiers1.cs#20)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/fspecifiers1.cs.md)
[Conceptual.TimeSpan.Custom#20 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/fspecifiers1.vb#20)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/fspecifiers1.vb.md)

[Back to table](#table)

## <a name="f6Specifier"></a> The `"ffffff"` custom format specifier

The `"ffffff"` custom format specifier (with six `f` characters) outputs the millionths of a second in a time interval. In a formatting operation, any remaining fractional digits are truncated. In a parsing operation that calls the [System.TimeSpan.ParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.ParseExact*) or [System.TimeSpan.TryParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.TryParseExact*) method, the input string must contain exactly six fractional digits.

The following example uses the `"ffffff"` custom format specifier to display the millionths of a second in a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value. It is used first as the only format specifier, and then combined with the `"s"` specifier in a custom format string.

[Conceptual.TimeSpan.Custom#20 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/fspecifiers1.cs#20)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/fspecifiers1.cs.md)
[Conceptual.TimeSpan.Custom#20 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/fspecifiers1.vb#20)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/fspecifiers1.vb.md)

[Back to table](#table)

## <a name="f7Specifier"></a> The `"fffffff"` custom format specifier

The `"fffffff"` custom format specifier (with seven `f` characters) outputs the ten-millionths of a second (or the fractional number of ticks) in a time interval. In a parsing operation that calls the [System.TimeSpan.ParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.ParseExact*) or [System.TimeSpan.TryParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.TryParseExact*) method, the input string must contain exactly seven fractional digits.

The following example uses the `"fffffff"` custom format specifier to display the fractional number of ticks in a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value. It is used first as the only format specifier, and then combined with the `"s"` specifier in a custom format string.

[Conceptual.TimeSpan.Custom#20 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/fspecifiers1.cs#20)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/fspecifiers1.cs.md)
[Conceptual.TimeSpan.Custom#20 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/fspecifiers1.vb#20)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/fspecifiers1.vb.md)

[Back to table](#table)

## <a name="F_Specifier"></a> The `"F"` custom format specifier

The `"F"` custom format specifier outputs the tenths of a second in a time interval. In a formatting operation, any remaining fractional digits are truncated. If the value of the time interval's tenths of a second is zero, it isn't included in the result string. In a parsing operation that calls the [System.TimeSpan.ParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.ParseExact*) or [System.TimeSpan.TryParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.TryParseExact*) method, the presence of the tenths of a second digit is optional.

If the `"F"` custom format specifier is used alone, specify `"%F"` so that it isn't misinterpreted as a standard format string.

The following example uses the `"F"` custom format specifier to display the tenths of a second in a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value. It also uses this custom format specifier in a parsing operation.

[Conceptual.TimeSpan.Custom#21 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/f_specifiers1.cs#21)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/f_specifiers1.cs.md)
[Conceptual.TimeSpan.Custom#21 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/f_specifiers1.vb#21)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/f_specifiers1.vb.md)

[Back to table](#table)

## <a name="FF_Specifier"></a> The `"FF"` custom format specifier

The `"FF"` custom format specifier outputs the hundredths of a second in a time interval. In a formatting operation, any remaining fractional digits are truncated. If there are any trailing fractional zeros, they aren't included in the result string. In a parsing operation that calls the [System.TimeSpan.ParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.ParseExact*) or [System.TimeSpan.TryParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.TryParseExact*) method, the presence of the tenths and hundredths of a second digit is optional.

The following example uses the `"FF"` custom format specifier to display the hundredths of a second in a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value. It also uses this custom format specifier in a parsing operation.

[Conceptual.TimeSpan.Custom#22 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/f_specifiers1.cs#22)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/f_specifiers1.cs.md)
[Conceptual.TimeSpan.Custom#22 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/f_specifiers1.vb#22)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/f_specifiers1.vb.md)

[Back to table](#table)

## <a name="F3_Specifier"></a> The `"FFF"` custom format specifier

The `"FFF"` custom format specifier (with three `F` characters) outputs the milliseconds in a time interval. In a formatting operation, any remaining fractional digits are truncated. If there are any trailing fractional zeros, they aren't included in the result string. In a parsing operation that calls the [System.TimeSpan.ParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.ParseExact*) or [System.TimeSpan.TryParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.TryParseExact*) method, the presence of the tenths, hundredths, and thousandths of a second digit is optional.

The following example uses the `"FFF"` custom format specifier to display the thousandths of a second in a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value. It also uses this custom format specifier in a parsing operation.

[Conceptual.TimeSpan.Custom#23 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/f_specifiers1.cs#23)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/f_specifiers1.cs.md)
[Conceptual.TimeSpan.Custom#23 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/f_specifiers1.vb#23)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/f_specifiers1.vb.md)

[Back to table](#table)

## <a name="F4_Specifier"></a> The `"FFFF"` custom format specifier

The `"FFFF"` custom format specifier (with four `F` characters) outputs the ten-thousandths of a second in a time interval. In a formatting operation, any remaining fractional digits are truncated. If there are any trailing fractional zeros, they aren't included in the result string. In a parsing operation that calls the [System.TimeSpan.ParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.ParseExact*) or [System.TimeSpan.TryParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.TryParseExact*) method, the presence of the tenths, hundredths, thousandths, and ten-thousandths of a second digit is optional.

The following example uses the `"FFFF"` custom format specifier to display the ten-thousandths of a second in a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value. It also uses the `"FFFF"` custom format specifier in a parsing operation.

[Conceptual.TimeSpan.Custom#24 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/f_specifiers1.cs#24)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/f_specifiers1.cs.md)
[Conceptual.TimeSpan.Custom#24 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/f_specifiers1.vb#24)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/f_specifiers1.vb.md)

[Back to table](#table)

## <a name="F5_Specifier"></a> The `"FFFFF"` custom format specifier

The `"FFFFF"` custom format specifier (with five `F` characters) outputs the hundred-thousandths of a second in a time interval. In a formatting operation, any remaining fractional digits are truncated. If there are any trailing fractional zeros, they aren't included in the result string. In a parsing operation that calls the [System.TimeSpan.ParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.ParseExact*) or [System.TimeSpan.TryParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.TryParseExact*) method, the presence of the tenths, hundredths, thousandths, ten-thousandths, and hundred-thousandths of a second digit is optional.

The following example uses the `"FFFFF"` custom format specifier to display the hundred-thousandths of a second in a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value. It also uses the `"FFFFF"` custom format specifier in a parsing operation.

[Conceptual.TimeSpan.Custom#25 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/f_specifiers1.cs#25)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/f_specifiers1.cs.md)
[Conceptual.TimeSpan.Custom#25 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/f_specifiers1.vb#25)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/f_specifiers1.vb.md)

[Back to table](#table)

## <a name="F6_Specifier"></a> The `"FFFFFF"` custom format specifier

The `"FFFFFF"` custom format specifier (with six `F` characters) outputs the millionths of a second in a time interval. In a formatting operation, any remaining fractional digits are truncated. If there are any trailing fractional zeros, they aren't included in the result string. In a parsing operation that calls the [System.TimeSpan.ParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.ParseExact*) or [System.TimeSpan.TryParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.TryParseExact*) method, the presence of the tenths, hundredths, thousandths, ten-thousandths, hundred-thousandths, and millionths of a second digit is optional.

The following example uses the `"FFFFFF"` custom format specifier to display the millionths of a second in a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value. It also uses this custom format specifier in a parsing operation.

[Conceptual.TimeSpan.Custom#26 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/f_specifiers1.cs#26)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/f_specifiers1.cs.md)
[Conceptual.TimeSpan.Custom#26 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/f_specifiers1.vb#26)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/f_specifiers1.vb.md)

[Back to table](#table)

## <a name="F7_Specifier"></a> The `"FFFFFFF"` custom format specifier

The `"FFFFFFF"` custom format specifier (with seven `F` characters) outputs the ten-millionths of a second (or the fractional number of ticks) in a time interval. If there are any trailing fractional zeros, they aren't included in the result string. In a parsing operation that calls the [System.TimeSpan.ParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.ParseExact*) or [System.TimeSpan.TryParseExact*](https://learn.microsoft.com/search/?terms=System.TimeSpan.TryParseExact*) method, the presence of the seven fractional digits in the input string is optional.

The following example uses the `"FFFFFFF"` custom format specifier to display the fractional parts of a second in a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value. It also uses this custom format specifier in a parsing operation.

[Conceptual.TimeSpan.Custom#27 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/f_specifiers1.cs#27)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/f_specifiers1.cs.md)
[Conceptual.TimeSpan.Custom#27 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/f_specifiers1.vb#27)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/f_specifiers1.vb.md)

[Back to table](#table)

## Other characters

Any other unescaped character in a format string, including a white-space character, is interpreted as a custom format specifier. In most cases, the presence of any other unescaped character results in a [System.FormatException](https://learn.microsoft.com/search/?terms=System.FormatException).

There are two ways to include a literal character in a format string:

- Enclose it in single quotation marks (the literal string delimiter).

- Precede it with a backslash ("\\"), which is interpreted as an escape character. This means that, in C#, the format string must either be @-quoted, or the literal character must be preceded by an additional backslash.

  In some cases, you may have to use conditional logic to include an escaped literal in a format string. The following example uses conditional logic to include a sign symbol for negative time intervals.

  [Conceptual.TimeSpan.Custom#29 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/negativevalues1.cs#29)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/negativevalues1.cs.md)
  [Conceptual.TimeSpan.Custom#29 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/negativevalues1.vb#29)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/negativevalues1.vb.md)

.NET doesn't define a grammar for separators in time intervals. This means that the separators between days and hours, hours and minutes, minutes and seconds, and seconds and fractions of a second must all be treated as character literals in a format string.

The following example uses both the escape character and the single quote to define a custom format string that includes the word `"minutes"` in the output string.

[Conceptual.TimeSpan.Custom#28 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/literal1.cs#28)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.timespan.custom/cs/literal1.cs.md)
[Conceptual.TimeSpan.Custom#28 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/literal1.vb#28)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.timespan.custom/vb/literal1.vb.md)

[Back to table](#table)

## See also

- [Formatting Types](formatting-types.md)
- [Standard TimeSpan Format Strings](standard-timespan-format-strings.md)
