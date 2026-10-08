---
title: "Stored Procedures Event Category"
description: "Stored Procedures Event Category"
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "Stored Procedures event category [SQL Server]"
  - "SQL Server event classes, Stored Procedures event category"
  - "event classes [SQL Server], Stored Procedures event category"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Stored Procedures Event Category

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


  The **Stored Procedures** event category contains general stored procedure events.  
  
## In This Section  
  
| Topic | Description |
| --- | --- |
| [RPC:Completed Event Class](rpc-completed-event-class.md) | Indicates that a remote procedure call (RPC) has been completed. |
| [PreConnect:Completed Event Class](preconnect-completed-event-class.md) | Indicates when the Resource Governor classifier function finishes execution. |
| [PreConnect:Starting Event Class](preconnect-starting-event-class.md) | Indicates when the Resource Governor classifier function starts execution. |
| [RPC Output Parameter Event Class](rpc-output-parameter-event-class.md) | Traces the output parameter values of remote procedure calls after execution. |
| [RPC:Starting Event Class](rpc-starting-event-class.md) | Indicates that a remote procedure call is starting. |
| [SP:CacheHit Event Class](sp-cachehit-event-class.md) | Indicates that the stored procedure is in the cache. |
| [SP:CacheInsert Event Class](sp-cacheinsert-event-class.md) | Indicates that the stored procedure has been brought into the cache. |
| [SP:CacheMiss Event Class](sp-cachemiss-event-class.md) | Indicates that the stored procedure was not found in the cache. |
| [SP:CacheRemove Event Class](sp-cacheremove-event-class.md) | Indicates that the stored procedure has been removed from the cache. |
| [SP:Completed Event Class](sp-completed-event-class.md) | Indicates that execution of the stored procedure has completed. |
| [SP:Recompile Event Class](sp-recompile-event-class.md) | Indicates that the stored procedure has been recompiled. |
| [SP:Starting Event Class](sp-starting-event-class.md) | Indicates that execution of the stored procedure is starting. |
| [SP:StmtCompleted Event Class](sp-stmtcompleted-event-class.md) | Indicates that a  Transact-SQL  statement within a stored procedure has completed. |
| [SP:StmtStarting Event Class](sp-stmtstarting-event-class.md) | Indicates that a  Transact-SQL  statement within a stored procedure has started. |
  
## Related content

- [Extended Events overview](../extended-events/extended-events.md)
- [sp_trace_setevent (Transact-SQL)](../system-stored-procedures/sp-trace-setevent-transact-sql.md)
