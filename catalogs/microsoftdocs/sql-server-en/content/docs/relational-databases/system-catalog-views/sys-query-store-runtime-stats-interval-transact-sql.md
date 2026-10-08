---
title: "sys.query_store_runtime_stats_interval (Transact-SQL)"
description: sys.query_store_runtime_stats_interval (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: 05/26/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "QUERY_STORE_RUNTIME_STATS_INTERVAL"
  - "SYS.QUERY_STORE_RUNTIME_STATS_INTERVAL"
  - "QUERY_STORE_RUNTIME_STATS_INTERVAL_TSQL"
  - "SYS.QUERY_STORE_RUNTIME_STATS_INTERVAL_TSQL"
helpviewer_keywords:
  - "sys.query_store_runtime_stats_interval catalog view"
  - "query_store_runtime_stats_interval catalog view"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || =azure-sqldw-latest || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# sys.query_store_runtime_stats_interval (Transact-SQL)

**Applies to:**
 

 and later versions 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Contains  information about the start and end time of each interval over which runtime execution statistics information for a query has been collected.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **runtime_stats_interval_id** | **bigint** | Primary key. |
| **start_time** | **datetimeoffset** | Start time of the interval. |
| **end_time** | **datetimeoffset** | End time of the interval. |
| **comment** | **nvarchar(32)** | Always NULL. |
  
## Permissions  
 Requires the **VIEW DATABASE STATE** permission.  

### Permissions for SQL Server 2022 and later

Requires the `VIEW DATABASE PERFORMANCE STATE` permission on the database.
 [sys.database_query_store_options (Transact-SQL)](sys-database-query-store-options-transact-sql.md)   
 [sys.query_context_settings (Transact-SQL)](sys-query-context-settings-transact-sql.md)   
 [sys.query_store_plan (Transact-SQL)](sys-query-store-plan-transact-sql.md)   
 [sys.query_store_query (Transact-SQL)](sys-query-store-query-transact-sql.md)   
 [sys.query_store_query_text (Transact-SQL)](sys-query-store-query-text-transact-sql.md)   
 [sys.query_store_runtime_stats (Transact-SQL)](sys-query-store-runtime-stats-transact-sql.md)   
 [sys.query_store_wait_stats (Transact-SQL)](sys-query-store-wait-stats-transact-sql.md)  
 [Monitoring Performance By Using the Query Store](../performance/monitoring-performance-by-using-the-query-store.md)   
 [Catalog Views (Transact-SQL)](catalog-views-transact-sql.md)   
 [Query Store Stored Procedures (Transact-SQL)](../system-stored-procedures/query-store-stored-procedures-transact-sql.md)
