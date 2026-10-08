---
title: "Support for High Availability, Disaster Recovery for the Microsoft Drivers for PHP for SQL Server"
description: "Support for High Availability, Disaster Recovery for the Microsoft Drivers for PHP for SQL Server"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, sumitsar, jathakkar
ms.date: 08/11/2026
ms.service: sql
ms.subservice: connectivity
ms.topic: concept-article
ms.custom: sfi-ropc-nochange
ai-usage: ai-assisted
---
# Support for High Availability, Disaster Recovery



This topic discusses Microsoft Drivers for PHP for SQL Server
 support (added in version 3.0) for high-availability, disaster recovery.

Starting with version 3.0 of the Microsoft Drivers for PHP for SQL Server, you can specify the availability group listener of a high-availability, disaster-recovery availability group or a failover cluster instance as the server in the connection string.

Set **MultiSubnetFailover=True** when the target is Azure SQL Database, Azure SQL Managed Instance, SQL database in Microsoft Fabric, an availability group listener, or a failover cluster instance. The driver attempts TCP connections to all resolved IP addresses in parallel and uses the first connection that succeeds. If the application is connected to a database that fails over, the original connection is broken and the application must open a new connection to continue working after the failover.

When DNS resolves to one address, **MultiSubnetFailover=True** doesn't create additional parallel connection attempts, so it's safe on single-IP targets.

The drivers accept **True**, **1**, or **Yes**, in any case, and pass the option to the underlying ODBC driver. They treat any other value as **False** without reporting an error, so a misspelled value silently disables the option.

**MultiSubnetFailover** has the following limits:

- You can't use it over a protocol other than TCP.

- Connecting to a SQL Server instance configured with more than 64 IP addresses fails.

- You can't use it with database mirroring. Don't set it when the connection string also uses **Failover_Partner**, or when you connect to a primary replica instead of an availability group listener. For more information, see [Upgrading to Use Multi-Subnet Clusters from Database Mirroring](#upgrading-to-use-multi-subnet-clusters-from-database-mirroring).

For [Azure SQL Database serverless](https://learn.microsoft.com/azure/azure-sql/database/serverless-tier-overview) with auto-pause enabled, if you set **LoginTimeout**, use at least 60 seconds. An auto-paused database resumes on the first connect attempt, and that attempt can fail with error 40613 while the database resumes, so the application must retry. For more information, see [Auto-pause and auto-resume](https://learn.microsoft.com/azure/azure-sql/database/serverless-tier-auto-pause-resume).

For more information about Always On availability groups, see [What is an Always On Availability Group?](../../database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server.md).

## Transparent Network IP Resolution (TNIR)

Transparent Network IP Resolution (TNIR) is the ODBC driver's legacy multi-IP fallback, controlled by the **TransparentNetworkIPResolution** connection option and enabled by default.

Follow the guidance in the previous section and set **MultiSubnetFailover=True** for the targets listed there. When **MultiSubnetFailover=True**, the driver attempts TCP connections to all resolved IP addresses in parallel. The **TransparentNetworkIPResolution** option doesn't affect the connection sequence, so you don't need to set it or consider it in the connection string.

For the complete TNIR and **MultiSubnetFailover** interaction reference, see [Using Transparent Network IP Resolution with the ODBC Driver](../odbc/using-transparent-network-ip-resolution.md).

## Upgrading to Use Multi-Subnet Clusters from Database Mirroring  
A connection error will occur if the **MultiSubnetFailover** and **Failover_Partner** connection keywords are present in the connection string. An error will also occur if **MultiSubnetFailover** is used and the SQL Server returns a failover partner response indicating it is part of a database mirroring pair.  
  
When upgrading a PHP application that currently uses database mirroring to a multi-subnet scenario, remove the **Failover_Partner** connection property and replace it with **MultiSubnetFailover** set to **True**. Replace the server name in the connection string with an availability group listener. If a connection string uses **Failover_Partner** and **MultiSubnetFailover=True**, the driver generates an error. However, if a connection string uses **Failover_Partner** and **MultiSubnetFailover=False** (or **ApplicationIntent=ReadWrite**), the application uses database mirroring.  

The driver returns an error if you use database mirroring on the primary replica in the availability group, and if you use **MultiSubnetFailover=True** in the connection string that connects to a primary replica instead of to an availability group listener.  

## Specify application intent

You can specify the keyword `ApplicationIntent` in your connection string. The assignable values are `ReadWrite` (the default) or `ReadOnly`.

When you set `ApplicationIntent=ReadOnly`, the client requests a read workload when connecting. The server enforces the intent at connection time, and during a `USE` database statement.

The `ApplicationIntent` keyword doesn't work with legacy read-only databases.  

### Targets of ReadOnly

When a connection chooses `ReadOnly`, the connection is assigned to any of the following special configurations that might exist for the database:

- [Always On](../../database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server.md). A database can allow or disallow read workloads on the targeted availability group database. This choice is controlled by using the `ALLOW_CONNECTIONS` clause of the `PRIMARY_ROLE` and `SECONDARY_ROLE` Transact-SQL statements.

- [Geo-replication](https://learn.microsoft.com/azure/sql-database/sql-database-geo-replication-overview)

- [Read scale-out](https://learn.microsoft.com/azure/sql-database/sql-database-read-scale-out)

If none of those special targets are available, the regular database is read from.

The `ApplicationIntent` keyword enables *read-only routing*.

## Read-only routing

Read-only routing is a feature that can ensure the availability of a read-only replica of a database. To enable read-only routing, all of the following apply:

- You must connect to an Always On availability group listener.

- The `ApplicationIntent` connection string keyword must be set to `ReadOnly`.

- The database administrator must configure the availability group to enable read-only routing.

Multiple connections that each use read-only routing might not all connect to the same read-only replica. Changes in database synchronization or changes in the server's routing configuration can result in client connections to different read-only replicas.

You can ensure that all read-only requests connect to the same read-only replica by *not* passing an availability group listener to the `Server` connection string keyword. Instead, specify the name of the read-only instance.

Read-only routing might take longer than connecting to the primary. This is because read-only routing first connects to the primary, and then looks for the best available readable secondary. Due to these multiple steps, you should increase your `login` timeout to at least 30 seconds.



## Related content

- [Connecting to the Server](connecting-to-the-server.md)
