---
title: Architecture - Network interconnectivity
description: Learn about key concepts and use cases of networking and interconnectivity in Azure VMware Solution.
ms.topic: concept-article
ms.service: azure-vmware
ms.date: 1/27/2026
ms.custom: engagement-fy23
# Customer intent: As a cloud architect, I want to understand the networking and interconnectivity options available in Azure VMware Solution, so that I can effectively configure and manage private cloud environments and ensure seamless connectivity between on-premises and cloud resources.
---

# Azure VMware Solution networking and interconnectivity concepts


<!-- Used in introduction.md and concepts-networking.md -->

Azure VMware Solution offers a private cloud environment accessible from on-premises sites and Azure-based resources. Services such as Azure ExpressRoute, VPN connections, or Azure Virtual WAN deliver the connectivity. However, these services require specific network address ranges and firewall ports for enabling the services.

When you deploy a private cloud, private networks for management, provisioning, and vMotion get created. You use these private networks to access VMware vCenter Server and VMware NSX Manager and virtual machine vMotion or deployment.


<!-- Used in articles\azure-vmware\introduction.md and articles\azure-vmware\concepts-networking.md 

articles\azure-vmware\includes\azure-vmware-solution-networking-description.md

-->

[ExpressRoute Global Reach](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/expressroute-global-reach.md) is used to connect private clouds to on-premises environments. It connects circuits directly at the Microsoft Edge level. The connection requires a virtual network (vNet) with an ExpressRoute circuit to on-premises in your subscription.  The reason is that vNet gateways (ExpressRoute Gateways) can't transit traffic, which means you can attach two circuits to the same gateway, but it doesn't send the traffic from one circuit to the other.

Each Azure VMware Solution environment is its own ExpressRoute region (its own virtual MSEE device), which lets you connect Global Reach to the 'local' peering location.  It allows you to connect multiple Azure VMware Solution instances in one region to the same peering location. 

>**Note:**
>For locations where ExpressRoute Global Reach isn't enabled, for example, because of local regulations, you have to build a routing solution using Azure IaaS VMs. For some examples, see [Azure Cloud Adoption Framework - Network topology and connectivity for Azure VMware Solution](https://learn.microsoft.com/azure/cloud-adoption-framework/scenarios/azure-vmware/eslz-network-topology-connectivity).


Virtual machines deployed on the private cloud are accessible to the internet through the [Azure Virtual WAN public IP](enable-public-ip-nsx-edge.md) functionality. For new private clouds, internet access is disabled by default. 


Azure VMware Solution private cloud offers two types of interconnectivity:

