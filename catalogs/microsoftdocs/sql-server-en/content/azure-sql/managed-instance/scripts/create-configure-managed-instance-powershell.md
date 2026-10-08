---
title: "PowerShell: Create a managed instance"
titleSuffix: Azure SQL Managed Instance
description: This article provides an Azure PowerShell example script to create a managed instance.
author: urosmil
ms.author: urmilano
ms.reviewer: mathoma
ms.date: 02/26/2024
ms.service: azure-sql-managed-instance
ms.subservice: deployment-configuration
ms.topic: sample
ms.custom: devx-track-azurepowershell
ms.devlang: powershell
---
# Use PowerShell to create a managed instance



  **Applies to:**    [Azure SQL Managed Instance](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

This PowerShell script example creates a managed instance in a dedicated subnet within a new virtual network. It also configures a route table and a network security group for the virtual network. Once the script has been successfully run, the managed instance can be accessed from within the virtual network or from an on-premises environment. See [Configure Azure VM to connect to Azure SQL Database Managed Instance](../connect-vm-instance-configure.md) and [Configure a point-to-site connection to Azure SQL Managed Instance from on-premises](../point-to-site-p2s-configure.md).

> **Important:**
> For limitations, see [supported regions](../resource-limits.md#supported-regions) and [supported subscription types](../resource-limits.md#supported-subscription-types).


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


If you choose to install and use PowerShell locally, this tutorial requires Azure PowerShell 1.4.0 or later. If you need to upgrade, see [Install Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-az-ps). If you are running PowerShell locally, you also need to run `Connect-AzAccount` to create a connection with Azure.

## Sample script

[Code reference unavailable in this source snapshot: ~/../azure_powershell_scripts/azure-sql/managed-instance/create-and-configure-managed-instance.ps1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/managed-instance/scripts/create-configure-managed-instance-powershell.md)


## Clean up deployment

Use the following command to remove  the resource group and all resources associated with it.

```powershell
Remove-AzResourceGroup -ResourceGroupName $resourcegroupname
```

## Script explanation

This script uses some of the following commands. For more information about used and other commands in the table below, click on the links to command specific documentation.

| Command | Notes |
| --- | --- |
| [New-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/new-azresourcegroup) | Creates a resource group in which all resources are stored. |
| [New-AzVirtualNetwork](https://learn.microsoft.com/powershell/module/az.network/new-azvirtualnetwork) | Creates a virtual network. |
| [Add-AzVirtualNetworkSubnetConfig](https://learn.microsoft.com/powershell/module/az.network/Add-AzVirtualNetworkSubnetConfig) | Adds a subnet configuration to a virtual network. |
| [Get-AzVirtualNetwork](https://learn.microsoft.com/powershell/module/az.network/Get-AzVirtualNetwork) | Gets a virtual network in a resource group. |
| [Set-AzVirtualNetwork](https://learn.microsoft.com/powershell/module/az.network/Set-AzVirtualNetwork) | Sets the goal state for a virtual network. |
| [Get-AzVirtualNetworkSubnetConfig](https://learn.microsoft.com/powershell/module/az.network/Get-AzVirtualNetworkSubnetConfig) | Gets a subnet in a virtual network. |
| [Set-AzVirtualNetworkSubnetConfig](https://learn.microsoft.com/powershell/module/az.network/Set-AzVirtualNetworkSubnetConfig) | Configures the goal state for a subnet configuration in a virtual network. |
| [New-AzRouteTable](https://learn.microsoft.com/powershell/module/az.network/New-AzRouteTable) | Creates a route table. |
| [Get-AzRouteTable](https://learn.microsoft.com/powershell/module/az.network/Get-AzRouteTable) | Gets route tables. |
| [Set-AzRouteTable](https://learn.microsoft.com/powershell/module/az.network/Set-AzRouteTable) | Sets the goal state for a route table. |
| [New-AzSqlInstance](https://learn.microsoft.com/powershell/module/az.sql/New-AzSqlInstance) | Creates a managed instance. |
| [New-AzSqlInstanceDatabase](https://learn.microsoft.com/powershell/module/az.sql/new-azsqlinstancedatabase) | Creates a database for your managed instance. |
| [Remove-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/remove-azresourcegroup) | Deletes a resource group, including all nested resources. |


## Next steps

For more information on Azure PowerShell, see [Azure PowerShell documentation](https://learn.microsoft.com/powershell/azure/).

Additional PowerShell script samples for Azure SQL Managed Instance can be found in [Azure SQL Managed Instance PowerShell scripts](../../database/powershell-script-content-guide.md).
