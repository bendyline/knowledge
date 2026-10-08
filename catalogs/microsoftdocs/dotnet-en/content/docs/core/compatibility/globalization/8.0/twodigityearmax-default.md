---
title: "Breaking change: TwoDigitYearMax default is 2049"
description: Learn about the globalization breaking change in .NET 8 where the default value of the TwoDigitYearMax property for Gregorian calendars has changed from 2029 to 2049.
ms.date: 01/25/2023
---
# TwoDigitYearMax default is 2049

Calendar classes, such as [System.Globalization.GregorianCalendar](https://learn.microsoft.com/search/?terms=System.Globalization.GregorianCalendar), have a `TwoDigitYearMax` property that defines the last year of a 100-year range that can be represented by a two-digit year. This property is often used to translate a two-digit year to a four-digit year. Previously, [System.Globalization.Calendar.TwoDigitYearMax](https://learn.microsoft.com/search/?terms=System.Globalization.Calendar.TwoDigitYearMax) defaulted to 2029 for [System.Globalization.GregorianCalendar](https://learn.microsoft.com/search/?terms=System.Globalization.GregorianCalendar) and other Gregorian-like calendars, such as [System.Globalization.JulianCalendar](https://learn.microsoft.com/search/?terms=System.Globalization.JulianCalendar) and [System.Globalization.EastAsianLunisolarCalendar](https://learn.microsoft.com/search/?terms=System.Globalization.EastAsianLunisolarCalendar). That value meant that two-digit years from 00 to 29 translated to 2000-2029. Two-digit years from 30 to 99 translated to 1930-1999. The default `TwoDigitYearMax` property value for [System.Globalization.GregorianCalendar](https://learn.microsoft.com/search/?terms=System.Globalization.GregorianCalendar) and other Gregorian-like calendars has now changed from 2029 to 2049. The new value means that two-digit years from 00 to 49 are translated to 2000-2049. Any year from 50 to 99 will be translated to 1950-1999.

In addition, on Windows, the default value of the `TwoDigitYearMax` property is now obtained from the corresponding Windows setting (the default value for which is now also 2049). This matches the behavior prior to .NET 5.

Date parsing is the functionality that's most affected by this change.

## Previous behavior

In .NET 6 and .NET 7, if you didn't specify a value for [System.Globalization.Calendar.TwoDigitYearMax](https://learn.microsoft.com/search/?terms=System.Globalization.Calendar.TwoDigitYearMax), parsing a string like "12/10/35" with the Gregorian calendar produced the date "December 10th, 1935".

## New behavior

Starting in .NET 8, parsing a string like "12/10/35" with the Gregorian calendar produces the date "December 10th, 2035".

## Version introduced

.NET 8 Preview 1

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

It's more logical to parse a two-digit year that's relatively close to the two digits of the current year to produce a four-digit year in the current century instead of the previous one. The Windows operating system also changed its default settings to the same number (2049).

## Recommended action

If you don't want your app to depend on the default value when parsing a string to a date, you can control how a two-digit year is translated to a four-digit year by setting the [System.Globalization.GregorianCalendar.TwoDigitYearMax](https://learn.microsoft.com/search/?terms=System.Globalization.GregorianCalendar.TwoDigitYearMax) property. The following code shows how to set it for the invariant culture.

```csharp
CultureInfo clonedInvariantCulture = (CultureInfo)(CultureInfo.InvariantCulture.Clone());
clonedInvariantCulture.DateTimeFormat.Calendar.TwoDigitYearMax = 2039; // Use any desired cutoff value.

DateTime dt = DateTime.Parse("12/25/45", clonedInvariantCulture);
```

## Affected APIs

- [System.DateOnly.Parse*](https://learn.microsoft.com/search/?terms=System.DateOnly.Parse*)
- [System.DateOnly.ParseExact*](https://learn.microsoft.com/search/?terms=System.DateOnly.ParseExact*)
- [System.DateOnly.TryParse*](https://learn.microsoft.com/search/?terms=System.DateOnly.TryParse*)
- [System.DateOnly.TryParseExact*](https://learn.microsoft.com/search/?terms=System.DateOnly.TryParseExact*)
- [System.DateTime.Parse*](https://learn.microsoft.com/search/?terms=System.DateTime.Parse*)
- [System.DateTime.ParseExact*](https://learn.microsoft.com/search/?terms=System.DateTime.ParseExact*)
- [System.DateTime.TryParse*](https://learn.microsoft.com/search/?terms=System.DateTime.TryParse*)
- [System.DateTime.TryParseExact*](https://learn.microsoft.com/search/?terms=System.DateTime.TryParseExact*)
- [System.DateTimeOffset.Parse*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.Parse*)
- [System.DateTimeOffset.ParseExact*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ParseExact*)
- [System.DateTimeOffset.TryParse*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.TryParse*)
- [System.DateTimeOffset.TryParseExact*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.TryParseExact*)
- [System.Globalization.GregorianCalendar.TwoDigitYearMax](https://learn.microsoft.com/search/?terms=System.Globalization.GregorianCalendar.TwoDigitYearMax) (and other Gregorian-like calendar types)
- [System.Globalization.GregorianCalendar.ToDateTime*](https://learn.microsoft.com/search/?terms=System.Globalization.GregorianCalendar.ToDateTime*) (and other Gregorian-like calendar types)
- [System.Globalization.GregorianCalendar.ToFourDigitYear(System.Int32)](https://learn.microsoft.com/search/?terms=System.Globalization.GregorianCalendar.ToFourDigitYear(System.Int32)) (and other Gregorian-like calendar types)

## See also

- [Parse date and time strings in .NET](../../../../standard/base-types/parsing-datetime.md)
