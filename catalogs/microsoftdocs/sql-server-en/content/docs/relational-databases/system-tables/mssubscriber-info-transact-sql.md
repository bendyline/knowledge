---
title: "MSsubscriber_info (Transact-SQL)"
description: MSsubscriber_info (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "MSsubscriber_info_TSQL"
  - "MSsubscriber_info"
helpviewer_keywords:
  - "MSsubscriber_info system table"
dev_langs:
  - "TSQL"
---
# MSsubscriber_info (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  The **MSsubscriber_info** table contains one row for each Publisher/Subscriber pair that is being pushed subscriptions from the local Distributor. This table is stored in the distribution database.  
  
 **Note** This system table has been deprecated and is being maintained to support previous versions of  Microsoft 
  SQL Server 
.  
  
## Definition  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **publisher** | **sysname** | The name of the Publisher. |
| **subscriber** | **sysname** | The name of the Subscriber. |
| **type** | **tinyint** | The subscriber type:<br /><br /> **0** =  SQL Server |
 | Subscriber.<br /><br /> **1** = ODBC data source. |
| **login** | **sysname** | The login for  SQL Server |
 | Authentication. Stored in encrypted format if Subscriber is added with  SQL Server |
 | Authentication mode. |
| **password** | **nvarchar(524)** | The password for  SQL Server |
 | Authentication. Stored in encrypted format if Subscriber is added with  SQL Server |
 | Authentication mode. |
| **description** | **nvarchar(255)** | The description of the Subscriber. |
| **security_mode** | **int** | The implemented security mode:<br /><br /> **0** =  SQL Server |
 | Authentication.<br /><br /> **1** =  Microsoft |
 | Windows Authentication. |
  
## Related content

- [Replication Tables (Transact-SQL)](replication-tables-transact-sql.md)
- [Replication Views (Transact-SQL)](../system-views/replication-views-transact-sql.md)
