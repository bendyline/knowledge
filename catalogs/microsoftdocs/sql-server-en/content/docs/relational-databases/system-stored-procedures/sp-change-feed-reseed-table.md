---
title: "sys.sp_change_feed_reseed_table (Transact-SQL)"
description: "The internal sys.sp_change_feed_reseed_table system stored procedure reseeds the link table in the current database context."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: imotiwala, ajayj, randolphwest
ms.date: 06/19/2026
ms.service: fabric
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "sys.sp_change_feed_reseed_table_TSQL"
  - "sys.sp_change_feed_reseed_table"
  - "sp_change_feed_reseed_table_TSQL"
  - "sp_change_feed_reseed_table"
helpviewer_keywords:
  - "sp_change_feed_reseed_table"
dev_langs:
  - "TSQL"
monikerRange: ">=sql-server-ver17 || =azuresqldb-current || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# sys.sp_change_feed_reseed_table (Transact-SQL)


**Applies to:**
 

 
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


Reseeds the link table in the current database context.

> **Caution:**  
> This system stored procedure is used internally and isn't recommended for direct administrative use. Use Synapse Studio or the Fabric portal instead. Using this procedure could introduce inconsistency.


This system stored procedure is used for [Microsoft Fabric mirrored databases](https://learn.microsoft.com/fabric/database/mirrored-database/overview) and [SQL database in Microsoft Fabric](https://learn.microsoft.com/fabric/database/sql/overview).



## Syntax

```syntaxsql
sys.sp_change_feed_reseed_table
    [ @table_group_id = ] 'table_group_id'
    , [ @table_id = ] 'table_id'
    , [ @reseed_id = ] N'reseed_id'
[ ; ]
```

## Arguments

#### [ @table_group_id = ] '*table_group_id*'

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


#### [ @table_id = ] '*table_id*'

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


#### [ @reseed_id = ] N'*reseed_id*'

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


## Returns

`0` (success) or `1` (failure).

## Permissions

A user with `CONTROL` database permissions, **db_owner** database role membership, or **sysadmin** server role membership can execute this procedure.

## Related content

- [sys.sp_help_change_feed (Transact-SQL)](sp-help-change-feed.md)
- [sys.sp_help_change_feed_table (Transact-SQL)](sp-help-change-feed-table.md)
- [sys.sp_help_change_feed_table_groups (Transact-SQL)](sp-help-change-feed-table-groups.md)
- [sys.sp_help_change_feed_settings (Transact-SQL)](sp-help-change-feed-settings.md)
- [sys.sp_change_feed_configure_parameters (Transact-SQL)](sp-change-feed-configure-parameters.md)
- [sys.dm_change_feed_log_scan_sessions (Transact-SQL)](../system-dynamic-management-objects/sys-dm-change-feed-log-scan-sessions.md)
- [sys.dm_change_feed_errors (Transact-SQL)](../system-dynamic-management-objects/sys-dm-change-feed-errors.md)
- [What is Mirroring in Fabric?](https://learn.microsoft.com/fabric/database/mirrored-database/overview)
- [Monitor Fabric mirrored database replication](https://learn.microsoft.com/fabric/database/mirrored-database/monitor)
- [Explore data in your mirrored database using Microsoft Fabric](https://learn.microsoft.com/fabric/database/mirrored-database/explore)
