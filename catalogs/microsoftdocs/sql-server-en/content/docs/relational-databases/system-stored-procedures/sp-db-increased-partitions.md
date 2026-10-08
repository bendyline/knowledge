---
title: "sys.sp_db_increased_partitions (Transact-SQL)"
description: "sp_db_increased_partitions enables or disables support for up to 15,000 partitions for the specified database."
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_db_increased_partitions_TSQL"
  - "sp_db_increased_partitions"
helpviewer_keywords:
  - "sp_db_increased_partitions"
dev_langs:
  - "TSQL"
---
# sys.sp_db_increased_partitions (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Enables or disables support for up to 15,000 partitions for the specified database.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature. 



## Syntax

```syntaxsql
sys.sp_db_increased_partitions
    [ [ @dbname = ] N'dbname' ]
    [ , [ @increased_partitions = ] 'increased_partitions' ]
[ ; ]
```

## Arguments

#### [ @dbname = ] N'*dbname*'

The name of the database. *@dbname* is **sysname**, with a default of `NULL`.

If *@dbname* isn't specified, the current database is used.

#### [ @increased_partitions = ] '*increased_partitions*'

Enables or disables support for 15,000 partitions on the specified database. *@increased_partitions* is **varchar(6)**, with a default of `NULL`. Accepted values are `ON` or `TRUE` to enable support, and `OFF` or `FALSE` to disable support.

If *@increased_partitions* isn't specified, the procedure returns `1` to indicate support is enabled for the specified database, or `0` to indicate support is disabled.

## Return code values

`0` (success) or `1` (failure).

## Permissions

Requires `ALTER DATABASE` permission on the specified database.
