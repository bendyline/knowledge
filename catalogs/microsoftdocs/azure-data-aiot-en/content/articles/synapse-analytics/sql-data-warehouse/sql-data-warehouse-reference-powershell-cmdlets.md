---
title: PowerShell & REST APIs for dedicated SQL pool (formerly SQL DW)
description: Top PowerShell cmdlets for dedicated SQL pool (formerly SQL DW) in Azure Synapse Analytics including how to pause and resume a database.
author: ajagadish-24
ms.author: ajagadish
ms.date: 04/17/2018
ms.service: azure-synapse-analytics
ms.subservice: sql-dw
ms.topic: how-to
ms.custom:
  - devx-track-azurepowershell
---

# PowerShell for dedicated SQL pool (formerly SQL DW) in Azure Synapse Analytics

> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).

Many dedicated SQL pool administrative tasks can be managed using either Azure PowerShell cmdlets or REST APIs.  Below are some examples of how to use PowerShell commands to automate common tasks in your dedicated SQL pool (formerly SQL DW).  For some good REST examples, see the article [Manage scalability with REST](sql-data-warehouse-manage-compute-rest-api.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/updated-for-az.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/synapse-analytics/sql-data-warehouse/sql-data-warehouse-reference-powershell-cmdlets.md)

> **Note:**
> This article applies for standalone dedicated SQL pools (formerly SQL DW) and are not applicable to a dedicated SQL pool created in an Azure Synapse Analytics workspace. There are different PowerShell cmdlets to use for each, for example, use [Suspend-AzSqlDatabase](https://learn.microsoft.com/powershell/module/az.sql/suspend-azsqldatabase) for a dedicated SQL pool (formerly SQL DW), but [Suspend-AzSynapseSqlPool](https://learn.microsoft.com/powershell/module/az.synapse/suspend-azsynapsesqlpool) for a dedicated SQL pool in an Azure Synapse Workspace. For instructions to pause and resume a dedicated SQL pool created in an Azure Synapse Analytics workspace, see [Quickstart: Pause and resume compute in dedicated SQL pool in a Synapse Workspace with Azure PowerShell](pause-and-resume-compute-workspace-powershell.md). For more on the differences between dedicated SQL pool (formerly SQL DW) and dedicated SQL pools in Azure Synapse Workspaces, read [What's the difference between Azure Synapse (formerly SQL DW) and Azure Synapse Analytics Workspace](../sql/overview-difference-between-formerly-sql-dw-workspace.md).

## Get started with Azure PowerShell cmdlets

1. Open Windows PowerShell.
2. At the PowerShell prompt, run these commands to sign in to the Azure Resource Manager and select your subscription.

    ```powershell
    Connect-AzAccount
    Get-AzSubscription
    Select-AzSubscription -SubscriptionName "MySubscription"
    ```

## Pause data warehouse example

Pause a database named "Database02" hosted on a server named "Server01."  The server is in an Azure resource group named "ResourceGroup1."

```powershell
Suspend-AzSqlDatabase –ResourceGroupName "ResourceGroup1" –ServerName "Server01" –DatabaseName "Database02"
```

A variation, this example pipes the retrieved object to [Suspend-AzSqlDatabase](https://learn.microsoft.com/powershell/module/az.sql/suspend-azsqldatabase?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json).  As a result, the database is paused. The final command shows the results.

```powershell
$database = Get-AzSqlDatabase –ResourceGroupName "ResourceGroup1" –ServerName "Server01" –DatabaseName "Database02"
$resultDatabase = $database | Suspend-AzSqlDatabase
$resultDatabase
```

## Start data warehouse example

Resume operation of a database named "Database02" hosted on a server named "Server01." The server is contained in a resource group named "ResourceGroup1."

```powershell
Resume-AzSqlDatabase –ResourceGroupName "ResourceGroup1" –ServerName "Server01" -DatabaseName "Database02"
```

A variation, this example retrieves a database named "Database02" from a server named "Server01" that is contained in a resource group named "ResourceGroup1." It pipes the retrieved object to [Resume-AzSqlDatabase](https://learn.microsoft.com/powershell/module/az.sql/resume-azsqldatabase?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json).

```powershell
$database = Get-AzSqlDatabase –ResourceGroupName "ResourceGroup1" –ServerName "Server01" –DatabaseName "Database02"
$resultDatabase = $database | Resume-AzSqlDatabase
```

> **Note:**
> Note that if your server is foo.database.windows.net, use "foo" as the -ServerName in the PowerShell cmdlets.

## Other supported PowerShell cmdlets

These PowerShell cmdlets are supported with Azure Synapse Analytics data warehouse.

* [Get-AzSqlDatabase](https://learn.microsoft.com/powershell/module/az.sql/get-azsqldatabase?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json)
* [Get-AzSqlDeletedDatabaseBackup](https://learn.microsoft.com/powershell/module/az.sql/get-azsqldeleteddatabasebackup?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json)
* [Get-AzSqlDatabaseRestorePoint](https://learn.microsoft.com/powershell/module/az.sql/get-azsqldatabaserestorepoint?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json)
* [New-AzSqlDatabase](https://learn.microsoft.com/powershell/module/az.sql/new-azsqldatabase?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json)
* [Remove-AzSqlDatabase](https://learn.microsoft.com/powershell/module/az.sql/remove-azsqldatabase?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json)
* [Restore-AzSqlDatabase](https://learn.microsoft.com/powershell/module/az.sql/restore-azsqldatabase?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json)
* [Resume-AzSqlDatabase](https://learn.microsoft.com/powershell/module/az.sql/resume-azsqldatabase?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json)
* [Set-AzSqlDatabase](https://learn.microsoft.com/powershell/module/az.sql/set-azsqldatabase?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json)
* [Suspend-AzSqlDatabase](https://learn.microsoft.com/powershell/module/az.sql/suspend-azsqldatabase?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json)

## Next steps

For more PowerShell examples, see:

* [Create a data warehouse using PowerShell](create-data-warehouse-powershell.md)
* [Database restore](sql-data-warehouse-restore-points.md)

For other tasks that can be automated with PowerShell, see [Azure SQL Database cmdlets](https://learn.microsoft.com/powershell/module/az.sql?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json). Not all Azure SQL Database cmdlets are supported for Azure Synapse Analytics data warehouse. For a list of tasks that can be automated with REST, see [Operations for Azure SQL Database](https://learn.microsoft.com/rest/api/sql/?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json).
