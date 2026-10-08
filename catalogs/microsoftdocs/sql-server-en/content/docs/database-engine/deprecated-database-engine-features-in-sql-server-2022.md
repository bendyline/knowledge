---
title: Deprecated Database Engine Features
titleSuffix: SQL Server 2022
description: Find out about deprecated Database Engine features that are still available in SQL Server 2022 (16.x), but shouldn't be used in new applications.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest
ms.date: 11/18/2025
ms.service: sql
ms.subservice: release-landing
ms.topic: release-notes
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "deprecated changes 2022 [SQL Server]"
monikerRange: ">=sql-server-ver16 || >=sql-server-linux-ver16"
---
# Deprecated Database Engine features in SQL Server 2022 (16.x)


**Applies to:**
 





 SQL Server 2022 (16.x) 
 deprecates:

- Distributed Replay
- Machine Learning server
- Stretch Database

Features that were deprecated in prior releases are also deprecated in  SQL Server 2022 (16.x) 
. For information about deprecated features in other versions of  SQL Server 
, see:

- [Deprecated Database Engine features in SQL Server 2025 (17.x)](deprecated-database-engine-features-in-sql-server-2025.md)
- [Deprecated Database Engine features in SQL Server 2019 (15.x)](deprecated-database-engine-features-in-sql-server-2019.md)
- [Deprecated Database Engine features in SQL Server 2017 (14.x)](deprecated-database-engine-features-in-sql-server-2017.md)
- [Deprecated Database Engine features in SQL Server 2016 (13.x)](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/database-engine/deprecated-database-engine-features-in-sql-server-2016.md)

## Deprecation guidelines

When a feature is marked deprecated, it means:

- The feature is in maintenance mode only. No new changes are made, including changes to address interoperability with new features.

- We strive not to remove a deprecated feature from future releases to make upgrades easier. However, under rare situations, we might choose to permanently discontinue (remove) the feature from  SQL Server 
 if it limits future innovations.

- For new development work, don't use deprecated features. For existing applications, plan to modify applications that currently use these features as soon as possible.

You can monitor the use of deprecated features by using the  SQL Server 
 Deprecated Features Object performance counter, or the `deprecation_announcement` and `deprecation_final_support` extended events. For more information, see [Use SQL Server Objects](../relational-databases/performance-monitor/use-sql-server-objects.md).

## Query deprecated features

The values of these counters are also available by executing the following statement:


```sql
SELECT * FROM sys.dm_os_performance_counters   
WHERE object_name LIKE '%SQL%Deprecated Features%';  
```


## Related content

- [Discontinued Database Engine functionality in SQL Server](discontinued-database-engine-functionality-in-sql-server.md)
