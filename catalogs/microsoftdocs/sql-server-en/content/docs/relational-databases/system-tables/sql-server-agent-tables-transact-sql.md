---
title: SQL Server Agent Tables (Transact-SQL)
description: SQL Server Agent Tables (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 08/11/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: reference
helpviewer_keywords:
  - "SQL Server Agent, system tables"
  - "system tables [SQL Server], SQL Server Agent"
dev_langs:
  - TSQL
---
# SQL Server Agent tables (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This section describes the system tables that store information  SQL Server 
 Agent uses. All tables are in the `dbo` schema in the `msdb` database.

## Tables

| Table | Description |
| --- | --- |
| [dbo.sysalerts](dbo-sysalerts-transact-sql.md) | Contains one row for each alert. |
| [dbo.syscategories](dbo-syscategories-transact-sql.md) | Contains the categories that  SQL Server Management Studio |
 | uses to organize jobs, alerts, and operators. |
| [dbo.sysdownloadlist](dbo-sysdownloadlist-transact-sql.md) | Holds the queue of download instructions for all target servers. |
| [dbo.sysjobactivity](dbo-sysjobactivity-transact-sql.md) | Contains information about current  SQL Server |
 | Agent job activity and status. |
| [dbo.sysjobhistory](dbo-sysjobhistory-transact-sql.md) | Contains information about scheduled jobs that  SQL Server |
 | Agent runs. |
| [dbo.sysjobs](dbo-sysjobs-transact-sql.md) | Stores information for each scheduled job that  SQL Server |
 | Agent executes. |
| [dbo.sysjobschedules](dbo-sysjobschedules-transact-sql.md) | Contains schedule information for jobs that  SQL Server |
 | Agent executes. |
| [dbo.sysjobservers](dbo-sysjobservers-transact-sql.md) | Stores the association or relationship of a particular job with one or more target servers. |
| [dbo.sysjobsteps](dbo-sysjobsteps-transact-sql.md) | Contains information for each step in a job that  SQL Server |
 | Agent executes. |
| [dbo.sysjobstepslogs](dbo-sysjobstepslogs-transact-sql.md) | Contains information about job step logs. |
| [dbo.sysnotifications](dbo-sysnotifications-transact-sql.md) | Contains one row for each notification. |
| [dbo.sysoperators](dbo-sysoperators-transact-sql.md) | Contains one row for each  SQL Server |
 | Agent operator. |
| [dbo.sysproxies](dbo-sysproxies-transact-sql.md) | Contains information about  SQL Server |
 | Agent proxy accounts. |
| [dbo.sysproxylogin](dbo-sysproxylogin-transact-sql.md) | Maps  SQL Server |
 | logins to  SQL Server |
 | Agent proxy accounts. |
| [dbo.sysproxysubsystem](dbo-sysproxysubsystem-transact-sql.md) | Records which  SQL Server |
 | Agent subsystem each proxy account uses. |
| [dbo.sysschedules](dbo-sysschedules-transact-sql.md) | Contains information about  SQL Server |
 | Agent job schedules. |
| [dbo.syssessions](dbo-syssessions-transact-sql.md) | Contains the  SQL Server |
 | Agent start date for each  SQL Server |
 | Agent session.  SQL Server |
 | Agent creates a session each time the service starts. |
| [dbo.syssubsystems](dbo-sysproxysubsystem-transact-sql.md) | Contains information about all available  SQL Server |
 | Agent proxy subsystems. |
| [dbo.systargetservergroupmembers](dbo-systargetservergroupmembers-transact-sql.md) | Records target servers enlisted in this multiserver group. |
| [dbo.systargetservergroups](dbo-systargetservergroups-transact-sql.md) | Records target server groups enlisted in this multiserver environment. |
| [dbo.systargetservers](dbo-systargetservers-transact-sql.md) | Records target servers enlisted in this multiserver operation domain. |
| [dbo.systaskids](dbo-systaskids-transact-sql.md) | Contains a mapping of tasks created in earlier versions of  SQL Server |
 | to  Management Studio |
 | jobs in the current version. |
