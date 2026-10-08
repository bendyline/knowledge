---
title: "sys.sp_enable_event_stream (Transact-SQL)"
description: "Enables the change event streaming feature."
author: nzagorac-ms
ms.author: nzagorac
ms.reviewer: mathoma,randolphwest
ms.date: 12/17/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "sys_sp_enable_event_stream_TSQL"
  - "sys_sp_enable_event_stream"
helpviewer_keywords:
  - "sys_sp_enable_event_stream"
dev_langs:
  - "TSQL"
monikerRange: "=sql-server-ver17 || =sql-server-linux-ver17"
---
# sys.sp_enable_event_stream (Transact-SQL)


**Applies to:**
 

 
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)




Enables change event streaming at the database level for the current database context. [What is change event streaming (preview)?](../track-changes/change-event-streaming/overview.md) was introduced in  SQL Server 2025 (17.x) 
 and Azure SQL Database.

> **Note:**
> Change event streaming is currently in [preview](https://azure.microsoft.com/support/legal/preview-supplemental-terms), and has differences in [supportability across products](../track-changes/change-event-streaming/overview.md#platform-supportability). During preview, this feature is subject to change.



## Syntax

```syntaxsql
sys.sp_enable_event_stream
[ ; ]
```

## Arguments

None.

## Return code values

`0` (success) or `1` (failure).

## Permissions

A user with `CONTROL` database permissions, **db_owner** database role membership, or **sysadmin** server role membership can execute this procedure.

## Related content

- [What is change event streaming (preview)?](../track-changes/change-event-streaming/overview.md)
- [Configure change event streaming (preview) to Azure Event Hubs](../track-changes/change-event-streaming/configure.md)
