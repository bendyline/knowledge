---
title: "sys.sp_cdc_set_scheduler_job (Transact-SQL)"
description: "For Azure SQL Database, instruct the change data capture (CDC) scheduler to pause or resume scheduling of CDC scan and/or CDC cleanup jobs."
author: abhimantiwari
ms.author: abhtiwar
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.sp_cdc_set_scheduler_job_TSQL"
  - "sp_cdc_set_scheduler_job"
  - "sys.sp_cdc_set_scheduler_job"
  - "sp_cdc_set_scheduler_job_TSQL"
helpviewer_keywords:
  - "sp_cdc_set_scheduler_job"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current"
---
# sys.sp_cdc_set_scheduler_job (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Instruct the change data capture (CDC) scheduler to pause or resume scheduling of CDC scan and/or CDC cleanup jobs for  Azure SQL Database 
, or abort the currently running CDC scan and/or CDC cleanup job.

This system stored procedure is applicable to  Azure SQL Database 
 only.



## Syntax

```syntaxsql
sys.sp_cdc_set_scheduler_job
    [ @jobType = ] N'JobType'
    , [ @state = ] N'state'
    , [ @abortTask = ] abortTask
[ ; ]
```

## Arguments

> **Important:**  
> Arguments for extended stored procedures must be entered in the specific order as described in the [Syntax](#syntax) section. If the parameters are entered out of order, an error message occurs.


#### [ @jobType = ] N'*JobType*'

The type of CDC job, such as a capture job, or clean up job. *@jobType* is **nvarchar(20)**. Valid values are `capture`, `cleanup` or `both`. There's no default value.

#### [ @state = ] N'*state*'

Instructs the CDC scheduler to pause or resume scheduling the job. Valid values are `pause` or `resume`. There's no default value.

#### [ @abortTask = ] *abortTask*

Indicates whether you want to abort the current running task or not. Valid **int** values are `1` or `0`, with no default value. The *@abortTask* value is only used when the *@state* value is `pause`. However, it only accepts `1` as the valid input.

## Return code values

`0` (success) or `1` (failure).

## Result set

None.

## Remarks

`sys.sp_cdc_set_scheduler_job` applies to  Azure SQL Database 
 only.

- The CDC scheduler periodically schedules CDC scan and CDC cleanup jobs. Use `sp_cdc_set_scheduler_job` to instruct the scheduler to either pause the scheduling or resume scheduling of these jobs.

- The *@abortTask* parameter is used to indicate whether the currently running job should be aborted or not.

## Permissions

Requires membership in the **db_owner** fixed database role.

## Related content

- [dbo.cdc_jobs (Transact-SQL)](../system-tables/dbo-cdc-jobs-transact-sql.md)
