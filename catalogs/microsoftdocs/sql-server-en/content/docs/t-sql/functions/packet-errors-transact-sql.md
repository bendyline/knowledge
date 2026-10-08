---
title: "@@PACKET_ERRORS (Transact-SQL)"
description: "@@PACKET_ERRORS (Transact-SQL)"
author: VanMSFT
ms.author: vanto
ms.date: "09/18/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "@@PACKET_ERRORS"
  - "@@PACKET_ERRORS_TSQL"
helpviewer_keywords:
  - "@@PACKET_ERRORS function"
  - "number of packet errors"
  - "packets [SQL Server], errors"
  - "networking [SQL Server], packet errors"
  - "connections [SQL Server], packets"
dev_langs:
  - "TSQL"
---
# @@PACKET_ERRORS (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  Returns the number of network packet errors that have occurred on  SQL Server 
 connections since  SQL Server 
 was last started.  
  
 
  
## Syntax  
  
```syntaxsql
@@PACKET_ERRORS  
```  
  
## Return Types
 **integer**  
  
## Remarks  
 To display a report containing several  SQL Server 
 statistics, including packet errors, run **sp_monitor**.  
  
## Examples  
 The following example shows using `@@PACKET_ERRORS`.  
  
```sql  
SELECT @@PACKET_ERRORS AS 'Packet Errors';  
```  
  
 Here is a sample result set.  
  
```  
Packet Errors  
-------------  
0  
```  
  
## Related content

- [@@PACK_RECEIVED (Transact-SQL)](pack-received-transact-sql.md)
- [@@PACK_SENT (Transact-SQL)](pack-sent-transact-sql.md)
- [sp_monitor (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-monitor-transact-sql.md)
- [System Statistical Functions (Transact-SQL)](system-statistical-functions-transact-sql.md)
