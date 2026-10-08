---
title: "sys.sp_cdc_drop_job (Transact-SQL)"
description: "Removes a change data capture cleanup or capture job for the current database from msdb."
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.sp_cdc_drop_job_TSQL"
  - "sp_cdc_drop_job_TSQL"
  - "sp_cdc_drop_job"
  - "sys.sp_cdc_drop_job"
helpviewer_keywords:
  - "sp_cdc_drop_job"
dev_langs:
  - "TSQL"
---
# sys.sp_cdc_drop_job (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Removes a change data capture cleanup or capture job for the current database from `msdb`.



## Syntax

```syntaxsql
sys.sp_cdc_drop_job [ @job_type = ] N'job_type'
[ ; ]
```

## Arguments

#### [ @job_type = ] N'*job_type*'

Type of job to remove. *@job_type* is **nvarchar(20)** and can't be `NULL`. Valid inputs are `capture` and `cleanup`.

## Return code values

`0` (success) or `1` (failure).

## Result set

None.

## Remarks

`sp_cdc_drop_job` is called internally by [sys.sp_cdc_disable_db](sys-sp-cdc-disable-db-transact-sql.md).

## Permissions

Requires membership in the **db_owner** fixed database role.

## Examples

The following example removes the cleanup job for the  `AdventureWorks2025`  database.

```sql
USE AdventureWorks2022;
GO

EXECUTE sys.sp_cdc_drop_job @job_type = N'cleanup';
```

## Related content

- [dbo.cdc_jobs (Transact-SQL)](../system-tables/dbo-cdc-jobs-transact-sql.md)
- [sys.sp_cdc_disable_db (Transact-SQL)](sys-sp-cdc-disable-db-transact-sql.md)
- [sys.sp_cdc_add_job (Transact-SQL)](sys-sp-cdc-add-job-transact-sql.md)
