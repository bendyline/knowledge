---
title: "sys.sp_cdc_stop_job (Transact-SQL)"
description: "Stops a change data capture cleanup or capture job for the current database."
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.sp_cdc_stop_job_TSQL"
  - "sys.sp_cdc_stop_job"
  - "sp_cdc_stop_job_TSQL"
  - "sp_cdc_stop_job"
helpviewer_keywords:
  - "sp_cdc_stop_job"
dev_langs:
  - "TSQL"
---
# sys.sp_cdc_stop_job (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Stops a change data capture cleanup or capture job for the current database.



## Syntax

```syntaxsql
sys.sp_cdc_stop_job [ [ @job_type = ] N'job_type' ]
[ ; ]
```

## Arguments

#### [ @job_type = ] N'*job_type*'

Type of job to add. *@job_type* is **nvarchar(20)** with a default of `capture`. Valid inputs are `capture` and `cleanup`.

## Return code values

`0` (success) or `1` (failure).

## Result set

None.

## Remarks

`sys.sp_cdc_stop_job` can be used by an administrator to explicitly stop either the capture job or the cleanup job.

## Permissions

Requires membership in the **db_owner** fixed database role.

## Examples

The following example stops the capture job for the  `AdventureWorks2025`  database.

```sql
USE AdventureWorks2022;
GO

EXECUTE sys.sp_cdc_stop_job @job_type = N'capture';
GO
```

## Related content

- [dbo.cdc_jobs (Transact-SQL)](../system-tables/dbo-cdc-jobs-transact-sql.md)
- [sys.sp_cdc_start_job (Transact-SQL)](sys-sp-cdc-start-job-transact-sql.md)
