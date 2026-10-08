---
title: "sys.dm_db_task_space_usage (Transact-SQL)"
description: sys.dm_db_task_space_usage returns page allocation and deallocation activity by task for the database.
author: rwestMSFT
ms.author: randolphwest
ms.date: "02/24/2023"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "dm_db_task_space_usage_TSQL"
  - "sys.dm_db_task_space_usage_TSQL"
  - "dm_db_task_space_usage"
  - "sys.dm_db_task_space_usage"
helpviewer_keywords:
  - "sys.dm_db_task_space_usage dynamic management view"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# sys.dm_db_task_space_usage (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns page allocation and deallocation activity by task for the database.  
  
> **Note:**  
>  This view is applicable only to the [tempdb database](../databases/tempdb-database.md).  
  
> **Note:**  
>  To call this from  Azure Synapse Analytics , use the name `sys.dm_pdw_nodes_db_task_space_usage`.  This syntax is not supported by serverless SQL pool in Azure Synapse Analytics. 
  

  
| Column name | Data type | Description |
| --- | --- | --- |
| **session_id** | **smallint** | Session ID. |
| **request_id** | **int** | Request ID within the session.<br /><br /> A request is also called a batch and may contain one or more queries. A session may have multiple requests active at the same time. Each query in the request may start multiple threads (tasks), if a parallel execution plan is used. |
| **exec_context_id** | **int** | Execution context ID of the task. For more information, see [sys.dm_os_tasks &#40;Transact-SQL&#41;](sys-dm-os-tasks-transact-sql.md). |
| **database_id** | **smallint** | Database ID. <br /><br />In  Azure SQL Database |
| , the values are unique within a single database or an elastic pool, but not within a logical server. |
| **user_objects_alloc_page_count** | **bigint** | Number of pages reserved or allocated for user objects by this task. |
| **user_objects_dealloc_page_count** | **bigint** | Number of pages deallocated and no longer reserved for user objects by this task. |
| **internal_objects_alloc_page_count** | **bigint** | Number of pages reserved or allocated for internal objects by this task. |
| **internal_objects_dealloc_page_count** | **bigint** | Number of pages deallocated and no longer reserved for internal objects by this task. |
| **pdw_node_id** | **int** | **Applies to**:  Azure Synapse Analytics <br /><br /> The identifier for the node that this distribution is on. |
  
## Permissions

On  SQL Server 
 and SQL Managed Instance, requires `VIEW SERVER STATE` permission.

On SQL Database **Basic**, **S0**, and **S1** service objectives, and for databases in **elastic pools**, the [server admin](https://learn.microsoft.com/azure/azure-sql/database/logins-create-manage#existing-logins-and-user-accounts-after-creating-a-new-database) account, the [Microsoft Entra admin](https://learn.microsoft.com/azure/azure-sql/database/authentication-aad-overview#administrator-structure) account, or membership in the `##MS_ServerStateReader##` [server role](https://learn.microsoft.com/azure/azure-sql/database/security-server-roles) is required. On all other SQL Database service objectives, either the `VIEW DATABASE STATE` permission on the database, or membership in the `##MS_ServerStateReader##` server role is required.   

### Permissions for SQL Server 2022 and later

Requires VIEW SERVER PERFORMANCE STATE permission on the server.

## Remarks  
 IAM pages are not included in any of the page counts reported by this view.  
  
 Page counters are initialized to zero (0) at the start of a request. These values are aggregated at the session level when the request is completed. For more information, see [sys.dm_db_session_space_usage &#40;Transact-SQL&#41;](sys-dm-db-session-space-usage-transact-sql.md).  
  
 Work table caching, temporary table caching, and deferred drop operations affect the number of pages allocated and deallocated in a specified task.  
  
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
 
Diagram of physical joins for sys.dm_db_task_space_usage.

## Relationship cardinalities  
  
| From | To | Relationship |
| --- | --- | --- |
| `dm_db_task_space_usage.request_id` | `dm_exec_requests.request_id` | One-to-one |
| `dm_db_task_space_usage.session_id` | `dm_exec_requests.session_id` | One-to-one |
  
## Related content

- [System dynamic management views and functions](system-dynamic-management-objects.md)
- [Database related dynamic management views (Transact-SQL)](database-related-dynamic-management-views-transact-sql.md)
- [sys.dm_exec_sessions (Transact-SQL)](sys-dm-exec-sessions-transact-sql.md)
- [sys.dm_exec_requests (Transact-SQL)](sys-dm-exec-requests-transact-sql.md)
- [sys.dm_os_tasks (Transact-SQL)](sys-dm-os-tasks-transact-sql.md)
- [sys.dm_db_session_space_usage (Transact-SQL)](sys-dm-db-session-space-usage-transact-sql.md)
- [sys.dm_db_file_space_usage (Transact-SQL)](sys-dm-db-file-space-usage-transact-sql.md)
