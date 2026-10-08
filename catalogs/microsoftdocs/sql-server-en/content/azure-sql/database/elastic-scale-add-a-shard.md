---
title: Adding a Shard Using Elastic Database Tools
description: How to use Elastic Scale APIs to add new shards to a shard set.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: bgavrilovic, mathoma, randolphwest
ms.date: 06/13/2025
ms.service: azure-sql-database
ms.subservice: scale-out
ms.topic: how-to
ms.custom:
  - sqldbrb=1
monikerRange: "=azuresql || =azuresql-db "
---
# Adding a shard using Elastic Database tools



  **Applies to:**    [Azure SQL Database](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

<a id="to-add-a-shard-for-a-new-range-or-key"></a>

## Add a shard for a new range or key

Applications often need to add new shards to handle data that is expected from new keys or key ranges, for a shard map that already exists. For example, an application sharded by `TenantID` might need to create a new shard for a new tenant, or data sharded monthly might need a new shard provisioned before the start of each new month.

If the new range of key values isn't already part of an existing mapping, you can add the new shard and associate the new key or range to that shard.

### Example: adding a shard and its range to an existing shard map

This sample uses the `TryGetShard` ([Java](https://learn.microsoft.com/java/api/com.microsoft.azure.elasticdb.shard.map.shardmap.trygetshard), [.NET](https://learn.microsoft.com/previous-versions/azure/dn823929\(v=azure.100\))) the `CreateShard` ([Java](https://learn.microsoft.com/java/api/com.microsoft.azure.elasticdb.shard.map.shardmap.createshard), [.NET](https://learn.microsoft.com/dotnet/api/microsoft.azure.sqldatabase.elasticscale.shardmanagement.shardmap.createshard)), `CreateRangeMapping` ([Java](https://learn.microsoft.com/java/api/com.microsoft.azure.elasticdb.shard.map.rangeshardmap.createrangemapping), [.NET](https://learn.microsoft.com/dotnet/api/microsoft.azure.sqldatabase.elasticscale.shardmanagement.rangeshardmap-1) methods, and creates an instance of the `ShardLocation` ([Java](https://learn.microsoft.com/java/api/com.microsoft.azure.elasticdb.shard.base.shardlocation), [.NET](https://learn.microsoft.com/dotnet/api/microsoft.azure.sqldatabase.elasticscale.shardmanagement.shardlocation)) class. In the following sample, a database named `sample_shard_2` and all necessary schema objects inside of it have been created to hold range [300, 400).  

```csharp
// sm is a RangeShardMap object.
// Add a new shard to hold the range being added.
Shard shard2 = null;

if (!sm.TryGetShard(new ShardLocation(shardServer, "sample_shard_2"),out shard2))
{
    shard2 = sm.CreateShard(new ShardLocation(shardServer, "sample_shard_2"));  
}

// Create the mapping and associate it with the new shard
sm.CreateRangeMapping(new RangeMappingCreationInfo<long>
                            (new Range<long>(300, 400), shard2, MappingStatus.Online));
```

<a id="to-add-a-shard-for-an-empty-part-of-an-existing-range"></a>

## Add a shard for an empty part of an existing range

In some circumstances, you might have already mapped a range to a shard and partially filled it with data, but you now want upcoming data to be directed to a different shard. For example, you can shard by day range and have already allocated 50 days to a shard, but on day 24, you want future data to land in a different shard. The elastic database [split-merge tool](elastic-scale-overview-split-and-merge.md) can perform this operation, but if data movement isn't necessary (for example, data for the range of days [25, 50), that is, day 25 inclusive to 50 exclusive, doesn't yet exist) you can perform this entirely using the Shard Map Management APIs directly.

### Example: splitting a range and assigning the empty portion to a newly added shard

A database named `sample_shard_2` and all necessary schema objects inside of it have been created.  

```csharp
// sm is a RangeShardMap object.
// Add a new shard to hold the range we will move
Shard shard2 = null;

if (!sm.TryGetShard(new ShardLocation(shardServer, "sample_shard_2"),out shard2))
{
    shard2 = sm.CreateShard(new ShardLocation(shardServer,"sample_shard_2"));  
}

// Split the Range holding Key 25
sm.SplitMapping(sm.GetMappingForKey(25), 25);

// Map new range holding [25-50) to different shard:
// first take existing mapping offline
sm.MarkMappingOffline(sm.GetMappingForKey(25));

// now map while offline to a different shard and take online
RangeMappingUpdate upd = new RangeMappingUpdate();
upd.Shard = shard2;
sm.MarkMappingOnline(sm.UpdateMapping(sm.GetMappingForKey(25), upd));
```

> **Important:**  
> Use this technique only if you are certain that the range for the updated mapping is empty. The preceding methods do not check data for the range being moved, so it is best to include checks in your code. If rows exist in the range being moved, the actual data distribution will not match the updated shard map. Use the [split-merge tool](elastic-scale-overview-split-and-merge.md) to perform the operation instead in these cases.  

## Related content
Not using elastic database tools yet? Check out our [Getting Started Guide](elastic-scale-get-started.md).  For questions, contact us on the [Microsoft Q\&A question page for SQL Database](https://learn.microsoft.com/answers/topics/azure-sql-database.html) and for feature requests, add new ideas or vote for existing ideas in the [SQL Database feedback forum](https://feedback.azure.com/d365community/forum/04fe6ee0-3b25-ec11-b6e6-000d3a4f0da0).
