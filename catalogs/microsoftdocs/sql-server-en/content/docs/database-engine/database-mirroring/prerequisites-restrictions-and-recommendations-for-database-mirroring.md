---
title: "Database Mirroring: Prerequisites, restrictions, & recommendations"
description: Learn about the prerequisites, restrictions, and recommendations for configuring database mirroring with SQL Server.
author: MashaMSFT
ms.author: mathoma
ms.date: "05/17/2016"
ms.service: sql
ms.subservice: database-mirroring
ms.topic: best-practice
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "database mirroring [SQL Server], deployment"
  - "partners [SQL Server]"
  - "database mirroring [SQL Server], prerequisites"
  - "database mirroring [SQL Server], recommendations"
  - "database mirroring [SQL Server], restrictions"
  - "database mirroring [SQL Server], planning"
  - "database mirroring [SQL Server], about database mirroring"
---
# Prerequisites, Restrictions, and Recommendations for Database Mirroring
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
    
> **Caution:**
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  For high availability, use  Always On availability groups 
 instead.  

> **Important:**
> Database Mirroring in SQL Server is a distinct technology from [Microsoft Fabric Database Mirroring](https://learn.microsoft.com/fabric/database/mirrored-database/overview). Mirroring to Fabric provides better analytical performance, the ability to unify your data estate with OneLake in Fabric, and open access to your data in Delta Parquet format.
>
> With Mirroring to Microsoft Fabric, you can continuously replicate your existing data estate directly into OneLake in Fabric, including data from SQL Server 2016+, Azure SQL Database, Azure SQL Managed Instance, Cosmos DB, Oracle, Snowflake, and more.
  
 This topic describes the prerequisites and recommendations for setting up database mirroring. For an introduction to database mirroring, see [Database Mirroring (SQL Server)](database-mirroring-sql-server.md).  
  
  
##  <a name="DbmSupport"></a> Support For Database Mirroring  

For a list of features supported by the editions of  SQL Server 
 on Windows, see:

- [Editions and supported features of SQL Server 2025](../../sql-server/editions-and-components-of-sql-server-2025.md)
- [Editions and supported features of SQL Server 2022](../../sql-server/editions-and-components-of-sql-server-2022.md)
- [Editions and supported features of SQL Server 2019](../../sql-server/editions-and-components-of-sql-server-2019.md)
- [Editions and supported features of SQL Server 2017](../../sql-server/editions-and-components-of-sql-server-2017.md)

  
 Note that database mirroring works with any supported database compatibility level. For information about the supported compatibility levels, see [ALTER DATABASE Compatibility Level &#40;Transact-SQL&#41;](../../t-sql/statements/alter-database-transact-sql-compatibility-level.md).  
  
<a id="Prerequisites"></a>

## Prerequisites

-   For a mirroring session to be established, the partners and the witness, if any, must be running on the same version of  SQL Server 
.  
  
-   The two partners, that is the principal server and mirror server, must be running the same edition of  SQL Server 
. The witness, if any, can run on any edition of  SQL Server 
 that supports database mirroring.  
  
    > **Note:**  
    >  You can upgrade server instances that are partners in a mirroring session to a more recent version of  SQL Server 
. For more information, see [Upgrading Mirrored Instances](upgrading-mirrored-instances.md).  
  
-   The database must use the full recovery model. The simple and bulk-logged recovery models do not support database mirroring. Therefore, bulk operations are always fully logged for a mirrored database. For information about recovery models, see [Recovery Models &#40;SQL Server&#41;](../../relational-databases/backup-restore/recovery-models-sql-server.md).  
  
-   Verify that the mirror server has sufficient disk space for the mirror database.  
  
    > **Note:**  
    >  For information about how to use database mirroring on a replicated database, see [Database Mirroring and Replication (SQL Server)](database-mirroring-and-replication-sql-server.md).  
  
-   When you are creating the mirror database on the mirror server, make sure that you restore the backup of the principal database specifying the same database name WITH NORECOVERY. Also, all log backups that were created after that backup was taken must also be applied, again WITH NORECOVERY.  
  
    > **Important:**  
    >  If database mirroring has been stopped, before you can restart it, any subsequent log backups taken on the principal database must be applied to the mirror database.  
  
  
##  <a name="Restrictions"></a> Restrictions  
  
-   Only user databases can be mirrored. You cannot mirror the **master**, **msdb**, **tempdb**, or **model** databases.  
  
-   A mirrored database cannot be renamed during a database mirroring session.  
  
-   Database mirroring does not support FILESTREAM. A FILESTREAM filegroup cannot be created on the principal server. Database mirroring cannot be configured for a database that contains FILESTREAM filegroups.  
  
-   Database mirroring is not supported with either cross-database transactions or distributed transactions. For more information, see [Cross-Database Transactions and Distributed Transactions for Always On Availability Groups and Database Mirroring (SQL Server)](../availability-groups/windows/transactions-always-on-availability-and-database-mirroring.md).  
  
  
##  <a name="RecommendationsForPartners"></a> Recommendations for Configuring Partner Servers  
  
-   The partners should run on comparable systems that can handle identical workloads.  
  
    > **Note:**  
    >  If you plan to use high-safety mode with automatic failover, the normal load on each failover partner should be less than 50 percent of the CPU. If your work load overloads the CPU, a failover partner might be unable to ping the other server instances in the mirroring session. This causes an unnecessary failover. If you cannot keep the CPU usage under 50 percent, we recommend that you use either high-safety mode without automatic failover or high-performance mode.  
  
-   If possible, the path (including the drive letter) of the mirror database should be identical to the path of the principal database. You must include the MOVE option in the RESTORE statement if the file layouts must differ. For example, if the principal database is on drive 'F:' but the mirror system lacks an F: drive.  
  
    > **Important:**  
    >  If you move the database files when you create the mirror database, you might be unable to add files to the database later without mirroring being suspended.  
  
-   All of the server instances in a mirroring session should use the same master code page and collation. Differences can cause a problem during mirroring setup.  
  
-   Optionally, estimate the time to fail over a database, to make sure that the system configuration will provide the performance you require. For more information, see [Estimate the Interruption of Service During Role Switching (Database Mirroring)](estimate-the-interruption-of-service-during-role-switching-database-mirroring.md).  
  
-   For best performance, use a dedicated network adapter (network interface card) for mirroring.  
  
-   We make no recommendations about whether a wide-area network (WAN) is reliable enough for database mirroring in high-safety mode. If you decide to use high-safety mode over a WAN, be cautious about how you add a witness to the session, because unwanted automatic failovers can occur. For more information, see [Recommendations for Deploying Database Mirroring](#RecommendationsForDeploying), later in this topic.  
  
  
##  <a name="RecommendationsForDeploying"></a> Recommendations for Deploying Database Mirroring  
 Optimal database mirroring performance is obtained by using asynchronous operation. A mirroring session that uses synchronous operation might experience slowed performance when its workload generates large amounts of transaction log data.  
  
 In test environments, it is appropriate to explore all the operating modes to evaluate how database mirroring performs. However, before you deploy mirroring into a production environment, make sure that you understand how the network functions in the real world.  
  
 High-safety mode with automatic failover is designed for a high-service network that has either a dedicated connection or a fairly simple network configuration that minimizes the sources of possible network failures. Such a high-quality network environment is necessary for high-safety mode with automatic failover and is recommended for all database mirroring sessions. However, high-performance mode and high-safety mode without automatic failover are much less affected by network reliability.  
  
 Therefore, for production environments we recommend that you adhere to the following deployment guidelines:  
  
1.  Start running in asynchronous, high-performance mode. This mode is the least sensitive to the network environment and provides the best configuration for exploring how mirroring works. We recommend that you run your system asynchronously until you are confident that your bandwidth supports mirroring and you have developed an understanding of mirroring setup and of the performance of asynchronous mode in your environment. For more information, see [Database Mirroring Operating Modes](database-mirroring-operating-modes.md).  
  
    > **Important:**  
    >  Throughout testing, we recommend that you monitor your sessions for network errors that cause database mirroring to fail. For more information about potential sources of failure, see [Possible Failures During Database Mirroring](possible-failures-during-database-mirroring.md). For information about how to monitor database mirroring, see [Monitoring Database Mirroring (SQL Server)](monitoring-database-mirroring-sql-server.md).  
  
2.  When you are confident that asynchronous operation is meeting the business needs, you might want to try synchronous operation to improve your data protection. When you test how synchronous mirroring works in your environment, we recommend that first you test high-safety mode without automatic failover. The primary purpose of this testing is to see how synchronous operation affects the database performance. For more information, see [Database Mirroring Operating Modes](database-mirroring-operating-modes.md).  
  
3.  Wait to enable automatic failover until you are confident that high-safety mode without automatic failover is meeting the business needs and that network errors are not causing failures. For more information, see [Role Switching During a Database Mirroring Session (SQL Server)](role-switching-during-a-database-mirroring-session-sql-server.md).  
  
  
## Related content

- [Setting Up Database Mirroring (SQL Server)](setting-up-database-mirroring-sql-server.md)
- [Transport security in availability groups and database mirroring](transport-security-database-mirroring-always-on-availability.md)
- [Database Mirroring (SQL Server)](database-mirroring-sql-server.md)
- [Troubleshoot Database Mirroring Configuration (SQL Server)](troubleshoot-database-mirroring-configuration-sql-server.md)
