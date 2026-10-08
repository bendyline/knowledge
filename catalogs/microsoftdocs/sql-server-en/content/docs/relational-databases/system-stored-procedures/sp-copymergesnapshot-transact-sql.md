---
title: "sys.sp_copymergesnapshot (Transact-SQL)"
description: "Copies the snapshot folder of the specified publication to the folder listed in the @destination_folder."
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
f1_keywords:
  - "sp_copymergesnapshot"
  - "sp_copymergesnapshot_TSQL"
helpviewer_keywords:
  - "sp_copymergesnapshot"
dev_langs:
  - "TSQL"
---
# sys.sp_copymergesnapshot (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





Copies the snapshot folder of the specified publication to the folder listed in the *@destination_folder*. This stored procedure is executed at the Publisher on the publication database.



## Syntax

```syntaxsql
sys.sp_copymergesnapshot
    [ @publication = ] N'publication'
    , [ @destination_folder = ] N'destination_folder'
[ ; ]
```

## Arguments

#### [ @publication = ] N'*publication*'

The name of the publication whose snapshot contents are to be copied. *@publication* is **sysname**, with no default.

#### [ @destination_folder = ] N'*destination_folder*'

The name of the folder where the contents of the publication snapshot is to be copied. *@destination_folder* is **nvarchar(255)**, with no default. The *@destination_folder* can be an alternate location such as on another server, on a network drive, or on removable media (such as CD-ROMs or removable disks).

## Return code values

`0` (success) or `1` (failure).

## Remarks

`sp_copymergesnapshot` is used in merge replication.

## Permissions

Only members of the **sysadmin** fixed server role or **db_owner** fixed database role can execute `sp_copymergesnapshot`.

## Related content

- [Modify Snapshot Initialization Options for SQL Replication](../replication/snapshot-options.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
