---
title: 'Azure ExpressRoute: circuits and peering'
description: This page provides an overview of ExpressRoute circuits and routing domains/peering.
services: expressroute
author: duongau
ms.service: azure-expressroute
ms.topic: concept-article
ms.date: 08/27/2026
ms.author: duau 
---

# ExpressRoute circuits and peering

ExpressRoute circuits connect your on-premises infrastructure to Microsoft through a connectivity provider. This article explains ExpressRoute circuits and routing domains/peering. The following diagram illustrates the logical connectivity between your WAN and Microsoft.

Diagram showing how ExpressRoute circuits connect your on-premises infrastructure to Microsoft through a connectivity provider.

> **Note:**
> In the context of ExpressRoute, the Microsoft Edge refers to the edge routers on the Microsoft side of the ExpressRoute circuit. This is the entry point of the ExpressRoute circuit into Microsoft's network.

## <a name="circuits"></a>ExpressRoute circuits

An ExpressRoute circuit is a logical connection between your on-premises infrastructure and Microsoft cloud services through a connectivity provider. You can have multiple ExpressRoute circuits, each in the same, or different regions, connected to your premises through different connectivity providers.

ExpressRoute circuits are identified by a standard GUID called a service key (s-key). The s-key is the only information exchanged between Microsoft, the connectivity provider, and you. It isn't a secret for security purposes. Each ExpressRoute circuit has a unique s-key.

New ExpressRoute circuits can include two independent peerings: Private peering and Microsoft peering. Each peering consists of a pair of independent BGP sessions, configured redundantly for high availability. An ExpressRoute circuit can have one or both peerings enabled.

Each circuit has a fixed bandwidth that's shared across all circuit peerings and is mapped to a connectivity provider and a peering location. The supported bandwidths for circuits provisioned through a connectivity provider are:

* 50 Mbps
* 100 Mbps
* 200 Mbps
* 500 Mbps
* 1 Gbps
* 2 Gbps
* 5 Gbps
* 10 Gbps

> **Note:**
> ExpressRoute Direct supports higher circuit bandwidths than the preceding list. On 100-Gbps ExpressRoute Direct, you can also select 40-Gbps and 100-Gbps circuits. On 400-Gbps ExpressRoute Direct, you can also select 40-Gbps, 100-Gbps, 200-Gbps, and 400-Gbps circuits. For the full list of Direct circuit SKUs, see [About ExpressRoute Direct](expressroute-erdirect-about.md).

### <a name="quotas"></a>Quotas, limits, and limitations

Default quotas and limits apply to every ExpressRoute circuit. For current information, see [Azure Subscription and Service Limits, Quotas, and Constraints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/azure-subscription-service-limits.md).

### Circuit SKU upgrade and downgrade

#### Allowed workflow

* Upgrade from Standard to Premium SKU.
* Upgrade from Local to Standard or Premium SKU (using Azure CLI or Azure PowerShell, with billing type as **unlimited**).
* Change from *MeteredData* to *UnlimitedData*.
* Downgrade from Premium SKU to Standard.

#### Unsupported workflow

* Change from *UnlimitedData* to *MeteredData*.

## <a name="routingdomains"></a>ExpressRoute peering

An ExpressRoute circuit has two routing domains/peerings: Azure Private and Microsoft. Each peering is configured identically on a pair of routers for high availability. Azure services are categorized as *Azure public* and *Azure private* to represent the IP addressing schemes.

Diagram showing how Azure Private and Microsoft peerings are configured in an ExpressRoute circuit.

### <a name="privatepeering"></a>Azure private peering

Azure compute services, such as virtual machines (IaaS) and cloud services (PaaS), deployed within a virtual network connect through the private peering domain. This domain is a trusted extension of your core network into Microsoft Azure. You can set up bi-directional connectivity between your core network and Azure virtual networks (VNets), so you can connect to virtual machines and cloud services directly on their private IP addresses.

You can connect multiple virtual networks to the private peering domain. For information on limits and limitations, see the [FAQ page](expressroute-faqs.md). For current information, see [Azure Subscription and Service Limits, Quotas, and Constraints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/azure-subscription-service-limits.md). For detailed routing configuration information, see the [Routing](expressroute-routing.md) page.

