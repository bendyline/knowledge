---
title: Query Sharded Databases
description: Run queries across shards using the elastic database client library.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: bgavrilovic, mathoma
ms.date: 06/13/2025
ms.service: azure-sql-database
ms.subservice: scale-out
ms.topic: how-to
monikerRange: "=azuresql || =azuresql-db "
ms.custom:
  - sqldbrb=1
  - sfi-ropc-nochange
---
# Multi-shard querying using elastic database tools



  **Applies to:**    [Azure SQL Database](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

## Overview

With the [Scale out with Azure SQL Database](elastic-scale-introduction.md), you can create sharded database solutions. **Multi-shard querying** is used for tasks such as data collection/reporting that require running a query that stretches across several shards. (Contrast this to [data-dependent routing](elastic-scale-data-dependent-routing.md), which performs all work on a single shard.)

1. Get a `RangeShardMap` ([Java](https://learn.microsoft.com/java/api/com.microsoft.azure.elasticdb.shard.map.rangeshardmap), [.NET](https://learn.microsoft.com/dotnet/api/microsoft.azure.sqldatabase.elasticscale.shardmanagement.rangeshardmap-1)) or `ListShardMap` ([Java](https://learn.microsoft.com/java/api/com.microsoft.azure.elasticdb.shard.map.listshardmap), [.NET](https://learn.microsoft.com/dotnet/api/microsoft.azure.sqldatabase.elasticscale.shardmanagement.listshardmap-1)) using the `TryGetRangeShardMap` ([Java](https://learn.microsoft.com/java/api/com.microsoft.azure.elasticdb.shard.mapmanager.shardmapmanager.trygetrangeshardmap), [.NET](https://learn.microsoft.com/dotnet/api/microsoft.azure.sqldatabase.elasticscale.shardmanagement.shardmapmanager.trygetrangeshardmap)), the `TryGetListShardMap` ([Java](https://learn.microsoft.com/java/api/com.microsoft.azure.elasticdb.shard.mapmanager.shardmapmanager.trygetlistshardmap), [.NET](https://learn.microsoft.com/dotnet/api/microsoft.azure.sqldatabase.elasticscale.shardmanagement.shardmapmanager.trygetlistshardmap)), or the `GetShardMap` ([Java](https://learn.microsoft.com/java/api/com.microsoft.azure.elasticdb.shard.mapmanager.shardmapmanager.getshardmap), [.NET](https://learn.microsoft.com/dotnet/api/microsoft.azure.sqldatabase.elasticscale.shardmanagement.shardmapmanager.getshardmap)) method. See [Constructing a ShardMapManager](elastic-scale-shard-map-management.md#constructing-a-shardmapmanager) and [Get a RangeShardMap or ListShardMap](elastic-scale-shard-map-management.md#get-a-rangeshardmap-or-listshardmap).
1. Create a `MultiShardConnection` ([Java](https://learn.microsoft.com/java/api/com.microsoft.azure.elasticdb.query.multishard.multishardconnection), [.NET](https://learn.microsoft.com/dotnet/api/microsoft.azure.sqldatabase.elasticscale.query.multishardconnection)) object.
1. Create a `MultiShardStatement` or `MultiShardCommand` ([Java](https://learn.microsoft.com/java/api/com.microsoft.azure.elasticdb.query.multishard.multishardstatement), [.NET](https://learn.microsoft.com/dotnet/api/microsoft.azure.sqldatabase.elasticscale.query.multishardcommand)).
1. Set the `CommandText property` ([Java](https://learn.microsoft.com/java/api/com.microsoft.azure.elasticdb.query.multishard.multishardstatement), [.NET](https://learn.microsoft.com/dotnet/api/microsoft.azure.sqldatabase.elasticscale.query.multishardcommand)) to a T-SQL command.
1. Execute the command by calling the `ExecuteQueryAsync` or `ExecuteReader` ([Java](https://learn.microsoft.com/java/api/com.microsoft.azure.elasticdb.query.multishard.multishardstatement.executeQueryAsync), [.NET](https://learn.microsoft.com/dotnet/api/microsoft.azure.sqldatabase.elasticscale.query.multishardcommand)) method.
1. View the results using the `MultiShardResultSet` or `MultiShardDataReader` ([Java](https://learn.microsoft.com/java/api/com.microsoft.azure.elasticdb.query.multishard.multishardresultset), [.NET](https://learn.microsoft.com/dotnet/api/microsoft.azure.sqldatabase.elasticscale.query.multisharddatareader)) class.

## Example

The following code illustrates the usage of multi-shard querying using a given **ShardMap** named `myShardMap`.

```csharp
using (MultiShardConnection conn = new MultiShardConnection(myShardMap.GetShards(), myShardConnectionString))
{
    using (MultiShardCommand cmd = conn.CreateCommand())
    {
        cmd.CommandText = "SELECT c1, c2, c3 FROM ShardedTable";
        cmd.CommandType = CommandType.Text;
        cmd.ExecutionOptions = MultiShardExecutionOptions.IncludeShardNameColumn;
        cmd.ExecutionPolicy = MultiShardExecutionPolicy.PartialResults;

        using (MultiShardDataReader sdr = cmd.ExecuteReader())
        {
            while (sdr.Read())
            {
                var c1Field = sdr.GetString(0);
                var c2Field = sdr.GetFieldValue<int>(1);
                var c3Field = sdr.GetFieldValue<Int64>(2);
            }
        }
    }
}
```

A key difference is the construction of multi-shard connections. Where `SqlConnection` operates on an individual database, the `MultiShardConnection` takes a collection of shards as its input. Populate the collection of shards from a shard map. The query is then executed on the collection of shards using `UNION ALL` semantics to assemble a single overall result. Optionally, the name of the shard where the row originates from can be added to the output using the `ExecutionOptions` property on command.

Note the call to `myShardMap.GetShards()`. This method retrieves all shards from the shard map and provides an easy way to run a query across all relevant databases. The collection of shards for a multi-shard query can be refined further by performing a LINQ query over the collection returned from the call to `myShardMap.GetShards()`. In combination with the partial results policy, the current capability in multi-shard querying has been designed to work well for tens up to hundreds of shards.

A limitation with multi-shard querying is currently the lack of validation for shards and shardlets that are queried. While data-dependent routing verifies that a given shard is part of the shard map at the time of querying, multi-shard queries do not perform this check. This can lead to multi-shard queries running on databases that have  been removed from the shard map.

## Multi-shard queries and split-merge operations

Multi-shard queries do not verify whether shardlets on the queried database are participating in ongoing split-merge operations. (See [Moving data between scaled-out cloud databases](elastic-scale-overview-split-and-merge.md).) This can lead to inconsistencies where rows from the same shardlet show for multiple databases in the same multi-shard query. Be aware of these limitations and consider draining ongoing split-merge operations and changes to the shard map while performing multi-shard queries.

## Related content
Not using elastic database tools yet? Check out our [Getting Started Guide](elastic-scale-get-started.md).  For questions, contact us on the [Microsoft Q\&A question page for SQL Database](https://learn.microsoft.com/answers/topics/azure-sql-database.html) and for feature requests, add new ideas or vote for existing ideas in the [SQL Database feedback forum](https://feedback.azure.com/d365community/forum/04fe6ee0-3b25-ec11-b6e6-000d3a4f0da0).
