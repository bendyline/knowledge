---
title: "Returning Results from the Script Task"
description: "Returning Results from the Script Task"
ms.date: "03/04/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "Script task [Integration Services], status information"
  - "ExecutionValue property"
  - "status information [Integration Services]"
  - "TaskResult property"
  - "SSIS Script task, status information"
dev_langs:
  - "VB"
---
# Returning Results from the Script Task


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  The Script task uses the [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.TaskResult%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.TaskResult%252A) and the optional [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.ExecutionValue%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.ExecutionValue%252A) properties to return status information to the  Integration Services 
 runtime that can be used to determine the path of the workflow after the Script task has finished.  
  
## TaskResult  
 The [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.TaskResult%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.TaskResult%252A) property reports whether the task succeeded or failed. For example:  
  
 `Dts.TaskResult = ScriptResults.Success`  
  
## ExecutionValue  
 The [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.ExecutionValue%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.ExecutionValue%252A) property optionally returns a user-defined object that quantifies or provides more information about the success or failure of the Script task. For example, the FTP task uses the [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.ExecutionValue%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.ExecutionValue%252A) property to return the number of files transferred. The Execute SQL task returns the number of rows affected by the task. The [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.ExecutionValue%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.ExecutionValue%252A) can also be used to determine the path of the workflow. For example:  
  
 `Dim rowsAffected as Integer`  
  
 `...`  
  
 `rowsAffected = 1000`  
  
 `Dts.ExecutionValue = rowsAffected`
