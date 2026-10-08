---
title: "sys.dm_exec_compute_pools (Transact-SQL)"
description: sys.dm_exec_compute_pools (Transact-SQL)
author: rwestMSFT
ms.author: randolphwest
ms.date: "02/24/2023"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.dm_exec_compute_pools"
  - "dm_exec_compute_pools_TSQL"
  - "dm_exec_compute_pools"
helpviewer_keywords:
  - "sys.dm_exec_compute_pools dynamic management view"
dev_langs:
  - "TSQL"
monikerRange: ">=sql-server-ver15||>=sql-server-linux-2017"
---
# sys.dm_exec_compute_pools (Transact-SQL)

**Applies to:**
 






| Column name | Data type | Description |
| --- | --- | --- |
| name | `sysname` | Name of the compute pool. Is not nullable. Returns `default` for the default compute pool. |
| compute_pool_id | `int` | Unique identifier for the pool. Key for this view. |
| location | `sysname` | Endpoint to controller in a SQL Big Data cluster. Is not nullable. |

## Permissions

On  SQL Server 
, requires `VIEW SERVER STATE` permission.

### Permissions for SQL Server 2022 and later

Requires VIEW SERVER PERFORMANCE STATE permission on the server.

## Related content

- [What are SQL Server Big Data Clusters
](https://learn.microsoft.com/previous-versions/sql/big-data-cluster/big-data-cluster-overview)
