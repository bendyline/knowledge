---
title: "Isolate Performance Problems"
description: Use SQL Server Profiler and System Monitor to monitor and troubleshoot Transact-SQL, application-related problems, hardware, and system-related problems.
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: performance
ms.topic: concept-article
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "isolating performance problems [SQL Server]"
  - "monitoring performance [SQL Server], isolating problems"
  - "database monitoring [SQL Server], isolating problems"
  - "tuning databases [SQL Server], isolating problems"
  - "monitoring server performance [SQL Server], isolating problems"
  - "database performance [SQL Server], isolating problems"
  - "server performance [SQL Server], isolating problems"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Isolate Performance Problems

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  It is often more effective to use several  Microsoft 
  SQL Server 
 or Microsoft Windows tools together to isolate database performance problems than to use one tool at a time. For example, the graphical Execution Plan feature, also called Showplan, helps you quickly recognize deadlocks in a single query. However, you can recognize some other performance problems more easily if you use the monitoring features of  SQL Server 
 and Windows together.  
  
  SQL Server Profiler 
 can be used to monitor and troubleshoot Transact-SQL and application-related problems. System Monitor can be used to monitor hardware and other system-related problems.  
  
 You can monitor the following areas to troubleshoot problems:  
  
-    SQL Server 
 stored procedures or batches of  Transact-SQL  statements submitted by user applications.  
  
-   User activity, such as blocking locks or deadlocks.  
  
-   Hardware activity, such as disk usage.  
  
 Problems can include:  
  
-   Application development errors involving incorrectly written  Transact-SQL  statements.  
  
-   Hardware errors, such as disk- or network-related errors.  
  
-   Excessive blocking due to an incorrectly designed database.  
  
## Tools for Common Performance Problems  
 Equally important is careful selection of the performance problem that you want each tool to monitor or tune. The tool and the utility depend on the type of performance problem you want to resolve.  
  
 The following topics describe a variety of monitoring and tuning tools and the problems they uncover.  
  
 [Identify Bottlenecks](identify-bottlenecks.md)  
  
 [Monitor Memory Usage](../performance-monitor/monitor-memory-usage.md)  
  
## Related content

- [Tune applications and databases for performance in Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/performance-guidance)
- [Fabric SQL database Performance Dashboard](https://learn.microsoft.com/fabric/database/sql/performance-dashboard)
