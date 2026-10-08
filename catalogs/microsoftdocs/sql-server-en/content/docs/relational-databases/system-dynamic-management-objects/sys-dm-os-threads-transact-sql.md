---
title: "sys.dm_os_threads (Transact-SQL)"
description: sys.dm_os_threads (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "02/27/2023"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - linux-related-content
  - ignite-2025
f1_keywords:
  - "dm_os_threads_TSQL"
  - "sys.dm_os_threads"
  - "dm_os_threads"
  - "sys.dm_os_threads_TSQL"
helpviewer_keywords:
  - "sys.dm_os_threads dynamic management view"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# sys.dm_os_threads (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns a list of all  SQL Server 
 Operating System threads that are running under the  SQL Server 
 process.  
  
> **Note:**  
>  To call this from  Azure Synapse Analytics , use the name **sys.dm_pdw_nodes_os_threads**.  This syntax is not supported by serverless SQL pool in Azure Synapse Analytics. 
 
  
| Column name | Data type | Description |
| --- | --- | --- |
| thread_address | **varbinary(8)** | Memory address (Primary Key) of the thread. |
| started_by_sqlservr | **bit** | Indicates the thread initiator.<br /><br /> 1 =  SQL Server |
 | started the thread.<br /><br /> 0 = Another component started the thread, such as an extended stored procedure from within  SQL Server |
| . |
| os_thread_id | **int** | ID of the thread that is assigned by the operating system. |
| status | **int** | Internal status flag. |
| instruction_address | **varbinary(8)** | Address of the instruction that is currently being executed. |
| creation_time | **datetime** | Time when this thread was created. |
| kernel_time | **bigint** | Amount of kernel time that is used by this thread. |
| usermode_time | **bigint** | Amount of user time that is used by this thread. |
| stack_base_address | **varbinary(8)** | Memory address of the highest stack address for this thread. |
| stack_end_address | **varbinary(8)** | Memory address of the lowest stack address of this thread. |
| stack_bytes_committed | **int** | Number of bytes that are committed in the stack. |
| stack_bytes_used | **int** | Number of bytes that are actively being used on the thread. |
| affinity | **bigint** | CPU mask on which this thread is running. This depends on the value configured by the **ALTER SERVER CONFIGURATION SET PROCESS AFFINITY** statement. Might be different from the scheduler in case of soft-affinity. |
| Priority | **int** | Priority value of this thread. |
| Locale | **int** | Cached locale LCID for the thread. |
| Token | **varbinary(8)** | Cached impersonation token handle for the thread. |
| is_impersonating | **int** | Indicates whether this thread is using Win32 impersonation.<br /><br /> 1 = The thread is using security credentials that are different from the default of the process. This indicates that the thread is impersonating an entity other than the one that created the process. |
| is_waiting_on_loader_lock | **int** | Operating system status of whether the thread is waiting on the loader lock. |
| fiber_data | **varbinary(8)** | Current Win32 fiber that is running on the thread. This is only applicable when  SQL Server |
 | is configured for lightweight pooling. |
| thread_handle | **varbinary(8)** | Internal use only. |
| event_handle | **varbinary(8)** | Internal use only. |
| scheduler_address | **varbinary(8)** | Memory address of the scheduler that is associated with this thread. For more information, see [sys.dm_os_schedulers &#40;Transact-SQL&#41;](sys-dm-os-schedulers-transact-sql.md). |
| worker_address | **varbinary(8)** | Memory address of the worker that is bound to this thread. For more information, see [sys.dm_os_workers &#40;Transact-SQL&#41;](sys-dm-os-workers-transact-sql.md). |
| fiber_context_address | **varbinary(8)** | Internal fiber context address. This is only applicable when  SQL Server |
 | is configured for lightweight pooling. |
| self_address | **varbinary(8)** | Internal consistency pointer. |
| processor_group | **smallint** | **Applies to**:  SQL Server 2008 R2 (10.50.x) |
 | and later.<br /><br /> Processor group ID. |
| pdw_node_id | **int** | **Applies to**:  Azure Synapse Analytics <br /><br /> The identifier for the node that this distribution is on. |
  
## Permissions

On  SQL Server 
 and SQL Managed Instance, requires `VIEW SERVER STATE` permission.

On SQL Database **Basic**, **S0**, and **S1** service objectives, and for databases in **elastic pools**, the [server admin](https://learn.microsoft.com/azure/azure-sql/database/logins-create-manage#existing-logins-and-user-accounts-after-creating-a-new-database) account, the [Microsoft Entra admin](https://learn.microsoft.com/azure/azure-sql/database/authentication-aad-overview#administrator-structure) account, or membership in the `##MS_ServerStateReader##` [server role](https://learn.microsoft.com/azure/azure-sql/database/security-server-roles) is required. On all other SQL Database service objectives, either the `VIEW DATABASE STATE` permission on the database, or membership in the `##MS_ServerStateReader##` server role is required.   

### Permissions for SQL Server 2022 and later

Requires VIEW SERVER PERFORMANCE STATE permission on the server.

## Notes on Linux version

Due to how the SQL engine works in Linux, some of this information doesn't match Linux diagnostics data. For example, `os_thread_id` does not match the result of tools like `ps`,`top` or the procfs (/proc/`pid`).  This is due the Platform Abstraction Layer (SQLPAL), a layer between SQL Server components and the operating system.

## Examples  
 Upon startup,  SQL Server 
 starts threads and then associates workers with those threads. However, external components, such as an extended stored procedure, can start threads under the  SQL Server 
 process.  SQL Server 
 has no control of these threads. sys.dm_os_threads can provide information about rogue threads that consume resources in the  SQL Server 
 process.  
  
 The following query is used to find workers, along with time used for execution, that are running threads not started by  SQL Server 
.  
  
> **Note:**
>  For conciseness, the following query uses an asterisk (`*`) in the `SELECT` statement. You should avoid using the asterisk (*), especially against catalog views, dynamic management views, and system table-valued functions. Future upgrades and releases of  Microsoft 
  SQL Server 
 may add columns and change the order of columns to these views and functions. These changes might break applications that expect a particular order and number of columns.  
  
```  
SELECT *  
  FROM sys.dm_os_threads  
  WHERE started_by_sqlservr = 0;  
```  
  
## Related content

- [sys.dm_os_workers (Transact-SQL)](sys-dm-os-workers-transact-sql.md)
- [SQL Server Operating System related dynamic management views (Transact-SQL)](sql-server-operating-system-related-dynamic-management-views-transact-sql.md)
