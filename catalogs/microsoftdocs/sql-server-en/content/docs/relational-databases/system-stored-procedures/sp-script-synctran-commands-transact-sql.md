---
title: "sys.sp_script_synctran_commands (Transact-SQL)"
description: Generates a script that contains the sp_addsynctrigger calls to be applied at Subscribers for updatable subscriptions.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "sp_script_synctran_commands"
  - "sp_script_synctran_commands_TSQL"
helpviewer_keywords:
  - "sp_script_synctran_commands"
dev_langs:
  - "TSQL"
---
# sys.sp_script_synctran_commands (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Generates a script that contains the `sp_addsynctrigger` calls to be applied at Subscribers for updatable subscriptions. There's one `sp_addsynctrigger` call for each article in the publication. The generated script also contains the `sp_addqueued_artinfo` calls that create the `MSsubsciption_articles` table that is needed to process queued publications. This stored procedure is executed at the Publisher on the publication database.



## Syntax

```syntaxsql
sys.sp_script_synctran_commands
    [ @publication = ] N'publication'
    [ , [ @article = ] N'article' ]
    [ , [ @trig_only = ] trig_only ]
    [ , [ @usesqlclr = ] usesqlclr ]
[ ; ]
```

## Arguments

#### [ @publication = ] N'*publication*'

The name of the publication to be scripted. *@publication* is **sysname**, with no default.

#### [ @article = ] N'*article*'

The name of the article to be scripted. *@article* is **sysname**, with a default of `all`, which specifies all articles are scripted.

#### [ @trig_only = ] *trig_only*

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


#### [ @usesqlclr = ] *usesqlclr*

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


## Return code values

`0` (success) or `1` (failure).

## Result set

`sp_script_synctran_commands` returns a result set that consists of a single **nvarchar(4000)** column. The result set forms the complete scripts necessary to create both the `sp_addsynctrigger` and `sp_addqueued_artinfo` calls to be applied at Subscribers.

## Remarks

`sp_script_synctran_commands` is used in snapshot and transactional replication.

`sp_addqueued_artinfo` is used for queued updatable subscriptions.

## Permissions

Only members of the **sysadmin** fixed server role or **db_owner** fixed database role can execute `sp_script_synctran_commands`.

## Related content

- [sys.sp_addsynctriggers (Transact-SQL)](sp-addsynctriggers-transact-sql.md)
- [sys.sp_addqueued_artinfo (Transact-SQL)](sp-addqueued-artinfo-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
