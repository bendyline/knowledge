---
title: "SQL Server, CLR object"
description: "Learn about the SQLServer:CLR object, which provides counters to monitor common language runtime execution in Microsoft SQL Server."
author: rwestMSFT
ms.author: randolphwest
ms.date: 12/04/2023
ms.service: sql
ms.subservice: performance
ms.topic: reference
helpviewer_keywords:
  - "SQLServer:CLR"
  - "CLR object [SQL Server]"
---
# SQL Server, CLR object
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  The **SQLServer:CLR** object provides counters to monitor common language runtime (CLR) execution in  Microsoft 
  SQL Server 
.  
  
 The following table describes the  SQL Server 
 **CLR** counters.  
  
| **CLR** counters | Description |
| --- | --- |
| **CLR Execution** | Total execution time in CLR (microseconds) |
  
## Example

You begin to explore the query performance counters in this object using this T-SQL query on the [sys.dm_os_performance_counters](../system-dynamic-management-objects/sys-dm-os-performance-counters-transact-sql.md) dynamic management view:

```sql
SELECT * FROM sys.dm_os_performance_counters
WHERE object_name LIKE '%CLR%';
```  

## Related content

- [Monitor Resource Usage (Performance Monitor)](monitor-resource-usage-system-monitor.md)
