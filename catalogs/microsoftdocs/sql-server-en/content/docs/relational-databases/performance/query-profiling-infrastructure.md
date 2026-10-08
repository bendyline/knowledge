---
title: "Query Profiling Infrastructure"
description: Learn how the SQL Server Database Engine accesses runtime information on query execution plans to understand the workload and how resource usage is driven.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: wiassaf
ms.date: 09/07/2025
ms.service: sql
ms.subservice: performance
ms.topic: concept-article
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "query plans [SQL Server]"
  - "execution plans [SQL Server]"
  - "query profiling"
  - "lightweight query profiling"
  - "lightweight profiling"
  - "lwp"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Query Profiling Infrastructure


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



The  SQL Server Database Engine 
 provides access to runtime information on query execution plans. One of the most important actions when a performance issue occurs, is to get precise understanding on the workload that is executing and how resource usage is being driven. Thus, access to the [actual execution plan](display-an-actual-execution-plan.md) is important.

While query completion is a prerequisite for the availability of an actual query plan, [live query statistics](live-query-statistics.md) can provide real-time insights into the query execution process as the data flows from one [query plan operator](../showplan-logical-and-physical-operators-reference.md) to another. The live query plan displays the overall query progress and operator-level run-time execution statistics such as the number of rows produced, elapsed time, operator progress, etc. Because this data is available in real time without needing to wait for the query to complete, these execution statistics are extremely useful for debugging query performance issues, such as long running queries, and queries that run indefinitely and never finish.

## The standard query execution statistics profiling infrastructure

The *query execution statistics profile infrastructure*, or standard profiling, must be enabled to collect information about execution plans, namely row count, CPU, and I/O usage. The following methods of collecting execution plan information for a **target session** use the standard profiling infrastructure:

- [SET STATISTICS XML](../../t-sql/statements/set-statistics-xml-transact-sql.md)
- [SET STATISTICS PROFILE](../../t-sql/statements/set-statistics-profile-transact-sql.md)
- [Live Query Statistics](live-query-statistics.md)

> **Note:**  
> Selecting the button **Include Live Query Statistics** in  SQL Server Management Studio 
 uses the standard profiling infrastructure. In later versions of  SQL Server 
