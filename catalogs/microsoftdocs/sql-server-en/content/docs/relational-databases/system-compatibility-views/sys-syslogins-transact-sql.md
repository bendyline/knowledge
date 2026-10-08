---
title: "sys.syslogins (Transact-SQL)"
description: "sys.syslogins (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "09/08/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "syslogins_TSQL"
  - "syslogins"
  - "sys.syslogins"
  - "sys.syslogins_TSQL"
helpviewer_keywords:
  - "sys.syslogins compatibility view"
  - "syslogins system table"
dev_langs:
  - "TSQL"
---
# sys.syslogins (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Contains one row for each login account.  
  
> **Important:**  
>    This SQL Server 2000 system table is included as a view for backward compatibility. We  recommend that you use the current SQL Server system views instead. To find the equivalent system view or views, see [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md). This feature will be removed in a future version of Microsoft SQL Server. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.
   
  
  
**Applies to**:  SQL Server 
 (  SQL Server 2008 (10.0.x) 
 through [current version](https://learn.microsoft.com/troubleshoot/sql/general/determine-version-edition-update-level)).  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **sid** | **varbinary(85)** | Security identifier. |
| **status** | **smallint** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **createdate** | **datetime** | Date the login was added. |
| **updatedate** | **datetime** | Date the login was updated. |
| **accdate** | **datetime** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **totcpu** | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **totio** | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **spacelimit** | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **timelimit** | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **resultlimit** | **int** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **name** | **sysname** | Login name of the user. |
| **dbname** | **sysname** | Name of the default database of the user when a connection is established. |
| **password** | **nvarchar(128)** | Returns NULL. |
| **language** | **sysname** | Default language of the user. |
| **denylogin** | **int** | 1 = Login is a  Microsoft |
 | Windows user or group and has been denied access. |
| **hasaccess** | **int** | 1 = Login has been granted access to the server. |
| **isntname** | **int** | 1 = Login is a Windows user or group.<br /><br /> 0 = Login is a  SQL Server |
 | login. |
| **isntgroup** | **int** | 1 = Login is a Windows group. |
| **isntuser** | **int** | 1 = Login is a Windows user. |
| **sysadmin** | **int** | 1 = Login is a member of the **sysadmin** server role. |
| **securityadmin** | **int** | 1 = Login is a member of the **securityadmin** server role. |
| **serveradmin** | **int** | 1 = Login is a member of the **serveradmin** fixed server role. |
| **setupadmin** | **int** | 1 = Login is a member of the **setupadmin** fixed server role. |
| **processadmin** | **int** | 1 = Login is a member of the **processadmin** fixed server role. |
| **diskadmin** | **int** | 1 = Login is a member of the **diskadmin** fixed server role. |
| **dbcreator** | **int** | 1 = Login is a member of the **dbcreator** fixed server role. |
| **bulkadmin** | **int** | 1 = Login is a member of the **bulkadmin** fixed server role. |
| **loginname** | **nvarchar(128)** | Login name of the user. Provided for backward compatibility. |
  
## Related content

- [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md)
- [System Compatibility Views (Transact-SQL)](system-compatibility-views-transact-sql.md)
