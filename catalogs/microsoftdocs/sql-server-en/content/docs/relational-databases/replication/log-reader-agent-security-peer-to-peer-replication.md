---
title: "Log Reader Agent Security (SSMS)"
description: Describes the 'Log Reader Agent Security' page for a Transaction and Peer-to-peer Publication within SQL Server Management Studio (SSMS).
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: ui-reference
ms.custom:
  - updatefrequency5
f1_keywords:
  - "sql13.rep.p2pwizard.LRA.f1"
---
# Log Reader Agent Security (Peer-to-Peer Replication)
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  The **Log Reader Agent Security** page allows you to specify the accounts under which the Log Reader Agent at each peer runs and makes connections. For information on permissions required by agents and best practices for replication security, see [Replication Agent Security Model](security/replication-agent-security-model.md) and [Replication Security Best Practices](security/replication-security-best-practices.md).  
  
> **Note:**  
>  There is one Log Reader Agent for each database that is published using transactional replication. If the Log Reader Agent for a database has already been configured (either for a publication in a previous run of this wizard or for another transactional publication in the same database), you cannot change the credentials it uses in this wizard. If you specify new credentials, they are ignored. To change credentials, use the **Publication Properties** dialog box. For more information, see [View and Modify Replication Security Settings](security/view-and-modify-replication-security-settings.md).  
  
## Options  
 Click the properties button (**...**) in the row for each peer to access the **Log Reader Agent Security** dialog box. Click **Help** on the **Log Reader Agent Security** dialog box that is launched for more information on the permissions required for accounts used by the agents.  
  
 After settings have been entered in the dialog box, connection information for the Subscriber is displayed in the grid.  
  
 **Agents for Publisher**  
 The name of each peer server instance.  
  
 **Peer Database**  
 The database that serves as the publication database and subscription database at each peer.  
  
 **Connection to Distributor**  
 The context under which the connection to the Distributor is made. The local connection to the Distributor is always made using the context of the  Microsoft 
 Windows account under which the agent runs, so this field will always display **Impersonate '\<Domain>\\<Login\>'** or **Impersonate '\<Computer>\\<Login\>'**.  
  
 **Connection to Publisher**  
 The context under which the connection to the Publisher is made. The connection to the Publisher can be made using a  Microsoft 
  SQL Server 
 login or using the context of the Windows account under which the agent runs. The field displays one of the following: **Use login '\<Login>'**, **Impersonate '\<Domain>\\<Login\>'** or **Impersonate '\<Computer>\\<Login\>'**.  Microsoft 
 recommends that all connections be made using the context of the Windows account.  
  
## Related content

- [Administer a Peer-to-Peer Topology (Replication Transact-SQL Programming)](administration/administer-a-peer-to-peer-topology-replication-transact-sql-programming.md)
- [Peer-to-Peer - Transactional Replication](transactional/peer-to-peer-transactional-replication.md)
