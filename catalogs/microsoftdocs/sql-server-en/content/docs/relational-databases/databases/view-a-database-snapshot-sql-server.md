---
title: "View a Database Snapshot (SQL Server)"
description: Learn how to view a SQL Server database snapshot using SQL Server Management Studio or Transact-SQL.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: jopilov
ms.date: 05/04/2023
ms.service: sql
ms.subservice: supportability
ms.topic: how-to
helpviewer_keywords:
  - "database snapshots [SQL Server], viewing"
  - "displaying database snapshots"
  - "viewing database snapshots"
---
# View a Database Snapshot (SQL Server)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article explains how to view a  SQL Server 
 database snapshot using  SQL Server Management Studio 
.

> **Note:**  
> To create, revert to, or delete a database snapshot, you must use  Transact-SQL .

## <a id="SSMSProcedure"></a> Use SQL Server Management Studio

**To view a database snapshot**

1. In Object Explorer, connect to the instance of the  SQL Server Database Engine 
 and then expand that instance.

1. Expand **Databases.**

1. Expand **Database Snapshots**, and select the snapshot you want to view.

## <a id="TsqlProcedure"></a> Use Transact-SQL

**To view a database snapshot**

1. Connect to the  Database Engine 
.
1. From the **Standard** bar, select **New Query**.
1. To list the database snapshots of the instance of  SQL Server 
, query the `source_database_id` column of the [sys.databases](../system-catalog-views/sys-databases-transact-sql.md) catalog view for non-NULL values.
1. You can also use this query to get details about the database snapshot and its files

   ```sql
   SELECT
    db_name(db.source_database_id) source_database,
    db.name AS snapshot_db_name,
    db.database_id,
    db.source_database_id,
    db.create_date,
    db.compatibility_level,
    db.is_read_only,
    mf.physical_name
   FROM sys.databases db
   INNER JOIN sys.master_files mf
    ON db.database_id = mf.database_id
   WHERE db.source_database_id is not null
    AND mf.is_sparse =1
   ORDER BY db.name;
   ```

## <a id="RelatedTasks"></a> Related Tasks

- [Create a Database Snapshot (Transact-SQL)](create-a-database-snapshot-transact-sql.md)

- [Revert a Database to a Database Snapshot](revert-a-database-to-a-database-snapshot.md)

- [Drop a Database Snapshot (Transact-SQL)](drop-a-database-snapshot-transact-sql.md)

## Related content

- [Database snapshots (SQL Server)](database-snapshots-sql-server.md)
