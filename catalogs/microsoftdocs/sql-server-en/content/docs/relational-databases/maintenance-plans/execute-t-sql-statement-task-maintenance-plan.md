---
title: "Execute T-SQL Statement Task (Maintenance Plan)"
description: Execute T-SQL Statement Task (Maintenance Plan)
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest
ms.date: 03/27/2023
ms.service: sql
ms.subservice: supportability
ms.topic: how-to
f1_keywords:
  - "sql13.swb.maint.tsql.f1"
helpviewer_keywords:
  - "Execute T-SQL Statement Task dialog box"
---
# Execute T-SQL Statement Task (Maintenance Plan)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Use the **Execute T-SQL Statement Task** dialog to customize your maintenance plan by adding  Transact-SQL  statements of your choice to this maintenance plan.

## Options

- **Connection**

  Select the server connection to use when performing this task.

- **New**

  Create a new server connection to use when performing this task. The **New Connection** dialog box is described below.

- **Execution time out**

  Time (seconds) to wait for task completion before timing out (terminating task).

- **T-SQL statement**

  Transact-SQL  statements to execute.

- **View T-SQL**

  View the  Transact-SQL  statements performed against the server for this task, based on the selected options.

  > **Note:**  
  > When the number of objects affected is large, this display can take a considerable amount of time.

## New Connection dialog box

- **Connection name**

  Enter a name for the new connection.

- **Select or enter a server name**

  Select a server to connect to when performing this task.

- **Refresh**

  Refresh the list of available servers.

- **Enter information to log on to the server**

  Specify how to authenticate against the server.

- **Use Windows integrated security**

  Connect to an instance of the  SQL Server 
  Database Engine 
 with  Microsoft 
 Windows Authentication.

- **Use a specific user name and password**

  Connect to an instance of the  SQL Server 
  Database Engine 
 using  SQL Server 
 Authentication. This option isn't available.

- **User name**

  Provide a  SQL Server 
 login to use when authenticating. This option isn't available.

- **Password**

  Provide a password to use when authenticating. This option isn't available.
