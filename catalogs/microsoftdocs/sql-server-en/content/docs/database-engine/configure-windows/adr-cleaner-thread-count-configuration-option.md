---
title: "Server Configuration: ADR cleaner thread count"
description: "Explains the SQL Server instance configuration setting for ADR cleaner thread count."
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest, dfurman
ms.date: 11/25/2025
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
helpviewer_keywords:
  - "ADR cleaner thread count"
---
# Server configuration: ADR Cleaner Thread Count


**Applies to:**
 


 





Starting in  SQL Server 2022 (16.x) 
, and in Azure SQL Managed Instance, this configuration setting is used for [accelerated database recovery](../../relational-databases/accelerated-database-recovery-concepts.md) (ADR). The cleaner is an asynchronous process that wakes up periodically and cleans page versions that aren't needed.

By default, this configuration setting is set to `1`. This means that the cleaner uses a single thread to clean persistent version store (PVS) in all databases on the database engine instance.

If the cleaner performance is insufficient and you observe that PVS size is reduced too slowly or remains large, you can increase this configuration to make the cleaner multi-threaded.

> **Important:**  
> PVS cleanup might be slow or blocked due to workload activity. Before increasing this configuration value, review [Monitor and troubleshoot accelerated database recovery](../../relational-databases/accelerated-database-recovery-troubleshoot.md). If PVS cleanup is slow or blocked for one of the reasons mentioned in that article, follow the recommendations in the article instead of increasing the `ADR Cleaner Thread Count` configuration value.

## Remarks

Increasing the `ADR Cleaner Thread Count` configuration value to a large value isn't recommended. First start with a small increase, and then gradually increase the value incrementally until cleaner performance improves sufficiently. For example, you might increase the value to 2, and then to 4.

Database engine instances with many databases that experience large PVS growth might require higher values of this setting.

Regardless of configuration, the cleaner doesn't use more threads than the number of logical CPUs.

## Examples

The following example sets the number of PVS cleaner threads to `2`.

```sql
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
GO
EXEC sp_configure 'ADR Cleaner Thread Count', 2;
RECONFIGURE;
GO
```

## Related content

- [Server configuration options](server-configuration-options-sql-server.md)
- [Accelerated database recovery](../../relational-databases/accelerated-database-recovery-concepts.md)
- [Manage accelerated database recovery](../../relational-databases/accelerated-database-recovery-management.md)
- [Monitor and troubleshoot accelerated database recovery](../../relational-databases/accelerated-database-recovery-troubleshoot.md)
