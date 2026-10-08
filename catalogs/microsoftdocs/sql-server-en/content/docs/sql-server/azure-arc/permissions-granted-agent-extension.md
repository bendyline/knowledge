---
title: Server Level Roles Created by Azure Extension for SQL Server
description: "Explains server level roles create when you install Azure extension for SQL Server. Used by SQL Server enabled by Azure Arc"
author: MashaMSFT
ms.author: mathoma
ms.reviewer: nikitatakru
ms.date: 04/13/2026
ms.topic: reference
---

# Roles created by Azure extension for SQL Server installation


**Applies to:**
 

](../sql-docs-navigation-guide.md#applies-to)
 

This article lists the server and database roles and mappings that the installation of Azure extension for SQL Server creates.

## Roles


When you install Azure Extension for SQL Server in non-least-privilege mode, the installation:

1. Creates a server-level role: `SQLArcExtensionServerRole`
1. Creates a database-level role: `SQLArcExtensionUserRole`
1. Adds the `NT AUTHORITY\SYSTEM` account to each role
1. Maps `NT AUTHORITY\SYSTEM` at the database level for each database
1. Grants minimum permissions for the enabled features

Alternatively, you can configure 
 SQL Server 
 enabled by Azure Arc to run in least privilege mode. For more information, see [Operate SQL Server enabled by Azure Arc with least privilege](configure-least-privilege.md).

In addition, Azure Extension for SQL Server revokes permissions for these roles when they're no longer needed for specific features.

> **Note:**  
> The previously described actions require the Deployer to connect to SQL Server as `NT AUTHORITY\SYSTEM`. If the `NT AUTHORITY\SYSTEM` login is removed, disabled, or denied `CONNECT SQL` permission, the Deployer can't perform any of these actions, and the Azure Extension for SQL Server fails to provision. See [Prerequisites](prerequisites.md) for steps to verify and restore this login.

`SqlServerExtensionPermissionProvider` is a Windows task. It executes Deployer.exe to grant or revoke privileges in SQL Server when it detects:

- A new SQL Server instance is installed on the host
- A SQL Server instance is uninstalled from the host
- An instance-level feature is enabled or disabled, or settings are updated
- The extension service is restarted
- [Just-in-time (JIT) permissions](configure-windows-accounts-agent.md#just-in-time-sql-permissions) are enabled or disabled

> **Note:**  
> Before the July 2024 release, `SqlServerExtensionPermissionProvider` was a scheduled task that ran hourly.

For details, review [Configure Windows service accounts and permissions for Azure Extension for SQL Server](configure-windows-accounts-agent.md).

If you uninstall Azure Extension for SQL Server, the server-level and database-level roles are removed.


## Permissions

|  Feature | Permission | Level | Role |
|------ |------ |------ |------ |------ |------ |------ |------ |
| Default | `VIEW SERVER STATE` | Server Level | SQLArcExtensionServerRole |
| | `CONNECT SQL` | Server Level | SQLArcExtensionServerRole |
| | `VIEW ANY DEFINITION` | Server Level | SQLArcExtensionServerRole |
| | `VIEW ANY DATABASE` | Server Level | SQLArcExtensionServerRole |
| | `CONNECT ANY DATABASE` | Server Level | SQLArcExtensionServerRole |
| | `SELECT dbo.sysjobactivity` | `msdb` | SQLArcExtensionUserRole |
| | `SELECT dbo.sysjobs` | `msdb` | SQLArcExtensionUserRole |
| | `SELECT dbo.syssessions` | `msdb` | SQLArcExtensionUserRole |
| | `SELECT dbo.sysjobHistory` | `msdb` | SQLArcExtensionUserRole |
| | `SELECT dbo.sysjobSteps` | `msdb` | SQLArcExtensionUserRole |
| | `SELECT dbo.syscategories` | `msdb` | SQLArcExtensionUserRole |
| | `SELECT dbo.sysoperators` | `msdb` | SQLArcExtensionUserRole |
| | `SELECT dbo.suspectpages` | `msdb` | SQLArcExtensionUserRole |
| | `SELECT dbo.backupset` | `msdb` | SQLArcExtensionUserRole |
| | `SELECT dbo.backupmediaset` | `msdb` | SQLArcExtensionUserRole |
| | `SELECT dbo.backupmediafamily` | `msdb` | SQLArcExtensionUserRole |
| | `SELECT dbo.backupfile` | `msdb` | SQLArcExtensionUserRole |
| Backup | `CREATE ANY DATABASE` | Server Level | SQLArcExtensionServerRole |
| | db_backupoperator role | All databases | SQLArcExtensionUserRole |
| | dbcreator | Server Level | SQLArcExtensionServerRole |
| Azure Control Plane | `CREATE TABLE` | `msdb` | SQLArcExtensionUserRole |
| | `ALTER ANY SCHEMA` | `msdb` | SQLArcExtensionUserRole |
| | `CREATE TYPE` | `msdb` | SQLArcExtensionUserRole |
| | `EXECUTE` | `msdb` | SQLArcExtensionUserRole |
| | db_datawriter role | `msdb` | SQLArcExtensionUserRole |
| | db_datareader role | `msdb` | SQLArcExtensionUserRole |
| Availability Group Discovery | `VIEW ANY DEFINITION` | Server Level | SQLArcExtensionServerRole |
| Availability Group Failover | `ALTER ANY AVAILABILITY GROUP` | Server Level | SQLArcExtensionServerRole |
| Purview | `SELECT` | All databases | SQLArcExtensionUserRole |
| | `EXECUTE` | All databases | SQLArcExtensionUserRole |
| Migration Assessment | `EXECUTE dbo.agent_datetime` | `msdb` | SQLArcExtensionUserRole |
| | `SELECT dbo.sysjobs` | `msdb` | SQLArcExtensionUserRole |
| | `SELECT dbo.sysmail_account` | `msdb` | SQLArcExtensionUserRole |
| | `SELECT dbo.sysmail_profile` | `msdb` | SQLArcExtensionUserRole |
| | `SELECT dbo.sysmail_profileaccount` | `msdb` | SQLArcExtensionUserRole |
| | `SELECT dbo.syssubsystems` | `msdb` | SQLArcExtensionUserRole |
| | `SELECT sys.sql_expression_dependencies` | All databases | SQLArcExtensionUserRole |

## Run with least privilege

To run Azure extension for SQL Server with least privilege, follow the instructions at [Operate SQL Server enabled by Azure Arc with least privilege](configure-least-privilege.md).

At this time, the least privilege configuration isn't the default.

## Related content

- [Configure Windows service accounts and permissions](../../database-engine/configure-windows/configure-windows-service-accounts-and-permissions.md)
