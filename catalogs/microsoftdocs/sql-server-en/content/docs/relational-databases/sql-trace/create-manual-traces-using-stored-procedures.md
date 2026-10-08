---
title: "Create Manual Traces using Stored Procedures"
description: "Create Manual Traces using Stored Procedures"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: "03/14/2017"
ms.service: sql
ms.topic: how-to
---
# Create Manual Traces using Stored Procedures
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Microsoft  SQL Server 
 provides  Transact-SQL  system stored procedures to create traces on an instance of the  SQL Server Database Engine 
. These system stored procedures can be used from within your own applications to create traces manually, instead of using  SQL Server Profiler 
. This allows you to write custom applications specific to the needs of your enterprise.  
  
## In This Section  
 The following table lists the system stored procedures for tracing an instance of the  SQL Server Database Engine 
.  
  
| Stored procedure | Task performed |
| --- | --- |
| [sys.fn_trace_geteventinfo (Transact-SQL)](../system-functions/sys-fn-trace-geteventinfo-transact-sql.md) | Returns information about events included in a trace. |
| [sys.fn_trace_getinfo (Transact-SQL)](../system-functions/sys-fn-trace-getinfo-transact-sql.md) | Returns information about a specified trace or all existing traces. |
| [sp_trace_create (Transact-SQL)](../system-stored-procedures/sp-trace-create-transact-sql.md) | Creates a trace definition. The new trace will be in a stopped state. |
| [sp_trace_generateevent (Transact-SQL)](../system-stored-procedures/sp-trace-generateevent-transact-sql.md) | Creates a user-defined event. |
| [sp_trace_setevent (Transact-SQL)](../system-stored-procedures/sp-trace-setevent-transact-sql.md) | Adds an event class or data column to a trace, or removes one from it. |
| [sp_trace_setstatus (Transact-SQL)](../system-stored-procedures/sp-trace-setstatus-transact-sql.md) | Starts, stops, or closes a trace. |
| [sys.fn_trace_getfilterinfo (Transact-SQL)](../system-functions/sys-fn-trace-getfilterinfo-transact-sql.md) | Returns information about filters applied to a trace. |
| [sp_trace_setfilter (Transact-SQL)](../system-stored-procedures/sp-trace-setfilter-transact-sql.md) | Applies a new or modified filter to a trace. |
  
 **To define your own trace using stored procedures**  
  
1.  Specify the events to capture using **sp_trace_setevent**.  
  
2.  Specify any event filters. For more information, see [Set a Trace Filter (Transact-SQL)](set-a-trace-filter-transact-sql.md).  
  
3.  Specify the destination for the captured event data using **sp_trace_create**.  

 For an example of using trace stored procedures, see [Create a Trace (Transact-SQL)](create-a-trace-transact-sql.md).  
  
 **To set trace definition defaults**  
  
 [SQL Server Profiler](../../tools/sql-server-profiler/set-trace-definition-defaults-sql-server-profiler.md)  
  
 **To set trace display defaults**  
  
 [SQL Server Profiler](../../tools/sql-server-profiler/set-trace-display-defaults-sql-server-profiler.md)  
  
 **To create a trace**  
  
 [SQL Server Profiler](../../tools/sql-server-profiler/create-a-trace-sql-server-profiler.md)  
  
 [Transact-SQL](create-a-trace-transact-sql.md)  
  
 **To add or remove events from a trace template**  
  
 [SQL Server Profiler](../../tools/sql-server-profiler/specify-events-and-data-columns-for-a-trace-file-sql-server-profiler.md)  
  
 [Transact-SQL](../system-stored-procedures/sp-trace-setevent-transact-sql.md)
