---
title: "sys.trace_categories (Transact-SQL)"
description: sys.trace_categories (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "08/09/2016"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "trace_categories"
  - "trace_categories_TSQL"
  - "sys.trace_categories"
  - "sys.trace_categories_TSQL"
helpviewer_keywords:
  - "sys.trace_categories catalog view"
dev_langs:
  - "TSQL"
---
# sys.trace_categories (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Similar event classes are grouped by a category. Each row in the **sys.trace_categories** catalog view identifies a category that is unique across the server. These categories do not change for a given version of the  SQL Server Database Engine 
.  
  
 For a complete list of supported trace events, see [SQL Server Event Class Reference](../event-classes/sql-server-event-class-reference.md).  
  
> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use Extended Event catalog views instead.  
  
| Column name | Data type | Description |
| --- | --- | --- |
| **category_id** | **smallint** | Unique ID of this category. This column is also in the **sys.trace_events** catalog view. |
| **name** | **nvarchar(128)** | Unique name of this category. This parameter is not localized. |
| **type** | **tinyint** | Category type:<br /><br /> 0 = Normal<br /><br /> 1 = Connection<br /><br /> 2 = Error |
  
## Permissions  
 The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).  
  
## Related content

- [Object catalog views (Transact-SQL)](object-catalog-views-transact-sql.md)
- [sys.traces (Transact-SQL)](sys-traces-transact-sql.md)
- [sys.trace_columns (Transact-SQL)](sys-trace-columns-transact-sql.md)
- [sys.trace_events (Transact-SQL)](sys-trace-events-transact-sql.md)
- [sys.trace_event_bindings (Transact-SQL)](sys-trace-event-bindings-transact-sql.md)
- [sys.trace_subclass_values (Transact-SQL)](sys-trace-subclass-values-transact-sql.md)
