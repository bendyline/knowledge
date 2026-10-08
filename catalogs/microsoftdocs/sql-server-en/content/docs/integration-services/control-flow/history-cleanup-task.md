---
title: "History Cleanup Task"
description: "History Cleanup Task"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
f1_keywords:
  - "sql13.dts.designer.historycleanuptask.f1"
helpviewer_keywords:
  - "history tables [SQL Server]"
  - "History Cleanup task [Integration Services]"
---
# History Cleanup Task


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  The History Cleanup task deletes entries in the following history tables in the  SQL Server 
 msdb database.  
  
-   backupfile  
  
-   backupfilegroup  
  
-   backupmediafamily  
  
-   backupmediaset  
  
-   backupset  
  
-   restorefile  
  
-   restorefilegroup  
  
-   restorehistory  
  
 By using the History Cleanup task, a package can delete historical data related to backup and restore activities,  SQL Server 
 Agent jobs, and database maintenance plans.  
  
 This task encapsulates the sp_delete_backuphistory system stored procedure and passes the specified date to the procedure as an argument. For more information, see [sp_delete_backuphistory &#40;Transact-SQL&#41;](../../relational-databases/system-stored-procedures/sp-delete-backuphistory-transact-sql.md).  
  
## Configuration of the History Cleanup Task  
 The task includes a property for specifying the oldest date of data retained in the history tables. You can indicate the date by number of days, weeks, months, or years from the current day, and the task automatically translates the interval to a date.  
  
 You can set properties through  SSIS 
 Designer. This task is in the **Maintenance Plan Tasks** section of the **Toolbox** in  SSIS 
 Designer.  
  
 For more information about the properties that you can set in  SSIS 
 Designer, click the following topic:  
  
-   [History Cleanup Task &#40;Maintenance Plan&#41;](../../relational-databases/maintenance-plans/history-cleanup-task-maintenance-plan.md)  
  
 For more information about how to set these properties in  SSIS 
 Designer, click the following topic:  
  
-   [Set the Properties of a Task or Container](add-or-delete-a-task-or-a-container-in-a-control-flow.md)  
  
## Related content

- [Integration Services Tasks](integration-services-tasks.md)
- [Control Flow](control-flow.md)
