---
title: "MSSQLSERVER_41399"
description: "MSSQLSERVER_41399"
author: MashaMSFT
ms.author: mathoma
ms.date: "04/04/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
helpviewer_keywords:
  - "41399 (Database Engine error)"
---
# MSSQLSERVER_41399
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
|  |
| Event ID | 41399 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Symbolic Name | MAX_SORT_ROW_WIDTH_EXCEEDED |
| Message Text | The sort operation is too complex. Consult SQL Server Books Online for more information. |
  
## Explanation  
Sorting the result of join and aggregation operations increases the complexity of the sort operation by increasing the size of the row in the sort buffer. This error means that the size of the row is larger than the maximum size supported by the sort operator in natively compiled stored procedures. Note that the size of a row in the sort buffer is determined solely by the number of joins and the number and type of aggregate functions. The size of the rows in the base tables does not affect the size of the row in the buffer.  
  
## User Action  
Decrease the complexity of the query by removing joins or aggregate functions.  
  
## Related content

- [In-Memory OLTP (In-Memory Optimization)](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/in-memory-oltp/in-memory-oltp-in-memory-optimization.md)
