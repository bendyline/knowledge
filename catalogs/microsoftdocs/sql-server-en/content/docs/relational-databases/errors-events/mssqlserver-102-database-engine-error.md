---
title: "MSSQLSERVER_102"
description: "MSSQLSERVER_102"
author: MashaMSFT
ms.author: mathoma
ms.reviewer: randolphwest
ms.date: 03/28/2024
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "102 (Database Engine error)"
---
# MSSQLSERVER_102


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



## Details

| Attribute | Value |
| --- | --- |
| Product Name | SQL Server |
| Event ID | 102 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Symbolic Name | P_SYNTAXERR2 |
| Message Text | Incorrect syntax near '%.*ls'. |

## Explanation

Indicates a syntax error. Additional information isn't available, because the error prevents the  Database Engine 
 from processing the statement.

## User action

Search the  Transact-SQL  statement for syntax errors.

## Symmetric key encryption on older SQL Server versions

This error might be caused by attempting to create a symmetric key using the deprecated `RC4` or `RC4_128` encryption, when not in `90` or `100` compatibility mode.

If you want to create a symmetric key using `RC4` or `RC4_128`, you should select a newer encryption such as one of the AES algorithms.

> **Caution:**  
> RC4 algorithms aren't recommended. If you must use RC4, you can use `ALTER DATABASE SET COMPATIBILITY_LEVEL` to set the database to compatibility level `90` for  SQL Server 2005 (9.x) 
, or `100` for  SQL Server 2008 (10.0.x) 
 or  SQL Server 2008 R2 (10.50.x) 
.
