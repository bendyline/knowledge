---
title: "Execute T-SQL Statement Task"
description: "Execute T-SQL Statement Task"
ms.date: "03/13/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
f1_keywords:
  - "sql13.dts.designer.executetsqlstatementtask.f1"
helpviewer_keywords:
  - "Transact-SQL statements, SSIS"
  - "statements [Integration Services]"
  - "Execute T-SQL Statement task [Integration Services]"
---
# Execute T-SQL Statement Task


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  The Execute T-SQL Statement task runs Transact-SQL statements. For more information, see [Transact-SQL Reference &#40;Database Engine&#41;](../../t-sql/language-reference.md) and [Integration Services (SSIS) Queries](../integration-services-ssis-queries.md).  
  
 This task is similar to the Execute SQL task. However, the Execute T-SQL Statement task supports only the Transact-SQL version of the SQL language and you cannot use this task to run statements on servers that use other dialects of the SQL language. If you need to run parameterized queries, save the query results to variables, or use property expressions, you should use the Execute SQL task instead of the Execute T-SQL Statement task. For more information, see [Execute SQL Task](execute-sql-task.md).  
  
## Configuration of the Execute T-SQL Task  
 You can set properties through  SSIS 
 Designer. This task is in the **Maintenance Plan Tasks** section of the **Toolbox** in  SSIS 
 Designer.  
  
 For more information about the properties that you can set in  SSIS 
 Designer, click the following topic:  
  
-   [Execute T-SQL Statement Task &#40;Maintenance Plan&#41;](../../relational-databases/maintenance-plans/execute-t-sql-statement-task-maintenance-plan.md)  
  
 For more information about how to set these properties in  SSIS 
 Designer, click the following topic:  
  
-   [Set the Properties of a Task or Container](add-or-delete-a-task-or-a-container-in-a-control-flow.md)  
  
## Related content

- [Integration Services Tasks](integration-services-tasks.md)
- [Control Flow](control-flow.md)
- [MERGE in Integration Services Packages](merge-in-integration-services-packages.md)
