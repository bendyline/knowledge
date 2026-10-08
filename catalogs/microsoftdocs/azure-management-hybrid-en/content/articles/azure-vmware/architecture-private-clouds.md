---
title: Architecture for Private Clouds and Clusters
description: Understand the key capabilities of Azure VMware Solution software-defined datacenters and VMware vSphere clusters. 
ms.topic: concept-article
ms.service: azure-vmware
ms.date: 8/14/2025
ms.custom: engagement-fy23, references_regions
# Customer intent: As a cloud architect, I want to understand the capabilities and architecture of private clouds and VMware clusters within Azure, so that I can effectively design and manage scalable deployments aligned with my organization's needs.
---

# Azure VMware Solution private cloud and cluster concepts

Azure VMware Solution provides VMware-based private clouds in Azure. The private cloud hardware and software deployments are fully integrated and automated in Azure. Deploy and manage the private cloud through the Azure portal, the Azure CLI, or PowerShell.

A private cloud includes clusters with:

- Dedicated bare-metal server hosts provisioned with VMware vSphere Hypervisor (ESXi).
- VMware vCenter Server for managing ESXi and vSAN.
- VMware NSX software-defined networking for vSphere workload virtual machines (VMs).
- VMware vSAN datastore for vSphere workload VMs.
- VMware HCX for workload mobility.
- Resources in the Azure underlay (required for connectivity and to operate the private cloud).

Private clouds are installed and managed within an Azure subscription. The number of private clouds within a subscription is scalable. Initially, there's a limit of one private cloud per subscription. There's a logical relationship between Azure subscriptions, Azure VMware Solution private clouds, vSAN clusters, and hosts.

The following diagram describes the architectural components of Azure VMware Solution.

Diagram that shows a single Azure subscription that contains two private clouds for development and production environments.

Each Azure VMware Solution architectural component has the following function:

- **Azure subscription**: Provides controlled access, budget, and quota management for Azure VMware Solution.
- **Azure region**: Groups datacenters into availability zones and then groups availability zones into regions.
- **Azure resource group**: Places Azure services and resources into logical groups.
- **Azure VMware Solution private cloud**: Offers compute, networking, and storage resources by using VMware software, including vCenter Server, NSX software-defined networking, vSAN software-defined storage, and Azure bare-metal ESXi hosts. Azure NetApp Files, Azure Elastic SAN, and Pure Cloud Block Store are also supported.
- **Azure VMware Solution resource cluster**: Provides compute, networking, and storage resources for customer workloads by scaling out the Azure VMware Solution private cloud by using VMware software, including vSAN software-defined storage and Azure bare-metal ESXi hosts. Azure NetApp Files, Elastic SAN, and Pure Cloud Block Store are also supported.
- **VMware HCX**: Delivers mobility, migration, and network extension services.
- **VMware Site Recovery**: Automates disaster recovery and storage replication services with VMware vSphere Replication. Non-Microsoft disaster recovery solutions Zerto disaster recovery and JetStream Software disaster recovery are also supported.
- **Dedicated Microsoft Enterprise Edge**: Router that connects Azure Cloud Services and the Azure VMware Solution private cloud instance.
- **Azure Virtual Network**: Connects Azure services and resources together.
- **Azure Route Server**: Exchanges dynamic route information with Azure networks.
- **Azure Virtual Network gateway**: Connects Azure services and resources to other private networks by using IPSec virtual private network, Azure ExpressRoute, and virtual network to virtual network.
- **Azure ExpressRoute**: Provides high-speed private connections between Azure datacenters and on-premises or colocation infrastructure.
- **Azure Virtual WAN**: Combines networking, security, and routing functions into a single unified wide area network (WAN).

## Hosts


<!-- Used in plan-private-cloud-deployment.md and concepts-private-cloud-clusters.md -->

Azure VMware Solution clusters are based on a hyperconverged infrastructure. The following table shows the CPU, memory, disk, and network specifications of the host.

