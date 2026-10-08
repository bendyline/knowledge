---
title: "MSSQL_ENG004929"
description: "MSSQL_ENG004929"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "MSSQL_ENG004929 error"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# MSSQL_ENG004929

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




    
## Message Details  
  
| Attribute | Value |
| --- | --- |
| Product Name | SQL Server |
| Event ID | 4929 |
| Event Source | MSSQLSERVER |
| Component | SQL Server Database Engine |
|  |
| Symbolic Name |  |
| Message Text | Cannot alter the %S_MSG '%.*ls' because it is being published for replication. |
  
## Explanation  
 This error typically occurs if you attempt to drop the primary key constraint on a table that is published for transactional replication. Transactional replication requires a primary key for each published table; therefore the constraint cannot be dropped.  
  
## User Action  
 To drop the constraint, first drop the article associated with the table. For more information, see [Add Articles to and Drop Articles from Existing Publications](publish/add-articles-to-and-drop-articles-from-existing-publications.md). If this error occurs in a database that is not replicated, execute [sp_removedbreplication (Transact-SQL)](../system-stored-procedures/sp-removedbreplication-transact-sql.md) to ensure objects in the database are not marked as replicated.  
  
## Related content

- [Errors and Events Reference (Replication)](errors-and-events-reference-replication.md)
