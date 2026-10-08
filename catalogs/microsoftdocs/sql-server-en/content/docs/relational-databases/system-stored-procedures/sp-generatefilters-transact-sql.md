---
title: "sys.sp_generatefilters (Transact-SQL)"
description: sp_generatefilters creates filters on foreign key tables when a specified table is replicated.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "sp_generatefilters"
  - "sp_generatefilters_TSQL"
helpviewer_keywords:
  - "sp_generatefilters"
dev_langs:
  - "TSQL"
---
# sys.sp_generatefilters (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Creates filters on foreign key tables when a specified table is replicated. This stored procedure is executed at the Publisher on the publication database.



## Syntax

```syntaxsql
sys.sp_generatefilters [ @publication = ] N'publication'
[ ; ]
```

## Arguments

#### [ @publication = ] N'*publication*'

The name of the publication to be filtered. *@publication* is **sysname**, with no default.

## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_generatefilters` is used in merge replication.

## Permissions

Only members of the **sysadmin** fixed server role or the **db_owner** fixed database role can execute `sp_generatefilters`.

## Related content

- [sp_bindsession (Transact-SQL)](sp-bindsession-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
