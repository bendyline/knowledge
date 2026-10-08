---
title: "Undistributed Commands (Replication Monitor)"
description: Describes the 'Undistributed Commands' tab of the Replication Monitor in SQL Server Management Studio (SSMS).
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: ui-reference
ms.custom:
  - updatefrequency5
f1_keywords:
  - "sql13.rep.monitor.subscription.performance.f1"
monikerRange: "=azuresqldb-current || >=sql-server-2017"
---
# Subscription, Undistributed Commands (Transactional Subscription)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  The **Undistributed Commands** tab displays information about the number of commands in the distribution database that have not been delivered to the selected Subscriber, and the estimated time to deliver those commands. For information about viewing the commands in the distribution database, see [sp_replshowcmds (Transact-SQL)](../system-stored-procedures/sp-replshowcmds-transact-sql.md).  

  > **Note:** 
  > Azure SQL Managed Instance can be a publisher, distributor, and subscriber for snapshot and transactional replication. Databases in Azure SQL Database can only be push subscribers for snapshot and transactional replication. For more information, see Transactional replication with [Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/replication-to-sql-database) and [Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/replication-transactional-overview).

  
## Options  
 **Number of commands in the distribution database waiting to be applied to this Subscriber**  
 The number of commands in the distribution database that have not been delivered to the selected Subscriber. A command consists of one Transact-SQL data manipulation language (DML) statement or one data definition language (DDL) statement.  
  
 **Estimated time to apply these commands, based on past performance**  
 The estimated amount of time to deliver commands to the Subscriber. If this value is greater than the amount of time required to generate and apply a snapshot to the Subscriber, consider reinitializing the Subscriber. For more information, see [Reinitialize Subscriptions](reinitialize-subscriptions.md).  
  
## Related content

- [Start the Replication Monitor](monitor/start-the-replication-monitor.md)
- [Monitor Performance with Replication Monitor](monitor/monitor-performance-with-replication-monitor.md)
- [Monitoring (Replication)](monitor/monitoring-replication.md)
