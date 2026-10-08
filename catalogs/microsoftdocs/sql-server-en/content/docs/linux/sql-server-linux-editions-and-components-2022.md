---
title: "Editions and Supported Features of SQL Server 2022 - Linux"
description: This article describes editions, features, and components supported by the various editions of SQL Server 2022 on Linux.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: amitkh, atsingh
ms.date: 11/27/2025
ms.service: sql
ms.subservice: linux
ms.topic: concept-article
ms.custom:
  - linux-related-content
  - build-2025
helpviewer_keywords:
  - "Enterprise Edition [SQL Server]"
  - "Developer Edition [SQL Server]"
  - "default components"
  - "installing SQL Server, components"
  - "Setup [SQL Server], components"
  - "SQL Server, editions"
  - "SQL Server, components"
  - "editions [SQL Server]"
  - "versions [SQL Server]"
  - "Setup [SQL Server], editions"
  - "SQL Server Installation Wizard"
  - "components [SQL Server]"
  - "Standard Edition [SQL Server]"
  - "installing SQL Server, editions"
  - "editions [SQL Server], about edition options"
  - "Setup [SQL Server]"
---
# Editions and supported features of SQL Server 2022 on Linux


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


This article provides details of features supported by the various editions of  SQL Server 2022 (16.x) 
 on Linux.

