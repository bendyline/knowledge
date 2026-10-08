---
title: "sysdbmaintplan_jobs (Transact-SQL)"
description: sysdbmaintplan_jobs (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sysdbmaintplan_jobs"
  - "sysdbmaintplan_jobs_TSQL"
helpviewer_keywords:
  - "sysdbmaintplan_jobs system table"
dev_langs:
  - "TSQL"
---
# sysdbmaintplan_jobs (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  This table is included in  SQL Server 
 to preserve existing information for instances upgraded from a previous version of  SQL Server 
.  SQL Server 
 does not change the contents of this table. This table is stored in the **msdb** database.  
  
 This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.   
  

  
| Column name | Data type | Description |
| --- | --- | --- |
| **plan_id** | **uniqueidentifier** | Database maintenance plan ID. |
| **job_id** | **uniqueidentifier** | ID of a job associated with the database maintenance plan. |
