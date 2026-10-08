---
description: AccessDBProviderSample01
ms.date: 09/13/2016
title: AccessDBProviderSample01
---
# AccessDBProviderSample01

This sample shows how to declare a provider class that derives directly from the
[System.Management.Automation.Provider.CmdletProvider](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.CmdletProvider)
class. It is included here only for completeness.

## Demonstrates

> **Important:**
> Your provider class will most likely derive from one of the following classes and possibly
> implement other provider interfaces:
>
> - [System.Management.Automation.Provider.ItemCmdletProvider](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.ItemCmdletProvider) class. See [AccessDBProviderSample03](accessdbprovidersample03.md).
> - [System.Management.Automation.Provider.ContainerCmdletProvider](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.ContainerCmdletProvider) class. See [AccessDBProviderSample04](accessdbprovidersample04.md).
> - [System.Management.Automation.Provider.NavigationCmdletProvider](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.NavigationCmdletProvider) class. See [AccessDBProviderSample05](accessdbprovidersample05.md).
>
> For more information about choosing which provider class to derive from based on provider
> features, see [Designing Your Windows PowerShell Provider](provider-types.md).

This sample demonstrates the following:

- Declaring the `CmdletProvider` attribute.

- Defining a provider class that derives directly from the
  [System.Management.Automation.Provider.CmdletProvider](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.CmdletProvider)
  class.

## Example

This sample shows how to define a provider class and how to declare the `CmdletProvider` attribute.

[Code reference unavailable in this source snapshot: ~/../powershell-sdk-samples/SDK-2.0/csharp/AccessDBProviderSample01/AccessDBProviderSample01.cs](https://github.com/MicrosoftDocs/PowerShell-Docs/blob/a3de8f22552170e70852470d46cd52cd9ca471ec/reference/docs-conceptual/developer/provider/accessdbprovidersample01.md)

## See Also

[System.Management.Automation.Provider.ItemCmdletProvider](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.ItemCmdletProvider)

[System.Management.Automation.Provider.ContainerCmdletProvider](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.ContainerCmdletProvider)

[System.Management.Automation.Provider.NavigationCmdletProvider](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.NavigationCmdletProvider)

[Designing Your Windows PowerShell Provider](provider-types.md)
