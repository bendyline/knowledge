---
title: "sys.sysusers (Transact-SQL)"
description: "sys.sysusers (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/15/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.sysusers"
  - "sys.sysusers_TSQL"
  - "sysusers_TSQL"
  - "sysusers"
helpviewer_keywords:
  - "sysusers system table"
  - "sys.sysusers compatibility view"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric"
---
# sys.sysusers (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Contains one row for each  Microsoft 
 Windows user, Windows group,  Microsoft 
  SQL Server 
 user, or  SQL Server 
 role in the database.  
  
> **Important:**  
>    This SQL Server 2000 system table is included as a view for backward compatibility. We  recommend that you use the current SQL Server system views instead. To find the equivalent system view or views, see [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md). This feature will be removed in a future version of Microsoft SQL Server. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.
   
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **uid** | **smallint** | User ID, unique in this database.<br /><br /> 1 = Database owner<br /><br /> Overflows or returns NULL if the number of users and roles exceeds 32,767. |
| **status** | **smallint** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **name** | **sysname** | User name or group name, unique in this database. |
| **sid** | **varbinary(85)** | Security identifier for this entry. |
| **roles** | **varbinary(2048)** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **createdate** | **datetime** | Date the account was added. |
| **updatedate** | **datetime** | Date the account was last changed. |
| **altuid** | **smallint** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
| <br /><br /> Overflows or returns NULL if the number of users and roles exceeds 32,767. |
| **password** | **varbinary(256)** | Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. |
|  |
| **gid** | **smallint** | Group ID to which this user belongs. If **uid** is the same as **gid**, this entry defines a group. Overflows or returns NULL if the combined number of groups and users exceeds 32,767. |
| **environ** | **varchar(255)** | Reserved. |
| **hasdbaccess** | **int** | 1 = Account has database access. |
| **islogin** | **int** | 1 = Account is a Windows group, Windows user, or  SQL Server |
 | user with a login account. |
| **isntname** | **int** | 1 = Account is a Windows group or Windows user. |
| **isntgroup** | **int** | 1 = Account is a Windows group. |
| **isntuser** | **int** | 1 = Account is a Windows user. |
| **issqluser** | **int** | 1 = Account is a  SQL Server |
 | user. |
| **isaliased** | **int** | 1 = Account is aliased to another user. |
| **issqlrole** | **int** | 1 = Account is a  SQL Server |
 | role. |
| **isapprole** | **int** | 1 = Account is an application role. |
  
## Related content

- [Mapping System Tables to System Views (Transact-SQL)](../system-tables/mapping-system-tables-to-system-views-transact-sql.md)
- [System Compatibility Views (Transact-SQL)](system-compatibility-views-transact-sql.md)
