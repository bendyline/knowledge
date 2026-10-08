---
description: "Learn more about: Reading from and Writing to the Registry Using the Microsoft.Win32 Namespace (Visual Basic)"
title: "Reading from and Writing to the Registry Using the Microsoft.Win32 Namespace"
ms.date: 07/20/2015
helpviewer_keywords:
  - "registry [Visual Basic]"
ms.assetid: 4a0dcce0-c27b-4199-baa8-ee4528da6a56
---
# Reading from and Writing to the Registry Using the Microsoft.Win32 Namespace (Visual Basic)

Although `My.Computer.Registry` should cover your basic needs when programming against the registry, you can also use the [Microsoft.Win32.Registry](https://learn.microsoft.com/search/?terms=Microsoft.Win32.Registry) and [Microsoft.Win32.RegistryKey](https://learn.microsoft.com/search/?terms=Microsoft.Win32.RegistryKey) classes in the [Microsoft.Win32](https://learn.microsoft.com/search/?terms=Microsoft.Win32) namespace of .NET.

## Keys in the Registry Class

 The [Microsoft.Win32.Registry](https://learn.microsoft.com/search/?terms=Microsoft.Win32.Registry) class supplies the base registry keys that can be used to access subkeys and their values. The base keys themselves are read-only. The following table lists and describes the seven keys exposed by the [Microsoft.Win32.Registry](https://learn.microsoft.com/search/?terms=Microsoft.Win32.Registry) class.

| **Key** | **Description** |
| --- | --- |
| [Microsoft.Win32.Registry.ClassesRoot](https://learn.microsoft.com/search/?terms=Microsoft.Win32.Registry.ClassesRoot) | Defines the types of documents and the properties associated with those types. |
| [Microsoft.Win32.Registry.CurrentConfig](https://learn.microsoft.com/search/?terms=Microsoft.Win32.Registry.CurrentConfig) | Contains hardware configuration information that is not user-specific. |
| [Microsoft.Win32.Registry.CurrentUser](https://learn.microsoft.com/search/?terms=Microsoft.Win32.Registry.CurrentUser) | Contains information about the current user preferences, such as environmental variables. |
| [Microsoft.Win32.Registry.DynData](https://learn.microsoft.com/search/?terms=Microsoft.Win32.Registry.DynData) | Contains dynamic registry data, such as that used by Virtual Device Drivers. |
| [Microsoft.Win32.Registry.LocalMachine](https://learn.microsoft.com/search/?terms=Microsoft.Win32.Registry.LocalMachine) | Contains five subkeys (Hardware, SAM, Security, Software, and System) that hold the configuration data for the local computer. |
| [Microsoft.Win32.Registry.PerformanceData](https://learn.microsoft.com/search/?terms=Microsoft.Win32.Registry.PerformanceData) | Contains performance information for software components. |
| [Microsoft.Win32.Registry.Users](https://learn.microsoft.com/search/?terms=Microsoft.Win32.Registry.Users) | Contains information about the default user preferences. |

> **Important:**
> It is more secure to write data to the current user ([Microsoft.Win32.Registry.CurrentUser](https://learn.microsoft.com/search/?terms=Microsoft.Win32.Registry.CurrentUser)) than to the local computer ([Microsoft.Win32.Registry.LocalMachine](https://learn.microsoft.com/search/?terms=Microsoft.Win32.Registry.LocalMachine)). A condition that's typically referred to as "squatting" occurs when the key you are creating was previously created by another, possibly malicious, process. To prevent this from occurring, use a method, such as [Microsoft.Win32.RegistryKey.GetValue*](https://learn.microsoft.com/search/?terms=Microsoft.Win32.RegistryKey.GetValue*), that returns `Nothing` if the key does not already exist.

## Reading a Value from the Registry

 The following code shows how to read a string from HKEY_CURRENT_USER.

 [VbResourceTasks#20 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbResourceTasks/VB/Class1.vb#20)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbResourceTasks/VB/Class1.vb.md)

 The following code reads, increments, and then writes a string to HKEY_CURRENT_USER.

 [VbResourceTasks#21 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbResourceTasks/VB/Class1.vb#21)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbResourceTasks/VB/Class1.vb.md)

## See also

- [System.SystemException](https://learn.microsoft.com/search/?terms=System.SystemException)
- [System.ApplicationException](https://learn.microsoft.com/search/?terms=System.ApplicationException)
- [Microsoft.VisualBasic.MyServices.RegistryProxy](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.RegistryProxy)
- [Try...Catch...Finally Statement](../../../language-reference/statements/try-catch-finally-statement.md)
- [Reading from and Writing to the Registry](reading-from-and-writing-to-the-registry.md)
- [Security and the Registry](security-and-the-registry.md)
