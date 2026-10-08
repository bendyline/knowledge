---
title: "@@PACK_SENT (Transact-SQL)"
description: "@@PACK_SENT (Transact-SQL)"
author: VanMSFT
ms.author: vanto
ms.date: "09/18/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "@@PACK_SENT"
  - "@@PACK_SENT_TSQL"
helpviewer_keywords:
  - "number of output packets written"
  - "@@PACK_SENT function"
  - "packets [SQL Server], output"
  - "networking [SQL Server], output packets"
  - "connections [SQL Server], packets"
  - "output packets written to network [SQL Server]"
dev_langs:
  - "TSQL"
---
# @@PACK_SENT (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  Returns the number of output packets written to the network by  SQL Server 
 since it was last started.  
  
 
  
## Syntax  
  
```syntaxsql
@@PACK_SENT  
```  
  
## Return Types
 **integer**  
  
## Remarks  
 To display a report containing several  SQL Server 
 statistics, including packets sent and received, run **sp_monitor**.  
  
## Examples  
 The following example shows the usage of `@@PACK_SENT`.  
  
```sql
SELECT @@PACK_SENT AS 'Pack Sent';  
```  
  
 Here is a sample result set.  
  
```  
Pack Sent  
-----------  
291  
```  
  
## Related content

- [@@PACK_RECEIVED (Transact-SQL)](pack-received-transact-sql.md)
- [sp_monitor (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-monitor-transact-sql.md)
- [System Statistical Functions (Transact-SQL)](system-statistical-functions-transact-sql.md)
