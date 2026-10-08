---
title: "CREATE WORKLOAD GROUP (Transact-SQL)"
description: CREATE WORKLOAD GROUP (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: 05/04/2021
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "WORKLOAD GROUP"
  - "WORKLOAD_GROUP_TSQL"
  - "CREATE WORKLOAD GROUP"
  - "CREATE_WORKLOAD_GROUP_TSQL"
helpviewer_keywords:
  - "CREATE WORKLOAD GROUP statement"
dev_langs:
  - "TSQL"
monikerRange: ">=sql-server-2017 || >=sql-server-linux-2017 || =azure-sqldw-latest || =azuresqldb-mi-current"
---
# CREATE WORKLOAD GROUP (Transact-SQL)

## Select a product

In the following row, select the product name you're interested in, and only that product's information is displayed.


**Applies to: \>=sql-server-2017 || >=sql-server-linux-2017**



        **_\* SQL Server \*_** &nbsp;


        [SQL Managed Instance](create-workload-group-transact-sql.md?view=azuresqldb-mi-current&preserve-view=true)


        [Azure Synapse<br />Analytics](create-workload-group-transact-sql.md?view=azure-sqldw-latest&preserve-view=true)



&nbsp;

## SQL Server and SQL Managed Instance


Creates a resource governor workload group and associates the workload group with a resource governor resource pool.

Resource governor isn't available in every edition of  SQL Server 
. For a list of features supported by the editions in  SQL Server 
, see [Editions and supported features of SQL Server 2025](../../sql-server/editions-and-components-of-sql-server-2025.md).

> **Note:**
> To modify resource governor configuration in Azure SQL Managed Instance, you must be in the context of the `master` database on the primary replica.



## Syntax

```syntaxsql
CREATE WORKLOAD GROUP group_name
[ WITH
    ( [ IMPORTANCE = { LOW | MEDIUM | HIGH } ]
      [ [ , ] REQUEST_MAX_MEMORY_GRANT_PERCENT = value ]
      [ [ , ] REQUEST_MAX_CPU_TIME_SEC = value ]
      [ [ , ] REQUEST_MEMORY_GRANT_TIMEOUT_SEC = value ]
      [ [ , ] MAX_DOP = value ]
      [ [ , ] GROUP_MAX_REQUESTS = value ]
      [ [ , ] GROUP_MAX_TEMPDB_DATA_MB = value ]
      [ [ , ] GROUP_MAX_TEMPDB_DATA_PERCENT = value ] )
]
[ USING {
    [ pool_name | [default] ]
    [ [ , ] EXTERNAL external_pool_name | [ default ] ]
    } ]
[ ; ]
```

## Arguments

#### *group_name*

The user-defined name for the workload group. *group_name* is alphanumeric, can be up to 128 characters, must be unique within an instance of the  Database Engine 
, and must comply with the rules for [Database identifiers](../../relational-databases/databases/database-identifiers.md).

#### IMPORTANCE = { LOW | MEDIUM | HIGH }

Specifies the relative importance of a request in the workload group. The default value is `MEDIUM`.

`IMPORTANCE` is local to the resource pool that contains the workload group. Workload groups of different importance inside the same resource pool affect each other, but don't affect workload groups in other resource pools.

#### REQUEST_MAX_MEMORY_GRANT_PERCENT = *value*

Specifies the maximum amount of query workspace memory that a single request can take from the pool. *value* is a percentage of the resource pool size defined by `MAX_MEMORY_PERCENT`. Default value is 25.

In  SQL Server 2017 (14.x) 
 and older, *value* is an integer and the allowed range is from 1 through 100.

Starting with  SQL Server 2019 (15.x) 
, the value can be fractional using the `float` data type. The allowed range is from 0 through 100.

> **Important:**
> The amount specified only refers to query workspace memory obtained via query memory grants.
>
> It is not recommended to set *value* too large (for example, greater than 70) because the server may be unable to set aside enough free memory for other concurrent queries. This can lead to a memory grant time out [error 8645](../../relational-databases/errors-events/mssqlserver-8645-database-engine-error.md).
>
> Setting *value* to 0 or a small value might prevent queries with operators that require workspace memory, such as `sort` and `hash`, from running in user-defined workload groups. If the query memory requirements exceed the limit defined by this parameter, the following behavior occurs:
>
> - For user-defined workload groups, the server tries to reduce the degree of parallelism (DOP) of the request (query) until the memory requirement falls under the limit, or until DOP equals 1. If the query memory requirement is still greater than the limit, error 8657 occurs and the query fails.
> - For the `internal` and `default` workload groups, the server permits the query to obtain the required memory.
>
> In either case, [error 8645](../../relational-databases/errors-events/mssqlserver-8645-database-engine-error.md) might occur if the server has insufficient physical memory.

#### REQUEST_MAX_CPU_TIME_SEC = *value*

Specifies the maximum amount of CPU time, in seconds, that a batch request can use. *value* must be 0 or a positive integer. The default setting for *value* is 0, which means unlimited.

When the maximum CPU time is exceeded, the `cpu_threshold_exceeded` extended event and a trace event are generated. For more information, see [CPU threshold exceeded event class](../../relational-databases/event-classes/cpu-threshold-exceeded-event-class.md).

In Azure SQL Managed Instance, when the maximum CPU time is exceeded, resource governor aborts the request with error 10961.

In  SQL Server 
, resource governor doesn't abort the request by default. However, starting with  SQL Server 2016 (13.x) 
 SP2 and  SQL Server 2017 (14.x) 
 CU3, resource governor aborts a request with error 10961 when [trace flag 2422](../database-console-commands/dbcc-traceon-trace-flags-transact-sql.md#tf2422) is enabled and the maximum CPU time is exceeded.

> **Note:**
> The detection interval for CPU time usage is five seconds. An event is generated if a query exceeds the specified limit by at least five seconds. However, if a query exceeds the specified threshold by less than five seconds, its detection might be missed depending on the timing of the query and the time of last detection sweep.

#### REQUEST_MEMORY_GRANT_TIMEOUT_SEC = *value*

Specifies the maximum time, in seconds, that a query can wait for a memory grant from the query workspace memory to become available. *value* must be 0 or a positive integer. The default setting for *value*, 0, uses an internal calculation based on query cost to determine the maximum time.

A query doesn't always fail when a memory grant time out is reached. A query only fails if there are too many concurrent queries running. Otherwise, the query might only get the minimum memory grant, resulting in reduced query performance.

#### MAX_DOP = *value*

Specifies the maximum degree of parallelism (`MAXDOP`) for parallel query execution. The allowed range for *value* is from 0 through 64. The default setting for *value*, 0, uses the global setting.

For more information, see [MAXDOP](#maxdop).

#### GROUP_MAX_REQUESTS = *value*

Specifies the maximum number of simultaneous requests that are allowed to execute in the workload group. *value* must be 0 or a positive integer. The default setting for *value* is 0, and allows unlimited requests. When the maximum concurrent requests are reached, a session in that group can be created, but is placed in a wait state until the number of concurrent requests drops below the value specified.

#### GROUP_MAX_TEMPDB_DATA_MB = *value*

Specifies the maximum amount of space that a workload group can consume in the `tempdb` data files, in megabytes. *value* must be 0, a positive number, or NULL. Fractional values are allowed.

When the value is 0, `tempdb` space allocations by sessions in the workload group are not allowed. When a value isn't set, resource governor doesn't limit `tempdb` space consumption by the workload group.

The limit is for the total space consumed in `tempdb` by all sessions in a workload group.

When a request running in a workload group attempts to increase `tempdb` data space consumption by the workload group above the limit set by `GROUP_MAX_TEMPDB_DATA_MB`, resource governor aborts the request with error 1138. For more information, see [Tempdb space resource governance](../../relational-databases/resource-governor/tempdb-space-resource-governance.md).

#### GROUP_MAX_TEMPDB_DATA_PERCENT = *value*

Specifies the maximum amount of space that a workload group can consume in the `tempdb` data files, in percent of the maximum `tempdb` size. For the definition of the maximum `tempdb` size, see [Percent limit configuration](../../relational-databases/resource-governor/tempdb-space-resource-governance.md#percent-limit-configuration). *value* must be in the range from 0 to 100, or NULL. Fractional values are allowed.

When the value is 0, `tempdb` space allocations by sessions in the workload group are not allowed. When a value isn't set, resource governor doesn't limit `tempdb` space consumption by the workload group. When `GROUP_MAX_TEMPDB_DATA_MB` is set, or when `tempdb` maximum size isn't defined, `GROUP_MAX_TEMPDB_DATA_PERCENT` has no effect.

The limit is for the total space consumed in `tempdb` by all sessions in a workload group.

When a request running in a workload group attempts to increase `tempdb` data space consumption by the workload group above the limit set by `GROUP_MAX_TEMPDB_DATA_PERCENT`, resource governor aborts the request with error 1138. For more information, see [Tempdb space resource governance](../../relational-databases/resource-governor/tempdb-space-resource-governance.md).

#### USING { *pool_name* | [default] }

Associates the workload group with the user-defined resource pool identified by *pool_name*, or with the `default` resource pool. If *pool_name* isn't provided, or if the `USING` argument isn't specified, the workload group is associated with the built-in `default` pool.

`default` is a reserved word and when specified in `USING`, must be enclosed in brackets (`[]`) or quotation marks (`""`).

Built-in resource pools and workload groups use all lowercase names, such as `default`. Use the lower case `default` on servers that use a case-sensitive collation. Servers with case-insensitive collation treat `default`, `Default`, and `DEFAULT` as the same value.

#### EXTERNAL external_pool_name | [ default ]

**Applies to**:  SQL Server 2016 (13.x) 
 and later.

Workload group can specify an external resource pool. You can define a workload group and associate it with two pools:

- A resource pool for the  Database Engine 
 workloads.
- An external resource pool for external processes. For more information, see [sp_execute_external_script](../../relational-databases/system-stored-procedures/sp-execute-external-script-transact-sql.md).

## Remarks

For more information, see [Resource governor](../../relational-databases/resource-governor/resource-governor.md) and [Resource governor workload group](../../relational-databases/resource-governor/resource-governor-workload-group.md).

### MAXDOP

For a given query, effective `MAXDOP` is determined as follows:

- `MAXDOP` as a query hint is honored as long as it doesn't exceed the workload group `MAX_DOP` setting.
- `MAXDOP` as a query hint always overrides the `max degree of parallelism` server configuration. For more information, see [Server configuration: max degree of parallelism](../../database-engine/configure-windows/configure-the-max-degree-of-parallelism-server-configuration-option.md).
- Workload group `MAX_DOP` overrides the `max degree of parallelism` server configuration and the `MAXDOP` [database scoped configuration](alter-database-scoped-configuration-transact-sql.md).

The `MAXDOP` limit is set per [task](../../relational-databases/system-dynamic-management-objects/sys-dm-os-tasks-transact-sql.md). It isn't a per [request](../../relational-databases/system-dynamic-management-objects/sys-dm-exec-requests-transact-sql.md) or per query limit. During an execution of a parallel query, a single request can spawn multiple tasks that are assigned to a [scheduler](../../relational-databases/system-dynamic-management-objects/sys-dm-os-tasks-transact-sql.md). For more information, see the [Thread and task architecture guide](../../relational-databases/thread-and-task-architecture-guide.md).

When a query is marked as serial at compile time (`MAXDOP = 1`), it can't execute with parallelism at run time regardless of the workload group or server configuration setting. After `MAXDOP` is determined for a query, it can only be lowered due to memory pressure. Workload group reconfiguration does not affect queries waiting in the memory grant queue.

### Index creation

For performance reasons, index creation is allowed to use more memory workspace than initially granted. Resource governor supports this special handling. However, the initial grant and any additional memory grants are limited by the workload group and resource pool settings.

The memory consumed to create a nonaligned index on a partitioned table is proportional to the number of partitions involved. If the total required memory exceeds the per-query limit enforced by the `REQUEST_MAX_MEMORY_GRANT_PERCENT` workload group setting, index creation might fail. Because the `default` workload group allows a query to exceed the per-query limit with the minimum required memory to start for backward compatibility, you might be able to create the same index using the `default` workload group if the `default` resource pool has enough total memory.

## Permissions

Requires the `CONTROL SERVER` permission.

## Examples

Creates a workload group named `newReports` in the `default` resource pool, and limits the maximum memory grant, the maximum CPU time for a request, and `MAXDOP`.

```sql
CREATE WORKLOAD GROUP newReports
WITH (
     REQUEST_MAX_MEMORY_GRANT_PERCENT = 2.5,
     REQUEST_MAX_CPU_TIME_SEC = 100,
     MAX_DOP = 4
     )
USING [default];
```

## Related content

- [Tutorial: Resource governor configuration examples and best practices](../../relational-databases/resource-governor/resource-governor-walkthrough.md)
- [Resource governor](../../relational-databases/resource-governor/resource-governor.md)
- [Resource governor workload group](../../relational-databases/resource-governor/resource-governor-workload-group.md)
- [Create a workload group](../../relational-databases/resource-governor/create-a-workload-group.md)
- [ALTER WORKLOAD GROUP (Transact-SQL)](alter-workload-group-transact-sql.md)
- [DROP WORKLOAD GROUP (Transact-SQL)](drop-workload-group-transact-sql.md)
- [CREATE RESOURCE POOL (Transact-SQL)](create-resource-pool-transact-sql.md)
- [ALTER RESOURCE POOL (Transact-SQL)](alter-resource-pool-transact-sql.md)
- [DROP RESOURCE POOL (Transact-SQL)](drop-resource-pool-transact-sql.md)
- [ALTER RESOURCE GOVERNOR (Transact-SQL)](alter-resource-governor-transact-sql.md)
- [sys.resource_governor_workload_groups (Transact-SQL)](../../relational-databases/system-catalog-views/sys-resource-governor-workload-groups-transact-sql.md)
- [sys.dm_resource_governor_workload_groups (Transact-SQL)](../../relational-databases/system-dynamic-management-objects/sys-dm-resource-governor-workload-groups-transact-sql.md)




**Applies to: \=azuresqldb-mi-current**



        [SQL Server](create-workload-group-transact-sql.md?view=sql-server-ver15&preserve-view=true)


        **_\* SQL Managed Instance \*_** &nbsp;


        [Azure Synapse<br />Analytics](create-workload-group-transact-sql.md?view=azure-sqldw-latest&preserve-view=true)



&nbsp;

## SQL Server and SQL Managed Instance


Creates a resource governor workload group and associates the workload group with a resource governor resource pool.

Resource governor isn't available in every edition of  SQL Server 
. For a list of features supported by the editions in  SQL Server 
, see [Editions and supported features of SQL Server 2025](../../sql-server/editions-and-components-of-sql-server-2025.md).

> **Note:**
> To modify resource governor configuration in Azure SQL Managed Instance, you must be in the context of the `master` database on the primary replica.



## Syntax

```syntaxsql
CREATE WORKLOAD GROUP group_name
[ WITH
    ( [ IMPORTANCE = { LOW | MEDIUM | HIGH } ]
      [ [ , ] REQUEST_MAX_MEMORY_GRANT_PERCENT = value ]
      [ [ , ] REQUEST_MAX_CPU_TIME_SEC = value ]
      [ [ , ] REQUEST_MEMORY_GRANT_TIMEOUT_SEC = value ]
      [ [ , ] MAX_DOP = value ]
      [ [ , ] GROUP_MAX_REQUESTS = value ]
      [ [ , ] GROUP_MAX_TEMPDB_DATA_MB = value ]
      [ [ , ] GROUP_MAX_TEMPDB_DATA_PERCENT = value ] )
]
[ USING {
    [ pool_name | [default] ]
    [ [ , ] EXTERNAL external_pool_name | [ default ] ]
    } ]
[ ; ]
```

## Arguments

#### *group_name*

The user-defined name for the workload group. *group_name* is alphanumeric, can be up to 128 characters, must be unique within an instance of the  Database Engine 
, and must comply with the rules for [Database identifiers](../../relational-databases/databases/database-identifiers.md).

#### IMPORTANCE = { LOW | MEDIUM | HIGH }

Specifies the relative importance of a request in the workload group. The default value is `MEDIUM`.

`IMPORTANCE` is local to the resource pool that contains the workload group. Workload groups of different importance inside the same resource pool affect each other, but don't affect workload groups in other resource pools.

#### REQUEST_MAX_MEMORY_GRANT_PERCENT = *value*

Specifies the maximum amount of query workspace memory that a single request can take from the pool. *value* is a percentage of the resource pool size defined by `MAX_MEMORY_PERCENT`. Default value is 25.

In  SQL Server 2017 (14.x) 
 and older, *value* is an integer and the allowed range is from 1 through 100.

Starting with  SQL Server 2019 (15.x) 
, the value can be fractional using the `float` data type. The allowed range is from 0 through 100.

> **Important:**
> The amount specified only refers to query workspace memory obtained via query memory grants.
>
> It is not recommended to set *value* too large (for example, greater than 70) because the server may be unable to set aside enough free memory for other concurrent queries. This can lead to a memory grant time out [error 8645](../../relational-databases/errors-events/mssqlserver-8645-database-engine-error.md).
>
> Setting *value* to 0 or a small value might prevent queries with operators that require workspace memory, such as `sort` and `hash`, from running in user-defined workload groups. If the query memory requirements exceed the limit defined by this parameter, the following behavior occurs:
>
> - For user-defined workload groups, the server tries to reduce the degree of parallelism (DOP) of the request (query) until the memory requirement falls under the limit, or until DOP equals 1. If the query memory requirement is still greater than the limit, error 8657 occurs and the query fails.
> - For the `internal` and `default` workload groups, the server permits the query to obtain the required memory.
>
> In either case, [error 8645](../../relational-databases/errors-events/mssqlserver-8645-database-engine-error.md) might occur if the server has insufficient physical memory.

#### REQUEST_MAX_CPU_TIME_SEC = *value*

Specifies the maximum amount of CPU time, in seconds, that a batch request can use. *value* must be 0 or a positive integer. The default setting for *value* is 0, which means unlimited.

When the maximum CPU time is exceeded, the `cpu_threshold_exceeded` extended event and a trace event are generated. For more information, see [CPU threshold exceeded event class](../../relational-databases/event-classes/cpu-threshold-exceeded-event-class.md).

In Azure SQL Managed Instance, when the maximum CPU time is exceeded, resource governor aborts the request with error 10961.

In  SQL Server 
, resource governor doesn't abort the request by default. However, starting with  SQL Server 2016 (13.x) 
 SP2 and  SQL Server 2017 (14.x) 
 CU3, resource governor aborts a request with error 10961 when [trace flag 2422](../database-console-commands/dbcc-traceon-trace-flags-transact-sql.md#tf2422) is enabled and the maximum CPU time is exceeded.

> **Note:**
> The detection interval for CPU time usage is five seconds. An event is generated if a query exceeds the specified limit by at least five seconds. However, if a query exceeds the specified threshold by less than five seconds, its detection might be missed depending on the timing of the query and the time of last detection sweep.

#### REQUEST_MEMORY_GRANT_TIMEOUT_SEC = *value*

Specifies the maximum time, in seconds, that a query can wait for a memory grant from the query workspace memory to become available. *value* must be 0 or a positive integer. The default setting for *value*, 0, uses an internal calculation based on query cost to determine the maximum time.

A query doesn't always fail when a memory grant time out is reached. A query only fails if there are too many concurrent queries running. Otherwise, the query might only get the minimum memory grant, resulting in reduced query performance.

#### MAX_DOP = *value*

Specifies the maximum degree of parallelism (`MAXDOP`) for parallel query execution. The allowed range for *value* is from 0 through 64. The default setting for *value*, 0, uses the global setting.

For more information, see [MAXDOP](#maxdop).

#### GROUP_MAX_REQUESTS = *value*

Specifies the maximum number of simultaneous requests that are allowed to execute in the workload group. *value* must be 0 or a positive integer. The default setting for *value* is 0, and allows unlimited requests. When the maximum concurrent requests are reached, a session in that group can be created, but is placed in a wait state until the number of concurrent requests drops below the value specified.

#### GROUP_MAX_TEMPDB_DATA_MB = *value*

Specifies the maximum amount of space that a workload group can consume in the `tempdb` data files, in megabytes. *value* must be 0, a positive number, or NULL. Fractional values are allowed.

When the value is 0, `tempdb` space allocations by sessions in the workload group are not allowed. When a value isn't set, resource governor doesn't limit `tempdb` space consumption by the workload group.

The limit is for the total space consumed in `tempdb` by all sessions in a workload group.

When a request running in a workload group attempts to increase `tempdb` data space consumption by the workload group above the limit set by `GROUP_MAX_TEMPDB_DATA_MB`, resource governor aborts the request with error 1138. For more information, see [Tempdb space resource governance](../../relational-databases/resource-governor/tempdb-space-resource-governance.md).

#### GROUP_MAX_TEMPDB_DATA_PERCENT = *value*

Specifies the maximum amount of space that a workload group can consume in the `tempdb` data files, in percent of the maximum `tempdb` size. For the definition of the maximum `tempdb` size, see [Percent limit configuration](../../relational-databases/resource-governor/tempdb-space-resource-governance.md#percent-limit-configuration). *value* must be in the range from 0 to 100, or NULL. Fractional values are allowed.

When the value is 0, `tempdb` space allocations by sessions in the workload group are not allowed. When a value isn't set, resource governor doesn't limit `tempdb` space consumption by the workload group. When `GROUP_MAX_TEMPDB_DATA_MB` is set, or when `tempdb` maximum size isn't defined, `GROUP_MAX_TEMPDB_DATA_PERCENT` has no effect.

The limit is for the total space consumed in `tempdb` by all sessions in a workload group.

When a request running in a workload group attempts to increase `tempdb` data space consumption by the workload group above the limit set by `GROUP_MAX_TEMPDB_DATA_PERCENT`, resource governor aborts the request with error 1138. For more information, see [Tempdb space resource governance](../../relational-databases/resource-governor/tempdb-space-resource-governance.md).

#### USING { *pool_name* | [default] }

Associates the workload group with the user-defined resource pool identified by *pool_name*, or with the `default` resource pool. If *pool_name* isn't provided, or if the `USING` argument isn't specified, the workload group is associated with the built-in `default` pool.

`default` is a reserved word and when specified in `USING`, must be enclosed in brackets (`[]`) or quotation marks (`""`).

Built-in resource pools and workload groups use all lowercase names, such as `default`. Use the lower case `default` on servers that use a case-sensitive collation. Servers with case-insensitive collation treat `default`, `Default`, and `DEFAULT` as the same value.

#### EXTERNAL external_pool_name | [ default ]

**Applies to**:  SQL Server 2016 (13.x) 
 and later.

Workload group can specify an external resource pool. You can define a workload group and associate it with two pools:

- A resource pool for the  Database Engine 
 workloads.
- An external resource pool for external processes. For more information, see [sp_execute_external_script](../../relational-databases/system-stored-procedures/sp-execute-external-script-transact-sql.md).

## Remarks

For more information, see [Resource governor](../../relational-databases/resource-governor/resource-governor.md) and [Resource governor workload group](../../relational-databases/resource-governor/resource-governor-workload-group.md).

### MAXDOP

For a given query, effective `MAXDOP` is determined as follows:

- `MAXDOP` as a query hint is honored as long as it doesn't exceed the workload group `MAX_DOP` setting.
- `MAXDOP` as a query hint always overrides the `max degree of parallelism` server configuration. For more information, see [Server configuration: max degree of parallelism](../../database-engine/configure-windows/configure-the-max-degree-of-parallelism-server-configuration-option.md).
- Workload group `MAX_DOP` overrides the `max degree of parallelism` server configuration and the `MAXDOP` [database scoped configuration](alter-database-scoped-configuration-transact-sql.md).

The `MAXDOP` limit is set per [task](../../relational-databases/system-dynamic-management-objects/sys-dm-os-tasks-transact-sql.md). It isn't a per [request](../../relational-databases/system-dynamic-management-objects/sys-dm-exec-requests-transact-sql.md) or per query limit. During an execution of a parallel query, a single request can spawn multiple tasks that are assigned to a [scheduler](../../relational-databases/system-dynamic-management-objects/sys-dm-os-tasks-transact-sql.md). For more information, see the [Thread and task architecture guide](../../relational-databases/thread-and-task-architecture-guide.md).

When a query is marked as serial at compile time (`MAXDOP = 1`), it can't execute with parallelism at run time regardless of the workload group or server configuration setting. After `MAXDOP` is determined for a query, it can only be lowered due to memory pressure. Workload group reconfiguration does not affect queries waiting in the memory grant queue.

### Index creation

For performance reasons, index creation is allowed to use more memory workspace than initially granted. Resource governor supports this special handling. However, the initial grant and any additional memory grants are limited by the workload group and resource pool settings.

The memory consumed to create a nonaligned index on a partitioned table is proportional to the number of partitions involved. If the total required memory exceeds the per-query limit enforced by the `REQUEST_MAX_MEMORY_GRANT_PERCENT` workload group setting, index creation might fail. Because the `default` workload group allows a query to exceed the per-query limit with the minimum required memory to start for backward compatibility, you might be able to create the same index using the `default` workload group if the `default` resource pool has enough total memory.

## Permissions

Requires the `CONTROL SERVER` permission.

## Examples

Creates a workload group named `newReports` in the `default` resource pool, and limits the maximum memory grant, the maximum CPU time for a request, and `MAXDOP`.

```sql
CREATE WORKLOAD GROUP newReports
WITH (
     REQUEST_MAX_MEMORY_GRANT_PERCENT = 2.5,
     REQUEST_MAX_CPU_TIME_SEC = 100,
     MAX_DOP = 4
     )
USING [default];
```

## Related content

- [Tutorial: Resource governor configuration examples and best practices](../../relational-databases/resource-governor/resource-governor-walkthrough.md)
- [Resource governor](../../relational-databases/resource-governor/resource-governor.md)
- [Resource governor workload group](../../relational-databases/resource-governor/resource-governor-workload-group.md)
- [Create a workload group](../../relational-databases/resource-governor/create-a-workload-group.md)
- [ALTER WORKLOAD GROUP (Transact-SQL)](alter-workload-group-transact-sql.md)
- [DROP WORKLOAD GROUP (Transact-SQL)](drop-workload-group-transact-sql.md)
- [CREATE RESOURCE POOL (Transact-SQL)](create-resource-pool-transact-sql.md)
- [ALTER RESOURCE POOL (Transact-SQL)](alter-resource-pool-transact-sql.md)
- [DROP RESOURCE POOL (Transact-SQL)](drop-resource-pool-transact-sql.md)
- [ALTER RESOURCE GOVERNOR (Transact-SQL)](alter-resource-governor-transact-sql.md)
- [sys.resource_governor_workload_groups (Transact-SQL)](../../relational-databases/system-catalog-views/sys-resource-governor-workload-groups-transact-sql.md)
- [sys.dm_resource_governor_workload_groups (Transact-SQL)](../../relational-databases/system-dynamic-management-objects/sys-dm-resource-governor-workload-groups-transact-sql.md)




**Applies to: \=azure-sqldw-latest**



        [SQL Server](create-workload-group-transact-sql.md?view=sql-server-ver15&preserve-view=true)


        [SQL Managed Instance](create-workload-group-transact-sql.md?view=azuresqldb-mi-current&preserve-view=true)


        **_\* Azure Synapse<br />Analytics \*_** &nbsp;



&nbsp;

## Azure Synapse Analytics

> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).

Creates a workload group. Workload groups are containers for a set of requests and are the basis for how workload management is configured on a system. Workload groups provide the ability to reserve resources for workload isolation, contain resources, define resources per request, and adhere to execution rules. Once the statement completes, the settings are in effect.



```syntaxsql
CREATE WORKLOAD GROUP group_name
 WITH
 (   MIN_PERCENTAGE_RESOURCE = value 
   , CAP_PERCENTAGE_RESOURCE = value 
   , REQUEST_MIN_RESOURCE_GRANT_PERCENT = value
  [ [ , ] REQUEST_MAX_RESOURCE_GRANT_PERCENT = value ]
  [ [ , ] IMPORTANCE = { LOW | BELOW_NORMAL | NORMAL | ABOVE_NORMAL | HIGH } ]
  [ [ , ] QUERY_EXECUTION_TIMEOUT_SEC = value ] )
  [ ; ]

```

*group_name*</br>
Specifies the name by which the workload group is identified. *group_name* is a sysname. It can be up to 128 characters long and must be unique within the instance.

*MIN_PERCENTAGE_RESOURCE* = value</br>
Specifies a guaranteed minimum resource allocation for this workload group that is not shared with other workload groups. Memory is the only resource governed by this parameter.  *value* is an integer range from 0 to 100. The sum of min_percentage_resource across all workload groups cannot exceed 100. The value for min_percentage_resource cannot be greater than cap_percentage_resource. There are minimum effective values allowed per service level. See [Effective Values](#effective-values) for more details.

*CAP_PERCENTAGE_RESOURCE* = value</br>
Specifies the maximum resource utilization for all requests in a workload group. Both CPU and memory resources are capped by this parameter. The allowed integer range for value is 1 through 100. The value for cap_percentage_resource must be greater than min_percentage_resource. The effective value for cap_percentage_resource can be reduced if min_percentage_resource is configured greater than zero in other workload groups.

*REQUEST_MIN_RESOURCE_GRANT_PERCENT* = value</br>
Sets the minimum amount of resources allocated per request. Memory is the only resource governed by this parameter. *value* is a required parameter with a decimal range between 0.75 to 100.00. The value for request_min_resource_grant_percent must be a multiple of 0.25, must be a factor of min_percentage_resource, and be less than cap_percentage_resource. There are minimum effective values allowed per service level. See [Effective Values](#effective-values) for more details.

For example:

```sql
CREATE WORKLOAD GROUP wgSample 
WITH
  ( MIN_PERCENTAGE_RESOURCE = 26                -- integer value
    , REQUEST_MIN_RESOURCE_GRANT_PERCENT = 3.25 -- factor of 26 (guaranteed a minimum of 8 concurrency)
    , CAP_PERCENTAGE_RESOURCE = 100 )
```

Consider the values that are used for resource classes as a guideline for request_min_resource_grant_percent.  The table below contains resource allocations for Gen2.

| Resource Class | Percent of Resources |
| --- | --- |
| Smallrc | 3% |
| Mediumrc | 10% |
| Largerc | 22% |
| Xlargerc | 70% |

*REQUEST_MAX_RESOURCE_GRANT_PERCENT* = value</br>         
Sets the maximum amount of resources allocated per request. Memory is the only resource governed by this parameter. *value* is an optional decimal parameter with a default value equal to the request_min_resource_grant_percent. *value* must be greater than or equal to request_min_resource_grant_percent. When the value of request_max_resource_grant_percent is greater than request_min_resource_grant_percent and system resources are available, additional resources are allocated to a request.

*IMPORTANCE* = { LOW \| BELOW_NORMAL \| NORMAL \| ABOVE_NORMAL \| HIGH }</br>        
Specifies the default importance of a request for the workload group. Importance is one of the following, with NORMAL being the default:

- LOW
- BELOW_NORMAL
- NORMAL (default)
- ABOVE_NORMAL
- HIGH

Importance set at the workload group is a default importance for all requests in the workload group. A user can also set importance at the classifier level, which can override the workload group importance setting. This allows for differentiation of importance for requests within a workload group to get access to non-reserved resources quicker. When the sum of min_percentage_resource across workload groups is less than 100, there are non-reserved resources that are assigned on a basis of importance.

*QUERY_EXECUTION_TIMEOUT_SEC* = value</br>     
Specifies the maximum time, in seconds, that a query can execute before it is canceled. *value* must be 0 or a positive integer. The default setting for value is 0, which the query never times out. QUERY_EXECUTION_TIMEOUT_SEC counts once the query is in running state, not when the query is queued.

## Remarks

Workload groups corresponding to resource classes are created automatically for backward compatibility. These system defined workload groups cannot be dropped. An additional 8 user defined workload groups can be created.

If a workload group is created with `min_percentage_resource` greater than zero, the `CREATE WORKLOAD GROUP` statement will queue until there are enough resources to create the workload group.

## Effective Values

The parameters `min_percentage_resource`, `cap_percentage_resource`, `request_min_resource_grant_percent` and `request_max_resource_grant_percent` have effective values that are adjusted in the context of the current service level and the configuration of other workload groups.

The `request_min_resource_grant_percent` parameter has an effective value because there are minimum resources needed per query depending on the service level.  For example, at the lowest service level, DW100c, a minimum 25% resources per request is needed.  If the workload group is configured with 3% `request_min_resource_grant_percent` and `request_max_resource_grant_percent`, the effective values for both parameters adjusts to 25% when the instance is started.  If the instance is scaled up to DW1000c the configured and effective values for both parameters is 3% because 3% is the minimum supported value at that service level.  If the instance is scaled higher than DW1000c, the configured and effective values for both parameters will stay at 3%.  See the below table for further details on effective values at the different service levels.

| Service Level | Lowest effective value for REQUEST_MIN_RESOURCE_GRANT_PERCENT | Maximum concurrent queries |
| --- | --- | --- |
| DW100c | 25% | 4 |
| DW200c | 12.5% | 8 |
| DW300c | 8% | 12 |
| DW400c | 6.25% | 16 |
| DW500c | 5% | 20 |
| DW1000c | 3% | 32 |
| DW1500c | 3% | 32 |
| DW2000c | 2% | 48 |
| DW2500c | 2% | 48 |
| DW3000c | 1.5% | 64 |
| DW5000c | 1.5% | 64 |
| DW6000c | 0.75% | 128 |
| DW7500c | 0.75% | 128 |
| DW10000c | 0.75% | 128 |
| DW15000c | 0.75% | 128 |
| DW30000c | 0.75% | 128 |

The `min_percentage_resource` parameter must be greater than or equal to the effective `request_min_resource_grant_percent`. A workload group with `min_percentage_resource` configured less than effective `min_percentage_resource` has the value adjusted to zero at run time. When this happens, the resources configured for `min_percentage_resource` are sharable across all workload groups. For example, the workload group `wgAdHoc` with a `min_percentage_resource` of 10% running at DW1000c would have an effective `min_percentage_resource` of 10% (3% is the minimum supported value at DW1000c). `wgAdhoc` at DW100c would have an effective min_percentage_resource of 0%. The 10% configured for `wgAdhoc` would be shared across all workload groups.

The `cap_percentage_resource` parameter also has an effective value. If a workload group `wgAdhoc` is configured with a `cap_percentage_resource` of 100% and another workload group `wgDashboards` is created with 25% `min_percentage_resource`, the effective `cap_percentage_resource` for `wgAdhoc` becomes 75%.

The easiest way to understand the run-time values for your workload groups is to query the system view [sys.dm_workload_management_workload_groups_stats](../../relational-databases/system-dynamic-management-objects/sys-dm-workload-management-workload-group-stats-transact-sql.md).

## Permissions

Requires `CONTROL DATABASE` permission

## Related content

- [DROP WORKLOAD GROUP (Transact-SQL)](drop-workload-group-transact-sql.md)
- [ALTER WORKLOAD GROUP (Transact-SQL)](alter-workload-group-transact-sql.md)
- [sys.workload_management_workload_groups (Transact-SQL)](../../relational-databases/system-catalog-views/sys-workload-management-workload-groups-transact-sql.md)
- [sys.dm_workload_management_workload_groups_stats (Transact-SQL)](../../relational-databases/system-dynamic-management-objects/sys-dm-workload-management-workload-group-stats-transact-sql.md)
- [Quickstart: Configure workload isolation using T-SQL](https://learn.microsoft.com/azure/sql-data-warehouse/quickstart-configure-workload-isolation-tsql)
