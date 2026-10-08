---
title: "LOGINPROPERTY (Transact-SQL)"
description: "LOGINPROPERTY (Transact-SQL)"
author: VanMSFT
ms.author: vanto
ms.date: 08/05/2025
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "BadPasswordCount_TSQL"
  - "BadPasswordTime_TSQL"
  - "IsLockedIsMustChange"
  - "PasswordLastSetTime"
  - "LOGINPROPERTY_TSQL"
  - "LockoutTime"
  - "BadPasswordCount"
  - "PasswordHash"
  - "HistoryLengthIsExpired"
  - "LockoutTime_TSQL"
  - "PasswordHash_TSQL"
  - "HistoryLengthIsExpired_TSQL"
  - "PasswordLastSetTime_TSQL"
  - "BadPasswordTime"
  - "IsLockedIsMustChange_TSQL"
  - "LOGINPROPERTY"
helpviewer_keywords:
  - "default database"
  - "LOGINPROPERTY function"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azuresqldb-mi-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azure-sqldw-latest || =fabric-sqldb"
---
# LOGINPROPERTY (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns information about login policy settings.



## Syntax

```syntaxsql
LOGINPROPERTY ( 'login_name' , 'property_name' )
```

## Arguments

#### *login_name*

The name of a  SQL Server 
 login for which login property status will be returned.

#### *propertyname*

An expression that contains the property information to be returned for the login. *propertyname* can be one of the following values.

| Value | Description |
| --- | --- |
| **BadPasswordCount** | Returns the number of consecutive attempts to log in with an incorrect password. |
| **BadPasswordTime** | Returns the time of the last attempt to log in with an incorrect password. |
| **DaysUntilExpiration** | Returns the number of days until the password expires. |
| **DefaultDatabase** | Returns the  SQL Server |
 | login default database as stored in metadata or `master` if no database is specified. Returns NULL for non- SQL Server |
 | provisioned users (for example, Windows authenticated users). |
| **DefaultLanguage** | Returns the login default language as stored in metadata. Returns NULL for non- SQL Server |
 | provisioned users, for example, Windows authenticated users. |
| **HistoryLength** | Returns the number of passwords tracked for the login, using the password-policy enforcement mechanism. 0 if the password policy isn't enforced. Resuming password policy enforcement restarts at 1. |
| **IsExpired** | Indicates whether the login's password has expired. |
| **IsLocked** | Indicates whether the login is locked. |
| **IsMustChange** | Indicates whether the login must change its password the next time it connects. |
| **LockoutTime** | Returns the date when the  SQL Server |
 | login was locked out because it had exceeded the permitted number of failed login attempts. |
| **PasswordHash** | Returns the hash of the password. |
| **PasswordLastSetTime** | Returns the date when the current password was set. |
| **PasswordHashAlgorithm** | Returns the algorithm used to hash the password. In  SQL Server 2022 (16.x) |
 | and earlier versions, the stored password information is calculated using SHA-512 of the salted password. Starting with  SQL Server 2025 (17.x) |
| , an iterated hash algorithm, RFC2898 (PBKDF) is used. The first byte of the hash indicates the version: `0x02` for version 2 ( SQL Server 2022 (16.x) |
 | and earlier versions) and `0x03` for version 3 ( SQL Server 2025 (17.x) |
 | and later versions). |

## Returns

Data type depends on requested value.

**IsLocked**, **IsExpired**, and **IsMustChange** are of type **int**.

- 1 if the login is in the specified state.

- 0 if the login isn't in the specified state.

**BadPasswordCount** and **HistoryLength** are of type **int**.

**BadPasswordTime**, **LockoutTime**, **PasswordLastSetTime** are of type **datetime**.

**PasswordHash** is of type **varbinary**.

NULL if the login isn't a valid  SQL Server 
 login.

**DaysUntilExpiration** is of type **int**.

- 0 if the login is expired or if it will expire on the day when queried.

- -1 if the local security policy in Windows never expires the password.

- NULL if the CHECK_POLICY or CHECK_EXPIRATION is OFF for a login, or if the operating system doesn't support the password policy.

**PasswordHashAlgorithm** is of type int.

- 0 if a SQL7.0 hash

- 1 if a SHA-1 hash

- 2 if a SHA-2 hash

- NULL if the login isn't a valid SQL Server login

## Remarks

This built-in function returns information about the password policy settings of a  SQL Server 
 login. The names of the properties aren't case sensitive, so property names such as **BadPasswordCount** and **badpasswordcount** are equivalent. The values of the **PasswordHash, PasswordHashAlgorithm**, and **PasswordLastSetTime** properties are available on all supported configurations of  SQL Server 
, but the other properties are only available when  SQL Server 
 is running on  Windows Server 2003 
 and both CHECK_POLICY and CHECK_EXPIRATION are enabled. For more information, see [Password Policy](../../relational-databases/security/password-policy.md).

## Permissions

Requires VIEW permission on the login. When requesting the password hash, also requires CONTROL SERVER permission.

## Examples

### A. Checking whether a login must change its password

The following example checks whether  SQL Server 
 login `John3` must change its password the next time it connects to an instance of  SQL Server 
.

```sql
SELECT LOGINPROPERTY('John3', 'IsMustChange');
GO
```

### B. Checking whether a login is locked out

The following example checks whether  SQL Server 
 login `John3` is locked.

```sql
SELECT LOGINPROPERTY('John3', 'IsLocked');
GO
```

## Related content

- [CREATE LOGIN (Transact-SQL)](../statements/create-login-transact-sql.md)
- [sys.server_principals (Transact-SQL)](../../relational-databases/system-catalog-views/sys-server-principals-transact-sql.md)
