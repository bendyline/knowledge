---
title: "sys.dm_db_log_space_usage (Transact-SQL)"
description: "The sys.dm_db_log_space_usage dynamic management view returns space usage information for the transaction log."
author: rwestMSFT
ms.author: randolphwest
ms.date: 09/07/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "sys.dm_db_log_space_usage"
  - "sys.dm_db_log_space_usage_TSQL"
  - "dm_db_log_space_usage"
  - "dm_db_log_space_usage_TSQL"
helpviewer_keywords:
  - "sys.dm_db_log_space_usage dynamic management view"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---

# sys.dm_db_log_space_usage (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns space usage information for the transaction log.

> **Note:**  
> All transaction log files are combined.

| Column name | Data type | Description |
| --- | --- | --- |
| `database_id` | **smallint** | Database ID.<br /><br />In  Azure SQL Database |
| , the values are unique within a single database or an elastic pool, but not within a logical server. |
| `total_log_size_in_bytes` | **bigint** | The size of the log |
| `used_log_space_in_bytes` | **bigint** | The occupied size of the log |
| `used_log_space_in_percent` | **real** | The occupied size of the log as a percent of the total log size |
| `log_space_in_bytes_since_last_backup` | **bigint** | The amount of space used since the last log backup<br />**Applies to:**  SQL Server 2014 (12.x) |
 | and later versions, and  SQL Database |
| . |

## Permissions

 SQL Server 2019 (15.x) 
 and earlier versions require `VIEW SERVER STATE` permission.

 SQL Server 2022 (16.x) 
 and later versions, and Azure SQL Managed Instance require `VIEW SERVER PERFORMANCE STATE` permission.

On SQL Database **Basic**, **S0**, and **S1** service objectives, and for databases in **elastic pools**, the [server admin](https://learn.microsoft.com/azure/azure-sql/database/logins-create-manage#existing-logins-and-user-accounts-after-creating-a-new-database) account, the [Microsoft Entra admin](https://learn.microsoft.com/azure/azure-sql/database/authentication-aad-overview#administrator-structure) account, or membership in the `##MS_ServerStateReader##` [server role](https://learn.microsoft.com/azure/azure-sql/database/security-server-roles) is required. On all other SQL Database service objectives, either the `VIEW DATABASE STATE` permission on the database, or membership in the `##MS_ServerStateReader##` server role is required.

## Examples

### A. Determine the amount of free log space in tempdb

The following query returns the total free log space in megabytes (MB) available in `tempdb`.

```sql
USE tempdb;
GO

SELECT (total_log_size_in_bytes - used_log_space_in_bytes) * 1.0 / 1024 / 1024 AS [free log space in MB]
FROM sys.dm_db_log_space_usage;
```

## Related content

- [System dynamic management views and functions](system-dynamic-management-objects.md)
- [Database related dynamic management views (Transact-SQL)](database-related-dynamic-management-views-transact-sql.md)
- [sys.dm_db_file_space_usage (Transact-SQL)](sys-dm-db-file-space-usage-transact-sql.md)
- [sys.dm_db_task_space_usage (Transact-SQL)](sys-dm-db-task-space-usage-transact-sql.md)
- [sys.dm_db_session_space_usage (Transact-SQL)](sys-dm-db-session-space-usage-transact-sql.md)
- [sys.dm_db_log_info (Transact-SQL)](sys-dm-db-log-info-transact-sql.md)
- [sys.dm_db_log_stats (Transact-SQL)](sys-dm-db-log-stats-transact-sql.md)
