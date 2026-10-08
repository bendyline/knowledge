---
title: "sp_add_maintenance_plan_job (Transact-SQL)"
description: "Associates a maintenance plan with an existing job."
author: MashaMSFT
ms.author: mathoma
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_add_maintenance_plan_job_TSQL"
  - "sp_add_maintenance_plan_job"
helpviewer_keywords:
  - "sp_add_maintenance_plan_job"
dev_langs:
  - "TSQL"
---
# sp_add_maintenance_plan_job (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Associates a maintenance plan with an existing job.

> **Note:**  
> This stored procedure is used with database maintenance plans. This feature has been replaced with maintenance plans which don't use this stored procedure. Use this procedure to maintain database maintenance plans on installations that were upgraded from a previous version of  SQL Server 
.

This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature. 



## Syntax

```syntaxsql
dbo.sp_add_maintenance_plan_job
    [ @plan_id = ] 'plan_id'
    , [ @job_id = ] 'job_id'
[ ; ]
```

## Arguments

#### [ @plan_id = ] '*plan_id*'

Specifies the ID of the maintenance plan. *@plan_id* is **uniqueidentifier**, and must be a valid ID.

#### [ @job_id = ] '*job_id*'

Specifies the ID of the job to be associated with the maintenance plan. *@job_id* is **uniqueidentifier**, and must be a valid ID. To create a job or jobs, execute `sp_add_job`, or use SQL Server Management Studio.

## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_add_maintenance_plan_job` must be run from the `msdb` database.

## Permissions

You can grant `EXECUTE` permissions on this procedure, but these permissions might be overridden during a SQL Server upgrade.


## Examples

This example adds the job `B8FCECB1-E22C-11D2-AA64-00C04F688EAE` to the maintenance plan created using `sp_add_maintenance_plan_job`.

```sql
EXECUTE sp_add_maintenance_plan_job
    @plan_id = N'FAD6F2AB-3571-11D3-9D4A-00C04FB925FC',
    @job_id = N'B8FCECB1-E22C-11D2-AA64-00C04F688EAE';
```

## Related content

- [Maintenance plans](../maintenance-plans/maintenance-plans.md)
- [Database Maintenance Plan stored procedures (Transact-SQL)](database-maintenance-plan-stored-procedures-transact-sql.md)
