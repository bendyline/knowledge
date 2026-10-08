---
title: "Snapshot Agent Security"
description: "Snapshot Agent Security"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: ui-reference
ms.custom:
  - updatefrequency5
f1_keywords:
  - "sql13.rep.security.SSA.f1"
helpviewer_keywords:
  - "Snapshot Agent Security dialog box"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# Snapshot Agent Security

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




  The **Snapshot Agent Security** dialog box allows you to specify:  
  
-   The  Microsoft 
 Windows account under which the Snapshot Agent runs at the Distributor. The Windows account is also referred to as the *process account*, because the agent process runs under this account.  
  
-   The context under which the Snapshot Agent makes connections to the  Microsoft 
  SQL Server 
 Publisher. The connection can be made by impersonating the Windows account or under the context of a  SQL Server 
 account you specify.  
  
    > **Note:**  
    >  The Snapshot Agent makes connections to the Publisher even if the Publisher and Distributor are on the same computer. The Snapshot Agent also makes connections to the Distributor; these connections are always made by impersonating the Windows account under which the agent runs.  
  
     For Oracle Publishers, specify the context under which the Snapshot Agent connects to the Publisher in the **Publisher Properties** dialog box (available from the **Distributor Properties** dialog box). For more information, see [View and Modify Replication Security Settings](security/view-and-modify-replication-security-settings.md).  
  
 All accounts must be valid, with the correct password specified for each account. Accounts and passwords are not validated until an agent runs.  
  
## Options  
 **Process account**  
 Enter a Windows account under which the Snapshot Agent runs at the Distributor. The Windows account you specify must:  
  
-   At minimum be a member of the **db_owner** fixed database role in the distribution database.  
  
-   Have write permissions on the snapshot share.  
  
 **Password** and **Confirm password**  
 Enter the password for the Windows account.  
  
 **Connect to the Publisher**  
 Select whether the Snapshot Agent should make connections to the Publisher by impersonating the account specified in the **Process account** text box or by using a  SQL Server 
 account. If you select to use a  SQL Server 
 account, enter a  SQL Server 
 login and password.  
  
> **Note:**  
>  It is recommended that you select to impersonate the Windows account rather than using a  SQL Server 
 account.  
  
 The Windows account or  SQL Server 
 account used for the connection must at minimum be a member of the **db_owner** fixed database role in the publication database.  
  
## Related content

- [Identity and Access Control (Replication)](security/identity-and-access-control-replication.md)
- [Replication Agent Security Model](security/replication-agent-security-model.md)
- [Replication Agents Overview](agents/replication-agents-overview.md)
- [Replication Security Best Practices](security/replication-security-best-practices.md)
