---
title: Considerations for Upgrading SQL Server on Linux
description: Learn about the different options for upgrading SQL Server on Linux, including in-place upgrades and migration to a new instance.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: amitkh, atsingh
ms.date: 05/07/2026
ms.service: sql
ms.subservice: linux
ms.topic: upgrade-and-migration-article
ms.custom:
  - linux-related-content
---

# Considerations for upgrading SQL Server on Linux

To minimize downtime and risk, you should consider several approaches when planning to upgrade the  SQL Server Database Engine 
 from an earlier release of  SQL Server 
 on Linux.

| Upgrade approach | Downtime estimate | Recommended |
| --- | --- | --- |
| [Upgrade in place](#upgrade-in-place) | Minutes or hours | No |
| [Migrate to a new instance](#migrate-to-a-new-instance) | Seconds or minutes (cutover only) | Yes |

The amount of downtime depends on the size of your database and the speed of your I/O subsystem. Upgrading a database with memory-optimized tables can take extra time. For more information, see [Plan and test the Database Engine upgrade plan on Windows](../../database-engine/install-windows/plan-and-test-the-database-engine-upgrade-plan.md).

> **Note:**  
> The downtime estimate for migration refers to the cutover window when you redirect users to the new instance. The total elapsed time for building and preparing the new environment is longer.

Make sure that your high availability and disaster recovery (HADR) strategy includes a fallback scenario. The complexity of your environment and your organization's service-level agreement (SLA) dictates which process to follow, and the associated risks.

For a list of features supported by the editions of  SQL Server 
 on Linux, see:

- [Editions and supported features of SQL Server 2025](../sql-server-linux-editions-and-components-2025.md)
- [Editions and supported features of SQL Server 2022](../sql-server-linux-editions-and-components-2022.md)
- [Editions and supported features of SQL Server 2019](../sql-server-linux-editions-and-components-2019.md)
- [Editions and supported features of SQL Server 2017](../sql-server-linux-editions-and-components-2017.md)


## Considerations

If you perform an in-place upgrade, the previous  SQL Server 
 instance is overwritten and no longer exists on your computer. If you migrate to a new instance, the previous instance remains intact until you decommission it. Regardless of which approach you choose, back up your  SQL Server 
 databases and other objects associated with the previous  SQL Server 
 instance before you begin.

> **Note:**  
> Refer to your vendor documentation to stay up to date about operating system security, networking, clustering, monitoring, and any other components and dependencies.

### Security

- **Operating system security**: If you installed  SQL Server 
 as a *confined service* on a Security-Enhanced Linux (SELinux) distribution, back up this configuration. For more information, see [Get started with SQL Server on SELinux](../security/selinux.md).

- **Certificates**: Back up certificates for transparent data encryption (TDE), Always On availability groups and failover cluster instances, linked servers, replication, log shipping, Database Mail, PolyBase,  SQL Server 
 Agent, Service Broker, and applications (including Always Encrypted). For more information, see [TDS 8.0](../../relational-databases/security/networking/tds-8.md) and [TLS 1.3 support](../../relational-databases/security/networking/tls-1-3.md).

- **Credentials**: Most  SQL Server 
 credentials are stored in `master`, but you should back up service master keys, database master keys, column master keys, and connection information for linked servers, Azure Key Vault, hardware security modules, Active Directory / Kerberos, and Microsoft Entra ID. For more information, see [Get started with Database Engine permissions](../../relational-databases/security/authentication-access/getting-started-with-database-engine-permissions.md) and [Securables](../../relational-databases/security/securables.md).

- **Firewall**: By default,  SQL Server 
 requires TCP port 1433 for client access. Back up any firewall rules in place for your environment.

### Configuration

- **`mssql-conf`**: Use the **`mssql-conf`** tool to configure the  SQL Server 
 instance. It stores settings in the `mssql.conf` file. For information on where this file is located, see [Configure SQL Server on Linux with the mssql-conf tool](../configure/mssql-conf.md).

  > **Note:**  
  > The SQL Server platform abstraction layer (SQLPAL) doesn't store any user accessible configuration. You don't need to back it up.

- **cgroups**: If you use cgroups to manage resource utilization for your environment, back up your configuration.

- **Network**: Back up your network configuration, including host files, DNS, connection strings, load balancers, and so on.

- **SQL Server Agent**: Script out and check all  SQL Server 
 Agent jobs, including database and server maintenance tasks. For example, if you change your host name, or your file system access changes, it can cause jobs to fail, behave unexpectedly, or possibly overwrite existing database backups.

- **Monitoring**: Check for any monitoring agents you installed, including the Azure Connected Machine agent.

- **Clustering**: Back up any cluster resource management configuration, such as Pacemaker and Corosync.

## No setup program

Unlike  SQL Server 
 on Windows,  SQL Server 
 on Linux doesn't have a setup program. Instead, it's distributed in packages for each component. To install or upgrade the Database Engine and other components, use the package manager included with your Linux distribution. For installation steps, see [Installation guidance for SQL Server on Linux](setup.md). For information about configuring package repositories, see [Configure repositories for installing and upgrading SQL Server on Linux](change-repo.md).

## Upgrade in place

With this approach, the package manager removes the binaries for the previous version of  SQL Server 
 and replaces them with the new binaries. Your configuration stays in place.

> **Note:**  
> If the upgrade requires any external dependencies, such as newer versions of packages like Python or OpenSSL, the package manager resolves these dependencies and installs them before updating  SQL Server 
 packages.

When  SQL Server 
 starts up the first time, it runs several scripts to upgrade each of the system and user databases.

While the in-place upgrade approach is easiest, it requires some amount of downtime. If the process fails, the server might be left in an inconsistent state.

Use this approach in the following scenarios:

- A development environment without a high-availability (HA) configuration.

- A non-mission critical production environment that can tolerate downtime and that's running on recent hardware and software.

## Migrate to a new instance

Migrating to a new environment (also known as *side-by-side*) minimizes downtime and provides an opportunity to fail back to the source server if something goes wrong. By using this approach, you keep the current environment while you build a new  SQL Server 
 environment, frequently on new hardware or a new virtual machine, and with a new version of the operating system.

Use this approach to upgrade:

- An installation of  SQL Server 
 on an unsupported operating system.
-  SQL Server 
 running on a Windows Server that you want to migrate to Red Hat Enterprise Linux or Ubuntu.
-  SQL Server 
 to new hardware, a new virtual machine, and/or a new version of the operating system.
-  SQL Server 
 with server consolidation.

1. [Migrate system configuration](#migrate-system-configuration)
1. [Migrate system objects](#migrate-system-objects)
1. [Migrate user databases](#migrate-user-databases)
1. [Point to the new instance](#point-to-the-new-instance)

### Migrate system configuration

Set up your new environment, referencing the [Security](#security) and [Configuration](#configuration) settings you backed up previously. Follow the [installation guidance](setup.md) to install and configure  SQL Server 
 on Linux.

### Migrate system objects

Some applications depend on information, entities, and objects that are outside of the scope of a single user database.

Typically, an application has dependencies on the `master` and `msdb` databases, and also on the user database. The destination server instance needs to have available anything stored outside of a user database required for the correct functioning of that database.

For example, application logins are stored as metadata in the `master` database, and you must recreate them on the destination server. If an application or database maintenance plan depends on  SQL Server 
 Agent jobs, whose metadata is stored in the `msdb` database, you must recreate those jobs on the destination server instance. Similarly, the metadata for a server-level trigger is stored in `master`.

When you move the database for an application to another server instance, you must recreate the metadata of the dependent entities and objects in `master` and `msdb` on the destination server instance. For example, if a database application uses server-level triggers, just attaching or restoring the database on the new instance isn't enough. The database doesn't work as expected unless you manually recreate the metadata for those triggers in the `master` database. For detailed information, see [Manage Metadata When Making a Database Available on Another Server](../../relational-databases/databases/manage-metadata-when-making-a-database-available-on-another-server.md).

### Migrate user databases

After you recreate the system objects on the new  SQL Server 
 environment, migrate the user databases from the existing system to the new  SQL Server 
 instance in a way that minimizes downtime on the existing system. You can accomplish the database migration either by using backup and restore, or by repointing LUNs if you're in a SAN environment.

For more information about using backup and restore on Linux, see [Back up and restore SQL Server databases on Linux](../business-continuity/backup-restore/database-backup-restore.md).

### Point to the new instance

After migrating user databases, point users to the new  SQL Server 
 instance using one of several methods (for example, renaming the server, using a DNS entry, and modifying connection strings). Compared to an in-place upgrade, migrating to a new instance reduces risk and downtime, and gives you an opportunity to upgrade hardware and the operating system at the same time.

## Related content

- [Migrate databases and structured data to SQL Server on Linux](../migrate/overview.md)
- [Migrate a SQL Server database from Windows to Linux using backup and restore](../migrate/restore-database.md)
- [Back up and restore SQL Server databases on Linux](../business-continuity/backup-restore/database-backup-restore.md)
- [Create and configure an availability group for SQL Server on Linux](../business-continuity/availability-groups/create.md)
