---
title: "MSSQLSERVER_41368"
description: "MSSQLSERVER_41368"
author: MashaMSFT
ms.author: mathoma
ms.date: "05/25/2022"
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
helpviewer_keywords:
  - "41368 (Database Engine error)"
---
# MSSQLSERVER_41368
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
|  |
| Event ID | 41368 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Symbolic Name | SQL_IMPLICIT_AND_EXPLICIT_TX_NOT_SUPPORTED |
| Message Text | Accessing memory optimized tables using the READ COMMITTED isolation level is supported only for autocommit transactions. It is not supported for explicit or implicit transactions. Provide a supported isolation level for the memory optimized table using a table hint, such as WITH (SNAPSHOT). |
  
## Explanation  
Accessing memory-optimized tables using the READ COMMITTED isolation level is supported only for autocommit transactions. For more information, see [Transactions with In-Memory Tables and Procedures](../in-memory-oltp/transactions-with-memory-optimized-tables.md).  
  
When accessing a memory-optimized table from an explicit transaction that was started with BEGIN TRANSACTION, or from an implicit transaction, if IMPLICIT_TRANSACTIONS is set to ON, the READ COMMITTED isolation level is not supported.  
  
## User Action  
When accessing a memory-optimized table from an explicit or implicit READ COMMITTED transaction, use SNAPSHOT to access the table. This can be achieved by using the table hint WITH (SNAPSHOT) (for more information, see [Transactions with In-Memory Tables and Procedures](../in-memory-oltp/transactions-with-memory-optimized-tables.md)) or by setting the database option MEMORY_OPTIMIZED_ELEVATE_TO_SNAPSHOT to ON (for more information, see [ALTER DATABASE SET Options (Transact-SQL)](../../t-sql/statements/alter-database-transact-sql.md)).  
  
## Related content

- [In-Memory OLTP (In-Memory Optimization)](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/in-memory-oltp/in-memory-oltp-in-memory-optimization.md)
