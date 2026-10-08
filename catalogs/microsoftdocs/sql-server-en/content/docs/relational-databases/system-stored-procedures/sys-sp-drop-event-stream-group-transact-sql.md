---
title: "sys.sp_drop_event_stream_group (Transact-SQL)"
description: sys.sp_drop_event_stream_group drops an event stream group for the change event streaming feature.
author: nzagorac-ms
ms.author: nzagorac
ms.reviewer: mathoma,randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "sys_sp_drop_event_stream_group_TSQL"
  - "sys_sp_drop_event_stream_group"
helpviewer_keywords:
  - "sys_sp_drop_event_stream_group"
dev_langs:
  - "TSQL"
monikerRange: "=sql-server-ver17 || =sql-server-linux-ver17"
---
# sys.sp_drop_event_stream_group (Transact-SQL)


**Applies to:**
 

 
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)




Drops a stream event group for the [change event streaming (CES)](../track-changes/change-event-streaming/overview.md) feature introduced in  SQL Server 2025 (17.x) 
 and Azure SQL Database.

> **Note:**
> Change event streaming is currently in [preview](https://azure.microsoft.com/support/legal/preview-supplemental-terms), and has differences in [supportability across products](../track-changes/change-event-streaming/overview.md#platform-supportability). During preview, this feature is subject to change.



## Syntax

```syntaxsql
sys.sp_drop_event_stream_group [ @stream_group_name = ] N'stream_group_name'
[ ; ]
```

## Arguments

#### [ @stream_group_name = ] N'*stream_group_name*'

Specifies the name of the event stream group you want to drop. *@stream_group_name* is **sysname**, with no default, and can't be `NULL`.

## Permissions

A user with `CONTROL` database permissions, **db_owner** database role membership, or **sysadmin** server role membership can execute this procedure.

## Related content

- [What is change event streaming (preview)?](../track-changes/change-event-streaming/overview.md)
- [Configure change event streaming (preview) to Azure Event Hubs](../track-changes/change-event-streaming/configure.md)
