---
title: "SUSER_ID (Transact-SQL)"
description: "SUSER_ID (Transact-SQL)"
author: VanMSFT
ms.author: vanto
ms.date: "09/07/2018"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "SUSER_ID_TSQL"
  - "SUSER_ID"
helpviewer_keywords:
  - "users [SQL Server], IDs"
  - "logins [SQL Server], IDs"
  - "SUSER_ID function"
  - "IDs [SQL Server], logins"
  - "identification numbers [SQL Server], logins"
  - "user IDs [SQL Server]"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017 || >=sql-server-linux-2017"
---
# SUSER_ID (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  Returns the login identification number of the user.  
  
> **Note:**  
>  Starting with  SQL Server 2005 (9.x) 
, SUSER_ID returns the value listed as **principal_id** in the **sys.server_principals** catalog view.  
  
 
  
## Syntax  
  
```syntaxsql
SUSER_ID ( [ 'login' ] )   
```  
  
## Arguments
 **'** *login* **'**  
 Is the login name of the user. *login* is **nchar**. If *login* is specified as **char**, *login* is implicitly converted to **nchar**. *login* can be any  SQL Server 
 login or Windows user or group that has permission to connect to an instance of  SQL Server 
. If *login* is not specified, the login identification number for the current user is returned. If the parameter contains the word NULL will return NULL.  
  
## Return Types  
 **int**  
  
## Remarks  
 SUSER_ID returns an identification number only for logins that have been explicitly provisioned inside  SQL Server 
. This ID is used within  SQL Server 
 to track ownership and permissions. This ID is not equivalent to the SID of the login that is returned by SUSER_SID. If *login* is a SQL Server login, the SID maps to a GUID. If *login* is a Windows login or Windows group, the SID maps to a Windows security identifier.  
  
 SUSER_SID returns a SUID only for a login that has an entry in the **syslogins** system table.  
  
 System functions can be used in the select list, in the WHERE clause, and anywhere an expression is allowed, and must always be followed by parentheses, even if no parameter is specified.  
  
## Examples  
 The following example returns the login identification number for the `sa` login.  
  
```sql
SELECT SUSER_ID('sa');  
```  
  
## Related content

- [sys.server_principals (Transact-SQL)](../../relational-databases/system-catalog-views/sys-server-principals-transact-sql.md)
- [SUSER_SID (Transact-SQL)](suser-sid-transact-sql.md)
- [System Functions by category for Transact-SQL](../../relational-databases/system-functions/system-functions-category-transact-sql.md)
