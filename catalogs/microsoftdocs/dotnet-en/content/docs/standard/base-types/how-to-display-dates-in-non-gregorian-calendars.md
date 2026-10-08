---
description: "Learn more about: How to: Display Dates in Non-Gregorian Calendars"
title: "How to: Display Dates in Non-Gregorian Calendars"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "formatting [.NET], dates"
  - "dates [.NET], formatting"
  - "calendars [.NET], displaying dates"
  - "displaying date and time data"
ms.assetid: ed324eff-4aff-4a76-b6c0-04e6c0d8f5a9
---
# How to: Display Dates in Non-Gregorian Calendars

The [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) types use the Gregorian calendar as their default calendar. This means that calling a date and time value's `ToString` method displays the string representation of that date and time in the Gregorian calendar, even if that date and time was created using another calendar. This is illustrated in the following example, which uses two different ways to create a date and time value with the Persian calendar, but still displays those date and time values in the Gregorian calendar when it calls the [System.DateTime.ToString*](https://learn.microsoft.com/search/?terms=System.DateTime.ToString*) method. This example reflects two commonly used but incorrect techniques for displaying the date in a particular calendar.

 [Formatting.HowTo.Calendar#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.Calendar/cs/Calendar1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.Calendar/cs/Calendar1.cs.md)
 [Formatting.HowTo.Calendar#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.Calendar/vb/Calendar1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.Calendar/vb/Calendar1.vb.md)

 Two different techniques can be used to display the date in a particular calendar. The first requires that the calendar be the default calendar for a particular culture. The second can be used with any calendar.

### To display the date for a culture's default calendar

1. Instantiate a calendar object derived from the [System.Globalization.Calendar](https://learn.microsoft.com/search/?terms=System.Globalization.Calendar) class that represents the calendar to be used.

2. Instantiate a [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) object representing the culture whose formatting will be used to display the date.

3. Call the [System.Array.Exists*](https://learn.microsoft.com/search/?terms=System.Array.Exists*) method to determine whether the calendar object is a member of the array returned by the [System.Globalization.CultureInfo.OptionalCalendars](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.OptionalCalendars) property. This indicates that the calendar can serve as the default calendar for the [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) object. If it is not a member of the array, follow the instructions in the "To Display the Date in Any Calendar" section.

4. Assign the calendar object to the [System.Globalization.DateTimeFormatInfo.Calendar](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo.Calendar) property of the [System.Globalization.DateTimeFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo) object returned by the [System.Globalization.CultureInfo.DateTimeFormat](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.DateTimeFormat) property.

    > **Note:**
    > The [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) class also has a [System.Globalization.CultureInfo.Calendar](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.Calendar) property. However, it is read-only and constant; it does not change to reflect the new default calendar assigned to the [System.Globalization.DateTimeFormatInfo.Calendar](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo.Calendar) property.

5. Call either the [System.DateTime.ToString*](https://learn.microsoft.com/search/?terms=System.DateTime.ToString*) or the [System.DateTime.ToString*](https://learn.microsoft.com/search/?terms=System.DateTime.ToString*) method, and pass it the [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) object whose default calendar was modified in the previous step.

### To display the date in any calendar

1. Instantiate a calendar object derived from the [System.Globalization.Calendar](https://learn.microsoft.com/search/?terms=System.Globalization.Calendar) class that represents the calendar to be used.

2. Determine which date and time elements should appear in the string representation of the date and time value.

3. For each date and time element that you want to display, call the calendar object's `Get`… method. The following methods are available:

    - [System.Globalization.Calendar.GetYear*](https://learn.microsoft.com/search/?terms=System.Globalization.Calendar.GetYear*), to display the year in the appropriate calendar.

    - [System.Globalization.Calendar.GetMonth*](https://learn.microsoft.com/search/?terms=System.Globalization.Calendar.GetMonth*), to display the month in the appropriate calendar.

    - [System.Globalization.Calendar.GetDayOfMonth*](https://learn.microsoft.com/search/?terms=System.Globalization.Calendar.GetDayOfMonth*), to display the number of the day of the month in the appropriate calendar.

    - [System.Globalization.Calendar.GetHour*](https://learn.microsoft.com/search/?terms=System.Globalization.Calendar.GetHour*), to display the hour of the day in the appropriate calendar.

    - [System.Globalization.Calendar.GetMinute*](https://learn.microsoft.com/search/?terms=System.Globalization.Calendar.GetMinute*), to display the minutes in the hour in the appropriate calendar.

    - [System.Globalization.Calendar.GetSecond*](https://learn.microsoft.com/search/?terms=System.Globalization.Calendar.GetSecond*), to display the seconds in the minute in the appropriate calendar.

    - [System.Globalization.Calendar.GetMilliseconds*](https://learn.microsoft.com/search/?terms=System.Globalization.Calendar.GetMilliseconds*), to display the milliseconds in the second in the appropriate calendar.

## Example

 The example displays a date using two different calendars. It displays the date after defining the Hijri calendar as the default calendar for the ar-JO culture, and displays the date using the Persian calendar, which is not supported as an optional calendar by the fa-IR culture.

 [Formatting.HowTo.Calendar#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.Calendar/cs/Calendar1.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.Calendar/cs/Calendar1.cs.md)
 [Formatting.HowTo.Calendar#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.Calendar/vb/Calendar1.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.Calendar/vb/Calendar1.vb.md)

 Each [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) object can support one or more calendars, which are indicated by the [System.Globalization.CultureInfo.OptionalCalendars](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.OptionalCalendars) property. One of these is designated as the culture's default calendar and is returned by the read-only [System.Globalization.CultureInfo.Calendar](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.Calendar) property. Another of the optional calendars can be designated as the default by assigning a [System.Globalization.Calendar](https://learn.microsoft.com/search/?terms=System.Globalization.Calendar) object that represents that calendar to the [System.Globalization.DateTimeFormatInfo.Calendar](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeFormatInfo.Calendar) property returned by the [System.Globalization.CultureInfo.DateTimeFormat](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.DateTimeFormat) property. However, some calendars, such as the Persian calendar represented by the [System.Globalization.PersianCalendar](https://learn.microsoft.com/search/?terms=System.Globalization.PersianCalendar) class, do not serve as optional calendars for any culture.

 The example defines a reusable calendar utility class, `CalendarUtility`, to handle many of the details of generating the string representation of a date using a particular calendar. The `CalendarUtility` class has the following members:

- A parameterized constructor whose single parameter is a [System.Globalization.Calendar](https://learn.microsoft.com/search/?terms=System.Globalization.Calendar) object in which a date is to be represented. This is assigned to a private field of the class.

- `CalendarExists`, a private method that returns a Boolean value indicating whether the calendar represented by the `CalendarUtility` object is supported by the [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) object that is passed to the method as a parameter. The method wraps a call to the [System.Array.Exists*](https://learn.microsoft.com/search/?terms=System.Array.Exists*) method, to which it passes the [System.Globalization.CultureInfo.OptionalCalendars*](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.OptionalCalendars*) array.

- `HasSameName`, a private method assigned to the [System.Predicate`1](https://learn.microsoft.com/search/?terms=System.Predicate%601) delegate that is passed as a parameter to the [System.Array.Exists*](https://learn.microsoft.com/search/?terms=System.Array.Exists*) method. Each member of the array is passed to the method until the method returns `true`. The method determines whether the name of an optional calendar is the same as the calendar represented by the `CalendarUtility` object.

- `DisplayDate`, an overloaded public method that is passed two parameters: either a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) or [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value to express in the calendar represented by the `CalendarUtility` object; and the culture whose formatting rules are to be used. Its behavior in returning the string representation of a date depends on whether the target calendar is supported by the culture whose formatting rules are to be used.

 Regardless of the calendar used to create a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) or [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value in this example, that value is typically expressed as a Gregorian date. This is because the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) types do not preserve any calendar information. Internally, they are represented as the number of ticks that have elapsed since midnight of January 1, 0001. The interpretation of that number depends on the calendar. For most cultures, the default calendar is the Gregorian calendar.
