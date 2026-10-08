---
title: What Is SQL Server?
description: An overview of the relational database engine and components of SQL Server
author: rwestMSFT
ms.author: randolphwest
ms.date: 03/09/2026
ms.service: sql
ms.subservice: release-landing
ms.topic: overview
ms.custom:
  - build-2025
---

# What is SQL Server?


**Applies to:**
 

](sql-docs-navigation-guide.md#applies-to)
 

 Microsoft 
  SQL Server 
 is a relational database management system (RDBMS). Applications and tools connect to a  SQL Server 
 *instance* or *database*, and communicate using [Transact-SQL](../t-sql/language-reference.md) (T-SQL).

 SQL Server 
 is one of many products and platforms that runs the [Microsoft SQL Database Engine](../database-engine/sql-database-engine.md).

## Deployment options

You can install  SQL Server 
 on Windows or [Linux](../linux/sql-server-linux-overview.md), deploy it in [a Linux container](../linux/sql-server-linux-overview.md#container-images), or deploy it on [Azure Virtual Machines](https://learn.microsoft.com/azure/azure-sql/virtual-machines/windows/sql-server-on-azure-vm-iaas-what-is-overview) or other virtual machine platform. You previously might have referred to this as the *boxed product*.

Supported versions of  SQL Server 
 depend on your license agreement, but for the purposes of this documentation, we mean  SQL Server 2016 (13.x) 
 and later versions. Documentation for  SQL Server 2014 (12.x)
 and previous versions is available at [Previous versions of SQL Server documentation](previous-versions-sql-server.md). To find out which versions of  SQL Server 
 are currently supported, see [SQL Server end of support options](end-of-support/sql-server-end-of-support-overview.md).

The underlying  SQL Server Database Engine 
 is also used by the following products and services:

- [ Azure SQL Database
](https://learn.microsoft.com/azure/azure-sql/database/sql-database-paas-overview)
- [SQL database in Microsoft Fabric
](https://learn.microsoft.com/fabric/database/sql/overview)
- [Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/sql-managed-instance-paas-overview)
- [Microsoft Fabric Data Warehouse
](https://learn.microsoft.com/fabric/data-warehouse/data-warehousing) and the SQL analytics endpoint
 in Microsoft Fabric


Older products:

- [Analytics Platform System](https://learn.microsoft.com/previous-versions/sql/analytics-platform-system/home-analytics-platform-system-aps-pdw)
- [ Azure Synapse Analytics ](https://learn.microsoft.com/azure/synapse-analytics/overview-what-is)
- [Azure SQL Edge](https://learn.microsoft.com/azure/azure-sql-edge/overview)

For a list of features supported by the editions of  SQL Server 
 on Windows, see:

- [Editions and supported features of SQL Server 2025](editions-and-components-of-sql-server-2025.md)
- [Editions and supported features of SQL Server 2022](editions-and-components-of-sql-server-2022.md)
- [Editions and supported features of SQL Server 2019](editions-and-components-of-sql-server-2019.md)
- [Editions and supported features of SQL Server 2017](editions-and-components-of-sql-server-2017.md)


## SQL Server components and technologies

This section describes some of the key technologies available in  SQL Server 
.

| Component | Description |
| --- | --- |
| **Database Engine** | The  Database Engine |
 | is the core service for storing, processing, and securing data. The  Database Engine |
 | provides controlled access and transaction processing to meet the requirements of the most demanding data consuming applications within your enterprise. The  Database Engine |
 | also provides rich support for sustaining business continuity through [Business continuity and database recovery](../database-engine/sql-server-business-continuity-dr.md). |
| **Machine&nbsp;Learning Services (MLS)** | [SQL Server Machine Learning Services](../machine-learning/sql-server-machine-learning-services.md) supports integration of machine learning, using the popular R and Python languages, into enterprise workflows.<br /><br />Machine Learning Services (In-Database) integrates R and Python with  SQL Server |
| , making it easy to build, retrain, and score models by calling stored procedures. Machine Learning Server provides enterprise-scale support for R and Python, without requiring  SQL Server |
| . |
| **Integration Services (SSIS)** | [SQL Server Integration Services](../integration-services/sql-server-integration-services.md) is a platform for building high performance data integration solutions, including packages that provide extract, transform, and load (ETL) processing for data warehousing. |
| **Analysis Services (SSAS)** | [SQL Server Analysis Services](https://learn.microsoft.com/analysis-services/ssas-overview) is an analytical data platform and toolset for personal, team, and corporate business intelligence. Servers and client designers support traditional OLAP solutions, new tabular modeling solutions, as well as self-service analytics and collaboration using  Power Pivot |
| , Excel, and a SharePoint Server environment.  Analysis Services |
 | also includes Data Mining so that you can uncover the patterns and relationships hidden inside large volumes of data. |
| **Reporting Services (SSRS)** | [SQL Server Reporting Services](../reporting-services/create-deploy-and-manage-mobile-and-paginated-reports.md) delivers enterprise, Web-enabled reporting functionality. You can create reports that draw content from various data sources, publish reports in various formats, and centrally manage security and subscriptions. |
| Starting in  SQL Server 2025 (17.x) |
| , on-premises reporting services is consolidated under [Power BI Report Server](https://learn.microsoft.com/power-bi/report-server/get-started). For more information, see [Reporting Services consolidation FAQ](../reporting-services/reporting-services-consolidation-faq.md). |
| **Replication** | [SQL Server Replication](../relational-databases/replication/sql-server-replication.md) is a set of technologies for copying and distributing data and database objects from one database to another, and then synchronizing between databases to maintain consistency. By using replication, you can distribute data to different locations and to remote or mobile users with local and wide area networks, dial-up connections, wireless connections, and the Internet. |
| **Data Quality Services (DQS)** <sup>1</sup> | [Data Quality Services](../data-quality-services/data-quality-services.md) provides you with a knowledge-driven data cleansing solution. DQS enables you to build a knowledge base, and then use that knowledge base to perform data correction and deduplication on your data, using both computer-assisted and interactive means. You can use cloud-based reference data services, and you can build a data management solution that integrates DQS with  SQL Server |
 | Integration Services and Master Data Services. |
| **Master Data Services (MDS)** <sup>1</sup> | [Master Data Services](../master-data-services/master-data-services-overview-mds.md) is the  SQL Server |
 | solution for master data management. A solution built on  Master Data Services |
 | helps ensure that reporting and analysis are based on the right information. Using  Master Data Services |
| , you create a central repository for your master data and maintain an auditable, securable record of that data as it changes over time. |

<sup>1</sup> This feature is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support this feature in  SQL Server 2022 (16.x) 
 and earlier versions.

## Fundamental concepts

This table provides links to fundamental concepts in  SQL Server 
 and Azure SQL.

| Area | More information |
| --- | --- |
| **Data files** and the **transaction log** | - [Database files and filegroups](../relational-databases/databases/database-files-and-filegroups.md)<br />- [System Databases](../relational-databases/databases/system-databases.md)<br />- [The transaction log](../relational-databases/logs/the-transaction-log-sql-server.md) |
| **Database compatibility levels** | - [Compatibility certification](../database-engine/install-windows/compatibility-certification.md)<br />- [View or change the compatibility level of a database](../relational-databases/databases/view-or-change-the-compatibility-level-of-a-database.md)<br />- [ALTER DATABASE (Transact-SQL) compatibility level](../t-sql/statements/alter-database-transact-sql-compatibility-level.md) |
| **Tables** and **views** | - [Tables](../relational-databases/tables/tables.md)<br />- [Views](../relational-databases/views/views.md) |
| **Functions** and **stored procedures** | - [What are the SQL database functions?](../t-sql/functions/functions.md)<br />- [Stored procedures (Database Engine)](../relational-databases/stored-procedures/stored-procedures-database-engine.md) |
| **Indexes** | - [Indexes](../relational-databases/indexes/indexes.md)<br />- [Index architecture and design guide](../relational-databases/sql-server-index-design-guide.md) |
| Configure **cost threshold for parallelism**<br />and **maximum degree of parallelism** | - [Server configuration: cost threshold for parallelism](../database-engine/configure-windows/configure-the-cost-threshold-for-parallelism-server-configuration-option.md)<br />- [Server configuration: max degree of parallelism](../database-engine/configure-windows/configure-the-max-degree-of-parallelism-server-configuration-option.md) |
| **Memory management** | - [Server memory configuration options](../database-engine/configure-windows/server-memory-server-configuration-options.md)<br />- [Memory management architecture guide](../relational-databases/memory-management-architecture-guide.md) |
| **Checkpoints**, **startup**, and **crash recovery** | - [Database checkpoints](../relational-databases/logs/database-checkpoints-sql-server.md)<br />- [Accelerated database recovery](../relational-databases/accelerated-database-recovery-concepts.md) |
| **Back up** and **restore** databases | - [Back up and restore of SQL Server databases](../relational-databases/backup-restore/back-up-and-restore-of-sql-server-databases.md)<br />- [Transaction log backups](../relational-databases/backup-restore/transaction-log-backups-sql-server.md) |
| **Manage SQL Server services** | - [Manage the Database Engine services](../database-engine/configure-windows/manage-the-database-engine-services.md)<br />- [SQL Server Configuration Manager](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/sql-server-configuration-manager.md)<br />- [Start, stop, pause, resume, and restart SQL Server services](../database-engine/configure-windows/start-stop-pause-resume-restart-sql-server-services.md)<br />- [Add Features to an Instance of SQL Server (Setup)](../database-engine/install-windows/add-features-to-an-instance-of-sql-server-setup.md) |
| **Database console commands** (DBCC) | - [DBCC](../t-sql/database-console-commands/dbcc-transact-sql.md)<br />- [DBCC HELP](../t-sql/database-console-commands/dbcc-help-transact-sql.md)<br />- [DBCC CHECKDB](../t-sql/database-console-commands/dbcc-checkdb-transact-sql.md) |
| **High availability** (HA) and **disaster recovery** (DR) | - [Business continuity and database recovery](../database-engine/sql-server-business-continuity-dr.md)<br />- [About log shipping](../database-engine/log-shipping/about-log-shipping-sql-server.md)<br />- [Failover Clustering and Always On Availability Groups](../database-engine/availability-groups/windows/failover-clustering-and-always-on-availability-groups-sql-server.md)<br />- [What is an Always On availability group?](../database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server.md) |
| **Query processing** and **performance tuning** | - [Tune performance with the Query Store](../relational-databases/performance/tune-performance-with-the-query-store.md)<br />- [Query processing architecture guide](../relational-databases/query-processing-architecture-guide.md)<br />- [Optimized locking](../relational-databases/performance/optimized-locking.md)<br />- [Transaction locking and row versioning guide](../relational-databases/sql-server-transaction-locking-and-row-versioning-guide.md) |

## Connect to SQL Server

- [Connect to the Database Engine](connect-to-database-engine.md)
- [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/ssms/sql-server-management-studio-ssms)
- [MSSQL extension for Visual Studio Code](../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md)

## Azure integration

Although  SQL Server 
 is a standalone product, which can be installed on computers running Windows and Linux operating systems, you can integrate your  SQL Server 
 instances with several Azure services.

### Azure Virtual Machines

[SQL Server on Azure Virtual Machines](https://learn.microsoft.com/azure/azure-sql/virtual-machines/windows/sql-server-on-azure-vm-iaas-what-is-overview) enables you to use full versions of  SQL Server 
 in the cloud without having to manage any on-premises hardware.  SQL Server 
 virtual machines (VMs) also simplify licensing costs when you pay as you go.

Azure virtual machines run in many different geographic regions around the world. They also offer various machine sizes. The virtual machine image gallery allows you to create a  SQL Server 
 VM with the right version, edition, and operating system. This makes virtual machines a good option for many different  SQL Server 
 workloads.

### Azure Arc

[SQL Server enabled by Azure Arc](azure-arc/overview.md) simplifies governance and management by delivering a consistent multicloud and on-premises management platform. Azure Arc provides a centralized, unified way to manage your entire environment together, combining existing non-Azure and/or on-premises virtual machines, Kubernetes clusters, and databases into Azure Resource Manager.

You can use Azure services and management capabilities, introduce DevOps practices to support new cloud native patterns in your environment, and configure custom locations as an abstraction layer on top of Azure Arc-enabled Kubernetes clusters and cluster extensions, regardless of where your resources live.

### Azure Kubernetes Service (AKS)

[Azure Kubernetes Service](https://learn.microsoft.com/azure/aks/intro-kubernetes) (AKS) is a managed Kubernetes service for deploying and managing container clusters. With  SQL Server 
 on Linux containers, you can [deploy a SQL Server Linux container to AKS using Helm charts](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-containers-deploy-helm-charts-kubernetes.md).

> **Note:**  
> You can also set up [SQL Managed Instance enabled by Azure Arc](https://learn.microsoft.com/azure/azure-arc/data/managed-instance-overview) on a Kubernetes infrastructure of your choice, which allows you to manage the service in Azure while your data stays in the location you prefer.

## Migrate and move data

 SQL Server 
 provides many opportunities to migrate and modernize your data estate.

<a id="migrating-to-the-cloud"></a>

### Migrate to the cloud

- [Migrate SQL Server workloads (FAQ)](https://learn.microsoft.com/azure/azure-sql/migration-guides/modernization)
- [Import and Export Data with the SQL Server Import and Export Wizard](../integration-services/import-export-data/import-and-export-data-with-the-sql-server-import-and-export-wizard.md)
- [Azure Database Migration Guides](https://learn.microsoft.com/data-migration/)

<a id="migrating-to-sql-server"></a>

### Migrate to SQL Server

- [Migrate databases and structured data to SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-migrate-overview.md) <sup>1</sup>
- [SQL Server migration component in SQL Server Management Studio](https://learn.microsoft.com/ssms/migrate-sql-server-component)
- [Import data from Excel to SQL Server or Azure SQL Database](../relational-databases/import-export/import-data-from-excel-to-sql.md)
- [SQL Server Migration Assistant](../ssma/sql-server-migration-assistant.md)

<sup>1</sup>  SQL Server 2017 (14.x) 
 and later versions.

## Update your version of SQL Server

- [Latest updates and version history for SQL Server](https://learn.microsoft.com/troubleshoot/sql/releases/download-and-install-latest-updates)

## Samples

- [Wide World Importers sample databases](../samples/wide-world-importers-what-is.md)
- [AdventureWorks sample databases](../samples/adventureworks-install-configure.md)
- [SQL Server samples on GitHub](https://github.com/Microsoft/sql-server-samples)


##  Get help

- [Ideas for SQL: Have suggestions for improving SQL Server?](https://feedback.azure.com/forums/908035-sql-server)
- [Microsoft Q & A (SQL Server)](https://learn.microsoft.com/answers/products/sql-server)
- [DBA Stack Exchange (tag sql-server): Ask SQL Server questions](https://dba.stackexchange.com/questions/tagged/sql-server)
- [Stack Overflow (tag sql-server): Answers to SQL development questions](https://stackoverflow.com/questions/tagged/sql-server)
- [Microsoft SQL Server License Terms and Information](https://www.microsoft.com/licensing/product-licensing/sql-server)
- [Support options for business users](https://support.microsoft.com/support-for-business)
- [Additional SQL Server help and feedback](sql-server-get-help.md)

##  Contribute to SQL documentation

Did you know that you can edit SQL content yourself? If you do so, not only do you help improve our documentation, but you also get credited as a contributor to the page.

For more information, see [Edit Microsoft Learn documentation](sql-server-docs-contribute.md).



## Related content

- [SQL Server installation guide](../database-engine/install-windows/install-sql-server.md)
- [Installation guidance for SQL Server on Linux](../linux/install-upgrade/setup.md)
- [Configure and customize SQL Server Linux containers](../linux/containers/configure.md)
- [Server configuration options](../database-engine/configure-windows/server-configuration-options-sql-server.md)
