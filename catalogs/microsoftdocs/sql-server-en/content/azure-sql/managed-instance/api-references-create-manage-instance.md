---
title: Management API reference for Azure SQL Managed Instance
description: Learn about creating and configuring managed instances of Azure SQL Managed Instance.
author: urosmil
ms.author: urmilano
ms.reviewer: mathoma
ms.date: 03/12/2019
ms.service: azure-sql-managed-instance
ms.subservice: development
ms.topic: reference
ms.custom: devx-track-azurecli
---
# Managed API reference for Azure SQL Managed Instance



  **Applies to:**    [Azure SQL Managed Instance](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

You can create and configure managed instances of Azure SQL Managed Instance using the Azure portal, PowerShell, Azure CLI, REST API, and Transact-SQL. In this article, you can find an overview of the functions and the API that you can use to create and configure managed instances.

## Azure portal: Create a managed instance

For a quickstart showing you how to create a managed instance, see [Quickstart: Create a managed instance](instance-create-quickstart.md).

## PowerShell: Create and configure managed instances

> **Note:**
> This article uses the Azure Az PowerShell module, which is the recommended PowerShell module for interacting with Azure. To get started with the Az PowerShell module, see [Install Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-az-ps). To learn how to migrate to the Az PowerShell module, see [Migrate Azure PowerShell from AzureRM to Az](https://learn.microsoft.com/powershell/azure/migrate-from-azurerm-to-az).

> **Important:**
> The PowerShell Azure Resource Manager (AzureRM) module was deprecated on February 29, 2024. All future development should use the Az.Sql module. Users are advised to migrate from AzureRM to the Az PowerShell module to ensure continued support and updates. The AzureRM module is no longer maintained or supported. The arguments for the commands in the Az PowerShell module and in the AzureRM modules are substantially identical. For more about their compatibility, see [Introducing the new Az PowerShell module](https://learn.microsoft.com/powershell/azure/new-azureps-module-az).

To create and manage managed instances with Azure PowerShell, use the following PowerShell cmdlets. If you need to install or upgrade PowerShell, see [Install the Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-az-ps).

> **Tip:**
> For PowerShell example scripts, see [Quickstart script: Create a managed instance using a PowerShell library](https://learn.microsoft.com/archive/blogs/sqlserverstorageengine/quick-start-script-create-azure-sql-managed-instance-using-powershell).

| Cmdlet | Description |
| --- | --- |
| [New-AzSqlInstance](https://learn.microsoft.com/powershell/module/az.sql/new-azsqlinstance) | Creates a managed instance. |
| [Get-AzSqlInstance](https://learn.microsoft.com/powershell/module/az.sql/get-azsqlinstance) | Returns information about a managed instance. |
| [Set-AzSqlInstance](https://learn.microsoft.com/powershell/module/az.sql/set-azsqlinstance) | Sets properties for a managed instance. |
| [Remove-AzSqlInstance](https://learn.microsoft.com/powershell/module/az.sql/remove-azsqlinstance) | Removes a managed instance. |
| [Get-AzSqlInstanceOperation](https://learn.microsoft.com/powershell/module/az.sql/get-azsqlinstanceoperation) | Gets a list of management operations performed on the managed instance or specific operation. |
| [Stop-AzSqlInstanceOperation](https://learn.microsoft.com/powershell/module/az.sql/stop-azsqlinstanceoperation) | Cancels the specific management operation performed on the managed instance. |
| [New-AzSqlInstanceDatabase](https://learn.microsoft.com/powershell/module/az.sql/new-azsqlinstancedatabase) | Creates a SQL Managed Instance database. |
| [Get-AzSqlInstanceDatabase](https://learn.microsoft.com/powershell/module/az.sql/get-azsqlinstancedatabase) | Returns information about a SQL Managed Instance database. |
| [Remove-AzSqlInstanceDatabase](https://learn.microsoft.com/powershell/module/az.sql/remove-azsqlinstancedatabase) | Removes a SQL Managed Instance database. |
| [Restore-AzSqlInstanceDatabase](https://learn.microsoft.com/powershell/module/az.sql/restore-azsqlinstancedatabase) | Restores a SQL Managed Instance database. |

## Azure CLI: Create and configure managed instances

To create and configure managed instances with [Azure CLI](https://learn.microsoft.com/cli/azure), use the following [Azure CLI commands for SQL Managed Instance](https://learn.microsoft.com/cli/azure/sql/mi). Use [Azure Cloud Shell](https://learn.microsoft.com/azure/cloud-shell/overview) to run Azure CLI in your browser, or [install](https://learn.microsoft.com/cli/azure/install-azure-cli) it on macOS, Linux, or Windows.

> **Tip:**
> For an Azure CLI quickstart, see [Working with SQL Managed Instance using Azure CLI](https://medium.com/azure-sqldb-managed-instance/working-with-sql-managed-instance-using-azure-cli-611795fe0b44).

| Cmdlet | Description |
| --- | --- |
| [az sql mi create](https://learn.microsoft.com/cli/azure/sql/mi#az-sql-mi-create) | Creates a managed instance. |
| [az sql mi list](https://learn.microsoft.com/cli/azure/sql/mi#az-sql-mi-list) | Lists available managed instances. |
| [az sql mi show](https://learn.microsoft.com/cli/azure/sql/mi#az-sql-mi-show) | Gets the details for a managed instance. |
| [az sql mi update](https://learn.microsoft.com/cli/azure/sql/mi#az-sql-mi-update) | Updates a managed instance. |
| [az sql mi delete](https://learn.microsoft.com/cli/azure/sql/mi#az-sql-mi-delete) | Removes a managed instance. |
| [az sql mi op list](https://learn.microsoft.com/cli/azure/sql/mi/op#az-sql-mi-op-list) | Gets a list of management operations performed on the managed instance. |
| [az sql mi op show](https://learn.microsoft.com/cli/azure/sql/mi/op#az-sql-mi-op-show) | Gets the specific management operation performed on the managed instance. |
| [az sql mi op cancel](https://learn.microsoft.com/cli/azure/sql/mi/op#az-sql-mi-op-cancel) | Cancels the specific management operation performed on the managed instance. |
| [az sql midb create](https://learn.microsoft.com/cli/azure/sql/midb#az-sql-midb-create) | Creates a managed database. |
| [az sql midb list](https://learn.microsoft.com/cli/azure/sql/midb#az-sql-midb-list) | Lists available managed databases. |
| [az sql midb restore](https://learn.microsoft.com/cli/azure/sql/midb#az-sql-midb-restore) | Restores a managed database. |
| [az sql midb delete](https://learn.microsoft.com/cli/azure/sql/midb#az-sql-midb-delete) | Removes a managed database. |

## Transact-SQL: Create and configure instance databases

To create and configure instance databases after the managed instance is created, use the following T-SQL commands. You can issue these commands using the Azure portal, [SQL Server Management Studio](https://learn.microsoft.com/sql/ssms/use-sql-server-management-studio), [Visual Studio Code](https://code.visualstudio.com/docs), or any other program that can connect to a server and pass Transact-SQL commands.

> **Tip:**
> For quickstarts showing you how to configure and connect to a managed instance using SQL Server Management Studio on Microsoft Windows, see [Quickstart: Configure Azure VM to connect to Azure SQL Managed Instance](connect-vm-instance-configure.md) and [Quickstart: Configure a point-to-site connection to Azure SQL Managed Instance from on-premises](point-to-site-p2s-configure.md).

> **Important:**
> You cannot create or delete a managed instance using Transact-SQL.

| Command | Description |
| --- | --- |
| [CREATE DATABASE](https://learn.microsoft.com/sql/t-sql/statements/create-database-transact-sql?preserve-view=true\&view=azuresqldb-mi-current) | Creates a new instance database in SQL Managed Instance. You must be connected to the `master` database to create a new database. |
| [ALTER DATABASE](https://learn.microsoft.com/sql/t-sql/statements/alter-database-transact-sql?preserve-view=true\&view=azuresqldb-mi-current) | Modifies an instance database in SQL Managed Instance. |

## REST API: Create and configure managed instances

To create and configure managed instances, use these REST API requests.

| Command | Description |
| --- | --- |
| [SQL Managed Instance - Create Or Update](https://learn.microsoft.com/rest/api/sql/managed-instances/create-or-update) | Creates or updates a managed instance. |
| [SQL Managed Instance - Delete](https://learn.microsoft.com/rest/api/sql/managed-instances/delete) | Deletes a managed instance. |
| [SQL Managed Instance - Get](https://learn.microsoft.com/rest/api/sql/managed-instances/get) | Gets a managed instance. |
| [SQL Managed Instance - Stop](https://learn.microsoft.com/rest/api/sql/managed-instances/stop) | Stops a managed instance. |
| [SQL Managed Instance - Start](https://learn.microsoft.com/rest/api/sql/managed-instances/start) | Starts a managed instance |
| [SQL Managed Instance - List](https://learn.microsoft.com/rest/api/sql/managedinstances/list) | Returns a list of managed instances in a subscription. |
| [SQL Managed Instance - List By Resource Group](https://learn.microsoft.com/rest/api/sql/managed-instances/list-by-resource-group) | Returns a list of managed instances in a resource group. |
| [SQL Managed Instance - Update](https://learn.microsoft.com/rest/api/sql/managed-instances/update) | Updates a managed instance. |
| [SQL Managed Instance operations - List By Managed Instance](https://learn.microsoft.com/rest/api/sql/managed-instance-operations/list-by-managed-instance) | Gets a list of management operations performed on the managed instance. |
| [SQL Managed Instance operations - Get](https://learn.microsoft.com/rest/api/sql/managed-instance-operations/get) | Gets the specific management operation performed on the managed instance. |
| [SQL Managed Instance operations - Cancel](https://learn.microsoft.com/rest/api/sql/managed-instance-operations/cancel) | Cancels the specific management operation performed on the managed instance. |
| [SQL Managed Instance - Start/stop schedule- Create Or Update](https://learn.microsoft.com/rest/api/sql/start-stop-managed-instance-schedules/create-or-update) | Creates or updates a start and stop managed instance schedule. |
| [SQL Managed Instance - Start/stop schedule - Get](https://learn.microsoft.com/rest/api/sql/start-stop-managed-instance-schedules/get) | Gets an existing start and stop managed instance schedule. |
| [SQL Managed Instance - Start/stop schedule - Delete](https://learn.microsoft.com/rest/api/sql/start-stop-managed-instance-schedules/delete) Deletes an existing start and stop managed instance schedule. |

## Next steps

- To learn about migrating a SQL Server database to Azure, see [Migrate to Azure SQL Database](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/migrate-to-database-from-sql-server.md).
- For information about supported features, see [Features](../database/features-comparison.md).
