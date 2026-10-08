---
title: "sysmail_delete_profile_sp (Transact-SQL)"
description: "Deletes a mail profile used by Database Mail."
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sysmail_delete_profile_sp"
  - "sysmail_delete_profile_sp_TSQL"
helpviewer_keywords:
  - "sysmail_delete_profile_sp"
dev_langs:
  - "TSQL"
---
# sysmail_delete_profile_sp (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Deletes a mail profile used by Database Mail.



## Syntax

```syntaxsql
dbo.sysmail_delete_profile_sp
    { [ @profile_id = ] profile_id
        | [ @profile_name = ] N'profile_name' }
    [ , [ @force_delete = ] force_delete ]
[ ; ]
```

## Arguments

#### [ @profile_id = ] *profile_id*

The profile ID of the profile to be deleted. *@profile_id* is **int**, with a default of `NULL`. Either *@profile_id* or *@profile_name* must be specified.

#### [ @profile_name = ] N'*profile_name*'

The name of the profile to be deleted. *@profile_name* is **sysname**, with a default of `NULL`. Either *@profile_id* or *@profile_name* must be specified.

#### [ @force_delete = ] *force_delete*

 Identified for informational purposes only. Not supported. Future compatibility is not guaranteed. 


## Return code values

`0` (success) or `1` (failure).

## Result set

None.

## Remarks

Deleting a profile doesn't delete the accounts used by the profile.

This stored procedure deletes the profile regardless of whether users have access to the profile. Use caution when removing the default private profile for a user or the default public profile for the `msdb` database. When no default profile is available, `sp_send_dbmail` requires the name of a profile as an argument. Therefore, removing a default profile might cause calls to `sp_send_dbmail` to fail. For more information, see [sp_send_dbmail](sp-send-dbmail-transact-sql.md).

The stored procedure `sysmail_delete_profile_sp` is in the `msdb` database and is owned by the **dbo** schema. The procedure must be executed with a three-part name if the current database isn't `msdb`.

## Permissions

You can grant `EXECUTE` permissions on this procedure, but these permissions might be overridden during a SQL Server upgrade.


## Examples

The following example shows deleting the profile named `AdventureWorks Administrator`.

```sql
EXECUTE msdb.dbo.sysmail_delete_profile_sp @profile_name = 'AdventureWorks Administrator';
```

## Related content

- [Database Mail](../database-mail/database-mail.md)
- [Database Mail Configuration Objects](../database-mail/database-mail-configuration-objects.md)
- [Database Mail stored procedures (Transact-SQL)](database-mail-stored-procedures-transact-sql.md)
