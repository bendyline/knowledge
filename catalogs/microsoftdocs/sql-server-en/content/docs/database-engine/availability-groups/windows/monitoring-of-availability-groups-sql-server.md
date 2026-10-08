---
title: "Tools to monitor availability groups"
description: "A reference for the various tools available to monitor the performance and health of Always On availability groups. "
author: MashaMSFT
ms.author: mathoma
ms.date: 10/05/2021
ms.service: sql
ms.subservice: availability-groups
ms.topic: concept-article
helpviewer_keywords:
  - "Availability Groups [SQL Server], monitoring"
  - "Availability Groups [SQL Server], troubleshooting"
---
# Tools to monitor Always On availability groups

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  To monitor the properties and state of an Always On availability group you can use the following tools.  
  
| Tool | Brief Description | Links |
| --- | --- | --- |
| System Center Monitoring pack for SQL Server | The Monitoring pack for SQL Server (SQLMP) is the recommended solution for monitoring availability groups, availability replicas and availability databases for IT administrators. Monitoring features that are particularly relevant to  Always On availability groups |
 | include the following:<br /><br /> Automatic discoverability of availability groups, availability replicas, and availability database from among hundreds of computers. This enables you to easily keep track of your  Always On availability groups |
 | inventory.<br /><br /> Fully capable System Center Operations Manager (SCOM) alerting and ticketing. These features provide detailed knowledge that enables faster resolution to a problem.<br /><br /> A custom extension to Always On Health monitoring using Policy Based management (PBM).<br /><br /> Health roll ups from availability databases to availability replicas.<br /><br /> Custom tasks that manage  Always On availability groups |
 | from the System Center Operations Manager console. | To download the monitoring pack (SQLServerMP.msi) and *SQL Server Management Pack Guide for System Center Operations Manager* (SQLServerMPGuide.doc), see:<br /><br /> [System Center Monitoring pack for SQL Server](https://www.microsoft.com/download/details.aspx?id=56203) |
| Transact-SQL | Always On availability groups |
 | catalog and dynamic management views provide a wealth of information about your availability groups and their replicas, databases, listeners, and WSFC cluster environment. | [Monitor Availability Groups (Transact-SQL)](monitor-availability-groups-transact-sql.md) |
| SQL Server Management Studio |
| The **Object Explorer Details** pane displays basic information about the availability groups hosted on the instance of  SQL Server |
 | to which you are connected.<br /><br /> **\*\* Tip \*\*** Use this pane to select multiple availability groups, replicas, or databases and to perform routine administrative tasks on the selected objects; for example, removing multiple availability replicas or databases from an availability group. | [Use the Object Explorer Details to Monitor Availability Groups (SQL Server Management Studio)](use-object-explorer-details-to-monitor-availability-groups.md) |
| SQL Server Management Studio |
| **Properties** dialog boxes enable you to view the properties of availability groups, replicas, or listeners and, in some cases, to change their values. | -   [View Availability Group Properties (SQL Server)](view-availability-group-properties-sql-server.md)<br />-   [View Availability Replica Properties (SQL Server)](view-availability-replica-properties-sql-server.md)<br />-   [View Availability Group Listener Properties (SQL Server)](view-availability-group-listener-properties-sql-server.md) |
| System Monitor | The **SQLServer:Availability Replica** performance object contains performance counters that report information about availability replicas. | [SQL Server, Availability Replica](../../../relational-databases/performance-monitor/sql-server-availability-replica.md) |
| System Monitor | The **SQLServer:Database Replica** performance object contains performance counters that report information about the secondary databases on a given secondary replica.<br /><br /> The **SQLServer:Databases** object in SQL Server contains performance counters that monitor transaction log activities, among other things. The following counters are particularly relevant for monitoring transaction-log activity on availability databases: **Log Flush Write Time (ms)**, **Log Flushes/sec**, **Log Pool Cache Misses/sec**, **Log Pool Disk Reads/sec**, and **Log Pool Requests/sec**. | [SQL Server, Database Replica](../../../relational-databases/performance-monitor/sql-server-database-replica.md) and [SQL Server, Databases Object](../../../relational-databases/performance-monitor/sql-server-databases-object.md) |
  
## Related content

- [The Always On Health Model Part 1 -- Health Model Architecture](https://learn.microsoft.com/archive/blogs/sqlalwayson/the-alwayson-health-model-part-1-health-model-architecture)
- [The Always On Health Model Part 2 -- Extending the Health Model](https://learn.microsoft.com/archive/blogs/sqlalwayson/the-alwayson-health-model-part-2-extending-the-health-model)
- [Monitoring Always On Health with PowerShell - Part 1: Basic Cmdlet Overview](https://learn.microsoft.com/archive/blogs/sqlalwayson/monitoring-alwayson-health-with-powershell-part-1-basic-cmdlet-overview)
- [Monitoring Always On Health with PowerShell - Part 2: Advanced Cmdlet Usage](https://learn.microsoft.com/archive/blogs/sqlalwayson/monitoring-alwayson-health-with-powershell-part-2-advanced-cmdlet-usage)
- [Monitoring Always On Health with PowerShell - Part 3 : A Simple Monitoring Application](https://learn.microsoft.com/archive/blogs/sqlalwayson/monitoring-alwayson-health-with-powershell-part-3-a-simple-monitoring-application)
- [Monitoring Always On Health with PowerShell - Part 4 : Integration with SQL Server Agent](https://learn.microsoft.com/archive/blogs/sqlalwayson/monitoring-alwayson-health-with-powershell-part-4-integration-with-sql-server-agent)
- [SQL Server Always On Team Blogs: The official SQL Server Always On Team Blog](https://learn.microsoft.com/archive/blogs/sqlalwayson/)
- [CSS SQL Server Engineers Blogs](https://learn.microsoft.com/archive/blogs/psssql/)
- [Always On Availability Groups Catalog Views (Transact-SQL)](../../../relational-databases/system-catalog-views/always-on-availability-groups-catalog-views-transact-sql.md)
- [Always On availability groups dynamic management views and functions](../../../relational-databases/system-dynamic-management-objects/always-on-availability-groups-dynamic-management-views-functions.md)
- [Configure a flexible automatic failover policy for an Always On availability group](configure-flexible-automatic-failover-policy.md)
- [What is an Always On availability group?](overview-of-always-on-availability-groups-sql-server.md)
- [Automatic Page Repair (Availability Groups: Database Mirroring)](../../../sql-server/failover-clusters/automatic-page-repair-availability-groups-database-mirroring.md)
- [Use the Always On Availability Group dashboard (SQL Server Management Studio)](use-the-always-on-dashboard-sql-server-management-studio.md)
