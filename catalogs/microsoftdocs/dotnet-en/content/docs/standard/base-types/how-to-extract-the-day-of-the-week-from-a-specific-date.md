---
title: "How to: Extract the Day of the Week from a Specific Date"
description: Learn how to determine the ordinal day of the week for a particular date in .NET. Learn how to display the localized weekday name for a particular date.
ms.date: "08/09/2022"
ms.custom: devdivchpfy22
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "formatting [.NET], dates"
  - "DateTime.DayOfWeek property"
  - "DateTime.ToString method"
  - "dates [.NET], retrieving week information"
  - "DateTimeOffset.DayOfWeek property"
  - "dates [.NET], day of week"
  - "Weekday function"
  - "day of week [.NET]"
  - "extracting day of week"
  - "weekday names"
  - "WeekdayName function"
  - "numbers [.NET], day of week"
  - "formatting [.NET], time"
  - "DateTimeOffset.ToString method"
  - "full weekday names"
ms.assetid: 1c9bef76-5634-46cf-b91c-9b9eb72091d7
---
# How to: Extract the Day of the Week from a Specific Date

.NET makes it easy to determine the ordinal day of the week for a particular date, and to display the localized weekday name for a particular date. An enumerated value that indicates the day of the week corresponding to a particular date is available from the [System.DateTime.DayOfWeek*](https://learn.microsoft.com/search/?terms=System.DateTime.DayOfWeek*) or [System.DateTimeOffset.DayOfWeek](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.DayOfWeek) property. In contrast, retrieving the weekday name is a formatting operation that can be performed by calling a formatting method, such as a date and time value's `ToString` method or the [System.String.Format*](https://learn.microsoft.com/search/?terms=System.String.Format*) method. This article shows how to perform these formatting operations.

## Extract a number indicating the day of the week

1. Use the static [System.DateTime.Parse*](https://learn.microsoft.com/search/?terms=System.DateTime.Parse*) or [System.DateTimeOffset.Parse*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.Parse*) method to convert the string representation of a date to a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) or a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value.

1. Use the [System.DateTime.DayOfWeek*](https://learn.microsoft.com/search/?terms=System.DateTime.DayOfWeek*) or [System.DateTimeOffset.DayOfWeek](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.DayOfWeek) property to retrieve a [System.DayOfWeek](https://learn.microsoft.com/search/?terms=System.DayOfWeek) value that indicates the day of the week.

1. If necessary, cast (in C#) or convert (in Visual Basic) the [System.DayOfWeek](https://learn.microsoft.com/search/?terms=System.DayOfWeek) value to an integer.

 The following example displays an integer that represents the day of the week of a specific date:

 [Formatting.Howto.WeekdayName#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/cs/weekdaynumber7.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/cs/weekdaynumber7.cs.md)
 [Formatting.Howto.WeekdayName#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/vb/weekdaynumber7.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/vb/weekdaynumber7.vb.md)

## Extract the abbreviated weekday name

1. Use the static [System.DateTime.Parse*](https://learn.microsoft.com/search/?terms=System.DateTime.Parse*) or [System.DateTimeOffset.Parse*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.Parse*) method to convert the string representation of a date to a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) or a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value.

1. You can extract the abbreviated weekday name of the current culture or of a specific culture:

    1. To extract the abbreviated weekday name for the current culture, call the date and time value's [System.DateTime.ToString%28System.String%29](https://learn.microsoft.com/search/?terms=System.DateTime.ToString%2528System.String%2529) or [System.DateTimeOffset.ToString%28System.String%29](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ToString%2528System.String%2529) instance method, and pass the string `ddd` as the `format` parameter. The following example illustrates the call to the [System.DateTime.ToString%28System.String%29](https://learn.microsoft.com/search/?terms=System.DateTime.ToString%2528System.String%2529) method:

         [Formatting.Howto.WeekdayName#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/cs/abbrname1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/cs/abbrname1.cs.md)
         [Formatting.Howto.WeekdayName#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/vb/abbrname1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/vb/abbrname1.vb.md)

    1. To extract the abbreviated weekday name for a specific culture, call the date and time value's [System.DateTime.ToString%28System.String%2CSystem.IFormatProvider%29](https://learn.microsoft.com/search/?terms=System.DateTime.ToString%2528System.String%252CSystem.IFormatProvider%2529) or [System.DateTimeOffset.ToString%28System.String%2CSystem.IFormatProvider%29](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ToString%2528System.String%252CSystem.IFormatProvider%2529) instance method. Pass the string `ddd` as the `format` parameter. Pass either a [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) or a [System.Globalization.DateTimeFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo) object that represents the culture whose weekday name you want to retrieve as the `provider` parameter. The following code illustrates a call to the [System.DateTime.ToString%28System.String%2CSystem.IFormatProvider%29](https://learn.microsoft.com/search/?terms=System.DateTime.ToString%2528System.String%252CSystem.IFormatProvider%2529) method using a [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) object that represents the fr-FR culture:

         [Formatting.Howto.WeekdayName#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/cs/abbrname2.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/cs/abbrname2.cs.md)
         [Formatting.Howto.WeekdayName#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/vb/abbrname2.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/vb/abbrname2.vb.md)

## Extract the full weekday name

1. Use the static [System.DateTime.Parse*](https://learn.microsoft.com/search/?terms=System.DateTime.Parse*) or [System.DateTimeOffset.Parse*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.Parse*) method to convert the string representation of a date to a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) or a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value.

1. You can extract the full weekday name of the current culture or of a specific culture:

    1. To extract the weekday name for the current culture, call the date and time value's [System.DateTime.ToString%28System.String%29](https://learn.microsoft.com/search/?terms=System.DateTime.ToString%2528System.String%2529) or [System.DateTimeOffset.ToString%28System.String%29](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ToString%2528System.String%2529) instance method, and pass the string `dddd` as the `format` parameter. The following example illustrates the call to the [System.DateTime.ToString%28System.String%29](https://learn.microsoft.com/search/?terms=System.DateTime.ToString%2528System.String%2529) method:

         [Formatting.Howto.WeekdayName#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/cs/fullname4.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/cs/fullname4.cs.md)
         [Formatting.Howto.WeekdayName#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/vb/fullname4.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/vb/fullname4.vb.md)

    1. To extract the weekday name for a specific culture, call the date and time value's [System.DateTime.ToString%28System.String%2CSystem.IFormatProvider%29](https://learn.microsoft.com/search/?terms=System.DateTime.ToString%2528System.String%252CSystem.IFormatProvider%2529) or [System.DateTimeOffset.ToString%28System.String%2CSystem.IFormatProvider%29](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ToString%2528System.String%252CSystem.IFormatProvider%2529) instance method. Pass the string `dddd` as the `format` parameter. Pass either a [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) or a [System.Globalization.DateTimeFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo) object that represents the culture whose weekday name you want to retrieve as the `provider` parameter. The following code illustrates a call to the [System.DateTime.ToString%28System.String%2CSystem.IFormatProvider%29](https://learn.microsoft.com/search/?terms=System.DateTime.ToString%2528System.String%252CSystem.IFormatProvider%2529) method using a [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) object that represents the es-ES culture:

         [Formatting.Howto.WeekdayName#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/cs/fullname5.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/cs/fullname5.cs.md)
         [Formatting.Howto.WeekdayName#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/vb/fullname5.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/vb/fullname5.vb.md)

## Example

 The following example illustrates calls to the [System.DateTime.DayOfWeek*](https://learn.microsoft.com/search/?terms=System.DateTime.DayOfWeek*) and [System.DateTimeOffset.DayOfWeek](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.DayOfWeek) properties to retrieve the number that represents the day of the week for a particular date. It also includes calls to the [System.DateTime.ToString*](https://learn.microsoft.com/search/?terms=System.DateTime.ToString*) and [System.DateTimeOffset.ToString*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ToString*) methods to extract the abbreviated weekday name and the full weekday name.

 [Formatting.Howto.WeekdayName#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/cs/example6.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/cs/example6.cs.md)
 [Formatting.Howto.WeekdayName#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/vb/example6.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/vb/example6.vb.md)

 Individual languages might provide functionality that duplicates or supplements the functionality provided by .NET. For example, Visual Basic includes two such functions:

- `Weekday`, which returns a number that indicates the day of the week of a particular date. It considers the ordinal value of the first day of the week to be one, whereas the [System.DateTime.DayOfWeek](https://learn.microsoft.com/search/?terms=System.DateTime.DayOfWeek) property considers it to be zero.

- `WeekdayName`, which returns the name of the week in the current culture that corresponds to a particular weekday number.

 The following example illustrates the use of the Visual Basic `Weekday` and `WeekdayName` functions:

 [Formatting.HowTo.WeekdayName#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/vb/example9.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/vb/example9.vb.md)

 You can also use the value returned by the [System.DateTime.DayOfWeek](https://learn.microsoft.com/search/?terms=System.DateTime.DayOfWeek) property to retrieve the weekday name of a particular date. This process requires only a call to the [System.Enum.ToString*](https://learn.microsoft.com/search/?terms=System.Enum.ToString*) method on the [System.DayOfWeek](https://learn.microsoft.com/search/?terms=System.DayOfWeek) value returned by the property. However, this technique doesn't produce a localized weekday name for the current culture, as the following example illustrates:

 [Formatting.HowTo.WeekdayName#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/cs/Howto1.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/cs/Howto1.cs.md)
 [Formatting.HowTo.WeekdayName#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/vb/Howto1.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.WeekdayName/vb/Howto1.vb.md)

## See also

- [Standard Date and Time Format Strings](standard-date-and-time-format-strings.md)
- [Custom Date and Time Format Strings](custom-date-and-time-format-strings.md)
