---
title: "SQL Server Compact Edition Connection Manager"
description: "SQL Server Compact Edition Connection Manager"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
f1_keywords:
  - "sql13.dts.designer.sqlmobileconnection.connection.f1"
  - "sql13.dts.designer.sqlmobileconnection.all.f1"
helpviewer_keywords:
  - "SQL Server Compact, connection manager"
  - "connections [Integration Services], SQL Server Compact"
  - "connection managers [Integration Services], SQL Server Compact"
---
# SQL Server Compact Edition Connection Manager


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  A  SQL Server 
 Compact connection manager enables a package to connect to a  SQL Server 
 Compact database. The  SQL Server 
 Compact destination that  Microsoft 
  SQL Server 
  Integration Services 
 includes uses this connection manager to load data into a table in a  SQL Server 
 Compact database.  
  
> **Note:**  
>  On a 64-bit computer, you must run packages that connect to  SQL Server 
 Compact data sources in 32-bit mode. The  SQL Server 
 Compact provider that  Integration Services 
 uses to connect to  SQL Server 
 Compact data sources is available only in a 32-bit version. 
SQL Server Compact Edition Connection Manager is not supported from VS2022.  Details refer to [Microsoft SQL Server Compact Lifecycle](https://learn.microsoft.com/lifecycle/products/microsoft-sql-server-compact-40). 
  
## Configuration the SQL Server Compact Edition Connection Manager  
 When you add a  SQL Server 
 Compact connection manager to a package,  Integration Services 
 creates a connection manager that will resolve to a  SQL Server 
 Compact connection at run time, sets the connection manager properties, and adds the connection manager to the **Connections** collection on the package.  
  
 The **ConnectionManagerType** property of the connection manager is set to **SQLMOBILE**.  
  
 You can configure the  SQL Server 
 Compact connection manager in the following ways:  
  
-   Provide a connection string that specifies the location of the  SQL Server 
 Compact database.  
  
-   Provide a password for a password-protected database.  
  
-   Specify the server on which the database is stored.  
  
-   Indicate whether the connection that is created from the connection manager is retained at run time.  
  
 You can set properties through  SSIS 
 Designer or programmatically.  
  
 For information about configuring a connection manager programmatically, see [Microsoft.SqlServer.Dts.Runtime.ConnectionManager](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ConnectionManager) and [Adding Connections Programmatically](../building-packages-programmatically/adding-connections-programmatically.md).  
  
## SQL Server Compact Edition Connection Manager Editor (Connection Page)
  Use the **SQL Server Compact Edition Connection Manager** dialog box to specify properties for connecting to a  SQL Server 
 Compact database.  
  
 To learn more about the  SQL Server 
 Compact Edition connection manager, see [SQL Server Compact Edition Connection Manager](#sql-server-compact-edition-connection-manager).  
  
### Options  
 **Enter the database file name and path**  
 Enter the path and filename for the  SQL Server 
 Compact database.  
  
 **Browse**  
 Locate the desired  SQL Server 
 Compact database file by using the **Select SQL Server Compact Edition database** dialog box.  
  
 **Enter the database password**  
 Enter the password for the  SQL Server 
 Compact database.  
  
## SQL Server Compact Edition Connection Manager Editor (All Page)
  Use the **SQL Server Compact Edition Connection Manager** dialog box to specify properties for connecting to a  SQL Server 
 Compact database.  
  
 To learn more about the  SQL Server 
 Compact Edition connection manager, see [SQL Server Compact Edition Connection Manager](#sql-server-compact-edition-connection-manager).  
  
### Options  
 **AutoShrink Threshold**  
 Specify the amount of free space, as a percentage, that is allowed in the  SQL Server 
 Compact database before the autoshrink process runs.  
  
 **Default Lock Escalation**  
 Specify the number of database locks that the  SQL Server 
 Compact database acquires before it tries to escalate locks.  
  
 **Default Lock Timeout**  
 Specify the default interval, in milliseconds, that a transaction will wait for a lock.  
  
 **Flush Interval**  
 Specify the interval, in seconds, between committed transactions to flush data to disk.  
  
 **Locale Identifier**  
 Specify the Locale ID (LCID) of the  SQL Server 
 Compact database.  
  
 **Max Buffer Size**  
 Specify the maximum amount of memory, in kilobytes, that  SQL Server 
 Compact uses before flushing data to disk.  
  
 **Max Database Size**  
 Specify the maximum size, in megabytes, of the  SQL Server 
 Compact database.  
  
 **Mode**  
 Specify the file mode in which to open the  SQL Server 
 Compact database. The default value for this property is **Read Write**.  
  
 The Mode option has four values, as described in the following table.  
  
| Value | Description |
| --- | --- |
| **Read Only** | Specifies read-only access to the database. |
| **Read Write** | Specifies read/write permission to the database. |
| **Exclusive** | Specifies exclusive access to the database. |
| **Shared Read** | Specifies that other users can read from the database at the same time. |
  
 **Persist Security Info**  
 Specify whether security information is returned as part of the connection string. The default value for this option is **False**.  
  
 **Temp File Directory**  
 Specify the location of the  SQL Server 
 Compact temporary database file.  
  
 **Data Source**  
 Specify the name of the  SQL Server 
 Compact database.  
  
 **Password**  
 Enter the password for the  SQL Server 
 Compact database.
