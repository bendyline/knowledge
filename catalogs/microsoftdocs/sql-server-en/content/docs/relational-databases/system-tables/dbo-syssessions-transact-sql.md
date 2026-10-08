---
title: "dbo.syssessions (Transact-SQL)"
description: dbo.syssessions (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "12/30/2019"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "dbo.syssessions_TSQL"
  - "dbo.syssessions"
  - "syssessions_TSQL"
  - "syssessions"
helpviewer_keywords:
  - "syssessions system table"
dev_langs:
  - "TSQL"
---
# dbo.syssessions (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Each time  SQL Server 
 Agent starts, it creates a new session.  SQL Server 
 Agent uses sessions to preserve the status of jobs when the  SQL Server 
 Agent service is restarted or stopped unexpectedly. Each row of the **syssessions** table contains information about one session. Use the **sysjobactivity** table to view the job state at the end of each session.  
  
 This table is stored in the **msdb** database.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **session_id** | **int** | ID of a  SQL Server |
 | Agent session. This session_id is not the SPID for the session, but rather an IDENTITY value within this system table. |
| **agent_start_date** | **datetime** | Date and time that the  SQL Server |
 | Agent service was started for this session. |
  
## Remarks  
 Only users who are members of the **sysadmin** fixed server role can access this table.  
  
## Related content

- [dbo.sysjobactivity (Transact-SQL)](dbo-sysjobactivity-transact-sql.md)
