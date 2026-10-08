---
title: "MSSQLSERVER_41305"
description: "MSSQLSERVER_41305"
author: MashaMSFT
ms.author: mathoma
ms.date: "04/04/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
helpviewer_keywords:
  - "41305 (Database Engine error)"
---
# MSSQLSERVER_41305
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
|  |
| Event ID | 41305 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Symbolic Name | HK_TX_COMMIT_RR_VALIDATION |
| Message Text | The current transaction failed to commit due to a repeatable read validation failure. |
  
## Explanation  
The transaction encountered a validation failure and is now doomed.  
  
For more information, see [In-Memory OLTP (In-Memory Optimization)](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/in-memory-oltp/in-memory-oltp-in-memory-optimization.md).  
  
## User Action  
Retry the failed transaction.  
  
## Related content

- [In-Memory OLTP (In-Memory Optimization)](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/in-memory-oltp/in-memory-oltp-in-memory-optimization.md)
