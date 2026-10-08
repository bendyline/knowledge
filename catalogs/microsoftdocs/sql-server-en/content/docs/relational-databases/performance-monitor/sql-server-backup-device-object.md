---
title: "SQL Server, Backup Device object"
description: Learn about the Backup Device object, which provides counters to monitor Microsoft SQL Server backup devices used for backup and restore operations.
author: rwestMSFT
ms.author: randolphwest
ms.date: 12/04/2023
ms.service: sql
ms.subservice: performance
ms.topic: reference
helpviewer_keywords:
  - "SQLServer:Backup Device"
  - "Backup Device object"
---
# SQL Server, Backup Device object
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  The **Backup Device** object provides counters to monitor Microsoft  SQL Server 
 backup devices used for backup and restore operations. Monitor backup devices when you want to determine the throughput or the progress and performance of your backup and restore operations on a per device basis. To monitor the throughput of the entire database backup or restore operation, use the **Backup/Restore Throughput/sec** counter of the  SQL Server 
 **Databases** object. For more information, see [SQL Server, Databases Object](sql-server-databases-object.md).  
  
> **Note:**
>  The SQL Server Backup Device counter are not currently visible from `sys.dm_os_performance_counters`. On Windows, the counters can be viewed from [System Monitor](../performance/start-system-monitor-windows.md).

 This table describes the  SQL Server 
 **Backup Device** counter.  
  
| **SQL Server Backup Device** counters | Description |
| --- | --- |
| **Device Throughput Bytes/sec** | Throughput of read and write operations (in bytes per second) for a backup device used when backing up or restoring databases. This counter exists only while the backup or restore operation is executing. |
  
## Related content

- [Backup Devices (SQL Server)](../backup-restore/backup-devices-sql-server.md)
- [Monitor Resource Usage (Performance Monitor)](monitor-resource-usage-system-monitor.md)
