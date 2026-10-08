---
title: "MSMQ Connection Manager"
description: "MSMQ Connection Manager"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
f1_keywords:
  - "sql13.dts.designer.msmqconnectionmanager.f1"
helpviewer_keywords:
  - "connections [Integration Services], message queues"
  - "connection managers [Integration Services], MSMQ"
  - "MSMQ connection manager"
  - "message queue connections [Integration Services]"
---
# MSMQ Connection Manager


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  An MSMQ connection manager enables a package to connect to a message queue that uses Message Queuing (also known as MSMQ). The Message Queue task that  Microsoft 
  SQL Server 
  Integration Services 
 includes uses an MSMQ connection manager.  
  
 When you add an MSMQ connection manager to a package,  Integration Services 
 creates a connection manager that will resolve to an MSMQ connection at run time, sets the connection manager properties, and adds the connection manager to the **Connections** collection on the package. The **ConnectionManagerType** property of the connection manager is set to **MSMQ**.  
  
 You can configure an MSMQ connection manager in the following ways:  
  
-   Provide a connection string.  
  
-   Provide the path of the message queue to connect to.  
  
 The format of the path depends on the type of queue, as shown in the following table.  
  
| Queue type | Sample path |
| --- | --- |
| Public | \<computer name>\\<queue name\> |
| Private | \<computer name>\Private$\\<queue name\> |
  
 You can use a period (.) to represent the local computer.  
  
## Configuration of the MSMQ Connection Manager  
 You can set properties through  SSIS 
 Designer or programmatically.  
  
 For information about configuring a connection manager programmatically, see [Microsoft.SqlServer.Dts.Runtime.ConnectionManager](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ConnectionManager) and [Adding Connections Programmatically](../building-packages-programmatically/adding-connections-programmatically.md).  
  
## MSMQ Connection Manager Editor
  Use the **MSMQ Connection Manager** dialog box to specify the path to a Message Queuing (also known as MSMQ) message queue.  
  
 To learn more about the MSMQ connection manager, see [MSMQ Connection Manager](#msmq-connection-manager).  
  
> **Note:**  
>  The MSMQ connection manager supports local public and private queues and remote public queues. It does not support remote private queues. For a workaround that uses the Script Task, see [Sending to a Remote Private Message Queue with the Script Task](../extending-packages-scripting-task-examples/sending-to-a-remote-private-message-queue-with-the-script-task.md).  
  
### Options  
 **Name**  
 Provide a unique name for the MSMQ connection manager in the workflow. The name provided will be displayed within  SSIS 
 Designer.  
  
 **Description**  
 Describe the connection manager. As a best practice, describe the connection manager in terms of its purpose, to make packages self-documenting and easier to maintain.  
  
 **Path**  
 Type the complete path of the message queue. The format of the path depends on the type of queue.  
  
| Queue type | Sample path |
| --- | --- |
| Public | \<computer name>\\<queue name\> |
| Private | \<computer name>\Private$\\<queue name\> |
  
 You can use "." to represent the local computer.  
  
 **Test**  
 After configuring the MSMQ connection manager, confirm that the connection is viable by clicking **Test**.  
  
## Related content

- [Message Queue Task](../control-flow/message-queue-task.md)
- [Integration Services (SSIS) Connections](integration-services-ssis-connections.md)
