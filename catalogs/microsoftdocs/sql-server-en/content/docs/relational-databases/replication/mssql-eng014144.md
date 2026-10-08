---
title: "MSSQL_ENG014144"
description: "MSSQL_ENG014144"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "MSSQL_ENG014144 error"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# MSSQL_ENG014144

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




    
## Message Details  
  
| Attribute | Value |
| --- | --- |
| Product Name | SQL Server |
| Event ID | 14144 |
| Event Source | MSSQLSERVER |
| Component | SQL Server Database Engine |
|  |
| Symbolic Name |  |
| Message Text | Cannot drop Subscriber '%s'. There are subscriptions for it in the publication database '%s'. |
  
## Explanation  
 A  SQL Server 
 instance that is configured as a Subscriber cannot be removed from the role of Subscriber while there are active subscriptions configured for the instance.  
  
## User Action  
 Drop all associated subscriptions before attempting to change the Subscriber status of the  SQL Server 
 instance:  
  
1.  Execute [sp_helpsubscription (Transact-SQL)](../system-stored-procedures/sp-helpsubscription-transact-sql.md) in the publication database at the Publisher to find subscriptions.  
  
2.  Execute [sp_dropsubscription (Transact-SQL)](../system-stored-procedures/sp-dropsubscription-transact-sql.md) in the publication database to drop subscriptions.  

## Related content

- [Errors and Events Reference (Replication)](errors-and-events-reference-replication.md)
- [Subscribe to Publications](subscribe-to-publications.md)
