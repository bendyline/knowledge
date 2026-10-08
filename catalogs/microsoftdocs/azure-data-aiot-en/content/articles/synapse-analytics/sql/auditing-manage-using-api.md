---
title: Manage Auditing Using APIs
titleSuffix: Azure Synapse Analytics
description: Use PowerShell, the Azure CLI, REST APIs, or Azure Resource Manager to manage Azure Synapse Analytics auditing.
author: sravanisaluru
ms.author: srsaluru
ms.reviewer: vanto
ms.date: 10/05/2026
ms.service: azure-synapse-analytics
ms.subservice: sql
ms.topic: concept-article
ms.custom:
  - devx-track-azurepowershell
---

# Manage Azure Synapse Analytics auditing by using APIs

> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).


You can manage Azure Synapse Analytics auditing at the server or database level by using PowerShell, the Azure CLI, or REST APIs.

## PowerShell

Use the following Az.Sql cmdlets for Synapse SQL auditing:

- [Set-AzSqlDatabaseAudit](https://learn.microsoft.com/powershell/module/az.sql/set-azsqldatabaseaudit)
- [Set-AzSqlServerAudit](https://learn.microsoft.com/powershell/module/az.sql/set-azsqlserveraudit)
- [Get-AzSqlDatabaseAudit](https://learn.microsoft.com/powershell/module/az.sql/get-azsqldatabaseaudit)
- [Get-AzSqlServerAudit](https://learn.microsoft.com/powershell/module/az.sql/get-azsqlserveraudit)
- [Remove-AzSqlDatabaseAudit](https://learn.microsoft.com/powershell/module/az.sql/remove-azsqldatabaseaudit)
- [Remove-AzSqlServerAudit](https://learn.microsoft.com/powershell/module/az.sql/remove-azsqlserveraudit)
- [Set-AzSqlServerMSSupportAudit](https://learn.microsoft.com/powershell/module/az.sql/set-azsqlservermssupportaudit)

## REST API

Use the following resources to create, retrieve, or update auditing policies:


- [Create or Update Database Auditing Policy](https://learn.microsoft.com/rest/api/sql/database-blob-auditing-policies/create-or-update)
- [Create or Update Server Auditing Policy](https://learn.microsoft.com/rest/api/sql/server-blob-auditing-policies/create-or-update)
- [Create or Update Microsoft support operations audit policy](https://learn.microsoft.com/rest/api/sql/server-devops-audit-settings/create-or-update)
- [Get Database Auditing Policy](https://learn.microsoft.com/rest/api/sql/database-blob-auditing-policies/get)
- [Get Server Auditing Policy](https://learn.microsoft.com/rest/api/sql/server-blob-auditing-policies/get)

Extended policy with `WHERE` clause support for additional filtering:

- [Create or Update Database *Extended* Auditing Policy](https://learn.microsoft.com/rest/api/sql/extended-database-blob-auditing-policies/create-or-update)
- [Create or Update Server *Extended* Auditing Policy](https://learn.microsoft.com/rest/api/sql/extended-server-blob-auditing-policies/create-or-update)
- [Get Database *Extended* Auditing Policy](https://learn.microsoft.com/rest/api/sql/extended-database-blob-auditing-policies/get)
- [Get Server *Extended* Auditing Policy](https://learn.microsoft.com/rest/api/sql/extended-server-blob-auditing-policies/get)

## Azure CLI

- [Manage a server auditing policy](https://learn.microsoft.com/cli/azure/sql/server/audit-policy)
- [Manage a database auditing policy](https://learn.microsoft.com/cli/azure/sql/db/audit-policy)
- [Manage a Microsoft support operations auditing policy](https://learn.microsoft.com/cli/azure/sql/server/ms-support/audit-policy)


## Related content

- [Auditing in Azure Synapse Analytics](auditing-overview.md)
- [Set up auditing for Azure Synapse Analytics](auditing-setup.md)
- [Auditing policy at the server and database level](auditing-server-level-database-level.md)
