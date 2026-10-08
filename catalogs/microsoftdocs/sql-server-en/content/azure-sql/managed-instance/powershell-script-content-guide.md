---
title: Azure PowerShell script examples
description: Use Azure PowerShell script examples to help you create and manage Azure SQL Managed Instance resources.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: mathoma
ms.date: 04/30/2024
ms.service: azure-sql-managed-instance
ms.subservice: development
ms.topic: sample
ms.custom: azure-sql-split, devx-track-azurepowershell
ms.devlang: powershell
monikerRange: "= azuresql || = azuresql-mi"
---

# Azure PowerShell samples for Azure SQL Managed Instance



  **Applies to:**    [Azure SQL Managed Instance](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

> 
> * [Azure SQL Database](../database/powershell-script-content-guide.md?view=azuresql&preserve-view=true)
> * [Azure SQL Managed Instance](powershell-script-content-guide.md?view=azuresql&preserve-view=true)

Azure SQL Managed Instance enables you to configure your instances, and pools by using Azure PowerShell.

If you don't have an [Azure subscription](https://learn.microsoft.com/azure/guides/developer/azure-developer-guide#understanding-accounts-subscriptions-and-billing), create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.



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


If you choose to install and use the PowerShell locally, this tutorial requires AZ PowerShell 1.4.0 or later. If you need to upgrade, see [Install Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-az-ps). If you are running PowerShell locally, you also need to run `Connect-AzAccount` to create a connection with Azure.


## Samples

The following table includes links to sample Azure PowerShell scripts for Azure SQL Managed Instance.

| Link | Description |
| --- | --- |
| **Create and configure managed instances** |  |
| [Create and manage a managed instance](scripts/create-configure-managed-instance-powershell.md) | This PowerShell script shows you how to create and manage a managed instance using Azure PowerShell. |
| [Create and manage a managed instance using the Azure Resource Manager template](create-template-quickstart.md) | This PowerShell script shows you how to create and manage a managed instance using Azure PowerShell and the Azure Resource Manager template. |
| [Restore database to a managed instance in another geo-region](scripts/restore-geo-backup.md) | This PowerShell script takes a backup of one database and restores it to another region. This is known as a geo-restore disaster-recovery scenario. |
| **Configure transparent data encryption** |  |
| [Manage transparent data encryption in a managed instance using your own key from Azure Key Vault](scripts/transparent-data-encryption-byok-powershell.md) | This PowerShell script configures transparent data encryption in a Bring Your Own Key scenario for Azure SQL Managed Instance, using a key from Azure Key Vault. |
| **Configure a failover group** |  |
| [Configure a failover group for a managed instance](scripts/add-to-failover-group-powershell.md) | This PowerShell script creates two managed instances, adds them to a failover group, and then tests failover from the primary managed instance to the secondary managed instance. |

Learn more about [PowerShell cmdlets for Azure SQL Managed Instance](api-references-create-manage-instance.md#powershell-create-and-configure-managed-instances).

## Related content

The examples listed on this page use [az.sql PowerShell cmdlets](https://learn.microsoft.com/powershell/module/az.sql/) for creating and managing Azure SQL resources. Additional cmdlets for running queries and performing many database tasks are located in the [SqlServer PowerShell cmdlets](https://learn.microsoft.com/powershell/module/sqlserver/). For more information, see [SQL Server PowerShell](https://learn.microsoft.com/sql/powershell/sql-server-powershell/).
