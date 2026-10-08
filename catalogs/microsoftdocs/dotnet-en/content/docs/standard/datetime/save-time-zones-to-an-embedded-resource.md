---
description: "Learn more about: How to: Save time zones to an embedded resource"
title: "How to: Save time zones to an embedded resource"
ms.date: "04/10/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "time zones [.NET], saving"
  - "time zone objects [.NET], serializing"
  - "time zone objects [.NET], saving"
ms.topic: how-to
---
# How to: Save time zones to an embedded resource

A time zone-aware application often requires the presence of a particular time zone. However, because the availability of individual [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) objects depends on information stored in the local system's registry, even customarily available time zones may be absent. In addition, information about custom time zones instantiated by using the [System.TimeZoneInfo.CreateCustomTimeZone*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.CreateCustomTimeZone*) method is not stored with other time zone information in the registry. To ensure that these time zones are available when they are needed, you can save them by serializing them, and later restore them by deserializing them.

Typically, serializing a [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) object occurs apart from the time zone-aware application. Depending on the data store used to hold serialized [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) objects, time zone data may be serialized as part of a setup or installation routine (for example, when the data is stored in an application key of the registry), or as part of a utility routine that runs before the final application is compiled (for example, when the serialized data is stored in a .NET XML resource (.resx) file).

In addition to a resource file that is compiled with the application, several other data stores can be used for time zone information. These include the following:

- The registry. Note that an application should use the subkeys of its own application key to store custom time zone data rather than using the subkeys of HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Time Zones.

- Configuration files.

- Other system files.

### To save a time zone by serializing it to a .resx file

1. Retrieve an existing time zone or create a new time zone.

   To retrieve an existing time zone, see [How to: Access the predefined UTC and local time zone objects](access-utc-and-local.md) and [How to: Instantiate a TimeZoneInfo object](instantiate-time-zone-info.md).

   To create a new time zone, call one of the overloads of the [System.TimeZoneInfo.CreateCustomTimeZone*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.CreateCustomTimeZone*) method. For more information, see [How to: Create time zones without adjustment rules](create-time-zones-without-adjustment-rules.md) and [How to: Create time zones with adjustment rules](create-time-zones-with-adjustment-rules.md).

2. Call the [System.TimeZoneInfo.ToSerializedString*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.ToSerializedString*) method to create a string that contains the time zone's data.

3. Instantiate a [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) object by providing the name and optionally the path of the .resx file to the [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) class constructor.

4. Instantiate a [System.Resources.ResXResourceWriter](https://learn.microsoft.com/search/?terms=System.Resources.ResXResourceWriter) object by passing the [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) object to the [System.Resources.ResXResourceWriter](https://learn.microsoft.com/search/?terms=System.Resources.ResXResourceWriter) class constructor.

5. Pass the time zone's serialized string to the [System.Resources.ResXResourceWriter.AddResource*](https://learn.microsoft.com/search/?terms=System.Resources.ResXResourceWriter.AddResource*) method.

6. Call the [System.Resources.ResXResourceWriter.Generate*](https://learn.microsoft.com/search/?terms=System.Resources.ResXResourceWriter.Generate*) method.

7. Call the [System.Resources.ResXResourceWriter.Close*](https://learn.microsoft.com/search/?terms=System.Resources.ResXResourceWriter.Close*) method.

8. Close the [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) object by calling its [System.IO.StreamWriter.Close*](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter.Close*) method.

9. Add the generated .resx file to the application's Visual Studio project.

10. Using the **Properties** window in Visual Studio, make sure that the .resx file's **Build Action** property is set to **Embedded Resource**.

## Example

The following example serializes a [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) object that represents Central Standard Time and a [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) object that represents the Palmer Station, Antarctica time to a .NET XML resource file that is named SerializedTimeZones.resx. Central Standard Time is typically defined in the registry; Palmer Station, Antarctica is a custom time zone.

[TimeZone2.Serialization#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/TimeZone2.Serialization/cs/SerializeTimeZoneData.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/TimeZone2.Serialization/cs/SerializeTimeZoneData.cs.md)
[TimeZone2.Serialization#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/TimeZone2.Serialization/vb/SerializeTimeZoneData.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/TimeZone2.Serialization/vb/SerializeTimeZoneData.vb.md)

This example serializes [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) objects so that they are available in a resource file at compile time.

Because the [System.Resources.ResXResourceWriter.Generate*](https://learn.microsoft.com/search/?terms=System.Resources.ResXResourceWriter.Generate*) method adds complete header information to a .NET XML resource file, it cannot be used to add resources to an existing file. The example handles this by checking for the SerializedTimeZones.resx file and, if it exists, storing all of its resources other than the two serialized time zones to a generic [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) object. The existing file is then deleted and the existing resources are added to a new SerializedTimeZones.resx file. The serialized time zone data is also added to this file.

The key (or **Name**) fields of resources should not contain embedded spaces. The [System.String.Replace%28System.String%2CSystem.String%29](https://learn.microsoft.com/search/?terms=System.String.Replace%2528System.String%252CSystem.String%2529) method is called to remove all embedded spaces in the time zone identifiers before they are assigned to the resource file.

## Compiling the code

This example requires:

- That a reference to System.Windows.Forms.dll and System.Core.dll be added to the project.

- That the following namespaces be imported:

  [TimeZone2.Serialization#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/TimeZone2.Serialization/cs/SerializeTimeZoneData.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/TimeZone2.Serialization/cs/SerializeTimeZoneData.cs.md)
  [TimeZone2.Serialization#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/TimeZone2.Serialization/vb/SerializeTimeZoneData.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/TimeZone2.Serialization/vb/SerializeTimeZoneData.vb.md)

## See also

- [Dates, times, and time zones](index.md)
- [Time zone overview](time-zone-overview.md)
- [How to: Restore time zones from an embedded resource](restore-time-zones-from-an-embedded-resource.md)
