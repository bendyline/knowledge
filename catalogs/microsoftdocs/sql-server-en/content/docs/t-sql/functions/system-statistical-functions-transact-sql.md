---
title: "System Statistical Functions (Transact-SQL)"
description: "System Statistical Functions (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
helpviewer_keywords:
  - "statistical functions [SQL Server]"
  - "system statistical functions [SQL Server]"
  - "functions [SQL Server], statistical"
dev_langs:
  - "TSQL"
---
# System Statistical Functions (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  The following scalar functions return statistical information about the system:  



        [@@CONNECTIONS](../../t-sql/functions/connections-transact-sql.md)


        [@@PACK_RECEIVED](../../t-sql/functions/pack-received-transact-sql.md)




        [@@CPU_BUSY](../../t-sql/functions/cpu-busy-transact-sql.md)


        [@@PACK_SENT](../../t-sql/functions/pack-sent-transact-sql.md)




        [fn_virtualfilestats](../../relational-databases/system-functions/sys-fn-virtualfilestats-transact-sql.md)


        [@@TIMETICKS](../../t-sql/functions/timeticks-transact-sql.md)




        [@@IDLE](../../t-sql/functions/idle-transact-sql.md)


        [@@TOTAL_ERRORS](../../t-sql/functions/total-errors-transact-sql.md)




        [@@IO_BUSY](../../t-sql/functions/io-busy-transact-sql.md)


        [@@TOTAL_READ](../../t-sql/functions/total-read-transact-sql.md)




        [@@PACKET_ERRORS](../../t-sql/functions/packet-errors-transact-sql.md)


        [@@TOTAL_WRITE](../../t-sql/functions/total-write-transact-sql.md)


  
  
 All system statistical functions are nondeterministic. This means these functions do not always return the same results every time they are called, even with the same set of input values. For more information about function determinism, see [Deterministic and Nondeterministic Functions](../../relational-databases/user-defined-functions/deterministic-and-nondeterministic-functions.md).  
  
## Related content

- [What are the SQL database functions?](functions.md)
