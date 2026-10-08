---
title: "@@MAX_CONNECTIONS (Transact-SQL)"
description: "@@MAX_CONNECTIONS (Transact-SQL)"
author: markingmyname
ms.author: maghan
ms.date: "09/18/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "@@MAX_CONNECTIONS"
  - "@@MAX_CONNECTIONS_TSQL"
helpviewer_keywords:
  - "simultaneous connections [SQL Server]"
  - "maximum number of simultaneous user connections"
  - "@@MAX_CONNECTIONS function"
  - "connections [SQL Server], simultaneous"
  - "number of simultaneous user connections"
dev_langs:
  - "TSQL"
---
# @@MAX_CONNECTIONS (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  Returns the maximum number of simultaneous user connections allowed on an instance of  SQL Server 
. The number returned is not necessarily the number currently configured.  
  
 
  
## Syntax  
  
```syntaxsql  
@@MAX_CONNECTIONS  
```  
  
## Return Types
 **integer**  
  
## Remarks  
 The actual number of user connections allowed also depends on the version of  SQL Server 
 that is installed and the limitations of your applications and hardware.  
  
 To reconfigure  SQL Server 
 for fewer connections, use **sp_configure**.  
  
## Examples  
 The following example shows returning the maximum number of user connections on an instance of  SQL Server 
. The example assumes that  SQL Server 
 has not been reconfigured for fewer user connections.  
  
```sql 
SELECT @@MAX_CONNECTIONS AS 'Max Connections';  
```  
  
  Here's the result set. 
  
  
```  
Max Connections  
---------------  
32767            
```  
  
## Related content

- [sys.sp_configure (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-configure-transact-sql.md)
- [Server configuration: user connections](../../database-engine/configure-windows/configure-the-user-connections-server-configuration-option.md)
