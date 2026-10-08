---
title: "Getting Started with availability groups"
description: "Learn the steps to configure instances of SQL Server to support Always On availability groups, and for creating, managing, and monitoring an availability group."
author: MashaMSFT
ms.author: mathoma
ms.date: 10/10/2025
ms.update-cycle: 1825-days
ms.service: sql
ms.subservice: availability-groups
ms.topic: reference
ms.custom: intro-get-started
helpviewer_keywords:
  - "Availability Groups [SQL Server], deploying"
  - "Availability Groups [SQL Server], about"
---
# Getting Started with Always On Availability Groups

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This topic introduces the steps for configuring instances of  SQL Server 
 to support  Always On availability groups 
 and for creating, managing, and monitoring an availability group.  
  
  
##  <a name="RecommendedReading"></a> Recommended Reading  
 Before you create your first availability group, read the following topics:  
  
-   [Overview of Always On Availability Groups (SQL Server)](overview-of-always-on-availability-groups-sql-server.md)  
  
-   [Prerequisites, Restrictions, and Recommendations for Always On Availability Groups (SQL Server)](prereqs-restrictions-recommendations-always-on-availability.md)  
  
##  <a name="ConfigSI"></a> Configuring an Instance of SQL Server to Support Always On Availability Groups  
  
| Step | Links |
| --- | --- |
| **Enable  Always On availability groups |
| .** You must enable the  Always On availability groups |
 | feature on every instance of  SQL Server |
 | that participates in an availability group.<br /><br /> **Prerequisites:**  The host computer must be a Windows Server Failover Clustering (WSFC) node unless it's a [read-scale availability group](read-scale-availability-groups.md) or on [Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-availability-group-overview.md).<br /><br /> For information about the other prerequisites, see "SQL Server Instance Prerequisites and Restrictions" in [Prerequisites, Restrictions, and Recommendations for Always On Availability Groups (SQL Server)](prereqs-restrictions-recommendations-always-on-availability.md). | [Enable and disable Always On Availability Groups](enable-and-disable-always-on-availability-groups-sql-server.md) |
| **Create database mirroring endpoint (if none).** Ensure that each server instance has a [database mirroring endpoint](../../database-mirroring/the-database-mirroring-endpoint-sql-server.md). The server instance uses this endpoint to receive  Always On availability groups |
 | connections from other server instances. | To determine whether database mirroring endpoint exists: <br />                    [sys.database_mirroring_endpoints](../../../relational-databases/system-catalog-views/sys-database-mirroring-endpoints-transact-sql.md)<br /><br /> **For Windows Authentication**.  To create a database mirroring endpoint, use:<br /><br /> [New Availability Group Wizard](use-the-availability-group-wizard-sql-server-management-studio.md)<br /><br /> [Transact-SQL](../../database-mirroring/create-a-database-mirroring-endpoint-for-windows-authentication-transact-sql.md)<br /><br /> [SQL Server PowerShell](database-mirroring-always-on-availability-groups-powershell.md)<br /><br /> **For certificate authentication**. To create a database mirroring endpoint, use:[Transact-SQL](../../database-mirroring/use-certificates-for-a-database-mirroring-endpoint-transact-sql.md) |
  
##  <a name="ConfigAG"></a> Creating and Configuring a New Availability Group  
  
