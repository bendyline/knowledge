---
title: "SET TEXTSIZE (Transact-SQL)"
description: Specifies the size, in bytes, of various data types returned to the client by a SELECT statement.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: randolphwest
ms.date: 04/17/2025
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "TEXTSIZE_TSQL"
  - "TEXTSIZE"
  - "SET_TEXTSIZE_TSQL"
  - "SET TEXTSIZE"
helpviewer_keywords:
  - "SET TEXTSIZE statement"
  - "SELECT statement [SQL Server], text size returned"
  - "size [SQL Server], text and image data"
  - "TEXTSIZE option"
  - "text size returned [SQL Server]"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# SET TEXTSIZE (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Specifies the size, in bytes, of **varchar(max)**, **nvarchar(max)**, **varbinary(max)**, **text**, **ntext**, and **image** data returned to the client by a `SELECT` statement.

> **Important:**  
> **ntext**, **text**, and **image** data types will be removed in a future version of  SQL Server 
. Avoid using these data types in new development work, and plan to modify applications that currently use them. Use **nvarchar(max)**, **varchar(max)**, and **varbinary(max)** instead.



## Syntax

```syntaxsql
SET TEXTSIZE { number }
```

## Arguments

#### *number*

The length of **varchar(max)**, **nvarchar(max)**, **varbinary(max)**, **text**, **ntext**, or **image** data, in bytes. *number* is an integer with a maximum value of `2147483647` (2 GB). A value of `-1` indicates unlimited size. A value of `0` resets the size to the default value of 4 KB.

The  SQL Server 
 Native Client (10.0 and higher) and ODBC Driver for  SQL Server 
 automatically specify `-1` (unlimited) when connecting.

## Remarks

Setting `SET TEXTSIZE` affects the `@@TEXTSIZE` function.

The setting of set `TEXTSIZE` is set at execute or run time and not at parse time.

For more information, see [Manage Transact-SQL job steps](https://learn.microsoft.com/ssms/agent/manage-job-steps#transact-sql-job-steps).

## Permissions

Requires membership in the **public** role.

## Related content

- [@@TEXTSIZE (Transact-SQL)](../functions/textsize-transact-sql.md)
- [Data types (Transact-SQL)](../data-types/data-types-transact-sql.md)
- [SET Statements (Transact-SQL)](set-statements-transact-sql.md)
