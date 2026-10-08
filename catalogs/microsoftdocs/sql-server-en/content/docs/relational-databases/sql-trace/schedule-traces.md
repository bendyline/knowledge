---
title: "Schedule Traces"
description: "Schedule Traces"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: "03/14/2017"
ms.service: sql
ms.topic: concept-article
helpviewer_keywords:
  - "filters [SQL Server], events"
  - "traces [SQL Server]"
  - "traces [SQL Server], stopping"
  - "events [SQL Server], filters"
  - "scheduling traces [SQL Server]"
  - "traces [SQL Server], scheduling"
  - "stopping traces"
---
# Schedule Traces
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  There are two ways to schedule tracing in Microsoft  SQL Server 
. You can:  
  
-   Enable a trace stop time.  
  
-   Use  SQL Server 
 Agent to schedule a trace.  
  
## Specifying a Stop Time  
 You can specify a trace stop time if you use  Transact-SQL  stored procedures or if you use  SQL Server Profiler 
. The stop time must be set when the trace is originally configured.  
  
## Scheduling Traces by Using SQL Server Agent  
 The best way to schedule traces is to use  SQL Server 
 Agent to start the trace and then specify a trace stop time by using the  Transact-SQL  stored procedure **sp_trace_setstatus**, or  SQL Server Profiler 
.  
  
 **To set an end time filter for a trace**  
  
 [Filter Events Based on the Event End Time &#40;SQL Server Profiler&#41;](../../tools/sql-server-profiler/filter-events-based-on-the-event-end-time-sql-server-profiler.md)  
  
 [sp_trace_setstatus (Transact-SQL)](../system-stored-procedures/sp-trace-setstatus-transact-sql.md)  
  
## Related content

- [Automated Administration Tasks (SQL Server Agent)](https://learn.microsoft.com/ssms/agent/automated-administration-tasks-sql-server-agent)
