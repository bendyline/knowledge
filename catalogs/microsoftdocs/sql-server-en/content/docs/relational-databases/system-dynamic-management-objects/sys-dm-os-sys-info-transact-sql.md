---
title: "sys.dm_os_sys_info (Transact-SQL)"
description: sys.dm_os_sys_info (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: 04/02/2024
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.dm_os_sys_info_TSQL"
  - "dm_os_sys_info"
  - "dm_os_sys_info_TSQL"
  - "sys.dm_os_sys_info"
helpviewer_keywords:
  - "sys.dm_os_sys_info dynamic management view"
  - "time [SQL Server], instance started"
  - "starting time"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# sys.dm_os_sys_info (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





Returns a miscellaneous set of useful information about the computer, and about the resources available to and consumed by  SQL Server 
.

> **Note:**  
> To call this from  Azure Synapse Analytics , use the name `sys.dm_pdw_nodes_os_sys_info`.  This syntax is not supported by serverless SQL pool in Azure Synapse Analytics. 


| Column name | Data type | Description and version-specific notes |
| --- | --- | --- |
| `cpu_ticks` | **bigint** | Specifies the current CPU tick count. CPU ticks are obtained from the processor's RDTSC counter. It's a monotonically increasing number. Not nullable. |
| `ms_ticks` | **bigint** | Specifies the number of milliseconds since the computer started. Not nullable. |
| `cpu_count` | **int** | Specifies the number of logical CPUs on the system. Not nullable.<br /><br />In Azure SQL Database, this column might return the number of logical CPUs on the machine hosting the database or elastic pool. To determine the number of logical CPUs available to the database or elastic pool, use the `cpu_limit` column in [sys.dm_user_db_resource_governance](sys-dm-user-db-resource-governor-azure-sql-database.md). |
| `hyperthread_ratio` | **int** | Specifies the ratio of the number of logical or physical cores that are exposed by one physical processor package. Not nullable. |
| `physical_memory_in_bytes` | **bigint** | **Applies to:**  SQL Server 2008 (10.0.x) |
 | and  SQL Server 2008 R2 (10.50.x) |
| .<br /><br />Specifies the total amount of physical memory on the machine. Not nullable. |
| `physical_memory_kb` | **bigint** | **Applies to:**  SQL Server 2012 (11.x) |
 | and later versions.<br /><br />Specifies the total amount of physical memory on the machine. Not nullable.<br /><br />In Azure SQL Database, this column returns the total amount of physical memory on the machine hosting the database or elastic pool. To determine the amount of physical memory available to the database or elastic pool, use the `process_memory_limit_mb` column in [sys.dm_os_job_object](sys-dm-os-job-object-transact-sql.md). |
| `virtual_memory_in_bytes` | **bigint** | **Applies to:**  SQL Server 2008 (10.0.x) |
 | and  SQL Server 2008 R2 (10.50.x) |
| .<br /><br />Amount of virtual memory available to the process in user mode. This value can be used to determine whether  SQL Server |
 | was started by using a 3-GB switch. |
| `virtual_memory_kb` | **bigint** | **Applies to:**  SQL Server 2012 (11.x) |
 | and later versions.<br /><br />Specifies the total amount of virtual address space available to the process in user mode. Not nullable. |
| `bpool_committed` | **int** | **Applies to:**  SQL Server 2008 (10.0.x) |
 | and  SQL Server 2008 R2 (10.50.x) |
| .<br /><br />Represents the committed memory in kilobytes (KB) in the memory manager. Doesn't include reserved memory in the memory manager. Not nullable. |
| `committed_kb` | **bigint** | **Applies to:**  SQL Server 2012 (11.x) |
 | and later versions.<br /><br />Represents the committed memory in kilobytes (KB) in the memory manager. Doesn't include reserved memory in the memory manager. Not nullable. |
| `bpool_commit_target` | **int** | **Applies to:**  SQL Server 2008 (10.0.x) |
 | and  SQL Server 2008 R2 (10.50.x) |
| .<br /><br />Represents the amount of memory, in kilobytes (KB), that can be consumed by  SQL Server |
 | memory manager. |
| `committed_target_kb` | **bigint** | **Applies to:**  SQL Server 2012 (11.x) |
 | and later versions.<br /><br />Represents the amount of memory, in kilobytes (KB), that can be consumed by  SQL Server |
 | memory manager. The target amount is calculated using several inputs like:<br /><br />- the current state of the system including its load<br />- the memory requested by current processes<br />- the amount of memory installed on the computer<br />- configuration parameters<br /><br />If `committed_target_kb` is larger than `committed_kb`, the memory manager tries to obtain more memory. If `committed_target_kb` is smaller than `committed_kb`, the memory manager tries to shrink the amount of memory committed. The `committed_target_kb` always includes stolen and reserved memory. Not nullable. |
| `bpool_visible` | **int** | **Applies to:**  SQL Server 2008 (10.0.x) |
 | and  SQL Server 2008 R2 (10.50.x) |
| .<br /><br />Number of 8-KB buffers in the buffer pool that are directly accessible in the process virtual address space. When not using the Address Windowing Extensions (AWE), when the buffer pool obtains its memory target (`bpool_committed = bpool_commit_target`), the value of `bpool_visible` equals the value of `bpool_committed`. When using AWE on a 32-bit version of  SQL Server |
| , `bpool_visible` represents the size of the AWE mapping window used to access physical memory allocated by the buffer pool. The size of this mapping window is bound by the process address space, and so the visible amount is smaller than the committed amount. This value can be further reduced by internal components consuming memory, for purposes other than database pages. If the value of `bpool_visible` is too low, you might receive out of memory errors. |
| `visible_target_kb` | **bigint** | **Applies to:**  SQL Server 2012 (11.x) |
 | and later versions.<br /><br />Is the same as `committed_target_kb`. Not nullable. |
| `stack_size_in_bytes` | **int** | Specifies the size of the call stack for each thread created by  SQL Server |
| . Not nullable. |
| `os_quantum` | **bigint** | Represents the Quantum for a non-preemptive task, measured in milliseconds. Quantum (in seconds) = `os_quantum` / CPU clock speed. Not nullable. |
| `os_error_mode` | **int** | Specifies the error mode for the  SQL Server |
 | process. Not nullable. |
| `os_priority_class` | **int** | Specifies the priority class for the  SQL Server |
 | process. Nullable.<br /><br />`32` = Normal. Error log says  SQL Server |
 | is starting at normal priority base (`7`).<br />`128` = High. Error log says  SQL Server |
 | is running at high priority base (`13`).<br /><br />For more information, see [Configure the priority boost (server configuration option)](../../database-engine/configure-windows/configure-the-priority-boost-server-configuration-option.md). |
| `max_workers_count` | **int** | Represents the maximum number of workers that can be created. Not nullable. |
| `scheduler_count` | **int** | Represents the number of user schedulers configured in the  SQL Server |
 | process. Not nullable. |
| `scheduler_total_count` | **int** | Represents the total number of schedulers in  SQL Server |
| . Not nullable. |
| `deadlock_monitor_serial_number` | **int** | Specifies the ID of the current deadlock monitor sequence. Not nullable. |
| `sqlserver_start_time_ms_ticks` | **bigint** | Represents the `ms_tick` number when  SQL Server |
 | last started. Compare to the current `ms_ticks` column. Not nullable. |
| `sqlserver_start_time` | **datetime** | Specifies the local system date and time  SQL Server |
 | last started. Not nullable.<br /><br />Information in many other  SQL Server |
 | DMVs only includes activity since the last database engine startup. Use this column to find the last  SQL Server Database Engine |
 | startup time. |
| `affinity_type` | **int** | **Applies to:**  SQL Server 2008 R2 (10.50.x) |
 | and later versions.<br /><br />Specifies the type of server CPU process affinity currently in use. Not nullable. For more information, see [ALTER SERVER CONFIGURATION (Transact-SQL)](../../t-sql/statements/alter-server-configuration-transact-sql.md).<br /><br />`1` = `MANUAL`<br />`2` = `AUTO` |
| `affinity_type_desc` | **nvarchar(60)** | **Applies to:**  SQL Server 2008 R2 (10.50.x) |
 | and later versions.<br /><br />Describes the `affinity_type` column. Not nullable.<br /><br />`MANUAL` = affinity was set for at least one CPU.<br />`AUTO` =  SQL Server |
 | can freely move threads between CPUs. |
| `process_kernel_time_ms` | **bigint** | **Applies to:**  SQL Server 2008 R2 (10.50.x) |
 | and later versions.<br /><br />Total time in milliseconds spent by all  SQL Server |
 | threads in kernel mode. This value can be larger than a single processor clock because it includes the time for all processors on the server. Not nullable. |
| `process_user_time_ms` | **bigint** | **Applies to:**  SQL Server 2008 R2 (10.50.x) |
 | and later versions.<br /><br />Total time in milliseconds spent by all  SQL Server |
 | threads in user mode. This value can be larger than a single processor clock because it includes the time for all processors on the server. Not nullable. |
| `time_source` | **int** | **Applies to:**  SQL Server 2008 R2 (10.50.x) |
 | and later versions.<br /><br />Indicates the API that  SQL Server |
 | is using to retrieve wall clock time. Not nullable.<br /><br />`0` = `QUERY_PERFORMANCE_COUNTER`<br />`1` = `MULTIMEDIA_TIMER` |
| `time_source_desc` | **nvarchar(60)** | **Applies to:**  SQL Server 2008 R2 (10.50.x) |
 | and later versions.<br /><br />Describes the `time_source` column. Not nullable.<br /><br />`QUERY_PERFORMANCE_COUNTER` = the [QueryPerformanceCounter](https://learn.microsoft.com/windows/win32/api/profileapi/nf-profileapi-queryperformancecounter) API retrieves wall clock time.<br />`MULTIMEDIA_TIMER` = The [multimedia timer](https://learn.microsoft.com/previous-versions/ms713418\(v=vs.85\)) API that retrieves wall clock time. |
| `virtual_machine_type` | **int** | **Applies to:**  SQL Server 2008 R2 (10.50.x) |
 | and later versions.<br /><br />Indicates whether  SQL Server |
 | is running in a virtualized environment. Not nullable.<br /><br />`0` = `NONE`<br />`1` = `HYPERVISOR`<br />`2` = `OTHER` |
| `virtual_machine_type_desc` | **nvarchar(60)** | **Applies to:**  SQL Server 2008 R2 (10.50.x) |
 | and later versions.<br /><br />Describes the `virtual_machine_type` column. Not nullable.<br /><br />`NONE` =  SQL Server |
 | isn't running inside a virtual machine.<br />`HYPERVISOR` =  SQL Server |
 | is running inside a virtual machine hosted by an OS running hypervisor (a host OS that employs hardware-assisted virtualization).<br />`OTHER` =  SQL Server |
 | is running inside a virtual machine hosted by an OS that doesn't employ hardware assistant such as Microsoft Virtual PC. |
| `softnuma_configuration` | **int** | **Applies to:**  SQL Server 2016 (13.x) |
 | and later versions.<br /><br />Specifies the way NUMA nodes are configured. Not nullable.<br /><br />`0` = `OFF` indicates hardware default<br />`1` = Automated soft-NUMA<br />`2` = Manual soft-NUMA via registry |
| `softnuma_configuration_desc` | **nvarchar(60)** | **Applies to:**  SQL Server 2016 (13.x) |
 | and later versions.<br /><br />`OFF` = Soft-NUMA feature is off<br />`ON` =  SQL Server |
 | automatically determines the NUMA node sizes for Soft-NUMA<br />`MANUAL` = Manually configured soft-NUMA |
| `process_physical_affinity` | **nvarchar(3072)** | **Applies to:** Starting with  SQL Server 2017 (14.x) |
| .<br /><br /> Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `sql_memory_model` | **int** | **Applies to:**  SQL Server 2012 (11.x) |
 | SP4,  SQL Server 2016 (13.x) |
 | SP1, and later versions.<br /><br />Specifies the memory model used by  SQL Server |
 | to allocate memory. Not nullable.<br /><br />`1` = Conventional memory model<br />`2` = Lock pages in memory<br />`3` = Large pages in memory |
| `sql_memory_model_desc` | **nvarchar(60)** | **Applies to:**  SQL Server 2012 (11.x) |
 | SP4,  SQL Server 2016 (13.x) |
 | SP1, and later versions.<br /><br />Specifies the memory model used by  SQL Server |
 | to allocate memory. Not nullable.<br /><br />`CONVENTIONAL` =  SQL Server |
 | is using Conventional Memory model to allocate memory. This is default  Database Engine |
 | memory model when  SQL Server |
 | service account doesn't have Lock Pages in Memory privileges during startup.<br />`LOCK_PAGES` =  SQL Server |
 | is using Lock Pages in Memory to allocate memory. This is the default  Database Engine |
 | memory manager when the  SQL Server |
 | service account has the "Lock pages in memory" privilege during  SQL Server |
 | startup.<br />`LARGE_PAGES` =  SQL Server |
 | is using Large Pages in Memory to allocate memory.  SQL Server |
 | uses the Large Pages allocator to allocate memory only with Enterprise edition when  SQL Server |
 | service account has the "Lock pages in memory" privilege during server startup, and when trace flag 834 is turned on. |
| `pdw_node_id` | **int** | **Applies to:**  Azure Synapse Analytics <br /><br />The identifier for the node that this distribution is on. |
| `socket_count` | **int** | **Applies to:**  SQL Server 2016 (13.x) |
 | SP2 and later versions.<br /><br />Specifies the number of processor sockets available on the system. |
| `cores_per_socket` | **int** | **Applies to:**  SQL Server 2016 (13.x) |
 | SP2 and later versions.<br /><br />Specifies the number of processors per socket available on the system. |
| `numa_node_count` | **int** | **Applies to:**  SQL Server 2016 (13.x) |
 | SP2 and later versions.<br /><br />Specifies the number of NUMA nodes available on the system. This column includes physical NUMA nodes and soft NUMA nodes. |
| `container_type` | **int** | **Applies to:**  SQL Server 2017 (14.x) |
 | and later versions.<br /><br />Specifies the type of container  SQL Server |
 | is running inside. Not nullable.<br /><br />`0` (default) = `NONE`<br />`1` = `LINUX CONTAINER`<br />`2` = `WINDOWS SERVER CONTAINER`<br />`3` = `HYPER-V CONTAINER` |
| `container_type_desc` | **nvarchar(60)** | **Applies to:**  SQL Server 2017 (14.x) |
 | and later versions.<br /><br />Describes the `container_type` column. Not nullable.<br /><br />`NONE` =  SQL Server |
 | isn't running in a container.<br />`LINUX CONTAINER` =  SQL Server |
 | is running in a Linux container.<br />`WINDOWS SERVER CONTAINER` =  SQL Server |
 | is running in a Windows Server container.<br />`HYPER-V CONTAINER` =  SQL Server |
 | is running in a Hyper-V container. |

## Permissions

On  SQL Server 2019 (15.x) 
 and earlier versions, and SQL Managed Instance, you require `VIEW SERVER STATE` permission.

On  SQL Server 2022 (16.x) 
 and later versions, you require `VIEW SERVER PERFORMANCE STATE` permission on the server.

On Azure SQL Database **Basic**, **S0**, and **S1** service objectives, and for databases in **elastic pools**, the [server admin](https://learn.microsoft.com/azure/azure-sql/database/logins-create-manage#existing-logins-and-user-accounts-after-creating-a-new-database) account, the [Microsoft Entra admin](https://learn.microsoft.com/azure/azure-sql/database/authentication-aad-overview#administrator-structure) account, or membership in the `##MS_ServerStateReader##` [server role](https://learn.microsoft.com/azure/azure-sql/database/security-server-roles) is required. On all other SQL Database service objectives, either the `VIEW DATABASE STATE` permission on the database, or membership in the `##MS_ServerStateReader##` server role is required.

## Related content

- [System dynamic management views and functions](system-dynamic-management-objects.md)
- [SQL Server Operating System related dynamic management views (Transact-SQL)](sql-server-operating-system-related-dynamic-management-views-transact-sql.md)
