---
title: Enable or Disable Availability Group Feature
description: Steps to either enable or disable the Always On availability group feature using Transact-SQL (T-SQL), PowerShell, or SQL Server Management Studio.
author: MashaMSFT
ms.author: mathoma
ms.reviewer: randolphwest
ms.date: 02/26/2026
ms.service: sql
ms.subservice: availability-groups
ms.topic: how-to
helpviewer_keywords:
  - "Availability Groups [SQL Server], server instance"
  - "Availability Groups [SQL Server], deploying"
  - "Availability Groups [SQL Server], disabling"
  - "Availability Groups [SQL Server], enabling"
---

# Enable or disable the Always On availability group feature


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Before you can create and configure an Always On availability group, you must enable the  Always On availability groups 
 feature on each instance of  SQL Server 
 that hosts an availability replica.

> **Important:**  
> If you delete and re-create a WSFC cluster, you must disable and re-enable the  Always On availability groups 
 feature on each instance of  SQL Server 
 that hosted an availability replica on the original WSFC cluster.

## Prerequisites

- In  SQL Server 2016 (13.x) 
, the instance must reside on a Windows Server Failover Cluster (WSFC) node to enable the availability group feature.

- In  SQL Server 2017 (14.x) 
 and later versions, to support [read-scale availability groups](read-scale-availability-groups.md), you can enable the availability group feature even if the SQL Server instance doesn't reside on a Windows Server Failover Cluster.

- The server instance must run an edition of SQL Server that supports  Always On availability groups 
. For a list of features supported by the editions in  SQL Server 
, see [Editions and supported features of SQL Server 2025](../../../sql-server/editions-and-components-of-sql-server-2025.md).

- Enable availability groups on only one server instance at a time. After enabling availability groups, wait until the  SQL Server 
 service restarts before you proceed to another server instance.

- For more information, see [Prerequisites, Restrictions, and Recommendations for Always On Availability Groups (SQL Server)](prereqs-restrictions-recommendations-always-on-availability.md).

## Permissions

When you enable availability groups on an instance of  SQL Server 
, the server instance has full control over the WSFC cluster.

You need to be a member of the **Administrator** group on the local computer and have full control over the WSFC cluster. When you enable availability groups with PowerShell, open the Command Prompt window using the **Run as administrator** option.

You need **Active Directory Create Objects** and **Manage Objects** permissions.

## Determine if the feature is enabled

You can use SQL Server Management Studio (SSMS), Transact-SQL, or PowerShell to check if the availability groups feature is enabled.

### Use SQL Server Management Studio

1. In  SQL Server Management Studio 
 (SSMS), in Object Explorer, right-click the server instance, and select **Properties**.

1. In the **Server Properties** dialog box, select the **General** page. The **Is HADR Enabled** property displays one of the following values:

   - **True**, if availability groups are enabled
   - **False**, if availability groups are disabled.

### Use Transact-SQL

Use the following [SERVERPROPERTY](../../../t-sql/functions/serverproperty-transact-sql.md) statement:

```sql
SELECT SERVERPROPERTY('IsHadrEnabled');
```

The setting of the `IsHadrEnabled` server property indicates whether an instance of  SQL Server 
 is enabled for availability groups, as follows:

- `IsHadrEnabled` is `1`, if availability groups are enabled.
- `IsHadrEnabled` is `0`, if availability groups are disabled.

> **Note:**  
> For more information about the `IsHadrEnabled` server property, see [SERVERPROPERTY](../../../t-sql/functions/serverproperty-transact-sql.md).

### Use PowerShell

1. Change directory (`cd`) to a server instance where you want to determine whether  Always On availability groups 
 is enabled.

