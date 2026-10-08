---
description: "Learn more about: How to: Restore time zones from an embedded resource"
title: "How to: Restore time zones from an embedded resource"
ms.date: "04/10/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "time zones [.NET], deserializing"
  - "time zones [.NET], restoring"
ms.topic: how-to
---
# How to: Restore time zones from an embedded resource

This topic describes how to restore time zones that have been saved in a resource file. For information and instructions about saving time zones, see [How to: Save time zones to an embedded resource](save-time-zones-to-an-embedded-resource.md).

### To deserialize a TimeZoneInfo object from an embedded resource

1. If the time zone to be retrieved is not a custom time zone, try to instantiate it by using the [System.TimeZoneInfo.FindSystemTimeZoneById*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.FindSystemTimeZoneById*) method.

2. Instantiate a [System.Resources.ResourceManager](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager) object by passing the fully qualified name of the embedded resource file and a reference to the assembly that contains the resource file.

   If you cannot determine the fully qualified name of the embedded resource file, use the [Ildasm.exe (IL Disassembler)](../../framework/tools/ildasm-exe-il-disassembler.md) to examine the assembly's manifest. An `.mresource` entry identifies the resource. In the example, the resource's fully qualified name is `SerializeTimeZoneData.SerializedTimeZones`.

   If the resource file is embedded in the same assembly that contains the time zone instantiation code, you can retrieve a reference to it by calling the `static` (`Shared` in Visual Basic) [System.Reflection.Assembly.GetExecutingAssembly*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.GetExecutingAssembly*) method.

3. If the call to the [System.TimeZoneInfo.FindSystemTimeZoneById*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.FindSystemTimeZoneById*) method fails, or if a custom time zone is to be instantiated, retrieve a string that contains the serialized time zone by calling the [System.Resources.ResourceManager.GetString*](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager.GetString*) method.

4. Deserialize the time zone data by calling the [System.TimeZoneInfo.FromSerializedString*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.FromSerializedString*) method.

## Example

The following example deserializes a [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) object stored in an embedded .NET XML resource file.

[TimeZone2.Serialization#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/TimeZone2.Serialization/cs/SerializeTimeZoneData.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/TimeZone2.Serialization/cs/SerializeTimeZoneData.cs.md)
[TimeZone2.Serialization#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/TimeZone2.Serialization/vb/SerializeTimeZoneData.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/TimeZone2.Serialization/vb/SerializeTimeZoneData.vb.md)

This code illustrates exception handling to ensure that a [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) object required by the application is present. It first tries to instantiate a [System.TimeZoneInfo](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo) object by retrieving it from the registry using the [System.TimeZoneInfo.FindSystemTimeZoneById*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.FindSystemTimeZoneById*) method. If the time zone cannot be instantiated, the code retrieves it from the embedded resource file.

Because data for custom time zones (time zones instantiated by using the [System.TimeZoneInfo.CreateCustomTimeZone*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.CreateCustomTimeZone*) method) are not stored in the registry, the code does not call the [System.TimeZoneInfo.FindSystemTimeZoneById*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.FindSystemTimeZoneById*) to instantiate the time zone for Palmer, Antarctica. Instead, it immediately looks to the embedded resource file to retrieve a string that contains the time zone's data before it calls the [System.TimeZoneInfo.FromSerializedString*](https://learn.microsoft.com/search/?terms=System.TimeZoneInfo.FromSerializedString*) method.

## Compiling the code

This example requires:

- That a reference to System.Windows.Forms.dll and System.Core.dll be added to the project.

- That the following namespaces be imported:

  [TimeZone2.Serialization#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/TimeZone2.Serialization/cs/SerializeTimeZoneData.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/TimeZone2.Serialization/cs/SerializeTimeZoneData.cs.md)
  [TimeZone2.Serialization#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/TimeZone2.Serialization/vb/SerializeTimeZoneData.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/TimeZone2.Serialization/vb/SerializeTimeZoneData.vb.md)

## See also

- [Dates, times, and time zones](index.md)
- [Time zone overview](time-zone-overview.md)
- [How to: Save time zones to an embedded resource](save-time-zones-to-an-embedded-resource.md)
