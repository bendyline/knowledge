---
title: "MSSQLSERVER_1803"
description: "MSSQLSERVER_1803"
author: MashaMSFT
ms.author: mathoma
ms.date: "04/04/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
helpviewer_keywords:
  - "1803 (Database Engine error)"
---
# MSSQLSERVER_1803
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
| Event ID | 1803 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Symbolic Name | NO_SPACE |
| Message Text | CREATE DATABASE failed. Primary file must be at least %d MB to accommodate a copy of the model database. |
  
## Explanation  
 SQL Server 
 creates a database by making a copy of the model database. Then  SQL Server 
 renames the copy, and enlarges the new database to the requested size. In this case, the user tried to create a database smaller than the model database. The operation failed because the copy of the model database could not fit on the primary data file, because the file was smaller than the model database.  
  
## User Action  
Create the database by using a larger database file size. Then shrink the database if you want by using  SQL Server Management Studio 
, or the DBCC SHRINKDATABASE statement.
