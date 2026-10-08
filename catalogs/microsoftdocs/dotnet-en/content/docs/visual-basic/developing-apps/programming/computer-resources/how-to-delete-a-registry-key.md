---
description: "Learn more about: How to: Delete a Registry Key in Visual Basic"
title: "How to: Delete a Registry Key"
ms.date: 07/20/2015
f1_keywords:
  - "vb.DeleteSetting"
helpviewer_keywords:
  - "GetSetting function [Visual Basic]"
  - "registry [Visual Basic], deleting values"
  - "GetAllSettings function"
  - "registry keys [Visual Basic], deleting"
  - "registry [Visual Basic], deleting keys"
  - "examples [Visual Basic], registry"
ms.assetid: ab9aca0e-42b0-4ff7-8ff9-845a4bfdf9f2
---
# How to: Delete a Registry Key in Visual Basic

The [Microsoft.Win32.RegistryKey.DeleteSubKey%28System.String%29](https://learn.microsoft.com/search/?terms=Microsoft.Win32.RegistryKey.DeleteSubKey%2528System.String%2529) and [Microsoft.Win32.RegistryKey.DeleteSubKey%28System.String%2CSystem.Boolean%29](https://learn.microsoft.com/search/?terms=Microsoft.Win32.RegistryKey.DeleteSubKey%2528System.String%252CSystem.Boolean%2529) methods can be used to delete registry keys.

## Procedure

#### To delete a registry key

- Use the `DeleteSubKey` method to delete a registry key. This example deletes the key Software/TestApp in the CurrentUser hive. You can change this in the code to the appropriate string, or have it rely on user-supplied information.

     [VbResourceTasks#19 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbResourceTasks/VB/Class1.vb#19)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbResourceTasks/VB/Class1.vb.md)

## Robust Programming

 The `DeleteSubKey` method returns an empty string if the key/value pair does not exist.

 The following conditions may cause an exception:

- The name of the key is `Nothing` ([System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException)).

- The user does not have permissions to delete registry keys ([System.Security.SecurityException](https://learn.microsoft.com/search/?terms=System.Security.SecurityException)).

- The key name exceeds the 255-character limit ([System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException)).

- The registry key is read-only ([System.UnauthorizedAccessException](https://learn.microsoft.com/search/?terms=System.UnauthorizedAccessException)).

## .NET Framework Security

 Registry calls fail if either sufficient run-time permissions are not granted ([System.Security.Permissions.RegistryPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.RegistryPermission)) or if the user does not have the correct access (as determined by the ACLs) for creating or writing to settings. For example, a local application that has the code access security permission might not have operating system permission.

## See also

- [Microsoft.Win32.RegistryKey.DeleteSubKey*](https://learn.microsoft.com/search/?terms=Microsoft.Win32.RegistryKey.DeleteSubKey*)
- [Microsoft.Win32.RegistryKey](https://learn.microsoft.com/search/?terms=Microsoft.Win32.RegistryKey)
- [Security and the Registry](security-and-the-registry.md)
- [Reading from and Writing to the Registry](reading-from-and-writing-to-the-registry.md)
