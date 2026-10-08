---
description: Provider cmdlet parameters
ms.date: 09/13/2016
title: Provider cmdlet parameters
---
# Provider cmdlet parameters

Provider cmdlets come with a set of static parameters that are available to all providers that support the cmdlet, as well as dynamic parameters that are added when the user specifies a certain value for certain static parameters of the provider cmdlet.

## Provider Cmdlet Static Parameters

Static parameters are defined by Windows PowerShell. A large set of these parameters is implemented by Windows PowerShell to provide consistency across all the providers and to provide a simpler development experience. Examples of these parameters include the `LiteralPath`, `Exclude`, and `Include` parameters of the `Get-Item` cmdlet. A smaller set of these parameters can be overwritten to provide actions that are specific to your provider. Examples of these parameters include the `Path` and `Value` parameter of the `Set-Item` cmdlet. Here is a list of the parameters that can be overwritten for the provider cmdlets.

`Clear-Content` cmdlet
You can define how your provider will use the values passed to the `Path` parameter of the `Clear-Content` cmdlet by implementing the [System.Management.Automation.Provider.IContentCmdletProvider.ClearContent\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.IContentCmdletProvider.ClearContent) method.

`Clear-Item` cmdlet
You can define how your provider will use the values passed to the `Path` parameter of the `Clear-Item` cmdlet by implementing the [System.Management.Automation.Provider.ItemCmdletProvider.ClearItem\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.ItemCmdletProvider.ClearItem) method.

`Clear-ItemProperty` cmdlet
You can define how your provider will use the values passed to the `Path` and `Name` parameters of the `Clear-ItemProperty` cmdlet by implementing the [System.Management.Automation.Provider.IPropertyCmdletProvider.ClearProperty\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.IPropertyCmdletProvider.ClearProperty) method.

`Copy-Item` cmdlet
You can define how your provider will use the values passed to the `Path`, `Destination`, and `Recurse` parameters of the `Copy-Item` cmdlet by implementing the [System.Management.Automation.Provider.ContainerCmdletProvider.CopyItem](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.ContainerCmdletProvider.CopyItem) method.

Get-ChildItems cmdlet
You can define how your provider will use the values passed to the `Path` and `Recurse` parameters of the `Get-ChildItem` cmdlet by implementing the [System.Management.Automation.Provider.ContainerCmdletProvider.GetChildItems\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.ContainerCmdletProvider.GetChildItems) and [System.Management.Automation.Provider.ContainerCmdletProvider.GetChildNames\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.ContainerCmdletProvider.GetChildNames) methods.

`Get-Content` cmdlet
You can define how your provider will use the values passed to the `Path` parameter of the `Get-Content` cmdlet by implementing the [System.Management.Automation.Provider.IContentCmdletProvider.GetContentReader\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.IContentCmdletProvider.GetContentReader) method.

`Get-Item` cmdlet
You can define how your provider will use the values passed to the `Path` parameter of the `Get-Item` cmdlet by implementing the [System.Management.Automation.Provider.ItemCmdletProvider.GetItem\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.ItemCmdletProvider.GetItem) method.

`Get-ItemProperty` cmdlet
You can define how your provider will use the values passed to the `Path` and `Name` parameters of the `Get-ItemProperty` cmdlet by implementing the [System.Management.Automation.Provider.IPropertyCmdletProvider.GetProperty\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.IPropertyCmdletProvider.GetProperty) method.

`Invoke-Item` cmdlet
You can define how your provider will use the values passed to the `Path` parameter of the `Invoke-Item` cmdlet by implementing the [System.Management.Automation.Provider.ItemCmdletProvider.InvokeDefaultAction\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.ItemCmdletProvider.InvokeDefaultAction) method.

`Move-Item` cmdlet
You can define how your provider will use the values passed to the `Path` and `Destination` parameters of the `Move-Item` cmdlet by implementing the [System.Management.Automation.Provider.NavigationCmdletProvider.MoveItem\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.NavigationCmdletProvider.MoveItem) method.

`New-Item` cmdlet
You can define how your provider will use the values passed to the `Path`, `ItemType`, and `Value` parameters of the `New-Item` cmdlet by implementing the [System.Management.Automation.Provider.ContainerCmdletProvider.NewItem\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.ContainerCmdletProvider.NewItem) method.

