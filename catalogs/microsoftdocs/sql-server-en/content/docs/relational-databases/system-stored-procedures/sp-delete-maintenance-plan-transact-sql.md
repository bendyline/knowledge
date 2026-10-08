---
title: "sp_delete_maintenance_plan (Transact-SQL)"
description: sp_delete_maintenance_plan deletes the specified maintenance plan.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_delete_maintenance_plan"
  - "sp_delete_maintenance_plan_TSQL"
helpviewer_keywords:
  - "sp_delete_maintenance_plan"
dev_langs:
  - "TSQL"
---
# sp_delete_maintenance_plan (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Deletes the specified maintenance plan.

> **Note:**  
> This stored procedure is used with database maintenance plans. This feature has been replaced with maintenance plans that don't use this stored procedure. Use this procedure to maintain database maintenance plans on installations that were upgraded from a previous version of  SQL Server 
.

This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature. 



```syntaxsql
dbo.sp_delete_maintenance_plan [ @plan_id = ] 'plan_id'
[ ; ]
```

## Arguments

#### [ @plan_id = ] '*plan_id*'

Specifies the ID of the maintenance plan to be deleted. *@plan_id* is **uniqueidentifier**, and must be a valid ID.

## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_delete_maintenance_plan` must be run from the `msdb` database.

## Permissions

You can grant `EXECUTE` permissions on this procedure, but these permissions might be overridden during a SQL Server upgrade.


## Examples

Deletes the maintenance plan created by using `sp_add_maintenance_plan`.

```sql
EXECUTE sp_delete_maintenance_plan 'FAD6F2AB-3571-11D3-9D4A-00C04FB925FC';
```

## Related content

- [Maintenance plans](../maintenance-plans/maintenance-plans.md)
- [Database Maintenance Plan stored procedures (Transact-SQL)](database-maintenance-plan-stored-procedures-transact-sql.md)
