---
title: "Run Performance Monitor"
description: Performance Monitor in Windows uses remote procedure calls to collect information from SQL Server.
author: rwestMSFT
ms.author: randolphwest
ms.date: 12/04/2023
ms.service: sql
ms.subservice: performance
ms.topic: concept-article
helpviewer_keywords:
  - "Performance Monitor [SQL Server], running"
  - "Windows Performance Monitor [SQL Server], running"
  - "remote procedure calls [SQL Server]"
  - "starting Windows NT Performance Monitor"
  - "RPC"
---
# Run Performance Monitor
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


  [Performance Monitor](monitor-resource-usage-system-monitor.md) uses remote procedure calls (RPCs) to collect information from Microsoft  SQL Server 
. Any user who has Microsoft Windows permissions to run Performance Monitor can use Performance Monitor to monitor  SQL Server 
.  
  
 As with all performance monitoring tools, expect some performance overhead when you use Performance Monitor to monitor  SQL Server 
. The actual overhead in any specific instance depends on the hardware platform, the number of counters, and the selected update interval. However, the integration of Performance Monitor with  SQL Server 
 is designed to minimize any reduction in performance.  
  
> **Note:**  
> If you have selected  SQL Server 
 performance counters to monitor in the Performance Monitor snap-in, you will see the counters even if  SQL Server 
 is not running.  
  
 For information about starting Performance Monitor, see [Start Performance Monitor (Windows)](../performance/start-system-monitor-windows.md).  
  
## Related content

- [Monitor Resource Usage (Performance Monitor)](monitor-resource-usage-system-monitor.md)
