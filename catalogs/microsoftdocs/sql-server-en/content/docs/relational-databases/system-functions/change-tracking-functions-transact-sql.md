---
title: "Change Tracking Functions (Transact-SQL)"
description: "Change Tracking Functions (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "08/08/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "functions [SQL Server], change tracking"
  - "change tracking [SQL Server], functions"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Change Tracking Functions (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Change tracking records insert, update, and delete activity applied to tracked tables, supplying the details of the changes in an easily consumed relational format. The following functions return information about the changes.  
  
| Function | Description |
| --- | --- |
| [CHANGETABLE (CHANGES)](changetable-transact-sql.md) | Returns tracking information for all changes to a table that have occurred since a specified version. |
| [CHANGETABLE (VERSION)](changetable-transact-sql.md) | Returns the latest change tracking information for a specified row. |
| [CHANGE_TRACKING_MIN_VALID_VERSION()](change-tracking-min-valid-version-transact-sql.md) | Returns the minimum version that is valid for use in obtaining change tracking information from the specified table when you are using the [CHANGETABLE](changetable-transact-sql.md) function. |
| [CHANGE_TRACKING_CURRENT_VERSION](change-tracking-current-version-transact-sql.md) | Obtains a version that is associated with the last committed transaction. You can use this version the next time you enumerate changes by using CHANGETABLE. |
| [CHANGE_TRACKING_IS_COLUMN_IN_MASK](change-tracking-is-column-in-mask-transact-sql.md) | Interprets the SYS_CHANGE_COLUMNS value that is returned by the CHANGETABLE(CHANGES ...) function. |
| [WITH CHANGE_TRACKING_CONTEXT](with-change-tracking-context-transact-sql.md) | Enables the specification of a change context, such as an originator ID, when an application changes data. |
  
## Related content

- [Track data changes (SQL Server)](../track-changes/track-data-changes-sql-server.md)
