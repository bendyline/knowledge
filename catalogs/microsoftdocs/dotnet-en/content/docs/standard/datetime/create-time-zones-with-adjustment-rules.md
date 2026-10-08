---
description: "Learn more about: How to: Create time zones with adjustment rules"
title: "How to: Create time zones with adjustment rules"
ms.date: "04/10/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "time zones [.NET], creating"
  - "time zones [.NET], and adjustment rules"
  - "adjustment rule [.NET]"
ms.topic: how-to
---
# How to: Create time zones with adjustment rules

The precise time zone information that is required by an application may not be present on a particular system for several reasons:

- The time zone has never been defined in the local system's registry.

- Data about the time zone has been modified or removed from the registry.

- The time zone does not have accurate information about time zone adjustments for a particular historic period.

In these cases, you can call the [System.TimeZoneInfo.CreateCustomTimeZone*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.CreateCustomTimeZone*) method to define the time zone required by your application. You can use the overloads of this method to create a time zone with or without adjustment rules. If the time zone supports daylight saving time, you can define adjustments with either fixed or floating adjustment rules. (For definitions of these terms, see the "Time Zone Terminology" section in [Time zone overview](time-zone-overview.md).)

> **Important:**
> Custom time zones created by calling the [System.TimeZoneInfo.CreateCustomTimeZone*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.CreateCustomTimeZone*) method are not added to the registry. Instead, they can be accessed only through the object reference returned by the [System.TimeZoneInfo.CreateCustomTimeZone*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.CreateCustomTimeZone*) method call.

This topic shows how to create a time zone with adjustment rules. To create a time zone that does not support daylight saving time adjustment rules, see [How to: Create Time Zones Without Adjustment Rules](create-time-zones-without-adjustment-rules.md).

### To create a time zone with floating adjustment rules

1. For each adjustment (that is, for each transition away from and back to standard time over a particular time interval), do the following:

    1. Define the starting transition time for the time zone adjustment.

       You must call the [System.TimeZoneInfo.TransitionTime.CreateFloatingDateRule*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.TransitionTime.CreateFloatingDateRule*) method and pass it a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value that defines the time of the transition, an integer value that defines the month of the transition, an integer value that defines the week on which the transition occurs, and a [System.DayOfWeek](https://learn.microsoft.com/search/?terms=System.DayOfWeek) value that defines the day of the week on which the transition occurs. This method call instantiates a [System.TimeZoneInfo.TransitionTime](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.TransitionTime) object.

    2. Define the ending transition time for the time zone adjustment. This requires another call to the [System.TimeZoneInfo.TransitionTime.CreateFloatingDateRule*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.TransitionTime.CreateFloatingDateRule*) method. This method call instantiates a second [System.TimeZoneInfo.TransitionTime](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.TransitionTime) object.

    3. Call the [System.TimeZoneInfo.AdjustmentRule.CreateAdjustmentRule*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.AdjustmentRule.CreateAdjustmentRule*) method and pass it the effective start and end dates of the adjustment, a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) object that defines the amount of time in the transition, and the two [System.TimeZoneInfo.TransitionTime](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.TransitionTime) objects that define when the transitions to and from daylight saving time occur. This method call instantiates a [System.TimeZoneInfo.AdjustmentRule](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.AdjustmentRule) object.

    4. Assign the [System.TimeZoneInfo.AdjustmentRule](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.AdjustmentRule) object to an array of [System.TimeZoneInfo.AdjustmentRule](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.AdjustmentRule) objects.

2. Define the time zone's display name. The display name follows a fairly standard format in which the time zone's offset from Coordinated Universal Time (UTC) is enclosed in parentheses and is followed by a string that identifies the time zone, one or more of the cities in the time zone, or one or more of the countries or regions in the time zone.

3. Define the name of the time zone's standard time. Typically, this string is also used as the time zone's identifier.

4. Define the name of the time zone's daylight time.

5. If you want to use a different identifier than the time zone's standard name, define the time zone identifier.

