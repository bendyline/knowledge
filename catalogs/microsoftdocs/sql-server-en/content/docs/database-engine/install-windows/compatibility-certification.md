---
title: "Compatibility Certification"
description: Compatibility certification eliminates risks of application compatibility, which allows you to upgrade a SQL Server database on-premises and in the cloud.
author: rwestMSFT
ms.author: randolphwest
ms.date: 06/16/2025
ms.service: sql
ms.subservice: install
ms.topic: concept-article
helpviewer_keywords:
  - "compatibility [SQL Server], databases"
  - "compatibility levels [SQL Server], after upgrade"
  - "Database Engine [SQL Server], upgrading"
  - "Databases [SQL Server], upgrading"
  - "compatibility [SQL Server], certification"
  - "compatibility level [SQL Server], upgrades"
monikerRange: ">=sql-server-2017"
---

# Compatibility certification


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 





Compatibility certification allows businesses to upgrade and modernize a  SQL Server 
 database on-premises, in the cloud, and on the edge, eliminating risks of application compatibility.

The same  Database Engine 
 powers both  SQL Server 
 and  Azure SQL Database 
 (including Azure SQL Managed Instance). This shared  Database Engine 
 means that a user database can be moved seamlessly between on-premises  SQL Server 
 and  Azure SQL Database 
, while the application code that executes in the database as  Transact-SQL  continues to work as it would in its source system.

