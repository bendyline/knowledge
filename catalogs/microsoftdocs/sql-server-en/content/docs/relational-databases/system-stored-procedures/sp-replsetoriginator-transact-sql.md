---
title: "sys.sp_replsetoriginator (Transact-SQL)"
description: sp_replsetoriginator used to invoke loopback detection and handling in bidirectional transactional replication.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "sp_replsetoriginator"
  - "sp_replsetoriginator_TSQL"
helpviewer_keywords:
  - "sp_replsetoriginator"
dev_langs:
  - "TSQL"
---
# sys.sp_replsetoriginator (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





Used to invoke loopback detection and handling in bidirectional transactional replication. This stored procedure is executed at the Publisher on the publication database.



## Syntax

```syntaxsql
sys.sp_replsetoriginator
    [ @originator_srv = ] N'originator_srv'
    , [ @originator_db = ] N'originator_db'
    [ , [ @publication = ] N'publication' ]
[ ; ]
```

## Arguments

#### [ @originator_srv = ] N'*originator_srv*'

The name of the server where the transaction is being applied. *@originator_srv* is **sysname**, with no default.

#### [ @originator_db = ] N'*originator_db*'

The name of the database where the transaction is being applied. *@originator_db* is **sysname**, with no default.

#### [ @publication = ] N'*publication*'

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_replsetoriginator` is executed by the Distribution Agent to record the source of transactions applied by replication. This information is used to invoke loopback detection for bidirectional transactional subscriptions that have the loopback property set.

## Permissions

Only members of the **sysadmin** fixed server role at the Publisher, members of the **db_owner** fixed database role on the publication database, or users in the publication access list (PAL) can execute `sp_replsetoriginator`.

## Related content

- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
