---
title: Choose a Database Engine Upgrade Method
description: This article describes upgrade paths for the Database Engine in SQL Server, including upgrade in-place, migrate to a new installation, and a rolling upgrade.
author: rwestMSFT
ms.author: randolphwest
ms.date: 02/23/2026
ms.service: sql
ms.subservice: install
ms.topic: upgrade-and-migration-article
ms.custom:
  - sfi-image-nochange
monikerRange: ">=sql-server-2017"
---
# Choose a Database Engine upgrade method


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


There are several approaches to consider when you're planning to upgrade the  Database Engine 
 from a prior release of  SQL Server 
, in order to minimize downtime and risk. You can perform an upgrade in-place, migrate to a new installation, or perform a rolling upgrade. The following diagram helps you to choose among these approaches. Each approach in the diagram is also discussed in the article. To assist you with the decision points in the diagram, also review [Plan and test the Database Engine upgrade plan](plan-and-test-the-database-engine-upgrade-plan.md).

Diagram that shows a Database Engine Upgrade Method Decision Tree.

## Download

- To download  SQL Server 
, visit the **[Evaluation Center](https://www.microsoft.com/evalcenter/evaluate-sql-server-2022)**.

- Have an Azure account? Then go to the **[Azure Marketplace](https://azuremarketplace.microsoft.com/marketplace/apps/microsoftsqlserver.sql2019-ws2019?tab=overview)** to spin up a Virtual Machine with  SQL Server 
 Developer edition already installed.

### Azure SQL upgrade options

You might also consider upgrading your Azure SQL database, Azure SQL managed instance, or virtualizing your  SQL Server 
 environment as part of your upgrade plan. For more information about these options, see the following links:

- [SQL Server on Azure Virtual Machines overview](https://azure.microsoft.com/services/virtual-machines/sql-server/#overview)
- [Azure SQL Database](https://azure.microsoft.com/services/sql-database/)
- [What is Azure SQL?](https://learn.microsoft.com/azure/azure-sql/azure-sql-iaas-vs-paas-what-is-overview)

## Upgrade in-place

With this approach, the  SQL Server 
 Setup program upgrades the existing  SQL Server 
 installation by replacing the existing  SQL Server 
 bits with the new  SQL Server 
 bits and then upgrades each of the system and user databases.

The upgrade in-place approach is easiest, requires some amount of downtime, takes longer to fallback if a fallback is necessary, and it isn't supported for all scenarios.

For a list of features supported by the editions of  SQL Server 
 on Windows, see:

- [Editions and supported features of SQL Server 2025](../../sql-server/editions-and-components-of-sql-server-2025.md)
- [Editions and supported features of SQL Server 2022](../../sql-server/editions-and-components-of-sql-server-2022.md)
- [Editions and supported features of SQL Server 2019](../../sql-server/editions-and-components-of-sql-server-2019.md)
- [Editions and supported features of SQL Server 2017](../../sql-server/editions-and-components-of-sql-server-2017.md)


This approach is frequently used in the following scenarios:

- A development environment without a high-availability (HA) configuration.

- A non-mission critical production environment that can tolerate downtime and that is running on a recent hardware and software. The amount of downtime is dependent upon the size of your database and the speed of your I/O subsystem. Upgrading  SQL Server 2014 (12.x)
 when memory-optimized tables are in use takes some extra time. For more information, see [Plan and test the Database Engine upgrade plan](plan-and-test-the-database-engine-upgrade-plan.md).

At a high level, the steps required for an in-place upgrade of the  Database Engine 
 are as follows:

Diagram that shows a Database Engine Upgrade Non-HA In-Place Upgrade.

For detailed steps, see [Upgrade SQL Server Using the Installation Wizard (Setup)](upgrade-sql-server-using-the-installation-wizard-setup.md).

### Considerations

The  SQL Server 
 Setup program stops and restarts the  SQL Server 
 instance as part of the pre-upgrade checks.

When you upgrade  SQL Server 
, the previous  SQL Server 
 instance is overwritten and will no longer exist on your computer. Before upgrading, back up  SQL Server 
 databases and other objects associated with the previous  SQL Server 
 instance.

## Migrate to a new installation

With this approach, you maintain the current environment while you build a new  SQL Server 
 environment, frequently on new hardware and with a new version of the operating system. After installing  SQL Server 
 in the new environment, you perform several steps to prepare the new environment, so that you can migrate the existing user databases from the existing environment to the new environment and minimize downtime. These steps include migrating the following:

- **System objects:** Some applications depend on information, entities, and/or objects that are outside of the scope of a single user database. Typically, an application has dependencies on the `master` and `msdb` databases, and also on the user database. Anything stored outside of a user database that is required for the correct functioning of that database must be made available on the destination server instance. For example, the logins for an application are stored as metadata in the `master` database, and they must be re-created on the destination server. If an application or database maintenance plan depends on  SQL Server 
 Agent jobs, whose metadata is stored in the `msdb` database, you must re-create those jobs on the destination server instance. Similarly, the metadata for a server-level trigger is stored in `master`.

  When you move the database for an application to another server instance, you must re-create all the metadata of the dependent entities and objects in `master` and `msdb` on the destination server instance. For example, if a database application uses server-level triggers, just attaching or restoring the database on the new system isn't enough. The database doesn't work as expected unless you manually re-create the metadata for those triggers in the `master` database. For detailed information, see [Manage Metadata When Making a Database Available on Another Server](../../relational-databases/databases/manage-metadata-when-making-a-database-available-on-another-server.md)

- **Integration Services packages stored in `msdb`:** If you're storing packages in `msdb`, you need to either script out those packages using the [dtutil Utility](../../integration-services/dtutil-utility.md) or redeploy them to the new server. Before using the packages on the new server, you need to upgrade the packages to  SQL Server 
. For more information, see [Upgrade Integration Services Packages](../../integration-services/install-windows/upgrade-integration-services-packages.md).

- **Reporting Services encryption keys:** An important part of report server configuration is creating a backup copy of the symmetric key used for encrypting sensitive information. A backup copy of the key is required for many routine operations, and enables you to reuse an existing report server database in a new installation. For more information, see [Back up and restore SQL Server Reporting Services (SSRS) encryption keys](../../reporting-services/install-windows/ssrs-encryption-keys-back-up-and-restore-encryption-keys.md) and [Upgrade and migrate Reporting Services](../../reporting-services/install-windows/upgrade-and-migrate-reporting-services.md)

Once the new  SQL Server 
 environment has the same system objects as the existing environment, you then migrate the user databases from the existing system to the  SQL Server 
 instance in a manner that minimizes downtime on the existing system. You accomplish the database migration either using backup and restore, or by repointing LUNs if you're in a SAN environment. The steps for both methods are indicated in the following diagrams.

> **Caution:**  
> The amount of downtime is dependent upon the size of your database and the speed of your I/O subsystem. Upgrading  SQL Server 2014 (12.x)
 when memory-optimized tables are in use will take some extra time. For more information, see [Plan and test the Database Engine upgrade plan](plan-and-test-the-database-engine-upgrade-plan.md).

After migrating user databases, you point new users to the new  SQL Server 
 instance using one of several methods (for example, renaming the server, using a DNS entry, and modifying connection strings). The new installation approach reduces risk and downtime as compared to an in-place upgrade, and facilitates hardware and operating system upgrades with the upgrade to  SQL Server 
.

> **Note:**  
> If you already have a high availability (HA) solution in place or some other multiple  SQL Server 
 instance environment, go [Rolling upgrade](#rolling-upgrade). If you don't have a high availability solution in place, you can consider either temporarily configuring [Database Mirroring](../database-mirroring/setting-up-database-mirroring-sql-server.md) to further minimize downtime to facilitate this upgrade or taking this opportunity to configure an [Always On availability group](../availability-groups/windows/configuration-of-a-server-instance-for-always-on-availability-groups-sql-server.md) as a permanent HA solution.

For example, you might use this approach to upgrade:

- An installation of  SQL Server 
 on an unsupported operating system.
- An x86 (32-bit) installation of  SQL Server 
, as  SQL Server 2016 (13.x) 
 and later versions don't support x86 installations.
-  SQL Server 
 to new hardware and/or a new version of the operating system.
-  SQL Server 
 with server consolidation.
-  SQL Server 2005 (9.x) 
, as  SQL Server 2016 (13.x) 
 and later versions don't support the in-place upgrade of  SQL Server 2005 (9.x) 
. For more information, see [SQL Server end of support options](../../sql-server/end-of-support/sql-server-end-of-support-overview.md).

The steps required for a new installation upgrade vary slightly depending upon whether you're using attached storage or SAN storage.

- **Attached storage environment:** If you have a  SQL Server 
 environment using attached storage, the following diagram and the links within the diagram to guide you through the steps required for a new installation upgrade of the  Database Engine 
.

  Diagram that shows a new installation upgrade method using backup and restore for attached storage.

- **SAN storage environment:** If you have a  SQL Server 
 environment using SAN storage, the following diagram and the links within the diagram to guide you through the steps required for a new installation upgrade of the  Database Engine 
.

  Diagram that shows a new installation upgrade method using detach and attach for SAN storage.

## Rolling upgrade

A rolling upgrade is required in  SQL Server 
 solution environments involving multiple  SQL Server 
 instances that must be upgraded in a certain order to maximize uptime, minimize risk, and preserve functionality. A rolling upgrade is essentially the upgrade of multiple  SQL Server 
 instances in a particular order. You either perform an upgrade in-place on each existing  SQL Server 
 instance, or a new installation upgrade to facilitate upgrading hardware and/or the operating system as part of the upgrade project. There are several scenarios in which you need to use the rolling upgrade approach. These are documented in the following articles:

- Availability Groups: For detailed steps for performing a rolling upgrade in this environment, see [Upgrade availability group replicas](../availability-groups/windows/upgrading-always-on-availability-group-replica-instances.md)
- Failover cluster instances: For detailed steps for performing a rolling upgrade in this environment, see [Upgrade a failover cluster instance](../../sql-server/failover-clusters/windows/upgrade-a-sql-server-failover-cluster-instance.md)
- Mirrored instances: For detailed steps for performing a rolling upgrade in this environment, see [Upgrading Mirrored Instances](../database-mirroring/upgrading-mirrored-instances.md)
- Log shipping instances: For detailed steps for performing a rolling upgrade in this environment, see [Upgrade SQL Server with log shipping (Transact-SQL)](../log-shipping/upgrade-sql-server-log-shipping-transact-sql.md)
- A replication environment: For detailed steps for performing a rolling upgrade in this environment, see [Upgrade or patch replicated databases](upgrade-replicated-databases.md)
- A  SQL Server 
  Reporting Services 
 scale-out environment: For detailed steps for performing a rolling upgrade in this environment, see [Upgrade and migrate Reporting Services](../../reporting-services/install-windows/upgrade-and-migrate-reporting-services.md)
