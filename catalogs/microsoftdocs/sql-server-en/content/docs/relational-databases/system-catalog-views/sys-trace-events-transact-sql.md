---
title: "sys.trace_events (Transact-SQL)"
description: sys.trace_events (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "08/09/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "trace_events_TSQL"
  - "trace_events"
  - "sys.trace_events"
  - "sys.trace_events_TSQL"
helpviewer_keywords:
  - "sys.trace_events catalog view"
dev_langs:
  - "TSQL"
---
# sys.trace_events (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  The **sys.trace_events** catalog view contains a list of all SQL trace events. These trace events do not change for a given version of the  SQL Server Database Engine 
.  
  
> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use Extended Event catalog views instead.  
  
 For more information about these trace events, see [SQL Server Event Class Reference](../event-classes/sql-server-event-class-reference.md).  
  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **trace_event_id** | **smallint** | Unique ID of the event. This column is also in the **sys.trace_event_bindings** and **sys.trace_subclass_values** catalog views. |
| **category_id** | **smallint** | Category ID of the event. This column is also in the **sys.trace_categories** catalog view. |
| **name** | **nvarchar(128)** | Unique name of this event. This parameter is not localized. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [Object catalog views (Transact-SQL)](object-catalog-views-transact-sql.md)
- [sys.traces (Transact-SQL)](sys-traces-transact-sql.md)
- [sys.trace_categories (Transact-SQL)](sys-trace-categories-transact-sql.md)
- [sys.trace_columns (Transact-SQL)](sys-trace-columns-transact-sql.md)
- [sys.trace_event_bindings (Transact-SQL)](sys-trace-event-bindings-transact-sql.md)
- [sys.trace_subclass_values (Transact-SQL)](sys-trace-subclass-values-transact-sql.md)
