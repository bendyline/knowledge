---
title: "sp_add_maintenance_plan_db (Transact-SQL)"
description: "Associates a database with a maintenance plan."
author: MashaMSFT
ms.author: mathoma
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_add_maintenance_plan_db_TSQL"
  - "sp_add_maintenance_plan_db"
helpviewer_keywords:
  - "sp_add_maintenance_plan_db"
dev_langs:
  - "TSQL"
---
# sp_add_maintenance_plan_db (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Associates a database with a maintenance plan.

> **Note:**  
> This stored procedure is used with database maintenance plans. This feature has been replaced with maintenance plans which don't use this stored procedure. Use this procedure to maintain database maintenance plans on installations that were upgraded from a previous version of  SQL Server 
.

This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature. 



## Syntax

```syntaxsql
dbo.sp_add_maintenance_plan_db
    [ @plan_id = ] 'plan_id'
    , [ @db_name = ] N'db_name'
[ ; ]
```

## Arguments

#### [ @plan_id = ] '*plan_id*'

Specifies the plan ID of the maintenance plan. *@plan_id* is **uniqueidentifier**, and must be a valid ID.

#### [ @db_name = ] N'*db_name*'

Specifies the name of the database to be added to the maintenance plan. The database must be created or exist before its addition to the plan. *@database_name* is **sysname**.

## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_add_maintenance_plan_db` must be run from the `msdb` database.

## Permissions

You can grant `EXECUTE` permissions on this procedure, but these permissions might be overridden during a SQL Server upgrade.


## Examples

This example adds the  `AdventureWorks2025`  database to the maintenance plan created in `sp_add_maintenance_plan`.

```sql
EXECUTE sp_add_maintenance_plan_db
    N'FAD6F2AB-3571-11D3-9D4A-00C04FB925FC',
    N'AdventureWorks2022';
```

## Related content

- [Maintenance plans](../maintenance-plans/maintenance-plans.md)
- [Database Maintenance Plan stored procedures (Transact-SQL)](database-maintenance-plan-stored-procedures-transact-sql.md)
