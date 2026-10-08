---
title: "sys.server_trigger_events (Transact-SQL)"
description: sys.server_trigger_events (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "06/10/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.server_trigger_events_TSQL"
  - "server_trigger_events_TSQL"
  - "sys.server_trigger_events"
  - "server_trigger_events"
helpviewer_keywords:
  - "sys.server_trigger_events catalog view"
dev_langs:
  - "TSQL"
---
# sys.server_trigger_events (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Contains one row for each event for which a server-level (synchronous) trigger fires.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **inherited columns** |  | Inherits all columns from [sys.server_events](sys-server-events-transact-sql.md). |
| **is_first** | **bit** | Trigger is marked to be the first to fire for this event. |
| **is_last** | **bit** | Trigger is marked to be the last to fire for this event. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [Object catalog views (Transact-SQL)](object-catalog-views-transact-sql.md)
- [System catalog views (Transact-SQL)](catalog-views-transact-sql.md)
