---
description: "Learn more about: How to: Resolve ambiguous times"
title: "How to: Resolve ambiguous times"
ms.date: "04/10/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "time zones [.NET], ambiguous time"
  - "ambiguous time [.NET]"
ms.topic: how-to
---
# How to: Resolve ambiguous times

An ambiguous time is a time that maps to more than one Coordinated Universal Time (UTC). It occurs when the clock time is adjusted back in time, such as during the transition from a time zone's daylight saving time to its standard time. When handling an ambiguous time, you can do one of the following:

- Make an assumption about how the time maps to UTC. For example, you can assume that an ambiguous time is always expressed in the time zone's standard time.

- If the ambiguous time is an item of data entered by the user, you can leave it to the user to resolve the ambiguity.

This topic shows how to resolve an ambiguous time by assuming that it represents the time zone's standard time.

### To map an ambiguous time to a time zone's standard time

1. Call the [System.TimeZoneInfo.IsAmbiguousTime*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.IsAmbiguousTime*) method to determine whether the time is ambiguous.

2. If the time is ambiguous, subtract the time from the [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) object returned by the time zone's [System.TimeZoneInfo.BaseUtcOffset](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.BaseUtcOffset) property.

3. Call the `static` (`Shared` in Visual Basic .NET) [System.DateTime.SpecifyKind*](https://learn.microsoft.com/search/?terms=System.DateTime.SpecifyKind*) method to set the UTC date and time value's [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property to [System.DateTimeKind.Utc](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Utc).

## Example

The following example illustrates how to convert an ambiguous time to UTC by assuming that it represents the local time zone's standard time.

[System.TimeZone2.Concepts#10 (complete source file; reference: ./snippets/timezone-concepts/TimeZone2Concepts.cs#10)](../../../_code/docs/standard/datetime/snippets/timezone-concepts/TimeZone2Concepts.cs.md)
[System.TimeZone2.Concepts#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.Concepts/VB/TimeZone2Concepts.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.Concepts/VB/TimeZone2Concepts.vb.md)

The example consists of a method named `ResolveAmbiguousTime` that determines whether the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value passed to it is ambiguous. If the value is ambiguous, the method returns a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value that represents the corresponding UTC time. The method handles this conversion by subtracting the value of the local time zone's [System.TimeZoneInfo.BaseUtcOffset](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.BaseUtcOffset) property from the local time.

Ordinarily, an ambiguous time is handled by calling the [System.TimeZoneInfo.GetAmbiguousTimeOffsets*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.GetAmbiguousTimeOffsets*) method to retrieve an array of [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) objects that contain the ambiguous time's possible UTC offsets. However, this example makes the arbitrary assumption that an ambiguous time should always be mapped to the time zone's standard time. The [System.TimeZoneInfo.BaseUtcOffset](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.BaseUtcOffset) property returns the offset between UTC and a time zone's standard time.

In this example, all references to the local time zone are made through the [System.TimeZoneInfo.Local](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.Local) property; the local time zone is never assigned to an object variable. This is a recommended practice because a call to the [System.TimeZoneInfo.ClearCachedData*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.ClearCachedData*) method invalidates any objects that the local time zone is assigned to.

## See also

- [Dates, times, and time zones](index.md)
- [How to: Let users resolve ambiguous times](let-users-resolve-ambiguous-times.md)
