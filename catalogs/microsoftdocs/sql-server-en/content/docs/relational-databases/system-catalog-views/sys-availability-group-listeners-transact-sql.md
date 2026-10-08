---
title: "sys.availability_group_listeners (Transact-SQL)"
description: sys.availability_group_listeners returns a row for each availability group listener configuration in the WSFC cluster.
author: rwestMSFT
ms.author: randolphwest
ms.date: 02/05/2026
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "availability_group_listeners_TSQL"
  - "sys.availability_group_listeners"
  - "sys.availability_group_listeners_TSQL"
  - "availability_group_listeners"
helpviewer_keywords:
  - "Availability Groups [SQL Server], monitoring"
  - "sys.availability_group_listeners catalog view"
  - "Availability Groups [SQL Server], listeners"
dev_langs:
  - "TSQL"
---
# sys.availability_group_listeners (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

For each Always On availability group, returns either zero rows indicating that no network name is associated with the availability group, or returns a row for each availability-group listener configuration in the Windows Server Failover Clustering (WSFC) cluster. This view displays the real-time configuration gathered from cluster.

> **Note:**  
> This catalog view doesn't describe details of an IP configuration that was defined in the WSFC cluster.

| Column name | Data type | Description |
| --- | --- | --- |
| **group_id** | **uniqueidentifier** | Availability group ID (**group_id**) from [sys.availability_groups](sys-availability-groups-transact-sql.md). |
| **listener_id** | **nvarchar(36)** | GUID from the cluster resource ID. |
| **dns_name** | **nvarchar(63)** | Configured network name (hostname) of the availability group listener. |
| **port** | **int** | The TCP port number configured for the availability group listener.<br /><br />NULL = Listener was configured outside  SQL Server |
 | and its port number hasn't been added to the availability group. To add the port, use the MODIFY LISTENER option of the [ALTER AVAILABILITY GROUP](../../t-sql/statements/alter-availability-group-transact-sql.md) Transact-SQL  statement. |
| **is_conformant** | **bit** | Whether this IP configuration is conformant, one of:<br /><br />1 = Listener is conformant. Only "OR" relations exist among its Internet Protocol (IP) addresses. *Conformant* encompasses every an IP configuration that was created by the [CREATE AVAILABILITY GROUP](../../t-sql/statements/create-availability-group-transact-sql.md) Transact-SQL  statement. In addition, if an IP configuration that was created outside of  SQL Server |
| , for example by using the WSFC Failover Cluster Manager, but can be modified by the ALTER AVAILABILITY GROUP tsql statement, the IP configuration qualifies as conformant.<br /><br />0 = Listener is nonconformant. Typically, this indicates an IP address that couldn't be configured by using  SQL Server |
 | commands and, instead, was defined directly in the WSFC cluster. |
| **ip_configuration_string_from_cluster** | **nvarchar(max)** | Cluster IP configuration strings, if any, for this listener. NULL = Listener has no virtual IP addresses. For example:<br /><br />IPv4 address: `65.55.39.10`.<br /><br />IPv6 address: `2001::4898:23:1002:20f:1fff:feff:b3a3` |
| **is_distributed_network_name** | **bit** | **Applies to**:  SQL Server 2019 (15.x) |
 | CU8 and later,  SQL Server 2017 (14.x) |
 | CU25 and later,  SQL Server 2016 (13.x) |
 | SP3 and later<br /><br />This column indicates the listener is a distributed network name (DNN) listener if value set to 1. For more information, see [Configure a DNN listener for an availability group](https://learn.microsoft.com/azure/azure-sql/virtual-machines/windows/availability-group-distributed-network-name-dnn-listener-configure) |

## Security

### Permissions

The visibility of the metadata in catalog views is limited to securables that a user either owns, or on which the user was granted some permission.
 For more information, see [Metadata Visibility Configuration](../security/metadata-visibility-configuration.md).

#### Permissions for SQL Server 2022 and later

Requires VIEW SERVER PERFORMANCE STATE permission on the server.

## Related content

- [Always On availability groups dynamic management views and functions](../system-dynamic-management-objects/always-on-availability-groups-dynamic-management-views-functions.md)
- [Always On Availability Groups Catalog Views (Transact-SQL)](always-on-availability-groups-catalog-views-transact-sql.md)
- [Monitor Availability Groups (Transact-SQL)](../../database-engine/availability-groups/windows/monitor-availability-groups-transact-sql.md)
- [What is an Always On availability group?](../../database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server.md)
