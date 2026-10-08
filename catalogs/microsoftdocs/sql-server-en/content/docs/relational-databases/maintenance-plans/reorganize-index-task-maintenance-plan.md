---
title: "Reorganize Index Task (Maintenance Plan)"
description: Reorganize Index Task (Maintenance Plan)
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest
ms.date: 03/27/2023
ms.service: sql
ms.subservice: supportability
ms.topic: concept-article
f1_keywords:
  - "sql13.swb.maint.defrag.f1"
helpviewer_keywords:
  - "Reorganize Index Task dialog box"
---
# Reorganize Index Task (Maintenance Plan)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Use the **ReorganizeIndex Task** dialog to move index pages into a more efficient search order. This task uses the `ALTER INDEX REORGANIZE` statement with  SQL Server 
 databases.

## Options

- **Connection**

  Select the server connection to use when performing this task.

- **New**

  Create a new server connection to use when performing this task. The **New Connection** dialog box is described below.

- **Databases**

  Specify the databases affected by this task.

  - **All databases**

    Generate a maintenance plan that runs maintenance tasks against all  SQL Server 
 databases except `tempdb`.

  - **All system databases**

    Generate a maintenance plan that runs maintenance tasks against each of the  SQL Server 
 system databases except `tempdb`. No maintenance tasks are run against user-created databases.

  - **All user databases**

    Generate a maintenance plan that runs maintenance tasks against all user-created databases. No maintenance tasks are run against the  SQL Server 
 system databases.

  - **These specific databases**

    Generate a maintenance plan that runs maintenance tasks against only those databases that are selected. At least one database in the list must be selected if this option is chosen.

- **Object**

  Limit the **Selection** grid to display tables, views, or both.

- **Selection**

  Specify the tables or indexes affected by this task. Not available when **Tables and Views** is selected in the **Object** box.

- **Compact large objects**

  Deallocate space for tables and views when possible. This option uses `ALTER INDEX LOB_COMPACTION = ON`.

- **View T-SQL**

  View the  Transact-SQL  statements performed against the server for this task, based on the selected options.

  > **Note:**  
  > When the number of objects affected is large, this display can take a considerable amount of time.

### Index stats options

In earlier versions of  SQL Server 
, reorganizing or rebuilding a large index could cause system slowdown.  SQL Server 2016 (13.x) 
 implemented major performance improvements for these index operations.

Also, in earlier versions, the granularity of control was less refined. This caused the system to reorganize or rebuild some indexes even when the indexes weren't much fragmented, which was wasteful. Newer controls on the Maintenance Plan user interface (UI) enable you to exclude indexes that don't need to be refreshed, based on index statistics criteria. For this, the following dynamic management views (DMVs) of Transact-SQL are used internally:

- [sys.dm_db_index_usage_stats](../system-dynamic-management-objects/sys-dm-db-index-usage-stats-transact-sql.md)
- [sys.dm_db_index_physical_stats](../system-dynamic-management-objects/sys-dm-db-index-physical-stats-transact-sql.md)

#### Scan type

The system must consume resources to gather index statistics. You can choose between consuming relatively less or more resources depending on how much precision you feel is needed for index statistics. The UI offers the following list of precision levels from which you must choose one:

- Fast
- Sampled
- Detailed

#### Optimize index only if

The UI offers the following tuneable filters that you can use to avoid refreshing indexes that don't yet strongly need refreshing:

- **Fragmentation &gt; *(%)***
- **Page Count &gt;**
- **Used in last *(days)***


## New Connection dialog box

- **Connection name**

  Enter a name for the new connection.

- **Select or enter a server name**

  Select a server to connect to when performing this task.

- **Refresh**

  Refresh the list of available servers.

- **Enter information to log on to the server**

  Specify how to authenticate against the server.

- **Use Windows integrated security**

  Connect to an instance of the  SQL Server 
  Database Engine 
 with  Microsoft 
 Windows Authentication.

- **Use a specific user name and password**

  Connect to an instance of the  SQL Server 
  Database Engine 
 using  SQL Server 
 Authentication. This option isn't available.

- **User name**

  Provide a  SQL Server 
 login to use when authenticating. This option isn't available.

- **Password**

  Provide a password to use when authenticating. This option isn't available.

## Related content

- [ALTER INDEX (Transact-SQL)](../../t-sql/statements/alter-index-transact-sql.md)
- [DBCC INDEXDEFRAG (Transact-SQL)](../../t-sql/database-console-commands/dbcc-indexdefrag-transact-sql.md)
