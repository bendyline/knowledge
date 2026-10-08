---
title: "ALTER APPLICATION ROLE (Transact-SQL)"
description: ALTER APPLICATION ROLE (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: 04/29/2025
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "ALTER_APPLICATION_ROLE_TSQL"
  - "ALTER APPLICATION ROLE"
helpviewer_keywords:
  - "modifying application roles"
  - "passwords [SQL Server], application roles"
  - "ALTER APPLICATION ROLE statement"
  - "application roles [SQL Server], modifying"
dev_langs:
  - "TSQL"
ms.custom:
  - build-2025
---

# ALTER APPLICATION ROLE (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 





  Changes the name, password, or default schema of an application role.



## Syntax

```syntaxsql
ALTER APPLICATION ROLE application_role_name
    WITH <set_item> [ , ...n ]

<set_item> ::=
    NAME = new_application_role_name
    | PASSWORD = 'password'
    | DEFAULT_SCHEMA = schema_name
```

## Arguments

#### *application_role_name*

The name of the application role to be modified.

#### NAME = *new_application_role_name*

Specifies the new name of the application role. This name must not already be used to refer to any principal in the database.

#### PASSWORD = '*password*'

Specifies the password for the application role. `password` must meet the Windows password policy requirements of the computer that is running the instance of  SQL Server 
. You should always use strong passwords.

#### DEFAULT_SCHEMA = *schema_name*

Specifies the first schema that will be searched by the server when it resolves the names of objects. *schema_name* can be a schema that doesn't exist in the database.

## Remarks

If the new application role name already exists in the database, the statement fails. When the name, password, or default schema of an application role is changed the ID associated with the role isn't changed.

> **Important:**  
> Password expiration policy isn't applied to application role passwords. For this reason, take extra care in selecting strong passwords. Applications that invoke application roles must store their passwords.

Application roles are visible in the `sys.database_principals` catalog view.

> **Note:**  
> Schemas aren't equivalent to database users. Use [System catalog views](../../relational-databases/system-catalog-views/catalog-views-transact-sql.md) to identify any differences between database users and schemas.



Beginning with  SQL Server 2012 (11.x) 
, SQL Server and Azure SQL Database used a SHA-512 hash combined with a 32-bit random and unique salt. This method made it statistically infeasible for attackers to deduce passwords.

 SQL Server 2025 (17.x) 
 introduces an iterated hash algorithm, RFC2898, also known as a *password-based key derivation function* (PBKDF). This algorithm still uses SHA-512 but hashes the password multiple times (100,000 iterations), significantly slowing down brute-force attacks. This change enhances password protection in response to evolving security threats and helps customers comply with NIST SP 800-63b guidelines. This security enhancement uses a stronger hashing algorithm, which can slightly increase login time for SQL Authentication logins. The impact is generally lower in environments with connection pooling, but might be more noticeable in scenarios without pooling or where login latency is closely monitored.


## Permissions

Requires ALTER ANY APPLICATION ROLE permission on the database. To change the default schema, the user also needs ALTER permission on the application role. An application role can alter its own default schema, but not its name or password.

## Examples

### A. Changing the name of application role

The following example changes the name of the application role `weekly_receipts` to `receipts_ledger`.

```sql
USE AdventureWorks2022;
CREATE APPLICATION ROLE weekly_receipts
    WITH PASSWORD = '987Gbv8$76sPYY5m23' ,
    DEFAULT_SCHEMA = Sales;
GO
ALTER APPLICATION ROLE weekly_receipts
    WITH NAME = receipts_ledger;
GO
```

### B. Changing the password of application role

The following example changes the password of the application role `receipts_ledger`.

```sql
ALTER APPLICATION ROLE receipts_ledger
    WITH PASSWORD = '897yUUbv867y$200nk2i';
GO
```

### C. Changing the name, password, and default schema

The following example changes the name, password, and default schema of the application role `receipts_ledger` all at the same time.

```sql
ALTER APPLICATION ROLE receipts_ledger
    WITH NAME = weekly_ledger,
    PASSWORD = '897yUUbv77bsrEE00nk2i',
    DEFAULT_SCHEMA = Production;
GO
```

## Related content

- [Application Roles](../../relational-databases/security/authentication-access/application-roles.md)
- [CREATE APPLICATION ROLE (Transact-SQL)](create-application-role-transact-sql.md)
- [DROP APPLICATION ROLE (Transact-SQL)](drop-application-role-transact-sql.md)
- [EVENTDATA (Transact-SQL)](../functions/eventdata-transact-sql.md)
