---
title: "Upgrade or Patch Replicated Databases"
description: SQL Server supports upgrading replicated databases from previous versions of SQL Server without stopping activity on other nodes.
author: rwestMSFT
ms.author: randolphwest
ms.date: 02/26/2025
ms.service: sql
ms.subservice: install
ms.topic: upgrade-and-migration-article
helpviewer_keywords:
  - "merge replication database upgrades [SQL Server replication]"
  - "replication [SQL Server], upgrading"
  - "transactional replication, upgrading databases"
  - "snapshot replication [SQL Server], upgrading databases"
  - "upgrading replicated databases"
monikerRange: ">=sql-server-2017"
---
# Upgrade or patch replicated databases


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


 SQL Server 
 supports upgrading replicated databases from previous versions of  SQL Server 
; it isn't required to stop activity at other nodes while a node is being upgraded.

For peer-to-peer replication, see [Upgrade or patch Peer-to-peer replicated databases](upgrade-peer-to-peer-replicated-databases.md).

## Prerequisites

Ensure that you adhere to the rules regarding which versions are supported in a topology:

- A Distributor can be any version as long as it's greater than or equal to the Publisher version (in many cases the Distributor is the same instance as the Publisher).

- A Publisher can be any version as long as it less than or equal to the Distributor version.

- The Publisher and Distributor must be the same product. Either both are SQL Server, or both are Azure SQL Managed Instance.

- Subscriber version depends on the type of publication:

  - A Subscriber to a transactional publication can be any version within two versions of the Publisher version. For example: a  SQL Server 2012 (11.x) 
 Publisher can have  SQL Server 2014 (12.x)
 and  SQL Server 2016 (13.x) 
 Subscribers; and a  SQL Server 2016 (13.x) 
 Publisher can have  SQL Server 2014 (12.x)
 and  SQL Server 2012 (11.x) 
 Subscribers.

  - A Subscriber to a merge publication can be all versions equal to or lower than the Publisher version, whichever is supported as per the versions life cycle support cycle.

## Upgrade paths

The upgrade path to SQL Server is different depending on the deployment pattern. SQL Server offers two upgrade paths in general:

- Side-by-side: Deploy a parallel environment and move databases along with the associated instance level objects, such as logins, jobs, etc. to the new environment.

- In-place upgrade: Allow the SQL Server installation media to upgrade the existing SQL Server installation by replacing the SQL Server bits, and upgrading the database objects. For environments running availability groups (AGs) or failover cluster instances (FCIs), an in-place upgrade is combined with a [rolling upgrade](choose-a-database-engine-upgrade-method.md#rolling-upgrade) to minimize downtime.

A common approach for side-by-side upgrades of replication topologies is to move publisher-subscriber pairs in parts to the new side-by-side environment, as opposed to a movement of the entire topology. This phased approach helps control downtime, and minimizes the impact to a certain extent for the business dependent on replication.

Most this article is scoped toward upgrading the version of SQL Server. However, the in-place upgrade process should also be used when patching SQL Server with a service pack or cumulative update as well.

## Remarks

Upgrading a replication topology is a multi-step process. We recommend attempting an upgrade of a replica of your replication topology in a test environment before running the upgrade on the actual production environment. This helps iron out any operational documentation that is required for handling the upgrade smoothly without incurring expensive and long downtimes during the actual upgrade process. You can reduce downtime significantly with the use of AGs and/or FCIs for their production environments while upgrading their replication topology. Additionally, we recommend taking backups of all the databases including `msdb`, `master`, Distribution databases, and the user databases participating in replication before attempting the upgrade.

When you have a distribution database in a failover cluster instance, make sure that all participating nodes use the same build. We don't recommend a setup in which one node is a SQL Server version earlier than  SQL Server 2016 (13.x) 
 SP2-CU3 or  SQL Server 2017 (14.x) 
 CU6 and the other node is a SQL Server version later than  SQL Server 2016 (13.x) 
 SP2-CU3 or  SQL Server 2017 (14.x) 
 CU6. Beginning in  SQL Server 2016 (13.x) 
 SP2-CU3 and  SQL Server 2017 (14.x) 
 CU6, support is added for using a distribution database in an AG and for new objects (tables, stored procedures) in distribution databases. If your distribution database is in a failover cluster instance and you're doing a phased migration (and you can't upgrade all nodes to the same version of SQL Server), for the narrow migration timeframe, we recommend that you do account tasks like adding a new subscriber, subscription, publisher, or publication on the node that has the later version of SQL Server.

