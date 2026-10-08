---
title: "Converting times between time zones"
description: Learn to convert times between from one time zone to another in .NET. Also learn to convert DateTimeOffset values that have limited time zone awareness.
ms.date: "07/27/2022"
ms.custom: devdivchpfy22
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "times [.NET], converting"
  - "time zones [.NET], conversions"
  - "UTC times, converting"
  - "converting times"
  - "local time conversions"
ms.topic: how-to
---
# Converting times between time zones

It's becoming increasingly important for any application that works with dates and times to handle differences between time zones. An application can no longer assume that all times can be expressed in the local time, which is the time available from the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) structure. For example, a web page that displays the current time in the eastern part of the United States will lack credibility to a customer in eastern Asia. This article explains how to convert times from one time zone to another and convert [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) values that have limited time zone awareness.

## Converting to Coordinated Universal Time

Coordinated Universal Time (UTC) is a high-precision, atomic time standard. The world's time zones are expressed as positive or negative offsets from UTC. Thus, UTC provides a time-zone free or time-zone neutral time. The use of UTC is recommended when a date and time's portability across computers is important. For details and other best practices using dates and times, see [Coding best practices using DateTime in the .NET Framework](https://learn.microsoft.com/previous-versions/dotnet/articles/ms973825\(v=msdn.10\)). Converting individual time zones to UTC makes time comparisons easy.

> **Note:**
> You can also serialize a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) structure to represent a single point in time unambiguously. Because [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) objects store a date and time value along with its offset from UTC, they always represent a particular point in time in relation to UTC.

The easiest way to convert a time to UTC is to call the `static` (`Shared` in Visual Basic) [System.TimeZoneInfo.ConvertTimeToUtc%28System.DateTime%29](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.ConvertTimeToUtc%2528System.DateTime%2529) method. The exact conversion performed by the method depends on the value of the `dateTime` parameter's [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property, as the following table shows:

| `DateTime.Kind` | Conversion |
| --- | --- |
| `DateTimeKind.Local` | Converts local time to UTC. |
| `DateTimeKind.Unspecified` | Assumes the `dateTime` parameter is local time and converts local time to UTC. |
| `DateTimeKind.Utc` | Returns the `dateTime` parameter unchanged. |

The following code converts the current local time to UTC and displays the result to the console:

