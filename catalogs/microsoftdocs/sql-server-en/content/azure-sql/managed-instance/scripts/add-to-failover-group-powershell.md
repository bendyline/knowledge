---
title: "PowerShell: Add a SQL managed instance to a failover group"
titleSuffix: Azure SQL Managed Instance
description: Azure PowerShell example script to create a SQL managed instance, add it to a failover group, and test failover.
author: Stralle
ms.author: strrodic
ms.reviewer: mathoma
ms.date: 12/15/2023
ms.service: azure-sql-managed-instance
ms.subservice: high-availability
ms.topic: sample
ms.custom:
  - sqldbrb=1
  - devx-track-azurepowershell
ms.devlang: powershell
---
# Use PowerShell to add a SQL managed instance to a failover group



  **Applies to:**    [Azure SQL Managed Instance](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

> 
> * [Azure SQL Database](../../database/scripts/add-database-to-failover-group-powershell.md?view=azuresql-db&preserve-view=true)
> * [Azure SQL Managed Instance](add-to-failover-group-powershell.md?view=azuresql-mi&preserve-view=true)

This PowerShell script example creates two SQL managed instances, adds them to a failover group, and then tests failover from the primary SQL managed instance to the secondary SQL managed instance.

If you don't have an [Azure subscription](https://learn.microsoft.com/azure/guides/developer/azure-developer-guide#understanding-accounts-subscriptions-and-billing), create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

> **Note:**
> This article uses the Azure Az PowerShell module, which is the recommended PowerShell module for interacting with Azure. To get started with the Az PowerShell module, see [Install Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-az-ps). To learn how to migrate to the Az PowerShell module, see [Migrate Azure PowerShell from AzureRM to Az](https://learn.microsoft.com/powershell/azure/migrate-from-azurerm-to-az).

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

## Set your variables 

[Code reference unavailable in this source snapshot: ~/../azure_powershell_scripts/azure-sql/managed-instance/failover-groups/add-managed-instance-to-failover-group-az-ps.ps1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/managed-instance/scripts/add-to-failover-group-powershell.md)

## Set subscription and create resource group 

[Code reference unavailable in this source snapshot: ~/../azure_powershell_scripts/azure-sql/managed-instance/failover-groups/add-managed-instance-to-failover-group-az-ps.ps1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/managed-instance/scripts/add-to-failover-group-powershell.md)

| Command | Notes |
| --- | --- |
| 1. [Connect-AzAccount](https://learn.microsoft.com/powershell/module/az.accounts/connect-azaccount) | Connect to Azure. |
| 2. [Set-AzContext](https://learn.microsoft.com/powershell/module/az.accounts/set-azcontext) | Set the subscription context. |
| 3. [New-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/new-azresourcegroup) | Create an Azure resource group. |


## Create both managed instances

First, create the primary SQL managed instance: 

[Code reference unavailable in this source snapshot: ~/../azure_powershell_scripts/azure-sql/managed-instance/failover-groups/add-managed-instance-to-failover-group-az-ps.ps1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/managed-instance/scripts/add-to-failover-group-powershell.md)

Then, create the secondary SQL managed instance: 

[Code reference unavailable in this source snapshot: ~/../azure_powershell_scripts/azure-sql/managed-instance/failover-groups/add-managed-instance-to-failover-group-az-ps.ps1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/managed-instance/scripts/add-to-failover-group-powershell.md)

| Command | Notes |
| --- | --- |
| 1. [New-AzVirtualNetwork](https://learn.microsoft.com/powershell/module/az.network/new-azvirtualnetwork) | Create a virtual network. |
| 2. [Add-AzVirtualNetworkSubnetConfig](https://learn.microsoft.com/powershell/module/az.network/add-azvirtualnetworksubnetconfig) | Add a subnet configuration to a virtual network. |
| 3. [Set-AzVirtualNetwork](https://learn.microsoft.com/powershell/module/az.network/set-azvirtualnetwork) | Updates a virtual network. |
| 4. [Get-AzVirtualNetwork](https://learn.microsoft.com/powershell/module/az.network/get-azvirtualnetwork) | Get a virtual network in a resource group. |
| 5. [Get-AzVirtualNetworkSubnetConfig](https://learn.microsoft.com/powershell/module/az.network/get-azvirtualnetworksubnetconfig) | Get a subnet in a virtual network. |
| 6. [New-AzNetworkSecurityGroup](https://learn.microsoft.com/powershell/module/az.network/new-aznetworksecuritygroup) | Create a network security group. |
| 7. [New-AzRouteTable](https://learn.microsoft.com/powershell/module/az.network/new-azroutetable) | Create a route table. |
| 8. [Set-AzVirtualNetworkSubnetConfig](https://learn.microsoft.com/powershell/module/az.network/set-azvirtualnetworksubnetconfig) | Update a subnet configuration for a virtual network. |
| 9. [Set-AzVirtualNetwork](https://learn.microsoft.com/powershell/module/az.network/set-azvirtualnetwork) | Update a virtual network. |
| 10. [Get-AzNetworkSecurityGroup](https://learn.microsoft.com/powershell/module/az.network/get-aznetworksecuritygroup) | Get a network security group. |
| 11. [Add-AzNetworkSecurityRuleConfig](https://learn.microsoft.com/powershell/module/az.network/add-aznetworksecurityruleconfig) | Add a network security rule configuration to a network security group. |
| 12. [Set-AzNetworkSecurityGroup](https://learn.microsoft.com/powershell/module/az.network/set-aznetworksecuritygroup) | Update a network security group. |
| 13. [Get-AzRouteTable](https://learn.microsoft.com/powershell/module/az.network/get-azroutetable) | Gets route tables. |
| 14. [Add-AzRouteConfig](https://learn.microsoft.com/powershell/module/az.network/add-azrouteconfig) | Add a route to a route table. |
| 15. [Set-AzRouteTable](https://learn.microsoft.com/powershell/module/az.network/set-azroutetable) | Update a route table. |
| 16. [New-AzSqlInstance](https://learn.microsoft.com/powershell/module/az.sql/new-azsqlinstance) | Create a SQL managed instance. When creating the secondary instance, be sure to provide the `-DnsZonePartner` to link the secondary instance to your primary instance. |

## Configure virtual network peering 

Configure global virtual network peering between the virtual networks of the primary and secondary managed instances: 

[Code reference unavailable in this source snapshot: ~/../azure_powershell_scripts/azure-sql/managed-instance/failover-groups/add-managed-instance-to-failover-group-az-ps.ps1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/managed-instance/scripts/add-to-failover-group-powershell.md)

| Command | Notes |
| --- | --- |
| 1. [Get-AzVirtualNetwork](https://learn.microsoft.com/powershell/module/az.network/get-azvirtualnetwork) | Gets a virtual network in a resource group. |
| 2. [Add-AzVirtualNetworkPeering](https://learn.microsoft.com/powershell/module/az.network/add-azvirtualnetworkpeering) | Adds a peering to a virtual network. |
| 3. [Get-AzVirtualNetworkPeering](https://learn.microsoft.com/powershell/module/az.network/get-azvirtualnetworkpeering) | Gets a peering for a virtual network. |


## Create the failover group

Create the failover group: 

[Code reference unavailable in this source snapshot: ~/../azure_powershell_scripts/azure-sql/managed-instance/failover-groups/add-managed-instance-to-failover-group-az-ps.ps1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/managed-instance/scripts/add-to-failover-group-powershell.md)

| Command | Notes |
| --- | --- |
| [New-AzSqlDatabaseInstanceFailoverGroup](https://learn.microsoft.com/powershell/module/az.sql/new-azsqldatabaseinstancefailovergroup) | Creates a new Azure SQL Managed Instance failover group. |

## Test planned failover

Test planned failover by failing over to the secondary replica, and then failing back. 

| Command | Notes |
| --- | --- |
| 1. [Get-AzSqlDatabaseInstanceFailoverGroup](https://learn.microsoft.com/powershell/module/az.sql/get-azsqldatabaseinstancefailovergroup) | Gets or lists SQL Managed Instance failover groups. |
| 2. [Switch-AzSqlDatabaseInstanceFailoverGroup](https://learn.microsoft.com/powershell/module/az.sql/switch-azsqldatabaseinstancefailovergroup) | Executes a failover of a SQL Managed Instance failover group. |

### Verify the roles of each server

Use the [Get-AzSqlDatabaseInstanceFailoverGroup](https://learn.microsoft.com/powershell/module/az.sql/get-azsqldatabaseinstancefailovergroup) command to confirm the roles of each server:

[Code reference unavailable in this source snapshot: ~/../azure_powershell_scripts/azure-sql/managed-instance/failover-groups/add-managed-instance-to-failover-group-az-ps.ps1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/managed-instance/scripts/add-to-failover-group-powershell.md)

### Fail over to the secondary server

Use the  [Switch-AzSqlDatabaseInstanceFailoverGroup](https://learn.microsoft.com/powershell/module/az.sql/switch-azsqldatabaseinstancefailovergroup) to fail over to the secondary server. 

[Code reference unavailable in this source snapshot: ~/../azure_powershell_scripts/azure-sql/managed-instance/failover-groups/add-managed-instance-to-failover-group-az-ps.ps1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/managed-instance/scripts/add-to-failover-group-powershell.md)

### Revert failover group back to the primary server

Use the  [Switch-AzSqlDatabaseInstanceFailoverGroup](https://learn.microsoft.com/powershell/module/az.sql/switch-azsqldatabaseinstancefailovergroup) command to fail back to the primary server.

[Code reference unavailable in this source snapshot: ~/../azure_powershell_scripts/azure-sql/managed-instance/failover-groups/add-managed-instance-to-failover-group-az-ps.ps1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/managed-instance/scripts/add-to-failover-group-powershell.md)

## Clean up deployment

Use the following command to remove  the resource group and all resources associated with it. You'll need to remove the resource group twice. Removing the resource group the first time will remove the SQL managed instance and virtual clusters but will then fail with the error message `Remove-AzResourceGroup : Long running operation failed with status 'Conflict'`. Run the Remove-AzResourceGroup command a second time to remove any residual resources as well as the resource group.

```powershell
Remove-AzResourceGroup -ResourceGroupName $resourceGroupName
```

## Full script

The following snippet is the full script: 

[Code reference unavailable in this source snapshot: ~/../azure_powershell_scripts/azure-sql/managed-instance/failover-groups/add-managed-instance-to-failover-group-az-ps.ps1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/managed-instance/scripts/add-to-failover-group-powershell.md)

This script uses the following commands. Each command in the table links to command specific documentation.

| Command | Notes |
| --- | --- |
| [New-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/new-azresourcegroup) | Creates an Azure resource group. |
| [New-AzVirtualNetwork](https://learn.microsoft.com/powershell/module/az.network/new-azvirtualnetwork) | Creates a virtual network. |
| [Add-AzVirtualNetworkSubnetConfig](https://learn.microsoft.com/powershell/module/az.network/add-azvirtualnetworksubnetconfig) | Adds a subnet configuration to a virtual network. |
| [Get-AzVirtualNetwork](https://learn.microsoft.com/powershell/module/az.network/get-azvirtualnetwork) | Gets a virtual network in a resource group. |
| [Get-AzVirtualNetworkSubnetConfig](https://learn.microsoft.com/powershell/module/az.network/get-azvirtualnetworksubnetconfig) | Gets a subnet in a virtual network. |
| [New-AzNetworkSecurityGroup](https://learn.microsoft.com/powershell/module/az.network/new-aznetworksecuritygroup) | Creates a network security group. |
| [New-AzRouteTable](https://learn.microsoft.com/powershell/module/az.network/new-azroutetable) | Creates a route table. |
| [Set-AzVirtualNetworkSubnetConfig](https://learn.microsoft.com/powershell/module/az.network/set-azvirtualnetworksubnetconfig) | Updates a subnet configuration for a virtual network. |
| [Set-AzVirtualNetwork](https://learn.microsoft.com/powershell/module/az.network/set-azvirtualnetwork) | Updates a virtual network. |
| [Get-AzNetworkSecurityGroup](https://learn.microsoft.com/powershell/module/az.network/get-aznetworksecuritygroup) | Gets a network security group. |
| [Add-AzNetworkSecurityRuleConfig](https://learn.microsoft.com/powershell/module/az.network/add-aznetworksecurityruleconfig) | Adds a network security rule configuration to a network security group. |
| [Set-AzNetworkSecurityGroup](https://learn.microsoft.com/powershell/module/az.network/set-aznetworksecuritygroup) | Updates a network security group. |
| [Add-AzRouteConfig](https://learn.microsoft.com/powershell/module/az.network/add-azrouteconfig) | Adds a route to a route table. |
| [Set-AzRouteTable](https://learn.microsoft.com/powershell/module/az.network/set-azroutetable) | Updates a route table. |
| [New-AzSqlInstance](https://learn.microsoft.com/powershell/module/az.sql/new-azsqlinstance) | Creates a SQL managed instance. |
| [Get-AzSqlInstance](https://learn.microsoft.com/powershell/module/az.sql/get-azsqlinstance) | Returns information about Azure SQL Managed Instance. |
| [New-AzPublicIpAddress](https://learn.microsoft.com/powershell/module/az.network/new-azpublicipaddress) | Creates a public IP address. |
| [New-AzVirtualNetworkGatewayIpConfig](https://learn.microsoft.com/powershell/module/az.network/new-azvirtualnetworkgatewayipconfig) | Creates an IP Configuration for a Virtual Network Gateway |
| [New-AzVirtualNetworkGateway](https://learn.microsoft.com/powershell/module/az.network/new-azvirtualnetworkgateway) | Creates a Virtual Network Gateway |
| [New-AzVirtualNetworkGatewayConnection](https://learn.microsoft.com/powershell/module/az.network/new-azvirtualnetworkgatewayconnection) | Creates a connection between the two virtual network gateways. |
| [New-AzSqlDatabaseInstanceFailoverGroup](https://learn.microsoft.com/powershell/module/az.sql/new-azsqldatabaseinstancefailovergroup) | Creates a new Azure SQL Managed Instance failover group. |
| [Get-AzSqlDatabaseInstanceFailoverGroup](https://learn.microsoft.com/powershell/module/az.sql/get-azsqldatabaseinstancefailovergroup) | Gets or lists SQL Managed Instance failover groups. |
| [Switch-AzSqlDatabaseInstanceFailoverGroup](https://learn.microsoft.com/powershell/module/az.sql/switch-azsqldatabaseinstancefailovergroup) | Executes a failover of a SQL Managed Instance failover group. |
| [Remove-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/remove-azresourcegroup) | Removes a resource group. |

## Next steps

For more information on Azure PowerShell, see [Azure PowerShell documentation](https://learn.microsoft.com/powershell/azure/).

Additional PowerShell script samples for SQL Managed Instance can be found in [Azure SQL Managed Instance PowerShell scripts](../../database/powershell-script-content-guide.md).
