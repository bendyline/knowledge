---
title: "sp_cursorunprepare (Transact-SQL)"
description: sp_cursorunprepare discards the execution plan developed in the sp_cursorprepare stored procedure.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_cursorunprepare_TSQL"
  - "sp_cursorunprepare"
helpviewer_keywords:
  - "sp_cursorunprepare"
dev_langs:
  - "TSQL"
---
# sp_cursorunprepare (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Discards the execution plan developed in the `sp_cursorprepare` stored procedure. `sp_cursorunprepare` is invoked by specifying `ID = 6` in a tabular data stream (TDS) packet.



## Syntax

```syntaxsql
sp_cursorunprepare handle
[ ; ]
```

## Arguments

> **Important:**  
> Arguments for extended stored procedures must be entered in the specific order as described in the [Syntax](#syntax) section. If the parameters are entered out of order, an error message occurs.


#### *handle*

The *handle* value returned by `sp_cursorprepare` when the statement is prepared.

## Related content

- [sp_cursorprepare (Transact-SQL)](sp-cursorprepare-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
