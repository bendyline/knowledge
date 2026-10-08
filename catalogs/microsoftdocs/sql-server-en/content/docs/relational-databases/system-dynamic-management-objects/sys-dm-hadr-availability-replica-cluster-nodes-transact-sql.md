---
title: "sys.dm_hadr_availability_replica_cluster_nodes (Transact-SQL)"
description: Returns a row for every availability replica of the availability groups in the WSFC cluster.
author: rwestMSFT
ms.author: randolphwest
ms.date: 10/17/2023
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "dm_hadr_availability_replica_cluster_nodes"
  - "sys.dm_hadr_availability_replica_cluster_nodes_TSQL"
  - "dm_hadr_availability_replica_cluster_nodes_TSQL"
  - "sys.dm_hadr_availability_replica_cluster_nodes"
helpviewer_keywords:
  - "Availability Groups [SQL Server], monitoring"
  - "Availability Groups [SQL Server], WSFC clusters"
  - "sys.dm_hadr_availability_replica_cluster_nodes dynamic management view"
dev_langs:
  - "TSQL"
---
# sys.dm_hadr_availability_replica_cluster_nodes (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Returns a row for every availability replica (regardless of join state) of the Always On availability groups in the Windows Server Failover Clustering (WSFC) cluster.

## <a id="connected_state"></a>

| Column name | Data type | Description |
| --- | --- | --- |
| `group_name` | **nvarchar(256)** | Name of the availability group. |
| `replica_server_name` | **nvarchar(256)** | Name of the instance of  SQL Server |
 | hosting the replica. |
| `node_name` | **nvarchar(256)** | Name of the cluster node. |

## Remarks

In a Windows Server Failover Cluster (WSFC), the cluster columns display the Windows cluster details. In cases where there's no Windows cluster, such as [read-scale availability groups](../../database-engine/availability-groups/windows/read-scale-availability-groups.md), or [availability groups on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-availability-group-overview.md), columns related to the cluster might display data about an internal default cluster. These columns are for internal use only and can be disregarded.

## Permissions

For  SQL Server 2019 (15.x) 
 and previous versions, requires VIEW SERVER STATE permission on the server.

For  SQL Server 2022 (16.x) 
 and later versions, requires VIEW SERVER PERFORMANCE STATE permission on the server.

## Related content

- [Monitor Availability Groups (Transact-SQL)](../../database-engine/availability-groups/windows/monitor-availability-groups-transact-sql.md)
- [What is an Always On availability group?](../../database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server.md)
