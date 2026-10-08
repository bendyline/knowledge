---
title: "@@REMSERVER (Transact-SQL)"
description: "@@REMSERVER (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "09/18/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "@@REMSERVER"
  - "@@REMSERVER_TSQL"
helpviewer_keywords:
  - "logins [SQL Server], remote servers"
  - "remote servers [SQL Server], logins"
  - "@@REMSERVER function"
dev_langs:
  - "TSQL"
---
# @@REMSERVER (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 






    
> **Important:**  
>  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  This function exists for backward compatibility and always returns NULL. Use linked servers and linked server stored procedures instead.  
  
 Returns the name of the remote  SQL Server 
 database server as it appears in the login record.  
  
 
  
## Syntax  
  
```syntaxsql  
@@REMSERVER  
```  

## Return Types
 **nvarchar(128)**  
  
## Remarks  
 @@REMSERVER enables a stored procedure to check the name of the database server from which the procedure is run.  
  
## Examples  
 The following example creates the procedure `usp_CheckServer` that returns the name of the remote server.  
  
```sql  
CREATE PROCEDURE usp_CheckServer  
AS  
SELECT @@REMSERVER;  
```  
  
 The following stored procedure is created on the local server `SEATTLE1`. The user logs on to a remote server, `LONDON2`, and runs `usp_CheckServer`.  
  
```sql  
EXEC SEATTLE1...usp_CheckServer;  
```  
  
  Here's the result set. 
  
  
```  
---------------  
LONDON2  
```  
  
## Related content

- [Remote servers](../../database-engine/configure-windows/remote-servers.md)
