---
title: "Perform a planned manual failover of an availability group"
description: "This topic describes how to perform a planned manual failover of an Always On availability group."
author: MashaMSFT
ms.author: mathoma
ms.date: "10/25/2017"
ms.service: sql
ms.subservice: availability-groups
ms.topic: how-to
f1_keywords:
  - "sql13.swb.availabilitygroup.manualfailover.f1"
helpviewer_keywords:
  - "Availability Groups [SQL Server], failover"
  - "failover [SQL Server], AlwaysOn Availability Groups"
  - "failover [SQL Server], Always On Availability Groups"
---

# Perform a planned manual failover of an Always On availability group (SQL Server)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
This topic describes how to perform a manual failover without data loss (a *planned manual failover*) on an Always On availability group by using  SQL Server Management Studio 
,  Transact-SQL , or PowerShell in  SQL Server 
. An availability group fails over at the level of an availability replica. A planned manual failover, like any Always On availability group failover, transitions a secondary replica to primary role. Concurrently, the failover transitions the former primary replica to the secondary role.  
  
A planned manual failover is supported only when the primary replica and the target secondary replica are running in synchronous-commit mode and are currently synchronized. A planned manual failover preserves all the data in the secondary databases that are joined to the availability group on the target secondary replica. After the former primary replica transitions to the secondary role, its databases become secondary databases. Then they begin to synchronize with the new primary databases. After they all transition into the SYNCHRONIZED state, the new secondary replica becomes eligible to serve as the target of a future planned manual failover.  
  
