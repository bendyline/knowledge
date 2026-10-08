---
title: "@@SPID (Transact-SQL)"
description: "@@SPID (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "09/18/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
ms.custom:
  - ignite-2025
f1_keywords:
  - "@@SPID"
  - "@@SPID_TSQL"
helpviewer_keywords:
  - "@@SPID function"
  - "session_id"
  - "server process IDs [SQL Server]"
  - "IDs [SQL Server], user processes"
  - "SPID"
  - "session IDs [SQL Server]"
  - "process ID of current user process"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# @@SPID (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns the session ID of the current user process.  
  
 
  
## Syntax  
  
```syntaxsql
@@SPID  
```  
  
## Return Types
 **smallint**  
  
## Remarks  
 @@SPID can be used to identify the current user process in the output of **sp_who**.  
  
## Examples  
 This example returns the session ID, login name, and user name for the current user process.  
  
```sql  
SELECT @@SPID AS 'ID', SYSTEM_USER AS 'Login Name', USER AS 'User Name';  
```  
  
  Here's the result set. 
  
  
```  
ID     Login Name                     User Name                       
------ ------------------------------ ------------------------------  
54     SEATTLE\joanna                 dbo                             
```  
  
## Examples:  Azure Synapse Analytics 
 This example returns the  Azure Synapse Analytics  session ID, the  SQL Server 
 Control node session ID, login name, and user name for the current user process.  
  
```sql  
SELECT SESSION_ID() AS ID, @@SPID AS 'Control ID', SYSTEM_USER AS 'Login Name', USER AS 'User Name';  
```  
  
## Related content

- [sys.sp_lock (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-lock-transact-sql.md)
- [sys.sp_who (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-who-transact-sql.md)
