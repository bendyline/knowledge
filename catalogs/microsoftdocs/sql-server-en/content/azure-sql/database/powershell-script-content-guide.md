---
title: Azure PowerShell script examples
titleSuffix: Azure SQL Database
description: Use Azure PowerShell script examples to help you create and manage Azure SQL Database resources.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: mathoma
ms.date: 04/30/2024
ms.service: azure-sql-database
ms.subservice: development
ms.topic: sample
ms.custom: azure-sql-split, devx-track-azurepowershell
ms.devlang: powershell
monikerRange: "= azuresql || = azuresql-db"
---

# Azure PowerShell samples for Azure SQL Database 



  **Applies to:**    [Azure SQL Database](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

> 
> * [Azure SQL Database](powershell-script-content-guide.md?view=azuresql&preserve-view=true)
> * [Azure SQL Managed Instance](../managed-instance/powershell-script-content-guide.md?view=azuresql&preserve-view=true)

Azure SQL Database enables you to configure your databases, and pools by using Azure PowerShell.

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

The following table includes links to sample Azure PowerShell scripts for Azure SQL Database.

| Link | Description |
| --- | --- |
| **Create and configure single databases and elastic pools** |  |
| [Create a single database and configure a server-level firewall rule](scripts/create-and-configure-database-powershell.md) | This PowerShell script creates a single database and configures a server-level IP firewall rule. |
| [Create elastic pools and move pooled databases](scripts/move-database-between-elastic-pools-powershell.md) | This PowerShell script creates elastic pools, moves pooled databases, and changes compute sizes. |
| **Configure geo-replication and failover** |  |
| [Configure and fail over a single database using active geo-replication](scripts/setup-geodr-and-failover-database-powershell.md) | This PowerShell script configures active geo-replication for a single database and fails it over to the secondary replica. |
| [Configure and fail over a pooled database using active geo-replication](scripts/setup-geodr-and-failover-elastic-pool-powershell.md) | This PowerShell script configures active geo-replication for a database in an elastic pool and fails it over to the secondary replica. |
| **Configure a failover group** |  |
| [Configure a failover group for a single database](scripts/add-database-to-failover-group-powershell.md) | This PowerShell script creates a database and a failover group, adds the database to the failover group, and tests failover to the secondary server. |
| [Configure a failover group for an elastic pool](scripts/add-elastic-pool-to-failover-group-powershell.md) | This PowerShell script creates a database, adds it to an elastic pool, adds the elastic pool to the failover group, and tests failover to the secondary server. |
| **Scale a single database and an elastic pool** |  |
| [Scale a single database](scripts/monitor-and-scale-database-powershell.md) | This PowerShell script monitors the performance metrics of a single database, scales it to a higher compute size, and creates an alert rule on one of the performance metrics. |
| [Scale an elastic pool](scripts/monitor-and-scale-pool-powershell.md) | This PowerShell script monitors the performance metrics of an elastic pool, scales it to a higher compute size, and creates an alert rule on one of the performance metrics. |
| **Restore, copy, and import a database** |  |
| [Restore a database](scripts/restore-database-powershell.md) | This PowerShell script restores a database from a geo-redundant backup and restores a deleted database to the latest backup. |
| [Copy a database to a new server](scripts/copy-database-to-new-server-powershell.md) | This PowerShell script creates a copy of an existing database in a new server. |
| [Import a database from a bacpac file](scripts/import-from-bacpac-powershell.md) | This PowerShell script imports a database into Azure SQL Database from a bacpac file. |
| **Sync data between databases** |  |
| [Sync data between databases](scripts/sql-data-sync-sync-data-between-sql-databases.md) | This PowerShell script configures Data Sync to sync between multiple databases in Azure SQL Database. |
| [Sync data between SQL Database and SQL Server on-premises](scripts/sql-data-sync-sync-data-between-azure-onprem.md) | This PowerShell script configures Data Sync to sync between a database in Azure SQL Database and a SQL Server on-premises database. |
| [Update the SQL Data Sync sync schema](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/scripts/update-sync-schema-in-sync-group.md) | This PowerShell script adds or removes items from the Data Sync sync schema. |

Learn more about the [Single-database Azure PowerShell API](single-database-manage.md#powershell).


## Related content

The examples listed on this page use [az.sql PowerShell cmdlets](https://learn.microsoft.com/powershell/module/az.sql/) to create and manage Azure SQL resources. Additional cmdlets for running queries and performing many database tasks are located in [SqlServer PowerShell cmdlets](https://learn.microsoft.com/powershell/module/sqlserver/). For more information, see [SQL Server PowerShell](https://learn.microsoft.com/sql/powershell/sql-server-powershell/).
