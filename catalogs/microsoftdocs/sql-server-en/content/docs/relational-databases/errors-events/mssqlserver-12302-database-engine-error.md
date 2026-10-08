---
title: "MSSQLSERVER_12302"
description: "MSSQLSERVER_12302"
author: MashaMSFT
ms.author: mathoma
ms.date: "04/04/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "12302 (Database Engine error)"
---
# MSSQLSERVER_12302

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


  
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
| Event ID | 12302 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Symbolic Name | HK_UNSUPPORTED_COMPUTED_COLUMNS |
| Message Text | Updating columns that are part of the PRIMARY KEY constraint is not supported with '*construct*'. |
  
## User Action  
Do not update columns that are part of the primary key constraint.  
  
## Related content

- [In-Memory OLTP (In-Memory Optimization)](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/in-memory-oltp/in-memory-oltp-in-memory-optimization.md)
