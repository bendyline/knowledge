---
title: "sys.dm_hadr_availability_replica_cluster_states (Transact-SQL)"
description: sys.dm_hadr_availability_replica_cluster_states returns a row for each replica of all AGs in the Windows Server failover cluster.
author: rwestMSFT
ms.author: randolphwest
ms.date: 04/17/2023
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.dm_hadr_availability_replica_cluster_states_TSQL"
  - "dm_hadr_availability_replica_cluster_states"
  - "sys.dm_hadr_availability_replica_cluster_states"
  - "dm_hadr_availability_replica_cluster_states_TSQL"
helpviewer_keywords:
  - "Availability Groups [SQL Server], monitoring"
  - "Availability Groups [SQL Server], WSFC clusters"
  - "sys.dm_hadr_availability_replica_cluster_states dynamic management view"
dev_langs:
  - "TSQL"
---
# sys.dm_hadr_availability_replica_cluster_states (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Returns a row for each Always On availability replica (regardless of its join state) of all Always On availability groups (regardless of replica location) in the Windows Server Failover Clustering (WSFC) cluster.

<a id="connected_state"></a>

| Column name | Data type | Description |
| --- | --- | --- |
| **replica_id** | **uniqueidentifier** | Unique identifier of the availability replica. |
| **replica_server_name** | **nvarchar(256)** | Name of the instance of  SQL Server |
 | hosting the replica. |
| **group_id** | **uniqueidentifier** | Unique identifier of the availability group. |
| **join_state** | **tinyint** | - 0 = Not joined<br />- 1 = Joined, standalone<br />- 2 = Joined, failover cluster instance |
| **join_state_desc** | **nvarchar(60)** | - NOT_JOINED<br />- JOINED_STANDALONE<br />- JOINED_FCI |

## Permissions

For  SQL Server 2019 (15.x) 
 and earlier versions, requires VIEW SERVER STATE permission on the server.

For  SQL Server 2022 (16.x) 
 and later versions, requires VIEW SERVER PERFORMANCE STATE permission on the server.

## Related content

- [Monitor Availability Groups (Transact-SQL)](../../database-engine/availability-groups/windows/monitor-availability-groups-transact-sql.md)
