---
title: "sys.trace_subclass_values (Transact-SQL)"
description: sys.trace_subclass_values (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.trace_subclass_values"
  - "trace_subclass_values_TSQL"
  - "sys.trace_subclass_values_TSQL"
  - "trace_subclass_values"
helpviewer_keywords:
  - "sys.trace_subclass_values catalog view"
dev_langs:
  - "TSQL"
---
# sys.trace_subclass_values (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  The **sys.trace_subclass_values** catalog view contains a list of named column values. These subclass values do not change for a given version of the  SQL Server Database Engine 
.  
  
 For a complete list of supported trace events, see [SQL Server Event Class Reference](../event-classes/sql-server-event-class-reference.md).  
  
> **Important:**  
>  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use Extended Event catalog views instead.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **trace_event_id** | **smallint** | ID of the trace event. This parameter is also in the **sys.trace_events** catalog view. |
| **trace_column_id** | **smallint** | ID of the trace column used for enumeration. This parameter is also in the **sys.trace_columns** catalog view. |
| **subclass_name** | **nvarchar(128)** | Meaning of the column value. |
| **subclass_value** | **smallint** | Column value. |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [Object catalog views (Transact-SQL)](object-catalog-views-transact-sql.md)
- [sys.traces (Transact-SQL)](sys-traces-transact-sql.md)
- [sys.trace_categories (Transact-SQL)](sys-trace-categories-transact-sql.md)
- [sys.trace_columns (Transact-SQL)](sys-trace-columns-transact-sql.md)
- [sys.trace_events (Transact-SQL)](sys-trace-events-transact-sql.md)
- [sys.trace_event_bindings (Transact-SQL)](sys-trace-event-bindings-transact-sql.md)
