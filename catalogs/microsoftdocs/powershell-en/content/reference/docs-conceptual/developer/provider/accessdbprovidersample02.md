---
description: AccessDBProviderSample02
ms.date: 09/13/2016
title: AccessDBProviderSample02
---
# AccessDBProviderSample02

This sample shows how to overwrite the
[System.Management.Automation.Provider.DriveCmdletProvider.NewDrive\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.DriveCmdletProvider.NewDrive)
and
[System.Management.Automation.Provider.DriveCmdletProvider.RemoveDrive\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.DriveCmdletProvider.RemoveDrive)
methods to support calls to the `New-PSDrive` and `Remove-PSDrive` cmdlets. The provider class in
this sample derives from the
[System.Management.Automation.Provider.DriveCmdletProvider](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.DriveCmdletProvider)
class.

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

- Defining a provider class that drives from the
  [System.Management.Automation.Provider.DriveCmdletProvider](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.DriveCmdletProvider)
  class.

- Overwriting the
  [System.Management.Automation.Provider.DriveCmdletProvider.NewDrive\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.DriveCmdletProvider.NewDrive)
  method to support creating new drives. (This sample does not show how to add dynamic parameters to
  the `New-PSDrive` cmdlet.)

- Overwriting the
  [System.Management.Automation.Provider.DriveCmdletProvider.RemoveDrive\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.DriveCmdletProvider.RemoveDrive)
  method to support removing existing drives.

## Example

This sample shows how to overwrite the
[System.Management.Automation.Provider.DriveCmdletProvider.NewDrive\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.DriveCmdletProvider.NewDrive)
and
[System.Management.Automation.Provider.DriveCmdletProvider.RemoveDrive\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.DriveCmdletProvider.RemoveDrive)
methods. For this sample provider, when a drive is created its connection information is stored in
an `AccessDBPsDriveInfo` object.

[Code reference unavailable in this source snapshot: ~/../powershell-sdk-samples/SDK-2.0/csharp/AccessDBProviderSample02/AccessDBProviderSample02.cs](https://github.com/MicrosoftDocs/PowerShell-Docs/blob/a3de8f22552170e70852470d46cd52cd9ca471ec/reference/docs-conceptual/developer/provider/accessdbprovidersample02.md)

## See Also

[System.Management.Automation.Provider.ItemCmdletProvider](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.ItemCmdletProvider)

[System.Management.Automation.Provider.ContainerCmdletProvider](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.ContainerCmdletProvider)

[System.Management.Automation.Provider.NavigationCmdletProvider](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.NavigationCmdletProvider)

[Designing Your Windows PowerShell Provider](provider-types.md)