For editions and supported features of  SQL Server 
 on Windows, see [Editions and supported features of SQL Server 2022](../sql-server/editions-and-components-of-sql-server-2022.md). For more information on what's new in  SQL Server 2022 (16.x) 
 on Windows, see [What's new in SQL Server 2022](../sql-server/what-s-new-in-sql-server-2022.md).

Installation requirements vary based on your application needs. The different editions of  SQL Server 
 accommodate the unique performance, runtime, and price requirements of organizations and individuals. The  SQL Server 
 components that you install also depend on your specific requirements. The following sections help you understand how to make the best choice among the editions and components available in  SQL Server 
.

For more information, see [Release information for SQL Server on Linux](sql-server-linux-release-notes.md).

For a list of  SQL Server 
 features not available on Linux, see [Unsupported features and services](#unsupported-features-and-services).

## Try SQL Server

- [Download SQL Server 2022](https://www.microsoft.com/sql-server/sql-server-2022)

## SQL Server editions

The following table describes the editions of  SQL Server 
.

| Edition | Definition |
| --- | --- |
| **Enterprise**&nbsp;<sup>1</sup> | The premier offering,  SQL Server |
 | Enterprise edition delivers comprehensive high-end datacenter capabilities with blazing-fast performance, unlimited virtualization <sup>1</sup>, and end-to-end business intelligence, enabling high service levels for mission-critical workloads and end-user access to data insights. |
| **Standard** | SQL Server |
 | Standard edition delivers a balance of performance, security, and affordability for businesses that need enterprise-class capabilities without the complexity. This edition empowers growing businesses with enterprise-grade performance, business intelligence capabilities, and hybrid flexibility. |
| **Web** <sup>2</sup> | SQL Server |
 | Web edition is a low total-cost-of-ownership option for Web hosters (including choosing Web edition on IaaS on Azure) and Web VAPs to provide scalability, affordability, and manageability capabilities for small to large-scale Web properties. |
| **Developer** | SQL Server |
 | Developer edition lets developers build any kind of application on top of  SQL Server |
| . It includes all the functionality of **Enterprise edition**, but is licensed for use as a development and test system, not as a production server.  SQL Server |
 | Developer edition is an ideal choice for people who build and test applications. |
| **Evaluation** | SQL Server |
 | Evaluation edition includes all the functionality of **Enterprise edition**. An evaluation deployment is available for 180 days. For more information, see [SQL Server Licensing Resources and Documents](https://www.microsoft.com/licensing/docs/view/SQL-Server). |
| **Express** <sup>3</sup> | SQL Server Express |
 | edition is the entry-level, free database, ideal for learning and building desktop and small server data-driven applications. It's the best choice for independent software vendors, developers, and hobbyists building client applications. If you need more advanced database features,  SQL Server |
 | Express can be seamlessly upgraded to other higher end editions of  SQL Server |
| . <br /><br /> SQL Server |
 | Express LocalDB is a lightweight version of Express edition that has all its programmability features, runs in user mode and has a fast, zero-configuration installation and a short list of prerequisites. |

<sup>1</sup> Enterprise edition offers unlimited virtualization for customers with [Software Assurance](https://www.microsoft.com/licensing/licensing-programs/software-assurance-default). Deployments must comply with the licensing guide. For more information, see [SQL Server Licensing Resources and Documents](https://www.microsoft.com/licensing/docs/view/SQL-Server).

<sup>2</sup> Web edition isn't available in  SQL Server 2025 (17.x) 
 and later versions.

<sup>3</sup> Starting with  SQL Server 2025 (17.x) 
, Express edition includes all the functionality that was available in  SQL Server 
 Express edition with Advanced Services.


## Use SQL Server with client/server applications

You can install just the  SQL Server 
 client components on a computer running client/server applications that connect directly to an instance of  SQL Server 
. A client components installation is also a good option if you administer an instance of  SQL Server 
 on a database server, or if you plan to develop  SQL Server 
 applications.

## SQL Server components

 SQL Server 2022 (16.x) 
 on Linux supports the  SQL Server Database Engine 
. The following table describes the features in the  Database Engine 
.

| Server components | Description |
| --- | --- |
| SQL Server Database Engine | SQL Server Database Engine |
 | includes the  Database Engine |
| , the core service for storing, processing, and securing data, replication, Full-Text Search, tools for managing relational and XML data, and in-database analytics integration. |

### Developer, Enterprise Core, and Evaluation editions

For features supported by Developer, Enterprise Core, and Evaluation editions, see features listed for the SQL Server Enterprise edition in the following tables.

The Developer edition continues to support only one client for [SQL Server Distributed Replay](../tools/distributed-replay/sql-server-distributed-replay.md).

## Scale limits

| Feature | Enterprise | Standard | Web | Express |
| --- | :---: | :---: | :---: | :---: |
| Maximum compute capacity used by a single instance - SQL Server Database Engine <sup>1</sup> | Operating system maximum | Limited to the lesser of 4 sockets or 24 cores | Limited to the lesser of 4 sockets or 16 cores | Limited to the lesser of 1 socket or 4 cores |
| Maximum memory for buffer pool per instance of SQL Server Database Engine | Operating system maximum | 128&nbsp;GB | 64&nbsp;GB | 1,410&nbsp;MB |
| Maximum memory for columnstore segment cache per instance of SQL Server Database Engine | Unlimited memory | 32&nbsp;GB | 16&nbsp;GB | 352&nbsp;MB |
| Maximum memory-optimized data size per database in SQL Server Database Engine | Unlimited memory | 32&nbsp;GB | 16&nbsp;GB | 352&nbsp;MB |
| Maximum relational database size | 524&nbsp;PB | 524&nbsp;PB | 524&nbsp;PB | 10&nbsp;GB |

<sup>1</sup> Enterprise edition with Server + Client Access License (CAL) based licensing (not available for new agreements) is limited to a maximum of 20 cores per SQL Server instance. There are no limits under the Core-based Server Licensing model. For more information, see [Compute capacity limits by edition of SQL Server](../sql-server/compute-capacity-limits-by-edition-of-sql-server.md).

<a id="rdbms-high-availability"></a>

## High availability

| Feature | Enterprise | Standard | Web | Express |
| --- | :---: | :---: | :---: | :---: |
| Log shipping | Yes | Yes | Yes | No |
| Backup compression | Yes | Yes | No | No |
| Database snapshot | Yes | Yes | No | No |
| Always On failover cluster instances <sup>1</sup> | Yes | Yes | No | No |
| Always On availability groups <sup>2</sup> | Yes | No | No | No |
| Basic availability groups <sup>3</sup> | No | Yes | No | No |
| Minimum replica commit availability group | Yes | Yes | No | No |
| Clusterless availability group | Yes | Yes | No | No |
| Online page and file restore | Yes | No | No | No |
| Online indexing | Yes | No | No | No |
| Resumable online index rebuilds | Yes | No | No | No |
| Online schema change | Yes | No | No | No |
| Fast recovery | Yes | No | No | No |
| Mirrored backups | Yes | No | No | No |
| Hot add memory and CPU | Yes | No | No | No |
| Encrypted backup | Yes | Yes | No | No |
| Hybrid backup to Azure (backup to URL) | Yes | Yes | No | No |

<sup>1</sup> On Enterprise edition, the number of nodes is the operating system maximum. On Standard edition, there's support for two nodes.

<sup>2</sup> On Enterprise edition, provides support for up to 8 secondary replicas - including 2 synchronous secondary replicas.

<sup>3</sup> Standard edition supports basic availability groups. A basic availability group supports two replicas, with one database. For more information about basic availability groups, see [Basic Always On availability groups for a single database](../database-engine/availability-groups/windows/basic-availability-groups-always-on-availability-groups.md).

## Scalability and performance

| Feature | Enterprise | Standard | Web | Express |
| --- | :---: | :---: | :---: | :---: |
| Columnstore <sup>1</sup> | Yes | Yes | Yes | Yes |
| Large object binaries in clustered columnstore indexes | Yes | Yes | Yes | Yes |
| Online nonclustered columnstore index rebuild | Yes | No | No | No |
| In-Memory OLTP <sup>1</sup> | Yes | Yes | Yes | Yes |
| Persistent main memory | Yes | Yes | Yes | Yes |
| Table and index partitioning | Yes | Yes | Yes | Yes |
| Data compression | Yes | Yes | Yes | Yes |
| Resource governor | Yes | No | No | No |
| Partitioned table parallelism | Yes | No | No | No |
| NUMA aware large page memory and buffer array allocation | Yes | No | No | No |
| I/O resource governance | Yes | No | No | No |
| Delayed durability | Yes | Yes | Yes | Yes |
| Bulk insert improvements | Yes | Yes | Yes | Yes |

<sup>1</sup> In-Memory OLTP data size and columnstore segment cache are limited to the amount of memory specified by edition in the [Scale limits](#scale-limits) section. The max degree of parallelism is limited. The degree of process parallelism (DOP) for an index build is limited to 2 DOP for the Standard edition and 1 DOP for the Web and Express editions. This refers to columnstore indexes created over disk-based tables and memory-optimized tables.

## Intelligent query processing

| Feature | Enterprise | Standard | Web | Express |
| --- | :---: | :---: | :---: | :---: |
| Automatic tuning | Yes | No | No | No |
| Batch mode adaptive joins | Yes | No | No | No |
| Batch mode memory grant feedback | Yes | No | No | No |
| Interleaved execution for multi-statement table valued functions | Yes | Yes | Yes | Yes |

## Security

| Feature | Enterprise | Standard | Web | Express |
| --- | :---: | :---: | :---: | :---: |
| Row-level security | Yes | Yes | Yes | Yes |
| Always Encrypted | Yes | Yes | Yes | Yes |
| Dynamic data masking | Yes | Yes | Yes | Yes |
| Basic auditing | Yes | Yes | Yes | Yes |
| Fine-grained auditing | Yes | Yes | Yes | Yes |
| Transparent data encryption (TDE) | Yes | Yes | No | No |
| Extensible Key Management (EKM) using Azure Key Vault <sup>1</sup> | Yes | Yes | Yes | Yes |
| User-defined roles | Yes | Yes | Yes | Yes |
| Contained databases | Yes | Yes | Yes | Yes |
| Encryption for backups | Yes | Yes | No | No |

<sup>1</sup> EKM using Azure Key Vault is available for  SQL Server 
 on Linux, starting with  SQL Server 2022 (16.x) 
 CU 12. For more information, see [Set up SQL Server TDE Extensible Key Management by using Azure Key Vault](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/security/encryption/setup-steps-for-extensible-key-management-using-the-azure-key-vault.md).

<a id="rdbms-manageability"></a>

## Manageability

| Feature | Enterprise | Standard | Web | Express |
| --- | :---: | :---: | :---: | :---: |
| Dedicated admin connection | Yes | Yes | Yes | Yes <sup>1</sup> |
| PowerShell scripting support | Yes | Yes | Yes | Yes |
| Support for data-tier application component operations (extract, deploy, upgrade, delete) | Yes | Yes | Yes | Yes |
| Policy automation (check on schedule and change) | Yes | Yes | Yes | No |
| Performance data collector | Yes | Yes | Yes | No |
| Standard performance reports | Yes | Yes | Yes | No |
| Plan guides and plan freezing for plan guides | Yes | Yes | Yes | No |
| Direct query of indexed views (using `NOEXPAND` hint) | Yes | Yes | Yes | Yes |
| Automatic indexed views maintenance | Yes | Yes | Yes | No |
| Distributed partitioned views | Yes | No | No | No |
| Parallel index maintenance operations | Yes | No | No | No |
| Automatic use of indexed view by query optimizer | Yes | No | No | No |
| Parallel consistency check | Yes | No | No | No |
| SQL Server Utility Control Point | Yes | No | No | No |

<sup>1</sup> With trace flag.

## Programmability

| Feature | Enterprise | Standard | Web | Express |
| --- | :---: | :---: | :---: | :---: |
| JSON | Yes | Yes | Yes | Yes |
| Query Store | Yes | Yes | Yes | Yes |
| Temporal | Yes | Yes | Yes | Yes |
| Native XML support | Yes | Yes | Yes | Yes |
| XML indexing | Yes | Yes | Yes | Yes |
| `MERGE` and upsert capabilities | Yes | Yes | Yes | Yes |
| Date and time data types | Yes | Yes | Yes | Yes |
| Internationalization support | Yes | Yes | Yes | Yes |
| Full-text and semantic search | Yes | Yes | Yes | Yes |
| Specification of language in query | Yes | Yes | Yes | Yes |
| Service Broker (messaging and queuing) | Yes | Yes | No <sup>1</sup> | No <sup>1</sup> |
| Transact-SQL endpoints | Yes | Yes | Yes | No |
| Graph | Yes | Yes | Yes | Yes |

<sup>1</sup> Client only.

## Integration Services

For information about the Integration Services (SSIS) features supported by the editions of  SQL Server 
, see [Integration Services features supported by the editions of SQL Server](../integration-services/integration-services-features-supported-by-the-editions-of-sql-server.md).

## Spatial and location services

| Feature | Enterprise | Standard | Web | Express |
| --- | :---: | :---: | :---: | :---: |
| Spatial indexes | Yes | Yes | Yes | Yes |
| Planar and geodetic data types | Yes | Yes | Yes | Yes |
| Advanced spatial libraries | Yes | Yes | Yes | Yes |
| Import/export of industry-standard spatial data formats | Yes | Yes | Yes | Yes |

## Control group (cgroup) v2 support

 SQL Server 
 detects and honors control group (cgroup) v2 constraints, starting with  SQL Server 2025 (17.x) 
 and  SQL Server 2022 (16.x) 
 Cumulative Update (CU) 20. These constraints provide fine-grained control in the Linux kernel over CPU and memory resources, and improve resource isolation in Docker, Kubernetes, and OpenShift environments.

In earlier versions, containerized deployments on Kubernetes clusters (for example, Azure Kubernetes Service v1.25+) could experience out of memory (OOM) errors because  SQL Server 
 didn't enforce memory limits defined in container specifications. Support for cgroup v2 addresses this problem.

### Check cgroup version

```bash
stat -fc %T /sys/fs/cgroup
```

The results are as follows:

| Result | Description |
| --- | --- |
| `cgroup2fs` | You use cgroup v2 |
| `cgroup` | You use cgroup v1 |

### Switch to cgroup v2

The easiest path is choosing a distribution that supports cgroup v2 out of the box.

If you need to switch manually, add the following parameter to your GRUB configuration:

```text
systemd.unified_cgroup_hierarchy=1
```

Then update GRUB. For example, on Ubuntu, run:

```bash
sudo update-grub
```

On Red Hat Enterprise Linux (RHEL), run:

```bash
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
```

### CPU limit reporting with cgroup v2

When you configure CPU limits using cgroup v2,  SQL Server 
 doesn't show the configured CPU core count in the error log. Instead, it continues to report the total number of host CPUs.

To align  SQL Server 
 scheduler and query plans (for example, parallelism decisions) with the intended CPU count defined in cgroup v2, apply the following configuration.

#### Configure processor affinity

Explicitly set  SQL Server 
 processor affinity to match the cgroup execution quota. In the following example, the cgroup quota is four CPUs on an eight-core host:

```sql
ALTER SERVER CONFIGURATION
SET PROCESS AFFINITY CPU = 0 TO 3;
```

This configuration ensures that  SQL Server 
 creates schedulers only for the intended number of CPUs. For more information, see [ALTER SERVER CONFIGURATION](../t-sql/statements/alter-server-configuration-transact-sql.md) and [Use PROCESS AFFINITY for Node and/or CPUs](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-performance-best-practices.md#use-process-affinity-for-node-andor-cpus).

#### Enable trace flag 8002 (recommended)

Enable trace flag 8002 to use soft affinity at the SQLPAL layer:

```bash
sudo /opt/mssql/bin/mssql-conf traceflag 8002 on
```

By default, schedulers are bound to specific CPUs defined in the affinity mask. Trace flag 8002 allows schedulers to move across CPUs instead, which generally improves performance while still respecting affinity and cgroup constraints. For more information, see [DBCC TRACEON - Trace Flags](../t-sql/database-console-commands/dbcc-traceon-trace-flags-transact-sql.md#tf8002).

Restart  SQL Server 
 after enabling the trace flag.

#### Expected behavior

After restart:

-  SQL Server 
 creates only the number of schedulers defined by the affinity setting (for example, four schedulers).

- The Linux kernel continues to enforce the cgroup v2 CPU execution quota.

- Query optimization and parallelism decisions are based on the intended CPU count, rather than the total host CPUs.

> **Note:**  
> The  SQL Server 
 error log might continue to display the total host CPU count. This logging and display behavior doesn't affect actual CPU usage, scheduler creation, or CPU enforcement by cgroup v2 or processor affinity.

For more information, see the following resources:

- [Quickstart: Deploy a SQL Server Linux container to Kubernetes using Helm charts](containers/kubernetes-deploy-helm-charts.md)
- [Control Group v2 (Linux Kernel documentation)](https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html)


## Unsupported features and services

The following features and services aren't available for  SQL Server 2022 (16.x) 
 on Linux.

| Area | Unsupported feature or service | Comments |
| --- | --- | --- |
| **Database engine** | Merge replication |  |
|  | Stretch DB | This feature is [deprecated](https://learn.microsoft.com/previous-versions/sql/sql-server/stretch-database/stretch-database) in  SQL Server 2022 (16.x) |
| , and isn't supported. |
|  | Distributed query with third-party connections |  |
|  | Linked servers to data sources other than  SQL Server |
 | [Install PolyBase on Linux](../relational-databases/polybase/polybase-linux-setup.md) to query other data sources from  SQL Server |
 | using T-SQL syntax. For scenarios where PolyBase isn't helpful, submit feedback to the [Microsoft Azure forum](https://feedback.azure.com/d365community/forum/04fe6ee0-3b25-ec11-b6e6-000d3a4f0da0). |
|  | System extended stored procedures (`xp_cmdshell`, etc.) | This feature is [deprecated](../relational-databases/extended-stored-procedures-programming/database-engine-extended-stored-procedures-programming.md). If you have specific requirements, submit feedback to the [Microsoft Azure forum](https://feedback.azure.com/d365community/forum/04fe6ee0-3b25-ec11-b6e6-000d3a4f0da0). |
|  | FileTable, FILESTREAM | If you have specific requirements, submit feedback to the [Microsoft Azure forum](https://feedback.azure.com/d365community/forum/04fe6ee0-3b25-ec11-b6e6-000d3a4f0da0). |
|  | CLR assemblies with the `EXTERNAL_ACCESS` or `UNSAFE` permission set |  |
|  | Buffer Pool Extension |  |
|  | Backup to URL - page blob | Backup to URL is supported for block blobs, using the [Shared Access Signature](../relational-databases/backup-restore/sql-server-backup-to-url.md#SAS). |
| **SQL Server Agent** | Subsystems: CmdExec, PowerShell, Queue Reader, SSIS, SSAS, SSRS |  |
|  | Alerts |  |
|  | Managed Backup |  |
| **High Availability** | Database mirroring | This feature is [deprecated](../database-engine/database-mirroring/database-mirroring-sql-server.md). Use Always On availability groups instead. |
| **Security** | Extensible Key Management (EKM) | Extensible Key Management using Azure Key Vault is available for SQL Server on Linux environments, starting with  SQL Server 2022 (16.x) |
 | CU 12. Follow the instructions from [Step 5: Configure SQL Server](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/security/encryption/setup-steps-for-extensible-key-management-using-the-azure-key-vault.md#step-5-configure-sql-server) onward. |
|  | Windows integrated authentication for linked servers |  |
|  | Windows integrated authentication for availability group (AG) endpoints | Create and use certificate based endpoint authentication for availability groups. For more information, see [Configure SQL Server availability group for high availability on Linux](business-continuity/availability-groups/configure.md). |
|  | Always Encrypted with secure enclaves |  |
|  | TLS 1.3 |  |
|  | SQL Server on Linux deployments aren't FIPS compliant |  |
| **Services** | SQL Server Browser | The SQL Server Browser service isn't required on Linux because only a single default instance is supported per host. Unlike on Windows, there are no named instances to resolve, and the port is explicitly configured during setup. |
|  | SQL Server R services | SQL Server R is supported within  SQL Server |
| , but  SQL Server |
 | R services as a separate package isn't supported.<br /><br />You can install Machine Learning Services on Linux for [SQL Server 2019](install-upgrade/setup-machine-learning.md) and [SQL Server 2022](install-upgrade/setup-machine-learning-sql-2022.md). |
|  | Analysis Services |  |
|  | Reporting Services | [Configure Power BI Report Server catalog databases for SQL Server on Linux](configure/power-bi-report-server-catalog.md). Run  SQL Server |
 | Reporting Services (SSRS) on Windows, and host the catalog databases for SSRS on  SQL Server |
 | on Linux deployments. |
|  | Data Quality Services | Deprecated feature. |
|  | Master Data Services | Deprecated feature. |

> **Note:**  
> The latest  SQL Server 2022 (16.x) 
 features that depend on Azure Arc agent, including Microsoft Entra Authentication (previously known as Azure Active Directory authentication), Microsoft Purview, Pay-as-you-go (PAYG) for SQL Server, and Defender integration, are currently not supported for SQL Server deployed in containers. 
 SQL Server 
 enabled by Azure Arc [doesn't support SQL Server running in containers](../sql-server/azure-arc/overview.md#unsupported-configurations).

For a list of features supported by the editions of  SQL Server 
 on Windows, see:

- [Editions and supported features of SQL Server 2025](../sql-server/editions-and-components-of-sql-server-2025.md)
- [Editions and supported features of SQL Server 2022](../sql-server/editions-and-components-of-sql-server-2022.md)
- [Editions and supported features of SQL Server 2019](../sql-server/editions-and-components-of-sql-server-2019.md)
- [Editions and supported features of SQL Server 2017](../sql-server/editions-and-components-of-sql-server-2017.md)


## Related content

- [What's new in SQL Server 2022](../sql-server/what-s-new-in-sql-server-2022.md)
- [Installation guidance for SQL Server on Linux](install-upgrade/setup.md)
- [SQL Server technical documentation](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/sql-server/index.yml)
