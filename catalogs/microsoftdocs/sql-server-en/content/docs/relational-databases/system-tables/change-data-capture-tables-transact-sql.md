---
title: "Change Data Capture Tables (Transact-SQL)"
description: Change Data Capture Tables (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "02/22/2023"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
dev_langs:
  - "TSQL"
---
# Change Data Capture Tables (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 





  Change data capture enables change tracking on tables so that data manipulation language (DML) and data definition language (DDL) changes made to the tables can be incrementally loaded into a data warehouse. The articles in this section describe the system tables that store information used by change data capture operations.  
  
## In This Section  
 [cdc.\<capture_instance>\_CT](cdc-capture-instance-ct-transact-sql.md)  
 Returns one row for each change made to a captured column in the associated source table.  
  
 [cdc.captured_columns](cdc-captured-columns-transact-sql.md)  
 Returns one row for each column tracked in a capture instance.  
  
 [cdc.change_tables](cdc-change-tables-transact-sql.md)  
 Returns one row for each change table in the database.  
  
 [cdc.ddl_history](cdc-ddl-history-transact-sql.md)  
 Returns one row for each data definition language (DDL) change made to tables that are enabled for change data capture.  
  
 [cdc.lsn_time_mapping](cdc-lsn-time-mapping-transact-sql.md)  
 Returns one row for each transaction having rows in a change table. This table is used to map between log sequence number (LSN) commit values and the time the transaction committed.  
  
 [cdc.index_columns](cdc-index-columns-transact-sql.md)  
 Returns one row for each index column associated with a change table.  
  
 [dbo.cdc_jobs (Transact-SQL)](dbo-cdc-jobs-transact-sql.md)  
 Returns the configuration parameters for change data capture agent jobs.  
  
## Related content

- [Change Data Capture stored procedures (Transact-SQL)](../system-stored-procedures/change-data-capture-stored-procedures-transact-sql.md)
- [Change Data Capture Functions (Transact-SQL)](../system-functions/change-data-capture-functions-transact-sql.md)
