---
title: Scalability
description: Learn about enhancements to scalability to on-disk storage for memory-optimized tables in SQL Server, such as using multiple threads to persist tables.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest
ms.date: 10/20/2025
ms.service: sql
ms.subservice: in-memory-oltp
ms.topic: concept-article
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# Scalability


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 





 SQL Server 2016 (13.x) 
 contains scalability enhancements to the on-disk storage for memory-optimized tables.

## Multiple threads to persist memory-optimized tables

 SQL Server 2014 (12.x)
 had a single offline checkpoint thread that scanned the transaction log for changes to memory-optimized tables and persisted them in checkpoint files (such as data and delta files). In machines with a larger number of cores, the single offline checkpoint thread could fall behind.

In  SQL Server 2016 (13.x) 
 and later versions, there are multiple concurrent threads responsible to persist changes to memory-optimized tables.

## Multi-threaded recovery

In the previous release of  SQL Server 
, the log apply portion of the recovery operation was single threaded. In  SQL Server 2016 (13.x) 
 and later versions, the log apply is multithreaded.

## MERGE operation

The `MERGE` operation is now multithreaded.

## Dynamic management views

The DMVs [sys.dm_db_xtp_checkpoint_stats](../system-dynamic-management-objects/sys-dm-db-xtp-checkpoint-stats-transact-sql.md) and [sys.dm_db_xtp_checkpoint_files](../system-dynamic-management-objects/sys-dm-db-xtp-checkpoint-files-transact-sql.md) have been changed significantly.

## Storage management

The In-memory OLTP engine continues to use memory-optimized filegroup based on FILESTREAM, but the individual files in the filegroup are decoupled from FILESTREAM. These files are fully managed (such as for create, drop, and garbage collection) by the In-Memory OLTP engine.

> **Note:**  
> [DBCC SHRINKFILE](../../t-sql/database-console-commands/dbcc-shrinkfile-transact-sql.md) isn't supported.

## Related content

- [Create and manage storage for memory-optimized objects](creating-and-managing-storage-for-memory-optimized-objects.md)
- [Database files and filegroups](../databases/database-files-and-filegroups.md)
- [ALTER DATABASE (Transact-SQL) File and Filegroup Options](../../t-sql/statements/alter-database-transact-sql-file-and-filegroup-options.md)
