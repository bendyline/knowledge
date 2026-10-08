---
title: "sp_replrestart (Transact-SQL)"
description: sp_replrestart is used by transactional replication during backup and restore.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "sp_replrestart_TSQL"
  - "sp_replrestart"
helpviewer_keywords:
  - "sp_replrestart"
dev_langs:
  - "TSQL"
---
# sp_replrestart (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





Used by transactional replication during backup and restore so that the replicated data at the Distributor is synchronized with data at the Publisher. This stored procedure is executed at the Publisher on the publication database.

> **Important:**  
> `sp_replrestart` is an internal replication stored procedure and should only be used when restoring a database published in a transactional replication topology as directed in [Strategies for Backing Up and Restoring Snapshot and Transactional Replication](../replication/administration/strategies-for-backing-up-and-restoring-snapshot-and-transactional-replication.md).



```syntaxsql
sp_replrestart
[ ; ]
```

## Arguments

None.

## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_replrestart` is used when the highest log sequence number (LSN) value at the Distributor doesn't match the highest LSN value at the Publisher.

## Permissions

Only members of the **sysadmin** fixed server role or **db_owner** fixed database role can execute `sp_replrestart`.

## Related content

- [Replication stored procedures (Transact-SQL)](replication-stored-procedures-transact-sql.md)
