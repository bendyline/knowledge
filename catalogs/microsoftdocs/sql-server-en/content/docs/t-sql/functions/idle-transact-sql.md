---
title: "@@IDLE (Transact-SQL)"
description: "@@IDLE (Transact-SQL)"
author: markingmyname
ms.author: maghan
ms.date: "09/18/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "@@IDLE_TSQL"
  - "@@IDLE"
helpviewer_keywords:
  - "time [SQL Server], idle"
  - "ticks [SQL Server]"
  - "@@IDLE function"
  - "status information [SQL Server], idle time"
  - "idle time [SQL Server]"
dev_langs:
  - "TSQL"
---
# @@IDLE (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  Returns the time that  SQL Server 
 has been idle since it was last started. The result is in CPU time increments, or "ticks," and is cumulative for all CPUs, so it may exceed the actual elapsed time. Multiply by @@TIMETICKS to convert to microseconds.  
  
> **Note:**  
>  If the time returned in @@CPU_BUSY, or @@IO_BUSY exceeds approximately 49 days of cumulative CPU time, you receive an arithmetic overflow warning. In that case, the value of @@CPU_BUSY, @@IO_BUSY and @@IDLE variables are not accurate.  
  
 
  
## Syntax  
  
```syntaxsql  
@@IDLE  
```  

## Return Types
 **integer**  
  
## Remarks  
 To display a report containing several  SQL Server 
 statistics, run **sp_monitor**.  
  
## Examples  
 The following example shows returning the number of milliseconds  SQL Server 
 was idle between the start time and the current time. To avoid arithmetic overflow when converting the value to microseconds, the example converts one of the values to the `float` data type.  
  
```sql  
SELECT @@IDLE * CAST(@@TIMETICKS AS float) AS 'Idle microseconds',  
   GETDATE() AS 'as of';  
```  
  
  Here's the result set. 
  
  
```  
I  
Idle microseconds  as of                   
----------------- ----------------------  
8199934           12/5/2006 10:23:00 AM   
```  
  
## Related content

- [@@CPU_BUSY (Transact-SQL)](cpu-busy-transact-sql.md)
- [sp_monitor (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-monitor-transact-sql.md)
- [@@IO_BUSY (Transact-SQL)](io-busy-transact-sql.md)
- [System Statistical Functions (Transact-SQL)](system-statistical-functions-transact-sql.md)
