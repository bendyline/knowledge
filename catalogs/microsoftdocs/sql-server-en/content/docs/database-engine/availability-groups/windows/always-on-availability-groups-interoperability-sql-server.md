---
title: "Always On availability groups: interoperability"
description: "Describes the different features that can and cannot function alongside an Always On availability group."
author: MashaMSFT
ms.author: mathoma
ms.reviewer: maghan
ms.date: 02/01/2024
ms.service: sql
ms.subservice: availability-groups
ms.topic: reference
helpviewer_keywords:
  - "Availability Groups [SQL Server], about"
  - "Availability Groups [SQL Server], interoperability"
---

# Always On availability groups: interoperability (SQL Server)


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article documents interoperability of  Always On availability groups 
 with other  SQL Server 
 features.

## <a id="Interop"></a> Features that Interoperate with Always On availability groups

The following table lists  SQL Server 
 features that interoperate with  Always On availability groups 
. A link in the **More Information** column indicates that interoperability considerations exist for a given feature.

| Feature | More Information |
| :--- | :--- |
| Change data capture | [Replication, Change Tracking, Change Data Capture, and Always On Availability Groups (SQL Server)](replicate-track-change-data-capture-always-on-availability.md) |
| Change tracking | [Replication, Change Tracking, Change Data Capture, and Always On Availability Groups (SQL Server)](replicate-track-change-data-capture-always-on-availability.md) |
| Contained databases | [Contained Databases with Always On Availability Groups (SQL Server)](contained-databases-with-always-on-availability-groups-sql-server.md) |
| Database encryption | [Encrypted Databases with Always On Availability Groups (SQL Server)](encrypted-databases-with-always-on-availability-groups-sql-server.md) |
| Database snapshots | [Database Snapshots with Always On Availability Groups (SQL Server)](database-snapshots-with-always-on-availability-groups-sql-server.md) |
| FILESTREAM and FileTable | [FILESTREAM and FileTable with Always On Availability Groups (SQL Server)](filestream-and-filetable-with-always-on-availability-groups-sql-server.md) |
| Full-text search | Note: Full-Text indexes are synchronized with Always On secondary databases. |
| Log shipping | [Prerequisites for Migrating from Log Shipping to Always On Availability Groups (SQL Server)](prereqs-migrating-log-shipping-to-always-on-availability-groups.md) |
| Remote Blob Store (RBS) | [Remote Blob Store (RBS) and Always On Availability Groups (SQL Server)](remote-blob-store-rbs-and-always-on-availability-groups-sql-server.md) |
| Replication | [Configure Replication for Always On Availability Groups (SQL Server)](configure-replication-for-always-on-availability-groups-sql-server.md)<br /><br />[Maintaining an Always On Publication Database (SQL Server)](maintaining-an-always-on-publication-database-sql-server.md)<br />[Replication, Change Tracking, Change Data Capture, and Always On Availability Groups (SQL Server)](replicate-track-change-data-capture-always-on-availability.md)<br />[Replication Subscribers and Always On Availability Groups (SQL Server)](replication-subscribers-and-always-on-availability-groups-sql-server.md) |
| Analysis Services | [Analysis Services with Always On Availability Groups](analysis-services-with-always-on-availability-groups.md) |
| Reporting Services | Utilize read only secondary replicas as a reporting data source and reduce the load on your primary read-write replica.<br /><br />[Reporting Services with Always On Availability Groups (SQL Server)](reporting-services-with-always-on-availability-groups-sql-server.md) |
| Service Broker | [Service Broker with Always On Availability Groups (SQL Server)](service-broker-with-always-on-availability-groups-sql-server.md) |
| SQL Server Agent | &nbsp; |

## <a id="restrictions"></a> Features that interoperate with Always On availability groups with restrictions

The following features interoperate with  Always On availability groups 
 with specific restrictions. See the linked topics for details.

- Cross-database transactions within the same SQL Server instance require  SQL Server 2016 (13.x) 
 SP2 and Windows Server 2016 or later, with some patching requirements. For more information, see [Cross-Database Transactions and Distributed Transactions for Always On Availability Groups and Database Mirroring (SQL Server)](transactions-always-on-availability-and-database-mirroring.md)
- Distributed transactions require  SQL Server 2016 (13.x) 
 SP2 and Windows Server 2012 R2 or later, with some patching requirements. For more information, see [Cross-Database Transactions and Distributed Transactions for Always On Availability Groups and Database Mirroring (SQL Server)](transactions-always-on-availability-and-database-mirroring.md)
- [Query statistics system data collector](../../../relational-databases/data-collection/system-data-collection-set-reports.md#Query) cannot reliably run in an environment with non-readable secondaries. To use query statistics system data collector, set all secondary availability group replicas to allow [read-access](configure-read-only-access-on-an-availability-replica-sql-server.md).

## <a id="NoInterop"></a> Features that don't interoperate with Always On availability groups

 Always On availability groups 
 does not interoperate with the following features:

- Database mirroring. For more information, see [Cross-Database Transactions and Distributed Transactions for Always On Availability Groups and Database Mirroring (SQL Server)](transactions-always-on-availability-and-database-mirroring.md).

## Related content

- [Migration Guide: Migrating to SQL Server 2012 Failover Clustering and Availability Groups from Prior Clustering and Mirroring Deployments](https://learn.microsoft.com/archive/blogs/sqlalwayson/now-available-migration-guide-migrating-to-sql-server-2012-failover-clustering-and-availability-groups-from-prior-clustering-and-mirroring-deployments)
- [SQL Server Always On Team Blogs: The official SQL Server Always On Team Blog](https://learn.microsoft.com/archive/blogs/sqlalwayson/)
- [CSS SQL Server Engineers Blogs](https://learn.microsoft.com/archive/blogs/psssql/)
- [Migration Guide: Migrating to Always On Availability Groups from Prior Deployments Combining Database Mirroring and Log Shipping](https://learn.microsoft.com/previous-versions/sql/sql-server-2012/jj635217\(v=msdn.10\))
- [Microsoft SQL Server Always On Solutions Guide for High Availability and Disaster Recovery](https://learn.microsoft.com/previous-versions/sql/sql-server-2012/hh781257\(v=msdn.10\))
- [What is an Always On availability group?](overview-of-always-on-availability-groups-sql-server.md)
- [Prerequisites, restrictions, and recommendations for Always On availability groups](prereqs-restrictions-recommendations-always-on-availability.md)
