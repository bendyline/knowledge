---
title: "cdc.lsn_time_mapping (Transact-SQL)"
description: cdc.lsn_time_mapping (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "02/22/2023"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "cdc.lsn_time_mapping"
  - "cdc.lsn_time_mapping_TSQL"
helpviewer_keywords:
  - "cdc.lsn_time_mapping"
dev_langs:
  - "TSQL"
---
# cdc.lsn_time_mapping (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 





  Returns one row for each transaction having rows in a change table. This table is used to map between log sequence number (LSN) commit values and the time the transaction committed. Entries may also be logged for which there are no change tables entries. This allows the table to record the completion of LSN processing in periods of low or no change activity.  
  
 We recommend that you don't query the system tables directly. Instead, execute the [sys.fn_cdc_map_lsn_to_time (Transact-SQL)](../system-functions/sys-fn-cdc-map-lsn-to-time-transact-sql.md) and [sys.fn_cdc_map_time_to_lsn (Transact-SQL)](../system-functions/sys-fn-cdc-map-time-to-lsn-transact-sql.md) system functions.  
    
| Column name | Data type | Description |
| --- | --- | --- |
| **start_lsn** | **binary(10)** | LSN of the committed transaction. |
| **tran_begin_time** | **datetime** | Time that the transaction associated with the LSN began. |
| **tran_end_time** | **datetime** | Time that the transaction ended. |
| **tran_id** | **varbinary(10)** | ID of the transaction. |
  
## Related content

- [The transaction log](../logs/the-transaction-log-sql-server.md)
- [cdc.&lt;capture_instance&gt;_CT (Transact-SQL)](cdc-capture-instance-ct-transact-sql.md)
