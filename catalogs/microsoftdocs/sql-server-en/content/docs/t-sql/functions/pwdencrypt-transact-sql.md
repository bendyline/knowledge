---
title: "PWDENCRYPT (Transact-SQL)"
description: "PWDENCRYPT (Transact-SQL)"
author: VanMSFT
ms.author: vanto
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "PWDENCRYPT"
  - "PWDENCRYPT_TSQL"
helpviewer_keywords:
  - "PWDENCRYPT function [Transact-SQL]"
dev_langs:
  - "TSQL"
---
# PWDENCRYPT (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns the  SQL Server 
 password hash of the input value that uses the current version of the password hashing algorithm.  
  
 PWDENCRYPT is an older function and might not be supported in a future release of  SQL Server 
. Use [HASHBYTES](hashbytes-transact-sql.md) instead. HASHBYTES provides more hashing algorithms.  
  
 
  
## Syntax  
  
```syntaxsql
PWDENCRYPT ( 'password' )  
```  
  
## Arguments
 *password*  
 Is the password to be encrypted. *password* is **sysname**.  
  
## Return Types  
 **varbinary(128)**  
  
## Permissions  
 PWDENCRYPT is available to public.  
  
## Related content

- [Security Functions (Transact-SQL)](security-functions-transact-sql.md)
- [PWDCOMPARE (Transact-SQL)](pwdcompare-transact-sql.md)
