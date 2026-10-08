---
title: "sp_delete_schedule (Transact-SQL)"
description: sp_delete_schedule deletes a schedule.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_delete_schedule"
  - "sp_delete_schedule_TSQL"
helpviewer_keywords:
  - "sp_delete_schedule"
dev_langs:
  - "TSQL"
---
# sp_delete_schedule (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Deletes a schedule.



## Syntax

```syntaxsql
dbo.sp_delete_schedule
    { [ @schedule_id = ] schedule_id
        | [ @schedule_name = ] N'schedule_name' }
    [ , [ @force_delete = ] force_delete ]
    [ , [ @automatic_post = ] automatic_post ]
[ ; ]
```

## Arguments

#### [ @schedule_id = ] *schedule_id*

The schedule identification number of the schedule to delete. *@schedule_id* is **int**, with a default of `NULL`.

Either *@schedule_id* or *@schedule_name* must be specified, but both can't be specified.

#### [ @schedule_name = ] N'*schedule_name*'

The name of the schedule to delete. *@schedule_name* is **sysname**, with a default of `NULL`.

Either *@schedule_id* or *@schedule_name* must be specified, but both can't be specified.

#### [ @force_delete = ] *force_delete*

Specifies whether the procedure should fail if the schedule is attached to a job. *@force_delete* is **bit**, with a default of `0`.

- When *@force_delete* is `0`, the stored procedure fails if the schedule is attached to a job.
- When *@force_delete* is `1`, the schedule is deleted regardless of whether the schedule is attached to a job.

#### [ @automatic_post = ] *automatic_post*

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


## Return code values

`0` (success) or `1` (failure).

## Result set

None.

## Remarks

By default, a schedule can't be deleted if the schedule is attached to a job. To delete a schedule that is attached to a job, specify a value of `1` for *@force_delete*. Deleting a schedule doesn't stop jobs that are currently running.

## Permissions

You can grant `EXECUTE` permissions on this procedure, but these permissions might be overridden during a SQL Server upgrade.


Other users must be granted one of the following  SQL Server 
 Agent fixed database roles in the `msdb` database:

- **SQLAgentUserRole**
- **SQLAgentReaderRole**
- **SQLAgentOperatorRole**

The job owner can attach a job to a schedule and detach a job from a schedule without also having to be the schedule owner. However, a schedule can't be deleted if the detach would leave it with no jobs, unless the caller is the schedule owner.

For details about the permissions of these roles, see [SQL Server Agent Fixed Database Roles](https://learn.microsoft.com/ssms/agent/sql-server-agent-fixed-database-roles).

Only members of the **sysadmin** role can delete a job schedule that is owned by another user.

## Examples

### A. Delete a schedule

The following example deletes the schedule `NightlyJobs`. If the schedule is attached to any job, the example doesn't delete the schedule.

```sql
USE msdb;
GO

EXECUTE dbo.sp_delete_schedule @schedule_name = N'NightlyJobs';
GO
```

### B. Delete a schedule attached to a job

The following example deletes the schedule `RunOnce`, regardless of whether the schedule is attached to a job.

```sql
USE msdb;
GO

EXECUTE dbo.sp_delete_schedule
    @schedule_name = 'RunOnce',
    @force_delete = 1;
GO
```

## Related content

- [Implement Jobs](https://learn.microsoft.com/ssms/agent/implement-jobs)
- [sp_add_schedule (Transact-SQL)](sp-add-schedule-transact-sql.md)
