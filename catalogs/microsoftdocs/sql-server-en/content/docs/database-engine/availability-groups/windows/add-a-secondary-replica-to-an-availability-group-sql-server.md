---
title: "Add a secondary replica to an availability group"
description: "Learn how to add a secondary replica to an Always On availability group using either Transact-SQL (T-SQL), PowerShell, or the Availability Group Wizard in SQL Server Management Studio (SSMS)."
author: MashaMSFT
ms.author: mathoma
ms.date: "05/18/2016"
ms.service: sql
ms.subservice: availability-groups
ms.topic: how-to
helpviewer_keywords:
  - "Availability Groups [SQL Server], availability replicas"
  - "Availability Groups [SQL Server], configuring"
---
# Add a secondary replica to an Always On Availability Group

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  This topic describes how to add a secondary replica to an existing Always On availability group by using  SQL Server Management Studio 
,  Transact-SQL , or PowerShell in  SQL Server 
.  

  
##  <a name="PrerequisitesRestrictions"></a> Prerequisites and Restrictions  
  
-   You must be connected to the server instance that hosts the primary replica.  
  
 For more information, see [Prerequisites, Restrictions, and Recommendations for Always On Availability Groups (SQL Server)](prereqs-restrictions-recommendations-always-on-availability.md).  

<a id="Security"></a>
<a id="Permissions"></a>

## Permissions

Requires ALTER AVAILABILITY GROUP permission on the availability group, CONTROL AVAILABILITY GROUP permission, ALTER ANY AVAILABILITY GROUP permission, or CONTROL SERVER permission.  



> _We are listening:_ If you find something outdated or incorrect in this article, such as a step or a code example, please tell us. You can click the **This page** button in the **Feedback** section at the bottom of this page. We read every item of feedback about SQL, typically the next day. Thanks.

<!--  The text about Edit-pencil maybe makes the paragraph uncomfortably long?
_We are listening:_ If you find something outdated or incorrect in this article, such as a step or a code example, please tell us. You can click the **This page** button in the **Feedback** section at the bottom of this page. Or better, if you know the fix, you can click the **Edit-pencil** icon at the top of this page, and then click the pencil icon on the GitHub page. We read every item of feedback about SQL, typically the next day. Thank you.
-->


##  <a name="SSMSProcedure"></a> Using SQL Server Management Studio  
 **To add a replica**  
  
1.  In Object Explorer, connect to the server instance that hosts the primary replica, and expand the server tree.  
  
2.  Expand the **Always On High Availability** node and the **Availability Groups** node.  
  
3.  Right-click the availability group, and select one of the following commands:  
  
    -   Select the **Add Replica** command to launch the Add Replica to Availability Group Wizard. For more information, see [Use the Add Replica to Availability Group Wizard (SQL Server Management Studio)](use-the-add-replica-to-availability-group-wizard-sql-server-management-studio.md).  
  
    -   Alternatively, select the **Properties** command to open the **Availability Group Properties** dialog box. The steps for adding a replica in this dialog box are as follows:  
  
        1.  In the **Availability Replicas** pane of the dialog box, click the **Add** button. This creates and selects a replica entry in which the blank Server Instance field is selected.  
  
        2.  Enter the name of a server instance that meets the prerequisites for hosting an availability replica.  
  
         To add an additional replicas, repeat the preceding steps. When you are done specifying replicas, click **OK** to complete the operation.  
  
##  <a name="TsqlProcedure"></a> Using Transact-SQL  
 **To add a replica**  
  
1.  Connect to the instance of  SQL Server 
 that hosts the primary replica.  
  
