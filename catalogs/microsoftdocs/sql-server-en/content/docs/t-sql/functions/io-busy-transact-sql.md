---
title: "@@IO_BUSY (Transact-SQL)"
description: "@@IO_BUSY (Transact-SQL)"
author: markingmyname
ms.author: maghan
ms.date: "09/18/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "@@IO_BUSY"
  - "@@IO_BUSY_TSQL"
helpviewer_keywords:
  - "ticks [SQL Server]"
  - "I/O [SQL Server], time spent performing operations"
  - "@@IO_BUSY function"
  - "output operations [SQL Server]"
  - "input operations [SQL Server]"
  - "time [SQL Server], I/O operations"
dev_langs:
  - "TSQL"
---
# @@IO_BUSY (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  Returns the time that  SQL Server 
 has spent performing input and output operations since  SQL Server 
 was last started. The result is in CPU time increments ("ticks"), and is cumulative for all CPUs, so it may exceed the actual elapsed time. Multiply by @@TIMETICKS to convert to microseconds.  
  
> **Note:**  
>  If the time returned in @@CPU_BUSY, or @@IO_BUSY exceeds approximately 49 days of cumulative CPU time, you receive an arithmetic overflow warning. In that case, the value of @@CPU_BUSY, @@IO_BUSY and @@IDLE variables are not accurate.  
  
 
  
## Syntax  
  
```syntaxsql  
@@IO_BUSY  
```  

## Return Types
 **integer**  
  
## Remarks  
 To display a report containing several  SQL Server 
 statistics, run sp_monitor.  
  
## Examples  
 The following example shows returning the number of milliseconds  SQL Server 
 has spent performing input/output operations between the start time and the current time. To avoid arithmetic overflow when converting the value to microseconds, the example converts one of the values to the **float** data type.  
  
```sql  
SELECT @@IO_BUSY*@@TIMETICKS AS 'IO microseconds',   
   GETDATE() AS 'as of';  
```  
  
 Here is a typical result set:  
  
```  
  
IO microseconds as of                   
--------------- ----------------------  
4552312500      12/5/2006 10:23:00 AM   
```  
  
## Related content

- [sys.dm_os_sys_info (Transact-SQL)](../../relational-databases/system-dynamic-management-objects/sys-dm-os-sys-info-transact-sql.md)
- [@@CPU_BUSY (Transact-SQL)](cpu-busy-transact-sql.md)
- [sp_monitor (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-monitor-transact-sql.md)
- [System Statistical Functions (Transact-SQL)](system-statistical-functions-transact-sql.md)
