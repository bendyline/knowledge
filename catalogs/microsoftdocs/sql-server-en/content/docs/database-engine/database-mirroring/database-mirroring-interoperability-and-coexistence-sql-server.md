---
title: "Database Mirroring: Interoperability & Coexistence"
description: Learn about interoperability and coexistence of SQL Server database mirroring and other SQL Server features, such as full-text catalogs and database snapshots.
author: MashaMSFT
ms.author: mathoma
ms.date: "05/17/2016"
ms.service: sql
ms.subservice: database-mirroring
ms.topic: concept-article
helpviewer_keywords:
  - "high availability [SQL Server], interoperability and coexistence"
  - "Database Engine [SQL Server], high availability"
---
# Database Mirroring: Interoperability and Coexistence (SQL Server)
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Database mirroring can be used with the following features or components of  SQL Server 
:  
  
-   [Always On Failover Cluster Instances (SQL Server Failover Clustering)](database-mirroring-and-sql-server-failover-cluster-instances.md)  
  
-   [Change data capture (and change tracking)](../../relational-databases/track-changes/change-data-capture-and-other-sql-server-features.md)  
  
-   [Database snapshots](database-mirroring-and-database-snapshots-sql-server.md)  
  
-   [Full-text catalogs](database-mirroring-and-full-text-catalogs-sql-server.md)  
  
-   [Log shipping](database-mirroring-and-log-shipping-sql-server.md)  
  
-   [Replication](database-mirroring-and-replication-sql-server.md)  
  
 Database mirroring does not interoperate with the following:  
  
-   Cross-database transactions/distributed transactions  
  
     For information about why such transactions are not supported, see [Cross-Database Transactions and Distributed Transactions for Always On Availability Groups and Database Mirroring (SQL Server)](../availability-groups/windows/transactions-always-on-availability-and-database-mirroring.md).  
  
-    Always On availability groups 
  
  
## Related content

- [Database Mirroring (SQL Server)](database-mirroring-sql-server.md)
