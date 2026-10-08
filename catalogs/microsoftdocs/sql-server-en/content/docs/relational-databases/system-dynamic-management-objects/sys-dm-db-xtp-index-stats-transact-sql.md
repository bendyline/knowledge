---
title: "sys.dm_db_xtp_index_stats (Transact-SQL)"
description: For In-Memory OLTP tables, sys.dm_db_xtp_index_stats contains statistics collected since the last database restart.
author: rwestMSFT
ms.author: randolphwest
ms.date: "02/27/2023"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.dm_db_xtp_index_stats"
  - "dm_db_xtp_index_stats"
  - "sys.dm_db_xtp_index_stats_TSQL"
  - "dm_db_xtp_index_stats_TSQL"
helpviewer_keywords:
  - "sys.dm_db_xtp_index_stats dynamic management view"
dev_langs:
  - "TSQL"
monikerRange: ">=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# sys.dm_db_xtp_index_stats (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 





  Contains statistics collected since the last database restart.  
  
 For more information, see [ In-Memory OLTP 
 &#40;In-Memory Optimization&#41;](../in-memory-oltp/overview-and-usage-scenarios.md) and [Guidelines for Using Indexes on Memory-Optimized Tables](https://learn.microsoft.com/previous-versions/sql/sql-server-2016/dn133166\(v=sql.130\)).  

  
| Column name | Data type | Description |
| --- | --- | --- |
| object_id | **bigint** | ID of the object to which this index belongs. |
| xtp_object_id | **bigint** | Internal ID corresponding to the current version of the object.<br /><br /> Note: Applies to  SQL Server 2016 (13.x) |
| . |
| index_id | **bigint** | ID of the index. The index_id is unique only within the object. |
| scans_started | **bigint** | Number of  In-Memory OLTP |
 | index scans performed. Every select, insert, update, or delete requires an index scan. |
| scans_retries | **bigint** | Number of index scans that needed to be retried, |
| rows_returned | **bigint** | Cumulative number of rows returned since the table was created or the start of  SQL Server |
| . |
| rows_touched | **bigint** | Cumulative number of rows accessed since the table was created or the start of  SQL Server |
| . |
| rows_expiring | **bigint** | Internal use only. |
| rows_expired | **bigint** | Internal use only. |
| rows_expired_removed | **bigint** | Internal use only. |
| phantom_scans_started | **bigint** | Internal use only. |
| phantom_scans_retries | **bigint** | Internal use only. |
| phantom_rows_touched | **bigint** | Internal use only. |
| phantom_expiring_rows_encountered | **bigint** | Internal use only. |
| phantom_expired_rows_encountered | **bigint** | Internal use only. |
| phantom_expired_removed_rows_encountered | **bigint** | Internal use only. |
| phantom_expired_rows_removed | **bigint** | Internal use only. |
| object_address | **varbinary(8)** | Internal use only. |
  
## Permissions  
 Requires VIEW DATABASE STATE permission on the current database.  
  
### Permissions for SQL Server 2022 and later

Requires VIEW DATABASE PERFORMANCE STATE permission on the database.

## Related content

- [Introduction to Memory-Optimized Tables](../in-memory-oltp/introduction-to-memory-optimized-tables.md)
- [In-Memory OLTP System Views (Transact-SQL)](memory-optimized-table-dynamic-management-views-transact-sql.md)
- [In-Memory OLTP overview and usage scenarios](../in-memory-oltp/overview-and-usage-scenarios.md)
- [Optimize performance by using in-memory technologies in Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/in-memory-oltp-overview?view=azuresql-db\&preserve-view=true)
- [Optimize performance by using in-memory technologies in Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/in-memory-oltp-overview?view=azuresql-mi\&preserve-view=true)
