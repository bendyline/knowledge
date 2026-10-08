---
title: "sys.sp_getmergedeletetype (Transact-SQL)"
description: "sp_getmergedeletetype returns the type of merge delete (user, partial, or system)."
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "sp_getmergedeletetype"
  - "sp_getmergedeletetype_TSQL"
helpviewer_keywords:
  - "sp_getmergedeletetype"
dev_langs:
  - "TSQL"
---
# sys.sp_getmergedeletetype (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Returns the type of merge delete. This stored procedure is executed at the Publisher on the publication database or at the Subscriber on the subscription database.



## Syntax

```syntaxsql
sys.sp_getmergedeletetype
    [ @source_object = ] N'source_object'
    , [ @rowguid = ] 'rowguid'
    , [ @delete_type = ] delete_type OUTPUT
[ ; ]
```

## Arguments

#### [ @source_object = ] N'*source_object*'

The name of the source object. *@source_object* is **nvarchar(386)**, with no default.

#### [ @rowguid = ] '*rowguid*'

The row identifier for the delete type. *@rowguid* is **uniqueidentifier**, with no default.

#### [ @delete_type = ] *delete_type* OUTPUT

The code indicating the type of delete. *@delete_type* is an `OUTPUT` parameter of type **int**, and can be one of these values.

| Value | Description |
| --- | --- |
| `1` | User delete |
| `5` | Partial delete |
| `6` | System delete |

## Remarks

`sp_getmergedeletetype` is used in merge replication.

## Permissions

Only members of the **sysadmin** fixed server role or the **db_owner** fixed database role can execute `sp_getmergedeletetype`.

## Related content

- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
