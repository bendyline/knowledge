---
title: "sysmail_update_profile_sp (Transact-SQL)"
description: "Changes the description or name of a Database Mail profile."
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sysmail_update_profile_sp"
  - "sysmail_update_profile_sp_TSQL"
helpviewer_keywords:
  - "sysmail_update_profile_sp"
dev_langs:
  - "TSQL"
---
# sysmail_update_profile_sp (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Changes the description or name of a Database Mail profile.



## Syntax

```syntaxsql
dbo.sysmail_update_profile_sp
    [ [ @profile_id = ] profile_id ]
    [ , [ @profile_name = ] N'profile_name' ]
    [ , [ @description = ] N'description' ]
[ ; ]
```

## Arguments

#### [ @profile_id = ] *profile_id*

The profile ID to update. *@profile_id* is **int**, with a default of `NULL`. At least one of *@profile_id* or *@profile_name* must be specified. If both are specified, the procedure changes the name of the profile.

#### [ @profile_name = ] N'*profile_name*'

The name of the profile to update or the new name for the profile. *@profile_name* is **sysname**, with a default of `NULL`. At least one of *@profile_id* or *@profile_name* must be specified. If both are specified, the procedure changes the name of the profile.

#### [ @description = ] N'*description*'

The new description for the profile. *@description* is **nvarchar(256)**, with a default of `NULL`.

## Return code values

`0` (success) or `1` (failure).

## Remarks

When both the profile ID and the profile name are specified, the procedure changes the name of the profile to the provided name and updates the description for the profile. When only one of these arguments is provided, the procedure updates the description for the profile.

The stored procedure `sysmail_update_profile_sp` is in the `msdb` database and is owned by the **dbo** schema. The procedure must be executed with a three-part name if the current database isn't `msdb`.

## Permissions

You can grant `EXECUTE` permissions on this procedure, but these permissions might be overridden during a SQL Server upgrade.


## Examples

### A. Change the description of a profile

The following example changes the description for the profile named `AdventureWorks Administrator` in the `msdb` database.

```sql
EXECUTE msdb.dbo.sysmail_update_profile_sp
    @profile_name = 'AdventureWorks Administrator',
    @description = 'Administrative mail profile.';
```

### B. Change the name and description of a profile

The following example changes the name and description of the profile with the profile ID `750`.

```sql
EXECUTE msdb.dbo.sysmail_update_profile_sp
    @profile_id = 750,
    @profile_name = 'Operator',
    @description = 'Profile to send alert e-mail to operators.';
```

## Related content

- [Database Mail](../database-mail/database-mail.md)
- [Database Mail Configuration Objects](../database-mail/database-mail-configuration-objects.md)
- [Create a Database Mail account](../database-mail/create-a-database-mail-account.md)
- [Database Mail stored procedures (Transact-SQL)](database-mail-stored-procedures-transact-sql.md)