1. Enter the following PowerShell `Get-Item` command at the `SQLSERVER:\SQL\NODE1\DEFAULT` prompt:

   ```powershell
   Get-Item . | Select-Object IsHadrEnabled
   ```

   > **Note:**  
   > To view the syntax of a cmdlet, use the `Get-Help` cmdlet in the  SQL Server 
 PowerShell environment. For more information, see [Get Help SQL Server PowerShell](https://learn.microsoft.com/powershell/sql-server/sql-server-powershell).

To set up and use the SQL Server PowerShell provider, see [SQL Server PowerShell Provider](https://learn.microsoft.com/powershell/sql-server/sql-server-powershell-provider).

## Enable the feature

You can enable the availability groups feature using SQL Server Management Studio (SSMS) or PowerShell.

### Enable with SQL Server Management Studio

1. Connect to the Windows Server Failover Cluster (WSFC) node that hosts the  SQL Server 
 instance where you want to enable availability groups.

1. On the **Start** menu, point to **All Programs**, point to   **Microsoft SQL Server**  
, point to **Configuration Tools**, and select **SQL Server Configuration Manager**.

1. In **SQL Server Configuration Manager**, select **SQL Server Services**, right-click SQL Server (**\<*instance name*>)**. The **\<*instance name*>** is the name of a local server instance for which you want to enable availability groups. Select **Properties**.

1. Select the **Always On High Availability** tab.

1. Verify that the **Windows failover cluster name** field contains the name of the local failover cluster. If this field is blank, this server instance currently doesn't support  Always On availability groups 
. Either the local computer isn't a cluster node, the WSFC cluster is shut down, or this edition of  SQL Server 
 doesn't support  Always On availability groups 
.

1. Select the **Enable Always On Availability Groups** check box, and select **OK**.

    SQL Server 
 Configuration Manager saves your change. Then, you must manually restart the  SQL Server 
 service. This step enables you to choose a restart time that best fits your business requirements. When the  SQL Server 
 service restarts, availability groups are enabled, and the `IsHadrEnabled` server property is set to `1`.

### Enable with PowerShell

1. Change directory (`cd`) to a server instance where you want to enable availability groups.

1. Use the [Enable-SqlAlwaysOn](https://learn.microsoft.com/powershell/module/sqlserver/enable-sqlalwayson) cmdlet to enable availability groups.

   To view the syntax of a cmdlet, use the `Get-Help` cmdlet in the  SQL Server 
 PowerShell environment. For more information, see [Get Help SQL Server PowerShell](https://learn.microsoft.com/powershell/sql-server/sql-server-powershell).

   > **Note:**  
   > For information about how to control whether the `Enable-SqlAlwaysOn` cmdlet restarts the  SQL Server 
 service, see [When does a cmdlet restart the SQL Server service?](#when-does-a-cmdlet-restart-the-sql-server-service), later in this article.

To set up and use the SQL Server PowerShell provider, see [SQL Server PowerShell Provider](https://learn.microsoft.com/powershell/sql-server/sql-server-powershell-provider).

#### Example: Enable-SqlAlwaysOn

The following PowerShell command enables  Always On availability groups 
 on an instance of SQL Server (`<computer>\<Instance>`).

```powershell
Enable-SqlAlwaysOn -Path SQLSERVER:\SQL\Computer\Instance
```

## Disable the feature

Use the following sections to disable the availability groups feature using SQL Server Configuration Manager or PowerShell. After you complete the disable operation, you can perform any required follow-up tasks.

> **Important:**  
> Disable the availability groups feature on only one server instance at a time. After disabling Always On availability groups, wait until the  SQL Server 
 service restarts before you proceed to another server instance.

### Recommendations

Before you disable the availability groups feature on a server instance, complete the following steps:

1. If the server instance currently hosts the primary replica of an availability group that you want to keep, manually fail over the availability group to a synchronized secondary replica, if possible. For more information, see [Perform a Planned Manual Failover of an Availability Group (SQL Server)](perform-a-planned-manual-failover-of-an-availability-group-sql-server.md).

1. Remove all local secondary replicas. For more information, see [Remove a Secondary Replica from an Availability Group (SQL Server)](remove-a-secondary-replica-from-an-availability-group-sql-server.md).

### Disable with SQL Server Configuration Manager

1. Connect to the Windows Server Failover Cluster (WSFC) node that hosts the  SQL Server 
 instance where you want to disable availability groups.

1. On the **Start** menu, point to **All Programs**, point to   **Microsoft SQL Server**  
, point to **Configuration Tools**, and select **SQL Server Configuration Manager**.

1. In **SQL Server Configuration Manager**, select **SQL Server Services**, right-click SQL Server (**\<*instance name*>)**. The **\<*instance name*>** is the name of a local server instance for which you want to disable availability groups. Select **Properties**.

1. On the **Always On High Availability** tab, clear the **Enable Always On Availability Groups** check box, and select **OK**.

    SQL Server 
 Configuration Manager saves your change and restarts the  SQL Server 
 service. When the  SQL Server 
 service restarts, availability groups are disabled, and the **IsHadrEnabled** server property is set to `0`, to indicate that the feature is disabled.

1. Read the information in [Follow up](#follow-up-after-disabling-availability-groups), later in this article.

### Disable with PowerShell

1. Change directory (`cd`) to a currently enabled server instance where you want to disable availability groups.

1. Use the `Disable-SqlAlwaysOn` cmdlet to disable availability groups.

   For example, the following command disables availability groups on an instance of SQL Server (*Computer*\\*Instance*). This command requires restarting the instance, and you're prompted to confirm this restart.

   ```powershell
   Disable-SqlAlwaysOn -Path SQLSERVER:\SQL\Computer\Instance
   ```

   > **Important:**  
   > For information about how to control whether the `Disable-SqlAlwaysOn` cmdlet restarts the  SQL Server 
 service, see [When does a cmdlet restart the SQL Server service?](#when-does-a-cmdlet-restart-the-sql-server-service), later in this article.

   To view the syntax of a cmdlet, use the `Get-Help` cmdlet in the  SQL Server 
 PowerShell environment. For more information, see [Get Help SQL Server PowerShell](https://learn.microsoft.com/powershell/sql-server/sql-server-powershell).

To set up and use the SQL Server PowerShell provider, see [SQL Server PowerShell Provider](https://learn.microsoft.com/powershell/sql-server/sql-server-powershell-provider).

## Follow up after disabling availability groups

After you disable Always On availability groups, restart the instance of  SQL Server 
. SQL Configuration Manager restarts the server instance automatically. However, if you use the `Disable-SqlAlwaysOn` cmdlet, you need to restart the server instance manually. For more information, see [sqlservr Application](../../../tools/sqlservr-application.md).

On the restarted server instance:

- Availability databases don't start up at SQL Server startup, making them inaccessible.

- The only supported availability group  Transact-SQL  statement is [DROP AVAILABILITY GROUP](../../../t-sql/statements/drop-availability-group-transact-sql.md). `CREATE AVAILABILITY GROUP`, `ALTER AVAILABILITY GROUP`, and the `SET HADR` options of `ALTER DATABASE` aren't supported.

-  SQL Server 
 metadata and  Always On availability groups 
 configuration data in WSFC aren't affected by disabling availability groups.

If you permanently disable availability groups on every server instance that hosts an availability replica for one or more availability groups, complete the following steps:

1. If you didn't remove the local availability replicas before disabling availability groups, delete (drop) each availability group for which the server instance is hosting an availability replica. For information about deleting an availability group, see [Remove an Availability Group (SQL Server)](remove-an-availability-group-sql-server.md).

1. To remove the metadata, delete (drop) each affected availability group on a server instance that is part of the original WSFC.

1. Any primary databases continue to be accessible to all connections but the data synchronization between the primary and secondary databases stops.

1. The secondary databases enter the RESTORING state. You can delete them, or you can restore them by using `RESTORE WITH RECOVERY`. However, restored databases are no longer participating in availability-group data synchronization.

## When does a cmdlet restart the SQL Server service?

On a server instance that is currently running, using `Enable-SqlAlwaysOn` or `Disable-SqlAlwaysOn` to change the current availability group setting can cause the SQL Server service to restart. The restart behavior depends on the following conditions:

| `-NoServiceRestart` parameter specified | `-Force` parameter specified | SQL Server service restarted |
| --- | --- | --- |
| No | No | By default. See [If both parameters are specified](#if-both-parameters-are-specified). |
| No | Yes | Service is restarted. |
| Yes | No | Service isn't restarted. |
| Yes | Yes | Service isn't restarted. |

### If both parameters are specified

If you specify both `-NoServiceRestart` and `-Force` parameters, the cmdlet prompts you as follows (the default is **Y**):

```output
To complete this action, we must restart the SQL Server service for server instance '<instance_name>'. Do you want to continue?

[Y] Yes [N] No [S] Suspend [?] Help
```

If you specify **N** or **S**, the service isn't restarted.

## Related content

- [What is an Always On availability group?](overview-of-always-on-availability-groups-sql-server.md)
- [SERVERPROPERTY (Transact-SQL)](../../../t-sql/functions/serverproperty-transact-sql.md)
