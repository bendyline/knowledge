---
title: "@@PACK_RECEIVED (Transact-SQL)"
description: "@@PACK_RECEIVED (Transact-SQL)"
author: VanMSFT
ms.author: vanto
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "@@PACK_RECEIVED_TSQL"
  - "@@PACK_RECEIVED"
helpviewer_keywords:
  - "@@PACK_RECEIVED function"
  - "number of packets read"
  - "packets [SQL Server], number read"
dev_langs:
  - "TSQL"
---
# @@PACK_RECEIVED (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  Returns the number of input packets read from the network by  SQL Server 
 since it was last started.  
  
 
  
## Syntax  
  
```syntaxsql  
@@PACK_RECEIVED  
```  
  
## Return Types
 **integer**  
  
## Remarks  
 To display a report containing several  SQL Server 
 statistics, including packets sent and received, run **sp_monitor**.  
  
## Examples  
 The following example shows the usage of `@@PACK_RECEIVED`.  
  
```sql  
SELECT @@PACK_RECEIVED AS 'Packets Received';   
```  
  
 Here is a sample result set.  
  
```  
Packets Received  
----------------  
128  
```  
  
## Related content

- [@@PACK_SENT (Transact-SQL)](pack-sent-transact-sql.md)
- [sp_monitor (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-monitor-transact-sql.md)
- [System Statistical Functions (Transact-SQL)](system-statistical-functions-transact-sql.md)
