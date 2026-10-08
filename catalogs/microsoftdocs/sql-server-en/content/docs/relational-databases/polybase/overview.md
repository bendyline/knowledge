---
title: PolyBase overview for SQL Server
description: Overview of PolyBase in SQL Server - supported connectors, version enhancements, installation steps, and upgrade guidance for data virtualization.
author: markingmyname
ms.author: maghan
ms.reviewer: hudequei, randolphwest
ms.date: 11/18/2025
ms.service: sql
ms.subservice: polybase
ms.topic: overview
ms.custom:
  - intro-overview
  - ignite-2025
f1_keywords:
  - "PolyBase"
  - "PolyBase, guide"
helpviewer_keywords:
  - "PolyBase"
  - "PolyBase, overview"
  - "Hadoop import"
  - "Hadoop export"
  - "Hadoop export, PolyBase overview"
  - "Hadoop import, PolyBase overview"
monikerRange: ">=sql-server-2017 || >=sql-server-linux-ver15 || =azure-sqldw-latest"
---

# PolyBase overview


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 



 

PolyBase enables data virtualization for  SQL Server 
.

For a detailed guide to choosing the right PolyBase approach, comparing features across SQL platforms, and building T-SQL queries with external data, see [Data virtualization with PolyBase](data-virtualization-guide.md).

## What is PolyBase?

PolyBase enables your  SQL Server 
 instance to query data with Transact-SQL (T-SQL) directly from  SQL Server 
, Oracle, Teradata, MongoDB, Hadoop clusters, Cosmos DB, and S3-compatible object storage without separately installing client connection software. You can also use the generic ODBC connector to connect to additional providers using third-party ODBC drivers. PolyBase allows T-SQL queries to join the data from external sources to relational tables in an instance of  SQL Server 
.

PolyBase also supports querying semi-structured and structured file-based data formats such as CSV, Parquet, JSON, and Delta Lake files. This enables seamless integration of file-based data into your T-SQL workflows.

A key use case for data virtualization with the PolyBase feature is to allow the data to stay in its original location and format. You can virtualize the external data through the  SQL Server 
 instance, so that it can be queried in place like any other table in  SQL Server 
. This process minimizes the need for ETL processes for data movement. This data virtualization scenario is possible with the use of PolyBase connectors.

### Supported SQL products and services

PolyBase provides these same functionalities for the following SQL products from Microsoft:

-  SQL Server 2016 (13.x) 
 and later versions (Windows)
-  SQL Server 2019 (15.x) 
 and later versions (Windows and Linux)
