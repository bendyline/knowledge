---
title: vCore purchasing model
description: The vCore purchasing model lets you independently scale compute and storage resources, match on-premises performance, and optimize price for Azure SQL Managed Instance.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: sashan, moslake, vladiv, mathoma
ms.date: 05/19/2025
ms.service: azure-sql-managed-instance
ms.subservice: performance
ms.topic: concept-article
ms.custom:
  - sfi-image-nochange
  - ignite-2025
---
# vCore purchasing model - Azure SQL Managed Instance


  **Applies to:**    [Azure SQL Managed Instance](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

> 
> * [Azure SQL Database](../database/service-tiers-sql-database-vcore.md?view=azuresql-db&preserve-view=true)
> * [Azure SQL Managed Instance](service-tiers-managed-instance-vcore.md?view=azuresql-mi&preserve-view=true)

This article reviews the vCore purchasing model for [Azure SQL Managed Instance](sql-managed-instance-paas-overview.md). 

## Overview


A virtual core (vCore) represents a logical CPU and offers you the option to choose the physical characteristics of the hardware (for example, the number of cores, the memory, and the storage size). The vCore-based purchasing model gives you flexibility, control, transparency of individual resource consumption, and a straightforward way to translate on-premises workload requirements to the cloud. This model optimizes price, and allows you to choose compute, memory, and storage resources based on your workload needs.

In the vCore-based purchasing model, your costs depend on the choice and usage of:

- Service tier (Hyperscale, Business Critical, or General Purpose)
- Hardware configuration
- Compute resources (the number of vCores and the amount of memory)
- Reserved database storage
- Actual backup storage


The virtual core (vCore) purchasing model used by Azure SQL Managed Instance provides the following benefits: 

- Control over hardware configuration to better match the compute and memory requirements of the workload.
- Pricing discounts for [Azure Hybrid Benefit (AHB)](../azure-hybrid-benefit.md) and [Reserved Instance (RI)](../database/reservations-discount-overview.md).
- Greater transparency in the hardware details that power compute, helping facilitate planning for migrations from on-premises deployments.
- Higher scaling granularity with multiple compute sizes available.

## Compute

SQL Managed Instance compute provides a specific amount of compute resources that are continuously provisioned independent of workload activity, and bills for the amount of compute provisioned at a fixed price per hour.

Since three additional replicas are automatically allocated in the Business Critical service tier, the price is approximately 2.7 times higher than it is in the General Purpose service tier. Likewise, the higher storage price per GB in the Business Critical service tier reflects the higher IO limits and lower latency of the local SSD storage.

For instances in the General Purpose service tier, it's possible to save on compute and licensing costs by stopping your instance when you're not using it. Review [Stop and start an instance](instance-stop-start-how-to.md) to learn more. 

## Data and log storage

The following factors affect the amount of storage used for data and log files, and apply to General Purpose and Business Critical tiers. 

- In the General Purpose service tier, `tempdb` uses local SSD storage, and this storage cost is included in the vCore price.
- In the Business Critical service tier, `tempdb` shares local SSD storage with data and log files, and `tempdb` storage cost is included in the vCore price.
- The maximum storage size for a SQL Managed Instance must be specified in multiples of 32 GB.

> **Important:**
> In both service tiers, you are charged for the maximum storage size configured for a managed instance. 

To monitor total consumed instance storage size for SQL Managed Instance, use the *storage_space_used_mb* [metric](https://learn.microsoft.com/azure/azure-monitor/essentials/metrics-supported#microsoftsqlmanagedinstances). To monitor the current allocated and used storage size of individual data and log files in a database using T-SQL, use the [sys.database_files](https://learn.microsoft.com/sql/relational-databases/system-catalog-views/sys-database-files-transact-sql) view and the [FILEPROPERTY(... , 'SpaceUsed')](https://learn.microsoft.com/sql/t-sql/functions/fileproperty-transact-sql) function.

## Backup storage

Storage for database backups is allocated to support the capabilities of SQL Managed Instance. This storage is separate from data and log file storage, and is billed separately.

- [Point-in-time restore (PITR)](recovery-using-backups.md): The storage consumption depends on the rate of change of the database and the retention period configured for backups. You can configure a separate retention period for each database between 1 to 35 days for SQL Managed Instance. A backup storage amount equal to the configured maximum data size is provided at no extra charge.
- [Long-term retention (LTR)](../database/long-term-retention-overview.md):  You have the option to configure long-term retention of full backups for up to 10 years. The configuration you choose determines how much storage will be used for LTR backups. 


## <a id="compute-tiers"></a> Service tiers

The service tier generally defines the storage architecture, space and I/O limits, and business continuity options related to availability and disaster recovery.

Azure SQL Managed Instance has two service tiers: 
- General Purpose. You can choose to use the upgraded [Next-gen General Purpose service tier](service-tiers-next-gen-general-purpose-use.md).
- Business Critical. 

For a detailed comparison between service tiers, review [resource limits](resource-limits.md), but use the following table for a brief overview: 

|**Category**|**General Purpose**| **Next-gen General Purpose** | **Business Critical**|
|---|---|---|
|**Best for**|Most business workloads. Offers budget-oriented, balanced, and scalable compute and storage options. | Budget-oriented business workloads that need greater capacity, improved throughput, and resource flexibility. |Offers business applications the highest resilience to failures by using several isolated replicas, and provides the highest I/O performance.|
|**Max number of vCores** | 80 | 128 | 128| 
|**Max instance storage size**| 16 TB | 32 TB | 16 TB | 
|**Max databases per instance**| 100 | 500 | 100 | 
|**Read-only replicas**| 0 |0 |  1 | 
|**Replicas for availability**|Standby nodes for high availability| Standby nodes for high availability| Three high availability replicas, 1 is also a [read-scale replica](../database/read-scale-out.md) |
|**Pricing/billing**| [vCore, reserved storage, and backup storage](https://azure.microsoft.com/pricing/details/sql-database/managed/) is charged. <br/>IOPS is not charged| vCore, reserved storage, backup storage and IOPS (over the free quota) is charged. | [vCore, reserved storage, and backup storage](https://azure.microsoft.com/pricing/details/sql-database/managed/) is charged. <br/>IOPS is not charged. | 


> **Note:**
> For more information on the Service Level Agreement (SLA), see [SLA for Azure SQL Managed Instance](https://azure.microsoft.com/support/legal/sla/azure-sql-sql-managed-instance/). 


### General Purpose

The architectural model for the General Purpose service tier is based on a separation of compute and storage. This architectural model relies on the high availability and reliability of Azure Blob storage that transparently replicates database files and guarantees no data loss if underlying infrastructure failure happens.

The following figure shows four nodes in standard architectural model with the separated compute and storage layers.

Diagram showing the separation of compute and storage.

In the architectural model for the General Purpose service tier, there are two layers:

- A stateless compute layer that is running the `sqlservr.exe` process and contains only transient and cached data (for example – plan cache, buffer pool, columnstore pool). This stateless node is operated by Azure Service Fabric that initializes process, controls health of the node, and performs failover to another place if necessary.
- A stateful data layer with database files (.mdf/.ldf) that are stored in Azure Blob storage. Azure Blob storage guarantees that there will be no data loss of any record that is placed in any database file. Azure Storage has built-in data availability/redundancy that ensures that every record in log file or page in data file will be preserved even if the process crashes.

Whenever the database engine or operating system is upgraded, some part of underlying infrastructure fails, or if some critical issue is detected in the `sqlservr.exe` process, Azure Service Fabric will move the stateless process to another stateless compute node. There is a set of spare nodes that is waiting to run new compute service if a failover of the primary node happens in order to minimize failover time. Data in Azure storage layer is not affected, and data/log files are attached to newly initialized process. This process ensures [enterprise class SLA availability](https://www.microsoft.com/licensing/docs/view/Service-Level-Agreements-SLA-for-Online-Services?lang=1) by default. There can be performance impacts to heavy workloads that are in-flight due to transition time and the fact the new node starts with cold cache.

#### When to choose this service tier

The General Purpose service tier is the default service tier in Azure SQL Managed Instance designed for most of generic workloads. If you need a fully managed database engine with a default SLA and storage latency between 5 and 10 ms, the General Purpose tier is the option for you.

### Next-gen General Purpose

To get started, [use the Next-gen General Purpose service tier upgrade](service-tiers-next-gen-general-purpose-use.md) for eligible new and existing instances. 


The Next-gen General Purpose service tier is an architectural upgrade of the existing General Purpose service tier that offers the following key characteristics: 

- Designed for businesses with higher performance requirements while offering the same baseline cost as the General Purpose service tier 
- Support of up to **500 databases per instance**, and a max storage size of 32 TB
- Significant upgrades to performance, scalability and resource flexibility over the General Purpose service tier
- Uses [Elastic SAN](https://learn.microsoft.com/azure/storage/elastic-san/elastic-san-introduction) instead of page blobs, which drastically improve storage performance metrics 
- 3 free IOPS for every GB of reserved storage
- Scale your instance resources independently by manually adjusting vCores, memory, storage, and IOPS, such as by using the [Create Or Update REST API](https://learn.microsoft.com/rest/api/sql/managed-instances/create-or-update) or sliders in the Azure portal: 

   Screenshot of scaling your SQL managed instance resources independently in the Azure portal.

Because the Next-gen General Purpose service tier is an upgrade to the existing General Purpose service tier, your billing statement always reflects the *General Purpose* service tier. 

#### Architectural model

The Next-gen General Purpose service tier is an upgrade to the existing General Purpose service tier that uses an upgraded remote storage layer to store instance data and log files on Elastic SAN instead of page blobs. This upgrade offers faster storage latency, IOPS, and throughput than the existing General Purpose service tier, with increased limits to storage, the number of vCores, and the max number of databases. Additionally, since the performance quotas are shared by the whole instance, you no longer have to resize individual files to improve their performance. The baseline cost of the Next-gen General Purpose service tier is the same as the General Purpose service tier, but you can use sliders to increase your IO performance and memory to vCore ratio, which is then billed separately. 

The Next-gen General Purpose service tier supports [flexible memory](resource-limits.md#flexible-memory), which allows you to choose the amount of memory you want to allocate to your instance. This feature is a significant improvement over the General Purpose service tier, which has a fixed memory allocation based on the number of selected vCores. Flexible memory is generally available for locally redundant instances on Premium-series hardware. Flexible memory for zone-redundant Next-gen General Purpose instances on Premium-series hardware is currently in preview.

The Next-gen General Purpose service tier helps reduce cost by offering free IOPS at three IOPS for every GB of reserved storage. The price of the storage includes the minimum IOPS. If you go above the minimum, you're charged as follows: 1 IOPS = storage price (by region) divided by three. 

For example: 
- If 1 GB of storage costs 0.115, then 1 IOPS = 0.115/3 = 0.038 per IOPS. 
- A 1,024-GB instance receives 3,072 IOPS for free. You can choose to increase your IOPS up to the [VM limit](resource-limits.md#iops-and-throughput) for an additional cost. 

#### When to choose this service tier

Choose this service tier if your business is budget-oriented but the performance metrics and limits of the General Purpose service tier are insufficient. 

The key reasons why you should choose the Next-gen General Purpose service tier instead of the General Purpose tier are:

- Better performance for the same baseline cost
- Improved latency, throughput, and IOPS
- Greater storage capacity
- More flexibility for your compute 
- You need over 100 databases for a single instance 
- You need more than 16 TB of reserved storage


### Business Critical

The Business Critical service tier model is based on a cluster of database engine processes. This architectural model relies on a quorum of always available database engine nodes to minimize performance impacts to your workload, even during maintenance activities. Azure upgrades and patches the underlying operating system, drivers, and SQL Server database engine transparently, with minimal down-time for end users. 

In the Business Critical model, compute and storage is integrated on each node. Replication of data between database engine processes on each node of a four-node cluster achieves high availability, with each node using locally attached SSD as data storage. 

Diagram showing the cluster of database engine nodes.

Both the SQL Server database engine process and underlying .mdf/.ldf files are placed on the same node with locally attached SSD storage providing low latency to your workload. High availability is implemented using technology similar to SQL Server [Always On availability groups](https://learn.microsoft.com/sql/database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server). 

Every instance is a cluster of database engine nodes that contain copies of all the databases on an instance, with a primary database accessible for customer workloads, and three secondary databases containing copies of the data, ready for failover. The primary node constantly pushes changes to the secondary nodes in order to ensure the data is available on secondary replicas if the primary node fails for any reason. 

Failover is handled by the SQL Server database engine – one secondary replica becomes the primary node and a new secondary replica is created to ensure there are enough nodes in the cluster. The workload is automatically redirected to the new primary node.

In addition, the Business Critical cluster has a built-in [Read Scale-Out](../database/read-scale-out.md) capability that provides a free-of charge read-only replica used to run read-only queries (such as reports) that won't affect the performance of the workload on your primary replica.

### When to choose this service tier

The Business Critical service tier is designed for applications that require low-latency responses from the underlying SSD storage (1-2 ms in average), faster recovery if the underlying infrastructure fails, or need to off-load reports, analytics, and read-only queries to the free-of-charge readable secondary replica of the primary database.

The key reasons why you should choose Business Critical service tier instead of General Purpose tier are:

-  **Low I/O latency requirements** – workloads that need a fast response from the storage layer (1-2 milliseconds in average) should use Business Critical tier. 
-  **Workload with reporting and analytic queries** that can be redirected to the free-of-charge secondary read-only replica.
- **Higher resiliency and faster recovery from failures**. In case there is system failure, the databases on the primary instance are taken offline, and one of the secondary replicas will immediately become the new read-write primary instance, ready to process queries.  There is no need for the database engine to analyze and redo transactions from the log file or load data into memory buffers.
- **Advanced data corruption protection**. Since the Business Critical tier uses databases replicas behind the scenes, the service leverages automatic page repair available with [mirroring and availability groups](https://learn.microsoft.com/sql/sql-server/failover-clusters/automatic-page-repair-availability-groups-database-mirroring) to help mitigate data corruption. If a replica can't read a page due to a data integrity issue, a fresh copy of the page is retrieved from another replica, replacing the unreadable page without data loss or customer downtime. This functionality is available in  the General Purpose tier if the managed instance has geo-secondary replica.
- **Higher availability** - The Business Critical tier in a multi-availability zone configuration provides resiliency to zonal failures and a higher availability SLA.
- **Fast geo-recovery** - If a [failover group](failover-group-sql-mi.md) is configured, the Business Critical tier has a guaranteed Recovery Point Objective (RPO) of 5 seconds and Recovery Time Objective (RTO) of 30 seconds for 100% of deployed hours.

When specifying service tier in templates or scripts, tier is provided by using its name. The following table applies:

| Hardware | Name |
| :--- | :--- |
| General Purpose | GeneralPurpose |
| Business Critical | BusinessCritical |

## High availability

By default, Azure SQL Managed Instance achieves *availability* through local redundancy, making your instance available during maintenance operations, issues with data center outages, and other problems with the SQL database engine. However, to minimize a potential outage to an entire zone affecting your data, you can achieve *high availability* by enabling [zone redundancy](high-availability-sla-local-zone-redundancy.md). Without zone redundancy, failovers happen locally within the same data center, which might result in your instance being unavailable until the outage is resolved - the only way to recover is through a disaster recovery solution, such as through a [failover group](failover-group-sql-mi.md), or a [geo-restore](recovery-using-backups.md#geo-restore) of a geo-redundant backup.

## Hardware configurations

Hardware configuration options in the vCore model include standard-series (Gen5), premium-series, and memory optimized premium-series. Hardware configuration generally defines the compute and memory limits and other characteristics that affect workload performance.

For more information on the hardware configuration specifics and limitations, see [Hardware configuration characteristics](resource-limits.md#hardware-configuration-characteristics).

In the [sys.dm_user_db_resource_governance](https://learn.microsoft.com/sql/relational-databases/system-dynamic-management-views/sys-dm-user-db-resource-governor-azure-sql-database) dynamic management view, hardware generation for instances using Intel&reg; SP-8160 (Skylake) processors appears as Gen6, while hardware generation for instances using Intel&reg; 8272CL (Cascade Lake) appears as Gen7. The Intel&reg; 8370C (Ice Lake) CPUs used by premium-series and memory optimized premium-series hardware generations appear as Gen8. Resource limits for all standard-series (Gen5) instances are the same regardless of processor type (Broadwell, Skylake, or Cascade Lake).

### <a id="selecting-a-hardware-configuration"></a> Select a hardware configuration

You can select hardware configuration at the time of instance creation, or you can change hardware of an existing instance.

**To select hardware configuration when creating a SQL Managed Instance**

For detailed information, see [Create a SQL Managed Instance](instance-create-quickstart.md).

On the **Basics** tab, select the **Configure database** link in the **Compute + storage** section, and then select desired hardware:

Screenshot from the Azure portal showing where to configure SQL Managed Instance.

**To change hardware of an existing SQL Managed Instance**

#### [The Azure portal](#tab/azure-portal)

From the SQL Managed Instance page, select **Compute + storage** under **Settings**:

Screenshot from the Azure portal showing Compute + storage page for SQL managed instance.

On the **Compute + Storage** page, you can change your hardware under **Hardware generation** by using the sliders for vCores and Storage. 

#### [PowerShell](#tab/azure-powershell)

Use the following PowerShell script:

```powershell-interactive
Set-AzSqlInstance -Name "managedinstance1" -ResourceGroupName "ResourceGroup01" -ComputeGeneration Gen5
```

For more details, check [Set-AzSqlInstance](https://learn.microsoft.com/powershell/module/az.sql/set-azsqlinstance) command.

#### [The Azure CLI](#tab/azure-cli)

Use the following CLI command:

```azurecli-interactive
az sql mi update -g mygroup -n myinstance --family Gen5
```

For more details, check [az sql mi update](https://learn.microsoft.com/cli/azure/sql/mi#az-sql-mi-update) command.

---

When specifying hardware parameter in templates or scripts, hardware is provided by using its name. The following table applies:

| Hardware | Name |
| :--- | :--- |
| Standard-series (Gen5) | Gen5 |
| Premium-series | G8IM |
| Memory optimized premium-series | G8IH |

### SKU names

> **Note:**
> When specifying hardware and service tier in templates or scripts, you can specify them independently, or you can provide a SKU name. When specifying the SKU name, the following table applies:

| SKU | Service Tier | Hardware |
| :--- | :--- | :--- |
| GP_Gen5 | General Purpose | Standard-series |
| GP_G8IM | General Purpose | Premium-series |
| GP_G8IH | General Purpose | Premium-series memory-optimized |
| BC_Gen5 | Business Critical | Standard-series |
| BC_G8IM | Business Critical | Premium-series |
| BC_G8IH | Business Critical | Premium-series memory-optimized |

### Hardware availability

#### Standard-series (Gen5) and premium-series

Standard-series (Gen5) and premium-series hardware is available in all public regions worldwide.
  
For more information, see [Azure SQL Managed Instance resource limits](resource-limits.md#hardware-configuration-characteristics).


## Related content

- [Creating a SQL Managed Instance using the Azure portal](instance-create-quickstart.md)
- [Azure SQL Managed Instance single instance pricing page](https://azure.microsoft.com/pricing/details/azure-sql-managed-instance/single/)
- [Azure SQL Managed Instance pools pricing page](https://azure.microsoft.com/pricing/details/azure-sql-managed-instance/pools/)
- [vCore-based resource limits for Azure SQL Managed Instance](resource-limits.md)
- [Modifiable configuration reference for Azure SQL Managed Instance](modifiable-configuration-reference.md)
