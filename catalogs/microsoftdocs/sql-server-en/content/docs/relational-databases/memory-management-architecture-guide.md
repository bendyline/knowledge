---
title: Memory Management Architecture Guide
description: Learn about memory management architecture in SQL Server, including changes to memory management in previous versions.
author: rwestMSFT
ms.author: randolphwest
ms.date: 12/29/2025
ms.service: sql
ms.subservice: supportability
ms.topic: concept-article
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "guide, memory management architecture"
  - "memory management architecture guide"
  - "PMO"
  - "Partitioned Memory Objects"
  - "cmemthread"
  - "AWE"
  - "SPA, Single Page Allocator"
  - "MPA, Multi Page Allocator"
  - "memory allocation, SQL Server"
  - "memory pressure, SQL Server"
  - "stack size, SQL Server"
  - "buffer manager, SQL Server"
  - "buffer pool, SQL Server"
  - "resource monitor, SQL Server"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# Memory management architecture guide


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





## Windows Virtual Memory Manager

The committed regions of address space are mapped to the available physical memory by the Windows Virtual Memory Manager (VMM).

For more information on the amount of physical memory supported by different operating systems, see the Windows documentation on [Memory Limits for Windows Releases](https://learn.microsoft.com/windows/desktop/Memory/memory-limits-for-windows-releases).

Virtual memory systems allow the over-commitment of physical memory, so that the ratio of virtual-to-physical memory can exceed 1:1. As a result, larger programs can run on computers with various physical memory configurations. However, using significantly more virtual memory than the combined average working sets of all the processes can cause poor performance.

## SQL Server memory architecture

 SQL Server 
 dynamically acquires and frees memory as required. Typically, an administrator doesn't have to specify how much memory should be allocated to  SQL Server 
, although the option still exists and is required in some environments.

One of the primary design goals of all database software is to minimize disk I/O because disk reads and writes are among the most resource-intensive operations.  SQL Server 
 builds a buffer pool in memory to hold pages read from the database. Much of the code in  SQL Server 
 is dedicated to minimizing the number of physical reads and writes between the disk and the buffer pool.  SQL Server 
 tries to reach a balance between two goals:

- Keep the buffer pool from becoming so large that the entire system is low on memory.
- Minimize physical I/O to the database files by maximizing the size of the buffer pool.

In a heavily loaded system, some large queries that require a large amount of memory to run can't get the minimum amount of requested memory, and receive a time-out error while waiting for memory resources. To resolve this, increase the [query wait Option](../database-engine/configure-windows/configure-the-query-wait-server-configuration-option.md). For a parallel query, consider reducing the [max degree of parallelism](../database-engine/configure-windows/configure-the-max-degree-of-parallelism-server-configuration-option.md) value.

In a heavily loaded system under memory pressure, queries with merge join, sort, and bitmap in the query plan can drop the bitmap when the queries don't get the minimum required memory for the bitmap. This can affect the query performance and if the sorting process can't fit in memory, it can increase the usage of worktables in `tempdb` database, causing `tempdb` to grow. To resolve this problem, add physical memory, or tune the queries to use a different and faster query plan.

### Conventional (virtual) memory

All SQL Server editions support conventional memory on 64-bit platform. The SQL Server process can access virtual address space up to operating system maximum on x64 architecture.

> **Note:**  
> Starting with  SQL Server 2025 (17.x) 
, SQL Server Standard edition supports up to 256 GB. In  SQL Server 2022 (16.x) 
 and earlier versions, SQL Server Standard edition supports up to 128 GB.

With IA64 architecture, the limit was 7 TB (IA64 not supported in  SQL Server 2012 (11.x) 
 and later versions).

For more information, see [Memory Limits for Windows](https://learn.microsoft.com/windows/win32/memory/memory-limits-for-windows-releases).

### Address Windows Extensions (AWE) memory

By using [Address Windowing Extensions](https://learn.microsoft.com/windows/win32/memory/address-windowing-extensions) (AWE) and the *Lock pages in memory* (LPIM) privilege required by AWE, you can keep most of SQL Server process memory *locked* in physical RAM under low virtual memory conditions. This happens in both 32-bit and 64-bit AWE allocations. The locking of memory occurs because AWE memory doesn't go through the Virtual Memory Manager in Windows, which controls paging of memory. The AWE memory allocation API requires the *Lock pages in memory* (SeLockMemoryPrivilege) privilege; see [AllocateUserPhysicalPages notes](https://learn.microsoft.com/windows/win32/api/memoryapi/nf-memoryapi-allocateuserphysicalpages#remarks). Therefore, the main benefit of using the AWE API is to keep most of the memory resident in RAM if there's memory pressure on the system. For information on how to allow SQL Server to use AWE, see [Enable the Lock pages in memory option (Windows)](../database-engine/configure-windows/enable-the-lock-pages-in-memory-option-windows.md).

If LPIM is granted, we strongly recommend that you set `max server memory (MB)` to a specific value, rather than leaving the default of 2,147,483,647 megabytes (MB). For more information, see [Server memory configuration options: Set options manually](../database-engine/configure-windows/server-memory-server-configuration-options.md#manually) and [Lock pages in memory (LPIM)](../database-engine/configure-windows/server-memory-server-configuration-options.md#lock-pages-in-memory-lpim).

If LPIM isn't enabled, SQL Server switches to using conventional memory and in cases of OS memory exhaustion, and the [MSSQLSERVER_17890](errors-events/mssqlserver-17890-database-engine-error.md) error might be reported in the error log. The error resembles the following example:

```output
A significant part of SQL Server process memory has been paged out. This may result in a performance degradation. Duration: #### seconds. Working set (KB): ####, committed (KB): ####, memory utilization: ##%.
```

<a id="changes-to-memory-management-starting-2012-11x-gm"></a>

## Changes to memory management starting with SQL Server 2012

In older versions of  SQL Server 
, memory allocation was done using five different mechanisms:

- **Single-Page Allocator (SPA)**, including only memory allocations that were less than, or equal to 8 KB in the  SQL Server 
 process. The `max server memory (MB)` and `min server memory (MB)` configuration options determined the limits of physical memory that the SPA consumed. The Buffer Pool was simultaneously the mechanism for SPA, and the largest consumer of single-page allocations.

- **Multi-Page Allocator (MPA)**, for memory allocations that request more than 8 KB.

- **CLR Allocator**, including the SQL CLR heaps and its global allocations that are created during CLR initialization.

- Memory allocations for **[thread stacks](memory-management-architecture-guide.md#stacksizes)** in the  SQL Server 
 process.

- **Direct Windows allocations (DWA)**, for memory allocation requests made directly to Windows. These include Windows heap usage and direct virtual allocations made by modules that are loaded into the  SQL Server 
 process. Examples of such memory allocation requests include allocations from extended stored procedure DLLs, objects that are created by using Automation procedures (`sp_OA` calls), and allocations from linked server providers.

Starting with  SQL Server 2012 (11.x) 
, Single-Page allocations, Multi-Page allocations and CLR allocations are all consolidated into an **"Any size" Page Allocator**, and included in memory limits controlled by `max server memory (MB)` and `min server memory (MB)` configuration options. This change provided a more accurate sizing ability for all memory requirements that go through the  SQL Server 
 memory manager.

> **Important:**  
> Carefully review your current `max server memory (MB)` and `min server memory (MB)` configurations after you upgrade to  SQL Server 2012 (11.x) 
 and later versions. This is because starting in  SQL Server 2012 (11.x) 
, such configurations now include and account for more memory allocations compared to earlier versions.
> These changes apply to both 32-bit and 64-bit versions of  SQL Server 2012 (11.x) 
 and  SQL Server 2014 (12.x)
, and 64-bit versions of  SQL Server 2016 (13.x) 
 and later versions.

The following table indicates whether a specific type of memory allocation is controlled by the `max server memory (MB)` and `min server memory (MB)` configuration options:

| Type of memory allocation |  SQL Server 2005 (9.x) 
,  SQL Server 2008 (10.0.x) 
 and  SQL Server 2008 R2 (10.50.x) 
 | Starting with  SQL Server 2012 (11.x) 
 |
| --- | --- | --- |
| Single-page allocations | Yes | Yes, consolidated into "any size" page allocations |
| Multi-page allocations | No | Yes, consolidated into "any size" page allocations |
| CLR allocations | No | Yes |
| Thread stacks memory | No | No |
| Direct allocations from Windows | No | No |

### SQL Server might commit memory over the max server memory setting

Starting with  SQL Server 2012 (11.x) 
,  SQL Server 
 might allocate more memory than the value specified in the `max server memory (MB)` setting. This behavior can occur when the **Total Server Memory (KB)** value has already reached the **Target Server Memory (KB)** setting, as specified by `max server memory (MB)`. If there's insufficient contiguous free memory to meet the demand of multi-page memory requests (more than 8 KB) because of memory fragmentation,  SQL Server 
 can perform over-commitment instead of rejecting the memory request.

As soon as this allocation is performed, the Resource Monitor background task starts to signal all memory consumers to release the allocated memory, and tries to bring the **Total Server Memory (KB)** value below the **Target Server Memory (KB)** specification. Therefore,  SQL Server 
 memory usage could briefly exceed the `max server memory (MB)` setting. In this situation, the **Total Server Memory (KB)** performance counter reading exceeds the `max server memory (MB)` and **Target Server Memory (KB)** settings.

This behavior is typically observed during the following operations:

- Large columnstore index queries
- Large [batch mode on rowstore](performance/intelligent-query-processing-details.md#batch-mode-on-rowstore) queries
- Columnstore index (re)builds, which use large volumes of memory to perform Hash and Sort operations
- Backup operations that require large memory buffers
- Tracing operations that have to store large input parameters
- Large memory grant requests

If you observe this behavior frequently, consider using [trace flag 8121](../t-sql/database-console-commands/dbcc-traceon-trace-flags-transact-sql.md#tf8121) in  SQL Server 2019 (15.x) 
 to allow the Resource Monitor to clean up more quickly. Starting with  SQL Server 2022 (16.x) 
, this functionality is enabled by default, and the trace flag has no effect.

<a id="changes-to-memory-management-starting-with-"></a>

## Changes to memory_to_reserve starting with SQL Server 2012

In older versions of  SQL Server 
, the  SQL Server 
 memory manager set aside a part of the process virtual address space (VAS) for use by the **Multi-Page Allocator (MPA)**, **CLR Allocator**, memory allocations for **thread stacks** in the SQL Server process, and **Direct Windows allocations (DWA)**. This part of the virtual address space is also known as "Mem-To-Leave" or "non-Buffer Pool" region.

The virtual address space that is reserved for these allocations is determined by the `memory_to_reserve` configuration option. The default value that  SQL Server 
 uses is 256 MB.

Because the "any size" page allocator also handles allocations greater than 8 KB, the `memory_to_reserve` value doesn't include the multi-page allocations. Except for this change, everything else remains the same with this configuration option.

The following table indicates whether a specific type of memory allocation falls into the `memory_to_reserve` region of the virtual address space for the  SQL Server 
 process:

| Type of memory allocation |  SQL Server 2005 (9.x) 
,  SQL Server 2008 (10.0.x) 
 and  SQL Server 2008 R2 (10.50.x) 
 | Starting with  SQL Server 2012 (11.x) 
 |
| --- | --- | --- |
| Single-page allocations | No | No, consolidated into "any size" page allocations |
| Multi-page allocations | Yes | No, consolidated into "any size" page allocations |
| CLR allocations | Yes | Yes |
| Thread stacks memory | Yes | Yes |
| Direct allocations from Windows | Yes | Yes |

## Dynamic memory management

The default memory management behavior of the  SQL Server Database Engine 
 is to acquire as much memory as it needs without creating a memory shortage on the system. The  SQL Server Database Engine 
 does this by using the Memory Notification APIs in Microsoft Windows.

When  SQL Server 
 is using memory dynamically, it queries the system periodically to determine the amount of free memory. Maintaining this free memory prevents the operating system (OS) from paging. If less memory is free,  SQL Server 
 releases memory to the OS. If more memory is free,  SQL Server 
 can allocate more memory.  SQL Server 
 adds memory only when its workload requires more memory; a server at rest doesn't increase the size of its virtual address space. If you notice that Task Manager and Performance Monitor show a steady decrease in available memory when  SQL Server 
 is using dynamic memory management, this is the default behavior and shouldn't be perceived as a memory leak.

**[Server memory configuration options](../database-engine/configure-windows/server-memory-server-configuration-options.md)** controls the  SQL Server 
 memory allocation, compile memory, all caches (including the buffer pool), [query execution memory grants](#effects-of-min-memory-per-query), [lock manager memory](#memory-used-by-sql-server-objects-specifications), and CLR<sup>1</sup> memory (essentially any memory clerk found in [sys.dm_os_memory_clerks](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/system-dynamic-management-views/sys-dm-os-memory-clerks-transact-sql.md)).

<sup>1</sup> CLR memory is managed under `max server memory (MB)` allocations starting with  SQL Server 2012 (11.x) 
.

The following query returns information about currently allocated memory:

```sql
SELECT physical_memory_in_use_kb / 1024 AS sql_physical_memory_in_use_MB,
       large_page_allocations_kb / 1024 AS sql_large_page_allocations_MB,
       locked_page_allocations_kb / 1024 AS sql_locked_page_allocations_MB,
       virtual_address_space_reserved_kb / 1024 AS sql_VAS_reserved_MB,
       virtual_address_space_committed_kb / 1024 AS sql_VAS_committed_MB,
       virtual_address_space_available_kb / 1024 AS sql_VAS_available_MB,
       page_fault_count AS sql_page_fault_count,
       memory_utilization_percentage AS sql_memory_utilization_percentage,
       process_physical_memory_low AS sql_process_physical_memory_low,
       process_virtual_memory_low AS sql_process_virtual_memory_low
FROM sys.dm_os_process_memory;
```

<a id="stacksizes"></a>

### Stack sizes

Memory for thread stacks <sup>1</sup>, CLR <sup>2</sup>, extended procedure .dll files, the OLE DB providers referenced by distributed queries, automation objects referenced in  Transact-SQL  statements, and any memory allocated by a non  SQL Server 
 DLL, are *not* controlled by `max server memory (MB)`.

<sup>1</sup> Refer to [Server configuration: max worker threads](../database-engine/configure-windows/configure-the-max-worker-threads-server-configuration-option.md), for information on the calculated default worker threads for a given number of affinitized CPUs in the current host.  SQL Server 
 stack sizes are as follows:

| SQL Server architecture | OS architecture | Stack size |
| --- | --- | --- |
| x86 (32-bit) | x86 (32-bit) | 512 KB |
| x86 (32-bit) | x64 (64-bit) | 768 KB |
| x64 (64-bit) | x64 (64-bit) | 2,048 KB |
| IA64 (Itanium) | IA64 (Itanium) | 4,096 KB |

<sup>2</sup> CLR memory is managed under `max server memory (MB)` allocations starting with  SQL Server 2012 (11.x) 
.

 SQL Server 
 uses the memory notification API `QueryMemoryResourceNotification` to determine when the  SQL Server 
 memory manager might allocate memory and release memory.

When  SQL Server 
 starts, it computes the size of virtual address space for the buffer pool based on several parameters such as amount of physical memory on the system, number of server threads and various startup parameters.  SQL Server 
 reserves the computed amount of its process virtual address space for the buffer pool, but it acquires (commits) only the required amount of physical memory for the current load.

The instance then continues to acquire memory as needed to support the workload. As more users connect and run queries,  SQL Server 
 acquires more physical memory on demand. A  SQL Server 
 instance continues to acquire physical memory until it either reaches its `max server memory (MB)` allocation target or the OS indicates there's no longer an excess of free memory; it frees memory when it's more than the min server memory setting, and the OS indicates that there's a shortage of free memory.

As other applications are started on a computer running an instance of  SQL Server 
, they consume memory and the amount of free physical memory drops below the  SQL Server 
 target. The instance of  SQL Server 
 adjusts its memory consumption. If another application is stopped and more memory becomes available, the instance of  SQL Server 
 increases the size of its memory allocation.  SQL Server 
 can free and acquire several megabytes of memory each second, allowing it to quickly adjust to memory allocation changes.

## Effects of min and max server memory

The *min server memory* and *max server memory* configuration options establish upper and lower limits to the amount of memory used by the buffer pool and other caches of the  Database Engine 
. The buffer pool doesn't immediately acquire the amount of memory specified in min server memory. The buffer pool starts with only the memory required to initialize. As the  SQL Server Database Engine 
 workload increases, it keeps acquiring the memory required to support the workload. The buffer pool doesn't free any of the acquired memory until it reaches the amount specified in min server memory. Once min server memory is reached, the buffer pool then uses the standard algorithm to acquire and free memory as needed. The only difference is that the buffer pool never drops its memory allocation below the level specified in min server memory, and never acquires more memory than the level specified in `max server memory (MB)`.

> **Note:**  
>  SQL Server 
 as a process acquires more memory than specified by `max server memory (MB)` option. Both internal and external components can allocate memory outside of the buffer pool, which consumes additional memory, but the memory allocated to the buffer pool usually still represents the largest portion of memory consumed by  SQL Server 
.

The amount of memory acquired by the  SQL Server Database Engine 
 is entirely dependent on the workload placed on the instance. A  SQL Server 
 instance that isn't processing many requests might never reach the value specified by `min server memory (MB)`.

If the same value is specified for both min server memory and `max server memory (MB)`, then once the memory allocated to the  SQL Server Database Engine 
 reaches that value, the  SQL Server Database Engine 
 stops dynamically freeing and acquiring memory for the buffer pool.

If an instance of  SQL Server 
 is running on a computer where other applications are frequently stopped or started, the allocation and deallocation of memory by the instance of  SQL Server 
 can slow the startup times of other applications. Also, if  SQL Server 
 is one of several server applications running on a single computer, the system administrators should control the amount of memory allocated to  SQL Server 
. In these cases, you can use the min server memory and `max server memory (MB)` options to control how much memory  SQL Server 
 can use. The `min server memory (MB)` and `max server memory (MB)` options are specified in megabytes. For more information including recommendations on how to set these memory configurations, see [Server memory configuration options](../database-engine/configure-windows/server-memory-server-configuration-options.md).

## Memory used by SQL Server objects specifications

The following list describes the approximate amount of memory used by different objects in  SQL Server 
. The amounts listed are estimates and can vary depending on the environment and how objects are created:

- Lock (as maintained by the Lock Manager): 64 bytes + 32 bytes per owner
- User connection: Approximately (3 \* *network_packet_size* + 94 KB)

The *network packet size* is the size of the tabular data stream (TDS) packets that are used to communicate between applications and the  Database Engine 
. The default packet size is 4 KB, and is controlled by the network packet size configuration option.

When multiple active result sets (MARS) are enabled, the user connection is approximately (3 + 3 \* *num_logical_connections*) * network_packet_size + 94 KB.

## Effects of min memory per query

The `min memory per query` configuration option establishes the minimum amount of memory (in kilobytes) that will be allocated for the execution of a query. This is also known as the minimum memory grant. All queries must wait until the minimum memory requested can be secured, before execution can start, or until the value specified in the query wait server configuration option is exceeded. The wait type that is accumulated in this scenario is `RESOURCE_SEMAPHORE`.

> **Important:**  
> Don't set the `min memory per query` server configuration option too high, especially on very busy systems, because doing so could lead to:
>
> - Increased competition for memory resources.
> - Decreased concurrency by increasing the amount of memory for every single query, even if the required memory at runtime is lower that this configuration.
>
> For recommendations on using this configuration, see [Server configuration: min memory per query](../database-engine/configure-windows/configure-the-min-memory-per-query-server-configuration-option.md#recommendations).

### Memory grant considerations

For *row mode execution*, the initial memory grant can't be exceeded under any condition. If more memory than the initial grant is needed to execute *hash* or *sort* operations, then the operations spill to disk. A hash operation that spills is supported by a Workfile in `tempdb`, while a sort operation that spills is supported by a [Worktable](query-processing-architecture-guide.md#worktables).

A spill that occurs during a Sort operation is known as a [Sort Warnings Event Class](event-classes/sort-warnings-event-class.md). Sort warnings indicate that sort operations don't fit into memory. This doesn't include sort operations involving the creation of indexes, only sort operations within a query (such as an `ORDER BY` clause used in a `SELECT` statement).

A spill that occurs during a hash operation is known as a [Hash Warning Event Class](event-classes/hash-warning-event-class.md). These occur when a hash recursion or cessation of hashing (hash bailout) has occurred during a hashing operation.

- Hash recursion occurs when the build input doesn't fit into available memory, resulting in the split of input into multiple partitions that are processed separately. If any of these partitions still don't fit into available memory, it's split into subpartitions, which are also processed separately. This splitting process continues until each partition fits into available memory or until the maximum recursion level is reached.
- Hash bailout occurs when a hashing operation reaches its maximum recursion level and shifts to an alternate plan to process the remaining partitioned data. These events can cause reduced performance in your server.

For *batch mode execution*, the initial memory grant can dynamically increase up to a certain internal threshold by default. This dynamic memory grant mechanism is designed to allow memory-resident execution of *hash* or *sort* operations running in batch mode. If these operations still don't fit into memory, then the operations spill to disk.

For more information on execution modes, see the [Query Processing Architecture Guide](query-processing-architecture-guide.md#execution-modes).

## Buffer management

The primary purpose of a  SQL Server 
 database is to store and retrieve data, so intensive disk I/O is a core characteristic of the Database Engine. And because disk I/O operations can consume many resources and take a relatively long time to finish,  SQL Server 
 focuses on making I/O highly efficient. Buffer management is a key component in achieving this efficiency. The buffer management component consists of two mechanisms: the *buffer manager* to access and update database pages, and the *buffer cache* (also called the *buffer pool*), to reduce database file I/O.

For a detailed explanation of disk I/O in  SQL Server 
, see [SQL Server I/O fundamentals](sql-server-storage-guide.md).

### How buffer management works

A buffer is an 8-KB page in memory, the same size as a data or index page. Thus, the buffer cache is divided into 8-KB pages. The buffer manager manages the functions for reading data or index pages from the database disk files into the buffer cache, and writing modified pages back to disk. A page remains in the buffer cache until the buffer manager needs the buffer area to read in more data. Data is written back to disk only if it's modified. Data in the buffer cache can be modified multiple times before being written back to disk. For more information, see [Read data pages in the Database Engine](reading-pages.md) and [Write pages in the Database Engine](writing-pages.md).

When  SQL Server 
 starts, it computes the size of virtual address space for the buffer cache based on several parameters such as the amount of physical memory on the system, the configured number of maximum server threads, and various startup parameters.  SQL Server 
 reserves this computed amount of its process virtual address space (called the memory target) for the buffer cache, but it acquires (commits) only the required amount of physical memory for the current load. You can query the `committed_target_kb` and `committed_kb` columns in the [sys.dm_os_sys_info](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/system-dynamic-management-views/sys-dm-os-sys-info-transact-sql.md) catalog view to return the number of pages reserved as the memory target and the number of pages currently committed in the buffer cache, respectively.

The interval between  SQL Server 
 startup and when the buffer cache obtains its memory target is called ramp-up. During this time, read requests fill the buffers as needed. For example, a single 8-KB page read request fills a single buffer page. This means the ramp-up depends on the number and type of client requests. Ramp-up is expedited by transforming single page read requests into aligned eight page requests (making up one extent). This allows the ramp-up to finish much faster, especially on machines with a lot of memory. For more information about pages and extents, see [Page and extent architecture guide](pages-and-extents-architecture-guide.md).

Because the buffer manager uses most of the memory in the  SQL Server 
 process, it cooperates with the memory manager to allow other components to use its buffers. The buffer manager interacts primarily with the following components:

- Resource Manager to control overall memory usage and, in 32-bit platforms, to control address space usage.
- Database Manager and the  SQL Server 
 Operating System (SQLOS) for low-level file I/O operations.
- Log Manager for write-ahead logging.

### Supported features

The buffer manager supports the following features:

- The buffer manager is *non-uniform memory access (NUMA)* aware. Buffer cache pages are distributed across hardware NUMA nodes, which allows a thread to access a buffer page that is allocated on the local NUMA node rather than from foreign memory.
- The buffer manager supports *Hot Add Memory*, which allows users to add physical memory without restarting the server.
- The buffer manager supports *large pages* on 64-bit platforms. The page size is specific to the version of Windows.

  > **Note:**  
  > Prior to  SQL Server 2012 (11.x) 
, enabling large pages in  SQL Server 
 requires [trace flag 834](../t-sql/database-console-commands/dbcc-traceon-trace-flags-transact-sql.md).

- The buffer manager provides extra diagnostics that are exposed through dynamic management views. You can use these views to monitor various operating system resources that are specific to  SQL Server 
. For example, you can use the [sys.dm_os_buffer_descriptors](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/system-dynamic-management-views/sys-dm-os-buffer-descriptors-transact-sql.md) view to monitor the pages in the buffer cache.

### Memory pressure detection

Memory pressure is a condition resulting from memory shortage, and can result in:

- Extra I/Os (such as very active lazy writer background thread)
- Higher recompile ratio
- Longer running queries (if memory grant waits exist)
- Extra CPU cycles

This situation can be triggered by external or internal causes. External causes include:

- Available physical memory (RAM) is low. This causes the system to trim working sets of currently running processes, which can result in overall slowdown.  SQL Server 
 can reduce the commit target of the buffer pool and start trimming internal caches more often.
- Overall available system memory (which includes the system page file) is low. This can cause the system to fail memory allocations, as it's unable to page out currently allocated memory.

Internal causes include:

- Responding to the external memory pressure, when the  SQL Server Database Engine 
 sets lower memory usage caps.
- Memory settings were manually lowered by reducing the *max server memory* configuration.
- Changes in memory distribution of internal components between the several caches.

The  SQL Server Database Engine 
 implements a framework dedicated to detecting and handling memory pressure, as part of its dynamic memory management. This framework includes the background task called Resource Monitor. The Resource Monitor task monitors the state of external and internal memory indicators. Once one of these indicators changes status, it calculates the corresponding notification and it broadcasts it. These notifications are internal messages from each of the engine components, and stored in ring buffers.

Two ring buffers hold information relevant to dynamic memory management:

- The Resource Monitor ring buffer, which tracks Resource Monitor activity like was memory pressure signaled or not. This ring buffer has status information depending on the current condition of `RESOURCE_MEMPHYSICAL_HIGH`, `RESOURCE_MEMPHYSICAL_LOW`, `RESOURCE_MEMPHYSICAL_STEADY`, or `RESOURCE_MEMVIRTUAL_LOW`.

- The Memory Broker ring buffer, which contains records of memory notifications for each Resource Governor resource pool. As internal memory pressure is detected, low memory notification is turned on for components that allocate memory, to trigger actions meant to balance the memory between caches.

Memory brokers monitor the demand consumption of memory by each component and then based on the information collected, it calculates and optimal value of memory for each of these components. There's a set of brokers for each Resource Governor resource pool. This information is then broadcast to each of the components, which grow or shrink their usage as required.

For more information about memory brokers, see [sys.dm_os_memory_brokers](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/system-dynamic-management-views/sys-dm-os-memory-brokers-transact-sql.md).

### Error detection

Database pages can use one of two optional mechanisms that help ensure the integrity of the page, from the time it's written to disk, until it's read again: *torn page protection* and *checksum protection*. These mechanisms allow an independent method of verifying the correctness of not only the data storage, but hardware components such as controllers, drivers, cables, and even the operating system. The protection is added to the page just before writing it to disk, and verified after it's read from disk.

 SQL Server 
 retries any read that fails with a checksum, torn page, or other I/O error four times. If the read is successful in any one of the retry attempts, a message is written to the error log and the command that triggered the read continues. If the retry attempts fail, the command fails with the [MSSQLSERVER_824](errors-events/mssqlserver-824-database-engine-error.md) error.

The kind of page protection used is an attribute of the database containing the page. Checksum protection is the default protection for databases created in  SQL Server 2005 (9.x) 
 and later versions. The page protection mechanism is specified at database creation time, and can be altered by using `ALTER DATABASE SET`. You can determine the current page protection setting by querying the `page_verify_option` column in the [sys.databases](system-catalog-views/sys-databases-transact-sql.md) catalog view or the `IsTornPageDetectionEnabled` property of the [DATABASEPROPERTYEX](../t-sql/functions/databasepropertyex-transact-sql.md) function.

> **Note:**  
> If the page protection setting is changed, the new setting doesn't immediately affect the entire database. Instead, pages adopt the current protection level of the database whenever they are written next. This means that the database might be composed of pages with different kinds of protection.

#### Torn page protection

Torn page protection, introduced in  SQL Server 2000 (8.x) 
, is primarily a way of detecting page corruptions due to power failures. For example, an unexpected power failure might leave only part of a page written to disk. When torn page protection is used, a specific 2-bit signature pattern for each 512-byte sector in the 8-kilobyte (KB) database page and stored in the database page header when the page is written to disk.

When the page is read from disk, the torn bits stored in the page header are compared to the actual page sector information. The signature pattern alternates between binary `01` and `10` with every write, so it's always possible to tell when only a portion of the sectors made it to disk: if a bit is in the wrong state when the page is later read, the page was written incorrectly and a torn page is detected. Torn page detection uses minimal resources; however, it doesn't detect all errors caused by disk hardware failures. For information on setting torn page detection, see [ALTER DATABASE SET Options](../t-sql/statements/alter-database-transact-sql-set-options.md#page_verify).

#### Checksum protection

Checksum protection, introduced in  SQL Server 2005 (9.x) 
, provides stronger data integrity checking. A checksum is calculated for the data in each page that is written, and stored in the page header. Whenever a page with a stored checksum is read from disk, the database engine recalculates the checksum for the data in the page and raises error 824 if the new checksum is different from the stored checksum. Checksum protection can catch more errors than torn page protection because it's affected by every byte of the page, however, it's moderately resource-intensive.

When checksum is enabled, errors caused by power failures and flawed hardware or firmware can be detected any time the buffer manager reads a page from disk. For information on setting checksum, see [ALTER DATABASE SET Options](../t-sql/statements/alter-database-transact-sql-set-options.md#page_verify).

> **Important:**  
> When a user or system database is upgraded to  SQL Server 2005 (9.x) 
 or later, the [PAGE_VERIFY](../t-sql/statements/alter-database-transact-sql-set-options.md#page_verify) value (`NONE` or `TORN_PAGE_DETECTION`) is retained. We highly recommend that you use `CHECKSUM`. `TORN_PAGE_DETECTION` might use fewer resources, but provides a minimal subset of the `CHECKSUM` protection.

## Understand non-uniform memory access

 SQL Server 
 is non-uniform memory access (NUMA) aware, and performs well on NUMA hardware without special configuration. As clock speed and the number of processors increase, it becomes increasingly difficult to reduce the memory latency required to use this extra processing power. To circumvent this, hardware vendors provide large L3 caches, but this is only a limited solution. NUMA architecture provides a scalable solution to this problem.

 SQL Server 
 is designed to take advantage of NUMA-based computers without requiring any application changes. For more information, see [Soft-NUMA (SQL Server)](../database-engine/configure-windows/soft-numa-sql-server.md).

## Dynamic partition of memory objects

Heap allocators, known as *memory objects* in  SQL Server 
, allow the  Database Engine 
 to allocate memory from the heap. These can be tracked using the [sys.dm_os_memory_objects](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/system-dynamic-management-views/sys-dm-os-memory-objects-transact-sql.md) DMV.

`CMemThread` is a thread-safe memory object type that allows concurrent memory allocations from multiple threads. For correct tracking, `CMemThread` objects rely on synchronization constructs (a mutex) to ensure only a single thread is updating critical pieces of information at a time.

> **Note:**  
> The `CMemThread` object type is utilized throughout the  Database Engine 
 code base for many different allocations, and can be partitioned globally, by node or by CPU.

However, the use of mutexes can lead to contention if many threads are allocating from the same memory object in a highly concurrent fashion. Therefore,  SQL Server 
 has the concept of partitioned memory objects (PMO) and each partition is represented by a single `CMemThread` object. The partitioning of a memory object is statically defined and can't be changed after creation. As memory allocation patterns vary widely based on aspects like hardware and memory usage, it's impossible to come up with the perfect partitioning pattern upfront.

In most cases, using a single partition suffices, but in some scenarios this can lead to contention, which can be prevented only with a highly partitioned memory object. It isn't desirable to partition each memory object as more partitions can result in other inefficiencies and increase memory fragmentation.

> **Note:**  
> Before  SQL Server 2016 (13.x) 
, trace flag 8048 could be used to force a node-based PMO to become a CPU-based PMO. Starting with  SQL Server 2014 (12.x)
 SP2 and  SQL Server 2016 (13.x) 
, this behavior is dynamic and controlled by the engine.

Starting with  SQL Server 2014 (12.x)
 SP2 and  SQL Server 2016 (13.x) 
, the  Database Engine 
 can dynamically detect contention on a specific `CMemThread` object and promote the object to a per-node or a per-CPU based implementation. Once promoted, the PMO remains promoted until the  SQL Server 
 process is restarted. `CMemThread` contention can be detected by the presence of high `CMEMTHREAD` waits in the [sys.dm_os_wait_stats](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/system-dynamic-management-views/sys-dm-os-wait-stats-transact-sql.md) DMV, and by observing the [sys.dm_os_memory_objects](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/system-dynamic-management-views/sys-dm-os-memory-objects-transact-sql.md) DMV columns `contention_factor`, `partition_type`, `exclusive_allocations_count`, and `waiting_tasks_count`.

## Related content

- [SQL Server I/O fundamentals](sql-server-storage-guide.md)
- [Server memory configuration options](../database-engine/configure-windows/server-memory-server-configuration-options.md)
- [Read data pages in the Database Engine](reading-pages.md)
- [Write pages in the Database Engine](writing-pages.md)
- [Soft-NUMA (SQL Server)](../database-engine/configure-windows/soft-numa-sql-server.md)
- [Requirements for using memory-optimized tables](in-memory-oltp/requirements-for-using-memory-optimized-tables.md)
- [Troubleshoot out of memory or low memory issues in SQL Server](https://learn.microsoft.com/troubleshoot/sql/performance/troubleshoot-memory-issues)
- [Resolve Out Of Memory issues](in-memory-oltp/resolve-out-of-memory-issues.md)
