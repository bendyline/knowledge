---
title: "Converting between DateTime and DateTimeOffset"
description: Convert between DateTimeOffset values and DateTime values in .NET. The DateTimeOffset structure provides more time zone awareness than the DateTime structure.
ms.date: "08/01/2022"
ms.custom: devdivchpfy22
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "DateTime structure, converting"
  - "time zones [.NET], conversions"
  - "UTC times, converting"
  - "DateTimeOffset structure, converting"
  - "converting DateTimeOffset and DateTime values"
  - "dates [.NET], converting"
  - "converting times"
  - "Date data type, converting"
  - "local time conversions"
ms.topic: how-to
---
# Converting between DateTime and DateTimeOffset

Although the [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) structure provides a greater degree of time zone awareness than the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) structure, [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) parameters are used more commonly in method calls. Because of this approach, the ability to convert [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) values to [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) values and vice versa is important. This article shows how to perform these conversions in a way that preserves as much time zone information as possible.

> **Note:**
> Both the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and the [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) types have some limitations when representing times in time zones. With its [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property, [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) is able to reflect only Coordinated Universal Time (UTC) and the system's local time zone. [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) reflects a time's offset from UTC, but it doesn't reflect the actual time zone to which that offset belongs. For more information about time values and support for time zones, see [Choosing Between DateTime, DateTimeOffset, TimeSpan, and TimeZoneInfo](choosing-between-datetime.md).

## Conversions from DateTime to DateTimeOffset

The [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) structure provides two equivalent ways to perform [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) to [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) conversion that are suitable for most conversions:

- The [System.DateTimeOffset.%23ctor*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.%2523ctor*) constructor, which creates a new [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) object based on a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value.

- The implicit conversion operator, which allows you to assign a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value to a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) object.

