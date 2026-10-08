---
title: "sp_prepexecrpc (Transact-SQL)"
description: sp_prepexecrpc prepares and executes a parameterized stored procedure call specified using an RPC identifier.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_cursor_prepexecrpc"
  - "sp_cursor_prepexecrpc_TSQL"
helpviewer_keywords:
  - "sp_prepexecrpc"
dev_langs:
  - "TSQL"
---
# sp_prepexecrpc (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Prepares and executes a parameterized stored procedure call specified using a remote procedure call (RPC) identifier. `sp_prepexecrpc` is invoked by `ID = 14` in a tabular data stream (TDS) packet.



## Syntax

```syntaxsql
sp_prepexecrpc handle OUTPUT , RPCCall
    [ , bound_param ] [ , ...n ]
[ ; ]
```

## Arguments

> **Important:**  
> Arguments for extended stored procedures must be entered in the specific order as described in the [Syntax](#syntax) section. If the parameters are entered out of order, an error message occurs.


#### *handle*

The  SQL Server 
-generated prepared handle identifier. *handle* is a required parameter with an **int** return value.

#### *RPCCall*

Defines the stored procedure call using ODBC canonical syntax. *RPCCall* is a required parameter that calls for an **ntext** string input value.

#### *bound_param*

Signifies the optional use of extra parameters. *bound_param* calls for an input value of any data type to designate the extra parameters in use.

## Related content

- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