> **Note:**  
> For replication topologies with a remote distributor:
> - [Replication components can fail after an upgrade to SQL Server 2025 for instances with a remote distributor](../breaking-changes-to-database-engine-features-in-sql-server-2025.md#replication-components-fail-after-an-upgrade)
> - [Adding a remote distributor to a SQL Server 2025 publisher can fail](../breaking-changes-to-database-engine-features-in-sql-server-2025.md#adding-a-remote-replication-distributor-fails)


## Replication matrix

### Transactional and snapshot replication compatibility matrix


| **Publisher** | **Distributor** | **Subscriber** |
| :--- | :--- | :--- |
| Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup> | Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup> | Azure SQL Database |
 | <br /> Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2025](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2022](#updatepolicy)</sup><br /> SQL Server 2025 (17.x) |
| <br /> SQL Server 2022 (16.x) |
 |  |
| Azure SQL Managed Instance<sup>[2025](#updatepolicy)</sup> | Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2025](#updatepolicy)</sup> | Azure SQL Database |
 | <br /> Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2025](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2022](#updatepolicy)</sup><br /> SQL Server 2025 (17.x) |
| <br /> SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
|  |
| Azure SQL Managed Instance<sup>[2022](#updatepolicy)</sup> | Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2025](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2022](#updatepolicy)</sup> | Azure SQL Database |
 | <br /> Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2022](#updatepolicy)</sup><br /> SQL Server 2025 (17.x) |
| <br /> SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
 |  |
| SQL Server 2025 (17.x) |
 | SQL Server 2025 (17.x) |
 | Azure SQL Database |
 | <br />SQL database in Microsoft Fabric |
| <sup>[1](#updatepolicy)</sup> <br /> Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2025](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2022](#updatepolicy)</sup><br /> SQL Server 2025 (17.x) |
| <br /> SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
 |  |
| SQL Server 2022 (16.x) |
 | SQL Server 2025 (17.x) |
| <br /> SQL Server 2022 (16.x) |
 | Azure SQL Database |
 | <br />SQL database in Microsoft Fabric |
| <sup>[1](#updatepolicy)</sup> <br /> Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2025](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2022](#updatepolicy)</sup><br /> SQL Server 2025 (17.x) |
| <br /> SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
 |  |
| SQL Server 2019 (15.x) |
 | SQL Server 2025 (17.x) |
| <br /> SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
 | Azure SQL Database |
| <br />  Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2025](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2022](#updatepolicy)</sup><br /> SQL Server 2025 (17.x) |
| <br /> SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
 |  |
| SQL Server 2017 (14.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
 | Azure SQL Managed Instance<sup>[2022](#updatepolicy)</sup><br /> SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
 |  |
| SQL Server 2016 (13.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
 | SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
 |  |
| SQL Server 2014 (12.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
 | SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |
| SQL Server 2012 (11.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
 | SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |
| SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 | SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |

<a id="updatepolicy"></a>

<sup>AUTD</sup> Applies to Azure SQL Managed Instance configured with the [Always-up-to-date update policy](https://learn.microsoft.com/azure/azure-sql/managed-instance/update-policy#always-up-to-date-update-policy).  
<sup>2025</sup> Applies to Azure SQL Managed Instance configured with the [SQL Server 2025 update policy](https://learn.microsoft.com/azure/azure-sql/managed-instance/update-policy#sql-server-2025-update-policy).   
<sup>2022</sup> Applies to Azure SQL Managed Instance configured with the [SQL Server 2022 update policy](https://learn.microsoft.com/azure/azure-sql/managed-instance/update-policy#sql-server-2022-update-policy).   
<sup>1</sup> Applies based on the requirements of the supported configurations for [SQL database in Microsoft Fabric](https://learn.microsoft.com/azure/azure-sql/database/replication-to-sql-database).


### Merge replication compatibility matrix


| **Publisher** | **Distributor** | **Subscriber** |
| :--- | :--- | :--- |
| SQL Server 2022 (16.x) |
 | SQL Server 2022 (16.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |
| SQL Server 2019 (15.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
 | SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |
| SQL Server 2017 (14.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
 | SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |
| SQL Server 2016 (13.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
 | SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |
| SQL Server 2014 (12.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
 | SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |
| SQL Server 2012 (11.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
 | SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |
| SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 | SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |


## Upgrade considerations

### Run the Log Reader Agent for transactional replication before upgrade

Before you upgrade  SQL Server 
, you must make sure that all committed transactions from published tables were processed by the Log Reader Agent. To make sure that all transactions are processed, perform the following steps for each database that contains transactional publications:

1. Make sure that the Log Reader Agent is running for the database. By default, the agent runs continuously.

1. Stop user activity on published tables.

1. Allow time for the Log Reader Agent to copy transactions to the distribution database, and then stop the agent.

1. Execute [sp_replcmds](../../relational-databases/system-stored-procedures/sp-replcmds-transact-sql.md) to verify that all transactions are processed. The result set from this procedure should be empty.

1. Execute [sp_replflush](../../relational-databases/system-stored-procedures/sp-replflush-transact-sql.md) to close the connection from `sp_replcmds`

1. Perform the server upgrade to the latest version of  SQL Server 
.

1. Restart  SQL Server 
 Agent and the Log Reader Agent if they don't start automatically after the upgrade.

### Run agents for merge replication after upgrade

After upgrade, run the Snapshot Agent for each merge publication and the Merge Agent for each subscription to update replication metadata. You don't have to apply the new snapshot, because it isn't necessary to reinitialize subscriptions. Subscription metadata is updated the first time the Merge Agent is run after upgrade. This means that the subscription database can remain online and active during the Publisher upgrade.

Merge replication stores publication and subscription metadata in several system tables in the publication and subscription databases. Running the Snapshot Agent updates publication metadata and running the Merge Agent updates subscription metadata. It's only required to generate a publication snapshot. If a merge publication uses parameterized filters, each partition also has a snapshot. It isn't necessary to update these partitioned snapshots.

Run the agents from  SQL Server Management Studio 
, Replication Monitor, or from the command line. For more information about running the Snapshot Agent, see the following articles:

- [Create and Apply the Initial Snapshot](../../relational-databases/replication/create-and-apply-the-initial-snapshot.md)
- [Start and Stop a Replication Agent (SQL Server Management Studio)](../../relational-databases/replication/agents/start-and-stop-a-replication-agent-sql-server-management-studio.md)
- [Create and Apply the Initial Snapshot](../../relational-databases/replication/create-and-apply-the-initial-snapshot.md)
- [Replication Agent Executables Concepts](../../relational-databases/replication/concepts/replication-agent-executables-concepts.md)

For more information about running the Merge Agent, see the following articles:

- [Synchronize a Pull Subscription](../../relational-databases/replication/synchronize-a-pull-subscription.md)
- [Synchronize a Push Subscription](../../relational-databases/replication/synchronize-a-push-subscription.md)

After upgrading  SQL Server 
 in a topology that uses merge replication, change the publication compatibility level of any publications if you want to use new features.

### Upgrade to Standard, Workgroup, or Express editions

Before upgrading from one edition of  SQL Server 
 to another, verify that the functionality you're currently using is supported in the edition to which you're upgrading. For a list of features supported by the editions in  SQL Server 
, see [Editions and supported features of SQL Server 2025](../../sql-server/editions-and-components-of-sql-server-2025.md).

## Steps to upgrade a replication topology

These steps outline the order in which servers in a replication topology should be upgraded. The same steps apply whether you're running transactional or merge replication. However, these steps don't cover Peer-to-Peer replication, queued updating subscriptions, nor immediate updating subscriptions.

### In-place upgrade

1. Upgrade the Distributor.
1. Upgrade the Publisher and the Subscriber. These can be upgraded in any order.

> **Note:**  
> For  SQL Server 2008 (10.0.x) 
 and  SQL Server 2008 R2 (10.50.x) 
, the upgrade of the publisher and subscriber must be done at the same time to align with the replication topology matrix.  SQL Server 2008 (10.0.x) 
 and  SQL Server 2008 R2 (10.50.x) 
 publishers or subscribers can't have a  SQL Server 2016 (13.x) 
 (or greater) publisher nor subscriber. If upgrading at the same time isn't possible, use an intermediate upgrade to upgrade the SQL Server instances to  SQL Server 2014 (12.x)
, and then upgrade them again to  SQL Server 2016 (13.x) 
 (or greater).

### Side by side upgrade

1. Upgrade the Distributor.
1. Reconfigure [Configure Distribution](../../relational-databases/replication/configure-distribution.md) on the new SQL Server instance.
1. Upgrade the Publisher.
1. Upgrade the Subscriber.
1. Reconfigure all Publisher-Subscriber pairs, including reinitialization of the Subscriber.

## Steps for side-by-side migration of the Distributor to Windows Server

A side-by-side upgrade is the only upgrade path available for SQL Server instances participating in a failover cluster. The following steps can be performed on either a standalone SQL Server instance, or one within a Failover Cluster Instance (FCI).

1. Set up a new SQL Server instance (either standalone, or FCI), edition, and version as your distributor on Windows Server with a different Windows cluster and SQL Server FCI name or standalone host name. You need to keep the directory structure same as the old distributor to ensure that the replication agents executables, replication folders, and database file paths are found at the same path on the new environment. This reduces any post migration/upgrade steps required.

1. Ensure that your replication is synchronized and then shut down all of the replication agents.

1. Shut down the current SQL Server Distributor instance. If this is a standalone instance, shut down the server. If this is a SQL Server FCI, then take the entire SQL Server role offline in cluster manager, including the network name.

1. Remove the DNS and Active Directory computer object entries for the old (current distributor instance) environment.

1. Change the hostname of the new server to match that of the old server.

   1. If this is a SQL Server FCI, rename the new SQL Server FCI with the same virtual server name as the old instance.

1. Copy the database files from the previous instance using SAN redirection, storage copy, or file copy.

1. Bring the new SQL Server instance online.

1. Restart all of the replication agents and verify if the agents are running successfully.

1. Validate if replication is working as expected.

1. Use the SQL Server setup media to run an in-place upgrade of your SQL Server instance to the new version of SQL Server.

> **Note:**  
> To reduce downtime, we recommend that you perform the *side-by-side migration* of the distributor as one activity, and the *in-place upgrade to  SQL Server 
* as another activity. This allows you to take a phased approach, reduce risk, and minimize downtime.

## Web synchronization for merge replication

The Web synchronization option for merge replication requires that you copy the  SQL Server 
 Replication Listener (`replisapi.dll`) to the virtual directory on the Internet Information Services (IIS) server used for synchronization. When you configure Web synchronization, the Configure Web Synchronization Wizard copies the file to the virtual directory. If you upgrade the  SQL Server 
 components installed on the IIS server, you must manually copy replisapi.dll from the COM directory to the virtual directory on the IIS server. For more information about configuring Web synchronization, see [Configure Web Synchronization](../../relational-databases/replication/configure-web-synchronization.md).

## Restore a replicated database from an earlier version

To ensure replication settings are retained when restoring a backup of a replicated database from a previous version: restore to a server and database with the same names as the server and database at which the backup was taken.

## Related content

- [SQL Server Replication](../../relational-databases/replication/sql-server-replication.md)
- [Replication Administration FAQ](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/replication/administration/frequently-asked-questions-for-replication-administrators.yml)
- [Replication backward compatibility](../../relational-databases/replication/replication-backward-compatibility.md)
- [Supported version and edition upgrades (SQL Server 2022)](supported-version-and-edition-upgrades-2022.md)
- [Upgrade SQL Server](upgrade-sql-server.md)
- [Upgrading a Replication Topology to SQL Server 2016](https://learn.microsoft.com/archive/blogs/sql_server_team/upgrading-a-replication-topology-to-sql-server-2016)
