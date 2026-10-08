---
title: "sys.sp_dropsubscriber (Transact-SQL)"
description: sp_dropsubscriber removes the Subscriber designation from a registered server.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "sp_dropsubscriber_TSQL"
  - "sp_dropsubscriber"
helpviewer_keywords:
  - "sp_dropsubscriber"
dev_langs:
  - "TSQL"
---
# sys.sp_dropsubscriber (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





Removes the Subscriber designation from a registered server. This stored procedure is executed at the Publisher on the publication database.

> **Important:**  
> This stored procedure has been deprecated. You're no longer required to explicitly register a Subscriber at the Publisher.



## Syntax

```syntaxsql
sys.sp_dropsubscriber
    [ @subscriber = ] N'subscriber'
    [ , [ @reserved = ] N'reserved' ]
    [ , [ @ignore_distributor = ] ignore_distributor ]
    [ , [ @publisher = ] N'publisher' ]
[ ; ]
```

## Arguments

#### [ @subscriber = ] N'*subscriber*'

The name of the Subscriber to be dropped. *@subscriber* is **sysname**, with no default.

#### [ @reserved = ] N'*reserved*'

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


#### [ @ignore_distributor = ] *ignore_distributor*

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


#### [ @publisher = ] N'*publisher*'

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_dropsubscriber` is used in all types of replication.

This stored procedure removes the server `sub` option, and removes the remote login mapping of system administrator to **repl_subscriber**.

## Permissions

Only members of the **sysadmin** fixed server role can execute `sp_dropsubscriber`.

## Related content

- [Delete a Push Subscription](../replication/delete-a-push-subscription.md)
- [Delete a Pull Subscription](../replication/delete-a-pull-subscription.md)
- [sys.sp_addsubscriber (Transact-SQL)](sp-addsubscriber-transact-sql.md)
- [sys.sp_changesubscriber (Transact-SQL)](sp-changesubscriber-transact-sql.md)
- [sys.sp_helpdistributor (Transact-SQL)](sp-helpdistributor-transact-sql.md)
- [sys.sp_helpserver (Transact-SQL)](sp-helpserver-transact-sql.md)
- [sys.sp_helpsubscriberinfo (Transact-SQL)](sp-helpsubscriberinfo-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
