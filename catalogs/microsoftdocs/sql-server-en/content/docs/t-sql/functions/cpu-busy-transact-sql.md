---
title: CPU_BUSY (Transact-SQL)
description: "@@CPU_BUSY (Transact-SQL)"
author: markingmyname
ms.author: maghan
ms.date: "09/18/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "@@CPU_BUSY_TSQL"
  - "@@CPU_BUSY"
helpviewer_keywords:
  - "CPU [SQL Server]"
  - "status information [SQL Server], CPU"
  - "ticks [SQL Server]"
  - "time [SQL Server], CPU activity"
  - "@@CPU_BUSY function"
  - "statistical information [SQL Server], CPU"
  - "CPU [SQL Server], activity"
dev_langs:
  - "TSQL"
---

# @@CPU_BUSY (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





This function returns the amount of time that  SQL Server 
 has spent in active operation since its latest start. `@@CPU_BUSY` returns a result measured in CPU time increments, or "ticks." This value is cumulative for all CPUs, so it may exceed the actual elapsed time. To convert to microseconds, multiply by [@@TIMETICKS](timeticks-transact-sql.md).
  
> **Note:**  
>  If the time returned in @@CPU_BUSY or @@IO_BUSY exceeds 49 days (approximately) of cumulative CPU time, you may receive an arithmetic overflow warning. In that case, the value of the `@@CPU_BUSY`, `@@IO_BUSY` and `@@IDLE` variables are not accurate.  
  

  
## Syntax  
  
```syntaxsql
@@CPU_BUSY  
```  

## Return types
**integer**
  
## Remarks  
To see a report containing several  SQL Server 
 statistics, including CPU activity, run [sp_monitor](../../relational-databases/system-stored-procedures/sp-monitor-transact-sql.md).
  
## Examples  
This example returns  SQL Server 
 CPU activity, as of the current date and time. The example converts one of the values to the `float` data type. This avoids arithmetic overflow issues when calculating a value in microseconds.
  
```sql
SELECT @@CPU_BUSY * CAST(@@TIMETICKS AS FLOAT) AS 'CPU microseconds',   
   GETDATE() AS 'As of' ;  
```  
  
 Here's the result set. 

  
```
CPU microseconds As of
---------------- -----------------------
18406250         2006-12-05 17:00:50.600
```
  
## Related content

- [sys.dm_os_sys_info (Transact-SQL)](../../relational-databases/system-dynamic-management-objects/sys-dm-os-sys-info-transact-sql.md)
- [@@IDLE (Transact-SQL)](idle-transact-sql.md)
- [@@IO_BUSY (Transact-SQL)](io-busy-transact-sql.md)
- [sp_monitor (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-monitor-transact-sql.md)
- [System Statistical Functions (Transact-SQL)](system-statistical-functions-transact-sql.md)
