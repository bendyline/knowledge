---
title: "MSSQLSERVER_12301"
description: "MSSQLSERVER_12301"
author: MashaMSFT
ms.author: mathoma
ms.date: "04/04/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "12301 (Database Engine error)"
---
# MSSQLSERVER_12301

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


  
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
| Event ID | 12301 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Symbolic Name | HK_UNSUPPORTED_NULLABLE_COLUMNS |
| Message Text | Nullable columns in the index key are not supported with '*construct*'. |
  
## User Action  
Do not use nullable columns in the index key.  
  
## Related content

- [In-Memory OLTP (In-Memory Optimization)](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/in-memory-oltp/in-memory-oltp-in-memory-optimization.md)
