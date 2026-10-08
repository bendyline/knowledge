---
title: "PWDCOMPARE (Transact-SQL)"
description: "PWDCOMPARE (Transact-SQL)"
author: VanMSFT
ms.author: vanto
ms.date: "11/21/2024"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "PWDCOMPARE"
  - "PWDCOMPARE_TSQL"
helpviewer_keywords:
  - "sa account"
  - "passwords [SQL Server], blank"
  - "PWDCOMPARE function [Transact-SQL]"
dev_langs:
  - "TSQL"
---
# PWDCOMPARE (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Hashes a password and compares the hash to the hash of an existing password. PWDCOMPARE can be used to search for blank  SQL Server 
 login passwords or common weak passwords.  
  
 
  
## Syntax  
  
```syntaxsql
PWDCOMPARE ( 'clear_text_password'  
   , password_hash   
   [ , version ] )  
```  
  
## Arguments
 **'** *clear_text_password* **'**  
 Is the unencrypted password. *clear_text_password* is **sysname** (**nvarchar(128)**).  
  
 *password_hash*  
 Is the encryption hash of a password. *password_hash* is **varbinary(128)**.  
  
 *version*  
 Obsolete parameter that can be set to 1 if *password_hash* represents a value from a login earlier than  SQL Server 2000 (8.x) 
 that was migrated to  SQL Server 2005 (9.x) 
 or later but never converted to the  SQL Server 2000 (8.x) 
 system. *version* is **int**.  
  
> **Caution:**  
>  This parameter is provided for backward compatibility, but is ignored because password hash blobs now contain their own version descriptions. This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.   
  
## Return Types  
 **int**  
  
 Returns 1 if the hash of the *clear_text_password* matches the *password_hash* parameter, and 0 if it does not.  
  
## Remarks  
 The PWDCOMPARE function is not a threat against the strength of password hashes because the same test could be performed by trying to log in using the password provided as the first parameter.  
  
 **PWDCOMPARE** cannot be used with the passwords of contained database users. There is no contained database equivalent.  
  
## Permissions  
 PWDENCRYPT is available to public.  

To examine the *password_hash* column of **sys.sql_logins**:
- For  SQL Server 2019 (15.x) 
 and earlier versions, the **CONTROL SERVER** permission is required.
- For  SQL Server 2022 (16.x) 
 and later versions, the **VIEW ANY CRYPTOGRAPHICALLY SECURED DEFINITION** permission is required.  
  
## Examples  
  
### A. Identifying logins that have no passwords  
 The following example identifies  SQL Server 
 logins that have no passwords.  
  
```sql  
SELECT name FROM sys.sql_logins   
WHERE PWDCOMPARE('', password_hash) = 1 ;  
```  
  
### B. Searching for common passwords  
 To search for common passwords that you want to identify and change, specify the password as the first parameter. For example, execute the following statement to search for a password specified as `password`.  
  
```sql  
SELECT name FROM sys.sql_logins   
WHERE PWDCOMPARE('password', password_hash) = 1 ;  
```  
  
## Related content

- [PWDENCRYPT (Transact-SQL)](pwdencrypt-transact-sql.md)
- [Security Functions (Transact-SQL)](security-functions-transact-sql.md)
- [sys.sql_logins (Transact-SQL)](../../relational-databases/system-catalog-views/sys-sql-logins-transact-sql.md)
