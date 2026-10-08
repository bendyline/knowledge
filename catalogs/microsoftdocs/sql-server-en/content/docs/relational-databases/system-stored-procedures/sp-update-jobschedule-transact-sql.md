---
title: "sp_update_jobschedule (Transact-SQL)"
description: "sp_update_jobschedule changes the schedule settings for the specified job in the SQL Server Agent service."
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest, wiassaf
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_update_jobschedule_TSQL"
  - "sp_update_jobschedule"
helpviewer_keywords:
  - "sp_update_jobschedule"
dev_langs:
  - "TSQL"
monikerRange: ">=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# sp_update_jobschedule (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





Changes the schedule settings for the specified job in the  SQL Server 
 Agent service.

`sp_update_jobschedule` is provided for backward compatibility only.

Job schedules can now be managed independently of jobs. To update a schedule, use [sp_update_schedule](sp-update-schedule-transact-sql.md).

## Permissions

You can grant `EXECUTE` permissions on this procedure, but these permissions might be overridden during a SQL Server upgrade.


Other users must be granted one of the following  SQL Server 
 Agent fixed database roles in the `msdb` database:

- **SQLAgentUserRole**
- **SQLAgentReaderRole**
- **SQLAgentOperatorRole**

For details about the permissions of these roles, see [SQL Server Agent Fixed Database Roles](https://learn.microsoft.com/ssms/agent/sql-server-agent-fixed-database-roles).

Only members of **sysadmin** can use this stored procedure to update job schedules that are owned by other users.

## Related content

- [SQL Server Agent stored procedures (Transact-SQL)](sql-server-agent-stored-procedures-transact-sql.md)
- [sp_update_schedule (Transact-SQL)](sp-update-schedule-transact-sql.md)
