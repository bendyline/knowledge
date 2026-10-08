---
title: "SESSION_ID (Transact-SQL)"
description: "SESSION_ID (Transact-SQL)"
author: VanMSFT
ms.author: vanto
ms.date: "02/23/2018"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest"
---
# SESSION_ID (Transact-SQL)

**Applies to:**
 


 


  Returns the ID of the current  Azure Synapse Analytics  session.  
  
 
  
## Syntax  
  
```syntaxsql  
-- Azure Synapse Analytics
SESSION_ID ( )  
```  
  
## Return Value  
 Returns an **nvarchar(32)** value.  
  
## General Remarks  
 The session ID is assigned to each user connection when the connection is made. It persists for the duration of the connection. When the connection ends, the session ID is released.  
  
 The session ID begins with the alphabetical characters 'SID'. These are case-sensitive and must be capitalized when session ID is used in  SQL 
 commands.  
  
 You can query the view [sys.dm_pdw_exec_sessions](../../relational-databases/system-dynamic-management-objects/sys-dm-pdw-exec-sessions-transact-sql.md) to retrieve the same information as this function.  
  
## Examples  
 The following example returns the current session ID.  
  
```sql  
SELECT SESSION_ID();  
```  
  
## Related content

- [DB_NAME (Transact-SQL)](db-name-transact-sql.md)
- [@@VERSION (Transact-SQL)](version-transact-sql-configuration-functions.md)
