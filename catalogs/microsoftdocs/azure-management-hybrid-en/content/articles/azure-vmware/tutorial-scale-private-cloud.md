---
title: Tutorial - Scale clusters in a private cloud
description: In this tutorial, you use the Azure portal to scale an Azure VMware Solution private cloud.
ms.topic: tutorial
ms.service: azure-vmware
ms.date: 04/30/2026
ms.custom:
  - engagement-fy23
  - sfi-image-nochange

#Customer intent: As a VMware administrator, I want to learn how to scale an Azure VMware Solution private cloud in the Azure portal.
# Customer intent: As a VMware administrator, I want to scale clusters and hosts in my Azure VMware Solution private cloud using the Azure portal, so that I can optimize performance and meet the requirements of my application workloads.
---

# Tutorial: Scale clusters in a private cloud

To get the most out of your Azure VMware Solution private cloud experience, scale the clusters and hosts to reflect what you need for planned workloads. You can scale the clusters and hosts in a private cloud as required for your application workload. You should address performance and availability limitations for specific services on a case-by-case basis.


<!-- Used in /azure/azure-resource-manager/management/azure-subscription-service-limits.md and concepts-networking.md -->

The following table describes the maximum limits for Azure VMware Solution.

| Resource | Limit |
| :--- | :--- |
| vSphere clusters per private cloud | 12 |
| Minimum number of ESXi hosts per cluster | 3 (hard limit) |
| Maximum number of ESXi hosts per cluster | 16 (hard limit) |
| Maximum number of ESXi hosts per private cloud | 96 |
| Maximum number of vCenter Servers per private cloud | 1 (hard limit) |
| Maximum number of HCX site pairings | 25 (any edition) |
| Maximum number of HCX service meshes | 10 (any edition) |
| Maximum number of Azure VMware Solution private clouds linked Azure ExpressRoute from a single location to a single virtual network gateway | 4<br />The virtual network gateway used determines the actual maximum number of linked private clouds. For more information, see [About ExpressRoute virtual network gateways](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/expressroute-about-virtual-network-gateways.md).<br />If you exceed this threshold, use [Azure VMware Solution interconnect](connect-multiple-private-clouds-same-region.md) to aggregate private cloud connectivity within the Azure region. |
| Maximum Azure VMware Solution ExpressRoute throughput | 10 Gbps (use Ultra Performance Gateway version with FastPath enabled)**<br />The virtual network gateway that's used determines the actual bandwidth. For more information, see [About ExpressRoute virtual network gateways](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/expressroute-about-virtual-network-gateways.md).<br />An Azure VMware Solution ExpressRoute doesn't have any port speed limitations and performs above 10 Gbps. Rates over 10 Gbps aren't guaranteed because of quality of service. |
| Maximum number of Azure Public IPv4 addresses assigned to NSX | 2,000 |
| Maximum number of Azure VMware Solution interconnects per private cloud | 10 |
| Maximum number of Azure ExpressRoute Global Reach connections per Azure VMware Solution private cloud | 8 |
| vSAN capacity limits | 75% of total usable (keep 25% available for service-level agreement) |
| VMware Site Recovery Manager: Maximum number of protected virtual machines | 3,000 |
| VMware Site Recovery Manager: Maximum number of virtual machines per recovery plan | 2,000 |
| VMware Site Recovery Manager: Maximum number of protection groups per recovery plan | 250 |
| VMware Site Recovery Manager: Recovery point objective (RPO) values | Five minutes or higher* (hard limit) |
| VMware Site Recovery Manager: Maximum number of virtual machines per protection group | 500 |
| VMware Site Recovery Manager: Maximum number of recovery plans | 250 |

