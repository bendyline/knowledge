---
title: "sp_execute (Transact-SQL)"
description: sp_execute executes a prepared Transact-SQL statement using a specified handle and optional parameter value.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_cursor_execute"
  - "sp_cursor_execute_TSQL"
helpviewer_keywords:
  - "sp_execute"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# sp_execute (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 


 





Executes a prepared  Transact-SQL  statement using a specified handle and optional parameter value. `sp_execute` is invoked by specifying `ID = 12` in a tabular data stream (TDS) packet.



## Syntax

```syntaxsql
sp_execute handle OUTPUT
    [ , bound_param ] [ , ...n ]
[ ; ]
```

## Arguments

> **Important:**  
> Arguments for extended stored procedures must be entered in the specific order as described in the [Syntax](#syntax) section. If the parameters are entered out of order, an error message occurs.


#### *handle*

The *handle* value returned by `sp_prepare`. The required *handle* parameter is **int**, and can't be `NULL`.

#### *bound_param*

Signifies the use of extra parameters. The *bound_param* parameter is any data type, to signify more parameters for the procedure, and can't be `NULL`.

> **Note:**  
> *bound_param* must match the declarations made by the `sp_prepare` *@params* value, and can be in the form `@name = <value>` or `<value>`.

## Related content

- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
- [sp_prepare (Transact-SQL)](sp-prepare-transact-sql.md)
- [sp_executesql (Transact-SQL)](sp-executesql-transact-sql.md)