[System.TimeZone2.Concepts#6 (complete source file; reference: ./snippets/timezone-concepts/TimeZone2Concepts.cs#6)](../../../_code/docs/standard/datetime/snippets/timezone-concepts/TimeZone2Concepts.cs.md)
[System.TimeZone2.Concepts#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.Concepts/VB/TimeZone2Concepts.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.Concepts/VB/TimeZone2Concepts.vb.md)

If the date and time value doesn't represent the local time or UTC, the [System.DateTime.ToUniversalTime*](https://learn.microsoft.com/search/?terms=System.DateTime.ToUniversalTime*) method will likely return an erroneous result. However, you can use the [System.TimeZoneInfo.ConvertTimeToUtc*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.ConvertTimeToUtc*) method to convert the date and time from a specified time zone. For details on retrieving a [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) object that represents the destination time zone, see [Finding the time zones defined on a local system](finding-the-time-zones-on-local-system.md). The following code uses the [System.TimeZoneInfo.ConvertTimeToUtc*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.ConvertTimeToUtc*) method to convert Eastern Standard Time to UTC:

[System.TimeZone2.Concepts#7 (complete source file; reference: ./snippets/timezone-concepts/TimeZone2Concepts.cs#7)](../../../_code/docs/standard/datetime/snippets/timezone-concepts/TimeZone2Concepts.cs.md)
[System.TimeZone2.Concepts#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.Concepts/VB/TimeZone2Concepts.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.Concepts/VB/TimeZone2Concepts.vb.md)

The [System.TimeZoneInfo.ConvertTimeToUtc*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.ConvertTimeToUtc*) method throws an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) if the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) object's [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property and the time zone are mismatched. A mismatch occurs if the [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property is [System.DateTimeKind.Local](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Local) but the [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) object doesn't represent the local time zone, or if the [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property is [System.DateTimeKind.Utc](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Utc) but the [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) object doesn't equal [System.TimeZoneInfo.Utc](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.Utc).

All of these methods take [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) values as parameters and return a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value. For [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) values, the [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) structure has a [System.DateTimeOffset.ToUniversalTime*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ToUniversalTime*) instance method that converts the date and time of the current instance to UTC. The following example calls the [System.DateTimeOffset.ToUniversalTime*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ToUniversalTime*) method to convert a local time and several other times to UTC:

[System.DateTimeOffset.Methods#16 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Methods/cs/Methods.cs#16)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Methods/cs/Methods.cs.md)
[System.DateTimeOffset.Methods#16 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Methods/vb/Methods.vb#16)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Methods/vb/Methods.vb.md)

## Converting UTC to a designated time zone

To convert UTC to local time, see the [Converting UTC to local time](#converting-utc-to-local-time) section that follows. To convert UTC to the time in any time zone that you designate, call the [System.TimeZoneInfo.ConvertTimeFromUtc*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.ConvertTimeFromUtc*) method. The method takes two parameters:

- The UTC to convert. This must be a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value whose [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property is set to `Unspecified` or `Utc`.

- The time zone to convert the UTC to.

The following code converts UTC to Central Standard Time:

[System.TimeZone2.Concepts#8 (complete source file; reference: ./snippets/timezone-concepts/TimeZone2Concepts.cs#8)](../../../_code/docs/standard/datetime/snippets/timezone-concepts/TimeZone2Concepts.cs.md)
[System.TimeZone2.Concepts#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.Concepts/VB/TimeZone2Concepts.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.Concepts/VB/TimeZone2Concepts.vb.md)

## Converting UTC to local time

To convert UTC to local time, call the [System.DateTime.ToLocalTime*](https://learn.microsoft.com/search/?terms=System.DateTime.ToLocalTime*) method of the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) object whose time you want to convert. The exact behavior of the method depends on the value of the object's [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property, as the following table shows:

| `DateTime.Kind` | Conversion |
| --- | --- |
| `DateTimeKind.Local` | Returns the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value unchanged. |
| `DateTimeKind.Unspecified` | Assumes that the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value is UTC and converts the UTC to local time. |
| `DateTimeKind.Utc` | Converts the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value to local time. |

> **Note:**
> The [System.TimeZone.ToLocalTime*](https://learn.microsoft.com/search/?terms=System.TimeZone.ToLocalTime*) method behaves identically to the `DateTime.ToLocalTime` method. It takes a single parameter, which is the date and time value, to convert.

You can also convert the time in any designated time zone to local time by using the `static` (`Shared` in Visual Basic) [System.TimeZoneInfo.ConvertTime*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.ConvertTime*) method. This technique is discussed in the next section.

## Converting between any two time zones

You can convert between any two time zones by using either of the following two `static` (`Shared` in Visual Basic) methods of the [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) class:

- [System.TimeZoneInfo.ConvertTime*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.ConvertTime*)

  This method's parameters are the date and time value to convert, a `TimeZoneInfo` object that represents the time zone of the date and time value, and a `TimeZoneInfo` object that represents the time zone to convert the date and time value to.

- [System.TimeZoneInfo.ConvertTimeBySystemTimeZoneId*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.ConvertTimeBySystemTimeZoneId*)

  This method's parameters are the date and time value to convert, the identifier of the date and time value's time zone, and the identifier of the time zone to convert the date and time value to.

Both methods require that the [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property of the date and time value to convert and the [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) object or time zone identifier that represents its time zone correspond to one another. Otherwise, an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) is thrown. For example, if the `Kind` property of the date and time value is `DateTimeKind.Local`, an exception is thrown if the `TimeZoneInfo` object passed as a parameter to the method isn't equal to `TimeZoneInfo.Local`. An exception is also thrown if the identifier passed as a parameter to the method isn't equal to `TimeZoneInfo.Local.Id`.

The following example uses the [System.TimeZoneInfo.ConvertTime*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.ConvertTime*) method to convert from Hawaiian Standard Time to local time:

[System.TimeZone2.Concepts#9 (complete source file; reference: ./snippets/timezone-concepts/TimeZone2Concepts.cs#9)](../../../_code/docs/standard/datetime/snippets/timezone-concepts/TimeZone2Concepts.cs.md)
[System.TimeZone2.Concepts#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.Concepts/VB/TimeZone2Concepts.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.Concepts/VB/TimeZone2Concepts.vb.md)

## Converting DateTimeOffset values

Date and time values represented by [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) objects aren't fully time-zone aware because the object is disassociated from its time zone at the time it's instantiated. However, in many cases, an application simply needs to convert a date and time based on two different offsets from UTC rather than on time in particular time zones. To perform this conversion, you can call the current instance's [System.DateTimeOffset.ToOffset*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ToOffset*) method. The method's single parameter is the offset of the new date and time value the method will return.

For example, if the date and time of a user request for a web page is known and is serialized as a string in the format MM/dd/yyyy hh:mm:ss zzzz, the following `ReturnTimeOnServer` method converts this date and time value to the date and time on the web server:

[System.DateTimeOffset.Conceptual.OffsetConversions#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.OffsetConversions/cs/TimeConversions.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.OffsetConversions/cs/TimeConversions.cs.md)
[System.DateTimeOffset.Conceptual.OffsetConversions#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.OffsetConversions/vb/TimeConversions.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.OffsetConversions/vb/TimeConversions.vb.md)

If the method passes the string "9/1/2007 5:32:07 -05:00," which represents the date and time in a time zone five hours earlier than UTC, it returns "9/1/2007 3:32:07 AM -07:00" for a server located in the U.S. Pacific Standard Time zone.

The [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) class also includes an overload of the [System.TimeZoneInfo.ConvertTime%28System.DateTimeOffset%2CSystem.TimeZoneInfo%29](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.ConvertTime%2528System.DateTimeOffset%252CSystem.TimeZoneInfo%2529) method that performs time zone conversions with [System.DateTimeOffset.ToOffset(System.TimeSpan)](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ToOffset(System.TimeSpan)) values. The method's parameters are a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value and a reference to the time zone to which the time is to be converted. The method call returns a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value. For example, the `ReturnTimeOnServer` method in the previous example could be rewritten as follows to call the [System.TimeZoneInfo.ConvertTime%28System.DateTimeOffset%2CSystem.TimeZoneInfo%29](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.ConvertTime%2528System.DateTimeOffset%252CSystem.TimeZoneInfo%2529) method.

[System.DateTimeOffset.Conceptual.OffsetConversions#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.OffsetConversions/cs/timeconversions2.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.OffsetConversions/cs/timeconversions2.cs.md)
[System.DateTimeOffset.Conceptual.OffsetConversions#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.OffsetConversions/vb/TimeConversions2.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.OffsetConversions/vb/TimeConversions2.vb.md)

## See also

- [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo)
- [Dates, times, and time zones](index.md)
- [Finding the time zones defined on a local system](finding-the-time-zones-on-local-system.md)
