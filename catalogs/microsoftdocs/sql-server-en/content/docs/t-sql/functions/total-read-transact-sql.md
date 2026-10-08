---
title: "@@TOTAL_READ (Transact-SQL)"
description: "@@TOTAL_READ (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "09/17/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "@@TOTAL_READ_TSQL"
  - "@@TOTAL_READ"
helpviewer_keywords:
  - "number of disk reads"
  - "disks [SQL Server], number of disk reads"
  - "@@TOTAL_READ function"
  - "total read [SQL Server]"
  - "read activity since last started"
dev_langs:
  - "TSQL"
---
# @@TOTAL_READ (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  Returns the number of disk reads, not cache reads, by  SQL Server 
 since  SQL Server 
 was last started.  
  
 
  
## Syntax  
  
```syntaxsql
@@TOTAL_READ  
```  
  
## Return Types
 **integer**  
  
## Remarks  
 To display a report containing several  SQL Server 
 statistics, including read and write activity, run **sp_monitor**.  
  
## Examples  
 The following example shows returning the total number of disk read and writes as of the current date and time.  
  
```sql
SELECT @@TOTAL_READ AS 'Reads', @@TOTAL_WRITE AS 'Writes', GETDATE() AS 'As of';  
```  
  
  Here's the result set. 
  
  
```  
Reads       Writes      As of                   
----------- ----------- ----------------------  
7760        97263       12/5/2006 10:23:00 PM   
```  
  
## Related content

- [sp_monitor (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-monitor-transact-sql.md)
- [System Statistical Functions (Transact-SQL)](system-statistical-functions-transact-sql.md)
- [@@TOTAL_WRITE (Transact-SQL)](total-write-transact-sql.md)
