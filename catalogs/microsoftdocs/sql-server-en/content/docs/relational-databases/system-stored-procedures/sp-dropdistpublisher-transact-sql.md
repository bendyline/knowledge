---
title: "sys.sp_dropdistpublisher (Transact-SQL)"
description: Drops a distribution Publisher. This stored procedure is executed at the Distributor on any database.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "sp_dropdistpublisher"
  - "sp_dropdistpublisher_TSQL"
helpviewer_keywords:
  - "sp_dropdistpublisher"
dev_langs:
  - "TSQL"
---
# sys.sp_dropdistpublisher (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





Drops a distribution Publisher. This stored procedure is executed at the Distributor on any database.



## Syntax

```syntaxsql
sys.sp_dropdistpublisher
    [ @publisher = ] N'publisher'
    [ , [ @no_checks = ] no_checks ]
    [ , [ @ignore_distributor = ] ignore_distributor ]
[ ; ]
```

## Arguments

#### [ @publisher = ] N'*publisher*'

The Publisher to drop. *@publisher* is **sysname**, with no default.

> **Note:**  
> Using a custom port for the  SQL Server 
 publisher was introduced in  SQL Server 2019 (15.x) 
. If the  SQL Server 
 publisher is configured with a custom port, then when dropping such a publisher on the distributor, supply the publisher server name instead of `<Hostname>,<PortNumber>`.

#### [ @no_checks = ] *no_checks*

Specifies whether `sp_dropdistpublisher` checks that the Publisher has uninstalled the server as the Distributor. *@no_checks* is **bit**, with a default of `0`.

- If `0`, replication verifies that the remote Publisher has uninstalled the local server as the Distributor. If the Publisher is local, replication verifies that there are no publication or distribution objects remaining on the local server.

- If `1`, all the replication objects associated with the distribution Publisher are dropped even if a remote Publisher can't be reached. After doing this, the remote Publisher must uninstall replication using [sp_dropdistributor](sp-dropdistributor-transact-sql.md) with `@ignore_distributor = 1`.

#### [ @ignore_distributor = ] *ignore_distributor*

Specifies whether distribution objects are left at the Distributor when the Publisher is removed. *@ignore_distributor* is **bit**, and can be one of these values:

- `1` = distribution objects belonging to the *@publisher* remain at the Distributor.
- `0` = distribution objects for the *@publisher* are cleaned-up at the Distributor.

## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_dropdistpublisher` is used in all types of replication.

When dropping an Oracle Publisher, if unable to drop the Publisher, `sp_dropdistpublisher` returns an error and the Distributor objects for the Publisher are removed.

## Examples

[language="sql" source="../replication/codesnippet/tsql/sp-dropdistpublisher-tra_1.sql"::: (complete source file; reference: ../replication/codesnippet/tsql/sp-dropdistpublisher-tra_1.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/sp-dropdistpublisher-tra_1.sql.md)

## Permissions

Only members of the **sysadmin** fixed server role can execute `sp_dropdistpublisher`.

## Related content

- [Disable Publishing and Distribution](../replication/disable-publishing-and-distribution.md)
- [sys.sp_adddistpublisher (Transact-SQL)](sp-adddistpublisher-transact-sql.md)
- [sys.sp_changedistpublisher (Transact-SQL)](sp-changedistpublisher-transact-sql.md)
- [sys.sp_helpdistpublisher (Transact-SQL)](sp-helpdistpublisher-transact-sql.md)
- [Replication stored procedures (Transact-SQL)](replication-stored-procedures-transact-sql.md)
