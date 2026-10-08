---
title: "Change replica failover mode for an availability group"
description: "Describes how to change the failover mode for a replica within an Always On availability group using Transact-SQL (T-SQL), PowerShell, or SQL Server Management Studio."
author: MashaMSFT
ms.author: mathoma
ms.date: 06/30/2020
ms.service: sql
ms.subservice: availability-groups
ms.topic: how-to
helpviewer_keywords:
  - "failover modes [SQL Server]"
  - "Availability Groups [SQL Server], deploying"
  - "Availability Groups [SQL Server], failover modes"
  - "Availability Groups [SQL Server], configuring"
---
# Change the failover mode for a replica within an Always On availability group

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  This topic describes how to change the failover mode of an availability replica in an Always On availability group in  SQL Server 
 by using  SQL Server Management Studio 
,  Transact-SQL , or PowerShell. The failover mode is a replica property that determines the failover mode for replicas that run under synchronous-commit availability mode. For more information, see [Failover and Failover Modes (Always On Availability Groups)](failover-and-failover-modes-always-on-availability-groups.md) and [Availability Modes (Always On Availability Groups)](availability-modes-always-on-availability-groups.md).  
  
## <a name="Prerequisites"></a> Prerequisites and Restrictions  
  
-   This task is supported only on primary replicas. You must be connected to the server instance that hosts the primary replica.  
  
-   SQL Server Failover Cluster Instances (FCIs) do not support automatic failover by availability groups, so any availability replica that is hosted by an FCI can only be configured for manual failover.  
  

<a id="Permissions"></a>

## Permissions

Requires ALTER AVAILABILITY GROUP permission on the availability group, CONTROL AVAILABILITY GROUP permission, ALTER ANY AVAILABILITY GROUP permission, or CONTROL SERVER permission.  
  
##  <a name="SSMSProcedure"></a> Using SQL Server Management Studio  
 **To change the failover mode of an availability replica**  
  
1.  In Object Explorer, connect to the server instance that hosts the primary replica, and expand the server tree.  
  
2.  Expand the **Always On High Availability** node and the **Availability Groups** node.  
  
3.  Click the availability group whose replica you want to change.  
  
4.  Right-click the replica, and click **Properties**.  
  
5.  In the **Availability Replica Properties** dialog box, use the **Failover mode** drop list to change the failover mode of this replica.  
  
##  <a name="TsqlProcedure"></a> Using Transact-SQL  
 **To change the failover mode of an availability replica**  
  
1.  Connect to the server instance that hosts the primary replica.  
  
2.  Use the [ALTER AVAILABILITY GROUP](../../../t-sql/statements/alter-availability-group-transact-sql.md) statement, as follows:

    ```syntaxsql
    ALTER AVAILABILITY GROUP *group_name* MODIFY REPLICA ON '*server_name*'  
       WITH ( {  
             AVAILABILITY_MODE = { SYNCHRONOUS_COMMIT | ASYNCHRONOUS_COMMIT }
                | FAILOVER_MODE = { AUTOMATIC | MANUAL }
             }  )
    ```
    
    In the preceding script:

    - *group_name* is the name of the availability group.  
  
    - *server_name* is either the computer name or the failover cluster network name. For named instances add `\instance_name'. Use the name that hosts the replica that you want to modify.
  
For more information about these parameters, see [ALTER AVAILABILITY GROUP &#40;Transact-SQL&#41;](../../../t-sql/statements/alter-availability-group-transact-sql.md).  
  
The following example, entered on the primary replica of the *MyAG* availability group, changes the failover mode to automatic failover on the availability replica that is located on the default server instance on a computer named *COMPUTER01*.  
  
```sql
ALTER AVAILABILITY GROUP MyAG MODIFY REPLICA ON 'COMPUTER01' WITH  
    (FAILOVER_MODE = AUTOMATIC);  
```  
  
##  <a name="PowerShellProcedure"></a> Using PowerShell  
 **To change the failover mode of an availability replica**  
  
1.  Change directory (**cd**) to the server instance that hosts the primary replica.  
  
2.  Use the **Set-SqlAvailabilityReplica** cmdlet with the **FailoverMode** parameter. When setting a replica to automatic failover, you might need to use the **AvailabilityMode** parameter to change the replica to synchronous-commit availability mode.  
  
    For example, the following command modifies the replica `MyReplica` in the availability group `MyAg` to use synchronous-commit availability mode and to support automatic failover.  
  
    ```powershell
    Set-SqlAvailabilityReplica -AvailabilityMode "SynchronousCommit" -FailoverMode "Automatic" `   
    -Path SQLSERVER:\Sql\PrimaryServer\InstanceName\AvailabilityGroups\MyAg\Replicas\MyReplica  
    ```  
  
    > **Note:**  
    >  To view the syntax of a cmdlet, use the **Get-Help** cmdlet in the  SQL Server 
 PowerShell environment. For more information, see [Get Help SQL Server PowerShell](https://learn.microsoft.com/powershell/sql-server/sql-server-powershell).  
  
 **To set up and use the SQL Server PowerShell provider**  
  
-   [SQL Server PowerShell Provider](https://learn.microsoft.com/powershell/sql-server/sql-server-powershell-provider)  
  
## Related content

- [What is an Always On availability group?](overview-of-always-on-availability-groups-sql-server.md)
- [Differences between availability modes for an Always On availability group](availability-modes-always-on-availability-groups.md)
- [Failover and Failover Modes (Always On Availability Groups)](failover-and-failover-modes-always-on-availability-groups.md)
