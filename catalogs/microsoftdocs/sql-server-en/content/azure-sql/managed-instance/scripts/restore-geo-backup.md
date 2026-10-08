---
title: "PowerShell: Restore geo-backup for Azure SQL Managed Instance"
description: Azure PowerShell example script to restore an Azure SQL Managed Instance database from a geo-redundant backup.
author: Stralle
ms.author: strrodic
ms.reviewer: mathoma, nvraparl
ms.date: 07/03/2019
ms.service: azure-sql-managed-instance
ms.subservice: backup-restore
ms.topic: sample
ms.custom: devx-track-azurepowershell
ms.devlang: powershell
---
# Use PowerShell to restore an Azure SQL Managed Instance database to another geo-region



  **Applies to:**    [Azure SQL Managed Instance](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

This PowerShell script example restores an Azure SQL Managed Instance database from a remote geo-region (geo-restore).  

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


If you choose to install and use PowerShell locally, this tutorial requires Azure PowerShell 1.4.0 or later. If you need to upgrade, see [Install Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-az-ps). If you are running PowerShell locally, you also need to run `Connect-AzAccount` to create a connection with Azure.

## Sample script

```azurepowershell-interactive
# Connect-AzAccount
# The SubscriptionId in which to create these objects
$SubscriptionId = '<put subscription_id here>'
# Set the information for your managed instance
$SourceResourceGroupName = "myResourceGroup-$(Get-Random)"
$SourceInstanceName = "myManagedInstance-$(Get-Random)"
$SourceDatabaseName = "myInstanceDatabase-$(Get-Random)"

# Set the information for your destination managed instance
$TargetResourceGroupName = "myTargetResourceGroup-$(Get-Random)"
$TargetInstanceName = "myTargetManagedInstance-$(Get-Random)"
$TargetDatabaseName = "myTargetInstanceDatabase-$(Get-Random)"

Connect-AzAccount
Set-AzContext -SubscriptionId $SubscriptionId

$backup = Get-AzSqlInstanceDatabaseGeoBackup `
-ResourceGroupName $SourceResourceGroupName `
-InstanceName $SourceInstanceName `
-Name $SourceDatabaseName

$backup | Restore-AzSqlInstanceDatabase -FromGeoBackup `
-TargetInstanceDatabaseName $TargetDatabaseName `
-TargetInstanceName $TargetInstanceName `
-TargetResourceGroupName $TargetResourceGroupName

```

## Clean up deployment

Use the following command to remove  the resource group and all resources associated with it.

```azurepowershell-interactive
Remove-AzResourceGroup -ResourceGroupName $TargetResourceGroupName
```

## Script explanation

This script uses the following commands. Each command in the table links to command specific documentation.

| Command | Notes |
| --- | --- |
| [New-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/New-AzResourceGroup) | Creates a resource group in which all resources are stored. |
| [Get-AzSqlInstanceDatabaseGeoBackup](https://learn.microsoft.com/powershell/module/az.sql/Get-AzSqlInstanceDatabaseGeoBackup) | Gets one or more geo-backups from a database within an Azure SQL Managed Instance. |
| [Restore-AzSqlInstanceDatabase](https://learn.microsoft.com/powershell/module/az.sql/Restore-AzSqlInstanceDatabase) | Creates a database on SQL Managed Instance from geo-backup. |
| [Remove-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/remove-azresourcegroup) | Deletes a resource group, including all nested resources. |

## Next steps

For more information about PowerShell, see [Azure PowerShell documentation](https://learn.microsoft.com/powershell/azure/).

Additional PowerShell script samples for Azure SQL Database can be found in [Azure SQL Database PowerShell scripts](../../database/powershell-script-content-guide.md).