| Host type | CPU (cores/GHz) | RAM (GB) | vSAN Architecture | vSAN cache tier (TB, raw***) | vSAN capacity tier (TB, raw***) | Regional availability |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| AV36 | Dual Intel Xeon Gold 6140 CPUs (Skylake microarchitecture) with 18 cores/CPU @ 2.3 GHz, Total 36 physical cores (72 logical cores with hyperthreading) | 576 | OSA | 3.2 (NVMe) | 15.20 (SSD) | Selected regions (*) |
| AV36P | Dual Intel Xeon Gold 6240 CPUs (Cascade Lake microarchitecture) with 18 cores/CPU @ 2.6 GHz / 3.9 GHz Turbo, Total 36 physical cores (72 logical cores with hyperthreading) | 768 | OSA | 1.5 (Intel Cache) | 19.20 (NVMe) | Selected regions (*) |
| AV48 | Dual Intel Xeon Gold 6442Y CPUs (Sapphire Rapids microarchitecture) with 24 cores/CPU @ 2.6 GHz / 4.0 GHz Turbo, Total 48 physical cores (96 logical cores with hyperthreading) | 1,024 | ESA | N/A | 25.6 (NVMe) | Selected regions (*) |
| AV52 | Dual Intel Xeon Platinum 8270 CPUs (Cascade Lake microarchitecture) with 26 cores/CPU @ 2.7 GHz / 4.0 GHz Turbo, Total 52 physical cores (104 logical cores with hyperthreading) | 1,536 | OSA | 1.5 (Intel Cache) | 38.40 (NVMe) | Selected regions (*) |
| AV64 | Dual Intel Xeon Platinum 8370C CPUs (Ice Lake microarchitecture) with 32 cores/CPU @ 2.8 GHz / 3.5 GHz Turbo, Total 64 physical cores (128 logical cores with hyperthreading) | 1,024 | OSA / ESA**** | 3.84 (NVMe) / N/A**** | 15.36 (NVMe) / 19.25 (NVMe)**** | Selected regions (**) |

An Azure VMware Solution cluster requires a minimum number of three hosts. You can use hosts of the same type only in a single Azure VMware Solution private cloud. Hosts used to build or scale clusters come from an isolated pool of hosts. Those hosts passed hardware tests and had all data securely deleted before being added to a cluster.

All of the preceding host types have 100-Gbps network interface throughput.

*Details are available via the Azure pricing calculator.

**AV64 prerequisite: An Azure VMware Solution private cloud deployed with AV36, AV36P, AV48, or AV52 is required before adding AV64.

