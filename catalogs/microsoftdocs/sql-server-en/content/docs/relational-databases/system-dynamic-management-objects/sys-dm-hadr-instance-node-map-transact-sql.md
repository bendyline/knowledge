---
title: "sys.dm_hadr_instance_node_map (Transact-SQL)"
description: Returns the name of the Windows Server Failover Cluster node that hosts the server instance.
author: rwestMSFT
ms.author: randolphwest
ms.date: 10/17/2023
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.dm_hadr_instance_node_map_TSQL"
  - "sys.dm_hadr_instance_node_map"
helpviewer_keywords:
  - "Availability Groups [SQL Server], monitoring"
  - "Availability Groups [SQL Server], WSFC"
  - "sys.dm_hadr_instance_node_map dynamic management view"
dev_langs:
  - "TSQL"
---
# sys.dm_hadr_instance_node_map (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

For every instance of  SQL Server 
 that hosts an availability replica that is joined to its Always On availability group, returns the name of the Windows Server Failover Cluster (WSFC) node that hosts the server instance. This dynamic management view has the following uses:

- This dynamic management view is useful for detecting an availability group with multiple availability replicas that are hosted on the same WSFC node, which is an unsupported configuration that could occur after an failover cluster instance (FCI) failover if the availability group is incorrectly configured. For more information, see [Failover Clustering and Always On Availability Groups (SQL Server)](../../database-engine/availability-groups/windows/failover-clustering-and-always-on-availability-groups-sql-server.md).

- When multiple SQL Server instances are hosted on the same WSFC node, the Resource DLL uses this dynamic management view to determine the instance of  SQL Server 
 to connect to.

| Column name | Data type | Description |
| --- | --- | --- |
| `ag_resource_id` | **nvarchar(256)** | Unique ID of the availability group as a resource in the WSFC. |
| `instance_name` | **nvarchar(256)** | `Name-<server>`/`<instance>-of` a server instance that hosts a replica for the availability group. |
| `node_name` | **nvarchar(256)** | Name of the WSFC node. |

## Remarks

In a Windows Server Failover Cluster (WSFC), the cluster columns display the Windows cluster details. In cases where there's no Windows cluster, such as [read-scale availability groups](../../database-engine/availability-groups/windows/read-scale-availability-groups.md), or [availability groups on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-availability-group-overview.md), columns related to the cluster might display data about an internal default cluster. These columns are for internal use only and can be disregarded.

## Permissions

For  SQL Server 2019 (15.x) 
 and previous versions, requires VIEW SERVER STATE permission on the server.

For  SQL Server 2022 (16.x) 
 and later versions, requires VIEW SERVER PERFORMANCE STATE permission on the server.

## Related content

- [Always On availability groups dynamic management views and functions](always-on-availability-groups-dynamic-management-views-functions.md)
- [Always On Availability Groups Catalog Views (Transact-SQL)](../system-catalog-views/always-on-availability-groups-catalog-views-transact-sql.md)
- [Monitor Availability Groups (Transact-SQL)](../../database-engine/availability-groups/windows/monitor-availability-groups-transact-sql.md)
- [What is an Always On availability group?](../../database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server.md)