- [**Basic Azure-only interconnectivity**](#azure-virtual-network-interconnectivity) allows you to manage and use your private cloud with a single virtual network in Azure. This setup is ideal for evaluations or implementations that don't require access from on-premises environments.

- [**Full on-premises to private cloud interconnectivity**](#on-premises-interconnectivity) extends the basic Azure-only implementation to include interconnectivity between on-premises and Azure VMware Solution private clouds.

This article explains key networking and interconnectivity concepts, including requirements and limitations. It also provides the information you need to configure your networking with Azure VMware Solution.

## Azure VMware Solution private cloud use cases

The use cases for Azure VMware Solution private clouds include:

- New VMware vSphere virtual machine (VM) workloads in the cloud
- VM workload bursting to the cloud (on-premises to Azure VMware Solution only)
- VM workload migration to the cloud (on-premises to Azure VMware Solution only)
- Disaster recovery (Azure VMware Solution to Azure VMware Solution or on-premises to Azure VMware Solution)
- Consumption of Azure services

> **Tip:**
> All use cases for the Azure VMware Solution service are enabled with on-premises to private cloud connectivity.

## Azure virtual network interconnectivity

You can interconnect your Azure virtual network with the Azure VMware Solution private cloud implementation. This connection allows you to manage your Azure VMware Solution private cloud, consume workloads in your private cloud, and access other Azure services.

The following diagram illustrates the basic network interconnectivity established during a private cloud deployment. It shows the logical networking between a virtual network in Azure and a private cloud. This connectivity is established via a backend ExpressRoute that is part of the Azure VMware Solution service. The interconnectivity supports the following primary use cases:

- Inbound access to vCenter Server and NSX Manager from VMs in your Azure subscription.
- Outbound access from VMs on the private cloud to Azure services.
- Inbound access to workloads running in the private cloud.

> **Important:**
> When connecting **production** Azure VMware Solution private clouds to an Azure virtual network, use an ExpressRoute virtual network gateway with the Ultra Performance Gateway SKU and enable FastPath to achieve 10 Gbps connectivity. For less critical environments, use the Standard or High Performance Gateway SKUs for slower network performance.

> **Note:**
> If you need to connect more than four Azure VMware Solution private clouds in the same Azure region to the same Azure virtual network, use [AVS Interconnect](connect-multiple-private-clouds-same-region.md) to aggregate private cloud connectivity within the Azure region.

Diagram illustrating basic network interconnectivity during an Azure VMware Solution private cloud deployment.

## On-premises interconnectivity

In the fully interconnected scenario, you can access the Azure VMware Solution from your Azure virtual networks and on-premises. This implementation extends the basic implementation described in the previous section. An ExpressRoute circuit is required to connect from on-premises to your Azure VMware Solution private cloud in Azure.

The following diagram shows the on-premises to private cloud interconnectivity, which enables the following use cases:

- Hot/Cold vSphere vMotion between on-premises and Azure VMware Solution.
- On-premises to Azure VMware Solution private cloud management access.

Diagram displaying virtual network and on-premises to private cloud interconnectivity.

For full interconnectivity to your private cloud, enable ExpressRoute Global Reach and then request an authorization key and private peering ID for Global Reach in the Azure portal. Use the authorization key and peering ID to establish Global Reach between an ExpressRoute circuit in your subscription and the ExpressRoute circuit for your private cloud. Once linked, the two ExpressRoute circuits route network traffic between your on-premises environments and your private cloud. For more information on the procedures, see the [tutorial for creating an ExpressRoute Global Reach peering to a private cloud](tutorial-expressroute-global-reach-private-cloud.md).

> **Important:**
> Don't advertise bogus address routes (bogon routes) over ExpressRoute from on-premises or your Azure virtual network. Examples of bogon routes include 0.0.0.0/5 or 192.0.0.0/3.

## Route advertisement guidelines to Azure VMware Solution

Follow these guidelines when advertising routes from your on-premises and Azure virtual network to Azure VMware Solution over ExpressRoute:

| **Supported** | **Not supported** |
| --- | --- |
| Default route – 0.0.0.0/0* | Bogon routes. For example: ``0.0.0.0/1, 128.0.0.0/1 0.0.0.0/5``, or ``192.0.0.0/3.`` |
| RFC-1918 address blocks. For example: (``10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16``) or its subnets ( ``10.1.0.0/16, 172.24.0.0/16, 192.168.1.0/24``). | Special address block reserved by IANA. For example,``RFC 6598-100.64.0.0/10`` and its subnets. |
| Customer owned public-IP CIDR block or its subnets. |  |

> **Note:**
> The customer-advertised default route to Azure VMware Solution can't be used to route back the traffic when the customer accesses Azure VMware Solution management appliances (vCenter Server, NSX Manager, HCX Manager). The customer needs to advertise a more specific route to Azure VMware Solution for that traffic to be routed back.

## Limitations


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


## Next steps 

Now that you understand Azure VMware Solution network and interconnectivity concepts, consider learning about:

- [Azure VMware Solution storage concepts](architecture-storage.md)
- [Azure VMware Solution identity concepts](architecture-identity.md)
- [Enable the Azure VMware Solution resource provider](deploy-azure-vmware-solution.md#register-the-microsoftavs-resource-provider)

<!-- LINKS - external -->
[enable Global Reach]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/expressroute-howto-set-global-reach.md

<!-- LINKS - internal -->
[concepts-upgrades]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-vmware/concepts-private-clouds-clusters#host-maintenance-and-lifecycle-management
[concepts-storage]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-vmware/concepts-storage.md
