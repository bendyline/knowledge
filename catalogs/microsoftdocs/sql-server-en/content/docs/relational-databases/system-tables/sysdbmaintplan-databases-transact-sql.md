---
title: "sysdbmaintplan_databases (Transact-SQL)"
description: sysdbmaintplan_databases (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sysdbmaintplan_databases"
  - "sysdbmaintplan_databases_TSQL"
helpviewer_keywords:
  - "sysdbmaintplan_databases system table"
dev_langs:
  - "TSQL"
---
# sysdbmaintplan_databases (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  This table is included to preserve existing information for instances upgraded from a previous version of  Microsoft 
  SQL Server 
.  SQL Server 2005 (9.x) 
 and later versions do not change the contents of this table. This table is stored in the **msdb** database.  
  
 This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.   
  
| Column name | Data type | Description |
| --- | --- | --- |
| **plan_id** | **Uniqueidentifier** | Maintenance plan ID. |
| **database_name** | **sysname** | Name of the database associated with the database maintenance plan. |