`New-ItemProperty` cmdlet
You can define how your provider will use the values passed to the `Path`, `Name`, `PropertyType`, and `Value` parameters of the `New-ItemProperty` cmdlet by implementing the [Microsoft.PowerShell.Commands.RegistryProvider.NewProperty\*](https://learn.microsoft.com/dotnet/api/Microsoft.PowerShell.Commands.RegistryProvider.NewProperty) method.

`Remove-Item`
You can define how your provider will use the values passed to the `Path` and `Recurse` parameters of the `Remove-Item` cmdlet by implementing the [System.Management.Automation.Provider.ContainerCmdletProvider.RemoveItem\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.ContainerCmdletProvider.RemoveItem) method.

`Remove-ItemProperty`
You can define how your provider will use the values passed to the `Path` and `Name` parameters of the `Remove-ItemProperty` cmdlet by implementing the [System.Management.Automation.Provider.IDynamicPropertyCmdletProvider.RemoveProperty\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.IDynamicPropertyCmdletProvider.RemoveProperty) method.

`Rename-Item` cmdlet
You can define how your provider will use the values passed to the `Path` and `NewName` parameters of the `Rename-Item` cmdlet by implementing the [System.Management.Automation.Provider.ContainerCmdletProvider.RenameItem\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.ContainerCmdletProvider.RenameItem) method.

`Rename-ItemProperty`
You can define how your provider will use the values passed to the `Path`, `NewName`, and `Name` parameters of the `Rename-ItemProperty` cmdlet by implementing the [System.Management.Automation.Provider.IDynamicPropertyCmdletProvider.RenameProperty\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.IDynamicPropertyCmdletProvider.RenameProperty) method.

`Set-Content` cmdlet
You can define how your provider will use the values passed to the `Path` parameter of the `Set-Content` cmdlet by implementing the [System.Management.Automation.Provider.IContentCmdletProvider.GetContentWriter\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.IContentCmdletProvider.GetContentWriter) method.

`Set-Item` cmdlet
You can define how your provider will use the values passed to the `Path` and `Value` parameters of the `Set-Item` cmdlet by implementing the [System.Management.Automation.Provider.ItemCmdletProvider.SetItem\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.ItemCmdletProvider.SetItem) method.

`Set-ItemProperty` cmdlet
You can define how your provider will use the values passed to the `Path` and `Value` parameters of the `Set-Item` cmdlet by implementing the [System.Management.Automation.Provider.IPropertyCmdletProvider.SetProperty\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.IPropertyCmdletProvider.SetProperty) method.

`Test-Path` cmdlet
You can define how your provider will use the values passed to the `Path` parameter of the `Test-Path` cmdlet by implementing the [System.Management.Automation.Provider.ItemCmdletProvider.InvokeDefaultAction\*](https://learn.microsoft.com/dotnet/api/System.Management.Automation.Provider.ItemCmdletProvider.InvokeDefaultAction) method.

In addition, you cannot specify the characteristics of these parameters, such as whether they are optional or required, nor can you give these parameters an alias or specify any of the validation attributes. In contrast, you can specify parameter characteristics in stand-alone cmdlets by using attributes such as the `Parameters` attribute.

## Provider Cmdlet Dynamic Parameters

Dynamic parameters for cmdlet providers are similar to dynamic providers for stand-alone cmdlets. In both cases, the parameters are added to the cmdlet when the user specifies a certain value for one of the default parameters, such as the `path` parameter. However, not all of the static parameters can be used to trigger the addition of dynamic parameters. For more information about dynamic parameters, see [Provider Cmdlet Dynamic Parameters](provider-cmdlet-dynamic-parameters.md).

## See Also

[Provider Cmdlet Dynamic Parameters](provider-cmdlet-dynamic-parameters.md)

[Writing a Windows PowerShell Provider](https://github.com/MicrosoftDocs/PowerShell-Docs/blob/a3de8f22552170e70852470d46cd52cd9ca471ec/reference/docs-conceptual/developer/provider/writing-a-windows-powershell-provider.md)
