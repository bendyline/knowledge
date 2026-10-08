---
title: "sys.sp_scriptsubconflicttable (Transact-SQL)"
description: Generates script for creating a conflict table on the Subscriber for a given queued subscription article.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "sp_scriptsubconflicttable"
  - "sp_scriptsubconflicttable_TSQL"
helpviewer_keywords:
  - "sp_scriptsubconflicttable"
dev_langs:
  - "TSQL"
---
# sys.sp_scriptsubconflicttable (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Generates script for creating a conflict table on the Subscriber for a given queued subscription article. The script that is generated is executed at the Subscriber on the subscription database. This stored procedure is executed at the Publisher on the publication database.



## Syntax

```syntaxsql
sys.sp_scriptsubconflicttable
    [ @publication = ] N'publication'
    , [ @article = ] N'article'
    [ , [ @alter = ] alter ]
    [ , [ @usesqlclr = ] usesqlclr ]
[ ; ]
```

#### [ @publication = ] N'*publication*'

The name of the publication that contains the article. The name must be unique in the database. *@publication* is **sysname**, with no default.

#### [ @article = ] N'*article*'

The name of the subscription article. *@article* is **sysname**, with no default.

#### [ @alter = ] *alter*

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


#### [ @usesqlclr = ] *usesqlclr*

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


## Return code values

`0` (success) or `1` (failure).

## Result set

| Column name | Data type | Description |
| --- | --- | --- |
| `cmdtext` | **nvarchar(4000)** | Returns the  Transact-SQL  script for creating the conflict table on the Subscriber for the queued subscription article. This script is executed on the Subscriber in the subscription database. |

## Remarks

`sp_scriptsubconflicttable` is used for Subscribers that have subscriptions where the initial snapshot is applied manually. The conflict table is an optional table at the Subscriber.

## Permissions

Only members of the **sysadmin** fixed server role or **db_owner** fixed database role can execute `sp_scriptsubconflicttable`.

## Related content

- [Updatable Subscriptions - Queued Updating Conflict Resolution](../replication/transactional/updatable-subscriptions-queued-updating-conflict-resolution.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
