---
title: Monitor workload - Azure portal
description: Monitor Synapse SQL using the Azure portal
author: joannapea
ms.author: joanpo
ms.date: 09/13/2022
ms.service: azure-synapse-analytics
ms.subservice: sql-dw
ms.topic: how-to
ms.custom: sfi-image-nochange
---

# Monitor workload - Azure portal

> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).

This article describes how to use the Azure portal to monitor your workload. This includes setting up Azure Monitor Logs to investigate query execution and workload trends using log analytics for [Synapse SQL](https://azure.microsoft.com/blog/workload-insights-with-sql-data-warehouse-delivered-through-azure-monitor-diagnostic-logs-pass/).

## Prerequisites

- Azure subscription: If you don't have an Azure subscription, create a [free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
- SQL pool: We will be collecting logs for a SQL pool. If you don't have a SQL pool provisioned, see the instructions in [Create a SQL pool](load-data-from-azure-blob-storage-using-copy.md).

## Create a Log Analytics workspace

In the Azure portal, navigate to the page for Log Analytics workspaces, or use the Azure services search window to create a new Log Analytics workspace. 

Screenshot shows the Log Analytics workspaces where you can select Add.

Screenshot shows the Log Analytics workspace where you can enter values.

For more information on workspaces, see [Create a Log Analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/quick-create-workspace).

## Turn on Resource logs

Configure diagnostic settings to emit logs from your SQL pool. Logs consist of telemetry views equivalent to the most commonly used performance troubleshooting DMVs.

For a list of views that are currently supported, see [Dynamic Management Views](../monitor-synapse-analytics-reference.md#dynamic-management-views-dmvs).

Screenshot of the page to create a diagnostic setting in the Azure portal.

Logs can be emitted to Azure Storage, Stream Analytics, or Log Analytics. For this tutorial, select Log Analytics. Select all desired categories and metrics and choose **Send to Log Analytics workspace**. 

Screenshot of the page to specify which logs to collect in the Azure portal.

Select **Save** to create the new diagnostic setting. It may take a few minutes for data to appear in queries.

## Run queries against Log Analytics

Navigate to your Log Analytics workspace where you can:

- Analyze logs using log queries and save queries for reuse
- Save queries for reuse
- Create log alerts
- Pin query results to a dashboard

For details on the capabilities of log queries using Kusto, see [Kusto Query Language (KQL) overview](https://learn.microsoft.com/azure/data-explorer/kusto/query/).

Log Analytics workspace editor.

Log Analytics workspace queries.

## Sample log queries

Set the [scope of your queries](https://learn.microsoft.com/azure/azure-monitor/logs/scope) to the Log Analytics workspace resource.

```Kusto
//List all queries
AzureDiagnostics
| where Category contains "ExecRequests"
| project TimeGenerated, StartTime_t, EndTime_t, Status_s, Command_s, ResourceClass_s, duration=datetime_diff('millisecond',EndTime_t, StartTime_t)
```

```Kusto
//Chart the most active resource classes
AzureDiagnostics
| where Category contains "ExecRequests"
| where Status_s == "Completed"
| summarize totalQueries = dcount(RequestId_s) by ResourceClass_s
| render barchart
```

```Kusto
//Count of all queued queries
AzureDiagnostics
| where Category contains "waits"
| where Type == "UserConcurrencyResourceType"
| summarize totalQueuedQueries = dcount(RequestId_s)
```

## Next steps

- Now that you have set up and configured Azure monitor logs, [customize Azure dashboards](https://learn.microsoft.com/azure/azure-portal/azure-portal-dashboards?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json\&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json) to share across your team.
