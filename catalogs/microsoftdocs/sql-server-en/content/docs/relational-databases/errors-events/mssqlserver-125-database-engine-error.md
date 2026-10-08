---
title: "MSSQLSERVER_125"
description: "MSSQLSERVER_125"
author: MashaMSFT
ms.author: mathoma
ms.date: "04/04/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "125"
helpviewer_keywords:
  - "125 (Database Engine error)"
---
# MSSQLSERVER_125
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


  
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
| Event ID | 125 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Symbolic Name |  |
| Message Text | Case expressions may only be nested to level %d. |
  
## Explanation  
 SQL Server 
 allows for only 10 levels of nesting in CASE expressions.  
  
## User Action  
Reduce the level of CASE statements to 10 or less.  
  
## Related content

- [CASE (Transact-SQL)](../../t-sql/language-elements/case-transact-sql.md)
