---
title: Plan the Azure VMware Solution deployment
description: In this tutorial, learn how to plan your Azure VMware Solution deployment for a successful production-ready environment.
ms.topic: tutorial
ms.custom: engagement-fy23
ms.service: azure-vmware
ms.date: 05/29/2026
# Customer intent: As a cloud architect, I want to plan and document my Azure VMware Solution deployment, so that I can ensure a successful production-ready environment for virtual machines and facilitate smooth migration processes.
---

# Plan the Azure VMware Solution deployment

Planning your Azure VMware Solution deployment is crucial for creating a successful production-ready environment for virtual machines (VMs) and migration. During the planning process, you identify and gather the necessary information for your deployment. Be sure to document the information you collect for easy reference during the deployment. A successful deployment results in a production-ready environment for creating VMs and migration.

In this tutorial, learn how to complete the following tasks:

> 
> * Identify the Azure subscription, resource group, region, and resource name
> * Identify the size hosts and determine the number of clusters and hosts
> * Request a host quota for an eligible Azure plan
> * Identify the /22 CIDR IP segment for private cloud management
> * Identify a single network segment
> * Define the virtual network gateway
> * Define VMware HCX network segments

After you're finished, follow the recommended [Next steps](#next-steps) at the end of this article to continue with this getting started guide.

## Identify the subscription

Identify the subscription you plan to use to deploy Azure VMware Solution. You can create a new subscription or use an existing one.

