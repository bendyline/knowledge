---
description: Provider cmdlets
ms.date: 09/12/2016
title: Provider cmdlets
---
# Provider cmdlets

The cmdlets that the user can run to manage a data store are referred to as provider cmdlets. To
support these cmdlets, you need to overwrite some of the methods defined by the base provider
classes and interfaces.

Here are the provider cmdlets that can be run by the user:

## PSDrive cmdlets

### `Get-PSDrive`

This cmdlet returns the PowerShell drives in the current session. You do not need to overwrite any
methods to support this cmdlet.

### `New-PSDrive`

This cmdlet allows the user to create PowerShell drives to access the data store. To support this
cmdlet, overwrite the following methods of
[System.Management.Automation.Provider.DriveCmdletProvider][12] class:

- [NewDrive][13]
- [NewDriveDynamicParameters][14]

### `Remove-PSDrive`

This cmdlet allows the user to remove PowerShell drives that access the data store. To support this
cmdlet, overwrite the [System.Management.Automation.Provider.DriveCmdletProvider.RemoveDrive][15]
method.

## Item cmdlets

### `Clear-Item`

This cmdlet allows the user to remove the value of an item in the data store. To support this
cmdlet, overwrite the following methods of
[System.Management.Automation.Provider.ItemCmdletProvider][43] class:

- [ClearItem][44]
- [ClearItemDynamicParameters][45]

### `Copy-Item`

This cmdlet allows the user to copy an item from one location to another. To support this cmdlet,
overwrite the following methods of
[System.Management.Automation.Provider.ContainerCmdletProvider][01] class:

- [CopyItem][02]
- [CopyItemDynamicParameters][03]

### `Get-Item`

This cmdlet allows the user to retrieve data from the data store. To support this cmdlet, overwrite
the following methods of [System.Management.Automation.Provider.ItemCmdletProvider][43] class:

- [GetItem][46]
- [GetItemDynamicParameters][47]

### `Get-ChildItem`

This cmdlet allows the user to retrieve the child items of the parent item. To support this cmdlet,
overwrite the following methods of
[System.Management.Automation.Provider.ContainerCmdletProvider][01] class:

- [GetChildItems][04]
- [GetChildItemsDynamicParameters][05]
- [GetChildNames][06]
- [GetChildNamesDynamicParameters][07]

### `Invoke-Item`

This cmdlet allows the user to perform the default action specified by the item. To support this
cmdlet, overwrite the
[System.Management.Automation.Provider.ItemCmdletProvider.InvokeDefaultAction][48] method.

### `Move-Item`

This cmdlet allows the user to move an item from one location to another location. To support this
cmdlet, overwrite the following methods of
[System.Management.Automation.Provider.NavigationCmdletProvider][53] class:

- [MoveItem][55]
- [MoveItemDynamicParameters][56]

### `New-Item`

This cmdlet allows the user to create a new item in the data store. To support this
cmdlet, overwrite the following methods of
[System.Management.Automation.Provider.ContainerCmdletProvider][01] class:

- [NewItem][57]
- [NewItemDynamicParameters][58]

### `Remove-Item`

This cmdlet allows the user to remove items from the data store. To support this cmdlet, overwrite
the following methods of [System.Management.Automation.Provider.ContainerCmdletProvider][01] class:

- [RemoveItem][08]
- [RemoveItemDynamicParameters][09]

### `Rename-Item`

This cmdlet allows the user to rename items in the data store. To support this cmdlet, overwrite the
following methods of [System.Management.Automation.Provider.ContainerCmdletProvider][01] class:

- [RenameItem][10]
- [RenameItemDynamicParameters][11]

### `Set-Item`

This cmdlet allows the user to update the values of items in the data store. To support this cmdlet,
overwrite the following methods of [System.Management.Automation.Provider.ItemCmdletProvider][43]
class:

- [SetItem][51]
- [SetItemDynamicParameters][52]

## Item content cmdlets

### `Add-Content`

This cmdlet allows the user to add content to an item.

### `Clear-Content`

This cmdlet allows the user to delete content from an item without deleting the item. To support
this cmdlet, overwrite the following methods of
[System.Management.Automation.Provider.IContentCmdletProvider][16] interface:

- [ClearContent][17]
- [ClearContentDynamicParameters][18]

### `Get-Content`

This cmdlet allows the user to retrieve the content of an item. To support this cmdlet, overwrite
the following methods of [System.Management.Automation.Provider.IContentCmdletProvider][16]
interface:

- [GetContentReader][19]
- [GetContentReaderDynamicParameters][20]

The [GetContentReader][19] method returns an
[System.Management.Automation.Provider.IContentReader][23] interface that defines the methods used
to read the content.

### `Set-Content`

This cmdlet allows the user to update the content of an item. To support this cmdlet, overwrite the
following methods of [System.Management.Automation.Provider.IContentCmdletProvider][16] interface:

- [GetContentWriter][21]
- [GetContentWriterDynamicParameters][22]

The [GetContentWriter][21] method returns an
[System.Management.Automation.Provider.IContentWriter][24] interface that defines the methods used
to write the content.

## Item property cmdlets

### `Clear-ItemProperty`

This cmdlet allows the user to delete the value of a property. To support this cmdlet, overwrite the
following methods of [System.Management.Automation.Provider.IPropertyCmdletProvider][36] interface:

- [ClearProperty][37]
- [ClearPropertyDynamicParameters][38]

### `Copy-ItemProperty`

This cmdlet allows the user to copy a property and its value from one location to another. To
support this cmdlet, overwrite the following methods of
[System.Management.Automation.Provider.IDynamicPropertyCmdletProvider][25] interface:

- [CopyProperty][26]
- [CopyPropertyDynamicParameters][27]

### `Get-ItemProperty`

This cmdlet retrieves the properties of an item. To support this cmdlet, overwrite the following
methods of [System.Management.Automation.Provider.IPropertyCmdletProvider][36] interface:

- [GetProperty][39]
- [GetPropertyDynamicParameters][40]

### `Move-ItemProperty`

This cmdlet allows the user to move a property and its value from one location to another. To
support this cmdlet, overwrite the following methods of
[System.Management.Automation.Provider.IDynamicPropertyCmdletProvider][25] interface:

- [MoveProperty][28]
- [MovePropertyDynamicParameters][29]

### `New-ItemProperty`

This cmdlet allows the user to create a new property and set its value. To support this cmdlet,
overwrite the following methods of
[System.Management.Automation.Provider.IDynamicPropertyCmdletProvider][25] interface:

- [NewProperty][30]
- [NewPropertyDynamicParameters][31]

### `Remove-ItemProperty`

This cmdlet allows the user to delete a property and its value. To support this cmdlet, overwrite
the following methods of [System.Management.Automation.Provider.IDynamicPropertyCmdletProvider][25]
interface:

- [RemoveProperty][32]
- [RemovePropertyDynamicParameters][33]

### `Rename-ItemProperty`

This cmdlet allows the user to change the name of a property. To support this cmdlet, overwrite the
following methods of [System.Management.Automation.Provider.IDynamicPropertyCmdletProvider][25]
interface:

- [RenameProperty][34]
- [RenamePropertyDynamicParameters][35]

### `Set-ItemProperty`

This cmdlet allows the user to update the properties of an item. To support this cmdlet, overwrite
the following methods of [System.Management.Automation.Provider.IPropertyCmdletProvider][36]
interface:

- [SetProperty][41]
- [SetPropertyDynamicParameters][42]

## Location cmdlets

### `Get-Location`

Retrieves information about the current working location. You do not need to overwrite any methods
to support this cmdlet.

### `Pop-Location`

This cmdlet changes the current location to the location most recently pushed onto the stack. You do
not need to overwrite any methods to support this cmdlet.

### `Push-Location`

This cmdlet adds the current location to the top of a list of locations (a "stack"). You do not need
to overwrite any methods to support this cmdlet.

### `Set-Location`

This cmdlet sets the current working location to a specified location. You do not need to overwrite
any methods to support this cmdlet.

## Path cmdlets

### `Join-Path`

This cmdlet allows the user to combine a parent and child path segment to create a provider-internal
path. To support this cmdlet, overwrite the
[System.Management.Automation.Provider.NavigationCmdletProvider.MakePath][54] method.

### `Convert-Path`

This cmdlet converts a path from a PowerShell path to a PowerShell provider path.

### `Split-Path`

Returns the specified part of a path.

### `Resolve-Path`

Resolves the wildcard characters in a path, and displays the path contents.

### `Test-Path`

This cmdlet determines whether all elements of a path exist. To support this cmdlet, overwrite the
following methods of [System.Management.Automation.Provider.ItemCmdletProvider][43] class:

- [ItemExists][49]
- [ItemExistsDynamicParameters][50]

## PSProvider cmdlets

### `Get-PSProvider`

This cmdlet returns information about the providers available in the session. You do not need to
overwrite any methods to support this cmdlet.

<!-- link references -->
[01]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ContainerCmdletProvider
[02]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ContainerCmdletProvider.CopyItem%252A
[03]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ContainerCmdletProvider.CopyItemDynamicParameters%252A
[04]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ContainerCmdletProvider.GetChildItems%252A
[05]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ContainerCmdletProvider.GetChildItemsDynamicParameters%252A
[06]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ContainerCmdletProvider.GetChildNames%252A
[07]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ContainerCmdletProvider.GetChildNamesDynamicParameters%252A
[08]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ContainerCmdletProvider.RemoveItem%252A
[09]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ContainerCmdletProvider.RemoveItemDynamicParameters%252A
[10]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ContainerCmdletProvider.RenameItem%252A
[11]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ContainerCmdletProvider.RenameItemDynamicParameters%252A
[12]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.DriveCmdletProvider
[13]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.DriveCmdletProvider.NewDrive%252A
[14]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.DriveCmdletProvider.NewDriveDynamicParameters%252A
[15]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.DriveCmdletProvider.RemoveDrive%252A
[16]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IContentCmdletProvider
[17]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IContentCmdletProvider.ClearContent%252A
[18]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IContentCmdletProvider.ClearContentDynamicParameters%252A
[19]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IContentCmdletProvider.GetContentReader%252A
[20]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IContentCmdletProvider.GetContentReaderDynamicParameters%252A
[21]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IContentCmdletProvider.GetContentWriter%252A
[22]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IContentCmdletProvider.GetContentWriterDynamicParameters%252A
[23]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IContentReader
[24]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IContentWriter
[25]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IDynamicPropertyCmdletProvider
[26]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IDynamicPropertyCmdletProvider.CopyProperty%252A
[27]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IDynamicPropertyCmdletProvider.CopyPropertyDynamicParameters%252A
[28]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IDynamicPropertyCmdletProvider.MoveProperty%252A
[29]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IDynamicPropertyCmdletProvider.MovePropertyDynamicParameters%252A
[30]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IDynamicPropertyCmdletProvider.NewProperty%252A
[31]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IDynamicPropertyCmdletProvider.NewPropertyDynamicParameters%252A
[32]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IDynamicPropertyCmdletProvider.RemoveProperty%252A
[33]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IDynamicPropertyCmdletProvider.RemovePropertyDynamicParameters%252A
[34]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IDynamicPropertyCmdletProvider.RenameProperty%252A
[35]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IDynamicPropertyCmdletProvider.RenamePropertyDynamicParameters%252A
[36]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IPropertyCmdletProvider
[37]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IPropertyCmdletProvider.ClearProperty%252A
[38]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IPropertyCmdletProvider.ClearPropertyDynamicParameters%252A
[39]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IPropertyCmdletProvider.GetProperty%252A
[40]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IPropertyCmdletProvider.GetPropertyDynamicParameters%252A
[41]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IPropertyCmdletProvider.SetProperty%252A
[42]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.IPropertyCmdletProvider.SetPropertyDynamicParameters%252A
[43]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ItemCmdletProvider
[44]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ItemCmdletProvider.ClearItem%252A
[45]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ItemCmdletProvider.ClearItemDynamicParameters%252A
[46]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ItemCmdletProvider.GetItem%252A
[47]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ItemCmdletProvider.GetItemDynamicParameters%252A
[48]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ItemCmdletProvider.InvokeDefaultAction%252A
[49]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ItemCmdletProvider.ItemExists%252A
[50]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ItemCmdletProvider.ItemExistsDynamicParameters%252A
[51]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ItemCmdletProvider.SetItem%252A
[52]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ItemCmdletProvider.SetItemDynamicParameters%252A
[53]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.NavigationCmdletProvider
[54]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.NavigationCmdletProvider.MakePath%252A
[55]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.NavigationCmdletProvider.MoveItem%252A
[56]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.NavigationCmdletProvider.MoveItemDynamicParameters%252A
[57]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ContainerCmdletProvider.NewItem%252A
[58]: https://learn.microsoft.com/search/?terms=System.Management.Automation.Provider.ContainerCmdletProvider.NewItemDynamicParameters%252A