6. Instantiate a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) object that defines the time zone's offset from UTC. Time zones with times that are later than UTC have a positive offset. Time zones with times that are earlier than UTC have a negative offset.

7. Call the [System.TimeZoneInfo.CreateCustomTimeZone%28System.String%2CSystem.TimeSpan%2CSystem.String%2CSystem.String%2CSystem.String%2CSystem.TimeZoneInfo.AdjustmentRule%5B%5D%29](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.CreateCustomTimeZone%2528System.String%252CSystem.TimeSpan%252CSystem.String%252CSystem.String%252CSystem.String%252CSystem.TimeZoneInfo.AdjustmentRule%255B%255D%2529) method to instantiate the new time zone.

## Example

The following example defines a Central Standard Time zone for the United States that includes adjustment rules for a variety of time intervals from 1918 to the present.

[System.TimeZone2.CreateTimeZone#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.TimeZone2.CreateTimeZone/cs/System.TimeZone2.CreateTimeZone.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.TimeZone2.CreateTimeZone/cs/System.TimeZone2.CreateTimeZone.cs.md)
[System.TimeZone2.CreateTimeZone#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.CreateTimeZone/vb/System.TimeZone2.CreateTimeZone.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.CreateTimeZone/vb/System.TimeZone2.CreateTimeZone.vb.md)

The time zone created in this example has multiple adjustment rules. Care must be taken to ensure that the effective start and end dates of any adjustment rule do not overlap with the dates of another adjustment rule. If there is an overlap, an [System.InvalidTimeZoneException](https://learn.microsoft.com/search/?terms=System.InvalidTimeZoneException) is thrown.

For floating adjustment rules, the value 5 is passed to the `week` parameter of the [System.TimeZoneInfo.TransitionTime.CreateFloatingDateRule*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.TransitionTime.CreateFloatingDateRule*) method to indicate that the transition occurs on the last week of a particular month.

In creating the array of [System.TimeZoneInfo.AdjustmentRule](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.AdjustmentRule) objects to use in the [System.TimeZoneInfo.CreateCustomTimeZone%28System.String%2CSystem.TimeSpan%2CSystem.String%2CSystem.String%2CSystem.String%2CSystem.TimeZoneInfo.AdjustmentRule%5B%5D%29](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.CreateCustomTimeZone%2528System.String%252CSystem.TimeSpan%252CSystem.String%252CSystem.String%252CSystem.String%252CSystem.TimeZoneInfo.AdjustmentRule%255B%255D%2529) method call, the code could initialize the array to the size required by the number of adjustments to be created for the time zone. Instead, this code example calls the [System.Collections.Generic.List`1.Add*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601.Add*) method to add each adjustment rule to a generic [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601) collection of [System.TimeZoneInfo.AdjustmentRule](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.AdjustmentRule) objects. The code then calls the [System.Collections.Generic.List`1.CopyTo*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601.CopyTo*) method to copy the members of this collection to the array.

The example also uses the [System.TimeZoneInfo.TransitionTime.CreateFixedDateRule*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.TransitionTime.CreateFixedDateRule*) method to define fixed-date adjustments. This is similar to calling the [System.TimeZoneInfo.TransitionTime.CreateFloatingDateRule*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.TransitionTime.CreateFloatingDateRule*) method, except that it requires only the time, month, and day of the transition parameters.

The example can be tested using code such as the following:

[System.TimeZone2.CreateTimeZone#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.TimeZone2.CreateTimeZone/cs/System.TimeZone2.CreateTimeZone.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.TimeZone2.CreateTimeZone/cs/System.TimeZone2.CreateTimeZone.cs.md)
[System.TimeZone2.CreateTimeZone#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.CreateTimeZone/vb/System.TimeZone2.CreateTimeZone.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.CreateTimeZone/vb/System.TimeZone2.CreateTimeZone.vb.md)

## See also

- [Dates, times, and time zones](index.md)
- [Time zone overview](time-zone-overview.md)
- [How to: Create time zones without adjustment rules](create-time-zones-without-adjustment-rules.md)
