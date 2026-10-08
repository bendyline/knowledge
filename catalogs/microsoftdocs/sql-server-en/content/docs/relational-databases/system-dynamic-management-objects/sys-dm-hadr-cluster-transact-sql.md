---
title: "sys.dm_hadr_cluster (Transact-SQL)"
description: Returns a row that exposes the cluster name and information about the quorum. If the WSFC node has no quorum, no row is returned.
author: rwestMSFT
ms.author: randolphwest
ms.date: 10/17/2023
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "sys.dm_hadr_cluster"
  - "dm_hadr_cluster_HADR"
  - "sys.dm_hadr_cluster_TSQL"
  - "dm_hadr_cluster"
helpviewer_keywords:
  - "Availability Groups [SQL Server], monitoring"
  - "sys.dm_hadr_cluster catalog view"
  - "Availability Groups [SQL Server], WSFC clusters"
dev_langs:
  - "TSQL"
---
# sys.dm_hadr_cluster (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

If the Windows Server Failover Clustering (WSFC) node that hosts an instance of  SQL Server 
 that is enabled for  Always On availability groups 
 has WSFC quorum, `sys.dm_hadr_cluster` returns a row that exposes the cluster name and information about the quorum. If the WSFC node has no quorum, no row is returned.

> **Tip:**  
> Beginning in  SQL Server 2014 (12.x)
, this dynamic management view supports failover cluster instances (FCIs) in addition to availability groups (AGs).

| Column name | Data type | Description |
| --- | --- | --- |
| `cluster_name` | **nvarchar(128)** | Name of the WSFC cluster that hosts the instances of  SQL Server |
 | that are enabled for  Always On availability groups |
| . |
| `quorum_type` | **tinyint** | Type of quorum used by this WSFC cluster, one of:<br /><br />0 = Node Majority. This quorum configuration can sustain failures of half the nodes (rounding up) minus one. For example, on a seven node cluster, this quorum configuration can sustain three node failures.<br /><br />1 = Node and Disk Majority. If the disk witness remains on line, this quorum configuration can sustain failures of half the nodes (rounding up). For example, a six node cluster in which the disk witness is online could sustain three node failures. If the disk witness goes offline or fails, this quorum configuration can sustain failures of half the nodes (rounding up) minus one. For example, a six node cluster with a failed disk witness could sustain two (3-1=2) node failures.<br /><br />2 = Node and File Share Majority. This quorum configuration works in a similar way to Node and Disk Majority, but uses a file-share witness instead of a disk witness.<br /><br />3 = No Majority: Disk Only. If the quorum disk is online, this quorum configuration can sustain failures of all nodes except one.<br /><br />4 = Unknown Quorum. Unknown Quorum for the cluster.<br /><br />5 = Cloud Witness. Cluster utilizes Microsoft Azure for quorum arbitration. If the cloud witness is available, the cluster can sustain the failure of half the nodes (rounding up). |
| `quorum_type_desc` | **varchar(50)** | Description of `quorum_type`, one of:<br /><br />NODE_MAJORITY<br />NODE_AND_DISK_MAJORITY<br />NODE_AND_FILE_SHARE_MAJORITY<br />NO_MAJORITY:_DISK_ONLY<br />UNKNOWN_QUORUM<br />CLOUD_WITNESS |
| `quorum_state` | **tinyint** | State of the WSFC quorum, one of:<br /><br />0 = Unknown quorum state<br />1 = Normal quorum<br />2 = Forced quorum |
| `quorum_state_desc` | **varchar(50)** | Description of `quorum_state`, one of:<br /><br />UNKNOWN_QUORUM_STATE<br />NORMAL_QUORUM<br />FORCED_QUORUM |

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
- [sys.dm_hadr_cluster_members (Transact-SQL)](sys-dm-hadr-cluster-members-transact-sql.md)
