---
title: Compare types related to date and time
description: Learn about differences between the DateTime, DateOnly, DateTimeOffset, TimeSpan, TimeOnly, and TimeZoneInfo types to represent date and time information in .NET.
ms.date: 04/05/2023
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "DateTimeOffset structure"
  - "TimeZoneInfo class"
  - "time zones [.NET], common uses"
  - "date and time classes [.NET]"
  - "time zones [.NET], type options"
  - "DateTime structure"
ms.assetid: 07f17aad-3571-4014-9ef3-b695a86f3800
---
# Choose between DateTime, DateOnly, DateTimeOffset, TimeSpan, TimeOnly, and TimeZoneInfo

.NET applications can use date and time information in several ways. The more common uses of date and time information include:

- To reflect a date only, so that time information is not important.
- To reflect a time only, so that date information is not important.
- To reflect an abstract date and time that's not tied to a specific time and place (for example, most stores in an international chain open on weekdays at 9:00 A.M.).
- To retrieve date and time information from sources outside of .NET, typically where date and time information is stored in a simple data type.
- To uniquely and unambiguously identify a single point in time. Some applications require that a date and time be unambiguous only on the host system. Other apps require that it be unambiguous across systems (that is, a date serialized on one system can be meaningfully deserialized and used on another system anywhere in the world).
- To preserve multiple related times (such as the requester's local time and the server's time of receipt for a web request).
- To perform date and time arithmetic, possibly with a result that uniquely and unambiguously identifies a single point in time.

.NET includes the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime), [System.DateOnly](https://learn.microsoft.com/search/?terms=System.DateOnly), [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset), [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan), [System.TimeOnly](https://learn.microsoft.com/search/?terms=System.TimeOnly), and [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) types, all of which can be used to build applications that work with dates and times.

> **Note:**
> This article doesn't discuss [System.TimeZone](https://learn.microsoft.com/search/?terms=System.TimeZone) because its functionality is almost entirely incorporated in the [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) class. Whenever possible, use the [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) class instead of the [System.TimeZone](https://learn.microsoft.com/search/?terms=System.TimeZone) class.

## The DateTimeOffset structure

The [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) structure represents a date and time value, together with an offset that indicates how much that value differs from UTC. Thus, the value always unambiguously identifies a single point in time.

The [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) type includes all of the functionality of the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) type along with time zone awareness. This makes it suitable for applications that:

- Uniquely and unambiguously identify a single point in time. The [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) type can be used to unambiguously define the meaning of "now", to log transaction times, to log the times of system or application events, and to record file creation and modification times.
- Perform general date and time arithmetic.
- Preserve multiple related times, as long as those times are stored as two separate values or as two members of a structure.

> **Note:**
> These uses for [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) values are much more common than those for [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) values. As a result, consider [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) as the default date and time type for application development.

