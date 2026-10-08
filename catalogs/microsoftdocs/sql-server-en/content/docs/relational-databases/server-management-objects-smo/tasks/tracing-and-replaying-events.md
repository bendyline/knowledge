---
title: "Tracing and Replaying Events"
description: "Tracing and Replaying Events"
author: "markingmyname"
ms.author: "maghan"
ms.date: "03/14/2017"
ms.service: sql
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "replaying events"
  - "traces [SMO]"
  - "events [SMO], replaying"
  - "events [SMO], tracing"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Tracing and Replaying Events

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



  In SMO, the **Trace** and **Replay** objects in the [Microsoft.SqlServer.Management.Trace](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Trace) namespace provide programmatic access to the  SQL Server Profiler 
 functionality, which is used for monitoring an instance of  SQL Server 
 or  Analysis Services 
. You can capture and save data about each event to a file or table to analyze later. For example, you can monitor a production environment to see which procedures are impeding performance by executing too slowly.  
  
 The **Trace** and **Replay** objects provide a set of objects that can be used to create traces on an instance of  SQL Server 
. These objects can be used from within your own applications to create traces manually for  SQL Server 
 or  Analysis Services 
. Additionally, SMO **Trace** objects can be used to read SQL Trace files and tables that were created by monitoring  SQL Server 
,  Analysis Services 
, or DTS logging.  
  
 SMO **Trace** objects let you perform the following functions:  
  
-   Create a trace.  
  
-   Set filters on the trace.  
  
-   Set the events that are being traced.  
  
-   Stop or start a trace.  
  
-   Read trace files, and trace tables.  
  
-   Get information about events on a trace.  
  
-   Get information about filters on a trace.  
  
-   Manipulate trace data programmatically.  
  
-   Write trace tables and trace files.  
  
-   Replay trace files or trace tables.  
  
 The trace data from the **Trace** and **Replay** objects can be used by the SMO application, or it can be examined manually by using [SQL Server Profiler](../../../tools/sql-server-profiler/sql-server-profiler.md). The trace data is also compatible with the [SQL Trace](../../sql-trace/sql-trace.md) stored procedures that also provide tracing capabilities.  
  
 The SMO trace objects reside in the [Microsoft.SqlServer.Management.Trace](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Trace) namespace, which requires a reference to the Microsoft.SQLServer.ConnectionInfo.dll file.  
  
 The **Trace** and **Replay** objects require a [ServerConnection](https://learn.microsoft.com/previous-versions/sql/sql-server-2014/ms218641\(v=sql.120\))[Microsoft.SqlServer.Management.Smo.Server.%23ctor%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server.%2523ctor%252A) object to establish a connection with the instance of  SQL Server 
. The [ServerConnection](https://learn.microsoft.com/previous-versions/sql/sql-server-2014/ms218641\(v=sql.120\)) object resides in the [Microsoft.SqlServer.Management.Common](https://learn.microsoft.com/previous-versions/sql/sql-server-2014/ms212673\(v=sql.120\)) namespace, which requires a reference to the Microsoft.SQLServer.ConnectionInfo.dll file.  
  
> **Note:**  
>  The **Trace** and **Replay** objects are not supported on a 64-bit platform.
