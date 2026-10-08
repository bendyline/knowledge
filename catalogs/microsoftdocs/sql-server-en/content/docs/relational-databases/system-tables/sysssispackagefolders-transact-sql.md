---
title: sysssispackagefolders (Transact-SQL)
description: sysssispackagefolders (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: makromer, maghan
ms.date: 06/10/2016
ms.service: sql
ms.subservice: system-objects
ms.topic: reference
f1_keywords:
  - "sysdtspackagefolders90"
  - "sysdtspackagefolders90_TSQL"
helpviewer_keywords:
  - "sysssispackagefolders system table"
dev_langs:
  - TSQL
---
# sysssispackagefolders (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Contains one row for each logical folder in the folder hierarchy that  Microsoft 
  SQL Server 
  Integration Services 
 uses. These folders are listed in Object Explorer of  SQL Server Management Studio 
 when you connect to  Integration Services 
. A folder lists packages that are saved to  SQL Server 
 or to the file system.  
  
 The **parentfolderid** column describes the folder hierarchy. The folder at the top of the folder hierarchy contains a null value in **parentfolderid**.  
  
 The **foldername** column contains the name of folders that appear in Object Explorer.  
  
 This table is stored in the **msdb** database.  

  
| Column name | Data type | Description |
| --- | --- | --- |
| **folderid** | **uniqueidentifier** | The GUID of the folder. |
| **parentfolderid** | **uniqueidentifier** | The GUID of the folder that is the parent folder. |
| **foldername** | **sysname** | The name of the folder. This name appears in the folder hierarchy in  SQL Server Management Studio |
| . |
