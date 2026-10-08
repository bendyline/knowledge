---
title: "PolyBase features and limitations"
description: "PolyBase features available for SQL Server products and services, including a list of T-SQL operators supported for pushdown and known limitations."
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest, hudequei
ms.date: 01/09/2024
ms.service: sql
ms.subservice: polybase
ms.topic: concept-article
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# PolyBase features and limitations


**Applies to:**
 

 and later versions 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 





This article is a summary of PolyBase features available for  SQL Server 
 products and services.

## Feature summary for product releases

This table lists the key features for PolyBase and the products in which they're available.

| **Feature** | ** SQL Server 
** (Beginning with 2016) | **Azure SQL Database** | ** Azure Synapse Analytics ** |
| --- | --- | --- | --- |
| Query Hadoop data with  Transact-SQL  | Yes | No | No |
| Import data from Hadoop | Yes | No | No |
| Export data to Hadoop | Yes | No | No |
| Query, import from, export to Azure HDInsight | No | No | No |
| Push down query computations to Hadoop | Yes | No | No |
| Import data from Azure Blob storage | Yes | Yes <sup>1</sup> | Yes |
| Export data to Azure Blob storage | Yes | No | Yes |
| Import data from Azure Data Lake Store | No | No | Yes |
| Export data to Azure Data Lake Store | No | No | Yes |
| Run PolyBase queries from Microsoft BI tools | Yes | No | Yes |

<sup>1</sup> Introduced in  SQL Server 2017 (14.x) 
, see [Examples of bulk access to data in Azure Blob Storage](../import-export/examples-of-bulk-access-to-data-in-azure-blob-storage.md).

## Known limitations

PolyBase has the following limitations:

- Before  SQL Server 2019 (15.x) 
, the maximum possible row size, which includes the full length of variable length columns, can't exceed 32 KB in  SQL Server 
 or 1 MB in  Azure Synapse Analytics . In  SQL Server 2019 (15.x) 
 and later versions, this limitation is lifted. The limit remains 1 MB for Hadoop data sources, but is limited only by the maximum  SQL Server 
 limit for other data sources.

- When data is exported into an ORC file format from  SQL Server 
 or  Azure Synapse Analytics , text-heavy columns might be limited. They can be limited to as few as 50 columns because of Java out-of-memory error messages. To work around this issue, export only a subset of the columns.

- PolyBase can't connect to any Hadoop instance if Knox is enabled.

- If you use Hive tables with transactional = true, PolyBase can't access the data in the Hive table's directory.

- PolyBase services require SQL Server service to have TCP/IP network protocol enabled to function correctly. Additionally, if TCP/IP Protocol configuration setting **Listen All** is set to **No**, the following TCP/IP configurations are required:
  - An entry for the correct listener port in either **TCP Dynamic Ports** or **TCP Ports** under **IPAll**. This is required due to the way PolyBase services resolve the listener port of the SQL Server Engine.
  - Enable the desired IP address(es) in **TCP/IP Properties > IP Addresses**; otherwise, SQL Server Engine will not accept any TCP/IP connections and PolyBase services will still fail to connect to SQL Server Engine.

- PolyBase on SQL Server on Linux doesn't function if IPv6 is disabled in the kernel. For more information, see [SQL Server on Linux: Known issues](../../linux/sql-server-linux-known-issues.md#network).

- PolyBase services require Shared Memory protocol to be enabled to function properly.

- If you have a default SQL Server instance that is configured to listen on TCP port other than 1433, you can't use it as a head node in a PolyBase scale-out group. When you execute `sp_polybase_join_group`, if you pass 'MSSQLSERVER' as the instance name, SQL Server assumes port 1433 is the listener port, so the Data Movement service is unable to connect to the head node when starting.

- Oracle synonyms aren't supported for usage with PolyBase.

- UTF-8 collations aren't supported for Hadoop external data sources.

- Hadoop is no longer supported in  SQL Server 2022 (16.x) 
 and later versions.

- Server name length is bound by 15-character NetBIOS name length limitation. If you change the server name after creating it to be 16 characters or longer, PolyBase Data Movement service won't start.

- PolyBase scale-out groups are not supported with Always On availability groups.

- Databases that get installed with PolyBase (DWConfiguration, DWDiagnostics, DWQueue) must be in read-write mode in order for PolyBase to function and for Cumulative Update installations to succeed. Therefore, it is not supported to have these databases in an availability group.

## Related content

- [PolyBase overview](overview.md)