\* For information about an RPO lower than 15 minutes, see [How the 5-minute RPO works](https://techdocs.broadcom.com/us/en/vmware-cis/live-recovery/vsphere-replication/8-8/vr-help-plug-in-8-8/replicating-virtual-machines/how-the-recovery-point-objective-affects-replication-scheduling.html#GUID-84FAF645-1C65-413D-A89B-70DBA0990631-en_TITLE_861C526B-20D8-401D-87CD-B3B454A94EC7) in the vSphere Replication Administration documentation.

\** This soft recommended limit can support higher throughput based on the scenario.

For other VMware-specific limits, use the [VMware by Broadcom configuration maximum tool](https://configmax.broadcom.com).


In this tutorial, learn how to use the Azure portal to:

> 
> * Add a cluster to an existing private cloud
> * Add hosts to an existing cluster

## Prerequisites

You need an existing private cloud to complete this tutorial. If you don't already have a private cloud created, follow the [create a private cloud tutorial](tutorial-create-private-cloud.md) to create one.

If you're planning to use the AV64 SKU, define a network for the management and control plane. In your Azure VMware Solution private cloud, under **Manage**, select **Clusters** > **Add a cluster**. Then add the **Address block for AV64 clusters** (one /23 network or three /25 networks) under the **Extended address block** tab and select **Save**.

   Screenshot showing how to add an AV64 extended address block to an Azure VMware Solution private cloud.

## Add a new cluster

1. In your Azure VMware Solution private cloud, under **Manage**, select **Clusters** > **Add a cluster**. Then select the required SKU from **Size of host** and specify the **Number of hosts** for the cluster. **Prices listed in image are for illustration only.**

We don't allow the mixing of AV36, AV36P, or AV52 SKUs within the same cluster. We only allow the addition of AV64 clusters to existing private clouds that are built with the AV36, AV36P, or AV52 SKUs in certain regions. [For more information](introduction.md#azure-vmware-solution-private-cloud-extension-with-av64-node-size).

   Screenshot showing how to add a cluster to an Azure VMware Solution private cloud.

2. The deployment of the new cluster begins.

## Delete an existing cluster

> **Caution:**
> Deleting a cluster terminates all running workloads and components and is an irreversible operation. Once you delete a cluster, you can't recover the data.

1. In your Azure VMware Solution private cloud, under **Manage**, select **Clusters**.

2. Select the **Cluster** you plan to delete, select **More** (...), select **Delete**.

   Screenshot showing how to delete a cluster to an Azure VMware Solution private cloud.

3. The deletion of the cluster begins.

## Scale a cluster - Host Addition

1. In your Azure VMware Solution private cloud, under **Manage**, select **Clusters**.

2. Select the cluster you want to scale, select **More** (...), then select **Edit**.

   Screenshot showing where to edit an existing cluster.

3. Select **Add Host** to add a host to the cluster. Repeat that action to reach the desired number of hosts, and then select **Save**.

   Screenshot showing how to add additional hosts to an existing cluster.

   The addition of hosts to the cluster begins.

   >**Note:** 
   >The hosts are added to the cluster in parallel.

## Scale a cluster - Host Removal

> **Note:**
> Scaling down a cluster successfully requires all objects (VM/vmdk/iso/etc) on a vSAN datastore to be configured with a storage policy lower or equal to [RAID level requirements](configure-storage-policy.md).
> Scaling down a cluster places requested hosts into maintenance mode before the removal of a host from vCenter inventory.
> Clusters can't be scaled down past the minimum requirement of three hosts per cluster. 

1. In your Azure VMware Solution private cloud, under **Manage**, select **Clusters**.

2. Select the cluster you want to scale down, select **More** (...), then select **Edit**.

   Screenshot showing where to edit an existing cluster.

3. Select the host you want to remove, select **More** (...), select **Delete**, then select **Save**.

   Screenshot showing how to remove a host from an existing cluster.

   The removal of a host from the cluster begins.


## Next steps

If you require another Azure VMware Solution private cloud, [create another private cloud](tutorial-create-private-cloud.md) following the same networking prerequisites, cluster, and host limits.

<!-- LINKS - external-->

<!-- LINKS - internal -->
