---
title: Elastic Database Tools Glossary
description: Explanation of terms used for elastic database tools
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: bgavrilovic, mathoma
ms.date: 06/13/2025
ms.service: azure-sql-database
ms.subservice: scale-out
ms.topic: glossary
ms.custom:
  - sqldbrb=1
monikerRange: "=azuresql || =azuresql-db "
---
# Elastic Database tools glossary



  **Applies to:**    [Azure SQL Database](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

> **Important:**
> Elastic query in shard map manager mode (horizontal partitioning), using `EXTERNAL DATA SOURCE` type `SHARD_MAP_MANAGER`, is reaching end of support on March 31, 2027. After this date, existing workloads will continue to function but will no longer receive support, and creation of new external data sources of type `SHARD_MAP_MANAGER` will no longer be possible. For migration options, see [Migration guide from elastic query shard map manager mode](https://learn.microsoft.com/azure/azure-sql/database/elastic-query-horizontal-partitioning-migration).

The following terms are defined for the [Scale out with Azure SQL Database](elastic-scale-introduction.md). The tools are used to manage [shard maps](elastic-scale-shard-map-management.md), and include the [client library](elastic-database-client-library.md), the [split-merge tool](elastic-scale-overview-split-and-merge.md), [elastic pools](elastic-pool-overview.md), and [queries](elastic-query-overview.md). 

These terms are used in [Adding a shard using Elastic Database tools](elastic-scale-add-a-shard.md) and [Using the RecoveryManager class to fix shard map problems](elastic-database-recovery-manager.md).

Diagram of Elastic Scale terms.

**Database**: A database in Azure SQL Database. 

**Data dependent routing**: The functionality that enables an application to connect to a shard given a specific sharding key. See [Use data-dependent routing to route a query to an appropriate database](elastic-scale-data-dependent-routing.md). Compare to **[Multi-shard querying using elastic database tools](elastic-scale-multishard-querying.md)**.

**Global shard map**: The map between sharding keys and their respective shards within a **shard set**. The global shard map is stored in the **shard map manager**. Compare to **local shard map**.

**List shard map**: A shard map in which sharding keys are mapped individually. Compare to **Range Shard Map**.   

**Local shard map**: Stored on a shard, the local shard map contains mappings for the shardlets that reside on the shard.

**Multi-shard query**: The ability to issue a query against multiple shards; results sets are returned using `UNION ALL` semantics (also known as "fan-out query"). Compare to **data dependent routing**.

**multitenant** and **Single-tenant**: This shows a single-tenant database and a multitenant database:

Diagram that shows a single-tenant database and a multitenant database.

Here is a representation of **sharded** single and multitenant databases. 

Diagram of Single and multitenant databases.

**Range shard map**: A shard map in which the shard distribution strategy is based on multiple ranges of contiguous values. 

**Reference tables**: Tables that are not sharded but are replicated across shards. For example, zip codes can be stored in a reference table. 

**Shard**: A database in Azure SQL Database that stores data from a sharded data set. 

**Shard elasticity**: The ability to perform both **horizontal scaling** and **vertical scaling**.

**Sharded tables**: Tables that are sharded, i.e., whose data is distributed across shards based on their sharding key values. 

**Sharding key**: A column value that determines how data is distributed across shards. The value type can be one of the following: **int**, **bigint**, **varbinary**, or **uniqueidentifier**. 

**Shard set**: The collection of shards that are attributed to the same shard map in the shard map manager.  

**Shardlet**: All of the data associated with a single value of a sharding key on a shard. A shardlet is the smallest unit of data movement possible when redistributing sharded tables. 

**Shard map**: The set of mappings between sharding keys and their respective shards.

**Shard map manager**: A management object and data store that contains the shard map(s), shard locations, and mappings for one or more shard sets.

Diagram shows a shard map manager associated with shardmaps_global, shards_global, and shard_mappings_global.

## Verbs

**Horizontal scaling**: The act of scaling out (or in) a collection of shards by adding or removing shards to a shard map, as shown below.

Diagram of horizontal and vertical scaling.

**Merge**: The act of moving shardlets from two shards to one shard and updating the shard map accordingly.

**Shardlet move**: The act of moving a single shardlet to a different shard. 

**Shard**: The act of horizontally partitioning identically structured data across multiple databases based on a sharding key.

**Split**: The act of moving several shardlets from one shard to another (typically new) shard. A sharding key is provided by the user as the split point.

**Vertical Scaling**: The act of scaling up (or down) the compute size of an individual shard. For example, changing a shard from Standard to Premium (which results in more computing resources). 

## Related content
Not using elastic database tools yet? Check out our [Getting Started Guide](elastic-scale-get-started.md).  For questions, contact us on the [Microsoft Q\&A question page for SQL Database](https://learn.microsoft.com/answers/topics/azure-sql-database.html) and for feature requests, add new ideas or vote for existing ideas in the [SQL Database feedback forum](https://feedback.azure.com/d365community/forum/04fe6ee0-3b25-ec11-b6e6-000d3a4f0da0).
