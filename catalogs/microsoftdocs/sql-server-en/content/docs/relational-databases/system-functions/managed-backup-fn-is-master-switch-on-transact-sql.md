---
title: "managed_backup.fn_is_master_switch_on (Transact-SQL)"
description: "managed_backup.fn_is_master_switch_on (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "fn_is_master_switch_on"
  - "fn_is_master_switch_on_TSQL"
  - "smart_admin.fn_is_master_switch_on"
  - "smart_admin.fn_is_master_switch_on_TSQL"
helpviewer_keywords:
  - "smart_admin.fn_is_master_switch_on"
  - "fn_is_master_switch_on"
dev_langs:
  - "TSQL"
---
# managed_backup.fn_is_master_switch_on (Transact-SQL)

**Applies to:**
 

 and later versions

  Returns the state of the  SQL Server managed backup to Microsoft Azure 
 operations on the instance of SQL Server.  
  
 Use this function to get the current state of  SQL Server managed backup to Microsoft Azure 
.  
  
 
 
  
## Syntax  
  
```sql  
managed_backup.fn_is_master_switch_on ()  
```  
  
##  <a name="Arguments"></a> Arguments  
 None  
  
## Return Type  
 **BIT**  
  
 1 =  SQL Server managed backup to Microsoft Azure 
 is active, 0 =  SQL Server managed backup to Microsoft Azure 
 is paused.  
  
## Security  
  
### Permissions  
 Requires SELECT permissions on the function.  
  
## Related content

- [SQL Server managed backup to Microsoft Azure](../backup-restore/sql-server-managed-backup-to-microsoft-azure.md)
