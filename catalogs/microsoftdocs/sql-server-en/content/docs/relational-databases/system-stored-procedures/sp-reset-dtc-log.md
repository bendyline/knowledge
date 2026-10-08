---
title: "sp_reset_dtc_log (Transact-SQL)"
description: "sp_reset_dtc_log (Transact-SQL)"
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
monikerRange: ">=sql-server-ver16 || >=sql-server-linux-ver16 || =azuresqldb-mi-current"
---
# sp_reset_dtc_log (Transact-SQL)


**Applies to:**
 


 





Clears the Microsoft Distributed Transaction Coordinator (MSDTC) log.



## Syntax

```syntaxsql
sp_reset_dtc_log
[ ; ]
```

## Arguments

None.

## Return code values

`0` (success) or `1` (failure).

## Result set

None.

## Permissions

Requires **sysadmin** or have CONTROL SERVER permissions.

## Examples

```sql
EXECUTE sp_reset_dtc_log;
```

## Related content

- [sys.sp_manage_distributed_transaction (Transact-SQL)](sys-sp-manage-distributed-transaction.md)
- [sys.dm_tran_distributed_transaction_stats (Transact-SQL)](../system-dynamic-management-objects/sys-dm-tran-distributed-transaction-stats.md)
