---
title: "@@CONNECTIONS (Transact-SQL)"
description: "@@CONNECTIONS (Transact-SQL)"
author: markingmyname
ms.author: maghan
ms.date: "09/18/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "@@CONNECTIONS"
  - "@@CONNECTIONS_TSQL"
helpviewer_keywords:
  - "@@CONNECTIONS function"
  - "connections [SQL Server], number of"
  - "connections [SQL Server], attempted"
  - "number of connection attempts"
  - "attempted connections"
dev_langs:
  - "TSQL"
---
# @@CONNECTIONS (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





This function returns the number of attempted connections - both successful and unsuccessful - since  SQL Server 
 was last started.
  

  
## Syntax  
  
```syntaxsql
@@CONNECTIONS  
```  

## Return types
**integer**
  
## Remarks  
Connections are different from users. An application, for example, can open multiple connections to  SQL Server 
 without user observation of those connections.
  
Run **sp_monitor** for a report containing several  SQL Server 
 statistics, including count of connection attempts.
  
@@MAX_CONNECTIONS is the maximum allowed number of simultaneous connections to the server. @@CONNECTIONS increments with each login attempt; therefore, @@CONNECTIONS can exceed @@MAX_CONNECTIONS.
  
## Examples  
This example returns the count of login attempts as of the current date and time.
  
```sql
SELECT GETDATE() AS 'Today''s Date and Time',   
@@CONNECTIONS AS 'Login Attempts';  
```  
  
 Here's the result set. 

  
``` 
Today's Date and Time  Login Attempts  
---------------------- --------------  
12/5/2006 10:32:45 AM  211023         
```  
  
## Related content

- [System Statistical Functions (Transact-SQL)](system-statistical-functions-transact-sql.md)
- [sp_monitor (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-monitor-transact-sql.md)
