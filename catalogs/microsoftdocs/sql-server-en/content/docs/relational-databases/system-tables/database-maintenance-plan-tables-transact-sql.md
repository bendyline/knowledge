---
title: "Database Maintenance Plan Tables (Transact-SQL)"
description: Database Maintenance Plan Tables (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
helpviewer_keywords:
  - "database maintenance plans [SQL Server]"
  - "maintenance plans [SQL Server], system tables"
  - "system tables [SQL Server], database maintenance plans"
dev_langs:
  - "TSQL"
---
# Database Maintenance Plan Tables (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  The topics in this section describe the system tables that store information used by database maintenance plans. These tables preserve information for instances that are upgraded from an earlier version of  SQL Server 
.  
  
> **Note:**  
>  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.   
  
## In This Section  
 [sysdbmaintplan_databases](sysdbmaintplan-databases-transact-sql.md)  
 Contains one row for each database that has an associated upgraded database maintenance plan.  
  
 [sysdbmaintplan_history](sysdbmaintplan-history-transact-sql.md)  
 Contains one row for each upgraded database maintenance plan action performed.  
  
 [sysdbmaintplan_jobs](sysdbmaintplan-jobs-transact-sql.md)  
 Contains one row for each upgraded database maintenance plan job.  
  
 [sysdbmaintplans](sysdbmaintplans-transact-sql.md)  
 Contains one row for each upgraded database maintenance plan.  
  
## Related content

- [Maintenance plans](../maintenance-plans/maintenance-plans.md)
