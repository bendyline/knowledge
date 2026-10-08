---
title: Auditing Microsoft Support Operations
titleSuffix: Azure Synapse Analytics
description: Audit Microsoft support operations performed on Azure Synapse Analytics SQL resources.
author: sravanisaluru
ms.author: srsaluru
ms.reviewer: vanto
ms.date: 10/05/2026
ms.service: azure-synapse-analytics
ms.subservice: sql
ms.topic: concept-article
---

# Auditing Microsoft support operations in Azure Synapse Analytics

> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).

By auditing Microsoft support operations for Azure Synapse Analytics SQL server, you can track Microsoft support engineers' actions when they access your server during a support request. Using this capability alongside your own auditing provides greater transparency into your workforce and helps with anomaly detection, trend visualization, and data loss prevention.

Auditing of Microsoft support operations includes the following action groups. These groups audit all queries that run against the database, as well as successful and failed sign-ins by Microsoft support engineers:

- `BATCH_COMPLETED_GROUP`
- `SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP`
- `FAILED_DATABASE_AUTHENTICATION_GROUP`

## Enable auditing

1. In the [Azure portal](https://portal.azure.com), open the Synapse SQL server resource.
1. Under **Security**, select **Auditing**.
1. Turn on **Enable auditing of Microsoft support operations**.
1. Configure Azure Storage, Log Analytics, Event Hubs, or a combination of these destinations, and then save the policy.

To review Microsoft support operations in Log Analytics, run the following query:

```kusto
AzureDiagnostics
| where Category == "DevOpsOperationsAudit"
```

You can choose a different storage destination for this auditing log, or use the same auditing configuration for your server.


> **Note:**
> DevOps audit logs stored in Azure Storage might contain sensitive operational details. If a malicious actor within your environment accesses these logs, they could gain insights into system operations, which might lead to unauthorized access or data breaches.
>
> **Customer responsibility -** Secure these logs by:
> - Restricting access to authorized personnel only
> - Applying strong Azure role-based access control (RBAC) and network controls
> - Monitoring and auditing storage access regularly

## Related content

- [Auditing in Azure Synapse Analytics](auditing-overview.md)
- [Analyze Azure Synapse Analytics audit logs and reports](auditing-analyze-audit-logs.md)
- [Manage Azure Synapse Analytics auditing using APIs](auditing-manage-using-api.md)
