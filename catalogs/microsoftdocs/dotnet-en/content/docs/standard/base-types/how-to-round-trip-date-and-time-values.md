---
title: "How to: Round-trip Date and Time Values"
description: "Learn how to round-trip date and time values"
ms.date: 11/15/2022
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "round-trip date and time values"
  - "dates [.NET], round-trip values"
  - "time [.NET], round-trip values"
  - "formatting strings [.NET], round-trip values"
ms.assetid: b609b277-edc6-4c74-b03e-ea73324ecbdb
---
# How to: Round-trip Date and time values

In many applications, a date and time value is intended to unambiguously identify a single point in time. This article shows how to save and restore a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value, a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value, and a date and time value with time zone information so that the restored value identifies the same time as the saved value.

## Round-trip a DateTime value

1. Convert the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value to its string representation by calling the [System.DateTime.ToString%28System.String%29](https://learn.microsoft.com/search/?terms=System.DateTime.ToString%2528System.String%2529) method with the "o" format specifier.

2. Save the string representation of the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value to a file, or pass it across a process, application domain, or machine boundary.

3. Retrieve the string that represents the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value.

4. Call the [System.DateTime.Parse%28System.String%2CSystem.IFormatProvider%2CSystem.Globalization.DateTimeStyles%29](https://learn.microsoft.com/search/?terms=System.DateTime.Parse%2528System.String%252CSystem.IFormatProvider%252CSystem.Globalization.DateTimeStyles%2529) method, and pass [System.Globalization.DateTimeStyles.RoundtripKind](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeStyles.RoundtripKind) as the value of the `styles` parameter.

The following example illustrates how to round-trip a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value.

[Formatting.HowTo.RoundTrip#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.RoundTrip/cs/RoundTrip.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.RoundTrip/cs/RoundTrip.cs.md)
[Formatting.HowTo.RoundTrip#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.RoundTrip/vb/RoundTrip.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.RoundTrip/vb/RoundTrip.vb.md)

When round-tripping a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value, this technique successfully preserves the time for all local and universal times. For example, if a local [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value is saved on a system in the U.S. Pacific Standard Time zone and is restored on a system in the U.S. Central Standard Time zone, the restored date and time will be two hours later than the original time, which reflects the time difference between the two time zones. However, this technique is not necessarily accurate for unspecified times. All [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) values whose [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property is [System.DateTimeKind.Unspecified](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Unspecified) are treated as if they are local times. If it's not a local time, the [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) doesn't successfully identify the correct point in time. The workaround for this limitation is to tightly couple a date and time value with its time zone for the save and restore operation.

## Round-trip a DateTimeOffset value

1. Convert the [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value to its string representation by calling the [System.DateTimeOffset.ToString%28System.String%29](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ToString%2528System.String%2529) method with the "o" format specifier.

2. Save the string representation of the [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value to a file, or pass it across a process, application domain, or machine boundary.

3. Retrieve the string that represents the [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value.

4. Call the [System.DateTimeOffset.Parse%28System.String%2CSystem.IFormatProvider%2CSystem.Globalization.DateTimeStyles%29](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.Parse%2528System.String%252CSystem.IFormatProvider%252CSystem.Globalization.DateTimeStyles%2529) method, and pass [System.Globalization.DateTimeStyles.RoundtripKind](https://learn.microsoft.com/search/?terms=System.Globalization.DateTimeStyles.RoundtripKind) as the value of the `styles` parameter.

The following example illustrates how to round-trip a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value.

[Formatting.HowTo.RoundTrip#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.RoundTrip/cs/RoundTrip.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.RoundTrip/cs/RoundTrip.cs.md)
[Formatting.HowTo.RoundTrip#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.RoundTrip/vb/RoundTrip.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.RoundTrip/vb/RoundTrip.vb.md)

This technique always unambiguously identifies a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value as a single point in time. The value can then be converted to Coordinated Universal Time (UTC) by calling the [System.DateTimeOffset.ToUniversalTime*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ToUniversalTime*) method, or it can be converted to the time in a particular time zone by calling the [System.DateTimeOffset.ToOffset*](https://learn.microsoft.com/search/?terms=System.DateTimeOffset.ToOffset*) or [System.TimeZoneInfo.ConvertTime%28System.DateTimeOffset%2CSystem.TimeZoneInfo%29](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.ConvertTime%2528System.DateTimeOffset%252CSystem.TimeZoneInfo%2529) method. The major limitation of this technique is that date and time arithmetic, when performed on a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value that represents the time in a particular time zone, may not produce accurate results for that time zone. This is because when a [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) value is instantiated, it is disassociated from its time zone. Therefore, that time zone's adjustment rules can no longer be applied when you perform date and time calculations. You can work around this problem by defining a custom type that includes both a date and time value and its accompanying time zone.

## Compile the code

These examples require that the following namespaces be imported with C# `using` directives or Visual Basic `Imports` statements:

- [System](https://learn.microsoft.com/search/?terms=System) (C# only)
- [System.Globalization](https://learn.microsoft.com/search/?terms=System.Globalization)
- [System.IO](https://learn.microsoft.com/search/?terms=System.IO)

## See also

- [Choosing Between DateTime, DateTimeOffset, TimeSpan, and TimeZoneInfo](../datetime/choosing-between-datetime.md)
- [Standard Date and Time Format Strings](standard-date-and-time-format-strings.md)
