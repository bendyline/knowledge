---
title: Manage Auditing Using APIs
titleSuffix: Azure SQL Database & Azure Synapse Analytics
description: Use Azure SQL Database auditing to track database events into an audit log.
author: sravanisaluru
ms.author: srsaluru
ms.reviewer: mathoma
ms.date: 06/10/2025
ms.service: azure-sql-database
ms.subservice: security
ms.topic: concept-article
ms.custom:
  - devx-track-azurepowershell
---
# Manage Azure SQL Database Auditing using APIs



  **Applies to:**    [Azure SQL Database](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)  [Azure Synapse Analytics](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

This article provides an overview of the different APIs used for managing Auditing for Azure SQL Database and Azure Synapse Analytics.

## Use Azure PowerShell

**PowerShell cmdlets (including WHERE clause support for additional filtering)**:

- [Create or Update Database Auditing Policy (Set-AzSqlDatabaseAudit)](https://learn.microsoft.com/powershell/module/az.sql/set-azsqldatabaseaudit)
- [Create or Update Server Auditing Policy (Set-AzSqlServerAudit)](https://learn.microsoft.com/powershell/module/az.sql/set-azsqlserveraudit)
- [Get Database Auditing Policy (Get-AzSqlDatabaseAudit)](https://learn.microsoft.com/powershell/module/az.sql/get-azsqldatabaseaudit)
- [Get Server Auditing Policy (Get-AzSqlServerAudit)](https://learn.microsoft.com/powershell/module/az.sql/get-azsqlserveraudit)
- [Remove Database Auditing Policy (Remove-AzSqlDatabaseAudit)](https://learn.microsoft.com/powershell/module/az.sql/remove-azsqldatabaseaudit)
- [Remove Server Auditing Policy (Remove-AzSqlServerAudit)](https://learn.microsoft.com/powershell/module/az.sql/remove-azsqlserveraudit)
- [Create or Update auditing for Microsoft support operations (Set-AzSqlServerMSSupportAudit)](https://learn.microsoft.com/powershell/module/az.sql/set-azsqlservermssupportaudit)

For a script example, see [Configure auditing and threat detection using PowerShell](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/database/scripts/auditing-threat-detection-powershell-configure.md).

### Use REST API

**REST API**:

- [Create or Update Database Auditing Policy](https://learn.microsoft.com/rest/api/sql/database-blob-auditing-policies/create-or-update)
- [Create or Update Server Auditing Policy](https://learn.microsoft.com/rest/api/sql/server-blob-auditing-policies/create-or-update)
- [Create or Update Microsoft support operations audit policy](https://learn.microsoft.com/rest/api/sql/server-devops-audit-settings/create-or-update)
- [Get Database Auditing Policy](https://learn.microsoft.com/rest/api/sql/database-blob-auditing-policies/get)
- [Get Server Auditing Policy](https://learn.microsoft.com/rest/api/sql/server-blob-auditing-policies/get)

Extended policy with WHERE clause support for additional filtering:

- [Create or Update Database *Extended* Auditing Policy](https://learn.microsoft.com/rest/api/sql/extended-database-blob-auditing-policies/create-or-update)
- [Create or Update Server *Extended* Auditing Policy](https://learn.microsoft.com/rest/api/sql/extended-server-blob-auditing-policies/create-or-update)
- [Get Database *Extended* Auditing Policy](https://learn.microsoft.com/rest/api/sql/extended-database-blob-auditing-policies/get)
- [Get Server *Extended* Auditing Policy](https://learn.microsoft.com/rest/api/sql/extended-server-blob-auditing-policies/get)

### Use Azure CLI

- [Manage a server's auditing policy](https://learn.microsoft.com/cli/azure/sql/server/audit-policy)
- [Manage a database's auditing policy](https://learn.microsoft.com/cli/azure/sql/db/audit-policy)
- [Manage Microsoft support operations audit policy](https://learn.microsoft.com/cli/azure/sql/server/ms-support/audit-policy)

### Use Azure Resource Manager templates

You can manage Azure SQL Database auditing using [Azure Resource Manager](https://learn.microsoft.com/azure/azure-resource-manager/management/overview) templates, as shown in these examples:

- [Deploy an Azure SQL Database with Auditing enabled to write audit logs to Azure Blob storage account](https://azure.microsoft.com/resources/templates/sql-auditing-server-policy-to-blob-storage/)
- [Deploy an Azure SQL Database with Auditing enabled to write audit logs to Log Analytics](https://azure.microsoft.com/resources/templates/sql-auditing-server-policy-to-oms/)
- [Deploy an Azure SQL Database with Auditing enabled to write audit logs to Event Hubs](https://azure.microsoft.com/resources/templates/sql-auditing-server-policy-to-eventhub/)

> **Note:**  
> The linked samples are on an external public repository and are provided 'as is', without warranty, and are not supported under any Microsoft support program/service.

## Related content

- [Auditing for Azure SQL Database and Azure Synapse Analytics](auditing-overview.md)
- [What's New in Azure SQL Auditing](https://learn.microsoft.com/Shows/Data-Exposed/Whats-New-in-Azure-SQL-Auditing)
- [Get started with Azure SQL Managed Instance auditing](../managed-instance/auditing-configure.md)
- [Auditing for SQL Server](https://learn.microsoft.com/sql/relational-databases/security/auditing/sql-server-audit-database-engine)
