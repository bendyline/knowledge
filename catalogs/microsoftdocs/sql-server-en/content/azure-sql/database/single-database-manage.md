---
title: Create & manage servers and single databases
description: Learn about creating and managing servers and single databases in Azure SQL Database using the Azure portal, PowerShell, the Azure CLI, Transact-SQL (T-SQL), and Rest-API.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: mathoma
ms.date: 09/17/2024
ms.service: azure-sql-database
ms.subservice: deployment-configuration
ms.topic: how-to
ms.custom:
  - sqldbrb=1
  - devx-track-azurecli
  - sfi-image-nochange
---
# Create and manage servers and single databases in Azure SQL Database

You can create and manage servers and single databases in Azure SQL Database using the Azure portal, PowerShell, the Azure CLI, REST API, and Transact-SQL.


> **Note:**  
> [Try Azure SQL Database free of charge](free-offer.md) and get 100,000 vCore seconds of serverless compute and 32 GB of storage every month.


## Prerequisites

- An active Azure subscription. If you don't have one, [create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

### Permissions

**To create databases via Transact-SQL**: `CREATE DATABASE` permissions are necessary. To create a database a login must be either the server admin login (created when the Azure SQL Database logical server was provisioned), the Microsoft Entra admin of the server, a member of the dbmanager database role in `master`. For more information, see [CREATE DATABASE](https://learn.microsoft.com/sql/t-sql/statements/create-database-transact-sql?view=azuresqldb-current\&preserve-view=true).

**To create databases via the Azure portal, PowerShell, Azure CLI, or REST API**: Azure RBAC permissions are needed, specifically the Contributor, SQL DB Contributor, or SQL Server Contributor Azure RBAC role. For more information, see [Azure RBAC built-in roles](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles).

## The Azure portal

You can create the resource group for Azure SQL Database ahead of time or while creating the server itself.

> **Tip:**  
> For an Azure portal quickstart, see [Quickstart: Create a single database](single-database-create-quickstart.md).

### Create a server

To create a server using the [Azure portal](https://portal.azure.com), create a new [server](logical-servers.md) resource from Azure Marketplace. Alternatively, you can create the server when you deploy an Azure SQL Database.

Screenshot of the Azure portal resource search for sql server showing SQL server logical server as the result.

### Create a blank or sample database

To create a single Azure SQL Database using the [Azure portal](https://portal.azure.com), choose the Azure SQL Database resource in Azure Marketplace. You can create the resource group and server ahead of time or while creating the single database itself. You can create a blank database or create a sample database based on Adventure Works LT.

Screenshot of the Azure portal that shows how to locate the option to create a new SQL Database.

> **Important:**  
> For information on selecting the pricing tier for your database, see [DTU-based purchasing model](service-tiers-dtu.md) and [vCore-based purchasing model](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/service-tiers-vcore.md).

## Manage an existing server

To manage an existing server, navigate to the server using several methods - such as from a specific database page, the **SQL servers** page, or the **All resources** page.

To manage an existing database, navigate to the **SQL databases** page and select the database you wish to manage. The following screenshot shows how to begin setting a server-level firewall for a database from the **Overview** page for a database.

Screenshot of the Azure portal Set Server firewall rule page for an Azure SQL Database.

> **Important:**  
> To configure performance properties for a database, see [DTU-based purchasing model](service-tiers-dtu.md) and [vCore-based purchasing model](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/service-tiers-vcore.md).

## PowerShell

> **Note:**
> This article uses the Azure Az PowerShell module, which is the recommended PowerShell module for interacting with Azure. To get started with the Az PowerShell module, see [Install Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-az-ps). To learn how to migrate to the Az PowerShell module, see [Migrate Azure PowerShell from AzureRM to Az](https://learn.microsoft.com/powershell/azure/migrate-from-azurerm-to-az).

> **Important:**
> The PowerShell Azure Resource Manager (AzureRM) module was deprecated on February 29, 2024. All future development should use the Az.Sql module. Users are advised to migrate from AzureRM to the Az PowerShell module to ensure continued support and updates. The AzureRM module is no longer maintained or supported. The arguments for the commands in the Az PowerShell module and in the AzureRM modules are substantially identical. For more about their compatibility, see [Introducing the new Az PowerShell module](https://learn.microsoft.com/powershell/azure/new-azureps-module-az).

To create and manage servers, single and pooled databases, and server-level firewalls with Azure PowerShell, use the following PowerShell cmdlets. If you need to install or upgrade PowerShell, see [Install Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-az-ps).

> **Tip:**  
> For PowerShell example scripts, see [Use PowerShell to create a single database and configure a server-level firewall rule](scripts/create-and-configure-database-powershell.md) and [Use PowerShell to monitor and scale a single database in Azure SQL Database](scripts/monitor-and-scale-database-powershell.md).

| Cmdlet | Description |
| --- | --- |
| [New-AzSqlDatabase](https://learn.microsoft.com/powershell/module/az.sql/new-azsqldatabase) | Creates a database |
| [Get-AzSqlDatabase](https://learn.microsoft.com/powershell/module/az.sql/get-azsqldatabase) | Gets one or more databases |
| [Set-AzSqlDatabase](https://learn.microsoft.com/powershell/module/az.sql/set-azsqldatabase) | Sets properties for a database, or moves an existing database into an elastic pool |
| [Remove-AzSqlDatabase](https://learn.microsoft.com/powershell/module/az.sql/remove-azsqldatabase) | Removes a database |
| [New-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/new-azresourcegroup) | Creates a resource group |
| [New-AzSqlServer](https://learn.microsoft.com/powershell/module/az.sql/new-azsqlserver) | Creates a server |
| [Get-AzSqlServer](https://learn.microsoft.com/powershell/module/az.sql/get-azsqlserver) | Returns information about servers |
| [Set-AzSqlServer](https://learn.microsoft.com/powershell/module/az.sql/set-azsqlserver) | Modifies properties of a server |
| [Remove-AzSqlServer](https://learn.microsoft.com/powershell/module/az.sql/remove-azsqlserver) | Removes a server |
| [New-AzSqlServerFirewallRule](https://learn.microsoft.com/powershell/module/az.sql/new-azsqlserverfirewallrule) | Creates a server-level firewall rule |
| [Get-AzSqlServerFirewallRule](https://learn.microsoft.com/powershell/module/az.sql/get-azsqlserverfirewallrule) | Gets firewall rules for a server |
| [Set-AzSqlServerFirewallRule](https://learn.microsoft.com/powershell/module/az.sql/set-azsqlserverfirewallrule) | Modifies a firewall rule in a server |
| [Remove-AzSqlServerFirewallRule](https://learn.microsoft.com/powershell/module/az.sql/remove-azsqlserverfirewallrule) | Deletes a firewall rule from a server. |
| New-AzSqlServerVirtualNetworkRule | Creates a [*virtual network rule*](vnet-service-endpoint-rule-overview.md), based on a subnet that is a Virtual Network service endpoint. |

## Azure CLI

To create and manage the servers, databases, and firewalls with [Azure CLI](https://learn.microsoft.com/cli/azure), use the following [Azure CLI](https://learn.microsoft.com/cli/azure/sql/db) commands. Use the [Cloud Shell](https://learn.microsoft.com/azure/cloud-shell/overview) to run Azure CLI in your browser, or [install](https://learn.microsoft.com/cli/azure/install-azure-cli) it on macOS, Linux, or Windows. For creating and managing elastic pools, see [Elastic pools](elastic-pool-overview.md).

> **Tip:**  
> For an Azure CLI quickstart, see [Azure CLI samples for Azure SQL Database](az-cli-script-samples-content-guide.md). For Azure CLI example scripts, see [Create a single database and configure a firewall rule using the Azure CLI](scripts/create-and-configure-database-cli.md) and [Monitor and scale a single database in Azure SQL Database using the Azure CLI](scripts/monitor-and-scale-database-cli.md).

| Cmdlet | Description |
| --- | --- |
| [az sql db create](https://learn.microsoft.com/cli/azure/sql/db#az-sql-db-create) | Creates a database |
| [az sql db list](https://learn.microsoft.com/cli/azure/sql/db#az-sql-db-list) | Lists all databases and data warehouses in a server, or all databases in an elastic pool |
| [az sql db list-editions](https://learn.microsoft.com/cli/azure/sql/db#az-sql-db-list-editions) | Lists available service objectives and storage limits |
| [az sql db list-usages](https://learn.microsoft.com/cli/azure/sql/db#az-sql-db-list-usages) | Returns database usages |
| [az sql db show](https://learn.microsoft.com/cli/azure/sql/db#az-sql-db-show) | Gets a database or data warehouse |
| [az sql db update](https://learn.microsoft.com/cli/azure/sql/db#az-sql-db-update) | Updates a database |
| [az sql db delete](https://learn.microsoft.com/cli/azure/sql/db#az-sql-db-delete) | Removes a database |
| [az group create](https://learn.microsoft.com/cli/azure/group#az-group-create) | Creates a resource group |
| [az sql server create](https://learn.microsoft.com/cli/azure/sql/server#az-sql-server-create) | Creates a server |
| [az sql server list](https://learn.microsoft.com/cli/azure/sql/server#az-sql-server-list) | Lists servers |
| [az sql server list-usages](https://learn.microsoft.com/cli/azure/sql/server#az-sql-server-list-usages) | Returns server usages |
| [az sql server show](https://learn.microsoft.com/cli/azure/sql/server#az-sql-server-show) | Gets a server |
| [az sql server update](https://learn.microsoft.com/cli/azure/sql/server#az-sql-server-update) | Updates a server |
| [az sql server delete](https://learn.microsoft.com/cli/azure/sql/server#az-sql-server-delete) | Deletes a server |
| [az sql server firewall-rule create](https://learn.microsoft.com/cli/azure/sql/server/firewall-rule#az-sql-server-firewall-rule-create) | Creates a server firewall rule |
| [az sql server firewall-rule list](https://learn.microsoft.com/cli/azure/sql/server/firewall-rule#az-sql-server-firewall-rule-list) | Lists the firewall rules on a server |
| [az sql server firewall-rule show](https://learn.microsoft.com/cli/azure/sql/server/firewall-rule#az-sql-server-firewall-rule-show) | Shows the detail of a firewall rule |
| [az sql server firewall-rule update](https://learn.microsoft.com/cli/azure/sql/server/firewall-rule##az-sql-server-firewall-rule-update) | Updates a firewall rule |
| [az sql server firewall-rule delete](https://learn.microsoft.com/cli/azure/sql/server/firewall-rule#az-sql-server-firewall-rule-delete) | Deletes a firewall rule |

## Transact-SQL (T-SQL)

To create and manage the servers, databases, and firewalls with Transact-SQL, use the following T-SQL commands. You can issue these commands using the Azure portal, [SQL Server Management Studio](https://learn.microsoft.com/sql/ssms/use-sql-server-management-studio), [Visual Studio Code](https://code.visualstudio.com/docs), or any other program that can connect to a server in SQL Database and pass Transact-SQL commands. For managing elastic pools, see [Elastic pools help you manage and scale multiple databases in Azure SQL Database](elastic-pool-overview.md).

> **Tip:**  
> For a quickstart using SQL Server Management Studio on Microsoft Windows, see [Quickstart: Use SSMS to connect to and query Azure SQL Database or Azure SQL Managed Instance](connect-query-ssms.md). For a quickstart using Visual Studio Code on the macOS, Linux, or Windows, see [Quickstart: Use Visual Studio Code to connect and query Azure SQL Database or Azure SQL Managed Instance](connect-query-vscode.md).
> **Important:**  
> You can't create or delete a server using Transact-SQL.

| Command | Description |
| --- | --- |
| [CREATE DATABASE](https://learn.microsoft.com/sql/t-sql/statements/create-database-transact-sql?view=azuresqldb-current\&preserve-view=true) | Creates a new single database. You must be connected to the `master` database to create a new database. |
| [ALTER DATABASE](https://learn.microsoft.com/sql/t-sql/statements/alter-database-transact-sql?view=azuresqldb-current\&preserve-view=true) | Modifies a database or elastic pool. |
| [DROP DATABASE](https://learn.microsoft.com/sql/t-sql/statements/drop-database-transact-sql) | Deletes a database. |
| [sys.database_service_objectives](https://learn.microsoft.com/sql/relational-databases/system-catalog-views/sys-database-service-objectives-azure-sql-database) | Returns the edition (service tier), service objective (pricing tier), and elastic pool name, if any, for Azure SQL Database or a dedicated SQL pool in Azure Synapse Analytics. If logged on to the `master` database in a server in SQL Database, returns information on all databases. For Azure Synapse Analytics, you must be connected to the `master` database. |
| [sys.dm_db_resource_stats](https://learn.microsoft.com/sql/relational-databases/system-dynamic-management-views/sys-dm-db-resource-stats-azure-sql-database) | Returns CPU, IO, and memory consumption for a database in Azure SQL Database. One row exists for every 15 seconds, even if there's no activity in the database. |
| [sys.resource_stats](https://learn.microsoft.com/sql/relational-databases/system-catalog-views/sys-resource-stats-azure-sql-database) | Returns CPU usage and storage data for a database in Azure SQL Database. The data is collected and aggregated within five-minute intervals. |
| [sys.database_connection_stats](https://learn.microsoft.com/sql/relational-databases/system-catalog-views/sys-database-connection-stats-azure-sql-database) | Contains statistics for SQL Database connectivity events, providing an overview of database connection successes and failures. |
| [sys.event_log](https://learn.microsoft.com/sql/relational-databases/system-catalog-views/sys-event-log-azure-sql-database) | Returns successful Azure SQL Database connections and connection failures. You can use this information to track or troubleshoot your database activity with SQL Database. |
| [sp_set_firewall_rule](https://learn.microsoft.com/sql/relational-databases/system-stored-procedures/sp-set-firewall-rule-azure-sql-database) | Creates or updates the server-level firewall settings for your server. This stored procedure is only available in the `master` database to the server-level principal login. A server-level firewall rule can only be created using Transact-SQL after the first server-level firewall rule has been created by a user with Azure-level permissions |
| [sys.firewall_rules](https://learn.microsoft.com/sql/relational-databases/system-catalog-views/sys-firewall-rules-azure-sql-database) | Returns information about the server-level firewall settings associated with your database in Azure SQL Database. |
| [sp_delete_firewall_rule](https://learn.microsoft.com/sql/relational-databases/system-stored-procedures/sp-delete-firewall-rule-azure-sql-database) | Removes server-level firewall settings from your server. This stored procedure is only available in the `master` database to the server-level principal login. |
| [sp_set_database_firewall_rule](https://learn.microsoft.com/sql/relational-databases/system-stored-procedures/sp-set-database-firewall-rule-azure-sql-database) | Creates or updates the database-level firewall rules for your database in Azure SQL Database. Database firewall rules can be configured for the `master` database, and for user databases on SQL Database. Database firewall rules are useful when using contained database users. |
| [sys.database_firewall_rules](https://learn.microsoft.com/sql/relational-databases/system-catalog-views/sys-database-firewall-rules-azure-sql-database) | Returns information about the database-level firewall settings associated with your database in Azure SQL Database. |
| [sp_delete_database_firewall_rule](https://learn.microsoft.com/sql/relational-databases/system-stored-procedures/sp-delete-database-firewall-rule-azure-sql-database) | Removes database-level firewall setting from a database. |

## REST API

To create and manage the servers, databases, and firewalls, use these REST API requests.

| Command | Description |
| --- | --- |
| [Servers - Create or update](https://learn.microsoft.com/rest/api/sql/servers/create-or-update) | Creates or updates a new server. |
| [Servers - Delete](https://learn.microsoft.com/rest/api/sql/servers/delete) | Deletes a SQL server. |
| [Servers - Get](https://learn.microsoft.com/rest/api/sql/servers/get) | Gets a server. |
| [Servers - List](https://learn.microsoft.com/rest/api/sql/servers/list) | Returns a list of servers in a subscription. |
| [Servers - List by resource group](https://learn.microsoft.com/rest/api/sql/servers/list-by-resource-group) | Returns a list of servers in a resource group. |
| [Servers - Update](https://learn.microsoft.com/rest/api/sql/servers/update) | Updates an existing server. |
| [Databases - Create or update](https://learn.microsoft.com/rest/api/sql/databases/create-or-update) | Creates a new database or updates an existing database. |
| [Databases - Delete](https://learn.microsoft.com/rest/api/sql/databases/delete) | Deletes a database. |
| [Databases - Get](https://learn.microsoft.com/rest/api/sql/databases/get) | Gets a database. |
| [Databases - List by elastic pool](https://learn.microsoft.com/rest/api/sql/databases/list-by-elastic-pool) | Returns a list of databases in an elastic pool. |
| [Databases - List by server](https://learn.microsoft.com/rest/api/sql/databases/list-by-server) | Returns a list of databases in a server. |
| [Databases - Update](https://learn.microsoft.com/rest/api/sql/databases/update) | Updates an existing database. |
| [Firewall rules - Create or update](https://learn.microsoft.com/rest/api/sql/firewall-rules/create-or-update) | Creates or updates a firewall rule. |
| [Firewall rules - Delete](https://learn.microsoft.com/rest/api/sql/firewall-rules/delete) | Deletes a firewall rule. |
| [Firewall rules - Get](https://learn.microsoft.com/rest/api/sql/firewall-rules/get) | Gets a firewall rule. |
| [Firewall rules - List by server](https://learn.microsoft.com/rest/api/sql/firewall-rules/list-by-server) | Returns a list of firewall rules. |

## Related content

- [Migrate to Azure SQL Database](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/migrate-to-database-from-sql-server.md)
- [Features comparison: Azure SQL Database and Azure SQL Managed Instance](features-comparison.md)
