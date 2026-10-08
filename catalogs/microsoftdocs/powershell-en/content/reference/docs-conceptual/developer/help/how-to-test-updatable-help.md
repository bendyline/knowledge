---
description: How to test Updatable Help
ms.date: 07/10/2023
title: How to Test Updatable Help
---
# How to test Updatable Help

<!-- markdownlint-disable first-line-h1 -->
> **Note:**
> Manual authoring of XML-based help is very difficult. The **PlatyPS** module allows you to write
> help in Markdown and then convert it to XML-based help. This makes it much easier to write and
> maintain help. **PlatyPS** can also create the Updateable Help packages for you. For more
> information, see
> [Create XML-based help using PlatyPS](https://learn.microsoft.com/powershell/utility-modules/platyps/create-help-using-platyps).


This topic describes approaches to testing Updatable Help for a module.

## Using verbose to detect errors

After uploading the HelpInfo XML file and CAB files for your module, test the files by running an
[Update-Help][01] command with the **Verbose** parameter. The **Verbose** parameter directs
`Update-Help` to report the critical steps in its actions, from reading the **HelpInfoUri** key in
the module manifest to validating the file types in the unpacked CAB file and placing the files in
the language-specific module directory.

When all verbose messages are resolved, run an `Update-Help` command with the **Debug** parameter.
This parameter should detect any remaining problems with the Updatable Help files.

<!-- link references -->
[01]: https://learn.microsoft.com/powershell/module/Microsoft.PowerShell.Core/Update-Help
