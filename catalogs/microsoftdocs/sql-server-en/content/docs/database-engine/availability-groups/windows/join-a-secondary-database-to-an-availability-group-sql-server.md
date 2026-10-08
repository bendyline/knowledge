---
title: "Join a secondary database to an availability group"
description: "Steps to join a secondary database to an Always On availability group using either Transact-SQL (T-SQL), PowerShell, or SQL Server Management Studio."
author: MashaMSFT
ms.author: mathoma
ms.date: "05/17/2016"
ms.service: sql
ms.subservice: availability-groups
ms.topic: how-to
f1_keywords:
  - "sql13.swb.availabilitygroup.joindbs.f1"
helpviewer_keywords:
  - "secondary databases [SQL Server], in availability group"
  - "secondary databases [SQL Server]"
  - "Availability Groups [SQL Server], joining"
  - "Availability Groups [SQL Server], configuring"
  - "Availability Groups [SQL Server], databases"
---
# Join a secondary database to an Always On availability group

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  This topic explains how to join a secondary database to an Always On availability group by using  SQL Server Management Studio 
,  Transact-SQL , or PowerShell in  SQL Server 
. After you prepare a secondary database for a secondary replica, you need to join the database to the availability group as soon as possible. This will start data movement from the corresponding primary database to the secondary database.  
   
> **Note:**  
>  For information about what happens after a secondary database joins the group, see [Overview of Always On Availability Groups (SQL Server)](overview-of-always-on-availability-groups-sql-server.md).  

<a id="Prerequisites"></a>

## Prerequisites

-   You must be connected to the server instance that hosts the secondary replica.  
  
-   The secondary replica must already be joined to the availability group. For more information, see [Join a Secondary Replica to an Availability Group (SQL Server)](join-a-secondary-replica-to-an-availability-group-sql-server.md).  
  
-   The secondary database must have been prepared recently. For more information, see [Manually Prepare a Secondary Database for an Availability Group (SQL Server)](manually-prepare-a-secondary-database-for-an-availability-group-sql-server.md).  

<a id="Permissions"></a>

## Permissions

Requires ALTER AVAILABILITY GROUP permission on the availability group, CONTROL AVAILABILITY GROUP permission, ALTER ANY AVAILABILITY GROUP permission, or CONTROL SERVER permission.  
  
##  <a name="SSMSProcedure"></a> Using SQL Server Management Studio  
 **To join a secondary database to an availability group**  
  
1.  In Object Explorer, connect to the server instance that hosts the secondary replica, and expand the server tree.  
  
2.  Expand the **Always On High Availability** node and the **Availability Groups** node.  
  
3.  Expand the availability group that you want to change, and expand the **Availability Databases** node.  
  
4.  Right-click the database, and click **Join to Availability Group**.  
  
5.  This opens the **Join Databases to Availability Group** dialog box. Verify the availability group name, which is displayed on the title bar, and database name or names displayed in the grid, and click **OK**, or click **Cancel**.  
  
##  <a name="TsqlProcedure"></a> Using Transact-SQL  
 **To join a secondary database to an availability group**  
  
1.  Connect to the server instance that hosts the secondary replica.  
  
2.  Use the [SET HADR clause of the ALTER DATABASE](../../../t-sql/statements/alter-database-transact-sql-set-hadr.md) statement, as follows:  
  
     ALTER DATABASE *database_name* SET HADR AVAILABILITY GROUP = *group_name*  
  
     where *database_name* is the name of a database to be joined and *group_name* is the name of the availability group.  
  
     The following example joins the secondary database, `Db1`, to the local secondary replica of the `MyAG` availability group.  
  
    ```  
    ALTER DATABASE Db1 SET HADR AVAILABILITY GROUP = MyAG;  
    ```  
  
    > **Note:**  
    >  To see this  Transact-SQL  statement used in context, see [Create an Availability Group (Transact-SQL)](create-an-availability-group-transact-sql.md).  
  
##  <a name="PowerShellProcedure"></a> Using PowerShell  
 **To join a secondary database to an availability group**  
  
1.  Change directory (**cd**) to the server instance that hosts the secondary replica.  
  
2.  Use the **Add-SqlAvailabilityDatabase** cmdlet to join one or more secondary databases to the availability group.  
  
     For example, the following command joins a secondary database, `Db1`, to the availability group `MyAG` on one of the server instances that hosts a secondary replica.  
  
    ```  
    Add-SqlAvailabilityDatabase `   
    -Path SQLSERVER:\SQL\SecondaryServer\InstanceName\AvailabilityGroups\MyAG `   
    -Database "Db1"  
    ```  
  
    > **Note:**  
    >  To view the syntax of a cmdlet, use the **Get-Help** cmdlet in the  SQL Server 
 PowerShell environment. For more information, see [Get Help SQL Server PowerShell](https://learn.microsoft.com/powershell/sql-server/sql-server-powershell).  
  
 **To set up and use the SQL Server PowerShell provider**  
  
-   [SQL Server PowerShell Provider](https://learn.microsoft.com/powershell/sql-server/sql-server-powershell-provider)  
  
##  <a name="RelatedTasks"></a> Related Tasks  
  
-   [Join a Secondary Replica to an Availability Group (SQL Server)](join-a-secondary-replica-to-an-availability-group-sql-server.md)  
  
-   [Manually Prepare a Secondary Database for an Availability Group (SQL Server)](manually-prepare-a-secondary-database-for-an-availability-group-sql-server.md)  
  
## Related content

- [ALTER AVAILABILITY GROUP (Transact-SQL)](../../../t-sql/statements/alter-availability-group-transact-sql.md)
- [What is an Always On availability group?](overview-of-always-on-availability-groups-sql-server.md)
- [Troubleshoot Always On Availability Groups Configuration (SQL Server)](troubleshoot-always-on-availability-groups-configuration-sql-server.md)