For UTC and local [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) values, the [System.DateTimeOffset.Offset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.Offset) property of the resulting [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value accurately reflects the UTC or local time zone offset. For example, the following code converts a UTC time to its equivalent [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value:

[System.DateTimeOffset.Conceptual.Conversions#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs.md)
[System.DateTimeOffset.Conceptual.Conversions#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb.md)

In this case, the offset of the `utcTime2` variable is 00:00. Similarly, the following code converts a local time to its equivalent [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value. The conversion is run in the U.S. Pacific Standard Time zone:

[System.DateTimeOffset.Conceptual.Conversions#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs.md)
[System.DateTimeOffset.Conceptual.Conversions#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb.md)

However, for [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) values whose [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property is [System.DateTimeKind.Unspecified](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Unspecified), these two conversion methods produce a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value whose offset is that of the local time zone. The conversion is shown in the following example, which is run in the U.S. Pacific Standard Time zone:

[System.DateTimeOffset.Conceptual.Conversions#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs.md)
[System.DateTimeOffset.Conceptual.Conversions#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb.md)

If the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value reflects the date and time in something other than the local time zone or UTC, you can convert it to a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value and preserve its time zone information by calling the overloaded [System.DateTimeOffset.%23ctor*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.%2523ctor*) constructor. For example, the following example instantiates a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) object that reflects Central Standard Time:

[System.DateTimeOffset.Conceptual.Conversions#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs.md)
[System.DateTimeOffset.Conceptual.Conversions#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb.md)

The second parameter to this constructor overload is a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) object that represents the time's offset from UTC. Retrieve it by calling the [System.TimeZoneInfo.GetUtcOffset%28System.DateTime%29](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.GetUtcOffset%2528System.DateTime%2529) method of the time's corresponding time zone. The method's single parameter is the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value that represents the date and time to be converted. If the time zone supports daylight saving time, this parameter allows the method to determine the appropriate offset for that particular date and time.

## Conversions from DateTimeOffset to DateTime

The [System.DateTimeOffset.DateTime](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.DateTime) property is most commonly used to perform [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) to [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) conversion. However, it returns a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value whose [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property is [System.DateTimeKind.Unspecified](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Unspecified), as the following example illustrates:

[System.DateTimeOffset.Conceptual.Conversions#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs.md)
[System.DateTimeOffset.Conceptual.Conversions#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb.md)

The preceding example shows that any information about the [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value's relationship to UTC is lost by the conversion when the [System.DateTimeOffset.DateTime](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.DateTime) property is used. This behavior also affects [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) values that correspond to UTC time or the system's local time because the [System.DateTimeOffset.DateTime*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.DateTime*) structure reflects only those two time zones in its [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property.

To preserve as much time zone information as possible when converting a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) to a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value, you can use the [System.DateTimeOffset.UtcDateTime*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.UtcDateTime*) and [System.DateTimeOffset.LocalDateTime](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.LocalDateTime) properties.

### Converting a UTC time

To indicate that a converted [System.DateTimeOffset.DateTime*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.DateTime*) value is the UTC time, you can retrieve the value of the [System.DateTimeOffset.UtcDateTime](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.UtcDateTime) property. It differs from the [System.DateTimeOffset.DateTime](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.DateTime) property in two ways:

- It returns a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value whose [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property is [System.DateTimeKind.Utc](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Utc).

- If the [System.DateTimeOffset.Offset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.Offset) property value doesn't equal [System.TimeSpan.Zero](https://learn.microsoft.com/search/?terms=System.TimeSpan.Zero), it converts the time to UTC.

> **Note:**
> If your application requires that converted [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) values unambiguously identify a single point in time, you should consider using the [System.DateTimeOffset.UtcDateTime](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.UtcDateTime) property to handle all [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) to [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) conversions.

The following code uses the [System.DateTimeOffset.UtcDateTime](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.UtcDateTime) property to convert a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value whose offset equals [System.TimeSpan.Zero](https://learn.microsoft.com/search/?terms=System.TimeSpan.Zero) to a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value:

[System.DateTimeOffset.Conceptual.Conversions#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs.md)
[System.DateTimeOffset.Conceptual.Conversions#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb.md)

The following code uses the [System.DateTimeOffset.UtcDateTime](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.UtcDateTime) property to perform both a time zone conversion and a type conversion on a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value:

[System.DateTimeOffset.Conceptual.Conversions#12 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs#12)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs.md)
[System.DateTimeOffset.Conceptual.Conversions#12 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb#12)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb.md)

### Converting a local time

To indicate that a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value represents the local time, you can pass the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value returned by the [System.DateTimeOffset.DateTime](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.DateTime) property to the `static` (`Shared` in Visual Basic) [System.DateTime.SpecifyKind*](https://learn.microsoft.com/search/?terms=System.DateTime.SpecifyKind*) method. The method returns the date and time passed to it as its first parameter but sets the [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property to the value specified by its second parameter. The following code uses the [System.DateTime.SpecifyKind*](https://learn.microsoft.com/search/?terms=System.DateTime.SpecifyKind*) method when converting a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value whose offset corresponds to that of the local time zone:

[System.DateTimeOffset.Conceptual.Conversions#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs.md)
[System.DateTimeOffset.Conceptual.Conversions#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb.md)

You can also use the [System.DateTimeOffset.LocalDateTime](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.LocalDateTime) property to convert a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value to a local [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value. The [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property of the returned [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value is [System.DateTimeKind.Local](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Local). The following code uses the [System.DateTimeOffset.LocalDateTime](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.LocalDateTime) property when converting a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value whose offset corresponds to that of the local time zone:

[System.DateTimeOffset.Conceptual.Conversions#10 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs#10)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs.md)
[System.DateTimeOffset.Conceptual.Conversions#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb.md)

When you retrieve a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value using the [System.DateTimeOffset.LocalDateTime](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.LocalDateTime) property, the property's `get` accessor first converts the [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value to UTC, then converts it to local time by calling the [System.DateTimeOffset.ToLocalTime*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ToLocalTime*) method. This behavior means that you can retrieve a value from the [System.DateTimeOffset.LocalDateTime](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.LocalDateTime) property to perform a time zone conversion at the same time that you perform a type conversion. It also means that the local time zone's adjustment rules are applied in performing the conversion. The following code illustrates the use of the [System.DateTimeOffset.LocalDateTime](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.LocalDateTime) property to perform both a type and a time zone conversion. The sample output is for a machine set to the Pacific Time Zone (US and Canada). The November date is Pacific Standard Time, which is UTC-8, while the June date is Daylight Savings Time, which is UTC-7.

[System.DateTimeOffset.Conceptual.Conversions#11 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs#11)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs.md)
[System.DateTimeOffset.Conceptual.Conversions#11 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb.md)

### A general-purpose conversion method

The following example defines a method named `ConvertFromDateTimeOffset` that converts [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) values to [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) values. Based on its offset, it determines whether the [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value is a UTC time, a local time, or some other time and defines the returned date and time value's [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property accordingly.

[System.DateTimeOffset.Conceptual.Conversions#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs.md)
[System.DateTimeOffset.Conceptual.Conversions#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb.md)

The following example calls the `ConvertFromDateTimeOffset` method to convert [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) values that represent a UTC time, a local time, and a time in the U.S. Central Standard Time zone.

[System.DateTimeOffset.Conceptual.Conversions#9 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs#9)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/cs/Conversions.cs.md)
[System.DateTimeOffset.Conceptual.Conversions#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.Conversions/vb/Conversions.vb.md)

> **Note:**
> The code makes the following two assumptions, depending on the application and the source of its date and time values, might not always be valid:
>
> - It assumes that a date and time value whose offset is [System.TimeSpan.Zero](https://learn.microsoft.com/search/?terms=System.TimeSpan.Zero) represents UTC. In fact, UTC isn't a time in a particular time zone, but the time in relation to which the times in the world's time zones are standardized. Time zones can also have an offset of [System.TimeSpan.Zero](https://learn.microsoft.com/search/?terms=System.TimeSpan.Zero).
>
> - It assumes that a date and time whose offset equals that of the local time zone represents the local time zone. Because date and time values are disassociated from their original time zone, this might not be the case; the date and time can have originated in another time zone with the same offset.

## See also

- [Dates, times, and time zones](index.md)