2.  Add the new secondary replica to the availability group by using the ADD REPLICA ON clause of the ALTER AVAILABILITY GROUP statement. The ENDPOINT_URL, AVAILABILITY_MODE, and FAILOVER_MODE options are required in an ADD REPLICA ON clause. The other replica options- BACKUP_PRIORITY, SECONDARY_ROLE, PRIMARY_ROLE, and SESSION_TIMEOUT-are optional. For more information, see [ALTER AVAILABILITY GROUP &#40;Transact-SQL&#41;](../../../t-sql/statements/alter-availability-group-transact-sql.md).  
  
     For example, the following  Transact-SQL  statement creates a new replica to an availability group named `MyAG` on the default server instance hosted by `COMPUTER04`, whose endpoint URL is `TCP://COMPUTER04.Adventure-Works.com:5022'`. This replica supports manual failover and asynchronous-commit availability mode.  
  
    ```  
    ALTER AVAILABILITY GROUP MyAG ADD REPLICA ON 'COMPUTER04'   
       WITH (  
             ENDPOINT_URL = 'TCP://COMPUTER04.Adventure-Works.com:5022',  
             AVAILABILITY_MODE = ASYNCHRONOUS_COMMIT,  
             FAILOVER_MODE = MANUAL  
             );  
    ```  
  
##  <a name="PowerShellProcedure"></a> Using PowerShell  
 **To add a replica**  
  
1.  Change directory (**cd**) to the server instance that hosts the primary replica.  
  
2.  Use the **New-SqlAvailabilityReplica** cmdlet.  
  
     For example, the following command adds an availability replica to an existing availability group named `MyAg`. This replica supports manual failover and asynchronous-commit availability mode. In the secondary role, this replica will support read access connections, allowing you to offload read-only processing to this replica.  
  
    ```  
    $agPath = "SQLSERVER:\Sql\PrimaryServer\InstanceName\AvailabilityGroups\MyAg"  
    $endpointURL = "TCP://PrimaryServerName.domain.com:5022"  
    $failoverMode = "Manual"  
    $availabilityMode = "AsynchronousCommit"  
    $secondaryReadMode = "AllowAllConnections"  
  
    New-SqlAvailabilityReplica -Name SecondaryServer\Instance `
    -EndpointUrl $endpointURL `
    -FailoverMode $failoverMode `
    -AvailabilityMode $availabilityMode `
    -ConnectionModeInSecondaryRole $secondaryReadMode `
    -Path $agPath
    ```  
  
    > **Note:**  
    >  To view the syntax of a cmdlet, use the **Get-Help** cmdlet in the  SQL Server 
 PowerShell environment. For more information, see [Get Help SQL Server PowerShell](https://learn.microsoft.com/powershell/sql-server/sql-server-powershell).  
  
 **To set up and use the SQL Server PowerShell provider**  
  
-   [SQL Server PowerShell Provider](https://learn.microsoft.com/powershell/sql-server/sql-server-powershell-provider)  
  
##  <a name="FollowUp"></a> Follow Up: After Adding a Secondary Replica  
 To add a replica for an existing availability group, you must perform the following steps:  
  
1.  Connect to the server instance that is going to host the new secondary replica.  
  
2.  Join the new secondary replica to the availability group. For more information, see [Join a Secondary Replica to an Availability Group (SQL Server)](join-a-secondary-replica-to-an-availability-group-sql-server.md).  
  
3.  For each database in the availability group, create a secondary database on the server instance that is hosting the secondary replica. For more information, see [Manually Prepare a Secondary Database for an Availability Group (SQL Server)](manually-prepare-a-secondary-database-for-an-availability-group-sql-server.md).  
  
4.  Join each of the new secondary databases to the availability group. For more information, see [Join a Secondary Database to an Availability Group (SQL Server)](join-a-secondary-database-to-an-availability-group-sql-server.md).  
  
##  <a name="RelatedTasks"></a> Related Tasks  
 **To manage an availability replica**  
  
-   [Join a Secondary Replica to an Availability Group (SQL Server)](join-a-secondary-replica-to-an-availability-group-sql-server.md)  
  
-   [Remove a Secondary Replica from an Availability Group (SQL Server)](remove-a-secondary-replica-from-an-availability-group-sql-server.md)  
  
-   [Configure Read-Only Access on an Availability Replica (SQL Server)](configure-read-only-access-on-an-availability-replica-sql-server.md)  
  
-   [Change the Availability Mode of an Availability Replica (SQL Server)](change-the-availability-mode-of-an-availability-replica-sql-server.md)  
  
-   [Change the Failover Mode of an Availability Replica (SQL Server)](change-the-failover-mode-of-an-availability-replica-sql-server.md)  
  
-   [Change the Session-Timeout Period for an Availability Replica (SQL Server)](change-the-session-timeout-period-for-an-availability-replica-sql-server.md)  
  
-   [Change the Session-Timeout Period for an Availability Replica (SQL Server)](change-the-session-timeout-period-for-an-availability-replica-sql-server.md)  
  
## Related content

- [ALTER AVAILABILITY GROUP (Transact-SQL)](../../../t-sql/statements/alter-availability-group-transact-sql.md)
- [What is an Always On availability group?](overview-of-always-on-availability-groups-sql-server.md)
- [Reference for the creation and configuration of Always On availability groups](creation-and-configuration-of-availability-groups-sql-server.md)
- [Use the Always On Availability Group dashboard (SQL Server Management Studio)](use-the-always-on-dashboard-sql-server-management-studio.md)
- [Monitor Availability Groups (Transact-SQL)](monitor-availability-groups-transact-sql.md)
