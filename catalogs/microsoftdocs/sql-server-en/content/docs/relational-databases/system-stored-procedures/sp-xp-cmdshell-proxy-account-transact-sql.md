---
title: "sp_xp_cmdshell_proxy_account (Transact-SQL)"
description: Creates a proxy credential for xp_cmdshell.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_xp_cmdshell_proxy_account"
  - "sp_xp_cmdshell_proxy_account_TSQL"
helpviewer_keywords:
  - "sp_xp_cmdshell_proxy_account"
  - "xp_cmdshell"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# sp_xp_cmdshell_proxy_account (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)




Creates a proxy credential for `xp_cmdshell`.

> **Note:**  
> `xp_cmdshell` is disabled by default. To enable `xp_cmdshell`, see [xp_cmdshell (server configuration option)](../../database-engine/configure-windows/xp-cmdshell-server-configuration-option.md).



## Syntax

```syntaxsql
sp_xp_cmdshell_proxy_account [ NULL | { 'account_name' , 'password' } ]
[ ; ]
```

## Arguments

> **Important:**  
> Arguments for extended stored procedures must be entered in the specific order as described in the [Syntax](#syntax) section. If the parameters are entered out of order, an error message occurs.


#### NULL

Specifies that the proxy credential should be deleted.

#### '*account_name*'

Specifies the Windows account to be the proxy.

#### '*password*'

Specifies the password of the Windows account.

## Return code values

`0` (success) or `1` (failure).

## Remarks

The proxy credential is called `##xp_cmdshell_proxy_account##`.

When it's executed using the `NULL` option, `sp_xp_cmdshell_proxy_account` deletes the proxy credential.

## Permissions

Requires `CONTROL SERVER` permission.

## Examples

### A. Create the proxy credential

The following example shows how to create a proxy credential for a Windows account called `ADVWKS\Max04`. Replace `<password>` with a strong password.

```sql
EXECUTE sp_xp_cmdshell_proxy_account 'ADVWKS\Max04', '<password>';
GO
```

### B. Drop the proxy credential

The following example removes the proxy credential from the credential store.

```sql
EXECUTE sp_xp_cmdshell_proxy_account NULL;
GO
```

## Related content

- [xp_cmdshell (Transact-SQL)](xp-cmdshell-transact-sql.md)
- [CREATE CREDENTIAL (Transact-SQL)](../../t-sql/statements/create-credential-transact-sql.md)
- [sys.credentials (Transact-SQL)](../system-catalog-views/sys-credentials-transact-sql.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
- [Security stored procedures (Transact-SQL)](security-stored-procedures-transact-sql.md)
