---
title: "Integration Services Containers"
description: "Integration Services Containers"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
helpviewer_keywords:
  - "SSIS containers"
  - "containers [Integration Services]"
  - "containers [Integration Services], about containers"
  - "control flow [Integration Services], containers"
  - "SQL Server Integration Services containers"
---
# Integration Services Containers


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  Containers are objects in  SQL Server 
  Integration Services 
 that provide structure to packages and services to tasks. They support repeating control flows in packages, and they group tasks and containers into meaningful units of work. Containers can include other containers in addition to tasks.  
  
 Packages use containers for the following purposes:  
  
-   Repeat tasks for each element in a collection, such as files in a folder, schemas, or  SQL Server 
 Management Objects (SMO) objects. For example, a package can run Transact-SQL statements that reside in multiple files.  
  
-   Repeat tasks until a specified expression evaluates to **false**. For example, a package can send a different e-mail message seven times, one time for every day of the week.  
  
-   Group tasks and containers that must succeed or fail as a unit. For example, a package can group tasks that delete and add rows in a database table, and then commit or roll back all the tasks when one fails.  
  
## Container Types  
  Integration Services 
 provides four types of containers for building packages. The following table lists the container types.  
  
| Container | Description |
| --- | --- |
| [Foreach Loop Container](foreach-loop-container.md) | Runs a control flow repeatedly by using an enumerator. |
| [For Loop Container](for-loop-container.md) | Runs a control flow repeatedly by testing a condition. |
| [Sequence Container](sequence-container.md) | Groups tasks and containers into control flows that are subsets of the package control flow. |
| [Task Host Container](task-host-container.md) | Provides services to a single task. |
  
 Packages and events handlers are also types of containers. For information see [Integration Services (SSIS) Packages](../integration-services-ssis-packages.md) and [Integration Services (SSIS) Event Handlers](../integration-services-ssis-event-handlers.md).  
  
### Summary of Container Properties  
 All container types have a set of properties in common. If you create packages using the graphical tools that  Integration Services 
 provides, the Properties window lists the following properties for the Foreach Loop, For Loop, and Sequence containers. The task host container properties are configured as part of configuring the task that the task host encapsulates. You set the Task Host properties when you configure the task.  
  
