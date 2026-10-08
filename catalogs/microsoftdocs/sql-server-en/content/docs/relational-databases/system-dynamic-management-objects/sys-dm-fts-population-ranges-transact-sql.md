---
title: "sys.dm_fts_population_ranges (Transact-SQL)"
description: sys.dm_fts_population_ranges returns information about the specific ranges related to a full-text index population currently in progress.
author: rwestMSFT
ms.author: randolphwest
ms.date: "02/27/2023"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "sys.dm_fts_population_ranges"
  - "sys.dm_fts_population_ranges_TSQL"
  - "dm_fts_population_ranges_TSQL"
  - "dm_fts_population_ranges"
helpviewer_keywords:
  - "sys.dm_fts_population_ranges dynamic management view"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# sys.dm_fts_population_ranges (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns information about the specific ranges related to a full-text index population currently in progress.  
   
| Column name | Data type | Description |
| --- | --- | --- |
| **memory_address** | **varbinary(8)** | Address of memory buffers allocated for activity related to this subrange of a full-text index population. |
| **parent_memory_address** | **varbinary(8)** | Address of memory buffers representing the parent object of all ranges of population related to a full-text index. |
| **is_retry** | **bit** | If the value is 1, this subrange is responsible for retrying rows that encountered errors. |
| **session_id** | **smallint** | ID of the session that is currently processing this task. |
| **processed_row_count** | **int** | Number of rows that have been processed by this range. Forward progress is persisted and counted every 5 minutes, rather than with every batch commit. |
| **error_count** | **int** | Number of rows that have encountered errors by this range. Forward progress is persisted and counted every 5 minutes, rather than with every batch commit. |
  
## Permissions  

On  SQL Server 
 and SQL Managed Instance, requires `VIEW SERVER STATE` permission.

On SQL Database **Basic**, **S0**, and **S1** service objectives, and for databases in **elastic pools**, the [server admin](https://learn.microsoft.com/azure/azure-sql/database/logins-create-manage#existing-logins-and-user-accounts-after-creating-a-new-database) account, the [Microsoft Entra admin](https://learn.microsoft.com/azure/azure-sql/database/authentication-aad-overview#administrator-structure) account, or membership in the `##MS_ServerStateReader##` [server role](https://learn.microsoft.com/azure/azure-sql/database/security-server-roles) is required. On all other SQL Database service objectives, either the `VIEW DATABASE STATE` permission on the database, or membership in the `##MS_ServerStateReader##` server role is required.   
 
### Permissions for SQL Server 2022 and later

Requires VIEW SERVER PERFORMANCE STATE permission on the server.

## Physical joins  

Diagram of physical joins for sys.dm_fts_population_ranges.
  
## Relationship cardinalities  
  
| From | To | Relationship |
| --- | --- | --- |
| `dm_fts_population_ranges.parent_memory_address` | `dm_fts_index_population.memory_address` | Many-to-one |
  
## Related content

- [Full-text and semantic search dynamic management views and functions](full-text-and-semantic-search-dynamic-management-views-functions.md)
