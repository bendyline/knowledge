---
title: "sys.dm_os_memory_cache_entries (Transact-SQL)"
description: "sys.dm_os_memory_cache_entries returns information about all entries in caches in SQL Server."
author: rwestMSFT
ms.author: randolphwest
ms.date: 01/11/2024
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "dm_os_memory_cache_entries"
  - "sys.dm_os_memory_cache_entries"
  - "dm_os_memory_cache_entries_TSQL"
  - "sys.dm_os_memory_cache_entries_TSQL"
helpviewer_keywords:
  - "sys.dm_os_memory_cache_entries dynamic management view"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azure-sqldw-latest || =azuresqldb-mi-current || =fabric-sqldb"
---
# sys.dm_os_memory_cache_entries (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns information about all entries in caches in  SQL Server 
. Use this view to trace cache entries to their associated objects. You can also use this view to obtain statistics on cache entries.

> **Note:**  
> To call this from  Azure Synapse Analytics , use the name `sys.dm_pdw_nodes_os_memory_cache_entries`.  This syntax is not supported by serverless SQL pool in Azure Synapse Analytics. 


| Column name | Data type | Description |
| --- | --- | --- |
| `cache_address` | **varbinary(8)** | Address of the cache. Not nullable. |
| `name` | **nvarchar(256)** | Name of the cache. Not nullable. |
| `type` | **varchar(60)** | Type of cache. Not nullable. |
| `entry_address` | **varbinary(8)** | Address of the descriptor of the cache entry. Not nullable. |
| `entry_data_address` | **varbinary(8)** | Address of the user data in the cache entry.<br /><br />0x00000000 = Entry data address isn't available.<br /><br />Not nullable. |
| `in_use_count` | **int** | Number of concurrent users of this cache entry. Not nullable. |
| `is_dirty` | **bit** | Indicates whether this cache entry is marked for removal. 1 = marked for removal. Not nullable. |
| `disk_ios_count` | **int** | Number of I/Os incurred while this entry was created. Not nullable. |
| `context_switches_count` | **int** | Number of context switches incurred while this entry was created. Not nullable. |
| `original_cost` | **int** | Original cost of the entry. This value is an approximation of the number of I/Os incurred, CPU instruction cost, and the amount of memory consumed by entry. The greater the cost, the lower the chance that the item will be removed from the cache. Not nullable. |
| `current_cost` | **int** | Current cost of the cache entry. This value is updated during the process of entry purging. Current cost is reset to its original value on entry reuse. Not nullable. |
| `memory_object_address` | **varbinary(8)** | Address of the associated memory object. Nullable. |
| `pages_allocated_count` | **bigint** | **Applies to**:  SQL Server 2008 (10.0.x) |
 | through  SQL Server 2008 R2 (10.50.x) |
| .<br /><br />Number of 8-KB pages to store this cache entry. Not nullable. |
| `pages_kb` | **bigint** | **Applies to**:  SQL Server 2012 (11.x) |
 | and later versions.<br /><br />Amount of memory in kilobytes (KB) used by this cache entry. Not nullable. |
| `entry_data` | **nvarchar(2048)** | Serialized representation of the cached entry. This information is cache store dependent. Nullable. |
| `pool_id` | **int** | **Applies to**:  SQL Server 2008 R2 (10.50.x) |
 | and later versions.<br /><br />Resource pool ID associated with entry. Nullable. |
| `pdw_node_id` | **int** | **Applies to**:  Azure Synapse Analytics <br /><br />The identifier for the node that this distribution is on. |

## Permissions

For  SQL Server 
 and Azure SQL Managed Instance, you require `VIEW SERVER STATE` permission.

 SQL Server 2022 (16.x) 
 and later versions, you require `VIEW SERVER PERFORMANCE STATE` permission on the server.

On  Azure SQL Database 
 **Basic**, **S0**, and **S1** service objectives, and for databases in **elastic pools**, the [server admin](https://learn.microsoft.com/azure/azure-sql/database/logins-create-manage#existing-logins-and-user-accounts-after-creating-a-new-database) account, the [Microsoft Entra admin](https://learn.microsoft.com/azure/azure-sql/database/authentication-aad-overview#administrator-structure) account, or membership in the `##MS_ServerStateReader##` [server role](https://learn.microsoft.com/azure/azure-sql/database/security-server-roles) is required. On all other SQL Database service objectives, either the `VIEW DATABASE STATE` permission on the database, or membership in the `##MS_ServerStateReader##` server role is required.

## Related content

- [SQL Server Operating System related dynamic management views (Transact-SQL)](sql-server-operating-system-related-dynamic-management-views-transact-sql.md)
