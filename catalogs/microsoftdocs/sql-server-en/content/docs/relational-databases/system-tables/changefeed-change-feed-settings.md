---
title: "changefeed.change_feed_settings (Transact-SQL)"
description: "changefeed.change_feed_settings contains metadata that is used to configure change feed."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: imotiwala
ms.date: 03/08/2024
ms.service: azure-synapse-analytics
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "changefeed.change_feed_settings"
  - "changefeed.change_feed_settings_TSQL"
helpviewer_keywords:
  - "changefeed.change_feed_settings"
dev_langs:
  - "TSQL"
monikerRange: ">=sql-server-ver16||=azuresqldb-current||=azure-sqldw-latest"
---
# changefeed.change_feed_settings (Transact-SQL)


**Applies to:**
 


 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 




> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).

Contains metadata that is used to configure change feed for Azure Synapse Link for SQL.

| Column name | Data type | Description |
| --- | --- | --- |
| `maxtrans` | **int** | Maximum transactions to process in each cycle. |
| `seqno` | **binary(10)** | Log Sequence Number (LSN) marker to track the last published LSN (log record). |
| `schema_version` | **int** | Tracks current schema version of database. Determines whether a schema needs to be updated or not on startup. |
| `pollinterval` | **int** | The frequency that the log is scanned for any new changes in seconds. |

## Remarks

The `changefeed.change_feed_settings` system table isn't used in [Fabric mirrored databases](https://learn.microsoft.com/fabric/database/mirrored-database/overview), instead use the [sys.sp_help_change_feed_settings (Transact-SQL)](../system-stored-procedures/sp-help-change-feed-settings.md) system stored procedure.

## Related content

- [What is Azure Synapse Link for SQL?](https://learn.microsoft.com/azure/synapse-analytics/synapse-link/sql-synapse-link-overview)
- [Manage Azure Synapse Link for SQL Server and Azure SQL Database](../../sql-server/synapse-link/synapse-link-sql-server-change-feed-manage.md)
- [sys.sp_help_change_feed (Transact-SQL)](../system-stored-procedures/sp-help-change-feed.md)
