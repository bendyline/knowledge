---
title: "sys.dm_db_column_store_row_group_operational_stats (Transact-SQL)"
description: Returns current row-level I/O, locking, and access method activity for compressed rowgroups in a columnstore index.
author: rwestMSFT
ms.author: randolphwest
ms.date: 12/16/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: reference
f1_keywords:
  - "sys.dm_db_column_store_row_group_operational_stats_TSQL"
  - "sys.dm_db_column_store_row_group_operational_stats"
  - "dm_db_column_store_row_group_operational_stats_TSQL"
  - "dm_db_column_store_row_group_operational_stats"
helpviewer_keywords:
  - "sys.dm_db_column_store_row_group_operational_stats dynamic management view"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# sys.dm_db_column_store_row_group_operational_stats (Transact-SQL)


**Applies to:**
 

 and later versions 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns current row-level I/O, locking, and access method activity for compressed rowgroups in a columnstore index. Use `sys.dm_db_column_store_row_group_operational_stats` to track the length of time a user query must wait to read or write to a compressed rowgroup or partition of a columnstore index, and identify rowgroups that are encountering significant I/O activity or hot spots.

In-memory columnstore indexes don't appear in this DMV.

| Column name | Data type | Nullable | Description |
| --- | --- | --- | --- |
| `object_id` | **int** | No | ID of the table with the columnstore index. |
| `index_id` | **int** | No | ID of the columnstore index. |
| `partition_number` | **int** | No | 1-based partition number within the index or heap. |
| `row_group_id` | **int** | No | ID of the rowgroup in the columnstore index. This is unique within a partition. |
| `index_scan_count` | **bigint** | No | Number of times the columnstore index partition was scanned. This is the same for all rowgroups in the partition. |
| `scan_count` | **bigint** | No | Number of scans through the rowgroup since the last SQL restart. |
| `delete_buffer_scan_count` | **bigint** | No | Number of times the delete buffer was used to determine deleted rows in this rowgroup. This includes accessing the in-memory hashtable and the underlying B-tree. |
| `row_group_lock_count` | **bigint** | No | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `row_group_lock_wait_count` | **bigint** | No | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `row_group_lock_wait_in_ms` | **bigint** | No | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `returned_row_count` | **bigint** | No | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `returned_aggregate_count` | **bigint** | No | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `returned_group_count` | **bigint** | No | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `input_groupby_row_count` | **bigint** | No | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `row_group_elimination_count` | **bigint** | No | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
 |  |
| `rowgroup_lock_count` | **bigint** | N/A | Cumulative count of lock requests for this rowgroup since the last SQL Server restart. |
| `rowgroup_lock_wait_count` | **bigint** | N/A | Cumulative number of times the database engine waited on this rowgroup lock since the last SQL Server restart. |
| `rowgroup_lock_wait_in_ms` | **bigint** | N/A | Cumulative number of milliseconds the database engine waited on this rowgroup lock since the last SQL Server restart. |

> **Note:**  
> Documentation uses the term B-tree generally in reference to indexes. In rowstore indexes, the Database Engine implements a B+ tree. This does not apply to columnstore indexes or indexes on memory-optimized tables. For more information, see the [SQL Server and Azure SQL index architecture and design guide](../sql-server-index-design-guide.md).


## Permissions

Requires the following permissions:

- `CONTROL` permission on the table specified by `object_id`.

- `VIEW DATABASE STATE` permission to return information about all objects within the database, by using the object wildcard `@object_id = NULL`.

- In  SQL Server 2019 (15.x) 
 and earlier versions, requires `VIEW DATABASE STATE` permission to return information about all objects within the database, by using the object wildcard `@object_id = NULL`.

- In  SQL Server 2022 (16.x) 
 and later versions, requires `VIEW DATABASE PERFORMANCE STATE` permission on the database.

Granting `VIEW DATABASE [PERFORMANCE] STATE` allows all objects in the database to be returned, regardless of any `CONTROL` permissions denied on specific objects.

Denying `VIEW DATABASE [PERFORMANCE] STATE` disallows all objects in the database to be returned, regardless of any `CONTROL` permissions granted on specific objects. Also, when the database wildcard `@database_id = NULL` is specified, the database is omitted.

For more information, see [System dynamic management views](system-dynamic-management-objects.md).

## Related content

- [System dynamic management views and functions](system-dynamic-management-objects.md)
- [Index Related Dynamic Management Views and Functions (Transact-SQL)](index-related-dynamic-management-views-and-functions-transact-sql.md)
- [Monitor and Tune for Performance](../performance/monitor-and-tune-for-performance.md)
- [sys.dm_db_index_physical_stats (Transact-SQL)](sys-dm-db-index-physical-stats-transact-sql.md)
- [sys.dm_db_index_usage_stats (Transact-SQL)](sys-dm-db-index-usage-stats-transact-sql.md)
- [sys.dm_os_latch_stats (Transact-SQL)](sys-dm-os-latch-stats-transact-sql.md)
- [sys.dm_db_partition_stats (Transact-SQL)](sys-dm-db-partition-stats-transact-sql.md)
- [sys.allocation_units (Transact-SQL)](../system-catalog-views/sys-allocation-units-transact-sql.md)
- [sys.indexes (Transact-SQL)](../system-catalog-views/sys-indexes-transact-sql.md)
