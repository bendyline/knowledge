---
description: "Learn more about: How to: Enumerate time zones present on a computer"
title: "How to: Enumerate time zones present on a computer"
ms.date: "04/10/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "time zones [.NET], enumerating"
  - "enumerating time zones [.NET]"
ms.topic: how-to
---
# How to: Enumerate time zones present on a computer

Successfully working with a designated time zone requires that information about that time zone be available to the system. The Windows XP and Windows Vista operating systems store this information in the registry. However, although the total number of time zones that exist throughout the world is large, the registry contains information about only a subset of them. In addition, the registry itself is a dynamic structure whose contents are subject to both deliberate and accidental change. As a result, an application cannot always assume that a particular time zone is defined and available on a system. The first step for many applications that use time zone information applications is to determine whether required time zones are available on the local system, or to give the user a list of time zones from which to select. This requires that an application enumerate the time zones defined on a local system.

> **Note:**
> If an application relies on the presence of a particular time zone that may not be defined on a local system, the application can ensure its presence by serializing and deserializing information about the time zone. The time zone can then be added to a list control so that the application user can select it. For details, see [How to: Save Time Zones to an Embedded Resource](save-time-zones-to-an-embedded-resource.md) and [How to: Restore time zones from an embedded resource](restore-time-zones-from-an-embedded-resource.md).

### To enumerate the time zones present on the local system

1. Call the [System.TimeZoneInfo.GetSystemTimeZones*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.GetSystemTimeZones*) method. The method returns a generic [System.Collections.ObjectModel.ReadOnlyCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ReadOnlyCollection%601) collection of [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) objects. The entries in the collection are sorted by their [System.TimeZoneInfo.DisplayName](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.DisplayName) property. For example:

   [System.TimeZone2.Concepts#1 (complete source file; reference: ./snippets/timezone-concepts/TimeZone2Concepts.cs#1)](../../../_code/docs/standard/datetime/snippets/timezone-concepts/TimeZone2Concepts.cs.md)
   [System.TimeZone2.Concepts#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.Concepts/VB/TimeZone2Concepts.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.Concepts/VB/TimeZone2Concepts.vb.md)

2. Enumerate the individual [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) objects in the collection by using a `foreach` loop (in C#) or a `For Each`…`Next` loop (in Visual Basic), and perform any necessary processing on each object. For example, the following code enumerates the [System.Collections.ObjectModel.ReadOnlyCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ReadOnlyCollection%601) collection of [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) objects returned in step 1 and lists the display name of each time zone on the console.

   [System.TimeZone2.Concepts#12 (complete source file; reference: ./snippets/timezone-concepts/TimeZone2Concepts.cs#12)](../../../_code/docs/standard/datetime/snippets/timezone-concepts/TimeZone2Concepts.cs.md)
   [System.TimeZone2.Concepts#12 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.Concepts/VB/TimeZone2Concepts.vb#12)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.Concepts/VB/TimeZone2Concepts.vb.md)

### To present the user with a list of time zones present on the local system

1. Call the [System.TimeZoneInfo.GetSystemTimeZones*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.GetSystemTimeZones*) method. The method returns a generic [System.Collections.ObjectModel.ReadOnlyCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ReadOnlyCollection%601) collection of [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) objects.

2. Assign the collection returned in step 1 to the `DataSource` property of a Windows forms or ASP.NET list control.

3. Retrieve the [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) object that the user has selected.

The example provides an illustration for a Windows application.

## Example

The example starts a Windows application that displays the time zones defined on a system in a list box. The example then displays a dialog box that contains the value of the [System.TimeZoneInfo.DisplayName](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.DisplayName) property of the time zone object selected by the user.

[System.TimeZone2.Concepts#2 (complete source file; reference: ./snippets/timezone-concepts/TimeZone2Concepts.cs#2)](../../../_code/docs/standard/datetime/snippets/timezone-concepts/TimeZone2Concepts.cs.md)
[System.TimeZone2.Concepts#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.Concepts/VB/TimeZone2Concepts.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.TimeZone2.Concepts/VB/TimeZone2Concepts.vb.md)

Most list controls (such as the [System.Windows.Forms.ListBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ListBox) or [System.Web.UI.WebControls.BulletedList](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.BulletedList) control) allow you to assign a collection of object variables to their `DataSource` property as long as that collection implements the [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable) interface. (The generic [System.Collections.ObjectModel.ReadOnlyCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ReadOnlyCollection%601) class does this.) To display an individual object in the collection, the control calls that object's `ToString` method to extract the string that is used to represent the object. In the case of [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) objects, the `ToString` method returns the [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) object's display name (the value of its [System.TimeZoneInfo.DisplayName](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.DisplayName) property).

> **Note:**
> Because list controls call an object's `ToString` method, you can assign a collection of [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) objects to the control, have the control display a meaningful name for each object, and retrieve the [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) object that the user has selected. This eliminates the need to extract a string for each object in the collection, assign the string to a collection that is in turn assigned to the control's `DataSource` property, retrieve the string the user has selected, and then use this string to extract the object that it describes.

## Compiling the code

This example requires:

- That the following namespaces be imported:

  [System](https://learn.microsoft.com/search/?terms=System) (in C# code)

  [System.Collections.ObjectModel](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel)

## See also

- [Dates, times, and time zones](index.md)
- [How to: Save time zones to an embedded resource](save-time-zones-to-an-embedded-resource.md)
- [How to: Restore time zones from an embedded resource](restore-time-zones-from-an-embedded-resource.md)
