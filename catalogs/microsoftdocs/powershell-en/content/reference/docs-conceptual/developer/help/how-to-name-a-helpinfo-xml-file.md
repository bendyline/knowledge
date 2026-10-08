---
description: How to name a HelpInfo XML file
ms.date: 07/10/2023
title: How to name a helpinfo XML file
---
# How to name a HelpInfo XML file

<!-- markdownlint-disable first-line-h1 -->
> **Note:**
> Manual authoring of XML-based help is very difficult. The **PlatyPS** module allows you to write
> help in Markdown and then convert it to XML-based help. This makes it much easier to write and
> maintain help. **PlatyPS** can also create the Updateable Help packages for you. For more
> information, see
> [Create XML-based help using PlatyPS](https://learn.microsoft.com/powershell/utility-modules/platyps/create-help-using-platyps).


This topic explains the required name format for the Updatable Help Information files, commonly
known as HelpInfo XML files. A HelpInfo XML file must have a name with the following format.

`<ModuleName>_<ModuleGUID>_HelpInfo.xml`

The elements of the name are as follows.

- `<ModuleName>` - The value of the **Name** property of the **ModuleInfo** object that the
  [Get-Module][01] cmdlet returns.

- `<ModuleGUID>` - The value of the **GUID** key in the module manifest.

For example, if the module name is "TestModule" and the module GUID is
9cabb9ad-f2ac-4914-a46b-bfc1bebf07f9, the name of the HelpInfo XML file for the module would be:

`TestModule_9cabb9ad-f2ac-4914-a46b-bfc1bebf07f9_HelpInfo.xml`

<!-- link references -->
[01]: https://learn.microsoft.com/powershell/module/Microsoft.PowerShell.Core/Get-Module
