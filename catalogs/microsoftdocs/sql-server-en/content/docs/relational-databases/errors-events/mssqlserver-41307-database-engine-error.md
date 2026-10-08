---
title: "MSSQLSERVER_41307"
description: "MSSQLSERVER_41307"
author: MashaMSFT
ms.author: mathoma
ms.date: "04/04/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
helpviewer_keywords:
  - "41307 (Database Engine error)"
---
# MSSQLSERVER_41307
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
|  |
| Event ID | 41307 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Symbolic Name | HK_HEKATON_ROW_LIMIT |
| Message Text | The row size limit of *number* bytes for memory optimized tables has been exceeded. Please simplify the table definition. |
  
## Explanation  
The row size limit for memory optimized tables is 8,060 bytes. For more information, see [Table and Row Size in Memory-Optimized Tables](../in-memory-oltp/table-and-row-size-in-memory-optimized-tables.md). For more information, see [In-Memory OLTP (In-Memory Optimization)](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/in-memory-oltp/in-memory-oltp-in-memory-optimization.md).  
  
## Related content

- [In-Memory OLTP (In-Memory Optimization)](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/in-memory-oltp/in-memory-oltp-in-memory-optimization.md)