A [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value isn't tied to a particular time zone, but can originate from a variety of time zones. The following example lists the time zones to which a number of [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) values (including a local Pacific Standard Time) can belong.

[System.DateTimeOffset.Conceptual#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual/cs/Conceptual1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual/cs/Conceptual1.cs.md)
[System.DateTimeOffset.Conceptual#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual/vb/Conceptual1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual/vb/Conceptual1.vb.md)

The output shows that each date and time value in this example can belong to at least three different time zones. The [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value of 6/10/2007 shows that if a date and time value represents a daylight saving time, its offset from UTC doesn't even necessarily correspond to the originating time zone's base UTC offset or to the offset from UTC found in its display name. Because a single [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value isn't tightly coupled with its time zone, it can't reflect a time zone's transition to and from daylight saving time. This can be problematic when date and time arithmetic is used to manipulate a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value. For a discussion of how to perform date and time arithmetic in a way that takes account of a time zone's adjustment rules, see [Performing arithmetic operations with dates and times](performing-arithmetic-operations.md).

## The DateTime structure

A [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value defines a particular date and time. It includes a [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property that provides limited information about the time zone to which that date and time belongs. The [System.DateTimeKind](https://learn.microsoft.com/search/?terms=System.DateTimeKind) value returned by the [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property indicates whether the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value represents the local time ([System.DateTimeKind.Local](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Local)), Coordinated Universal Time (UTC) ([System.DateTimeKind.Utc](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Utc)), or an unspecified time ([System.DateTimeKind.Unspecified](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Unspecified)).

The [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) structure is suitable for applications with one or more of the following characteristics:

- Work with abstract dates and times.
- Work with dates and times for which time zone information is missing.
- Work with UTC dates and times only.
- Perform date and time arithmetic, but are concerned with general results. For example, in an addition operation that adds six months to a particular date and time, it is often not important whether the result is adjusted for daylight saving time.

Unless a particular [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value represents UTC, that date and time value is often ambiguous or limited in its portability. For example, if a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value represents the local time, it's portable within that local time zone (that is, if the value is deserialized on another system in the same time zone, that value still unambiguously identifies a single point in time). Outside the local time zone, that [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value can have multiple interpretations. If the value's [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property is [System.DateTimeKind.Unspecified](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Unspecified), it's even less portable: it is now ambiguous within the same time zone and possibly even on the same system where it was first serialized. Only if a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value represents UTC does that value unambiguously identify a single point in time regardless of the system or time zone in which the value is used.

> **Important:**
> When saving or sharing [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) data, use UTC and set the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value's [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property to [System.DateTimeKind.Utc](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Utc).

## The DateOnly structure

The [System.DateOnly](https://learn.microsoft.com/search/?terms=System.DateOnly) structure represents a specific date, without time. Since it has no time component, it represents a date from the start of the day to the end of the day. This structure is ideal for storing specific dates, such as a birth date, an anniversary date, a holiday, or a business-related date.

Although you could use `DateTime` while ignoring the time component, there are a few benefits to using `DateOnly` over `DateTime`:

- The `DateTime` structure may roll into the previous or next day if it's offset by a time zone. `DateOnly` can't be offset by a time zone, and it always represents the date that was set.
- Serializing a `DateTime` structure includes the time component, which may obscure the intent of the data. Also, `DateOnly` serializes less data.
- When code interacts with a database, such as SQL Server, whole dates are generally stored as the `date` data type, which doesn't include a time. `DateOnly` matches the database type better.

For more information about `DateOnly`, see [How to use the DateOnly and TimeOnly structures](how-to-use-dateonly-timeonly.md).

> **Important:**
> `DateOnly` isn't available for .NET Framework.

## The TimeSpan structure

The [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) structure represents a time interval. Its two typical uses are:

- Reflecting the time interval between two date and time values. For example, subtracting one [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value from another returns a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value.
- Measuring elapsed time. For example, the [System.Diagnostics.Stopwatch.Elapsed](https://learn.microsoft.com/search/?terms=System.Diagnostics.Stopwatch.Elapsed) property returns a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value that reflects the time interval that has elapsed since the call to one of the [System.Diagnostics.Stopwatch](https://learn.microsoft.com/search/?terms=System.Diagnostics.Stopwatch) methods that begins to measure elapsed time.

A [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value can also be used as a replacement for a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value when that value reflects a time without reference to a particular day. This usage is similar to the [System.DateTime.TimeOfDay*](https://learn.microsoft.com/search/?terms=System.DateTime.TimeOfDay*) and [System.DateTimeOffset.TimeOfDay](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.TimeOfDay) properties, which return a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) value that represents the time without reference to a date. For example, the [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) structure can be used to reflect a store's daily opening or closing time, or it can be used to represent the time at which any regular event occurs.

The following example defines a `StoreInfo` structure that includes [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) objects for store opening and closing times, as well as a [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) object that represents the store's time zone. The structure also includes two methods, `IsOpenNow` and `IsOpenAt`, that indicates whether the store is open at a time specified by the user, who is assumed to be in the local time zone.

[Conceptual.ChoosingDates#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.choosingdates/cs/datetimereplacement1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.choosingdates/cs/datetimereplacement1.cs.md)
[Conceptual.ChoosingDates#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.choosingdates/vb/datetimereplacement1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.choosingdates/vb/datetimereplacement1.vb.md)

The `StoreInfo` structure can then be used by client code like the following.

[Conceptual.ChoosingDates#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.choosingdates/cs/datetimereplacement1.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.choosingdates/cs/datetimereplacement1.cs.md)
[Conceptual.ChoosingDates#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.choosingdates/vb/datetimereplacement1.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.choosingdates/vb/datetimereplacement1.vb.md)

## The TimeOnly structure

The [System.TimeOnly](https://learn.microsoft.com/search/?terms=System.TimeOnly) structure represents a time-of-day value, such as a daily alarm clock or what time you eat lunch each day. `TimeOnly` is limited to the range of **00:00:00.0000000** - **23:59:59.9999999**, a specific time of day.

Prior to the `TimeOnly` type being introduced, programmers typically used either the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) type or the [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) type to represent a specific time. However, using these structures to simulate a time without a date may introduce some problems, which `TimeOnly` solves:

- `TimeSpan` represents elapsed time, such as time measured with a stopwatch. The upper range is more than 29,000 years, and its value can be negative to indicate moving backwards in time. A negative `TimeSpan` doesn't indicate a specific time of the day.
- If `TimeSpan` is used as a time of day, there's a risk that it could be manipulated to a value outside of the 24-hour day. `TimeOnly` doesn't have this risk. For example, if an employee's work shift starts at 18:00 and lasts for 8 hours, adding 8 hours to the `TimeOnly` structure rolls over to 2:00.
- Using `DateTime` for a time of day requires that an arbitrary date be associated with the time, and then later disregarded. It's common practice to choose `DateTime.MinValue` (0001-01-01) as the date, however, if hours are subtracted from the `DateTime` value, an `OutOfRange` exception might occur. `TimeOnly` doesn't have this problem as the time rolls forwards and backwards around the 24-hour timeframe.
- Serializing a `DateTime` structure includes the date component, which may obscure the intent of the data. Also, `TimeOnly` serializes less data.

For more information about `TimeOnly`, see [How to use the DateOnly and TimeOnly structures](how-to-use-dateonly-timeonly.md).

> **Important:**
> `TimeOnly` isn't available for .NET Framework.

## The TimeZoneInfo class

The [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) class represents any of the Earth's time zones, and enables the conversion of any date and time in one time zone to its equivalent in another time zone. The [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) class makes it possible to work with dates and times so that any date and time value unambiguously identifies a single point in time. The [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) class is also extensible. Although it depends on time zone information provided for Windows systems and defined in the registry, it supports the creation of custom time zones. It also supports the serialization and deserialization of time zone information.

In some cases, taking full advantage of the [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) class may require further development work. If date and time values are not tightly coupled with the time zones to which they belong, further work is required. Unless your application provides some mechanism for linking a date and time with its associated time zone, it's easy for a particular date and time value to become disassociated from its time zone. One method of linking this information is to define a class or structure that contains both the date and time value and its associated time zone object.

To take advantage of time zone support in .NET, you must know the time zone to which a date and time value belongs when that date and time object is instantiated. The time zone is often not known, particularly in web or network apps.

## See also

- [Dates, times, and time zones](index.md)