***Raw is based on [International Standard of Units (SI)](https://en.wikipedia.org/wiki/International_System_of_Units) reported by disk manufacturers. Example: 1 TB Raw = 1000000000000 bytes. Space calculated by a computer in binary (1 TB binary = 1099511627776 bytes binary) equals 931.3 gigabytes converted from the raw decimal.

****ESA applies to AV64 Gen 2 deployments. 


## Azure region availability zone to host type mapping table

When you plan your Azure VMware Solution design, use the following table to understand what host types are available in each physical availability zone of an [Azure region](https://azure.microsoft.com/explore/global-infrastructure/geographies/#geographies).

>**Important:**
> This mapping is important for placing your private clouds in close proximity to your Azure native workloads, including integrated services such as Azure NetApp Files and Pure Cloud Block Store.

The capability for Azure VMware Solution stretched clusters to deploy resources in multiple availability zones (Multi-AZ) is also tagged in the following table. The customer quota for Azure VMware Solution is assigned by Azure region. You can't specify the availability zone during private cloud provisioning. An autoselection algorithm is used to balance deployments across the Azure region.

If you have a particular availability zone to which you want to deploy, open a [Service Request](https://rc.portal.azure.com/#create/Microsoft.Support) with Microsoft. Request a "special placement policy" for your subscription, Azure region, availability zone, and host type. This policy remains in place until you request it to be removed or changed.

Host types marked in bold type are of limited availability because of customer consumption and might not be available upon request. Use the AV64 host type when AV36, AV36P, or AV52 host types are limited.

AV64 host types are available per availability zone. The following table lists the Azure regions that support this host type. For RAID-6 FTT2 and RAID-1 FTT3 storage policies, six and seven fault domains are needed, respectively. The fault domain count for each Azure region is listed in the column labeled **AV64 fault domains supported**.

| Azure region | Availability zone | Host type | Multi-AZ SDDC | AV64 fault domains supported |
| :--- | :---: | :---: | :---: | :---: |
| Australia East | AZ01 | AV36P, AV64 | Yes | 7 |
| Australia East | AZ02 | AV36, AV64 | Yes | 7 |
| Australia East | AZ03 | AV36P, AV64 | Yes | 7 |
| Australia Southeast | AZ01 | AV36 | No | N/A |
| Brazil South | AZ02 | AV36, AV64 | No | 7 |
| Canada Central | AZ02 | AV36, **AV36P**, AV64 | No | 7 |
| Canada East | N/A | AV36, **AV64** | No | 7 |
| Central India | AZ03 | **AV36P**, AV48, AV64 | No | 7 |
| Central US | AZ01 | **AV36P**, AV64 | No | 7 |
| Central US | AZ02 | AV36, AV64 | No | 7 |
| Central US | AZ03 | AV36P, AV64 | No | 7 |
| East Asia | AZ01 | AV36, AV64 | No | 7 |
| East Asia | AZ02 | AV36P | No | N/A |
| East US | AZ01 | **AV36P**, AV64 | Yes | 7 |
| East US | AZ02 | AV36P, AV64 | Yes | 7 |
| East US | AZ03 | AV36, **AV36P**, AV64 | Yes | 7 |
| East US 2 | AZ01 | **AV36**, AV64 | No | 7 |
| East US 2 | AZ02 | AV36P, AV52, **AV64** | No | 7 |
| East US 2 | AZ03 | **AV36P**, **AV64** | No | 7 |
| France Central | AZ01 | AV36, AV64 | No | 7 |
| Germany West Central | AZ01 | AV36P, AV64 | Yes | 7 |
| Germany West Central | AZ02 | **AV36**, AV48, AV64 | Yes | 7 |
| Germany West Central | AZ03 | AV36, **AV36P**, AV48, AV64 | Yes | 7 |
| Italy North | AZ03 | AV36P, AV64 | No | 7 |
| Japan East | AZ02 | **AV36**, **AV36P**, AV64 | No | 7 |
| Japan East | AZ03 | AV36P, AV48 | No | N/A |
| Japan West | AZ01 | **AV36**, AV64 | No | 7 |
| Japan West | AZ02 | AV36P | No | N/A |
| Korea Central | AZ02 | AV48 | No | N/A |
| Korea Central | AZ03 | AV48 | No | N/A |
| North Central US | AZ01 | AV36, AV64 | No | 7 |
| North Central US | AZ02 | **AV36P**, AV64 | No | 7 |
| North Europe | AZ02 | **AV36**, AV64 | No | 7 |
| Qatar Central | AZ03 | **AV36P** (AV64 Planned Q4 2025) | No | N/A (7 Planned Q4 2025) |
| South Africa North | AZ01 | AV48, AV64 | No | 7 |
| South Africa North | AZ03 | AV36, AV64 | No | 7 |
| South Central US | AZ01 | AV36, AV64 | No | 7 |
| South Central US | AZ02 | AV36, AV36P, AV52, AV64 | No | 7 |
| Southeast Asia | AZ01 | AV36P | No | N/A |
| Southeast Asia | AZ02 | AV36 | No | N/A |
| Spain Central | AZ01 | AV48 | No | N/A |
| Spain Central | AZ03 | AV48 | No | N/A |
| Sweden Central | AZ01 | AV36, AV64 | No | 7 |
| Sweden Central | AZ03 | AV48 | No | N/A |
| Switzerland North | AZ01 | **AV36**, AV64 | No | 7 |
| Switzerland North | AZ03 | AV36P, AV64 | No | 7 |
| Switzerland West | AZ01 | **AV36**, AV64 | No | 7 |
| UAE North | AZ02 | AV48 | No | N/A |
| UAE North | AZ03 | AV36P, AV64 | No | 7 |
| UK South | AZ01 | AV36, AV36P, AV52, AV64 | Yes | 7 |
| UK South | AZ02 | AV36, AV64 | Yes | 7 |
| UK South | AZ03 | AV36P, **AV64** | Yes | 7 |
| UK West | AZ01 | **AV36**, AV64 | No | 7 |
| West Europe | AZ01 | **AV36**, AV36P, AV52, AV64 | Yes | 7 |
| West Europe | AZ02 | **AV36**, AV64 | Yes | 7 |
| West Europe | AZ03 | AV36P, AV64 | Yes | 7 |
| West US | AZ01 | AV36, AV36P, AV64 | No | 7 |
| West US 2 | AZ01 | AV36, AV64 | No | 7 |
| West US 2 | AZ02 | **AV36P**, AV64 | No | 7 |
| West US 2 | AZ03 | AV48 | No | N/A |
| West US 3 | AZ01 | AV36P, AV64 | No | 7 |
| US Gov Arizona | AZ02 | AV36P, AV48 | No | N/A |
| US Gov Virginia | AZ03 | AV36, AV48 | No | N/A |

## Clusters


<!-- Used in plan-private-cloud-deployment.md and concepts-private-clouds-clusters.md -->

For each private cloud created, there's one vSAN cluster by default. You can add, delete, and scale clusters. The minimum number of hosts per cluster and the initial deployment is three.

You use vCenter Server and NSX Manager to manage most aspects of cluster configuration and operation. All local storage of each host in a cluster is under the control of VMware vSAN.

Azure VMware Solution configures each cluster for n+1 availability through vSphere High Availability percentage-based admission control to protect workloads from the failure of a single node. `Cluster-1` of each Azure VMware Solution private cloud has a resource pool based on vSphere Distributed Resource Scheduler (`MGMT-ResourcePool`). The pool is configured for the management and control plane components (vCenter Server, NSX Manager cluster, NSX Edges, HCX Manager add-on, Site Recovery Manager add-on, and vSphere Replication add-on).

`MGMT-ResourcePool` is configured to reserve 46 GHz CPU and 171.88-GB memory, which you can't change. For a three-node cluster, two nodes are dedicated to customer workloads, excluding the `MGMT-ResourcePool` CPU and memory resources reserved for management and control. One node of resources is held in reserve to protect against node failure. Azure VMware Solution stretched clusters use an admission control policy that's based on n+2 availability vSphere High Availability percentages.

The Azure VMware Solution management and control plane have the following resource requirements. They must be accounted for during solution sizing of a *standard private cloud*.

| Area | Description | Provisioned vCPUs | Provisioned vRAM (GB) | Provisioned vDisk (GB) | Typical CPU usage (GHz) | Typical vRAM usage (GB) | Typical raw vSAN datastore usage (GB) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| VMware vSphere | vCenter Server | 8 | 30 | 915 | 1.5 | 3.3 | 1,830 |
| VMware vSphere | vSphere Cluster Service VM 1 | 1 | 0.1 | 2 | 0.1 | 0.1 | 1 |
| VMware vSphere | vSphere Cluster Service VM 2 | 1 | 0.1 | 2 | 0.1 | 0.1 | 1 |
| VMware vSphere | vSphere Cluster Service VM 3 | 1 | 0.1 | 2 | 0.1 | 0.1 | 1 |
| VMware vSphere | ESXi node 1 | N/A | N/A | N/A | 2.4 | 48 | N/A |
| VMware vSphere | ESXi node 2 | N/A | N/A | N/A | 2.4 | 48 | N/A |
| VMware vSphere | ESXi node 3 | N/A | N/A | N/A | 2.4 | 48 | N/A |
| VMware vSAN | vSAN System Usage | N/A | N/A | N/A | N/A | N/A | 12,441 |
| VMware NSX | NSX Unified Appliance Node 1 | 6 | 24 | 300 | 3.4 | 13.9 | 613 |
| VMware NSX | NSX Unified Appliance Node 2 | 6 | 24 | 300 | 3.4 | 13.9 | 613 |
| VMware NSX | NSX Unified Appliance Node 3 | 6 | 24 | 300 | 3.4 | 13.9 | 613 |
| VMware NSX | NSX Edge VM 1 | 8 | 32 | 196 | 1.4 | 0.7 | 401 |
| VMware NSX | NSX Edge VM 2 | 8 | 32 | 196 | 1.4 | 0.7 | 401 |
| VMware HCX (optional add-on) | HCX Manager | 4 | 12 | 64 | 0.4 | 2.8 | 174 |
| VMware Site Recovery Manager (optional add-on) | Site Recovery Manager appliance | 4 | 12 | 33 | 1 | 1 | 66 |
| VMware vSphere (optional add-on) | vSphere Replication Manager appliance | 4 | 12 | 33 | 1 | 3.1 | 66 |
| VMware vSphere (optional add-on) | vSphere Replication Server appliance | 2 | 1 | 33 | 1 | 0.8 | 66 |
|  | Total | 59 vCPUs | 203.3 GB | 2,376 GB | 25.4 GHz | 198.3 GB | 17,287 GB (15,401 GB with data reduction ratio) |

The Azure VMware Solution management and control plane have the following resource requirements that you must account for during solution sizing of a *stretched clusters private cloud*. VMware Site Recovery Manager isn't included in the table because currently it isn't supported. The vSAN Witness appliance isn't included in the table either. Microsoft manages it in the third availability zone.

| Area | Description | Provisioned vCPUs | Provisioned vRAM (GB) | Provisioned vDisk (GB) | Typical CPU usage (GHz) | Typical vRAM usage (GB) | Typical raw vSAN datastore usage (GB) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| VMware vSphere | vCenter Server | 8 | 30 | 915 | 1.1 | 3.9 | 3,662 |
| VMware vSphere | vSphere Cluster Service VM 1 | 1 | 0.1 | 2 | 0.1 | 0.1 | 1 |
| VMware vSphere | vSphere Cluster Service VM 2 | 1 | 0.1 | 2 | 0.1 | 0.1 | 1 |
| VMware vSphere | vSphere Cluster Service VM 3 | 1 | 0.1 | 2 | 0.1 | 0.1 | 1 |
| VMware vSphere | ESXi node 1 | N/A | N/A | N/A | 2.4 | 48 | N/A |
| VMware vSphere | ESXi node 2 | N/A | N/A | N/A | 2.4 | 48 | N/A |
| VMware vSphere | ESXi node 3 | N/A | N/A | N/A | 2.4 | 48 | N/A |
| VMware vSphere | ESXi node 4 | N/A | N/A | N/A | 2.4 | 48 | N/A |
| VMware vSphere | ESXi node 5 | N/A | N/A | N/A | 2.4 | 48 | N/A |
| VMware vSphere | ESXi node 6 | N/A | N/A | N/A | 2.4 | 48 | N/A |
| VMware vSAN | vSAN System Usage | N/A | N/A | N/A | N/A | N/A | 11,223 |
| VMware NSX | NSX Unified Appliance Node 1 | 6 | 24 | 300 | 3.4 | 13.9 | 1,229 |
| VMware NSX | NSX Unified Appliance Node 2 | 6 | 24 | 300 | 3.4 | 13.9 | 1,229 |
| VMware NSX | NSX Unified Appliance Node 3 | 6 | 24 | 300 | 3.4 | 13.9 | 1,229 |
| VMware NSX | NSX Edge VM 1 | 8 | 32 | 196 | 1.4 | 0.7 | 800 |
| VMware NSX | NSX Edge VM 2 | 8 | 32 | 196 | 1.4 | 0.7 | 800 |
| VMware HCX (optional add-on) | HCX Manager | 4 | 12 | 64 | 0.4 | 2.8 | 256 |
|  | Total | 49 vCPUs | 178.4 GB | 2,277 GB | 29.9 GHz | 338.1 GB | 20,430 GB (17,459 GB with data reduction ratio) |

These resource requirements apply to only the first cluster deployed in an Azure VMware Solution private cloud. Subsequent clusters need to account for only vSphere Cluster Service, ESXi resource requirements, and vSAN system usage in solution sizing.

The virtual appliance **Typical raw vSAN datastore usage** values account for the space occupied by virtual machine files, including configuration and log files, snapshots, virtual disks, and swap files.

The VMware ESXi nodes have compute usage values that account for the vSphere VMkernel hypervisor overhead, vSAN overhead, and NSX distributed router, firewall, and bridging overhead. These estimates are for a standard three-cluster configuration. The storage requirements are listed as not applicable (N/A) because a boot volume separate from the vSAN datastore is used.

The VMware vSAN system usage storage overhead accounts for vSAN performance management objects, vSAN file system overhead, vSAN checksum overhead, and vSAN deduplication and compression overhead. To view this consumption, select **Monitor** > **vSAN** > **Capacity** for the vSphere cluster in the vSphere client.

The VMware HCX and VMware Site Recovery Manager resource requirements are optional add-ons to Azure VMware Solution. Discount these requirements in the solution sizing if they aren't being used.

The VMware Site Recovery Manager add-on has the option of configuring multiple VMware vSphere Replication Server appliances. The previous table assumes that one vSphere Replication Server appliance is used.

Sizing a solution is an estimate. Validate the sizing calculations from the design phase during the testing phase of a project. You need to ensure that the solution is sized correctly for the application workload.

>**Tip:**
>You can always extend the cluster and add more clusters later if you need to go beyond the initial deployment number.


> **Caution:**
> Deleting a cluster terminates all running workloads and components and is an irreversible operation. Once you delete a cluster, you cannot recover the data.


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


## VMware software versions

Microsoft is a member of the VMware metal as a service (MaaS) program and uses the [VMware Cloud Provider Stack](https://docs.vmware.com/en/VMware-Cloud-Provider-Stack/1.1/com.vmware.vcps.gsg.doc/GUID-5D686FB2-9886-44D3-845B-FDEF650C7575.html) for Azure VMware Solution upgrade planning.


<!-- Used in faq.md and concepts-private-clouds-clusters#host-maintenance-and-lifecycle-management and introduction#vmware-software-versions-->

The following table lists the software versions that are used in new deployments of Azure VMware Solution private clouds.

| Software | Version | Build number |
| :--- | :---: | :---: |
| VMware vCenter Server | [8.0 U3k](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/vcenter-server-update-and-patch-release-notes/vsphere-vcenter-server-80u3k-release-notes.html) | 25600417 |
| VMware ESXi | [8.0 U3k](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/release-notes/esxi-update-and-patch-release-notes/vsphere-esxi-80u3k-release-notes.html) | 25595708 |
| VMware vSAN | [8.0 U3](https://techdocs.broadcom.com/us/en/vmware-cis/vsan/vsan/8-0/release-notes/vmware-vsan-803-release-notes.html) | 25595708 |
| VMware vSAN Witness | [8.0 U3](https://techdocs.broadcom.com/us/en/vmware-cis/vsan/vsan/8-0/release-notes/vmware-vsan-803-release-notes.html) | 25595708 |
| VMware vSAN on-disk format | [20](https://knowledge.broadcom.com/external/article?legacyId=2148493) | N/A |
| VMware vSAN storage architecture | [Gen 1: OSA, Gen2: ESA](https://blogs.vmware.com/cloud-foundation/2022/08/31/comparing-the-original-storage-architecture-to-the-vsan-8-express-storage-architecture/) | N/A |
| VMware NSX |
| [4.2.3.2](https://techdocs.broadcom.com/us/en/vmware-cis/nsx/vmware-nsx/4-2/release-notes/vmware-nsx-4232-release-notes.html) |
 | 25077145 |
| VMware HCX | [4.11.4](https://techdocs.broadcom.com/us/en/vmware-cis/hcx/vmware-hcx/4-11/hcx-4-11-release-notes/vmware-hcx-4114-release-notes.html) | 25238712 |
| VMware Live Site Recovery | [9.0.2.1](https://techdocs.broadcom.com/us/en/vmware-cis/live-recovery/live-site-recovery/9-0/release-notes/vmware-live-site-recovery-90-release-notes.html) | 24401761 |
| VMware vSphere Replication | [9.0.2.1](https://techdocs.broadcom.com/us/en/vmware-cis/live-recovery/vsphere-replication/9-0/release-notes/vsphere-replication-9021-release-notes.html) | 24383568 |

If the listed build number doesn't match the build number listed in the release notes, it's because a custom patch was applied for cloud providers.

The current running software version is applied to new clusters that are added to an existing private cloud, if the vCenter Server version supports it.


## Backup and restore

Azure VMware Solution private cloud vCenter Server and HCX Manager (if enabled) configurations are on a daily backup schedule. The NSX configuration has an hourly backup schedule. The backups are retained for a minimum of three days. Open a [support request](https://rc.portal.azure.com/#create/Microsoft.Support) in the Azure portal to request restoration.

> **Note:**
> Restorations are intended for catastrophic situations only.

Azure VMware Solution continuously monitors the health of both the physical underlay and the Azure VMware Solution components. When Azure VMware Solution detects a failure, it takes action to repair the failed components.

## Related content

Now that you learned about Azure VMware Solution private cloud concepts, you might want to read:

- [Azure VMware Solution networking and interconnectivity concepts](architecture-networking.md)
- [Azure VMware Solution private cloud maintenance](azure-vmware-solution-private-cloud-maintenance.md)
- [Azure VMware Solution storage concepts](architecture-storage.md)
- [Enable an Azure VMware Solution resource](deploy-azure-vmware-solution.md#register-the-microsoftavs-resource-provider)

<!-- LINKS - internal -->
[concepts-networking]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-vmware/concepts-networking.md

<!-- LINKS - external-->
[vCSA versions]: https://kb.vmware.com/s/article/2143838

[ESXi versions]: https://kb.vmware.com/s/article/2143832

[vSAN versions]: https://kb.vmware.com/s/article/2150753
