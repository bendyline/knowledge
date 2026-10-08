---
title: "Editions and Supported Features of SQL Server 2017 - Linux"
description: This article describes editions, features, and components supported by the various editions of SQL Server 2017 on Linux.
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
# Editions and supported features of SQL Server 2017 on Linux


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Linux


This article provides details of features supported by the various editions of  SQL Server 2017 (14.x) 
 on Linux.

For editions and supported features of  SQL Server 
 on Windows, see [Editions and supported features of SQL Server 2017](../sql-server/editions-and-components-of-sql-server-2017.md). For more information on what's new in  SQL Server 2017 (14.x) 
 on Windows, see [What's new in SQL Server 2017](../sql-server/what-s-new-in-sql-server-2017.md).

Installation requirements vary based on your application needs. The different editions of  SQL Server 
 accommodate the unique performance, runtime, and price requirements of organizations and individuals. The  SQL Server 
 components that you install also depend on your specific requirements. The following sections help you understand how to make the best choice among the editions and components available in  SQL Server 
.

For more information, see [Release information for SQL Server on Linux](sql-server-linux-release-notes.md).

For a list of  SQL Server 
 features not available on Linux, see [Unsupported features and services](#unsupported-features-and-services).

## Try SQL Server

- [Download SQL Server 2017](https://www.microsoft.com/sql-server/sql-server-2017)

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

 SQL Server 2017 (14.x) 
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
| Maximum compute capacity used by a single instance - SQL Server Database Engine <sup>1</sup> | Operating system maximum | Limited to lesser of 4 sockets or 24 cores | Limited to lesser of 4 sockets or 16 cores | Limited to lesser of 1 socket or 4 cores |
| Maximum memory for buffer pool per instance of SQL Server Database Engine | Operating system maximum | 128&nbsp;GB | 64&nbsp;GB | 1,410&nbsp;MB |
| Maximum memory for columnstore segment cache per instance of SQL Server Database Engine | Unlimited memory | 32&nbsp;GB | 16&nbsp;GB | 352&nbsp;MB |
| Maximum memory-optimized data size per database in SQL Server Database Engine | Unlimited memory | 32&nbsp;GB | 16&nbsp;GB | 352&nbsp;MB |
| Maximum relational database size | 524&nbsp;PB | 524&nbsp;PB | 524&nbsp;PB | 10&nbsp;GB |

<sup>1</sup> Enterprise edition with Server + Client Access License (CAL)-based licensing (not available for new agreements) is limited to a maximum of 20 cores per SQL Server instance. There are no limits under the Core-based Server Licensing model. For more information, see [Compute capacity limits by edition of SQL Server](../sql-server/compute-capacity-limits-by-edition-of-sql-server.md).

<a id="rdbms-high-availability"></a>

## High availability

| Feature | Enterprise | Standard | Web | Express |
| --- | :---: | :---: | :---: | :---: |
| Log shipping | Yes | Yes | Yes | No |
| Backup compression | Yes | Yes | No | No |
| Database snapshot | Yes | No | No | No |
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

<sup>2</sup> Enterprise edition supports up to 8 secondary replicas, including 2 synchronous secondary replicas.

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
| NUMA-aware large page memory and buffer array allocation | Yes | No | No | No |
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
| Interleaved execution for multi-statement table-valued functions | Yes | Yes | Yes | Yes |

## Security

| Feature | Enterprise | Standard | Web | Express |
| --- | :---: | :---: | :---: | :---: |
| Row-level security | Yes | Yes | Yes | Yes |
| Always Encrypted | Yes | Yes | Yes | Yes |
| Dynamic data masking | Yes | Yes | Yes | Yes |
| Basic auditing | Yes | Yes | Yes | Yes |
| Fine-grained auditing | Yes | Yes | Yes | Yes |
| Transparent data encryption (TDE) | Yes | No | No | No |
| User-defined roles | Yes | Yes | Yes | Yes |
| Contained databases | Yes | Yes | Yes | Yes |
| Encryption for backups | Yes | Yes | No | No |

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

For info about the Integration Services (SSIS) features supported by the editions of  SQL Server 
, see [Integration Services features supported by the editions of SQL Server](../integration-services/integration-services-features-supported-by-the-editions-of-sql-server.md).

## Spatial and location services

| Feature | Enterprise | Standard | Web | Express |
| --- | :---: | :---: | :---: | :---: |
| Spatial indexes | Yes | Yes | Yes | Yes |
| Planar and geodetic data types | Yes | Yes | Yes | Yes |
| Advanced spatial libraries | Yes | Yes | Yes | Yes |
| Import/export of industry-standard spatial data formats | Yes | Yes | Yes | Yes |

## Unsupported features and services

The following features and services aren't available for  SQL Server 2017 (14.x) 
 on Linux.

| Area | Unsupported feature or service | Comments |
| --- | --- | --- |
| **Database Engine** | Merge replication |  |
|  | Stretch DB | This feature is [deprecated](https://learn.microsoft.com/previous-versions/sql/sql-server/stretch-database/stretch-database) in  SQL Server 2022 (16.x) |
| , and isn't supported. |
|  | PolyBase | Supported on  SQL Server 2019 (15.x) |
 | and later versions. |
|  | Distributed query with third-party connections |  |
|  | Linked servers to data sources other than  SQL Server |
 | [Install PolyBase on Linux](../relational-databases/polybase/polybase-linux-setup.md) to query other data sources from  SQL Server |
| , using T-SQL syntax. For scenarios where PolyBase isn't helpful, submit feedback to the [Microsoft Azure forum](https://feedback.azure.com/d365community/forum/04fe6ee0-3b25-ec11-b6e6-000d3a4f0da0). |
|  | System extended stored procedures (`xp_cmdshell`, etc.) | This feature is [deprecated](../relational-databases/extended-stored-procedures-programming/database-engine-extended-stored-procedures-programming.md). If you have specific requirements, submit feedback to the [Microsoft Azure forum](https://feedback.azure.com/d365community/forum/04fe6ee0-3b25-ec11-b6e6-000d3a4f0da0). |
|  | FileTable, FILESTREAM | If you have specific requirements, submit feedback to the [Microsoft Azure forum](https://feedback.azure.com/d365community/forum/04fe6ee0-3b25-ec11-b6e6-000d3a4f0da0). |
|  | CLR assemblies with the `EXTERNAL_ACCESS` or `UNSAFE` permission set |  |
|  | Buffer Pool Extension |  |
|  | Backup to URL - page blob | Backup to URL is supported for block blobs, using the [Shared Access Signature](../relational-databases/backup-restore/sql-server-backup-to-url.md#SAS). |
| **SQL Server Agent** | Subsystems: CmdExec, PowerShell, Queue Reader, SSIS, SSAS, SSRS |  |
|  | Alerts |  |
|  | Log Reader Agent |  |
|  | Managed Backup |  |
| **High Availability** | Database mirroring | This feature is [deprecated](../database-engine/database-mirroring/database-mirroring-sql-server.md). Use Always On availability groups instead. |
| **Security** | Extensible Key Management (EKM) |  |
|  | Windows integrated authentication for linked servers |  |
|  | Windows integrated authentication for availability group (AG) endpoints | Create and use certificate-based endpoint authentication for availability groups. For more information, see [Configure SQL Server availability group for high availability on Linux](business-continuity/availability-groups/configure.md). |
|  | SQL Server on Linux deployments aren't FIPS compliant |  |
| **Services** | SQL Server Browser | The SQL Server Browser service isn't required on Linux because only a single default instance is supported per host. Unlike on Windows, there are no named instances to resolve, and the port is explicitly configured during setup. |
|  | SQL Server R Services | SQL Server R is supported within  SQL Server |
| , but  SQL Server |
 | R Services as a separate package isn't supported.<br /><br />You can install Machine Learning Services on Linux for [SQL Server 2019](install-upgrade/setup-machine-learning.md) and [SQL Server 2022](install-upgrade/setup-machine-learning-sql-2022.md). |
|  | Analysis Services |  |
|  | Reporting Services | On  SQL Server 2019 (15.x) |
 | and later versions, [configure Power BI Report Server catalog databases for SQL Server on Linux](configure/power-bi-report-server-catalog.md). Run  SQL Server |
 | Reporting Services (SSRS) on Windows, and host the catalog databases for SSRS on  SQL Server |
 | on Linux deployments. |
|  | Data Quality Services | Deprecated feature. |
|  | Master Data Services | Deprecated feature. |

For a list of features supported by the editions of  SQL Server 
 on Windows, see:

- [Editions and supported features of SQL Server 2025](../sql-server/editions-and-components-of-sql-server-2025.md)
- [Editions and supported features of SQL Server 2022](../sql-server/editions-and-components-of-sql-server-2022.md)
- [Editions and supported features of SQL Server 2019](../sql-server/editions-and-components-of-sql-server-2019.md)
- [Editions and supported features of SQL Server 2017](../sql-server/editions-and-components-of-sql-server-2017.md)


## Related content

- [What's new in SQL Server 2017](../sql-server/what-s-new-in-sql-server-2017.md)
- [Installation guidance for SQL Server on Linux](install-upgrade/setup.md)
- [SQL Server technical documentation](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/sql-server/index.yml)
