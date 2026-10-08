---
title: Performance Counters to Track Shard Map Manager
description: Learn about the ShardMapManager class and data dependent routing performance counters.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: scoriani, mathoma
ms.date: 06/13/2025
ms.service: azure-sql-database
ms.subservice: scale-out
ms.topic: how-to
ms.custom:
  - sqldbrb=1
monikerRange: "=azuresql || =azuresql-db "
---

# Create performance counters to track performance of shard map manager



  **Applies to:**    [Azure SQL Database](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

> **Important:**
> Elastic query in shard map manager mode (horizontal partitioning), using `EXTERNAL DATA SOURCE` type `SHARD_MAP_MANAGER`, is reaching end of support on March 31, 2027. After this date, existing workloads will continue to function but will no longer receive support, and creation of new external data sources of type `SHARD_MAP_MANAGER` will no longer be possible. For migration options, see [Migration guide from elastic query shard map manager mode](https://learn.microsoft.com/azure/azure-sql/database/elastic-query-horizontal-partitioning-migration).

Performance counters are used to track the performance of [data dependent routing](elastic-scale-data-dependent-routing.md) operations. These counters are accessible in the **Performance Monitor**, in the "Elastic Database: Shard Management" category.

You can capture the performance of a [shard map manager](elastic-scale-shard-map-management.md), especially when using [data dependent routing](elastic-scale-data-dependent-routing.md). Counters are created with methods of the `Microsoft.Azure.SqlDatabase.ElasticScale.Client` class.  

**For the latest version:** Go to [Microsoft.Azure.SqlDatabase.ElasticScale.Client](https://www.nuget.org/packages/Microsoft.Azure.SqlDatabase.ElasticScale.Client/). See also [Upgrade an app to use the latest elastic database client library](elastic-scale-upgrade-client-library.md).

## Prerequisites

- To create the performance category and counters, the user must be a part of the local **Administrators** group on the machine hosting the application.  
- To create a performance counter instance and update the counters, the user must be a member of either the **Administrators** or **Performance Monitor Users** group.

## Create performance category and counters

To create the counters, call the CreatePerformanceCategoryAndCounters method of the [ShardMapManagementFactory class](https://learn.microsoft.com/dotnet/api/microsoft.azure.sqldatabase.elasticscale.shardmanagement.shardmapmanagerfactory). Only an administrator can execute the method: `ShardMapManagerFactory.CreatePerformanceCategoryAndCounters()`.

The method creates the following performance counters:

- **Cached mappings**: Number of mappings cached for the shard map.
- **DDR operations/sec**: Rate of data dependent routing operations for the shard map. This counter is updated when a call to [OpenConnectionForKey()](https://learn.microsoft.com/dotnet/api/microsoft.azure.sqldatabase.elasticscale.shardmanagement.shardmap.openconnectionforkey) results in a successful connection to the destination shard.
- **Mapping lookup cache hits/sec**: Rate of successful cache lookup operations for mappings in the shard map.
- **Mapping lookup cache misses/sec**: Rate of failed cache lookup operations for mappings in the shard map.
- **Mappings added or updated in cache/sec**: Rate at which mappings are being added or updated in cache for the shard map.
- **Mappings removed from cache/sec**: Rate at which mappings are being removed from cache for the shard map.

Performance counters are created for each cached shard map per process.  

## Notes

The following events trigger the creation of the performance counters:  

- Initialization of the [ShardMapManager](https://learn.microsoft.com/dotnet/api/microsoft.azure.sqldatabase.elasticscale.shardmanagement.shardmapmanager) with [eager loading](https://learn.microsoft.com/dotnet/api/microsoft.azure.sqldatabase.elasticscale.shardmanagement.shardmapmanagerloadpolicy), if the ShardMapManager contains any shard maps. These include the [GetSqlShardMapManager](https://learn.microsoft.com/dotnet/api/microsoft.azure.sqldatabase.elasticscale.shardmanagement.shardmapmanagerfactory.getsqlshardmapmanager) and the [TryGetSqlShardMapManager](https://learn.microsoft.com/dotnet/api/microsoft.azure.sqldatabase.elasticscale.shardmanagement.shardmapmanagerfactory.trygetsqlshardmapmanager) methods.
- Successful lookup of a shard map (using [GetShardMap()](https://learn.microsoft.com/previous-versions/azure/dn824215\(v=azure.100\)), [GetListShardMap()](https://learn.microsoft.com/previous-versions/azure/dn824212\(v=azure.100\)) or [GetRangeShardMap()](https://learn.microsoft.com/previous-versions/azure/dn824173\(v=azure.100\))).
- Successful creation of shard map using `CreateShardMap()`.

The performance counters will be updated by all cache operations performed on the shard map and mappings. Successful removal of the shard map using `DeleteShardMap()` results in deletion of the performance counters instance.  

## Best practices

- Creation of the performance category and counters should be performed only once before the creation of ShardMapManager object. Every execution of the command `CreatePerformanceCategoryAndCounters()` clears the previous counters (losing data reported by all instances) and creates new ones.  
- Performance counter instances are created per process. Any application crash or removal of a shard map from the cache will result in deletion of the performance counters instances.  

## Related content
Not using elastic database tools yet? Check out our [Getting Started Guide](elastic-scale-get-started.md).  For questions, contact us on the [Microsoft Q\&A question page for SQL Database](https://learn.microsoft.com/answers/topics/azure-sql-database.html) and for feature requests, add new ideas or vote for existing ideas in the [SQL Database feedback forum](https://feedback.azure.com/d365community/forum/04fe6ee0-3b25-ec11-b6e6-000d3a4f0da0).


- [Scale out with Azure SQL Database](elastic-scale-introduction.md)
