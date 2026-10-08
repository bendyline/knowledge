---
title: "MSdistpublishers (Transact-SQL)"
description: MSdistpublishers contains one row for each Publisher supported by the Distributor.
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 01/21/2025
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "MSdistpublishers"
  - "MSdistpublishers_TSQL"
helpviewer_keywords:
  - "MSdistpublishers system table"
dev_langs:
  - "TSQL"
ms.custom: sfi-ropc-nochange
---
# MSdistpublishers (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

The `MSdistpublishers` table contains one row for each Publisher supported by the Distributor. This table is located in the `msdb` database on the Distributor.

| Column name | Data type | Description |
| --- | --- | --- |
| `name` | **sysname** | The name of the Publisher Distributor. |
| `distribution_db` | **sysname** | The name of the distribution database. |
| `working_directory` | **nvarchar(255)** | The name of the working directory used to store data and schema files for the publication. |
| `security_mode` | **int** | The security mode implemented at the Distributor:<br /><br />`0` =  SQL Server |
 | Authentication.<br /><br />`1` = Windows Authentication. |
| `login` | **sysname** | The login ID for  SQL Server |
 | Authentication. |
| `password` | **nvarchar(524)** | The password (encrypted) for  SQL Server |
 | Authentication. |
| `active` | **bit** | Indicates whether the local Distributor is in use by the remote Publisher. |
| `trusted` | **bit** | Indicates whether the remote Publisher uses the same password as the local Distributor:<br /><br />`0` = A password is needed at the remote Publisher to connect to the Distributor.<br /><br />`1` = No password is needed. |
| `third_party` | **bit** | Whether the Publisher is an installation of  SQL Server |
| :<br /><br />`0` =  SQL Server |
 | installation.<br /><br />`1` = Heterogeneous data source. |
| `publisher_type` | **sysname** | Publisher type:<br /><br />`MSSQLSERVER` =  SQL Server |
 | Publisher.<br /><br />`ORACLE` = standard Oracle Publisher.<br /><br />`ORACLE GATEWAY` = Oracle Gateway Publisher. |
| `storage_connection_string` | **nvarchar(779)** | Value of Azure SQL Database storage connection string. |

## Related content

- [Replication Tables (Transact-SQL)](replication-tables-transact-sql.md)
- [Replication Views (Transact-SQL)](../system-views/replication-views-transact-sql.md)
