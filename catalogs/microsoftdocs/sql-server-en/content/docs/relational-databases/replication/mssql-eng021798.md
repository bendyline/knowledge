---
title: "MSSQL_ENG021798"
description: "MSSQL_ENG021798"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "MSSQL_ENG021798 error"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# MSSQL_ENG021798

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




    
## Message Details  
  
| Attribute | Value |
| --- | --- |
| Product Name | SQL Server |
| Event ID | 21798 |
| Event Source | MSSQLSERVER |
| Component | SQL Server Database Engine |
|  |
| Symbolic Name |  |
| Message Text | The '%s' agent job must be added through '%s' before continuing. Please see the documentation for '%s'. |
  
## Explanation  
 To create a publication, you must be a member of the **sysadmin** fixed server role on the Publisher or a member of the **db_owner** fixed database role in the publication database. If you are a member of the **db_owner** role, this error is raised if:  
  
-   You run scripts from  SQL Server 2000 (8.x) 
. The security model changed in  SQL Server 2005 (9.x) 
, and these scripts must be updated.  
  
-   The stored procedure **sp_addpublication** is executed before executing [sp_addlogreader_agent (Transact-SQL)](../system-stored-procedures/sp-addlogreader-agent-transact-sql.md). This applies to all transactional publications.  
  
-   The stored procedure **sp_addpublication** is executed before executing [sp_addqreader_agent (Transact-SQL)](../system-stored-procedures/sp-addqreader-agent-transact-sql.md). This applies to transactional publications that are enabled for queued updating subscriptions (a value of TRUE for the `@allow_queued_tran` parameter of **sp_addpublication**).  
  
 The stored procedures **sp_addlogreader_agent** and **sp_addqreader_agent** each create an agent job and allow you to specify the  Microsoft 
 Windows account under which the agent runs. For users in the **sysadmin** role, agent jobs are created implicitly if **sp_addlogreader_agent** and **sp_addqreader_agent** are not executed; agents run under the context of the  SQL Server 
 Agent service account at the Distributor. Although **sp_addlogreader_agent** and **sp_addqreader_agent** are not required for users in the **sysadmin** role, it is a security best practice to specify a separate account for the agents. For more information, see [Replication Agent Security Model](security/replication-agent-security-model.md).  
  
## User Action  
 Ensure you execute procedures in the correct order. For more information, see [Create a Publication](publish/create-a-publication.md). If you have replication scripts from previous versions of  SQL Server 
, update these scripts to include the stored procedures and parameters required by  SQL Server 2005 (9.x) 
 and later versions. For more information, see [Upgrade Replication Scripts (Replication Transact-SQL Programming)](administration/upgrade-replication-scripts-replication-transact-sql-programming.md).  
  
## Related content

- [Errors and Events Reference (Replication)](errors-and-events-reference-replication.md)
