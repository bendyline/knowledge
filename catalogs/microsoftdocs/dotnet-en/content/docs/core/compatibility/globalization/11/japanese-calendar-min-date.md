---
title: "Breaking change: Japanese Calendar minimum supported date corrected"
description: "Learn about the breaking change in .NET 11 where the Japanese Calendar minimum supported date was corrected from 1868-09-08 to 1868-10-23."
ms.date: 01/07/2026
ai-usage: ai-assisted
---

# Japanese Calendar minimum supported date corrected

The start date of the Japanese Meiji era has been updated from `1868-09-08` to `1868-10-23` to reflect the latest Unicode Common Locale Data Repository (CLDR) data and improved historical accuracy. This date also serves as the minimum supported date in the Japanese calendar.

## Version introduced

.NET 11 Preview 1

## Previous behavior

Previously, [System.Globalization.JapaneseCalendar.MinSupportedDateTime](https://learn.microsoft.com/search/?terms=System.Globalization.JapaneseCalendar.MinSupportedDateTime) returned `1868-09-08`. [System.Globalization.JapaneseCalendar](https://learn.microsoft.com/search/?terms=System.Globalization.JapaneseCalendar) accepted dates between `1868-09-08` and `1868-10-23` as valid.

## New behavior

Starting in .NET 11, [System.Globalization.JapaneseCalendar.MinSupportedDateTime](https://learn.microsoft.com/search/?terms=System.Globalization.JapaneseCalendar.MinSupportedDateTime) returns `1868-10-23` instead. [System.Globalization.JapaneseCalendar](https://learn.microsoft.com/search/?terms=System.Globalization.JapaneseCalendar) now rejects dates between `1868-09-08` and `1868-10-23` as invalid.

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

The change was made to reflect the latest Unicode CLDR data ([CLDR-11375](https://unicode-org.atlassian.net/browse/CLDR-11375)) and improved historical accuracy regarding the start of the Meiji era in Japan.

## Recommended action

Update any code that depends on the old value of [System.Globalization.JapaneseCalendar.MinSupportedDateTime](https://learn.microsoft.com/search/?terms=System.Globalization.JapaneseCalendar.MinSupportedDateTime). Avoid using Gregorian dates before `1868-10-23` with the [System.Globalization.JapaneseCalendar](https://learn.microsoft.com/search/?terms=System.Globalization.JapaneseCalendar).

## Affected APIs

- [System.Globalization.JapaneseCalendar](https://learn.microsoft.com/search/?terms=System.Globalization.JapaneseCalendar)
- [System.Globalization.JapaneseCalendar.MinSupportedDateTime](https://learn.microsoft.com/search/?terms=System.Globalization.JapaneseCalendar.MinSupportedDateTime)
