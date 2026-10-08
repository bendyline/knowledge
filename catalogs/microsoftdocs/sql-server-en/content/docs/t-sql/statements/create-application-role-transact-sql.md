---
title: "CREATE APPLICATION ROLE (Transact-SQL)"
description: CREATE APPLICATION ROLE (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 11/18/2025
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "APPLICATION_ROLE_TSQL"
  - "CREATE APPLICATION ROLE"
  - "sql13.swb.applicationrole.permissions.f1"
  - "APPLICATION"
  - "APPLICATION ROLE"
  - "CREATE_APPLICATION_ROLE_TSQL"
  - "APPLICATION_TSQL"
helpviewer_keywords:
  - "CREATE APPLICATION ROLE statement"
  - "application roles [SQL Server], creating"
dev_langs:
  - TSQL
---
# CREATE APPLICATION ROLE (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 





Adds an application role to the current database.



## Syntax

```syntaxsql
CREATE APPLICATION ROLE application_role_name
    WITH PASSWORD = 'password' [ , DEFAULT_SCHEMA = schema_name ]
```

## Arguments

#### *application_role_name*

Specifies the name of the application role. This name must not already be used to refer to any principal in the database.

#### PASSWORD = '*password*'

Specifies the password that database users will use to activate the application role. You should always use strong passwords. `password` must meet the Windows password policy requirements of the computer that is running the instance of  SQL Server 
.

#### DEFAULT_SCHEMA = *schema_name*

Specifies the first schema that will be searched by the server when it resolves the names of objects for this role. If DEFAULT_SCHEMA is left undefined, the application role will use `dbo` as its default schema. *schema_name* can be a schema that doesn't exist in the database.

## Remarks

> **Important:**  
> Password complexity is checked when application role passwords are set. Applications that invoke application roles must store their passwords. Application role passwords should always be stored encrypted.

Application roles are visible in the [sys.database_principals](../../relational-databases/system-catalog-views/sys-database-principals-transact-sql.md) catalog view.

For information about how to use application roles, see [Application Roles](../../relational-databases/security/authentication-access/application-roles.md).

> **Note:**  
> Schemas aren't equivalent to database users. Use [System catalog views](../../relational-databases/system-catalog-views/catalog-views-transact-sql.md) to identify any differences between database users and schemas.



Beginning with  SQL Server 2012 (11.x) 
, SQL Server and Azure SQL Database used a SHA-512 hash combined with a 32-bit random and unique salt. This method made it statistically infeasible for attackers to deduce passwords.

 SQL Server 2025 (17.x) 
 introduces an iterated hash algorithm, RFC2898, also known as a *password-based key derivation function* (PBKDF). This algorithm still uses SHA-512 but hashes the password multiple times (100,000 iterations), significantly slowing down brute-force attacks. This change enhances password protection in response to evolving security threats and helps customers comply with NIST SP 800-63b guidelines. This security enhancement uses a stronger hashing algorithm, which can slightly increase login time for SQL Authentication logins. The impact is generally lower in environments with connection pooling, but might be more noticeable in scenarios without pooling or where login latency is closely monitored.


## Permissions

Requires ALTER ANY APPLICATION ROLE permission on the database.

## Examples

The following example creates an application role called `weekly_receipts` that has the password `987Gbv876sPYY5m23` and `Sales` as its default schema.

```sql
CREATE APPLICATION ROLE weekly_receipts
    WITH PASSWORD = '987G^bv876sPY)Y5m23'
    , DEFAULT_SCHEMA = Sales;
GO
```

## Related content

- [Application Roles](../../relational-databases/security/authentication-access/application-roles.md)
- [sys.sp_setapprole (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-setapprole-transact-sql.md)
- [ALTER APPLICATION ROLE (Transact-SQL)](alter-application-role-transact-sql.md)
- [DROP APPLICATION ROLE (Transact-SQL)](drop-application-role-transact-sql.md)
- [Password policy](../../relational-databases/security/password-policy.md)
- [EVENTDATA (Transact-SQL)](../functions/eventdata-transact-sql.md)
