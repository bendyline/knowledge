---
title: Requirements and Considerations for Azure NetApp Files Replication 
description: Understand the considerations and individual and shared requirements for configuring Azure NetApp Files cross-zone and cross-region replication. 
services: azure-netapp-files
author: b-ahibbard
ms.service: azure-netapp-files
ms.topic: concept-article
ms.date: 01/20/2026
ms.author: anfdocs
ms.custom: references_regions
---
# Requirements and considerations for Azure NetApp Files replication 

Before you configure [cross-zone or cross-region replication](replication.md), make sure that you understand the requirements for each option. 

If you use [cross-zone-region replication](replication.md#cross-zone-region-replication), you must adhere to all the requirements. 

## Shared requirements for cross-zone and cross-region replication 

* Azure NetApp Files replication is supported within a subscription and between subscriptions under the same tenant. 

* Azure NetApp Files replication uses the Azure backend infrastructure for the replication traffic. There's no need to set up VNet peering for enabling replication.

* Cross-zone and cross-region replication are supported with both Network File System (NFS) and Server Message Block (SMB) volumes.

    Replication of SMB volumes requires an Active Directory (AD) connection in the source and the destination NetApp accounts. The destination AD connection must have access to the Domain Name System (DNS) servers or the Active Directory Domain Services (AD DS) domain controllers that are reachable from the delegated subnet in the destination zone. For more information, see [Requirements for AD connections](create-active-directory-connections.md#requirements-for-active-directory-connections).

* To mount a dual-protocol volume, you must first [authorize replication from the source volume](cross-region-replication-create-peering.md#authorize-replication-from-the-source-volume), and the initial [transfer](cross-region-replication-display-health-status.md#display-replication-status) happens.

* Consult [resource limits](azure-netapp-files-resource-limits.md) for the maximum number of destination volumes that you can create. You can open a support ticket to [request a limit increase](azure-netapp-files-resource-limits.md#request-limit-increase) in the default quota of replication destination volumes for each subscription in a region.

* Cascading and fan-in topologies aren't supported. To learn about support for fan-out deployments, see [Configure cross-zone-region replication](cross-zone-region-replication-configure.md#requirements).

* Data replication volumes support [customer-managed keys](configure-customer-managed-keys.md).

* [Large volumes](large-volumes-requirements-considerations.md) are supported with cross-zone replication only with an hourly or daily replication schedule.

* After you establish replication, the replication process creates *SnapMirror® snapshots* to provide references between the source volume and the destination volume. SnapMirror snapshots cycle automatically when a new one is created for every incremental transfer. You can't delete SnapMirror snapshots until you delete the replication relationship and volume.

* The interface might take up to five minutes to reflect a newly added snapshot on the source volume.

* You can delete manual snapshots on the source volume of a replication relationship when the replication relationship is active or broken. You can also delete manual snapshots after you delete the replication relationship. You can't delete manual snapshots for the destination volume until you break the replication relationship.

## Cross-zone replication requirements and considerations

* The cross-zone replication feature uses the [availability zone volume placement feature](https://learn.microsoft.com/azure/reliability/reliability-netapp-files) of Azure NetApp Files.

* To establish cross-zone replication, you must [create the source volume in an availability zone](manage-availability-zone-volume-placement.md).

* To replicate to a destination volume in another NetApp account, the destination volume must be in a different zone than the source volume.

* The destination volume is read-only until you fail over to the destination zone to enable the destination volume for read and write. For more information about the failover process, see [Fail over to the destination volume](cross-region-replication-manage-disaster-recovery.md#fail-over-to-destination-volume).

    > **Important:**
    > Failover is a manual process. When you need to activate the destination volume (like when you want to fail over to the destination region), you first need to break replication peering and then mount the destination volume. For more information, see [Fail over to the destination volume](cross-region-replication-manage-disaster-recovery.md#fail-over-to-destination-volume).

* When you revert a source volume that has an active volume replication relationship, only snapshots dated more recently than the SnapMirror snapshot can be used in the revert operation. For more information, see [Revert a volume by using snapshot revert with Azure NetApp Files](snapshots-revert-volume.md).

* If the source volume's size exceeds 95% utilization, there's a risk that replication to the destination volume can fail. To prevent overfilling the destination volume, add 20% extra capacity when creating the data protection volume. To prevent overprovisioning, you can reduce the volume size after the initial replication completes.

## Cross-region replication requirements and considerations

* Azure NetApp Files replication is only available in specific fixed region pairs. For more information, see [Supported cross-region replication pairs](#supported-region-pairs).

* Cross-region replication requires a NetApp account in the destination region.

* The replication destination volume is read-only until you [fail over to the destination region](cross-region-replication-manage-disaster-recovery.md#fail-over-to-destination-volume) to enable the destination volume for read and write.

    > **Important:**
    > Failover is a manual process. When you need to activate the destination volume (like when you want to fail over to the destination region), you need to break replication peering and then mount the destination volume. For more information, see [Fail over to the destination volume](cross-region-replication-manage-disaster-recovery.md#fail-over-to-destination-volume).

    > **Important:**
    > A volume that has an active backup policy enabled can't be the destination volume in a reverse resync operation. You must suspend the backup policy on the volume before you start the reverse resync. You can resume the backup policy when the reverse resync completes.

* You can revert a source or destination volume of a cross-region replication to a snapshot if the snapshot is newer than the most recent SnapMirror snapshot. You can't use snapshots that are older than the SnapMirror snapshot for a volume revert operation. For more information, see [Revert a volume by using snapshot revert](snapshots-revert-volume.md).

* If you copy large datasets into a volume that has cross-region replication enabled and you have spare capacity in the capacity pool, you should set the replication interval to 10 minutes, increase the volume size to allow for the changes to be stored, and temporarily disable replication.

* If you use the cool access feature, understand the considerations in [Manage Azure NetApp Files storage with cool access](manage-cool-access.md#considerations).

* If the source volume's size exceeds 95% utilization, there's a risk that replication to the destination volume can fail. To prevent overfilling the destination volume, add 20% extra capacity when creating the data protection volume. To prevent overprovisioning, you can reduce the volume size after the initial replication completes.

### <a name="supported-region-pairs"></a>Supported cross-region replication pairs

Azure NetApp Files volume replication is supported between various [Azure regional pairs](https://learn.microsoft.com/azure/reliability/cross-region-replication-azure#paired-regions) and nonstandard pairs. Azure NetApp Files volume replication is currently available between the following regions. You can replicate Azure NetApp Files volumes from Regional Pair A to Regional Pair B and from Regional Pair B to Regional Pair A.

### Azure regional pairs

| Geography | Regional Pair A | Regional Pair B |
| :--- | :--- | :--- |
| Australia | Australia Central | Australia Central 2 |
| Australia | Australia East | Australia Southeast |
| Asia-Pacific | East Asia | Southeast Asia |
| Brazil | Brazil South | Brazil Southeast |
| Brazil/North America | Brazil South | South Central US |
| Canada | Canada Central | Canada East |
| Europe | North Europe | West Europe |
| Germany | Germany West Central | Germany North |
| India | Central India | South India |
| Japan | Japan East | Japan West |
| Korea | Korea Central | Korea South |
| North America | Central US | West US 3 |
| North America | East US | West US |
| North America | East US 2 | Central US |
| North America | North Central US | South Central US |
| North America | West US 3 | East US |
| Norway | Norway East | Norway West |
| Switzerland | Switzerland North | Switzerland West |
| UK | UK South | UK West |
| United Arab Emirates | UAE North | UAE Central |
| US Government | US Gov Arizona | US Gov Texas |
| US Government | US Gov Virginia | US Gov Texas |

### Azure regional nonstandard pairs

| Geography | Regional Pair A | Regional Pair B |
| :--- | :--- | :--- |
| Australia/Southeast Asia | Australia East | Southeast Asia |
| New Zealand/Australia  | New Zealand North  |  Australia East |
| Israel/Sweden | Israel Central | Sweden Central |
| Qatar/Europe | Qatar Central | West Europe |
| France/Europe | France Central | West Europe |
| France/Europe | France Central | North Europe |
| Germany/UK | Germany West Central | UK South |
| Germany/Europe | Germany West Central | West Europe |
| Germany/France | Germany West Central | France Central |
| Italy/Sweden | Italy North | Sweden Central |
| Malaysia/Southeast Asia  | Malaysia West | Southeast Asia |
| North America | Central US | East US |
| North America | East US | East US 2 |
| North America | East US | North Central US |
| North America | East US 2 | West US 2 |
| North America | East US 2 | West US 3 |
| North America | North Central US | East US 2 |
| North America | South Central US | East US |
| North America | South Central US | East US 2 |
| North America | South Central US | Central US |
| North America | West US 2 | East US |
| North America | West US 2 | West US 3 |
| Sweden/Germany | Sweden Central | Germany West Central |
| Spain/Sweden | Spain Central | Sweden Central |
| Sweden/Europe | Sweden Central | North Europe |
| Sweden/Europe | Sweden Central | West Europe |
| UAE/Sweden*    | UAE North | Sweden Central |
| UK/Europe | UK South | North Europe |
| US Government | US Gov Arizona | US Gov Virginia |

*Billing
> **Note:**
> During the initial rollout, your Azure bill may temporarily show cross-region replication charges for an alternative region pair while the final billing SKUs are being implemented. **There is no overbilling** - the cost shown is the same rate that will apply for **UAE North to Sweden Central** replication.

<br/><br/>

> **Note:**
> There can be a discrepancy in the size and number of snapshots between the source and the destination. This discrepancy is expected. Snapshot policies and replication schedules influence the number of snapshots. Snapshot policies and replication schedules, combined with the amount of data that changes between snapshots, influence the size of snapshots. For more information, see [Understand Azure NetApp Files snapshot-based data protection](snapshots-introduction.md).


## Next steps

* [Create volume replication](cross-region-replication-create-peering.md)
* [Create cross-zone replication relationships](create-cross-zone-replication.md)
* [Display health status of replication relationship](cross-region-replication-display-health-status.md)
* [Manage disaster recovery](cross-region-replication-manage-disaster-recovery.md)
* [Volume replication metrics](azure-netapp-files-metrics.md#replication)
* [Delete volume replications or volumes](cross-region-replication-delete.md)
* [Troubleshoot cross-region replication errors](troubleshoot-cross-region-replication.md)
* [Revert a volume by using snapshot revert with Azure NetApp Files](snapshots-revert-volume.md)
* [Test disaster recovery for Azure NetApp Files](test-disaster-recovery.md)
