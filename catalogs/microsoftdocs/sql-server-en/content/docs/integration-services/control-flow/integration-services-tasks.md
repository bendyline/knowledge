---
title: "Integration Services Tasks"
description: "Integration Services Tasks"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
helpviewer_keywords:
  - "scripts [Integration Services], tasks"
  - "files [Integration Services], task options"
  - "workflow tasks [Integration Services]"
  - "Integration Services, tasks"
  - "adding package tasks"
  - "tasks [Integration Services], listed"
  - "SSIS tasks"
  - "SSIS, tasks"
  - "control flow [Integration Services], tasks"
  - "tasks [Integration Services]"
  - "grouping tasks"
  - "tasks [Integration Services], about tasks"
  - "SQL Server Integration Services tasks"
  - "data preparation tasks [Integration Services]"
  - "directory operations [Integration Services]"
---
# Integration Services Tasks


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  Tasks are control flow elements that define units of work that are performed in a package control flow. An  SQL Server 
  Integration Services 
 package is made up of one or more tasks. If the package contains more than one task, they are connected and sequenced in the control flow by precedence constraints.  
  
 You can also write custom tasks using a programming language that supports COM, such as Visual Basic, or a .NET programming language, such as C#.  
  
 The  SSIS 
 Designer, the graphical tool in  SQL Server 
  Integration Services 
 for working with packages, provides the design surface for creating package control flow, and provides custom editors for configuring tasks. You can also program the  SQL Server 
  Integration Services 
 object model to create packages programmatically.  
  
## Types of Tasks  
  Integration Services 
 includes the following types of tasks.  
  
 Data Flow Task  
 The task that runs data flows to extract data, apply column level transformations, and load data.  
  
 Data Preparation Tasks  
 These tasks do the following processes: copy files and directories; download files and data; run Web methods; apply operations to XML documents; and profile data for cleansing.  
  
 Workflow Tasks  
 The tasks that communicate with other processes to run packages, run programs or batch files, send and receive messages between packages, send e-mail messages, read Windows Management Instrumentation (WMI) data, and watch for WMI events.  
  
 SQL Server Tasks  
 The tasks that access, copy, insert, delete, and modify  SQL Server 
 objects and data.  
  
 Scripting Tasks  
 The tasks that extend package functionality by using scripts.  
  
 Analysis Services Tasks  
 The tasks that create, modify, delete, and process  Analysis Services 
 objects.  
  
 Maintenance Tasks  
 The tasks that perform administrative functions such as backing up and shrinking  SQL Server 
 databases, rebuilding and reorganizing indexes, and running  SQL Server 
 Agent jobs.  
  
 Custom Tasks  
 Additionally, you can write custom tasks using a programming language that supports COM, such as Visual Basic, or a .NET programming language, such as C#. If you want to access your custom task in the  SSIS 
 Designer, you can create and register a user interface for the task. For more information, see [Developing a Custom Task](../extending-packages-custom-objects/task/developing-a-custom-task.md).  
  
## Configuration of Tasks  
 An  Integration Services 
 package can contain a single task, such as an Execute SQL task that deletes records in a database table when the package runs. However, packages typically contain several tasks, and each task is set to run within the context of the package control flow. Event handlers, which are workflows that run in response to run-time events, can also have tasks.  
  
 For more information about adding a task to a package using  SSIS 
 Designer, see [Add or Delete a Task or a Container in a Control Flow](add-or-delete-a-task-or-a-container-in-a-control-flow.md).  
  
 For more information about adding a task to a package programmatically, see [Adding Tasks Programmatically](../building-packages-programmatically/adding-tasks-programmatically.md).  
  
 Each task can be configured individually using the custom dialog boxes for each task that  SSIS 
 Designer provides, or the Properties window included in  SQL Server Data Tools (SSDT) 
. A package can include multiple tasks of the same type-for example, six Execute SQL tasks-and each task can be configured differently. For more information, see [Set the Properties of a Task or Container](add-or-delete-a-task-or-a-container-in-a-control-flow.md).  
  
## Tasks Connections and Groups  
 If the task contains more than one task, they are connected and sequenced in the control flow by precedence constraints. For more information, see [Precedence Constraints](precedence-constraints.md).  
  
 Tasks can be grouped together and performed as a single unit of work, or repeated in a loop. For more information, see [Foreach Loop Container](foreach-loop-container.md), [For Loop Container](for-loop-container.md), and [Sequence Container](sequence-container.md).  
  
## Related Tasks  
 [Add or Delete a Task or a Container in a Control Flow](add-or-delete-a-task-or-a-container-in-a-control-flow.md)
