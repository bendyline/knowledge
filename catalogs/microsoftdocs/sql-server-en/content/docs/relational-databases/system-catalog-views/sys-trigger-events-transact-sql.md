---
title: "sys.trigger_events (Transact-SQL)"
description: sys.trigger_events (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "trigger_events_TSQL"
  - "trigger_events"
  - "sys.trigger_events"
  - "sys.trigger_events_TSQL"
helpviewer_keywords:
  - "sys.trigger_events catalog view"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# sys.trigger_events (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Contains a row per event for which a trigger fires.  
  
> **Note:**  
>  **sys.trigger_events** does not apply to event notifications.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **\<Columns inherited from sys.events>** | Not applicable | Inherits the **object_id**, **type**, **type_desc** columns from [sys.events](sys-events-transact-sql.md). |
| **is_first** | **bit** | Trigger is marked to be the first to fire for this event. |
| **is_last** | **bit** | Trigger is marked to be the last to fire for this event. |
| **event_group_type** | **int** | Event group on which the trigger is created, or null if not created on an event group. |
| **event_group_type_desc** | **nvarchar(60)** | Description of the event group on which the trigger is created, or null if not created on an event group. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
- [Object catalog views (Transact-SQL)](object-catalog-views-transact-sql.md)
