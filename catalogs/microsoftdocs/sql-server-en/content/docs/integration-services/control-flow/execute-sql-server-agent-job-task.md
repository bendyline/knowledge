---
title: "Execute SQL Server Agent Job Task"
description: "Execute SQL Server Agent Job Task"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
f1_keywords:
  - "sql13.dts.designer.executesqlserveragentjobtask.f1"
helpviewer_keywords:
  - "Execute SQL Server Agent Job task [Integration Services]"
  - "jobs [Integration Services]"
  - "SQL Server Agent [Integration Services]"
---
# Execute SQL Server Agent Job Task


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  The Execute  SQL Server 
 Agent Job task runs  SQL Server 
 Agent jobs.  SQL Server 
 Agent is a  Microsoft 
 Windows service that runs jobs that have been defined in an instance of SQL Server. You can create jobs that execute Transact-SQL statements and ActiveX scripts, perform  Analysis Services 
 and Replication maintenance tasks, or run packages. You can also configure a job to monitor  Microsoft 
  SQL Server 
 and fire alerts.  SQL Server 
 Agent jobs are typically used to automate tasks that you perform repeatedly. For more information, see [Implement Jobs](https://learn.microsoft.com/ssms/agent/implement-jobs).  
  
 By using the Execute  SQL Server 
 Agent Job task, a package can perform administrative tasks related to  SQL Server 
 components. For example, a  SQL Server 
 Agent job can run a system stored procedure such as **sp_enum_dtspackages** to obtain a list of packages in a folder.  
  
> **Note:**  
>   SQL Server 
 Agent must be running before local or multiserver administrative jobs can run automatically.  
  
 This task encapsulates the **sp_start_job** system procedure and passes the name of the  SQL Server 
 Agent job to the procedure as an argument. For more information, see [sp_start_job &#40;Transact-SQL&#41;](../../relational-databases/system-stored-procedures/sp-start-job-transact-sql.md).  
  
## Configuring the Execute SQL Server Agent Job Task  
 You can set properties through  SSIS 
 Designer. This task is in the **Maintenance Plan Tasks** section of the **Toolbox** in  SSIS 
 Designer.  
  
 For more information about the properties that you can set in  SSIS 
 Designer, click the following topic:  
  
-   [Execute SQL Server Agent Job Task &#40;Maintenance Plan&#41;](../../relational-databases/maintenance-plans/execute-sql-server-agent-job-task-maintenance-plan.md)  
  
 For more information about how to set these properties in  SSIS 
 Designer, click the following topic:  
  
-   [Set the Properties of a Task or Container](add-or-delete-a-task-or-a-container-in-a-control-flow.md)