| Step | Links |
| --- | --- |
| **Create the availability group.** Create the availability group on the instance of  SQL Server |
 | that hosts the databases to be added to the availability group.<br /><br /> Minimally, create the initial primary replica on the instance of  SQL Server |
 | where you create the availability group. You can specify from one to four secondary replicas. For information about availability group and replica properties, see [CREATE AVAILABILITY GROUP &#40;Transact-SQL&#41;](../../../t-sql/statements/create-availability-group-transact-sql.md).<br /><br /> We strongly recommend that you create an [availability group listener](listeners-client-connectivity-application-failover.md).<br /><br /> **Prerequisites:**  When using a Windows Server Failover Cluster for the availability group, the instances of  SQL Server |
 | that host availability replicas for a given availability group must reside on separate nodes of a single WSFC cluster. The only exception is that while being migrated to another WSFC cluster, an availability group can temporarily straddle two clusters<br /><br /> For information about the other prerequisites, see "Availability Group Prerequisites and Restrictions", "Availability Database Prerequisites and Restrictions", and "SQL Server Instance Prerequisites and Restrictions" in [Prerequisites, Restrictions, and Recommendations for Always On Availability Groups (SQL Server)](prereqs-restrictions-recommendations-always-on-availability.md). | To create an availability group you can use any of the following tools:<br /><br /> [New Availability Group Wizard](use-the-availability-group-wizard-sql-server-management-studio.md)<br /><br /> [Transact-SQL](create-an-availability-group-transact-sql.md)<br /><br /> [SQL Server PowerShell](create-an-availability-group-transact-sql.md) |
| **Join secondary replicas to the availability group.** Connect to each instance of  SQL Server |
 | that hosts a secondary replica, and join the local secondary replica to the availability group. | [Join a secondary replica to an availability group](join-a-secondary-replica-to-an-availability-group-sql-server.md)<br /><br /> Tip: If you use the New Availability Group Wizard, this step is automated. |
| **Prepare secondary databases.** On every server instance that hosts a secondary replica, restore backups of the primary databases by using RESTORE WITH NORECOVERY. | [Manually prepare a secondary database](manually-prepare-a-secondary-database-for-an-availability-group-sql-server.md)<br /><br /> Tip: The New Availability Group Wizard can prepare the secondary databases for you. For more information, see "Prerequisites for using full initial data synchronization" in [Select Initial Data Synchronization Page (Always On Availability Group Wizards)](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/database-engine/availability-groups/windows/select-initial-data-synchronization-page-always-on-availability-group-wizards.md). |
| **Join secondary databases to the availability group.** On every server instance that hosts a secondary replica, join each local secondary database to the availability group. On joining the availability group, a given secondary database initiates data synchronization with the corresponding primary database. | [Join a secondary database to an availability group](join-a-secondary-database-to-an-availability-group-sql-server.md)<br /><br /> Tip: The New Availability Group Wizard can perform this step if every secondary database exists on every secondary replica. |
| **Create an availability group listener.**  This step is necessary unless you already created the availability group listener while creating the availability group. | [Create or Configure an Availability Group Listener (SQL Server)](create-or-configure-an-availability-group-listener-sql-server.md) |
| **Give the listener's DNS host name to application developers.**  Developers need to specify this DNS name in the connection strings to direct connection requests to the availability group listener. For more information, see [Availability Group Listeners, Client Connectivity, and Application Failover (SQL Server)](listeners-client-connectivity-application-failover.md). | "Follow Up: After Creating an Availability Group Listener" in [Create or Configure an Availability Group Listener (SQL Server)](create-or-configure-an-availability-group-listener-sql-server.md) |
| **Configure Where Backup Jobs.**  If you want to perform backups on secondary databases, you must create a backup job script that takes the automated backup preference into account. Create a script for each database in the availability group on every server instance that hosts an availability replica for the availability group. | "Follow Up: After Configuring Backup on Secondary Replicas" in [Configure Backup on Availability Replicas (SQL Server)](configure-backup-on-availability-replicas-sql-server.md) |
  
##  <a name="ManageAGsEtc"></a> Managing availability groups, replicas, and databases  
  
> **Note:**  
>  For information about availability group and replica properties, see [CREATE AVAILABILITY GROUP &#40;Transact-SQL&#41;](../../../t-sql/statements/create-availability-group-transact-sql.md).  
  
 To manage existing availability groups, perform one or more of the following tasks:  
  
| Task | Link |
| --- | --- |
| Modify the [flexible failover policy](configure-flexible-automatic-failover-policy.md) of the availability group to control the conditions that cause an automatic failover. This policy is relevant only when automatic failover is possible. | [Configure the flexible failover policy of an availability group](configure-flexible-automatic-failover-policy.md) |
| Perform a planned manual failover or a forced manual failover (with possible data loss), typically called *forced failover*. For more information, see [Failover and Failover Modes (Always On Availability Groups)](failover-and-failover-modes-always-on-availability-groups.md). | [Perform a planned manual failover](perform-a-planned-manual-failover-of-an-availability-group-sql-server.md)<br /><br /> [Perform a forced manual failover](perform-a-forced-manual-failover-of-an-availability-group-sql-server.md) |
| Use a set of predefined policies to view the health of an availability group and its replicas and databases. | [Use policy-based management to view the health of availability groups](use-always-on-policies-to-view-the-health-of-an-availability-group-sql-server.md)<br /><br /> [Use the Always On Group Dashboard](use-the-always-on-dashboard-sql-server-management-studio.md) |
| Add or remove a secondary replica. | [Add a secondary replica](add-a-secondary-replica-to-an-availability-group-sql-server.md)<br /><br /> [Remove a secondary replica](remove-a-secondary-replica-from-an-availability-group-sql-server.md) |
| Suspend or resume an availability database. Suspending a secondary database keeps at its current point in time until you resume it. | [Suspend a database](suspend-an-availability-database-sql-server.md)<br /><br /> [Resume a database](resume-an-availability-database-sql-server.md) |
| Add or remove a database. | [Add a database](availability-group-add-a-database.md)<br /><br /> [Remove a secondary database](remove-a-secondary-database-from-an-availability-group-sql-server.md)<br /><br /> [Remove a primary database](remove-a-primary-database-from-an-availability-group-sql-server.md) |
| Reconfigure or create an availability group listener. | [Create or configure an availability group listener](create-or-configure-an-availability-group-listener-sql-server.md) |
| Delete an availability group. | [Delete an availability group](remove-an-availability-group-sql-server.md) |
| Troubleshoot add file operations. This might be required if the primary database and a secondary database have different file paths. | [Troubleshoot a failed add-file operation](troubleshoot-a-failed-add-file-operation-always-on-availability-groups.md) |
| Alter availability replica properties. | [Change the Availability Mode](change-the-availability-mode-of-an-availability-replica-sql-server.md)<br /><br /> [Change the Failover Mode](change-the-failover-mode-of-an-availability-replica-sql-server.md)<br /><br /> [Configure Backup Priority (and Automated Backup Preference)](configure-backup-on-availability-replicas-sql-server.md)<br /><br /> [Configure Read-Only Access](configure-read-only-access-on-an-availability-replica-sql-server.md)<br /><br /> [Configure Read-Only Routing](configure-read-only-routing-for-an-availability-group-sql-server.md)<br /><br /> [Change the Session-Timeout Period](change-the-session-timeout-period-for-an-availability-replica-sql-server.md) |
  
##  <a name="MonitorAGsEtc"></a> Monitoring Availability Groups  
 To monitor the properties and state of an Always On availability group, use the following tools.  
  
| Tool | Brief Description | Links |
| --- | --- | --- |
| System Center Monitoring pack for SQL Server | The Monitoring pack for SQL Server (SQLMP) is the recommended solution for monitoring availability groups, availability replicas, and availability databases for IT administrators. Monitoring features that are particularly relevant to  Always On availability groups |
 | include the following:<br /><br /> Automatic discoverability of availability groups, availability replicas, and availability databases from among hundreds of computers. This feature enables you to easily keep track of your  Always On availability groups |
 | inventory.<br /><br /> Fully capable System Center Operations Manager (SCOM) alerting and ticketing. These features provide detailed knowledge that enables faster resolution to a problem.<br /><br /> A custom extension to Always On Health monitoring by using Policy Based management (PBM).<br /><br /> Health roll ups from availability databases to availability replicas.<br /><br /> Custom tasks that manage  Always On availability groups |
 | from the System Center Operations Manager console. | To download the monitoring pack (SQLServerMP.msi) and *SQL Server Management Pack Guide for System Center Operations Manager* (SQLServerMPGuide.doc), see:<br /><br /> [System Center Monitoring pack for SQL Server](https://www.microsoft.com/download/details.aspx?id=56203) |
| Transact-SQL | Always On availability groups |
 | catalog and dynamic management views provide a wealth of information about your availability groups and their replicas, databases, listeners, and WSFC cluster environment. | [Monitor Availability Groups (Transact-SQL)](monitor-availability-groups-transact-sql.md) |
| SQL Server Management Studio |
| The **Object Explorer Details** pane displays basic information about the availability groups hosted on the instance of  SQL Server |
 | to which you are connected.<br /><br /> Tip: Use this pane to select multiple availability groups, replicas, or databases and to perform routine administrative tasks on the selected objects; for example, removing multiple availability replicas or databases from an availability group. | [Use Object Explorer Details to monitor availability groups](use-object-explorer-details-to-monitor-availability-groups.md) |
| SQL Server Management Studio |
| **Properties** dialog boxes enable you to view the properties of availability groups, replicas, or listeners and, in some cases, to change their values. | [Availability Group Properties](view-availability-group-properties-sql-server.md)<br /><br /> [Availability Replica Properties](view-availability-replica-properties-sql-server.md)<br /><br /> [Availability Group Listener Properties](view-availability-group-listener-properties-sql-server.md) |
| System Monitor | The **SQLServer:Availability Replica** performance object contains performance counters that report information about availability replicas. | [SQL Server, Availability Replica](../../../relational-databases/performance-monitor/sql-server-availability-replica.md) |
| System Monitor | The **SQLServer:Database Replica** performance object contains performance counters that report information about the secondary databases on a given secondary replica.<br /><br /> The **SQLServer:Databases** object in SQL Server contains performance counters that monitor transaction log activities, among other things. The following counters are particularly relevant for monitoring transaction-log activity on availability databases: **Log Flush Write Time (ms)**, **Log Flushes/sec**, **Log Pool Cache Misses/sec**, **Log Pool Disk Reads/sec**, and **Log Pool Requests/sec**. | [SQL Server, Database Replica](../../../relational-databases/performance-monitor/sql-server-database-replica.md)<br /><br /> [SQL Server, Databases Object](../../../relational-databases/performance-monitor/sql-server-databases-object.md) |
  
## Related content

- [SQL Server Always On Solutions Guide for High Availability and Disaster Recovery](https://learn.microsoft.com/previous-versions/sql/sql-server-2012/hh781257\(v=msdn.10\))
- [SQL Server Always On Team Blog: The official SQL Server Always On Team Blog](https://learn.microsoft.com/archive/blogs/sqlalwayson/)
- [What is an Always On availability group?](overview-of-always-on-availability-groups-sql-server.md)
- [Enable the Always On availability group feature for a SQL Server instance](configuration-of-a-server-instance-for-always-on-availability-groups-sql-server.md)
- [Reference for the creation and configuration of Always On availability groups](creation-and-configuration-of-availability-groups-sql-server.md)
- [Tools to monitor Always On availability groups](monitoring-of-availability-groups-sql-server.md)
- [Transact-SQL statements for Always On availability groups](transact-sql-statements-for-always-on-availability-groups.md)
- [Overview of PowerShell Cmdlets for Always On Availability Groups](overview-of-powershell-cmdlets-for-always-on-availability-groups-sql-server.md)
