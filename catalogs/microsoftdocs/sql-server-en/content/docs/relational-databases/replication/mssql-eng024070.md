---
title: "MSSQL_ENG024070"
description: "MSSQL_ENG024070"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "MSSQL_ENG024070 error"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# MSSQL_ENG024070

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




    
## Message Details  
  
| Attribute | Value |
| --- | --- |
| Product Name | SQL Server |
| Event ID | 24070 |
| Event Source | MSSQLSERVER |
| Component | SQL Server Database Engine |
|  |
| Symbolic Name |  |
| Message Text | A required privilege is not held by the client. |
  
## Explanation  
 This is a general error that can be raised regardless of whether replication is being used. For a server in a replication topology, the error is typically raised because the  SQL Server 
 Agent service account is changed by using the  Microsoft 
 Windows Service Control Manager instead of  SQL Server 
 Configuration Manager. When you try to run an agent job after changing the service account, the job might fail with an error message that is similar to the following:  
  
 `Executed as user: \<UserAccount>. Replication-Replication Snapshot Subsystem: agent \<AgentName> failed. Executed as user: \<UserAccount>. A required privilege is not held by the client. The step failed. [SQLSTATE 42000] (Error 14151). The step failed.`  
  
 This problem occurs because the Windows Service Control Manager cannot grant the required permissions to the new service account for  SQL Server 
 Agent.  
  
## User Action  
 To avoid this problem in the future, always use  SQL Server 
 Configuration Manager instead of the Windows Service Control Manager to change service accounts and passwords.  
  
 To resolve this problem, use  SQL Server 
 Configuration Manager to change the service account back to the original account. Then, use  SQL Server 
 Configuration Manager to change to the new account. When you do this,  SQL Server 
 Configuration Manager adds the new account to the following security group:  
  
 SQLServer2008SQLAgentUser$ComputerName$InstanceName  
  
 Being a member of this security group grants to the new account the required permissions to run the replication agent job.  
  
## Related content

- [Errors and Events Reference (Replication)](errors-and-events-reference-replication.md)
- [Identity and Access Control (Replication)](security/identity-and-access-control-replication.md)
- [SQL Server Configuration Manager](../../tools/configuration-manager/sql-server-configuration-manager.md)
