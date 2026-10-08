---
title: "MSSQLSERVER_10519"
description: "MSSQLSERVER_10519"
author: MashaMSFT
ms.author: mathoma
ms.date: "04/04/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "10519 (Database Engine error)"
---
# MSSQLSERVER_10519

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


  
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
| Event ID | 10519 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Symbolic Name | PG_INCOMPATIBLE_STMT_AND_HINTS |
| Message Text | Cannot create plan guide '%.\*ls' because the hints specified in **\@hints** cannot be applied to the statement specified by either **\@stmt** or **\@statement_start_offset**. Verify that the hints can be applied to the statement. |
  
## Explanation  
The hints specified in **\@hints** cannot be applied to the statement specified by either **\@stmt** or **\@statement_start_offset**.  
  
## User Action  
Specify hints that can be applied to the statement.  
  
## Related content

- [sys.sp_create_plan_guide (Transact-SQL)](../system-stored-procedures/sp-create-plan-guide-transact-sql.md)
- [Plan Guides](../performance/plan-guides.md)
- [sys.sp_create_plan_guide_from_handle (Transact-SQL)](../system-stored-procedures/sp-create-plan-guide-from-handle-transact-sql.md)