, if the [lightweight profiling infrastructure](#lwp) is enabled, then it's used by live query statistics instead of standard profiling when viewed through [Activity Monitor](../performance-monitor/activity-monitor.md) or directly querying the [sys.dm_exec_query_profiles](../system-dynamic-management-objects/sys-dm-exec-query-profiles-transact-sql.md) DMV.

The following methods of collecting execution plan information globally for **all sessions** use the standard profiling infrastructure:

- The `query_post_execution_showplan` extended event. To enable Extended Events, see [Monitor System Activity Using Extended Events](../extended-events/monitor-system-activity-using-extended-events.md).
- The **Showplan XML** trace event in [SQL Trace](../sql-trace/sql-trace.md) and [SQL Server Profiler](../../tools/sql-server-profiler/sql-server-profiler.md). For more information on this trace event, see [Showplan XML Event Class](../event-classes/showplan-xml-event-class.md).

When running an extended event session that uses the `query_post_execution_showplan` event, then the [sys.dm_exec_query_profiles](../system-dynamic-management-objects/sys-dm-exec-query-profiles-transact-sql.md) DMV is also populated, which enables live query statistics for all sessions, using [Activity Monitor](../performance-monitor/activity-monitor.md) or directly querying the DMV. For more information, see [Live Query Statistics](live-query-statistics.md).

<a id="lwp"></a>

## The lightweight query execution statistics profiling infrastructure

Starting with  SQL Server 2014 (12.x)
 SP2 and  SQL Server 2016 (13.x) 
, a new *lightweight query execution statistics profiling infrastructure*, or **lightweight profiling** was introduced.

> **Note:**  
> Natively compiled stored procedures aren't supported with lightweight profiling.

### Lightweight query execution statistics profiling infrastructure v1

**Applies to**:  SQL Server 2014 (12.x)
 SP2 through  SQL Server 2016 (13.x) 
.

Starting with  SQL Server 2014 (12.x)
 SP2 and  SQL Server 2016 (13.x) 
, the performance overhead to collect information about execution plans was reduced with the introduction of lightweight profiling. Unlike standard profiling, lightweight profiling doesn't collect CPU runtime information. However, lightweight profiling still collects row count and I/O usage information.

A new `query_thread_profile` extended event was also introduced that uses lightweight profiling. This extended event exposes per-operator execution statistics allowing more insight on the performance of each node and thread. A sample session using this extended event can be configured as in the following example:

```sql
CREATE EVENT SESSION [NodePerfStats] ON SERVER
ADD EVENT sqlserver.query_thread_profile
    (
    ACTION (sqlos.scheduler_id,
            sqlserver.database_id,
            sqlserver.is_system,
            sqlserver.plan_handle,
            sqlserver.query_hash_signed,
            sqlserver.query_plan_hash_signed,
            sqlserver.server_instance_name,
            sqlserver.session_id,
            sqlserver.session_nt_username,
            sqlserver.sql_text)
    )
ADD TARGET package0.ring_buffer (SET max_memory = (25600))
WITH
(
        MAX_MEMORY = 4096 KB,
        EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
        MAX_DISPATCH_LATENCY = 30 SECONDS,
        MAX_EVENT_SIZE = 0 KB,
        MEMORY_PARTITION_MODE = NONE,
        TRACK_CAUSALITY = OFF,
        STARTUP_STATE = OFF
);
```

> **Note:**  
> For more information on the performance overhead of query profiling, see the blog post [Developers Choice: Query progress - anytime, anywhere](https://learn.microsoft.com/archive/blogs/sql_server_team/query-progress-anytime-anywhere).

When running an extended event session that uses the `query_thread_profile` event, then the [sys.dm_exec_query_profiles](../system-dynamic-management-objects/sys-dm-exec-query-profiles-transact-sql.md) DMV is also populated using lightweight profiling, which enables live query statistics for all sessions, using [Activity Monitor](../performance-monitor/activity-monitor.md) or directly querying the DMV.

### Lightweight query execution statistics profiling infrastructure v2

**Applies to**:  SQL Server 2016 (13.x) 
 SP1 through  SQL Server 2017 (14.x) 
.

 SQL Server 2016 (13.x) 
 SP1 includes a revised version of lightweight profiling with minimal overhead. Lightweight profiling can also be enabled globally using [trace flag 7412](../../t-sql/database-console-commands/dbcc-traceon-trace-flags-transact-sql.md#tf7412) for the versions stated previously in *Applies to*. A new DMF [sys.dm_exec_query_statistics_xml](../system-dynamic-management-objects/sys-dm-exec-query-statistics-xml-transact-sql.md) is introduced to return the query execution plan for in-flight requests.

Starting with  SQL Server 2016 (13.x) 
 SP2 CU3 and  SQL Server 2017 (14.x) 
 CU11, if lightweight profiling isn't enabled globally then the new [USE HINT query hint](../../t-sql/queries/hints-transact-sql-query.md#use_hint) argument `QUERY_PLAN_PROFILE` can be used to enable lightweight profiling at the query level, for any session. When a query that contains this new hint finishes, a new `query_plan_profile` extended event is also output that provides an actual execution plan XML similar to the `query_post_execution_showplan` extended event.

> **Note:**  
> The `query_plan_profile` extended event also uses lightweight profiling even if the query hint isn't used.

A sample session using the `query_plan_profile` extended event can be configured like the following example:

```sql
CREATE EVENT SESSION [PerfStats_LWP_Plan] ON SERVER
ADD EVENT sqlserver.query_plan_profile
    (
    ACTION (sqlos.scheduler_id,
            sqlserver.database_id,
            sqlserver.is_system,
            sqlserver.plan_handle,
            sqlserver.query_hash_signed,
            sqlserver.query_plan_hash_signed,
            sqlserver.server_instance_name,
            sqlserver.session_id,
            sqlserver.session_nt_username,
            sqlserver.sql_text)
    )
ADD TARGET package0.ring_buffer (SET max_memory = (25600))
WITH
(
        MAX_MEMORY = 4096 KB,
        EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
        MAX_DISPATCH_LATENCY = 30 SECONDS,
        MAX_EVENT_SIZE = 0 KB,
        MEMORY_PARTITION_MODE = NONE,
        TRACK_CAUSALITY = OFF,
        STARTUP_STATE = OFF
);
```

### Lightweight query execution statistics profiling infrastructure v3

**Applies to**:  SQL Server 2019 (15.x) 
 and later versions, and  Azure SQL Database 


 SQL Server 2019 (15.x) 
 and  Azure SQL Database 
 include a newly revised version of lightweight profiling collecting row count information for all executions. Lightweight profiling is enabled by default on  SQL Server 2019 (15.x) 
 and  Azure SQL Database 
. In  SQL Server 2019 (15.x) 
 and later versions, trace flag 7412 has no effect. Lightweight profiling can be disabled at the database level using the `LIGHTWEIGHT_QUERY_PROFILING` [database scoped configuration](../../t-sql/statements/alter-database-scoped-configuration-transact-sql.md): `ALTER DATABASE SCOPED CONFIGURATION SET LIGHTWEIGHT_QUERY_PROFILING = OFF;`.

A new DMF [sys.dm_exec_query_plan_stats](../system-dynamic-management-objects/sys-dm-exec-query-plan-stats-transact-sql.md) is introduced to return the equivalent of the last known actual execution plan for most queries, and is called *last query plan statistics*. The last query plan statistics can be enabled at the database level using the `LAST_QUERY_PLAN_STATS` [database scoped configuration](../../t-sql/statements/alter-database-scoped-configuration-transact-sql.md): `ALTER DATABASE SCOPED CONFIGURATION SET LAST_QUERY_PLAN_STATS = ON;`.

A new `query_post_execution_plan_profile` extended event collects the equivalent of an actual execution plan based on lightweight profiling, unlike `query_post_execution_showplan`, which uses standard profiling.  SQL Server 2017 (14.x) 
 also offers this event starting with CU14. A sample session using the `query_post_execution_plan_profile` extended event can be configured like the following example:

```sql
CREATE EVENT SESSION [PerfStats_LWP_All_Plans] ON SERVER
ADD EVENT sqlserver.query_post_execution_plan_profile
    (
    ACTION (sqlos.scheduler_id,
            sqlserver.database_id,
            sqlserver.is_system,
            sqlserver.plan_handle,
            sqlserver.query_hash_signed,
            sqlserver.query_plan_hash_signed,
            sqlserver.server_instance_name,
            sqlserver.session_id,
            sqlserver.session_nt_username,
            sqlserver.sql_text)
    )
ADD TARGET package0.ring_buffer (SET max_memory = (25600))
WITH
(
        MAX_MEMORY = 4096 KB,
        EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
        MAX_DISPATCH_LATENCY = 30 SECONDS,
        MAX_EVENT_SIZE = 0 KB,
        MEMORY_PARTITION_MODE = NONE,
        TRACK_CAUSALITY = OFF,
        STARTUP_STATE = OFF
);
```

#### Example 1 - Extended Event session using standard profiling

```sql
CREATE EVENT SESSION [QueryPlanOld] ON SERVER
ADD EVENT sqlserver.query_post_execution_showplan
    (
    ACTION (sqlos.task_time,
            sqlserver.database_id,
            sqlserver.database_name,
            sqlserver.query_hash_signed,
            sqlserver.query_plan_hash_signed,
            sqlserver.sql_text)
    )
ADD TARGET package0.event_file
    (
    SET filename = N'C:\Temp\QueryPlanStd.xel'
    )
WITH
(
        MAX_MEMORY = 4096 KB,
        EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
        MAX_DISPATCH_LATENCY = 30 SECONDS,
        MAX_EVENT_SIZE = 0 KB,
        MEMORY_PARTITION_MODE = NONE,
        TRACK_CAUSALITY = OFF,
        STARTUP_STATE = OFF
);
```

#### Example 2 - Extended Event session using lightweight profiling

```sql
CREATE EVENT SESSION [QueryPlanLWP] ON SERVER
ADD EVENT sqlserver.query_post_execution_plan_profile
    (
    ACTION (sqlos.task_time,
            sqlserver.database_id,
            sqlserver.database_name,
            sqlserver.query_hash_signed,
            sqlserver.query_plan_hash_signed,
            sqlserver.sql_text)
    )
ADD TARGET package0.event_file
    (
    SET filename = N'C:\Temp\QueryPlanLWP.xel'
    )
WITH
(
        MAX_MEMORY = 4096 KB,
        EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
        MAX_DISPATCH_LATENCY = 30 SECONDS,
        MAX_EVENT_SIZE = 0 KB,
        MEMORY_PARTITION_MODE = NONE,
        TRACK_CAUSALITY = OFF,
        STARTUP_STATE = OFF
);
```

## Query Profiling Infrastructure usage guidance

The following table summarizes the actions to enable either standard profiling or lightweight profiling, both globally (at the server level) or in a single session. Also includes the earliest version for which the action is available.

| Scope | Standard Profiling | Lightweight Profiling |
| --- | --- | --- |
| Global | Extended Event session with the `query_post_execution_showplan` XE; Starting with  SQL Server 2012 (11.x) |
 | Trace flag 7412; Starting with  SQL Server 2016 (13.x) |
 | SP1 |
| Global | SQL Trace and SQL Server Profiler with the `Showplan XML` trace event | Extended Event session with the `query_thread_profile` XE; Starting with  SQL Server 2014 (12.x) |
 | SP2 |
| Global | N/A | Extended Event session with the `query_post_execution_plan_profile` XE; Starting with  SQL Server 2017 (14.x) |
 | CU14 and  SQL Server 2019 (15.x) |
 |  |
| Session | Use `SET STATISTICS XML ON` | Use the `QUERY_PLAN_PROFILE` query hint together with an Extended Event session with the `query_plan_profile` XE; Starting with  SQL Server 2016 (13.x) |
 | SP2 CU3 and  SQL Server 2017 (14.x) |
 | CU11 |
| Session | Use `SET STATISTICS PROFILE ON` | N/A |
| Session | Select the [Live Query Statistics](live-query-statistics.md) button in SSMS; Starting with  SQL Server 2014 (12.x) |
 | SP2 | N/A |

## Remarks

> **Important:**  
> Due to a possible random access violation while executing a monitoring stored procedure that references [sys.dm_exec_query_statistics_xml](../system-dynamic-management-objects/sys-dm-exec-query-statistics-xml-transact-sql.md), ensure [KB 4078596](https://support.microsoft.com/help/4078596) is installed in  SQL Server 2016 (13.x) 
 and  SQL Server 2017 (14.x) 
.

Starting with lightweight profiling v2 and its low overhead, any server that isn't already CPU bound can run lightweight profiling **continuously**, and allow database professionals to tap into any running execution at any time, for example using Activity Monitor or directly querying `sys.dm_exec_query_profiles`, and get the query plan with runtime statistics.

For more information on the performance overhead of query profiling, see the blog post [Developers Choice: Query progress - anytime, anywhere](https://techcommunity.microsoft.com/blog/sqlserver/developers-choice-query-progress---anytime-anywhere/385004).

Extended Events that use lightweight profiling use information from standard profiling, in case the standard profiling infrastructure is already enabled. For example, an extended event session using `query_post_execution_showplan` is running, and another session using `query_post_execution_plan_profile` is started. The second session still uses information from standard profiling.

> **Note:**  
> On  SQL Server 2017 (14.x) 
, Lightweight Profiling is off by default but is activated when an Extended Event trace relying on `query_post_execution_plan_profile` is started, and is then deactivated again when the trace is stopped. As a consequence, if Extended Event traces based on `query_post_execution_plan_profile` are frequently started and stopped on a  SQL Server 2017 (14.x) 
 instance, you should activate Lightweight Profiling at global level with trace flag 7412 to avoid the repeated activation/deactivation overhead.

## Related content

- [Monitor and Tune for Performance](monitor-and-tune-for-performance.md)
- [Performance monitoring and tuning tools](performance-monitoring-and-tuning-tools.md)
- [Open Activity Monitor in SQL Server Management Studio (SSMS)](../performance-monitor/open-activity-monitor-sql-server-management-studio.md)
- [Activity Monitor](../performance-monitor/activity-monitor.md)
- [Monitor performance by using the Query Store](monitoring-performance-by-using-the-query-store.md)
- [Monitor System Activity Using Extended Events](../extended-events/monitor-system-activity-using-extended-events.md)
- [sys.dm_exec_query_statistics_xml (Transact-SQL)](../system-dynamic-management-objects/sys-dm-exec-query-statistics-xml-transact-sql.md)
- [sys.dm_exec_query_profiles (Transact-SQL)](../system-dynamic-management-objects/sys-dm-exec-query-profiles-transact-sql.md)
- [Set trace flags with DBCC TRACEON (Transact-SQL)](../../t-sql/database-console-commands/dbcc-traceon-trace-flags-transact-sql.md)
- [Logical and physical showplan operator reference](../showplan-logical-and-physical-operators-reference.md)
- [Display an actual execution plan](display-an-actual-execution-plan.md)
- [Live query statistics](live-query-statistics.md)