### <a name="microsoftpeering"></a>Microsoft peering

Microsoft 365 was created to be accessed securely and reliably via the Internet. Because of this, we recommend ExpressRoute for specific scenarios. For information about using ExpressRoute to access Microsoft 365, visit [Azure ExpressRoute for Microsoft 365](https://learn.microsoft.com/microsoft-365/enterprise/azure-expressroute).

Connectivity to Microsoft online services (Microsoft 365, Azure PaaS services, and Microsoft PSTN services) occurs through Microsoft peering. This peering enables bi-directional connectivity between your WAN and Microsoft cloud services. You must connect to Microsoft cloud services over public IP addresses owned by you or your connectivity provider and adhere to all defined rules. For more information, see the [ExpressRoute prerequisites](expressroute-prerequisites.md) page.

For more information on supported services, costs, and configuration details, see the [FAQ page](expressroute-faqs.md). For a list of connectivity providers offering Microsoft peering support, see the [ExpressRoute locations](expressroute-locations.md) page.

> **Important:**
> For ExpressRoute circuits that use the Unlimited Data plan, ExpressRoute doesn't charge separately for inbound or outbound data transfer. When you access Azure services over Microsoft peering, charges associated with the Azure service or resource might still apply according to that service's pricing. These service-level charges are separate from ExpressRoute data-transfer charges.

## <a name="peeringcompare"></a>Peering comparison

The following table compares the two peerings:


|  | **Private Peering** | **Microsoft Peering** |
| --- | --- | --- |
| **Max. # IPv4 prefixes supported per peering** | 4000 by default, 10,000 with ExpressRoute Premium | 200 |
| **Max. # IPv6 prefixes supported per peering** | 100 | 200 |
| **IP address ranges supported** | Any valid IP address within your WAN. | Public IP addresses owned by you or your connectivity provider. |
| **AS Number requirements** | Private and public AS numbers. You must own the public AS number if you choose to use one. | You can set private and public AS numbers for peer ASN. However, you must prove ownership of public IP addresses. Note: If you use customer ASN, you can set public ASN only. |
| **IP protocols supported** | IPv4, IPv6 | IPv4, IPv6 |
| **Routing Interface IP addresses** | RFC1918 and public IP addresses | Public IP addresses registered to you in routing registries. |
| **MD5 Hash support** | Yes | Yes |


You can enable one or more routing domains as part of your ExpressRoute circuit. You can have all routing domains on the same VPN or separate them into different routing domains. The recommended configuration is to connect private peering directly to the core network, and Microsoft peering links to your DMZ.

Each peering requires separate BGP sessions (one pair for each peering type). The BGP session pairs provide a highly available link. If you're connecting through layer 2 connectivity providers, you're responsible for configuring and managing routing. Learn more by reviewing the [workflows](expressroute-workflows.md) for setting up ExpressRoute.

> **Note:**
> The default behavior when BGP session prefix limits are exceeded is to terminate the session. If you choose to advertise prefixes received over Microsoft Peering to Private Peering, there is a risk of exceeding these limits, as Microsoft prefixes are updated monthly and can increase significantly. Implement appropriate monitoring to detect prefix changes and consider upgrading the SKU or summarizing routes to manage the number of prefixes advertised from on-premises.

## <a name="health"></a>ExpressRoute health

You can monitor ExpressRoute circuits for availability, connectivity to VNets, and bandwidth utilization by using [ExpressRoute Network Insights](expressroute-network-insights.md).

Connection Monitor for ExpressRoute monitors the health of Azure private peering and Microsoft peering. For more information on configuration, see [Configure Connection Monitor for ExpressRoute](how-to-configure-connection-monitor.md).

## Related content

* Find a service provider. See [ExpressRoute service providers and locations](expressroute-locations.md).
* Ensure that all prerequisites are met. See [ExpressRoute prerequisites](expressroute-prerequisites.md).
* Configure your ExpressRoute connection.
  * [Create and manage ExpressRoute circuits](expressroute-howto-circuit-portal-resource-manager.md)
  * [Configure routing (peering) for ExpressRoute circuits](expressroute-howto-routing-portal-resource-manager.md)
