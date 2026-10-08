---
title: View Always On failover cluster instances
description: In this article, you learn how you can view and manage SQL Server instances enabled by Azure Arc that are configured as a failover cluster.
author: AbdullahMSFT
ms.author: amamun 
ms.reviewer: randolphwest
ms.date: 05/08/2024
ms.topic: how-to
ms.custom: sfi-image-nochange
---

# View Always On failover cluster instances in Azure Arc


**Applies to:**
 

](../sql-docs-navigation-guide.md#applies-to)
 

Azure portal provides information about SQL Server failover cluster instances when they are enabled by Azure Arc. The Azure SQL extension agent must be installed on all the nodes of the SQL Server failover cluster instance. The agents project the installation into Azure as a SQL Server enabled by Azure Arc resource.

For details about failover cluster instances, review [Always On failover cluster instances (SQL Server)](../failover-clusters/windows/always-on-failover-cluster-instances-sql-server.md).

> **Important:**
> 
To view the latest features, make sure the server resource has the latest extension. The latest extension information is published at [Release notes - SQL Server enabled by Azure Arc](release-notes.md). To update extensions, follow the instructions at either of these locations:

- [Upgrade extensions - portal](https://learn.microsoft.com/azure/azure-arc/servers/manage-vm-extensions-portal#upgrade-extensions)
- [Upgrade extensions - CLI](https://learn.microsoft.com/azure/azure-arc/servers/manage-vm-extensions-cli#upgrade-extensions)


You can see all the resources like network name, databases and all the nodes in the corresponding resource group.  

## List failover cluster instances

In Azure portal, **Azure Arc | SQL Server instances** lists all instances of SQL Server that are enabled by Azure Arc.

To list only the failover cluster instances:

1. Select **Add filter**.
1. Set **Filter** to *SQL Server instance type* equals **Failover Cluster Instance**.
1. Select **Apply**.

   Screenshot of Azure portal for Azure Arc SQL Server add filter control.

The portal returns only the failover cluster instances.

## View failover cluster instance

To view the properties of a failover cluster instance:

1. Select a **SQL Server - Azure Arc** resource that is a failover cluster instance type.
1. Select **Overview**.
1. Review the properties under **Essentials**.

   Screenshot of Azure portal for failover cluster instance enabled by Azure Arc.

### Inventory upload state

The portal describes the failover cluster instance state. For example:

- Instance name
  - Default instance `<NetworkName>`
  - Named instance `<NetworkName>_<InstanceName>`
- Instance type
- Network name
- Active nodes
- Passive nodes

Information reflects the state at **Inventory upload** time. The view doesn't reflect changes or failovers after that time. The next upload will show the new active node or the updates made. Information upload is scheduled hourly.

## View databases

To view the databases on a failover cluster instance:

1. Browse to the resource - either `<NetworkName>` or `<NetworkName>_<InstanceName>`.
1. Select **Data management** > **Database**.

The portal displays the databases on the SQL Server instance.

## Limitations

- All the Windows and SQL Server instances that are part of the failover clustering should be in same resource group.
- Always On availability groups on a failover cluster instance aren't supported for 
 SQL Server 
 enabled by Azure Arc at this time.
- Currently, best practices assessment isn't supported with Always On failover cluster instance.
- Automated backups and point-in-time restore isn't supported for failover cluster instances at this time.
- SQL failover cluster instances with multiple network names aren't supported at this time.
- In the local Windows Server Failover Cluster (WSFC), the clustered resource group (role) name should not contain a backslash ("\\").
- For extension versions older than `1.1.2620.127`, SQL failover cluster instances with a different network name than the one configured during installation aren't supported.

## Related tasks

- [View SQL Azure Arc inventory](view-inventory.md)
