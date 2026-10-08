---
title: Integration Services Tables (Transact-SQL)
description: Integration Services Tables (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: makromer, maghan
ms.date: 03/14/2017
ms.service: sql
ms.subservice: system-objects
ms.topic: reference
helpviewer_keywords:
  - "SQL Server Integration Services system tables"
  - "system tables [SQL Server], Integration Services"
  - "system tables [Integration Services]"
  - "SSIS, system tables"
dev_langs:
  - TSQL
---
# Integration Services Tables (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  The topics in this section describe the system tables in the msdb database that store information used by  SQL Server 
  Integration Services 
.  
  
## In This Section  
 [sysssislog](sysssislog-transact-sql.md)  
 Contains one row for each log entry that an  Integration Services 
 package generates at run time.  
  
 This table is used only when packages use the  SQL Server 
 log provider.  
  
 [sysssispackagefolders](sysssispackagefolders-transact-sql.md)  
 Contains one row for each logical folder that the  Integration Services 
 service uses to organize packages. Column values define the parent/child relationships between nested folders.  
  
> **Note:**  
>   Management Studio
 displays stored packages in a hierarchical view when you connect to the  Integration Services 
 service.  
  
 [sysssispackages](sysssispackages-transact-sql.md)  
 Contains one row for each  Integration Services 
 package.  
  
 This table is used only when you store packages in  SQL Server 
.
