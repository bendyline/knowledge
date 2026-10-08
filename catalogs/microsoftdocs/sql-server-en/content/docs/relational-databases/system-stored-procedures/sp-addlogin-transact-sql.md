---
title: "sys.sp_addlogin (Transact-SQL)"
description: Creates a new SQL Server login that allows a user to connect to a SQL Server instance with SQL Server authentication.
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 06/19/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sp_addlogin"
  - "sp_addlogin_TSQL"
helpviewer_keywords:
  - "sp_addlogin"
dev_langs:
  - "TSQL"
---
# sys.sp_addlogin (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Creates a new  SQL Server 
 login that allows a user to connect to an instance of  SQL Server 
 by using  SQL Server 
 authentication.

> **Important:**  
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use [CREATE LOGIN](../../t-sql/statements/create-login-transact-sql.md) instead.

> **Important:**  
>  When possible, use Windows authentication. 




## Syntax

```syntaxsql
sys.sp_addlogin
    [ @loginame = ] N'loginame'
    [ , [ @passwd = ] N'passwd' ]
    [ , [ @defdb = ] N'defdb' ]
    [ , [ @deflanguage = ] N'deflanguage' ]
    [ , [ @sid = ] sid ]
    [ , [ @encryptopt = ] 'encryptopt' ]
[ ; ]
```

## Arguments

#### [ @loginame = ] N'*loginame*'

The name of the login. *@loginame* is **sysname**, with no default.

#### [ @passwd = ] N'*passwd*'

The login password. *@passwd* is **sysname**, with a default of `NULL`.

> **Important:**  
>  Do not use a blank password. Use a strong password. 


#### [ @defdb = ] N'*defdb*'

The default database of the login (the database to which the login is first connected after logging in). *@defdb* is **sysname**, with a default of `master`.

#### [ @deflanguage = ] N'*deflanguage*'

The default language of the login. *@deflanguage* is **sysname**, with a default of `NULL`. If *@deflanguage* isn't specified, the default *@deflanguage* of the new login is set to the current default language of the server.

#### [ @sid = ] *sid*

The security identification number (SID). *@sid* is **varbinary(16)**, with a default of `NULL`. If *@sid* is `NULL`, the system generates a SID for the new login. Despite the use of a **varbinary** data type, values other than `NULL` must be exactly 16 bytes in length, and can't already exist. Specifying *@sid* is useful, for example, when you're scripting or moving  SQL Server 
 logins from one server to another and you want the logins to have the same SID on different servers.

#### [ @encryptopt = ] '*encryptopt*'

Specifies whether the password is passed in as clear text or as the hash of the clear text password. No encryption takes place. The word "encrypt" is used in this discussion for the sake of backward compatibility. If a clear text password is passed in, it's hashed. The hash is stored. *@encryptopt* is **varchar(20)**, and can be one of the following values.

| Value | Description |
| --- | --- |
| `NULL` (default) | The password is passed in clear. |
| `skip_encryption` | The password is already hashed. The  Database Engine |
 | should store the value without rehashing it. |
| `skip_encryption_old` | The supplied password was hashed by an earlier version of  SQL Server |
| . The  Database Engine |
 | should store the value without rehashing it. This option is provided for upgrade purposes only. |

## Return code values

`0` (success) or `1` (failure).

## Remarks

 SQL Server 
 logins can contain from 1 to 128 characters, including letters, symbols, and numbers. Logins can't contain a backslash (`\`); be a reserved login name, for example **sa** or **public**, or already exist; or be `NULL` or an empty string.

If the name of a default database is supplied, you can connect to the specified database without executing the `USE` statement. However, you can't use the default database until you're given access to that database by the database owner (by using [sp_adduser](sp-adduser-transact-sql.md), [sp_addrolemember](sp-addrolemember-transact-sql.md)), or [sp_addrole](sp-addrole-transact-sql.md).

The SID number is a GUID that uniquely identifies the login in the server.

Changing the default language of the server doesn't change the default language of existing logins. To change the default language of the server, use [sp_configure](sp-configure-transact-sql.md).

Using `skip_encryption` to suppress password hashing is useful if the password is already hashed when the login is added to  SQL Server 
. If the password was hashed by an earlier version of  SQL Server 
, use `skip_encryption_old`.

`sp_addlogin` can't be executed within a user-defined transaction.

The following table shows several stored procedures that are used with `sp_addlogin`.

| Stored procedure | Description |
| --- | --- |
| [sp_grantlogin](sp-grantlogin-transact-sql.md) | Adds a Windows user or group. |
| [sp_password](sp-password-transact-sql.md) | Changes the password of a user. |
| [sp_defaultdb](sp-defaultdb-transact-sql.md) | Changes the default database of a user. |
| [sp_defaultlanguage](sp-defaultlanguage-transact-sql.md) | Changes the default language of a user. |

## Permissions

Requires ALTER ANY LOGIN permission.

## Examples

### A. Create a SQL Server login

The following example creates a  SQL Server 
 login for the user `Victoria`, without specifying a default database. Replace `<password>` with a strong password.

```sql
EXECUTE sp_addlogin 'Victoria', '<password>';
GO
```

### B. Create a SQL Server login that has a default database

The following example creates a  SQL Server 
 login for the user `Albert`, and a default database of `corporate`. Replace `<password>` with a strong password.

```sql
EXECUTE sp_addlogin 'Albert', '<password>', 'corporate';
GO
```

### C. Create a SQL Server login that has a different default language

The following example creates a  SQL Server 
 login for the user `TzTodorov`, a default database of  `AdventureWorks2025` , and a default language of `Bulgarian`. Replace `<password>` with a strong password.

```sql
EXECUTE sp_addlogin 'TzTodorov', '<password>', 'AdventureWorks2022', N'български';
```

### D. Create a SQL Server login that has a specific SID

The following example creates a  SQL Server 
 login for the user `Michael`, a default database of  `AdventureWorks2025` , a default language of `us_english`, and a SID of `0x0123456789ABCDEF0123456789ABCDEF`. Replace `<password>` with a strong password.

```sql
EXECUTE sp_addlogin 'Michael', '<password>', 'AdventureWorks2022', 'us_english', 0x0123456789ABCDEF0123456789ABCDEF;
```

## Related content

- [CREATE LOGIN (Transact-SQL)](../../t-sql/statements/create-login-transact-sql.md)
- [sys.sp_droplogin (Transact-SQL)](sp-droplogin-transact-sql.md)
- [sys.sp_helpuser (Transact-SQL)](sp-helpuser-transact-sql.md)
- [sys.sp_revokelogin (Transact-SQL)](sp-revokelogin-transact-sql.md)
- [sys.xp_logininfo (Transact-SQL)](xp-logininfo-transact-sql.md)
