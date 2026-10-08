---
title: "sp_unprepare (Transact-SQL)"
description: Discards the execution plan created by the `sp_prepare` stored procedure.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_cursor_unprepare_TSQL"
  - "sp_cursor_unprepare"
helpviewer_keywords:
  - "sp_unprepare"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# sp_unprepare (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 


 





Discards the execution plan created by the `sp_prepare` stored procedure. `sp_unprepare` is invoked by specifying `ID = 15` in a tabular data stream (TDS) packet.

## Syntax

```syntaxsql
sp_unprepare handle
[ ; ]
```

## Arguments

> **Important:**  
> Arguments for extended stored procedures must be entered in the specific order as described in the [Syntax](#syntax) section. If the parameters are entered out of order, an error message occurs.


#### *handle*

The *handle* value returned by `sp_prepare`. *handle* is **int**.

## Examples

The following example prepares, executes, and unprepares a basic statement.

```sql
DECLARE @P1 AS INT;

EXECUTE sp_prepare
    @P1 OUTPUT, N'@P1 NVARCHAR(128), @P2 NVARCHAR(100)',
    N'SELECT database_id, name FROM sys.databases WHERE name = @P1 AND state_desc = @P2';

EXECUTE sp_execute @P1, N'tempdb', N'ONLINE';

EXECUTE sp_unprepare @P1;
```

## Related content

- [sp_prepare (Transact-SQL)](sp-prepare-transact-sql.md)
