---
title: "Upgrading Mirrored Instances"
description: Learn how to reduce downtime when upgrading a SQL Server mirrored instance by using a rolling upgrade. This article includes best practices.
author: MashaMSFT
ms.author: mathoma
ms.date: 06/22/2026
ms.service: sql
ms.subservice: database-mirroring
ms.topic: how-to
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "upgrading SQL Server, rolling upgrade of mirrored databases"
  - "database mirroring [SQL Server], upgrading system"
  - "rolling upgrades [SQL Server]"
---
# Upgrading Mirrored Instances
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

> **Caution:**
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  For high availability, use  Always On availability groups 
 instead.

> **Important:**
> Database Mirroring in SQL Server is a distinct technology from [Microsoft Fabric Database Mirroring](https://learn.microsoft.com/fabric/database/mirrored-database/overview). Mirroring to Fabric provides better analytical performance, the ability to unify your data estate with OneLake in Fabric, and open access to your data in Delta Parquet format.
>
> With Mirroring to Microsoft Fabric, you can continuously replicate your existing data estate directly into OneLake in Fabric, including data from SQL Server 2016+, Azure SQL Database, Azure SQL Managed Instance, Cosmos DB, Oracle, Snowflake, and more.

  When upgrading a  SQL Server 
 mirrored instance to a new version, to a new  SQL Server 
 service pack or cumulative update, or to a new Windows service pack or cumulative update, you can reduce downtime for each mirrored database to only a single manual failover by performing a rolling upgrade (or two manual failovers if failing back to the original primary). A rolling upgrade is a multi-stage process that in its simplest form involves upgrading the  SQL Server 
 instance that is currently acting as the mirror server in a mirroring session, then manually failing over the mirrored database, upgrading the former principal  SQL Server 
 instance, and resuming mirroring. In practice, the exact process will depend on the operating mode and the number and layout of mirroring session running on the  SQL Server 
 instances that you are upgrading.  
 
  For information on using database mirroring with log shipping during a migration, download this [Database Mirroring and Log Shipping whitepaper](https://download.microsoft.com/download/d/9/4/d948f981-926e-40fa-a026-5bfcf076d9b9/DBMandLogShipping.docx).  
  
## Prerequisites  
 Before you begin, review the following important information:  
  
-   [Supported Version and Edition Upgrades](../install-windows/supported-version-and-edition-upgrades-2017.md): Verify that you can upgrade to  SQL Server 
 from your version of the Windows operating system and version of SQL Server. For example, you cannot upgrade directly from a SQL Server 2005 instance to the latest version of  SQL Server 
.  
  
-   [Choose a Database Engine Upgrade Method](../install-windows/choose-a-database-engine-upgrade-method.md): Select the appropriate upgrade method and steps based on your review of supported version and edition upgrades and also based on other components installed in your environment to upgrade components in the correct order.  
  
-   [Plan and Test the Database Engine Upgrade Plan](../install-windows/plan-and-test-the-database-engine-upgrade-plan.md): Review the release notes and known upgrade issues, the pre-upgrade checklist, and develop and test the upgrade plan.  
  
-   [Hardware and software requirements for SQL Server 2016](https://learn.microsoft.com/previous-versions/sql/sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2016):  Review the software requirements for installing  SQL Server 
. If additional software is required, install it on each node before you begin the upgrade process to minimize any downtime.  
  
## Recommended Preparation (Best Practices)  
 Before starting a rolling upgrade, we recommend that you:  
  
1.  Perform a practice manual failover on at least one of your mirroring sessions:  
  
    -   [Manually Fail Over a Database Mirroring Session (SQL Server Management Studio)](manually-fail-over-a-database-mirroring-session-sql-server-management-studio.md)  
  
    -   [Manually Fail Over a Database Mirroring Session (Transact-SQL)](manually-fail-over-a-database-mirroring-session-transact-sql.md).  
  
    > **Note:**  
    >  For information about how manual failover works, see [Role Switching During a Database Mirroring Session (SQL Server)](role-switching-during-a-database-mirroring-session-sql-server.md).  
  
2.  Protect your data:  
  
    1.  Perform a full database backup on every principal database:  
  
         [Create a Full Database Backup &#40;SQL Server&#41;](../../relational-databases/backup-restore/create-a-full-database-backup-sql-server.md).  
  
    2.  Run the [DBCC CHECKDB](../../t-sql/database-console-commands/dbcc-checkdb-transact-sql.md) command on every principal database.  
  
## Stages of a Rolling Upgrade  
 The specific steps of a rolling upgrade depend on the operating mode of the mirroring configuration. However, the basic stages are the same.  
  
> **Note:**  
>  For information about the operating modes, see [Database Mirroring Operating Modes](database-mirroring-operating-modes.md).  
  
 The following illustration is a flowchart that shows the basic stages of a rolling upgrade for each operating mode. The corresponding procedures are described after the illustration.  
  
 Flowchart showing steps of a rolling upgrade  
  
> **Important:**  
>  A server instance might be performing different mirroring roles (principal server, mirror server, or witness) in concurrent mirroring sessions. In this case, you will have to adapt the basic rolling upgrade process accordingly. For more information, see [Role Switching During a Database Mirroring Session (SQL Server)](role-switching-during-a-database-mirroring-session-sql-server.md).  
  
> **Note:**  
>  In many cases, after the rolling upgrade is completed, you will failback to the original principal server.  
  
### To change a session from high-performance mode to high-safety mode  
  
1.  If a mirroring session is running in high-performance mode, before you perform a rolling upgrade, change the operating mode to high safety without automatic failover.  
  
    > **Important:**  
    >  If the mirror server is geographically distant from the principal server, a rolling upgrade might be inappropriate.  
  
    -   In  SQL Server Management Studio 
: Change the **Operating mode** option to **High safety without automatic failover (synchronous)** by using the [Mirroring Page](../../relational-databases/databases/database-properties-mirroring-page.md) of the **Database Properties** dialog box. For information about how to access this page, see [Start the Configuring Database Mirroring Security Wizard (SQL Server Management Studio)](start-the-configuring-database-mirroring-security-wizard.md).  
  
    -   In  Transact-SQL : Set transaction safety to FULL. For more information, see [Change Transaction Safety in a Database Mirroring Session (Transact-SQL)](change-transaction-safety-in-a-database-mirroring-session-transact-sql.md)  
  
### To remove a witness from a session  
  
1.  If a mirroring session involves a witness, we recommend that you remove the witness before you perform a rolling upgrade. Otherwise, when the mirror server instance is being upgraded, database availability depends on the witness that remains connected to the principal server instance. After you remove a witness, you can upgrade it at any time during the rolling upgrade process without risking database downtime.  
  
    > **Note:**  
    >  For more information, see [Quorum: How a Witness Affects Database Availability (Database Mirroring)](quorum-how-a-witness-affects-database-availability-database-mirroring.md).  
  
    -   [Remove the Witness from a Database Mirroring Session (SQL Server)](remove-the-witness-from-a-database-mirroring-session-sql-server.md)  
  
### To perform the rolling upgrade  
  
1.  To minimize downtime, we recommend the following: Start the rolling upgrade by updating any mirroring partner that is currently the mirror server in all its mirroring sessions. You might have to update multiple server instances at this point.  
  
    > **Note:**  
    >  A witness can be upgraded at any point in the rolling upgrade process. For example, if a server instance is a mirror server in Session 1 and is a witness in Session 2, you can upgrade the server instance now.  
  
     The server instance to upgrade first depends on the current configuration of your mirroring sessions, as follows:  
  
    -   If any server instance is already the mirror server in all its mirroring sessions, upgrade the server instance to the new version.  
  
    -   If all your server instances are currently the principal server in any mirroring sessions, select one server instance to upgrade first. Then, manually fail over each of its principal databases and upgrade that server instance.  
  
     After being upgraded, a server instance automatically rejoins each of its mirroring sessions.  
  
2.  For each mirroring session whose mirror server instance has just been upgraded, wait for the session to synchronize. Then, connect to the principal server instance, and manually fail over the session. On failover, the upgraded server instance becomes the principal server for that session, and the former principal server becomes the mirror server.  
  
     The goal of this step is for another server instance to become the mirror server in every mirroring session in which it is a partner.  
  
     **Restrictions after you failover to an upgraded server instance.**  
  
     After failing over from an earlier server instance to an upgraded  SQL Server 
 server instance, the database session is suspended. It cannot be resumed until the other partner has been upgraded. However, the principal server is still accepting connections and allowing data access and modifications on the principal database.  
  
    > **Note:**  
    >  Establishing a new mirroring session requires that the server instances all be running the same version of  SQL Server 
.  
  
3.  After you fail over, we recommend that you run the [DBCC CHECKDB](../../t-sql/database-console-commands/dbcc-checkdb-transact-sql.md) command on the principal database.  
  
4.  Upgrade each server instance that is now the mirror server in all mirroring sessions in which it is a partner. You might have to update multiple servers at this point.  
  
    > **Important:**  
    >  In a complex mirroring configuration, some server instance might still be the original principal server in one or more mirroring sessions. Repeat steps 2-4 for those server instances until all instances involved are upgraded.  
  
5.  Resume the mirroring session.  
  
    > **Note:**  
    >  Automatic failover will not work until the witness has been upgraded and added back into the mirroring session.  
  
6.  Upgrade any remaining server instance that is the witness in all its mirroring sessions. After an upgraded witness rejoins a mirroring session, automatic failover becomes possible again. You might have to update multiple servers at this point.  
  
### To return a session to high-performance mode  
  
1.  Optionally, return to high-performance mode by using one of the following methods:  
  
    -   In  SQL Server Management Studio 
: Change the **Operating mode** option to **High performance (asynchronous)** by using the [Mirroring Page](../../relational-databases/databases/database-properties-mirroring-page.md) of the **Database Properties** dialog box.  
  
    -   In  Transact-SQL : Use [ALTER DATABASE](../../t-sql/statements/alter-database-transact-sql-database-mirroring.md) to set transaction safety to OFF.  
  
### To add a witness back into a mirroring session  
  
1.  Optionally, in high-safety mode, reestablish the witness to each mirroring session.  
  
     **To return a witness**  
  
    -   [Add or Replace a Database Mirroring Witness (SQL Server Management Studio)](add-or-replace-a-database-mirroring-witness-sql-server-management-studio.md)  
  
    -   [Add a Database Mirroring Witness Using Windows Authentication (Transact-SQL)](add-a-database-mirroring-witness-using-windows-authentication-transact-sql.md)  
  
## Related content

- [Upgrade SQL Server Using the Installation Wizard (Setup)](../install-windows/upgrade-sql-server-using-the-installation-wizard-setup.md)
- [Install, configure, or uninstall SQL Server on Windows from the command prompt](../install-windows/install-sql-server-from-the-command-prompt.md)
- [ALTER DATABASE (Transact-SQL) Database Mirroring](../../t-sql/statements/alter-database-transact-sql-database-mirroring.md)
- [BACKUP (Transact-SQL)](../../t-sql/statements/backup-transact-sql.md)
- [View the State of a Mirrored Database (SQL Server Management Studio)](view-the-state-of-a-mirrored-database-sql-server-management-studio.md)
- [Database Mirroring (SQL Server)](database-mirroring-sql-server.md)
- [Role Switching During a Database Mirroring Session (SQL Server)](role-switching-during-a-database-mirroring-session-sql-server.md)
- [Force Service in a Database Mirroring Session (Transact-SQL)](force-service-in-a-database-mirroring-session-transact-sql.md)
- [Start Database Mirroring Monitor (SQL Server Management Studio)](start-database-mirroring-monitor-sql-server-management-studio.md)
- [Database Mirroring Operating Modes](database-mirroring-operating-modes.md)
