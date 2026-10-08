---
title: Run SQL Server Profiler
titleSuffix: SQL Server Profiler
description: Learn which programs and menus you can start SQL Server Profiler from and which connection contexts, templates, and filters are used with trace output.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: erinstellato, maghan
ms.date: 06/05/2025
ms.service: sql
ms.subservice: profiler
ms.topic: how-to
ms.collection:
  - data-tools
---

# Run SQL Server Profiler


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





You can run  SQL Server Profiler 
 in several different ways, to support gathering trace output in various scenarios. You can start  SQL Server Profiler 
 from the Windows **Start** menu, from the **Tools** menu in  Database Engine 
 Tuning Advisor, and from several locations in  SQL Server Management Studio 
.

When you first start  SQL Server Profiler 
 and select **New Trace** from the **File** menu, the application displays a **Connect to Server** dialog box where you can specify a  SQL Server 
 instance to connect to.

## Start SQL Server Profiler

The following sections describe the ways to start SQL Server Profiler.

### Start SQL Server Profiler from the Windows Start menu

Select the Windows **Start** icon or press the Windows key and start to type "SQL Server Profiler 18", or a later version as appropriate. When the **SQL Server Profiler 18** tile appears, select it.

### Start SQL Server Profiler in Database Engine Tuning Advisor

On the  Database Engine 
 Tuning Advisor **Tools** menu, select **SQL Server Profiler**.

### Start SQL Server Profiler in SQL Server Management Studio

You can start  SQL Server Profiler 
 from several locations in  SQL Server Management Studio 
. When  SQL Server Profiler 
 starts, it loads the connection context, trace template, and filter context of its launch point.  SQL Server Management Studio 
 starts each SQL Server Profiler session in its own instance, and Profiler continues to run if you shut down  SQL Server Management Studio 
.

### Start SQL Server Profiler from the Tools menu

In the  SQL Server Management Studio 
 **Tools** menu, select **SQL Server Profiler**.

### Start SQL Server Profiler from the Query Editor

In Query Editor, right-click and then select **Trace Query in SQL Server Profiler**.

The connection context is the editor connection, the trace template is TSQL_SPs, and the applied filter is SPID = query window session ID.

When you start  SQL Server Profiler 
 in  SSMS 20
 from the Query Editor, the connection context isn't loaded, and a trace isn't automatically configured. You must manually [create a trace](create-a-trace-sql-server-profiler.md) and start it.

### Start SQL Server Profiler from Activity Monitor

In Activity Monitor, select the **Processes** pane, right-click the process that you want to profile, and then select **Trace Process in SQL Server Profiler**.

When a process is selected, the connection context is the Object Explorer connection when Activity Monitor was opened. The trace template is the default based on the server type, and the SPID equals the session ID for the selected process.

## .NET Framework security

In Windows Authentication mode, the user account that runs  SQL Server Profiler 
 must have permission to connect to the instance of  SQL Server 
.

To perform tracing with  SQL Server Profiler 
, users must also have the ALTER TRACE permission.

## Related content

- [SQL Server Profiler](sql-server-profiler.md)
- [Use SQL Server Management Studio](https://learn.microsoft.com/ssms/sql-server-management-studio-ssms)