| Property | Description |
| --- | --- |
| **DelayValidation** | A Boolean value that indicates whether validation of the container is delayed until run time. The default value for this property is **False**.<br /><br /> For more information, see [Microsoft.SqlServer.Dts.Runtime.DtsContainer.DelayValidation%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsContainer.DelayValidation%252A). |
| **Description** | The container description. The property contains a string, but may be blank.<br /><br /> For more information, see [Microsoft.SqlServer.Dts.Runtime.DtsContainer.Description%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsContainer.Description%252A). |
| **Disable** | A Boolean value that indicates whether the container runs. The default value for this property is **False**.<br /><br /> For more information, see [Microsoft.SqlServer.Dts.Runtime.DtsContainer.Disable%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsContainer.Disable%252A). |
| **DisableEventHandlers** | A Boolean value that indicates whether the event handlers associated with the container run. The default value for this property is **False**. |
| **FailPackageOnFailure** | A Boolean value that specifies whether the package fails if an error occurs in the container. The default value for this property is **False**.<br /><br /> For more information, see [Microsoft.SqlServer.Dts.Runtime.DtsContainer.FailPackageOnFailure%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsContainer.FailPackageOnFailure%252A). |
| **FailParentOnFailure** | A Boolean value that specifies whether the parent container fails if an error occurs in the container. The default value for this property is **False**.<br /><br /> For more information, see [Microsoft.SqlServer.Dts.Runtime.DtsContainer.FailParentOnFailure%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsContainer.FailParentOnFailure%252A). |
| **ForcedExecutionValue** | If **ForceExecutionValue** is set to **True**, the object that contains the optional execution value for the container. The default value of this property is **0**.<br /><br /> For more information, see [Microsoft.SqlServer.Dts.Runtime.DtsContainer.ForcedExecutionValue%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsContainer.ForcedExecutionValue%252A). |
| **ForcedExecutionValueType** | The data type of **ForcedExecutionValue**. The default value of this property is **Int32**. |
| **ForceExecutionResult** | A value that specifies the forced result of running the package or container. The values are **None**, **Success**, **Failure**, and **Completion**. The default value for this property is **None**.<br /><br /> For more information, see [Microsoft.SqlServer.Dts.Runtime.DtsContainer.ForceExecutionResult%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsContainer.ForceExecutionResult%252A). |
| **ForceExecutionValue** | A Boolean value that specifies whether the optional execution value of the container should be forced to contain a particular value. The default value of this property is **False**.<br /><br /> For more information, see [Microsoft.SqlServer.Dts.Runtime.DtsContainer.ForceExecutionValue%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsContainer.ForceExecutionValue%252A). |
| **ID** | The container GUID, which is assigned when the package is created. This property is read-only.<br /><br /> [Microsoft.SqlServer.Dts.Runtime.DtsContainer.ID%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsContainer.ID%252A). |
| **IsolationLevel** | The isolation level of the container transaction. The values are **Unspecified**, **Chaos**, **ReadUncommitted**, **ReadCommitted**, **RepeatableRead**, **Serializable**, and **Snapshot**. The default value of this property is **Serializable**. For more information, see [Microsoft.SqlServer.Dts.Runtime.DtsContainer.IsolationLevel%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsContainer.IsolationLevel%252A). |
| **LocaleID** | A Microsoft Win32 locale. The default value of this property is the locale of the operating system on the local computer.<br /><br /> For more information, see [Microsoft.SqlServer.Dts.Runtime.DtsContainer.LocaleID%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsContainer.LocaleID%252A). |
| **LoggingMode** | A value that specifies the logging behavior of the container. The values are **Disabled**, **Enabled**, and **UseParentSetting**. The default value of this property is **UseParentSetting**. For more information, see [Microsoft.SqlServer.Dts.Runtime.DTSLoggingMode](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DTSLoggingMode). |
| **MaximumErrorCount** | The maximum number of errors that can occur before a container stops running. The default value of this property is **1**.<br /><br /> For more information, see [Microsoft.SqlServer.Dts.Runtime.DtsContainer.MaximumErrorCount%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsContainer.MaximumErrorCount%252A). |
| **Name** | The name of the container.<br /><br /> For more information, see [Microsoft.SqlServer.Dts.Runtime.DtsContainer.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsContainer.Name%252A). |
| **TransactionOption** | The transactional participation of the container. The values are **NotSupported**, **Supported**, **Required**. The default value of this property is **Supported**. For more information, see [Microsoft.SqlServer.Dts.Runtime.DTSTransactionOption](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DTSTransactionOption). |
  
 To learn about all the properties that are available to Foreach Loop, For Loop, Sequence, and Task Host containers when configure them programmatically, see the following  Integration Services 
 API topics:  
  
-   T:Microsoft.SqlServer.Dts.Runtime.ForEachLoop  
  
-   T:Microsoft.SqlServer.Dts.Runtime.ForLoop  
  
-   T:Microsoft.SqlServer.Dts.Runtime.Sequence  
  
-   T:Microsoft.SqlServer.Dts.Runtime.TaskHost  
  
## Objects that Extend Container Functionality  
 Containers include control flows that consist of executables and precedence constraints, and may use event handlers, and variables. The task host container is an exception: because the task host container encapsulates a single task, it does not use precedence constraints.  
  
### Executables  
 Executables refers to the container-level tasks and any containers within the container. An executable can be one of the tasks and containers that  Integration Services 
 provides or a custom task. For more information, see [Integration Services Tasks](integration-services-tasks.md).  
  
### Precedence Constraints  
 Precedence constraints link containers and tasks within the same parent container into an ordered control flow. For more information, see [Precedence Constraints](precedence-constraints.md).  
  
### Event Handlers  
 Event handlers at the container level respond to events raised by the container or the objects it includes. For more information, see [Integration Services (SSIS) Event Handlers](../integration-services-ssis-event-handlers.md).  
  
### Variables  
 Variables that are used in containers include the container-level system variables that  Integration Services 
 provides and the user-defined variables that the container uses. For more information, see [Integration Services (SSIS) Variables](../integration-services-ssis-variables.md).  
  
## Break Points  
 When you set a breakpoint on a container and the break condition is **Break when the container receives the OnVariableValueChanged event**, define the variable in the container scope.  
  
## Related content

- [Control Flow](control-flow.md)
