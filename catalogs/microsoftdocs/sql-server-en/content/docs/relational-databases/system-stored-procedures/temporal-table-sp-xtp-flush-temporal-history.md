---
title: "sys.sp_xtp_flush_temporal_history (Transact-SQL)"
description: "Invokes the data flush task to move all committed rows from in-memory staging table to the disk-based history table."
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "sp_xtp_flush_temporal_history"
  - "sp_xtp_flush_temporal_history_TSQL"
  - "sys.sp_xtp_flush_temporal_history"
  - "sys.sp_xtp_flush_temporal_history_TSQL"
helpviewer_keywords:
  - "sp_xtp_flush_temporal_history"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# sys.sp_xtp_flush_temporal_history (Transact-SQL)


**Applies to:**
 

 and later versions 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Invokes the data flush task to move all committed rows from in-memory staging table to the disk-based history table.



## Syntax

```syntaxsql
sys.sp_xtp_flush_temporal_history
    [ @schema_name = ] N'schema_name'
    , [ @object_name = ] N'object_name'
[ ; ]
```

## Arguments

#### [ @schema_name = ] N'*schema_name*'

The schema name for the current or temporal table.

#### [ @object_name = ] N'*object_name*'

The name of the current or temporal table.

## Return code values

`0` (success) or `> 0` (failure).

## Permissions

Requires **db_owner** permissions.

## Related content

- [Memory-optimized system-versioned temporal table performance](../tables/temporal/memory-optimized-performance.md)