- Azure SQL Managed Instance, for details, review [Data virtualization with Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/data-virtualization-overview)
-  Azure SQL Database 
, for details, review [Data virtualization with Azure SQL Database (Preview)](https://learn.microsoft.com/azure/azure-sql/database/data-virtualization-overview)
-  Azure Synapse Analytics  (for dedicated SQL pools)

  - Data virtualization in  Azure Synapse Analytics  is available in two modes, PolyBase and native. For more information, see [Use external tables with Synapse SQL](https://learn.microsoft.com/azure/synapse-analytics/sql/develop-tables-external-tables).

### SQL Server 2025 PolyBase enhancements

| New to  SQL Server 2025 (17.x) 
 | Details |
| --- | --- |
| Native support for CSV, Parquet, & Delta <sup>1</sup> | PolyBase Query Service for External Data installation is no longer required to use `OPENROWSET`, `CREATE EXTERNAL TABLE`, or `CREATE EXTERNAL TABLE AS SELECT` with the following types of external data: Parquet, Delta, Azure Blob Storage (ABS), Azure Data Lake Storage (ADLS), or S3-Compatible Object storage. |
| Use generic ODBC data sources on Linux | For more information, see [Configure PolyBase to access external data with ODBC generic types](polybase-configure-odbc-generic.md). |
| [TDS 8.0 support](../security/networking/tds-8.md) | PolyBase uses a secure-by-default configuration with ODBC Driver for SQL Server version 18 and `Encrypt=Yes` (Mandatory). Unlike other SQL Server features, PolyBase allows `TrustServerCertificate=True` for self-signed certificate scenarios. To enforce TLS 1.3 and strict encryption with TDS 8.0, set `Encrypt=Strict` and `TrustServerCertificate=No`. For more information, see [CREATE EXTERNAL DATA SOURCE - CONNECTION_OPTIONS](../../t-sql/statements/create-external-data-source-transact-sql.md#connection_options--key_value_pair-2). Review [Breaking changes to Database Engine features in SQL Server 2025](../../database-engine/breaking-changes-to-database-engine-features-in-sql-server-2025.md). |
| Managed Identity | Managed Identity is available for  SQL Server 
 enabled by Azure Arc and SQL Server 2025 on Azure VMs. |

<sup>1</sup> On  SQL Server 2025 (17.x) 
, PolyBase Query Service for External Data is still required to connect with other databases. For example: SQL Server, Oracle, DB2, Teradata, MongoDB, or ODBC.

### SQL Server 2022 PolyBase enhancements

| New to  SQL Server 2022 (16.x) 
 | Details |
| --- | --- |
| S3-compatible object storage |  SQL Server 2022 (16.x) 
 adds new connector, S3-compatible object storage, using the S3 REST API. You can use both [OPENROWSET](../../t-sql/functions/openrowset-transact-sql.md) and [CREATE EXTERNAL TABLE](../../t-sql/statements/create-external-table-transact-sql.md) to query data files in S3-compatible object storage. |
| Some connectors separate from PolyBase services | The S3-compatible object storage connector, ADSL Gen2, and Azure Blob Storage, are no longer dependent of PolyBase services. PolyBase services must still run to support connectivity with Oracle, Teradata, MongoDB, and Generic ODBC. The PolyBase feature must still be installed on your SQL Server instance. |
| Parquet file format | PolyBase is now capable of querying data from Parquet files stored on S3-compatible object storage. For more information, see to [Virtualize parquet file in a S3-compatible object storage with PolyBase](polybase-virtualize-parquet-file.md). |
| Delta table format | PolyBase is now capable of querying (read-only) data from Delta Table format stored on S3-compatible object storage, Azure Storage Account V2, and Azure Data Lake Storage Gen2. For more information, see to [Virtualize delta table with PolyBase](virtualize-delta.md) |
| Create External Table as Select (CETAS) | PolyBase can now use CETAS to create an external table and then export, in parallel, the result of a  Transact-SQL  `SELECT` statement to Azure Data Lake Storage Gen2, Azure Storage Account V2, and S3-compatible object storage. For more information, see [CREATE EXTERNAL TABLE AS SELECT (CETAS)](../../t-sql/statements/create-external-table-as-select-transact-sql.md). |

For more new features of  SQL Server 2022 (16.x) 
, see [What's new in SQL Server 2022](../../sql-server/what-s-new-in-sql-server-2022.md).

> **Tip:**  
> For a tutorial of PolyBase features and capabilities in  SQL Server 2022 (16.x) 
, see [Get started with PolyBase in SQL Server 2022](polybase-get-started.md).

### PolyBase connectors

The PolyBase feature provides connectivity to the following external data sources:

| External data sources |  SQL Server 
 2016-2019 with PolyBase |  SQL Server 2022 (16.x) 
 with PolyBase |  Azure Synapse Analytics  |
| --- | --- | --- | --- |
| Oracle, MongoDB, Teradata | Read | Read | No |
| Generic ODBC | Read (Windows Only) | Read (Windows Only) | No |
| Azure Storage | Read/Write | Read/Write | Read/Write |
| Hadoop | Read/Write | No | No |
| SQL Server | Read | Read | No |
| S3-compatible object storage | No | Read/Write | No |

-  SQL Server 2022 (16.x) 
 and later versions don't support Hadoop.
-  SQL Server 2016 (13.x) 
 introduced PolyBase with support for connections to Hadoop and Azure Blob Storage.
-  SQL Server 2019 (15.x) 
 introduced more connectors, including  SQL Server 
, Oracle, Teradata, and MongoDB.
-  SQL Server 2022 (16.x) 
 introduced the S3-compatible storage connector.
-  SQL Server 2019 (15.x) 
 Cumulative update 19 introduced support for Oracle TNS.
-  SQL Server 2022 (16.x) 
 Cumulative update 2 introduced support for Oracle TNS.

Examples of external connectors include:

- [SQL Server](polybase-configure-sql-server.md)
- [Oracle](polybase-configure-oracle.md)
- [Teradata](polybase-configure-teradata.md)
- [MongoDB](polybase-configure-mongodb.md)
- [Hadoop](polybase-configure-hadoop.md) <sup>1</sup>
- [S3-compatible object storage](polybase-configure-s3-compatible.md)
- [CSV file](virtualize-csv.md)

<sup>1</sup> PolyBase supports two Hadoop providers, Hortonworks Data Platform (HDP) and Cloudera Distributed Hadoop (CDH), through SQL Server 2019. 
SQL Server support for HDFS Cloudera (CDP) and Hortonworks (HDP) external data sources has been retired, and isn't included in  SQL Server 2022 (16.x) 
 and later versions. For more information, see [Big data options on the Microsoft SQL Server platform](../../big-data-cluster/big-data-options.md).


To use PolyBase in an instance of  SQL Server 
:

1. [Install PolyBase on Windows](polybase-installation.md) or [Install PolyBase on Linux](polybase-linux-setup.md).
1. Starting with  SQL Server 2019 (15.x) 
, [enable PolyBase in sp_configure](polybase-installation.md#enable), if necessary.
1. Create an [external data source](../../t-sql/statements/create-external-data-source-transact-sql.md).
1. Create an [external table](../../t-sql/statements/create-external-table-transact-sql.md).

### Azure integration

With the underlying help of PolyBase, T-SQL queries can also import and export data from Azure Blob Storage. Further, PolyBase enables  Azure Synapse Analytics  to import and export data from Azure Data Lake Store, and from Azure Blob Storage.

## Why use PolyBase?

PolyBase lets you join data from a  SQL Server 
 instance with external data. Before PolyBase allowed joining data to external data sources, you could either:

- Transfer half your data so that all the data was in one location.
- Query both sources of data, then write custom query logic to join and integrate the data at the client level.

PolyBase lets you use Transact-SQL to join the data.

PolyBase doesn't require you to install extra software to your Hadoop environment. You query external data by using the same T-SQL syntax used to query a database table. The support actions implemented by PolyBase all happen transparently. The query author doesn't need any knowledge about the external source.

### PolyBase uses

PolyBase enables the following scenarios in  SQL Server 
:

- **Seamless data access:** Query other RDBMs or external files like CSV, Parquet, and Delta Lake tables using T-SQL as if they were native tables.
- **Off-loading cold data:** While keeping it easily accessible.
- **Enhanced productivity:** Reduce the time and effort required to integrate and analyze data from multiple sources.
- **Cost efficiency:** Minimize the need for data replication and storage costs associated with traditional data integration methods.
- **Real-time insights:** Enable real-time data querying and insights without delays caused by data movement or synchronization.
- **Security:** Use SQL Server security features for granular permissions, credential management, and control.

## Performance

There's no hard limit to the number of files or the amount of data that can be queried. Query performance depends on the amount of data, data format, the way data is organized, and complexity of queries and joins.

For more information on performance guidance and recommendations for PolyBase, see [Performance considerations in PolyBase for SQL Server](polybase-performance.md).

<a id="upgrading-to-sql-server-2022"></a>

## Upgrade to SQL Server 2022

Starting in  SQL Server 2022 (16.x) 
 Hortonworks Data Platform (HDP) and Cloudera Distributed Hadoop (CDH) are no longer supported. Due to these changes, you must manually drop PolyBase external data sources created on previous versions of SQL Server that use `TYPE = HADOOP` or Azure Storage before migrating to  SQL Server 2022 (16.x) 
 or later. Dropping external data sources also requires dropping the associated database objects, such as database scoped credentials and external tables.

Azure Storage connectors must be changed based on the following reference table:

| External data source | From | To |
| --- | --- | --- |
| Azure Blob Storage | `wasb[s]` | `abs` |
| ADLS Gen 2 | `abfs[s]` | `adls` |

## Get started

Before using PolyBase, you must [install PolyBase on Windows](polybase-installation.md) or [install PolyBase on Linux](polybase-linux-setup.md), and [enable PolyBase in sp_configure](polybase-installation.md#enable) if necessary.

For a tutorial of PolyBase features and capabilities, see [Get started with PolyBase in SQL Server 2022](polybase-get-started.md).

For more tutorials on various external data sources, review:

- [Hadoop](polybase-configure-hadoop.md)
- [Azure Blob Storage](polybase-configure-azure-blob-storage.md)
- [SQL Server](polybase-configure-sql-server.md)
- [Oracle](polybase-configure-oracle.md)
- [Teradata](polybase-configure-teradata.md)
- [MongoDB](polybase-configure-mongodb.md)
- [ODBC generic types](polybase-configure-odbc-generic.md)
- [S3-compatible object storage](polybase-configure-s3-compatible.md)
- [CSV file](virtualize-csv.md)
- [Parquet file](polybase-virtualize-parquet-file.md)
- [Delta table](virtualize-delta.md)

### Data virtualization on other platforms

Data virtualization features are also available on other platforms:

- [Use external tables with Synapse SQL](https://learn.microsoft.com/azure/synapse-analytics/sql/develop-tables-external-tables)
- [Data virtualization with Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/data-virtualization-overview)
- [Data virtualization with Azure SQL Database (Preview)](https://learn.microsoft.com/azure/azure-sql/database/data-virtualization-overview)

## Related content

- [Get started with PolyBase in SQL Server 2022](polybase-get-started.md)
- [OPENROWSET (Transact-SQL)](../../t-sql/functions/openrowset-transact-sql.md)
- [CREATE EXTERNAL TABLE (Transact-SQL)](../../t-sql/statements/create-external-table-transact-sql.md)
- [CREATE EXTERNAL TABLE AS SELECT (CETAS) (Transact-SQL)](../../t-sql/statements/create-external-table-as-select-transact-sql.md)
- [Performance considerations in PolyBase for SQL Server](polybase-performance.md)
- [Frequently asked questions in PolyBase](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/polybase/polybase-faq.yml)
- [Monitor and troubleshoot PolyBase](polybase-troubleshooting.md)
- [PolyBase Transact-SQL reference](polybase-t-sql-objects.md)
