---
title: "Extending the Package with the Script Task"
description: "Extending the Package with the Script Task"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "scripts [Integration Services]"
  - "SSIS Script task"
  - "tasks [Integration Services], scripts"
  - "Script task [Integration Services], about Script task"
  - "scripts [Integration Services], about Script task with packages"
  - "SSIS Script task, about Script task"
dev_langs:
  - "VB"
---
# Extending the Package with the Script Task


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  The Script task extends the run-time capabilities of  Microsoft 
  Integration Services 
 packages with custom code written in  Microsoft 
 Visual Basic or  Microsoft 
 Visual C# that is compiled and executed at package run time. The Script task simplifies the development of a custom run-time task when the tasks included with  Integration Services 
 do not fully satisfy your requirements. The Script task writes all the required infrastructure code for you, letting you focus exclusively on the code that is required for your custom processing.  
  
 A Script task interacts with the containing package through the global **Dts** object, an instance of the [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel) class that is exposed in the scripting environment. You can write code in a Script task that modifies the values stored in  Integration Services 
 variables; later, the package can use those updated values to determine the path of its workflow. The Script task can also use the  Visual Basic  namespace and the  .NET Framework 
 class library, as well as custom assemblies, to implement custom functionality.  
  
 The Script task and the infrastructure code that it generates for you simplify significantly the process of developing a custom task. However, to understand how the Script task works, you may find it useful to read the section [Developing a Custom Task](../../extending-packages-custom-objects/task/developing-a-custom-task.md) to understand the steps that are involved in developing a custom task.  
  
 If you are creating a task that you plan to reuse in multiple packages, you should consider developing a custom task instead of using the Script task. For more information, see [Comparing Scripting Solutions and Custom Objects](../comparing-scripting-solutions-and-custom-objects.md).  
  
## In This Section  
 The following topics provide more information about the Script task.  
  
 [Configuring the Script Task in the Script Task Editor](configuring-the-script-task-in-the-script-task-editor.md)  
 Explains how the properties that you configure in the **Script Task Editor** affect the capabilities and the performance of the code in the Script task.  
  
 [Coding and Debugging the Script Task](coding-and-debugging-the-script-task.md)  
 Explains how to use  Microsoft 
  Visual Studio 
 Tools for Applications (VSTA) to develop the scripts that are contained in the Script task.  
  
 [Using Variables in the Script Task](using-variables-in-the-script-task.md)  
 Explains how to use variables through the [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Variables%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Variables%252A) property.  
  
 [Connecting to Data Sources in the Script Task](connecting-to-data-sources-in-the-script-task.md)  
 Explains how to use connections through the [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Connections%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Connections%252A) property.  
  
 [Raising Events in the Script Task](raising-events-in-the-script-task.md)  
 Explains how to raise events through the [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Events%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Events%252A) property.  
  
 [Logging in the Script Task](logging-in-the-script-task.md)  
 Explains how to log information through the [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Log%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Log%252A) method.  
  
 [Returning Results from the Script Task](returning-results-from-the-script-task.md)  
 Explains how to return results through the property [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.TaskResult%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.TaskResult%252A) and the [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.ExecutionValue%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.ExecutionValue%252A) property.  
  
 [Script Task Examples](../../extending-packages-scripting-task-examples/script-task-examples.md)  
 Provides simple examples that demonstrate several possible uses for a Script task.  
  
## Related content

- [Script Task](../../control-flow/script-task.md)
- [Comparing the Script Task and the Script Component](../comparing-the-script-task-and-the-script-component.md)
