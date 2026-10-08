---
title: "sys.sp_startpublication_snapshot (Transact-SQL)"
description: sp_startpublication_snapshot starts the Snapshot Agent job that generates the initial snapshot for a publication.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "sp_startpublication_snapshot"
  - "sp_startpublication_snapshot_TSQL"
helpviewer_keywords:
  - "sp_startpublication_snapshot"
dev_langs:
  - "TSQL"
---
# sys.sp_startpublication_snapshot (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Used to start the Snapshot Agent job that generates the initial snapshot for a publication. This stored procedure is executed at the Publisher on the publication database.



## Syntax

```syntaxsql
sys.sp_startpublication_snapshot
    [ @publication = ] N'publication'
    [ , [ @publisher = ] N'publisher' ]
[ ; ]
```

## Arguments

#### [ @publication = ] N'*publication*'

The name of the publication. *@publication* is **sysname**, with no default.

#### [ @publisher = ] N'*publisher*'

The name of a non- SQL Server 
 Publisher. *@publisher* is **sysname**, with a default of `NULL`. You shouldn't specify this parameter for a  SQL Server 
 Publisher.

## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_startpublication_snapshot` is used with all types of replication.

For a non- SQL Server 
 Publisher, this stored procedure is executed at the Distributor on the distribution database.

## Permissions

Only members of the **sysadmin** fixed server role or **db_owner** fixed database role can execute `sp_startpublication_snapshot`.

## Related content

- [Create and Apply the Initial Snapshot](../replication/create-and-apply-the-initial-snapshot.md)
- [sys.sp_addpublication_snapshot (Transact-SQL)](sp-addpublication-snapshot-transact-sql.md)
- [sys.sp_changepublication_snapshot (Transact-SQL)](sp-changepublication-snapshot-transact-sql.md)
