---
title: "sys.dm_hadr_cluster_networks (Transact-SQL)"
description: Returns a row for every WSFC cluster member that is participating in an availability group's subnet configuration.
author: rwestMSFT
ms.author: randolphwest
ms.date: 10/17/2023
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "dm_hadr_cluster_networks"
  - "sys.dm_hadr_cluster_networks_TSQL"
  - "sys.dm_hadr_cluster_networks"
  - "dm_hadr_cluster_networks_TSQL"
helpviewer_keywords:
  - "Availability Groups [SQL Server], monitoring"
  - "Availability Groups [SQL Server], WSFC clusters"
  - "sys.dm_hadr_cluster_networks dynamic management view"
dev_langs:
  - "TSQL"
---
# sys.dm_hadr_cluster_networks (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Returns a row for every WSFC cluster member that is participating in an availability group's subnet configuration. You can use this dynamic management view to validate the network virtual IP that is configured for each availability replica.

Primary key:  `member_name` + `network_subnet_ip` + `network_subnet_prefix_length`

> **Tip:**  
> Beginning in  SQL Server 2014 (12.x)
, this dynamic management view supports Always On failover cluster instances (FCIs) in addition to availability groups (AGs).

| Column name | Data type | Description |
| --- | --- | --- |
| `member_name` | **nvarchar(128)** | A computer name of a node in the WSFC cluster. |
| `network_subnet_ip` | **nvarchar(48)** | Network IP address of the subnet to which the computer belongs. This can be an IPv4 or IPv6 address. |
| `network_subnet_ipv4_mask` | **nvarchar(45)** | Network subnet mask that specifies the subnet to which the IP address belongs. `network_subnet_ipv4_mask` to specify the DHCP `<network_subnet_option>` options in a WITH DHCP clause of the [CREATE AVAILABILITY GROUP](../../t-sql/statements/create-availability-group-transact-sql.md) or [ALTER AVAILABILITY GROUP](../../t-sql/statements/alter-availability-group-transact-sql.md) Transact-SQL  statement.<br /><br />NULL = IPv6 subnet. |
| `network_subnet_prefix_length` | **int** | Network IP prefix length that specifies the subnet to which the computer belongs. |
| `is_public` | **bit** | Whether the network is private or public on the WSFC cluster, one of:<br /><br />0 = Private<br />1 = Public |
| `is_ipv4` | **bit** | Type of the subnet, one of:<br /><br />1 = IPv4<br />0 = IPv6 |

## Remarks

In a Windows Server Failover Cluster (WSFC), the cluster columns display the Windows cluster details. In cases where there's no Windows cluster, such as [read-scale availability groups](../../database-engine/availability-groups/windows/read-scale-availability-groups.md), or [availability groups on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-availability-group-overview.md), columns related to the cluster might display data about an internal default cluster. These columns are for internal use only and can be disregarded.

## Permissions

For  SQL Server 2019 (15.x) 
 and previous versions, requires VIEW SERVER STATE permission on the server.

For  SQL Server 2022 (16.x) 
 and later versions, requires VIEW SERVER PERFORMANCE STATE permission on the server.

## Related content

- [Failover Clustering and Always On availability groups (SQL Server)](../../database-engine/availability-groups/windows/failover-clustering-and-always-on-availability-groups-sql-server.md)
- [Monitor Availability Groups (Transact-SQL)](../../database-engine/availability-groups/windows/monitor-availability-groups-transact-sql.md)
- [sys.dm_os_cluster_nodes (Transact-SQL)](sys-dm-os-cluster-nodes-transact-sql.md)
- [Querying the SQL Server System Catalog FAQ](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/system-catalog-views/querying-the-sql-server-system-catalog-faq.yml)
- [System catalog views (Transact-SQL)](../system-catalog-views/catalog-views-transact-sql.md)