>**Note:**
>The subscription must be associated with a Microsoft Enterprise Agreement (EA), a Cloud Solution Provider (CSP) Azure plan, or a Microsoft Customer Agreement (MCA). For more information, see [Eligibility criteria](request-host-quota-azure-vmware-solution.md#eligibility-criteria).

## Identify the resource group

Identify the resource group you want to use for your Azure VMware Solution. Generally, a resource group is created specifically for Azure VMware Solution, but you can use an existing resource group.

## Identify the region or location

Identify the [region](https://azure.microsoft.com/global-infrastructure/services/?products=azure-vmware) you want Azure VMware Solution deployed.

## Define the resource name

The resource name is a friendly and descriptive name for your Azure VMware Solution private cloud, for example, **MyPrivateCloud**.

>**Important:**
>The name must not exceed 40 characters. If the name exceeds this limit, you're unable to create public IP addresses for use with the private cloud.

## Identify the size hosts

Identify the size hosts that you want to use when deploying Azure VMware Solution.  


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


## Determine the number of clusters and hosts

The first Azure VMware Solution deployment you do consists of a private cloud containing a single cluster. You need to define the number of hosts you want to deploy to the first cluster for your deployment.


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


>**Note:**
>To learn about the limits for the number of hosts per cluster, the number of clusters per private cloud, and the number of hosts per private cloud, check [Azure subscription and service limits, quotas, and constraints](../azure-resource-manager/management/azure-subscription-service-limits.md#azure-vmware-solution-limits).

## Request a host quota

Request a host quota early in the planning process to ensure a smooth deployment of your Azure VMware Solution private cloud. Before making a request, identify the Azure subscription, resource group, and region. Determine the size of hosts, number of clusters, and hosts you need.

The support team takes up to five business days to confirm your request and allocate your hosts.

- [EA customers](request-host-quota-azure-vmware-solution.md#request-host-quota-for-ea-and-mca-customers)
- [CSP customers](request-host-quota-azure-vmware-solution.md#request-host-quota-for-csp-customers)

## Define the IP address segment for private cloud management

Azure VMware Solution requires a /22 CIDR network, such as `10.0.0.0/22`. This address space is divided into smaller network segments (subnets) for Azure VMware Solution management segments including vCenter Server, VMware HCX, NSX-T Data Center, and vMotion functionality. The following diagram shows Azure VMware Solution management IP address segments.

Diagram shows the management IP address segments in Azure VMware Solution.

> **Important:**
> The /22 CIDR network address block shouldn't overlap with any existing network segment you already have on-premises or in Azure. For details of how the /22 CIDR network is broken down per private cloud, see [Routing and subnet considerations](tutorial-network-checklist.md#routing-and-subnet-considerations).

## Define the IP address segment for VM workloads

In a VMware vSphere environment, VMs must connect to a network segment. As Azure VMware Solution production deployment expands, you often see a combination of L2 extended segments from on-premises and local NSX-T Data Center network segments.

For the initial deployment, identify a single network segment (IP network), for example, `10.0.4.0/24`. This network segment is used primarily for testing purposes during the initial deployment. The address block shouldn't overlap with any network segments on-premises or within Azure and shouldn't be within the /22 network segment already defined.
  
Diagram illustrates the IP address segment for virtual machine workloads.

## Define the virtual network gateway

Azure VMware Solution requires an Azure Virtual Network and an ExpressRoute circuit. Decide whether to use an *existing* or *new* ExpressRoute virtual network gateway. If you choose a *new* virtual network gateway, create it after creating your private cloud. Using an existing ExpressRoute virtual network gateway is acceptable. For planning purposes, note which ExpressRoute virtual network gateway you use.

Diagram displays the Azure Virtual Network attached to Azure VMware Solution.

>**Important:**
>You can connect to a virtual network gateway in an Azure Virtual WAN, but it's out of scope for this quick start.

## Define VMware HCX network segments

VMware HCX is an application mobility platform that simplifies application migration, workload rebalancing, and business continuity across data centers and clouds. You can migrate your VMware vSphere workloads to Azure VMware Solution and other connected sites through various migration types.

VMware HCX Connector deploys a subset of virtual appliances (automated) that require multiple IP segments. When you create your network profiles, you use the IP segments. Identify the following listed items for the VMware HCX deployment, which supports a pilot or small product use case. Modify as necessary based on your migration needs.

- **Management network:** For on-premises VMware HCX deployment, identify a management network for VMware HCX. Typically, it's the same management network used by your on-premises VMware vSphere cluster. At a minimum, identify **two** IPs on this network segment for VMware HCX. You might need larger numbers, depending on the scale of your deployment beyond the pilot or small use case.

  > **Note:**
  > For large environments, create a new /26 network and present it as a port group to your on-premises VMware vSphere cluster instead of using the existing management network. You can then create up to 10 service meshes and 60 network extenders (-1 per service mesh). You can stretch **eight** networks per network extender by using Azure VMware Solution private clouds.

- **Uplink network:** For on-premises VMware HCX deployment, identify an Uplink network for VMware HCX. Use the same network you plan to use for the Management network.

- **vMotion network:** For on-premises VMware HCX deployment, identify a vMotion network for VMware HCX. Typically, it's the same network used for vMotion by your on-premises VMware vSphere cluster. At a minimum, identify **two** IPs on this network segment for VMware HCX. You might need larger numbers, depending on the scale of your deployment beyond the pilot or small use case.

  You must expose the vMotion network on a distributed virtual switch or vSwitch0. If it's not, modify the environment to accommodate.

  >**Note:**
  >Many VMware vSphere environments use nonrouted network segments for vMotion, which poses no problems.
  
- **Replication network:** For on-premises VMware HCX deployment, define a replication network. Use the same network you're using for your Management and Uplink networks. If the on-premises cluster hosts use a dedicated Replication VMkernel network, reserve **two** IP addresses in this network segment and use the Replication VMkernel network for the replication network.

## Determine whether to extend your networks

Optionally, you can extend network segments from on-premises to Azure VMware Solution. If you extend network segments, identify those networks now following these guidelines:

- Networks must connect to a [vSphere Distributed Switch (vDS)](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/vsphere-networking-8-0/basic-networking-with-vnetwork-distributed-switches.html) in your on-premises VMware environment.  
- Networks that are on a [vSphere Standard Switch](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/vsphere-networking-8-0/setting-up-networking-with-vnetwork-standard-switches.html) can't be extended.

>**Important:**
>These networks are extended as a final step of the configuration, not during deployment.

## Next steps

Now that you gathered and documented the necessary information, continue to the next tutorial to create your Azure VMware Solution private cloud.

> 
> [Deploy Azure VMware Solution](deploy-azure-vmware-solution.md)
