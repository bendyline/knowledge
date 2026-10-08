---
title: "dbo.systaskids (Transact-SQL)"
description: dbo.systaskids (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "08/09/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "systaskids_TSQL"
  - "dbo.systaskids"
  - "systaskids"
  - "dbo.systaskids_TSQL"
helpviewer_keywords:
  - "systaskids system table"
dev_langs:
  - "TSQL"
---
# dbo.systaskids (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Contains a mapping of tasks created in earlier versions of  SQL Server 
 to  SQL Server Management Studio 
 jobs in the current version. This table is stored in the **msdb** database.  
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **task_id** | **int** | ID of the task |
| **job_id** | **uniqueidentifier** | ID of the job to which the task is mapped |
