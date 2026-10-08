---
title: Resources for developing a dedicated SQL pool (formerly SQL DW) in Azure Synapse Analytics
description: Development concepts, design decisions, recommendations, and coding techniques for a dedicated SQL pool (formerly SQL DW) in Azure Synapse Analytics.
author: XiaoyuMSFT
ms.author: xiaoyul

ms.date: 08/29/2018
ms.service: azure-synapse-analytics
ms.subservice: sql-dw
ms.topic: concept-article
---

# Design decisions and coding techniques for a dedicated SQL pool (formerly SQL DW) in Azure Synapse Analytics 

> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).

 In this article, you'll find additional resources to help you better understand key design decisions, recommendations, and coding techniques for a dedicated SQL pool (formerly SQL DW) in Azure Synapse.

## Key design decisions

The following articles highlight concepts and design decisions for developing a distributed data warehouse using the dedicated SQL pool (formerly SQL DW) capability in Azure Synapse:

* [connections](sql-data-warehouse-connect-overview.md)
* [concurrency](resource-classes-for-workload-management.md)
* [transactions](sql-data-warehouse-develop-transactions.md)
* [user-defined schemas](sql-data-warehouse-develop-user-defined-schemas.md)
* [table distribution](sql-data-warehouse-tables-distribute.md)
* [table indexes](sql-data-warehouse-tables-index.md)
* [table partitions](sql-data-warehouse-tables-partition.md)
* [CTAS](sql-data-warehouse-develop-ctas.md)
* [statistics](sql-data-warehouse-tables-statistics.md)

## Development recommendations and coding techniques

The following articles feature specific coding techniques, tips, and recommendations for developing a dedicated SQL pool (formerly SQL DW):

* [stored procedures](sql-data-warehouse-develop-stored-procedures.md)
* [labels](sql-data-warehouse-develop-label.md)
* [views](performance-tuning-materialized-views.md)
* [temporary tables](sql-data-warehouse-tables-temporary.md)
* [dynamic SQL](sql-data-warehouse-develop-dynamic-sql.md)
* [looping](sql-data-warehouse-develop-loops.md)
* [group by options](sql-data-warehouse-develop-group-by-options.md)
* [variable assignment](sql-data-warehouse-develop-variable-assignment.md)

## Next steps

For more reference information, see [T-SQL statements](sql-data-warehouse-reference-tsql-statements.md).
