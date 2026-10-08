---
title: "sys.dm_pdw_errors (Transact-SQL)"
description: sys.dm_pdw_errors holds information about all errors encountered during execution of a request or query in Azure Synapse Analytics dedicated SQL pools.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: 04/23/2024
ms.service: sql
ms.subservice: data-warehouse
ms.topic: "reference"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest"
---
# sys.dm_pdw_errors (Transact-SQL)

**Applies to:**
 


 


> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).

  Holds information about all errors encountered during execution of a request or query in Azure Synapse Analytics dedicated SQL pools.

> **Note:**
>  This syntax is not supported by serverless SQL pool in Azure Synapse Analytics. 
  
  
| Column Name | Data Type | Description | Range |
| --- | --- | --- | --- |
| `error_id` | **nvarchar(36)** | Key for this view.<br /><br /> Unique numeric ID associated with the error. | Unique across all query errors in the system. |
| `source` | **nvarchar(64)** | Information not available. |
| Information not available. |
|  |
| `type` | **nvarchar(4000)** | Type of error that occurred. | Information not available. |
|  |
| `create_time` | **datetime** | Time at which the error occurred. | Smaller or equal to current time. |
| `pwd_node_id` | **int** | Identifier of the specific node involved, if any. For more information on node IDs, see [sys.dm_pdw_nodes (Transact-SQL)](sys-dm-pdw-nodes-transact-sql.md). |  |
| `session_id` | **nvarchar(32)** | Identifier of the session involved, if any. For more information on session IDs, see  [sys.dm_pdw_exec_sessions (Transact-SQL)](sys-dm-pdw-exec-sessions-transact-sql.md). |  |
| `request_id` | **nvarchar(32)** | Identifier of the request involved, if any. For more information on request IDs, see [sys.dm_pdw_exec_requests (Transact-SQL)](sys-dm-pdw-exec-requests-transact-sql.md). This `request_id` can be corresponded with the `request_id` in [sys.dm_pdw_exec_requests](sys-dm-pdw-exec-requests-transact-sql.md) |  |
| `spid` | **int** | Session ID of the SQL Server session involved, if any. |  |
| `thread_id` | **int** | Information not available. |
|  |
| `details` | **nvarchar(4000)** | Holds the full error text description. |  |
  
 For information about the maximum rows retained by this view, see [Capacity limits](https://learn.microsoft.com/azure/sql-data-warehouse/sql-data-warehouse-service-capacity-limits#metadata).  
  
## Related content

- [sys.dm_pdw_exec_requests (Transact-SQL)](sys-dm-pdw-exec-requests-transact-sql.md)
- [Azure Synapse Analytics dynamic management objects](azure-synapse-analytics-dynamic-management-objects.md)
