---
title: "Task Host Container"
description: "Task Host Container"
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
f1_keywords:
  - "sql13.dts.designer.taskhostcontainer.f1"
helpviewer_keywords:
  - "containers [Integration Services], Task Host"
  - "Task Host container"
---
# Task Host Container


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  The task host container encapsulates a single task. In  SSIS 
 Designer, the task host is not configured separately; instead, it is configured when you set the properties of the task it encapsulates. For more information about the tasks that the task host containers encapsulate, see [Integration Services Tasks](integration-services-tasks.md).  
  
 This container extends the use of variables and event handlers to the task level. For more information, see [Integration Services (SSIS) Event Handlers](../integration-services-ssis-event-handlers.md) and [Integration Services (SSIS) Variables](../integration-services-ssis-variables.md).  
  
## Configuration of the Task Host  
 You can set properties in the **Properties** window of  SQL Server Data Tools (SSDT) 
 or programmatically.  
  
 For information about setting these properties in  SQL Server Data Tools (SSDT) 
, see [Set the Properties of a Task or Container](add-or-delete-a-task-or-a-container-in-a-control-flow.md).  
  
 For information about programmatically setting these properties, see [Microsoft.SqlServer.Dts.Runtime.TaskHost](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.TaskHost).  
  
## Related Tasks  
  
-   [Set the Properties of a Task or Container](add-or-delete-a-task-or-a-container-in-a-control-flow.md)  
  
## Related content

- [Integration Services Containers](integration-services-containers.md)