> **Note:**  
>  If the secondary and primary replicas are both configured for automatic failover mode, after the secondary replica is synchronized, it also can serve as the target for an automatic failover. For more information, see [Availability modes &#40;Always On availability groups&#41;](availability-modes-always-on-availability-groups.md).  
   
##  <a name="BeforeYouBegin"></a> Before you begin 

>**Important:**
>There are specific procedures to fail over a read-scale availability group with no cluster manager. When an availability group has CLUSTER_TYPE = NONE, follow the procedures under [Fail over the primary replica on a read-scale availability group](#fail-over-the-primary-replica-on-a-read-scale-availability-group).

##  <a name="Restrictions"></a> Limitations and restrictions 
  
- A failover command returns as soon as the target secondary replica has accepted the command. However, database recovery occurs asynchronously after the availability group has finished failing over. 
- Cross-database consistency across databases within the availability group might not be maintained on failover. 
  
    > **Note:** 
    >  Support for cross-database and distributed transactions vary by SQL Server and operating system versions. For more information, see [Cross-database transactions and distributed transactions for Always On availability groups and database mirroring &#40;SQL Server&#41;](transactions-always-on-availability-and-database-mirroring.md). 
  
##  <a name="Prerequisites"></a> Prerequisites and restrictions 
  
-   Both the target secondary replica and the primary replica must be running in synchronous-commit availability mode. 
-   Currently, the target secondary replica must be synchronized with the primary replica. All the secondary databases on this secondary replica must be joined to the availability group. They also must be synchronized with their corresponding primary databases (that is, the local secondary databases must be SYNCHRONIZED). 
  
    > **Tip:** 
    >  To determine the failover readiness of a secondary replica, query the **is_failover_ready** column in the [sys.dm_hadr_database_replica_cluster_states](../../../relational-databases/system-dynamic-management-objects/sys-dm-hadr-database-replica-cluster-states-transact-sql.md) dynamic management view. Or you can look at the **Failover Readiness** column of the [Always On group dashboard](use-the-always-on-dashboard-sql-server-management-studio.md). 
-   This task is supported only on the target secondary replica. You must be connected to the server instance that hosts the target secondary replica. 
  
<a id="Security"></a>
<a id="Permissions"></a>

## Permissions

The ALTER AVAILABILITY GROUP permission is required on the availability group. The CONTROL AVAILABILITY GROUP permission, the ALTER ANY AVAILABILITY GROUP permission, or the CONTROL SERVER permission also is required. 
  
##  <a name="SSMSProcedure"></a> Use SQL Server Management Studio 
 To manually fail over an availability group: 
  
1. In Object Explorer, connect to a server instance that hosts a secondary replica of the availability group that needs to be failed over. Expand the server tree. 
  
2. Expand the **Always On High Availability** node and the **Availability Groups** node. 
  
3. Right-click the availability group to be failed over, and select **Failover**. 
  
4. The Failover Availability Group wizard starts. For more information, see [Use the Failover Availability Group wizard &#40;SQL Server Management Studio&#41;](use-the-fail-over-availability-group-wizard-sql-server-management-studio.md). 
  
##  <a name="TsqlProcedure"></a> Use Transact-SQL 
 To manually fail over an availability group: 
  
1. Connect to the server instance that hosts the target secondary replica. 
  
2. Use the [ALTER AVAILABILITY GROUP](../../../t-sql/statements/alter-availability-group-transact-sql.md) statement, as follows: 
  
     ALTER AVAILABILITY GROUP *group_name* FAILOVER 
  
     In the statement, *group_name* is the name of the availability group. 
  
     The following example manually fails over the *MyAg* availability group to the connected secondary replica: 
  
    ```  
    ALTER AVAILABILITY GROUP MyAg FAILOVER;  
    ```  
  
##  <a name="PowerShellProcedure"></a> Use PowerShell 
 To manually fail over an availability group: 
  
1. Change the directory (**cd**) to the server instance that hosts the target secondary replica. 
  
2. Use the **Switch-SqlAvailabilityGroup** cmdlet. 
  
    > **Note:** 
    >  To view the syntax of a cmdlet, use the **Get-Help** cmdlet in the  SQL Server 
 PowerShell environment. For more information, see [Get help for SQL Server PowerShell](https://learn.microsoft.com/powershell/sql-server/sql-server-powershell). 
  
     The following example manually fails over the *MyAg* availability group to the secondary replica with the specified path: 
  
    ```  
    Switch-SqlAvailabilityGroup -Path SQLSERVER:\Sql\SecondaryServer\InstanceName\AvailabilityGroups\MyAg  
    ```  
  
    To set up and use the SQL Server PowerShell provider: 
  
    -   [SQL Server PowerShell provider](https://learn.microsoft.com/powershell/sql-server/sql-server-powershell-provider) 
    -   [Get help for SQL Server PowerShell](https://learn.microsoft.com/powershell/sql-server/sql-server-powershell) 

##  <a name="FollowUp"></a> Follow up: After you manually fail over an availability group 
 If you failed over outside the  automatic failover set 
 of the availability group, adjust the quorum votes of the Windows Server failover clustering nodes to reflect your new availability group configuration. For more information, see [Windows Server failover clustering &#40;WSFC&#41; with SQL Server](../../../sql-server/failover-clusters/windows/windows-server-failover-clustering-wsfc-with-sql-server.md). 

<a id="ReadScaleOutOnly"></a>

## Fail over the primary replica on a read-scale availability group

Each availability group has only one primary replica. The primary replica allows reads and writes. To change which replica is primary, you can fail over. In a typical availability group, the cluster manager automates the failover process. In an availability group with cluster type NONE, the failover process is manual.

There are two ways to fail over the primary replica in an availability group with cluster type NONE:

- Manual failover without data loss
- Forced manual failover with data loss


### Manual failover without data loss

Use this method when the primary replica is available, but you need to temporarily or permanently change which instance hosts the primary replica.
To avoid potential data loss, before you issue the manual failover, ensure that the target secondary replica is up to date.

To manually fail over without data loss:

1. Make the current primary and target secondary replica `SYNCHRONOUS_COMMIT`.

   ```SQL
   ALTER AVAILABILITY GROUP [AGRScale] 
        MODIFY REPLICA ON N'<node2>' 
        WITH (AVAILABILITY_MODE = SYNCHRONOUS_COMMIT);
   ```

1. To identify that active transactions are committed to the primary replica and at least one synchronous secondary replica, run the following query:

   ```SQL
   SELECT ag.name, 
      drs.database_id, 
      drs.group_id, 
      drs.replica_id, 
      drs.synchronization_state_desc, 
      ag.sequence_number
   FROM sys.dm_hadr_database_replica_states drs, sys.availability_groups ag
   WHERE drs.group_id = ag.group_id; 
   ```

   The secondary replica is synchronized when `synchronization_state_desc` is `SYNCHRONIZED`.

1. Update `REQUIRED_SYNCHRONIZED_SECONDARIES_TO_COMMIT` to 1.

   The following script sets `REQUIRED_SYNCHRONIZED_SECONDARIES_TO_COMMIT` to 1 on an availability group named `ag1`. Before you run the following script, replace `ag1` with the name of your availability group:

   ```SQL
   ALTER AVAILABILITY GROUP [AGRScale] 
        SET (REQUIRED_SYNCHRONIZED_SECONDARIES_TO_COMMIT = 1);
   ```

   This setting ensures that every active transaction is committed to the primary replica and at least one synchronous secondary replica.
   >**Note:**
   >This setting is not specific to failover and should be set based on the requirements of the environment.

1. Set the primary replica and the secondary replica(s) not participating in the failover offline to prepare for the role change: 

   ```SQL
   ALTER AVAILABILITY GROUP [AGRScale] OFFLINE
   ```

1. Promote the target secondary replica to primary.

   ```SQL
   ALTER AVAILABILITY GROUP AGRScale FORCE_FAILOVER_ALLOW_DATA_LOSS; 
   ```

1. Update the role of the old primary and other secondaries to `SECONDARY`, run the following command on the SQL Server instance that hosts the old primary replica:

   ```SQL
   ALTER AVAILABILITY GROUP [AGRScale] 
        SET (ROLE = SECONDARY); 
   ```

   > **Note:**
   > To delete an availability group, use [DROP AVAILABILITY GROUP](../../../t-sql/statements/drop-availability-group-transact-sql.md). For an availability group that's created with cluster type NONE or EXTERNAL, execute the command on all replicas that are part of the availability group.

1. Resume data movement, run the following command for every database in the availability group on the SQL Server instance that hosts the primary replica:

   ```SQL
   ALTER DATABASE [db1]
        SET HADR RESUME
   ```

1. Re-create any listener you created for read-scale purposes and that isn't managed by a cluster manager. If the original listener points to the old primary, drop it and re-create it to point to the new primary.

### Forced manual failover with data loss

If the primary replica is not available and can't immediately be recovered, then you need to force a failover to the secondary replica with data loss. However, if the original primary replica recovers after failover, it will assume the primary role. To avoid having each replica be in a different state, remove the original primary from the availability group after a forced failover with data loss. Once the original primary comes back online, remove the availability group from it entirely. 

To force a manual failover with data loss from primary replica N1 to secondary replica N2, follow these steps: 

1. On the secondary replica (N2), initiate the forced failover: 

    ```SQL
    ALTER AVAILABILITY GROUP [AGRScale] FORCE_FAILOVER_ALLOW_DATA_LOSS;
    ```
    
1. On the new primary replica (N2), remove the original primary (N1): 

    ```SQL
    ALTER AVAILABILITY GROUP [AGRScale]
    REMOVE REPLICA ON N'N1';
    ```
    
1. Validate that all application traffic is pointed to the listener and/or the new primary replica. 
1. If the original primary (N1) comes online, immediately take availability group AGRScale offline on the original primary (N1):

   ```SQL
   ALTER AVAILABILITY GROUP [AGRScale] OFFLINE
   ```
1. If there is data or unsynchronized changes, preserve this data via backups or other data replicating options that suit your business needs.     
1. Next, remove the availability group from the original primary (N1):

    ```SQL
    DROP AVAILABILITY GROUP [AGRScale];
    ```
1. Drop the availability group database on original primary replica (N1): 

    ```SQL
    USE [master]
    GO
    DROP DATABASE [AGDBRScale]
    GO
    ```
    
 1. (Optional) If desired, you can now add N1 back as a new secondary replica to the availability group AGRScale.


## Related content

- [What is an Always On availability group?](overview-of-always-on-availability-groups-sql-server.md)
- [Failover and Failover Modes (Always On Availability Groups)](failover-and-failover-modes-always-on-availability-groups.md)
- [Perform a forced manual failover of an Always On availability group (SQL Server)](perform-a-forced-manual-failover-of-an-availability-group-sql-server.md)
