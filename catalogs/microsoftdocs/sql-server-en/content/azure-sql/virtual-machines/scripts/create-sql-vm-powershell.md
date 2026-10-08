---
title: "Create SQL Server VM with PowerShell script"
description: This article provides an end-to-end Azure PowerShell sample script to create SQL Server on Azure VMs.
author: bluefooted
ms.author: pamela
ms.reviewer: mathoma
ms.date: 01/23/2026
ms.service: azure-vm-sql-server
ms.subservice: deployment
ms.topic: sample
ms.custom: devx-track-azurepowershell
ms.devlang: powershell
---
# Use PowerShell to create SQL Server on Azure VM



  **Applies to:**    [Azure SQL Managed Instance](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

This PowerShell script example creates a Windows SQL Server virtual machine (VM) in Azure. 


## Use Azure Cloud Shell

Azure hosts Azure Cloud Shell, an interactive shell environment that you can use through your browser. You can use either Bash or PowerShell with Cloud Shell to work with Azure services. You can use the Cloud Shell preinstalled commands to run the code in this article, without having to install anything on your local environment.

To start Azure Cloud Shell:

| Option | Example/Link |
| --- | --- |
| Select **Try It** in the upper-right corner of a code block. Selecting **Try It** doesn't automatically copy the code to Cloud Shell. | Screenshot that shows an example of Try It for Azure Cloud Shell. |
| Go to <https://shell.azure.com>, or select the **Launch Cloud Shell** button to open Cloud Shell in your browser. | [Screenshot that shows how to launch Cloud Shell in a new window.](https://shell.azure.com) |
| Select the **Cloud Shell** button on the menu bar at the upper right in the [Azure portal](https://portal.azure.com). | Screenshot that shows the Cloud Shell button in the Azure portal |

To run the code in this article in Azure Cloud Shell:

1. Start Cloud Shell.

1. Select the **Copy** button on a code block to copy the code.

1. Paste the code into the Cloud Shell session by selecting **Ctrl**+**Shift**+**V** on Windows and Linux, or by selecting **Cmd**+**Shift**+**V** on macOS.

1. Select **Enter** to run the code.


If you choose to install and use PowerShell locally, this tutorial requires Azure PowerShell 1.4.0 or later. If you need to upgrade, see [Install Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-az-ps). If you're running PowerShell locally, you also need to run `Connect-AzAccount` to create a connection with Azure.

## Set variables

[Code reference unavailable in this source snapshot: ~/../azure_powershell_scripts/azure-sql/virtual-machine/create-sql-server-vm.ps1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/virtual-machines/scripts/create-sql-vm-powershell.md)

## Sample script

[Code reference unavailable in this source snapshot: ~/../azure_powershell_scripts/azure-sql/virtual-machine/create-sql-server-vm.ps1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/virtual-machines/scripts/create-sql-vm-powershell.md)

## Clean up deployment

Use the following command to remove the resource group and all resources associated with it.

[Code reference unavailable in this source snapshot: ~/../azure_powershell_scripts/azure-sql/virtual-machine/create-sql-server-vm.ps1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/virtual-machines/scripts/create-sql-vm-powershell.md)

## Script explanation

The script in this article uses the following commands: 

| Command | Notes |
| --- | --- |
| [Get-AzVMImageOffer](https://learn.microsoft.com/powershell/module/az.compute/get-azvmimageoffer) | Lists all Azure VM images. |
| [Get-AzVMImageSku](https://learn.microsoft.com/powershell/module/az.compute/get-azvmimagesku) | Lists the SKUs for a particular offer. |
| [New-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/new-azresourcegroup) | Creates a resource group in which all resources are stored. |
| [New-AzStorageAccount](https://learn.microsoft.com/powershell/module/az.storage/new-azstorageaccount) | Creates a new Azure storage account. |
| [New-AzVirtualNetworkSubnetConfig](https://learn.microsoft.com/powershell/module/az.network/new-azvirtualnetworksubnetconfig) | Creates and configures a new subnet. |
| [New-AzVirtualNetwork](https://learn.microsoft.com/powershell/module/az.network/new-azvirtualnetwork) | Creates a virtual network. |
| [New-AzPublicIpAddress](https://learn.microsoft.com/powershell/module/az.network/new-azpublicipaddress) | Creates a public IP address. |
| [New-AzNetworkSecurityGroup](https://learn.microsoft.com/powershell/module/az.network/new-aznetworksecuritygroup) | Creates a new security group. |
| [New-AzNetworkInterface](https://learn.microsoft.com/powershell/module/az.network/new-aznetworkinterface) | Creates a network interface. |
| [New-AzVMConfig](https://learn.microsoft.com/powershell/module/az.compute/new-azvmconfig) | Creates a configurable virtual machine object. |
| [Add-AzVMNetworkInterface](https://learn.microsoft.com/powershell/module/az.compute/add-azvmnetworkinterface) | Adds a network interface to a virtual machine. |
| [Register-AzResourceProvider](https://learn.microsoft.com/powershell/module/az.resources/register-azresourceprovider) | Registers a resource provider. |
| [New-AzSqlVM](https://learn.microsoft.com/powershell/module/az.sqlvirtualmachine/new-azsqlvm) | Creates or updates a [SQL virtual machine](../windows/manage-sql-vm-portal.md) resource. |
| [Stop-AzVM](https://learn.microsoft.com/powershell/module/az.compute/stop-azvm) | Stops an Azure virtual machine. |
| [Remove-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/remove-azresourcegroup) | Removes a resource group in Azure. |


## Related content

For more information on Azure PowerShell, see [Azure PowerShell documentation](https://learn.microsoft.com/powershell/azure/).