For each new release of  SQL Server 
, the default compatibility level is set to the version of the  Database Engine 
. But the compatibility level of previous versions is preserved for continued compatibility of existing applications. For more information, refer to the [compatibility matrix](../../t-sql/statements/alter-database-transact-sql-compatibility-level.md#supported-dbcompats).
Therefore, an application that was certified to work with a given  SQL Server 
 version **was in fact certified to work on that version's default compatibility level**.

For example, database compatibility level 130 was the default in  SQL Server 2016 (13.x) 
. Because compatibility levels force specific  Transact-SQL  functional and query optimization behaviors, **a database certified to work on  SQL Server 2016 (13.x) 
 was implicitly certified on database compatibility level 130**. This database can work as-is on a more recent version of  SQL Server 
 (such as  SQL Server 2019 (15.x) 
) and  Azure SQL Database 
, as long as the database compatibility level is kept as 130.

This is a fundamental principle for  Microsoft 
  Azure SQL Database 
 continuous integration operation model. The  Database Engine 
 is continuously improved and upgraded in Azure, but because existing databases keep their current compatibility level, they continue to work as designed even after upgrades to the underlying  Database Engine 
.

This is also how SharePoint Server 2016 and SharePoint Server 2019 certify on  SQL Server 
 and Azure SQL Managed Instance. You can deploy any  SQL Server Database Engine 
 that uses the supported database compatibility levels for those SharePoint Server versions. For more information, see [Hardware and software requirements for SharePoint Server 2016](https://learn.microsoft.com/sharepoint/install/hardware-and-software-requirements#minimum-requirements-for-a-database-server-in-a-farm) and [Hardware and software requirements for SharePoint Server 2019](https://learn.microsoft.com/sharepoint/install/hardware-and-software-requirements-2019#minimum-requirements-for-a-database-server-in-a-farm).

## Manage upgrade risk with compatibility certification

Using Compatibility Certification is a valuable approach to database modernization. When developers certify based on compatibility level, you set the technical requirements for an application to be supported on  SQL Server 
 and  Azure SQL Database 
, but decouple the application lifecycle from the database platform lifecycle. This allows companies to keep the  SQL Server Database Engine 
 upgraded as needed by lifecycle policies, using new scalability and performance enhancements that aren't code dependent, and connecting applications **maintain their functional status** through upgrades.

The main risk factors for any upgrade are the possibility of adversely affecting functionality, and performance issues. Compatibility Certification represents peace of mind in terms of managing these upgrade risks:

- In what relates to  Transact-SQL  behavior, any change means that an application needs to be recertified for correctness. However, the [database compatibility level](../../t-sql/statements/alter-database-transact-sql-compatibility-level.md) setting provides backward compatibility with earlier versions of  SQL Server 
 only for the specified database, not for the entire server. **Keeping the database compatibility level as-is ensures that existing application queries continue to display the same behavior before and after a  Database Engine 
 upgrade**. For more information about  Transact-SQL  behavior and compatibility levels, see [Using compatibility levels for backward compatibility](../../t-sql/statements/alter-database-transact-sql-compatibility-level.md#backwardCompat).

- In what relates to performance, because improvements in the Query Optimizer are introduced with every version, it could be expected to encounter query plan differences between different  Database Engine 
 versions. Query plan differences in the scope of an upgrade usually translate to risk, when there's potential that some changes could be detrimental for a given query or workload. In turn, this risk is what usually drives the need for application recertification, which can delay upgrades and pose lifecycle and support challenges.

  Mitigating upgrade risks is why Query Optimizer improvements are gated to the default compatibility level of a new release (in other words, the highest compatibility level available for any new version). Compatibility Certification includes **query plan shape protection**: the notion that maintaining a database compatibility level as-is, immediately after a  Database Engine 
 upgrade, translates into using the same query optimization model in the new version as it was before the upgrade, and the query plan shape shouldn't change.

  For more information, see the [Why query plan shape?](#queryplan_shape) section in this article.

For more information about compatibility levels, see [Using compatibility levels for backward compatibility](../../t-sql/statements/alter-database-transact-sql-compatibility-level.md#backwardCompat).

For an existing application that was already certified for a given compatibility level, upgrade the  SQL Server Database Engine 
 and **maintain** the previous database compatibility level. There's no need to recertify an application in this scenario. For more information, see [Compatibility levels and Database Engine upgrades](#compatibility-levels-and-database-engine-upgrades) later in this article.

For new development work, or when an existing application requires use of new features such as [Intelligent query processing](../../relational-databases/performance/intelligent-query-processing.md), and some new  Transact-SQL , plan to upgrade the database compatibility level to the latest available in  SQL Server 
, and recertify your application to work with that compatibility level. For more information on upgrading the database compatibility level, see [Best Practices for upgrading Database Compatibility Level](../../t-sql/statements/alter-database-transact-sql-compatibility-level.md#best-practices-for-upgrading-database-compatibility-level).

<a id="queryplan_shape"></a>

### Why query plan shape?

Query plan shape refers to the visual representation of the various operators that make up a query plan. This includes operators like seeks, scans, joins, and sorts, as well as the connections between them that indicate the flow of data and the order of the operations that must be executed to produce the intended result set. The query plan shape is determined by the Query Optimizer.

To keep query performance predictable during an upgrade, one of the fundamental goals is to ensure the same query plan shape is used. This can be achieved by not changing the database compatibility level immediately after an upgrade, even though the underlying  Database Engine 
 has different versions. If nothing else changed in the query execution ecosystem, such as significant changes in available resources, or data distribution in the underlying data, a query's performance should remain unchanged.

However, keeping a query plan's shape isn't the only factor that might have performance implications after an upgrade. If you move the database to a newer  Database Engine 
 and also make environmental changes, you could introduce factors that have an immediate effect on a query's performance, even if the query plan retains the same shape across versions. These environmental changes might include the new  Database Engine 
 having more or less memory and CPU resources available, changes to server or database configuration options, or changes to data distribution that affect how a query plan is created. This is why it's important to understand that maintaining the database compatibility level protects against changes in the query plan **shape**, but offers no protection from other environmental aspects that influence query performance, some of which are user-initiated changes.

For more information, see the [Query Processing Architecture Guide](../../relational-databases/query-processing-architecture-guide.md#optimizing-select-statements).

## Compatibility certification benefits

There are several immediate benefits to database certification as a compatibility-based approach rather than a named-version approach:

- **Decouple application certification from the platform**. Because of its shared  Database Engine 
, for applications that just need to execute  Transact-SQL  queries, there's no need to maintain separate certification processes for Azure and on-premises.

- **Reduce upgrade risks** because during database platform modernization, application and database platform layer upgrade cycles can be separated for less disruption, and improved change management.

- **Upgrade with no code changes**. Upgrading to a new version of  SQL Server 
 or  Azure SQL Database 
 can be done with no code changes by keeping the same compatibility level as the source system, and no immediate need to recertify until such time when the application needs to use enhancements that are only available in a higher database compatibility level.

- **Improve manageability and scalability** without requiring application changes, using enhancements that aren't gated by database compatibility level. In  SQL Server 
 these include, for example:

  - Rich monitoring and troubleshooting improvements, with new [System dynamic management views](../../relational-databases/system-dynamic-management-objects/system-dynamic-management-objects.md), [Extended Events](../../relational-databases/extended-events/extended-events.md), and [automatic tuning](../../relational-databases/automatic-tuning/automatic-tuning.md).

  - Improved scalability, for example with [Automatic Soft-NUMA](../configure-windows/soft-numa-sql-server.md#automatic-soft-numa), [Accelerated database recovery](../../relational-databases/accelerated-database-recovery-concepts.md), or [Memory-optimized tempdb metadata](../../relational-databases/in-memory-database.md#memory-optimized-tempdb-metadata).

New databases are still set to the default compatibility level of the  Database Engine 
 version. But when a database is restored or attached from any earlier version of  SQL Server 
 to a new version of  SQL Server 
 or  Azure SQL Database 
, the database retains its existing compatibility level.

### Verify supported compatibility level

Before moving a database to a new version of  SQL Server 
 or  Azure SQL Database 
, verify if the database compatibility level is still supported. The database compatibility level support matrix can be seen in [ALTER DATABASE compatibility level arguments](../../t-sql/statements/alter-database-transact-sql-compatibility-level.md#arguments).

Upgrading a database with a compatibility level lower than the allowed level (for example, 90 which was the default in  SQL Server 2005 (9.x) 
), sets the database to the lowest compatibility level allowed (100).

To determine the current compatibility level, query the `compatibility_level` column in [sys.databases](../../relational-databases/system-catalog-views/sys-databases-transact-sql.md).

## Compatibility levels and database engine upgrades

To upgrade the  Database Engine 
 to the latest version, while maintaining the database compatibility level that existed before the upgrade and its supportability status, you should perform **static functional surface area validation** of the application code **in the database** (programmability objects such as stored procedures, functions, triggers, and others) and **in the application** (using a workload trace that captures the dynamic code sent by the application).

This can be easily done by using the [SQL Server migration component in SQL Server Management Studio](https://learn.microsoft.com/ssms/migrate-sql-server-component). The absence of errors in the report output, about missing or incompatible functionality, protects application from any functional regressions on the new target version. If changes are required to ensure your database will work in the new version, then the tool allows you to pinpoint where changes are needed, and what workarounds are available.

This functional validation is especially important when moving a database from a legacy version (such as  SQL Server 2008 R2 (10.50.x) 
 or  SQL Server 2012 (11.x) 
) into a new version of  SQL Server 
 or  Azure SQL Database 
, because your application code might be using discontinued  Transact-SQL  that isn't protected by database compatibility level. But when moving from a more recent version (such as  SQL Server 2016 (13.x) 
) to  SQL Server 2022 (16.x) 
 or  Azure SQL Database 
, there's no discontinued  Transact-SQL  to worry about. For more information about discontinued  Transact-SQL , see [Using compatibility level for backward compatibility](../../t-sql/statements/alter-database-transact-sql-compatibility-level.md#backwardCompat).

> **Note:**  
> The SQL Server migration component supports database compatibility level 100 and above.  SQL Server 2005 (9.x) 
 as source version is excluded.

We recommend that you perform some minimal testing to validate the success of an upgrade, while maintaining the previous database compatibility level. You should determine what minimal testing means for your own application and scenario.

### Query plan protection

 Microsoft 
 provides query plan shape protection when:

- The new  SQL Server 
 version (target) runs on hardware that is comparable to the hardware where the previous  SQL Server 
 version (source) was running.

- The same [supported database compatibility level](../../t-sql/statements/alter-database-transact-sql-compatibility-level.md#supported-dbcompats) is used at both the target  SQL Server 
 and source  SQL Server 
.

- The **same** database and workload is used at both the target  SQL Server 
 and the source  SQL Server 
.

Any query plan shape regression (as compared to the source  SQL Server 
) that occurs under these conditions will be addressed. Contact Microsoft Customer Support in this case.

## Related content

- [ALTER DATABASE (Transact-SQL) compatibility level](../../t-sql/statements/alter-database-transact-sql-compatibility-level.md)
- [View or change the compatibility level of a database](../../relational-databases/databases/view-or-change-the-compatibility-level-of-a-database.md)
- [Best Practices for upgrading Database Compatibility Level](../../t-sql/statements/alter-database-transact-sql-compatibility-level.md#best-practices-for-upgrading-database-compatibility-level)
