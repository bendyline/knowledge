---
title: "sys.sp_cdc_enable_db (Transact-SQL)"
description: "Enables change data capture for the current database."
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_cdc_enable_db_TSQL"
  - "sp_cdc_enable_db"
  - "sys.sp_cdc_enable_db"
  - "sys.sp_cdc_enable_db_TSQL"
helpviewer_keywords:
  - "sys.sp_cdc_enable_db"
  - "change data capture [SQL Server], enabling databases"
  - "sp_cdc_enable_db"
dev_langs:
  - "TSQL"
---
# sys.sp_cdc_enable_db (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Enables change data capture for the current database. This procedure must be executed for a database before any tables can be enabled for change data capture (CDC) in that database. Change data capture records insert, update, and delete activity applied to enabled tables, making the details of the changes available in an easily consumed relational format. Column information that mirrors the column structure of a tracked source table is captured for the modified rows, along with the metadata needed to apply the changes to a target environment.

> **Important:**  
> Change data capture isn't available in every edition of  SQL Server 
. For a list of features supported by the editions in  SQL Server 
, see [Editions and supported features of SQL Server 2025](../../sql-server/editions-and-components-of-sql-server-2025.md).



## Syntax

```syntaxsql
sys.sp_cdc_enable_db [ [ @fCreateCDCUserImplicit = ] fCreateCDCUserImplicit ]
[ ; ]
```

## Return code values

`0` (success) or `1` (failure).

## Result set

None.

## Remarks

Change data capture can't be enabled on [system databases](../databases/system-databases.md) or distribution databases.

`sys.sp_cdc_enable_db` creates the change data capture objects that have database wide scope, including metadata tables and DDL triggers. It also creates the CDC schema and CDC database user and sets the `is_cdc_enabled` column for the database entry in the [sys.databases](../system-catalog-views/sys-databases-transact-sql.md) catalog view to `1`.

## Permissions

Requires membership in the **sysadmin** fixed server role for Change Data Capture on Azure SQL Managed Instance or SQL Server. Requires membership in the **db_owner** for Change Data Capture on Azure SQL Database.

## Examples

The following example enables change data capture.

```sql
USE AdventureWorks2022;
GO

EXECUTE sys.sp_cdc_enable_db;
GO
```

## Related content

- [sys.sp_cdc_disable_db (Transact-SQL)](sys-sp-cdc-disable-db-transact-sql.md)
