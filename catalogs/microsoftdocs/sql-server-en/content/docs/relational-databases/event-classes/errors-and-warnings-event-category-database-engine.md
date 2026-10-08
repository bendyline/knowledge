---
title: "Errors and Warnings Event Category"
description: "Errors and Warnings Event Category (Database Engine)"
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: 06/03/2020
ms.service: sql
ms.subservice: supportability
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "Errors and Warnings event category [SQL Server]"
  - "SQL Server event classes, Errors and Warnings event category"
  - "event classes [SQL Server], Errors and Warnings event category"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Errors and Warnings Event Category (Database Engine)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


  The **Errors and Warnings** event category contains general error and warning events.  
  
## In This Section  
  
| Topic | Description |
| --- | --- |
| [Attention Event Class](attention-event-class.md) | Indicates that an **Attention** event has occurred. |
| [Background Job Error Event Class](background-job-error-event-class.md) | Indicates that a background job has terminated abnormally. |
| [Bitmap Warning Event Class](bitmap-warning-event-class.md) | Indicates that bitmap filtering has been disabled in a query. |
| [Blocked Process Report Event Class](blocked-process-report-event-class.md) | Indicates that a task has been blocked for more than a specified amount of time. |
| [CPU Threshold Exceeded Event Class](cpu-threshold-exceeded-event-class.md) | Indicates that the Resource Governor detects a query that exceeds the specified CPU threshold. |
| [ErrorLog Event Class](errorlog-event-class.md) | Indicates that error events have been logged in the  SQL Server |
 | error log. |
| [EventLog Event Class](eventlog-event-class.md) | Indicates that events have been logged in the Windows event log. |
| [Exception Event Class](exception-event-class.md) | Indicates that an exception has occurred in  SQL Server |
| . |
| [Exchange Spill Event Class](exchange-spill-event-class.md) | Indicates that communication buffers in a parallel query plan have been written to the tempdb database. |
| [Execution Warnings Event Class](execution-warnings-event-class.md) | Indicates that memory grant warnings occurred during the execution of a  SQL Server |
 | statement or stored procedure. |
| [Hash Warning Event Class](hash-warning-event-class.md) | Indicates that a hash recursion or hash bailout has occurred during a hashing operation. |
| [Missing Column Statistics Event Class](missing-column-statistics-event-class.md) | Indicates that column statistics that could have been useful for the optimizer are not available. |
| [Missing Join Predicate Event Class](missing-join-predicate-event-class.md) | Indicates that a query is being executed that has no join predicate. |
| [Sort Warnings Event Class](sort-warnings-event-class.md) | Indicates that sort operations do not fit into memory. |
| [User Error Message Event Class](user-error-message-event-class.md) | Displays error messages that are seen by the user. |
  
## Related content

- [sp_trace_setevent (Transact-SQL)](../system-stored-procedures/sp-trace-setevent-transact-sql.md)
