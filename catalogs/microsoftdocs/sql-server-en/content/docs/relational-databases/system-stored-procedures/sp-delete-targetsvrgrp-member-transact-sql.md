---
title: "sp_delete_targetsvrgrp_member (Transact-SQL)"
description: Removes a target server from a target server group.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_delete_targetsvrgrp_member_TSQL"
  - "sp_delete_targetsvrgrp_member"
helpviewer_keywords:
  - "sp_delete_targetsvrgrp_member"
dev_langs:
  - "TSQL"
---
# sp_delete_targetsvrgrp_member (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Removes a target server from a target server group.



## Syntax

```syntaxsql
dbo.sp_delete_targetsvrgrp_member
    [ @group_name = ] N'group_name'
    , [ @server_name = ] N'server_name'
[ ; ]
```

## Arguments

#### [ @group_name = ] N'*group_name*'

The name of the group. *@group_name* is **sysname**, with no default.

#### [ @server_name = ] N'*server_name*'

The name of the server to remove from the specified group. *@server_name* is **sysname**, with no default.

## Return code values

`0` (success) or `1` (failure).

## Result set

None.

## Permissions

To run this stored procedure, users must be granted the **sysadmin** fixed server role.

## Examples

The following example removes the server `LONDON1` from the `Servers Maintaining Customer Information` group.

```sql
USE msdb;
GO

EXECUTE sp_delete_targetsvrgrp_member
    @group_name = N'Servers Maintaining Customer Information',
    @server_name = N'LONDON1';
GO
```

## Related content

- [sp_add_targetsvrgrp_member (Transact-SQL)](sp-add-targetsvrgrp-member-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
