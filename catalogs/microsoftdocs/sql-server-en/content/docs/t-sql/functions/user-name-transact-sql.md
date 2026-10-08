---
title: "USER_NAME (Transact-SQL)"
description: "USER_NAME returns a database user name from a specified identification number, or the current user name."
author: VanMSFT
ms.author: vanto
ms.date: 10/30/2023
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "USER_NAME"
  - "USER_NAME_TSQL"
helpviewer_keywords:
  - "usernames [SQL Server]"
  - "IDs [SQL Server], databases"
  - "USER_NAME function"
  - "users [SQL Server], database username"
  - "names [SQL Server], database users"
  - "identification numbers [SQL Server], databases"
  - "database usernames [SQL Server]"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric || =fabric-sqldb"
---
# USER_NAME (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Returns a database user name from a specified identification number, or the current user name. 
  

  
## Syntax

```syntaxsql
USER_NAME ( [ ID ] )
```  

## Arguments

#### *ID*

The identification number associated with a database user, as listed in [sys.database_principals](../../relational-databases/system-catalog-views/sys-database-principals-transact-sql.md). *ID* is **int**. The parentheses are required.
  
## Return types

 **nvarchar(128)**  
  
## Remarks

When *ID* is omitted, the current user in the current context is assumed. If the parameter contains the word `NULL`, `USER_NAME` will return `NULL`. When `USER_NAME` is called without specifying an *ID* after an `EXECUTE AS` statement, `USER_NAME` returns the name of the impersonated user. If a Windows principal accesses the database by way of membership in a group, `USER_NAME` returns the name of the Windows principal instead of the group.  

 Although the `USER_NAME()` function is supported on Azure SQL Database, using `EXECUTE AS USER = USER_NAME(n)` is not supported on Azure SQL Database.

## Examples

  
### A. Use USER_NAME() to identify a user ID

The following example returns the user name for user ID `13`, as listed in [sys.database_principals](../../relational-databases/system-catalog-views/sys-database-principals-transact-sql.md).  
  
```sql  
SELECT USER_NAME(13);  
GO  
```  

### B. Use USER_NAME without an ID

 The following example finds the name of the current user without specifying an ID.  
  
```sql  
SELECT USER_NAME();  
GO  
```  
  
 Here is the result set for a user that is a member of the sysadmin fixed server role.  
  
```output
dbo  
```  
  
### C. Use USER_NAME in the WHERE clause

 The following example finds the row in `sys.database_principals`, in which the name is equal to the result of applying the system function `USER_NAME` to user identification number `1`.  
  
```sql  
SELECT name FROM sys.database_principals WHERE name = USER_NAME(1);  
GO  
```  
  
  Here's the result set. 
  
  
```output
name  
------------------------------  
dbo  
  
(1 row(s) affected)
```  
  
### D. Call USER_NAME during impersonation with EXECUTE AS

The following example shows how `USER_NAME` behaves during impersonation.

`EXECUTE AS` is not currently supported on Microsoft Fabric.

 > **Caution:**
 > When testing with `EXECUTE AS`, always script a `REVERT` to follow.
  
```sql  
SELECT USER_NAME();  
GO  
EXECUTE AS USER = 'Zelig';  
GO  
SELECT USER_NAME();  
GO  
REVERT;  
GO  
SELECT USER_NAME();  
GO  
```  
  
  Here's the result set. 
  
  
```output
-------------
dbo  

-------------
Zelig  

-------------
dbo  
```  
  
## Examples:  Azure Synapse Analytics 
  
### E. Use USER_NAME without an ID

 The following example finds the name of the current user without specifying an ID.  
  
```sql  
SELECT USER_NAME();  
```  
  
 Here is the result set for a currently logged-in user.  
  
```output
User7                              
```  
  
### F. Use USER_NAME in the WHERE clause

 The following example finds the row in `sysusers` in which the name is equal to the result of applying the system function `USER_NAME` to user identification number `1`.  
  
```sql  
SELECT name FROM sysusers WHERE name = USER_NAME(1);  
```  
  
  Here's the result set. 
  
  
```output
name                             
------------------------------   
User7                              
```  

## Related content

- [SUSER_NAME (Transact-SQL)](suser-name-transact-sql.md)
- [SUSER_SNAME (Transact-SQL)](suser-sname-transact-sql.md)
- [ALTER TABLE (Transact-SQL)](../statements/alter-table-transact-sql.md)
- [CREATE TABLE (Transact-SQL)](../statements/create-table-transact-sql.md)
- [CURRENT_TIMESTAMP (Transact-SQL)](current-timestamp-transact-sql.md)
- [CURRENT_USER (Transact-SQL)](current-user-transact-sql.md)
- [SESSION_USER (Transact-SQL)](session-user-transact-sql.md)
- [System Functions by category for Transact-SQL](../../relational-databases/system-functions/system-functions-category-transact-sql.md)
- [SYSTEM_USER (Transact-SQL)](system-user-transact-sql.md)
- [sys.database_principals (Transact-SQL)](../../relational-databases/system-catalog-views/sys-database-principals-transact-sql.md)
