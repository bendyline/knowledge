---
title: "sys.dm_db_session_space_usage (Transact-SQL)"
description: sys.dm_db_session_space_usage (Transact-SQL) returns the number of pages allocated and deallocated by each session for the tempdb system database
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/19/2023"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "dm_db_session_space_usage_TSQL"
  - "dm_db_session_space_usage"
  - "sys.dm_db_session_space_usage"
  - "sys.dm_db_session_space_usage_TSQL"
helpviewer_keywords:
  - "sys.dm_db_session_space_usage dynamic management view"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# sys.dm_db_session_space_usage (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns the number of pages allocated and deallocated by each session for the database.  
  
> **Note:**  
>  This view is applicable only to the [tempdb database](../databases/tempdb-database.md).  
  
> **Note:**  
>  To call this from  Azure Synapse Analytics , use the name `sys.dm_pdw_nodes_db_session_space_usage`.  This syntax is not supported by serverless SQL pool in Azure Synapse Analytics. 
  

| Column name | Data type | Description |
| --- | --- | --- |
| **session_id** | **smallint** | Session ID.<br /><br /> **session_id** maps to **session_id** in [sys.dm_exec_sessions](sys-dm-exec-sessions-transact-sql.md). |
| **database_id** | **smallint** | Database ID. <br /><br />In  Azure SQL Database |
| , the values are unique within a single database or an elastic pool, but not within a logical server. |
| **user_objects_alloc_page_count** | **bigint** | Number of pages reserved or allocated for user objects by this session. |
| **user_objects_dealloc_page_count** | **bigint** | Number of pages deallocated and no longer reserved for user objects by this session. |
| **internal_objects_alloc_page_count** | **bigint** | Number of pages reserved or allocated for internal objects by this session. |
| **internal_objects_dealloc_page_count** | **bigint** | Number of pages deallocated and no longer reserved for internal objects by this session. |
| **user_objects_deferred_dealloc_page_count** | **bigint** | Number of pages which have been marked for deferred deallocation.<br /><br /> **Note:** Introduced in service packs for  SQL Server 2012 (11.x) |
 | and  SQL Server 2014 (12.x) |
| . |
| **pdw_node_id** | **int** | **Applies to**:  Azure Synapse Analytics <br /><br /> The identifier for the node that this distribution is on. |
  
## Permissions  

On  SQL Server 
 and SQL Managed Instance, requires `VIEW SERVER STATE` permission.

On SQL Database **Basic**, **S0**, and **S1** service objectives, and for databases in **elastic pools**, the [server admin](https://learn.microsoft.com/azure/azure-sql/database/logins-create-manage#existing-logins-and-user-accounts-after-creating-a-new-database) account, the [Microsoft Entra admin](https://learn.microsoft.com/azure/azure-sql/database/authentication-aad-overview#administrator-structure) account, or membership in the `##MS_ServerStateReader##` [server role](https://learn.microsoft.com/azure/azure-sql/database/security-server-roles) is required. On all other SQL Database service objectives, either the `VIEW DATABASE STATE` permission on the database, or membership in the `##MS_ServerStateReader##` server role is required.   

### Permissions for SQL Server 2022 and later

Requires VIEW SERVER PERFORMANCE STATE permission on the server.

## Remarks  
 IAM pages are not included in any of the allocation or deallocation counts reported by this view.  
  
 Page counters are initialized to zero (0) at the start of a session. The counters track the total number of pages that have been allocated or deallocated for tasks that are already completed in the session. The counters are updated only when a task ends; they do not reflect running tasks.  
  
 A session can have multiple requests active at the same time. A request can start multiple threads, tasks, if it is a parallel query.  
  
 For more information about the sessions, requests, and tasks, see [sys.dm_exec_sessions &#40;Transact-SQL&#41;](sys-dm-exec-sessions-transact-sql.md), [sys.dm_exec_requests &#40;Transact-SQL&#41;](sys-dm-exec-requests-transact-sql.md), and [sys.dm_os_tasks &#40;Transact-SQL&#41;](sys-dm-os-tasks-transact-sql.md).  
  
## User objects  
 The following objects are included in the user object page counters:  
  
-   User-defined tables and indexes  
  
-   System tables and indexes  
  
-   Global temporary tables and indexes  
  
-   Local temporary tables and indexes  
  
-   Table variables  
  
-   Tables returned in the table-valued functions  
  
## Internal objects  

 Internal objects are only in `tempdb`. The following objects are included in the internal object page counters:  
  
-   Work tables for cursor or spool operations and temporary large object (LOB) storage  
  
-   Work files for operations such as a hash join  
  
-   Sort runs  
  
## Physical joins  

Diagram of physical joins for sys.dm_db_session_space_usage.

## Relationship cardinalities  
  
| From | To | Relationship |
| --- | --- | --- |
| `dm_db_session_space_usage`.`session_id` | `dm_exec_sessions`.`session_id` | One-to-one |
  
## Related content

- [System dynamic management views and functions](system-dynamic-management-objects.md)
- [Database related dynamic management views (Transact-SQL)](database-related-dynamic-management-views-transact-sql.md)
- [sys.dm_exec_sessions (Transact-SQL)](sys-dm-exec-sessions-transact-sql.md)
- [sys.dm_exec_requests (Transact-SQL)](sys-dm-exec-requests-transact-sql.md)
- [sys.dm_os_tasks (Transact-SQL)](sys-dm-os-tasks-transact-sql.md)
- [sys.dm_db_task_space_usage (Transact-SQL)](sys-dm-db-task-space-usage-transact-sql.md)
- [sys.dm_db_file_space_usage (Transact-SQL)](sys-dm-db-file-space-usage-transact-sql.md)
